import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

export function LocalServerStatusPanel({ connected }: { connected: boolean }) {
  return (
    <SectionCard
      title="Estado del servidor local"
      description="Panel inicial para salud local, base de datos y capacidad de exportacion."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Base de datos</p>
            <StatusBadge label={connected ? "Conectada" : "Pendiente"} tone={connected ? "success" : "warning"} />
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">SQLite en disco local con Prisma como capa de acceso.</p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Operacion LAN</p>
            <StatusBadge label="Local" tone="info" />
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">La app no depende de servicios cloud para la operacion principal.</p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Exportaciones</p>
            <StatusBadge label="Backend" tone="neutral" />
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">Google Sheets queda aislado como modulo de exportacion asimetrica.</p>
        </div>
      </div>
    </SectionCard>
  );
}
