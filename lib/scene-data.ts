import {
  LocationDefinition,
  LocationId,
  VehicleSpot,
  PoseId,
  CameraAngleId,
  TimeOfDayId,
  ClothingId,
  HairstyleId,
  ExpressionId,
  HoldingHand,
  WeatherAtmosphere,
} from './types';

export const LOCATIONS: Record<LocationId, LocationDefinition> = {
  residential_street: {
    id: 'residential_street',
    name: 'Neighborhood Street',
    nameAr: 'شارع حي سكني',
    category: 'outdoor',
    categoryAr: 'خارجي',
    shortDesc: 'Quiet Saudi residential villa street with sand-toned boundary walls',
    shortDescAr: 'شارع فلل سكني هادئ بجدران طينية اللون وتفاصيل محلية',
    supportsVehicle: true,
    supportedVehicleSpots: ['none', 'inside_driver', 'beside_driver_door', 'leaning_front_fender', 'vehicle_soft_background'],
    defaultVehicleSpot: 'beside_driver_door',
    defaultPose: 'standing_door_frame',
    defaultCamera: 'eye_level_natural',
    defaultTime: 'golden_afternoon',
    availablePoses: ['standing_weight_shift', 'walking_mid_stride', 'looking_away_candid'],
    availableCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'],
    saudiDetails: [
      'sand-textured exterior villa perimeter wall',
      'yellow and black painted concrete roadside curb',
      'subtle split-system AC outdoor unit mounted high on wall',
      'clean dark asphalt street surface with subtle desert dust patina',
    ],
    saudiDetailsAr: [
      'جدار فيلا خارجي بلياسة رملية',
      'رصيف شارع مصبوغ بالأصفر والأسود',
      'وحدة تكييف سبليت خارجية معلقة بأعلى الجدار',
      'أسفلت نظيف مع أثر غبار صحراوي خفيف',
    ],
  },
  shaded_villa_parking: {
    id: 'shaded_villa_parking',
    name: 'Shaded Villa Carport',
    nameAr: 'موقف مظلل للفيلا',
    category: 'semi_shaded',
    categoryAr: 'شبه مظلل',
    shortDesc: 'Private villa parking shade with fabric canopy and interlocking pavers',
    shortDescAr: 'مظلة سيارات قماشية داخل فيلا مع بلاط إنترلوك',
    supportsVehicle: true,
    supportedVehicleSpots: ['inside_driver', 'beside_driver_door', 'leaning_front_fender', 'none'],
    defaultVehicleSpot: 'inside_driver',
    defaultPose: 'one_hand_wheel',
    defaultCamera: 'eye_level_natural',
    defaultTime: 'bright_midday',
    availablePoses: ['standing_door_frame', 'leaning_against_door'],
    availableCameras: ['eye_level_natural', 'low_chest_level', 'high_angle_tilt'],
    saudiDetails: [
      'heavy-duty tensile fabric parking canopy casting soft diffused shade',
      'neutral grey and beige interlocking concrete driveway pavers',
      'villa boundary wall painted in desert off-white finish',
      'warm ambient breeze under shaded canopy shielding the midday heat',
    ],
    saudiDetailsAr: [
      'مظلة قماشية متينة للسيارات تلقي ظلاً ناعماً',
      'بلاط إنترلوك خرساني بدرجات الرمادي والبيج',
      'جدار الفيلا بلون أبيض صحراوي مطفأ',
      'نسيم دافئ تحت المظلة يقي من حرارة الظهيرة',
    ],
  },
  open_commercial_lot: {
    id: 'open_commercial_lot',
    name: 'Open Commercial Parking',
    nameAr: 'مواقف تجارية مفتوحة',
    category: 'outdoor',
    categoryAr: 'خارجي',
    shortDesc: 'Spacious outdoor parking lot beside ordinary single-story commercial strip',
    shortDescAr: 'مواقف سيارات فسيحة بجانب محلات تجارية من طابق واحد',
    supportsVehicle: true,
    supportedVehicleSpots: ['none', 'inside_driver', 'beside_driver_door', 'walking_past_rear', 'vehicle_soft_background'],
    defaultVehicleSpot: 'walking_past_rear',
    defaultPose: 'walking_mid_stride',
    defaultCamera: 'wide_extended_arm',
    defaultTime: 'golden_afternoon',
    availablePoses: ['standing_weight_shift', 'walking_mid_stride', 'looking_away_candid'],
    availableCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'],
    saudiDetails: [
      'faded white painted parking stall line markers on dark asphalt',
      'ordinary single-level commercial shops with non-descript storefronts in soft focus',
      'tall pole-mounted floodlight mast',
      'low asphalt speed bump with worn yellow diagonal stripes',
    ],
    saudiDetailsAr: [
      'خطوط مواقف بيضاء باهتة على الأسفلت',
      'محلات تجارية عادية بواجهات غير بارزة في خلفية ناعمة',
      'عمود إنارة مرتفع للمواقف',
      'مطب أسفلتي مع خطوط صفراء ممسوحة جزئياً',
    ],
  },
  outdoor_cafe: {
    id: 'outdoor_cafe',
    name: 'Outdoor Neighborhood Café',
    nameAr: 'مقهى خارجي بالحي',
    category: 'semi_shaded',
    categoryAr: 'شبه مظلل',
    shortDesc: 'Modern neighborhood outdoor café terrace with shaded seating',
    shortDescAr: 'جلسة خارجية لمقهى عصري بالحي مع رذاذ تبريد',
    supportsVehicle: true,
    supportedVehicleSpots: ['none', 'vehicle_soft_background'],
    defaultVehicleSpot: 'none',
    defaultPose: 'seated_cafe_table',
    defaultCamera: 'eye_level_natural',
    defaultTime: 'golden_afternoon',
    availablePoses: ['seated_cafe_table', 'looking_away_candid', 'standing_weight_shift'],
    availableCameras: ['eye_level_natural', 'low_chest_level', 'high_angle_tilt'],
    saudiDetails: [
      'dark terrazzo or poured concrete outdoor café table',
      'iced specialty coffee glass with subtle surface condensation droplets',
      'fine cooling mist fan mounted overhead creating gentle atmospheric diffusion',
      'fluted concrete planters with green desert-adapted shrubs in background',
    ],
    saudiDetailsAr: [
      'طاولة تيرازو داكنة أو خرسانة ناعمة',
      'كوب قهوة مختصة مثلجة مع قطرات تكثف خفيفة',
      'مروحة رذاذ تبريد علوية تضفي ضبابية جوية ناعمة',
      'أحواض خرسانية بنباتات صحراوية في الخلفية',
    ],
  },
  neighborhood_park: {
    id: 'neighborhood_park',
    name: 'Neighborhood Walkway',
    nameAr: 'ممشى وحديقة الحي',
    category: 'outdoor',
    categoryAr: 'خارجي',
    shortDesc: 'Public pedestrian promenade with date palms and manicured border gravel',
    shortDescAr: 'ممشى مشاة هادئ مع نخيل وحصى أحمر منسق',
    supportsVehicle: true,
    supportedVehicleSpots: ['none', 'vehicle_soft_background'],
    defaultVehicleSpot: 'none',
    defaultPose: 'walking_mid_stride',
    defaultCamera: 'wide_extended_arm',
    defaultTime: 'sunset_twilight',
    availablePoses: ['walking_mid_stride', 'standing_weight_shift', 'looking_away_candid'],
    availableCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'],
    saudiDetails: [
      'stamped concrete pedestrian walkway bordered by crushed red gravel',
      'mature date palm trunks casting elongated evening shadows',
      'low warm LED bollard lights along the garden edging',
      'soft open twilight sky with calm evening air',
    ],
    saudiDetailsAr: [
      'ممشى خرساني مطبوع محاط بحصى أحمر',
      'جذوع نخل تلقي ظلالاً مسائية ممتدة',
      'أعمدة إنارة LED أرضية دافئة بمحاذاة الممشى',
      'سماء شفق هادئة مع نسيم مسائي لطيف',
    ],
  },
  desert_roadside: {
    id: 'desert_roadside',
    name: 'Desert Roadside Stop',
    nameAr: 'استراحة طريق صحراوي',
    category: 'outdoor',
    categoryAr: 'خارجي',
    shortDesc: 'Scenic highway pull-off where paved asphalt meets open desert sand',
    shortDescAr: 'وقفة جانبية على طريق سريع حيث يلتقي الأسفلت بالرمال',
    supportsVehicle: true,
    supportedVehicleSpots: ['leaning_front_fender', 'beside_driver_door', 'inside_driver', 'vehicle_soft_background', 'none'],
    defaultVehicleSpot: 'leaning_front_fender',
    defaultPose: 'front_quarter_angle',
    defaultCamera: 'wide_extended_arm',
    defaultTime: 'sunset_twilight',
    availablePoses: ['standing_weight_shift', 'looking_away_candid'],
    availableCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'],
    saudiDetails: [
      'clean edge where dark tarmac shoulder meets coarse golden desert gravel',
      'gentle undulating sand surface extending toward a distant low horizon',
      'warm desert dust suspension catching the golden low-sun horizon',
      'metal highway guardrail post visible in distant soft focus',
    ],
    saudiDetailsAr: [
      'حافة واضحة بين كتف الطريق الأسفلتي وحصى الصحراء الذهبي',
      'امتداد رملي ناعم نحو أفق منخفض وبعيد',
      'غبار صحراوي خفيف يلتقط وهج شمس المغيب الذهبية',
      'حاجز حماية معدني للطريق يظهر بتمويه ناعم بالخلف',
    ],
  },
  gas_station: {
    id: 'gas_station',
    name: 'Modern Service Station',
    nameAr: 'محطة وقود حديثة',
    category: 'semi_shaded',
    categoryAr: 'شبه مظلل',
    shortDesc: 'Brightly lit fuel station forecourt under wide illuminated canopy',
    shortDescAr: 'ساحة محطة وقود مضاءة بمظلة سقفية عريضة',
    supportsVehicle: true,
    supportedVehicleSpots: ['beside_driver_door', 'leaning_front_fender', 'inside_driver', 'none'],
    defaultVehicleSpot: 'beside_driver_door',
    defaultPose: 'standing_door_frame',
    defaultCamera: 'eye_level_natural',
    defaultTime: 'night_ambient',
    availablePoses: ['standing_door_frame', 'leaning_against_door'],
    availableCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'],
    saudiDetails: [
      'wide canopy ceiling fitted with clean flush recessed LED lighting panels',
      'polished concrete service forecourt with faint tire wear marks',
      'fuel dispenser pump island in soft background blur',
      'warm nighttime desert ambient breeze under luminous canopy',
    ],
    saudiDetailsAr: [
      'سقف مظلة عريض مجهز بوحدات إضاءة LED غاطسة ونقية',
      'أرضية خرسانية مصقولة مع آثار إطارات خفيفة',
      'مضخات الوقود بتمويه ناعم في الخلفية',
      'نسيم ليلي دافئ تحت المظلة المضيئة',
    ],
  },
  commercial_walkway: {
    id: 'commercial_walkway',
    name: 'Commercial Sidewalk',
    nameAr: 'رصيف تجاري',
    category: 'outdoor',
    categoryAr: 'خارجي',
    shortDesc: 'Paved sidewalk in front of contemporary limestone building facades',
    shortDescAr: 'رصيف مشاة مرصوف أمام واجهات حجر الرياض الحديثة',
    supportsVehicle: true,
    supportedVehicleSpots: ['none', 'vehicle_soft_background'],
    defaultVehicleSpot: 'none',
    defaultPose: 'walking_mid_stride',
    defaultCamera: 'eye_level_natural',
    defaultTime: 'night_ambient',
    availablePoses: ['walking_mid_stride', 'standing_weight_shift', 'looking_away_candid'],
    availableCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'],
    saudiDetails: [
      'honed beige Riyadh limestone building facade with vertical architectural grooves',
      'large commercial plate-glass display window with soft interior warm glow',
      'smooth grey granite sidewalk pavers with clean expansion joints',
      'ambient nighttime glow from contemporary storefront exterior downlights',
    ],
    saudiDetailsAr: [
      'واجهة مبنى من حجر الرياض البيج مع خطوط معمارية غائرة',
      'واجهة زجاجية تجارية كبيرة مع وهج داخلي دافئ',
      'بلاط رصيف من الغرانيت الرمادي بفواصل تمدد نظيفة',
      'وهج ليلي محيطي من إضاءات الواجهات العصرية',
    ],
  },
  elevator_mirror: {
    id: 'elevator_mirror',
    name: 'Modern Elevator Interior',
    nameAr: 'مرآة مصعد حديث',
    category: 'interior',
    categoryAr: 'داخلي',
    shortDesc: 'High-spec elevator with brushed stainless steel walls and mirror',
    shortDescAr: 'مصعد بتشطيب ستانلس ستيل مصقول ومرآة كاملة',
    supportsVehicle: false,
    supportedVehicleSpots: ['none'],
    defaultVehicleSpot: 'none',
    defaultPose: 'elevator_mirror_phone',
    defaultCamera: 'mirror_reflection_direct',
    defaultTime: 'night_ambient',
    availablePoses: ['elevator_mirror_phone', 'standing_weight_shift'],
    availableCameras: ['mirror_reflection_direct'],
    saudiDetails: [
      'brushed champagne or silver stainless steel elevator cab walls',
      'full-length clean mirror reflection with subtle phone corner in hand',
      'recessed circular LED ceiling lights providing soft diffused top illumination',
      'digital floor indicator glowing amber in soft corner reflection',
    ],
    saudiDetailsAr: [
      'جدران مصعد من الستانلس ستيل المصقول بلون فضي أو شامبانيا',
      'انعكاس مرآة كاملة ونظيفة مع طرف الهاتف باليد',
      'إضاءة سقفية دائرية غاطسة تعطي إضاءة علوية ناعمة',
      'شاشة مؤشر الأدوار الرقمية بلون كهرماني في الانعكاس',
    ],
  },
  stairway_landing: {
    id: 'stairway_landing',
    name: 'Architectural Stairwell',
    nameAr: 'بسطة درج معماري',
    category: 'interior',
    categoryAr: 'داخلي',
    shortDesc: 'Minimalist contemporary building stair landing with natural sidelight',
    shortDescAr: 'بسطة درج عصري بسيط مع إضاءة طبيعية جانبية',
    supportsVehicle: false,
    supportedVehicleSpots: ['none'],
    defaultVehicleSpot: 'none',
    defaultPose: 'leaning_wall_railing',
    defaultCamera: 'eye_level_natural',
    defaultTime: 'bright_midday',
    availablePoses: ['leaning_wall_railing', 'standing_weight_shift', 'looking_away_candid'],
    availableCameras: ['eye_level_natural', 'low_chest_level'],
    saudiDetails: [
      'smooth light grey poured terrazzo steps with matte metal nosing',
      'matte black architectural steel handrail with clean vertical balusters',
      'tall frosted window casting soft diffuse natural daylight across the landing',
      'clean off-white wall finish with crisp contemporary shadow gap baseboard',
    ],
    saudiDetailsAr: [
      'درجات تيرازو رمادية ناعمة مع حواف معدنية مطفأة',
      'درابزين حديدي أسود مطفأ بتصميم عمودي بسيط',
      'نافذة طولية زجاجية مثلجة تنشر ضوء النهار الطبيعي',
      'تشطيب جدار أبيض مع فواصل ظل معمارية نظيفة',
    ],
  },
  rooftop_terrace: {
    id: 'rooftop_terrace',
    name: 'Residential Rooftop (Stah)',
    nameAr: 'سطح منزل (السطح)',
    category: 'outdoor',
    categoryAr: 'خارجي',
    shortDesc: 'Private rooftop terrace with low parapet wall and open desert sky',
    shortDescAr: 'سطح سكني خاص مع سترة منخفضة وسماء مفتوحة',
    supportsVehicle: false,
    supportedVehicleSpots: ['none'],
    defaultVehicleSpot: 'none',
    defaultPose: 'rooftop_parapet_lean',
    defaultCamera: 'wide_extended_arm',
    defaultTime: 'sunset_twilight',
    availablePoses: ['rooftop_parapet_lean', 'standing_weight_shift', 'looking_away_candid'],
    availableCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'],
    saudiDetails: [
      'waist-high plaster parapet boundary wall with textured beige exterior paint',
      'grey roof gravel tiles with clean drainage slope',
      'subtle split AC outdoor compressor unit positioned discreetly against far wall',
      'expansive open Riyadh/Saudi sky transitioning into deep violet-orange twilight',
    ],
    saudiDetailsAr: [
      'سترة جدارية بارتفاع الخصر بدهان بيج خشن',
      'بلاط حصوي لسطح المنزل مع ميول تصريف نظيف',
      'وحدة تكييف سبليت خارجية موضوعة بهدوء عند الجدار البعيد',
      'سماء واسعة ومفتوحة تتحول إلى ألوان الشفق البرتقالي والبنفسجي',
    ],
  },
};

