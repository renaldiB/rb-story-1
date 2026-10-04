
class AudioService {
  private ctx: AudioContext | null = null;
  private ambientSourceNode: AudioNode | null = null;
  private musicInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  public isMuted: boolean = false;
  public masterVolume: number = 0.7;
  public ambientVolume: number = 0.5;
  public sfxVolume: number = 0.8;
  private currentTrack: string | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.ambientGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();

        this.ambientGain.connect(this.masterGain);
        this.sfxGain.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        this.updateVolumes();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public updateVolumes() {
    if (!this.ctx || !this.masterGain || !this.ambientGain || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const effectiveMaster = this.isMuted ? 0 : this.masterVolume;
    this.masterGain.gain.setTargetAtTime(effectiveMaster, now, 0.05);
    this.ambientGain.gain.setTargetAtTime(this.ambientVolume, now, 0.05);
    this.sfxGain.gain.setTargetAtTime(this.sfxVolume, now, 0.05);
  }

  public playSoundEffect(
    type:
      | 'click'
      | 'rain_start'
      | 'page_turn'
      | 'heartbeat'
      | 'wind'
      | 'chime'
      | 'door'
      | 'glitch'
      | 'static'
      | 'whisper'
  ) {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    switch (type) {
      case 'click': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case 'glitch': {
        const bufferSize = ctx.sampleRate * 0.08;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * (i % 3 === 0 ? 1 : -0.5);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        noise.connect(gain);
        gain.connect(this.sfxGain);
        noise.start(now);
        break;
      }

      case 'static':
      case 'whisper': {
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = type === 'whisper' ? 'bandpass' : 'highpass';
        filter.frequency.setValueAtTime(type === 'whisper' ? 800 : 2500, now);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);
        noise.start(now);
        break;
      }

      case 'chime': {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);
          gain.gain.setValueAtTime(0.08, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.9);
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.9);
        });
        break;
      }

      case 'heartbeat': {
        const playBeat = (time: number, freq: number, dur: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, time);
          osc.frequency.exponentialRampToValueAtTime(35, time + dur);
          gain.gain.setValueAtTime(0.35, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(time);
          osc.stop(time + dur);
        };
        playBeat(now, 75, 0.16);
        playBeat(now + 0.22, 65, 0.2);
        break;
      }

      case 'page_turn':
      case 'door': {
        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(type === 'door' ? 400 : 1200, now);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, now);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);
        noise.start(now);
        break;
      }

      default:
        break;
    }
  }

  public setAmbientTrack(track?: string) {
    if (this.currentTrack === track) return;
    this.currentTrack = track ?? null;
    this.initContext();

    this.stopAmbient();
    if (!track || this.isMuted) return;

    switch (track) {
      case 'rain_cafe':
      case 'night_street':
        this.startRainAmbience(track === 'night_street');
        this.startLofiPianoChords();
        break;
      case 'dark_hospital':
        this.startHorrorDrone();
        break;
      case 'cyber_sector':
        this.startCyberSynth();
        break;
      case 'celestial_archive':
        this.startCelestialChimes();
        break;
      default:
        break;
    }
  }

  private startRainAmbience(isMuffled: boolean = false) {
    if (!this.ctx || !this.ambientGain) return;
    const ctx = this.ctx;
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = isMuffled ? 600 : 1400;

    const rainGain = ctx.createGain();
    rainGain.gain.value = 0.25;

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.ambientGain);

    whiteNoise.start();
    this.ambientSourceNode = whiteNoise;
  }

  private startHorrorDrone() {
    if (!this.ctx || !this.ambientGain) return;
    const ctx = this.ctx;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const droneGain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = 48;
    osc2.type = 'triangle';
    osc2.frequency.value = 52.5;

    droneGain.gain.value = 0.35;

    osc1.connect(droneGain);
    osc2.connect(droneGain);
    droneGain.connect(this.ambientGain);

    osc1.start();
    osc2.start();

    this.ambientSourceNode = droneGain;
  }

  private startCyberSynth() {
    if (!this.ctx || !this.ambientGain) return;
    const ctx = this.ctx;
    const bass = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const synthGain = ctx.createGain();

    bass.type = 'sawtooth';
    bass.frequency.value = 65.41;
    filter.type = 'lowpass';
    filter.frequency.value = 350;
    filter.Q.value = 4.0;

    synthGain.gain.value = 0.18;

    bass.connect(filter);
    filter.connect(synthGain);
    synthGain.connect(this.ambientGain);

    bass.start();
    this.ambientSourceNode = synthGain;

    const notes = [261.63, 311.13, 392.0, 466.16];
    let step = 0;
    this.musicInterval = window.setInterval(() => {
      if (!this.ctx || !this.ambientGain || this.isMuted) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'square';
      osc.frequency.setValueAtTime(notes[step % notes.length], now);
      step++;
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start(now);
      osc.stop(now + 0.2);
    }, 450);
  }

  private startCelestialChimes() {
    if (!this.ctx || !this.ambientGain) return;
    const celestialNotes = [
      [523.25, 659.25, 783.99],
      [587.33, 698.46, 880.0],
      [440.0, 523.25, 659.25],
      [392.0, 493.88, 587.33]
    ];
    let chordIndex = 0;
    const playChord = () => {
      if (!this.ctx || !this.ambientGain || this.isMuted) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const chord = celestialNotes[chordIndex % celestialNotes.length];
      chordIndex++;

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);
        gain.gain.setValueAtTime(0, now + idx * 0.15);
        gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.15 + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.15 + 4.2);
        osc.connect(gain);
        gain.connect(this.ambientGain!);
        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 4.5);
      });
    };
    playChord();
    this.musicInterval = window.setInterval(playChord, 4800);
  }

  private startLofiPianoChords() {
    if (this.musicInterval !== null) return;
    const chordProgressions = [
      [261.63, 329.63, 392.0, 493.88],
      [220.0, 261.63, 329.63, 493.88],
      [174.61, 261.63, 329.63, 392.0],
      [196.0, 246.94, 293.66, 392.0]
    ];

    let chordIndex = 0;
    const playChord = () => {
      if (!this.ctx || !this.ambientGain || this.isMuted) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const notes = chordProgressions[chordIndex % chordProgressions.length];
      chordIndex++;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.045, now + i * 0.08 + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 3.8);

        osc.connect(gain);
        gain.connect(this.ambientGain!);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 4.0);
      });
    };

    playChord();
    this.musicInterval = window.setInterval(playChord, 5200);
  }

  public stopAmbient() {
    if (this.ambientSourceNode) {
      try {
        if ('stop' in this.ambientSourceNode) {
          (this.ambientSourceNode as AudioBufferSourceNode).stop();
        }
        this.ambientSourceNode.disconnect();
      } catch {
      }
      this.ambientSourceNode = null;
    }
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.updateVolumes();
    if (!this.isMuted && this.currentTrack) {
      this.setAmbientTrack(this.currentTrack);
    } else if (this.isMuted) {
      this.stopAmbient();
    }
    return this.isMuted;
  }
}

export const audio = new AudioService();
