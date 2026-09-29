'use client';

import React, { useState } from 'react';
import { LocationId } from '@/lib/types';
import { LOCATIONS } from '@/lib/scene-data';
import {
  Home,
  Car,
  Coffee,
  Trees,
  Compass,
  Fuel,
  Building2,
  ArrowUpDown,
  Building,
  Check,
} from 'lucide-react';

interface LocationSelectorProps {
  selectedId: LocationId;
  onSelect: (id: LocationId) => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'كافة البيئات' },
  { id: 'residential', label: 'أحياء سكنية' },
  { id: 'commercial', label: 'أماكن حضرية ومقاهي' },
  { id: 'transit', label: 'طرق ومحطات' },
  { id: 'interior', label: 'مساحات داخلية' },
] as const;

type FilterCat = (typeof CATEGORY_TABS)[number]['id'];

const LOCATION_ICONS: Record<LocationId, React.ComponentType<{ className?: string }>> = {
  residential_street: Home,
  shaded_villa_parking: Car,
  open_commercial_lot: Building2,
  outdoor_cafe: Coffee,
  neighborhood_park: Trees,
  desert_roadside: Compass,
  gas_station: Fuel,
  commercial_walkway: Building2,
  elevator_mirror: ArrowUpDown,
  stairway_landing: Building,
  rooftop_terrace: Home,
};

export function LocationSelector({ selectedId, onSelect }: LocationSelectorProps) {
  const [filter, setFilter] = useState<FilterCat>('all');

  const filteredLocations = Object.values(LOCATIONS).filter((loc) => {
    if (filter === 'all') return true;
    if (filter === 'residential') {
      return ['residential_street', 'shaded_villa_parking', 'rooftop_terrace'].includes(loc.id);
    }
    if (filter === 'commercial') {
      return ['open_commercial_lot', 'outdoor_cafe', 'commercial_walkway'].includes(loc.id);
    }
    if (filter === 'transit') {
      return ['desert_roadside', 'gas_station', 'neighborhood_park'].includes(loc.id);
    }
    if (filter === 'interior') {
      return ['elevator_mirror', 'stairway_landing'].includes(loc.id);
    }
    return true;
  });

  const activeLoc = LOCATIONS[selectedId];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
            <span>1. الموقع والبيئة</span>
            <span className="text-xs font-normal text-amber-400">· محفز الذكاء المكاني</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            يحدد فيزيائية المشهد، مصادر الإضاءة، وتفاعلات السيارة المتاحة.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto no-scrollbar">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors min-h-[36px] ${
              filter === tab.id
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {filteredLocations.map((loc) => {
          const isSelected = loc.id === selectedId;
          const Icon = LOCATION_ICONS[loc.id] || Home;

          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => onSelect(loc.id)}
              className={`text-right p-3.5 rounded-xl border transition-all relative flex flex-col justify-between min-h-[92px] ${
                isSelected
                  ? 'bg-amber-400/10 border-amber-400/80 ring-1 ring-amber-400/50 shadow-sm'
                  : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 text-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 w-full">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-xs font-semibold leading-tight ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                    {loc.nameAr || loc.name}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-1 mt-1.5">
                {loc.shortDescAr || loc.shortDesc}
              </p>

              <div className="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center gap-2 text-[10px] text-slate-500">
                <span>{loc.supportsVehicle ? 'يدعم السيارة' : 'مساحة داخلية (بدون سيارة)'}</span>
                <span aria-hidden="true">·</span>
                <span>{loc.categoryAr || loc.category}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Location Saudi Authenticity Context */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="font-medium text-slate-300">تفاصيل البيئة السعودية اليومية</span>
          <span className="text-[11px] text-amber-400/90 font-mono">دون معالم مشهورة</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          {(activeLoc.saudiDetailsAr || activeLoc.saudiDetails).join(' · ')}
        </p>
      </div>
    </div>
  );
}

