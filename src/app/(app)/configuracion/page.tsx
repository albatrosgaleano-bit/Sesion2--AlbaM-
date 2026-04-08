import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";

export default function SettingsPage() {
  return (
    <SectionCard title="Configuracion del servidor local" description="Espacio reservado para backups, estado del sistema y parametros locales.">
      <EmptyState title="Configuracion inicial" description="La pagina servira para verificar salud del servidor, backups SQLite y configuraciones de exportacion." />
    </SectionCard>
  );
}
