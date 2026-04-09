export function getGeneticIdentifier(variety: { cultivarCode: string | null; name: string }) {
  return (variety.cultivarCode ?? variety.name)
    .trim()
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toUpperCase();
}

export function getLotYearCode(date: Date) {
  return date.getUTCFullYear().toString().slice(-2);
}

export function buildMotherLotCode(variety: { cultivarCode: string | null; name: string }, startedAt: Date, sequence: number) {
  return `PM-${getGeneticIdentifier(variety)}-${getLotYearCode(startedAt)}-${sequence}`;
}

export function extractMotherLotSequence(code: string) {
  const match = code.match(/^PM-[A-Z0-9-]+-(\d{2})-(\d+)$/);

  if (!match) {
    return null;
  }

  return {
    yearCode: match[1],
    sequence: Number(match[2]),
  };
}
