import { vectraStyles } from "@/lib/vectra-styles";

const panelHeader =
  "[&>header]:mb-8 [&>header]:grid [&>header]:grid-cols-[minmax(12rem,0.45fr)_minmax(0,1fr)] [&>header]:gap-8 max-[750px]:[&>header]:grid-cols-1 [&_h2]:m-0 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_header_p]:m-0 [&_header_p]:text-sm [&_header_p]:leading-relaxed [&_header_p]:text-white/45";

const actionButtons =
  "[&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-[#C084FC] [&_button]:to-[#6366F1] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white [&_button]:transition-all [&_button:not(:disabled):hover]:scale-[1.02] [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-40";

export const settingsStyles = {
  page: `${vectraStyles.pageMedium} pb-12`,
  loading:
    `${vectraStyles.pageMedium} ${vectraStyles.state} my-12 flex min-h-64 flex-col items-start justify-center`,
  error:
    `${vectraStyles.pageMedium} ${vectraStyles.state} my-12 flex min-h-64 flex-col items-start justify-center [&_button]:mt-3 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-[#C084FC] [&_button]:to-[#6366F1] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white`,
  pageHeader: vectraStyles.pageHeader,
  settingsNav:
    "mb-5 flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/[0.05] bg-card/60 p-2 text-xs shadow-[0_18px_45px_-30px_rgba(0,0,0,0.85)] max-[520px]:items-start [&_a]:rounded-full [&_a]:px-4 [&_a]:py-2.5 [&_a]:font-medium [&_a]:text-white/45 [&_a]:transition-colors [&_a:hover]:bg-white/[0.055] [&_a:hover]:text-white [&>span]:rounded-full [&>span]:bg-gradient-to-r [&>span]:from-violet-500/25 [&>span]:to-indigo-500/15 [&>span]:px-4 [&>span]:py-2.5 [&>span]:font-medium [&>span]:text-violet-200 [&>span]:shadow-[inset_0_0_0_1px_rgba(167,139,250,0.12)]",
  formSection:
    `${vectraStyles.card} mt-5 grid grid-cols-[minmax(13rem,0.42fr)_minmax(0,1fr)] gap-[clamp(2rem,6vw,5rem)] p-[clamp(1.5rem,4vw,3rem)] max-[750px]:grid-cols-1 [&_header>span]:text-[10px] [&_header>span]:font-semibold [&_header>span]:uppercase [&_header>span]:tracking-[0.14em] [&_header>span]:text-violet-400 [&_header_h2]:mt-4 [&_header_h2]:mb-0 [&_header_h2]:text-3xl [&_header_h2]:font-semibold [&_header_h2]:tracking-tight [&_label]:grid [&_label]:gap-2.5 [&_label>span]:text-xs [&_label>span]:font-medium [&_label>span]:text-white/45 [&_input]:min-h-11 [&_input]:w-full [&_input]:rounded-2xl [&_input]:border [&_input]:border-white/[0.055] [&_input]:bg-white/[0.025] [&_input]:px-4 [&_input]:outline-none [&_input]:transition-all [&_input:focus]:border-violet-400/40 [&_input:focus]:bg-white/[0.045] [&_input:focus]:shadow-[0_0_0_4px_rgba(139,92,246,0.08)] [&_input:disabled]:cursor-not-allowed [&_input:disabled]:text-white/25 [&_select]:min-h-11 [&_select]:w-full [&_select]:rounded-2xl [&_select]:border [&_select]:border-white/[0.055] [&_select]:bg-white/[0.025] [&_select]:px-4 [&_select]:outline-none [&_select]:transition-all [&_select:focus]:border-violet-400/40 [&_textarea]:min-h-28 [&_textarea]:resize-y [&_textarea]:rounded-2xl [&_textarea]:border [&_textarea]:border-white/[0.055] [&_textarea]:bg-white/[0.025] [&_textarea]:p-4 [&_textarea]:outline-none [&_textarea]:transition-all [&_textarea:focus]:border-violet-400/40 [&_textarea:focus]:bg-white/[0.045] [&_textarea:focus]:shadow-[0_0_0_4px_rgba(139,92,246,0.08)] [&>button]:col-start-2 [&>button]:justify-self-end [&>button]:rounded-full [&>button]:border-0 [&>button]:bg-gradient-to-r [&>button]:from-[#C084FC] [&>button]:to-[#6366F1] [&>button]:px-5 [&>button]:py-3 [&>button]:text-sm [&>button]:font-medium [&>button]:text-white [&>button]:transition-all [&>button:not(:disabled):hover]:scale-[1.02] [&>button:disabled]:cursor-not-allowed [&>button:disabled]:opacity-40 max-[750px]:[&>button]:col-start-1`,
  formGrid: "grid grid-cols-2 gap-4 max-[520px]:grid-cols-1",
  fullField: "col-span-full max-[520px]:col-span-1",
  preferenceList:
    "grid gap-2.5 [&_label]:flex [&_label]:items-center [&_label]:justify-between [&_label]:gap-5 [&_label]:rounded-2xl [&_label]:border [&_label]:border-white/[0.035] [&_label]:bg-white/[0.018] [&_label]:px-4 [&_label]:py-4 [&_label]:transition-colors [&_label:hover]:bg-white/[0.035] [&_label>span]:grid [&_label>span]:gap-1.5 [&_strong]:text-sm [&_strong]:font-medium [&_small]:text-xs [&_small]:leading-relaxed [&_small]:text-white/35 [&_input[type=checkbox]]:min-h-0 [&_input[type=checkbox]]:size-5 [&_input[type=checkbox]]:w-5 [&_input[type=checkbox]]:shrink-0 [&_input[type=checkbox]]:rounded-md [&_input[type=checkbox]]:p-0 [&_input[type=checkbox]]:accent-violet-500",
  formError:
    "col-start-2 m-0 rounded-xl border border-danger/20 bg-danger/[0.07] px-4 py-3 text-right text-xs text-red-200 max-[750px]:col-start-1",
  formSuccess:
    "col-start-2 m-0 rounded-xl border border-success/20 bg-success/[0.07] px-4 py-3 text-right text-xs text-emerald-200 max-[750px]:col-start-1",
  privacyPanel:
    `${vectraStyles.card} ${panelHeader} mt-5 p-[clamp(1.5rem,4vw,3rem)]`,
  securityPanel:
    `${vectraStyles.card} ${panelHeader} mt-5 p-[clamp(1.5rem,4vw,3rem)]`,
  privacyActions:
    `flex flex-wrap items-center justify-end gap-3 [&>span]:text-sm [&>span]:text-white/40 ${actionButtons}`,
  securityActions:
    `flex flex-wrap items-center justify-end gap-3 ${actionButtons}`,
  danger:
    "!border !border-danger/35 !bg-none !bg-danger/[0.06] !text-red-300 hover:!bg-danger/10",
  privacyStatus:
    "mt-8 grid gap-2.5 [&_div]:grid [&_div]:grid-cols-[minmax(7rem,0.4fr)_minmax(0,1fr)] [&_div]:items-center [&_div]:gap-4 [&_div]:rounded-2xl [&_div]:border [&_div]:border-white/[0.035] [&_div]:bg-white/[0.018] [&_div]:px-4 [&_div]:py-3.5 [&_dt]:text-[10px] [&_dt]:font-semibold [&_dt]:uppercase [&_dt]:tracking-[0.12em] [&_dt]:text-white/35 [&_dd]:m-0 [&_dd]:overflow-hidden [&_dd]:text-ellipsis [&_dd]:text-right [&_dd]:text-sm [&_dd]:text-white/65",
  securityList:
    "mt-8 grid gap-2.5 [&>div]:grid [&>div]:grid-cols-[minmax(7rem,0.4fr)_minmax(0,1fr)] [&>div]:items-center [&>div]:gap-4 [&>div]:rounded-2xl [&>div]:border [&>div]:border-white/[0.035] [&>div]:bg-white/[0.018] [&>div]:px-4 [&>div]:py-3.5 [&_dt]:text-[10px] [&_dt]:font-semibold [&_dt]:uppercase [&_dt]:tracking-[0.12em] [&_dt]:text-white/35 [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-sm [&_dd]:text-white/65",
  dialogBackdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md",
  backdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md",
  dialog:
    "w-full max-w-160 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0f1012] p-[clamp(1.5rem,4vw,2.5rem)] shadow-[0_35px_100px_rgba(0,0,0,0.75)] [&_header]:flex [&_header]:items-center [&_header]:justify-between [&_header]:gap-4 [&_header_span]:text-[10px] [&_header_span]:font-semibold [&_header_span]:uppercase [&_header_span]:tracking-[0.12em] [&_header_span]:text-violet-400 [&_header_button]:grid [&_header_button]:size-10 [&_header_button]:place-items-center [&_header_button]:rounded-full [&_header_button]:border-0 [&_header_button]:bg-white/[0.045] [&_header_button]:text-xl [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:font-semibold [&_h2]:tracking-tight [&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-white/50 [&_footer]:mt-8 [&_footer]:flex [&_footer]:flex-wrap [&_footer]:justify-end [&_footer]:gap-2 [&_footer_button]:rounded-full [&_footer_button]:border-0 [&_footer_button]:bg-gradient-to-r [&_footer_button]:from-[#C084FC] [&_footer_button]:to-[#6366F1] [&_footer_button]:px-5 [&_footer_button]:py-3 [&_footer_button]:text-sm [&_footer_button]:font-medium [&_footer_button]:text-white [&_footer_button]:transition-all [&_footer_button:disabled]:opacity-40 [&_footer_button:first-child]:border [&_footer_button:first-child]:border-white/10 [&_footer_button:first-child]:bg-none [&_footer_button:first-child]:bg-white/[0.04] [&_footer_button:first-child]:text-white/70",
} as const;
