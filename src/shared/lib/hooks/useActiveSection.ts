"use client";

import { useEffect, useState } from "react";

import { useSmoothScroll } from "@/shared/lib/smooth-scroll";

/**
 * Tracks the section most visible in the viewport via IntersectionObserver
 * (cheaper than a per-scroll layout read loop).
 */
export const useActiveSection = (sectionIds: readonly string[], initialId = sectionIds[0]) => {
  const [activeSection, setActiveSection] = useState<string>(initialId);
  const { scrollToId } = useSmoothScroll();

  useEffect(() => {
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = sectionIds[0];
        let bestRatio = -1;
        for (const id of sectionIds) {
          const ratio = visibility.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0) setActiveSection(bestId);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    scrollToId(sectionId);
  };

  return { activeSection, scrollToSection };
};
