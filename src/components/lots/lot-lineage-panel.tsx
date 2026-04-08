import Link from "next/link";

import { getPhaseLabel } from "@/lib/phase-labels";

import { StatusBadge } from "@/components/ui/status-badge";

type LineageNode = {
  id: string;
  code: string;
  currentPhase: string;
};

export function LotLineagePanel({
  genetic,
  parentLot,
  currentLot,
  childLots,
}: {
  genetic: { id: string; name: string } | null;
  parentLot: LineageNode | null;
  currentLot: LineageNode;
  childLots: LineageNode[];
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Trazabilidad hacia atras</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {genetic ? (
            <Link href={`/geneticas/${genetic.id}`} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-primary-50)] px-4 py-3 transition hover:border-[var(--color-primary-600)]">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-700)]">Genetica</div>
              <div className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">{genetic.name}</div>
            </Link>
          ) : null}

          {parentLot ? (
            <>
              <span className="text-[var(--color-text-muted)]">→</span>
              <Link href={`/lotes/${parentLot.id}`} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 transition hover:border-[var(--color-primary-600)]">
                <div className="font-mono text-xs text-[var(--color-primary-700)]">{parentLot.code}</div>
                <div className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">{getPhaseLabel(parentLot.currentPhase as never)}</div>
              </Link>
            </>
          ) : null}

          <span className="text-[var(--color-text-muted)]">→</span>
          <div className="rounded-2xl border border-[var(--color-primary-600)] bg-[var(--color-primary-50)] px-4 py-3">
            <div className="font-mono text-xs text-[var(--color-primary-700)]">{currentLot.code}</div>
            <div className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">{getPhaseLabel(currentLot.currentPhase as never)}</div>
            <div className="mt-2">
              <StatusBadge label="Actual" tone="info" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Lotes derivados</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {childLots.length ? (
            childLots.map((lot) => (
              <Link key={lot.id} href={`/lotes/${lot.id}`} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 transition hover:border-[var(--color-primary-600)]">
                <div className="font-mono text-xs text-[var(--color-primary-700)]">{lot.code}</div>
                <div className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">{getPhaseLabel(lot.currentPhase as never)}</div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-[var(--color-text-secondary)]">Este lote aun no tiene lotes hijos enlazados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
