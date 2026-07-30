export const authStyles = {
  shell:
    "grid min-h-svh grid-cols-[minmax(0,1.1fr)_minmax(29rem,0.7fr)] bg-background max-[900px]:grid-cols-1",
  context:
    "flex min-h-svh flex-col bg-[#1a1916] p-[clamp(1.5rem,4vw,4rem)] text-[#f3f0e7] max-[900px]:min-h-auto max-[900px]:pb-12 max-[560px]:p-5",
  wordmark:
    "self-start text-[1.1rem] font-extrabold tracking-[-0.055em] uppercase",
  contextBody:
    "my-auto max-w-200 max-[900px]:my-20 max-[560px]:my-16",
  eyebrow:
    "mb-8 font-mono text-[0.62rem] tracking-[0.09em] text-[#b9b3a6] uppercase",
  contextCopy:
    "mt-10 max-w-140 text-base leading-[1.65] text-[#b9b3a6] max-[560px]:text-sm",
  workflow:
    "m-0 list-none p-0 font-mono text-[0.62rem] tracking-[0.09em] uppercase [&_li]:grid [&_li]:grid-cols-[3rem_1fr] [&_li]:gap-4 [&_li]:border-t [&_li]:border-[#4a4740] [&_li]:py-3.5 [&_li_span]:text-[#db7443] max-[560px]:[&_li:nth-child(n+2)]:hidden",
  formRegion:
    "flex min-h-svh flex-col px-[clamp(1.25rem,5vw,5rem)] py-6 max-[900px]:min-h-auto max-[560px]:p-5",
  formTopbar:
    "flex justify-between font-mono text-[0.62rem] tracking-[0.09em] uppercase [&_span]:text-success [&_span]:before:mr-2 [&_span]:before:inline-block [&_span]:before:size-[5px] [&_span]:before:rounded-full [&_span]:before:bg-current max-[560px]:[&_span]:hidden",
  formContainer: "m-auto w-full max-w-120 py-16",
  formFooter:
    "m-0 font-mono text-[0.62rem] tracking-[0.09em] text-muted uppercase",
  formHeader:
    "border-t border-border-strong pt-4 [&>span]:font-mono [&>span]:text-[0.62rem] [&>span]:tracking-[0.09em] [&>span]:text-accent [&>span]:uppercase [&>h2]:my-8 [&>h2]:mb-4 [&>h2]:font-editorial [&>h2]:text-[clamp(2.6rem,5vw,4.8rem)] [&>h2]:leading-[0.95] [&>h2]:font-normal [&>h2]:tracking-[-0.055em] [&>p]:mb-10 [&>p]:leading-[1.55] [&>p]:text-muted-foreground",
  form: "grid gap-[1.35rem]",
  field:
    "grid gap-[0.55rem] [&_label]:font-mono [&_label]:text-[0.64rem] [&_label]:font-semibold [&_label]:tracking-[0.075em] [&_label]:uppercase [&_input]:min-h-12.5 [&_input]:w-full [&_input]:rounded-sm [&_input]:border [&_input]:border-border [&_input]:bg-surface [&_input]:px-3.5 [&_input]:transition-colors [&_input:hover]:border-border-strong [&_input:focus]:border-focus [&_input:focus]:bg-surface-elevated [&_input:focus]:outline-none [&_input[aria-invalid=true]]:border-danger",
  fieldError: "m-0 text-xs leading-[1.4] text-danger",
  fieldHint: "m-0 text-[0.72rem] leading-[1.4] text-muted",
  formMeta:
    "flex items-center justify-end text-[0.78rem] [&_a]:border-b [&_a]:border-current",
  submit:
    "flex min-h-13 items-center justify-between rounded-sm border border-foreground bg-foreground px-4 font-mono text-[0.67rem] font-bold tracking-[0.08em] text-background uppercase transition-colors hover:not-disabled:border-accent hover:not-disabled:bg-accent hover:not-disabled:text-accent-foreground disabled:cursor-wait disabled:opacity-60 [&_span:last-child]:text-base",
  serverError:
    "border border-danger p-3.5 text-[0.8rem] leading-normal text-danger",
  notice:
    "border border-warning p-3.5 text-[0.8rem] leading-normal text-warning",
  successState:
    "border border-success p-3.5 text-[0.8rem] leading-normal [&_strong]:mb-2 [&_strong]:block [&_strong]:font-mono [&_strong]:text-[0.65rem] [&_strong]:tracking-[0.075em] [&_strong]:text-success [&_strong]:uppercase [&_p]:m-0",
  footerPrompt:
    "mt-7 text-center text-[0.8rem] text-muted-foreground [&_a]:border-b [&_a]:border-current",
} as const;
