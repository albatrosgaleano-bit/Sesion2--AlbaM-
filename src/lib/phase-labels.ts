import { PhaseType } from "@prisma/client";

export const phaseLabels: Record<PhaseType, string> = {
  CLONES: "Clones",
  MOTHERS: "Madres",
  GERMINATION: "Germinacion",
  VEGETATIVE: "Vegetativa",
  FLOWERING: "Floracion",
  HARVEST: "Cosecha",
  DRYING: "Secado",
  CURING: "Curado",
  PROCESSING: "Procesado",
  EXTRACTION: "Extraccion",
  FINAL_PRODUCT: "Producto final",
  CLOSED: "Cerrado",
};

export function getPhaseLabel(phase: PhaseType | null | undefined) {
  if (!phase) {
    return "Sin fase";
  }

  return phaseLabels[phase] ?? phase;
}
