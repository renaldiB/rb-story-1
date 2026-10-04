import { characterRegistry } from '../../character/CharacterAssetRegistry.ts';
import { variantResolver } from '../../character/CharacterVariantResolver.ts';

export type AssetType =
  | 'character'
  | 'environment'
  | 'prop'
  | 'animal'
  | 'vehicle'
  | 'fx'
  | 'lighting'
  | 'ui'
  | 'special';

export type AssetPriority = 'critical' | 'high' | 'medium' | 'low';

export interface AssetDefinition {
  id: string;
  type: AssetType;
  path?: string;
  production?: string;
  mobile?: string;
  variants?: string[];
  priority: AssetPriority;
  preload?: boolean;
  lazy?: boolean;
  reusable?: boolean;
  scenes?: string[];
  character?: string;
  pose?: string;
  expression?: string;
  source?: string;
  runtime?: string;
  transparent?: boolean;
  metadata?: {
    characterId?: string;
    environmentId?: string;
    timeOfDay?: string;
    weather?: string;
    aspectRatio?: string;
    description?: string;
  };
}

export const CANONICAL_ASSET_MANIFEST: Record<string, AssetDefinition> = {
  char_nana: {
    id: 'char_nana',
    type: 'character',
    path: '/assets/stories/two-hours-apart/characters/char_nana_master.jpg',
    production: '/assets/stories/two-hours-apart/production/characters/char_nana_master.webp',
    mobile: '/assets/stories/two-hours-apart/mobile/characters/char_nana_master.webp',
    variants: [
      'smile_warm',
      'pensive_thoughtful',
      'emotional_blush',
      'sleepy_yawn',
      'phone_call'
    ],
    priority: 'critical',
    preload: true,
    lazy: false,
    reusable: true,
    scenes: ['SC-01', 'SC-02', 'SC-03', 'SC-04', 'SC-05', 'SC-06', 'SC-07', 'SC-09', 'SC-10', 'SC-12', 'SC-13', 'SC-15', 'SC-18', 'SC-19', 'SC-20', 'SC-22', 'SC-24', 'SC-25', 'SC-26', 'SC-30', 'SC-35', 'SC-36', 'SC-37', 'SC-38', 'SC-39', 'SC-40'],
    metadata: {
      characterId: 'nana',
      description: 'Nana 24yo master character sheet with 4 core expressions'
    }
  },
  char_agus: {
    id: 'char_agus',
    type: 'character',
    path: '/assets/stories/two-hours-apart/characters/char_agus_master.jpg',
    production: '/assets/stories/two-hours-apart/production/characters/char_agus_master.webp',
    mobile: '/assets/stories/two-hours-apart/mobile/characters/char_agus_master.webp',
    variants: [
      'smile_reassuring',
      'tired_night',
      'laughing_phone',
      'deep_gaze'
    ],
    priority: 'critical',
    preload: true,
    lazy: false,
    reusable: true,
    scenes: ['SC-01', 'SC-02', 'SC-04', 'SC-05', 'SC-06', 'SC-08', 'SC-10', 'SC-14', 'SC-18', 'SC-21', 'SC-25', 'SC-28', 'SC-29', 'SC-30', 'SC-31', 'SC-32', 'SC-33', 'SC-34', 'SC-35', 'SC-39', 'SC-40'],
    metadata: {
      characterId: 'agus',
      description: 'Agus 24yo master character sheet with 4 core expressions'
    }
  },

  char_nana_bust_smile_01: {
    id: 'char_nana_bust_smile_01',
    type: 'character',
    character: 'nana',
    pose: 'bust_front',
    expression: 'smile_warm',
    source: '/assets/stories/two-hours-apart/characters/char_nana_master.jpg',
    production: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_smile_01.webp',
    mobile: '/assets/stories/two-hours-apart/characters/sprites/nana/mobile/char_nana_bust_smile_01.webp',
    runtime: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_smile_01.webp',
    transparent: true,
    priority: 'critical',
    preload: true,
    lazy: false,
    reusable: true,
    scenes: ['SC-01', 'SC-06'],
    metadata: { characterId: 'nana', description: 'Nana warm smiling front bust sprite' }
  },
  char_nana_bust_pensive_01: {
    id: 'char_nana_bust_pensive_01',
    type: 'character',
    character: 'nana',
    pose: 'bust_3quarter',
    expression: 'pensive_thoughtful',
    source: '/assets/stories/two-hours-apart/characters/char_nana_master.jpg',
    production: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_pensive_01.webp',
    mobile: '/assets/stories/two-hours-apart/characters/sprites/nana/mobile/char_nana_bust_pensive_01.webp',
    runtime: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_pensive_01.webp',
    transparent: true,
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true,
    scenes: ['SC-03', 'SC-07', 'SC-20'],
    metadata: { characterId: 'nana', description: 'Nana pensive 3/4 bust sprite' }
  },
  char_nana_bust_emotional_01: {
    id: 'char_nana_bust_emotional_01',
    type: 'character',
    character: 'nana',
    pose: 'bust_front',
    expression: 'emotional_blush',
    source: '/assets/stories/two-hours-apart/characters/char_nana_master.jpg',
    production: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_emotional_01.webp',
    mobile: '/assets/stories/two-hours-apart/characters/sprites/nana/mobile/char_nana_bust_emotional_01.webp',
    runtime: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_emotional_01.webp',
    transparent: true,
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true,
    scenes: ['SC-38'],
    metadata: { characterId: 'nana', description: 'Nana emotional tears front bust sprite' }
  },
  char_nana_bust_sleepy_phone_01: {
    id: 'char_nana_bust_sleepy_phone_01',
    type: 'character',
    character: 'nana',
    pose: 'bust_phone',
    expression: 'sleepy_yawn',
    source: '/assets/stories/two-hours-apart/characters/char_nana_master.jpg',
    production: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_sleepy_phone_01.webp',
    mobile: '/assets/stories/two-hours-apart/characters/sprites/nana/mobile/char_nana_bust_sleepy_phone_01.webp',
    runtime: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_sleepy_phone_01.webp',
    transparent: true,
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    scenes: ['SC-07'],
    metadata: { characterId: 'nana', description: 'Nana sleepy phone call bust sprite' }
  },
  char_agus_halfbody_reassuring_01: {
    id: 'char_agus_halfbody_reassuring_01',
    type: 'character',
    character: 'agus',
    pose: 'halfbody_glasses',
    expression: 'smile_reassuring',
    source: '/assets/stories/two-hours-apart/characters/char_agus_master.jpg',
    production: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_halfbody_reassuring_01.webp',
    mobile: '/assets/stories/two-hours-apart/characters/sprites/agus/mobile/char_agus_halfbody_reassuring_01.webp',
    runtime: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_halfbody_reassuring_01.webp',
    transparent: true,
    priority: 'critical',
    preload: true,
    lazy: false,
    reusable: true,
    scenes: ['SC-01', 'SC-06'],
    metadata: { characterId: 'agus', description: 'Agus half-body reassuring smile with headphones and glasses' }
  },
  char_agus_bust_neutral_01: {
    id: 'char_agus_bust_neutral_01',
    type: 'character',
    character: 'agus',
    pose: 'bust_front',
    expression: 'deep_gaze',
    source: '/assets/stories/two-hours-apart/characters/char_agus_master.jpg',
    production: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_bust_neutral_01.webp',
    mobile: '/assets/stories/two-hours-apart/characters/sprites/agus/mobile/char_agus_bust_neutral_01.webp',
    runtime: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_bust_neutral_01.webp',
    transparent: true,
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true,
    scenes: ['SC-08'],
    metadata: { characterId: 'agus', description: 'Agus calm neutral front gaze bust sprite' }
  },
  char_agus_bust_talking_phone_01: {
    id: 'char_agus_bust_talking_phone_01',
    type: 'character',
    character: 'agus',
    pose: 'bust_phone',
    expression: 'laughing_phone',
    source: '/assets/stories/two-hours-apart/characters/char_agus_master.jpg',
    production: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_bust_talking_phone_01.webp',
    mobile: '/assets/stories/two-hours-apart/characters/sprites/agus/mobile/char_agus_bust_talking_phone_01.webp',
    runtime: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_bust_talking_phone_01.webp',
    transparent: true,
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    scenes: ['SC-08'],
    metadata: { characterId: 'agus', description: 'Agus laughing phone call bust sprite' }
  },
  char_agus_bust_tired_01: {
    id: 'char_agus_bust_tired_01',
    type: 'character',
    character: 'agus',
    pose: 'bust_desk',
    expression: 'tired_night',
    source: '/assets/stories/two-hours-apart/characters/char_agus_master.jpg',
    production: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_bust_tired_01.webp',
    mobile: '/assets/stories/two-hours-apart/characters/sprites/agus/mobile/char_agus_bust_tired_01.webp',
    runtime: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_bust_tired_01.webp',
    transparent: true,
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    scenes: ['SC-08'],
    metadata: { characterId: 'agus', description: 'Agus tired night desk bust sprite' }
  },
  char_kaka: {
    id: 'char_kaka',
    type: 'character',
    variants: ['supportive', 'teasing', 'concerned'],
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { characterId: 'kaka', description: "Nana's older sister (Age 29)" }
  },
  char_raka: {
    id: 'char_raka',
    type: 'character',
    variants: ['casual', 'work'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { characterId: 'raka', description: "Nana's younger brother (Age 19)" }
  },
  char_dita: {
    id: 'char_dita',
    type: 'character',
    variants: ['ambitious', 'curious'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { characterId: 'dita', description: "Nana's university friend (Age 24)" }
  },
  char_fikri: {
    id: 'char_fikri',
    type: 'character',
    variants: ['authoritative', 'friendly'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { characterId: 'fikri', description: "Agus's best friend (Age 24)" }
  },
  char_maya: {
    id: 'char_maya',
    type: 'character',
    variants: ['friendly', 'professional'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { characterId: 'maya', description: "Agus's tech coworker (Age 25)" }
  },
  char_bimo: {
    id: 'char_bimo',
    type: 'character',
    variants: ['friendly', 'casual'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { characterId: 'bimo', description: "Nana's design studio colleague (Age 26)" }
  },
  char_ibu_nana: {
    id: 'char_ibu_nana',
    type: 'character',
    variants: ['warm', 'worried'],
    priority: 'low',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { characterId: 'ibu_nana', description: "Nana's mother" }
  },
  char_ayah_nana: {
    id: 'char_ayah_nana',
    type: 'character',
    variants: ['stern', 'reassuring'],
    priority: 'low',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { characterId: 'ayah_nana', description: "Nana's father" }
  },

  env_nana_bedroom: {
    id: 'env_nana_bedroom',
    type: 'environment',
    path: '/assets/stories/two-hours-apart/environments/env_nana_bedroom.jpg',
    production: '/assets/stories/two-hours-apart/production/environments/env_nana_bedroom.webp',
    mobile: '/assets/stories/two-hours-apart/mobile/environments/env_nana_bedroom.webp',
    variants: ['midnight_rain', 'morning_clear', 'sunset_amber'],
    priority: 'critical',
    preload: true,
    lazy: false,
    reusable: true,
    scenes: ['SC-07', 'SC-09', 'SC-10', 'SC-12', 'SC-13', 'SC-15', 'SC-17', 'SC-18', 'SC-19', 'SC-22', 'SC-24', 'SC-25', 'SC-26', 'SC-36'],
    metadata: {
      environmentId: 'nana_bedroom',
      timeOfDay: '00:10 midnight',
      weather: 'rain',
      aspectRatio: '16:9'
    }
  },
  env_agus_room: {
    id: 'env_agus_room',
    type: 'environment',
    path: '/assets/stories/two-hours-apart/environments/env_agus_room.jpg',
    production: '/assets/stories/two-hours-apart/production/environments/env_agus_room.webp',
    mobile: '/assets/stories/two-hours-apart/mobile/environments/env_agus_room.webp',
    variants: ['latenight_monitor', 'morning_sun', 'afternoon_coding'],
    priority: 'critical',
    preload: true,
    lazy: false,
    reusable: true,
    scenes: ['SC-08', 'SC-14', 'SC-21', 'SC-30', 'SC-35'],
    metadata: {
      environmentId: 'agus_room',
      timeOfDay: '02:10 late night',
      weather: 'clear',
      aspectRatio: '16:9'
    }
  },
  env_campus_cafe: {
    id: 'env_campus_cafe',
    type: 'environment',
    path: '/assets/stories/two-hours-apart/environments/env_campus_cafe.jpg',
    production: '/assets/stories/two-hours-apart/production/environments/env_campus_cafe.webp',
    mobile: '/assets/stories/two-hours-apart/mobile/environments/env_campus_cafe.webp',
    variants: ['afternoon_sunlit', 'evening_rain', 'crowded_lunch'],
    priority: 'critical',
    preload: true,
    lazy: false,
    reusable: true,
    scenes: ['SC-01', 'SC-02', 'SC-04', 'SC-05', 'SC-11', 'SC-16', 'SC-37', 'SC-39', 'SC-40'],
    metadata: {
      environmentId: 'campus_cafe',
      timeOfDay: '15:00 afternoon',
      weather: 'sunlit',
      aspectRatio: '16:9'
    }
  },
  env_nana_house: {
    id: 'env_nana_house',
    type: 'environment',
    variants: ['evening_dinner', 'morning_rush'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    scenes: ['SC-23'],
    metadata: { environmentId: 'nana_house', description: "Living room & dining table" }
  },
  env_campus: {
    id: 'env_campus',
    type: 'environment',
    path: '/assets/stories/two-hours-apart/environments/env_campus.jpg',
    production: '/assets/stories/two-hours-apart/production/environments/env_campus.webp',
    mobile: '/assets/stories/two-hours-apart/mobile/environments/env_campus.webp',
    variants: ['courtyard_afternoon', 'library_steps_golden_hour'],
    priority: 'high',
    preload: true,
    lazy: false,
    reusable: true,
    scenes: ['SC-03', 'SC-06'],
    metadata: { environmentId: 'campus', description: "University courtyard & stone stairs" }
  },
  env_campus_midday: {
    id: 'env_campus_midday',
    type: 'environment',
    path: '/assets/stories/two-hours-apart/environments/env_campus_midday.jpg',
    production: '/assets/stories/two-hours-apart/production/environments/env_campus_midday.webp',
    mobile: '/assets/stories/two-hours-apart/mobile/environments/env_campus_midday.webp',
    priority: 'high',
    preload: true,
    lazy: false,
    reusable: true,
    scenes: ['SC-03'],
    metadata: { environmentId: 'campus_midday', timeOfDay: 'midday', weather: 'clear' }
  },
  env_campus_dusk: {
    id: 'env_campus_dusk',
    type: 'environment',
    path: '/assets/stories/two-hours-apart/environments/env_campus_dusk.jpg',
    production: '/assets/stories/two-hours-apart/production/environments/env_campus_dusk.webp',
    mobile: '/assets/stories/two-hours-apart/mobile/environments/env_campus_dusk.webp',
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true,
    scenes: ['SC-06'],
    metadata: { environmentId: 'campus_dusk', timeOfDay: 'dusk', weather: 'sunset' }
  },
  env_office: {
    id: 'env_office',
    type: 'environment',
    path: '/assets/stories/two-hours-apart/environments/env_office.jpg',
    production: '/assets/stories/two-hours-apart/production/environments/env_office.webp',
    mobile: '/assets/stories/two-hours-apart/mobile/environments/env_office.webp',
    variants: ['day_busy', 'late_overtime'],
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true,
    scenes: ['SC-20', 'SC-38'],
    metadata: { environmentId: 'office', description: "Nana's graphic design studio" }
  },
  env_office_afternoon: {
    id: 'env_office_afternoon',
    type: 'environment',
    path: '/assets/stories/two-hours-apart/environments/env_office_afternoon.jpg',
    production: '/assets/stories/two-hours-apart/production/environments/env_office_afternoon.webp',
    mobile: '/assets/stories/two-hours-apart/mobile/environments/env_office_afternoon.webp',
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true,
    scenes: ['SC-20', 'SC-38'],
    metadata: { environmentId: 'office_afternoon', timeOfDay: 'afternoon', weather: 'clear' }
  },
  env_mountain: {
    id: 'env_mountain',
    type: 'environment',
    variants: ['dawn_sunrise', 'misty_afternoon'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { environmentId: 'mountain', description: "High viewpoint overlooking sea of clouds" }
  },
  env_hiking_trail: {
    id: 'env_hiking_trail',
    type: 'environment',
    variants: ['lush_pine_path', 'rainy_ascent'],
    priority: 'low',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { environmentId: 'hiking_trail' }
  },
  env_beach: {
    id: 'env_beach',
    type: 'environment',
    variants: ['sunset_golden', 'night_waves'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { environmentId: 'beach', description: "Quiet beach shore with breaking waves" }
  },
  env_station: {
    id: 'env_station',
    type: 'environment',
    variants: ['night_platform', 'morning_arrival'],
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { environmentId: 'station', description: "Intercity train station platform" }
  },
  env_airport: {
    id: 'env_airport',
    type: 'environment',
    variants: ['departure_gate_night', 'terminal_corridor'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { environmentId: 'airport', description: "International departure concourse" }
  },
  env_hotel: {
    id: 'env_hotel',
    type: 'environment',
    variants: ['hotel_balcony_night', 'room_morning'],
    priority: 'low',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { environmentId: 'hotel' }
  },
  env_coastal_viewpoint: {
    id: 'env_coastal_viewpoint',
    type: 'environment',
    variants: ['twilight_breeze'],
    priority: 'low',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { environmentId: 'coastal_viewpoint' }
  },

  prop_phone: {
    id: 'prop_phone',
    type: 'prop',
    variants: ['dual_clock_widget', 'incoming_call', 'chat_bubble'],
    priority: 'critical',
    preload: true,
    lazy: false,
    reusable: true,
    metadata: { description: 'Smartphone with split 00:10 / 02:10 clocks' }
  },
  prop_old_photo: {
    id: 'prop_old_photo',
    type: 'prop',
    variants: ['polaroid_campus_smile'],
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { description: 'Polaroid of Nana and Agus at campus' }
  },
  prop_coffee: {
    id: 'prop_coffee',
    type: 'prop',
    variants: ['steaming_mug', 'takeout_paper_cup'],
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true
  },
  prop_laptop: {
    id: 'prop_laptop',
    type: 'prop',
    variants: ['code_ide', 'design_suite'],
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true
  },
  prop_backpack: {
    id: 'prop_backpack',
    type: 'prop',
    variants: ['travel_packed', 'casual_canvas'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true
  },
  prop_dog_rescue: {
    id: 'prop_dog_rescue',
    type: 'animal',
    variants: ['scruffy_puppy_alert', 'sleeping_warm'],
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true
  },
  prop_agus_cat: {
    id: 'prop_agus_cat',
    type: 'animal',
    variants: ['sleeping_desk', 'alert_stretching'],
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true,
    metadata: { description: 'Orange tabby cat resting on Agus desk' }
  },
  prop_train_ticket: {
    id: 'prop_train_ticket',
    type: 'prop',
    variants: ['departure_0840'],
    priority: 'high',
    preload: false,
    lazy: true,
    reusable: true
  },

  fx_rain: {
    id: 'fx_rain',
    type: 'fx',
    priority: 'critical',
    preload: true,
    lazy: false,
    reusable: true
  },
  fx_mist_fog: {
    id: 'fx_mist_fog',
    type: 'fx',
    priority: 'high',
    preload: true,
    lazy: false,
    reusable: true
  },
  fx_dust_motes: {
    id: 'fx_dust_motes',
    type: 'fx',
    priority: 'medium',
    preload: false,
    lazy: true,
    reusable: true
  },
  fx_screen_glow: {
    id: 'fx_screen_glow',
    type: 'lighting',
    priority: 'critical',
    preload: true,
    lazy: false,
    reusable: true
  }
};

export function getCriticalStartupAssets(): AssetDefinition[] {
  return Object.values(CANONICAL_ASSET_MANIFEST).filter(
    (asset) => asset.priority === 'critical' && asset.preload && asset.path
  );
}

export interface ResolvedEnvironment {
  production: string;
  mobile: string;
  fallback: string;
}

export function resolveEnvironmentAsset(
  locationId: string,
  time?: string,
  _weather?: string
): ResolvedEnvironment | null {
  const loc = (locationId || '').toLowerCase();
  const t = (time || '').toLowerCase();

  if (loc.includes('campus') && !loc.includes('cafe')) {
    if (t === 'sunset' || t === 'night' || t.includes('dusk')) {
      return {
        production: '/assets/stories/two-hours-apart/production/environments/env_campus_dusk.webp',
        mobile: '/assets/stories/two-hours-apart/mobile/environments/env_campus_dusk.webp',
        fallback: '/assets/stories/two-hours-apart/environments/env_campus_dusk.jpg'
      };
    }
    return {
      production: '/assets/stories/two-hours-apart/production/environments/env_campus_midday.webp',
      mobile: '/assets/stories/two-hours-apart/mobile/environments/env_campus_midday.webp',
      fallback: '/assets/stories/two-hours-apart/environments/env_campus_midday.jpg'
    };
  }

  if (loc.includes('cafe')) {
    return {
      production: '/assets/stories/two-hours-apart/production/environments/env_campus_cafe.webp',
      mobile: '/assets/stories/two-hours-apart/mobile/environments/env_campus_cafe.webp',
      fallback: '/assets/stories/two-hours-apart/environments/env_campus_cafe.jpg'
    };
  }

  if (loc.includes('bedroom') || (loc.includes('nana') && loc.includes('room'))) {
    return {
      production: '/assets/stories/two-hours-apart/production/environments/env_nana_bedroom.webp',
      mobile: '/assets/stories/two-hours-apart/mobile/environments/env_nana_bedroom.webp',
      fallback: '/assets/stories/two-hours-apart/environments/env_nana_bedroom.jpg'
    };
  }

  if (loc.includes('agus') && loc.includes('room')) {
    return {
      production: '/assets/stories/two-hours-apart/production/environments/env_agus_room.webp',
      mobile: '/assets/stories/two-hours-apart/mobile/environments/env_agus_room.webp',
      fallback: '/assets/stories/two-hours-apart/environments/env_agus_room.jpg'
    };
  }

  if (loc.includes('office') || loc.includes('studio') || loc.includes('agency')) {
    return {
      production: '/assets/stories/two-hours-apart/production/environments/env_office_afternoon.webp',
      mobile: '/assets/stories/two-hours-apart/mobile/environments/env_office_afternoon.webp',
      fallback: '/assets/stories/two-hours-apart/environments/env_office_afternoon.jpg'
    };
  }

  return null;
}

export interface ResolvedCharacterSprite {
  id: string;
  character: 'nana' | 'agus' | string;
  expression: string;
  pose: string;
  production: string;
  mobile: string;
  fallback: string;
  transparent: boolean;
}

export function resolveCharacterSprite(
  characterNameOrId: string,
  expression?: string,
  pose?: string
): ResolvedCharacterSprite | null {
  const norm = characterNameOrId.toLowerCase().trim();
  const expr = (expression || 'smile').toLowerCase().trim();
  const ps = (pose || 'default').toLowerCase().trim();

  if (norm.includes('nana') || norm === 'nadia') {
    if (expr.includes('pensive') || expr === 'sad' || expr === 'serious' || expr === 'thoughtful') {
      return {
        id: 'char_nana_bust_pensive_01',
        character: 'nana',
        expression: 'pensive_thoughtful',
        pose: 'bust_3quarter',
        production: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_pensive_01.webp',
        mobile: '/assets/stories/two-hours-apart/characters/sprites/nana/mobile/char_nana_bust_pensive_01.webp',
        fallback: '/assets/stories/two-hours-apart/characters/char_nana_master.jpg',
        transparent: true
      };
    }
    if (
      expr.includes('emotional') ||
      expr.includes('cry') ||
      expr === 'crying' ||
      expr === 'blush' ||
      expr === 'embarrassed'
    ) {
      return {
        id: 'char_nana_bust_emotional_01',
        character: 'nana',
        expression: 'emotional_blush',
        pose: 'bust_front',
        production: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_emotional_01.webp',
        mobile: '/assets/stories/two-hours-apart/characters/sprites/nana/mobile/char_nana_bust_emotional_01.webp',
        fallback: '/assets/stories/two-hours-apart/characters/char_nana_master.jpg',
        transparent: true
      };
    }
    if (
      expr.includes('sleep') ||
      expr.includes('yawn') ||
      expr === 'exhausted' ||
      expr.includes('phone') ||
      ps.includes('phone')
    ) {
      return {
        id: 'char_nana_bust_sleepy_phone_01',
        character: 'nana',
        expression: 'sleepy_yawn',
        pose: 'bust_phone',
        production: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_sleepy_phone_01.webp',
        mobile: '/assets/stories/two-hours-apart/characters/sprites/nana/mobile/char_nana_bust_sleepy_phone_01.webp',
        fallback: '/assets/stories/two-hours-apart/characters/char_nana_master.jpg',
        transparent: true
      };
    }
    return {
      id: 'char_nana_bust_smile_01',
      character: 'nana',
      expression: 'smile_warm',
      pose: 'bust_front',
      production: '/assets/stories/two-hours-apart/characters/sprites/nana/char_nana_bust_smile_01.webp',
      mobile: '/assets/stories/two-hours-apart/characters/sprites/nana/mobile/char_nana_bust_smile_01.webp',
      fallback: '/assets/stories/two-hours-apart/characters/char_nana_master.jpg',
      transparent: true
    };
  }

  if (norm.includes('agus')) {
    if (expr.includes('tired') || expr === 'exhausted' || ps.includes('desk') || ps.includes('monitor')) {
      return {
        id: 'char_agus_bust_tired_01',
        character: 'agus',
        expression: 'tired_night',
        pose: 'bust_desk',
        production: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_bust_tired_01.webp',
        mobile: '/assets/stories/two-hours-apart/characters/sprites/agus/mobile/char_agus_bust_tired_01.webp',
        fallback: '/assets/stories/two-hours-apart/characters/char_agus_master.jpg',
        transparent: true
      };
    }
    if (expr.includes('laugh') || expr.includes('phone') || ps.includes('phone')) {
      return {
        id: 'char_agus_bust_talking_phone_01',
        character: 'agus',
        expression: 'laughing_phone',
        pose: 'bust_phone',
        production: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_bust_talking_phone_01.webp',
        mobile: '/assets/stories/two-hours-apart/characters/sprites/agus/mobile/char_agus_bust_talking_phone_01.webp',
        fallback: '/assets/stories/two-hours-apart/characters/char_agus_master.jpg',
        transparent: true
      };
    }
    if (expr === 'neutral' || expr === 'serious' || expr === 'calm' || expr.includes('gaze')) {
      return {
        id: 'char_agus_bust_neutral_01',
        character: 'agus',
        expression: 'deep_gaze',
        pose: 'bust_front',
        production: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_bust_neutral_01.webp',
        mobile: '/assets/stories/two-hours-apart/characters/sprites/agus/mobile/char_agus_bust_neutral_01.webp',
        fallback: '/assets/stories/two-hours-apart/characters/char_agus_master.jpg',
        transparent: true
      };
    }
    return {
      id: 'char_agus_halfbody_reassuring_01',
      character: 'agus',
      expression: 'smile_reassuring',
      pose: 'halfbody_glasses',
      production: '/assets/stories/two-hours-apart/characters/sprites/agus/char_agus_halfbody_reassuring_01.webp',
      mobile: '/assets/stories/two-hours-apart/characters/sprites/agus/mobile/char_agus_halfbody_reassuring_01.webp',
      fallback: '/assets/stories/two-hours-apart/characters/char_agus_master.jpg',
      transparent: true
    };
  }

  if (characterRegistry.hasCharacter(norm)) {
    const res = variantResolver.resolve({
      characterId: norm,
      expression: expr,
      pose: ps,
    });
    return {
      id: res.variantId,
      character: res.characterId,
      expression: res.state || expr,
      pose: ps,
      production: res.assetPath,
      mobile: res.assetPath,
      fallback: res.assetPath,
      transparent: true,
    };
  }

  console.warn(
    `[CharacterRenderer] Missing sprite: character=${characterNameOrId} pose=${pose || 'default'} expression=${expression || 'default'} asset=none`
  );
  return null;
}

