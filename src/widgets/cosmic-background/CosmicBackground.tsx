"use client";

/**
 * Lightweight static backdrop — no Three.js, meteors, asteroids, or
 * scroll-velocity blur (those were the main scroll jank sources).
 */
export const CosmicBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-[#02030a]" />

    <div className="absolute -left-1/4 top-0 h-[55%] w-[55%] rounded-full bg-indigo-600/18 blur-[100px]" />
    <div className="absolute -right-1/4 top-[30%] h-[45%] w-[45%] rounded-full bg-fuchsia-600/14 blur-[100px]" />
    <div className="absolute bottom-0 left-1/3 h-[40%] w-[50%] rounded-full bg-cyan-500/10 blur-[90px]" />

    <div className="absolute inset-0 bg-stars opacity-50" />

    <div
      className="absolute inset-0 opacity-[0.12]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.55) 1px, transparent 0)",
        backgroundSize: "24px 24px",
        maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 25%, transparent 75%)",
      }}
    />

    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#02030a]/70" />
  </div>
);
