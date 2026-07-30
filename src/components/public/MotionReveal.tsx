"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function MotionReveal({
  children,
  className,
  delay = 0,
  depth = 12,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  depth?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: depth,
            }
      }
      transition={{
        delay,
        duration: 0.5,
        ease: "easeOut",
      }}
      viewport={{ amount: 0.16, once: true }}
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
    >
      {children}
    </motion.div>
  );
}
