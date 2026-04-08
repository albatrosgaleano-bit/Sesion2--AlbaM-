import Link from "next/link";

import { StatusBadge } from "@/components/ui/status-badge";

export function LotSummaryPanel({
  id,
  code,
  phase,
  status,
  variety,
  responsible,
  incidents,
}: {
  id: string;
  code: string;
  phase: string;
  status: string;
  variety: string;
  responsible: string;
  incidents: number;
}) {
  const tone = incidents > 0 ? "warning" : status === "ACTIVE" ? "success" : "neutral";

  return (
    <article className="rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-primary-700)]">{code}</p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">{variety}</h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Responsable: {responsible}</p>
        </div>
        <StatusBadge label={status} tone={tone} />
      </div>

      <div className="mt-4 grid gap-3 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Fase</div>
          <div className="mt-1 text-[var(--color-text-primary)]">{phase}</div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Alertas abiertas</div>
          <div className="mt-1 text-[var(--color-text-primary)]">{incidents}</div>
        </div>
      </div>

      <Link
        href={`/lotes/${id}`}
        className="mt-5 inline-flex rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]"
      >
        Ver detalle
      </Link>
    </article>
  );
}
