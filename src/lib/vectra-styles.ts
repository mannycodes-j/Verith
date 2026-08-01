export const vectraStyles = {
  page: "mx-auto max-w-7xl",
  pageNarrow: "mx-auto max-w-5xl",
  pageMedium: "mx-auto max-w-6xl",
  pageHeader:
    "mb-10 max-w-4xl py-2 [&>span]:inline-flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.18em] [&>span]:text-violet-400 [&>span]:before:inline-flex [&>span]:before:size-1.5 [&>span]:before:rounded-full [&>span]:before:bg-violet-400 [&>span]:before:shadow-[0_0_18px_rgba(139,92,246,0.9)] [&_h1]:mt-4 [&_h1]:mb-0 [&_h1]:max-w-[18ch] [&_h1]:text-4xl [&_h1]:leading-[1.1] [&_h1]:font-semibold [&_h1]:tracking-tighter md:[&_h1]:text-5xl [&>p]:mt-4 [&>p]:max-w-2xl [&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-white/50",
  card:
    "relative overflow-hidden rounded-3xl border border-white/[0.06] bg-card/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 hover:border-white/15",
  nested:
    "rounded-2xl border border-white/[0.04] bg-white/[0.02] transition-colors hover:bg-white/[0.04]",
  iconTile:
    "grid size-9 place-items-center rounded-lg bg-violet-500/10 text-violet-400",
  label:
    "text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55",
  field:
    "grid gap-2 text-xs font-medium text-white/55 [&_input]:min-h-11 [&_input]:w-full [&_input]:rounded-2xl [&_input]:border [&_input]:border-white/[0.05] [&_input]:bg-white/[0.03] [&_input]:px-4 [&_input]:outline-none [&_input]:transition-all [&_input:focus]:border-violet-400/40 [&_input:focus]:bg-white/[0.05] [&_input:focus]:shadow-[0_0_0_4px_rgba(139,92,246,0.08)] [&_textarea]:w-full [&_textarea]:rounded-2xl [&_textarea]:border [&_textarea]:border-white/[0.05] [&_textarea]:bg-white/[0.03] [&_textarea]:p-4 [&_textarea]:outline-none [&_textarea]:transition-all [&_textarea:focus]:border-violet-400/40 [&_textarea:focus]:bg-white/[0.05] [&_textarea:focus]:shadow-[0_0_0_4px_rgba(139,92,246,0.08)] [&_select]:min-h-11 [&_select]:w-full [&_select]:rounded-full [&_select]:border [&_select]:border-white/10 [&_select]:bg-white/[0.04] [&_select]:px-4 [&_select]:outline-none [&_select:focus]:border-violet-400/40",
  primaryAction:
    "inline-flex items-center justify-center gap-2 rounded-full border-0 bg-gradient-to-r from-[#C084FC] to-[#6366F1] px-5 py-3 text-center text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_12px_28px_-10px_rgba(139,92,246,0.4)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  secondaryAction:
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-sm font-medium text-foreground transition-all duration-200 hover:border-white/15 hover:bg-white/[0.08] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  state:
    "rounded-3xl border border-white/[0.06] bg-card/60 p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.14em] [&>span]:text-violet-400 [&_h1]:mt-4 [&_h1]:text-4xl [&_h1]:font-semibold [&_h2]:mt-4 [&_h2]:text-3xl [&_h2]:font-semibold [&_p]:max-w-2xl [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/50",
  dialog:
    "w-full max-w-3xl rounded-3xl border border-white/[0.08] bg-[#0F1012] p-7 shadow-2xl [&_h2]:text-3xl [&_h2]:font-semibold [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/50",
} as const;
