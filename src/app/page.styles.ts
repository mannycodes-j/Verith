export const landingStyles = {
  page: "min-h-screen overflow-x-hidden bg-background text-foreground",
  header:
    "sticky top-0 z-50 grid h-17.5 grid-cols-[auto_1fr_auto] items-center border-b border-border bg-background/95 px-(--page-gutter) backdrop-blur max-[900px]:grid-cols-[1fr_auto]",
  wordmark: "font-editorial text-[1.65rem] font-medium tracking-[-0.05em]",
  desktopNav:
    "flex justify-center gap-[clamp(1rem,2.5vw,2.5rem)] font-mono text-[0.58rem] tracking-[0.06em] text-muted-foreground uppercase max-[900px]:hidden [&_a]:transition-colors [&_a:hover]:text-foreground",
  headerActions: "flex items-center gap-4",
  textAction: "font-mono text-[0.58rem] tracking-[0.06em] uppercase max-[550px]:hidden",
  primaryAction:
    "inline-flex items-center gap-4 bg-foreground px-5 py-3 font-mono text-[0.58rem] tracking-[0.05em] text-background uppercase transition-colors hover:bg-accent hover:text-accent-foreground [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-none [&_svg]:stroke-current",
  mobileMenu:
    "hidden max-[900px]:block [&_summary]:cursor-pointer [&_summary]:font-mono [&_summary]:text-[0.58rem] [&_summary]:uppercase [&_nav]:absolute [&_nav]:top-full [&_nav]:right-0 [&_nav]:grid [&_nav]:w-[min(22rem,100vw)] [&_nav]:border [&_nav]:border-border-strong [&_nav]:bg-background [&_nav]:p-6 [&_nav_a]:border-b [&_nav_a]:border-border [&_nav_a]:py-3 [&_nav_a]:font-mono [&_nav_a]:text-[0.65rem] [&_nav_a]:uppercase",
  hero: "px-(--page-gutter) pt-[clamp(4rem,9vw,9rem)]",
  heroCopy:
    "mx-auto max-w-[1500px] [&_h1]:my-6 [&_h1]:max-w-[12ch] [&_h1]:font-editorial [&_h1]:text-[clamp(4rem,9vw,9rem)] [&_h1]:leading-[0.86] [&_h1]:font-normal [&_h1]:tracking-[-0.07em]",
  eyebrow: "font-mono text-[0.58rem] tracking-[0.075em] text-muted uppercase",
  heroDescription: "mt-8 max-w-170 text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.65] text-muted-foreground",
  heroActions: "mt-10 flex flex-wrap items-center gap-5",
  secondaryAction: "border-b border-foreground pb-1 font-mono text-[0.58rem] tracking-[0.05em] uppercase",
  preview: "mx-auto mt-[clamp(4rem,8vw,8rem)] max-w-[1500px] border border-border-strong bg-surface",
  previewTopbar:
    "flex items-center justify-between border-b border-border-strong px-5 py-4 [&>div]:grid [&>div]:gap-1 [&_strong]:font-mono [&_strong]:text-[0.68rem] [&_strong]:font-normal [&_strong]:uppercase",
  previewState: "font-mono text-[0.58rem] text-success uppercase",
  previewBody: "grid min-h-110 grid-cols-[4rem_minmax(0,1.2fr)_minmax(18rem,0.45fr)] max-[800px]:grid-cols-[3rem_1fr] max-[800px]:[&_aside]:col-span-2",
  previewRail:
    "flex flex-col items-center gap-8 border-r border-border-strong py-5 font-mono text-[0.58rem] text-muted",
  railBrand: "mb-4 font-editorial !text-xl !text-foreground",
  railActive: "!text-accent",
  previewContent: "flex min-w-0 flex-col justify-between p-[clamp(2rem,5vw,5rem)]",
  caseMeta: "flex justify-between gap-4 font-mono text-[0.58rem] text-muted uppercase",
  sampleClaim: "max-w-[18ch] font-editorial text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-[-0.05em]",
  stageLine:
    "grid grid-cols-3 border-t border-border pt-4 font-mono text-[0.55rem] text-muted uppercase max-[550px]:grid-cols-1 max-[550px]:gap-2",
  previewInspector:
    "border-l border-border-strong p-[clamp(1.5rem,3vw,3rem)] max-[800px]:border-l-0 max-[800px]:border-t [&>p]:font-editorial [&>p]:text-[clamp(1.8rem,3vw,3rem)] [&>p]:leading-[1.05] [&>p]:tracking-[-0.04em] [&_dl]:mt-12 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:gap-3 [&_dl_div]:border-t [&_dl_div]:border-border [&_dl_div]:py-3 [&_dt]:font-mono [&_dt]:text-[0.55rem] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.68rem]",
  statusStrip:
    "mx-auto grid max-w-[1500px] grid-cols-3 border-x border-b border-border-strong max-[600px]:grid-cols-1 [&_span]:border-r [&_span]:border-border [&_span]:p-4 [&_span]:text-center [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:tracking-[0.075em] [&_span]:text-muted [&_span]:uppercase max-[600px]:[&_span]:border-r-0 max-[600px]:[&_span]:border-b",
  editorialSection: "px-(--page-gutter) py-[clamp(5rem,10vw,10rem)]",
  sectionMarker:
    "mx-auto flex max-w-[1500px] gap-6 border-t border-border-strong pt-4 font-mono text-[0.58rem] tracking-[0.075em] text-muted uppercase",
  sectionLead:
    "mx-auto mt-[clamp(3rem,7vw,7rem)] grid max-w-[1500px] grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.45fr)] items-end gap-[clamp(2rem,7vw,7rem)] max-[750px]:grid-cols-1 [&_h2]:m-0 [&_h2]:max-w-[12ch] [&_h2]:font-editorial [&_h2]:text-[clamp(3.5rem,7vw,7rem)] [&_h2]:leading-[0.92] [&_h2]:font-normal [&_h2]:tracking-[-0.06em] [&_p]:m-0 [&_p]:leading-[1.65] [&_p]:text-muted-foreground",
  investigationGrid: "mx-auto mt-[clamp(3rem,7vw,7rem)] grid max-w-[1500px] grid-cols-[1.1fr_0.9fr] border border-border-strong max-[800px]:grid-cols-1",
  documentPanel: "p-[clamp(2rem,5vw,5rem)]",
  panelLabel: "flex justify-between gap-4 font-mono text-[0.58rem] text-muted uppercase",
  annotation:
    "mt-6 grid grid-cols-[8rem_1fr] gap-5 border-t border-border py-4 max-[550px]:grid-cols-1 [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:text-accent [&_span]:uppercase [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground",
  evidencePanel: "border-l border-border-strong p-[clamp(2rem,5vw,5rem)] max-[800px]:border-l-0 max-[800px]:border-t",
  evidenceRecord:
    "grid grid-cols-[3rem_1fr] gap-4 border-t border-border py-6 [&_strong]:font-editorial [&_strong]:text-2xl [&_strong]:font-normal [&_p]:mb-0 [&_p]:text-sm [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  evidenceIndex: "font-mono text-[0.58rem] text-accent",
  workflowList:
    "mx-auto mt-[clamp(3rem,7vw,7rem)] max-w-[1500px] list-none border-t border-border-strong p-0 [&_li]:grid [&_li]:grid-cols-[3rem_minmax(10rem,0.5fr)_1fr] [&_li]:items-baseline [&_li]:gap-6 [&_li]:border-b [&_li]:border-border-strong [&_li]:py-6 max-[650px]:[&_li]:grid-cols-[2rem_1fr] [&_li>span]:font-mono [&_li>span]:text-[0.58rem] [&_li>span]:text-muted [&_h3]:m-0 [&_h3]:font-editorial [&_h3]:text-[clamp(2rem,4vw,4rem)] [&_h3]:font-normal [&_p]:m-0 [&_p]:leading-[1.6] [&_p]:text-muted-foreground max-[650px]:[&_p]:col-start-2",
  darkSection: "bg-foreground text-background",
  policyLayout:
    "mx-auto mt-[clamp(3rem,7vw,7rem)] grid max-w-[1500px] grid-cols-[1fr_0.8fr] gap-[clamp(2rem,7vw,7rem)] max-[750px]:grid-cols-1 [&_h2]:m-0 [&_h2]:mb-8 [&_h2]:font-editorial [&_h2]:text-[clamp(3.5rem,7vw,7rem)] [&_h2]:leading-[0.92] [&_h2]:font-normal [&_h2]:tracking-[-0.06em]",
  policyList: "[&_p]:m-0 [&_p]:border-t [&_p]:border-background/20 [&_p]:py-4 [&_p]:text-background/75",
  systemGrid:
    "mx-auto mt-[clamp(3rem,7vw,7rem)] grid max-w-[1500px] grid-cols-[1fr_0.8fr] gap-[clamp(2rem,7vw,7rem)] max-[750px]:grid-cols-1 [&_h2]:m-0 [&_h2]:mb-8 [&_h2]:font-editorial [&_h2]:text-[clamp(3.5rem,7vw,7rem)] [&_h2]:leading-[0.92] [&_h2]:font-normal [&_h2]:tracking-[-0.06em]",
  sectionDescription: "max-w-150 leading-[1.65] text-muted-foreground",
  systemList:
    "m-0 list-none border-t border-border-strong p-0 [&_li]:grid [&_li]:grid-cols-[3rem_1fr] [&_li]:gap-4 [&_li]:border-b [&_li]:border-border-strong [&_li]:py-4 [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:text-muted [&_strong]:font-normal",
  splitSection:
    "grid grid-cols-2 border-y border-border-strong max-[750px]:grid-cols-1 [&_article]:p-[clamp(3rem,7vw,7rem)] [&_article+article]:border-l [&_article+article]:border-border-strong max-[750px]:[&_article+article]:border-l-0 max-[750px]:[&_article+article]:border-t [&_h2]:font-editorial [&_h2]:text-[clamp(3rem,6vw,6rem)] [&_h2]:leading-[0.92] [&_h2]:font-normal [&_h2]:tracking-[-0.055em] [&_p]:max-w-150 [&_p]:leading-[1.65] [&_p]:text-muted-foreground",
  inlineLink: "mt-8 inline-flex items-center gap-4 border-b border-foreground pb-2 font-mono text-[0.58rem] uppercase [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-none [&_svg]:stroke-current",
  footer: "px-(--page-gutter) pt-[clamp(4rem,8vw,8rem)]",
  footerIdentity: "mx-auto max-w-[1500px] border-t border-border-strong pt-8 [&_p]:text-muted-foreground",
  footerLinks: "mx-auto my-16 grid max-w-[1500px] grid-cols-3 gap-8 max-[600px]:grid-cols-1 [&>div]:grid [&>div]:gap-3 [&_span]:mb-2 [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:text-muted [&_span]:uppercase [&_a]:text-sm",
  footerBase: "mx-auto flex max-w-[1500px] justify-between gap-4 border-t border-border-strong py-5 font-mono text-[0.55rem] text-muted uppercase",
} as const;
