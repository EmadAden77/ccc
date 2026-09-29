'use client';

import React from 'react';
import { VehicleSpot, LocationDefinition } from '@/lib/types';
import { VEHICLE_SPOTS } from '@/lib/scene-data';
import { Car, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';

interface VehicleSelectorProps {
  location: LocationDefinition;
  vehicleSpot: VehicleSpot;
  onSelectSpot: (spot: VehicleSpot) => void;
}

export function VehicleSelector({
  location,
  vehicleSpot,
  onSelectSpot,
}: VehicleSelectorProps) {
  if (!location.supportsVehicle) {
    return (
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-400 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <div className="font-medium text-slate-300">السيارة غير متاحة في {location.nameAr || location.name}</div>
          <p className="mt-0.5 text-slate-400">
            هذه المساحة المعمارية الداخلية معزولة فيزيائياً عن السيارات. منطق المشهد يقتصر تلقائياً على حركة المشي الداخلية والوقوف وانعكاسات المرآة.
          </p>
        </div>
      </div>
    );
  }

  const supportedSpots = location.supportedVehicleSpots;
  const isVehicleActive = vehicleSpot !== 'none';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
            <span>2. السيارة والتفاعل المكاني</span>
            <span className="text-xs font-normal text-amber-400">· السياق الفيزيائي</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            رينج روفر سبورت أوتوبيوغرافي ديناميك 2017 (L494 ما قبل الفيس ليفت، مواصفات سعودية).
          </p>
        </div>

        {/* Presence Toggle */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            type="button"
            onClick={() => onSelectSpot(location.defaultVehicleSpot !== 'none' ? location.defaultVehicleSpot : 'beside_driver_door')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors min-h-[36px] flex items-center gap-1.5 ${
              isVehicleActive
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>رينج روفر</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectSpot('none')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors min-h-[36px] flex items-center gap-1.5 ${
              !isVehicleActive
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>بدون سيارة</span>
          </button>
        </div>
      </div>

      {isVehicleActive ? (
        <div className="space-y-2.5">
          {/* Vehicle Spots Supported in This Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {supportedSpots
              .filter((spot) => spot !== 'none')
              .map((spot) => {
                const info = VEHICLE_SPOTS[spot];
                const isSelected = vehicleSpot === spot;

                return (
                  <button
                    key={spot}
                    type="button"
                    onClick={() => onSelectSpot(spot)}
                    className={`text-right p-3 rounded-xl border transition-all min-h-[64px] flex flex-col justify-center ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400/80 ring-1 ring-amber-400/50'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${isSelected ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                        {info.labelAr || info.label}
                      </span>
                      {spot === 'inside_driver' && (
                        <span className="text-[10px] text-amber-400 font-mono">مقصورة MY2017</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {info.descriptionAr || info.description}
                    </p>
                  </button>
                );
              })}
          </div>

          {/* MY2017 Pre-facelift Fidelity Card */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-medium text-slate-300">تأكيد معمارية ما قبل الفيس ليفت (Pre-Facelift)</span>
            </div>
            <div className="text-[11px] text-slate-400 leading-relaxed space-y-1">
              <p>
                <strong className="text-slate-300">الهيكل الخارجي:</strong> أبيض فوجي (Fuji White) · مواصفات سعودية (مقود جهة اليسار LHD) · أوتوبيوغرافي ديناميك
              </p>
              {vehicleSpot === 'inside_driver' ? (
                <p>
                  <strong className="text-slate-300">المقصورة (مطابقة تامة لـ MY2017):</strong> جلد أكسفورد عاجي مخرم ببايبنج تباين · خشب بيانو أسود · شاشة عريضة مفردة 10.2 إنش InControl Touch Pro مع قرصي تكييف دوارين ماديين بشاشات رقمية مدمجة
                </p>
              ) : (
                <p>
                  <strong className="text-slate-300">التموضع:</strong> ملامسة واقعية للأرض، انحناء العجلات، وانعكاسات طبيعية لأشعة الشمس السعودية على طلاء السيارة الأبيض.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-400">
          تم ضبط المشهد على <span className="text-slate-200 font-medium">وضع المشاة</span>. يتفاعل الشخص مباشرة مع البيئة المحيطة دون وجود سيارة في الإطار.
        </div>
      )}
    </div>
  );
}

