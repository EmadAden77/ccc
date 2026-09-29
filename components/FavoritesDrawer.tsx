'use client';

import React from 'react';
import { FavoriteScene } from '@/lib/types';
import { LOCATIONS, VEHICLE_SPOTS, TIMES_OF_DAY } from '@/lib/scene-data';
import { X, Bookmark, Trash2, ArrowLeft, Clock } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: FavoriteScene[];
  onApply: (fav: FavoriteScene) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onApply,
  onDelete,
  onClearAll,
}: FavoritesDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        dir="rtl"
      >
        {/* Drawer Header */}
        <div className="px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-white">المشاهد المحفوظة</span>
            <span className="text-[11px] font-mono text-slate-400 tabular-nums">
              ({favorites.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-[11px] text-rose-400/90 hover:text-rose-300 transition-colors px-2 py-1"
              >
                مسح الكل
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Favorites List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {favorites.length === 0 ? (
            <div className="text-center py-10 px-4 text-slate-500 space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-slate-700" />
              <p className="text-xs">لا توجد مشاهد محفوظة حتى الآن.</p>
              <p className="text-[11px] text-slate-600">
                اضغط على زر «حفظ المشهد» أسفل الـPrompt لحفظ لقطاتك المميزة في المتصفح.
              </p>
            </div>
          ) : (
            favorites.map((fav) => {
              const loc = LOCATIONS[fav.state.locationId];
              const vehicle = VEHICLE_SPOTS[fav.state.vehicleSpot];
              const time = TIMES_OF_DAY[fav.state.timeOfDayId];
              const dateStr = new Date(fav.timestamp).toLocaleDateString('ar-SA', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={fav.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700/80 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        {fav.title || loc?.nameAr || loc?.name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-1 mt-0.5">
                        <span>{loc?.nameAr || loc?.name}</span>
                        <span>•</span>
                        <span className="text-amber-400/90">{vehicle?.labelAr || vehicle?.label}</span>
                        <span>•</span>
                        <span>{time?.labelAr || time?.label}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDelete(fav.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors shrink-0"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{dateStr}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        onApply(fav);
                        onClose();
                      }}
                      className="px-3 py-1 text-xs font-medium text-amber-300 hover:text-slate-950 bg-amber-400/10 hover:bg-amber-400 border border-amber-400/30 hover:border-amber-400 rounded-lg transition-all flex items-center gap-1"
                    >
                      <span>تطبيق المشهد</span>
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
