export const profileStyles = {
  page:
    "mx-auto max-w-[1200px] [&>header]:grid [&>header]:grid-cols-[auto_1fr] [&>header]:items-end [&>header]:gap-8 [&>header]:py-[clamp(3rem,7vw,7rem)] [&>header>span]:col-span-full [&>header>span]:font-sans [&>header>span]:text-[0.58rem] [&>header>span]:tracking-normal [&>header>span]:text-muted [&>header>span]:normal-case [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-normal [&>header_p]:font-sans [&>header_p]:text-muted",
  state: "mx-auto max-w-[1200px] py-24",
  error:
    "mx-auto max-w-[1200px] py-24 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:font-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_button]:border-0 [&_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button]:p-3 [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:text-white [&_button]:normal-case",
  avatar:
    "flex h-[clamp(7rem,14vw,12rem)] w-[clamp(7rem,14vw,12rem)] items-center justify-center rounded-2xl border border-white/[0.08] bg-surface/60 bg-surface-muted bg-cover bg-center font-editorial text-[4rem]",
  identity:
    "grid grid-cols-[1fr_0.7fr] gap-12 rounded-2xl border border-white/[0.08] bg-surface/60 p-[clamp(1.5rem,4vw,4rem)] max-[700px]:grid-cols-1 [&_dl]:m-0 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:rounded-xl [&_dl_div]:bg-white/[0.025] [&_dl_div]:px-3 [&_dl_div]:py-3 [&_dt]:font-sans [&_dt]:text-[0.58rem] [&_dt]:tracking-normal [&_dt]:text-muted [&_dt]:normal-case [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.72rem] [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_a]:col-start-2 [&_a]:justify-self-start [&_a]:border [&_a]:border-border [&_a]:p-3 [&_a]:font-sans [&_a]:text-[0.58rem] [&_a]:normal-case max-[700px]:[&_a]:col-start-1",
  upload:
    "mt-5 grid grid-cols-[0.7fr_1fr] gap-16 rounded-3xl border border-white/[0.08] bg-surface/60 p-[clamp(2rem,5vw,5rem)] max-[700px]:grid-cols-1 [&_h2]:text-[clamp(2rem,4vw,3.5rem)] [&_h2]:font-semibold [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_label]:grid [&_label]:gap-3 [&_label>span]:text-sm [&_label>span]:text-muted [&_input]:rounded-xl [&_input]:border [&_input]:border-border [&_input]:bg-white/[0.03] [&_input]:p-3 [&_button]:rounded-xl [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-violet-500 [&_button]:to-indigo-500 [&_button]:p-3 [&_button]:text-sm [&_button]:text-white",
  progress:
    "my-4 h-2 overflow-hidden rounded-full bg-surface-muted [&_span]:block [&_span]:h-full [&_span]:rounded-full [&_span]:bg-accent",
  uploadError: "text-danger!",
  success: "text-success!",
} as const;
