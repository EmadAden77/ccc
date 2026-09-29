'use client';

import React, { useState } from 'react';
import { LocationId } from '@/lib/types';
import { LOCATIONS } from '@/lib/scene-data';
import { MapPin, Check, X, RefreshCw } from 'lucide-react';

interface LocationPickerProps {
  selectedId: LocationId;
  onSelect: (id: LocationId) => void;
}

const CATEGORIES = [
  {
    id: 'residential',
    title: 'أحياء سكنية',
    locationIds: ['residential_street', 'shaded_villa_parking', 'rooftop_terrace'] as LocationId[],
  },
  {
    id: 'commercial',
    title: 'أماكن حضرية',
    locationIds: ['open_commercial_lot', 'outdoor_cafe', 'commercial_walkway'] as LocationId[],
  },
  {
    id: 'transit',
    title: 'طرق ومحطات',
    locationIds: ['desert_roadside', 'gas_station', 'neighborhood_park'] as LocationId[],
  },
  {
    id: 'interior',
    title: 'مساحات داخلية',
    locationIds: ['elevator_mirror', 'stairway_landing'] as LocationId[],
  },
];

export function LocationPicker({ selectedId, onSelect }: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeLoc = LOCATIONS[selectedId];

  const handleChoose = (id: LocationId) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1.5">
      {/* Selected Location Summary Card */}
      <div className="p-3 rounded-xl border border-slate-800/90 bg-slate-900/60 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>المكان</span>
          </div>
          <div className="text-sm font-semibold text-white truncate mt-0.5">
            {activeLoc.nameAr || activeLoc.name}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
            <span>{activeLoc.categoryAr || activeLoc.category}</span>
            <span>•</span>
            <span className={activeLoc.supportsVehicle ? 'text-amber-400/90' : 'text-slate-400'}>
              {activeLoc.supportsVehicle ? 'يدعم السيارة' : 'بدون سيارة'}
            </span>
          </div>
        </div>

        {/* Secondary Action: تغيير */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="shrink-0 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 rounded-lg transition-all min-h-[36px] flex items-center gap-1.5"
        >
          {isOpen ? (
            <>
              <X className="w-3.5 h-3.5 text-slate-400" />
              <span>إغلاق</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3 h-3 text-slate-400" />
              <span>تغيير</span>
            </>
          )}
        </button>
      </div>

      {/* Categorized Dropdown Panel */}
      {isOpen && (
        <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/95 shadow-xl space-y-2.5 animate-in fade-in-50 duration-150">
          <div className="text-[11px] text-slate-400 border-b border-slate-800/80 pb-1.5 flex items-center justify-between">
            <span>اختر مكان التصوير المناسب:</span>
            <span className="text-[10px] text-slate-500">يحدد الخيارات المتوافقة تلقائياً</span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-0.5">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <div className="text-[10px] font-semibold text-slate-400 tracking-wider px-1">
                  {cat.title}
                </div>
                <div className="space-y-1">
                  {cat.locationIds.map((locId) => {
                    const loc = LOCATIONS[locId];
                    const isSelected = locId === selectedId;

                    return (
                      <button
                        key={locId}
                        type="button"
                        onClick={() => handleChoose(locId)}
                        className={`w-full text-right px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between min-h-[38px] ${
                          isSelected
                            ? 'bg-amber-400/15 border border-amber-400/60 text-amber-300 font-semibold'
                            : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 text-slate-300 hover:text-white'
                        }`}
                      >
                        <span className="font-medium">{loc.nameAr || loc.name}</span>

                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mr-2">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
