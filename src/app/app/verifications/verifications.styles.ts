export const verificationHistoryStyles = {
  page: "mx-auto max-w-[1400px]",
  header:
    "grid grid-cols-[1fr_minmax(18rem,0.45fr)] gap-8 py-[clamp(3rem,7vw,7rem)] max-[760px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase max-[760px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,8vw,8rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-[-0.065em] [&_p]:m-0 [&_p]:self-end [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  filters:
    "flex flex-wrap items-end gap-4 border-y border-border-strong py-4 [&_label]:grid [&_label]:gap-2 [&_label]:font-mono [&_label]:text-[0.58rem] [&_label]:text-muted [&_label]:uppercase [&_select]:min-w-40 [&_select]:rounded-none [&_select]:border [&_select]:border-border-strong [&_select]:bg-surface [&_select]:p-3 [&_a]:ml-auto [&_a]:border [&_a]:border-border-strong [&_a]:p-3 [&_a]:font-mono [&_a]:text-[0.58rem] [&_a]:uppercase",
  list: "border-b border-border-strong",
  listHeader:
    "grid grid-cols-[minmax(0,1.5fr)_0.6fr_0.7fr_0.7fr_auto] gap-5 border-b border-border-strong py-3 font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase max-[760px]:hidden",
  record:
    "grid grid-cols-[minmax(0,1.5fr)_0.6fr_0.7fr_0.7fr_auto] items-center gap-5 border-b border-border py-5 max-[760px]:grid-cols-[1fr_auto] [&>div]:min-w-0 [&>div>span]:block [&>div>span]:font-mono [&>div>span]:text-[0.58rem] [&>div>span]:text-muted [&>div>span]:uppercase [&_strong]:block [&_strong]:truncate [&_strong]:font-editorial [&_strong]:text-xl [&_strong]:font-normal [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase max-[760px]:[&>span]:hidden [&>a]:font-mono [&>a]:text-[0.58rem] [&>a]:text-accent [&>a]:uppercase",
  loading:
    "py-20 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&>div]:mt-px [&>div]:h-20 [&>div]:animate-pulse [&>div]:bg-surface-muted",
  error:
    "py-20 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground [&_button]:bg-foreground [&_button]:p-3 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:text-background [&_button]:uppercase",
  empty:
    "py-20 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground [&_a]:inline-block [&_a]:bg-foreground [&_a]:p-3 [&_a]:font-mono [&_a]:text-[0.58rem] [&_a]:text-background [&_a]:uppercase",
} as const;
