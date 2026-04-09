import { PhaseType, QREntityType } from "@prisma/client";
import type { Route } from "next";
import QRCode from "qrcode";

import { buildMotherLotCode, extractMotherLotSequence, getGeneticIdentifier } from "@/lib/lot-code";
import { prisma } from "@/lib/prisma";

const DEFAULT_APP_URL = "http://localhost:3000";

type LotLineageNode = {
  id: string;
  code: string;
  varietyId: string | null;
  motherLotId: string | null;
  currentPhase: PhaseType;
  startedAt: Date;
  createdAt: Date;
};

function appendPhaseSuffix(baseCode: string, phase: PhaseType) {
  const suffixByPhase: Partial<Record<PhaseType, string>> = {
    VEGETATIVE: "-V",
    FLOWERING: "-VF",
    HARVEST: "-VFC",
    EXTRACTION: "-VFCE",
  };

  const suffix = suffixByPhase[phase];

  if (!suffix) {
    throw new Error(`No hay patron de QR configurado para la fase ${phase}`);
  }

  return `${baseCode}${suffix}`;
}

async function getLotLineage(lot: LotLineageNode) {
  const lineage: LotLineageNode[] = [lot];
  let currentMotherLotId = lot.motherLotId;

  while (currentMotherLotId) {
    const motherLot = await prisma.lot.findUnique({
      where: { id: currentMotherLotId },
      select: {
        id: true,
        code: true,
        varietyId: true,
        motherLotId: true,
        currentPhase: true,
        startedAt: true,
        createdAt: true,
      },
    });

    if (!motherLot) {
      throw new Error("La cadena de lotes contiene una referencia invalida");
    }

    lineage.push(motherLot);
    currentMotherLotId = motherLot.motherLotId;
  }

  return lineage;
}

async function getRootLotSequence(rootLot: LotLineageNode) {
  const sequenceFromCode = extractMotherLotSequence(rootLot.code);

  if (sequenceFromCode) {
    return sequenceFromCode.sequence;
  }

  if (!rootLot.varietyId) {
    throw new Error("El lote no tiene genetica asociada");
  }

  const year = rootLot.startedAt.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const yearEnd = new Date(Date.UTC(year + 1, 0, 1));

  const rootLots = await prisma.lot.findMany({
    where: {
      varietyId: rootLot.varietyId,
      motherLotId: null,
      startedAt: {
        gte: yearStart,
        lt: yearEnd,
      },
    },
    select: {
      id: true,
    },
    orderBy: [{ startedAt: "asc" }, { createdAt: "asc" }, { id: "asc" }],
  });

  const sequence = rootLots.findIndex((candidate) => candidate.id === rootLot.id) + 1;

  if (sequence < 1) {
    throw new Error("No se pudo calcular la secuencia del lote madre");
  }

  return sequence;
}

async function getCloneSequence(cloneLot: LotLineageNode, motherLot: LotLineageNode, hasExplicitMotherLot: boolean) {
  if (!hasExplicitMotherLot && cloneLot.id === motherLot.id) {
    return 1;
  }

  const cloneLots = await prisma.lot.findMany({
    where: {
      motherLotId: motherLot.id,
      currentPhase: PhaseType.CLONES,
    },
    select: {
      id: true,
    },
    orderBy: [{ startedAt: "asc" }, { createdAt: "asc" }, { id: "asc" }],
  });

  const sequence = cloneLots.findIndex((candidate) => candidate.id === cloneLot.id) + 1;

  if (sequence < 1) {
    throw new Error("No se pudo calcular la secuencia del lote de clones");
  }

  return sequence;
}

async function buildLotQrCode(lot: LotLineageNode & { variety: { cultivarCode: string | null; name: string } | null }) {
  if (!lot.variety) {
    throw new Error("El lote no tiene genetica asociada");
  }

  const lineage = await getLotLineage(lot);
  const rootLot = lineage.at(-1);

  if (!rootLot) {
    throw new Error("No se pudo resolver la cadena del lote");
  }

  const motherLot = lineage.find((candidate) => candidate.currentPhase === PhaseType.MOTHERS) ?? rootLot;
  const hasExplicitMotherLot = lineage.some((candidate) => candidate.currentPhase === PhaseType.MOTHERS);
  const cloneLot =
    lineage.find((candidate) => candidate.currentPhase === PhaseType.CLONES) ??
    (!hasExplicitMotherLot ? rootLot : lot.currentPhase === PhaseType.CLONES ? lot : null);
  const motherSequence = await getRootLotSequence(motherLot);
  const motherCode = buildMotherLotCode(lot.variety, motherLot.startedAt, motherSequence);

  if (lot.currentPhase === PhaseType.MOTHERS) {
    return motherCode;
  }

  if (!cloneLot) {
    throw new Error(`No se encontro el lote de clones para la fase ${lot.currentPhase}`);
  }

  const cloneSequence = await getCloneSequence(cloneLot, motherLot, hasExplicitMotherLot);
  const cloneCode = `${motherCode}-C-${cloneSequence}`;

  if (lot.currentPhase === PhaseType.CLONES) {
    return cloneCode;
  }

  return appendPhaseSuffix(cloneCode, lot.currentPhase);
}

