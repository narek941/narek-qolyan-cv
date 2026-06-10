"use client";

import { type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export interface RadialSocialItem {
  icon: ReactNode;
  href: string;
  label: string;
}

interface RadialOrbit {
  radiusPx: number;
  /** One revolution, seconds. */
  durationSeconds: number;
  items: RadialSocialItem[];
}

interface RadialSocialsProps {
  /** Center content, e.g. a logo. */
  children?: ReactNode;
  orbits: RadialOrbit[];
  className?: string;
}

/**
 * Social links orbiting a center mark like satellites — ScrollX UI's
 * radial-socials concept, reimplemented compactly with CSS counter-
 * rotation (orbit spins one way, icons spin back to stay upright).
 */
export const RadialSocials = ({ children, orbits, className }: RadialSocialsProps) => {
  const largest = Math.max(...orbits.map((orbit) => orbit.radiusPx));
  const containerSize = largest * 2 + 56;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: containerSize, height: containerSize }}
    >
      {/* Orbit lines */}
      {orbits.map((orbit) => (
        <div
          key={`line-${orbit.radiusPx}`}
          className="absolute rounded-full border border-white/10"
          style={{
            width: orbit.radiusPx * 2,
            height: orbit.radiusPx * 2,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Rotating orbits with counter-rotating icons */}
      {orbits.map((orbit) => (
        <div
          key={`orbit-${orbit.radiusPx}`}
          className="absolute inset-0"
          style={{
            animation: `orbit-spin ${orbit.durationSeconds}s linear infinite`,
          }}
        >
          {orbit.items.map((item, itemIndex) => {
            const angleDegrees = (360 / orbit.items.length) * itemIndex;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angleDegrees}deg) translateX(${orbit.radiusPx}px) rotate(-${angleDegrees}deg)`,
                }}
              >
                <span
                  className="liquid-glass -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-all hover:scale-110 hover:text-white"
                  style={{
                    animation: `orbit-spin ${orbit.durationSeconds}s linear infinite reverse`,
                  }}
                >
                  {item.icon}
                </span>
              </a>
            );
          })}
        </div>
      ))}

      {/* Center */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
