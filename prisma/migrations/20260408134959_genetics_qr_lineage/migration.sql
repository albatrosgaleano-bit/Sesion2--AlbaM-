-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QRLabel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "phase" TEXT,
    "varietyId" TEXT,
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
    CONSTRAINT "QRLabel_varietyId_fkey" FOREIGN KEY ("varietyId") REFERENCES "Variety" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "QRLabel_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "QRLabel_harvestBatchId_fkey" FOREIGN KEY ("harvestBatchId") REFERENCES "HarvestBatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "QRLabel_processingBatchId_fkey" FOREIGN KEY ("processingBatchId") REFERENCES "ProcessingBatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "QRLabel_finalProductId_fkey" FOREIGN KEY ("finalProductId") REFERENCES "FinalProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_QRLabel" ("code", "createdAt", "entityType", "finalProductId", "format", "generatedAt", "harvestBatchId", "id", "isActive", "lotId", "phase", "printedAt", "processingBatchId", "routePath") SELECT "code", "createdAt", "entityType", "finalProductId", "format", "generatedAt", "harvestBatchId", "id", "isActive", "lotId", "phase", "printedAt", "processingBatchId", "routePath" FROM "QRLabel";
DROP TABLE "QRLabel";
ALTER TABLE "new_QRLabel" RENAME TO "QRLabel";
CREATE UNIQUE INDEX "QRLabel_code_key" ON "QRLabel"("code");
CREATE INDEX "QRLabel_entityType_generatedAt_idx" ON "QRLabel"("entityType", "generatedAt");
CREATE INDEX "QRLabel_varietyId_generatedAt_idx" ON "QRLabel"("varietyId", "generatedAt");
CREATE INDEX "QRLabel_lotId_phase_generatedAt_idx" ON "QRLabel"("lotId", "phase", "generatedAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
