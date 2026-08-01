import { vectraStyles } from "@/lib/vectra-styles";

const panelHeader =
  "[&>header]:mb-8 [&>header]:grid [&>header]:grid-cols-[minmax(12rem,0.45fr)_minmax(0,1fr)] [&>header]:gap-8 max-[750px]:[&>header]:grid-cols-1 [&_h2]:m-0 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_header_p]:m-0 [&_header_p]:text-sm [&_header_p]:leading-relaxed [&_header_p]:text-white/45";

const actionButtons =
  "[&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-[#C084FC] [&_button]:to-[#6366F1] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white [&_button]:transition-all [&_button:not(:disabled):hover]:scale-[1.02] [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-40";

export const settingsStyles = {
  page: `${vectraStyles.page} pb-12`,
  loading:
    `${vectraStyles.pageMedium} ${vectraStyles.state} my-12 flex min-h-64 flex-col items-start justify-center`,
  error:
    `${vectraStyles.pageMedium} ${vectraStyles.state} my-12 flex min-h-64 flex-col items-start justify-center [&_button]:mt-3 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-[#C084FC] [&_button]:to-[#6366F1] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white`,
  pageHeader: vectraStyles.pageHeader,
  settingsNav:
    "mb-5 flex w-full items-center gap-1.5 overflow-x-auto overscroll-x-contain rounded-2xl border border-white/[0.05] bg-card/60 p-2 text-xs shadow-[0_18px_45px_-30px_rgba(0,0,0,0.85)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_a]:inline-flex [&_a]:min-h-10 [&_a]:shrink-0 [&_a]:items-center [&_a]:justify-center [&_a]:whitespace-nowrap [&_a]:rounded-full [&_a]:px-4 [&_a]:py-2.5 [&_a]:text-center [&_a]:font-medium [&_a]:text-white/45 [&_a]:transition-colors [&_a:hover]:bg-white/[0.055] [&_a:hover]:text-white [&_a[data-active=true]]:bg-gradient-to-r [&_a[data-active=true]]:from-violet-500/25 [&_a[data-active=true]]:to-indigo-500/15 [&_a[data-active=true]]:text-violet-200 [&_a[data-active=true]]:shadow-[inset_0_0_0_1px_rgba(167,139,250,0.12)]",
  overviewGrid:
    "grid gap-5 min-[1180px]:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]",
  overviewSection:
    "mt-0 min-[1180px]:grid-cols-1 min-[1180px]:gap-8 min-[1180px]:[&>button]:col-start-1 min-[1180px]:[&>p]:col-start-1",
  formSection:
    `${vectraStyles.card} mt-5 grid grid-cols-[minmax(13rem,0.42fr)_minmax(0,1fr)] gap-[clamp(2rem,6vw,5rem)] p-[clamp(1.5rem,4vw,3rem)] max-[750px]:grid-cols-1 [&_header>span]:text-[10px] [&_header>span]:font-semibold [&_header>span]:uppercase [&_header>span]:tracking-[0.14em] [&_header>span]:text-violet-400 [&_header_h2]:mt-4 [&_header_h2]:mb-0 [&_header_h2]:text-3xl [&_header_h2]:font-semibold [&_header_h2]:tracking-tight [&_label]:grid [&_label]:gap-2.5 [&_label>span]:text-xs [&_label>span]:font-medium [&_label>span]:text-white/45 [&_input]:min-h-11 [&_input]:w-full [&_input]:rounded-2xl [&_input]:border [&_input]:border-white/[0.055] [&_input]:bg-white/[0.025] [&_input]:px-4 [&_input]:outline-none [&_input]:transition-all [&_input:focus]:border-violet-400/40 [&_input:focus]:bg-white/[0.045] [&_input:focus]:shadow-[0_0_0_4px_rgba(139,92,246,0.08)] [&_input:disabled]:cursor-not-allowed [&_input:disabled]:text-white/25 [&_select]:min-h-11 [&_select]:w-full [&_select]:rounded-2xl [&_select]:border [&_select]:border-white/[0.055] [&_select]:bg-white/[0.025] [&_select]:px-4 [&_select]:outline-none [&_select]:transition-all [&_select:focus]:border-violet-400/40 [&_textarea]:min-h-28 [&_textarea]:resize-y [&_textarea]:rounded-2xl [&_textarea]:border [&_textarea]:border-white/[0.055] [&_textarea]:bg-white/[0.025] [&_textarea]:p-4 [&_textarea]:outline-none [&_textarea]:transition-all [&_textarea:focus]:border-violet-400/40 [&_textarea:focus]:bg-white/[0.045] [&_textarea:focus]:shadow-[0_0_0_4px_rgba(139,92,246,0.08)] [&>button]:col-start-2 [&>button]:justify-self-end [&>button]:rounded-full [&>button]:border-0 [&>button]:bg-gradient-to-r [&>button]:from-[#C084FC] [&>button]:to-[#6366F1] [&>button]:px-5 [&>button]:py-3 [&>button]:text-sm [&>button]:font-medium [&>button]:text-white [&>button]:transition-all [&>button:not(:disabled):hover]:scale-[1.02] [&>button:disabled]:cursor-not-allowed [&>button:disabled]:opacity-40 max-[750px]:[&>button]:col-start-1`,
  formGrid: "grid grid-cols-2 gap-4 max-[520px]:grid-cols-1",
  fullField: "col-span-full max-[520px]:col-span-1",
  preferenceList:
    "grid gap-2.5 [&_label]:flex [&_label]:items-center [&_label]:justify-between [&_label]:gap-5 [&_label]:rounded-2xl [&_label]:border [&_label]:border-white/[0.035] [&_label]:bg-white/[0.018] [&_label]:px-4 [&_label]:py-4 [&_label]:transition-colors [&_label:hover]:bg-white/[0.035] [&_label>span]:grid [&_label>span]:gap-1.5 [&_strong]:text-sm [&_strong]:font-medium [&_small]:text-xs [&_small]:leading-relaxed [&_small]:text-white/35 [&_input[type=checkbox]]:relative [&_input[type=checkbox]]:h-6 [&_input[type=checkbox]]:min-h-0 [&_input[type=checkbox]]:w-11 [&_input[type=checkbox]]:shrink-0 [&_input[type=checkbox]]:cursor-pointer [&_input[type=checkbox]]:appearance-none [&_input[type=checkbox]]:rounded-full [&_input[type=checkbox]]:border [&_input[type=checkbox]]:border-white/10 [&_input[type=checkbox]]:bg-white/10 [&_input[type=checkbox]]:p-0 [&_input[type=checkbox]]:transition-colors [&_input[type=checkbox]]:before:absolute [&_input[type=checkbox]]:before:top-0.5 [&_input[type=checkbox]]:before:left-0.5 [&_input[type=checkbox]]:before:size-5 [&_input[type=checkbox]]:before:rounded-full [&_input[type=checkbox]]:before:bg-white/70 [&_input[type=checkbox]]:before:shadow-sm [&_input[type=checkbox]]:before:transition-transform [&_input[type=checkbox]:checked]:border-violet-400/40 [&_input[type=checkbox]:checked]:bg-violet-500 [&_input[type=checkbox]:checked]:before:translate-x-5 [&_input[type=checkbox]:checked]:before:bg-white [&_input[type=checkbox]:focus-visible]:outline-none [&_input[type=checkbox]:focus-visible]:ring-4 [&_input[type=checkbox]:focus-visible]:ring-violet-400/15",
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
  sessionGrid:
    "mt-8 grid list-none gap-4 p-0 min-[900px]:grid-cols-2",
  sessionCard:
    "flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] shadow-[0_22px_55px_-40px_rgba(0,0,0,0.9)] transition-colors hover:border-white/10 [&[data-current=true]]:border-violet-400/20 [&[data-current=true]]:[background:radial-gradient(circle_at_0%_0%,rgba(139,92,246,0.13),transparent_20rem),rgba(255,255,255,0.02)]",
  sessionHeader:
    "grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/[0.05] p-5 max-[520px]:grid-cols-[42px_minmax(0,1fr)] [&>span:first-child]:grid [&>span:first-child]:size-10 [&>span:first-child]:place-items-center [&>span:first-child]:rounded-xl [&>span:first-child]:bg-violet-500/10 [&>span:first-child]:text-violet-300 [&>div]:grid [&>div]:min-w-0 [&>div]:gap-1 [&_strong]:truncate [&_strong]:text-sm [&_strong]:font-semibold [&_small]:truncate [&_small]:text-[11px] [&_small]:text-white/40 [&>em]:inline-flex [&>em]:items-center [&>em]:gap-1.5 [&>em]:rounded-full [&>em]:border [&>em]:border-violet-400/15 [&>em]:bg-violet-500/10 [&>em]:px-2.5 [&>em]:py-1.5 [&>em]:text-[10px] [&>em]:font-medium [&>em]:not-italic [&>em]:text-violet-200 max-[520px]:[&>em]:col-start-2 max-[520px]:[&>em]:w-fit",
  sessionDetails:
    "grid grid-cols-2 gap-px bg-white/[0.04] [&>div]:grid [&>div]:gap-1.5 [&>div]:bg-[#101113] [&>div]:p-4 [&_dt]:flex [&_dt]:items-center [&_dt]:gap-1.5 [&_dt]:text-[9px] [&_dt]:font-semibold [&_dt]:uppercase [&_dt]:tracking-[0.11em] [&_dt]:text-white/35 [&_dt_svg]:text-violet-300/70 [&_dd]:m-0 [&_dd]:text-xs [&_dd]:leading-relaxed [&_dd]:text-white/65",
  sessionFooter:
    "mt-auto flex items-center justify-between gap-4 p-4 max-[520px]:flex-col max-[520px]:items-stretch [&>span]:text-[10px] [&>span]:leading-relaxed [&>span]:text-white/35 [&>button]:inline-flex [&>button]:min-h-10 [&>button]:shrink-0 [&>button]:items-center [&>button]:justify-center [&>button]:gap-2 [&>button]:rounded-full [&>button]:border [&>button]:border-red-400/15 [&>button]:bg-red-400/[0.05] [&>button]:px-4 [&>button]:text-center [&>button]:text-[11px] [&>button]:font-medium [&>button]:text-red-200 [&>button]:transition-colors [&>button:hover]:border-red-400/25 [&>button:hover]:bg-red-400/10",
  dialogBackdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md",
  backdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md",
  dialog:
    "w-full max-w-160 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0f1012] p-[clamp(1.5rem,4vw,2.5rem)] shadow-[0_35px_100px_rgba(0,0,0,0.75)] [&_header]:flex [&_header]:items-center [&_header]:justify-between [&_header]:gap-4 [&_header_span]:text-[10px] [&_header_span]:font-semibold [&_header_span]:uppercase [&_header_span]:tracking-[0.12em] [&_header_span]:text-violet-400 [&_header_button]:grid [&_header_button]:size-10 [&_header_button]:place-items-center [&_header_button]:rounded-full [&_header_button]:border-0 [&_header_button]:bg-white/[0.045] [&_header_button]:text-xl [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:font-semibold [&_h2]:tracking-tight [&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-white/50 [&_footer]:mt-8 [&_footer]:flex [&_footer]:flex-wrap [&_footer]:justify-end [&_footer]:gap-2 [&_footer_button]:rounded-full [&_footer_button]:border-0 [&_footer_button]:bg-gradient-to-r [&_footer_button]:from-[#C084FC] [&_footer_button]:to-[#6366F1] [&_footer_button]:px-5 [&_footer_button]:py-3 [&_footer_button]:text-sm [&_footer_button]:font-medium [&_footer_button]:text-white [&_footer_button]:transition-all [&_footer_button:disabled]:opacity-40 [&_footer_button:first-child]:border [&_footer_button:first-child]:border-white/10 [&_footer_button:first-child]:bg-none [&_footer_button:first-child]:bg-white/[0.04] [&_footer_button:first-child]:text-white/70",
} as const;
