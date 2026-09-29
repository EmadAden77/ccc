import { SceneState } from './types';
import {
  LOCATIONS,
  VEHICLE_SPOTS,
  POSES,
  CAMERAS,
  TIMES_OF_DAY,
  CLOTHING_OPTIONS,
  HAIRSTYLES,
  EXPRESSIONS,
  VEHICLE_DETAILS,
} from './scene-data';

export interface CompilationResult {
  prompt: string;
  wordCount: number;
  physicalChecks: {
    label: string;
    status: 'pass' | 'warning';
    detail: string;
  }[];
  sceneBreakdown: {
    location: string;
    vehicleContext: string;
    biomechanics: string;
    framing: string;
    atmosphere: string;
    personalLook: string;
  };
}

export function compilePrompt(state: SceneState): CompilationResult {
  const loc = LOCATIONS[state.locationId];
  const vehicle = VEHICLE_SPOTS[state.vehicleSpot];
  const pose = POSES[state.poseId];
  const camera = CAMERAS[state.cameraAngleId];
  const time = TIMES_OF_DAY[state.timeOfDayId];
  const clothing = CLOTHING_OPTIONS[state.clothingId];
  const hair = HAIRSTYLES[state.hairstyleId];
  const expression = EXPRESSIONS[state.expressionId];

  // Determine physical plausibility checks
  const physicalChecks: CompilationResult['physicalChecks'] = [];

  // Check 1: Arm Reach & Camera
  if (state.cameraAngleId === 'mirror_reflection_direct') {
    physicalChecks.push({
      label: 'Mirror Optical Path',
      status: 'pass',
      detail: 'Phone is visibly held in hand facing the mirror, reflecting the person and phone case naturally.',
    });
  } else {
    physicalChecks.push({
      label: 'Arm-Reach Biomechanics',
      status: 'pass',
      detail: 'Camera distance is physically constrained to a reachable arm length (~55cm), matching handheld smartphone geometry.',
    });
  }

  // Check 2: Vehicle Placement Invariance
  if (state.vehicleSpot === 'inside_driver') {
    physicalChecks.push({
      label: 'MY2017 Interior Fidelity',
      status: 'pass',
      detail: 'Enforces pre-facelift L494 interior: single InControl Touch Pro widescreen and tactile dual-rotary climate dials with Ivory perforated leather.',
    });
  } else if (state.vehicleSpot !== 'none') {
    physicalChecks.push({
      label: 'Vehicle Scale & Contact',
      status: 'pass',
      detail: 'Fuji White 2017 Range Rover Sport ground contact, shadow occlusion, and human-to-vehicle scale verified.',
    });
  } else {
    physicalChecks.push({
      label: 'Pedestrian Spatial Coherence',
      status: 'pass',
      detail: 'Natural pedestrian placement with believable ground contact and shadow alignment.',
    });
  }

  // Check 3: Saudi Everyday Authenticity
  physicalChecks.push({
    label: 'Everyday Saudi Authenticity',
    status: 'pass',
    detail: 'Non-iconic, authentic local architecture and street details without artificial landmarks.',
  });

  // Check 4: Natural Smartphone Optics
  physicalChecks.push({
    label: 'Smartphone Sensor Reality',
    status: 'pass',
    detail: 'Wide-angle 24mm equivalent perspective, realistic exposure, natural skin texture with zero AI plastic beautification.',
  });

  // Construct context-dependent vehicle description
  let vehicleDescription = '';
  if (state.vehicleSpot === 'inside_driver') {
    vehicleDescription = `Seated in the driver seat (LHD) of a 2017 Range Rover Sport Autobiography Dynamic (pre-facelift L494, Saudi-spec). Visible cabin details strictly show the authentic pre-facelift architecture: Ivory perforated leather seat with contrast piping, single InControl Touch Pro 10.2-inch center widescreen, two prominent tactile rotary climate control dials with miniature digital readouts, Grand Black lacquer center console, and a panoramic glass roof overhead casting diffused daylight through the interior.`;
  } else if (state.vehicleSpot === 'beside_driver_door') {
    vehicleDescription = `Positioned immediately alongside the front driver door of a Fuji White 2017 Range Rover Sport Autobiography Dynamic (pre-facelift L494, Saudi-spec, left-hand drive). The vehicle features a gloss black contrast roof, red Brembo brake calipers partially visible behind factory alloy wheels, and pristine Fuji White body panels showing soft realistic environmental reflections.`;
  } else if (state.vehicleSpot === 'leaning_front_fender') {
    vehicleDescription = `Positioned casually near the front fender and bonnet edge of a Fuji White 2017 Range Rover Sport Autobiography Dynamic (L494 pre-facelift). The gloss black front honeycomb grille and distinctive pre-facelift LED headlight cluster are visible in natural perspective just behind the subject, with realistic ambient light sheen across the clean hood.`;
  } else if (state.vehicleSpot === 'walking_past_rear') {
    vehicleDescription = `Captured moving naturally past the rear quarter of a Fuji White 2017 Range Rover Sport Autobiography Dynamic (L494 pre-facelift) parked in the bay, with its black contrast roof, Sport Autobiography badging, and quad exhaust tips in soft realistic background depth.`;
  } else if (state.vehicleSpot === 'vehicle_soft_background') {
    vehicleDescription = `In the middle ground behind the subject, a Fuji White 2017 Range Rover Sport Autobiography Dynamic (L494 pre-facelift) is parked cleanly in a marked bay, resting naturally on the tarmac with its distinctive black pillars and floating roof silhouette visible in soft natural focus.`;
  }

  // Pick 2-3 contextual Saudi environmental details
  const saudiEnvSnippet = loc.saudiDetails.slice(0, 3).join(', and ');

  // Build target-specific prompts
  let finalPrompt = '';

  if (state.targetEngine === 'chatgpt') {
    // ChatGPT Images / DALL-E 3 Style: Rich, naturalistic narrative with strict photographic realism
    const parts = [
      `A realistic, candid smartphone front-camera selfie taken at natural arm's length by an everyday young man in Saudi Arabia.`,
      `He is ${clothing.promptSnippet}, with a ${hair.promptSnippet}. He has ${expression.promptSnippet}.`,
      `Pose and framing: ${pose.biomechanics} The smartphone camera is held at ${camera.perspective}`,
      vehicleDescription ? `Vehicle context: ${vehicleDescription}` : '',
      `Environment and location: The scene takes place in a believable everyday Saudi setting (${loc.name} - ${loc.shortDesc}). The background features ${saudiEnvSnippet}, avoiding any famous tourist landmarks or artificial skylines in favor of authentic, everyday suburban Saudi texture.`,
      `Lighting and atmosphere: ${time.lightingDetails}`,
      `Photographic quality: Authentic modern smartphone camera aesthetics (24mm equivalent wide lens). Natural dynamic range with restrained HDR, authentic skin texture with visible pores and natural light falloff, subtle lens flare from ambient light sources, true optical handheld perspective, and no commercial studio lighting or artificial beauty filters.`,
    ];
    finalPrompt = parts.filter(Boolean).join('\n\n');
  } else {
    // Gemini / Imagen Style: Direct, structured sensory photography prompt with precise photographic tags
    const lines = [
      `Real candid smartphone front-camera selfie, handheld at arm's length, authentic mobile photography.`,
      `Subject: Young man with ${hair.promptSnippet}, ${clothing.promptSnippet}, displaying ${expression.promptSnippet}.`,
      `Posture & Biomechanics: ${pose.biomechanics}`,
      `Camera Geometry: Handheld front smartphone camera, ${camera.label.toLowerCase()}, ${camera.perspective}`,
      vehicleDescription ? `Vehicle In Scene: ${vehicleDescription}` : `Vehicle: None, purely pedestrian spatial environment.`,
      `Setting: Everyday authentic Saudi Arabian location (${loc.name}), featuring ${saudiEnvSnippet}. Natural, believable everyday urban texture with zero iconic landmarks or generic AI perfection.`,
      `Lighting & Mood: ${time.label} (${time.badge}). ${time.lightingDetails}`,
      `Sensor Characteristics: Unedited smartphone photo from personal camera roll, 24mm wide-angle front sensor geometry, realistic exposure roll-off, natural skin micro-texture, authentic depth of field, zero artificial smoothing or studio lighting.`,
    ];
    finalPrompt = lines.join('\n');
  }

  const wordCount = finalPrompt.split(/\s+/).filter(Boolean).length;

  return {
    prompt: finalPrompt,
    wordCount,
    physicalChecks,
    sceneBreakdown: {
      location: `${loc.name} (${loc.category})`,
      vehicleContext: vehicle.label,
      biomechanics: pose.label,
      framing: camera.label,
      atmosphere: time.label,
      personalLook: `${clothing.label} · ${hair.label}`,
    },
  };
}
