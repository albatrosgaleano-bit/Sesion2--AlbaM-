import { QREntityType } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { ensureVarietyQr, getQrTargetUrl, renderQrSvg } from "@/lib/qr";

export async function getGeneticsOverview() {
  const genetics = await prisma.variety.findMany({
    include: {
      qrLabels: {
        where: { entityType: QREntityType.VARIETY, isActive: true },
        orderBy: { generatedAt: "desc" },
      },
      lots: {
        include: {
          qrLabels: {
            where: { entityType: QREntityType.LOT, isActive: true },
            orderBy: { generatedAt: "desc" },
          },
        },
        orderBy: { startedAt: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });

  return Promise.all(
    genetics.map(async (genetic) => {
      const currentLabel = await ensureVarietyQr(genetic.id);

      return {
        genetic,
        currentLabel,
        currentQrSvg: currentLabel ? await renderQrSvg(getQrTargetUrl(currentLabel.routePath)) : null,
      };
    }),
  );
}

export async function getGeneticDetail(varietyId: string) {
  const genetic = await prisma.variety.findUnique({
    where: { id: varietyId },
    include: {
      qrLabels: {
        where: { entityType: QREntityType.VARIETY, isActive: true },
        orderBy: { generatedAt: "desc" },
      },
      lots: {
        include: {
          responsibleUser: true,
          motherLot: true,
          derivedLots: true,
          qrLabels: {
            where: { entityType: QREntityType.LOT, isActive: true },
            orderBy: { generatedAt: "desc" },
          },
        },
        orderBy: { startedAt: "asc" },
      },
    },
  });

  if (!genetic) {
    return null;
  }

  const label = await ensureVarietyQr(genetic.id);

  return {
    genetic,
    currentLabel: label,
    currentQrSvg: label ? await renderQrSvg(getQrTargetUrl(label.routePath)) : null,
  };
}
