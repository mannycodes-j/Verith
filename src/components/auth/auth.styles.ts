export const authStyles = {
  shell:
    "flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 py-10 [background:radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15)_0%,#0a0a0a_60rem)]",
  context: "hidden",
  wordmark: "hidden",
  contextBody: "hidden",
  eyebrow: "hidden",
  contextCopy: "hidden",
  workflow: "hidden",
  formRegion:
    "relative z-10 w-full max-w-[420px]",
  formTopbar: "hidden",
  returnHome: "hidden",
  formContainer: "w-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#111] p-8 shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)]",
  formFooter: "hidden",
  formHeader:
    "mb-8 text-center [&>span]:hidden [&>h2]:mb-2 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>p]:text-sm [&>p]:text-white/50",
  form: "grid gap-5",
  providerAuth: "mb-6 grid gap-3",
  providerButton: "flex min-h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium transition-colors hover:bg-white/10",
  providerStatus: "m-0 text-center text-[11px] leading-relaxed text-white/50",
  providerDivider:
    "relative my-2 flex items-center justify-center before:absolute before:inset-x-0 before:h-px before:bg-white/10 [&>span]:relative [&>span]:bg-[#111] [&>span]:px-3 [&>span]:text-[10px] [&>span]:font-medium [&>span]:uppercase [&>span]:tracking-[0.12em] [&>span]:text-white/40",
  field:
    "grid gap-2 [&_label]:text-xs [&_label]:font-medium [&_label]:text-white/50 [&_input]:min-h-11 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-white/5 [&_input]:px-4 [&_input]:text-sm [&_input]:outline-none [&_input]:transition-all [&_input:hover]:border-white/20 [&_input:focus]:border-white/30 [&_input:focus]:bg-white/10 [&_input:focus]:shadow-[0_0_0_4px_rgba(255,255,255,0.05)] [&_input[aria-invalid=true]]:border-danger",
  passwordControl: "relative [&_input]:pr-12",
  passwordToggle:
    "absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-lg border-0 bg-transparent text-white/45 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
  passwordRequirements:
    "mt-1 rounded-xl border border-white/10 bg-white/5 p-4 [&>p]:m-0 [&>p]:text-xs [&>p]:font-medium [&>p]:text-white/75 [&_ul]:mt-3 [&_ul]:grid [&_ul]:list-none [&_ul]:gap-2 [&_ul]:p-0 [&_li]:flex [&_li]:items-center [&_li]:gap-2.5 [&_li]:text-[11px] [&_li]:leading-relaxed [&_li]:text-white/45 [&_li]:transition-colors [&_li[data-met=true]]:text-white/75 [&_li_svg]:shrink-0",
  fieldError: "m-0 text-[11px] leading-relaxed text-danger",
  fieldHint: "m-0 text-[11px] leading-relaxed text-white/55",
  formMeta: "flex items-center justify-end text-xs [&_a]:text-white/70 [&_a:hover]:text-white",
  submit:
    "flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-gradient-to-b from-white to-[#e5e5e5] px-5 text-center text-sm font-medium text-black transition-transform hover:not-disabled:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-50 shadow-[0_4px_14px_0_rgba(255,255,255,0.15)]",
  serverError:
    "rounded-xl border border-danger/20 bg-danger/[0.06] p-4 text-xs leading-relaxed text-red-200",
  notice:
    "rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-4 text-xs leading-relaxed text-amber-200",
  successState:
    "rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4 text-xs leading-relaxed [&_strong]:mb-2 [&_strong]:block [&_strong]:font-medium [&_strong]:text-emerald-300 [&_p]:m-0",
  footerPrompt:
    "mt-6 text-center text-xs text-white/55 [&_a]:font-medium [&_a]:text-white/90 [&_a:hover]:text-white",
} as const;
