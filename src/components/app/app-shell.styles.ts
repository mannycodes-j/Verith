export const appShellStyles = {
  shell:
    "grid min-h-svh grid-cols-[250px_minmax(0,1fr)] bg-background max-[1120px]:grid-cols-[82px_minmax(0,1fr)] max-[767px]:block",
  sidebar:
    "sticky top-0 flex h-svh flex-col border-r border-border bg-surface max-[767px]:hidden",
  sidebarHeader:
    "grid min-h-22 gap-1 border-b border-border px-5 py-[1.4rem] max-[1120px]:place-items-center max-[1120px]:px-2 [&>span]:font-mono [&>span]:text-[0.57rem] [&>span]:tracking-[0.08em] [&>span]:text-muted [&>span]:uppercase max-[1120px]:[&>span]:text-[0px]",
  wordmark:
    "text-[1.05rem] font-extrabold tracking-[-0.055em] uppercase max-[1120px]:text-[0px] max-[1120px]:before:text-base max-[1120px]:before:content-['V']",
  navigation:
    "flex flex-1 flex-col gap-8 overflow-y-auto px-3.5 py-6 max-[1120px]:px-2.5 max-[1120px]:py-5",
  navGroup: "grid gap-1",
  navLabel:
    "px-2.5 pb-2 font-mono text-[0.57rem] tracking-[0.08em] text-muted uppercase max-[1120px]:text-[0px] max-[767px]:text-[0.72rem]",
  navItem:
    "grid min-h-9.5 grid-cols-[1.6rem_1fr] items-center gap-3 border border-transparent px-2.5 text-[0.76rem] text-muted-foreground transition-colors hover:border-border hover:text-foreground max-[1120px]:flex max-[1120px]:justify-center max-[1120px]:px-0 max-[767px]:grid max-[767px]:justify-normal max-[767px]:px-2.5 max-[767px]:text-[0.72rem] [&>span]:font-mono [&>span]:text-[0.55rem] [&>span]:text-muted max-[1120px]:[&>span]:text-[0.6rem]",
  navItemActive:
    "border-foreground bg-foreground text-background [&>span]:text-accent",
  account:
    "grid grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-2.5 border-t border-border p-4 max-[1120px]:grid-cols-1 max-[1120px]:justify-items-center [&>div:nth-child(2)]:grid [&>div:nth-child(2)]:min-w-0 [&>div:nth-child(2)]:gap-1 max-[1120px]:[&>div:nth-child(2)]:hidden [&_strong]:truncate [&_strong]:text-[0.72rem] [&_span]:font-mono [&_span]:text-[0.57rem] [&_span]:tracking-[0.08em] [&_span]:text-muted [&_span]:uppercase [&>button]:border-0 [&>button]:bg-transparent [&>button]:py-2 [&>button]:font-mono [&>button]:text-[0.55rem] [&>button]:text-muted [&>button]:uppercase max-[1120px]:[&>button]:hidden",
  avatar:
    "flex size-8.5 items-center justify-center border border-border-strong text-xs font-bold",
  workspace: "min-w-0",
  topbar:
    "sticky top-0 z-30 flex h-22 items-center justify-between border-b border-border bg-[color-mix(in_srgb,var(--background)_90%,transparent)] px-[clamp(1rem,3vw,2.5rem)] backdrop-blur-2xl max-[767px]:h-17.5 [&>div:first-child]:grid [&>div:first-child]:gap-2 [&>div:first-child_span]:font-mono [&>div:first-child_span]:text-[0.57rem] [&>div:first-child_span]:tracking-[0.08em] [&>div:first-child_span]:text-muted [&>div:first-child_span]:uppercase max-[767px]:[&>div:first-child_span]:hidden [&_strong]:text-sm [&_strong]:font-semibold",
  topbarActions:
    "flex items-center gap-3 [&>a]:min-h-9.5 [&>a]:border [&>a]:border-border [&>a]:px-3.5 [&>a]:py-3 [&>a]:font-mono [&>a]:text-[0.58rem] [&>a]:tracking-[0.06em] [&>a]:uppercase [&>a:last-of-type]:border-foreground [&>a:last-of-type]:bg-foreground [&>a:last-of-type]:text-background max-[767px]:[&>a:first-child]:hidden max-[767px]:[&>a:last-of-type]:min-h-9 max-[767px]:[&>a:last-of-type]:p-3 max-[430px]:[&>a:last-of-type]:hidden",
  notificationTrigger:
    "min-h-9.5 border border-border bg-transparent px-3.5 py-3 font-mono text-[0.58rem] tracking-[0.06em] uppercase",
  mobileNavigation:
    "relative hidden max-[767px]:block [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:py-3 [&_summary]:font-mono [&_summary]:text-[0.6rem] [&_summary]:uppercase [&>nav]:absolute [&>nav]:top-[calc(100%+0.8rem)] [&>nav]:right-0 [&>nav]:flex [&>nav]:max-h-[calc(100svh-90px)] [&>nav]:min-w-[min(20rem,calc(100vw-2rem))] [&>nav]:overflow-y-auto [&>nav]:border [&>nav]:border-border-strong [&>nav]:bg-surface-elevated [&>nav]:p-4",
  content:
    "min-h-[calc(100svh-88px)] p-[clamp(1.25rem,3vw,2.5rem)] max-[767px]:min-h-[calc(100svh-70px)] max-[767px]:p-4",
  loadingGate:
    "flex min-h-svh items-center justify-center gap-4 bg-background p-8 text-center [&_span]:font-mono [&_span]:text-[0.57rem] [&_span]:tracking-[0.08em] [&_span]:text-muted [&_span]:uppercase [&>div:last-child]:grid [&>div:last-child]:gap-1 [&>div:last-child]:text-left [&_p]:m-0 [&_p]:text-[0.84rem]",
  loadingMark:
    "flex size-11 items-center justify-center border border-border-strong font-extrabold",
  gate:
    "flex min-h-svh flex-col items-center justify-center border-16 border-surface bg-background p-8 text-center [&>span]:font-mono [&>span]:text-[0.57rem] [&>span]:tracking-[0.08em] [&>span]:text-muted [&>span]:uppercase [&_h1]:my-8 [&_h1]:mb-4 [&_h1]:max-w-[12ch] [&_h1]:font-editorial [&_h1]:text-[clamp(2.7rem,6vw,5.5rem)] [&_h1]:leading-[0.95] [&_h1]:font-normal [&_h1]:tracking-[-0.055em] [&_p]:max-w-136 [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_button]:mt-4 [&_button]:min-w-52 [&_button]:border [&_button]:border-foreground [&_button]:bg-foreground [&_button]:px-4 [&_button]:py-3.5 [&_button]:font-mono [&_button]:text-[0.62rem] [&_button]:tracking-[0.07em] [&_button]:text-background [&_button]:uppercase [&>a]:mt-2 [&>a]:min-w-52 [&>a]:border [&>a]:border-foreground [&>a]:bg-transparent [&>a]:px-4 [&>a]:py-3.5 [&>a]:font-mono [&>a]:text-[0.62rem] [&>a]:tracking-[0.07em] [&>a]:text-foreground [&>a]:uppercase",
  drawerBackdrop:
    "fixed inset-0 z-100 bg-[color-mix(in_srgb,var(--foreground)_46%,transparent)]",
  notificationDrawer:
    "ml-auto flex h-full w-[min(100%,430px)] max-w-107.5 flex-col overflow-y-auto border-l border-border-strong bg-background p-6 [&_header]:flex [&_header]:items-start [&_header]:justify-between [&_header]:border-b [&_header]:border-border-strong [&_header]:pb-4 [&_header_span]:font-mono [&_header_span]:text-[0.58rem] [&_header_span]:text-muted [&_header_span]:uppercase [&_h2]:mt-2 [&_h2]:font-editorial [&_h2]:text-[2.6rem] [&_h2]:font-normal [&_header_button]:min-h-9.5 [&_header_button]:min-w-9.5 [&_header_button]:border [&_header_button]:border-border [&_header_button]:bg-transparent [&>p]:py-8 [&>p]:text-muted-foreground [&>div]:py-8 [&>div]:text-muted-foreground [&>div_button]:min-h-9.5 [&>div_button]:min-w-9.5 [&>div_button]:border [&>div_button]:border-border [&>div_button]:bg-transparent [&_ol]:m-0 [&_ol]:flex-1 [&_ol]:list-none [&_ol]:p-0 [&_li]:grid [&_li]:gap-2 [&_li]:border-b [&_li]:border-border [&_li]:py-5 [&_li[data-read=true]]:opacity-60 [&_li>span]:font-mono [&_li>span]:text-[0.58rem] [&_li>span]:text-muted [&_li>span]:uppercase [&_li_strong]:font-editorial [&_li_strong]:text-[1.4rem] [&_li_strong]:font-normal [&_li_p]:m-0 [&_li_p]:text-[0.72rem] [&_li_p]:leading-normal [&_li_p]:text-muted-foreground [&_li_a]:font-mono [&_li_a]:text-[0.58rem] [&_li_a]:uppercase [&_footer]:border-t [&_footer]:border-border-strong [&_footer]:pt-4 [&_footer_a]:font-mono [&_footer_a]:text-[0.58rem] [&_footer_a]:uppercase",
  dialogBackdrop:
    "fixed inset-0 z-100 flex items-center justify-center bg-[color-mix(in_srgb,var(--foreground)_46%,transparent)] p-4",
  logoutDialog:
    "w-full max-w-140 border border-border-strong bg-background p-[clamp(1.5rem,4vw,3rem)] [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&_h2]:mt-2 [&_h2]:font-editorial [&_h2]:text-[2.6rem] [&_h2]:font-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_footer]:mt-8 [&_footer]:flex [&_footer]:justify-end [&_footer]:gap-3 [&_button]:border [&_button]:border-border-strong [&_button]:bg-transparent [&_button]:p-3 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:uppercase [&_button:last-child]:bg-foreground [&_button:last-child]:text-background",
} as const;
