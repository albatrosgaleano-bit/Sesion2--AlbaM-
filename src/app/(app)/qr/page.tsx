import type { Route } from "next";

import { generateLotPhaseQrAction } from "@/app/(app)/qr/actions";
import { QrPreviewCard } from "@/components/qr/qr-preview-card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getPhaseLabel } from "@/lib/phase-labels";
import { getQrOverview } from "@/lib/qr";

export default async function QrPage() {
  const items = await getQrOverview();

  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-700)]">Modulo QR</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Un QR distinto para cada fase operativa</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)]">
          Cada lote puede tener una etiqueta QR especifica para su fase actual. Cuando el lote cambia de fase, se genera una nueva etiqueta sin perder el historial previo.
        </p>
      </section>

      <SectionCard title="Etiquetas por lote y fase" description="Genera o consulta el QR activo de cada lote segun su fase operativa actual.">
        {items.length ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {items.map(({ lot, currentPhaseLabel, currentQrSvg }) => (
              <div key={lot.id} className="space-y-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-primary-700)]">{lot.code}</p>
                    <h2 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">{lot.name ?? lot.variety?.name ?? "Lote sin nombre"}</h2>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Fase actual: {getPhaseLabel(lot.currentPhase)}</p>
                  </div>
                  <StatusBadge label={lot.status} tone={lot.status === "ACTIVE" ? "success" : "neutral"} />
                </div>

                {currentPhaseLabel && currentQrSvg ? (
                  <QrPreviewCard
                    title={`QR de ${getPhaseLabel(lot.currentPhase)}`}
                    code={currentPhaseLabel.code}
                    routePath={currentPhaseLabel.routePath as Route}
                    phase={currentPhaseLabel.phase}
                    svgMarkup={currentQrSvg}
                    subtitle="Etiqueta activa para identificacion, consulta interna y continuidad de trazabilidad."
                  />
                ) : (
                  <div className="rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-white p-5">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">No existe QR para la fase actual</p>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      Genera la etiqueta de {getPhaseLabel(lot.currentPhase)} para este lote.
                    </p>
                    <form action={generateLotPhaseQrAction} className="mt-4">
                      <input type="hidden" name="lotId" value={lot.id} />
                      <button type="submit" className="rounded-full bg-[var(--color-primary-700)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)]">
                        Generar QR de fase
                      </button>
                    </form>
                  </div>
                )}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Historial QR del lote</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {lot.qrLabels.length ? (
                      lot.qrLabels.map((label) => (
                        <StatusBadge key={label.id} label={getPhaseLabel(label.phase)} tone={label.phase === lot.currentPhase ? "info" : "neutral"} />
                      ))
                    ) : (
                      <span className="text-sm text-[var(--color-text-secondary)]">Sin etiquetas registradas.</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="Sin lotes disponibles" description="Ejecuta el seed o crea lotes nuevos para generar etiquetas QR por fase." />
        )}
      </SectionCard>
    </div>
  );
}