export const VEHICLE_DETAILS = {
  make: 'Land Rover',
  model: 'Range Rover Sport Autobiography Dynamic',
  generation: 'L494 (MY2017 Pre-Facelift)',
  spec: 'Saudi-spec, Left-Hand Drive (LHD)',
  exteriorColor: 'Fuji White',
  interiorTheme: 'Ebony & Ivory duo-tone leather',
  seating: 'Ivory perforated Oxford leather luxury seats with contrast piping',
  trim: 'Grand Black piano veneer center console and door inserts',
  roof: 'Full panoramic sliding glass sunroof with ambient roof liner',
  centerConsole: 'Authentic MY2017 pre-facelift layout: single 10.2-inch InControl Touch Pro widescreen display, physical rotary dual-zone climate dials with integrated temperature LCDs, tactile volume knob, rotary gear selector dial, Land Rover Terrain Response switchpack',
};

export const VEHICLE_SPOTS: Record<VehicleSpot, {
  label: string;
  labelAr?: string;
  description: string;
  descriptionAr?: string;
  allowedPoses: PoseId[];
  allowedCameras: CameraAngleId[];
}> = {
  none: {
    label: 'No Vehicle in Scene',
    labelAr: 'بدون سيارة',
    description: 'Pedestrian or standalone environment without vehicle interaction',
    descriptionAr: 'مشهد للمشاة أو بيئة مستقلة بدون تفاعل مع السيارة',
    allowedPoses: [
      'standing_weight_shift',
      'walking_mid_stride',
      'leaning_wall_railing',
      'seated_cafe_table',
      'looking_away_candid',
      'elevator_mirror_phone',
      'rooftop_parapet_lean',
    ],
    allowedCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm', 'high_angle_tilt', 'mirror_reflection_direct'],
  },
  inside_driver: {
    label: 'Inside: Driver Seat (LHD)',
    labelAr: 'مقعد السائق',
    description: 'Seated behind the wheel in the MY2017 Ivory perforated leather cabin',
    descriptionAr: 'جلوس خلف المقود في مقصورة MY2017 بجلد عاجي مخرم',
    allowedPoses: [
      'one_hand_wheel',
      'center_armrest_lean',
      'casual_seatback_recline',
      'side_window_gaze',
    ],
    allowedCameras: ['eye_level_natural', 'low_chest_level', 'high_angle_tilt'],
  },
  beside_driver_door: {
    label: 'Beside Driver Door',
    labelAr: 'بجانب باب السائق',
    description: 'Standing alongside the driver side of the Fuji White Range Rover Sport',
    descriptionAr: 'وقوف بمحاذاة جهة السائق لرينج روفر سبورت باللون الأبيض الفوجي',
    allowedPoses: [
      'standing_door_frame',
      'leaning_against_door',
      'standing_weight_shift',
      'looking_away_candid',
    ],
    allowedCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'],
  },
  leaning_front_fender: {
    label: 'Leaning on Front Fender',
    labelAr: 'اتكاء على الرفرف',
    description: 'Leaning casually against the front quarter / fender of the vehicle',
    descriptionAr: 'اتكاء عفوي على الرفرف الأمامي وحافة الكبوت',
    allowedPoses: [
      'front_quarter_angle',
      'standing_weight_shift',
      'looking_away_candid',
    ],
    allowedCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'],
  },
  walking_past_rear: {
    label: 'Walking Past Rear',
    labelAr: 'مشي خلف السيارة',
    description: 'Casual mid-step movement near the tailgate and black contrast roof line',
    descriptionAr: 'حركة مشي طبيعية بالقرب من باب الشنطة وسقف التباين الأسود',
    allowedPoses: [
      'walking_mid_stride',
      'looking_away_candid',
      'standing_weight_shift',
    ],
    allowedCameras: ['eye_level_natural', 'wide_extended_arm'],
  },
  vehicle_soft_background: {
    label: 'Parked in Soft Background',
    labelAr: 'السيارة في الخلفية',
    description: 'The Fuji White Range Rover Sport is parked naturally behind the subject in soft bokeh',
    descriptionAr: 'رينج روفر سبورت أبيض فوجي متوقفة طبيعياً في الخلفية بتمويه ناعم',
    allowedPoses: [
      'standing_weight_shift',
      'walking_mid_stride',
      'seated_cafe_table',
      'looking_away_candid',
    ],
    allowedCameras: ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'],
  },
};

