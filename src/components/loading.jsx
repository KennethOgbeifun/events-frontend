export default function LoadingBox({ active = false, label = "Loading…" }) {
  return (
    <div
      className={`loading-box ${active ? "active" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={active}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="spinner" />
        <div className="text-[var(--ink)] font-medium">{label}</div>
      </div>
    </div>
  );
}