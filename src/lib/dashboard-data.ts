import { IncidentStatus, LotStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  try {
    const [activeLots, openIncidents, recentTransitions, recentExports, lotsByPhase] =
      await Promise.all([
        prisma.lot.count({ where: { status: LotStatus.ACTIVE } }),
        prisma.incident.count({ where: { status: { in: [IncidentStatus.OPEN, IncidentStatus.IN_PROGRESS] } } }),
        prisma.phaseTransition.findMany({
          orderBy: { effectiveAt: "desc" },
          take: 5,
          include: { lot: true, operator: true },
        }),
        prisma.exportJob.findMany({
          orderBy: { createdAt: "desc" },
          take: 4,
          include: { requestedBy: true, lot: true },
        }),
        prisma.lot.groupBy({
          by: ["currentPhase"],
          _count: { currentPhase: true },
          orderBy: { currentPhase: "asc" },
        }),
      ]);

    return {
      connected: true,
      activeLots,
      openIncidents,
      recentTransitions,
      recentExports,
      lotsByPhase,
    };
  } catch {
    return {
      connected: false,
      activeLots: 0,
      openIncidents: 0,
      recentTransitions: [],
      recentExports: [],
      lotsByPhase: [],
    };
  }
}

export async function getLotsOverview() {
  try {
    const lots = await prisma.lot.findMany({
      include: {
        variety: true,
        responsibleUser: true,
        incidents: {
          where: { status: { in: [IncidentStatus.OPEN, IncidentStatus.IN_PROGRESS] } },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return { connected: true, lots };
  } catch {
    return { connected: false, lots: [] };
  }
}

export async function getLotDetail(lotId: string) {
  try {
    const lot = await prisma.lot.findUnique({
      where: { id: lotId },
      include: {
        variety: true,
        responsibleUser: true,
        phaseTransitions: {
          orderBy: { effectiveAt: "desc" },
          include: { operator: true },
        },
        events: {
          orderBy: { eventAt: "desc" },
          take: 8,
          include: { operator: true },
        },
        incidents: {
          orderBy: { detectedAt: "desc" },
          take: 5,
        },
        irrigationLogs: {
          orderBy: { startedAt: "desc" },
          take: 5,
          include: { operator: true },
        },
        sensorReadings: {
          orderBy: { takenAt: "desc" },
          take: 5,
          include: { sensor: true },
        },
        qrLabels: {
          orderBy: { generatedAt: "desc" },
        },
        motherLot: {
          include: {
            variety: true,
          },
        },
        derivedLots: {
          include: {
            variety: true,
          },
          orderBy: { startedAt: "asc" },
        },
      },
    });

    return { connected: true, lot };
  } catch {
    return { connected: false, lot: null };
  }
}
