import { vectraStyles } from "@/lib/vectra-styles";

export const leaderboardStyles = {
  page: vectraStyles.pageMedium,
  header: vectraStyles.pageHeader,
  filters:
    "mb-6 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-center gap-2 rounded-2xl border border-white/[0.06] bg-card/60 p-3 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] [&>span]:mr-auto [&>span]:shrink-0 [&>span]:px-2 [&>span]:text-xs [&>span]:font-bold [&>span]:text-white/50 [&_button]:shrink-0 [&_button]:rounded-full [&_button]:border [&_button]:border-transparent [&_button]:bg-white/[0.03] [&_button]:px-4 [&_button]:py-2.5 [&_button]:text-xs [&_button]:font-bold [&_button]:text-white/50 [&_button]:transition-all [&_button:hover]:bg-white/[0.07] [&_button:hover]:text-white [&_button[data-active=true]]:border-violet-400/20 [&_button[data-active=true]]:bg-gradient-to-r [&_button[data-active=true]]:from-[#C084FC]/30 [&_button[data-active=true]]:to-[#6366F1]/20 [&_button[data-active=true]]:text-violet-100 [&_button[data-active=true]]:shadow-[0_0_15px_rgba(139,92,246,0.2)]",
  loading:
    `${vectraStyles.card} grid gap-3 p-6 [&>span]:text-xs [&>span]:font-medium [&>span]:text-white/45 [&_div]:h-16 [&_div]:animate-pulse [&_div]:rounded-2xl [&_div]:bg-white/[0.05]`,
  error:
    `${vectraStyles.state} min-h-80 [&_button]:mt-5 [&_button]:rounded-full [&_button]:border [&_button]:border-white/10 [&_button]:bg-white/[0.04] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&_button:hover]:bg-white/[0.08]`,
  empty: `${vectraStyles.state} min-h-80`,
  rankingHeader:
    "!min-h-0 !rounded-none !border-0 !bg-transparent !px-4 !py-2 !shadow-none [&_span]:text-[10px] [&_span]:font-medium [&_span]:text-white/30",
  ranking:
    "m-0 grid list-none gap-3 rounded-3xl border border-white/[0.06] bg-card/60 p-[clamp(1rem,3vw,1.5rem)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] [&_li]:grid [&_li]:min-h-18 [&_li]:grid-cols-[0.32fr_1fr_0.5fr_0.5fr] [&_li]:items-center [&_li]:gap-4 [&_li]:rounded-2xl [&_li]:border [&_li]:border-white/[0.04] [&_li]:bg-white/[0.02] [&_li]:p-4 [&_li]:transition-all [&_li]:duration-200 [&_li:hover]:border-white/10 [&_li:hover]:bg-white/[0.04] max-[650px]:[&_li]:grid-cols-[0.3fr_1fr_0.55fr] max-[650px]:[&_li>span:last-child]:hidden [&_li>strong]:grid [&_li>strong]:size-10 [&_li>strong]:place-items-center [&_li>strong]:rounded-xl [&_li>strong]:bg-violet-500/10 [&_li>strong]:text-sm [&_li>strong]:font-semibold [&_li>strong]:text-violet-300 [&_li:nth-child(2)>strong]:bg-amber-400/10 [&_li:nth-child(2)>strong]:text-amber-300 [&_li:nth-child(3)>strong]:bg-white/[0.07] [&_li:nth-child(3)>strong]:text-white/75 [&_li:nth-child(4)>strong]:bg-orange-400/10 [&_li:nth-child(4)>strong]:text-orange-300 [&_li>span]:text-sm [&_li>span]:text-white/55 [&_li>span:nth-child(2)]:font-medium [&_li>span:nth-child(2)]:text-white/80",
} as const;
