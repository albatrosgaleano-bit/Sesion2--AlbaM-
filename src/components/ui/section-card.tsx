import { ReactNode } from "react";

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>
        {description ? <p className="text-sm text-[var(--color-text-secondary)]">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
