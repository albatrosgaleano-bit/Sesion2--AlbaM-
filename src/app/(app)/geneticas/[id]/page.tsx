import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { generateGeneticQrAction, uploadGeneticFlowerPhotoAction } from "@/app/(app)/geneticas/actions";
import { GeneticFlowerPhoto } from "@/components/genetics/genetic-flower-photo";
import { GeneticLineageCard } from "@/components/genetics/genetic-lineage-card";
import { QrPreviewCard } from "@/components/qr/qr-preview-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getPhaseLabel } from "@/lib/phase-labels";
import { getGeneticDetail } from "@/lib/genetics-data";

export default async function GeneticDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getGeneticDetail(id);

  if (!data) {
    notFound();
  }

  const { genetic, currentLabel, currentQrSvg } = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
        <Link href="/geneticas" className="text-[var(--color-primary-700)] hover:underline">
          Volver a geneticas
        </Link>
        <span>/</span>
        <span className="font-mono">{genetic.name}</span>
      </div>

      <SectionCard title={genetic.name} description="Origen genetico del que derivan los lotes operativos.">
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <GeneticFlowerPhoto src={genetic.flowerImageUrl} alt={`Flor de ${genetic.name}`} />

            <div className="rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Foto de flor</p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Sube una imagen real de la flor de esta genetica. Se guarda localmente en el servidor.</p>
                </div>
                <StatusBadge label={genetic.flowerImageUrl ? "Disponible" : "Pendiente"} tone={genetic.flowerImageUrl ? "success" : "warning"} />
              </div>

              <form action={uploadGeneticFlowerPhotoAction} className="mt-4 space-y-4">
                <input type="hidden" name="varietyId" value={genetic.id} />
                <input
                  type="file"
                  name="photo"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="block w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm text-[var(--color-text-primary)]"
                />
                <button type="submit" className="rounded-full bg-[var(--color-primary-700)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)]">
                  Guardar foto de genetica
                </button>
              </form>
            </div>
          </div>

          <div>
            {currentLabel && currentQrSvg ? (
              <QrPreviewCard
                title={`QR genetica ${genetic.name}`}
                code={currentLabel.code}
                routePath={currentLabel.routePath as Route}
                phase={null}
                svgMarkup={currentQrSvg}
              />
            ) : (
              <form action={generateGeneticQrAction} className="mt-4">
                <input type="hidden" name="varietyId" value={genetic.id} />
                <button type="submit" className="rounded-full bg-[var(--color-primary-700)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)]">
                  Generar QR genetica
                </button>
              </form>
            )}
          </div>
        </div>
      </SectionCard>

      <GeneticLineageCard
        lots={genetic.lots.map((lot) => ({
          id: lot.id,
          code: lot.code,
          currentPhase: lot.currentPhase,
          motherLotId: lot.motherLotId,
        }))}
      />

      <SectionCard title="Lotes derivados" description="Cadena completa desde clones hasta extraccion.">
        <div className="grid gap-3">
          {genetic.lots.map((lot) => (
            <Link key={lot.id} href={`/lotes/${lot.id}`} className="rounded-2xl border border-[var(--color-border)] bg-white p-4 transition hover:border-[var(--color-primary-600)]">
              <div className="font-mono text-xs text-[var(--color-primary-700)]">{lot.code}</div>
              <div className="mt-1 text-base font-semibold text-[var(--color-text-primary)]">{getPhaseLabel(lot.currentPhase)}</div>
            </Link>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
