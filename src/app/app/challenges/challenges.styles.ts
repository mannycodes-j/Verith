export const challengeStyles = {
  page: "mx-auto max-w-[1300px]",
  workspace: "mx-auto max-w-[1300px]",
  header:
    "grid grid-cols-[1fr_minmax(18rem,0.5fr)] gap-6 py-[clamp(3rem,7vw,7rem)] max-[750px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase max-[750px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,8vw,8rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-[-0.065em] [&_p]:m-0 [&_p]:self-end [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  loading:
    "[&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_div]:mt-px [&_div]:h-25 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  error:
    "py-20 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground",
  empty:
    "py-20 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground",
  workspaceState: "py-20",
  list:
    "m-0 list-none border-t border-border-strong p-0 [&_li]:border-b [&_li]:border-border-strong [&_a]:grid [&_a]:grid-cols-[2rem_1fr_minmax(14rem,0.45fr)_auto] [&_a]:gap-8 [&_a]:py-8 max-[750px]:[&_a]:grid-cols-[2rem_1fr_auto] [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:tracking-[0.07em] [&_span]:text-muted [&_span]:uppercase [&_small]:font-mono [&_small]:text-[0.58rem] [&_small]:tracking-[0.07em] [&_small]:text-muted [&_small]:uppercase [&_h2]:my-2 [&_h2]:font-editorial [&_h2]:text-[2.5rem] [&_h2]:font-normal [&_h2]:tracking-[-0.045em] [&_p]:leading-[1.55] [&_p]:text-muted-foreground [&_dl]:m-0 max-[750px]:[&_dl]:hidden [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:border-t [&_dl_div]:border-border [&_dl_div]:py-3 [&_dt]:font-mono [&_dt]:text-[0.58rem] [&_dt]:tracking-[0.07em] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.7rem]",
  context:
    "grid grid-cols-[0.4fr_1fr] gap-12 bg-foreground p-[clamp(2rem,5vw,5rem)] text-background max-[750px]:grid-cols-1 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_p]:m-0 [&_p]:leading-[1.7] [&_p]:text-[color-mix(in_srgb,var(--background)_80%,transparent)]",
  questions:
    "border border-t-0 border-border-strong p-[clamp(1.5rem,4vw,4rem)] [&_fieldset]:m-0 [&_fieldset]:border-0 [&_fieldset]:border-b [&_fieldset]:border-border-strong [&_fieldset]:py-12 [&_legend]:mb-6 [&_legend]:font-editorial [&_legend]:text-[clamp(1.7rem,3vw,2.7rem)] [&_legend]:tracking-[-0.035em] [&_legend_span]:mb-3 [&_legend_span]:block [&_legend_span]:font-mono [&_legend_span]:text-[0.58rem] [&_legend_span]:tracking-[0.07em] [&_legend_span]:text-muted [&_legend_span]:uppercase [&_fieldset>label]:flex [&_fieldset>label]:items-center [&_fieldset>label]:gap-4 [&_fieldset>label]:border-t [&_fieldset>label]:border-border [&_fieldset>label]:py-4",
  explanation:
    "mt-4 border-l-2 border-danger p-4 data-[correct=true]:border-success [&_p]:leading-[1.55] [&_p]:text-muted-foreground",
  submit:
    "mt-8 inline-block border-0 bg-foreground p-[0.9rem] font-mono text-[0.58rem] text-background uppercase",
  submitError: "text-danger",
  result:
    "mt-12 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&>strong]:block [&>strong]:font-editorial [&>strong]:text-8xl [&>strong]:font-normal [&_a]:mt-8 [&_a]:inline-block [&_a]:bg-foreground [&_a]:p-[0.9rem] [&_a]:font-mono [&_a]:text-[0.58rem] [&_a]:text-background [&_a]:uppercase",
} as const;
