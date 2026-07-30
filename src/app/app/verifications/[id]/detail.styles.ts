export const verificationDetailStyles = {
  page: "mx-auto max-w-[1500px]",
  header:
    "flex flex-wrap items-center gap-6  py-4 max-[700px]:items-start",
  caseIdentity:
    "mr-auto grid gap-1 [&_span]:font-sans [&_span]:text-[0.58rem] [&_span]:tracking-normal [&_span]:text-muted [&_span]:normal-case [&_strong]:font-sans [&_strong]:text-[0.68rem] [&_strong]:font-normal [&_strong]:normal-case",
  status:
    "grid gap-1 text-right [&_span]:font-sans [&_span]:text-[0.58rem] [&_span]:tracking-normal [&_span]:text-muted [&_span]:normal-case [&_strong]:font-sans [&_strong]:text-[0.68rem] [&_strong]:font-normal [&_strong]:normal-case",
  actions:
    "flex flex-wrap gap-2 [&_button]:border [&_button]:border-border-strong [&_button]:bg-transparent [&_button]:p-3 [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:normal-case [&_a]:border [&_a]:border-border-strong [&_a]:p-3 [&_a]:font-sans [&_a]:text-[0.58rem] [&_a]:normal-case [&_button:first-child]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button:first-child]:text-white",
  summary:
    "grid grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.45fr)] gap-[clamp(2rem,7vw,7rem)] py-[clamp(3rem,7vw,7rem)] max-[800px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:leading-[0.9] [&_h1]:font-normal [&_h1]:tracking-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_dl]:m-0 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:gap-4 [&_dl_div]:rounded-xl [&_dl_div]:bg-white/[0.025] [&_dl_div]:px-3 [&_dl_div]:py-3 [&_dt]:font-sans [&_dt]:text-[0.58rem] [&_dt]:text-muted [&_dt]:normal-case [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.7rem]",
  processingGrid:
    "grid grid-cols-[minmax(17rem,0.42fr)_minmax(0,1fr)] gap-5 max-[850px]:grid-cols-1",
  stagePanel: "rounded-3xl bg-gradient-to-br from-violet-500/12 to-indigo-500/[0.04] p-[clamp(1.5rem,4vw,3rem)]",
  eventPanel: "min-w-0 rounded-3xl bg-surface/70 p-[clamp(1.5rem,4vw,3rem)]",
  panelHeader:
    "mb-6 flex justify-between gap-4 font-sans text-[0.58rem] tracking-normal text-muted normal-case",
  progress:
    "mb-8 h-2 overflow-hidden rounded-full bg-white/[0.05] [&>span]:block [&>span]:h-full [&>span]:rounded-full [&>span]:bg-gradient-to-r [&>span]:from-violet-500 [&>span]:to-cyan-400 [&>span]:transition-[width]",
  stageRail:
    "m-0 list-none p-0 [&_li]:grid [&_li]:grid-cols-[2rem_1fr_auto] [&_li]:gap-3  [&_li]:py-4 [&_span]:font-sans [&_span]:text-[0.58rem] [&_span]:text-muted [&_span]:normal-case [&_small]:font-sans [&_small]:text-[0.58rem] [&_small]:text-muted [&_small]:normal-case [&_strong]:text-[0.72rem] [&_strong]:font-medium [&_li[data-state=pending]]:opacity-45 [&_li[data-state=active]_span]:text-accent [&_li[data-state=active]_small]:text-accent",
  events:
    "m-0 list-none  p-0 [&_li]:grid [&_li]:grid-cols-[minmax(8rem,0.25fr)_1fr_auto] [&_li]:gap-4 [&_li]:rounded-2xl [&_li]:bg-white/[0.03] [&_li]:p-4 [&_li]:py-4 max-[650px]:[&_li]:grid-cols-1 [&_span]:font-sans [&_span]:text-[0.58rem] [&_span]:text-muted [&_span]:normal-case [&_small]:font-sans [&_small]:text-[0.58rem] [&_small]:text-muted [&_small]:normal-case [&_strong]:text-sm [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground",
  eventError:
    "border border-danger p-4 [&_button]:border [&_button]:border-border-strong [&_button]:bg-transparent [&_button]:p-3 [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:normal-case",
  failure:
    "mt-px border border-danger p-[clamp(2rem,5vw,5rem)] [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground",
  complete:
    "mt-px border border-success p-[clamp(2rem,5vw,5rem)] [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-success [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,5rem)] [&_h2]:font-normal [&_p]:text-muted-foreground",
  loading:
    "mx-auto min-h-[70svh] max-w-[1500px] py-20 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:font-normal [&_div]:mt-px [&_div]:h-20 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  error:
    "mx-auto min-h-[70svh] max-w-[1500px] py-20 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:font-normal [&_p]:text-muted-foreground [&_button]:mr-2 [&_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button]:p-3 [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:text-white [&_button]:normal-case [&_a]:border [&_a]:border-border-strong [&_a]:p-3 [&_a]:font-sans [&_a]:text-[0.58rem] [&_a]:normal-case",
  dialogBackdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4",
  dialog:
    "w-full max-w-160 rounded-2xl border border-white/[0.08] bg-surface/60 bg-background p-[clamp(1.5rem,4vw,3rem)] [&_header]:flex [&_header]:items-center [&_header]:justify-between [&_header]:border-b [&_header]:border-border [&_header]:pb-4 [&_header_span]:font-sans [&_header_span]:text-[0.58rem] [&_header_span]:text-muted [&_header_span]:normal-case [&_header_button]:border-0 [&_header_button]:bg-transparent [&_header_button]:text-2xl [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,4.5rem)] [&_h2]:font-normal [&>p]:leading-[1.6] [&>p]:text-muted-foreground [&_footer]:mt-8 [&_footer]:flex [&_footer]:justify-end [&_footer]:gap-2 [&_footer]:border-t [&_footer]:border-border [&_footer]:pt-4 [&_footer_button]:border [&_footer_button]:border-border-strong [&_footer_button]:bg-transparent [&_footer_button]:p-3 [&_footer_button]:font-sans [&_footer_button]:text-[0.58rem] [&_footer_button]:normal-case [&_footer_button[data-danger=true]]:border-danger [&_footer_button[data-danger=true]]:text-danger",
  dialogError: "!text-danger",
} as const;
