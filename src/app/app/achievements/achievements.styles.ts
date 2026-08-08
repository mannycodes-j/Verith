import { vectraStyles } from "@/lib/vectra-styles";

export const achievementStyles = {
  page: vectraStyles.pageMedium,
  header: vectraStyles.pageHeader,
  loading:
    `${vectraStyles.card} grid gap-3 p-6 [&>span]:text-xs [&>span]:font-medium [&>span]:text-white/45 [&_div]:h-24 [&_div]:animate-pulse [&_div]:rounded-2xl [&_div]:bg-white/[0.05]`,
  error:
    `${vectraStyles.state} min-h-80 [&_button]:mt-5 [&_button]:rounded-full [&_button]:border [&_button]:border-white/10 [&_button]:bg-white/[0.04] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&_button:hover]:bg-white/[0.08]`,
  profile:
    `${vectraStyles.card} grid gap-8 [background-image:radial-gradient(circle_at_top_left,rgba(139,92,246,0.28),transparent_55%),linear-gradient(135deg,rgba(139,92,246,0.1),rgba(99,102,241,0.04))] p-[clamp(1.5rem,4vw,3rem)] md:grid-cols-[0.45fr_1fr] md:items-stretch [&>div]:flex [&>div]:min-h-52 [&>div]:flex-col [&>div]:justify-between [&>div]:rounded-2xl [&>div]:border [&>div]:border-violet-400/15 [&>div]:bg-violet-500/[0.07] [&>div]:p-5 [&>div_span]:text-xs [&>div_span]:font-medium [&>div_span]:text-violet-200 [&>div_strong]:text-[clamp(4rem,10vw,7rem)] [&>div_strong]:leading-none [&>div_strong]:font-semibold [&>div_strong]:tracking-tighter [&_dl]:m-0 [&_dl]:grid [&_dl]:gap-3 sm:[&_dl]:grid-cols-2 [&_dl_div]:flex [&_dl_div]:min-h-20 [&_dl_div]:flex-col [&_dl_div]:justify-between [&_dl_div]:rounded-2xl [&_dl_div]:border [&_dl_div]:border-white/[0.04] [&_dl_div]:bg-white/[0.02] [&_dl_div]:p-4 [&_dt]:text-[11px] [&_dt]:text-white/35 [&_dd]:m-0 [&_dd]:text-lg [&_dd]:font-semibold [&_dd]:text-white/80`,
  badges:
    `${vectraStyles.card} mt-6 p-[clamp(1.25rem,3vw,2rem)] [&>p]:text-sm [&>p]:text-white/50 [&_ol]:m-0 [&_ol]:grid [&_ol]:list-none [&_ol]:gap-3 [&_ol]:p-0 [&_li]:grid [&_li]:grid-cols-[2.25rem_minmax(0,1fr)_auto] [&_li]:items-center [&_li]:gap-5 [&_li]:rounded-2xl [&_li]:border [&_li]:border-white/[0.04] [&_li]:bg-white/[0.02] [&_li]:p-5 [&_li]:transition-all [&_li:hover]:border-white/10 [&_li:hover]:bg-white/[0.04] [&_li[data-earned=false]]:opacity-55 max-[600px]:[&_li]:grid-cols-[2.25rem_minmax(0,1fr)] max-[600px]:[&_li>strong]:col-start-2 [&_li>span]:grid [&_li>span]:size-9 [&_li>span]:place-items-center [&_li>span]:rounded-xl [&_li>span]:bg-violet-500/10 [&_li>span]:text-xs [&_li>span]:font-semibold [&_li>span]:text-violet-300 [&_li>strong]:rounded-full [&_li>strong]:bg-white/[0.04] [&_li>strong]:px-3 [&_li>strong]:py-1.5 [&_li>strong]:text-[10px] [&_li>strong]:font-medium [&_li>strong]:text-white/40 [&_li[data-earned=true]>strong]:bg-emerald-400/10 [&_li[data-earned=true]>strong]:text-emerald-300 [&_small]:text-[11px] [&_small]:font-medium [&_small]:text-white/35 [&_h2]:my-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:m-0 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/50`,
  sectionHeader:
    "mb-5 flex items-center justify-between gap-4 [&_span]:text-xs [&_span]:font-medium [&_span]:text-white/40",
  badgeFilters:
    "mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4 [&_label]:grid [&_label]:gap-2 [&_span]:text-[10px] [&_span]:font-semibold [&_span]:uppercase [&_span]:tracking-[.12em] [&_span]:text-white/35 [&_input]:min-h-11 [&_input]:rounded-2xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-black/20 [&_input]:px-4 [&_input]:text-sm [&_input]:text-white [&_input]:outline-none [&_input:focus]:border-violet-400/40 [&_select]:min-h-11 [&_select]:rounded-2xl [&_select]:border [&_select]:border-white/10 [&_select]:bg-[#111] [&_select]:px-4 [&_select]:text-sm [&_select]:text-white [&_select]:outline-none [&_select:focus]:border-violet-400/40",
  transactions:
    `${vectraStyles.card} mt-6 p-[clamp(1.25rem,3vw,2rem)] [&>p]:text-sm [&>p]:text-white/50 [&_ol]:m-0 [&_ol]:grid [&_ol]:list-none [&_ol]:gap-2 [&_ol]:p-0 [&_li]:grid [&_li]:grid-cols-[minmax(0,1fr)_0.5fr_0.5fr_0.65fr] [&_li]:items-center [&_li]:gap-4 [&_li]:rounded-2xl [&_li]:border [&_li]:border-white/[0.04] [&_li]:bg-white/[0.02] [&_li]:p-4 [&_li]:transition-colors [&_li:hover]:bg-white/[0.04] max-[700px]:[&_li]:grid-cols-2 [&_span]:text-sm [&_span]:font-medium [&_span]:text-white/65 [&_small]:text-xs [&_small]:text-white/35 [&_strong]:text-sm [&_strong]:font-semibold [&_strong]:text-violet-200`,
  loadMore:
    `${vectraStyles.secondaryAction} mt-5`,
} as const;
