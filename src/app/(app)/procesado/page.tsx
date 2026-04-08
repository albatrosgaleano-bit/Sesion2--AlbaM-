import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";

export default function ProcessingPage() {
  return (
    <SectionCard title="Procesado y extraccion" description="Ruta base para `ProcessingBatch`, rendimiento y estado del proceso.">
      <EmptyState title="Preparado para continuidad de cadena" description="La vista conectara procesado, extraccion, entradas de cosecha y productos resultantes." />
    </SectionCard>
  );
}
