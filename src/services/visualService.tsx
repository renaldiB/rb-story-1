import React from 'react';
import type { Expression, CharacterPosition, SceneMood } from '../types/story';
import { resolveEnvironmentAsset, resolveCharacterSprite } from '../data/assets/assetManifest';

const getMoodFilter = (mood: SceneMood): string => {
  switch (mood) {
    case 'romance':
      return 'sepia(0.18) saturate(1.15) brightness(1.02)';
    case 'mystery':
      return 'hue-rotate(190deg) saturate(0.85) contrast(1.12)';
    case 'sadness':
      return 'saturate(0.65) brightness(0.92) contrast(0.95)';
    case 'tension':
      return 'contrast(1.22) brightness(0.88)';
    case 'horror':
      return 'contrast(1.35) brightness(0.72) hue-rotate(145deg) saturate(0.65)';
    case 'cyber':
      return 'contrast(1.25) saturate(1.4) hue-rotate(200deg)';
    case 'wonder':
      return 'saturate(1.25) brightness(1.05) hue-rotate(275deg)';
    case 'peaceful':
    default:
      return 'none';
  }
};

export const BackgroundArt: React.FC<{
  locationId: string;
  time: string;
  weather: string;
  mood: SceneMood;
  sceneId?: string;
}> = ({ locationId, time, weather, mood, sceneId }) => {
  const [rasterFailed, setRasterFailed] = React.useState(false);

  const rasterAsset = React.useMemo(() => {
    return resolveEnvironmentAsset(locationId, time, weather);
  }, [locationId, time, weather]);

  React.useEffect(() => {
    setRasterFailed(false);
  }, [locationId, time]);

  if (rasterAsset && !rasterFailed) {
    return (
      <div
        className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000 ease-out select-none pointer-events-none"
        style={{ filter: getMoodFilter(mood) }}
      >
        <picture>
          <source media="(max-width: 640px)" srcSet={rasterAsset.mobile} type="image/webp" />
          <source media="(min-width: 641px)" srcSet={rasterAsset.production} type="image/webp" />
          <img
            src={rasterAsset.production}
            alt={locationId}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-1000 ease-out scale-100"
            onError={() => {
              console.warn(
                `[VisualService] Missing asset: scene=${sceneId || 'unknown'} asset=${locationId} path=${rasterAsset.production}`
              );
              setRasterFailed(true);
            }}
          />
        </picture>
      </div>
    );
  }

  const isNight = time === 'night';
  const isSunset = time === 'sunset';
  const isRain = weather === 'rain';

  // Base background gradients
  let skyGradient = isNight
    ? ['#090d16', '#141c2e', '#1c2438']
    : isSunset
    ? ['#2c1930', '#7a283e', '#e26d42', '#f9c56a']
    : ['#28425d', '#537d99', '#96b8ca'];

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000 ease-out"
      style={{ filter: getMoodFilter(mood) }}
    >
      <svg
        viewBox="0 0 800 1200"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover select-none pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            {skyGradient.map((col, idx) => (
              <stop
                key={idx}
                offset={`${(idx / (skyGradient.length - 1)) * 100}%`}
                stopColor={col}
              />
            ))}
          </linearGradient>

          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffdd99" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#f39c12" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f39c12" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffeaa7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fdcb6e" stopOpacity="0.3" />
          </linearGradient>

          <filter id="cinematicBlur">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Sky / Ambient background */}
        <rect width="800" height="1200" fill="url(#skyGrad)" />

        {/* Cafe Night / Rain Scene */}
        {locationId.includes('cafe') && (
          <g>
            {/* Distant city silhouette through glass */}
            <path
              d="M0,700 L80,640 L160,670 L240,600 L320,630 L400,580 L480,620 L580,590 L680,650 L800,610 L800,1200 L0,1200 Z"
              fill={isNight ? '#0b101d' : '#304255'}
              opacity="0.7"
            />
            {/* Distant blurred bokeh city lights */}
            {[
              { cx: 120, cy: 620, r: 24, c: '#ff7675' },
              { cx: 280, cy: 590, r: 35, c: '#ffeaa7' },
              { cx: 450, cy: 610, r: 28, c: '#74b9ff' },
              { cx: 620, cy: 580, r: 40, c: '#fdcb6e' },
              { cx: 720, cy: 630, r: 20, c: '#a29bfe' }
            ].map((b, i) => (
              <circle
                key={i}
                cx={b.cx}
                cy={b.cy}
                r={b.r}
                fill={b.c}
                opacity="0.35"
                filter="url(#cinematicBlur)"
              />
            ))}

            {/* Cafe interior window frame & mullions */}
            <rect x="0" y="0" width="800" height="1200" fill="none" stroke="#1e1815" strokeWidth="32" />
            <line x1="266" y1="0" x2="266" y2="1200" stroke="#1c1613" strokeWidth="16" />
            <line x1="533" y1="0" x2="533" y2="1200" stroke="#1c1613" strokeWidth="16" />
            <line x1="0" y1="750" x2="800" y2="750" stroke="#1c1613" strokeWidth="16" />

            {/* Warm Cafe Pendant Lamps */}
            <circle cx="200" cy="180" r="160" fill="url(#lampGlow)" />
            <line x1="200" y1="0" x2="200" y2="140" stroke="#333" strokeWidth="3" />
            <path d="M160,140 Q200,120 240,140 L220,180 L180,180 Z" fill="#2d3436" />
            <circle cx="200" cy="180" r="14" fill="#fff" />

            <circle cx="600" cy="180" r="160" fill="url(#lampGlow)" />
            <line x1="600" y1="0" x2="600" y2="140" stroke="#333" strokeWidth="3" />
            <path d="M560,140 Q600,120 640,140 L620,180 L580,180 Z" fill="#2d3436" />
            <circle cx="600" cy="180" r="14" fill="#fff" />

            {/* Wooden Cafe Counter / Table in foreground */}
            <path
              d="M0,860 L800,860 L800,1200 L0,1200 Z"
              fill="#2c1d11"
            />
            {/* Table highlight reflection */}
            <line x1="0" y1="862" x2="800" y2="862" stroke="#5c3d23" strokeWidth="4" />

            {/* Steaming Coffee Cup on table */}
            <ellipse cx="660" cy="910" rx="38" ry="12" fill="#1e140d" opacity="0.6" />
            <path d="M635,880 L685,880 L678,915 Q660,920 642,915 Z" fill="#f5f6fa" />
            <ellipse cx="660" cy="880" rx="25" ry="6" fill="#3d2314" />
            {/* Coffee steam curve */}
            <path
              d="M655,870 Q650,850 660,835 T658,815"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.3"
            />
          </g>
        )}

        {/* Street Night / Rain Scene */}
        {locationId.includes('street') && (
          <g>
            {/* Buildings row */}
            <rect x="30" y="320" width="180" height="580" fill="#121824" />
            <rect x="230" y="240" width="220" height="660" fill="#182030" />
            <rect x="470" y="380" width="150" height="520" fill="#0f1520" />
            <rect x="640" y="300" width="140" height="600" fill="#151e2c" />

            {/* Lit windows in buildings */}
            {[
              { x: 60, y: 380, w: 20, h: 28 },
              { x: 120, y: 440, w: 20, h: 28 },
              { x: 260, y: 320, w: 25, h: 32 },
              { x: 340, y: 400, w: 25, h: 32 },
              { x: 300, y: 520, w: 25, h: 32 },
              { x: 500, y: 460, w: 18, h: 25 },
              { x: 680, y: 360, w: 22, h: 30 }
            ].map((w, idx) => (
              <rect key={idx} x={w.x} y={w.y} width={w.w} height={w.h} fill="#ffeaa7" opacity="0.65" />
            ))}

            {/* Street ground with wet asphalt reflections */}
            <path d="M0,820 L800,820 L800,1200 L0,1200 Z" fill="#0f131a" />
            <ellipse cx="400" cy="980" rx="350" ry="120" fill="#1a2536" opacity="0.4" />

            {/* Streetlamp Pole & Glowing Lantern */}
            <line x1="680" y1="460" x2="680" y2="880" stroke="#2d3436" strokeWidth="8" />
            <circle cx="680" cy="460" r="140" fill="url(#lampGlow)" />
            <path d="M660,440 L700,440 L690,470 L670,470 Z" fill="#ffeaa7" />

            {/* Wet pavement reflection lines */}
            <line x1="640" y1="850" x2="720" y2="850" stroke="#f39c12" strokeWidth="4" opacity="0.4" />
            <line x1="620" y1="910" x2="740" y2="910" stroke="#f39c12" strokeWidth="6" opacity="0.3" />
            <line x1="600" y1="990" x2="760" y2="990" stroke="#f39c12" strokeWidth="8" opacity="0.2" />
          </g>
        )}

        {/* Train Station / Dusk Platform */}
        {locationId.includes('station') && (
          <g>
            {/* Twilight sky horizon */}
            <polygon points="0,780 800,780 800,1200 0,1200" fill="#181e28" />
            {/* Rails converging towards horizon */}
            <line x1="280" y1="780" x2="0" y2="1200" stroke="#535c68" strokeWidth="6" />
            <line x1="330" y1="780" x2="160" y2="1200" stroke="#718093" strokeWidth="8" />
            <line x1="470" y1="780" x2="640" y2="1200" stroke="#718093" strokeWidth="8" />
            <line x1="520" y1="780" x2="800" y2="1200" stroke="#535c68" strokeWidth="6" />

            {/* Station canopy roof overhead */}
            <polygon points="0,0 800,0 800,320 0,220" fill="#131922" opacity="0.9" />
            <line x1="120" y1="235" x2="120" y2="820" stroke="#2f3640" strokeWidth="12" />
            <line x1="680" y1="305" x2="680" y2="820" stroke="#2f3640" strokeWidth="12" />

            {/* Platform edge safety line */}
            <line x1="0" y1="840" x2="800" y2="840" stroke="#f1c40f" strokeWidth="6" strokeDasharray="18 10" />

            {/* Station lamp hanging from canopy */}
            <circle cx="400" cy="270" r="120" fill="url(#lampGlow)" opacity="0.7" />
            <line x1="400" y1="180" x2="400" y2="270" stroke="#333" strokeWidth="4" />
          </g>
        )}

        {/* Bedroom / Evening Interior */}
        {locationId.includes('bedroom') && (
          <g>
            {/* Wall */}
            <rect width="800" height="1200" fill="#1a1c24" />
            {/* Balcony Glass Window */}
            <rect x="80" y="160" width="340" height="650" fill="#0d131f" stroke="#353b48" strokeWidth="12" />
            {isRain && (
              <g stroke="#ffffff" strokeWidth="1.5" opacity="0.25">
                <line x1="120" y1="200" x2="110" y2="280" />
                <line x1="220" y1="240" x2="215" y2="330" />
                <line x1="310" y1="210" x2="300" y2="300" />
                <line x1="160" y1="380" x2="155" y2="460" />
              </g>
            )}
            {/* Warm Bedside Lamp on Table */}
            <circle cx="640" cy="520" r="160" fill="url(#lampGlow)" />
            <rect x="580" y="660" width="120" height="240" fill="#2d3436" />
            <path d="M600,480 L680,480 L700,560 L580,560 Z" fill="#ffeaa7" />
            <line x1="640" y1="560" x2="640" y2="660" stroke="#b2bec3" strokeWidth="6" />

            {/* Cozy Bed Header */}
            <rect x="0" y="800" width="800" height="400" fill="#242938" />
            <ellipse cx="280" cy="850" rx="140" ry="50" fill="#3b435a" />
          </g>
        )}

        {/* Rooftop / Night Sky */}
        {locationId.includes('rooftop') && (
          <g>
            {/* Twinkling stars */}
            {[
              { cx: 80, cy: 120 }, { cx: 220, cy: 80 }, { cx: 380, cy: 160 },
              { cx: 520, cy: 90 }, { cx: 680, cy: 140 }, { cx: 740, cy: 220 },
              { cx: 160, cy: 260 }, { cx: 440, cy: 300 }, { cx: 620, cy: 280 }
            ].map((s, i) => (
              <circle key={i} cx={s.cx} cy={s.cy} r={i % 2 === 0 ? 1.8 : 2.5} fill="#ffffff" opacity="0.8" />
            ))}

            {/* City skyline glow on horizon */}
            <rect x="0" y="650" width="800" height="200" fill="url(#lampGlow)" opacity="0.25" />
            <path
              d="M0,720 L60,670 L120,700 L180,630 L260,660 L340,600 L420,640 L500,580 L600,640 L700,610 L800,660 L800,1200 L0,1200 Z"
              fill="#0d111a"
            />
            {/* Rooftop railing */}
            <line x1="0" y1="840" x2="800" y2="840" stroke="#384358" strokeWidth="8" />
            <line x1="0" y1="890" x2="800" y2="890" stroke="#384358" strokeWidth="5" />
            {[100, 220, 340, 460, 580, 700].map((rx, idx) => (
              <line key={idx} x1={rx} y1="840" x2={rx} y2="1200" stroke="#2c3547" strokeWidth="10" />
            ))}
          </g>
        )}

        {/* Hospital Corridor (Horror) */}
        {locationId.includes('hospital') && (
          <g>
            <rect width="800" height="1200" fill="#080e0e" />
            <polygon points="0,0 250,300 250,900 0,1200" fill="#0c1716" />
            <polygon points="800,0 550,300 550,900 800,1200" fill="#0a1312" />
            <polygon points="250,300 550,300 550,900 250,900" fill="#060b0b" />
            <polygon points="0,0 800,0 550,300 250,300" fill="#050808" />
            <polygon points="0,1200 800,1200 550,900 250,900" fill="#091010" />

            {/* Flickering Red Emergency Light */}
            <circle cx="400" cy="380" r="120" fill="#ff1e56" opacity="0.45" />
            <circle cx="400" cy="380" r="14" fill="#ff4d4d" />
            <rect x="390" y="300" width="20" height="70" fill="#1e272e" />

            {/* Room 404 Ajar Door */}
            <polygon points="250,500 320,480 320,860 250,880" fill="#020404" stroke="#1f2928" strokeWidth="4" />
            <text x="260" y="520" fill="#e74c3c" fontSize="20" fontFamily="monospace" fontWeight="bold">404</text>

            {/* Abandoned Gurney / Bed frame */}
            <line x1="480" y1="780" x2="620" y2="760" stroke="#2d3436" strokeWidth="12" />
            <line x1="500" y1="780" x2="500" y2="860" stroke="#2d3436" strokeWidth="8" />
            <line x1="600" y1="760" x2="600" y2="850" stroke="#2d3436" strokeWidth="8" />
          </g>
        )}

        {/* Cyberpunk Bridge (Cyberpunk) */}
        {locationId.includes('cyber') && (
          <g>
            <rect width="800" height="1200" fill="#060614" />
            <rect x="20" y="140" width="200" height="850" fill="#090a20" stroke="#00f2fe" strokeWidth="1.5" strokeOpacity="0.4" />
            <rect x="240" y="80" width="280" height="920" fill="#0b0e2a" stroke="#ff007f" strokeWidth="1.5" strokeOpacity="0.4" />
            <rect x="540" y="180" width="220" height="800" fill="#080a1c" stroke="#00f2fe" strokeWidth="1.5" strokeOpacity="0.4" />

            <circle cx="380" cy="340" r="110" fill="#ff007f" opacity="0.25" filter="url(#cinematicBlur)" />
            <text x="290" y="350" fill="#00f2fe" fontSize="26" fontFamily="sans-serif" fontWeight="bold" letterSpacing="6">NEO-9</text>
            <text x="310" y="380" fill="#ff007f" fontSize="14" fontFamily="monospace">OVERRIDE ACTIVE</text>

            <polygon points="0,850 800,850 800,1200 0,1200" fill="#080c18" />
            <line x1="0" y1="850" x2="800" y2="850" stroke="#00f2fe" strokeWidth="4" opacity="0.8" />
            <line x1="0" y1="890" x2="800" y2="890" stroke="#ff007f" strokeWidth="2" opacity="0.6" strokeDasharray="20 10" />

            <ellipse cx="380" cy="980" rx="220" ry="40" fill="#ff007f" opacity="0.2" />
            <ellipse cx="200" cy="1040" rx="160" ry="30" fill="#00f2fe" opacity="0.2" />
          </g>
        )}

        {/* Floating Celestial Library (Fantasy) */}
        {locationId.includes('fantasy') && (
          <g>
            <rect width="800" height="1200" fill="#0c0b1e" />
            <circle cx="400" cy="400" r="320" fill="#706fd3" opacity="0.25" filter="url(#cinematicBlur)" />
            <circle cx="500" cy="300" r="220" fill="#ffb142" opacity="0.2" filter="url(#cinematicBlur)" />

            <circle cx="400" cy="420" r="260" fill="none" stroke="#d1ccc0" strokeWidth="3" opacity="0.4" />
            <circle cx="400" cy="420" r="200" fill="none" stroke="#fbc531" strokeWidth="2" strokeDasharray="14 8" opacity="0.6" />
            <circle cx="400" cy="420" r="140" fill="none" stroke="#9c88ff" strokeWidth="1.5" opacity="0.5" />
            <line x1="140" y1="420" x2="660" y2="420" stroke="#f5cd79" strokeWidth="2" opacity="0.5" />
            <line x1="400" y1="160" x2="400" y2="680" stroke="#f5cd79" strokeWidth="2" opacity="0.5" />

            {[
              { x: 160, y: 320, rot: -22, col: '#8854d0' },
              { x: 620, y: 360, rot: 18, col: '#3867d6' },
              { x: 260, y: 220, rot: 15, col: '#f7b731' },
              { x: 560, y: 200, rot: -30, col: '#eb3b5a' }
            ].map((book, idx) => (
              <g key={idx} transform={`translate(${book.x}, ${book.y}) rotate(${book.rot})`}>
                <rect x="-30" y="-20" width="60" height="40" rx="4" fill={book.col} />
                <rect x="-26" y="-18" width="52" height="36" fill="#f5ede0" />
                <line x1="0" y1="-20" x2="0" y2="20" stroke={book.col} strokeWidth="3" />
              </g>
            ))}

            <ellipse cx="400" cy="980" rx="360" ry="140" fill="#1b173d" stroke="#fbc531" strokeWidth="3" strokeOpacity="0.5" />
            <ellipse cx="400" cy="980" rx="280" ry="100" fill="#241e4f" />
          </g>
        )}

        {/* Subtle Vignette Gradient Overlay */}
        <radialGradient id="vignetteGrad" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
        </radialGradient>
        <rect width="800" height="1200" fill="url(#vignetteGrad)" />
      </svg>
    </div>
  );
};