export const POSES: Record<PoseId, {
  label: string;
  labelAr?: string;
  shortLabel: string;
  shortLabelAr?: string;
  biomechanics: string;
  biomechanicsAr?: string;
  requiresVehicleSpot?: VehicleSpot[];
}> = {
  // Inside Vehicle
  one_hand_wheel: {
    label: 'Hand on Steering Wheel',
    labelAr: 'يد على المقود',
    shortLabel: 'Wheel Grip',
    shortLabelAr: 'مسكة المقود',
    biomechanics: 'Right hand holds the smartphone at eye level angled slightly inward, while the left wrist rests casually on the upper arc of the perforated leather steering wheel. Natural shoulder drop with head tilted subtly toward the front lens.',
    biomechanicsAr: 'اليد اليمنى تحمل الهاتف بمستوى العين بزاوية خفيفة، بينما يسترخي معصم اليد اليسرى على القوس العلوي لمقود الجلد المخرم مع ميلان رأس خفيف نحو العدسة.',
    requiresVehicleSpot: ['inside_driver'],
  },
  center_armrest_lean: {
    label: 'Leaning on Center Armrest',
    labelAr: 'اتكاء على الكونسول',
    shortLabel: 'Console Lean',
    shortLabelAr: 'اتكاء الكونسول',
    biomechanics: 'Body weight shifted comfortably toward the center console, right forearm resting lightly on the padded Ivory leather armrest holding the phone, relaxed left arm resting on lap, natural relaxed posture.',
    biomechanicsAr: 'وزن الجسم مائل بارتياح نحو الكونسول الوسطي، والساعد الأيمن يرتكز على التكاية الجلدية العاجية حاملاً الهاتف، واليد اليسرى مسترخية بالحجر.',
    requiresVehicleSpot: ['inside_driver'],
  },
  casual_seatback_recline: {
    label: 'Relaxed Seatback Recline',
    labelAr: 'استرخاء على المقعد',
    shortLabel: 'Seat Recline',
    shortLabelAr: 'استرخاء المقعد',
    biomechanics: 'Upper torso resting back against the contoured Ivory leather headrest, arm extended forward at a gentle 35-degree angle holding the smartphone, casual relaxed posture inside the cabin.',
    biomechanicsAr: 'الجزء العلوي من الظهر يستند على مسند الرأس الجلدي العاجي، واليد ممتدة للأمام بزاوية 35 درجة ممسكة بالهاتف في استرخاء عفوي.',
    requiresVehicleSpot: ['inside_driver'],
  },
  side_window_gaze: {
    label: 'Turned toward Driver Window',
    labelAr: 'التفات نحو النافذة',
    shortLabel: 'Window Gaze',
    shortLabelAr: 'نظرة النافذة',
    biomechanics: 'Face turned naturally three-quarters toward the driver-side window catching side ambient illumination, phone held slightly to the right side of the face capturing a candid profile-selfie angle.',
    biomechanicsAr: 'التفات الوجه بزاوية ثلاثة أرباع نحو نافذة السائق لالتقاط الضوء الجانبي، والهاتف على الجانب الأيمن بزاوية بروفايل سيلفي عفوية.',
    requiresVehicleSpot: ['inside_driver'],
  },

  // Beside Vehicle
  standing_door_frame: {
    label: 'Standing by Open Door',
    labelAr: 'وقوف عند الباب',
    shortLabel: 'Door Open',
    shortLabelAr: 'الباب مفتوح',
    biomechanics: 'Standing on the asphalt beside the open driver door, left hand resting casually on the top metal window frame, right arm extended holding the smartphone in a natural handheld selfie grip.',
    biomechanicsAr: 'وقوف على الأسفلت بجانب باب السائق المفتوح، اليد اليسرى ترتكز على إطار النافذة والذراع اليمنى ممتدة بالسيلفي الطبيعي.',
    requiresVehicleSpot: ['beside_driver_door'],
  },
  leaning_against_door: {
    label: 'Leaning on Driver Door',
    labelAr: 'اتكاء على الباب',
    shortLabel: 'Door Lean',
    shortLabelAr: 'اتكاء الباب',
    biomechanics: 'Shoulder and hip lightly touching the shut Fuji White door panel, legs crossed loosely at the ankles, phone held in one hand with natural wrist angle at upper chest height.',
    biomechanicsAr: 'الكتف والورك يستندان بخفة على الباب الأبيض المغلق، والأرجل متقاطعة بارتخاء، والهاتف ممسوك بيد واحدة بمستوى أعلى الصدر.',
    requiresVehicleSpot: ['beside_driver_door'],
  },
  front_quarter_angle: {
    label: 'Angled by Front Headlight',
    labelAr: 'زاوية أمامية جانبية',
    shortLabel: 'Front Quarter',
    shortLabelAr: 'الزاوية الأمامية',
    biomechanics: 'Standing half-turned by the front fender and gloss black grill, weight anchored on rear leg, free hand slipped loosely into pocket, phone held outward in a relaxed one-handed selfie posture.',
    biomechanicsAr: 'وقوف نصف مائل بجانب الرفرف الأمامي والشبك الأسود، ارتكاز الوزن على الساق الخلفية، واليد الحرة بالجيب بارتخاء.',
    requiresVehicleSpot: ['leaning_front_fender'],
  },

  // General Poses
  standing_weight_shift: {
    label: 'Relaxed Standing (Weight Shifted)',
    labelAr: 'وقوف مسترخٍ',
    shortLabel: 'Standing',
    shortLabelAr: 'وقوف مسترخٍ',
    biomechanics: 'Natural standing posture with body weight shifted casually to one hip, spine relaxed without rigid posing, dominant arm extended in front at natural arm-reach, free hand hanging loosely.',
    biomechanicsAr: 'وقفة طبيعية مع ارتكاز وزن الجسم على أحد الوركين، واستقامة مريحة للظهر، واليد ممتدة للأمام بمسافة ذراع طبيعية.',
  },
  walking_mid_stride: {
    label: 'Walking Mid-Stride (Candid)',
    labelAr: 'مشي عفوي',
    shortLabel: 'Mid-Stride',
    shortLabelAr: 'خطوة مشي',
    biomechanics: 'Captured mid-step with natural foot forward movement, torso slightly angled with kinetic balance, free hand caught in mid-swing, phone stabilized in hand showing believable minor motion authenticity.',
    biomechanicsAr: 'التقاط منتصف الخطوة أثناء المشي بتوازن حركي، واليد الحرة في حركة تأرجح طبيعية، والهاتف ثابت باليد بحركة واقعية.',
  },
  leaning_wall_railing: {
    label: 'Leaning on Railing / Wall',
    labelAr: 'اتكاء على جدار',
    shortLabel: 'Railing Lean',
    shortLabelAr: 'اتكاء جدار',
    biomechanics: 'Back or elbow rested gently against the architectural surface, weight distributed comfortably, phone held forward at a comfortable 45cm distance from face.',
    biomechanicsAr: 'الظهر أو الكوع يستند بهدوء على الجدار أو الدرابزين، والهاتف ممتد بمسافة مريحة حوالي 45 سم عن الوجه.',
  },
  seated_cafe_table: {
    label: 'Seated at Outdoor Table',
    labelAr: 'جلوس على طاولة',
    shortLabel: 'Seated Table',
    shortLabelAr: 'جلسة طاولة',
    biomechanics: 'Seated comfortably on outdoor café chair, one forearm resting flat on the tabletop near the iced glass, the other arm bent with hand holding phone upright at face level.',
    biomechanicsAr: 'جلوس مريح على كرسي المقهى الخارجي، ساعد اليد يرتكز على الطاولة بجانب الكوب، واليد الأخرى مرفوعة بالهاتف بمستوى الوجه.',
  },
  looking_away_candid: {
    label: 'Looking Just Past Camera',
    labelAr: 'نظرة جانبية',
    shortLabel: 'Looking Away',
    shortLabelAr: 'نظرة جانبية',
    biomechanics: 'Handheld arm-length selfie position with face turned slightly off-axis, gaze directed just over the top of the smartphone as if observing something in the surrounding street.',
    biomechanicsAr: 'سيلفي بمسافة الذراع مع التفات الوجه قليلاً بعيداً عن العدسة، كأن النظر متوجه لشيء عابر في الشارع المحيط.',
  },
  elevator_mirror_phone: {
    label: 'Mirror Selfie (Phone in Reflection)',
    labelAr: 'سيلفي المرآة',
    shortLabel: 'Mirror Reflection',
    shortLabelAr: 'انعكاس المرآة',
    biomechanics: 'Standing centered before the clean mirror, smartphone held with two hands or one hand at chest level angled toward the mirror surface, capturing self and camera reflection naturally.',
    biomechanicsAr: 'وقوف متزن أمام المرآة النظيفة، الهاتف ممسوك بمستوى الصدر موجه نحو سطح المرآة ليعكس الشخص والهاتف طبيعياً.',
  },
  rooftop_parapet_lean: {
    label: 'Leaning on Rooftop Parapet',
    labelAr: 'اتكاء على السترة',
    shortLabel: 'Parapet Lean',
    shortLabelAr: 'اتكاء السترة',
    biomechanics: 'Forearms or back rested lightly along the top edge of the waist-high parapet wall, phone held outward with open skyline behind, wind gently rustling hair.',
    biomechanicsAr: 'الساعدان يستندان بخفة على الحافة العلوية لسترة السطح، والهاتف ممتد للخارج مع ظهور أفق السماء المفتوحة بالخلف.',
  },
};

