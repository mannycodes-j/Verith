export const appShellStyles = {
  shell:
    "grid min-h-svh grid-cols-[260px_minmax(0,1fr)] gap-5 bg-transparent p-5 max-[1120px]:grid-cols-[78px_minmax(0,1fr)] max-[767px]:block max-[767px]:p-0",
  sidebar:
    "sticky top-5 flex h-[calc(100svh-2.5rem)] flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-surface/90 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl max-[767px]:hidden",
  sidebarHeader:
    "grid gap-2 px-5 py-6 max-[1120px]:place-items-center max-[1120px]:px-2 [&>span]:text-xs [&>span]:text-muted-foreground max-[1120px]:[&>span]:hidden",
  wordmark:
    "flex items-center gap-2.5 text-[1.05rem] font-semibold tracking-[-0.03em] [&>span]:flex [&>span]:size-9 [&>span]:shrink-0 [&>span]:items-center [&>span]:justify-center [&>span]:rounded-xl [&>span]:bg-gradient-to-br [&>span]:from-violet-400 [&>span]:to-indigo-600 [&>span]:text-sm [&>span]:font-bold [&>span]:text-white [&>span]:shadow-[0_10px_30px_-12px_rgba(139,92,246,0.9)] max-[1120px]:[&>strong]:hidden",
  navigation:
    "flex flex-1 flex-col gap-7 overflow-y-auto px-3.5 py-3 max-[1120px]:px-2.5",
  navGroup: "grid gap-1.5",
  navLabel:
    "px-3 pb-1 text-[0.65rem] font-semibold tracking-[0.02em] text-muted max-[1120px]:hidden max-[767px]:block",
  navItem:
    "flex min-h-10 items-center gap-3 rounded-xl px-3 text-[0.78rem] font-medium text-muted-foreground transition-all duration-200 hover:bg-white/[0.045] hover:text-foreground max-[1120px]:justify-center max-[1120px]:px-0 max-[767px]:justify-start max-[767px]:px-3 [&>svg]:shrink-0",
  navItemActive:
    "bg-gradient-to-r from-violet-500/20 to-indigo-500/10 text-white shadow-[inset_0_0_0_1px_rgba(167,139,250,0.12)] [&>svg]:text-violet-300",
  account:
    "m-3 grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-2xl bg-white/[0.035] p-3 max-[1120px]:grid-cols-1 max-[1120px]:justify-items-center [&>div:nth-child(2)]:grid [&>div:nth-child(2)]:min-w-0 [&>div:nth-child(2)]:gap-0.5 max-[1120px]:[&>div:nth-child(2)]:hidden [&_strong]:truncate [&_strong]:text-[0.72rem] [&_span]:text-[0.64rem] [&_span]:text-muted [&>button]:rounded-lg [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-2 [&>button]:py-2 [&>button]:text-[0.68rem] [&>button]:text-muted hover:[&>button]:bg-white/5 hover:[&>button]:text-foreground max-[1120px]:[&>button]:hidden",
  avatar:
    "flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-xs font-bold text-cyan-200",
  workspace: "min-w-0",
  topbar:
    "sticky top-5 z-30 flex h-16 items-center justify-between rounded-2xl border border-white/[0.07] bg-surface/85 px-[clamp(1rem,3vw,2rem)] shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl max-[767px]:top-0 max-[767px]:rounded-none max-[767px]:border-x-0 max-[767px]:border-t-0 [&>div:first-child]:grid [&>div:first-child]:gap-0.5 [&>div:first-child_span]:text-[0.67rem] [&>div:first-child_span]:text-muted max-[767px]:[&>div:first-child_span]:hidden [&_strong]:text-sm [&_strong]:font-semibold",
  topbarActions:
    "flex items-center gap-2.5 [&>a]:min-h-9 [&>a]:rounded-full [&>a]:bg-white/[0.045] [&>a]:px-4 [&>a]:py-2.5 [&>a]:text-[0.72rem] [&>a]:font-medium [&>a]:transition-all [&>a:hover]:bg-white/[0.08] [&>a:last-of-type]:bg-gradient-to-r [&>a:last-of-type]:from-violet-500 [&>a:last-of-type]:to-indigo-500 [&>a:last-of-type]:text-white [&>a:last-of-type]:shadow-[0_10px_28px_-14px_rgba(139,92,246,0.9)] max-[767px]:[&>a:first-child]:hidden max-[430px]:[&>a:last-of-type]:hidden",
  notificationTrigger:
    "min-h-9 rounded-full border-0 bg-white/[0.045] px-4 py-2.5 text-[0.72rem] font-medium transition-colors hover:bg-white/[0.08]",
  mobileNavigation:
    "relative hidden max-[767px]:block [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:rounded-full [&_summary]:bg-white/[0.05] [&_summary]:px-4 [&_summary]:py-2.5 [&_summary]:text-xs [&>nav]:absolute [&>nav]:top-[calc(100%+0.8rem)] [&>nav]:right-0 [&>nav]:flex [&>nav]:max-h-[calc(100svh-90px)] [&>nav]:min-w-[min(20rem,calc(100vw-2rem))] [&>nav]:overflow-y-auto [&>nav]:rounded-2xl [&>nav]:border [&>nav]:border-white/10 [&>nav]:bg-surface-elevated [&>nav]:p-4 [&>nav]:shadow-2xl",
  content:
    "min-h-[calc(100svh-101px)] p-[clamp(1.25rem,3vw,2.5rem)] max-[767px]:min-h-[calc(100svh-64px)] max-[767px]:p-4",
  loadingGate:
    "flex min-h-svh items-center justify-center gap-4 bg-background p-8 text-center [&_span]:text-xs [&_span]:font-semibold [&_span]:text-violet-300 [&>div:last-child]:grid [&>div:last-child]:gap-1 [&>div:last-child]:text-left [&_p]:m-0 [&_p]:text-[0.84rem] [&_p]:text-muted-foreground",
  loadingMark:
    "flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 font-bold text-white shadow-[0_16px_40px_-14px_rgba(139,92,246,0.9)]",
  gate:
    "mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center p-8 text-center [&>span]:rounded-full [&>span]:bg-violet-500/10 [&>span]:px-3 [&>span]:py-1.5 [&>span]:text-xs [&>span]:font-semibold [&>span]:text-violet-300 [&_h1]:my-6 [&_h1]:mb-3 [&_h1]:text-[clamp(2.4rem,6vw,4.5rem)] [&_h1]:leading-[1] [&_h1]:font-semibold [&_h1]:tracking-[-0.05em] [&_p]:max-w-136 [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_button]:mt-4 [&_button]:min-w-52 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-violet-500 [&_button]:to-indigo-500 [&_button]:px-4 [&_button]:py-3.5 [&_button]:text-sm [&_button]:font-semibold [&>a]:mt-2 [&>a]:min-w-52 [&>a]:rounded-full [&>a]:bg-white/[0.05] [&>a]:px-4 [&>a]:py-3.5 [&>a]:text-sm",
  drawerBackdrop: "fixed inset-0 z-100 bg-black/60 backdrop-blur-sm",
  notificationDrawer:
    "ml-auto flex h-full w-[min(100%,430px)] max-w-107.5 flex-col overflow-y-auto rounded-l-3xl bg-surface-elevated p-6 shadow-2xl [&_header]:flex [&_header]:items-start [&_header]:justify-between [&_header]:pb-4 [&_header_span]:text-xs [&_header_span]:font-semibold [&_header_span]:text-violet-300 [&_h2]:mt-2 [&_h2]:text-[2rem] [&_h2]:font-semibold [&_header_button]:min-h-9.5 [&_header_button]:min-w-9.5 [&_header_button]:rounded-full [&_header_button]:border-0 [&_header_button]:bg-white/5 [&>p]:py-8 [&>p]:text-muted-foreground [&>div]:py-8 [&>div]:text-muted-foreground [&>div_button]:rounded-full [&>div_button]:border-0 [&>div_button]:bg-white/5 [&>div_button]:p-3 [&_ol]:m-0 [&_ol]:flex-1 [&_ol]:list-none [&_ol]:space-y-3 [&_ol]:p-0 [&_li]:grid [&_li]:gap-2 [&_li]:rounded-2xl [&_li]:bg-white/[0.035] [&_li]:p-4 [&_li[data-read=true]]:opacity-60 [&_li>span]:text-xs [&_li>span]:text-muted [&_li_strong]:text-base [&_li_strong]:font-semibold [&_li_p]:m-0 [&_li_p]:text-[0.76rem] [&_li_p]:leading-normal [&_li_p]:text-muted-foreground [&_li_a]:text-xs [&_li_a]:font-semibold [&_li_a]:text-violet-300 [&_footer]:pt-4 [&_footer_a]:text-xs [&_footer_a]:font-semibold",
  dialogBackdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
  logoutDialog:
    "w-full max-w-140 rounded-3xl border border-white/[0.08] bg-surface-elevated p-[clamp(1.5rem,4vw,3rem)] shadow-2xl [&>span]:text-xs [&>span]:font-semibold [&>span]:text-violet-300 [&_h2]:mt-3 [&_h2]:text-[2.2rem] [&_h2]:font-semibold [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_footer]:mt-8 [&_footer]:flex [&_footer]:justify-end [&_footer]:gap-3 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-white/[0.06] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button:last-child]:bg-gradient-to-r [&_button:last-child]:from-violet-500 [&_button:last-child]:to-indigo-500",
} as const;