// Emotive Anime-style Character Sprites
export interface CharacterSpriteProps {
  name: string;
  expression: Expression | string;
  isSpeaking: boolean;
  position: CharacterPosition;
  pose?: string;
  scale?: number;
  flipX?: boolean;
  zIndex?: number;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  name,
  expression,
  isSpeaking,
  position,
  pose,
  scale,
  flipX,
  zIndex
}) => {
  const [rasterFailed, setRasterFailed] = React.useState(false);

  const sprite = React.useMemo(() => {
    return resolveCharacterSprite(name, expression, pose);
  }, [name, expression, pose]);

  React.useEffect(() => {
    setRasterFailed(false);
  }, [name, expression, pose]);

  // Positioning classes
  let posClass = 'left-1/2 -translate-x-1/2';
  if (position === 'left') posClass = 'left-[22%] sm:left-[25%] -translate-x-1/2';
  if (position === 'right') posClass = 'left-[78%] sm:left-[75%] -translate-x-1/2';
  if (position === 'foreground') posClass = 'left-1/2 -translate-x-1/2 scale-110';
  if (position === 'background') posClass = 'left-1/2 -translate-x-1/2 scale-90 opacity-80';

  // Active speaker emphasis: scale up slightly, full brightness, drop shadow; inactive: slightly dimmed
  const filterStyle = isSpeaking
    ? 'drop-shadow(0 12px 30px rgba(0,0,0,0.6)) brightness(1.05)'
    : 'brightness(0.72) contrast(0.92)';

  if (sprite && !rasterFailed) {
    const isHalfbody = sprite.id.includes('halfbody');
    const sizeClass = isHalfbody
      ? 'w-[320px] sm:w-[380px] md:w-[440px] max-w-[95%]'
      : 'w-[280px] sm:w-[330px] md:w-[380px] max-w-[90%]';

    return (
      <div
        className={`absolute bottom-0 pointer-events-none transition-all duration-500 ease-out ${sizeClass} ${posClass}`}
        style={{
          zIndex: zIndex ?? 30,
          filter: filterStyle,
          transform: `${isSpeaking ? 'translateY(-8px)' : 'translateY(0)'} ${
            scale ? `scale(${scale})` : ''
          }`
        }}
      >
        <picture className="w-full h-auto block select-none">
          <source media="(max-width: 640px)" srcSet={sprite.mobile} type="image/webp" />
          <source media="(min-width: 641px)" srcSet={sprite.production} type="image/webp" />
          <img
            src={sprite.production}
            alt={`${name} - ${expression}`}
            loading="eager"
            decoding="async"
            className={`w-full h-auto object-contain select-none pointer-events-none transition-transform duration-500 ease-out ${
              flipX ? '-scale-x-100' : ''
            }`}
            onError={() => {
              console.warn(
                `[CharacterRenderer] Missing sprite: character=${name} pose=${pose || 'default'} expression=${expression} asset=${sprite.id}`
              );
              setRasterFailed(true);
            }}
          />
        </picture>
      </div>
    );
  }

  const isNadia = name.toLowerCase().includes('nana') || name.toLowerCase().includes('nadia');
  const isMaya = name.toLowerCase().includes('maya');
  const isRaka = name.toLowerCase().includes('raka');
  const isShadow = name.toLowerCase().includes('suster') || name.toLowerCase().includes('shadow');
  const isCipher = name.toLowerCase().includes('cipher');
  const isLyra = name.toLowerCase().includes('lyra');
  const isGeneric = !isNadia && !isMaya && !isRaka && !isShadow && !isCipher && !isLyra;

  // Eye and mouth configurations based on expression
  let eyeShape = 'open';
  let eyebrowAngle = 0;
  let mouthType = 'slight_smile';
  let blush = false;
  let tears = false;

  switch (expression) {
    case 'happy':
    case 'smiling':
      eyeShape = 'crinkle';
      mouthType = 'smile';
      eyebrowAngle = -4;
      break;
    case 'sad':
      eyeShape = 'downcast';
      eyebrowAngle = 10;
      mouthType = 'frown';
      break;
    case 'crying':
      eyeShape = 'downcast';
      eyebrowAngle = 12;
      mouthType = 'tremble';
      tears = true;
      break;
    case 'embarrassed':
      eyeShape = 'averting';
      blush = true;
      mouthType = 'fidget';
      break;
    case 'romantic':
      eyeShape = 'soft';
      blush = true;
      mouthType = 'gentle';
      break;
    case 'nervous':
      eyebrowAngle = 8;
      mouthType = 'tense';
      blush = true;
      break;
    case 'surprised':
      eyeShape = 'wide';
      eyebrowAngle = -10;
      mouthType = 'open_o';
      break;
    case 'serious':
      eyebrowAngle = 6;
      mouthType = 'neutral_line';
      break;
    case 'exhausted':
      eyeShape = 'half_closed';
      eyebrowAngle = 5;
      mouthType = 'sigh';
      break;
    default:
      break;
  }

  // Active speaker emphasis: scale up slightly, full brightness, drop shadow; inactive: slightly dimmed
  const svgFilterStyle = isSpeaking
    ? 'drop-shadow(0 10px 25px rgba(0,0,0,0.5)) brightness(1.05)'
    : 'brightness(0.72) contrast(0.92)';

  return (
    <div
      className={`absolute bottom-0 w-[300px] sm:w-[350px] md:w-[420px] max-w-[95%] pointer-events-none transition-all duration-500 ease-out ${posClass}`}
      style={{
        filter: svgFilterStyle,
        transform: `${isSpeaking ? 'translateY(-8px)' : 'translateY(0)'}`
      }}
    >
      <svg
        viewBox="0 0 400 650"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="nadiaHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d2314" />
            <stop offset="60%" stopColor="#5c3822" />
            <stop offset="100%" stopColor="#7a4b2f" />
          </linearGradient>

          <linearGradient id="rakaHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e272e" />
            <stop offset="100%" stopColor="#2f3640" />
          </linearGradient>

          <linearGradient id="mayaHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c1a1d" />
            <stop offset="100%" stopColor="#593139" />
          </linearGradient>

          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffeedb" />
            <stop offset="100%" stopColor="#fcd3ba" />
          </linearGradient>

          <linearGradient id="sweaterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7f1e3" />
            <stop offset="100%" stopColor="#d1ccc0" />
          </linearGradient>

          <linearGradient id="jacketGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#353b48" />
            <stop offset="100%" stopColor="#1e272e" />
          </linearGradient>
        </defs>

        {/* NADIA SPRITE */}
        {isNadia && (
          <g>
            {/* Long hair back */}
            <path
              d="M130,220 C110,340 100,450 120,530 C130,550 170,550 180,500 C160,420 150,330 160,250 Z"
              fill="url(#nadiaHair)"
            />
            <path
              d="M270,220 C290,340 300,450 280,530 C270,550 230,550 220,500 C240,420 250,330 240,250 Z"
              fill="url(#nadiaHair)"
            />

            {/* Neck & Collarbone */}
            <path d="M185,250 L215,250 L220,310 L180,310 Z" fill="url(#skinGrad)" />

            {/* Knitted Cozy Sweater Shoulders & Torso */}
            <path
              d="M140,310 C100,340 80,440 70,650 L330,650 C320,440 300,340 260,310 C240,330 160,330 140,310 Z"
              fill="url(#sweaterGrad)"
            />
            {/* Muted Burgundy Wool Scarf */}
            <path
              d="M150,290 C180,320 220,320 250,290 C265,315 255,360 240,370 C200,380 180,360 170,390 L150,360 C140,330 145,305 150,290 Z"
              fill="#833446"
            />
            <path d="M175,340 L195,470 L225,465 L210,340 Z" fill="#6d2b3a" />

            {/* Head & Chin */}
            <path
              d="M150,190 C145,240 170,280 200,285 C230,280 255,240 250,190 C250,130 150,130 150,190 Z"
              fill="url(#skinGrad)"
            />

            {/* Soft Blush on Cheeks */}
            {blush && (
              <g>
                <ellipse cx="165" cy="225" rx="14" ry="7" fill="#ff7675" opacity="0.5" />
                <ellipse cx="235" cy="225" rx="14" ry="7" fill="#ff7675" opacity="0.5" />
              </g>
            )}

            {/* Eyes */}
            <g>
              {eyeShape === 'crinkle' ? (
                <>
                  <path d="M160,205 Q172,195 184,205" fill="none" stroke="#2d3436" strokeWidth="3" strokeLinecap="round" />
                  <path d="M216,205 Q228,195 240,205" fill="none" stroke="#2d3436" strokeWidth="3" strokeLinecap="round" />
                </>
              ) : (
                <>
                  {/* Left Eye */}
                  <ellipse cx="172" cy="205" rx="10" ry="12" fill="#3d2314" />
                  <circle cx="170" cy="202" r="3.5" fill="#fff" />
                  <circle cx="175" cy="209" r="1.5" fill="#fff" opacity="0.8" />
                  <path d="M160,196 Q172,190 184,196" fill="none" stroke="#1e272e" strokeWidth="2.5" />

                  {/* Right Eye */}
                  <ellipse cx="228" cy="205" rx="10" ry="12" fill="#3d2314" />
                  <circle cx="226" cy="202" r="3.5" fill="#fff" />
                  <circle cx="231" cy="209" r="1.5" fill="#fff" opacity="0.8" />
                  <path d="M216,196 Q228,190 240,196" fill="none" stroke="#1e272e" strokeWidth="2.5" />
                </>
              )}
            </g>

            {/* Tears */}
            {tears && (
              <g>
                <ellipse cx="166" cy="218" rx="3" ry="5" fill="#74b9ff" opacity="0.8" />
                <ellipse cx="234" cy="218" rx="3" ry="5" fill="#74b9ff" opacity="0.8" />
              </g>
            )}

            {/* Eyebrows */}
            <g style={{ transform: `rotate(${eyebrowAngle}deg)`, transformOrigin: '200px 185px' }}>
              <path d="M162,188 Q174,182 184,187" fill="none" stroke="#3d2314" strokeWidth="2" strokeLinecap="round" />
              <path d="M216,187 Q226,182 238,188" fill="none" stroke="#3d2314" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Nose */}
            <path d="M200,215 L198,225 L203,225" fill="none" stroke="#d6a282" strokeWidth="1.5" />

            {/* Mouth */}
            <g>
              {mouthType === 'smile' && (
                <path d="M190,245 Q200,258 210,245" fill="#c0392b" stroke="#7e1f1f" strokeWidth="1.2" />
              )}
              {mouthType === 'frown' && (
                <path d="M192,250 Q200,242 208,250" fill="none" stroke="#7e1f1f" strokeWidth="1.8" />
              )}
              {mouthType === 'open_o' && (
                <ellipse cx="200" cy="248" rx="5" ry="7" fill="#c0392b" />
              )}
              {mouthType !== 'smile' && mouthType !== 'frown' && mouthType !== 'open_o' && (
                <path d="M193,247 Q200,251 207,247" fill="none" stroke="#7e1f1f" strokeWidth="1.5" />
              )}
            </g>

            {/* Soft Bangs & Front Hair */}
            <path
              d="M140,180 C150,110 250,110 260,180 C245,160 215,185 200,165 C185,185 155,160 140,180 Z"
              fill="url(#nadiaHair)"
            />
            {/* Side strand framing face */}
            <path d="M142,175 C138,220 145,260 152,280 C150,260 144,220 148,175 Z" fill="url(#nadiaHair)" />
            <path d="M258,175 C262,220 255,260 248,280 C250,260 256,220 252,175 Z" fill="url(#nadiaHair)" />
          </g>
        )}

        {/* RAKA SPRITE */}
        {isRaka && (
          <g>
            {/* Dark Hair Base */}
            <path
              d="M135,175 C130,90 270,90 265,175 C260,200 240,150 200,160 C160,150 140,200 135,175 Z"
              fill="url(#rakaHair)"
            />

            {/* Neck */}
            <path d="M180,240 L220,240 L225,300 L175,300 Z" fill="url(#skinGrad)" />

            {/* Charcoal Jacket & Shirt */}
            <path
              d="M120,300 C80,340 60,450 50,650 L350,650 C340,450 320,340 280,300 C250,330 150,330 120,300 Z"
              fill="url(#jacketGrad)"
            />
            {/* Inner White Shirt */}
            <polygon points="180,300 220,300 210,410 190,410" fill="#f8f9fa" />

            {/* Head & Jawline */}
            <path
              d="M145,180 C145,235 170,275 200,280 C230,275 255,235 255,180 C255,120 145,120 145,180 Z"
              fill="url(#skinGrad)"
            />

            {/* Eyes */}
            <ellipse cx="170" cy="198" rx="8" ry="10" fill="#1e272e" />
            <circle cx="168" cy="195" r="3" fill="#fff" />
            <path d="M160,190 L180,190" stroke="#000" strokeWidth="2.5" />

            <ellipse cx="230" cy="198" rx="8" ry="10" fill="#1e272e" />
            <circle cx="228" cy="195" r="3" fill="#fff" />
            <path d="M220,190 L240,190" stroke="#000" strokeWidth="2.5" />

            {/* Eyebrows */}
            <path d="M160,180 L182,183" stroke="#1e272e" strokeWidth="3" strokeLinecap="round" />
            <path d="M218,183 L240,180" stroke="#1e272e" strokeWidth="3" strokeLinecap="round" />

            {/* Mouth */}
            <path d="M192,242 L208,242" stroke="#634a41" strokeWidth="2" strokeLinecap="round" />

            {/* Stylish messy bangs */}
            <path
              d="M140,160 C150,130 180,170 200,145 C220,170 250,130 260,160 C250,175 230,170 215,185 C205,170 185,170 175,185 C160,170 145,175 140,160 Z"
              fill="url(#rakaHair)"
            />
          </g>
        )}

        {/* MAYA SPRITE */}
        {isMaya && (
          <g>
            {/* Bob Hair */}
            <path
              d="M135,180 C130,110 270,110 265,180 C270,260 255,290 245,280 C235,220 235,170 200,160 C165,170 165,220 155,280 C145,290 130,260 135,180 Z"
              fill="url(#mayaHair)"
            />

            {/* Neck */}
            <path d="M185,250 L215,250 L218,310 L182,310 Z" fill="url(#skinGrad)" />

            {/* Modern Chic Blazer */}
            <path
              d="M130,310 C90,350 75,440 65,650 L335,650 C325,440 310,350 270,310 Z"
              fill="#2c3e50"
            />

            {/* Head */}
            <path
              d="M150,185 C150,235 170,275 200,280 C230,275 250,235 250,185 C250,125 150,125 150,185 Z"
              fill="url(#skinGrad)"
            />

            {/* Eyes */}
            <ellipse cx="174" cy="202" rx="9" ry="11" fill="#4a2328" />
            <circle cx="172" cy="199" r="3.2" fill="#fff" />
            <path d="M162,192 Q174,187 186,192" stroke="#1e272e" strokeWidth="2.5" />

            <ellipse cx="226" cy="202" rx="9" ry="11" fill="#4a2328" />
            <circle cx="224" cy="199" r="3.2" fill="#fff" />
            <path d="M214,192 Q226,187 238,192" stroke="#1e272e" strokeWidth="2.5" />

            {/* Playful smile */}
            <path d="M192,243 Q200,253 208,243" stroke="#b33939" strokeWidth="2" fill="none" />
          </g>
        )}

        {/* SUSTER RATIH (HORROR) */}
        {isShadow && (
          <g>
            <path d="M120,130 C120,80 280,80 280,130 C300,320 310,480 320,650 L80,650 C90,480 100,320 120,130 Z" fill="#0d1414" opacity="0.95" />
            <path d="M140,240 L260,240 L280,650 L120,650 Z" fill="#141f1f" />
            <polygon points="160,110 240,110 250,150 150,150" fill="#2d3736" />
            <line x1="200" y1="120" x2="200" y2="140" stroke="#c0392b" strokeWidth="4" />
            <line x1="190" y1="130" x2="210" y2="130" stroke="#c0392b" strokeWidth="4" />
            <path d="M150,160 C145,225 170,270 200,275 C230,270 255,225 250,160 C250,110 150,110 150,160 Z" fill="#889895" />
            <ellipse cx="172" cy="195" rx="8" ry="10" fill="#060908" />
            <circle cx="172" cy="195" r="3" fill="#ff4757" opacity="0.9" />
            <ellipse cx="228" cy="195" rx="8" ry="10" fill="#060908" />
            <circle cx="228" cy="195" r="3" fill="#ff4757" opacity="0.9" />
            <line x1="172" y1="205" x2="170" y2="235" stroke="#101716" strokeWidth="2" />
            <line x1="228" y1="205" x2="230" y2="235" stroke="#101716" strokeWidth="2" />
            <ellipse cx="200" cy="245" rx="7" ry="10" fill="#0a0f0e" />
          </g>
        )}

        {/* CIPHER (CYBERPUNK) */}
        {isCipher && (
          <g>
            <path d="M110,290 C70,330 50,440 40,650 L360,650 C350,440 330,330 290,290 C250,330 150,330 110,290 Z" fill="#0d111a" stroke="#00f2fe" strokeWidth="2" />
            <polygon points="175,290 225,290 220,440 180,440" fill="#1e272e" />
            <line x1="80" y1="420" x2="140" y2="420" stroke="#ff007f" strokeWidth="4" />
            <line x1="260" y1="420" x2="320" y2="420" stroke="#00f2fe" strokeWidth="4" />
            <path d="M130,165 C120,90 280,90 270,165 C285,150 250,110 200,120 C150,110 115,150 130,165 Z" fill="#2d3436" />
            <polygon points="120,130 160,80 180,130" fill="#00f2fe" opacity="0.8" />
            <polygon points="220,130 240,75 270,135" fill="#ff007f" opacity="0.8" />
            <path d="M145,175 C145,230 170,270 200,275 C230,270 255,230 255,175 C255,120 145,120 145,175 Z" fill="#fcd3ba" />
            <rect x="150" y="180" width="100" height="28" rx="6" fill="#00f2fe" fillOpacity="0.85" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="150" y1="194" x2="250" y2="194" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
            <path d="M190,240 L210,240" stroke="#4b3832" strokeWidth="2.5" />
          </g>
        )}

        {/* LYRA (FANTASY) */}
        {isLyra && (
          <g>
            <path d="M110,180 C80,340 70,480 90,620 C110,660 170,660 180,580 C150,480 140,360 150,230 Z" fill="#dcdde1" />
            <path d="M290,180 C320,340 330,480 310,620 C290,660 230,660 220,580 C250,480 260,360 250,230 Z" fill="#dcdde1" />
            <path d="M130,290 C90,340 75,440 65,650 L335,650 C325,440 310,340 270,290 C240,320 160,320 130,290 Z" fill="#2c2c54" stroke="#fbc531" strokeWidth="2" />
            <circle cx="200" cy="330" r="14" fill="#f5cd79" stroke="#fff" strokeWidth="2" />
            <path d="M150,180 C145,235 170,275 200,280 C230,275 255,235 250,180 C250,120 150,120 150,180 Z" fill="#fff5eb" />
            <ellipse cx="172" cy="200" rx="9" ry="12" fill="#786fa6" />
            <circle cx="172" cy="200" r="4" fill="#f5cd79" />
            <circle cx="170" cy="197" r="1.5" fill="#fff" />
            <ellipse cx="228" cy="200" rx="9" ry="12" fill="#786fa6" />
            <circle cx="228" cy="200" r="4" fill="#f5cd79" />
            <circle cx="226" cy="197" r="1.5" fill="#fff" />
            <polygon points="200,145 204,155 215,155 206,162 209,172 200,166 191,172 194,162 185,155 196,155" fill="#fbc531" />
            <path d="M192,244 Q200,252 208,244" stroke="#b33939" strokeWidth="2" fill="none" />
          </g>
        )}

        {/* GENERIC FALLBACK CHARACTER */}
        {isGeneric && (
          <g>
            <path d="M135,175 C130,90 270,90 265,175 C260,200 240,150 200,160 C160,150 140,200 135,175 Z" fill="#353b48" />
            <path d="M120,300 C80,340 60,450 50,650 L350,650 C340,450 320,340 280,300 Z" fill="#2f3640" />
            <path d="M145,180 C145,235 170,275 200,280 C230,275 255,235 255,180 C255,120 145,120 145,180 Z" fill="#ffeedb" />
            <ellipse cx="170" cy="198" rx="8" ry="10" fill="#1e272e" />
            <circle cx="168" cy="195" r="3" fill="#fff" />
            <ellipse cx="230" cy="198" rx="8" ry="10" fill="#1e272e" />
            <circle cx="228" cy="195" r="3" fill="#fff" />
            <path d="M192,242 L208,242" stroke="#634a41" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};

// Cinematic Action CGs for high-impact story moments
export const ActionCGView: React.FC<{ cgId: string }> = ({ cgId }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center animate-fade-in">
      <svg
        viewBox="0 0 800 1200"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cgVignette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050811" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#000000" stopOpacity="0" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#050811" stopOpacity="0.95" />
          </linearGradient>

          <radialGradient id="umbrellaGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffeaa7" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#d63031" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* CG 1: Umbrella in the Rain (Two people close under one umbrella) */}
        {cgId.includes('umbrella') && (
          <g>
            <rect width="800" height="1200" fill="#090e1a" />
            <circle cx="400" cy="350" r="380" fill="url(#umbrellaGlow)" />

            {/* Transparent Umbrella Dome with Rain Streaks */}
            <path
              d="M100,420 Q400,180 700,420 Q550,450 400,450 Q250,450 100,420 Z"
              fill="#ffffff"
              fillOpacity="0.2"
              stroke="#dfe6e9"
              strokeWidth="4"
            />
            {/* Umbrella ribs */}
            <path d="M400,240 Q400,345 400,450" stroke="#b2bec3" strokeWidth="2.5" />
            <path d="M400,240 Q250,335 210,435" stroke="#b2bec3" strokeWidth="2" />
            <path d="M400,240 Q550,335 590,435" stroke="#b2bec3" strokeWidth="2" />
            {/* Umbrella Shaft */}
            <line x1="400" y1="240" x2="400" y2="780" stroke="#636e72" strokeWidth="8" />

            {/* Silhouettes of two people standing intimately close */}
            {/* Nadia silhouette */}
            <path
              d="M260,520 C230,550 210,650 200,900 L380,900 C390,750 370,600 350,530 C330,480 280,480 260,520 Z"
              fill="#181e2b"
            />
            {/* Nadia Hair outline highlighted by light */}
            <path
              d="M250,490 Q220,580 230,700 Q260,700 270,620 Q280,510 250,490 Z"
              fill="#2d3436"
              opacity="0.8"
            />

            {/* Raka silhouette */}
            <path
              d="M380,480 C360,520 340,650 330,900 L560,900 C550,700 530,560 480,490 C450,450 400,450 380,480 Z"
              fill="#111622"
            />

            {/* Shared umbrella handle: Two hands touching gently */}
            <ellipse cx="400" cy="740" rx="35" ry="25" fill="#fcd3ba" opacity="0.85" />
            <path d="M375,730 Q400,720 425,735" stroke="#e17055" strokeWidth="2" />

            {/* Raindrops around outside umbrella */}
            <g stroke="#ffffff" strokeWidth="1.8" opacity="0.4">
              {[80, 140, 220, 310, 480, 570, 680, 740].map((rx, idx) => (
                <line key={idx} x1={rx} y1="120 + idx*40" x2={rx - 15} y2="220 + idx*40" />
              ))}
            </g>
          </g>
        )}

        {/* CG 2: Old Polaroid Photograph Resting on Book */}
        {cgId.includes('photo') && (
          <g>
            <rect width="800" height="1200" fill="#141110" />

            {/* Warm table glow */}
            <circle cx="400" cy="600" r="320" fill="url(#umbrellaGlow)" opacity="0.6" />

            {/* Open Book Pages */}
            <polygon points="120,400 680,380 720,860 80,880" fill="#2d261e" />
            <polygon points="140,410 400,430 395,850 110,840" fill="#f5ede0" />
            <polygon points="400,430 660,400 690,830 395,850" fill="#ede2d0" />
            {/* Book text lines simulated */}
            <g stroke="#b8a892" strokeWidth="2.5" opacity="0.5">
              <line x1="160" y1="460" x2="360" y2="465" />
              <line x1="160" y1="490" x2="350" y2="495" />
              <line x1="160" y1="520" x2="370" y2="525" />
              <line x1="160" y1="550" x2="330" y2="555" />
            </g>

            {/* The Polaroid Photograph lying across the pages */}
            <g transform="rotate(-6 400 620)">
              {/* White Polaroid frame */}
              <rect x="230" y="440" width="340" height="420" rx="8" fill="#ffffff" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.8))" />
              {/* Sepia Photo image inside */}
              <rect x="255" y="465" width="290" height="290" fill="#4a3728" />
              {/* Image content: two smiling figures by the beach twilight */}
              <ellipse cx="400" cy="620" rx="145" ry="60" fill="#d35400" opacity="0.6" />
              <circle cx="360" cy="550" r="28" fill="#fcd3ba" />
              <path d="M335,580 Q360,560 385,580 L385,670 L335,670 Z" fill="#2c3e50" />
              <circle cx="430" cy="560" r="26" fill="#fcd3ba" />
              <path d="M405,586 Q430,570 455,586 L455,670 L405,670 Z" fill="#c0392b" />

              {/* Handwritten text at bottom of Polaroid */}
              <text x="270" y="805" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#57606f">
                "Pantai Senja, 14 Juli — Jangan lupa."
              </text>
            </g>
          </g>
        )}

        {/* CG 3: Smartphone Glow at 2 AM */}
        {cgId.includes('phone') && (
          <g>
            <rect width="800" height="1200" fill="#080b12" />

            {/* Blue-ish phone screen glow onto reader's hand */}
            <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#74b9ff" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#0984e3" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <circle cx="400" cy="600" r="350" fill="url(#screenGlow)" />

            {/* Smartphone Body */}
            <rect x="220" y="280" width="360" height="660" rx="42" fill="#1e272e" stroke="#485460" strokeWidth="6" />
            {/* Screen Glass */}
            <rect x="235" y="300" width="330" height="620" rx="30" fill="#0d131f" />

            {/* Status bar */}
            <text x="260" y="340" fill="#ffffff" fontSize="16" fontFamily="sans-serif">02:14</text>

            {/* Chat bubble header */}
            <circle cx="280" cy="420" r="26" fill="#833446" />
            <text x="274" y="427" fill="#fff" fontSize="20" fontWeight="bold">N</text>
            <text x="320" y="418" fill="#ffffff" fontSize="20" fontWeight="bold">Nana</text>
            <text x="320" y="438" fill="#a4b0be" fontSize="14">Online</text>

            {/* Incoming message bubble */}
            <rect x="260" y="490" width="280" height="120" rx="18" fill="#1e272e" />
            <text x="280" y="530" fill="#ffffff" fontSize="18" fontFamily="sans-serif">
              "Kamu masih bangun?"
            </text>
            <text x="280" y="565" fill="#dfe4ea" fontSize="16" fontFamily="sans-serif">
              "Aku kepikiran omonganmu"
            </text>
            <text x="280" y="590" fill="#dfe4ea" fontSize="16" fontFamily="sans-serif">
              "tadi sore di halte..."
            </text>
            <text x="490" y="600" fill="#747d8c" fontSize="12">02:14</text>
          </g>
        )}

        {/* CG 4: Hands touching across coffee table */}
        {cgId.includes('hands') && (
          <g>
            <rect width="800" height="1200" fill="#1a120c" />
            <circle cx="400" cy="600" r="300" fill="url(#umbrellaGlow)" opacity="0.75" />

            {/* Polished wooden table */}
            <rect x="50" y="300" width="700" height="650" fill="#352115" rx="20" />

            {/* Coffee cup */}
            <circle cx="240" cy="550" r="60" fill="#f5f6fa" />
            <circle cx="240" cy="550" r="48" fill="#382216" />

            {/* Two hands gently meeting in center */}
            {/* Nadia's delicate hand from top-left */}
            <path
              d="M180,320 L280,480 C320,530 360,560 410,560 C420,555 425,540 405,530 C360,510 320,460 260,300 Z"
              fill="#fcd3ba"
            />
            {/* Raka's hand from bottom-right */}
            <path
              d="M620,850 L480,630 C450,590 410,570 380,575 C370,585 375,600 400,610 C440,630 480,720 540,880 Z"
              fill="#f7c8ac"
            />
            {/* Touch point highlight */}
            <circle cx="395" cy="565" r="16" fill="#ffeaa7" opacity="0.6" filter="blur(6px)" />
          </g>
        )}

        {/* Top/Bottom Cinematic Vignette */}
        <rect width="800" height="1200" fill="url(#cgVignette)" />
      </svg>
    </div>
  );
};
