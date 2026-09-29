'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
  HoldingHand,
  WeatherAtmosphere,
  SceneState,
  FavoriteScene,
} from '@/lib/types';
import {
  LOCATIONS,
  TIMES_OF_DAY,
  CLOTHING_OPTIONS,
  HAIRSTYLES,
  EXPRESSIONS,
} from '@/lib/scene-data';
import {
  getValidVehicleSpots,
  getValidPoses,
  getValidCameras,
  reconcileSceneState,
} from '@/lib/compatibility';
import { compilePrompt } from '@/lib/prompt-compiler';
import { TopNav } from '@/components/TopNav';
import { LocationPicker } from '@/components/LocationPicker';
import { SceneAccordion } from '@/components/SceneAccordion';
import { SceneSummary } from '@/components/SceneSummary';
import { PromptViewer } from '@/components/PromptViewer';
import { FavoritesDrawer } from '@/components/FavoritesDrawer';
import { Sparkles, RotateCcw } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'saudi_smartphone_selfie_favorites_v1';

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
  holdingHand: 'right',
  weatherAtmosphere: 'clear_crisp',
};

export default function HomePage() {
  const [sceneState, setSceneState] = useState<SceneState>(DEFAULT_SCENE_STATE);
  const [favorites, setFavorites] = useState<FavoriteScene[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Ignore localStorage errors during SSR/hydration
    }
    return [];
  });
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const saveFavorites = useCallback((newFavs: FavoriteScene[]) => {
    setFavorites(newFavs);
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavs));
    } catch {
      // Ignore quota errors
    }
  }, []);

  // Location selection handler with centralized deterministic reconciliation
  const handleSelectLocation = useCallback((newLocationId: LocationId) => {
    setSceneState((prev) =>
      reconcileSceneState({
        ...prev,
        locationId: newLocationId,
      })
    );
  }, []);

  // Vehicle spot selection handler with centralized deterministic reconciliation
  const handleSelectVehicleSpot = useCallback((newSpot: VehicleSpot) => {
    setSceneState((prev) =>
      reconcileSceneState({
        ...prev,
        vehicleSpot: newSpot,
      })
    );
  }, []);

  // Handlers for individual fields
  const handleSelectPose = useCallback((poseId: PoseId) => {
    setSceneState((prev) =>
      reconcileSceneState({
        ...prev,
        poseId,
      })
    );
  }, []);

  const handleSelectCamera = useCallback((cameraAngleId: CameraAngleId) => {
    setSceneState((prev) =>
      reconcileSceneState({
        ...prev,
        cameraAngleId,
      })
    );
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

  const handleSelectHoldingHand = useCallback((holdingHand: HoldingHand) => {
    setSceneState((prev) => ({ ...prev, holdingHand }));
  }, []);

  const handleSelectWeatherAtmosphere = useCallback((weatherAtmosphere: WeatherAtmosphere) => {
    setSceneState((prev) => ({ ...prev, weatherAtmosphere }));
  }, []);

  const handleSelectImperfectionLevel = useCallback((imperfectionLevel: 'authentic' | 'raw_candid') => {
    setSceneState((prev) => ({ ...prev, imperfectionLevel }));
  }, []);

  const handleSelectEngine = useCallback((targetEngine: TargetEngine) => {
    setSceneState((prev) => ({ ...prev, targetEngine }));
  }, []);

  const handleReset = useCallback(() => {
    setSceneState(DEFAULT_SCENE_STATE);
  }, []);

  // Randomizer producing 100% physically coherent scenes with all 4 features
  const handleRandomize = useCallback(() => {
    const locKeys = Object.keys(LOCATIONS) as LocationId[];
    const randomLocKey = locKeys[Math.floor(Math.random() * locKeys.length)];

    const validSpots = getValidVehicleSpots(randomLocKey);
    const randomSpot = validSpots[Math.floor(Math.random() * validSpots.length)];

    const validPoses = getValidPoses(randomLocKey, randomSpot);
    const randomPose = validPoses[Math.floor(Math.random() * validPoses.length)];

    const validCameras = getValidCameras(randomLocKey, randomSpot, randomPose);
    const randomCam = validCameras[Math.floor(Math.random() * validCameras.length)];

    const timeKeys = Object.keys(TIMES_OF_DAY) as TimeOfDayId[];
    const randomTime = timeKeys[Math.floor(Math.random() * timeKeys.length)];

    const clothKeys = Object.keys(CLOTHING_OPTIONS) as ClothingId[];
    const randomCloth = clothKeys[Math.floor(Math.random() * clothKeys.length)];

    const hairKeys = Object.keys(HAIRSTYLES) as HairstyleId[];
    const randomHair = hairKeys[Math.floor(Math.random() * hairKeys.length)];

    const exprKeys = Object.keys(EXPRESSIONS) as ExpressionId[];
    const randomExpr = exprKeys[Math.floor(Math.random() * exprKeys.length)];

    const randomHand: HoldingHand = Math.random() > 0.5 ? 'right' : 'left';
    const weathers: WeatherAtmosphere[] = ['clear_crisp', 'heat_haze', 'dust_suspension'];
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
    const randomImperfection: 'authentic' | 'raw_candid' = Math.random() > 0.35 ? 'authentic' : 'raw_candid';

    const rawRandomState: SceneState = {
      ...sceneState,
      locationId: randomLocKey,
      vehicleSpot: randomSpot,
      poseId: randomPose,
      cameraAngleId: randomCam,
      timeOfDayId: randomTime,
      clothingId: randomCloth,
      hairstyleId: randomHair,
      expressionId: randomExpr,
      holdingHand: randomHand,
      weatherAtmosphere: randomWeather,
      imperfectionLevel: randomImperfection,
    };

    setSceneState(reconcileSceneState(rawRandomState));
  }, [sceneState]);

  // Derived values
  const activeLocation = LOCATIONS[sceneState.locationId];
  const validPoses = useMemo(
    () => getValidPoses(sceneState.locationId, sceneState.vehicleSpot),
    [sceneState.locationId, sceneState.vehicleSpot]
  );
  const validCameras = useMemo(
    () => getValidCameras(sceneState.locationId, sceneState.vehicleSpot, sceneState.poseId),
    [sceneState.locationId, sceneState.vehicleSpot, sceneState.poseId]
  );

  const compilation = useMemo(() => compilePrompt(sceneState), [sceneState]);

  // Favorites Handlers
  const isFavoriteSaved = useMemo(() => {
    return favorites.some(
      (f) =>
        f.state.locationId === sceneState.locationId &&
        f.state.vehicleSpot === sceneState.vehicleSpot &&
        f.state.poseId === sceneState.poseId &&
        f.state.cameraAngleId === sceneState.cameraAngleId &&
        f.state.timeOfDayId === sceneState.timeOfDayId &&
        f.state.clothingId === sceneState.clothingId &&
        f.state.hairstyleId === sceneState.hairstyleId &&
        f.state.holdingHand === sceneState.holdingHand &&
        f.state.weatherAtmosphere === sceneState.weatherAtmosphere
    );
  }, [favorites, sceneState]);

  const handleToggleSaveFavorite = useCallback(() => {
    if (isFavoriteSaved) {
      const filtered = favorites.filter(
        (f) =>
          !(
            f.state.locationId === sceneState.locationId &&
            f.state.vehicleSpot === sceneState.vehicleSpot &&
            f.state.poseId === sceneState.poseId &&
            f.state.cameraAngleId === sceneState.cameraAngleId &&
            f.state.timeOfDayId === sceneState.timeOfDayId &&
            f.state.clothingId === sceneState.clothingId &&
            f.state.hairstyleId === sceneState.hairstyleId &&
            f.state.holdingHand === sceneState.holdingHand &&
            f.state.weatherAtmosphere === sceneState.weatherAtmosphere
          )
      );
      saveFavorites(filtered);
    } else {
      const newFav: FavoriteScene = {
        id: `fav-${Date.now()}`,
        timestamp: Date.now(),
        title: `${activeLocation.nameAr || activeLocation.name}`,
        state: { ...sceneState },
      };
      saveFavorites([newFav, ...favorites]);
    }
  }, [isFavoriteSaved, favorites, sceneState, activeLocation, saveFavorites]);

  const handleDeleteFavorite = useCallback(
    (id: string) => {
      saveFavorites(favorites.filter((f) => f.id !== id));
    },
    [favorites, saveFavorites]
  );

  const handleClearAllFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  const handleApplyFavorite = useCallback((fav: FavoriteScene) => {
    setSceneState(reconcileSceneState(fav.state));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 pb-16">
      {/* Top Navigation */}
      <TopNav
        onRandomize={handleRandomize}
        onReset={handleReset}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

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
            holdingHand={sceneState.holdingHand}
            onSelectHoldingHand={handleSelectHoldingHand}
            weatherAtmosphere={sceneState.weatherAtmosphere}
            onSelectWeatherAtmosphere={handleSelectWeatherAtmosphere}
            imperfectionLevel={sceneState.imperfectionLevel}
            onSelectImperfectionLevel={handleSelectImperfectionLevel}
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
            onSaveFavorite={handleToggleSaveFavorite}
            isFavoriteSaved={isFavoriteSaved}
          />
        </section>
      </main>

      {/* Drawer: المفضلة */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onApply={handleApplyFavorite}
        onDelete={handleDeleteFavorite}
        onClearAll={handleClearAllFavorites}
      />

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
