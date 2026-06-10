"use client";

interface ReticleProps {
  pos: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const positionMap: Record<ReticleProps["pos"], string> = {
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3 rotate-90",
  "bottom-left": "bottom-3 left-3 -rotate-90",
  "bottom-right": "bottom-3 right-3 rotate-180",
};

const Reticle = ({ pos }: ReticleProps) => (
  <div className={`absolute ${positionMap[pos]}`}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M 1 7 L 1 1 L 7 1"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <circle cx="3" cy="3" r="1" fill="rgba(99,102,241,0.9)" />
    </svg>
  </div>
);

export const CornerReticles = () => (
  <div className="pointer-events-none fixed inset-0 z-[45] hidden sm:block">
    <Reticle pos="top-left" />
    <Reticle pos="top-right" />
    <Reticle pos="bottom-left" />
    <Reticle pos="bottom-right" />
  </div>
);
