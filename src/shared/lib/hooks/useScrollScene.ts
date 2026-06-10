"use client";

import { type RefObject } from "react";
import { useScroll, type MotionValue } from "framer-motion";

interface UseScrollSceneResult {
  /** Raw scroll progress for the scene target, in [0, 1]. */
  progress: MotionValue<number>;
}

/**
 * Track scroll progress across a sticky-scene wrapper.
 *
 * The wrapper is expected to be (SCENE_HEIGHT)vh tall with an internal
 * `position: sticky; top: 0; height: 100vh` child. Progress 0 → 1
 * covers the entire wrapper passing through the viewport, which IS
 * the entire pin window for a sticky child.
 *
 * NOTE: we deliberately do NOT spring-smooth this value. Spring lag
 * means the keyframes finish AFTER the sticky has scrolled past — i.e.
 * the user sees "the final frame" appearing when the planet has
 * already left the viewport. Raw progress = exact frame for exact scroll.
 */
export const useScrollScene = (ref: RefObject<HTMLElement | null>): UseScrollSceneResult => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return { progress: scrollYProgress };
};