export const CAMERAS: Record<CameraAngleId, {
  label: string;
  labelAr?: string;
  description: string;
  descriptionAr?: string;
  perspective: string;
}> = {
  eye_level_natural: {
    label: 'Natural Eye-Level (Arm Reach)',
    labelAr: 'مستوى العين',
    description: 'Held at eye height (~50-60cm distance) with subtle 24mm smartphone lens geometry',
    descriptionAr: 'بارتفاع مستوى العين (~50-60 سم) مع هندسة عدسة الهاتف الذكي 24 مم',
    perspective: 'Believable human arm-length geometry, subject centered or slightly off-third, natural slight perspective expansion typical of modern smartphone 24mm equivalent wide main/front sensor.',
  },
  low_chest_level: {
    label: 'Casual Chest-Level (Slight Upward Tilt)',
    labelAr: 'مستوى الصدر',
    description: 'Held slightly lower at upper-chest height, tilted gently upward',
    descriptionAr: 'مسكة منخفضة بمستوى أعلى الصدر مع زاوية ميلان خفيفة نحو الأعلى',
    perspective: 'Casual relaxed grip held lower than eye line, looking slightly up into the lens with authentic chin and jawline definition, showing ceiling or open sky behind.',
  },
  wide_extended_arm: {
    label: 'Full Extended Arm (0.5x / Wide Field)',
    labelAr: 'عدسة عريضة',
    description: 'Full arm stretch capturing contextual environment and vehicle scale',
    descriptionAr: 'امتداد ذراع كامل لالتقاط تفاصيل البيئة المحيطة وحجم السيارة',
    perspective: 'Extended forward reach with visible shoulder/bicep lead-in, wide field of view showcasing background depth, authentic smartphone edge distortion and environmental immersion.',
  },
  high_angle_tilt: {
    label: 'Slight High-Angle Tilt',
    labelAr: 'زاوية علوية',
    description: 'Arm raised gently above eye level tilted down towards face and seat',
    descriptionAr: 'رفع اليد فوق مستوى العين قليلاً مع ميلان نحو الأسفل لإظهار مقعد السيارة والكونسول',
    perspective: 'Camera positioned approximately 15 degrees above eye level tilted downward, showing driver seat lap, center console details or floor surface in believable perspective.',
  },
  mirror_reflection_direct: {
    label: 'Direct Mirror Perspective',
    labelAr: 'انعكاس المرآة',
    description: 'True optical mirror reflection showing rear camera phone body held in hand',
    descriptionAr: 'لقطة منعكسة عبر المرآة مع ظهور جسم الهاتف والكاميرات الخلفية باليد',
    perspective: 'Shot reflected through clean interior mirror surface, phone with modern matte glass back and camera bump held naturally in hand, true two-plane depth of field.',
  },
};

