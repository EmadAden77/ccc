import {
  LocationId,
  VehicleSpot,
  PoseId,
  CameraAngleId,
  SceneState,
} from './types';
import { LOCATIONS } from './scene-data';

/**
 * Returns allowed vehicle spots for a given location.
 * Strictly enforces that non-vehicular environments (elevators, rooftops, stairways)
 * only permit 'none'.
 */
export function getValidVehicleSpots(locId: LocationId): VehicleSpot[] {
  const loc = LOCATIONS[locId];
  if (!loc || !loc.supportsVehicle) {
    return ['none'];
  }
  return loc.supportedVehicleSpots;
}

/**
 * Returns physically possible poses for a given location and vehicle presence.
 * Validates the existence of physical support surfaces (car door, parapet, café table, mirror, railing).
 */
export function getValidPoses(locId: LocationId, vSpot: VehicleSpot): PoseId[] {
  // Inside Vehicle: strictly cabin-seated poses
  if (vSpot === 'inside_driver') {
    return [
      'one_hand_wheel',
      'center_armrest_lean',
      'casual_seatback_recline',
      'side_window_gaze',
    ];
  }

  // Beside Door: door frame contact or relaxed door-lean
  if (vSpot === 'beside_driver_door') {
    return [
      'standing_door_frame',
      'leaning_against_door',
      'standing_weight_shift',
      'looking_away_candid',
    ];
  }

  // Front Fender: front headlight/grille angle
  if (vSpot === 'leaning_front_fender') {
    return [
      'front_quarter_angle',
      'standing_weight_shift',
      'looking_away_candid',
    ];
  }

  // Walking past rear
  if (vSpot === 'walking_past_rear') {
    return ['walking_mid_stride', 'standing_weight_shift', 'looking_away_candid'];
  }

  // Specialized Location Surfaces
  if (locId === 'elevator_mirror') {
    // Strictly optical mirror reflection with phone held towards mirror
    return ['elevator_mirror_phone'];
  }

  if (locId === 'outdoor_cafe') {
    // Table surface available
    return ['seated_cafe_table', 'looking_away_candid', 'standing_weight_shift'];
  }

  if (locId === 'rooftop_terrace') {
    // Parapet wall available
    return ['rooftop_parapet_lean', 'standing_weight_shift', 'looking_away_candid'];
  }

  if (locId === 'stairway_landing') {
    // Steel handrail / wall surface available
    return ['leaning_wall_railing', 'standing_weight_shift', 'looking_away_candid'];
  }

  // Locations with wall/facade contact available
  if (
    locId === 'residential_street' ||
    locId === 'shaded_villa_parking' ||
    locId === 'commercial_walkway'
  ) {
    return [
      'standing_weight_shift',
      'walking_mid_stride',
      'looking_away_candid',
      'leaning_wall_railing',
    ];
  }

  // Open lots / Desert roadside / Parks: no arbitrary walls to lean on
  return ['standing_weight_shift', 'walking_mid_stride', 'looking_away_candid'];
}

/**
 * Returns optically and spatially valid smartphone camera angles for the scene.
 */
export function getValidCameras(
  locId: LocationId,
  vSpot: VehicleSpot,
  poseId?: PoseId
): CameraAngleId[] {
  // Elevator Mirror: optical mirror reflection only
  if (locId === 'elevator_mirror' || poseId === 'elevator_mirror_phone') {
    return ['mirror_reflection_direct'];
  }

  // Inside Cabin: wide extended arm (0.5x) is impossible without colliding with the windshield/dash
  if (vSpot === 'inside_driver') {
    return ['eye_level_natural', 'low_chest_level', 'high_angle_tilt'];
  }

  // Seated at café table: eye level or chest level
  if (locId === 'outdoor_cafe' || poseId === 'seated_cafe_table') {
    return ['eye_level_natural', 'low_chest_level'];
  }

  // General Outdoor & Pedestrian
  return ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'];
}

/**
 * Deterministically reconciles any potential conflict in a SceneState.
 * Guarantees that the resulting state contains zero physical or spatial contradictions.
 */
export function reconcileSceneState(state: SceneState): SceneState {
  const loc = LOCATIONS[state.locationId];
  let vehicleSpot = state.vehicleSpot;

  // 1. Vehicle presence validation
  if (!loc || !loc.supportsVehicle) {
    vehicleSpot = 'none';
  } else {
    const validSpots = getValidVehicleSpots(state.locationId);
    if (!validSpots.includes(vehicleSpot)) {
      vehicleSpot = loc.defaultVehicleSpot || validSpots[0] || 'none';
    }
  }

  // 2. Pose validation
  const validPoses = getValidPoses(state.locationId, vehicleSpot);
  const poseId = validPoses.includes(state.poseId) ? state.poseId : validPoses[0];

  // 3. Camera validation
  const validCameras = getValidCameras(state.locationId, vehicleSpot, poseId);
  const cameraAngleId = validCameras.includes(state.cameraAngleId)
    ? state.cameraAngleId
    : validCameras[0];

  const holdingHand = state.holdingHand || 'right';
  const weatherAtmosphere = state.weatherAtmosphere || 'clear_crisp';
  const imperfectionLevel = state.imperfectionLevel || 'authentic';

  return {
    ...state,
    vehicleSpot,
    poseId,
    cameraAngleId,
    holdingHand,
    weatherAtmosphere,
    imperfectionLevel,
  };
}
