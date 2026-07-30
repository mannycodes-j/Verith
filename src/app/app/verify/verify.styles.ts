export const verifyStyles = {
  page: "mx-auto max-w-[1400px]",
  header:
    "grid grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)] gap-8 py-[clamp(3rem,6vw,6rem)] max-[760px]:grid-cols-1 [&>div]:self-end [&_span]:font-mono [&_span]:text-[0.6rem] [&_span]:tracking-[0.16em] [&_span]:text-accent [&_span]:uppercase [&_h1]:my-4 [&_h1]:text-[clamp(3rem,6vw,6rem)] [&_h1]:leading-[0.98] [&_h1]:font-semibold [&_h1]:tracking-[-0.055em] [&_p]:m-0 [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  workspace:
    "grid grid-cols-[minmax(0,1fr)_minmax(18rem,0.35fr)] items-start overflow-hidden rounded-2xl border border-white/10 bg-[#050505] shadow-[0_30px_80px_-50px_rgba(245,158,11,0.35)] max-[850px]:grid-cols-1",
  composer: "min-w-0 border-r border-border-strong max-[850px]:border-r-0 max-[850px]:border-b",
  tabs:
    "flex overflow-x-auto border-b border-border-strong [&_button]:border-0 [&_button]:border-r [&_button]:border-border-strong [&_button]:bg-transparent [&_button]:px-5 [&_button]:py-4 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:tracking-[0.07em] [&_button]:text-muted [&_button]:uppercase",
  activeTab: "!bg-amber-400/[0.09] !text-accent shadow-[inset_0_-2px_0_#ffc438]",
  primaryInput:
    "grid gap-3 p-[clamp(1.5rem,4vw,4rem)] [&>label]:font-mono [&>label]:text-[0.58rem] [&>label]:tracking-[0.12em] [&>label]:text-muted [&>label]:uppercase [&_textarea]:min-h-70 [&_textarea]:resize-y [&>input]:min-h-15 [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-white/[0.035] [&_textarea]:p-4 [&_textarea]:text-inherit [&_textarea]:transition-all [&_textarea:focus]:border-amber-400/50 [&_textarea:focus]:bg-white/[0.05] [&>input]:rounded-xl [&>input]:border [&>input]:border-white/10 [&>input]:bg-white/[0.035] [&>input]:p-4",
  mediaState:
    "m-[clamp(1.5rem,4vw,4rem)] border border-dashed border-border-strong p-[clamp(2rem,5vw,5rem)] [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(2rem,4vw,4rem)] [&_h2]:font-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  fileInput:
    "relative grid cursor-pointer gap-3 border border-dashed border-border-strong p-8 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&>strong]:font-editorial [&>strong]:text-3xl [&>strong]:font-normal [&_input]:absolute [&_input]:inset-0 [&_input]:cursor-pointer [&_input]:opacity-0",
  uploadProgress:
    "border-t border-border-strong p-6 [&>div:first-child]:flex [&>div:first-child]:justify-between [&>div:first-child]:gap-4 [&>div:first-child_span]:font-mono [&>div:first-child_span]:text-[0.58rem] [&>div:first-child_span]:text-muted [&>div:first-child_span]:uppercase [&>div:first-child_strong]:font-mono [&>div:first-child_strong]:text-[0.58rem] [&>div:last-child]:mt-3 [&>div:last-child]:h-px [&>div:last-child]:bg-border [&>div:last-child_span]:block [&>div:last-child_span]:h-full [&>div:last-child_span]:bg-accent",
  options: "grid grid-cols-2 gap-4 border-t border-border-strong p-[clamp(1.5rem,4vw,4rem)] max-[600px]:grid-cols-1",
  field:
    "grid gap-2 [&_label]:font-mono [&_label]:text-[0.58rem] [&_label]:tracking-[0.07em] [&_label]:text-muted [&_label]:uppercase [&_input]:rounded-none [&_input]:border [&_input]:border-border-strong [&_input]:bg-surface [&_input]:p-3 [&_textarea]:rounded-none [&_textarea]:border [&_textarea]:border-border-strong [&_textarea]:bg-surface [&_textarea]:p-3 [&_select]:rounded-none [&_select]:border [&_select]:border-border-strong [&_select]:bg-surface [&_select]:p-3",
  fieldHint: "m-0 text-[0.68rem] text-muted-foreground",
  fieldError: "m-0 text-[0.68rem] text-danger",
  errorState:
    "border-t border-danger p-6 [&_strong]:font-mono [&_strong]:text-[0.58rem] [&_strong]:text-danger [&_strong]:uppercase [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:text-muted [&_span]:uppercase [&_p]:text-sm [&_p]:text-muted-foreground",
  submitRow:
    "flex items-center justify-between gap-6 border-t border-border-strong p-6 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_button]:rounded-full [&_button]:border [&_button]:border-amber-300/30 [&_button]:bg-gradient-to-r [&_button]:from-[#ffebb1] [&_button]:to-[#ffc438] [&_button]:p-4 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:font-semibold [&_button]:text-[#18130a] [&_button]:uppercase [&_button]:transition-transform [&_button:hover]:scale-[1.01] [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-50",
  guidance:
    "sticky top-17.5 p-[clamp(1.5rem,4vw,4rem)] [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:tracking-[0.07em] [&_span]:text-muted [&_span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(2rem,3vw,3.5rem)] [&_h2]:font-normal [&_dl]:m-0 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:gap-4 [&_dl_div]:border-t [&_dl_div]:border-border [&_dl_div]:py-3 [&_dt]:font-mono [&_dt]:text-[0.58rem] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.7rem]",
  limit: "mt-8 border-t border-border pt-6 [&_p]:text-sm [&_p]:leading-[1.55] [&_p]:text-muted-foreground",
} as const;