export const TIMES_OF_DAY: Record<TimeOfDayId, {
  label: string;
  labelAr?: string;
  badge: string;
  badgeAr?: string;
  description: string;
  descriptionAr?: string;
  lightingDetails: string;
}> = {
  bright_midday: {
    label: 'Bright Sun & Clear Sky',
    labelAr: 'شمس ساطعة (الظهر)',
    badge: '1:00 PM · Bright Sun',
    badgeAr: '1:00 م · شمس ساطعة',
    description: 'Direct high Saudi desert sun with crisp shadows and subtle atmospheric heat haze',
    descriptionAr: 'شمس صحراوية عمودية وظلال حادة واضحة مع عوالق ترابية خفيفة',
    lightingDetails: 'High overhead sun filtered through clear arid atmosphere, sharp defined shadows cast directly beneath, realistic high-contrast specular highlights on car paint and sunglasses, realistic smartphone HDR shadow fill.',
  },
  golden_afternoon: {
    label: 'Golden Hour (Asr)',
    labelAr: 'العصر (الساعة الذهبية)',
    badge: '4:45 PM · Golden Light',
    badgeAr: '4:45 م · ضوء ذهبي',
    description: 'Warm low-angled desert sunlight creating long shadows and amber surface glow',
    descriptionAr: 'أشعة شمس ذهبية مائلة تلقي ظلالاً طويلة وتوهجاً دافئاً على الأسفلت',
    lightingDetails: 'Low 25-degree warm amber sunlight hitting one side of the face with soft golden glow, long dramatic shadows cast across asphalt and pavers, rich warm reflections across white vehicle panels.',
  },
  sunset_twilight: {
    label: 'Sunset / Maghrib Twilight',
    labelAr: 'المغرب (الشفق)',
    badge: '6:15 PM · Twilight',
    badgeAr: '6:15 م · الشفق',
    description: 'Soft gradient sky from indigo to warm orange, ambient city lights beginning to glow',
    descriptionAr: 'تدرج السماء من النيلي للبرتقالي، وبدء توهج إنارة المدينة والمصابيح',
    lightingDetails: 'Deep gradient evening sky transitioning from dusty cobalt to warm saffron, balanced soft ambient sky fill, early warm incandescent streetlights and vehicle LED daytime running lights casting soft accents.',
  },
  night_ambient: {
    label: 'Night Ambient & Street Lights',
    labelAr: 'أجواء ليلية',
    badge: '9:30 PM · Night Atmosphere',
    badgeAr: '9:30 م · أجواء ليلية',
    description: 'Sodium/LED streetlights, warm commercial spill, and vehicle interior glow',
    descriptionAr: 'إنارة أعمدة الشارع الصوديوم/LED، وتوهج شاشات المقصورة والواجهات',
    lightingDetails: 'Authentic nighttime smartphone photography with balanced low-light noise, warm 3000K street and parking lot illumination, dashboard instrumentation backlight softly lighting driver hands and cabin.',
  },
};

