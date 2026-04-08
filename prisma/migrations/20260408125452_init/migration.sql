-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT,
    "email" TEXT,
    "role" TEXT NOT NULL DEFAULT 'VIEWER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Variety" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cultivarCode" TEXT,
    "description" TEXT,
    "thcPercent" REAL,
    "cbdPercent" REAL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Lot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "varietyId" TEXT,
    "originType" TEXT NOT NULL,
    "originReference" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "currentPhase" TEXT NOT NULL,
    "phaseStartedAt" DATETIME,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" DATETIME,
    "responsibleUserId" TEXT,
    "notes" TEXT,
    "motherLotId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lot_varietyId_fkey" FOREIGN KEY ("varietyId") REFERENCES "Variety" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lot_responsibleUserId_fkey" FOREIGN KEY ("responsibleUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lot_motherLotId_fkey" FOREIGN KEY ("motherLotId") REFERENCES "Lot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PhaseTransition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lotId" TEXT NOT NULL,
    "fromPhase" TEXT,
    "toPhase" TEXT NOT NULL,
    "effectiveAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operatorUserId" TEXT NOT NULL,
    "reason" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PhaseTransition_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PhaseTransition_operatorUserId_fkey" FOREIGN KEY ("operatorUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TraceabilityEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lotId" TEXT,
    "eventType" TEXT NOT NULL,
    "phase" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "eventAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operatorUserId" TEXT,
    "sourceModule" TEXT NOT NULL,
    "sourceEntityType" TEXT,
    "sourceEntityId" TEXT,
    "isImmutable" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TraceabilityEvent_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TraceabilityEvent_operatorUserId_fkey" FOREIGN KEY ("operatorUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SensorDevice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "unit" TEXT,
    "location" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SensorReading" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sensorId" TEXT,
    "lotId" TEXT,
    "phase" TEXT,
    "metric" TEXT NOT NULL,
    "numericValue" REAL,
    "textValue" TEXT,
    "unit" TEXT,
    "takenAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SensorReading_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "SensorDevice" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SensorReading_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IrrigationLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lotId" TEXT NOT NULL,
    "operatorUserId" TEXT,
    "method" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME,
    "waterLiters" REAL,
    "ec" REAL,
    "ph" REAL,
    "nutrientRecipe" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IrrigationLog_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "IrrigationLog_operatorUserId_fkey" FOREIGN KEY ("operatorUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lotId" TEXT,
    "operatorUserId" TEXT,
    "category" TEXT NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "detectedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" DATETIME,
    "resolutionNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Incident_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Incident_operatorUserId_fkey" FOREIGN KEY ("operatorUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HarvestBatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "harvestedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operatorUserId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "wetWeightKg" REAL,
    "dryWeightKg" REAL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HarvestBatch_operatorUserId_fkey" FOREIGN KEY ("operatorUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HarvestLot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "harvestBatchId" TEXT NOT NULL,
    "lotId" TEXT NOT NULL,
    "harvestedWeightKg" REAL,
    "notes" TEXT,
    CONSTRAINT "HarvestLot_harvestBatchId_fkey" FOREIGN KEY ("harvestBatchId") REFERENCES "HarvestBatch" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HarvestLot_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProcessingBatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "processingType" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME,
    "operatorUserId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "inputWeightKg" REAL,
    "outputWeightKg" REAL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProcessingBatch_operatorUserId_fkey" FOREIGN KEY ("operatorUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProcessingInput" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "processingBatchId" TEXT NOT NULL,
    "harvestBatchId" TEXT NOT NULL,
    "inputWeightKg" REAL,
    "notes" TEXT,
    CONSTRAINT "ProcessingInput_processingBatchId_fkey" FOREIGN KEY ("processingBatchId") REFERENCES "ProcessingBatch" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProcessingInput_harvestBatchId_fkey" FOREIGN KEY ("harvestBatchId") REFERENCES "HarvestBatch" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FinalProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "form" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "processingBatchId" TEXT NOT NULL,
    "operatorUserId" TEXT,
    "packageSize" REAL,
    "packageUnit" TEXT,
    "quantityProduced" REAL,
    "releasedAt" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FinalProduct_processingBatchId_fkey" FOREIGN KEY ("processingBatchId") REFERENCES "ProcessingBatch" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FinalProduct_operatorUserId_fkey" FOREIGN KEY ("operatorUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QRLabel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "lotId" TEXT,
    "harvestBatchId" TEXT,
    "processingBatchId" TEXT,
    "finalProductId" TEXT,
    "routePath" TEXT NOT NULL,
    "format" TEXT NOT NULL DEFAULT 'SVG',
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "printedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QRLabel_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "QRLabel_harvestBatchId_fkey" FOREIGN KEY ("harvestBatchId") REFERENCES "HarvestBatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "QRLabel_processingBatchId_fkey" FOREIGN KEY ("processingBatchId") REFERENCES "ProcessingBatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "QRLabel_finalProductId_fkey" FOREIGN KEY ("finalProductId") REFERENCES "FinalProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT,
    "entityType" TEXT NOT NULL,
    "lotId" TEXT,
    "harvestBatchId" TEXT,
    "processingBatchId" TEXT,
    "finalProductId" TEXT,
    "incidentId" TEXT,
    "uploadedById" TEXT,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attachment_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Attachment_harvestBatchId_fkey" FOREIGN KEY ("harvestBatchId") REFERENCES "HarvestBatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Attachment_processingBatchId_fkey" FOREIGN KEY ("processingBatchId") REFERENCES "ProcessingBatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Attachment_finalProductId_fkey" FOREIGN KEY ("finalProductId") REFERENCES "FinalProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Attachment_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Attachment_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actorUserId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "sourceModule" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "beforeJson" JSONB,
    "afterJson" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExportJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "exportType" TEXT NOT NULL DEFAULT 'GOOGLE_SHEETS',
    "scope" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "requestedById" TEXT,
    "lotId" TEXT,
    "dateFrom" DATETIME,
    "dateTo" DATETIME,
    "googleSheetId" TEXT,
    "targetSheetName" TEXT,
    "rowCount" INTEGER,
    "errorMessage" TEXT,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExportJob_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ExportJob_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Variety_name_key" ON "Variety"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lot_code_key" ON "Lot"("code");

-- CreateIndex
CREATE INDEX "Lot_currentPhase_idx" ON "Lot"("currentPhase");

-- CreateIndex
CREATE INDEX "Lot_status_idx" ON "Lot"("status");

-- CreateIndex
CREATE INDEX "Lot_varietyId_idx" ON "Lot"("varietyId");

-- CreateIndex
CREATE INDEX "PhaseTransition_lotId_effectiveAt_idx" ON "PhaseTransition"("lotId", "effectiveAt");

-- CreateIndex
CREATE INDEX "TraceabilityEvent_lotId_eventAt_idx" ON "TraceabilityEvent"("lotId", "eventAt");

-- CreateIndex
CREATE INDEX "TraceabilityEvent_sourceModule_eventAt_idx" ON "TraceabilityEvent"("sourceModule", "eventAt");

-- CreateIndex
CREATE UNIQUE INDEX "SensorDevice_code_key" ON "SensorDevice"("code");

-- CreateIndex
CREATE INDEX "SensorReading_lotId_takenAt_idx" ON "SensorReading"("lotId", "takenAt");

-- CreateIndex
CREATE INDEX "SensorReading_sensorId_takenAt_idx" ON "SensorReading"("sensorId", "takenAt");

-- CreateIndex
CREATE INDEX "IrrigationLog_lotId_startedAt_idx" ON "IrrigationLog"("lotId", "startedAt");

-- CreateIndex
CREATE INDEX "Incident_lotId_status_idx" ON "Incident"("lotId", "status");

-- CreateIndex
CREATE INDEX "Incident_category_status_idx" ON "Incident"("category", "status");

-- CreateIndex
CREATE UNIQUE INDEX "HarvestBatch_code_key" ON "HarvestBatch"("code");

-- CreateIndex
CREATE INDEX "HarvestLot_lotId_idx" ON "HarvestLot"("lotId");

-- CreateIndex
CREATE UNIQUE INDEX "HarvestLot_harvestBatchId_lotId_key" ON "HarvestLot"("harvestBatchId", "lotId");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessingBatch_code_key" ON "ProcessingBatch"("code");

-- CreateIndex
CREATE INDEX "ProcessingInput_harvestBatchId_idx" ON "ProcessingInput"("harvestBatchId");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessingInput_processingBatchId_harvestBatchId_key" ON "ProcessingInput"("processingBatchId", "harvestBatchId");

-- CreateIndex
CREATE UNIQUE INDEX "FinalProduct_code_key" ON "FinalProduct"("code");

-- CreateIndex
CREATE INDEX "FinalProduct_processingBatchId_idx" ON "FinalProduct"("processingBatchId");

-- CreateIndex
CREATE INDEX "FinalProduct_status_idx" ON "FinalProduct"("status");

-- CreateIndex
CREATE UNIQUE INDEX "QRLabel_code_key" ON "QRLabel"("code");

-- CreateIndex
CREATE INDEX "QRLabel_entityType_generatedAt_idx" ON "QRLabel"("entityType", "generatedAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_createdAt_idx" ON "AuditLog"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_sourceModule_createdAt_idx" ON "AuditLog"("sourceModule", "createdAt");

-- CreateIndex
CREATE INDEX "ExportJob_status_createdAt_idx" ON "ExportJob"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ExportJob_lotId_idx" ON "ExportJob"("lotId");
