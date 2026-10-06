export type QuotationItem = {
  name: string;
  rate: number;
};

function rateName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function toRate(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/,/g, "").trim());
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

export function normalizeItems(
  rows: Array<{ name?: unknown; rate?: unknown }>,
): QuotationItem[] {
  return rows.flatMap((row) => {
    const name = typeof row.name === "string" ? row.name.trim() : "";
    const rate = toRate(row.rate);
    if (!name || rate === null) {
      return [];
    }
    return [{ name, rate }];
  });
}

export function resolvePricePerPerch(items: QuotationItem[]): number | null {
  const match = items.find((item) => {
    const key = rateName(item.name);
    return key.includes("pearch") || key.includes("perch");
  });
  return match?.rate ?? null;
}

export function resolvePricePerKm(items: QuotationItem[]): number | null {
  const match = items.find((item) => {
    const key = rateName(item.name);
    return key.includes("perkm") || key.includes("perkilometer") || key.includes("perkilometre");
  });
  return match?.rate ?? null;
}

export function estimateSurveyCost(
  perches: number | null,
  kilometers: number | null,
  pricePerPerch: number | null,
  pricePerKm: number | null,
): number | null {
  const perchPart = perches !== null && pricePerPerch !== null ? perches * pricePerPerch : null;
  const kmPart = kilometers !== null && pricePerKm !== null ? kilometers * pricePerKm : null;
  if (pricePerPerch !== null && perchPart === null) {
    return null;
  }
  if (pricePerKm !== null && kmPart === null) {
    return null;
  }
  if (perchPart === null && kmPart === null) {
    return null;
  }
  return (perchPart ?? 0) + (kmPart ?? 0);
}
