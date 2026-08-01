const sizes = {
  sm: { mark: "size-8", inset: "rounded-[11px]", text: "text-sm", word: "text-[17px]" },
  md: { mark: "size-11", inset: "rounded-[15px]", text: "text-base", word: "text-xl" },
} as const;

export default function VerithLogo({
  className = "",
  markOnly = false,
  size = "sm",
}: {
  className?: string;
  markOnly?: boolean;
  size?: keyof typeof sizes;
}) {
  const current = sizes[size];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className={`relative grid ${current.mark} shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300 p-px shadow-[0_12px_32px_-14px_rgba(139,92,246,.85)]`}
      >
        <span className={`grid size-full place-items-center ${current.inset} bg-[#0a0a0d] ${current.text} font-black text-white`}>
          V
        </span>
      </span>
      {!markOnly && (
        <span className={`${current.word} font-bold tracking-[-0.04em] text-white`}>
          Verith<span className="text-violet-400">°</span>
        </span>
      )}
    </span>
  );
}
