import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";

export default function AuditPage() {
  return (
    <SectionCard title="Auditoria" description="Ruta base para revisar acciones criticas del sistema local.">
      <EmptyState title="Registro centralizado" description="Preparado para listar `AuditLog` con filtros por usuario, entidad, accion y fecha." />
    </SectionCard>
  );
}
