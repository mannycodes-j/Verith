import { vectraStyles as ui } from "@/lib/vectra-styles";

export const verifyStyles = {
	page: ui.page,
	header: `${ui.pageHeader} [&>div]:flex [&>div]:flex-wrap [&>div]:gap-3 [&>div_span]:text-[12px] [&>div_span]:font-bold [&>div_span]:uppercase [&>div_span]:tracking-[0.14em] [&>div_span]:text-violet-400 [&>div_span:first-child]:before:mr-2 [&>div_span:first-child]:before:inline-flex [&>div_span:first-child]:before:size-1.5 [&>div_span:first-child]:before:rounded-full [&>div_span:first-child]:before:bg-violet-400`,
	workspace: "grid grid-cols-[minmax(0,1fr)_360px] items-start gap-6 max-lg:grid-cols-1",
	composer: `${ui.card} min-w-0`,
	tabs: "flex gap-2 overflow-x-auto border-b border-white/[0.05] p-4 [&_button]:rounded-full [&_button]:border [&_button]:border-white/[0.05] [&_button]:bg-white/[0.02] [&_button]:px-5 [&_button]:py-2.5 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white/60 [&_button]:transition-all [&_button:hover]:bg-white/[0.05]",
	activeTab: "!border-violet-400/25 !bg-violet-500/10 !text-violet-300 shadow-[0_0_30px_rgba(139,92,246,0.08)]",
	primaryInput: `grid gap-3 p-1 [&>label]:text-[12px] [&>label]:font-bold [&>label]:uppercase [&>label]:tracking-[0.14em] [&>label]:text-white/60 [&_textarea]:min-h-64 [&_textarea]:resize-y [&>input]:min-h-14 ${ui.field}`,
	mediaState: "m-6 rounded-3xl border border-dashed border-violet-400/20 bg-violet-500/[0.035] p-7 [&>span]:text-[10px] [&>span]:uppercase [&>span]:tracking-[0.12em] [&>span]:text-violet-300 [&_h2]:mt-4 [&_h2]:text-3xl [&_h2]:font-semibold [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/50",
	fileInput: "relative grid cursor-pointer gap-3 rounded-2xl border border-dashed border-violet-400/25 bg-black/20 p-7 transition-all hover:border-violet-400/40 hover:bg-violet-500/[0.06] [&>span]:text-xs [&>span]:text-violet-300 [&>strong]:text-lg [&>strong]:font-medium [&_input]:absolute [&_input]:inset-0 [&_input]:cursor-pointer [&_input]:opacity-0",
	uploadProgress:
		"p-6 [&>div:first-child]:flex [&>div:first-child]:justify-between [&>div:first-child_span]:text-[10px] [&>div:first-child_span]:uppercase [&>div:first-child_span]:tracking-[0.12em] [&>div:first-child_span]:text-white/35 [&>div:first-child_strong]:font-mono [&>div:first-child_strong]:text-xs [&>div:last-child]:mt-3 [&>div:last-child]:h-1.5 [&>div:last-child]:overflow-hidden [&>div:last-child]:rounded-full [&>div:last-child]:bg-white/[0.05] [&>div:last-child_span]:block [&>div:last-child_span]:h-full [&>div:last-child_span]:rounded-full [&>div:last-child_span]:bg-gradient-to-r [&>div:last-child_span]:from-[#C084FC] [&>div:last-child_span]:to-[#6366F1]",
	options: "grid grid-cols-2 gap-4 border-t border-white/[0.05] p-6 md:p-8 max-md:grid-cols-1",
	field: ui.field,
	fieldHint: "m-0 text-[11px] leading-relaxed text-white/35",
	fieldError: "m-0 text-[11px] text-danger",
	errorState: "m-6 rounded-2xl border border-danger/20 bg-danger/[0.06] p-5 [&_strong]:text-xs [&_strong]:text-danger [&_span]:font-mono [&_span]:text-[10px] [&_span]:text-white/35 [&_p]:text-sm [&_p]:text-white/50",
	submitRow: "flex items-center justify-between gap-6 border-t border-white/[0.05] p-6 [&>span]:text-[11px] [&>span]:text-white/35 [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-gradient-to-r [&_button]:from-[#C084FC] [&_button]:to-[#6366F1] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white [&_button]:transition-all [&_button:hover]:scale-[1.02] [&_button:disabled]:opacity-50",
	guidance: `${ui.card} sticky top-24 p-6 max-lg:static [&_span]:text-[12px] [&_span]:font-bold [&_span]:uppercase [&_span]:tracking-[0.14em] [&_span]:text-cyan-400 [&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_dl]:m-0 [&_dl]:mt-6 [&_dl]:grid [&_dl]:gap-3 [&_dl_div]:grid [&_dl_div]:gap-2 [&_dl_div]:rounded-2xl [&_dl_div]:border [&_dl_div]:border-white/[0.04] [&_dl_div]:bg-white/[0.02] [&_dl_div]:p-4 [&_dt]:text-[12px] [&_dt]:font-bold [&_dt]:uppercase [&_dt]:tracking-[0.1em] [&_dt]:text-white/80 [&_dd]:m-0 [&_dd]:text-sm [&_dd]:leading-relaxed [&_dd]:text-white/70`,
	limit: "mt-6 border-t border-white/[0.05] pt-5 [&_span]:text-[12px] [&_span]:font-bold [&_span]:uppercase [&_span]:tracking-[0.1em] [&_span]:text-white/80 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/60",
} as const;
