export const verifyStyles = {
  page: "mx-auto max-w-[1400px]",
  header:
    "grid grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)] gap-8 py-[clamp(3rem,6vw,6rem)] max-[760px]:grid-cols-1 [&>div]:self-end [&_span]:font-sans [&_span]:text-[0.6rem] [&_span]:tracking-normal [&_span]:text-accent [&_span]:normal-case [&_h1]:my-4 [&_h1]:text-[clamp(3rem,6vw,6rem)] [&_h1]:leading-[0.98] [&_h1]:font-semibold [&_h1]:tracking-normal [&_p]:m-0 [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  workspace:
    "grid grid-cols-[minmax(0,1fr)_minmax(18rem,0.35fr)] items-start gap-5 max-[850px]:grid-cols-1",
  composer: "min-w-0 overflow-hidden rounded-3xl bg-surface/75 shadow-[0_24px_70px_-45px_rgba(99,102,241,0.65)]",
  tabs:
    "flex gap-2 overflow-x-auto p-4 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-white/[0.035] [&_button]:px-5 [&_button]:py-3 [&_button]:text-xs [&_button]:font-medium [&_button]:text-muted-foreground",
  activeTab: "!bg-violet-500 !text-white shadow-[0_10px_25px_-14px_rgba(139,92,246,0.95)]",
  primaryInput:
    "grid gap-3 p-[clamp(1.5rem,4vw,4rem)] [&>label]:font-sans [&>label]:text-[0.58rem] [&>label]:tracking-normal [&>label]:text-muted [&>label]:normal-case [&_textarea]:min-h-70 [&_textarea]:resize-y [&>input]:min-h-15 [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-white/[0.035] [&_textarea]:p-4 [&_textarea]:text-inherit [&_textarea]:transition-all [&_textarea:focus]:border-amber-400/50 [&_textarea:focus]:bg-white/[0.05] [&>input]:rounded-xl [&>input]:border [&>input]:border-white/10 [&>input]:bg-white/[0.035] [&>input]:p-4",
  mediaState:
    "m-[clamp(1.5rem,4vw,4rem)] rounded-3xl border border-dashed border-border-strong bg-white/[0.025] p-[clamp(2rem,5vw,5rem)] [&>span]:text-sm [&>span]:text-muted [&_h2]:text-[clamp(2rem,4vw,3.5rem)] [&_h2]:font-semibold [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  fileInput:
    "relative grid cursor-pointer gap-3 rounded-3xl border border-dashed border-violet-400/40 bg-violet-500/[0.055] p-8 transition-colors hover:bg-violet-500/10 [&>span]:text-sm [&>span]:text-muted [&>strong]:text-2xl [&>strong]:font-semibold [&_input]:absolute [&_input]:inset-0 [&_input]:cursor-pointer [&_input]:opacity-0",
  uploadProgress:
    " p-6 [&>div:first-child]:flex [&>div:first-child]:justify-between [&>div:first-child]:gap-4 [&>div:first-child_span]:font-sans [&>div:first-child_span]:text-[0.58rem] [&>div:first-child_span]:text-muted [&>div:first-child_span]:normal-case [&>div:first-child_strong]:font-sans [&>div:first-child_strong]:text-[0.58rem] [&>div:last-child]:mt-3 [&>div:last-child]:h-px [&>div:last-child]:bg-border [&>div:last-child_span]:block [&>div:last-child_span]:h-full [&>div:last-child_span]:bg-accent",
  options: "grid grid-cols-2 gap-4  p-[clamp(1.5rem,4vw,4rem)] max-[600px]:grid-cols-1",
  field:
    "grid gap-2 [&_label]:font-sans [&_label]:text-[0.58rem] [&_label]:tracking-normal [&_label]:text-muted [&_label]:normal-case [&_input]:rounded-xl [&_input]:border [&_input]:border-border-strong [&_input]:bg-surface [&_input]:p-3 [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-border-strong [&_textarea]:bg-surface [&_textarea]:p-3 [&_select]:rounded-xl [&_select]:border [&_select]:border-border-strong [&_select]:bg-surface [&_select]:p-3",
  fieldHint: "m-0 text-[0.68rem] text-muted-foreground",
  fieldError: "m-0 text-[0.68rem] text-danger",
  errorState:
    "m-6 rounded-2xl border border-danger/30 bg-danger/5 p-6 [&_strong]:text-sm [&_strong]:text-danger [&_span]:text-sm [&_span]:text-muted [&_p]:text-sm [&_p]:text-muted-foreground",
  submitRow:
    "flex items-center justify-between gap-6 p-6 [&>span]:text-xs [&>span]:text-muted [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-violet-500 [&_button]:to-indigo-500 [&_button]:px-6 [&_button]:py-4 [&_button]:text-sm [&_button]:font-semibold [&_button]:text-white [&_button]:transition-transform [&_button:hover]:scale-[1.01] [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-50",
  guidance:
    "sticky top-24 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-violet-500/[0.06] p-[clamp(1.5rem,4vw,3rem)] [&_span]:text-xs [&_span]:font-semibold [&_span]:text-cyan-300 [&_h2]:text-[clamp(1.8rem,3vw,2.8rem)] [&_h2]:font-semibold [&_dl]:m-0 [&_dl]:grid [&_dl]:gap-2 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:gap-4 [&_dl_div]:rounded-xl [&_dl_div]:bg-white/[0.035] [&_dl_div]:px-3 [&_dl_div]:py-3 [&_dt]:text-xs [&_dt]:text-muted [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-xs",
  limit: "mt-8  pt-6 [&_p]:text-sm [&_p]:leading-[1.55] [&_p]:text-muted-foreground",
} as const;
