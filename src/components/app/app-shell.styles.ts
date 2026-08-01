export const appShellStyles = {
  shell:
    "relative min-h-svh bg-[#08090A] text-foreground lg:grid lg:grid-cols-[292px_minmax(0,1fr)]",
  sidebar:
    "fixed inset-y-4 left-4 z-40 hidden w-[260px] flex-col overflow-hidden rounded-3xl border border-white/[0.05] bg-[#0F1012] px-4 py-5 shadow-2xl backdrop-blur-md lg:flex",
  sidebarHeader:
    "grid gap-2 px-2 [&>span]:text-[11px] [&>span]:text-white/55",
  wordmark:
    "flex items-center gap-2.5 text-[15px] font-medium tracking-tight [&>span]:flex [&>span]:size-8 [&>span]:shrink-0 [&>span]:items-center [&>span]:justify-center [&>span]:rounded-lg [&>span]:bg-[#24183f] [&>span]:text-sm [&>span]:font-semibold [&>span]:text-violet-300",
  sidebarWidget:
    "mt-6 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.12em] [&>span]:text-violet-300 [&>strong]:mt-3 [&>strong]:block [&>strong]:text-lg [&>strong]:font-medium [&>p]:mb-0 [&>p]:mt-2 [&>p]:text-[11px] [&>p]:leading-relaxed [&>p]:text-white/55",
  navigation:
    "mt-7 flex flex-1 flex-col gap-6 overflow-y-auto",
  navGroup: "grid gap-1",
  navLabel:
    "px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50",
  navItem:
    "flex h-11 items-center gap-3 rounded-lg px-3 text-[13px] font-medium text-white/60 transition-colors duration-200 hover:bg-white/[0.04] hover:text-foreground [&>svg]:shrink-0 [&>svg]:text-white/55",
  navItemActive:
    "bg-white/[0.06] text-foreground [&>svg]:text-violet-400",
  account:
    "mt-4 grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2.5 border-t border-white/[0.05] px-2 pt-4 [&>div:nth-child(2)]:grid [&>div:nth-child(2)]:min-w-0 [&>div:nth-child(2)]:gap-0.5 [&_strong]:truncate [&_strong]:text-xs [&_span]:text-[10px] [&_span]:text-white/55 [&>button]:min-h-10 [&>button]:rounded-lg [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-2 [&>button]:py-2 [&>button]:text-[10px] [&>button]:text-white/55 hover:[&>button]:bg-white/5 hover:[&>button]:text-foreground",
  avatar:
    "flex size-9 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-500/10 text-xs font-semibold text-violet-300",
  workspace: "min-w-0 lg:col-start-2",
  topbar:
    "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.04] bg-[#08090A]/80 px-5 backdrop-blur-md lg:px-8 [&>div:first-child]:grid [&>div:first-child]:gap-0.5 [&>div:first-child_span]:text-[10px] [&>div:first-child_span]:uppercase [&>div:first-child_span]:tracking-[0.12em] [&>div:first-child_span]:text-white/55 max-sm:[&>div:first-child_span]:hidden [&_strong]:text-sm [&_strong]:font-medium",
  topbarActions:
    "flex items-center gap-2.5 [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a]:justify-center [&>a]:rounded-full [&>a]:border [&>a]:border-white/10 [&>a]:bg-white/[0.04] [&>a]:px-4 [&>a]:py-2.5 [&>a]:text-center [&>a]:text-xs [&>a]:font-medium [&>a:hover]:border-white/15 [&>a:hover]:bg-white/[0.08] [&>a:last-of-type]:border-0 [&>a:last-of-type]:bg-gradient-to-r [&>a:last-of-type]:from-[#C084FC] [&>a:last-of-type]:to-[#6366F1] [&>a:last-of-type]:text-white max-sm:[&>a]:hidden",
  notificationTrigger:
    "grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-white",
  mobileNavigation:
    "relative block lg:hidden [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:rounded-full [&_summary]:bg-white/[0.05] [&_summary]:px-4 [&_summary]:py-2.5 [&_summary]:text-xs [&>nav]:absolute [&>nav]:top-[calc(100%+0.8rem)] [&>nav]:right-0 [&>nav]:flex [&>nav]:max-h-[calc(100svh-90px)] [&>nav]:min-w-[min(20rem,calc(100vw-2rem))] [&>nav]:overflow-y-auto [&>nav]:rounded-2xl [&>nav]:border [&>nav]:border-white/10 [&>nav]:bg-surface-elevated [&>nav]:p-4 [&>nav]:shadow-2xl",
  content:
    "min-h-[calc(100svh-64px)] px-5 py-8 pb-24 lg:px-8 lg:pb-8",
  mobileBottomNavigation:
    "fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-white/[0.05] bg-[#08090A]/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden",
  mobileBottomItem:
    "flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium text-white/55 transition-colors [&>svg]:text-white/55",
  mobileBottomItemActive:
    "bg-white/[0.06] text-foreground [&>svg]:text-violet-400",
  loadingGate:
    "flex min-h-svh items-center justify-center gap-4 bg-background p-8 text-center [&_span]:text-xs [&_span]:font-semibold [&_span]:text-violet-300 [&>div:last-child]:grid [&>div:last-child]:gap-1 [&>div:last-child]:text-left [&_p]:m-0 [&_p]:text-[0.84rem] [&_p]:text-muted-foreground",
  loadingMark:
    "flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C084FC] to-[#6366F1] font-bold text-white shadow-[0_16px_40px_-14px_rgba(139,92,246,0.9)]",
  gate:
    "mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center p-8 text-center [&>span]:rounded-full [&>span]:bg-violet-500/10 [&>span]:px-3 [&>span]:py-1.5 [&>span]:text-xs [&>span]:font-semibold [&>span]:text-violet-300 [&_h1]:my-6 [&_h1]:mb-3 [&_h1]:text-[clamp(2.4rem,6vw,4.5rem)] [&_h1]:leading-[1] [&_h1]:font-semibold [&_h1]:tracking-[-0.05em] [&_p]:max-w-136 [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_button]:mt-4 [&_button]:min-w-52 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-[#C084FC] [&_button]:to-[#6366F1] [&_button]:px-4 [&_button]:py-3.5 [&_button]:text-sm [&_button]:font-semibold [&>a]:mt-2 [&>a]:min-w-52 [&>a]:rounded-full [&>a]:bg-white/[0.05] [&>a]:px-4 [&>a]:py-3.5 [&>a]:text-sm",
  drawerBackdrop: "fixed inset-0 z-100 bg-black/60 backdrop-blur-sm",
  notificationDrawer:
    "ml-auto flex h-full w-[min(100%,430px)] max-w-107.5 flex-col overflow-y-auto rounded-l-3xl bg-surface-elevated p-6 shadow-2xl [&_header]:flex [&_header]:items-start [&_header]:justify-between [&_header]:pb-4 [&_header_span]:text-xs [&_header_span]:font-semibold [&_header_span]:text-violet-300 [&_h2]:mt-2 [&_h2]:text-[2rem] [&_h2]:font-semibold [&_header_button]:grid [&_header_button]:size-10 [&_header_button]:place-items-center [&_header_button]:rounded-full [&_header_button]:border-0 [&_header_button]:bg-white/5 [&>p]:py-8 [&>p]:text-muted-foreground [&>div]:py-8 [&>div]:text-muted-foreground [&>div_button]:inline-flex [&>div_button]:items-center [&>div_button]:justify-center [&>div_button]:rounded-full [&>div_button]:border-0 [&>div_button]:bg-white/5 [&>div_button]:p-3 [&>div_button]:text-center [&_ol]:m-0 [&_ol]:flex-1 [&_ol]:list-none [&_ol]:space-y-3 [&_ol]:p-0 [&_li]:grid [&_li]:gap-2 [&_li]:rounded-2xl [&_li]:bg-white/[0.035] [&_li]:p-4 [&_li[data-read=true]]:opacity-60 [&_li>span]:text-xs [&_li>span]:text-muted [&_li_strong]:text-base [&_li_strong]:font-semibold [&_li_p]:m-0 [&_li_p]:text-[0.76rem] [&_li_p]:leading-normal [&_li_p]:text-muted-foreground [&_li_a]:inline-flex [&_li_a]:items-center [&_li_a]:justify-center [&_li_a]:text-center [&_li_a]:text-xs [&_li_a]:font-semibold [&_li_a]:text-violet-300 [&_footer]:pt-4 [&_footer_a]:inline-flex [&_footer_a]:items-center [&_footer_a]:justify-center [&_footer_a]:text-center [&_footer_a]:text-xs [&_footer_a]:font-semibold",
  dialogBackdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
  logoutDialog:
    "w-full max-w-140 rounded-3xl border border-white/[0.08] bg-surface-elevated p-[clamp(1.5rem,4vw,3rem)] shadow-2xl [&>span]:text-xs [&>span]:font-semibold [&>span]:text-violet-300 [&_h2]:mt-3 [&_h2]:text-[2.2rem] [&_h2]:font-semibold [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_footer]:mt-8 [&_footer]:flex [&_footer]:justify-end [&_footer]:gap-3 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-white/[0.06] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button:last-child]:bg-gradient-to-r [&_button:last-child]:from-[#C084FC] [&_button:last-child]:to-[#6366F1]",
} as const;
