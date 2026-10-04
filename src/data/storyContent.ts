import type { StoryScene, EndingDef } from '../types/story';

export const ENDINGS_CATALOG: Record<string, EndingDef> = {
  ending_true: {
    id: 'ending_true',
    title: 'Hingga Langit Terbuka',
    type: 'true',
    tagline: 'True Ending — Di Balik Awan Selalu Ada Cahaya',
    poem: 'Hujan yang jatuh dua tahun lamanya akhirnya reda di matamu. Kita tidak lagi berlindung dari badai—kita berjalan menyambutnya bersama.',
    summary: 'Nana membatalkan kepergiannya dan memilih menetap bersamamu. Kejujuran dan rasa saling percaya berhasil menyembuhkan luka lama.',
    unlockedCondition: 'Rasa percaya (Trust >= 5) dan mendengarkan rahasia Nana dengan tulus.'
  },
  ending_romantic: {
    id: 'ending_romantic',
    title: 'Dua Payung, Satu Langkah',
    type: 'romantic',
    tagline: 'Romantic Ending — Bersamamu ke Mana Pun',
    poem: 'Jika kotamu bukan lagi di sini, maka rumahku adalah ke mana pun langkahmu tertuju.',
    summary: 'Kamu membeli tiket di menit terakhir dan menaiki gerbong kereta bersamanya. Tak ada lagi kata terlambat untuk cinta.',
    unlockedCondition: 'Afeksi tinggi (Affection >= 6) dan keberanian mengambil keputusan di stasiun.'
  },
  ending_secret: {
    id: 'ending_secret',
    title: 'Tiket Menuju Kemarin',
    type: 'secret',
    tagline: 'Secret Ending — Surat yang Belum Sempat Terkirim',
    poem: 'Di balik halaman 42, ada sebuah pengakuan yang tertidur dua musim. Kini, kita membangunkannya di bawah gemintang senja.',
    summary: 'Kamu menemukan tiket rahasia dan surat yang tersimpan di buku lama. Nana tersipu mengakui bahwa alasan ia kembali hanya satu: kamu.',
    unlockedCondition: 'Menemukan item tersembunyi "Tiket Rahasia" dan memilih rute percakapan buku.'
  },
  ending_bittersweet: {
    id: 'ending_bittersweet',
    title: 'Secangkir Kopi yang Mendingin',
    type: 'bittersweet',
    tagline: 'Bittersweet Ending — Perpisahan yang Hangat',
    poem: 'Ada orang yang ditakdirkan untuk saling mencintai, namun hanya untuk disimpan sebagai kenangan paling manis di sudut hati.',
    summary: 'Kalian saling melepaskan dengan senyuman dan pelukan erat. Tidak ada penyesalan, hanya rasa syukur pernah saling menemukan.',
    unlockedCondition: 'Memilih untuk mengikhlaskan perpisahan secara damai.'
  }
};

