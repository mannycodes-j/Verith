import { vectraStyles } from "@/lib/vectra-styles";

export const profileStyles = {
  page:
    `${vectraStyles.pageMedium} pb-12 [&>header]:mb-6 [&>header]:grid [&>header]:grid-cols-[auto_minmax(0,1fr)] [&>header]:items-end [&>header]:gap-6 [&>header]:py-2 max-[640px]:[&>header]:grid-cols-1 [&>header>span]:col-span-full [&>header>span]:inline-flex [&>header>span]:items-center [&>header>span]:gap-2 [&>header>span]:text-[10px] [&>header>span]:font-semibold [&>header>span]:uppercase [&>header>span]:tracking-[0.16em] [&>header>span]:text-violet-400 max-[640px]:[&>header>span]:col-span-1 [&_h1]:m-0 [&_h1]:text-4xl [&_h1]:leading-none [&_h1]:font-semibold [&_h1]:tracking-tighter md:[&_h1]:text-5xl [&>header_p]:mt-2 [&>header_p]:mb-0 [&>header_p]:text-sm [&>header_p]:text-white/40`,
  state:
    `${vectraStyles.pageMedium} ${vectraStyles.state} my-12 min-h-56`,
  error:
    `${vectraStyles.pageMedium} ${vectraStyles.state} my-12 [&_button]:mt-3 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-[#C084FC] [&_button]:to-[#6366F1] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white`,
  avatar:
    "flex size-[clamp(6rem,12vw,9rem)] shrink-0 items-center justify-center rounded-3xl border border-white/[0.08] [background:radial-gradient(circle_at_30%_20%,rgba(192,132,252,0.22),transparent_60%),#0f1012] bg-cover bg-center text-4xl font-semibold text-violet-200 shadow-[0_24px_60px_-24px_rgba(99,102,241,0.65),inset_0_0_0_1px_rgba(255,255,255,0.025)]",
  identity:
    `${vectraStyles.card} grid grid-cols-[minmax(0,1fr)_minmax(14rem,0.65fr)] gap-8 p-[clamp(1.5rem,4vw,3rem)] max-[700px]:grid-cols-1 [&_dl]:m-0 [&_dl]:grid [&_dl]:gap-2.5 [&_dl_div]:grid [&_dl_div]:grid-cols-[minmax(6rem,0.45fr)_minmax(0,1fr)] [&_dl_div]:items-center [&_dl_div]:gap-4 [&_dl_div]:rounded-2xl [&_dl_div]:border [&_dl_div]:border-white/[0.035] [&_dl_div]:bg-white/[0.02] [&_dl_div]:px-4 [&_dl_div]:py-3.5 [&_dt]:text-[10px] [&_dt]:font-semibold [&_dt]:uppercase [&_dt]:tracking-[0.12em] [&_dt]:text-white/35 [&_dd]:m-0 [&_dd]:min-w-0 [&_dd]:overflow-hidden [&_dd]:text-ellipsis [&_dd]:text-right [&_dd]:text-sm [&_dd]:text-white/70 [&_p]:m-0 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/50 [&_a]:col-start-2 [&_a]:justify-self-start [&_a]:rounded-full [&_a]:border [&_a]:border-white/10 [&_a]:bg-white/[0.04] [&_a]:px-5 [&_a]:py-3 [&_a]:text-sm [&_a]:font-medium [&_a]:transition-colors [&_a:hover]:bg-white/[0.08] max-[700px]:[&_a]:col-start-1`,
  upload:
    `${vectraStyles.card} mt-5 grid grid-cols-[minmax(14rem,0.7fr)_minmax(0,1fr)] gap-[clamp(2rem,6vw,5rem)] p-[clamp(1.5rem,4vw,3rem)] max-[700px]:grid-cols-1 [&>div:first-child>span]:text-[10px] [&>div:first-child>span]:font-semibold [&>div:first-child>span]:uppercase [&>div:first-child>span]:tracking-[0.14em] [&>div:first-child>span]:text-violet-400 [&_h2]:mt-4 [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/45 [&_label]:grid [&_label]:gap-2.5 [&_label>span]:text-xs [&_label>span]:font-medium [&_label>span]:text-white/45 [&_input]:w-full [&_input]:rounded-2xl [&_input]:border [&_input]:border-dashed [&_input]:border-violet-400/25 [&_input]:bg-violet-500/[0.055] [&_input]:p-4 [&_input]:text-sm [&_input]:transition-colors [&_input:hover]:bg-violet-500/10 [&_button]:mt-2 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-[#C084FC] [&_button]:to-[#6366F1] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white [&_button]:transition-all [&_button:not(:disabled):hover]:scale-[1.02] [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-40`,
  progress:
    "my-4 h-2 overflow-hidden rounded-full bg-white/[0.05] p-0.5 [&_span]:block [&_span]:h-full [&_span]:rounded-full [&_span]:bg-gradient-to-r [&_span]:from-[#C084FC] [&_span]:via-violet-500 [&_span]:to-[#6366F1] [&_span]:shadow-[0_0_18px_rgba(139,92,246,0.65)] [&_span]:transition-[width]",
  uploadError:
    "mt-3 rounded-xl border border-danger/20 bg-danger/[0.07] px-4 py-3 text-sm text-red-200!",
  success:
    "mt-3 rounded-xl border border-success/20 bg-success/[0.07] px-4 py-3 text-sm text-emerald-200!",
} as const;
