import { PhaseType, QREntityType } from "@prisma/client";
import type { Route } from "next";
import QRCode from "qrcode";

import { prisma } from "@/lib/prisma";

const DEFAULT_APP_URL = "http://localhost:3000";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL ?? DEFAULT_APP_URL;
}

export function getQrTargetUrl(routePath: string) {
  return new URL(routePath, getBaseUrl()).toString();
}

export async function renderQrSvg(content: string) {
  return QRCode.toString(content, {
    type: "svg",
    margin: 1,
    width: 220,
    color: {
      dark: "#1E2328",
      light: "#FFFFFF",
    },
  });
}

export async function ensureLotPhaseQr(lotId: string) {
  const lot = await prisma.lot.findUnique({
    where: { id: lotId },
    include: {
      qrLabels: {
        where: { entityType: QREntityType.LOT, isActive: true },
        orderBy: { generatedAt: "desc" },
      },
    },
  });

  if (!lot) {
    throw new Error("Lote no encontrado");
  }

  const existingLabel = lot.qrLabels.find((label) => label.phase === lot.currentPhase);

  if (existingLabel) {
    return existingLabel;
  }

  const routePath = `/lotes/${lot.id}?fase=${lot.currentPhase}` as Route;

  return prisma.qRLabel.create({
    data: {
      code: `QR-${lot.code}-${lot.currentPhase}`,
      entityType: QREntityType.LOT,
      phase: lot.currentPhase,
      lotId: lot.id,
      routePath,
    },
  });
}

export async function ensureVarietyQr(varietyId: string) {
  const variety = await prisma.variety.findUnique({
    where: { id: varietyId },
    include: {
      qrLabels: {
        where: { entityType: QREntityType.VARIETY, isActive: true },
        orderBy: { generatedAt: "desc" },
      },
    },
  });

  if (!variety) {
    throw new Error("Genetica no encontrada");
  }

  const existingLabel = variety.qrLabels[0];

  if (existingLabel) {
    return existingLabel;
  }

  const routePath = `/geneticas/${variety.id}` as Route;

  return prisma.qRLabel.create({
    data: {
      code: `QR-${variety.name}`,
      entityType: QREntityType.VARIETY,
      varietyId: variety.id,
      routePath,
    },
  });
}

export async function getQrOverview() {
  const lots = await prisma.lot.findMany({
    include: {
      variety: true,
      qrLabels: {
        where: { entityType: QREntityType.LOT, isActive: true },
        orderBy: { generatedAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return Promise.all(
    lots.map(async (lot) => {
      const currentPhaseLabel = lot.qrLabels.find((label) => label.phase === lot.currentPhase) ?? null;
      const currentQrSvg = currentPhaseLabel
        ? await renderQrSvg(getQrTargetUrl(currentPhaseLabel.routePath))
        : null;

      return {
        lot,
        currentPhaseLabel,
        currentQrSvg,
      };
    }),
  );
}

export async function getLotCurrentPhaseQr(lotId: string) {
  const lot = await prisma.lot.findUnique({
    where: { id: lotId },
    include: {
      qrLabels: {
        where: { entityType: QREntityType.LOT, isActive: true },
        orderBy: { generatedAt: "desc" },
      },
    },
  });

  if (!lot) {
    return null;
  }

  const currentPhaseLabel = lot.qrLabels.find((label) => label.phase === lot.currentPhase) ?? null;

  if (!currentPhaseLabel) {
    return {
      lot,
      currentPhaseLabel: null,
      currentQrSvg: null,
    };
  }

  return {
    lot,
    currentPhaseLabel,
    currentQrSvg: await renderQrSvg(getQrTargetUrl(currentPhaseLabel.routePath)),
  };
}

export async function getVarietyCurrentQr(varietyId: string) {
  const variety = await prisma.variety.findUnique({
    where: { id: varietyId },
    include: {
      qrLabels: {
        where: { entityType: QREntityType.VARIETY, isActive: true },
        orderBy: { generatedAt: "desc" },
      },
    },
  });

  if (!variety) {
    return null;
  }

  const label = variety.qrLabels[0] ?? null;

  return {
    variety,
    currentLabel: label,
    currentQrSvg: label ? await renderQrSvg(getQrTargetUrl(label.routePath)) : null,
  };
}

export function getPhaseSequenceLabel(phase: PhaseType) {
  const order: Record<PhaseType, number> = {
    CLONES: 1,
    MOTHERS: 0,
    GERMINATION: 1,
    VEGETATIVE: 2,
    FLOWERING: 3,
    HARVEST: 4,
    DRYING: 5,
    CURING: 5,
    PROCESSING: 6,
    EXTRACTION: 5,
    FINAL_PRODUCT: 7,
    CLOSED: 8,
  };

  return order[phase] ?? 99;
}
