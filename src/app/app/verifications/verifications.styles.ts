export const verificationHistoryStyles = {
  page: "mx-auto max-w-[1400px]",
  header:
    "grid grid-cols-[1fr_minmax(18rem,0.45fr)] gap-8 py-[clamp(3rem,6vw,6rem)] max-[760px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-sans [&>span]:text-[0.6rem] [&>span]:tracking-normal [&>span]:text-accent [&>span]:normal-case max-[760px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:text-[clamp(3rem,6vw,6rem)] [&_h1]:leading-[0.98] [&_h1]:font-semibold [&_h1]:tracking-normal [&_p]:m-0 [&_p]:self-end [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  filters:
    "flex flex-wrap items-end gap-4 rounded-3xl bg-surface/70 p-5 [&_label]:grid [&_label]:gap-2 [&_label]:text-xs [&_label]:font-medium [&_label]:text-muted [&_select]:min-w-40 [&_select]:rounded-xl [&_select]:border [&_select]:border-white/[0.08] [&_select]:bg-white/[0.035] [&_select]:p-3 [&_a]:ml-auto [&_a]:rounded-full [&_a]:bg-gradient-to-r [&_a]:from-violet-500 [&_a]:to-indigo-500 [&_a]:px-5 [&_a]:py-3 [&_a]:text-xs [&_a]:font-semibold [&_a]:text-white",
  list: "mt-5 grid gap-3",
  listHeader:
    "hidden",
  record:
    "grid grid-cols-[minmax(0,1.5fr)_0.6fr_0.7fr_0.7fr_auto] items-center gap-5 rounded-2xl bg-surface/70 p-5 transition-all hover:-translate-y-0.5 hover:bg-surface max-[760px]:grid-cols-[1fr_auto] [&>div]:min-w-0 [&>div>span]:block [&>div>span]:text-xs [&>div>span]:text-muted [&_strong]:mt-1 [&_strong]:block [&_strong]:truncate [&_strong]:text-base [&_strong]:font-semibold [&>span]:text-xs [&>span]:text-muted max-[760px]:[&>span]:hidden [&>a]:rounded-full [&>a]:bg-white/[0.055] [&>a]:px-4 [&>a]:py-2 [&>a]:text-xs [&>a]:font-semibold [&>a]:text-violet-300",
  loading:
    "py-20 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&>div]:mt-px [&>div]:h-20 [&>div]:animate-pulse [&>div]:bg-surface-muted",
  error:
    "py-20 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground [&_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button]:p-3 [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:text-white [&_button]:normal-case",
  empty:
    "py-20 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground [&_a]:inline-block [&_a]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_a]:p-3 [&_a]:font-sans [&_a]:text-[0.58rem] [&_a]:text-white [&_a]:normal-case",
} as const;
