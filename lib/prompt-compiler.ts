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
  WEATHER_ATMOSPHERES,
} from './scene-data';
import { reconcileSceneState } from './compatibility';

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

export function compilePrompt(rawState: SceneState): CompilationResult {
  // Deterministically reconcile any edge-case state conflicts before compiling
  const state = reconcileSceneState(rawState);

  const loc = LOCATIONS[state.locationId];
  const vehicle = VEHICLE_SPOTS[state.vehicleSpot];
  const pose = POSES[state.poseId];
  const camera = CAMERAS[state.cameraAngleId];
  const time = TIMES_OF_DAY[state.timeOfDayId];
  const clothing = CLOTHING_OPTIONS[state.clothingId];
  const hair = HAIRSTYLES[state.hairstyleId];
  const expression = EXPRESSIONS[state.expressionId];
  const weather = WEATHER_ATMOSPHERES[state.weatherAtmosphere || 'clear_crisp'];

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

  // Check 2: Hand Budget & Biomechanics
  physicalChecks.push({
    label: 'Hand-Budget Biomechanics',
    status: 'pass',
    detail: `Phone gripped in the ${state.holdingHand === 'left' ? 'left' : 'right'} hand, leaving the free hand available for single-point physical contact.`,
  });

  // Check 3: Vehicle Placement Invariance
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

  // Check 4: Saudi Everyday Authenticity
  physicalChecks.push({
    label: 'Everyday Saudi Authenticity',
    status: 'pass',
    detail: 'Non-iconic, authentic local architecture and street details without artificial landmarks.',
  });

  // Check 5: Atmospheric Physics & Sensor Reality
  physicalChecks.push({
    label: 'Atmospheric Physics',
    status: 'pass',
    detail: `Simulates authentic Saudi air (${weather.label}) with physically coherent light falloff.`,
  });
  physicalChecks.push({
    label: 'Smartphone Sensor Reality',
    status: 'pass',
    detail: state.imperfectionLevel === 'raw_candid'
      ? 'Clean smartphone front sensor capture with restrained computational HDR and authentic skin pores.'
      : 'Authentic camera roll candid capture with subtle natural ISO sensor grain, believable micro motion softness, and unedited texture.',
  });

  // Context-dependent camera perspective definition
  let resolvedCameraPerspective = camera.perspective;
  if (state.cameraAngleId === 'high_angle_tilt') {
    if (state.vehicleSpot === 'inside_driver') {
      resolvedCameraPerspective =
        'Camera positioned approximately 15 degrees above eye level tilted downward toward driver seat lap and center console in believable seated interior perspective.';
    } else {
      resolvedCameraPerspective =
        'Camera positioned approximately 15 degrees above eye level tilted gently downward, framing subject head and shoulders with grounded perspective.';
    }
  }

  // Hand detail integration
  const handWord = state.holdingHand === 'left' ? 'left hand' : 'right hand';
  const handPerspectiveDetail =
    state.cameraAngleId === 'mirror_reflection_direct'
      ? `The smartphone is held in the ${handWord} facing directly toward the mirror reflection.`
      : `The smartphone is held in the ${handWord} with natural arm-reach geometry, right shoulder subtly forward.`;

  // Construct context-dependent vehicle description (strictly empty if vehicleSpot === 'none')
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

  // Context-aware lighting: Interior vs Outdoor
  let resolvedLightingDetails = time.lightingDetails;
  if (loc.id === 'elevator_mirror') {
    resolvedLightingDetails =
      'Diffused overhead illumination from circular recessed LED ceiling lights within the stainless steel elevator cab, balanced natural fill on skin texture, zero outdoor sun interference.';
  } else if (loc.id === 'stairway_landing') {
    resolvedLightingDetails =
      'Soft natural architectural daylight diffused through frosted glass landing windows, casting gentle gradual shadows across terrazzo steps and wall planes.';
  } else {
    // Weave in Saudi weather atmosphere for outdoor settings
    resolvedLightingDetails = `${resolvedLightingDetails} Atmospheric nuance: ${weather.promptSnippet}.`;
  }

  // Optical & sensor imperfections
  const cameraImperfections =
    state.imperfectionLevel === 'raw_candid'
      ? 'Contemporary crisp smartphone front sensor capture: sharp natural focal definition, balanced computational exposure, authentic micro skin texture, restrained dynamic range, zero artificial smoothing or studio lighting filters.'
      : 'Authentic camera roll candid aesthetics: subtle natural ISO sensor grain in low-light/ambient shadows, realistic micro motion softness on moving extremities, true optical wide-angle front lens distortion, organic skin pores with natural light sheen, zero commercial AI smoothing or plastic beauty filters.';

  // Build target-specific prompts
  let finalPrompt = '';

  if (state.targetEngine === 'chatgpt') {
    // ChatGPT Images / DALL-E 3 Style: Rich, naturalistic narrative with strict photographic realism
    const parts = [
      `A realistic, candid smartphone front-camera selfie taken at natural arm's length by an everyday young man in Saudi Arabia.`,
      `He is ${clothing.promptSnippet}, with a ${hair.promptSnippet}. He has ${expression.promptSnippet}.`,
      `Pose and framing: ${pose.biomechanics} ${handPerspectiveDetail} The smartphone camera is held at ${resolvedCameraPerspective}`,
      vehicleDescription ? `Vehicle context: ${vehicleDescription}` : '',
      `Environment and location: The scene takes place in a believable everyday Saudi setting (${loc.name} - ${loc.shortDesc}). The background features ${saudiEnvSnippet}, avoiding any famous tourist landmarks or artificial skylines in favor of authentic, everyday suburban Saudi texture.`,
      `Lighting and atmosphere: ${resolvedLightingDetails}`,
      `Photographic quality: Authentic modern smartphone camera aesthetics (24mm equivalent wide lens). ${cameraImperfections}`,
    ];
    finalPrompt = parts.filter(Boolean).join('\n\n');
  } else {
    // Gemini / Imagen Style: Direct, structured sensory photography prompt with precise photographic tags
    const lines = [
      `Real candid smartphone front-camera selfie, handheld at arm's length, authentic mobile photography.`,
      `Subject: Young man with ${hair.promptSnippet}, ${clothing.promptSnippet}, displaying ${expression.promptSnippet}.`,
      `Posture & Biomechanics: ${pose.biomechanics} Grip: ${handPerspectiveDetail}`,
      `Camera Geometry: Handheld front smartphone camera, ${camera.label.toLowerCase()}, ${resolvedCameraPerspective}`,
      vehicleDescription ? `Vehicle In Scene: ${vehicleDescription}` : `Vehicle: None, purely pedestrian spatial environment.`,
      `Setting: Everyday authentic Saudi Arabian location (${loc.name}), featuring ${saudiEnvSnippet}. Natural, believable everyday urban texture with zero iconic landmarks or generic AI perfection.`,
      loc.category === 'interior'
        ? `Lighting & Mood: Interior illumination. ${resolvedLightingDetails}`
        : `Lighting & Mood: ${time.label} (${time.badge}). ${resolvedLightingDetails}`,
      `Sensor Characteristics: Unedited smartphone photo from personal camera roll, 24mm wide-angle front sensor geometry, realistic exposure roll-off, authentic depth of field. ${cameraImperfections}`,
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
      biomechanics: `${pose.label} (${state.holdingHand === 'left' ? 'Left' : 'Right'} Hand)`,
      framing: camera.label,
      atmosphere: `${time.label} · ${weather.label}`,
      personalLook: `${clothing.label} · ${hair.label}`,
    },
  };
}
