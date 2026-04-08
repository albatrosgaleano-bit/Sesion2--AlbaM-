-- AlterTable
ALTER TABLE "QRLabel" ADD COLUMN "phase" TEXT;

-- CreateIndex
CREATE INDEX "QRLabel_lotId_phase_generatedAt_idx" ON "QRLabel"("lotId", "phase", "generatedAt");
