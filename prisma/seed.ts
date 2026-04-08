import {
  AuditAction,
  AuditEntityType,
  BatchStatus,
  ExportScope,
  ExportStatus,
  FinalProductStatus,
  IncidentCategory,
  IncidentStatus,
  IrrigationMethod,
  LotOriginType,
  LotStatus,
  PhaseType,
  PrismaClient,
  ProcessingType,
  ProductForm,
  QRFormat,
  QREntityType,
  SensorMetricType,
  SensorType,
  SeverityLevel,
  SourceModule,
  TraceabilityEventType,
  UserRole,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.exportJob.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.qRLabel.deleteMany();
  await prisma.finalProduct.deleteMany();
  await prisma.processingInput.deleteMany();
  await prisma.processingBatch.deleteMany();
  await prisma.harvestLot.deleteMany();
  await prisma.harvestBatch.deleteMany();
  await prisma.incident.deleteMany();
  await prisma.irrigationLog.deleteMany();
  await prisma.sensorReading.deleteMany();
  await prisma.sensorDevice.deleteMany();
  await prisma.traceabilityEvent.deleteMany();
  await prisma.phaseTransition.deleteMany();
  await prisma.lot.deleteMany();
  await prisma.variety.deleteMany();
  await prisma.user.deleteMany();

  const [admin, grower, quality, processor] = await Promise.all([
    prisma.user.create({
      data: {
        username: "admin.local",
        passwordHash: "seed-admin-placeholder",
        fullName: "Administrador local",
        role: UserRole.ADMIN,
      },
    }),
    prisma.user.create({
      data: {
        username: "cultivo.1",
        passwordHash: "seed-grower-placeholder",
        fullName: "Operario de invernadero",
        role: UserRole.GROWER,
      },
    }),
    prisma.user.create({
      data: {
        username: "calidad.1",
        passwordHash: "seed-quality-placeholder",
        fullName: "Responsable de calidad",
        role: UserRole.QUALITY,
      },
    }),
    prisma.user.create({
      data: {
        username: "procesado.1",
        passwordHash: "seed-processor-placeholder",
        fullName: "Operario de procesado",
        role: UserRole.PROCESSOR,
      },
    }),
  ]);

  const [pachamama, cannatonic] = await Promise.all([
    prisma.variety.create({
      data: {
        name: "GEN_PACHAMAMA",
        cultivarCode: "GEN_PACHAMAMA",
        description: "Genetica maestra para cadena completa clones > vegetativo > floracion > cosecha > extraccion.",
        flowerImageUrl: "/geneticas/gen-pachamama-flor.svg",
        thcPercent: 1.2,
        cbdPercent: 8.6,
      },
    }),
    prisma.variety.create({
      data: {
        name: "GEN_CANNATONIC",
        cultivarCode: "GEN_CANNATONIC",
        description: "Genetica secundaria para comparar paneles y filtros.",
        flowerImageUrl: "/geneticas/gen-cannatonic-flor.svg",
        thcPercent: 1.1,
        cbdPercent: 9.4,
      },
    }),
  ]);

  const pachamamaClones = await prisma.lot.create({
    data: {
      code: "LT-PACH-CLN-001",
      name: "Pachamama clones",
      varietyId: pachamama.id,
      originType: LotOriginType.CLONE,
      originReference: "Origen genetico GEN_PACHAMAMA",
      currentPhase: PhaseType.CLONES,
      status: LotStatus.COMPLETED,
      phaseStartedAt: new Date("2026-03-01T08:00:00.000Z"),
      startedAt: new Date("2026-03-01T08:00:00.000Z"),
      closedAt: new Date("2026-03-10T18:00:00.000Z"),
      responsibleUserId: grower.id,
      notes: "Primer lote derivado directamente de la genetica maestra.",
    },
  });

  const pachamamaVegetative = await prisma.lot.create({
    data: {
      code: "LT-PACH-VEG-001",
      name: "Pachamama vegetativo",
      varietyId: pachamama.id,
      originType: LotOriginType.INTERNAL_TRANSFER,
      originReference: "Derivado de LT-PACH-CLN-001",
      currentPhase: PhaseType.VEGETATIVE,
      status: LotStatus.COMPLETED,
      phaseStartedAt: new Date("2026-03-11T08:00:00.000Z"),
      startedAt: new Date("2026-03-11T08:00:00.000Z"),
      closedAt: new Date("2026-03-24T18:00:00.000Z"),
      responsibleUserId: grower.id,
      motherLotId: pachamamaClones.id,
      notes: "Lote de vegetativo enlazado con lote padre de clones.",
    },
  });

  const pachamamaFlowering = await prisma.lot.create({
    data: {
      code: "LT-PACH-FLW-001",
      name: "Pachamama floracion",
      varietyId: pachamama.id,
      originType: LotOriginType.INTERNAL_TRANSFER,
      originReference: "Derivado de LT-PACH-VEG-001",
      currentPhase: PhaseType.FLOWERING,
      status: LotStatus.COMPLETED,
      phaseStartedAt: new Date("2026-03-25T08:00:00.000Z"),
      startedAt: new Date("2026-03-25T08:00:00.000Z"),
      closedAt: new Date("2026-04-18T18:00:00.000Z"),
      responsibleUserId: grower.id,
      motherLotId: pachamamaVegetative.id,
      notes: "Lote de floracion trazable hacia atras hasta clones.",
    },
  });

  const pachamamaHarvest = await prisma.lot.create({
    data: {
      code: "LT-PACH-HRV-001",
      name: "Pachamama cosecha",
      varietyId: pachamama.id,
      originType: LotOriginType.INTERNAL_TRANSFER,
      originReference: "Derivado de LT-PACH-FLW-001",
      currentPhase: PhaseType.HARVEST,
      status: LotStatus.COMPLETED,
      phaseStartedAt: new Date("2026-04-19T08:00:00.000Z"),
      startedAt: new Date("2026-04-19T08:00:00.000Z"),
      closedAt: new Date("2026-04-20T18:00:00.000Z"),
      responsibleUserId: processor.id,
      motherLotId: pachamamaFlowering.id,
      notes: "Lote de cosecha enlazado con floracion.",
    },
  });

  const pachamamaExtraction = await prisma.lot.create({
    data: {
      code: "LT-PACH-EXT-001",
      name: "Pachamama extraccion",
      varietyId: pachamama.id,
      originType: LotOriginType.INTERNAL_TRANSFER,
      originReference: "Derivado de LT-PACH-HRV-001",
      currentPhase: PhaseType.EXTRACTION,
      status: LotStatus.ACTIVE,
      phaseStartedAt: new Date("2026-04-21T08:00:00.000Z"),
      startedAt: new Date("2026-04-21T08:00:00.000Z"),
      responsibleUserId: processor.id,
      motherLotId: pachamamaHarvest.id,
      notes: "Ultimo tramo actual de la cadena de trazabilidad Pachamama.",
    },
  });

  const cannatonicLot = await prisma.lot.create({
    data: {
      code: "LT-CAN-VEG-001",
      name: "Cannatonic vegetativo",
      varietyId: cannatonic.id,
      originType: LotOriginType.SEED,
      originReference: "Lote semilla certificado",
      currentPhase: PhaseType.VEGETATIVE,
      status: LotStatus.ACTIVE,
      phaseStartedAt: new Date("2026-04-02T08:00:00.000Z"),
      startedAt: new Date("2026-04-02T08:00:00.000Z"),
      responsibleUserId: grower.id,
      notes: "Lote secundario para contraste de vistas.",
    },
  });

  await prisma.phaseTransition.createMany({
    data: [
      {
        lotId: pachamamaClones.id,
        fromPhase: null,
        toPhase: PhaseType.CLONES,
        effectiveAt: new Date("2026-03-01T08:00:00.000Z"),
        operatorUserId: grower.id,
        notes: "Alta inicial desde genetica.",
      },
      {
        lotId: pachamamaVegetative.id,
        fromPhase: PhaseType.CLONES,
        toPhase: PhaseType.VEGETATIVE,
        effectiveAt: new Date("2026-03-11T08:00:00.000Z"),
        operatorUserId: grower.id,
        notes: "Transferencia a vegetativo.",
      },
      {
        lotId: pachamamaFlowering.id,
        fromPhase: PhaseType.VEGETATIVE,
        toPhase: PhaseType.FLOWERING,
        effectiveAt: new Date("2026-03-25T08:00:00.000Z"),
        operatorUserId: grower.id,
        notes: "Cambio de fotoperiodo para floracion.",
      },
      {
        lotId: pachamamaHarvest.id,
        fromPhase: PhaseType.FLOWERING,
        toPhase: PhaseType.HARVEST,
        effectiveAt: new Date("2026-04-19T08:00:00.000Z"),
        operatorUserId: processor.id,
        notes: "Corte y pesaje inicial.",
      },
      {
        lotId: pachamamaExtraction.id,
        fromPhase: PhaseType.HARVEST,
        toPhase: PhaseType.EXTRACTION,
        effectiveAt: new Date("2026-04-21T08:00:00.000Z"),
        operatorUserId: processor.id,
        notes: "Ingreso a extraccion.",
      },
      {
        lotId: cannatonicLot.id,
        fromPhase: PhaseType.GERMINATION,
        toPhase: PhaseType.VEGETATIVE,
        effectiveAt: new Date("2026-04-02T08:00:00.000Z"),
        operatorUserId: grower.id,
        notes: "Paso a vegetativo.",
      },
    ],
  });

  await prisma.traceabilityEvent.createMany({
    data: [
      {
        lotId: pachamamaClones.id,
        eventType: TraceabilityEventType.LOT_CREATED,
        phase: PhaseType.CLONES,
        title: "Alta lote clones Pachamama",
        description: "Inicio de la cadena a partir de la genetica GEN_PACHAMAMA.",
        eventAt: new Date("2026-03-01T08:00:00.000Z"),
        operatorUserId: admin.id,
        sourceModule: SourceModule.LOTS,
      },
      {
        lotId: pachamamaVegetative.id,
        eventType: TraceabilityEventType.PHASE_CHANGED,
        phase: PhaseType.VEGETATIVE,
        title: "Cambio a vegetativo",
        description: "Nuevo lote hijo generado desde clones.",
        eventAt: new Date("2026-03-11T08:00:00.000Z"),
        operatorUserId: grower.id,
        sourceModule: SourceModule.PHASES,
      },
      {
        lotId: pachamamaFlowering.id,
        eventType: TraceabilityEventType.PHASE_CHANGED,
        phase: PhaseType.FLOWERING,
        title: "Cambio a floracion",
        description: "Lote hijo generado desde vegetativo.",
        eventAt: new Date("2026-03-25T08:00:00.000Z"),
        operatorUserId: grower.id,
        sourceModule: SourceModule.PHASES,
      },
      {
        lotId: pachamamaHarvest.id,
        eventType: TraceabilityEventType.HARVEST_CREATED,
        phase: PhaseType.HARVEST,
        title: "Lote de cosecha creado",
        description: "Lote hijo enlazado al lote de floracion.",
        eventAt: new Date("2026-04-19T08:00:00.000Z"),
        operatorUserId: processor.id,
        sourceModule: SourceModule.HARVEST,
      },
      {
        lotId: pachamamaExtraction.id,
        eventType: TraceabilityEventType.PROCESSING_CREATED,
        phase: PhaseType.EXTRACTION,
        title: "Lote de extraccion creado",
        description: "Lote hijo enlazado a cosecha para trazabilidad total.",
        eventAt: new Date("2026-04-21T08:00:00.000Z"),
        operatorUserId: processor.id,
        sourceModule: SourceModule.PROCESSING,
      },
    ],
  });

  const climateSensor = await prisma.sensorDevice.create({
    data: {
      code: "SEN-AMB-01",
      name: "Sensor clima sala extraccion",
      type: SensorType.AMBIENT_TEMPERATURE,
      metric: SensorMetricType.TEMPERATURE_C,
      unit: "C",
      location: "Sala extraccion",
    },
  });

  await prisma.sensorReading.createMany({
    data: [
      {
        sensorId: climateSensor.id,
        lotId: pachamamaExtraction.id,
        phase: PhaseType.EXTRACTION,
        metric: SensorMetricType.TEMPERATURE_C,
        numericValue: 22.8,
        unit: "C",
        takenAt: new Date("2026-04-21T10:00:00.000Z"),
        source: "manual",
      },
      {
        sensorId: climateSensor.id,
        lotId: cannatonicLot.id,
        phase: PhaseType.VEGETATIVE,
        metric: SensorMetricType.TEMPERATURE_C,
        numericValue: 24.1,
        unit: "C",
        takenAt: new Date("2026-04-08T07:50:00.000Z"),
        source: "manual",
      },
    ],
  });

  await prisma.irrigationLog.create({
    data: {
      lotId: cannatonicLot.id,
      operatorUserId: grower.id,
      method: IrrigationMethod.FERTIGATION,
      startedAt: new Date("2026-04-08T08:30:00.000Z"),
      waterLiters: 120,
      ec: 1.7,
      ph: 6.1,
      nutrientRecipe: "Vegetativa base A/B",
      notes: "Riego de mantenimiento por calendario.",
    },
  });

  await prisma.incident.create({
    data: {
      lotId: pachamamaExtraction.id,
      operatorUserId: quality.id,
      category: IncidentCategory.QUALITY,
      severity: SeverityLevel.MEDIUM,
      status: IncidentStatus.OPEN,
      title: "Revision de pureza pendiente",
      description: "Control de calidad abierto en lote de extraccion activo.",
      detectedAt: new Date("2026-04-21T11:30:00.000Z"),
    },
  });

  const harvestBatch = await prisma.harvestBatch.create({
    data: {
      code: "HV-PACH-001",
      harvestedAt: new Date("2026-04-19T11:00:00.000Z"),
      operatorUserId: processor.id,
      status: BatchStatus.COMPLETED,
      wetWeightKg: 62.4,
      dryWeightKg: 18.2,
      notes: "Batch asociado al lote de cosecha Pachamama.",
      lots: {
        create: {
          lotId: pachamamaHarvest.id,
          harvestedWeightKg: 62.4,
        },
      },
    },
  });

  const processingBatch = await prisma.processingBatch.create({
    data: {
      code: "PR-PACH-001",
      processingType: ProcessingType.EXTRACTION_CO2,
      startedAt: new Date("2026-04-21T09:00:00.000Z"),
      operatorUserId: processor.id,
      status: BatchStatus.IN_PROGRESS,
      inputWeightKg: 18.2,
      outputWeightKg: 3.4,
      notes: "Batch de extraccion asociado al lote LT-PACH-EXT-001.",
      inputs: {
        create: {
          harvestBatchId: harvestBatch.id,
          inputWeightKg: 18.2,
        },
      },
    },
  });

  const product = await prisma.finalProduct.create({
    data: {
      code: "FP-PACH-001",
      name: "Extracto Pachamama 30 ml",
      form: ProductForm.OIL,
      status: FinalProductStatus.DRAFT,
      processingBatchId: processingBatch.id,
      operatorUserId: processor.id,
      packageSize: 30,
      packageUnit: "ml",
      quantityProduced: 96,
      notes: "Producto de ejemplo vinculado a lote de extraccion.",
    },
  });

  await prisma.qRLabel.createMany({
    data: [
      {
        code: "QR-GEN-PACHAMAMA",
        entityType: QREntityType.VARIETY,
        varietyId: pachamama.id,
        routePath: `/geneticas/${pachamama.id}`,
        format: QRFormat.SVG,
      },
      {
        code: "QR-LT-PACH-CLN-001-CLONES",
        entityType: QREntityType.LOT,
        phase: PhaseType.CLONES,
        lotId: pachamamaClones.id,
        routePath: `/lotes/${pachamamaClones.id}?fase=${PhaseType.CLONES}`,
        format: QRFormat.SVG,
      },
      {
        code: "QR-LT-PACH-VEG-001-VEGETATIVE",
        entityType: QREntityType.LOT,
        phase: PhaseType.VEGETATIVE,
        lotId: pachamamaVegetative.id,
        routePath: `/lotes/${pachamamaVegetative.id}?fase=${PhaseType.VEGETATIVE}`,
        format: QRFormat.SVG,
      },
      {
        code: "QR-LT-PACH-FLW-001-FLOWERING",
        entityType: QREntityType.LOT,
        phase: PhaseType.FLOWERING,
        lotId: pachamamaFlowering.id,
        routePath: `/lotes/${pachamamaFlowering.id}?fase=${PhaseType.FLOWERING}`,
        format: QRFormat.SVG,
      },
      {
        code: "QR-LT-PACH-HRV-001-HARVEST",
        entityType: QREntityType.LOT,
        phase: PhaseType.HARVEST,
        lotId: pachamamaHarvest.id,
        routePath: `/lotes/${pachamamaHarvest.id}?fase=${PhaseType.HARVEST}`,
        format: QRFormat.SVG,
      },
      {
        code: "QR-LT-PACH-EXT-001-EXTRACTION",
        entityType: QREntityType.LOT,
        phase: PhaseType.EXTRACTION,
        lotId: pachamamaExtraction.id,
        routePath: `/lotes/${pachamamaExtraction.id}?fase=${PhaseType.EXTRACTION}`,
        format: QRFormat.SVG,
      },
      {
        code: "QR-LT-CAN-VEG-001-VEGETATIVE",
        entityType: QREntityType.LOT,
        phase: PhaseType.VEGETATIVE,
        lotId: cannatonicLot.id,
        routePath: `/lotes/${cannatonicLot.id}?fase=${PhaseType.VEGETATIVE}`,
        format: QRFormat.SVG,
      },
      {
        code: "QR-FP-PACH-001",
        entityType: QREntityType.FINAL_PRODUCT,
        finalProductId: product.id,
        routePath: `/productos/${product.id}`,
        format: QRFormat.SVG,
      },
    ],
  });

  const exportJob = await prisma.exportJob.create({
    data: {
      scope: ExportScope.LOT,
      status: ExportStatus.COMPLETED,
      requestedById: quality.id,
      lotId: pachamamaExtraction.id,
      googleSheetId: "demo-sheet-id",
      targetSheetName: "Resumen",
      rowCount: 72,
      startedAt: new Date("2026-04-21T12:10:00.000Z"),
      completedAt: new Date("2026-04-21T12:11:30.000Z"),
    },
  });

  await prisma.auditLog.createMany({
    data: [
      {
        actorUserId: admin.id,
        action: AuditAction.CREATE,
        entityType: AuditEntityType.VARIETY,
        entityId: pachamama.id,
        sourceModule: SourceModule.SYSTEM,
        summary: "Alta de genetica GEN_PACHAMAMA.",
      },
      {
        actorUserId: admin.id,
        action: AuditAction.CREATE,
        entityType: AuditEntityType.LOT,
        entityId: pachamamaClones.id,
        sourceModule: SourceModule.LOTS,
        summary: "Alta inicial del lote de clones Pachamama.",
      },
      {
        actorUserId: grower.id,
        action: AuditAction.PHASE_CHANGE,
        entityType: AuditEntityType.PHASE_TRANSITION,
        entityId: pachamamaVegetative.id,
        sourceModule: SourceModule.PHASES,
        summary: "Generacion del lote vegetativo hijo desde clones.",
      },
      {
        actorUserId: grower.id,
        action: AuditAction.PHASE_CHANGE,
        entityType: AuditEntityType.PHASE_TRANSITION,
        entityId: pachamamaFlowering.id,
        sourceModule: SourceModule.PHASES,
        summary: "Generacion del lote de floracion hijo desde vegetativo.",
      },
      {
        actorUserId: processor.id,
        action: AuditAction.CREATE,
        entityType: AuditEntityType.LOT,
        entityId: pachamamaHarvest.id,
        sourceModule: SourceModule.HARVEST,
        summary: "Generacion del lote de cosecha hijo desde floracion.",
      },
      {
        actorUserId: processor.id,
        action: AuditAction.CREATE,
        entityType: AuditEntityType.LOT,
        entityId: pachamamaExtraction.id,
        sourceModule: SourceModule.PROCESSING,
        summary: "Generacion del lote de extraccion hijo desde cosecha.",
      },
      {
        actorUserId: quality.id,
        action: AuditAction.EXPORT,
        entityType: AuditEntityType.EXPORT_JOB,
        entityId: exportJob.id,
        sourceModule: SourceModule.EXPORTS,
        summary: "Exportacion de prueba completada para la cadena Pachamama.",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
