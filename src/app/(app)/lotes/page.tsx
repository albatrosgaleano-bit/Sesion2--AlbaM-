import { createLotAction } from "@/app/(app)/lotes/actions";
import { LotSummaryPanel } from "@/components/lots/lot-summary-panel";
import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getLotsOverview } from "@/lib/dashboard-data";

export default async function LotsPage() {
  const { connected, lots, varieties, users } = await getLotsOverview();
  const defaultDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <section>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-700)]">Modulo de lotes</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Lotes y continuidad de trazabilidad</h1>
          </div>
          <details className="group w-full max-w-xl rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] lg:w-auto lg:min-w-[420px]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[var(--color-text-primary)]">
              <span>Nuevo lote</span>
              <span className="rounded-full bg-[var(--color-primary-700)] px-4 py-2 text-xs uppercase tracking-[0.16em] text-white transition group-open:bg-[var(--color-primary-600)]">
                Abrir formulario
              </span>
            </summary>
            <div className="mt-4 border-t border-[var(--color-border)] pt-4">
              <p className="text-sm text-[var(--color-text-secondary)]">El ID del lote se genera automaticamente al guardar, siguiendo el patron activo de madres.</p>
              <form action={createLotAction} className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-[var(--color-text-primary)]">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Fecha</span>
                  <input
                    type="date"
                    name="startedAt"
                    defaultValue={defaultDate}
                    required
                    className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary-600)]"
                  />
                </label>
                <label className="grid gap-2 text-sm text-[var(--color-text-primary)]">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Genetica</span>
                  <select
                    name="varietyId"
                    required
                    defaultValue=""
                    className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary-600)]"
                  >
                    <option value="" disabled>
                      Seleccionar genetica
                    </option>
                    {varieties.map((variety) => (
                      <option key={variety.id} value={variety.id}>
                        {variety.cultivarCode ?? variety.name} - {variety.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-[var(--color-text-primary)] sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Creador</span>
                  <select
                    name="responsibleUserId"
                    required
                    defaultValue=""
                    className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary-600)]"
                  >
                    <option value="" disabled>
                      Seleccionar creador
                    </option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.fullName ?? user.username}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" className="inline-flex rounded-full bg-[var(--color-primary-700)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)]">
                    Crear lote
                  </button>
                </div>
              </form>
            </div>
          </details>
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
