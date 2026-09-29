'use client';

import React, { useState } from 'react';
import { TargetEngine } from '@/lib/types';
import { CompilationResult } from '@/lib/prompt-compiler';
import { Copy, Check, ShieldCheck, SlidersHorizontal, Bookmark } from 'lucide-react';

interface PromptViewerProps {
  compilation: CompilationResult;
  targetEngine: TargetEngine;
  onSelectEngine: (engine: TargetEngine) => void;
  onSaveFavorite?: () => void;
  isFavoriteSaved?: boolean;
}

const CHECK_LABELS_AR: Record<string, { labelAr: string; detailAr: string }> = {
  'Mirror Optical Path': {
    labelAr: 'المسار البصري للمرآة',
    detailAr: 'الهاتف ممسوك بشكل ظاهر في اليد وموجه نحو المرآة ليعكس الشخص وكفر الهاتف طبيعياً.',
  },
  'Arm-Reach Biomechanics': {
    labelAr: 'حركية امتداد الذراع',
    detailAr: 'مسافة الكاميرا مقيدة فيزيائياً بمدى وصول الذراع الطبيعي (~55 سم)، مطابقاً لهندسة سيلفي الهاتف المحمول.',
  },
  'MY2017 Interior Fidelity': {
    labelAr: 'دقة مقصورة MY2017',
    detailAr: 'فرض معمارية L494 ما قبل الفيس ليفت: شاشة عريضة مفردة InControl Touch Pro وأقراص تكييف دوارة مادية مع جلد عاجي مخرم.',
  },
  'Vehicle Scale & Contact': {
    labelAr: 'مقياس السيارة وملامسة الأرض',
    detailAr: 'ملامسة إطارات رينج روفر سبورت بالأرض، انحجاب الظلال، وتناسب المقياس البشري مع المركبة.',
  },
  'Pedestrian Spatial Coherence': {
    labelAr: 'اتساق وضعية المشاة',
    detailAr: 'تموضع طبيعي للمشاة مع ملامسة حقيقية للأرض ومحاذاة واقعية للظلال.',
  },
  'Everyday Saudi Authenticity': {
    labelAr: 'أصالة الحياة اليومية السعودية',
    detailAr: 'عمارة محلية وتفاصيل شوارع واقعية غير أيقونية ودون معالم سياحية مصطنعة.',
  },
  'Smartphone Sensor Reality': {
    labelAr: 'واقعية حساس الهاتف الذكي',
    detailAr: 'زاوية واسعة مكافئة لـ 24 مم، تعريض واقعي، وملمس مسام البشرة الطبيعي بدون فلاتر تجميل بلاستيكية.',
  },
};

export function PromptViewer({
  compilation,
  targetEngine,
  onSelectEngine,
  onSaveFavorite,
  isFavoriteSaved,
}: PromptViewerProps) {
  const [copied, setCopied] = useState(false);
  const [showInspection, setShowInspection] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(compilation.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="p-3.5 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">الـPrompt النهائي</span>
            <span className="text-[11px] font-mono text-slate-400 tabular-nums">
              · {compilation.wordCount} كلمة
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            مركب بهندسة الكاميرا والاستدلال المكاني وتفاصيل الحياة اليومية السعودية.
          </p>
        </div>

        {/* Engine Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto" dir="ltr">
          <button
            type="button"
            onClick={() => onSelectEngine('chatgpt')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors min-h-[34px] ${
              targetEngine === 'chatgpt'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ChatGPT Images
          </button>
          <button
            type="button"
            onClick={() => onSelectEngine('gemini')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors min-h-[34px] ${
              targetEngine === 'gemini'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Gemini
          </button>
        </div>
      </div>

      {/* Prompt Body - Strict LTR for English generated prompt */}
      <div className="p-3.5 sm:p-4">
        <div className="relative group">
          <div
            dir="ltr"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-200 leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap select-all selection:bg-amber-400/30 selection:text-amber-100 text-left"
          >
            {compilation.prompt}
          </div>

          {/* Action Row */}
          <div className="mt-3 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={() => setShowInspection(!showInspection)}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-slate-200 transition-colors py-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showInspection ? 'إخفاء الفحص' : 'الفحص الفيزيائي'}</span>
            </button>

            <div className="flex items-center gap-2">
              {onSaveFavorite && (
                <button
                  type="button"
                  onClick={onSaveFavorite}
                  className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all min-h-[42px] border ${
                    isFavoriteSaved
                      ? 'bg-amber-400/15 border-amber-400/60 text-amber-300'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title="حفظ المشهد في المفضلة المحلية"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${isFavoriteSaved ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`}
                  />
                  <span>{isFavoriteSaved ? 'تم الحفظ' : 'حفظ'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all min-h-[42px] active:scale-[0.98] ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/10'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>تم نسخ الـPrompt!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ الـPrompt</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Physical Plausibility Inspection Drawer */}
        {showInspection && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
            <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ثوابت التحقق الفيزيائي والواقعية البيئية للمشهد</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {compilation.physicalChecks.map((chk, idx) => {
                const localized = CHECK_LABELS_AR[chk.label];
                const label = localized?.labelAr || chk.label;
                const detail = localized?.detailAr || chk.detail;

                return (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{label}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      {detail}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Scene State Breakdown without pills */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/60 text-xs">
              <span className="font-semibold text-slate-300 block mb-1.5">عناصر المشهد المحلولة:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-[11px] text-slate-400">
                <div>
                  <span className="text-slate-500">الموقع:</span> {compilation.sceneBreakdown.location}
                </div>
                <div>
                  <span className="text-slate-500">السيارة:</span> {compilation.sceneBreakdown.vehicleContext}
                </div>
                <div>
                  <span className="text-slate-500">الوضعية:</span> {compilation.sceneBreakdown.biomechanics}
                </div>
                <div>
                  <span className="text-slate-500">البصريات:</span> {compilation.sceneBreakdown.framing}
                </div>
                <div>
                  <span className="text-slate-500">الأجواء:</span> {compilation.sceneBreakdown.atmosphere}
                </div>
                <div>
                  <span className="text-slate-500">المظهر:</span> {compilation.sceneBreakdown.personalLook}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

