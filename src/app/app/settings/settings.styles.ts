export const settingsStyles = {
  page: "mx-auto max-w-[1250px]",
  loading:
    "mx-auto flex min-h-[calc(100svh-160px)] max-w-[1250px] flex-col items-start justify-center [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-normal",
  error:
    "mx-auto flex min-h-[calc(100svh-160px)] max-w-[1250px] flex-col items-start justify-center [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-normal [&_p]:text-muted-foreground [&_button]:border [&_button]:border-foreground [&_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button]:p-[0.8rem] [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:text-white [&_button]:normal-case",
  pageHeader:
    "grid grid-cols-[1fr_minmax(18rem,0.5fr)] gap-6 py-[clamp(3rem,7vw,7rem)] max-[750px]:grid-cols-1 [&>span]:col-span-full [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case max-[750px]:[&>span]:col-span-1 [&_h1]:m-0 [&_h1]:font-editorial [&_h1]:text-[clamp(2.75rem,5vw,5rem)] [&_h1]:leading-[0.88] [&_h1]:font-normal [&_h1]:tracking-normal [&_p]:m-0 [&_p]:self-end [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  settingsNav:
    "flex flex-wrap gap-2 rounded-2xl bg-surface/70 p-3 text-xs text-muted max-[520px]:items-start [&_a]:rounded-full [&_a]:bg-white/[0.04] [&_a]:px-4 [&_a]:py-2.5 [&_a]:font-medium [&_a]:text-muted-foreground [&_a:hover]:bg-white/[0.08] [&_a:hover]:text-white",
  formSection:
    "mt-5 grid grid-cols-[minmax(15rem,0.45fr)_minmax(0,1fr)] gap-[clamp(2rem,6vw,6rem)] rounded-3xl bg-surface/70 p-[clamp(2rem,5vw,4rem)] max-[750px]:grid-cols-1 [&_header>span]:text-xs [&_header>span]:font-semibold [&_header>span]:text-violet-300 [&_header_h2]:my-4 [&_header_h2]:text-[clamp(2rem,4vw,3.2rem)] [&_header_h2]:font-semibold [&_label]:grid [&_label]:gap-2.5 [&_label>span]:text-xs [&_label>span]:font-medium [&_label>span]:text-muted [&_input]:rounded-xl [&_input]:border [&_input]:border-white/[0.08] [&_input]:bg-white/[0.035] [&_input]:p-[0.8rem] [&_input]:text-inherit [&_input:disabled]:text-muted [&_select]:rounded-xl [&_select]:border [&_select]:border-white/[0.08] [&_select]:bg-white/[0.035] [&_select]:p-[0.8rem] [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/[0.08] [&_textarea]:bg-white/[0.035] [&_textarea]:p-[0.8rem] [&>button]:col-start-2 [&>button]:justify-self-end [&>button]:rounded-full [&>button]:border-0 [&>button]:bg-gradient-to-r [&>button]:from-violet-500 [&>button]:to-indigo-500 [&>button]:px-5 [&>button]:py-3 [&>button]:text-xs [&>button]:font-semibold [&>button]:text-white max-[750px]:[&>button]:col-start-1",
  formGrid: "grid grid-cols-2 gap-4 max-[520px]:grid-cols-1",
  fullField: "col-span-full max-[520px]:col-span-1",
  preferenceList:
    " [&_label]:flex [&_label]:items-center [&_label]:justify-between [&_label]:rounded-2xl [&_label]:bg-white/[0.03] [&_label]:px-4 [&_label]:py-4 [&_label>span]:grid [&_label>span]:gap-1.5 [&_strong]:text-[0.78rem] [&_strong]:font-[550] [&_small]:font-sans [&_small]:text-[0.58rem] [&_small]:tracking-normal [&_small]:text-muted [&_small]:normal-case",
  formError: "col-start-2 m-0 text-right text-[0.72rem] text-danger max-[750px]:col-start-1",
  formSuccess: "col-start-2 m-0 text-right text-[0.72rem] text-success max-[750px]:col-start-1",
  privacyPanel:
    "mt-5 rounded-3xl bg-surface/70 p-[clamp(2rem,5vw,4rem)] [&>header]:mb-8 [&>header]:grid [&>header]:grid-cols-[0.45fr_1fr] [&>header]:gap-8 max-[750px]:[&>header]:grid-cols-1 [&_h2]:m-0 [&_h2]:text-[clamp(2rem,4vw,3.2rem)] [&_h2]:font-semibold [&_header_p]:m-0 [&_header_p]:leading-[1.6] [&_header_p]:text-muted-foreground",
  securityPanel:
    "mt-5 rounded-3xl bg-surface/70 p-[clamp(2rem,5vw,4rem)] [&>header]:mb-8 [&>header]:grid [&>header]:grid-cols-[0.45fr_1fr] [&>header]:gap-8 max-[750px]:[&>header]:grid-cols-1 [&_h2]:m-0 [&_h2]:text-[clamp(2rem,4vw,3.2rem)] [&_h2]:font-semibold [&_header_p]:m-0 [&_header_p]:leading-[1.6] [&_header_p]:text-muted-foreground",
  privacyActions:
    "flex flex-wrap items-center justify-end gap-3 [&_button]:border [&_button]:border-foreground [&_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button]:p-[0.8rem] [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:text-white [&_button]:normal-case",
  securityActions:
    "flex flex-wrap items-center justify-end gap-3 [&_button]:border [&_button]:border-foreground [&_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button]:p-[0.8rem] [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:text-white [&_button]:normal-case",
  danger: "!border-danger !bg-transparent !text-danger",
  privacyStatus:
    "mt-8 [&_div]:grid [&_div]:grid-cols-2 [&_div]:gap-4 [&_div]:rounded-xl [&_div]:bg-white/[0.025] [&_div]:px-3 [&_div]:py-[0.85rem] [&_dt]:font-sans [&_dt]:text-[0.58rem] [&_dt]:tracking-normal [&_dt]:text-muted [&_dt]:normal-case [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.72rem]",
  securityList:
    "mt-8 [&>div]:grid [&>div]:grid-cols-2 [&>div]:gap-4 [&>div]:rounded-xl [&>div]:bg-white/[0.025] [&>div]:px-3 [&>div]:py-[0.85rem] [&_dt]:font-sans [&_dt]:text-[0.58rem] [&_dt]:tracking-normal [&_dt]:text-muted [&_dt]:normal-case [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.72rem]",
  dialogBackdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-[color-mix(in_srgb,var(--foreground)_72%,transparent)] p-4",
  backdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-[color-mix(in_srgb,var(--foreground)_72%,transparent)] p-4",
  dialog:
    "w-full max-w-160 rounded-2xl border border-white/[0.08] bg-surface/60 bg-background p-[clamp(1.5rem,4vw,3rem)] [&_header]:flex [&_header]:items-center [&_header]:justify-between [&_header]:border-b [&_header]:border-border [&_header]:pb-4 [&_header_span]:font-sans [&_header_span]:text-[0.58rem] [&_header_span]:tracking-normal [&_header_span]:text-muted [&_header_span]:normal-case [&_header_button]:border-0 [&_header_button]:bg-transparent [&_header_button]:text-[1.4rem] [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,4.5rem)] [&_h2]:leading-[0.95] [&_h2]:font-normal [&_h2]:tracking-normal [&>p]:leading-[1.6] [&>p]:text-muted-foreground [&_footer]:mt-8 [&_footer]:flex [&_footer]:justify-end [&_footer]:gap-2 [&_footer]:border-t [&_footer]:border-border [&_footer]:pt-4 [&_footer_button]:border [&_footer_button]:border-foreground [&_footer_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_footer_button]:p-[0.8rem] [&_footer_button]:font-sans [&_footer_button]:text-[0.58rem] [&_footer_button]:text-white [&_footer_button]:normal-case [&_footer_button:first-child]:bg-transparent [&_footer_button:first-child]:text-inherit",
} as const;
