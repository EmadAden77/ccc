'use client';

import React from 'react';
import { ClothingId, HairstyleId, ExpressionId } from '@/lib/types';
import { CLOTHING_OPTIONS, HAIRSTYLES, EXPRESSIONS } from '@/lib/scene-data';
import { Shirt, Sparkles, Smile } from 'lucide-react';

interface AppearanceControlsProps {
  clothingId: ClothingId;
  onSelectClothing: (id: ClothingId) => void;
  hairstyleId: HairstyleId;
  onSelectHairstyle: (id: HairstyleId) => void;
  expressionId: ExpressionId;
  onSelectExpression: (id: ExpressionId) => void;
}

export function AppearanceControls({
  clothingId,
  onSelectClothing,
  hairstyleId,
  onSelectHairstyle,
  expressionId,
  onSelectExpression,
}: AppearanceControlsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
          <span>6. المظهر الشخصي</span>
          <span className="text-xs font-normal text-amber-400">· عام ومستقل</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          هذه الخيارات الشخصية تظل ثابتة ومستقلة عبر جميع المواقع وحالات السيارة.
        </p>
      </div>

      {/* Clothing */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
          <Shirt className="w-3.5 h-3.5 text-amber-400" />
          <span>الملابس والزي</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(Object.keys(CLOTHING_OPTIONS) as ClothingId[]).map((cid) => {
            const opt = CLOTHING_OPTIONS[cid];
            const isSelected = clothingId === cid;

            return (
              <button
                key={cid}
                type="button"
                onClick={() => onSelectClothing(cid)}
                className={`text-right p-2.5 rounded-xl border transition-all min-h-[52px] flex flex-col justify-center ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400/80 ring-1 ring-amber-400/50'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 text-slate-300'
                }`}
              >
                <span className={`text-xs font-medium truncate ${isSelected ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                  {opt.labelAr || opt.label}
                </span>
                <span className="text-[10px] text-slate-500 truncate mt-0.5">
                  {opt.descriptionAr || opt.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hairstyle */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>قصة الشعر والعناية</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(HAIRSTYLES) as HairstyleId[]).map((hid) => {
            const opt = HAIRSTYLES[hid];
            const isSelected = hairstyleId === hid;

            return (
              <button
                key={hid}
                type="button"
                onClick={() => onSelectHairstyle(hid)}
                className={`text-right p-2.5 rounded-xl border transition-all min-h-[52px] flex flex-col justify-center ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400/80 ring-1 ring-amber-400/50'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 text-slate-300'
                }`}
              >
                <span className={`text-xs font-medium truncate ${isSelected ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                  {opt.labelAr || opt.label}
                </span>
                <span className="text-[10px] text-slate-500 truncate mt-0.5">
                  {opt.descriptionAr || opt.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expression */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
          <Smile className="w-3.5 h-3.5 text-amber-400" />
          <span>تعابير الوجه</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(EXPRESSIONS) as ExpressionId[]).map((eid) => {
            const opt = EXPRESSIONS[eid];
            const isSelected = expressionId === eid;

            return (
              <button
                key={eid}
                type="button"
                onClick={() => onSelectExpression(eid)}
                className={`text-right p-2.5 rounded-xl border transition-all min-h-[52px] flex flex-col justify-center ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400/80 ring-1 ring-amber-400/50'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 text-slate-300'
                }`}
              >
                <span className={`text-xs font-medium truncate ${isSelected ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                  {opt.labelAr || opt.label}
                </span>
                <span className="text-[10px] text-slate-500 truncate mt-0.5">
                  {opt.descriptionAr || opt.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

