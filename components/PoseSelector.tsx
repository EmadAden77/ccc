'use client';

import React from 'react';
import {
  PoseId,
  CameraAngleId,
  TimeOfDayId,
  VehicleSpot,
  LocationDefinition,
} from '@/lib/types';
import { POSES, CAMERAS, TIMES_OF_DAY } from '@/lib/scene-data';
import { Camera, SunMedium, User } from 'lucide-react';

interface PoseSelectorProps {
  location: LocationDefinition;
  vehicleSpot: VehicleSpot;
  selectedPoseId: PoseId;
  onSelectPose: (id: PoseId) => void;
  selectedCameraId: CameraAngleId;
  onSelectCamera: (id: CameraAngleId) => void;
  selectedTimeId: TimeOfDayId;
  onSelectTime: (id: TimeOfDayId) => void;
}

export function PoseSelector({
  location,
  vehicleSpot,
  selectedPoseId,
  onSelectPose,
  selectedCameraId,
  onSelectCamera,
  selectedTimeId,
  onSelectTime,
}: PoseSelectorProps) {
  // Compute valid poses dynamically based on location and vehicle spot
  let availablePoseIds: PoseId[] = [];

  if (vehicleSpot === 'inside_driver') {
    availablePoseIds = ['one_hand_wheel', 'center_armrest_lean', 'casual_seatback_recline', 'side_window_gaze'];
  } else if (vehicleSpot === 'beside_driver_door') {
    availablePoseIds = ['standing_door_frame', 'leaning_against_door', 'standing_weight_shift', 'looking_away_candid'];
  } else if (vehicleSpot === 'leaning_front_fender') {
    availablePoseIds = ['front_quarter_angle', 'standing_weight_shift', 'looking_away_candid'];
  } else if (vehicleSpot === 'walking_past_rear') {
    availablePoseIds = ['walking_mid_stride', 'standing_weight_shift', 'looking_away_candid'];
  } else if (location.id === 'elevator_mirror') {
    availablePoseIds = ['elevator_mirror_phone', 'standing_weight_shift'];
  } else if (location.id === 'outdoor_cafe') {
    availablePoseIds = ['seated_cafe_table', 'looking_away_candid', 'standing_weight_shift'];
  } else if (location.id === 'rooftop_terrace') {
    availablePoseIds = ['rooftop_parapet_lean', 'standing_weight_shift', 'looking_away_candid'];
  } else if (location.id === 'stairway_landing') {
    availablePoseIds = ['leaning_wall_railing', 'standing_weight_shift', 'looking_away_candid'];
  } else {
    // General outdoor/commercial
    availablePoseIds = ['standing_weight_shift', 'walking_mid_stride', 'looking_away_candid', 'leaning_wall_railing'];
  }

  // Ensure current pose is valid; if not, suggest first available
  const isPoseValid = availablePoseIds.includes(selectedPoseId);
  const activePose = isPoseValid ? POSES[selectedPoseId] : POSES[availablePoseIds[0]];

  // Compute valid camera angles
  let availableCameraIds: CameraAngleId[] = [];
  if (location.id === 'elevator_mirror') {
    availableCameraIds = ['mirror_reflection_direct'];
  } else if (vehicleSpot === 'inside_driver') {
    availableCameraIds = ['eye_level_natural', 'low_chest_level', 'high_angle_tilt'];
  } else {
    availableCameraIds = ['eye_level_natural', 'low_chest_level', 'wide_extended_arm'];
  }

  return (
    <div className="space-y-6">
      {/* 3. Pose & Biomechanics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>3. الوضعية والحركة الجسدية</span>
              <span className="text-xs font-normal text-amber-400">· متوافقة مع السياق</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              مقتصرة على وضعيات الجسم الطبيعية المتوافقة فيزيائياً مع هذا المكان.
            </p>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {availablePoseIds.length} وضعيات متاحة
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {availablePoseIds.map((pid) => {
            const p = POSES[pid];
            const isSelected = selectedPoseId === pid;

            return (
              <button
                key={pid}
                type="button"
                onClick={() => onSelectPose(pid)}
                className={`text-right p-3 rounded-xl border transition-all min-h-[58px] flex flex-col justify-center ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400/80 ring-1 ring-amber-400/50'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 text-slate-300'
                }`}
              >
                <span className={`text-xs font-medium ${isSelected ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                  {p.labelAr || p.label}
                </span>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {p.biomechanicsAr || p.biomechanics}
                </p>
              </button>
            );
          })}
        </div>

        {/* Biomechanical Physics Note */}
        {activePose && (
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-400">
            <span className="font-medium text-slate-300">التفصيل الحركي الجسدي: </span>
            <span className="text-[11px] text-slate-400 leading-relaxed">{activePose.biomechanicsAr || activePose.biomechanics}</span>
          </div>
        )}
      </div>

      {/* 4. Camera & Smartphone Geometry */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>4. كاميرا الهاتف والمسافة</span>
              <span className="text-xs font-normal text-amber-400">· الواقعية البصرية</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              مسافة اليد الطبيعية للهاتف المحمول (حساس أمامي مكافئ لـ 24 مم).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {availableCameraIds.map((cid) => {
            const cam = CAMERAS[cid];
            const isSelected = selectedCameraId === cid;

            return (
              <button
                key={cid}
                type="button"
                onClick={() => onSelectCamera(cid)}
                className={`text-right p-3 rounded-xl border transition-all min-h-[64px] flex flex-col justify-center ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400/80 ring-1 ring-amber-400/50'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 text-slate-300'
                }`}
              >
                <span className={`text-xs font-medium ${isSelected ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                  {cam.labelAr || cam.label}
                </span>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                  {cam.descriptionAr || cam.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Time of Day & Environmental Light */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
              <SunMedium className="w-3.5 h-3.5 text-amber-400" />
              <span>5. التوقيت والأجواء السعودية</span>
              <span className="text-xs font-normal text-amber-400">· الإضاءة الطبيعية</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              محاكاة مناخ السعودية، العوالق الترابية الخفيفة، زاوية الشمس، والإضاءة الليلية الواقعية.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(TIMES_OF_DAY) as TimeOfDayId[]).map((tid) => {
            const t = TIMES_OF_DAY[tid];
            const isSelected = selectedTimeId === tid;

            return (
              <button
                key={tid}
                type="button"
                onClick={() => onSelectTime(tid)}
                className={`text-right p-3 rounded-xl border transition-all min-h-[72px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400/80 ring-1 ring-amber-400/50'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 text-slate-300'
                }`}
              >
                <div>
                  <span className={`text-xs font-medium leading-tight block ${isSelected ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                    {t.labelAr || t.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5" dir="ltr">
                    {(t.badgeAr || t.badge).split('·')[0].trim()}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-1">
                  {t.descriptionAr || t.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

