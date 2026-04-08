import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";

export default function SensorsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-700)]">Modulo de sensores</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Lecturas de sensores y alertas simples</h1>
      </section>
      <SectionCard title="Base del modulo" description="Preparado para tablas, importacion local y asociaciones a lote/fase.">
        <EmptyState title="Pendiente de implementacion funcional" description="La pagina ya forma parte del shell principal y queda lista para conectar `SensorDevice` y `SensorReading` desde Prisma." />
      </SectionCard>
    </div>
  );
}
