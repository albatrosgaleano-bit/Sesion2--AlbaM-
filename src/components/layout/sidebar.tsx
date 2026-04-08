"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/lib/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-[var(--color-border)] bg-[linear-gradient(180deg,#1e2328_0%,#232b31_48%,#1f6b45_100%)] px-5 py-6 text-white lg:flex lg:flex-col">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Cultivo medicinal</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight">Trazabilidad local</h1>
        <p className="mt-2 text-sm leading-6 text-white/72">
          Operacion LAN para cultivo, procesado, auditoria y exportacion controlada.
        </p>
      </div>

      <nav className="mt-8 flex-1 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl border px-4 py-3 transition ${
                isActive
                  ? "border-white/30 bg-white/12"
                  : "border-transparent bg-white/4 hover:border-white/10 hover:bg-white/8"
              }`}
            >
              <div className="text-sm font-semibold">{item.label}</div>
              <div className="mt-1 text-xs text-white/70">{item.description}</div>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-white/12 bg-black/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Modo local</p>
        <p className="mt-2 text-sm text-white/80">SQLite + Prisma como fuente de verdad. Sheets solo exporta.</p>
      </div>
    </aside>
  );
}
