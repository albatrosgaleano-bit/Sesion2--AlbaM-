import Link from "next/link";

import { quickLinks } from "@/lib/navigation";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[rgba(250,252,253,0.92)] backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 md:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Sistema local-first</p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Trazabilidad de cannabis medicinal</h2>
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-700)]">
              LAN activa
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-[var(--color-border-strong)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