export const CLOTHING_OPTIONS: Record<ClothingId, {
  label: string;
  labelAr?: string;
  description: string;
  descriptionAr?: string;
  promptSnippet: string;
}> = {
  white_thobe_crisp: {
    label: 'Crisp White Saudi Thobe',
    labelAr: 'ثوب أبيض مكوي',
    description: 'Clean pressed Saudi thobe with structured stand-up collar',
    descriptionAr: 'ثوب أبيض نظيف ومكوي مع ياقة قلابي قائمة وقماش ناعم',
    promptSnippet: 'wearing a crisp, immaculate white Saudi thobe tailored with a clean stand-up collar and smooth matte fabric texture',
  },
  white_thobe_shemagh: {
    label: 'Thobe & Draped Shemagh',
    labelAr: 'ثوب وشماغ منسدل',
    description: 'White thobe with red-and-white shemagh loosely draped over shoulders',
    descriptionAr: 'ثوب أبيض مع شماغ أحمر وأبيض منسدل بعفوية على الأكتاف بدون عقال',
    promptSnippet: 'wearing a pristine white thobe paired with a red-and-white patterned shemagh draped casually over the shoulders without an agal',
  },
  casual_oversized_tee: {
    label: 'Neutral Crewneck Tee',
    labelAr: 'تيشيرت بقصة مريحة',
    description: 'Heavyweight relaxed crewneck in washed sand or stone grey',
    descriptionAr: 'تيشيرت قطني ثقيل بقصة واسعة بلون رمادي حجري أو رملي مغسول',
    promptSnippet: 'wearing a relaxed-fit heavyweight neutral stone-grey cotton crewneck t-shirt with subtle natural fabric drape',
  },
  linen_buttondown_neutral: {
    label: 'Beige Linen Overshirt',
    labelAr: 'قميص كتان بيج',
    description: 'Unbuttoned relaxed linen shirt over plain white undershirt',
    descriptionAr: 'قميص كتان بيج خفيف مفتوح فوق تيشيرت داخلي أبيض بياقة دائرية',
    promptSnippet: 'wearing a light beige breathable linen button-down shirt worn open over a clean white crewneck undershirt',
  },
  hoodie_streetwear: {
    label: 'Minimalist Matte Hoodie',
    labelAr: 'هودي كاجوال',
    description: 'Clean black or charcoal pullover hoodie with relaxed fit',
    descriptionAr: 'هودي أسود أو رمادي فحمي مطفأ بقصة كتاف مهدلة وعصرية',
    promptSnippet: 'wearing a minimalist matte charcoal pullover hoodie with a clean modern drop-shoulder silhouette',
  },
};

