export const challengeStyles = {
  page: "mx-auto max-w-[1300px]",
  workspace: "mx-auto max-w-[1300px]",
  header:
    "grid grid-cols-[1fr_minmax(18rem,0.5fr)] gap-6 py-[clamp(3rem,7vw,7rem)] max-[750px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case max-[750px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-normal [&_p]:m-0 [&_p]:self-end [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  loading:
    "[&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_div]:mt-px [&_div]:h-25 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  error:
    "py-20 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground",
  empty:
    "py-20 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground",
  workspaceState: "py-20",
  list:
    "m-0 grid list-none gap-4 p-0 [&_li]:rounded-3xl [&_li]:bg-surface/70 [&_li]:p-5 [&_a]:grid [&_a]:grid-cols-[2rem_1fr_minmax(14rem,0.45fr)_auto] [&_a]:gap-8 [&_a]:py-4 max-[750px]:[&_a]:grid-cols-[2rem_1fr_auto] [&_span]:text-xs [&_span]:font-semibold [&_span]:text-violet-300 [&_small]:text-xs [&_small]:text-muted [&_h2]:my-2 [&_h2]:text-[2rem] [&_h2]:font-semibold [&_p]:leading-[1.55] [&_p]:text-muted-foreground [&_dl]:m-0 max-[750px]:[&_dl]:hidden [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:rounded-xl [&_dl_div]:bg-white/[0.035] [&_dl_div]:px-3 [&_dl_div]:py-3 [&_dt]:text-xs [&_dt]:text-muted [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-xs",
  context:
    "grid grid-cols-[0.4fr_1fr] gap-12 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 p-[clamp(2rem,5vw,5rem)] text-white max-[750px]:grid-cols-1 [&>span]:text-sm [&_p]:m-0 [&_p]:leading-[1.7] [&_p]:text-white/80",
  questions:
    "mt-5 grid gap-4 rounded-3xl border border-white/[0.08] bg-surface/60 p-[clamp(1.25rem,4vw,3rem)] [&_fieldset]:m-0 [&_fieldset]:rounded-2xl [&_fieldset]:border [&_fieldset]:border-white/[0.07] [&_fieldset]:bg-white/[0.03] [&_fieldset]:p-[clamp(1.25rem,3vw,2.5rem)] [&_legend]:mb-5 [&_legend]:text-[clamp(1.4rem,3vw,2.2rem)] [&_legend]:font-semibold [&_legend_span]:mb-3 [&_legend_span]:block [&_legend_span]:text-sm [&_legend_span]:text-muted [&_fieldset>label]:mt-2 [&_fieldset>label]:flex [&_fieldset>label]:items-center [&_fieldset>label]:gap-4 [&_fieldset>label]:rounded-xl [&_fieldset>label]:bg-white/[0.04] [&_fieldset>label]:p-4 [&_fieldset>label]:transition-colors [&_fieldset>label:hover]:bg-white/[0.08]",
  explanation:
    "mt-4 border-l-2 border-danger p-4 data-[correct=true]:border-success [&_p]:leading-[1.55] [&_p]:text-muted-foreground",
  submit:
    "mt-6 inline-block rounded-xl border-0 bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-4 text-sm font-semibold text-white",
  submitError: "text-danger",
  result:
    "mt-12 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&>strong]:block [&>strong]:font-editorial [&>strong]:text-8xl [&>strong]:font-normal [&_a]:mt-8 [&_a]:inline-block [&_a]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_a]:p-[0.9rem] [&_a]:font-sans [&_a]:text-[0.58rem] [&_a]:text-white [&_a]:normal-case",
} as const;
