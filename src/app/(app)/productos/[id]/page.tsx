import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
        <Link href="/productos" className="text-[var(--color-primary-700)] hover:underline">
          Volver a productos
        </Link>
        <span>/</span>
        <span className="font-mono">{id}</span>
      </div>

      <SectionCard title="Detalle de producto" description="Ruta preparada para enlazar trazabilidad retroactiva desde producto final a lote origen.">
        <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
          Esta vista queda reservada para conectar `FinalProduct`, `ProcessingBatch`, `HarvestBatch` y sus lotes de origen sin perder continuidad de auditoria.
        </p>
      </SectionCard>
    </div>
  );
}
