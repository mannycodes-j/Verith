"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  DatabaseZap,
  FileSearch,
  Fingerprint,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const checks = [
  {
    icon: Fingerprint,
    label: "Session proof",
    detail: "Rotating secure credentials",
  },
  {
    icon: ShieldCheck,
    label: "Access policy",
    detail: "Confirming workspace permissions",
  },
  {
    icon: DatabaseZap,
    label: "Workspace context",
    detail: "Reconnecting your evidence desk",
  },
] as const;

export default function SessionLoadingGate() {
  const reduceMotion = useReducedMotion();
  const loop = reduceMotion
    ? { duration: 0 }
    : { duration: 7, repeat: Infinity };

  return (
    <main
      aria-busy="true"
      className="relative grid min-h-svh place-items-center overflow-hidden bg-[#070809] px-5 py-10 text-white"
    >
      <p className="sr-only" role="status">
        Verith is restoring and authenticating your workspace session.
      </p>

      <motion.div
        animate={
          reduceMotion ? undefined : { rotate: 360, scale: [1, 1.08, 1] }
        }
        aria-hidden="true"
        className="pointer-events-none absolute -top-72 -left-48 size-[46rem] rounded-full opacity-50 blur-[2px] [background:conic-gradient(from_90deg,transparent,rgba(139,92,246,0.22),transparent,rgba(34,211,238,0.12),transparent)]"
        transition={loop}
      />
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -70, 25, 0],
                y: [0, 45, -25, 0],
                scale: [1, 1.2, 0.95, 1],
              }
        }
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] bottom-[-15rem] size-[42rem] rounded-full bg-violet-500/15 blur-[130px]"
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"
      />

      <motion.section
        animate={reduceMotion ? undefined : { opacity: [0.88, 1, 0.88] }}
        className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#0d0e10]/90 shadow-[0_40px_120px_-35px_rgba(0,0,0,0.95)] backdrop-blur-2xl md:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]"
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.975 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex min-h-[34rem] flex-col p-7 sm:p-10 lg:p-14">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.span
                animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0] }}
                className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-600 text-base font-bold shadow-[0_16px_42px_-12px_rgba(139,92,246,0.9)]"
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                V
              </motion.span>
              <div className="grid gap-0.5">
                <strong className="text-sm font-semibold">Verith</strong>
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Secure workspace
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.055] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
              <motion.i
                animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                className="size-1.5 rounded-full bg-current"
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              Authenticating
            </span>
          </header>

          <div className="my-auto py-14">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
              <Sparkles aria-hidden="true" size={14} />
              Evidence desk initialization
            </span>
            <h1 className="mt-5 max-w-xl text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.94] font-semibold tracking-[-0.06em]">
              Reopening your investigation workspace.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
              Verith is validating the active session, applying your role
              permissions, and reconnecting the workspace without exposing
              protected content early.
            </p>
          </div>

          <div className="relative h-1 overflow-hidden rounded-full bg-white/[0.055]">
            <motion.span
              animate={reduceMotion ? { x: "0%" } : { x: ["-110%", "360%"] }}
              className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-violet-300 to-cyan-300 shadow-[0_0_20px_rgba(139,92,246,0.8)]"
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <p className="mt-4 mb-0 text-[11px] text-white/35">
            This is an indeterminate security check—not a fabricated progress
            percentage.
          </p>
        </div>

        <div className="relative flex min-h-[28rem] items-center justify-center overflow-hidden border-t border-white/[0.06] bg-white/[0.018] p-7 md:min-h-full md:border-t-0 md:border-l">
          <div
            aria-hidden="true"
            className="relative grid size-[19rem] place-items-center sm:size-[23rem]"
          >
            {[0, 1, 2].map((ring) => (
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: ring % 2 === 0 ? 360 : -360,
                        scale: [1, 1.04, 1],
                      }
                }
                className="absolute rounded-full border border-white/[0.07]"
                key={ring}
                style={{ inset: `${ring * 2.4}rem` }}
                transition={{
                  duration: 10 + ring * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [0.94, 1.08, 0.94], rotate: [0, 4, 0] }
              }
              className="relative z-10 grid size-28 place-items-center rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-violet-500/25 to-indigo-500/10 shadow-[0_0_70px_rgba(139,92,246,0.28)] backdrop-blur-xl"
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FileSearch
                className="text-violet-200"
                size={40}
                strokeWidth={1.4}
              />
            </motion.div>
            {checks.map(({ icon: Icon }, index) => {
              const positions = [
                "top-2 left-1/2 -translate-x-1/2",
                "right-1 bottom-16",
                "bottom-16 left-1",
              ];
              return (
                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, -9, 0], scale: [1, 1.08, 1] }
                  }
                  className={`absolute grid size-12 place-items-center rounded-2xl border border-white/10 bg-[#15161a] text-cyan-200 shadow-xl ${positions[index]}`}
                  key={index}
                  transition={{
                    duration: 2.4,
                    delay: index * 0.35,
                    repeat: Infinity,
                  }}
                >
                  <Icon size={19} strokeWidth={1.6} />
                </motion.span>
              );
            })}
          </div>

          <ol className="absolute inset-x-6 bottom-6 m-0 grid list-none gap-2 p-0 sm:inset-x-8">
            {checks.map(({ detail, icon: Icon, label }, index) => (
              <motion.li
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        borderColor: [
                          "rgba(255,255,255,0.05)",
                          "rgba(139,92,246,0.22)",
                          "rgba(255,255,255,0.05)",
                        ],
                      }
                }
                className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-white/[0.05] bg-black/20 px-3 py-2.5 backdrop-blur-md"
                key={label}
                transition={{
                  duration: 2.8,
                  delay: index * 0.5,
                  repeat: Infinity,
                }}
              >
                <Icon className="text-violet-300" size={15} />
                <span className="grid gap-0.5">
                  <strong className="text-[11px] font-medium text-white/75">
                    {label}
                  </strong>
                  <small className="text-[9px] text-white/35">{detail}</small>
                </span>
                <motion.i
                  animate={
                    reduceMotion ? undefined : { opacity: [0.2, 1, 0.2] }
                  }
                  className="size-1.5 rounded-full bg-violet-300"
                  transition={{
                    duration: 1.4,
                    delay: index * 0.3,
                    repeat: Infinity,
                  }}
                />
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.section>
    </main>
  );
}
