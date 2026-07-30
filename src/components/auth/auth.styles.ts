export const authStyles = {
  shell:
    "grid min-h-svh grid-cols-[minmax(0,1.1fr)_minmax(29rem,0.7fr)] bg-background max-[900px]:grid-cols-1",
  context:
    "relative flex min-h-svh flex-col overflow-hidden border-r border-white/[0.07] bg-[#050505] p-[clamp(1.5rem,4vw,4rem)] text-foreground before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_35%_45%,rgba(245,158,11,0.12),transparent_28rem)] max-[900px]:min-h-auto max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-white/[0.07] max-[900px]:pb-12 max-[560px]:p-5",
  wordmark:
    "relative self-start text-[1.1rem] font-semibold tracking-[-0.03em]",
  contextBody:
    "relative my-auto max-w-200 max-[900px]:my-20 max-[560px]:my-16",
  eyebrow:
    "mb-8 font-mono text-[0.62rem] tracking-[0.18em] text-accent uppercase",
  contextCopy:
    "mt-10 max-w-140 text-base leading-[1.65] text-muted-foreground max-[560px]:text-sm",
  workflow:
    "relative m-0 list-none p-0 font-mono text-[0.62rem] tracking-[0.12em] uppercase [&_li]:grid [&_li]:grid-cols-[3rem_1fr] [&_li]:gap-4 [&_li]:border-t [&_li]:border-white/[0.08] [&_li]:py-3.5 [&_li]:text-muted-foreground [&_li_span]:text-accent max-[560px]:[&_li:nth-child(n+2)]:hidden",
  formRegion:
    "flex min-h-svh flex-col bg-black/80 px-[clamp(1.25rem,5vw,5rem)] py-6 backdrop-blur-sm max-[900px]:min-h-auto max-[560px]:p-5",
  formTopbar:
    "flex justify-between font-mono text-[0.62rem] tracking-[0.09em] uppercase [&_span]:text-success [&_span]:before:mr-2 [&_span]:before:inline-block [&_span]:before:size-[5px] [&_span]:before:rounded-full [&_span]:before:bg-current max-[560px]:[&_span]:hidden",
  formContainer: "m-auto w-full max-w-120 py-16",
  formFooter:
    "m-0 font-mono text-[0.62rem] tracking-[0.09em] text-muted uppercase",
  formHeader:
    "border-t border-white/10 pt-4 [&>span]:font-mono [&>span]:text-[0.62rem] [&>span]:tracking-[0.16em] [&>span]:text-accent [&>span]:uppercase [&>h2]:my-8 [&>h2]:mb-4 [&>h2]:font-sans [&>h2]:text-[clamp(2.6rem,5vw,4.8rem)] [&>h2]:leading-[0.98] [&>h2]:font-semibold [&>h2]:tracking-[-0.05em] [&>p]:mb-10 [&>p]:leading-[1.55] [&>p]:text-muted-foreground",
  form: "grid gap-[1.35rem]",
  field:
    "grid gap-[0.55rem] [&_label]:font-mono [&_label]:text-[0.64rem] [&_label]:font-semibold [&_label]:tracking-[0.1em] [&_label]:uppercase [&_input]:min-h-12.5 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-white/10 [&_input]:bg-white/[0.035] [&_input]:px-3.5 [&_input]:transition-all [&_input:hover]:border-white/20 [&_input:focus]:border-focus [&_input:focus]:bg-white/[0.06] [&_input:focus]:shadow-[0_0_0_3px_rgba(245,158,11,0.08)] [&_input:focus]:outline-none [&_input[aria-invalid=true]]:border-danger",
  fieldError: "m-0 text-xs leading-[1.4] text-danger",
  fieldHint: "m-0 text-[0.72rem] leading-[1.4] text-muted",
  formMeta:
    "flex items-center justify-end text-[0.78rem] [&_a]:border-b [&_a]:border-current",
  submit:
    "flex min-h-13 items-center justify-between rounded-full border border-amber-300/30 bg-gradient-to-r from-[#ffebb1] to-[#ffc438] px-5 font-mono text-[0.67rem] font-bold tracking-[0.08em] text-[#18130a] uppercase shadow-[0_12px_32px_-16px_rgba(245,158,11,0.8)] transition-all hover:not-disabled:scale-[1.01] disabled:cursor-wait disabled:opacity-60 [&_span:last-child]:text-base",
  serverError:
    "border border-danger p-3.5 text-[0.8rem] leading-normal text-danger",
  notice:
    "border border-warning p-3.5 text-[0.8rem] leading-normal text-warning",
  successState:
    "border border-success p-3.5 text-[0.8rem] leading-normal [&_strong]:mb-2 [&_strong]:block [&_strong]:font-mono [&_strong]:text-[0.65rem] [&_strong]:tracking-[0.075em] [&_strong]:text-success [&_strong]:uppercase [&_p]:m-0",
  footerPrompt:
    "mt-7 text-center text-[0.8rem] text-muted-foreground [&_a]:border-b [&_a]:border-current",
} as const;
