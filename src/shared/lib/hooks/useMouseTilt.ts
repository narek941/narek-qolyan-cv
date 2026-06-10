"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

interface UseMouseTiltOptions {
  /** Maximum rotation around the Y-axis (left/right tilt), in degrees. */
  maxRotateYDegrees?: number;
  /** Maximum rotation around the X-axis (up/down tilt), in degrees. */
  maxRotateXDegrees?: number;
  /** Spring stiffness for tilt easing. */
  springStiffness?: number;
  /** Spring damping for tilt easing. */
  springDamping?: number;
}

interface MouseTiltResult {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}

const NORMALIZED_RANGE = [-0.5, 0.5];

/**
 * Mouse-driven 3D tilt. Reads window cursor position and returns
 * spring-smoothed rotateX / rotateY motion values suitable for use in
 * a `transform-style: preserve-3d` container.
 */
export const useMouseTilt = ({
  maxRotateYDegrees = 25,
  maxRotateXDegrees = 15,
  springStiffness = 100,
  springDamping = 20,
}: UseMouseTiltOptions = {}): MouseTiltResult => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(
    useTransform(mouseX, NORMALIZED_RANGE, [-maxRotateYDegrees, maxRotateYDegrees]),
    { stiffness: springStiffness, damping: springDamping }
  );
  const rotateX = useSpring(
    useTransform(mouseY, NORMALIZED_RANGE, [maxRotateXDegrees, -maxRotateXDegrees]),
    { stiffness: springStiffness, damping: springDamping }
  );

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [mouseX, mouseY]);

  return { rotateX, rotateY };
};
