import { vectraStyles as ui } from "@/lib/vectra-styles";

export const verificationHistoryStyles = {
  page: ui.pageMedium,
  header: ui.pageHeader,
  filters:
    `${ui.card} flex flex-wrap items-end gap-4 p-5 [&_label]:grid [&_label]:gap-2 [&_label]:text-xs [&_label]:font-medium [&_label]:text-white/40 [&_select]:min-w-40 [&_select]:rounded-full [&_select]:border [&_select]:border-white/10 [&_select]:bg-white/[0.04] [&_select]:px-4 [&_select]:py-3 [&_a]:ml-auto [&_a]:rounded-full [&_a]:bg-gradient-to-r [&_a]:from-[#C084FC] [&_a]:to-[#6366F1] [&_a]:px-5 [&_a]:py-3 [&_a]:text-xs [&_a]:font-medium [&_a]:text-white`,
  list: "mt-6 grid gap-3",
  listHeader: "hidden",
  record:
    "grid grid-cols-[minmax(0,1.5fr)_0.6fr_0.7fr_0.7fr_auto] items-center gap-5 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/[0.04] max-md:grid-cols-[1fr_auto] [&>div]:min-w-0 [&>div>span]:block [&>div>span]:font-mono [&>div>span]:text-[10px] [&>div>span]:text-white/30 [&_strong]:mt-1.5 [&_strong]:block [&_strong]:truncate [&_strong]:text-sm [&_strong]:font-medium [&>span]:text-xs [&>span]:text-white/40 max-md:[&>span]:hidden [&>a]:rounded-full [&>a]:border [&>a]:border-white/10 [&>a]:bg-white/[0.04] [&>a]:px-4 [&>a]:py-2 [&>a]:text-xs [&>a]:font-medium [&>a]:text-violet-300",
  loading:
    "grid gap-3 py-8 [&>span]:text-[10px] [&>span]:uppercase [&>span]:tracking-[0.14em] [&>span]:text-white/30 [&>div]:h-20 [&>div]:animate-pulse [&>div]:rounded-2xl [&>div]:bg-white/[0.04]",
  error:
    `${ui.state} [&_button]:rounded-full [&_button]:border [&_button]:border-white/10 [&_button]:bg-white/[0.04] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium`,
  empty:
    `${ui.state} [&_a]:inline-flex [&_a]:rounded-full [&_a]:border-0 [&_a]:bg-gradient-to-r [&_a]:from-[#C084FC] [&_a]:to-[#6366F1] [&_a]:px-5 [&_a]:py-3 [&_a]:text-sm [&_a]:font-medium [&_a]:text-white`,
} as const;
