export const appShellStyles = {
  shell:
    "relative min-h-svh bg-[#0a0a0a] text-foreground lg:grid lg:grid-cols-[292px_minmax(0,1fr)]",
  sidebar:
    "fixed inset-y-4 left-4 z-40 hidden w-[260px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111] px-4 py-5 shadow-2xl lg:flex",
  sidebarHeader:
    "grid gap-2 px-2 [&>span]:text-[11px] [&>span]:text-white/55",
  wordmark:
    "flex items-center",
  sidebarWidget:
    "mt-6 rounded-xl border border-white/10 bg-white/5 p-4 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-xs [&>span]:font-bold [&>span]:uppercase [&>span]:tracking-[0.12em] [&>span]:text-white/70 [&>strong]:mt-3 [&>strong]:block [&>strong]:text-lg [&>strong]:font-medium [&>p]:mb-0 [&>p]:mt-2 [&>p]:text-xs [&>p]:leading-relaxed [&>p]:text-white/60",
  navigation:
    "mt-7 flex flex-1 flex-col gap-6 overflow-y-auto",
  navGroup: "grid gap-1",
  navLabel:
    "px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50",
  navItem:
    "relative flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-white/75 transition-colors duration-200 hover:bg-white/5 hover:text-foreground [&>svg]:shrink-0 [&>svg]:text-white/55",
  navItemActive:
    "border border-violet-300/20 bg-gradient-to-r from-[#C084FC] to-[#6366F1] text-white shadow-[0_12px_28px_-16px_rgba(139,92,246,.85)] [&>svg]:text-white",
  account:
    "mt-4 grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2.5 border-t border-white/10 px-2 pt-4 [&>div:nth-child(2)]:grid [&>div:nth-child(2)]:min-w-0 [&>div:nth-child(2)]:gap-0.5 [&_strong]:truncate [&_strong]:text-xs [&_span]:text-[10px] [&_span]:text-white/55 [&>button]:min-h-10 [&>button]:rounded-lg [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-2 [&>button]:py-2 [&>button]:text-[10px] [&>button]:text-white/55 hover:[&>button]:bg-white/5 hover:[&>button]:text-foreground",
  avatar:
    "flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 bg-cover bg-center bg-no-repeat text-xs font-semibold text-white",
  workspace: "min-w-0 lg:col-start-2",
  topbar:
    "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#0a0a0a]/80 px-5 backdrop-blur-md lg:px-8 [&>div:first-child]:grid [&>div:first-child]:gap-0.5 [&>div:first-child_span]:text-[10px] [&>div:first-child_span]:uppercase [&>div:first-child_span]:tracking-[0.12em] [&>div:first-child_span]:text-white/55 max-sm:[&>div:first-child_span]:hidden [&_strong]:text-sm [&_strong]:font-medium",
  topbarActions:
    "flex items-center gap-2.5 [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a]:justify-center [&>a]:rounded-full [&>a]:border [&>a]:border-white/10 [&>a]:bg-white/5 [&>a]:px-4 [&>a]:py-2.5 [&>a]:text-center [&>a]:text-xs [&>a]:font-medium [&>a:hover]:border-white/20 [&>a:hover]:bg-white/10 [&>a:last-of-type]:border-transparent [&>a:last-of-type]:bg-white [&>a:last-of-type]:text-black [&>a:last-of-type:hover]:bg-white/90 max-sm:[&>a]:hidden",
  notificationTrigger:
    "relative grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white/65 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white",
  notificationBadge:
    "absolute -top-1.5 -right-1.5 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-violet-600 px-1 text-[9px] leading-none font-bold text-white shadow-sm shadow-violet-500/20",
  mobileNavigation:
    "relative block lg:hidden [&_summary]:grid [&_summary]:size-11 [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:place-items-center [&_summary]:rounded-full [&_summary]:border [&_summary]:border-white/10 [&_summary]:bg-white/5 [&_summary]:text-white/70 [&_summary]:transition-colors [&_summary:hover]:border-white/20 [&_summary:hover]:bg-white/10 [&_summary:hover]:text-white [&_summary:focus-visible]:outline-none [&_summary:focus-visible]:ring-2 [&_summary:focus-visible]:ring-white/50 [&_summary::-webkit-details-marker]:hidden",
  mobileMenuPanel:
    "absolute top-[calc(100%+0.8rem)] right-0 flex max-h-[calc(100svh-90px)] min-w-[min(21rem,calc(100vw-2rem))] flex-col overflow-y-auto rounded-2xl border border-white/10 bg-[#111] p-4 shadow-2xl [&>nav]:mt-0 [&>nav]:overflow-visible",
  mobileAccount:
    "mt-5 grid grid-cols-[36px_minmax(0,1fr)] items-center gap-x-3 gap-y-3 border-t border-white/10 pt-4 [&>div:nth-child(2)]:grid [&>div:nth-child(2)]:min-w-0 [&>div:nth-child(2)]:gap-0.5 [&_strong]:truncate [&_strong]:text-xs [&_span]:text-[10px] [&_span]:capitalize [&_span]:text-white/50 [&>button]:col-span-2 [&>button]:inline-flex [&>button]:min-h-11 [&>button]:w-full [&>button]:items-center [&>button]:justify-center [&>button]:gap-2 [&>button]:rounded-xl [&>button]:border [&>button]:border-white/10 [&>button]:bg-white/5 [&>button]:px-4 [&>button]:text-center [&>button]:text-xs [&>button]:font-medium [&>button]:text-white/70 [&>button]:transition-colors [&>button:hover]:border-white/20 [&>button:hover]:bg-white/10 [&>button:hover]:text-white",
  content:
    "min-h-[calc(100svh-64px)] px-5 py-8 pb-24 lg:px-8 lg:pb-8",
  mobileBottomNavigation:
    "fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-white/10 bg-[#0a0a0a]/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden",
  mobileBottomItem:
    "flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-xs font-semibold text-white/70 transition-colors [&>svg]:text-white/70",
  mobileBottomItemActive:
    "bg-violet-500/10 text-violet-100 [&>svg]:text-violet-300",
  loadingGate:
    "flex min-h-svh items-center justify-center gap-4 bg-[#0a0a0a] p-8 text-center [&_span]:text-xs [&_span]:font-semibold [&_span]:text-white/60 [&>div:last-child]:grid [&>div:last-child]:gap-1 [&>div:last-child]:text-left [&_p]:m-0 [&_p]:text-[0.84rem] [&_p]:text-white/50",
  loadingMark:
    "flex size-12 items-center justify-center rounded-2xl bg-white text-black font-bold shadow-lg",
  gate:
    "mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center p-8 text-center [&>span]:rounded-full [&>span]:border [&>span]:border-white/10 [&>span]:bg-white/5 [&>span]:px-3 [&>span]:py-1.5 [&>span]:text-xs [&>span]:font-semibold [&>span]:text-white/70 [&_h1]:my-6 [&_h1]:mb-3 [&_h1]:text-[clamp(2.4rem,6vw,4.5rem)] [&_h1]:leading-[1] [&_h1]:font-semibold [&_h1]:tracking-[-0.05em] [&_p]:max-w-136 [&_p]:leading-[1.6] [&_p]:text-white/50 [&_button]:mt-4 [&_button]:min-w-52 [&_button]:rounded-full [&_button]:border-transparent [&_button]:bg-white [&_button]:px-4 [&_button]:py-3.5 [&_button]:text-sm [&_button]:font-semibold [&_button]:text-black [&>a]:mt-2 [&>a]:inline-flex [&>a]:min-h-11 [&>a]:min-w-52 [&>a]:items-center [&>a]:justify-center [&>a]:gap-2 [&>a]:rounded-full [&>a]:border [&>a]:border-white/10 [&>a]:bg-white/5 [&>a]:px-4 [&>a]:py-3.5 [&>a]:text-center [&>a]:text-sm [&>a]:transition-colors [&>a:hover]:border-white/20 [&>a:hover]:bg-white/10 [&>a:focus-visible]:outline-none [&>a:focus-visible]:ring-2 [&>a:focus-visible]:ring-white/50",
  drawerBackdrop: "fixed inset-0 z-100 bg-black/60 backdrop-blur-sm",
  notificationDrawer:
    "ml-auto flex h-full w-[min(100%,430px)] max-w-[430px] flex-col overflow-y-auto rounded-l-3xl border-l border-white/10 bg-[#111] p-6 shadow-2xl [&_header]:flex [&_header]:items-start [&_header]:justify-between [&_header]:pb-4 [&_header_span]:text-xs [&_header_span]:font-semibold [&_header_span]:text-white/60 [&_h2]:mt-2 [&_h2]:text-[2rem] [&_h2]:font-semibold [&_header_button]:grid [&_header_button]:size-10 [&_header_button]:place-items-center [&_header_button]:rounded-full [&_header_button]:border border-white/10 [&_header_button]:bg-white/5 [&>p]:py-8 [&>p]:text-white/50 [&>div]:py-8 [&>div]:text-white/50 [&>div_button]:inline-flex [&>div_button]:items-center [&>div_button]:justify-center [&>div_button]:rounded-full [&>div_button]:border border-white/10 [&>div_button]:bg-white/5 [&>div_button]:p-3 [&>div_button]:text-center [&_ol]:m-0 [&_ol]:flex-1 [&_ol]:list-none [&_ol]:space-y-3 [&_ol]:p-0 [&_li]:grid [&_li]:gap-2 [&_li]:rounded-2xl [&_li]:border [&_li]:border-white/10 [&_li]:bg-white/5 [&_li]:p-4 [&_li[data-read=true]]:opacity-60 [&_li>span]:text-xs [&_li>span]:text-white/40 [&_li_strong]:text-base [&_li_strong]:font-semibold [&_li_p]:m-0 [&_li_p]:text-[0.76rem] [&_li_p]:leading-normal [&_li_p]:text-white/60 [&_li_a]:inline-flex [&_li_a]:items-center [&_li_a]:justify-center [&_li_a]:text-center [&_li_a]:text-xs [&_li_a]:font-semibold [&_li_a]:text-white/80 [&_footer]:pt-4 [&_footer_a]:inline-flex [&_footer_a]:items-center [&_footer_a]:justify-center [&_footer_a]:text-center [&_footer_a]:text-xs [&_footer_a]:font-semibold [&_footer_a]:text-white/60",
  dialogBackdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
  logoutDialog:
    "w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111] p-[clamp(1.5rem,4vw,3rem)] shadow-2xl [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.14em] [&>span]:text-violet-400 [&_h2]:mt-3 [&_h2]:text-[2.2rem] [&_h2]:font-semibold [&_p]:leading-[1.6] [&_p]:text-white/50 [&_footer]:mt-8 [&_footer]:flex [&_footer]:justify-end [&_footer]:gap-3 [&_button]:rounded-full [&_button]:border [&_button]:border-white/10 [&_button]:bg-white/5 [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button:last-child]:border-violet-500/20 [&_button:last-child]:bg-gradient-to-r [&_button:last-child]:from-[#C084FC] [&_button:last-child]:to-[#6366F1] [&_button:last-child]:text-white [&_button:last-child]:font-bold [&_button:last-child]:shadow-[0_4px_14px_0_rgba(139,92,246,0.25)]",
} as const;
