import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";

export default function IrrigationIncidentsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <SectionCard title="Riegos y fertirrigacion" description="Espacio inicial para `IrrigationLog`, formularios y tablas reutilizables.">
        <EmptyState title="Modulo en scaffold" description="Aqui se integraran riego, pH, EC, recetas y operario responsable." />
      </SectionCard>
      <SectionCard title="Incidencias" description="Pensado para severidad, estado, responsable y auditoria asociada.">
        <EmptyState title="Alertas operativas" description="El flujo base ya reserva una pagina propia para incidencias abiertas y resueltas." />
      </SectionCard>
    </div>
  );
}
