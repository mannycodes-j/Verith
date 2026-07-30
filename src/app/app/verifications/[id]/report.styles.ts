export const reportStyles = {
  report: "overflow-hidden rounded-2xl border border-white/10 bg-[#050505] shadow-[0_30px_80px_-55px_rgba(245,158,11,0.28)]",
  reportHeader:
    "grid grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.45fr)] gap-[clamp(2rem,6vw,6rem)] bg-[radial-gradient(circle_at_12%_0%,rgba(245,158,11,0.1),transparent_28rem)] p-[clamp(2rem,6vw,6rem)] max-[800px]:grid-cols-1 [&>div>span]:font-mono [&>div>span]:text-[0.58rem] [&>div>span]:tracking-[0.14em] [&>div>span]:text-accent [&>div>span]:uppercase [&_h2]:my-5 [&_h2]:text-[clamp(3rem,6vw,6rem)] [&_h2]:leading-[0.98] [&_h2]:font-semibold [&_h2]:tracking-[-0.055em] [&_p]:leading-[1.65] [&_p]:text-muted-foreground [&_dl]:m-0 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:gap-4 [&_dl_div]:border-t [&_dl_div]:border-border [&_dl_div]:py-3 [&_dt]:font-mono [&_dt]:text-[0.58rem] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.7rem]",
  findings:
    "grid grid-cols-2 border-y border-border-strong max-[700px]:grid-cols-1 [&>div]:p-[clamp(2rem,5vw,5rem)] [&>div+div]:border-l [&>div+div]:border-border-strong max-[700px]:[&>div+div]:border-l-0 max-[700px]:[&>div+div]:border-t [&_span]:font-mono [&_span]:text-[0.58rem] [&_span]:text-muted [&_span]:uppercase [&_p]:leading-[1.65] [&_p]:text-muted-foreground [&_ol]:pl-5 [&_li]:py-2",
  claimWorkspace:
    "grid grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.55fr)] border-b border-border-strong max-[900px]:grid-cols-1",
  claims: "min-w-0 border-r border-border-strong max-[900px]:border-r-0 max-[900px]:border-b",
  sectionHeading:
    "flex justify-between gap-4 border-b border-border-strong p-4 font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase",
  claim:
    "border-b border-border p-[clamp(2rem,5vw,5rem)] [&>header]:flex [&>header]:justify-between [&>header]:gap-4 [&>header_span]:font-mono [&>header_span]:text-[0.58rem] [&>header_span]:text-muted [&>header_span]:uppercase [&_h3]:font-editorial [&_h3]:text-[clamp(2rem,4vw,4rem)] [&_h3]:font-normal [&_h3]:tracking-[-0.045em] [&>p]:leading-[1.65] [&>p]:text-muted-foreground",
  claimMeta: "flex flex-wrap gap-4 font-mono text-[0.58rem] text-muted uppercase",
  evidenceGroup:
    "mt-8 border-t border-border pt-4 [&>span]:mb-2 [&>span]:block [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&_button]:grid [&_button]:w-full [&_button]:gap-1 [&_button]:border-0 [&_button]:border-b [&_button]:border-border [&_button]:bg-transparent [&_button]:py-4 [&_button]:text-left [&_strong]:text-sm [&_small]:text-[0.68rem] [&_small]:text-muted-foreground",
  claimCaveats:
    "mt-8 border-l-2 border-warning p-4 [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&_ul]:mb-0 [&_li]:py-1 [&_li]:text-sm [&_li]:text-muted-foreground",
  inspector:
    "sticky top-17.5 min-h-120 self-start p-[clamp(1.5rem,4vw,4rem)] max-[900px]:static",
  inspectorLabel:
    "flex justify-between gap-4 font-mono text-[0.58rem] text-muted uppercase",
  noSelection:
    "flex min-h-90 flex-col justify-center [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&_h3]:font-editorial [&_h3]:text-[clamp(2rem,4vw,4rem)] [&_h3]:font-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  evidenceDetail:
    "[&_h3]:font-editorial [&_h3]:text-[clamp(2rem,4vw,4rem)] [&_h3]:font-normal [&_dl]:m-0 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:gap-4 [&_dl_div]:border-t [&_dl_div]:border-border [&_dl_div]:py-3 [&_dt]:font-mono [&_dt]:text-[0.58rem] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.7rem] [&_blockquote]:mx-0 [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:leading-[1.6] [&>a]:inline-flex [&>a]:gap-3 [&>a]:border [&>a]:border-border-strong [&>a]:p-3 [&>a]:font-mono [&>a]:text-[0.58rem] [&>a]:uppercase",
  unavailable: "text-sm text-muted-foreground",
  analysisGrid: "grid grid-cols-2 max-[850px]:grid-cols-1",
  analysisSection:
    "border-b border-border-strong even:border-l even:border-border-strong max-[850px]:border-l-0 [&>article]:p-[clamp(1.5rem,4vw,4rem)] [&>article+article]:border-t [&>article+article]:border-border [&_article_header]:flex [&_article_header]:justify-between [&_article_header]:gap-4 [&_article_header_span]:font-mono [&_article_header_span]:text-[0.58rem] [&_article_header_span]:text-muted [&_article_header_span]:uppercase [&_article_header_strong]:font-editorial [&_article_header_strong]:text-2xl [&_article_header_strong]:font-normal [&_article_p]:leading-[1.6] [&_article_p]:text-muted-foreground [&_article_blockquote]:mx-0 [&_article_blockquote]:border-l-2 [&_article_blockquote]:border-accent [&_article_blockquote]:pl-5 [&_dl_div]:border-t [&_dl_div]:border-border [&_dl_div]:py-3 [&_dt]:font-mono [&_dt]:text-[0.58rem] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:m-0 [&_dd]:mt-2 [&_dd]:text-sm [&_small]:text-muted-foreground",
  score: "mt-5 h-1 bg-surface-muted [&>span]:block [&>span]:h-full [&>span]:bg-accent",
  emptySection: "p-[clamp(2rem,4vw,4rem)] text-sm text-muted-foreground",
  media:
    "grid grid-cols-2 border-b border-border-strong max-[750px]:grid-cols-1 [&>.sectionHeading]:col-span-full [&_article]:p-[clamp(2rem,4vw,4rem)] [&_article+article]:border-l [&_article+article]:border-border-strong max-[750px]:[&_article+article]:border-l-0 max-[750px]:[&_article+article]:border-t [&_article>span]:font-mono [&_article>span]:text-[0.58rem] [&_article>span]:text-muted [&_article>span]:uppercase [&_h3]:font-editorial [&_h3]:text-3xl [&_h3]:font-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_article_div]:grid [&_article_div]:grid-cols-2 [&_article_div]:gap-4 [&_article_div]:border-t [&_article_div]:border-border [&_article_div]:py-3 [&_article_strong]:text-right",
  limitations:
    "border-t border-amber-400/15 bg-amber-400/[0.055] p-[clamp(2rem,6vw,6rem)] text-foreground [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-accent [&>span]:uppercase [&_h2]:text-[clamp(2.6rem,5vw,5rem)] [&_h2]:font-medium [&_ol]:pl-5 [&_li]:py-2 [&_li]:leading-[1.6] [&_li]:text-muted-foreground [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  reportLoading:
    "border border-border-strong p-[clamp(2rem,6vw,6rem)] [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(3rem,6vw,6rem)] [&_h2]:font-normal [&_div]:mt-px [&_div]:h-20 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  reportError:
    "border border-danger p-[clamp(2rem,6vw,6rem)] [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&_h2]:font-editorial [&_h2]:text-[clamp(3rem,6vw,6rem)] [&_h2]:font-normal [&_p]:text-muted-foreground [&_button]:bg-foreground [&_button]:p-3 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:text-background [&_button]:uppercase",
  reportVersions:
    "flex flex-wrap items-center gap-2 border-x border-t border-border-strong p-4 [&>span]:mr-auto [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:uppercase [&>div]:flex [&>div]:flex-wrap [&>div]:gap-2 [&_button]:border [&_button]:border-border-strong [&_button]:bg-transparent [&_button]:p-2 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:uppercase [&_button[data-active=true]]:bg-foreground [&_button[data-active=true]]:text-background [&_small]:font-mono [&_small]:text-[0.58rem] [&_small]:text-muted [&_small]:uppercase",
} as const;
