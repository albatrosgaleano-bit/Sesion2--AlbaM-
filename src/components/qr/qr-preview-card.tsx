import { PhaseType } from "@prisma/client";
import type { Route } from "next";
import Link from "next/link";

import { getPhaseLabel } from "@/lib/phase-labels";

import { StatusBadge } from "@/components/ui/status-badge";

type QrPreviewCardProps = {
  title: string;
  code: string;
  routePath: Route;
  phase: PhaseType | null;
  svgMarkup: string;
  subtitle?: string;
};

export function QrPreviewCard({ title, code, routePath, phase, svgMarkup, subtitle }: QrPreviewCardProps) {
  return (
    <article className="rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-700)]">QR activo</p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{subtitle}</p> : null}
        </div>
        <StatusBadge label={phase ? getPhaseLabel(phase) : "General"} tone="info" />
      </div>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center">
        <div
          className="flex w-full max-w-[240px] items-center justify-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Codigo</p>
            <p className="mt-1 font-mono text-[var(--color-text-primary)]">{code}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Ruta interna</p>
            <p className="mt-1 text-[var(--color-text-primary)]">{routePath}</p>
          </div>
          <Link href={routePath} className="inline-flex rounded-full border border-[var(--color-border-strong)] px-4 py-2 font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]">
            Abrir destino
          </Link>
        </div>
      </div>
    </article>
  );
}