export const HAIRSTYLES: Record<HairstyleId, {
  label: string;
  labelAr?: string;
  description: string;
  descriptionAr?: string;
  promptSnippet: string;
}> = {
  taper_fade_clean: {
    label: 'Clean Low Taper Fade',
    labelAr: 'تدرج خفيف',
    description: 'Sharp low taper on sides with well-groomed, textured dark hair on top',
    descriptionAr: 'تدريج جانبي منخفض ونظيف مع شعر أسود طبيعي مرتب من الأعلى',
    promptSnippet: 'clean modern low taper fade haircut with well-groomed, natural black hair textured neatly on top',
  },
  natural_wavy_volume: {
    label: 'Natural Waves with Volume',
    labelAr: 'تموجات طبيعية',
    description: 'Relaxed wavy hair with natural movement and subtle matte volume',
    descriptionAr: 'شعر مموج طبيعي بحجم مريح وحركة يومية عفوية',
    promptSnippet: 'natural dark wavy hair with soft volume and effortless everyday movement',
  },
  crop_matte_texture: {
    label: 'Short Textured Crop',
    labelAr: 'قصة فرنسية قصيرة',
    description: 'Short contemporary French crop with clean temples and matte finish',
    descriptionAr: 'قصة شعر قصيرة عصرية مع تدريج ناعم ومظهر غير لامع',
    promptSnippet: 'short contemporary textured crop cut with clean faded temples and natural hair texture',
  },
  comb_over_neat: {
    label: 'Classic Side-Comb',
    labelAr: 'فرق جانبي كلاسيكي',
    description: 'Neatly styled classic side part with subtle sheen and groomed hairline',
    descriptionAr: 'تسريحة كلاسيكية بمفرق جانبي مصفف بعناية ولمعان خفيف',
    promptSnippet: 'neatly styled classic side-part comb haircut with subtle natural sheen and disciplined grooming',
  },
};

