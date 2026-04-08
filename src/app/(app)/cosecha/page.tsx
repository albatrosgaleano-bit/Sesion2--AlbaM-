import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";

export default function HarvestPage() {
  return (
    <SectionCard title="Cosecha" description="Ruta base para lotes de cosecha vinculados a uno o varios lotes origen.">
      <EmptyState title="Scaffold listo" description="Se conectara con `HarvestBatch` y `HarvestLot`, manteniendo trazabilidad completa desde cultivo." />
    </SectionCard>
  );
}
