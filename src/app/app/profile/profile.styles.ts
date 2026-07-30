export const profileStyles = {
  page:
    "mx-auto max-w-[1200px] [&>header]:grid [&>header]:grid-cols-[auto_1fr] [&>header]:items-end [&>header]:gap-8 [&>header]:py-[clamp(3rem,7vw,7rem)] [&>header>span]:col-span-full [&>header>span]:font-mono [&>header>span]:text-[0.58rem] [&>header>span]:tracking-[0.07em] [&>header>span]:text-muted [&>header>span]:uppercase [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,8vw,8rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-[-0.065em] [&>header_p]:font-mono [&>header_p]:text-muted",
  state: "mx-auto max-w-[1200px] py-24",
  error:
    "mx-auto max-w-[1200px] py-24 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,8vw,8rem)] [&_h1]:font-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_button]:border-0 [&_button]:bg-foreground [&_button]:p-3 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:text-background [&_button]:uppercase",
  avatar:
    "flex h-[clamp(7rem,14vw,12rem)] w-[clamp(7rem,14vw,12rem)] items-center justify-center border border-border-strong bg-surface-muted bg-cover bg-center font-editorial text-[4rem]",
  identity:
    "grid grid-cols-[1fr_0.7fr] gap-12 border border-border-strong p-[clamp(1.5rem,4vw,4rem)] max-[700px]:grid-cols-1 [&_dl]:m-0 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:border-t [&_dl_div]:border-border [&_dl_div]:py-3 [&_dt]:font-mono [&_dt]:text-[0.58rem] [&_dt]:tracking-[0.07em] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.72rem] [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_a]:col-start-2 [&_a]:justify-self-start [&_a]:border [&_a]:border-border [&_a]:p-3 [&_a]:font-mono [&_a]:text-[0.58rem] [&_a]:uppercase max-[700px]:[&_a]:col-start-1",
  upload:
    "grid grid-cols-[0.7fr_1fr] gap-16 border border-t-0 border-border-strong p-[clamp(2rem,5vw,5rem)] max-[700px]:grid-cols-1 [&_h2]:font-editorial [&_h2]:text-[clamp(2.3rem,4vw,4rem)] [&_h2]:font-normal [&_h2]:tracking-[-0.05em] [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_label]:grid [&_label]:gap-3 [&_label>span]:font-mono [&_label>span]:text-[0.58rem] [&_label>span]:tracking-[0.07em] [&_label>span]:text-muted [&_label>span]:uppercase [&_input]:border [&_input]:border-border [&_input]:p-3 [&_button]:border-0 [&_button]:bg-foreground [&_button]:p-3 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:text-background [&_button]:uppercase",
  progress:
    "my-4 h-1 bg-surface-muted [&_span]:block [&_span]:h-full [&_span]:bg-accent",
  uploadError: "text-danger!",
  success: "text-success!",
} as const;
