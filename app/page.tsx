'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  LocationId,
  VehicleSpot,
  PoseId,
  CameraAngleId,
  TimeOfDayId,
  ClothingId,
  HairstyleId,
  ExpressionId,
  TargetEngine,
  SceneState,
} from '@/lib/types';
import {
  LOCATIONS,
  POSES,
  CAMERAS,
  TIMES_OF_DAY,
  CLOTHING_OPTIONS,
  HAIRSTYLES,
  EXPRESSIONS,
} from '@/lib/scene-data';
import { compilePrompt } from '@/lib/prompt-compiler';
import { TopNav } from '@/components/TopNav';
import { LocationPicker } from '@/components/LocationPicker';
import { SceneAccordion } from '@/components/SceneAccordion';
import { SceneSummary } from '@/components/SceneSummary';
import { PromptViewer } from '@/components/PromptViewer';
import { Sparkles, RotateCcw } from 'lucide-react';

const DEFAULT_SCENE_STATE: SceneState = {
  locationId: 'residential_street',
  vehicleSpot: 'beside_driver_door',
  poseId: 'standing_door_frame',
  cameraAngleId: 'eye_level_natural',
  timeOfDayId: 'golden_afternoon',
  clothingId: 'white_thobe_crisp',
  hairstyleId: 'taper_fade_clean',
  expressionId: 'subtle_smirk',
  targetEngine: 'chatgpt',
  imperfectionLevel: 'authentic',
};

