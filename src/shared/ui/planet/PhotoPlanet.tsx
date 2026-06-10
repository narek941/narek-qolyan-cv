"use client";

interface PhotoPlanetProps {
  src: string;
  className?: string;
  alt?: string;
}

/**
 * Image-based planet. Renders a photographic texture inside a circular
 * mask with the same lighting treatment as the procedural planets
 * (top-left key light, bottom-right terminator shadow, soft specular),
 * so photo and SVG planets can mix in one journey.
 */
export const PhotoPlanet = ({ src, className, alt = "" }: PhotoPlanetProps) => (
  <div className={`relative rounded-full overflow-hidden ${className ?? ""}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    {/* Terminator shadow */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 32% 28%, transparent 45%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.75) 100%)",
      }}
    />
    {/* Specular highlight */}
    <div
      className="absolute rounded-full blur-xl"
      style={{
        top: "12%",
        left: "16%",
        width: "32%",
        height: "20%",
        background: "rgba(255,255,255,0.35)",
      }}
    />
  </div>
);
