"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";

export default function PageMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    damping: 28,
    mass: 0.16,
    stiffness: 190,
  });
  const pointerX = useMotionValue(-240);
  const pointerY = useMotionValue(-240);
  const glowX = useSpring(pointerX, { damping: 32, stiffness: 115 });
  const glowY = useSpring(pointerY, { damping: 32, stiffness: 115 });

  useEffect(() => {
    if (reduceMotion) return;

    const updatePointer = (event: PointerEvent) => {
      pointerX.set(event.clientX - 180);
      pointerY.set(event.clientY - 180);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <>
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-[1000] h-[3px] origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400"
            style={{ scaleX: progress }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed z-0 size-[22rem] rounded-full bg-violet-500/[0.045] blur-[90px]"
            style={{ x: glowX, y: glowY }}
          />
        </>
      )}
      <motion.div
        className="page-motion relative z-[1]"
        initial={
          reduceMotion
            ? false
            : { filter: "blur(10px)", opacity: 0, scale: 0.992, y: 20 }
        }
        animate={{
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          transitionEnd: { transform: "none" },
          y: 0,
        }}
        transition={{
          damping: 24,
          mass: 0.72,
          stiffness: 130,
          type: "spring",
        }}
        key={pathname}
      >
        {children}
      </motion.div>
    </>
  );
}
