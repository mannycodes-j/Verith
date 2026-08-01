"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewInvestigationButton({
  className = "",
  label = "New investigation",
}: {
  className?: string;
  label?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`inline-flex shrink-0 ${className}`}
      layout={!reduceMotion}
      onHoverEnd={() => setExpanded(false)}
      onHoverStart={() => setExpanded(true)}
      transition={{ type: "spring", stiffness: 430, damping: 34 }}
    >
      <Link
        aria-label={label}
        className="group inline-flex min-h-11 min-w-11 items-center justify-center gap-2 overflow-hidden rounded-full border border-violet-300/20 bg-gradient-to-r from-violet-400 to-indigo-500 px-3 text-center text-xs font-semibold whitespace-nowrap text-white shadow-[0_12px_32px_-16px_rgba(139,92,246,0.9)] transition-[border-color,filter,box-shadow] hover:brightness-110 hover:shadow-[0_16px_38px_-14px_rgba(139,92,246,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090A]"
        href="/app/verify"
        onBlur={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onPointerDown={() => setExpanded(true)}
      >
        <motion.span
          animate={expanded && !reduceMotion ? { rotate: 90, scale: 0.92 } : { rotate: 0, scale: 1 }}
          aria-hidden="true"
          className="grid shrink-0 place-items-center"
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <Plus size={18} strokeWidth={2.4} />
        </motion.span>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.span
              animate={{ opacity: 1, width: "auto", x: 0 }}
              className="overflow-hidden"
              exit={{ opacity: 0, width: 0, x: -8 }}
              initial={reduceMotion ? false : { opacity: 0, width: 0, x: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
}
