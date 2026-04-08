import { ReactNode } from "react";

export function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(243,249,245,0.9))] p-5 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-center justify-between text-[var(--color-text-secondary)]">
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">{label}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{value}</div>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{detail}</p>
    </div>
  );
}
