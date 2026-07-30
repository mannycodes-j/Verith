export const achievementStyles = {
  page: "mx-auto max-w-[1300px]",
  header:
    "grid grid-cols-[1fr_minmax(18rem,0.5fr)] gap-6 py-[clamp(3rem,7vw,7rem)] max-[700px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case max-[700px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-normal [&_p]:m-0 [&_p]:self-end [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  loading:
    "[&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_div]:mt-px [&_div]:h-25 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  error:
    "py-16 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-5xl [&_h2]:font-normal [&_p]:text-muted-foreground [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-3",
  profile:
    "grid grid-cols-[0.5fr_1fr] gap-12 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 p-[clamp(2rem,5vw,5rem)] text-white shadow-xl shadow-violet-950/20 max-[700px]:grid-cols-1 [&>div]:grid [&>div_span]:text-sm [&>div_strong]:text-[clamp(4rem,10vw,8rem)] [&>div_strong]:leading-[0.9] [&>div_strong]:font-semibold [&_dl]:m-0 [&_dl]:grid [&_dl]:gap-2 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:rounded-xl [&_dl_div]:bg-white/10 [&_dl_div]:p-3 [&_dt]:text-sm [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-sm",
  badges:
    "mt-5 rounded-3xl border border-white/[0.08] bg-surface/60 p-[clamp(1.5rem,3vw,3rem)] [&>p]:text-muted-foreground [&_ol]:m-0 [&_ol]:grid [&_ol]:list-none [&_ol]:gap-3 [&_ol]:p-0 [&_li]:grid [&_li]:grid-cols-[2rem_1fr_auto] [&_li]:items-start [&_li]:gap-6 [&_li]:rounded-2xl [&_li]:bg-white/[0.04] [&_li]:p-5 [&_li[data-earned=false]]:opacity-60 [&_li>span]:text-sm [&_li>span]:text-muted [&_li>strong]:text-sm [&_li>strong]:text-muted [&_li[data-earned=true]>strong]:text-success [&_small]:text-xs [&_small]:text-muted [&_h2]:my-2 [&_h2]:text-[2rem] [&_h2]:font-semibold [&_p]:m-0 [&_p]:text-[0.78rem] [&_p]:leading-[1.55]",
  sectionHeader:
    "flex justify-between  pb-4 font-sans text-[0.58rem] tracking-normal text-muted normal-case",
  transactions:
    "mt-5 rounded-3xl border border-white/[0.08] bg-surface/60 p-[clamp(1.5rem,3vw,3rem)] [&>p]:text-muted-foreground [&_ol]:m-0 [&_ol]:grid [&_ol]:list-none [&_ol]:gap-3 [&_ol]:p-0 [&_li]:grid [&_li]:grid-cols-[1fr_0.5fr_0.5fr_0.7fr] [&_li]:items-center [&_li]:gap-4 [&_li]:rounded-2xl [&_li]:bg-white/[0.04] [&_li]:p-4 max-[700px]:[&_li]:grid-cols-2 [&_span]:text-sm [&_span]:text-muted [&_small]:text-xs [&_small]:text-muted [&_strong]:text-sm [&_strong]:font-semibold",
  loadMore:
    "mt-4 rounded-2xl border border-white/[0.08] bg-surface/60 bg-transparent p-3 font-sans text-[0.58rem] normal-case",
} as const;
