"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Check,
  CloudCog,
  Cpu,
  Gauge,
  KeyRound,
  LockKeyhole,
  Route,
  Save,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";
import { adminService, type ProviderConfiguration as ProviderPolicy } from "@/services/admin";
import { adminStyles as styles } from "../../admin.styles";

const providers = ["GROQ", "GEMINI", "OPENROUTER", "VERTEX", "BEDROCK"] as const;
type ProviderName = (typeof providers)[number];

const providerDetails: Record<
  ProviderName,
  {
    description: string;
    icon: typeof Cpu;
    label: string;
    role: string;
    tone: string;
  }
> = {
  GROQ: {
    description: "Fast, low-cost structured work for claims and daily practice.",
    icon: Gauge,
    label: "Groq",
    role: "Low-cost speed",
    tone: "from-orange-400/20 via-orange-300/[0.04] to-transparent text-orange-200",
  },
  GEMINI: {
    description: "Direct multimodal capacity for text, images, audio and fallback.",
    icon: Sparkles,
    label: "Gemini Direct",
    role: "Multimodal fallback",
    tone: "from-cyan-400/20 via-cyan-300/[0.04] to-transparent text-cyan-200",
  },
  OPENROUTER: {
    description: "A flexible tertiary route across validated hosted models.",
    icon: Route,
    label: "OpenRouter",
    role: "Emergency breadth",
    tone: "from-fuchsia-400/20 via-fuchsia-300/[0.04] to-transparent text-fuchsia-200",
  },
  VERTEX: {
    description: "Funded reliability for evidence reasoning, reports and media.",
    icon: CloudCog,
    label: "Vertex AI",
    role: "Primary reliability",
    tone: "from-blue-400/20 via-blue-300/[0.04] to-transparent text-blue-200",
  },
  BEDROCK: {
    description: "Independent paid failover for high-value reasoning and reports.",
    icon: ShieldCheck,
    label: "AWS Bedrock",
    role: "Independent failover",
    tone: "from-emerald-400/20 via-emerald-300/[0.04] to-transparent text-emerald-200",
  },
};

function sameList(left: string[], right: string[]) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

function moveItem(items: string[], index: number, direction: -1 | 1) {
  const destination = index + direction;
  if (destination < 0 || destination >= items.length) return items;
  const next = [...items];
  [next[index], next[destination]] = [next[destination]!, next[index]!];
  return next;
}

