type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

const toneClassMap: Record<StatusTone, string> = {
  success: "bg-[var(--color-success-bg)] text-[var(--color-success)] border-[var(--color-success-border)]",
  warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)] border-[var(--color-warning-border)]",
  danger: "bg-[var(--color-danger-bg)] text-[var(--color-danger)] border-[var(--color-danger-border)]",
  info: "bg-[var(--color-info-bg)] text-[var(--color-info)] border-[var(--color-info-border)]",
  neutral: "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
};

export function StatusBadge({ label, tone = "neutral" }: { label: string; tone?: StatusTone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${toneClassMap[tone]}`}
    >
      {label}
    </span>
  );
}
