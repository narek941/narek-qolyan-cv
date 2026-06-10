"use client";

/** Curved vignette + faint scanlines mimicking cockpit canopy. */
export const PortholeVignette = () => (
  <div className="fixed inset-0 pointer-events-none z-[35]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(2,3,10,0.45)_85%,rgba(2,3,10,0.85)_100%)]" />
    <div
      className="absolute inset-0 opacity-[0.06] mix-blend-screen"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.15) 3px, transparent 4px)",
      }}
    />
  </div>
);
