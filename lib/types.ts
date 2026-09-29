export type LocationId =
  | 'residential_street'
  | 'shaded_villa_parking'
  | 'open_commercial_lot'
  | 'outdoor_cafe'
  | 'neighborhood_park'
  | 'desert_roadside'
  | 'gas_station'
  | 'commercial_walkway'
  | 'elevator_mirror'
  | 'stairway_landing'
  | 'rooftop_terrace';

export type VehicleSpot =
  | 'none'
  | 'inside_driver'
  | 'beside_driver_door'
  | 'leaning_front_fender'
  | 'walking_past_rear'
  | 'vehicle_soft_background';

export type PoseId =
  // Inside Vehicle Poses
  | 'one_hand_wheel'
  | 'center_armrest_lean'
  | 'casual_seatback_recline'
  | 'side_window_gaze'
  // Beside / Around Vehicle Poses
  | 'standing_door_frame'
  | 'leaning_against_door'
  | 'front_quarter_angle'
  // General Outdoor & Standing Poses
  | 'standing_weight_shift'
  | 'walking_mid_stride'
  | 'leaning_wall_railing'
  | 'looking_away_candid'
  // Seated & Specialized Poses
  | 'seated_cafe_table'
  | 'elevator_mirror_phone'
  | 'rooftop_parapet_lean';

export type CameraAngleId =
  | 'eye_level_natural'
  | 'low_chest_level'
  | 'wide_extended_arm'
  | 'high_angle_tilt'
  | 'mirror_reflection_direct';

export type TimeOfDayId =
  | 'bright_midday'
  | 'golden_afternoon'
  | 'sunset_twilight'
  | 'night_ambient';

export type ClothingId =
  | 'white_thobe_crisp'
  | 'white_thobe_shemagh'
  | 'casual_oversized_tee'
  | 'linen_buttondown_neutral'
  | 'hoodie_streetwear';

export type HairstyleId =
  | 'taper_fade_clean'
  | 'natural_wavy_volume'
  | 'crop_matte_texture'
  | 'comb_over_neat';

export type ExpressionId =
  | 'subtle_smirk'
  | 'calm_neutral'
  | 'candid_smile'
  | 'glancing_off_camera';

export type TargetEngine = 'chatgpt' | 'gemini';
export type HoldingHand = 'right' | 'left';
export type WeatherAtmosphere = 'clear_crisp' | 'heat_haze' | 'dust_suspension';

export interface SceneState {
  locationId: LocationId;
  vehicleSpot: VehicleSpot;
  poseId: PoseId;
  cameraAngleId: CameraAngleId;
  timeOfDayId: TimeOfDayId;
  clothingId: ClothingId;
  hairstyleId: HairstyleId;
  expressionId: ExpressionId;
  targetEngine: TargetEngine;
  imperfectionLevel: 'authentic' | 'raw_candid';
  holdingHand: HoldingHand;
  weatherAtmosphere: WeatherAtmosphere;
}

export interface FavoriteScene {
  id: string;
  timestamp: number;
  title: string;
  state: SceneState;
}

export interface LocationDefinition {
  id: LocationId;
  name: string;
  nameAr?: string;
  category: 'outdoor' | 'semi_shaded' | 'interior';
  categoryAr?: string;
  shortDesc: string;
  shortDescAr?: string;
  supportsVehicle: boolean;
  supportedVehicleSpots: VehicleSpot[];
  defaultVehicleSpot: VehicleSpot;
  defaultPose: PoseId;
  defaultCamera: CameraAngleId;
  defaultTime: TimeOfDayId;
  availablePoses: PoseId[];
  availableCameras: CameraAngleId[];
  saudiDetails: string[];
  saudiDetailsAr?: string[];
}
