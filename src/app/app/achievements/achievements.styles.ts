export const achievementStyles = {
  page: "mx-auto max-w-[1300px]",
  header:
    "grid grid-cols-[1fr_minmax(18rem,0.5fr)] gap-6 py-[clamp(3rem,7vw,7rem)] max-[700px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase max-[700px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,8vw,8rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-[-0.065em] [&_p]:m-0 [&_p]:self-end [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  loading:
    "[&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_div]:mt-px [&_div]:h-25 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  error:
    "py-16 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-5xl [&_h2]:font-normal [&_p]:text-muted-foreground [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-3",
  profile:
    "grid grid-cols-[0.5fr_1fr] gap-12 bg-foreground p-[clamp(2rem,5vw,5rem)] text-background max-[700px]:grid-cols-1 [&>div]:grid [&>div_span]:font-mono [&>div_span]:text-[0.58rem] [&>div_span]:tracking-[0.07em] [&>div_span]:text-muted [&>div_span]:uppercase [&>div_strong]:font-editorial [&>div_strong]:text-[clamp(5rem,10vw,10rem)] [&>div_strong]:leading-[0.8] [&>div_strong]:font-normal [&_dl]:m-0 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:border-t [&_dl_div]:border-[color-mix(in_srgb,var(--background)_22%,transparent)] [&_dl_div]:py-3 [&_dt]:font-mono [&_dt]:text-[0.58rem] [&_dt]:tracking-[0.07em] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.72rem]",
  badges:
    "border border-t-0 border-border-strong p-[clamp(1.5rem,3vw,3rem)] [&>p]:text-muted-foreground [&_ol]:m-0 [&_ol]:list-none [&_ol]:p-0 [&_li]:grid [&_li]:grid-cols-[2rem_1fr_auto] [&_li]:items-start [&_li]:gap-8 [&_li]:border-b [&_li]:border-border [&_li]:py-8 [&_li[data-earned=false]]:opacity-60 [&_li>span]:font-mono [&_li>span]:text-[0.58rem] [&_li>span]:tracking-[0.07em] [&_li>span]:text-muted [&_li>span]:uppercase [&_li>strong]:font-mono [&_li>strong]:text-[0.58rem] [&_li>strong]:tracking-[0.07em] [&_li>strong]:text-muted [&_li>strong]:uppercase [&_li[data-earned=true]>strong]:text-success [&_small]:font-mono [&_small]:text-[0.58rem] [&_small]:tracking-[0.07em] [&_small]:text-muted [&_small]:uppercase [&_h2]:my-2 [&_h2]:font-editorial [&_h2]:text-[2.2rem] [&_h2]:font-normal [&_h2]:tracking-[-0.04em] [&_p]:m-0 [&_p]:text-[0.78rem] [&_p]:leading-[1.55]",
  sectionHeader:
    "flex justify-between border-b border-border-strong pb-4 font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase",
  transactions:
    "border border-t-0 border-border-strong p-[clamp(1.5rem,3vw,3rem)] [&>p]:text-muted-foreground [&_ol]:m-0 [&_ol]:list-none [&_ol]:p-0 [&_li]:grid [&_li]:grid-cols-[1fr_0.5fr_0.5fr_0.7fr] [&_li]:items-center [&_li]:gap-4 [&_li]:border-b [&_li]:border-border [&_li]:py-4 max-[700px]:[&_li]:grid-cols-2 [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:tracking-[0.07em] [&_span]:text-muted [&_span]:uppercase [&_small]:font-mono [&_small]:text-[0.58rem] [&_small]:tracking-[0.07em] [&_small]:text-muted [&_small]:uppercase [&_strong]:text-[0.72rem] [&_strong]:font-medium",
  loadMore:
    "mt-4 border border-border-strong bg-transparent p-3 font-mono text-[0.58rem] uppercase",
} as const;
