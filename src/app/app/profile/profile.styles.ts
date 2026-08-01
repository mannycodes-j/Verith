import { vectraStyles } from "@/lib/vectra-styles";

export const profileStyles = {
  page: `${vectraStyles.page} pb-12`,
  pageHeader: vectraStyles.pageHeader,
  state: `${vectraStyles.pageMedium} ${vectraStyles.state} my-12 min-h-56`,
  error:
    `${vectraStyles.pageMedium} ${vectraStyles.state} my-12 [&_button]:mt-3 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-[#C084FC] [&_button]:to-[#6366F1] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white`,
  hero:
    "relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[clamp(1.5rem,4vw,3.5rem)] overflow-hidden rounded-3xl border border-white/[0.07] [background:radial-gradient(circle_at_10%_0%,rgba(139,92,246,0.2),transparent_30rem),radial-gradient(circle_at_90%_100%,rgba(34,211,238,0.08),transparent_24rem),rgba(15,16,18,0.86)] p-[clamp(1.5rem,4vw,3.25rem)] shadow-[0_35px_80px_-35px_rgba(0,0,0,0.9)] before:pointer-events-none before:absolute before:-top-24 before:right-[18%] before:size-64 before:rounded-full before:border before:border-white/[0.035] max-[850px]:grid-cols-[auto_minmax(0,1fr)] max-[580px]:grid-cols-1",
  avatar:
    "relative flex size-[clamp(7rem,12vw,9rem)] shrink-0 items-center justify-center rounded-[2rem] border border-white/[0.12] bg-[#15131b] bg-cover bg-center bg-no-repeat text-4xl font-semibold text-violet-200 shadow-[0_26px_70px_-26px_rgba(139,92,246,0.85),inset_0_0_0_1px_rgba(255,255,255,0.035)] max-[580px]:size-28",
  heroIdentity:
    "relative min-w-0 [&>span]:inline-flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.15em] [&>span]:text-violet-300 [&_h2]:mt-3 [&_h2]:mb-0 [&_h2]:truncate [&_h2]:text-[clamp(2.2rem,5vw,4rem)] [&_h2]:leading-none [&_h2]:font-semibold [&_h2]:tracking-tighter",
  username: "mt-2 mb-0 text-sm font-medium text-white/40",
  bio: "mt-5 mb-0 max-w-2xl text-sm leading-6 text-white/55",
  heroActions:
    "mt-6 flex flex-wrap gap-2 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:justify-center [&_a]:gap-2 [&_a]:rounded-full [&_a]:border [&_a]:border-white/10 [&_a]:bg-white/[0.045] [&_a]:px-4 [&_a]:text-center [&_a]:text-xs [&_a]:font-medium [&_a]:text-white/75 [&_a]:transition-all [&_a:hover]:border-white/15 [&_a:hover]:bg-white/[0.08] [&_a:first-child]:border-0 [&_a:first-child]:bg-gradient-to-r [&_a:first-child]:from-[#C084FC] [&_a:first-child]:to-[#6366F1] [&_a:first-child]:text-white max-[440px]:[&_a]:w-full",
  heroStatus:
    "relative flex max-w-44 flex-col items-end gap-2 max-[850px]:col-span-2 max-[850px]:max-w-none max-[850px]:flex-row max-[850px]:items-center max-[580px]:col-span-1 max-[440px]:flex-col max-[440px]:items-stretch [&>span]:inline-flex [&>span]:w-fit [&>span]:items-center [&>span]:justify-center [&>span]:gap-2 [&>span]:rounded-full [&>span]:border [&>span]:border-white/[0.07] [&>span]:bg-white/[0.04] [&>span]:px-3.5 [&>span]:py-2 [&>span]:text-center [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.09em] [&>span]:text-white/60 [&>span[data-tone=positive]]:border-emerald-400/15 [&>span[data-tone=positive]]:bg-emerald-400/[0.07] [&>span[data-tone=positive]]:text-emerald-200 max-[440px]:[&>span]:w-full",
  contentGrid:
    "mt-5 grid grid-cols-[minmax(0,1.15fr)_minmax(21rem,0.85fr)] items-start gap-5 max-[980px]:grid-cols-1",
  details: `${vectraStyles.card} p-[clamp(1.4rem,3vw,2.25rem)]`,
  panelHeader:
    "flex items-start gap-3.5 [&>span]:grid [&>span]:size-10 [&>span]:shrink-0 [&>span]:place-items-center [&>span]:rounded-xl [&>span]:bg-violet-500/10 [&>span]:text-violet-300 [&>div]:min-w-0 [&_small]:text-[10px] [&_small]:font-semibold [&_small]:uppercase [&_small]:tracking-[0.13em] [&_small]:text-violet-300 [&_h2]:mt-2 [&_h2]:mb-0 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:mt-2 [&_p]:mb-0 [&_p]:text-xs [&_p]:leading-5 [&_p]:text-white/40",
  detailGrid:
    "mt-7 grid grid-cols-2 gap-2.5 max-[620px]:grid-cols-1 [&>div]:grid [&>div]:grid-cols-[36px_minmax(0,1fr)] [&>div]:items-center [&>div]:gap-3 [&>div]:rounded-2xl [&>div]:border [&>div]:border-white/[0.04] [&>div]:bg-white/[0.02] [&>div]:p-3.5 [&>div]:transition-colors [&>div:hover]:bg-white/[0.035] [&>div>span]:grid [&>div>span]:size-9 [&>div>span]:place-items-center [&>div>span]:rounded-xl [&>div>span]:bg-white/[0.04] [&>div>span]:text-violet-300 [&>div>div]:min-w-0 [&_dt]:text-[9px] [&_dt]:font-semibold [&_dt]:uppercase [&_dt]:tracking-[0.1em] [&_dt]:text-white/35 [&_dd]:mt-1 [&_dd]:ml-0 [&_dd]:overflow-hidden [&_dd]:text-ellipsis [&_dd]:text-xs [&_dd]:font-medium [&_dd]:text-white/70",
  upload:
    `${vectraStyles.card} p-[clamp(1.4rem,3vw,2.25rem)] [&>button]:mt-5 [&>button]:inline-flex [&>button]:min-h-11 [&>button]:w-full [&>button]:items-center [&>button]:justify-center [&>button]:gap-2 [&>button]:rounded-full [&>button]:border-0 [&>button]:bg-gradient-to-r [&>button]:from-[#C084FC] [&>button]:to-[#6366F1] [&>button]:px-5 [&>button]:text-center [&>button]:text-sm [&>button]:font-medium [&>button]:text-white [&>button]:transition-all [&>button:not(:disabled):hover]:scale-[1.01] [&>button:disabled]:cursor-not-allowed [&>button:disabled]:opacity-35`,
  photoPreview:
    "mt-7 flex items-center gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-3.5 [&>div]:flex [&>div]:size-12 [&>div]:shrink-0 [&>div]:items-center [&>div]:justify-center [&>div]:rounded-xl [&>div]:border [&>div]:border-white/[0.08] [&>div]:bg-violet-500/10 [&>div]:bg-cover [&>div]:bg-center [&>div]:text-sm [&>div]:font-semibold [&>div]:text-violet-200 [&>span]:grid [&>span]:min-w-0 [&>span]:gap-1 [&_strong]:truncate [&_strong]:text-xs [&_strong]:font-medium [&_small]:text-[10px] [&_small]:leading-4 [&_small]:text-white/35",
  filePicker:
    "relative mt-3.5 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-violet-400/20 bg-violet-500/[0.04] p-5 text-center transition-all hover:border-violet-400/35 hover:bg-violet-500/[0.075] [&:has(input:focus-visible)]:border-violet-400/45 [&:has(input:focus-visible)]:ring-4 [&:has(input:focus-visible)]:ring-violet-400/10 [&_input]:absolute [&_input]:inset-0 [&_input]:cursor-pointer [&_input]:opacity-0 [&>span]:grid [&>span]:size-10 [&>span]:place-items-center [&>span]:rounded-xl [&>span]:bg-violet-500/10 [&>span]:text-violet-300 [&>strong]:mt-3 [&>strong]:text-xs [&>strong]:font-medium [&>small]:mt-1.5 [&>small]:text-[10px] [&>small]:text-white/35",
  selectedFile:
    "mt-3 flex min-w-0 items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.045] p-3.5 text-emerald-200 [&>svg]:shrink-0 [&>span]:grid [&>span]:min-w-0 [&>span]:gap-1 [&_strong]:truncate [&_strong]:text-xs [&_strong]:font-medium [&_small]:text-[10px] [&_small]:text-emerald-100/50",
  progressGroup:
    "mt-4 [&>div:first-child]:mb-2 [&>div:first-child]:flex [&>div:first-child]:items-center [&>div:first-child]:justify-between [&>div:first-child]:text-[10px] [&>div:first-child]:text-white/40 [&>div:first-child_strong]:font-semibold [&>div:first-child_strong]:text-violet-200",
  progress:
    "h-2 overflow-hidden rounded-full bg-white/[0.05] p-0.5 [&_span]:block [&_span]:h-full [&_span]:rounded-full [&_span]:bg-gradient-to-r [&_span]:from-[#C084FC] [&_span]:via-violet-500 [&_span]:to-[#6366F1] [&_span]:shadow-[0_0_18px_rgba(139,92,246,0.65)] [&_span]:transition-[width]",
  uploadError:
    "mt-3 rounded-xl border border-danger/20 bg-danger/[0.07] px-4 py-3 text-sm text-red-200!",
  success:
    "mt-3 rounded-xl border border-success/20 bg-success/[0.07] px-4 py-3 text-sm text-emerald-200!",
} as const;
