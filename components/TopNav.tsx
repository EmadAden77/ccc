'use client';

import React from 'react';
import { Sparkles, RotateCcw, Bookmark } from 'lucide-react';

interface TopNavProps {
  onRandomize?: () => void;
  onReset?: () => void;
  favoritesCount?: number;
  onOpenFavorites?: () => void;
}

export function TopNav({
  onRandomize,
  onReset,
  favoritesCount = 0,
  onOpenFavorites,
}: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-2xl mx-auto px-3.5 sm:px-4 h-12 flex items-center justify-between gap-2">
        {/* Brand title */}
        <span className="text-xs sm:text-sm font-semibold tracking-tight text-white shrink-0">
          محرك السيلفي الواقعي
        </span>

        {/* Quick action buttons with balanced sizes and labels */}
        <div className="flex items-center gap-1.5">
          {onOpenFavorites && (
            <button
              type="button"
              onClick={onOpenFavorites}
              className="px-2 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors min-h-[32px] flex items-center gap-1"
              title="المشاهد المحفوظة"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline">المفضلة</span>
              {favoritesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] leading-tight">
                  {favoritesCount}
                </span>
              )}
            </button>
          )}

          {onRandomize && (
            <button
              type="button"
              onClick={onRandomize}
              className="px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-lg transition-colors min-h-[32px] flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>عشوائي</span>
            </button>
          )}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors min-h-[32px] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>إعادة</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
