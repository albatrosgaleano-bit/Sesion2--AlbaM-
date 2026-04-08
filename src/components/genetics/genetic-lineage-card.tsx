import Link from "next/link";

import { getPhaseLabel } from "@/lib/phase-labels";

import { StatusBadge } from "@/components/ui/status-badge";

type LineageLot = {
  id: string;
  code: string;
  currentPhase: string;
  motherLotId: string | null;
};

export function GeneticLineageCard({ lots }: { lots: LineageLot[] }) {
  const sortedLots = [...lots].sort((a, b) => {
    const aWeight = a.motherLotId ? 1 : 0;
    const bWeight = b.motherLotId ? 1 : 0;

    return aWeight - bWeight;
  });

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Cadena base</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {sortedLots.map((lot, index) => (
          <div key={lot.id} className="flex items-center gap-3">
            <Link href={`/lotes/${lot.id}`} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 transition hover:border-[var(--color-primary-600)]">
              <div className="font-mono text-xs text-[var(--color-primary-700)]">{lot.code}</div>
              <div className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">{getPhaseLabel(lot.currentPhase as never)}</div>
            </Link>
            <StatusBadge label={String(index + 1)} tone="neutral" />
          </div>
        ))}
      </div>
    </div>
  );
}
