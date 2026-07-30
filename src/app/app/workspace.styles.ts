import { vectraStyles as ui } from "@/lib/vectra-styles";

export const workspaceStyles = {
  page: ui.page,
  pageHeader: ui.pageHeader,
  composerEntry:
    `${ui.card} flex min-h-52 items-center justify-between gap-8 [background:radial-gradient(circle_at_15%_0%,rgba(139,92,246,0.15),transparent_25rem),rgba(7,7,8,0.72)] p-7 max-md:flex-col max-md:items-start [&_span]:text-[10px] [&_span]:font-semibold [&_span]:uppercase [&_span]:tracking-[0.14em] [&_span]:text-violet-400 [&_h2]:mt-4 [&_h2]:mb-0 [&_h2]:max-w-[18ch] [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight md:[&_h2]:text-4xl [&_a]:rounded-full [&_a]:bg-gradient-to-r [&_a]:from-[#C084FC] [&_a]:to-[#6366F1] [&_a]:px-6 [&_a]:py-3.5 [&_a]:text-sm [&_a]:font-medium [&_a]:text-white [&_a]:transition-transform [&_a:hover]:scale-[1.02]`,
  overviewGrid:
    "mt-6 grid grid-cols-[minmax(0,1fr)_360px] gap-6 max-lg:grid-cols-1 [&>section]:relative [&>section]:min-h-96 [&>section]:overflow-hidden [&>section]:rounded-3xl [&>section]:border [&>section]:border-white/[0.06] [&>section]:bg-card/60 [&>section]:p-6 [&>section]:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] [&>aside]:relative [&>aside]:min-h-96 [&>aside]:overflow-hidden [&>aside]:rounded-3xl [&>aside]:border [&>aside]:border-white/[0.06] [&>aside]:bg-card/60 [&>aside]:p-6 [&>aside]:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]",
  sectionHeader:
    "mb-5 flex items-center justify-between gap-4 [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.14em] [&>span]:text-white/35 [&_a]:text-xs [&_a]:font-medium [&_a]:text-violet-400",
  emptyState:
    "flex min-h-72 max-w-xl flex-col items-start justify-center [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.14em] [&>span]:text-white/35 [&_h2]:my-3 [&_h2]:text-3xl [&_h2]:font-semibold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/50",
  recentLoading:
    "grid gap-3 [&>span]:text-[10px] [&>span]:uppercase [&>span]:tracking-[0.14em] [&>span]:text-white/30 [&_div]:h-16 [&_div]:animate-pulse [&_div]:rounded-2xl [&_div]:bg-white/[0.04]",
  recentError:
    "rounded-2xl border border-danger/20 bg-danger/[0.06] p-4 [&>span]:text-xs [&>span]:text-danger [&_p]:text-sm [&_p]:text-white/50 [&_button]:rounded-full [&_button]:border [&_button]:border-white/10 [&_button]:bg-white/[0.04] [&_button]:px-4 [&_button]:py-2.5 [&_button]:text-xs",
  recentList:
    "m-0 grid list-none gap-3 p-0 [&_a]:grid [&_a]:grid-cols-[minmax(0,1fr)_minmax(21rem,1.1fr)] [&_a]:gap-6 [&_a]:rounded-2xl [&_a]:border [&_a]:border-white/[0.04] [&_a]:bg-white/[0.02] [&_a]:p-4 [&_a]:transition-all [&_a:hover]:-translate-y-0.5 [&_a:hover]:border-white/10 [&_a:hover]:bg-white/[0.04] max-md:[&_a]:grid-cols-1 [&_a>div]:grid [&_a>div]:min-w-0 [&_a>div]:gap-2 [&_a:hover_strong]:text-violet-300 [&_span]:font-mono [&_span]:text-[10px] [&_span]:text-white/30 [&_strong]:truncate [&_strong]:text-sm [&_strong]:font-medium [&_strong]:transition-colors [&_dl]:m-0 [&_dl]:grid [&_dl]:grid-cols-[0.6fr_0.8fr_0.5fr_1.2fr] [&_dl]:gap-4 max-md:[&_dl]:grid-cols-2 [&_dl_div]:grid [&_dl_div]:gap-1 [&_dt]:text-[10px] [&_dt]:uppercase [&_dt]:tracking-[0.1em] [&_dt]:text-white/30 [&_dd]:m-0 [&_dd]:text-xs [&_dd]:capitalize",
  principles:
    "mt-2 grid list-none gap-3 p-0 [&_li]:grid [&_li]:grid-cols-[1.25rem_1fr] [&_li]:gap-3 [&_li]:rounded-2xl [&_li]:border [&_li]:border-white/[0.04] [&_li]:bg-white/[0.02] [&_li]:p-4 [&_li]:text-xs [&_li]:leading-relaxed [&_li]:text-white/55 [&_svg]:text-emerald-400",
} as const;
