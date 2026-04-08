import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";

export default function ExportPage() {
  return (
    <SectionCard title="Exportacion a Google Sheets" description="Modulo desacoplado de la operacion principal, solo desde backend.">
      <EmptyState title="Exportaciones en cola" description="La ruta queda preparada para crear `ExportJob`, revisar estado y aislar fallos sin afectar la app local." />
    </SectionCard>
  );
}
