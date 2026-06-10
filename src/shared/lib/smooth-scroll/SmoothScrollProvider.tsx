"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import { SMOOTH_SCROLL_OPTIONS, NAV_SCROLL_DURATION_SECONDS } from "./const";

interface SmoothScrollContextValue {
  /** Smoothly scroll to a section by element id. */
  scrollToId: (sectionId: string) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollToId: (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  },
});

/**
 * Lenis smooth scrolling. Disabled when `prefers-reduced-motion` is set.
 */
export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis(SMOOTH_SCROLL_OPTIONS);
    lenisRef.current = lenis;

    let animationFrameId: number;
    const rafLoop = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(rafLoop);
    };
    animationFrameId = requestAnimationFrame(rafLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToId = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: NAV_SCROLL_DURATION_SECONDS,
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollToId }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => useContext(SmoothScrollContext);
