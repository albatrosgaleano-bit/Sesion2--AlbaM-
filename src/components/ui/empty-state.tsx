export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-5 py-8 text-center">
      <p className="text-base font-semibold text-[var(--color-text-primary)]">{title}</p>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{description}</p>
    </div>
  );
}
