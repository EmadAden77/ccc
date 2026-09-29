'use client';

import React, { useState } from 'react';
import {
  PoseId,
  CameraAngleId,
  TimeOfDayId,
  ClothingId,
  HairstyleId,
  ExpressionId,
  VehicleSpot,
  LocationDefinition,
} from '@/lib/types';
import {
  POSES,
  CAMERAS,
  TIMES_OF_DAY,
  CLOTHING_OPTIONS,
  HAIRSTYLES,
  EXPRESSIONS,
  VEHICLE_SPOTS,
} from '@/lib/scene-data';
import {
  User,
  Camera,
  Shirt,
  Sparkles,
  Smile,
  SunMedium,
  SlidersHorizontal,
  ChevronDown,
  Check,
  Car,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';

interface SceneAccordionProps {
  location: LocationDefinition;
  vehicleSpot: VehicleSpot;
  onSelectVehicleSpot: (spot: VehicleSpot) => void;
  selectedPoseId: PoseId;
  onSelectPose: (id: PoseId) => void;
  selectedCameraId: CameraAngleId;
  onSelectCamera: (id: CameraAngleId) => void;
  selectedClothingId: ClothingId;
  onSelectClothing: (id: ClothingId) => void;
  selectedHairstyleId: HairstyleId;
  onSelectHairstyle: (id: HairstyleId) => void;
  selectedExpressionId: ExpressionId;
  onSelectExpression: (id: ExpressionId) => void;
  selectedTimeId: TimeOfDayId;
  onSelectTime: (id: TimeOfDayId) => void;
  validPoseIds: PoseId[];
  validCameraIds: CameraAngleId[];
}

type AccordionSection =
  | 'pose'
  | 'camera'
  | 'clothing'
  | 'hair'
  | 'expression'
  | 'lighting'
  | 'advanced'
  | null;

export function SceneAccordion({
  location,
  vehicleSpot,
  onSelectVehicleSpot,
  selectedPoseId,
  onSelectPose,
  selectedCameraId,
  onSelectCamera,
  selectedClothingId,
  onSelectClothing,
  selectedHairstyleId,
  onSelectHairstyle,
  selectedExpressionId,
  onSelectExpression,
  selectedTimeId,
  onSelectTime,
  validPoseIds,
  validCameraIds,
}: SceneAccordionProps) {
  const [openSection, setOpenSection] = useState<AccordionSection>(null);

  const toggleSection = (section: AccordionSection) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const currentPose = POSES[selectedPoseId] || POSES[validPoseIds[0]];
  const currentCamera = CAMERAS[selectedCameraId] || CAMERAS[validCameraIds[0]];
  const currentClothing = CLOTHING_OPTIONS[selectedClothingId];
  const currentHair = HAIRSTYLES[selectedHairstyleId];
  const currentExpression = EXPRESSIONS[selectedExpressionId];
  const currentTime = TIMES_OF_DAY[selectedTimeId];
  const currentVehicleSpot = VEHICLE_SPOTS[vehicleSpot];

  const isVehicleActive = vehicleSpot !== 'none';

  return (
    <div className="space-y-1.5">
      {/* وضعية التصوير */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('pose')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-right transition-colors hover:bg-slate-900/90 min-h-[46px]"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <User className={`w-4 h-4 mt-0.5 shrink-0 ${openSection === 'pose' ? 'text-amber-400' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-white">وضعية التصوير</span>
              <span className="block text-[11px] text-amber-400/90 font-medium leading-snug line-clamp-2 mt-0.5">
                {currentPose?.labelAr || currentPose?.label}
              </span>
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 mr-2 ${
              openSection === 'pose' ? 'rotate-180 text-amber-400' : ''
            }`}
          />
        </button>

        {openSection === 'pose' && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/70 space-y-1.5 animate-in fade-in-50 duration-150">
            <div className="text-[11px] text-slate-400 mb-1 px-1">
              الوضعيات المتوافقة مع المكان ({validPoseIds.length}):
            </div>
            {validPoseIds.map((pid) => {
              const p = POSES[pid];
              const isSelected = selectedPoseId === pid;

              return (
                <button
                  key={pid}
                  type="button"
                  onClick={() => {
                    onSelectPose(pid);
                    setOpenSection(null);
                  }}
                  className={`w-full text-right px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between min-h-[42px] ${
                    isSelected
                      ? 'bg-amber-400/15 border border-amber-400/60 text-amber-300 font-semibold'
                      : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="min-w-0">
                    <div>{p.labelAr || p.label}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {p.biomechanicsAr || p.biomechanics}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mr-2">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* الكاميرا */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('camera')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-right transition-colors hover:bg-slate-900/90 min-h-[46px]"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <Camera className={`w-4 h-4 mt-0.5 shrink-0 ${openSection === 'camera' ? 'text-amber-400' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-white">الكاميرا</span>
              <span className="block text-[11px] text-amber-400/90 font-medium leading-snug line-clamp-2 mt-0.5">
                {currentCamera?.labelAr || currentCamera?.label}
              </span>
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 mr-2 ${
              openSection === 'camera' ? 'rotate-180 text-amber-400' : ''
            }`}
          />
        </button>

        {openSection === 'camera' && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/70 space-y-1.5 animate-in fade-in-50 duration-150">
            <div className="text-[11px] text-slate-400 mb-1 px-1">
              زاوية وهندسة الكاميرا:
            </div>
            {validCameraIds.map((cid) => {
              const c = CAMERAS[cid];
              const isSelected = selectedCameraId === cid;

              return (
                <button
                  key={cid}
                  type="button"
                  onClick={() => {
                    onSelectCamera(cid);
                    setOpenSection(null);
                  }}
                  className={`w-full text-right px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between min-h-[42px] ${
                    isSelected
                      ? 'bg-amber-400/15 border border-amber-400/60 text-amber-300 font-semibold'
                      : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="min-w-0">
                    <div>{c.labelAr || c.label}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {c.descriptionAr || c.description}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mr-2">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* الملابس */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('clothing')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-right transition-colors hover:bg-slate-900/90 min-h-[46px]"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <Shirt className={`w-4 h-4 mt-0.5 shrink-0 ${openSection === 'clothing' ? 'text-amber-400' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-white">الملابس</span>
              <span className="block text-[11px] text-amber-400/90 font-medium leading-snug line-clamp-2 mt-0.5">
                {currentClothing?.labelAr || currentClothing?.label}
              </span>
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 mr-2 ${
              openSection === 'clothing' ? 'rotate-180 text-amber-400' : ''
            }`}
          />
        </button>

        {openSection === 'clothing' && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/70 space-y-1.5 animate-in fade-in-50 duration-150">
            {(Object.keys(CLOTHING_OPTIONS) as ClothingId[]).map((cid) => {
              const opt = CLOTHING_OPTIONS[cid];
              const isSelected = selectedClothingId === cid;

              return (
                <button
                  key={cid}
                  type="button"
                  onClick={() => {
                    onSelectClothing(cid);
                    setOpenSection(null);
                  }}
                  className={`w-full text-right px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between min-h-[42px] ${
                    isSelected
                      ? 'bg-amber-400/15 border border-amber-400/60 text-amber-300 font-semibold'
                      : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 text-slate-300'
                  }`}
                >
                  <div>
                    <div>{opt.labelAr || opt.label}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {opt.descriptionAr || opt.description}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mr-2">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* تسريحة الشعر */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('hair')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-right transition-colors hover:bg-slate-900/90 min-h-[46px]"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <Sparkles className={`w-4 h-4 mt-0.5 shrink-0 ${openSection === 'hair' ? 'text-amber-400' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-white">تسريحة الشعر</span>
              <span className="block text-[11px] text-amber-400/90 font-medium leading-snug line-clamp-2 mt-0.5">
                {currentHair?.labelAr || currentHair?.label}
              </span>
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 mr-2 ${
              openSection === 'hair' ? 'rotate-180 text-amber-400' : ''
            }`}
          />
        </button>

        {openSection === 'hair' && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/70 space-y-1.5 animate-in fade-in-50 duration-150">
            {(Object.keys(HAIRSTYLES) as HairstyleId[]).map((hid) => {
              const opt = HAIRSTYLES[hid];
              const isSelected = selectedHairstyleId === hid;

              return (
                <button
                  key={hid}
                  type="button"
                  onClick={() => {
                    onSelectHairstyle(hid);
                    setOpenSection(null);
                  }}
                  className={`w-full text-right px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between min-h-[42px] ${
                    isSelected
                      ? 'bg-amber-400/15 border border-amber-400/60 text-amber-300 font-semibold'
                      : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 text-slate-300'
                  }`}
                >
                  <div>
                    <div>{opt.labelAr || opt.label}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {opt.descriptionAr || opt.description}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mr-2">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* تعبير الوجه */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('expression')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-right transition-colors hover:bg-slate-900/90 min-h-[46px]"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <Smile className={`w-4 h-4 mt-0.5 shrink-0 ${openSection === 'expression' ? 'text-amber-400' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-white">تعبير الوجه</span>
              <span className="block text-[11px] text-amber-400/90 font-medium leading-snug line-clamp-2 mt-0.5">
                {currentExpression?.labelAr || currentExpression?.label}
              </span>
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 mr-2 ${
              openSection === 'expression' ? 'rotate-180 text-amber-400' : ''
            }`}
          />
        </button>

        {openSection === 'expression' && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/70 space-y-1.5 animate-in fade-in-50 duration-150">
            {(Object.keys(EXPRESSIONS) as ExpressionId[]).map((eid) => {
              const opt = EXPRESSIONS[eid];
              const isSelected = selectedExpressionId === eid;

              return (
                <button
                  key={eid}
                  type="button"
                  onClick={() => {
                    onSelectExpression(eid);
                    setOpenSection(null);
                  }}
                  className={`w-full text-right px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between min-h-[42px] ${
                    isSelected
                      ? 'bg-amber-400/15 border border-amber-400/60 text-amber-300 font-semibold'
                      : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 text-slate-300'
                  }`}
                >
                  <div>
                    <div>{opt.labelAr || opt.label}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {opt.descriptionAr || opt.description}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mr-2">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* الإضاءة */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('lighting')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-right transition-colors hover:bg-slate-900/90 min-h-[46px]"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <SunMedium className={`w-4 h-4 mt-0.5 shrink-0 ${openSection === 'lighting' ? 'text-amber-400' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-white">الإضاءة</span>
              <span className="block text-[11px] text-amber-400/90 font-medium leading-snug line-clamp-2 mt-0.5">
                {currentTime?.labelAr || currentTime?.label}
              </span>
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 mr-2 ${
              openSection === 'lighting' ? 'rotate-180 text-amber-400' : ''
            }`}
          />
        </button>

        {openSection === 'lighting' && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/70 space-y-1.5 animate-in fade-in-50 duration-150">
            {(Object.keys(TIMES_OF_DAY) as TimeOfDayId[]).map((tid) => {
              const opt = TIMES_OF_DAY[tid];
              const isSelected = selectedTimeId === tid;

              return (
                <button
                  key={tid}
                  type="button"
                  onClick={() => {
                    onSelectTime(tid);
                    setOpenSection(null);
                  }}
                  className={`w-full text-right px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between min-h-[42px] ${
                    isSelected
                      ? 'bg-amber-400/15 border border-amber-400/60 text-amber-300 font-semibold'
                      : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 text-slate-300'
                  }`}
                >
                  <div>
                    <div>{opt.labelAr || opt.label}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {opt.descriptionAr || opt.description}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mr-2 shrink-0">
                    <span className="text-[10px] text-slate-400 font-mono" dir="ltr">
                      {(opt.badgeAr || opt.badge).split('·')[0].trim()}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* خيارات متقدمة */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('advanced')}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-right transition-colors hover:bg-slate-900/90 min-h-[46px]"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <SlidersHorizontal className={`w-4 h-4 mt-0.5 shrink-0 ${openSection === 'advanced' ? 'text-amber-400' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-white">خيارات متقدمة</span>
              <span className="block text-[11px] text-amber-400/90 font-medium leading-snug line-clamp-2 mt-0.5">
                {isVehicleActive ? currentVehicleSpot?.labelAr || currentVehicleSpot?.label : 'بدون سيارة'}
              </span>
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 mr-2 ${
              openSection === 'advanced' ? 'rotate-180 text-amber-400' : ''
            }`}
          />
        </button>

        {openSection === 'advanced' && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/70 space-y-3 animate-in fade-in-50 duration-150">
            {location.supportsVehicle ? (
              <div className="space-y-3">
                {/* المجموعة 1: السيارة */}
                <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                  <div>
                    <span className="block text-xs font-medium text-slate-200">السيارة</span>
                    <span className="text-[10px] text-slate-400">تفعيل حضور المركبة في المشهد</span>
                  </div>
                  <div className="flex items-center gap-1 p-0.5 bg-slate-950 border border-slate-800 rounded-lg">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectVehicleSpot(
                          location.defaultVehicleSpot !== 'none'
                            ? location.defaultVehicleSpot
                            : 'beside_driver_door'
                        )
                      }
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors min-h-[32px] flex items-center gap-1 ${
                        isVehicleActive
                          ? 'bg-amber-400 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span>مفعلة</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectVehicleSpot('none')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors min-h-[32px] flex items-center gap-1 ${
                        !isVehicleActive
                          ? 'bg-amber-400 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>بدون</span>
                    </button>
                  </div>
                </div>

                {/* المجموعة 2: نوع السيارة */}
                <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/40 flex items-center justify-between text-xs">
                  <span className="text-slate-400">نوع السيارة</span>
                  <span className="text-slate-200 font-medium font-mono text-[11px]" dir="ltr">
                    Range Rover Sport 2017 (L494)
                  </span>
                </div>

                {/* المجموعة 3: موضع التصوير بالنسبة للسيارة */}
                {isVehicleActive && (
                  <div className="space-y-1.5">
                    <span className="block text-xs font-medium text-slate-300 px-0.5">
                      موضع التصوير
                    </span>
                    <div className="space-y-1">
                      {location.supportedVehicleSpots
                        .filter((spot) => spot !== 'none')
                        .map((spot) => {
                          const info = VEHICLE_SPOTS[spot];
                          const isSelected = vehicleSpot === spot;

                          return (
                            <button
                              key={spot}
                              type="button"
                              onClick={() => {
                                onSelectVehicleSpot(spot);
                                setOpenSection(null);
                              }}
                              className={`w-full text-right px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between min-h-[38px] ${
                                isSelected
                                  ? 'bg-amber-400/15 border border-amber-400/60 text-amber-300 font-semibold'
                                  : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 text-slate-300'
                              }`}
                            >
                              <span className="font-medium">{info.labelAr || info.label}</span>
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
                )}
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                السيارة غير متاحة في هذا المكان الداخلي ({location.nameAr || location.name}).
              </div>
            )}

            {/* ثوابت المحرك الفيزيائية */}
            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>مطابقة معمارية 2017 L494 ما قبل الفيس ليفت وهندسة كاميرا الهاتف.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