export default function HomePage() {
  const [sceneState, setSceneState] = useState<SceneState>(DEFAULT_SCENE_STATE);

  // Helper to determine valid poses based on location & vehicle spot
  const getValidPoses = useCallback((locId: LocationId, vSpot: VehicleSpot): PoseId[] => {
    if (vSpot === 'inside_driver') {
      return ['one_hand_wheel', 'center_armrest_lean', 'casual_seatback_recline', 'side_window_gaze'];
    }
    if (vSpot === 'beside_driver_door') {
      return ['standing_door_frame', 'leaning_against_door', 'standing_weight_shift', 'looking_away_candid'];
    }
    if (vSpot === 'leaning_front_fender') {
      return ['front_quarter_angle', 'standing_weight_shift', 'looking_away_candid'];
    }
    if (vSpot === 'walking_past_rear') {
      return ['walking_mid_stride', 'standing_weight_shift', 'looking_away_candid'];
    }
    if (locId === 'elevator_mirror') {
      return ['elevator_mirror_phone', 'standing_weight_shift'];
    }
    if (locId === 'outdoor_cafe') {
      return ['seated_cafe_table', 'looking_away_candid', 'standing_weight_shift'];
    }
    if (locId === 'rooftop_terrace') {
      return ['rooftop_parapet_lean', 'standing_weight_shift', 'looking_away_candid'];
    }
    if (locId === 'stairway_landing') {
      return ['leaning_wall_railing', 'standing_weight_shift', 'looking_away_candid'];
    }
    return ['standing_weight_shift', 'walking_mid_stride', 'looking_away_candid', 'leaning_wall_railing'];
  }, []);

  // Helper to determine valid camera angles
  const getValidCameras = useCallback((locId: LocationId, vSpot: VehicleSpot): CameraAngleId[] => {
    if (locId === 'elevator_mirror') {
      return ['mirror_reflection_direct'];
    }
    if (vSpot === 'inside_driver') {
      return ['eye_level_natural', 'low_chest_level', 'high_angle_tilt'];
    }
    return ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'];
  }, []);

  // Location selection handler with intelligent contextual adjustment
  const handleSelectLocation = useCallback(
    (newLocationId: LocationId) => {
      const loc = LOCATIONS[newLocationId];
      let newVehicleSpot = sceneState.vehicleSpot;

      if (!loc.supportsVehicle) {
        newVehicleSpot = 'none';
      } else if (newVehicleSpot !== 'none' && !loc.supportedVehicleSpots.includes(newVehicleSpot)) {
        newVehicleSpot = loc.defaultVehicleSpot;
      }

      // Re-evaluate pose
      const validPoses = getValidPoses(newLocationId, newVehicleSpot);
      const newPoseId = validPoses.includes(sceneState.poseId) ? sceneState.poseId : validPoses[0];

      // Re-evaluate camera
      const validCameras = getValidCameras(newLocationId, newVehicleSpot);
      const newCameraId = validCameras.includes(sceneState.cameraAngleId)
        ? sceneState.cameraAngleId
        : validCameras[0];

      setSceneState((prev) => ({
        ...prev,
        locationId: newLocationId,
        vehicleSpot: newVehicleSpot,
        poseId: newPoseId,
        cameraAngleId: newCameraId,
      }));
    },
    [sceneState.vehicleSpot, sceneState.poseId, sceneState.cameraAngleId, getValidPoses, getValidCameras]
  );

  // Vehicle spot selection handler with contextual pose realignment
  const handleSelectVehicleSpot = useCallback(
    (newSpot: VehicleSpot) => {
      const validPoses = getValidPoses(sceneState.locationId, newSpot);
      const newPoseId = validPoses.includes(sceneState.poseId) ? sceneState.poseId : validPoses[0];

      const validCameras = getValidCameras(sceneState.locationId, newSpot);
      const newCameraId = validCameras.includes(sceneState.cameraAngleId)
        ? sceneState.cameraAngleId
        : validCameras[0];

      setSceneState((prev) => ({
        ...prev,
        vehicleSpot: newSpot,
        poseId: newPoseId,
        cameraAngleId: newCameraId,
      }));
    },
    [sceneState.locationId, sceneState.poseId, sceneState.cameraAngleId, getValidPoses, getValidCameras]
  );

  // Handlers for individual fields
  const handleSelectPose = useCallback((poseId: PoseId) => {
    setSceneState((prev) => ({ ...prev, poseId }));
  }, []);

  const handleSelectCamera = useCallback((cameraAngleId: CameraAngleId) => {
    setSceneState((prev) => ({ ...prev, cameraAngleId }));
  }, []);

  const handleSelectTime = useCallback((timeOfDayId: TimeOfDayId) => {
    setSceneState((prev) => ({ ...prev, timeOfDayId }));
  }, []);

  const handleSelectClothing = useCallback((clothingId: ClothingId) => {
    setSceneState((prev) => ({ ...prev, clothingId }));
  }, []);

  const handleSelectHairstyle = useCallback((hairstyleId: HairstyleId) => {
    setSceneState((prev) => ({ ...prev, hairstyleId }));
  }, []);

  const handleSelectExpression = useCallback((expressionId: ExpressionId) => {
    setSceneState((prev) => ({ ...prev, expressionId }));
  }, []);

  const handleSelectEngine = useCallback((targetEngine: TargetEngine) => {
    setSceneState((prev) => ({ ...prev, targetEngine }));
  }, []);

  const handleReset = useCallback(() => {
    setSceneState(DEFAULT_SCENE_STATE);
  }, []);

  // Randomizer producing physically coherent scenes
  const handleRandomize = useCallback(() => {
    const locKeys = Object.keys(LOCATIONS) as LocationId[];
    const randomLocKey = locKeys[Math.floor(Math.random() * locKeys.length)];
    const loc = LOCATIONS[randomLocKey];

    let randomSpot: VehicleSpot = 'none';
    if (loc.supportsVehicle) {
      const spots = loc.supportedVehicleSpots;
      randomSpot = spots[Math.floor(Math.random() * spots.length)];
    }

    const validPoses = getValidPoses(randomLocKey, randomSpot);
    const randomPose = validPoses[Math.floor(Math.random() * validPoses.length)];

    const validCameras = getValidCameras(randomLocKey, randomSpot);
    const randomCam = validCameras[Math.floor(Math.random() * validCameras.length)];

    const timeKeys = Object.keys(TIMES_OF_DAY) as TimeOfDayId[];
    const randomTime = timeKeys[Math.floor(Math.random() * timeKeys.length)];

    const clothKeys = Object.keys(CLOTHING_OPTIONS) as ClothingId[];
    const randomCloth = clothKeys[Math.floor(Math.random() * clothKeys.length)];

    const hairKeys = Object.keys(HAIRSTYLES) as HairstyleId[];
    const randomHair = hairKeys[Math.floor(Math.random() * hairKeys.length)];

    const exprKeys = Object.keys(EXPRESSIONS) as ExpressionId[];
    const randomExpr = exprKeys[Math.floor(Math.random() * exprKeys.length)];

    setSceneState((prev) => ({
      ...prev,
      locationId: randomLocKey,
      vehicleSpot: randomSpot,
      poseId: randomPose,
      cameraAngleId: randomCam,
      timeOfDayId: randomTime,
      clothingId: randomCloth,
      hairstyleId: randomHair,
      expressionId: randomExpr,
    }));
  }, [getValidPoses, getValidCameras]);

  // Derived values
  const activeLocation = LOCATIONS[sceneState.locationId];
  const validPoses = useMemo(
    () => getValidPoses(sceneState.locationId, sceneState.vehicleSpot),
    [sceneState.locationId, sceneState.vehicleSpot, getValidPoses]
  );
  const validCameras = useMemo(
    () => getValidCameras(sceneState.locationId, sceneState.vehicleSpot),
    [sceneState.locationId, sceneState.vehicleSpot, getValidCameras]
  );

  const compilation = useMemo(() => compilePrompt(sceneState), [sceneState]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 pb-16">
      {/* Top Navigation */}
      <TopNav onRandomize={handleRandomize} onReset={handleReset} />

      {/* Main Container - Compact Mobile-First Width */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-3.5 sm:px-4 py-3.5 space-y-2.5">
        {/* Compact Header */}
        <section className="space-y-0.5">
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
            محرك السيلفي الواقعي
          </h1>
          <p className="text-[11px] text-slate-400">
            بناء مشاهد سيلفي واقعية ومتوافقة فيزيائيًا
          </p>
        </section>

        {/* Quick Action Bar - Balanced 50/50 Grid */}
        <section className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleRandomize}
            className="min-h-[40px] flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-xl text-xs transition-all shadow-sm active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>مشهد عشوائي</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>إعادة ضبط</span>
          </button>
        </section>

        {/* المكان (Primary Intelligence Trigger) */}
        <section>
          <LocationPicker
            selectedId={sceneState.locationId}
            onSelect={handleSelectLocation}
          />
        </section>

        {/* Contextual Accordion Sections */}
        <section>
          <SceneAccordion
            location={activeLocation}
            vehicleSpot={sceneState.vehicleSpot}
            onSelectVehicleSpot={handleSelectVehicleSpot}
            selectedPoseId={sceneState.poseId}
            onSelectPose={handleSelectPose}
            selectedCameraId={sceneState.cameraAngleId}
            onSelectCamera={handleSelectCamera}
            selectedClothingId={sceneState.clothingId}
            onSelectClothing={handleSelectClothing}
            selectedHairstyleId={sceneState.hairstyleId}
            onSelectHairstyle={handleSelectHairstyle}
            selectedExpressionId={sceneState.expressionId}
            onSelectExpression={handleSelectExpression}
            selectedTimeId={sceneState.timeOfDayId}
            onSelectTime={handleSelectTime}
            validPoseIds={validPoses}
            validCameraIds={validCameras}
          />
        </section>

        {/* ملخص عناصر المشهد */}
        <section>
          <SceneSummary state={sceneState} />
        </section>

        {/* الـPrompt النهائي */}
        <section>
          <PromptViewer
            compilation={compilation}
            targetEngine={sceneState.targetEngine}
            onSelectEngine={handleSelectEngine}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between text-[11px] text-slate-500">
          <span>محرك السيلفي الواقعي</span>
          <span>ChatGPT Images · Gemini</span>
        </div>
      </footer>
    </div>
  );
}
