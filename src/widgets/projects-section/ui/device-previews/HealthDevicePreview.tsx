"use client";

import { useState } from "react";
import {
  Bluetooth,
  Droplets,
  FlaskConical,
  HeartPulse,
  Home,
  Plus,
  User,
} from "lucide-react";

const RING_RADIUS = 34;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const FLASK_GOAL = 3;

/**
 * Smart bottle home screen from MobileApp — segmented flasks ring, H₂/water
 * stats, BLE device card with firmware badge, health sync promo. Anonymized.
 */
export const HealthDevicePreview = () => {
  const [flasksLogged, setFlasksLogged] = useState(2);
  const [healthSyncVisible, setHealthSyncVisible] = useState(true);
  const [firmwareAvailable, setFirmwareAvailable] = useState(true);
  const [connected, setConnected] = useState(true);

  const filledSegments = Math.min(flasksLogged, FLASK_GOAL);
  const segmentLength = RING_CIRCUMFERENCE / FLASK_GOAL;
  const gap = 6;

  const logFlask = () =>
    setFlasksLogged((count) => Math.min(FLASK_GOAL, count + 1));

  return (
    <div className="flex h-full w-full flex-col bg-[#231F20] px-2.5 pb-2 pt-1 text-[#F2F6F8]">
      {/* HomeHeader */}
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[8px] font-bold tracking-wide text-[#7FA0AC]">
          VITA
        </span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3F3F3F]">
          <User className="h-2 w-2 text-[#BAB7B7]" />
        </span>
      </div>

      <p className="text-[7px] font-semibold">Hydrogen &amp; Water Goals</p>
      <p className="mb-1 text-[6px] text-[#BAB7B7]">Today</p>

      {/* CircularProgressIndicator — segmented flasks ring */}
      <button
        type="button"
        onClick={logFlask}
        aria-label="Log flask"
        className="relative mx-auto mb-1.5 flex h-[72px] w-[72px] items-center justify-center transition-transform active:scale-95"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          {Array.from({ length: FLASK_GOAL }, (_, segmentIndex) => {
            const isFilled = segmentIndex < filledSegments;
            const offset = segmentIndex * (segmentLength + gap);
            return (
              <circle
                key={segmentIndex}
                cx="50"
                cy="50"
                r={RING_RADIUS}
                fill="none"
                stroke={isFilled ? "#00A7B5" : "#3F3F3F"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${segmentLength - gap} ${RING_CIRCUMFERENCE}`}
                strokeDashoffset={-offset}
              />
            );
          })}
        </svg>
        <div className="text-center">
          <FlaskConical className="mx-auto mb-0.5 h-2.5 w-2.5 text-[#00A7B5]" />
          <p className="text-[5.5px] text-[#BAB7B7]">Flasks</p>
          <p className="text-[5px] text-[#BAB7B7]">per day</p>
          <p className="text-[9px] font-bold leading-none">
            {flasksLogged}/{FLASK_GOAL}
          </p>
        </div>
      </button>

      {/* HealthSyncCard */}
      {healthSyncVisible && (
        <div className="mb-1.5 flex items-center gap-1.5 rounded-xl border border-[#656263] bg-[#2a2627] p-1.5">
          <HeartPulse className="h-3 w-3 shrink-0 text-[#7FA0AC]" />
          <p className="flex-1 text-[6.5px] text-[#E9E5E5]">Sync with Health</p>
          <button
            type="button"
            onClick={() => setHealthSyncVisible(false)}
            className="text-[6px] text-[#BAB7B7]"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={() => setHealthSyncVisible(false)}
            className="rounded-full bg-[#00A7B5] px-1.5 py-0.5 text-[6px] font-bold text-white"
          >
            Enable
          </button>
        </div>
      )}

      {/* StatProgressItem rows */}
      <div className="mb-1 space-y-1">
        <div>
          <div className="mb-0.5 flex items-center justify-between text-[6px]">
            <span className="text-[#C4A6B5]">Molecular Hydrogen (H₂)</span>
            <span className="text-[#E9E5E5]">12.5/24mg</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-[#3F3F3F]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#C4A6B5] via-[#7C6992] to-[#00A7B5]"
              style={{ width: "52%" }}
            />
          </div>
        </div>
        <div>
          <div className="mb-0.5 flex items-center justify-between text-[6px]">
            <span className="flex items-center gap-0.5 text-[#7FA0AC]">
              <Droplets className="h-2 w-2" />
              Water (H₂O)
            </span>
            <span className="text-[#E9E5E5]">38/72oz</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-[#3F3F3F]">
            <div className="h-full w-[53%] rounded-full bg-[#7FA0AC]" />
          </div>
        </div>
      </div>

      {/* DevicesSection */}
      <div className="mt-auto">
        <div className="mb-0.5 flex items-center justify-between">
          <span className="text-[7px] font-semibold">Devices</span>
          <Plus className="h-2.5 w-2.5 text-[#7FA0AC]" />
        </div>
        <button
          type="button"
          onClick={() => {
            setConnected((isConnected) => !isConnected);
            setFirmwareAvailable((available) => !available);
          }}
          className={`flex w-full items-center justify-between rounded-xl p-1.5 text-left transition-colors ${
            connected
              ? "bg-gradient-to-r from-[#575757] to-[#3B3A3A]"
              : "bg-[#343333]"
          }`}
        >
          <div>
            <span className="flex items-center gap-1 text-[6.5px] font-medium">
              <Bluetooth
                className={`h-2 w-2 ${connected ? "text-[#7FA0AC]" : "text-[#BAB7B7]"}`}
              />
              {connected ? "My Flask" : "Disconnected"}
            </span>
            {firmwareAvailable && connected && (
              <span className="mt-0.5 inline-block rounded-full bg-[#FFD875] px-1 py-0.5 text-[5.5px] font-bold text-[#96561D]">
                Update Available
              </span>
            )}
          </div>
          <FlaskConical className="h-5 w-5 text-[#7FA0AC]/60" />
        </button>
      </div>

      {/* TabBar */}
      <div className="mt-1.5 flex justify-around border-t border-[#3F3F3F] pt-1">
        <Home className="h-2.5 w-2.5 text-white" />
        <Droplets className="h-2.5 w-2.5 text-[#9B9A9A]" />
        <FlaskConical className="h-2.5 w-2.5 text-[#9B9A9A]" />
      </div>
    </div>
  );
};
