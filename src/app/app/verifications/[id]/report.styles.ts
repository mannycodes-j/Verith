export const reportStyles = {
  report: "grid gap-5",
  reportHeader:
    "grid grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.45fr)] gap-[clamp(2rem,6vw,6rem)] rounded-[2rem] bg-[radial-gradient(circle_at_12%_0%,rgba(139,92,246,0.18),transparent_28rem),#11141a] p-[clamp(2rem,6vw,5rem)] max-[800px]:grid-cols-1 [&>div>span]:text-xs [&>div>span]:font-semibold [&>div>span]:text-violet-300 [&_h2]:my-5 [&_h2]:text-[clamp(2.75rem,5vw,5rem)] [&_h2]:leading-[0.98] [&_h2]:font-semibold [&_p]:leading-[1.65] [&_p]:text-muted-foreground [&_dl]:m-0 [&_dl]:grid [&_dl]:gap-2 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:gap-4 [&_dl_div]:rounded-xl [&_dl_div]:bg-white/[0.035] [&_dl_div]:px-3 [&_dl_div]:py-3 [&_dt]:text-xs [&_dt]:text-muted [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-xs",
  findings:
    "grid grid-cols-2 gap-5 max-[700px]:grid-cols-1 [&>div]:rounded-3xl [&>div]:bg-surface/70 [&>div]:p-[clamp(2rem,5vw,4rem)] [&_span]:text-xs [&_span]:font-semibold [&_span]:text-cyan-300 [&_p]:leading-[1.65] [&_p]:text-muted-foreground [&_ol]:pl-5 [&_li]:py-2",
  claimWorkspace:
    "grid grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.55fr)] gap-5 max-[900px]:grid-cols-1",
  claims: "min-w-0 rounded-3xl bg-surface/70",
  sectionHeading:
    "flex justify-between gap-4  p-4 font-sans text-[0.58rem] tracking-normal text-muted normal-case",
  claim:
    " p-[clamp(2rem,5vw,5rem)] [&>header]:flex [&>header]:justify-between [&>header]:gap-4 [&>header_span]:font-sans [&>header_span]:text-[0.58rem] [&>header_span]:text-muted [&>header_span]:normal-case [&_h3]:font-editorial [&_h3]:text-[clamp(2rem,4vw,4rem)] [&_h3]:font-normal [&_h3]:tracking-normal [&>p]:leading-[1.65] [&>p]:text-muted-foreground",
  claimMeta: "flex flex-wrap gap-4 font-sans text-[0.58rem] text-muted normal-case",
  evidenceGroup:
    "mt-8  pt-4 [&>span]:mb-2 [&>span]:block [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&_button]:grid [&_button]:w-full [&_button]:gap-1 [&_button]:border-0  [&_button]:bg-transparent [&_button]:py-4 [&_button]:text-left [&_strong]:text-sm [&_small]:text-[0.68rem] [&_small]:text-muted-foreground",
  claimCaveats:
    "mt-8 border-l-2 border-warning p-4 [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&_ul]:mb-0 [&_li]:py-1 [&_li]:text-sm [&_li]:text-muted-foreground",
  inspector:
    "sticky top-24 min-h-120 self-start rounded-3xl bg-gradient-to-br from-cyan-500/10 to-violet-500/[0.05] p-[clamp(1.5rem,4vw,3rem)] max-[900px]:static",
  inspectorLabel:
    "flex justify-between gap-4 font-sans text-[0.58rem] text-muted normal-case",
  noSelection:
    "flex min-h-90 flex-col justify-center [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&_h3]:font-editorial [&_h3]:text-[clamp(2rem,4vw,4rem)] [&_h3]:font-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  evidenceDetail:
    "[&_h3]:font-editorial [&_h3]:text-[clamp(2rem,4vw,4rem)] [&_h3]:font-normal [&_dl]:m-0 [&_dl_div]:grid [&_dl_div]:grid-cols-2 [&_dl_div]:gap-4 [&_dl_div]:rounded-xl [&_dl_div]:bg-white/[0.025] [&_dl_div]:px-3 [&_dl_div]:py-3 [&_dt]:font-sans [&_dt]:text-[0.58rem] [&_dt]:text-muted [&_dt]:normal-case [&_dd]:m-0 [&_dd]:text-right [&_dd]:text-[0.7rem] [&_blockquote]:mx-0 [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:leading-[1.6] [&>a]:inline-flex [&>a]:gap-3 [&>a]:border [&>a]:border-border-strong [&>a]:p-3 [&>a]:font-sans [&>a]:text-[0.58rem] [&>a]:normal-case",
  unavailable: "text-sm text-muted-foreground",
  analysisGrid: "grid grid-cols-2 max-[850px]:grid-cols-1",
  analysisSection:
    " even:border-l even:border-border-strong max-[850px]:border-l-0 [&>article]:p-[clamp(1.5rem,4vw,4rem)] [&>article+article]:border-t [&>article+article]:border-border [&_article_header]:flex [&_article_header]:justify-between [&_article_header]:gap-4 [&_article_header_span]:font-sans [&_article_header_span]:text-[0.58rem] [&_article_header_span]:text-muted [&_article_header_span]:normal-case [&_article_header_strong]:font-editorial [&_article_header_strong]:text-2xl [&_article_header_strong]:font-normal [&_article_p]:leading-[1.6] [&_article_p]:text-muted-foreground [&_article_blockquote]:mx-0 [&_article_blockquote]:border-l-2 [&_article_blockquote]:border-accent [&_article_blockquote]:pl-5 [&_dl_div]:rounded-xl [&_dl_div]:bg-white/[0.025] [&_dl_div]:px-3 [&_dl_div]:py-3 [&_dt]:font-sans [&_dt]:text-[0.58rem] [&_dt]:text-muted [&_dt]:normal-case [&_dd]:m-0 [&_dd]:mt-2 [&_dd]:text-sm [&_small]:text-muted-foreground",
  score: "mt-5 h-1 bg-surface-muted [&>span]:block [&>span]:h-full [&>span]:bg-accent",
  emptySection: "p-[clamp(2rem,4vw,4rem)] text-sm text-muted-foreground",
  media:
    "grid grid-cols-2  max-[750px]:grid-cols-1 [&>.sectionHeading]:col-span-full [&_article]:p-[clamp(2rem,4vw,4rem)] [&_article+article]:border-l [&_article+article]:border-border-strong max-[750px]:[&_article+article]:border-l-0 max-[750px]:[&_article+article]:border-t [&_article>span]:font-sans [&_article>span]:text-[0.58rem] [&_article>span]:text-muted [&_article>span]:normal-case [&_h3]:font-editorial [&_h3]:text-3xl [&_h3]:font-normal [&_p]:leading-[1.6] [&_p]:text-muted-foreground [&_article_div]:grid [&_article_div]:grid-cols-2 [&_article_div]:gap-4 [&_article_div]:border-t [&_article_div]:border-border [&_article_div]:py-3 [&_article_strong]:text-right",
  limitations:
    "border-t border-amber-400/15 bg-amber-400/[0.055] p-[clamp(2rem,6vw,6rem)] text-foreground [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-accent [&>span]:normal-case [&_h2]:text-[clamp(2.6rem,5vw,5rem)] [&_h2]:font-medium [&_ol]:pl-5 [&_li]:py-2 [&_li]:leading-[1.6] [&_li]:text-muted-foreground [&_p]:leading-[1.6] [&_p]:text-muted-foreground",
  reportLoading:
    "rounded-2xl border border-white/[0.08] bg-surface/60 p-[clamp(2rem,6vw,6rem)] [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-[clamp(3rem,6vw,6rem)] [&_h2]:font-normal [&_div]:mt-px [&_div]:h-20 [&_div]:animate-pulse [&_div]:bg-surface-muted",
  reportError:
    "border border-danger p-[clamp(2rem,6vw,6rem)] [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&_h2]:font-editorial [&_h2]:text-[clamp(3rem,6vw,6rem)] [&_h2]:font-normal [&_p]:text-muted-foreground [&_button]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button]:p-3 [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:text-white [&_button]:normal-case",
  reportVersions:
    "flex flex-wrap items-center gap-2 border-x  p-4 [&>span]:mr-auto [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:text-muted [&>span]:normal-case [&>div]:flex [&>div]:flex-wrap [&>div]:gap-2 [&_button]:border [&_button]:border-border-strong [&_button]:bg-transparent [&_button]:p-2 [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:normal-case [&_button[data-active=true]]:bg-gradient-to-r from-violet-500 to-indigo-500 [&_button[data-active=true]]:text-white [&_small]:font-sans [&_small]:text-[0.58rem] [&_small]:text-muted [&_small]:normal-case",
} as const;
