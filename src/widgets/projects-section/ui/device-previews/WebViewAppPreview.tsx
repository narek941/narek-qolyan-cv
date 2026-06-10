"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Dices,
  Menu,
  Search,
  Shield,
  Trophy,
  Tv,
} from "lucide-react";

const BG = "#0d1a12";
const GREEN = "#3dba4e";
const GOLD = "#d4af37";

const NAV_ITEMS = [
  { icon: Trophy, label: "Sports" },
  { icon: Dices, label: "Slots" },
  { icon: Calendar, label: "Events" },
  { icon: Tv, label: "Live" },
  { icon: Trophy, label: "Tours" },
];

const TOP_GAMES = [
  { tint: "from-emerald-600/50 to-green-900/40" },
  { tint: "from-lime-600/40 to-emerald-900/30" },
  { tint: "from-green-700/50 to-teal-900/40" },
];

/**
 * React Native WebView shell — green casino-style site inside native chrome.
 * Per-app VPN toggle in the native header (main product feature).
 */
export const WebViewAppPreview = () => {
  const [vpnEnabled, setVpnEnabled] = useState(true);
  const [activeNav, setActiveNav] = useState(1);

  return (
    <div className="flex h-full w-full flex-col" style={{ background: BG }}>
      {/* Native app chrome — VPN toggle */}
      <div className="flex items-center justify-between border-b border-white/8 px-2 py-1">
        <span className="text-[6px] font-bold tracking-wide text-white/70">
          WebView App
        </span>
        <button
          type="button"
          onClick={() => setVpnEnabled((enabled) => !enabled)}
          className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[5.5px] font-bold transition-colors ${
            vpnEnabled
              ? "bg-emerald-500/25 text-emerald-300"
              : "bg-white/10 text-white/45"
          }`}
        >
          <Shield className="h-2 w-2" />
          VPN {vpnEnabled ? "ON" : "OFF"}
        </button>
      </div>

      {/* WebView content — green casino UI */}
      <div
        data-lenis-prevent
        className="flex flex-1 flex-col overflow-y-auto"
        style={{ background: BG }}
      >
        {/* Site header */}
        <header className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-1">
            <Menu className="h-2.5 w-2.5 text-white/60" />
            <Search className="h-2.5 w-2.5 text-white/60" />
          </div>
          <div className="flex items-center gap-0.5">
            <span
              className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-[5px] font-black"
              style={{ background: GOLD, color: BG }}
            >
              ◆
            </span>
            <span
              className="font-display text-[8px] font-bold tracking-wider"
              style={{ color: GOLD }}
            >
              ARENA
            </span>
          </div>
          <div className="flex gap-0.5">
            <button
              type="button"
              className="rounded px-1.5 py-0.5 text-[5.5px] font-semibold text-white/70"
            >
              Login
            </button>
            <button
              type="button"
              className="rounded px-1.5 py-0.5 text-[5.5px] font-bold text-white"
              style={{ background: GREEN }}
            >
              Sign up
            </button>
          </div>
        </header>

        {/* Category nav */}
        <div className="flex gap-1 overflow-x-auto px-2 pb-1">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveNav(index)}
                className={`flex shrink-0 flex-col items-center gap-0.5 rounded-lg px-1.5 py-1 ${
                  activeNav === index ? "bg-white/8" : ""
                }`}
              >
                <Icon
                  className="h-3 w-3"
                  style={{ color: activeNav === index ? GREEN : "rgba(255,255,255,0.45)" }}
                />
                <span className="text-[5px] text-white/55">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Promo banner */}
        <div className="mx-2 mb-1.5 overflow-hidden rounded-xl border border-purple-900/40 bg-gradient-to-r from-[#1a1028] to-[#0f1a14] p-2">
          <p className="text-[6.5px] font-bold leading-snug text-white">
            Welcome bonus{" "}
            <span style={{ color: GOLD }}>225%</span> + 70 free spins
          </p>
          <button
            type="button"
            className="mt-1.5 rounded-full px-3 py-1 text-[6px] font-bold text-white"
            style={{ background: GREEN }}
          >
            Sign up
          </button>
        </div>

        {/* Top games */}
        <div className="px-2">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[7px] font-bold text-white">Top games</p>
            <span className="text-[5.5px]" style={{ color: GOLD }}>
              all 11000+
            </span>
          </div>
          <div className="mb-1 flex gap-1">
            <div className="flex flex-1 items-center gap-0.5 rounded-full border border-white/10 bg-black/30 px-1.5 py-0.5">
              <Search className="h-2 w-2 text-white/40" />
              <span className="text-[5.5px] text-white/35">Search</span>
            </div>
            <button
              type="button"
              className="flex items-center gap-0.5 rounded-full border border-white/10 px-1.5 py-0.5 text-[5px] text-white/50"
            >
              Provider
              <ChevronDown className="h-2 w-2" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {TOP_GAMES.map((game, index) => (
              <button
                key={index}
                type="button"
                className={`aspect-[3/4] rounded-lg bg-gradient-to-br ${game.tint} ring-1 ring-white/10 transition-transform active:scale-95`}
              />
            ))}
          </div>
        </div>

        {vpnEnabled && (
          <p className="mt-auto px-2 py-1 text-center text-[5px] text-emerald-400/70">
            Traffic routed through per-app VPN tunnel
          </p>
        )}
      </div>
    </div>
  );
};
