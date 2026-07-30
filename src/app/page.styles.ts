export const landingStyles = {
  page: "min-h-screen overflow-x-hidden bg-background font-sans text-foreground selection:bg-accent/20",
  header:
    "fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-md h-16 flex items-center justify-between px-6 transition-all duration-200",
  wordmark: "font-sans text-[17px] font-semibold tracking-tight text-foreground flex items-center gap-2.5 hover:opacity-90 transition-opacity",
  desktopNav:
    "hidden md:flex items-center gap-7 text-sm text-zinc-400 [&_a]:cursor-pointer [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-foreground",
  headerActions: "flex items-center gap-4",
  textAction: "cursor-pointer text-sm text-zinc-400 transition-colors hover:text-foreground hidden sm:block",
  primaryAction:
    "inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#ffebb1] to-[#ffc438] px-5 py-2 text-sm font-medium text-[#18130a] shadow-[0_10px_30px_-14px_rgba(245,158,11,0.8)] transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-none [&_svg]:stroke-current",
  mobileMenu:
    "relative md:hidden [&_summary]:list-none [&_summary]:cursor-pointer [&_summary]:text-sm [&_summary]:text-zinc-400 [&_nav]:absolute [&_nav]:top-full [&_nav]:right-0 [&_nav]:mt-2 [&_nav]:grid [&_nav]:w-48 [&_nav]:rounded-lg [&_nav]:border [&_nav]:border-white/10 [&_nav]:bg-zinc-950/90 [&_nav]:p-2 [&_nav]:backdrop-blur-md [&_nav_a]:rounded-md [&_nav_a]:px-3 [&_nav_a]:py-2 [&_nav_a]:text-sm [&_nav_a]:text-zinc-400 [&_nav_a:hover]:bg-white/5 [&_nav_a:hover]:text-foreground",
  hero: "relative isolate mx-auto max-w-[1400px] overflow-hidden px-6 pt-40 pb-16 md:pt-44",
  heroCopy: "flex max-w-5xl flex-col items-start",
  eyebrow: "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400/80 mb-4",
  heroDescription: "mt-6 max-w-2xl text-left text-base md:text-lg leading-relaxed text-zinc-400",
  heroActions: "mt-10 flex flex-wrap items-center gap-4",
  secondaryAction:
    "group cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 ease-out hover:border-white/15 hover:bg-white/[0.08] active:scale-[0.98]",
  preview:
    "relative mx-auto mt-16 max-w-[1300px] overflow-hidden rounded-xl border border-white/10 bg-[#0F1012] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] [perspective:2000px] [transform-style:preserve-3d] [transform:rotateX(15deg)_rotateY(10deg)_rotateZ(-2deg)_translateY(2rem)] hover:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)_translateY(0)] hover:shadow-2xl hover:border-white/20",
  previewTopbar:
    "flex h-14 items-center justify-between border-b border-white/[0.05] px-4 bg-[#0F1012] [&_strong]:font-sans [&_strong]:text-[13px] [&_strong]:font-medium [&_strong]:text-foreground/90",
  previewState:
    "rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-400",
  previewBody:
    "grid h-[520px] grid-cols-[200px_minmax(0,1.2fr)_minmax(240px,0.6fr)] divide-x divide-white/[0.05] max-[900px]:grid-cols-1 max-[900px]:divide-x-0 max-[900px]:h-auto max-[900px]:[&_aside]:border-t max-[900px]:[&_aside]:border-white/[0.05]",
  previewRail: "flex flex-col items-center gap-6 py-5 font-mono text-[11px] text-zinc-500 bg-[#0F1012] h-full max-[900px]:hidden",
  railBrand: "font-semibold text-foreground text-sm tracking-tight mb-4",
  railActive: "!text-accent",
  previewContent: "flex min-w-0 flex-col justify-between p-8 bg-[#0B0C0E] h-full",
  caseMeta: "flex justify-between gap-4 font-mono text-[11px] text-zinc-500 uppercase",
  sampleClaim: "max-w-[20ch] text-left text-2xl md:text-3xl font-medium tracking-tight text-foreground my-8 leading-snug",
  stageLine: "grid grid-cols-3 gap-4 border-t border-white/[0.05] pt-4 font-mono text-[10px] text-zinc-500 uppercase",
  previewInspector:
    "p-6 bg-[#0B0C0E] h-full overflow-y-auto flex flex-col justify-between [&>p]:text-[13px] [&>p]:leading-relaxed [&>p]:text-zinc-400 [&_dl]:mt-6 [&_dl_div]:flex [&_dl_div]:justify-between [&_dl_div]:border-t [&_dl_div]:border-white/[0.05] [&_dl_div]:py-2.5 [&_dt]:font-mono [&_dt]:text-[10px] [&_dt]:text-zinc-500 [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-[12px] [&_dd]:text-foreground/90",
  statusStrip: "hidden",
  editorialSection: "relative mx-auto max-w-[1100px] overflow-hidden border-t border-white/[0.05] px-6 py-20 md:py-28",
  sectionMarker: "flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500 mb-6",
  sectionLead:
    "grid grid-cols-[1.2fr_0.8fr] gap-8 md:gap-16 items-start max-[750px]:grid-cols-1 [&_h2]:text-3xl md:text-4xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-zinc-400 [&_p]:mt-2",
  investigationGrid:
    "mt-12 grid grid-cols-1 md:grid-cols-2 rounded-xl border border-white/[0.08] bg-zinc-900/20 backdrop-blur-sm overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/[0.08]",
  documentPanel: "p-6 md:p-8 [&_blockquote]:text-lg [&_blockquote]:leading-relaxed [&_blockquote]:text-foreground/90 [&_blockquote]:italic [&_blockquote]:mb-6",
  panelLabel: "flex justify-between items-center font-mono text-[11px] text-zinc-500 uppercase mb-6",
  annotation:
    "mt-6 border-t border-white/[0.05] pt-4 grid grid-cols-[80px_1fr] gap-4 [&_span]:font-mono [&_span]:text-[10px] [&_span]:text-accent [&_span]:uppercase [&_p]:m-0 [&_p]:text-[13px] [&_p]:leading-relaxed [&_p]:text-zinc-400",
  evidencePanel: "p-6 md:p-8 bg-black/20",
  evidenceRecord:
    "flex gap-4 border-t border-white/[0.05] first:border-t-0 py-5 [&_strong]:text-base [&_strong]:font-medium [&_strong]:text-foreground [&_p]:mt-1 [&_p]:text-[13px] [&_p]:leading-relaxed [&_p]:text-zinc-400",
  evidenceIndex: "font-mono text-[11px] text-accent shrink-0",
  workflowList: "mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 list-none p-0",
  darkSection: "bg-[#0F1012]/30 border-y border-white/[0.05]",
  policyLayout:
    "grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-16 items-start [&_h2]:text-3xl md:text-4xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
  policyList:
    "grid grid-cols-1 gap-3 [&_p]:m-0 [&_p]:rounded-lg [&_p]:border [&_p]:border-white/5 [&_p]:bg-white/[0.02] [&_p]:px-4 [&_p]:py-3.5 [&_p]:text-sm [&_p]:text-zinc-400 [&_p]:flex [&_p]:items-center [&_p]:gap-2.5",
  systemGrid:
    "grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-8 md:gap-16 items-start [&_h2]:text-3xl md:text-4xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
  sectionDescription: "text-base leading-relaxed text-zinc-400",
  systemList:
    "m-0 list-none border-t border-white/[0.05] p-0 [&_li]:grid [&_li]:grid-cols-[40px_1fr] [&_li]:items-center [&_li]:gap-4 [&_li]:border-b [&_li]:border-white/[0.05] [&_li]:py-3.5 [&_span]:font-mono [&_span]:text-[11px] [&_span]:text-zinc-500 [&_strong]:text-[14px] [&_strong]:font-normal [&_strong]:text-foreground/90",
  splitSection:
    "grid grid-cols-1 md:grid-cols-2 border-y border-white/[0.05] divide-y md:divide-y-0 md:divide-x divide-white/[0.05] [&_article]:p-8 md:p-12 [&_h2]:text-2xl md:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:text-[14px] [&_p]:leading-relaxed [&_p]:text-zinc-400 [&_p]:mt-3",
  inlineLink:
    "mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:transition-transform [&_svg]:group-hover:translate-x-1",
  footer: "mx-auto max-w-[1400px] border-t border-white/[0.05] px-6 py-16 md:py-20",
  footerIdentity: "flex flex-col gap-2 [&_p]:text-sm [&_p]:text-zinc-500",
  footerLinks:
    "grid grid-cols-2 sm:grid-cols-3 gap-8 mt-12 md:mt-0 [&>div]:flex [&>div]:flex-col [&>div]:gap-2.5 [&_span]:font-mono [&_span]:text-[11px] [&_span]:text-zinc-500 [&_span]:uppercase [&_span]:tracking-wider [&_a]:text-[13px] [&_a]:text-zinc-400 [&_a:hover]:text-foreground [&_a]:transition-colors",
  footerBase:
    "flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/[0.05] mt-12 pt-6 font-mono text-[10px] text-zinc-500 uppercase tracking-wider",
} as const;
