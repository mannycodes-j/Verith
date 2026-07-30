export const reportActionStyles = {
  actionsRegion: "col-span-full",
  actions: "flex flex-wrap gap-2 [&_button]:border [&_button]:border-border-strong [&_button]:bg-transparent [&_button]:p-3 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:uppercase",
  notice: "m-0 mt-3 text-[0.72rem] text-success",
  backdrop: "fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4",
  dialog:
    "max-h-[90svh] w-full max-w-180 overflow-y-auto border border-border-strong bg-background p-[clamp(1.5rem,4vw,3rem)] [&>header]:flex [&>header]:items-center [&>header]:justify-between [&>header]:border-b [&>header]:border-border [&>header]:pb-4 [&>header_span]:font-mono [&>header_span]:text-[0.58rem] [&>header_span]:text-muted [&>header_span]:uppercase [&>header_button]:border-0 [&>header_button]:bg-transparent [&>header_button]:text-2xl [&_h2]:font-editorial [&_h2]:text-[clamp(2.5rem,5vw,4.5rem)] [&_h2]:font-normal [&>p]:leading-[1.6] [&>p]:text-muted-foreground [&_fieldset]:m-0 [&_fieldset]:border-0 [&_fieldset]:p-0 [&_fieldset_label]:flex [&_fieldset_label]:gap-3 [&_fieldset_label]:border-t [&_fieldset_label]:border-border [&_fieldset_label]:py-4 [&_fieldset_label>span]:grid [&_fieldset_label>span]:gap-1 [&_fieldset_strong]:text-sm [&_fieldset_small]:text-[0.68rem] [&_fieldset_small]:text-muted-foreground [&_legend]:mb-3 [&_legend]:font-mono [&_legend]:text-[0.58rem] [&_legend]:text-muted [&_legend]:uppercase [&_footer]:mt-8 [&_footer]:flex [&_footer]:flex-wrap [&_footer]:justify-end [&_footer]:gap-2 [&_footer]:border-t [&_footer]:border-border [&_footer]:pt-4 [&_footer_button]:border [&_footer_button]:border-border-strong [&_footer_button]:bg-transparent [&_footer_button]:p-3 [&_footer_button]:font-mono [&_footer_button]:text-[0.58rem] [&_footer_button]:uppercase [&_footer_button:last-child]:bg-foreground [&_footer_button:last-child]:text-background",
  shareLink:
    "grid gap-2 border border-border-strong p-4 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&_code]:overflow-x-auto [&_code]:bg-surface-muted [&_code]:p-3 [&_code]:text-xs [&_button]:justify-self-start [&_button]:border [&_button]:border-border-strong [&_button]:bg-transparent [&_button]:p-3 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:uppercase",
  danger: "!border-danger !bg-transparent !text-danger",
  exportChoices:
    "grid grid-cols-2 gap-4 max-[600px]:grid-cols-1 [&_button]:grid [&_button]:gap-2 [&_button]:border [&_button]:border-border-strong [&_button]:bg-transparent [&_button]:p-6 [&_button]:text-left [&_strong]:font-editorial [&_strong]:text-2xl [&_strong]:font-normal [&_span]:text-sm [&_span]:text-muted-foreground",
  field:
    "grid gap-2 py-3 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&_select]:rounded-none [&_select]:border [&_select]:border-border-strong [&_select]:bg-surface [&_select]:p-3 [&_textarea]:min-h-28 [&_textarea]:rounded-none [&_textarea]:border [&_textarea]:border-border-strong [&_textarea]:bg-surface [&_textarea]:p-3 [&_small]:text-[0.68rem] [&_small]:text-muted-foreground",
  error: "text-[0.72rem] text-danger",
} as const;
