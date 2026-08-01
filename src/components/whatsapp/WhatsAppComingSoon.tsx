"use client";

import { motion } from "framer-motion";
import { CheckCircle2, LockKeyhole, MessageCircleMore, Sparkles } from "lucide-react";
import { WHATSAPP_ROLLOUT } from "@/data/whatsapp";

export default function WhatsAppComingSoon({ compact = false }: { compact?: boolean }) {
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }} className={`relative isolate overflow-hidden rounded-[2rem] border border-emerald-400/15 bg-[#090b0b] ${compact ? "p-7 md:p-10" : "mx-auto w-[calc(100%_-_3rem)] max-w-[1300px] p-[clamp(2rem,7vw,6rem)]"}`}>
      <motion.div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-emerald-400/10 blur-3xl" animate={{ scale: [1, 1.18, 1], opacity: [.35, .7, .35] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative grid gap-10 md:grid-cols-[auto_1fr_.7fr] md:items-center">
        <motion.div className="relative grid size-24 place-items-center rounded-[2rem] border border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-300" animate={{ rotate: [0, -3, 3, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <MessageCircleMore size={42} /><span className="absolute -bottom-2 -right-2 grid size-10 place-items-center rounded-full border border-white/10 bg-[#111] text-amber-300"><LockKeyhole size={18} /></span>
        </motion.div>
        <div><span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-emerald-300"><Sparkles size={13} /> {WHATSAPP_ROLLOUT.label}</span><h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-tighter">{WHATSAPP_ROLLOUT.title}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">{WHATSAPP_ROLLOUT.description}</p></div>
        <ol className="m-0 grid list-none gap-3 p-0">{WHATSAPP_ROLLOUT.checks.map((check, index) => <motion.li initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25 + index * .12 }} className="flex items-center gap-3 rounded-2xl border border-white/[.06] bg-white/[.025] p-4 text-xs text-white/55" key={check}><CheckCircle2 className="text-emerald-300" size={16} />{check}</motion.li>)}</ol>
      </div>
    </motion.section>
  );
}
