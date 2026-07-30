"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function MotionReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : { filter: "blur(6px)", opacity: 0, transform: "translateY(14px)" }
      }
      transition={{
        delay,
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      viewport={{ amount: 0.16, once: true }}
      whileInView={
        reduceMotion
          ? undefined
          : { filter: "blur(0px)", opacity: 1, transform: "translateY(0px)" }
      }
    >
      {children}
    </motion.div>
  );
}