export default function ProviderConfiguration() {
  const client = useQueryClient();
  const reduceMotion = useReducedMotion();
  const query = useQuery({
    queryFn: adminService.providerConfiguration,
    queryKey: ["admin", "ai", "providers"],
    retry: false,
  });
  const [enabledOverride, setEnabled] = useState<string[] | null>(null);
  const [orderOverride, setOrder] = useState<string[] | null>(null);
  const [reason, setReason] = useState("");
  const enabled = enabledOverride ?? query.data?.enabledProviders ?? [];
  const order = orderOverride ?? query.data?.defaultOrder ?? [];
  const persistedEnabled = query.data?.enabledProviders ?? [];
  const persistedOrder = query.data?.defaultOrder ?? [];
  const isDirty =
    !sameList(enabled, persistedEnabled) || !sameList(order, persistedOrder);
  const reasonReady = reason.trim().length >= 10;

  const update = useMutation({
    mutationFn: () =>
      adminService.updateProviderConfiguration(enabled, order, reason.trim()),
    onSuccess: (policy) => {
      client.setQueryData<ProviderPolicy>(["admin", "ai", "providers"], policy);
      setEnabled(null);
      setOrder(null);
      setReason("");
    },
  });

  if (query.isPending)
    return (
      <div className={styles.loading} role="status">
        Preparing provider control room…
        <div />
      </div>
    );
  if (query.isError)
    return (
      <section className={styles.error} role="alert">
        <span>Provider policy unavailable</span>
        <h1>The runtime configuration could not be opened.</h1>
        <p>{query.error.message}</p>
        <button onClick={() => void query.refetch()} type="button">
          Retry connection
        </button>
      </section>
    );

  const updatedAt = query.data.updatedAt
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(query.data.updatedAt))
    : "Awaiting first saved policy";

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto max-w-7xl pb-16"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 right-[8%] -z-10 size-80 rounded-full bg-violet-500/[0.08] blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-96 -left-24 -z-10 size-72 rounded-full bg-cyan-400/[0.05] blur-[120px]" />

      <header className="mb-10 grid items-end gap-8 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <motion.span
            animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300"
            transition={{ duration: 3, repeat: Infinity }}
          >
            <WandSparkles aria-hidden="true" size={14} />
            AI capacity control
          </motion.span>
          <h1 className="mt-5 mb-0 max-w-3xl text-5xl leading-none font-semibold tracking-tighter text-white sm:text-6xl xl:text-7xl">
            Shape the provider network.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/48">
            Decide which infrastructure Verith may use. Capability routing still
            chooses the best eligible provider and limits every operation to a
            bounded, auditable fallback path.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:col-span-2 xl:grid-cols-2"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {[
            ["Eligible now", String(enabled.length), "of 5 providers"],
            ["Provider attempts", "2–3", "capability-bounded"],
            ["Video ceiling", "1", "provider attempt"],
            ["Last policy update", query.data.configured ? "Saved" : "Default", updatedAt],
          ].map(([label, value, detail]) => (
            <motion.div
              className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl"
              key={label}
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">
                {label}
              </span>
              <strong className="mt-3 block text-xl font-semibold tracking-tight text-white/90">
                {value}
              </strong>
              <small className="mt-1.5 block line-clamp-2 text-[10px] leading-4 text-white/30">
                {detail}
              </small>
            </motion.div>
          ))}
        </motion.div>
      </header>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d0d0f]/90 p-[clamp(1.25rem,3vw,2.25rem)] shadow-[0_40px_100px_-55px_rgba(0,0,0,.95)] backdrop-blur-2xl">
        <div aria-hidden="true" className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />
        <div className="mb-7 flex items-start justify-between gap-6 max-[620px]:flex-col">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">
              <Activity aria-hidden="true" size={14} />
              Eligible infrastructure
            </span>
            <h2 className="mt-3 mb-0 text-2xl font-semibold tracking-tight text-white">
              Choose the providers allowed into the route.
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.055] px-3.5 py-2 text-[10px] font-medium text-emerald-200/80">
            <LockKeyhole aria-hidden="true" size={13} />
            Credentials remain backend-only
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider, index) => {
            const details = providerDetails[provider];
            const Icon = details.icon;
            const selected = enabled.includes(provider);
            return (
              <motion.label
                animate={{ opacity: 1, y: 0 }}
                className={`group relative min-h-56 cursor-pointer overflow-hidden rounded-3xl border p-5 transition-colors duration-300 focus-within:ring-2 focus-within:ring-violet-400/70 ${
                  selected
                    ? "border-violet-300/25 bg-white/[0.055]"
                    : "border-white/[0.055] bg-white/[0.018] hover:border-white/10 hover:bg-white/[0.03]"
                }`}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                key={provider}
                transition={{ delay: reduceMotion ? 0 : index * 0.06, duration: 0.42 }}
                whileHover={reduceMotion ? undefined : { y: -5, scale: 1.012 }}
              >
                <input
                  checked={selected}
                  className="peer sr-only"
                  onChange={(event) => {
                    update.reset();
                    if (event.target.checked) {
                      setEnabled([...new Set([...enabled, provider])]);
                      if (!order.includes(provider)) setOrder([...order, provider]);
                    } else {
                      setEnabled(enabled.filter((item) => item !== provider));
                    }
                  }}
                  type="checkbox"
                />
                <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br opacity-70 transition-opacity group-hover:opacity-100 ${details.tone}`} />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-black/20 text-white/80 shadow-inner">
                      <Icon aria-hidden="true" size={20} strokeWidth={1.7} />
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative h-7 w-12 rounded-full border p-1 transition-all duration-300 ${
                        selected
                          ? "border-violet-300/35 bg-violet-500"
                          : "border-white/10 bg-black/25"
                      }`}
                    >
                      <motion.span
                        animate={{ x: selected ? 20 : 0 }}
                        className="grid size-[18px] place-items-center rounded-full bg-white text-violet-600 shadow-lg"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        {selected && <Check size={11} strokeWidth={3} />}
                      </motion.span>
                    </span>
                  </div>
                  <span className="mt-7 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/35">
                    {details.role}
                  </span>
                  <strong className="mt-2 text-lg font-semibold text-white/90">
                    {details.label}
                  </strong>
                  <small className="mt-2 block text-[11px] leading-5 text-white/38">
                    {details.description}
                  </small>
                  <span className={`mt-auto pt-4 text-[10px] font-medium ${selected ? "text-emerald-300" : "text-white/25"}`}>
                    {selected ? "Eligible for routing" : "Excluded from routing"}
                  </span>
                </div>
              </motion.label>
            );
          })}
        </div>
      </section>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-5">
        <section className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d0d0f]/90 p-[clamp(1.25rem,3vw,2.25rem)] shadow-[0_35px_90px_-55px_rgba(0,0,0,.95)] lg:col-span-3">
          <header className="flex items-start justify-between gap-5 max-[560px]:flex-col">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                <Route aria-hidden="true" size={14} />
                Emergency fallback order
              </span>
              <h2 className="mt-3 mb-0 text-2xl font-semibold tracking-tight text-white">
                A quiet safety net, not the main route.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                This sequence is used only when a capability has no explicit
                routing matrix. Reordering it never changes the reviewed routes.
              </p>
            </div>
            <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/35">
              {order.length} stages
            </span>
          </header>

          <motion.ol className="mt-7 flex list-none flex-col gap-2.5 p-0" layout>
            <AnimatePresence initial={false}>
              {order.map((provider, index) => {
                const typedProvider = provider as ProviderName;
                const details = providerDetails[typedProvider];
                const Icon = details?.icon ?? Cpu;
                const active = enabled.includes(provider);
                return (
                  <motion.li
                    className={`group flex min-h-16 items-center gap-3 rounded-2xl border p-3 transition-colors ${
                      active
                        ? "border-white/[0.07] bg-white/[0.028]"
                        : "border-white/[0.035] bg-transparent opacity-45"
                    }`}
                    key={provider}
                    layout
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  >
                    <span className="grid size-8 place-items-center rounded-xl bg-white/[0.045] font-mono text-[10px] text-violet-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden size-9 shrink-0 place-items-center rounded-xl border border-white/[0.055] bg-black/20 text-white/50 sm:grid">
                      <Icon aria-hidden="true" size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate text-sm font-medium text-white/80">
                        {details?.label ?? provider}
                      </strong>
                      <small className="mt-1 block text-[10px] text-white/28">
                        {active ? details?.role : "Currently excluded"}
                      </small>
                    </span>
                    <span className="flex shrink-0 gap-1.5">
                      <button
                        aria-label={`Move ${details?.label ?? provider} earlier`}
                        className="grid size-9 place-items-center rounded-full border border-white/[0.07] bg-white/[0.025] text-white/45 transition hover:border-violet-300/20 hover:bg-violet-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                        disabled={index === 0}
                        onClick={() => {
                          update.reset();
                          setOrder(moveItem(order, index, -1));
                        }}
                        type="button"
                      >
                        <ArrowUp aria-hidden="true" size={14} />
                      </button>
                      <button
                        aria-label={`Move ${details?.label ?? provider} later`}
                        className="grid size-9 place-items-center rounded-full border border-white/[0.07] bg-white/[0.025] text-white/45 transition hover:border-violet-300/20 hover:bg-violet-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                        disabled={index === order.length - 1}
                        onClick={() => {
                          update.reset();
                          setOrder(moveItem(order, index, 1));
                        }}
                        type="button"
                      >
                        <ArrowDown aria-hidden="true" size={14} />
                      </button>
                    </span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ol>
        </section>

        <motion.aside
          className="overflow-hidden rounded-[2rem] border border-violet-300/10 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,.13),transparent_18rem),#0d0d0f] p-[clamp(1.25rem,3vw,2.25rem)] shadow-[0_35px_90px_-55px_rgba(0,0,0,.95)] lg:sticky lg:top-5 lg:col-span-2"
          whileHover={reduceMotion ? undefined : { y: -3 }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">
            <KeyRound aria-hidden="true" size={14} />
            Audited change
          </span>
          <h2 className="mt-3 mb-0 text-2xl font-semibold tracking-tight text-white">
            Leave a decision trail.
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/40">
            Explain the operational reason for this policy change. The note is
            written to the immutable activity ledger with the before and after state.
          </p>

          <label className="mt-6 block">
            <span className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/40">
              Operational reason
              <span className={reasonReady ? "text-emerald-300" : "text-white/25"}>
                {reason.trim().length}/1000
              </span>
            </span>
            <textarea
              className="mt-3 min-h-40 w-full resize-y rounded-[1.4rem] border border-white/[0.07] bg-black/20 p-4 text-sm leading-6 text-white/80 outline-none transition placeholder:text-white/20 focus:border-violet-300/35 focus:bg-white/[0.025] focus:shadow-[0_0_0_4px_rgba(139,92,246,.07)]"
              maxLength={1000}
              minLength={10}
              onChange={(event) => {
                update.reset();
                setReason(event.target.value);
              }}
              placeholder="For example: Enable funded reliability providers for the UNESCO review period while preserving free-provider routing."
              value={reason}
            />
          </label>

          <AnimatePresence mode="wait">
            {update.isError && (
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl border border-red-400/15 bg-red-400/[0.06] p-3 text-xs leading-5 text-red-200/75"
                exit={{ opacity: 0, y: -5 }}
                initial={{ opacity: 0, y: 5 }}
                key="error"
                role="alert"
              >
                {update.error.message}
              </motion.p>
            )}
            {update.isSuccess && !isDirty && (
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-3 text-xs text-emerald-200/80"
                exit={{ opacity: 0, y: -5 }}
                initial={{ opacity: 0, y: 5 }}
                key="success"
                role="status"
              >
                <Check aria-hidden="true" size={14} />
                Provider policy saved and recorded.
              </motion.p>
            )}
          </AnimatePresence>

          <button
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-0 bg-gradient-to-r from-[#b879ff] via-[#8b5cf6] to-[#6366f1] px-5 text-center text-sm font-semibold text-white shadow-[0_18px_42px_-18px_rgba(139,92,246,.9)] transition hover:scale-[1.015] hover:shadow-[0_22px_52px_-18px_rgba(139,92,246,1)] active:scale-[.985] disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
            disabled={
              update.isPending ||
              enabled.length === 0 ||
              !reasonReady ||
              !isDirty
            }
            onClick={() => update.mutate()}
            type="button"
          >
            {update.isPending ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  className="size-4 rounded-full border-2 border-white/30 border-t-white"
                  transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
                />
                Saving policy…
              </>
            ) : (
              <>
                <Save aria-hidden="true" size={16} />
                Save provider policy
              </>
            )}
          </button>

          <div className="mt-4 flex items-start gap-2.5 text-[10px] leading-4 text-white/28">
            <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0" size={13} />
            {!isDirty
              ? "Change provider eligibility or fallback order to prepare an update."
              : !reasonReady
                ? "Add an audit reason of at least 10 characters to continue."
                : "Ready to save. Runtime secrets are not included in this update."}
          </div>
        </motion.aside>
      </div>
    </motion.div>
  );
}
