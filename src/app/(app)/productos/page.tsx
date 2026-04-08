import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";

export default function ProductsPage() {
  return (
    <SectionCard title="Producto final" description="Ruta base para productos finales con trazabilidad retroactiva.">
      <EmptyState title="Vista base disponible" description="Aqui se mostraran formato, estado de calidad, QR y navegacion hacia lote origen." />
    </SectionCard>
  );
}
