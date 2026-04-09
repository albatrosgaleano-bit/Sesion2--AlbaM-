"use client";

import { useMemo, useState } from "react";

import { createLotAction } from "@/app/(app)/lotes/actions";
import { buildMotherLotCode } from "@/lib/lot-code";

type VarietyOption = {
  id: string;
  name: string;
  cultivarCode: string | null;
};

type UserOption = {
  id: string;
  username: string;
  fullName: string | null;
};

type MotherLotSeed = {
  varietyId: string | null;
  startedAt: Date;
};

export function NewLotForm({
  defaultDate,
  varieties,
  users,
  motherLots,
}: {
  defaultDate: string;
  varieties: VarietyOption[];
  users: UserOption[];
  motherLots: MotherLotSeed[];
}) {
  const [startedAt, setStartedAt] = useState(defaultDate);
  const [varietyId, setVarietyId] = useState("");

  const previewCode = useMemo(() => {
    const selectedVariety = varieties.find((item) => item.id === varietyId);

    if (!selectedVariety || !startedAt) {
      return "Se generara al seleccionar fecha y genetica";
    }

    const selectedYear = new Date(`${startedAt}T00:00:00.000Z`).getUTCFullYear();
    const sequence =
      motherLots.filter(
        (lot) => lot.varietyId === selectedVariety.id && new Date(lot.startedAt).getUTCFullYear() === selectedYear,
      ).length + 1;

    return buildMotherLotCode(selectedVariety, new Date(`${startedAt}T00:00:00.000Z`), sequence);
  }, [motherLots, startedAt, varieties, varietyId]);

  return (
    <section className="w-full max-w-xl rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] lg:w-auto lg:min-w-[420px]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">Nuevo lote</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">La codificacion se genera automaticamente en el formulario.</p>
        </div>
        <span className="rounded-full bg-[var(--color-primary-700)] px-4 py-2 text-xs uppercase tracking-[0.16em] text-white">
          Formulario activo
        </span>
      </div>
      <div className="mt-4 border-t border-[var(--color-border)] pt-4">
        <div className="rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">ID automatico</p>
          <p className="mt-2 font-mono text-sm text-[var(--color-primary-700)]">{previewCode}</p>
        </div>
        <form action={createLotAction} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-[var(--color-text-primary)]">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Fecha</span>
            <input
              type="date"
              name="startedAt"
              value={startedAt}
              onChange={(event) => setStartedAt(event.target.value)}
              required
              className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary-600)]"
            />
          </label>
          <label className="grid gap-2 text-sm text-[var(--color-text-primary)]">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Genetica</span>
            <select
              name="varietyId"
              required
              value={varietyId}
              onChange={(event) => setVarietyId(event.target.value)}
              className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary-600)]"
            >
              <option value="" disabled>
                Seleccionar genetica
              </option>
              {varieties.map((variety) => (
                <option key={variety.id} value={variety.id}>
                  {variety.cultivarCode ?? variety.name} - {variety.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-[var(--color-text-primary)] sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Creador</span>
            <select
              name="responsibleUserId"
              required
              defaultValue=""
              className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary-600)]"
            >
              <option value="" disabled>
                Seleccionar creador
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName ?? user.username}
                </option>
              ))}
            </select>
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="inline-flex rounded-full bg-[var(--color-primary-700)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)]">
              Crear lote
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
