"use client";

import { type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { CardTilt, CardTiltContent } from "./CardTilt";

/** Responsive bento layout (ScrollX UI port, liquid-glass restyle). */
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => (
  <div
    className={cn(
      "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[15rem] md:grid-cols-3",
      className
    )}
  >
    {children}
  </div>
);

interface BentoGridItemProps {
  className?: string;
  containerClassName?: string;
  title?: ReactNode;
  description?: ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  disableTilt?: boolean;
}

export const BentoGridItem = ({
  className,
  containerClassName,
  title,
  description,
  header,
  icon,
  disableTilt = false,
}: BentoGridItemProps) => {
  const inner = (
    <div
      className={cn(
        "group/bento liquid-glass flex h-full w-full flex-col justify-between space-y-4 rounded-[1.5rem] p-6 transition duration-200",
        className
      )}
    >
      {header}
      <div className="transition duration-300 group-hover/bento:-translate-y-1">
        {icon}
        <div className="mt-3 mb-2 font-display font-bold text-white text-lg">
          {title}
        </div>
        <div className="text-sm font-light text-white/55">{description}</div>
      </div>
    </div>
  );

  if (disableTilt) {
    return <div className={cn("h-full w-full", containerClassName)}>{inner}</div>;
  }

  return (
    <CardTilt className={cn("h-full w-full", containerClassName)} tiltMaxAngle={8} scale={1.02}>
      <CardTiltContent className="h-full w-full">{inner}</CardTiltContent>
    </CardTilt>
  );
};
