import { ReactNode } from "react";

export function TimelineEvent({
  title,
  subtitle,
  meta,
  badge,
}: {
  title: string;
  subtitle: string;
  meta: string;
  badge?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[14px_1fr] gap-3">
      <div className="flex flex-col items-center">
        <span className="mt-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--color-primary-600)] bg-[var(--color-surface)]" />
        <span className="mt-2 h-full min-h-6 w-px bg-[var(--color-border)]" />
      </div>
      <div className="pb-5">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <p className="font-semibold text-[var(--color-text-primary)]">{title}</p>
          {badge}
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{meta}</p>
      </div>
    </div>
  );
}
