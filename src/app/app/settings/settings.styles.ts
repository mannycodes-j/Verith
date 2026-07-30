export const settingsStyles = {
  page: "mx-auto max-w-[1250px]",
  loading:
    "mx-auto flex min-h-[calc(100svh-160px)] max-w-[1250px] flex-col items-start justify-center [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,8vw,8rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-[-0.065em]",
  error:
    "mx-auto flex min-h-[calc(100svh-160px)] max-w-[1250px] flex-col items-start justify-center [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,8vw,8rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-[-0.065em] [&_p]:text-muted-foreground [&_button]:border [&_button]:border-foreground [&_button]:bg-foreground [&_button]:p-[0.8rem] [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:text-background [&_button]:uppercase",
  pageHeader:
    "grid grid-cols-[1fr_minmax(18rem,0.5fr)] gap-6 py-[clamp(3rem,7vw,7rem)] max-[750px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase max-[750px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,8vw,8rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-[-0.065em] [&_p]:m-0 [&_p]:self-end [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  settingsNav:
    "flex gap-6 border-y border-border-strong py-4 font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase max-[520px]:flex-col max-[520px]:items-start [&_a]:text-accent",
  formSection:
    "grid grid-cols-[minmax(15rem,0.45fr)_minmax(0,1fr)] gap-[clamp(2rem,6vw,6rem)] border-b border-border-strong py-[clamp(3rem,6vw,6rem)] max-[750px]:grid-cols-1 [&_header>span]:font-mono [&_header>span]:text-[0.58rem] [&_header>span]:tracking-[0.07em] [&_header>span]:text-muted [&_header>span]:uppercase [&_header_h2]:my-4 [&_header_h2]:font-editorial [&_header_h2]:text-[clamp(2.3rem,4vw,4rem)] [&_header_h2]:font-normal [&_header_h2]:tracking-[-0.05em] [&_label]:grid [&_label]:gap-2.5 [&_label>span]:font-mono [&_label>span]:text-[0.58rem] [&_label>span]:tracking-[0.07em] [&_label>span]:text-muted [&_label>span]:uppercase [&_input]:rounded-none [&_input]:border [&_input]:border-border-strong [&_input]:bg-surface [&_input]:p-[0.8rem] [&_input]:text-inherit [&_input:disabled]:text-muted [&_select]:rounded-none [&_select]:border [&_select]:border-border-strong [&_select]:bg-surface [&_select]:p-[0.8rem] [&_textarea]:rounded-none [&_textarea]:border [&_textarea]:border-border-strong [&_textarea]:bg-surface [&_textarea]:p-[0.8rem] [&>button]:col-start-2 [&>button]:justify-self-end [&>button]:border [&>button]:border-foreground [&>button]:bg-foreground [&>button]:p-[0.8rem] [&>button]:font-mono [&>button]:text-[0.58rem] [&>button]:text-background [&>button]:uppercase max-[750px]:[&>button]:col-start-1",
  formGrid: "grid grid-cols-2 gap-4 max-[520px]:grid-cols-1",
  fullField: "col-span-full max-[520px]:col-span-1",
  preferenceList:
    "border-t border-border [&_label]:flex [&_label]:items-center [&_label]:justify-between [&_label]:border-b [&_label]:border-border [&_label]:py-4 [&_label>span]:grid [&_label>span]:gap-1.5 [&_strong]:text-[0.78rem] [&_strong]:font-[550] [&_small]:font-mono [&_small]:text-[0.58rem] [&_small]:tracking-[0.07em] [&_small]:text-muted [&_small]:uppercase",
  formError: "col-start-2 m-0 text-right text-[0.72rem] text-danger max-[750px]:col-start-1",
  formSuccess: "col-start-2 m-0 text-right text-[0.72rem] text-success max-[750px]:col-start-1",
  privacyPanel:
    "border-b border-border-strong py-[clamp(2.5rem,5vw,5rem)] [&>header]:mb-8 [&>header]:grid [&>header]:grid-cols-[0.45fr_1fr] [&>header]:gap-8 max-[750px]:[&>header]:grid-cols-1 [&_h2]:m-0 [&_h2]:font-editorial [&_h2]:text-[clamp(2.3rem,4vw,4rem)] [&_h2]:font-normal [&_h2]:tracking-[-0.05em] [&_header_p]:m-0 [&_header_p]:leading-[1.6] [&_header_p]:text-muted-foreground",
  securityPanel:
    "border-b border-border-strong py-[clamp(2.5rem,5vw,5rem)] [&>header]:mb-8 [&>header]:grid [&>header]:grid-cols-[0.45fr_1fr] [&>header]:gap-8 max-[750px]:[&>header]:grid-cols-1 [&_h2]:m-0 [&_h2]:font-editorial [&_h2]:text-[clamp(2.3rem,4vw,4rem)] [&_h2]:font-normal [&_h2]:tracking-[-0.05em] [&_header_p]:m-0 [&_header_p]:leading-[1.6] [&_header_p]:text-muted-foreground",
  privacyActions:
    "flex flex-wrap items-center justify-end gap-3 [&_button]:border [&_button]:border-foreground [&_button]:bg-foreground [&_button]:p-[0.8rem] [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:text-background [&_button]:uppercase",
  securityActions:
    "flex flex-wrap items-center justify-end gap-3 [&_button]:border [&_button]:border-foreground [&_button]:bg-foreground [&_button]:p-[0.8rem] [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:text-background [&_button]:uppercase",
  danger: "!border-danger !bg-transparent !text-danger",
  privacyStatus:
    "mt-8 [&_div]:grid [&_div]:grid-cols-2 [&_div]:gap-4 [&_div]:border-t [&_div]:border-border [&_div]:py-[0.85rem] [&_dt]:font-mono [&_dt]:text-[0.58rem] [&_dt]:tracking-[0.07em] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.72rem]",
  securityList:
    "mt-8 [&>div]:grid [&>div]:grid-cols-2 [&>div]:gap-4 [&>div]:border-t [&>div]:border-border [&>div]:py-[0.85rem] [&_dt]:font-mono [&_dt]:text-[0.58rem] [&_dt]:tracking-[0.07em] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.72rem]",
  dialogBackdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-[color-mix(in_srgb,var(--foreground)_72%,transparent)] p-4",
  backdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-[color-mix(in_srgb,var(--foreground)_72%,transparent)] p-4",
  dialog:
    "w-full max-w-160 border border-border-strong bg-background p-[clamp(1.5rem,4vw,3rem)] [&_header]:flex [&_header]:items-center [&_header]:justify-between [&_header]:border-b [&_header]:border-border [&_header]:pb-4 [&_header_span]:font-mono [&_header_span]:text-[0.58rem] [&_header_span]:tracking-[0.07em] [&_header_span]:text-muted [&_header_span]:uppercase [&_header_button]:border-0 [&_header_button]:bg-transparent [&_header_button]:text-[1.4rem] [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,4.5rem)] [&_h2]:leading-[0.95] [&_h2]:font-normal [&_h2]:tracking-[-0.05em] [&>p]:leading-[1.6] [&>p]:text-muted-foreground [&_footer]:mt-8 [&_footer]:flex [&_footer]:justify-end [&_footer]:gap-2 [&_footer]:border-t [&_footer]:border-border [&_footer]:pt-4 [&_footer_button]:border [&_footer_button]:border-foreground [&_footer_button]:bg-foreground [&_footer_button]:p-[0.8rem] [&_footer_button]:font-mono [&_footer_button]:text-[0.58rem] [&_footer_button]:text-background [&_footer_button]:uppercase [&_footer_button:first-child]:bg-transparent [&_footer_button:first-child]:text-inherit",
} as const;
