export const workspaceStyles = {
  page: "mx-auto max-w-[1350px]",
  pageHeader:
    "grid grid-cols-[minmax(0,1.3fr)_minmax(17rem,0.55fr)] gap-6 py-[clamp(3rem,6vw,6rem)] max-[800px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-sans [&>span]:text-[0.62rem] [&>span]:tracking-normal [&>span]:text-accent [&>span]:normal-case max-[800px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:max-w-[11ch] [&_h1]:text-[clamp(3rem,6vw,6rem)] [&_h1]:leading-[0.98] [&_h1]:font-semibold [&_h1]:tracking-normal [&>p]:m-0 [&>p]:self-end [&>p]:leading-[1.65] [&>p]:text-muted-foreground",
  composerEntry:
    "flex min-h-57.5 items-center justify-between overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.22),transparent_24rem),#11141a] p-[clamp(1.5rem,4vw,3rem)] text-foreground shadow-[0_30px_70px_-40px_rgba(99,102,241,0.55)] max-[800px]:items-start max-[800px]:flex-col max-[800px]:gap-12 [&_span]:text-[0.72rem] [&_span]:font-semibold [&_span]:text-violet-300 [&_h2]:mt-6 [&_h2]:text-[clamp(2rem,4vw,3.5rem)] [&_h2]:font-semibold [&_a]:flex [&_a]:min-h-12 [&_a]:items-center [&_a]:gap-3 [&_a]:rounded-full [&_a]:bg-gradient-to-r [&_a]:from-violet-500 [&_a]:to-indigo-500 [&_a]:px-6 [&_a]:text-sm [&_a]:font-semibold [&_a]:text-white",
  overviewGrid:
    "mt-5 grid grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.65fr)] gap-5 max-[800px]:grid-cols-1 [&>section]:min-h-97.5 [&>section]:rounded-3xl [&>section]:bg-surface/70 [&>section]:p-6 [&>aside]:min-h-97.5 [&>aside]:rounded-3xl [&>aside]:bg-surface/70 [&>aside]:p-6",
  sectionHeader:
    "flex items-center justify-between  pb-4 font-sans text-[0.62rem] tracking-normal normal-case [&_a]:text-accent",
  emptyState:
    "flex min-h-75 max-w-140 flex-col items-start justify-center [&>span]:font-sans [&>span]:text-[0.62rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h2]:my-3 [&_h2]:font-editorial [&_h2]:text-[2.2rem] [&_h2]:font-normal [&_h2]:tracking-normal [&_p]:m-0 [&_p]:text-[0.85rem] [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  recentLoading:
    "pt-8 [&>span]:font-sans [&>span]:text-[0.62rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_div]:mt-px [&_div]:h-13 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  recentError:
    "pt-8 [&>span]:font-sans [&>span]:text-[0.62rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_p]:text-[0.8rem] [&_p]:text-muted-foreground [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-3 [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:normal-case",
  recentList:
    "m-0 grid list-none gap-3 p-0 [&_a]:grid [&_a]:grid-cols-[minmax(0,1fr)_minmax(21rem,1.1fr)] [&_a]:gap-6 [&_a]:rounded-2xl [&_a]:bg-white/[0.03] [&_a]:p-4 [&_a]:transition-all [&_a:hover]:bg-white/[0.055] max-[800px]:[&_a]:grid-cols-1 [&_a>div]:grid [&_a>div]:min-w-0 [&_a>div]:gap-2 [&_a:hover_strong]:text-violet-300 [&_span]:text-[0.64rem] [&_span]:text-muted [&_strong]:truncate [&_strong]:text-[0.82rem] [&_strong]:transition-colors [&_dl]:m-0 [&_dl]:grid [&_dl]:grid-cols-[0.6fr_0.8fr_0.5fr_1.2fr] [&_dl]:gap-4 max-[800px]:[&_dl]:grid-cols-2 [&_dl_div]:grid [&_dl_div]:gap-2 [&_dt]:text-[0.62rem] [&_dt]:text-muted [&_dd]:m-0 [&_dd]:text-[0.68rem] [&_dd]:capitalize",
  principles:
    "mt-8 grid list-none gap-3 p-0 [&_li]:grid [&_li]:grid-cols-[1.25rem_1fr] [&_li]:gap-3 [&_li]:rounded-2xl [&_li]:bg-white/[0.03] [&_li]:p-4 [&_li]:text-[0.8rem] [&_li]:leading-normal [&_svg]:text-emerald-300",
} as const;
