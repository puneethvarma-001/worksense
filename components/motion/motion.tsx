"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
  type MotionProps,
} from "framer-motion";

/**
 * Centralized motion config
 * - respects prefers-reduced-motion
 * - consistent easing across app
 */
export function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig
      reducedMotion={shouldReduceMotion ? "always" : "never"}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // Linear-style easeOut
      }}
    >
      {children}
    </MotionConfig>
  );
}

/**
 * Re-export motion as a namespaced object
 * Safe to import from Server Components
 */
export const m = motion;

/**
 * Typed helpers (optional but recommended)
 */
export type { MotionProps };
export { AnimatePresence };
