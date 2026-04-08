import { LocalServerStatusPanel } from "@/components/system/local-server-status-panel";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { TimelineEvent } from "@/components/ui/timeline-event";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[var(--color-border)] bg-[linear-gradient(135deg,#ffffff_0%,#f3f9f5_60%,#dcefe4_100%)] p-6 shadow-[var(--shadow-card)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-700)]">Control operativo</p>
        <div className="mt-3 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Visibilidad central de lotes, eventos y continuidad de trazabilidad</h1>
          <p className="mt-3 text-base leading-7 text-[var(--color-text-secondary)]">
            Este scaffold prioriza dashboard, lotes y navegacion modular en espanol, con backend local y SQLite como fuente de verdad.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Lotes activos" value={dashboard.activeLots} detail="Conteo inicial desde SQLite/Prisma." />
        <MetricCard label="Incidencias abiertas" value={dashboard.openIncidents} detail="Incluye abiertas y en curso." />
        <MetricCard label="Cambios recientes" value={dashboard.recentTransitions.length} detail="Ultimas transiciones de fase auditables." />
        <MetricCard label="Exportaciones" value={dashboard.recentExports.length} detail="Historial reciente de jobs de exportacion." />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.9fr]">
        <SectionCard title="Lotes activos por fase" description="Resumen inicial alineado con el dashboard minimo del PRD.">
          <div className="grid gap-3 md:grid-cols-2">
            {dashboard.lotsByPhase.length ? (
              dashboard.lotsByPhase.map((item) => (
                <div key={item.currentPhase} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{item.currentPhase}</p>
                  <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">{item._count.currentPhase}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">Ejecuta migraciones y seed para ver datos operativos reales.</p>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Exportaciones recientes" description="Google Sheets queda desacoplado de la operacion principal.">
          <div className="space-y-3">
            {dashboard.recentExports.length ? (
              dashboard.recentExports.map((job) => (
                <div key={job.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{job.scope}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{job.lot?.code ?? "Exportacion general"}</p>
                    </div>
                    <StatusBadge
                      label={job.status}
                      tone={job.status === "COMPLETED" ? "success" : job.status === "FAILED" ? "danger" : "warning"}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">Aun no hay trabajos creados en la base local.</p>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Ultimos cambios de fase" description="Timeline legible para escritorio y tablet, centrado en trazabilidad.">
        <div>
          {dashboard.recentTransitions.length ? (
            dashboard.recentTransitions.map((transition) => (
              <TimelineEvent
                key={transition.id}
                title={`${transition.lot.code}: ${transition.fromPhase ?? "ALTA"} -> ${transition.toPhase}`}
                subtitle={transition.notes ?? "Transicion registrada sin observaciones adicionales."}
                meta={`${transition.operator.fullName ?? transition.operator.username} · ${transition.effectiveAt.toLocaleString("es-ES")}`}
                badge={<StatusBadge label="Fase" tone="info" />}
              />
            ))
          ) : (
            <p className="text-sm text-[var(--color-text-secondary)]">No hay transiciones registradas todavia.</p>
          )}
        </div>
      </SectionCard>

      <LocalServerStatusPanel connected={dashboard.connected} />
    </div>
  );
}