export const EXPRESSIONS: Record<ExpressionId, {
  label: string;
  labelAr?: string;
  description: string;
  descriptionAr?: string;
  promptSnippet: string;
}> = {
  subtle_smirk: {
    label: 'Subtle Confident Smirk',
    labelAr: 'ابتسامة خفيفة وواثقة',
    description: 'Understated relaxed half-smile with calm, confident eye contact',
    descriptionAr: 'نصف ابتسامة هادئة غير متكلفة مع تواصل بصري واثق بالعدسة',
    promptSnippet: 'a subtle, understated relaxed half-smirk with calm and confident eye contact directed at the smartphone lens',
  },
  calm_neutral: {
    label: 'Calm Relaxed Neutral',
    labelAr: 'ملامح هادئة',
    description: 'Effortless relaxed facial posture without forced posing',
    descriptionAr: 'ملامح وجه طبيعية ومسترخية بدون تصنع مع نظرة ثابتة للكاميرا',
    promptSnippet: 'a natural, calm and relaxed neutral facial expression with steady authentic gaze toward the front camera',
  },
  candid_smile: {
    label: 'Candid Warm Smile',
    labelAr: 'ابتسامة عفوية',
    description: 'Genuine mid-moment smile with soft crinkles around the eyes',
    descriptionAr: 'ابتسامة عفوية حقيقية مع تجاعيد ناعمة حول العينين تعكس لحظة يومية لطيفة',
    promptSnippet: 'a warm, authentic candid mid-smile with relaxed eyes reflecting a pleasant everyday moment',
  },
  glancing_off_camera: {
    label: 'Thoughtful Glance Off-Camera',
    labelAr: 'نظرة جانبية هادئة',
    description: 'Natural candid gaze directed slightly to the side past the phone',
    descriptionAr: 'ملامح هادئة مع توجيه النظر قليلاً بجانب شاشة الهاتف نحو المحيط',
    promptSnippet: 'a thoughtful, candid facial expression with gaze naturally directed slightly past the phone screen toward the surroundings',
  },
};

export const HOLDING_HANDS: Record<HoldingHand, {
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
}> = {
  right: {
    label: 'Right Hand',
    labelAr: 'اليد اليمنى',
    description: 'Smartphone held with dominant right hand, right shoulder slightly raised',
    descriptionAr: 'حمل الهاتف باليد اليمنى مع امتداد طبيعي للكتف الأيمن',
  },
  left: {
    label: 'Left Hand',
    labelAr: 'اليد اليسرى',
    description: 'Smartphone held with left hand, angling perspective and catching side light',
    descriptionAr: 'حمل الهاتف باليد اليسرى وتوجيه زاوية المشهد والضوء',
  },
};

export const WEATHER_ATMOSPHERES: Record<WeatherAtmosphere, {
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
  promptSnippet: string;
}> = {
  clear_crisp: {
    label: 'Clear & Crisp',
    labelAr: 'معتدل صافٍ',
    description: 'Clean arid atmosphere with sharp visibility and transparent shadows',
    descriptionAr: 'أجواء صافية مع وضوح بصري عالٍ وظلال نظيفة',
    promptSnippet: 'crystal-clear arid Saudi atmosphere with pristine atmospheric visibility and natural transparent shadow edges',
  },
  heat_haze: {
    label: 'Dry Arid Heat',
    labelAr: 'صيف جاف (سراب)',
    description: 'Warm arid air with subtle heat haze shimmering over distant asphalt',
    descriptionAr: 'حرارة جافة مع تموجات سرابية خفيفة فوق الأسفلت البعيد ولمعان خفيف',
    promptSnippet: 'subtle natural heat haze shimmering faintly over the distant asphalt background with authentic desert thermal atmosphere',
  },
  dust_suspension: {
    label: 'Golden Dust Glow',
    labelAr: 'عوالق ذهبية',
    description: 'Soft micro-dust particles catching low amber sunbeams in a warm glow',
    descriptionAr: 'عوالق ترابية ناعمة جداً تشتت أشعة الشمس بوهج كهرماني دافئ',
    promptSnippet: 'soft micro-fine desert dust particles suspended in the dry air, gently scattering sunlight into a warm natural amber halo',
  },
};

export const IMPERFECTION_OPTIONS: Record<'authentic' | 'raw_candid', {
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
}> = {
  authentic: {
    label: 'Camera Roll Reality',
    labelAr: 'واقعية عفوية',
    description: 'Authentic smartphone roll feel: micro ISO grain, subtle dynamic roll-off, natural unedited texture',
    descriptionAr: 'واقعية ألبوم الكاميرا: تحبب مستشعر طبيعي، ونعومة حركة عفوية خفيفة',
  },
  raw_candid: {
    label: 'Clean Story Capture',
    labelAr: 'ستوري معاصرة',
    description: 'Contemporary clean phone capture with sharp focus and restrained computational HDR',
    descriptionAr: 'لقطة سيلفي معاصرة ونقية مع تركيز بصري حاد وHDR متوازن',
  },
};

