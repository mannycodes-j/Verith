"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PageMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  return (
      <motion.div
        className="page-motion"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 10 }
        }
        animate={{
          opacity: 1,
          transitionEnd: { transform: "none" },
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        key={pathname}
      >
        {children}
      </motion.div>
  );
}
