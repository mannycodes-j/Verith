export const authStyles = {
  shell:
    "relative grid min-h-svh place-items-center overflow-hidden bg-[#08090A] px-5 py-10 before:pointer-events-none before:absolute before:-top-40 before:left-[8%] before:size-[34rem] before:rounded-full before:bg-violet-500/20 before:blur-[120px] after:pointer-events-none after:absolute after:right-[5%] after:bottom-[-12rem] after:size-[30rem] after:rounded-full after:bg-cyan-500/10 after:blur-[120px] lg:grid-cols-[minmax(0,0.85fr)_minmax(28rem,0.65fr)] lg:gap-6 lg:px-[max(2rem,calc((100vw-1180px)/2))]",
  context:
    "relative z-10 flex h-full min-h-[680px] w-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] [background:radial-gradient(circle_at_18%_0%,rgba(139,92,246,0.15),transparent_28rem),rgba(7,7,8,0.72)] p-7 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] lg:p-10 max-lg:order-2 max-lg:min-h-auto",
  wordmark:
    "relative flex items-center self-start text-[15px] font-medium tracking-tight [&_span:first-child]:!rounded-lg [&_span:first-child]:!bg-[#24183f] [&_span:first-child]:!text-violet-300",
  contextBody:
    "relative my-auto max-w-2xl py-16 [&_h1]:mt-0 [&_h1]:mb-0 [&_h1]:text-4xl [&_h1]:leading-[1.06] [&_h1]:font-semibold [&_h1]:tracking-tighter md:[&_h1]:text-6xl",
  eyebrow:
    "mb-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400 before:inline-flex before:size-1.5 before:rounded-full before:bg-violet-400 before:shadow-[0_0_18px_rgba(139,92,246,0.9)]",
  contextCopy:
    "mt-6 max-w-xl text-sm leading-relaxed text-white/50 md:text-base",
  workflow:
    "relative m-0 grid list-none gap-3 p-0 [&_li]:grid [&_li]:grid-cols-[2.3rem_1fr] [&_li]:items-center [&_li]:gap-3 [&_li]:rounded-2xl [&_li]:border [&_li]:border-white/[0.04] [&_li]:bg-white/[0.02] [&_li]:p-3.5 [&_li]:text-xs [&_li]:text-white/55 [&_li_span]:grid [&_li_span]:size-9 [&_li_span]:place-items-center [&_li_span]:rounded-xl [&_li_span]:bg-violet-500/10 [&_li_span]:text-[10px] [&_li_span]:font-semibold [&_li_span]:text-violet-300 max-sm:[&_li:nth-child(n+2)]:hidden",
  formRegion:
    "relative z-10 flex min-h-[680px] w-full flex-col rounded-3xl border border-white/[0.06] bg-card/80 px-[clamp(1.25rem,5vw,4rem)] py-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md max-lg:order-1 max-lg:min-h-auto",
  formTopbar:
    "flex justify-between text-xs font-medium [&_span]:inline-flex [&_span]:items-center [&_span]:gap-2 [&_span]:rounded-full [&_span]:border [&_span]:border-emerald-400/15 [&_span]:bg-emerald-400/[0.04] [&_span]:px-3 [&_span]:py-1.5 [&_span]:text-emerald-300 [&_span]:before:inline-block [&_span]:before:size-1.5 [&_span]:before:rounded-full [&_span]:before:bg-current max-sm:[&_span]:hidden",
  returnHome:
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-center text-xs font-medium text-white/70 transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60",
  formContainer: "m-auto w-full max-w-md py-14",
  formFooter: "m-0 text-center text-[11px] text-white/55",
  formHeader:
    "[&>span]:inline-flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.16em] [&>span]:text-violet-400 [&>span]:before:inline-flex [&>span]:before:size-1.5 [&>span]:before:rounded-full [&>span]:before:bg-violet-400 [&>h2]:mt-5 [&>h2]:mb-3 [&>h2]:text-3xl [&>h2]:leading-[1.1] [&>h2]:font-semibold [&>h2]:tracking-tighter md:[&>h2]:text-4xl [&>p]:mb-8 [&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-white/50",
  form: "grid gap-5",
  field:
    "grid gap-2 [&_label]:text-xs [&_label]:font-medium [&_label]:text-white/50 [&_input]:min-h-11 [&_input]:w-full [&_input]:rounded-2xl [&_input]:border [&_input]:border-white/[0.05] [&_input]:bg-white/[0.03] [&_input]:px-4 [&_input]:outline-none [&_input]:transition-all [&_input:hover]:border-white/10 [&_input:focus]:border-violet-400/40 [&_input:focus]:bg-white/[0.05] [&_input:focus]:shadow-[0_0_0_4px_rgba(139,92,246,0.08)] [&_input[aria-invalid=true]]:border-danger",
  passwordControl: "relative [&_input]:pr-12",
  passwordToggle:
    "absolute top-1/2 right-1.5 grid size-10 -translate-y-1/2 place-items-center rounded-xl border-0 bg-transparent text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60",
  passwordRequirements:
    "mt-1 rounded-2xl border border-violet-400/10 bg-violet-400/[0.045] p-4 [&>p]:m-0 [&>p]:text-xs [&>p]:font-medium [&>p]:text-white/75 [&_ul]:mt-3 [&_ul]:grid [&_ul]:list-none [&_ul]:gap-2 [&_ul]:p-0 [&_li]:flex [&_li]:items-center [&_li]:gap-2.5 [&_li]:text-[11px] [&_li]:leading-relaxed [&_li]:text-white/45 [&_li]:transition-colors [&_li[data-met=true]]:text-white/75 [&_li_svg]:shrink-0",
  fieldError: "m-0 text-[11px] leading-relaxed text-danger",
  fieldHint: "m-0 text-[11px] leading-relaxed text-white/55",
  formMeta: "flex items-center justify-end text-xs [&_a]:text-violet-300",
  submit:
    "flex min-h-11 items-center justify-center gap-2 rounded-full border-0 bg-gradient-to-r from-[#C084FC] to-[#6366F1] px-5 text-center text-sm font-medium text-white transition-all duration-200 hover:not-disabled:scale-[1.02] hover:not-disabled:shadow-[0_12px_28px_-10px_rgba(139,92,246,0.4)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-50",
  serverError:
    "rounded-2xl border border-danger/20 bg-danger/[0.06] p-4 text-xs leading-relaxed text-red-200",
  notice:
    "rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-4 text-xs leading-relaxed text-amber-200",
  successState:
    "rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4 text-xs leading-relaxed [&_strong]:mb-2 [&_strong]:block [&_strong]:font-medium [&_strong]:text-emerald-300 [&_p]:m-0",
  footerPrompt:
    "mt-7 text-center text-xs text-white/55 [&_a]:font-medium [&_a]:text-violet-300",
} as const;
