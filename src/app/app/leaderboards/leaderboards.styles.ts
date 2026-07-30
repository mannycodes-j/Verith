export const leaderboardStyles = {
  page: "mx-auto max-w-[1250px]",
  header:
    "grid grid-cols-[1fr_minmax(18rem,0.5fr)] gap-6 py-[clamp(3rem,7vw,7rem)] max-[650px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case max-[650px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-normal [&_p]:m-0 [&_p]:self-end [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  filters:
    "flex flex-wrap items-center gap-2 rounded-2xl bg-surface/70 p-4 text-sm text-muted [&>span]:mr-auto [&_button]:rounded-xl [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-2.5 [&_button[data-active=true]]:border-accent [&_button[data-active=true]]:bg-violet-500/10 [&_button[data-active=true]]:text-accent",
  loading:
    "[&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_div]:mt-px [&_div]:h-15 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  error:
    "py-20 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground",
  empty:
    "py-20 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground",
  rankingHeader:
    "font-sans text-[0.58rem] tracking-normal text-muted normal-case",
  ranking:
    "m-0 grid list-none gap-3 p-0 [&_li]:grid [&_li]:min-h-17 [&_li]:grid-cols-[0.35fr_1fr_0.5fr_0.5fr] [&_li]:items-center [&_li]:gap-4 [&_li]:rounded-2xl [&_li]:border [&_li]:border-white/[0.06] [&_li]:bg-white/[0.04] [&_li]:p-4 max-[650px]:[&_li]:grid-cols-[0.25fr_1fr_0.5fr] [&_li>strong]:text-2xl [&_li>strong]:font-semibold [&_li>strong]:text-accent [&_li>span]:text-xs max-[650px]:[&_li>span:last-child]:hidden",
} as const;
