export const notificationStyles = {
  page: "mx-auto max-w-[1300px]",
  header:
    "py-[clamp(3rem,7vw,7rem)] [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h1]:my-6 [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,8vw,8rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-[-0.065em] [&>div]:grid [&>div]:grid-cols-[1fr_auto] [&>div]:items-end [&>div]:gap-8 max-[700px]:[&>div]:grid-cols-1 max-[700px]:[&>div]:items-start [&_p]:m-0 [&_p]:max-w-168 [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-3 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:tracking-[0.07em] [&_button]:text-muted [&_button]:uppercase",
  mutationError: "border border-danger p-4 text-xs text-danger",
  loading:
    "[&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_div]:mt-px [&_div]:h-27.5 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  error:
    "flex min-h-90 flex-col items-start justify-center [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_h2]:tracking-[-0.05em] [&_p]:text-muted-foreground [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-3",
  empty:
    "flex min-h-90 flex-col items-start justify-center [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_h2]:tracking-[-0.05em] [&_p]:text-muted-foreground",
  ledger:
    "m-0 list-none border-t border-border-strong p-0 [&_li]:grid [&_li]:grid-cols-[0.5rem_minmax(0,1fr)_auto] [&_li]:items-start [&_li]:gap-6 [&_li]:border-b [&_li]:border-border-strong [&_li]:py-6 max-[700px]:[&_li]:grid-cols-[0.5rem_1fr] [&_li[data-read=true]]:opacity-70 [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:tracking-[0.07em] [&_span]:text-muted [&_span]:uppercase [&_small]:font-mono [&_small]:text-[0.58rem] [&_small]:tracking-[0.07em] [&_small]:text-muted [&_small]:uppercase [&_h2]:my-2.5 [&_h2]:font-editorial [&_h2]:text-[1.8rem] [&_h2]:font-normal [&_h2]:tracking-[-0.035em] [&_p]:mb-3 [&_p]:text-[0.78rem] [&_p]:leading-[1.55] [&_p]:text-muted-foreground",
  marker:
    "mt-1 size-1.5 rounded-full bg-accent",
  recordActions:
    "flex gap-1.5 font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase max-[700px]:col-start-2 max-[700px]:flex-wrap [&_a]:border [&_a]:border-border [&_a]:bg-transparent [&_a]:p-2.5 [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-2.5",
  loadMore:
    "mx-auto my-8 block border border-border bg-transparent p-3 font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase",
} as const;
