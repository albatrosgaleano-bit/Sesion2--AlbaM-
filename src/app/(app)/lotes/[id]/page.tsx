import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { generateLotPhaseQrAction } from "@/app/(app)/qr/actions";
import { LotLineagePanel } from "@/components/lots/lot-lineage-panel";
import { QrPreviewCard } from "@/components/qr/qr-preview-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { TimelineEvent } from "@/components/ui/timeline-event";
import { GeneticFlowerPhoto } from "@/components/genetics/genetic-flower-photo";
import { getLotDetail } from "@/lib/dashboard-data";
import { getPhaseLabel } from "@/lib/phase-labels";
import { getLotCurrentPhaseQr } from "@/lib/qr";

export default async function LotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { lot } = await getLotDetail(id);
  const qrData = await getLotCurrentPhaseQr(id);

  if (!lot) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
        <Link href="/lotes" className="text-[var(--color-primary-700)] hover:underline">
          Volver a lotes
        </Link>
        <span>/</span>
        <span className="font-mono">{lot.code}</span>
      </div>

      <section className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-primary-700)]">{lot.code}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{lot.name ?? lot.variety?.name ?? "Lote sin nombre"}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)]">{lot.notes ?? "Detalle base preparado para transiciones, incidencias y trazabilidad hacia cosecha/procesado."}</p>
          </div>
          <div className="flex gap-2">
            <StatusBadge label={lot.currentPhase} tone="info" />
            <StatusBadge label={lot.status} tone={lot.status === "ACTIVE" ? "success" : "neutral"} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.3fr]">
        <SectionCard title="Resumen del lote" description="Informacion operativa principal para consulta rapida.">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Variedad</dt>
              <dd className="mt-1 text-[var(--color-text-primary)]">{lot.variety?.name ?? "Sin variedad"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Origen</dt>
              <dd className="mt-1 text-[var(--color-text-primary)]">{lot.originType}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Responsable</dt>
              <dd className="mt-1 text-[var(--color-text-primary)]">{lot.responsibleUser?.fullName ?? lot.responsibleUser?.username ?? "Sin asignar"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">QR activo</dt>
              <dd className="mt-1 text-[var(--color-text-primary)]">{qrData?.currentPhaseLabel?.code ?? "Pendiente"}</dd>
            </div>
          </dl>

          <div className="mt-6">
            {qrData?.currentPhaseLabel && qrData.currentQrSvg ? (
              <QrPreviewCard
                title={`QR de fase ${getPhaseLabel(qrData.currentPhaseLabel.phase)}`}
                code={qrData.currentPhaseLabel.code}
                routePath={qrData.currentPhaseLabel.routePath as Route}
                phase={qrData.currentPhaseLabel.phase}
                svgMarkup={qrData.currentQrSvg}
                subtitle="Este QR corresponde solo a la fase actual del lote."
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] p-5">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">No hay QR generado para {getPhaseLabel(lot.currentPhase)}</p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Genera una etiqueta distinta para la fase actual del lote.</p>
                <form action={generateLotPhaseQrAction} className="mt-4">
                  <input type="hidden" name="lotId" value={lot.id} />
                  <button type="submit" className="rounded-full bg-[var(--color-primary-700)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)]">
                    Generar QR de fase
                  </button>
                </form>
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Timeline de trazabilidad" description="Eventos recientes del lote para auditoria y operacion diaria.">
          <div>
            {lot.events.length ? (
              lot.events.map((event) => (
                <TimelineEvent
                  key={event.id}
                  title={event.title}
                  subtitle={event.description ?? "Sin descripcion adicional."}
                  meta={`${event.operator?.fullName ?? event.operator?.username ?? "Sistema"} · ${event.eventAt.toLocaleString("es-ES")}`}
                  badge={<StatusBadge label={event.eventType} tone="neutral" />}
                />
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">Sin eventos asociados todavia.</p>
            )}
          </div>
        </SectionCard>
      </div>

      <LotLineagePanel
        genetic={lot.variety ? { id: lot.variety.id, name: lot.variety.name } : null}
        parentLot={
          lot.motherLot
            ? {
                id: lot.motherLot.id,
                code: lot.motherLot.code,
                currentPhase: lot.motherLot.currentPhase,
              }
            : null
        }
        currentLot={{ id: lot.id, code: lot.code, currentPhase: lot.currentPhase }}
        childLots={lot.derivedLots.map((child) => ({
          id: child.id,
          code: child.code,
          currentPhase: child.currentPhase,
        }))}
      />

      {lot.variety ? (
        <SectionCard title="Genetica asociada" description="Referencia visual de la flor vinculada a este lote.">
          <div className="grid gap-5 xl:grid-cols-[320px_1fr] xl:items-center">
            <GeneticFlowerPhoto src={lot.variety.flowerImageUrl} alt={`Flor de ${lot.variety.name}`} compact />
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--color-primary-700)]">{lot.variety.cultivarCode ?? lot.variety.name}</p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">{lot.variety.name}</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                {lot.variety.description ?? "Genetica enlazada para mantener referencia visual y trazabilidad biologica."}
              </p>
              <Link href={`/geneticas/${lot.variety.id}`} className="mt-4 inline-flex rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]">
                Abrir genetica
              </Link>
            </div>
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}
