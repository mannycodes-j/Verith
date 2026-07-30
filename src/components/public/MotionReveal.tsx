"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function MotionReveal({
  children,
  className,
  delay = 0,
  depth = 20,
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
              filter: "blur(12px)",
              opacity: 0,
              rotateX: 4,
              scale: 0.975,
              y: depth,
            }
      }
      transition={{
        delay,
        damping: 22,
        mass: 0.7,
        stiffness: 115,
        type: "spring",
      }}
      viewport={{ amount: 0.16, once: true }}
      whileInView={
        reduceMotion
          ? undefined
          : {
              filter: "blur(0px)",
              opacity: 1,
              rotateX: 0,
              scale: 1,
              y: 0,
            }
      }
    >
      {children}
    </motion.div>
  );
}
