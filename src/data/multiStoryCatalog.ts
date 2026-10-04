import type { StoryDefinition } from '../types/story';
import { STORY_SCENES as ROMANCE_SCENES, ENDINGS_CATALOG as ROMANCE_ENDINGS } from './storyContent';

export const STORY_CATALOG: Record<string, StoryDefinition> = {
  romance_rain: {
    id: 'romance_rain',
    title: 'Hujan yang Tak Pernah Usai',
    subtitle: 'Until the Rain Clears',
    genre: 'romance',
    synopsis: 'Pertemuan kembali setelah dua tahun berlalu di kafe yang sama saat gerimis sore turun. Bisakah rasa percaya yang patah disatukan kembali?',
    firstSceneId: 'ch1_intro_1',
    visualBible: {
      artStyle: 'cinematic illustrated',
      renderStyle: 'semi-realistic anime',
      colorLanguage: 'warm muted tones & amber glow',
      lightingLanguage: 'soft natural lighting & cafe pendant glow',
      cameraLanguage: 'slow_push',
      particleLanguage: 'rain',
      uiLanguage: 'minimal_warm',
      soundLanguage: 'intimate_lofi'
    },
    scenes: ROMANCE_SCENES,
    endings: ROMANCE_ENDINGS
  },

  horror_ward: {
    id: 'horror_ward',
    title: 'Bangsal Terlarang',
    subtitle: 'The Whispering Ward',
    genre: 'horror',
    synopsis: 'Tersesat di lantai empat rumah sakit jiwa yang terbengkalai sejak 1994. Sesuatu di kegelapan menunggumu membuat pilihan fatal.',
    firstSceneId: 'horror_intro_1',
    visualBible: {
      artStyle: 'dark atmospheric illustration',
      renderStyle: 'low-key gritty realism',
      colorLanguage: 'decayed greens, cold charcoal & crimson',
      lightingLanguage: 'flickering fluorescent & deep directional shadows',
      cameraLanguage: 'shake',
      particleLanguage: 'fog',
      uiLanguage: 'dark_grit',
      soundLanguage: 'dark_drone'
    },
    endings: {
      horror_true: {
        id: 'horror_true',
        title: 'Kebenaran di Kamar 404',
        type: 'true',
        tagline: 'True Ending — Rekaman Terakhir Ditemukan',
        poem: 'Jeritan itu berhenti bukan karena bayangan pergi, melainkan karena kamu akhirnya berani mendengarkan apa yang mereka tangisi.',
        summary: 'Kamu berhasil memecahkan teka-teki rekaman medis dan keluar dari bangsal sebelum fajar menyingsing.',
        unlockedCondition: 'Mempertahankan rasa tenang (Fear < 3) dan menolak godaan kabur tanpa bukti.'
      },
      horror_escape: {
        id: 'horror_escape',
        title: 'Lari ke Alam Terang',
        type: 'escape',
        tagline: 'Escape Ending — Selamat Namun Dihantui',
        poem: 'Pintu darurat terbuka dan udara malam menyambutmu. Tapi bayangan di jendela lantai empat tetap menatap langkahmu pulang.',
        summary: 'Kamu berhasil meloloskan diri dengan selamat, meski misteri di bangsal itu terkubur selamanya.',
        unlockedCondition: 'Memilih rute tangga darurat saat kepanikan memuncak.'
      }
    },
    scenes: {
      horror_intro_1: {
        id: 'horror_intro_1',
        chapterId: 'h_ch1',
        chapterTitle: 'Malam Terkutuk · Lantai 4',
        progressPercent: 10,
        location: {
          id: 'hospital_corridor',
          name: 'Koridor Bangsal Mawar · 03:12 AM',
          time: 'midnight',
          weather: 'fog',
          mood: 'horror'
        },
        characters: [],
        speaker: null,
        text: 'Lampu darurat berwarna merah kusam berkedip lemah di ujung lorong berlumut. Bau karat dan air hujan merembes dari langit-langit yang runtuh.',
        subText: 'The emergency red lamp flickered weakly down the mossy abandoned corridor.',
        emotionalIntensity: 0.7,
        cameraAction: 'drift',
        nextSceneId: 'horror_intro_2',
        soundEffect: 'whisper',
        ambientTrack: 'dark_hospital'
      },

      horror_intro_2: {
        id: 'horror_intro_2',
        chapterId: 'h_ch1',
        chapterTitle: 'Malam Terkutuk · Lantai 4',
        progressPercent: 25,
        location: {
          id: 'hospital_corridor',
          name: 'Pintu Kamar 404',
          time: 'midnight',
          weather: 'fog',
          mood: 'horror'
        },
        characters: [],
        speaker: null,
        text: 'Sebuah alat perekam kaset tua tergeletak di atas ranjang dorong yang berkarat. Di depannya, pintu Kamar 404 terbuka selebar beberapa senti.',
        emotionalIntensity: 0.8,
        cameraAction: 'slow_push',
        soundEffect: 'static',
        diegeticItem: {
          id: 'tape_recorder_404',
          type: 'recorder',
          title: 'Rekaman Suara Pasien 14',
          snippet: 'Pita kaset berlabel "Jangan Didengarkan Sendirian"',
          content: {
            sender: 'Dr. Aris (Psikiater Jaga)',
            timestamp: '14 Okt 1994, 23:40',
            body: '“Pasien 14 terus menatap dinding kosong. Dia bilang ada orang yang berjalan di cermin saat lampu padam. Tunggu... siapa di belakangku—” (Suara statis tajam memotong)',
            extraNote: 'Kaset berhenti berputar secara mendadak.'
          },
          flagToUnlock: 'listened_tape_404'
        },
        nextSceneId: 'horror_shadow_appears'
      },

      horror_shadow_appears: {
        id: 'horror_shadow_appears',
        chapterId: 'h_ch1',
        chapterTitle: 'Malam Terkutuk · Lantai 4',
        progressPercent: 45,
        location: {
          id: 'hospital_corridor',
          name: 'Lorong Berkedip',
          time: 'midnight',
          weather: 'fog',
          mood: 'tension'
        },
        characters: [
          {
            id: 'shadow_figure',
            name: 'Suster Ratih',
            expression: 'menacing',
            position: 'center',
            isSpeaking: true
          }
        ],
        speaker: 'Suster Ratih',
        text: '“Kamu... bukan dokter di sini,” bisik sosok berbaju perawat kusam yang berdiri mematung di balik bayangan pintu. Matanya menatap lurus menembus dirimu.',
        emotionalIntensity: 0.9,
        cameraAction: 'shake',
        soundEffect: 'heartbeat',
        choices: [
          {
            id: 'h_choice_recorder',
            text: 'Tunjukkan kaset rekaman: “Aku ke sini mencari Dr. Aris! Apa yang terjadi padanya?!”',
            subtext: 'Menghadapi sosok itu dengan bukti',
            nextSceneId: 'horror_confront_scene',
            effects: { suspicion: -2, fear: 1 },
            setFlags: ['confronted_nurse'],
            cameraCue: 'slow_push'
          },
          {
            id: 'h_choice_run',
            text: 'Putar badan dan lari sekuat tenaga menuju tangga darurat!',
            subtext: 'Pilihan naluri bertahan hidup',
            nextSceneId: 'horror_run_scene',
            effects: { fear: 3 },
            cameraCue: 'shake'
          }
        ]
      },

      horror_confront_scene: {
        id: 'horror_confront_scene',
        chapterId: 'h_ch1',
        chapterTitle: 'Malam Terkutuk · Lantai 4',
        progressPercent: 85,
        location: {
          id: 'hospital_corridor',
          name: 'Pintu Keluar Rahasia',
          time: 'midnight',
          weather: 'fog',
          mood: 'horror'
        },
        characters: [
          {
            id: 'shadow_figure',
            name: 'Suster Ratih',
            expression: 'sad',
            position: 'center',
            isSpeaking: true
          }
        ],
        speaker: 'Suster Ratih',
        text: 'Sosok itu terdiam. Air mata gelap mengalir di pipinya saat melihat nama Dr. Aris di kaset. Ia perlahan menunjuk ke arah kunci pintu keluar di dinding.',
        emotionalIntensity: 0.6,
        cameraAction: 'drift',
        nextSceneId: 'horror_true_ending_scene'
      },

      horror_run_scene: {
        id: 'horror_run_scene',
        chapterId: 'h_ch1',
        chapterTitle: 'Malam Terkutuk · Tangga Darurat',
        progressPercent: 85,
        location: {
          id: 'hospital_corridor',
          name: 'Pintu Darurat',
          time: 'midnight',
          weather: 'fog',
          mood: 'tension'
        },
        characters: [],
        speaker: null,
        text: 'Napasmu memburu di tangga semen yang dingin. Kamu menabrak pintu darurat berpalang besi hingga terhempas ke luar halaman rumah sakit yang basah.',
        emotionalIntensity: 0.85,
        cameraAction: 'shake',
        soundEffect: 'door',
        nextSceneId: 'horror_escape_ending_scene'
      },

      horror_true_ending_scene: {
        id: 'horror_true_ending_scene',
        chapterId: 'epilogue',
        chapterTitle: 'Epilog · Kebenaran Terkuak',
        progressPercent: 100,
        location: {
          id: 'hospital_corridor',
          name: 'Halaman Luar Bangsal',
          time: 'morning',
          weather: 'clear',
          mood: 'peaceful'
        },
        characters: [],
        speaker: null,
        text: 'Saat fajar pertama menembus kabut, kamu melangkah keluar membawa seluruh dokumen rahasia. Teror puluhan tahun di Bangsal Mawar akhirnya selesai.',
        endingId: 'horror_true',
        soundEffect: 'chime'
      },

      horror_escape_ending_scene: {
        id: 'horror_escape_ending_scene',
        chapterId: 'epilogue',
        chapterTitle: 'Epilog · Melarikan Diri',
        progressPercent: 100,
        location: {
          id: 'hospital_corridor',
          name: 'Jalan Raya Berkabut',
          time: 'morning',
          weather: 'fog',
          mood: 'sadness'
        },
        characters: [],
        speaker: null,
        text: 'Kamu berhasil kabur dengan nyawa selamat. Namun setiap kali memejamkan mata di malam hari, kamu masih mendengar suara rekaman dari Kamar 404.',
        endingId: 'horror_escape',
        soundEffect: 'chime'
      }
    }
  },

  cyber_neon: {
    id: 'cyber_neon',
    title: 'Neon Protocol: Sector 9',
    subtitle: 'Cyberpunk Noir',
    genre: 'cyberpunk',
    synopsis: 'Hujan asam membasahi jembatan kaca Sektor 9. Sebuah chip memori terenkripsi milik sindikat Arasaka ada di tanganmu. Siapa yang akan kamu percaya?',
    firstSceneId: 'cyber_intro_1',
    visualBible: {
      artStyle: 'neon futuristic noir',
      renderStyle: 'high contrast cel-shaded',
      colorLanguage: 'electric cyan, magenta & rainy asphalt black',
      lightingLanguage: 'holographic signs & neon reflections',
      cameraLanguage: 'dynamic',
      particleLanguage: 'glitch',
      uiLanguage: 'neon_hud',
      soundLanguage: 'synthwave'
    },
    endings: {
      cyber_true: {
        id: 'cyber_true',
        title: 'System Overwrite',
        type: 'true',
        tagline: 'True Ending — Data Publik Terbuka',
        poem: 'Layar-layar raksasa di seluruh kota memancarkan kebenaran. Sindikat runtuh bukan oleh peluru, melainkan oleh satu baris kode yang tak terbendung.',
        summary: 'Kamu dan Cipher berhasil mengunggah data korupsi ke satelit terbuka. Kota Neo-Jakarta terbebas dari monopoli energi.',
        unlockedCondition: 'Rasa percaya (Trust >= 4) dan menggunakan terminal dekripsi secara tepat.'
      },
      cyber_ghost: {
        id: 'cyber_ghost',
        title: 'Menghilang di Balik Jaringan',
        type: 'escape',
        tagline: 'Ghost Ending — Bayangan Baru di Sektor 9',
        poem: 'Nama barumu tak tercatat di basis data mana pun. Kamu menjadi mitos yang berbisik di antara kabel fiber optik bawah tanah.',
        summary: 'Kamu memilih menghapus identitasmu dan hidup sebagai hantu digital tak tersentuh hukum korporasi.',
        unlockedCondition: 'Memilih rute stealth mandiri tanpa sekutu.'
      }
    },
    scenes: {
      cyber_intro_1: {
        id: 'cyber_intro_1',
        chapterId: 'c_ch1',
        chapterTitle: 'Protokol Darurat · Sektor 9',
        progressPercent: 15,
        location: {
          id: 'cyber_bridge',
          name: 'Jembatan Neon Sektor 9 · 23:45',
          time: 'night',
          weather: 'rain',
          mood: 'cyber'
        },
        characters: [],
        speaker: null,
        text: 'Hujan asam mendesis di atas jaket tahan airmu. Iklan hologram raksasa memantulkan pendar sian dan magenta di permukaan kaca trotoar yang basah.',
        subText: 'Acid rain hissed against the neon pavement of Sector 9.',
        emotionalIntensity: 0.5,
        cameraAction: 'drift',
        nextSceneId: 'cyber_datapad_scene',
        ambientTrack: 'cyber_sector',
        soundEffect: 'glitch'
      },

      cyber_datapad_scene: {
        id: 'cyber_datapad_scene',
        chapterId: 'c_ch1',
        chapterTitle: 'Protokol Darurat · Sektor 9',
        progressPercent: 35,
        location: {
          id: 'cyber_bridge',
          name: 'Terminal Enkripsi Sektor 9',
          time: 'night',
          weather: 'rain',
          mood: 'cyber'
        },
        characters: [],
        speaker: null,
        text: 'Cyber-datapad di lengan kirimu berdengung bergetar. Sebuah payload data curian meminta verifikasi neural sebelum drone pelacak korporasi mengunci sinyalmu.',
        emotionalIntensity: 0.7,
        cameraAction: 'slow_push',
        diegeticItem: {
          id: 'cyber_terminal_payload',
          type: 'terminal',
          title: 'NEURAL DATAPAD v4.1',
          snippet: 'Payload Terenkripsi: PROJECT_AEGIS.enc',
          content: {
            sender: 'Cipher (Hacker Anonim)',
            timestamp: 'SYS_TIME: 23:45:12 UTC',
            body: '“Sinyalmu terdeteksi dua drone Arasaka di perimeter 200m! Segera bypass port 8080 atau mereka akan meledakkan jembatan!”',
            extraNote: 'Status Firewall: 87% Ditembus'
          },
          flagToUnlock: 'read_cyber_terminal'
        },
        nextSceneId: 'cyber_cipher_arrives'
      },

      cyber_cipher_arrives: {
        id: 'cyber_cipher_arrives',
        chapterId: 'c_ch1',
        chapterTitle: 'Protokol Darurat · Sektor 9',
        progressPercent: 60,
        location: {
          id: 'cyber_bridge',
          name: 'Pertemuan di Haluan Menara',
          time: 'night',
          weather: 'rain',
          mood: 'tension'
        },
        characters: [
          {
            id: 'cipher_hacker',
            name: 'Cipher',
            expression: 'serious',
            position: 'center',
            isSpeaking: true
          }
        ],
        speaker: 'Cipher',
        text: '“Cepat serahkan datapad-nya, kita punya 60 detik sebelum radar menara menyapu area ini!” teriak Cipher sambil mencabut kabel neural dari visor holografisnya.',
        emotionalIntensity: 0.85,
        cameraAction: 'shake',
        choices: [
          {
            id: 'c_trust_cipher',
            text: 'Tautkan kabel neural: “Bypass jaringannya bersama, Cipher. Biar semua orang tahu apa yang mereka sembunyikan!”',
            subtext: 'Bekerja sama membobol jaringan inti',
            nextSceneId: 'cyber_true_ending_scene',
            effects: { trust: 4, respect: 3 },
            cameraCue: 'slow_push'
          },
          {
            id: 'c_solo_ghost',
            text: '“Maaf, Cipher. Mulai malam ini aku menghilang sendiri.” Putuskan sinyal dan lompat ke kabel gantung jalur bawah tanah!',
            subtext: 'Memilih rute pelarian mandiri',
            nextSceneId: 'cyber_ghost_ending_scene',
            effects: { suspicion: 3 },
            cameraCue: 'shake'
          }
        ]
      },

      cyber_true_ending_scene: {
        id: 'cyber_true_ending_scene',
        chapterId: 'epilogue',
        chapterTitle: 'Epilog · Langit Neo-Jakarta',
        progressPercent: 100,
        location: {
          id: 'cyber_bridge',
          name: 'Puncak Antena Pemancar',
          time: 'morning',
          weather: 'clear',
          mood: 'cyber'
        },
        characters: [],
        speaker: null,
        text: 'Gelombang data berwarna biru safir memancar melintasi langit kota. Seluruh layar raksasa menyiarkan kebenaran, mengakhiri rezim oligarki Sektor 9.',
        endingId: 'cyber_true',
        soundEffect: 'chime'
      },

      cyber_ghost_ending_scene: {
        id: 'cyber_ghost_ending_scene',
        chapterId: 'epilogue',
        chapterTitle: 'Epilog · Siluet Tanpa Nama',
        progressPercent: 100,
        location: {
          id: 'cyber_bridge',
          name: 'Jalur Bawah Tanah Sektor 0',
          time: 'night',
          weather: 'clear',
          mood: 'peaceful'
        },
        characters: [],
        speaker: null,
        text: 'Kamu membuang implan lama ke dalam saluran limbah. Tidak ada lagi yang mengejarmu, karena bagi dunia, kamu sudah tak lagi eksis.',
        endingId: 'cyber_ghost',
        soundEffect: 'chime'
      }
    }
  },

  fantasy_archive: {
    id: 'fantasy_archive',
    title: 'Arsip Bintang Terakhir',
    subtitle: 'The Starlight Archive',
    genre: 'fantasy',
    synopsis: 'Perpustakaan langit terapung yang menjaga rasi bintang yang sekarat. Sebagai juru tulis bintang, takdir cahaya malam ada di ujung tanganmu.',
    firstSceneId: 'fantasy_intro_1',
    visualBible: {
      artStyle: 'ethereal storybook illustration',
      renderStyle: 'painterly celestial glow',
      colorLanguage: 'deep midnight indigo, violet & starlight gold',
      lightingLanguage: 'magical crystalline luminescence',
      cameraLanguage: 'drift',
      particleLanguage: 'motes',
      uiLanguage: 'parchment',
      soundLanguage: 'celestial'
    },
    endings: {
      fantasy_true: {
        id: 'fantasy_true',
        title: 'Langit yang Menyala Kembali',
        type: 'true',
        tagline: 'True Ending — Fajar Bintang Abadi',
        poem: 'Bintang itu tidak padam; ia hanya menunggu hati yang cukup hangat untuk menyalakan apinya kembali.',
        summary: 'Kamu dan Penjaga Lyra menyatukan pecahan rasi bintang. Langit malam kembali bercahaya dengan kehangatan abadi.',
        unlockedCondition: 'Rasa hormat dan keintiman (Respect >= 3, Intimacy >= 3).'
      }
    },
    scenes: {
      fantasy_intro_1: {
        id: 'fantasy_intro_1',
        chapterId: 'f_ch1',
        chapterTitle: 'Menara Langit · Kubah Bintang',
        progressPercent: 20,
        location: {
          id: 'fantasy_library',
          name: 'Perpustakaan Astral · Atas Awan',
          time: 'night',
          weather: 'stars',
          mood: 'wonder'
        },
        characters: [],
        speaker: null,
        text: 'Buku-buku bersampul cahaya mengambang pelan di udara tanpa bobot. Di tengah ruangan berkubah kristal, sebuah astrolabe raksasa berputar dalam keheningan surgawi.',
        subText: 'Luminous books drifted gently in the zero-gravity celestial archive.',
        emotionalIntensity: 0.3,
        cameraAction: 'drift',
        nextSceneId: 'fantasy_grimoire_scene',
        ambientTrack: 'celestial_archive',
        soundEffect: 'chime'
      },

      fantasy_grimoire_scene: {
        id: 'fantasy_grimoire_scene',
        chapterId: 'f_ch1',
        chapterTitle: 'Menara Langit · Kubah Bintang',
        progressPercent: 45,
        location: {
          id: 'fantasy_library',
          name: 'Meja Kristal Astral',
          time: 'night',
          weather: 'stars',
          mood: 'wonder'
        },
        characters: [],
        speaker: null,
        text: 'Sebuah naskah kulit bertatahkan debu bintang terbuka di hadapanmu. Gambar rasi bintang tertua memancarkan denyut kehangatan magis.',
        emotionalIntensity: 0.5,
        cameraAction: 'slow_push',
        diegeticItem: {
          id: 'celestial_grimoire',
          type: 'grimoire',
          title: 'Kitab Bintang Lyra',
          snippet: 'Halaman 77 · Mantra Pengingat Cahaya',
          content: {
            sender: 'Arch-Mage Eldrin',
            timestamp: 'Zaman Cahaya Pertama',
            body: '“Jika bintang terakhir mulai mendingin, jangan takut pada kegelapan. Taruhlah jemarimu di atas inti kristal dan sebutkan nama orang yang paling kamu cintai.”',
            extraNote: 'Aksara kuno bercahaya emas saat disentuh.'
          },
          flagToUnlock: 'read_celestial_grimoire'
        },
        nextSceneId: 'fantasy_lyra_appears'
      },

      fantasy_lyra_appears: {
        id: 'fantasy_lyra_appears',
        chapterId: 'f_ch1',
        chapterTitle: 'Menara Langit · Kubah Bintang',
        progressPercent: 70,
        location: {
          id: 'fantasy_library',
          name: 'Pusat Astrolabe',
          time: 'night',
          weather: 'stars',
          mood: 'romance'
        },
        characters: [
          {
            id: 'lyra_guardian',
            name: 'Lyra',
            expression: 'romantic',
            position: 'center',
            isSpeaking: true
          }
        ],
        speaker: 'Lyra',
        text: '“Kamu menemukannya, Juru Tulisku,” bisik Lyra, sang penjaga bintang dengan rambut keperakan yang mengambang lembut. “Maukah kamu meniupkan napas hidupmu ke rasi bintang ini bersamaku?”',
        emotionalIntensity: 0.7,
        cameraAction: 'slow_push',
        choices: [
          {
            id: 'f_kindle_together',
            text: 'Genggam tangannya dan letakkan di atas kristal: “Bersamamu, Lyra. Biarkan seluruh semesta melihat cahaya kita.”',
            subtext: 'Penyatuan magis penuh kehangatan',
            nextSceneId: 'fantasy_true_ending_scene',
            effects: { intimacy: 4, respect: 3, affection: 3 },
            cameraCue: 'slow_push'
          }
        ]
      },

      fantasy_true_ending_scene: {
        id: 'fantasy_true_ending_scene',
        chapterId: 'epilogue',
        chapterTitle: 'Epilog · Cahaya Abadi',
        progressPercent: 100,
        location: {
          id: 'fantasy_library',
          name: 'Puncak Kubah Astral',
          time: 'night',
          weather: 'stars',
          mood: 'wonder'
        },
        characters: [],
        speaker: null,
        text: 'Ledakan cahaya keemasan yang lembut menyinari kubah langit. Ribuan bintang baru mekar seperti kuntum teratai di kegelapan abadi, menjaga dunia selamanya.',
        endingId: 'fantasy_true',
        soundEffect: 'chime'
      }
    }
  },

  two_hours_apart: {
    id: 'two_hours_apart',
    title: '2 Hours Apart',
    subtitle: 'Dua Jam yang Memisahkan',
    genre: 'romance',
    synopsis: 'Dua orang yang hanya berselisih waktu dua jam, namun perlahan merasa dunia mereka terpisah jauh. Kisah tentang jarak, komunikasi, dan bertumbuh.',
    firstSceneId: 'SC-01',
    visualBible: {
      artStyle: '2.5D cinematic painterly anime',
      renderStyle: 'soft naturalism',
      colorLanguage: 'warm tungsten vs cool midnight navy',
      lightingLanguage: 'Makoto Shinkai natural golden hour & screen glow',
      cameraLanguage: 'slow_push',
      particleLanguage: 'rain',
      uiLanguage: 'minimal_warm',
      soundLanguage: 'intimate_lofi'
    },
    endings: {
      END_D: {
        id: 'END_D',
        title: 'Jalur Masing-Masing',
        type: 'bittersweet',
        tagline: 'Ending D — Menemukan Diri di Ujung Jalan',
        poem: 'Ada rute yang kita tempuh bukan untuk sampai bersama, melainkan agar kita berdua belajar mencintai hidup masing-masing.',
        summary: 'Nana dan Agus saling melepaskan dengan damai dan penuh rasa syukur. Keduanya sukses di jalannya masing-masing.',
        unlockedCondition: 'Jarak emosional yang tinggi namun disikapi dengan kedewasaan.'
      }
    },
    scenes: {
      'SC-01': {
        id: 'SC-01',
        chapterId: 'act1_ch1',
        chapterTitle: 'Bab 01 · Pertemuan di Meja Sudut',
        progressPercent: 10,
        location: {
          id: 'env_campus_cafe',
          name: 'The Bookshelf Café · Sore',
          time: 'afternoon',
          weather: 'clear',
          mood: 'romance'
        },
        characters: [
          {
            id: 'char_nana',
            name: 'Nana',
            expression: 'smiling',
            position: 'left'
          },
          {
            id: 'char_agus',
            name: 'Agus',
            expression: 'smiling',
            position: 'right'
          }
        ],
        speaker: 'Nana',
        text: 'Secangkir kopi hangat mengepul di meja kayu The Bookshelf Café. Di seberang meja, Agus tersenyum tenang menutup laptopnya saat pandangan kami bertemu.',
        nextSceneId: 'SC-03'
      },
      'SC-03': {
        id: 'SC-03',
        chapterId: 'act1_ch1',
        chapterTitle: 'Bab 01 · Rutinitas Baru',
        progressPercent: 25,
        location: {
          id: 'env_campus',
          name: 'Pelataran Kampus · Siang',
          time: 'morning',
          weather: 'clear',
          mood: 'peaceful'
        },
        characters: [
          {
            id: 'char_nana',
            name: 'Nana',
            expression: 'happy',
            position: 'left'
          },
          {
            id: 'char_agus',
            name: 'Agus',
            expression: 'smiling',
            position: 'right'
          }
        ],
        speaker: 'Agus',
        text: 'Langkah kami menuruni tangga batu pelataran kampus beriringan di bawah bayangan dedaunan rindang. Rasanya menyenangkan memiliki seseorang untuk berjalan bersama.',
        nextSceneId: 'SC-06'
      },
      'SC-06': {
        id: 'SC-06',
        chapterId: 'act1_ch3',
        chapterTitle: 'Bab 03 · Senja Terakhir Sebelum Jarak',
        progressPercent: 40,
        location: {
          id: 'env_campus',
          name: 'Tangga Kampus · Senja',
          time: 'sunset',
          weather: 'clear',
          mood: 'romance'
        },
        characters: [
          {
            id: 'char_nana',
            name: 'Nana',
            expression: 'pensive' as any,
            position: 'left'
          },
          {
            id: 'char_agus',
            name: 'Agus',
            expression: 'serious',
            position: 'right'
          }
        ],
        speaker: 'Nana',
        text: 'Lampu-lampu jalanan mulai temaram menyala di pelataran kampus saat langit merona jingga keunguan. "Dua jam bukan apa-apa, kan?" bisikku perlahan menatap matanya.',
        nextSceneId: 'SC-07'
      },
      'SC-07': {
        id: 'SC-07',
        chapterId: 'act2_ch4',
        chapterTitle: 'Bab 04 · Pagi Pertama di Dua Zona',
        progressPercent: 50,
        location: {
          id: 'env_nana_bedroom',
          name: 'Kamar Nana · 00:10 Tengah Malam',
          time: 'midnight',
          weather: 'rain',
          mood: 'sadness'
        },
        characters: [
          {
            id: 'char_nana',
            name: 'Nana',
            expression: 'pensive' as any,
            position: 'center'
          }
        ],
        speaker: 'Nana',
        text: 'Hujan rintik membasahi kaca jendela kamarku. Jam dinding menunjukkan 00:10 WIB. Di kotanya, Agus mungkin sudah terlelap sejak pukul 02:10 WIT.',
        nextSceneId: 'SC-08'
      },
      'SC-08': {
        id: 'SC-08',
        chapterId: 'act2_ch4',
        chapterTitle: 'Bab 04 · Ruang Kerja Agus',
        progressPercent: 65,
        location: {
          id: 'env_agus_room',
          name: 'Ruang Kerja Agus · 02:10 Larut Malam',
          time: 'night',
          weather: 'clear',
          mood: 'peaceful'
        },
        characters: [
          {
            id: 'char_agus',
            name: 'Agus',
            expression: 'exhausted',
            position: 'center'
          }
        ],
        speaker: 'Agus',
        text: 'Cahaya monitor ganda memantulkan baris-baris kode di kacamata Agus. Di sudut meja, kucing oranyenya mendengkur tenang di samping cangkir kopi yang mendingin.',
        nextSceneId: 'SC-20'
      },
      'SC-20': {
        id: 'SC-20',
        chapterId: 'act4_ch10',
        chapterTitle: 'Bab 10 · Tawaran di Studio Desain',
        progressPercent: 80,
        location: {
          id: 'env_office',
          name: 'Studio Desain Nana · Jakarta',
          time: 'afternoon',
          weather: 'clear',
          mood: 'tension'
        },
        characters: [
          {
            id: 'char_nana',
            name: 'Nana',
            expression: 'serious',
            position: 'center'
          }
        ],
        speaker: 'Nana',
        text: 'Sinar matahari sore menembus jendela studio desain dengan latar Monas di kejauhan. Surat tawaran promosi karier itu ada di depanku—namun menerimanya berarti semakin sulit menyamakan waktu dengan Agus.',
        nextSceneId: 'SC-38'
      },
      'SC-38': {
        id: 'SC-38',
        chapterId: 'act6_epilogue',
        chapterTitle: 'Epilog · Jalur Masing-Masing',
        progressPercent: 100,
        location: {
          id: 'env_office',
          name: 'Studio Desain Nana · Resolusi',
          time: 'afternoon',
          weather: 'clear',
          mood: 'peaceful'
        },
        characters: [
          {
            id: 'char_nana',
            name: 'Nana',
            expression: 'smiling',
            position: 'center'
          }
        ],
        speaker: 'Nana',
        text: 'Tahun-tahun berlalu di studio ini. Kami memilih untuk bertumbuh di jalan masing-masing dengan rasa hormat yang tak pernah pudar. Dua jam itu bukan lagi pemisah, melainkan awal kedewasaan kami.',
        endingId: 'END_D'
      }
    }
  }
};
