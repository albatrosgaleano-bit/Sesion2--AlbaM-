"use server";

import { LotOriginType, LotStatus, PhaseType, SourceModule, TraceabilityEventType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { buildMotherLotCode } from "@/lib/lot-code";
import { prisma } from "@/lib/prisma";
import { ensureLotPhaseQr } from "@/lib/qr";

function parseDate(value: string) {
  const parsed = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Fecha invalida");
  }

  return parsed;
}

export async function createLotAction(formData: FormData) {
  const startedAtValue = formData.get("startedAt");
  const varietyId = formData.get("varietyId");
  const responsibleUserId = formData.get("responsibleUserId");

  if (typeof startedAtValue !== "string" || !startedAtValue) {
    throw new Error("Selecciona una fecha valida");
  }

  if (typeof varietyId !== "string" || !varietyId) {
    throw new Error("Selecciona una genetica");
  }

  if (typeof responsibleUserId !== "string" || !responsibleUserId) {
    throw new Error("Selecciona un creador");
  }

  const startedAt = parseDate(startedAtValue);

  const [variety, responsibleUser, yearlyRoots] = await Promise.all([
    prisma.variety.findUnique({
      where: { id: varietyId },
      select: { id: true, name: true, cultivarCode: true },
    }),
    prisma.user.findUnique({
      where: { id: responsibleUserId },
      select: { id: true, fullName: true, username: true },
    }),
    prisma.lot.count({
      where: {
        varietyId,
        motherLotId: null,
        currentPhase: PhaseType.MOTHERS,
        startedAt: {
          gte: new Date(Date.UTC(startedAt.getUTCFullYear(), 0, 1)),
          lt: new Date(Date.UTC(startedAt.getUTCFullYear() + 1, 0, 1)),
        },
      },
    }),
  ]);

  if (!variety) {
    throw new Error("Genetica no encontrada");
  }

  if (!responsibleUser) {
    throw new Error("Creador no encontrado");
  }

  const code = buildMotherLotCode(variety, startedAt, yearlyRoots + 1);
  const lotName = `${variety.name} madres ${yearlyRoots + 1}`;

  const lot = await prisma.lot.create({
    data: {
      code,
      name: lotName,
      varietyId: variety.id,
      originType: LotOriginType.MOTHER_PLANT,
      originReference: `Genetica base ${variety.cultivarCode ?? variety.name}`,
      status: LotStatus.ACTIVE,
      currentPhase: PhaseType.MOTHERS,
      phaseStartedAt: startedAt,
      startedAt,
      responsibleUserId: responsibleUser.id,
      notes: "Lote madre creado desde el formulario operativo.",
    },
  });

  await prisma.phaseTransition.create({
    data: {
      lotId: lot.id,
      fromPhase: null,
      toPhase: PhaseType.MOTHERS,
      effectiveAt: startedAt,
      operatorUserId: responsibleUser.id,
      notes: "Alta inicial automatica desde el formulario de nuevo lote.",
    },
  });

  await prisma.traceabilityEvent.create({
    data: {
      lotId: lot.id,
      eventType: TraceabilityEventType.LOT_CREATED,
      phase: PhaseType.MOTHERS,
      title: `Alta lote madre ${code}`,
      description: `Lote madre creado para ${variety.name} por ${responsibleUser.fullName ?? responsibleUser.username}.`,
      eventAt: startedAt,
      operatorUserId: responsibleUser.id,
      sourceModule: SourceModule.LOTS,
    },
  });

  await ensureLotPhaseQr(lot.id);

  revalidatePath("/lotes");
  revalidatePath("/qr");
  revalidatePath("/geneticas");
  revalidatePath(`/geneticas/${variety.id}`);

  redirect(`/lotes/${lot.id}`);
}
