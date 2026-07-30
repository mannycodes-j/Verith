export const authStyles = {
  shell:
    "relative grid min-h-svh grid-cols-[minmax(0,0.9fr)_minmax(28rem,0.7fr)] gap-5 overflow-hidden bg-background p-5 before:pointer-events-none before:absolute before:-top-32 before:left-[12%] before:size-[30rem] before:rounded-full before:bg-violet-500/15 before:blur-[120px] after:pointer-events-none after:absolute after:right-[5%] after:bottom-0 after:size-[24rem] after:rounded-full after:bg-cyan-500/10 after:blur-[110px] max-[900px]:grid-cols-1 max-[900px]:p-0",
  context:
    "relative z-10 flex min-h-[calc(100svh-2.5rem)] flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-500/15 via-surface to-cyan-500/[0.06] p-[clamp(1.5rem,4vw,4rem)] text-foreground max-[900px]:min-h-auto max-[900px]:rounded-none max-[900px]:pb-12 max-[560px]:p-5",
  wordmark: "relative flex items-center self-start text-[1.1rem] font-semibold tracking-[-0.03em]",
  contextBody: "relative my-auto max-w-200 max-[900px]:my-20 max-[560px]:my-16",
  eyebrow:
    "mb-7 inline-flex rounded-full bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-300",
  contextCopy:
    "mt-7 max-w-140 text-base leading-[1.65] text-muted-foreground max-[560px]:text-sm",
  workflow:
    "relative m-0 grid list-none gap-3 p-0 text-sm [&_li]:grid [&_li]:grid-cols-[2.3rem_1fr] [&_li]:items-center [&_li]:gap-3 [&_li]:rounded-2xl [&_li]:bg-white/[0.035] [&_li]:p-3.5 [&_li]:text-muted-foreground [&_li_span]:grid [&_li_span]:size-9 [&_li_span]:place-items-center [&_li_span]:rounded-xl [&_li_span]:bg-violet-400/10 [&_li_span]:text-xs [&_li_span]:font-bold [&_li_span]:text-violet-300 max-[560px]:[&_li:nth-child(n+2)]:hidden",
  formRegion:
    "relative z-10 flex min-h-[calc(100svh-2.5rem)] flex-col rounded-[2rem] border border-white/[0.07] bg-surface/90 px-[clamp(1.25rem,5vw,5rem)] py-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl max-[900px]:min-h-auto max-[900px]:rounded-none max-[560px]:p-5",
  formTopbar:
    "flex justify-between text-xs font-medium [&_a]:text-muted-foreground [&_a]:transition-colors [&_a:hover]:text-white [&_span]:inline-flex [&_span]:items-center [&_span]:gap-2 [&_span]:rounded-full [&_span]:bg-emerald-400/10 [&_span]:px-3 [&_span]:py-1.5 [&_span]:text-emerald-300 [&_span]:before:inline-block [&_span]:before:size-[6px] [&_span]:before:rounded-full [&_span]:before:bg-current max-[560px]:[&_span]:hidden",
  formContainer: "m-auto w-full max-w-120 py-16",
  formFooter: "m-0 text-center text-xs text-muted",
  formHeader:
    "[&>span]:inline-flex [&>span]:rounded-full [&>span]:bg-violet-400/10 [&>span]:px-3 [&>span]:py-1.5 [&>span]:text-xs [&>span]:font-semibold [&>span]:text-violet-300 [&>h2]:my-7 [&>h2]:mb-3 [&>h2]:text-[clamp(2.4rem,5vw,4rem)] [&>h2]:leading-[1] [&>h2]:font-semibold [&>h2]:tracking-[-0.055em] [&>p]:mb-9 [&>p]:leading-[1.55] [&>p]:text-muted-foreground",
  form: "grid gap-[1.25rem]",
  field:
    "grid gap-2 [&_label]:text-[0.74rem] [&_label]:font-semibold [&_input]:min-h-13 [&_input]:w-full [&_input]:rounded-2xl [&_input]:border [&_input]:border-white/[0.07] [&_input]:bg-white/[0.035] [&_input]:px-4 [&_input]:transition-all [&_input:hover]:border-white/15 [&_input:focus]:border-violet-400/50 [&_input:focus]:bg-white/[0.055] [&_input:focus]:shadow-[0_0_0_4px_rgba(139,92,246,0.08)] [&_input:focus]:outline-none [&_input[aria-invalid=true]]:border-danger",
  fieldError: "m-0 text-xs leading-[1.4] text-danger",
  fieldHint: "m-0 text-[0.72rem] leading-[1.4] text-muted",
  formMeta: "flex items-center justify-end text-[0.78rem] [&_a]:text-violet-300",
  submit:
    "flex min-h-13 items-center justify-between rounded-full border-0 bg-gradient-to-r from-violet-500 to-indigo-500 px-5 text-sm font-semibold text-white shadow-[0_15px_35px_-18px_rgba(139,92,246,0.95)] transition-transform hover:not-disabled:scale-[1.01] disabled:cursor-wait disabled:opacity-60 [&_span:last-child]:text-base",
  serverError: "rounded-2xl bg-red-400/10 p-4 text-[0.8rem] leading-normal text-red-200",
  notice: "rounded-2xl bg-amber-400/10 p-4 text-[0.8rem] leading-normal text-amber-200",
  successState:
    "rounded-2xl bg-emerald-400/10 p-4 text-[0.8rem] leading-normal [&_strong]:mb-2 [&_strong]:block [&_strong]:font-semibold [&_strong]:text-emerald-300 [&_p]:m-0",
  footerPrompt: "mt-7 text-center text-[0.8rem] text-muted-foreground [&_a]:font-semibold [&_a]:text-violet-300",
} as const;
