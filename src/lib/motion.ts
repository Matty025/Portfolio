import type { Transition, Variants } from "framer-motion";

export const DURATION = {
  fast: 0.25,
  base: 0.4,
  slow: 0.65,
  slower: 0.9,
} as const;

export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.83, 0, 0.17, 1] as const,
  spring: { type: "spring", stiffness: 80, damping: 18, mass: 0.8 } as const,
} as const;

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const SLIDE_LEFT: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const SLIDE_RIGHT: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const VIEWPORT_ONCE = { once: true, amount: 0.18 } as const;

export function stagger(i: number, base = 0.08): number {
  return base * i;
}

export const BASE_TRANSITION: Transition = {
  duration: DURATION.base,
  ease: EASE.out,
};
