import { NewLotForm } from "@/components/lots/new-lot-form";
import { LotSummaryPanel } from "@/components/lots/lot-summary-panel";
import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getLotsOverview } from "@/lib/dashboard-data";

export default async function LotsPage() {
  const { connected, lots, varieties, users, motherLots } = await getLotsOverview();
  const defaultDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <section>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-700)]">Modulo de lotes</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Lotes y continuidad de trazabilidad</h1>
          </div>
          <NewLotForm defaultDate={defaultDate} varieties={varieties} users={users} motherLots={motherLots} />
        </div>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)]">
          Base inicial para CRUD, filtros, cambios de fase y timeline por lote. La UI sigue el enfoque de tablas y paneles definido en `DESIGN.md`.
        </p>
      </section>

      {connected ? (
        <section className="grid gap-4 xl:grid-cols-3">
          {lots.slice(0, 3).map((lot) => (
            <LotSummaryPanel
              key={lot.id}
              id={lot.id}
              code={lot.code}
              phase={lot.currentPhase}
              status={lot.status}
              variety={lot.variety?.name ?? "Sin variedad"}
              responsible={lot.responsibleUser?.fullName ?? lot.responsibleUser?.username ?? "Sin asignar"}
              incidents={lot.incidents.length}
            />
          ))}
        </section>
      ) : null}

      <SectionCard title="Listado inicial" description="Preparado para evolucionar a filtros, busqueda y acciones por fila.">
        {lots.length ? (
          <DataTable
            rows={lots}
            emptyMessage="No hay lotes registrados."
            columns={[
              {
                key: "code",
                header: "Codigo",
                render: (lot) => <span className="font-mono font-medium">{lot.code}</span>,
              },
              {
                key: "variety",
                header: "Variedad",
                render: (lot) => lot.variety?.name ?? "Sin variedad",
              },
              {
                key: "phase",
                header: "Fase",
                render: (lot) => <StatusBadge label={lot.currentPhase} tone="info" />,
              },
              {
                key: "status",
                header: "Estado",
                render: (lot) => <StatusBadge label={lot.status} tone={lot.status === "ACTIVE" ? "success" : "neutral"} />,
              },
              {
                key: "responsible",
                header: "Responsable",
                render: (lot) => lot.responsibleUser?.fullName ?? lot.responsibleUser?.username ?? "Sin asignar",
              },
            ]}
          />
        ) : (
          <EmptyState
            title="Sin datos aun"
            description="Despues de ejecutar `npm run db:migrate` y `npm run db:seed` veras lotes de ejemplo alineados con el dominio."
          />
        )}
      </SectionCard>
    </div>
  );
}
