"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, type MouseEvent } from "react";

const Particles = dynamic(() => import("@/shared/ui/particles/Particles"), {
  ssr: false,
});

/**
 * Cosmic 404 — "lost in space". Adapted from ScrollX UI's not-found
 * (three.js particle backdrop + pointer-tilted artwork), restyled for
 * the journey theme without the radix/cva button stack.
 */
export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    const container = containerRef.current;
    const art = artRef.current;
    if (!container || !art) return;
    const { left, top, width, height } = container.getBoundingClientRect();
    const rotateX = ((event.clientY - top - height / 2) / height) * -10;
    const rotateY = ((event.clientX - left - width / 2) / width) * 10;
    art.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (artRef.current) {
      artRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#02030a]"
      style={{ perspective: "1000px" }}
    >
      <Particles color="#818cf8" particleCount={900} particleSize={8} />

      <div
        ref={artRef}
        className="relative z-10 text-center transition-transform duration-300 ease-out will-change-transform"
      >
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/40 mb-6">
          NAVIGATION ERROR
        </p>
        <h1 className="font-display text-8xl sm:text-9xl font-bold text-cosmic drop-shadow-[0_0_60px_rgba(168,85,247,0.5)] mb-6">
          404
        </h1>
        <p className="text-white/60 font-light text-lg mb-10 max-w-sm mx-auto">
          This sector is uncharted. The page you&apos;re looking for drifted
          out of orbit.
        </p>
        <Link
          href="/"
          className="liquid-glass-strong inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
        >
          ← Return to ship
        </Link>
      </div>
    </div>
  );
}
