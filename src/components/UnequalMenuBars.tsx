export default function UnequalMenuBars() {
  return (
    <span
      aria-hidden="true"
      className="grid w-5 justify-items-end gap-1 text-current"
    >
      <span className="h-0.5 w-5 rounded-full bg-current" />
      <span className="h-0.5 w-3.5 rounded-full bg-current" />
      <span className="h-0.5 w-4 rounded-full bg-current" />
    </span>
  );
}
