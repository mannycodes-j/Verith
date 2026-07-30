export const leaderboardStyles = {
  page: "mx-auto max-w-[1250px]",
  header:
    "grid grid-cols-[1fr_minmax(18rem,0.5fr)] gap-6 py-[clamp(3rem,7vw,7rem)] max-[650px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase max-[650px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,8vw,8rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-[-0.065em] [&_p]:m-0 [&_p]:self-end [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  filters:
    "flex items-center gap-2 border-y border-border-strong py-4 font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase [&>span]:mr-auto [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-2.5 [&_button]:uppercase [&_button[data-active=true]]:border-accent [&_button[data-active=true]]:text-accent",
  loading:
    "[&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_div]:mt-px [&_div]:h-15 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  error:
    "py-20 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground",
  empty:
    "py-20 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground",
  rankingHeader:
    "font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase",
  ranking:
    "m-0 list-none p-0 [&_li]:grid [&_li]:min-h-17 [&_li]:grid-cols-[0.35fr_1fr_0.5fr_0.5fr] [&_li]:items-center [&_li]:gap-4 [&_li]:border-b [&_li]:border-border max-[650px]:[&_li]:grid-cols-[0.25fr_1fr_0.5fr] [&_li>strong]:font-editorial [&_li>strong]:text-2xl [&_li>strong]:font-normal [&_li>strong]:text-accent [&_li>span]:text-xs max-[650px]:[&_li>span:last-child]:hidden",
} as const;
