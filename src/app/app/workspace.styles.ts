export const workspaceStyles = {
  page: "mx-auto max-w-[1350px]",
  pageHeader:
    "grid grid-cols-[minmax(0,1.3fr)_minmax(17rem,0.55fr)] gap-6 py-[clamp(3rem,6vw,6rem)] max-[800px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-mono [&>span]:text-[0.62rem] [&>span]:tracking-[0.16em] [&>span]:text-accent [&>span]:uppercase max-[800px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:max-w-[11ch] [&_h1]:text-[clamp(3rem,6vw,6rem)] [&_h1]:leading-[0.98] [&_h1]:font-semibold [&_h1]:tracking-[-0.055em] [&>p]:m-0 [&>p]:self-end [&>p]:leading-[1.65] [&>p]:text-muted-foreground",
  composerEntry:
    "flex min-h-57.5 items-center justify-between overflow-hidden rounded-2xl border border-amber-400/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,158,11,0.12),transparent_24rem),#0f1012] p-[clamp(1.5rem,4vw,3rem)] text-foreground shadow-[0_30px_70px_-40px_rgba(245,158,11,0.35)] max-[800px]:items-start max-[800px]:flex-col max-[800px]:gap-12 [&_span]:font-mono [&_span]:text-[0.62rem] [&_span]:tracking-[0.14em] [&_span]:text-accent [&_span]:uppercase [&_h2]:mt-8 [&_h2]:text-[clamp(2rem,4vw,4rem)] [&_h2]:font-medium [&_h2]:tracking-[-0.05em] [&_a]:flex [&_a]:min-h-12 [&_a]:items-center [&_a]:gap-8 [&_a]:rounded-full [&_a]:border [&_a]:border-amber-300/30 [&_a]:bg-gradient-to-r [&_a]:from-[#ffebb1] [&_a]:to-[#ffc438] [&_a]:px-5 [&_a]:font-mono [&_a]:text-[0.62rem] [&_a]:font-semibold [&_a]:tracking-[0.07em] [&_a]:text-[#18130a] [&_a]:uppercase",
  overviewGrid:
    "mt-5 grid grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.65fr)] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050505] max-[800px]:grid-cols-1 [&>section]:min-h-97.5 [&>section]:p-6 [&>aside]:min-h-97.5 [&>aside]:border-l [&>aside]:border-white/[0.08] [&>aside]:bg-surface [&>aside]:p-6 max-[800px]:[&>aside]:border-t max-[800px]:[&>aside]:border-l-0",
  sectionHeader:
    "flex items-center justify-between border-b border-border pb-4 font-mono text-[0.62rem] tracking-[0.08em] uppercase [&_a]:text-accent",
  emptyState:
    "flex min-h-75 max-w-140 flex-col items-start justify-center [&>span]:font-mono [&>span]:text-[0.62rem] [&>span]:tracking-[0.08em] [&>span]:text-muted [&>span]:uppercase [&_h2]:my-3 [&_h2]:font-editorial [&_h2]:text-[2.2rem] [&_h2]:font-normal [&_h2]:tracking-[-0.04em] [&_p]:m-0 [&_p]:text-[0.85rem] [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  recentLoading:
    "pt-8 [&>span]:font-mono [&>span]:text-[0.62rem] [&>span]:tracking-[0.08em] [&>span]:text-muted [&>span]:uppercase [&_div]:mt-px [&_div]:h-13 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  recentError:
    "pt-8 [&>span]:font-mono [&>span]:text-[0.62rem] [&>span]:tracking-[0.08em] [&>span]:text-muted [&>span]:uppercase [&_p]:text-[0.8rem] [&_p]:text-muted-foreground [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-3 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:uppercase",
  recentList:
    "m-0 list-none p-0 [&_li]:border-b [&_li]:border-border [&_a]:grid [&_a]:grid-cols-[minmax(0,1fr)_minmax(21rem,1.1fr)] [&_a]:gap-6 [&_a]:py-5 max-[800px]:[&_a]:grid-cols-1 [&_a>div]:grid [&_a>div]:min-w-0 [&_a>div]:gap-2 [&_a:hover_strong]:text-accent [&_span]:font-mono [&_span]:text-[0.54rem] [&_span]:tracking-[0.08em] [&_span]:text-muted [&_span]:uppercase [&_strong]:truncate [&_strong]:text-[0.78rem] [&_strong]:transition-colors [&_dl]:m-0 [&_dl]:grid [&_dl]:grid-cols-[0.6fr_0.8fr_0.5fr_1.2fr] [&_dl]:gap-4 max-[800px]:[&_dl]:grid-cols-2 [&_dl_div]:grid [&_dl_div]:gap-2 [&_dt]:font-mono [&_dt]:text-[0.54rem] [&_dt]:tracking-[0.08em] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-[0.62rem] [&_dd]:capitalize",
  principles:
    "mt-12 list-none p-0 [&_li]:grid [&_li]:grid-cols-[2rem_1fr] [&_li]:gap-4 [&_li]:border-t [&_li]:border-border [&_li]:py-4 [&_li]:text-[0.8rem] [&_li]:leading-normal [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:text-accent",
} as const;
