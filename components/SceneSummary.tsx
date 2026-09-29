'use client';

import React from 'react';
import { SceneState } from '@/lib/types';
import {
  LOCATIONS,
  VEHICLE_SPOTS,
  POSES,
  TIMES_OF_DAY,
  CLOTHING_OPTIONS,
  EXPRESSIONS,
  HOLDING_HANDS,
  WEATHER_ATMOSPHERES,
} from '@/lib/scene-data';

interface SceneSummaryProps {
  state: SceneState;
}

export function SceneSummary({ state }: SceneSummaryProps) {
  const loc = LOCATIONS[state.locationId];
  const vehicle = VEHICLE_SPOTS[state.vehicleSpot];
  const pose = POSES[state.poseId];
  const time = TIMES_OF_DAY[state.timeOfDayId];
  const clothing = CLOTHING_OPTIONS[state.clothingId];
  const expr = EXPRESSIONS[state.expressionId];
  const hand = HOLDING_HANDS[state.holdingHand || 'right'];
  const weather = WEATHER_ATMOSPHERES[state.weatherAtmosphere || 'clear_crisp'];

  return (
    <div className="p-2.5 px-3 rounded-xl bg-slate-900/50 border border-slate-800/70 text-xs">
      <div className="text-[10px] font-semibold text-slate-400 mb-1">ملخص عناصر المشهد:</div>
      <div className="text-slate-300 font-medium text-[11px] leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-white">{loc.nameAr || loc.name}</span>
        {state.vehicleSpot !== 'none' && (
          <>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400/90">{vehicle.labelAr || vehicle.label}</span>
          </>
        )}
        <span className="text-slate-600">·</span>
        <span>
          {pose.labelAr || pose.label} ({hand?.labelAr || 'اليد اليمنى'})
        </span>
        <span className="text-slate-600">·</span>
        <span>{clothing.labelAr || clothing.label}</span>
        <span className="text-slate-600">·</span>
        <span>{expr.labelAr || expr.label}</span>
        <span className="text-slate-600">·</span>
        <span>{time.labelAr || time.label}</span>
        {loc.category !== 'interior' && (
          <>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">{weather?.labelAr}</span>
          </>
        )}
      </div>
    </div>
  );
}
