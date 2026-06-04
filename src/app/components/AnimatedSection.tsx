"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { BASE_TRANSITION, FADE_IN, FADE_UP, SCALE_IN, VIEWPORT_ONCE } from "@/lib/motion";

type AnimatedVariant = "fadeUp" | "fadeIn" | "scaleIn";

type AnimatedSectionProps = {
  children: ReactNode;
  variant?: AnimatedVariant;
  delay?: number;
  className?: string;
};

const variantMap = {
  fadeUp: FADE_UP,
  fadeIn: FADE_IN,
  scaleIn: SCALE_IN,
} as const;

export default function AnimatedSection({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      transition={{ ...BASE_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}
