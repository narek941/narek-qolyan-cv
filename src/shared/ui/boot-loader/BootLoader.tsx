"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  "INITIALIZING SHIP SYSTEMS…",
  "CALIBRATING WARP DRIVE…",
  "PLOTTING COURSE: PORTFOLIO…",
  "LIFTOFF.",
];

const LINE_INTERVAL_MS = 280;
const DISMISS_AFTER_MS = BOOT_LINES.length * LINE_INTERVAL_MS + 320;

/**
 * One-shot boot overlay shown on first load — terminal aesthetic from
 * ScrollX UI's modern-loader, rebuilt dependency-free and time-boxed
 * so it never blocks the page for more than ~2.5s.
 */
export const BootLoader = () => {
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  const progressBars = useMemo(
    () =>
      BOOT_LINES.map((_, lineIndex) => 30 + ((lineIndex * 37) % 50)),
    []
  );

  useEffect(() => {
    const lineTimer = setInterval(
      () => setVisibleLineCount((count) => Math.min(count + 1, BOOT_LINES.length)),
      LINE_INTERVAL_MS
    );
    const dismissTimer = setTimeout(() => setIsDismissed(true), DISMISS_AFTER_MS);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02030a]"
        >
          <div className="liquid-glass-strong w-[min(90%,420px)] rounded-2xl overflow-hidden">
            {/* Terminal chrome */}
            <div className="px-4 py-3 flex items-center gap-1.5 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="flex-1 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                NK-01 FLIGHT COMPUTER
              </span>
            </div>

            <div className="px-5 py-5 font-mono text-xs space-y-2.5 min-h-[140px]">
              {BOOT_LINES.slice(0, visibleLineCount).map((line, lineIndex) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-emerald-400">▸</span>
                  <span className="text-white/80">{line}</span>
                  {lineIndex < BOOT_LINES.length - 1 && (
                    <span className="ml-auto flex h-1 w-16 overflow-hidden rounded-full bg-white/10">
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: `${progressBars[lineIndex]}%` }}
                        transition={{ duration: 0.4 }}
                        className="bg-gradient-to-r from-indigo-400 to-fuchsia-400"
                      />
                    </span>
                  )}
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-3.5 bg-emerald-400/80 align-middle"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