async function getOrCreateLotPhaseLabel(params: {
  lotId: string;
  phase: PhaseType;
  routePath: Route;
  expectedCode: string;
  activeLabelId?: string;
}) {
  const { lotId, phase, routePath, expectedCode, activeLabelId } = params;
  const existingLabelByCode = await prisma.qRLabel.findUnique({ where: { code: expectedCode } });

  if (existingLabelByCode) {
    if (existingLabelByCode.lotId !== lotId || existingLabelByCode.phase !== phase) {
      throw new Error(`El codigo QR ${expectedCode} ya esta en uso por otra entidad`);
    }

    if (activeLabelId && activeLabelId !== existingLabelByCode.id) {
      await prisma.qRLabel.update({
        where: { id: activeLabelId },
        data: { isActive: false },
      });
    }

    if (!existingLabelByCode.isActive || existingLabelByCode.routePath !== routePath) {
      return prisma.qRLabel.update({
        where: { id: existingLabelByCode.id },
        data: {
          isActive: true,
          routePath,
        },
      });
    }

    return existingLabelByCode;
  }

  if (activeLabelId) {
    await prisma.qRLabel.update({
      where: { id: activeLabelId },
      data: { isActive: false },
    });
  }

  return prisma.qRLabel.create({
    data: {
      code: expectedCode,
      entityType: QREntityType.LOT,
      phase,
      lotId,
      routePath,
    },
  });
}

async function getOrCreateVarietyLabel(params: {
  varietyId: string;
  routePath: Route;
  expectedCode: string;
  activeLabelId?: string;
}) {
  const { varietyId, routePath, expectedCode, activeLabelId } = params;
  const existingLabelByCode = await prisma.qRLabel.findUnique({ where: { code: expectedCode } });

  if (existingLabelByCode) {
    if (existingLabelByCode.varietyId !== varietyId) {
      throw new Error(`El codigo QR ${expectedCode} ya esta en uso por otra entidad`);
    }

    if (activeLabelId && activeLabelId !== existingLabelByCode.id) {
      await prisma.qRLabel.update({
        where: { id: activeLabelId },
        data: { isActive: false },
      });
    }

    if (!existingLabelByCode.isActive || existingLabelByCode.routePath !== routePath) {
      return prisma.qRLabel.update({
        where: { id: existingLabelByCode.id },
        data: {
          isActive: true,
          routePath,
        },
      });
    }

    return existingLabelByCode;
  }

  if (activeLabelId) {
    await prisma.qRLabel.update({
      where: { id: activeLabelId },
      data: { isActive: false },
    });
  }

  return prisma.qRLabel.create({
    data: {
      code: expectedCode,
      entityType: QREntityType.VARIETY,
      varietyId,
      routePath,
    },
  });
}

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
      variety: {
        select: {
          name: true,
          cultivarCode: true,
        },
      },
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
  const routePath = `/lotes/${lot.id}?fase=${lot.currentPhase}` as Route;
  const expectedCode = await buildLotQrCode(lot);

  if (existingLabel?.code === expectedCode) {
    return existingLabel;
  }

  return getOrCreateLotPhaseLabel({
    lotId: lot.id,
    phase: lot.currentPhase,
    routePath,
    expectedCode,
    activeLabelId: existingLabel?.id,
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
  const routePath = `/geneticas/${variety.id}` as Route;
  const expectedCode = getGeneticIdentifier(variety);

  if (existingLabel?.code === expectedCode) {
    return existingLabel;
  }

  return getOrCreateVarietyLabel({
    varietyId: variety.id,
    routePath,
    expectedCode,
    activeLabelId: existingLabel?.id,
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
      const currentPhaseLabel = await ensureLotPhaseQr(lot.id);
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

  const currentPhaseLabel = await ensureLotPhaseQr(lot.id);

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

  const label = await ensureVarietyQr(variety.id);

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
