import Image from "next/image";

export function GeneticFlowerPhoto({
  src,
  alt,
  compact = false,
}: {
  src: string | null | undefined;
  alt: string;
  compact?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(180deg,#f8fbf9_0%,#edf4ef_100%)] ${compact ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes={compact ? "(max-width: 1280px) 100vw, 420px" : "(max-width: 1280px) 100vw, 640px"} />
      ) : (
        <div className="flex h-full items-center justify-center p-6 text-center text-sm text-[var(--color-text-secondary)]">
          Sin foto de flor disponible para esta genetica.
        </div>
      )}
    </div>
  );
}