export const STORY_SCENES: Record<string, StoryScene> = {
  ch1_intro_1: {
    id: 'ch1_intro_1',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 5,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Sore Menjelang Malam',
      time: 'night',
      weather: 'rain',
      mood: 'sadness'
    },
    characters: [],
    speaker: null,
    text: 'Hujan turun sejak sore. Suara gemerisik butir air menghantam kaca jendela kafe, memburamkan kerlip lampu jalanan kota di luar.',
    subText: 'The rain had been falling since dusk, blurring the city lights outside.',
    nextSceneId: 'ch1_intro_2',
    ambientTrack: 'rain_cafe',
    soundEffect: 'rain_start'
  },

  ch1_intro_2: {
    id: 'ch1_intro_2',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 12,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Meja Sudut',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [],
    speaker: null,
    text: 'Aroma kopi hangat dan kayu basah menguar di udara. Di meja sudut favorit dua tahun lalu, secangkir Americano panas masih mengepul pelan.',
    nextSceneId: 'ch1_nadia_enters',
    soundEffect: 'door',
    foreshadowItem: {
      id: 'old_matchbox',
      name: 'Korek Api Antik',
      description: 'Sebuah kotak korek api tua bertuliskan nama stasiun pantai tempat kalian berdua pernah berjanji.',
      icon: 'sparkles',
      flagToUnlock: 'found_matchbox',
      unlockedHint: 'Kenangan pantai senja tersimpan di sini.'
    }
  },

  ch1_nadia_enters: {
    id: 'ch1_nadia_enters',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 20,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Meja Sudut',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'nervous',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Lonceng pintu berdenting pelan. Nana melangkah masuk, merapikan ujung sweater rajut kremnya yang sedikit lembap oleh rintik hujan. Matanya beradu dengan matamu.',
    nextSceneId: 'ch1_dialogue_1'
  },

  ch1_dialogue_1: {
    id: 'ch1_dialogue_1',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 28,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Meja Sudut',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'smiling',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: '“Kamu masih ingat tempat ini?” tanyanya pelan. Senyum tipis mengembang di bibirnya, namun sorot matanya menyimpan sesuatu yang tak terucap.',
    subText: '“Do you still remember this place?”',
    choices: [
      {
        id: 'c1_choice_1',
        text: '“Mana mungkin aku lupa. Meja dekat jendela ini selalu milikmu.”',
        subtext: 'Menatap matanya dengan hangat',
        nextSceneId: 'ch1_react_warm',
        effects: { trust: 2, affection: 2 },
        setFlags: ['remembered_spot']
      },
      {
        id: 'c1_choice_2',
        text: '“Dua tahun itu lama, Nana. Aku hampir mengira kamu takkan pernah kembali.”',
        subtext: 'Jujur pada rasa kecewa di masa lalu',
        nextSceneId: 'ch1_react_honest',
        effects: { trust: 1, vulnerability: 2 },
        setFlags: ['addressed_absence']
      },
      {
        id: 'c1_choice_3',
        text: '“Duduklah dulu. Pundakmu basah karena hujan.”',
        subtext: 'Memperhatikan keadaannya terlebih dahulu',
        nextSceneId: 'ch1_react_care',
        effects: { trust: 2, affection: 1 }
      }
    ],
    soundEffect: 'heartbeat'
  },

  ch1_react_warm: {
    id: 'ch1_react_warm',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 35,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Meja Sudut',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'embarrassed',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Pipi Nana merona halus di bawah temaram lampu gantung kafe. Ia menarik kursi kayu di hadapanmu dan duduk dengan anggun.',
    nextSceneId: 'ch1_sit_down'
  },

  ch1_react_honest: {
    id: 'ch1_react_honest',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 35,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Meja Sudut',
      time: 'night',
      weather: 'rain',
      mood: 'tension'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'sad',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Nana terdiam sejenak. Jari-jemarinya meremas tali tasnya pelan, sebelum akhirnya menghela napas panjang dengan pandangan menunduk.',
    nextSceneId: 'ch1_sit_down'
  },

  ch1_react_care: {
    id: 'ch1_react_care',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 35,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Meja Sudut',
      time: 'night',
      weather: 'rain',
      mood: 'peaceful'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'smiling',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: '“Terima kasih, Agus,” gumamnya lembut. Ia melepas syal marunnya dan meletakkannya di sandaran kursi kayu.',
    nextSceneId: 'ch1_sit_down'
  },

  ch1_sit_down: {
    id: 'ch1_sit_down',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 44,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Meja Sudut',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'serious',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: '“Ada banyak hal yang ingin kujelaskan tentang malam itu... tentang hari saat aku tiba-tiba harus pindah ke kota seberang tanpa sempat berpamitan.”',
    choices: [
      {
        id: 'c1_choice_listen',
        text: '“Aku mendengarkan, Nana. Ceritakan apa pun yang ingin kamu bagi.”',
        subtext: 'Membuka ruang tanpa menghakimi',
        nextSceneId: 'ch1_confession_start',
        effects: { trust: 2, vulnerability: 1 }
      },
      {
        id: 'c1_choice_touch',
        text: 'Menyentuh ujung jemarinya di atas meja kayu.',
        subtext: 'Gestur intim yang menenangkan getaran tangannya',
        nextSceneId: 'ch1_hands_cg_scene',
        effects: { affection: 2, trust: 1 },
        setFlags: ['touched_hands_cafe']
      }
    ],
    soundEffect: 'click'
  },

  ch1_hands_cg_scene: {
    id: 'ch1_hands_cg_scene',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 50,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Sentuhan',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [],
    speaker: null,
    text: 'Ujung jarimu menyentuh punggung tangannya yang dingin di sebelah cangkir kopi. Nana tidak menarik tangannya; ia justru balas mengenggam erat.',
    nextSceneId: 'ch1_confession_start',
    soundEffect: 'heartbeat'
  },

  ch1_confession_start: {
    id: 'ch1_confession_start',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 60,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Jam Tutup',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'crying',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: '“Saat itu rumah sakit ibu membutuhkan biaya mendesak, dan keluarga kami kehilangan segalanya. Aku merasa... aku hanya akan menjadi beban untuk mimpimu jika tetap tinggal.”',
    nextSceneId: 'ch1_closing'
  },

  ch1_closing: {
    id: 'ch1_closing',
    chapterId: 'ch1',
    chapterTitle: 'Bab 01 · Jejak Hujan di Kafe Senja',
    progressPercent: 75,
    location: {
      id: 'cafe_night',
      name: 'Kafe Kroma · Pintu Keluar',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'nervous',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Barista mulai membalik tanda di pintu kaca menjadi "Closed". Di luar, hujan belum juga reda. Nana menatap payung hitam besar di tanganmu.',
    nextSceneId: 'ch2_street_1'
  },

  ch2_street_1: {
    id: 'ch2_street_1',
    chapterId: 'ch2',
    chapterTitle: 'Bab 02 · Di Bawah Satu Payung',
    progressPercent: 15,
    location: {
      id: 'street_night',
      name: 'Jalanan Kota · Trotoar Basah',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [],
    speaker: null,
    text: 'Satu payung untuk berdua. Hawa dingin malam menekan dari segala arah, namun jarak di antara kalian begitu dekat hingga hangat tubuhnya terasa nyata.',
    ambientTrack: 'night_street',
    soundEffect: 'rain_start',
    nextSceneId: 'ch2_street_dialogue'
  },

  ch2_street_dialogue: {
    id: 'ch2_street_dialogue',
    chapterId: 'ch2',
    chapterTitle: 'Bab 02 · Di Bawah Satu Payung',
    progressPercent: 30,
    location: {
      id: 'street_night',
      name: 'Lampu Jalan Kuning',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'romantic',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: '“Agus... pundak kirimu basah kuyup karena kamu memiringkan payungnya ke arahku.” Ia mendongak, matanya berkilau memantulkan pendar lampu jalanan.',
    choices: [
      {
        id: 'c2_choice_lean',
        text: '“Tak apa basah sedikit. Asal kamu tidak kedinginan.”',
        subtext: 'Menggeser payung lebih rapat',
        nextSceneId: 'ch2_lean_closer',
        effects: { affection: 2, trust: 1 }
      },
      {
        id: 'c2_choice_hold',
        text: 'Merangkul pundaknya agar ia lebih terlindung di dalam payung.',
        subtext: 'Keberanian memperpendek jarak',
        nextSceneId: 'ch2_hold_shoulder',
        effects: { affection: 3, trust: 2 },
        setFlags: ['embraced_in_rain']
      },
      {
        id: 'c2_choice_slow',
        text: '“Bisa kita berjalan lebih pelan? Aku ingin malam ini tidak cepat berakhir.”',
        subtext: 'Ungkapan kerinduan yang tulus',
        nextSceneId: 'ch2_slow_walk',
        effects: { affection: 2, vulnerability: 2 },
        setFlags: ['wanted_time_freeze']
      }
    ],
    soundEffect: 'heartbeat'
  },

  ch2_lean_closer: {
    id: 'ch2_lean_closer',
    chapterId: 'ch2',
    chapterTitle: 'Bab 02 · Di Bawah Satu Payung',
    progressPercent: 50,
    location: {
      id: 'street_night',
      name: 'Lampu Jalan Kuning',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'embarrassed',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Nana merapatkan dirinya ke lenganmu. Langkah sepatu kalian di atas genangan air terdengar seirama dalam sunyi.',
    nextSceneId: 'ch2_bus_stop'
  },

  ch2_hold_shoulder: {
    id: 'ch2_hold_shoulder',
    chapterId: 'ch2',
    chapterTitle: 'Bab 02 · Di Bawah Satu Payung',
    progressPercent: 50,
    location: {
      id: 'street_night',
      name: 'Lampu Jalan Kuning',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'romantic',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Nana terkesiap pelan sesaat, lalu menyandarkan kepalanya dengan lembut di bahumu. Detak jantungmu berdegup kencang berpadu dengan deru hujan.',
    nextSceneId: 'ch2_bus_stop'
  },

  ch2_slow_walk: {
    id: 'ch2_slow_walk',
    chapterId: 'ch2',
    chapterTitle: 'Bab 02 · Di Bawah Satu Payung',
    progressPercent: 50,
    location: {
      id: 'street_night',
      name: 'Lampu Jalan Kuning',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'smiling',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: '“Aku juga, Agus... aku selalu berharap waktu bisa berhenti tiap kali bersamamu.”',
    nextSceneId: 'ch2_bus_stop'
  },

  ch2_bus_stop: {
    id: 'ch2_bus_stop',
    chapterId: 'ch2',
    chapterTitle: 'Bab 02 · Di Bawah Satu Payung',
    progressPercent: 75,
    location: {
      id: 'street_night',
      name: 'Halte Bus Kota',
      time: 'night',
      weather: 'rain',
      mood: 'mystery'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'serious',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Tiba di halte yang sepi, Nana mengeluarkan sebuah buku bersampul kain dari tasnya. Di tepian buku itu tampak secarik kertas terselip di halaman 42.',
    nextSceneId: 'ch3_book_discovery',
    foreshadowItem: {
      id: 'old_ticket',
      name: 'Tiket Kereta Lama',
      description: 'Tiket kereta api jurusan Pantai Senja tertanggal 14 Juli dua tahun lalu, belum pernah terpakai.',
      icon: 'ticket',
      flagToUnlock: 'found_ticket',
      unlockedHint: 'Kunci pembuka Secret Ending!'
    }
  },

  ch3_book_discovery: {
    id: 'ch3_book_discovery',
    chapterId: 'ch3',
    chapterTitle: 'Bab 03 · Foto di Halaman 42',
    progressPercent: 20,
    location: {
      id: 'bedroom_night',
      name: 'Kamar Apartemen · Lampu Meja',
      time: 'night',
      weather: 'rain',
      mood: 'mystery'
    },
    characters: [],
    speaker: null,
    text: 'Foto polaroid usang terselip di antara bait-bait puisi. Di sana tampak kalian berdua dua tahun lalu, tersenyum riang di tepi pantai sebelum badai datang.',
    ambientTrack: 'room_silence',
    soundEffect: 'page_turn',
    nextSceneId: 'ch3_polaroid_dialogue'
  },

  ch3_polaroid_dialogue: {
    id: 'ch3_polaroid_dialogue',
    chapterId: 'ch3',
    chapterTitle: 'Bab 03 · Foto di Halaman 42',
    progressPercent: 40,
    location: {
      id: 'bedroom_night',
      name: 'Kamar Apartemen · Lampu Meja',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'sad',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: '“Aku menyimpan foto ini di setiap kota yang kutinggali. Setiap kali ingin menyerah, aku selalu ingat senyummu hari itu.”',
    choices: [
      {
        id: 'c3_ask_ticket',
        text: '“Nana... tiket di belakang foto ini, apakah ini alasan kamu kembali?”',
        subtext: 'Menanyakan tiket yang kamu temukan',
        nextSceneId: 'ch3_ticket_revelation',
        effects: { trust: 3, vulnerability: 2 },
        requiredCondition: {
          flag: 'found_ticket'
        },
        setFlags: ['secret_ticket_revealed']
      },
      {
        id: 'c3_confess_feelings',
        text: '“Dua tahun ini aku tak pernah benar-benar melupakanmu, Nana.”',
        subtext: 'Membuka isi hati yang terdalam',
        nextSceneId: 'ch3_deep_confession',
        effects: { affection: 3, trust: 2 },
        setFlags: ['confessed_heart']
      },
      {
        id: 'c3_stay_silent',
        text: 'Menatap matanya dalam diam dan mengusap tetes air di pipinya.',
        subtext: 'Sentuhan yang berbicara lebih banyak dari kata',
        nextSceneId: 'ch3_silent_comfort',
        effects: { trust: 2, affection: 2 }
      }
    ],
    soundEffect: 'heartbeat'
  },

  ch3_ticket_revelation: {
    id: 'ch3_ticket_revelation',
    chapterId: 'ch3',
    chapterTitle: 'Bab 03 · Foto di Halaman 42',
    progressPercent: 70,
    location: {
      id: 'bedroom_night',
      name: 'Kamar Apartemen · Rahasia Terbuka',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'crying',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: 'Tetes air mata lolos dari sudut matanya. “Iya, Agus... aku kembali hanya untuk memastikan apakah janji di stasiun itu masih berlaku untuk kita berdua.”',
    nextSceneId: 'ch3_night_phone_msg'
  },

  ch3_deep_confession: {
    id: 'ch3_deep_confession',
    chapterId: 'ch3',
    chapterTitle: 'Bab 03 · Foto di Halaman 42',
    progressPercent: 70,
    location: {
      id: 'bedroom_night',
      name: 'Kamar Apartemen · Pengakuan',
      time: 'night',
      weather: 'rain',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'romantic',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: '“Aku bersyukur, Agus... Tuhan tahu betapa aku takut kamu sudah melangkah pergi dengan orang lain.”',
    nextSceneId: 'ch3_night_phone_msg'
  },

  ch3_silent_comfort: {
    id: 'ch3_silent_comfort',
    chapterId: 'ch3',
    chapterTitle: 'Bab 03 · Foto di Halaman 42',
    progressPercent: 70,
    location: {
      id: 'bedroom_night',
      name: 'Kamar Apartemen · Kehangatan',
      time: 'night',
      weather: 'rain',
      mood: 'peaceful'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'smiling',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Nana memejamkan mata, membiarkan kehangatan jarimu menghapus dinginnya malam.',
    nextSceneId: 'ch3_night_phone_msg'
  },

  ch3_night_phone_msg: {
    id: 'ch3_night_phone_msg',
    chapterId: 'ch3',
    chapterTitle: 'Bab 03 · Foto di Halaman 42',
    progressPercent: 88,
    location: {
      id: 'bedroom_night',
      name: 'Tengah Malam · 02:14 AM',
      time: 'night',
      weather: 'rain',
      mood: 'mystery'
    },
    characters: [],
    speaker: null,
    text: 'Pukul 02:14 dini hari. Layar ponselmu menyala di atas meja kerja: "Besok sore kereta terakhirku berangkat pukul lima. Aku akan menunggumu di peron stasiun..."',
    soundEffect: 'chime',
    nextSceneId: 'ch4_station_climax'
  },

  ch4_station_climax: {
    id: 'ch4_station_climax',
    chapterId: 'ch4',
    chapterTitle: 'Bab 04 · Titik Temu di Stasiun Senja',
    progressPercent: 30,
    location: {
      id: 'station_sunset',
      name: 'Peron Kereta Api · Senja Menguning',
      time: 'sunset',
      weather: 'clear',
      mood: 'tension'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'serious',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Langit senja berwarna keemasan. Nana berdiri di tepi peron, menggenggam koper kecilnya. Kereta senja perlahan membunyikan klaksonnya dari kejauhan.',
    ambientTrack: 'station_twilight',
    soundEffect: 'door',
    nextSceneId: 'ch4_final_choice'
  },

  ch4_final_choice: {
    id: 'ch4_final_choice',
    chapterId: 'ch4',
    chapterTitle: 'Bab 04 · Titik Temu di Stasiun Senja',
    progressPercent: 60,
    location: {
      id: 'station_sunset',
      name: 'Peron Kereta Api · Saat Keputusan',
      time: 'sunset',
      weather: 'clear',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'romantic',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: '“Kereta sudah tiba, Agus... Apa yang harus kulakukan sekarang?” tanyanya, menatapmu dengan sorot mata yang penuh harap dan keraguan.',
    choices: [
      {
        id: 'c4_secret_ending_choice',
        text: 'Perlihatkan tiket lama di buku: “Jangan naik kereta itu. Kita wujudkan janji dua tahun lalu di sini.”',
        subtext: 'Membuka rahasia surat cinta yang belum tersampaikan',
        nextSceneId: 'ending_secret_scene',
        requiredCondition: {
          flag: 'secret_ticket_revealed',
          variable: 'trust',
          operator: '>=',
          value: 4
        }
      },
      {
        id: 'c4_true_ending_choice',
        text: 'Tarik tangannya dan dekap erat: “Tetaplah di sini, Nana. Kali ini aku takkan membiarkanmu menghadapi dunia sendirian.”',
        subtext: 'Pilihan hati terdalam penuh keyakinan',
        nextSceneId: 'ending_true_scene',
        requiredCondition: {
          variable: 'trust',
          operator: '>=',
          value: 3
        }
      },
      {
        id: 'c4_romantic_ending_choice',
        text: 'Perlihatkan tiket barumu: “Aku ikut denganmu. Ke mana pun kereta ini membawamu, aku ada di sampingmu.”',
        subtext: 'Melompat bersama ke petualangan baru',
        nextSceneId: 'ending_romantic_scene',
        requiredCondition: {
          variable: 'affection',
          operator: '>=',
          value: 4
        }
      },
      {
        id: 'c4_bittersweet_ending_choice',
        text: 'Tersenyum hangat dan memeluknya untuk terakhir kali: “Kejarlah mimpimu, Nana. Kita akan selalu saling mengenang dengan indah.”',
        subtext: 'Melepaskan dengan cinta dan keikhlasan',
        nextSceneId: 'ending_bittersweet_scene'
      }
    ],
    soundEffect: 'heartbeat'
  },

  ending_true_scene: {
    id: 'ending_true_scene',
    chapterId: 'epilogue',
    chapterTitle: 'Epilog · Hingga Langit Terbuka',
    progressPercent: 100,
    location: {
      id: 'station_sunset',
      name: 'Peron Kereta Api · Langit Merona',
      time: 'sunset',
      weather: 'clear',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'crying',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Koper terlepas dari tangannya. Nana memelukmu begitu erat, membenamkan wajahnya di dadamu saat peluit kereta berbunyi dan melaju pergi tanpa dirinya.',
    endingId: 'ending_true',
    soundEffect: 'chime'
  },

  ending_romantic_scene: {
    id: 'ending_romantic_scene',
    chapterId: 'epilogue',
    chapterTitle: 'Epilog · Dua Payung, Satu Langkah',
    progressPercent: 100,
    location: {
      id: 'station_sunset',
      name: 'Di Dalam Gerbong Kereta Senja',
      time: 'sunset',
      weather: 'clear',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'happy',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Kalian duduk berdampingan di dekat jendela gerbong yang melaju kencang. Menatap langit senja yang luas bersama, tangan kalian bertaut erat tak terpisahkan.',
    endingId: 'ending_romantic',
    soundEffect: 'chime'
  },

  ending_secret_scene: {
    id: 'ending_secret_scene',
    chapterId: 'epilogue',
    chapterTitle: 'Epilog Rahasia · Tiket Menuju Kemarin',
    progressPercent: 100,
    location: {
      id: 'rooftop_night',
      name: 'Rooftop Gedung Kota · Bintang Malam',
      time: 'night',
      weather: 'stars',
      mood: 'romance'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'romantic',
        position: 'center',
        isSpeaking: true
      }
    ],
    speaker: 'Nana',
    text: 'Malam itu di atas rooftop di bawah gugusan bintang, Nana menunjukkan surat yang belum sempat ia kirim dua tahun lalu. “Alasanku kembali... hanya kamu, Agus.”',
    endingId: 'ending_secret',
    soundEffect: 'chime'
  },

  ending_bittersweet_scene: {
    id: 'ending_bittersweet_scene',
    chapterId: 'epilogue',
    chapterTitle: 'Epilog · Secangkir Kopi yang Mendingin',
    progressPercent: 100,
    location: {
      id: 'station_sunset',
      name: 'Peron Kereta Api · Senja Mengabur',
      time: 'sunset',
      weather: 'clear',
      mood: 'sadness'
    },
    characters: [
      {
        id: 'nadia',
        name: 'Nana',
        expression: 'smiling',
        position: 'center',
        isSpeaking: false
      }
    ],
    speaker: null,
    text: 'Kereta bergerak perlahan meninggalkan stasiun. Nana melambaikan tangannya dari balik kaca jendela dengan senyum yang manis dan tulus. Sebuah kisah yang abadi.',
    endingId: 'ending_bittersweet',
    soundEffect: 'chime'
  }
};
