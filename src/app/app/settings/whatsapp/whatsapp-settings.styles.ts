export const whatsappSettingsStyles = {
  page: "mx-auto max-w-[1200px]",
  header:
    "grid grid-cols-[1fr_minmax(18rem,0.5fr)] gap-6 py-[clamp(3rem,7vw,7rem)] max-[700px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case max-[700px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  settingsNav:
    "flex gap-5 rounded-2xl bg-surface/70 py-4 font-sans text-[0.58rem] tracking-normal text-muted normal-case max-[700px]:flex-col max-[700px]:items-start [&_a]:text-accent",
  status:
    "mt-12 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-surface/60 p-[clamp(1.5rem,4vw,4rem)] max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-8 [&_span]:font-sans [&_span]:text-[0.58rem] [&_span]:tracking-normal [&_span]:text-muted [&_span]:normal-case [&_h2]:mt-4 [&_h2]:mb-0 [&_h2]:font-editorial [&_h2]:text-[clamp(2.2rem,4vw,4rem)] [&_h2]:font-normal [&_h2]:tracking-normal [&_button]:border [&_button]:border-foreground [&_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button]:p-[0.8rem] [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:text-white [&_button]:normal-case",
  danger: "!border-danger !bg-transparent !text-danger",
  code:
    "mt-px bg-gradient-to-r from-violet-500 to-indigo-500 p-[clamp(2rem,6vw,6rem)] text-white [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_strong]:my-8 [&_strong]:block [&_strong]:font-sans [&_strong]:text-[clamp(3rem,8vw,7rem)] [&_strong]:tracking-normal [&_p]:leading-[1.6] [&_p]:text-[color-mix(in_srgb,var(--background)_72%,transparent)] [&_small]:font-sans [&_small]:text-[0.58rem] [&_small]:tracking-normal [&_small]:text-[color-mix(in_srgb,var(--background)_72%,transparent)] [&_small]:normal-case",
  explainer:
    "py-16 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_ol]:my-8 [&_ol]:list-none [&_ol]:p-0 [&_li]:grid [&_li]:grid-cols-[2rem_1fr] [&_li]:gap-4  [&_li]:py-4 [&_strong]:font-sans [&_strong]:text-[0.58rem] [&_strong]:text-accent",
  errorMessage: "text-danger",
  error:
    "[&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_button]:border [&_button]:border-foreground [&_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button]:p-[0.8rem] [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:text-white [&_button]:normal-case",
  backdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-[color-mix(in_srgb,var(--foreground)_72%,transparent)] p-4",
  dialog:
    "max-w-160 rounded-2xl border border-white/[0.08] bg-surface/60 bg-background p-[clamp(2rem,4vw,4rem)] [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h2]:mt-4 [&_h2]:mb-0 [&_h2]:font-editorial [&_h2]:text-[clamp(2.2rem,4vw,4rem)] [&_h2]:font-normal [&_h2]:tracking-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_footer]:mt-8 [&_footer]:flex [&_footer]:justify-end [&_footer]:gap-2 [&_footer]:border-t [&_footer]:border-border [&_footer]:pt-4 [&_button]:border [&_button]:border-foreground [&_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button]:p-[0.8rem] [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:text-white [&_button]:normal-case [&_footer_button:first-child]:bg-transparent [&_footer_button:first-child]:text-inherit",
} as const;
