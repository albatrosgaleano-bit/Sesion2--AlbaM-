import type { Route } from "next";

import { generateGeneticQrAction } from "@/app/(app)/geneticas/actions";
import { GeneticFlowerPhoto } from "@/components/genetics/genetic-flower-photo";
import { GeneticLineageCard } from "@/components/genetics/genetic-lineage-card";
import { QrPreviewCard } from "@/components/qr/qr-preview-card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getPhaseLabel } from "@/lib/phase-labels";
import { getGeneticsOverview } from "@/lib/genetics-data";

export default async function GeneticsPage() {
  const genetics = await getGeneticsOverview();

  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-700)]">Modulo de geneticas</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Genetica, QR propio y origen de la cadena de lotes</h1>
        <p className="mt-3 max-w-4xl text-base leading-7 text-[var(--color-text-secondary)]">
          Cada genetica tiene su QR propio y sirve como punto de partida para la secuencia de lotes: clones, vegetativo, floracion, cosecha y extraccion.
        </p>
      </section>

      <SectionCard title="Mapa de geneticas" description="Vista operativa para identificar geneticas y revisar la cadena de lotes derivada.">
        {genetics.length ? (
          <div className="grid gap-6">
            {genetics.map(({ genetic, currentLabel, currentQrSvg }) => (
              <article key={genetic.id} className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-primary-700)]">{genetic.cultivarCode ?? genetic.name}</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">{genetic.name}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)]">{genetic.description ?? "Genetica registrada para uso medicinal y trazabilidad interna."}</p>
                  </div>
                  <StatusBadge label={`${genetic.lots.length} lotes`} tone="info" />
                </div>

                <div className="mt-5 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-4">
                    <GeneticFlowerPhoto src={genetic.flowerImageUrl} alt={`Flor de ${genetic.name}`} />

                    {currentLabel && currentQrSvg ? (
                      <QrPreviewCard
                        title={`QR de genetica ${genetic.name}`}
                        code={currentLabel.code}
                        routePath={currentLabel.routePath as Route}
                        phase={null}
                        svgMarkup={currentQrSvg}
                        subtitle="Identificacion principal de la genetica para iniciar trazabilidad." 
                      />
                    ) : (
                      <div className="rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-white p-5">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">Sin QR de genetica</p>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Genera el QR maestro de esta genetica.</p>
                        <form action={generateGeneticQrAction} className="mt-4">
                          <input type="hidden" name="varietyId" value={genetic.id} />
                          <button type="submit" className="rounded-full bg-[var(--color-primary-700)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)]">
                            Generar QR genetica
                          </button>
                        </form>
                      </div>
                    )}

                    <GeneticLineageCard
                      lots={genetic.lots.map((lot) => ({
                        id: lot.id,
                        code: lot.code,
                        currentPhase: lot.currentPhase,
                        motherLotId: lot.motherLotId,
                      }))}
                    />
                  </div>

                  <div className="rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Secuencia trazable</p>
                    <div className="mt-4 space-y-3">
                      {genetic.lots.length ? (
                        genetic.lots.map((lot) => (
                          <div key={lot.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-mono text-xs text-[var(--color-primary-700)]">{lot.code}</p>
                                <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">{getPhaseLabel(lot.currentPhase)}</p>
                              </div>
                              <StatusBadge label={lot.qrLabels.find((label) => label.phase === lot.currentPhase) ? "QR listo" : "Sin QR"} tone={lot.qrLabels.find((label) => label.phase === lot.currentPhase) ? "success" : "warning"} />
                            </div>
                          </div>
                        ))
                      ) : (
                        <EmptyState title="Sin lotes derivados" description="Esta genetica aun no tiene cadena operativa asociada." />
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No hay geneticas registradas" description="Carga el seed o crea variedades para empezar la cadena de trazabilidad." />
        )}
      </SectionCard>
    </div>
  );
}
