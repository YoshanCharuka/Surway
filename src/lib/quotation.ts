export type QuotationItem = {
  name: string;
  rate: number;
};

const PERCH_RATE_KEYS = [
  "price per perch",
  "price_per_perch",
  "perch rate",
  "rate per perch",
  "perch",
  "perches",
];

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
  const byName = new Map(items.map((item) => [item.name.toLowerCase(), item.rate]));

  for (const key of PERCH_RATE_KEYS) {
    const rate = byName.get(key);
    if (rate !== undefined) {
      return rate;
    }
  }

  const perchItem = items.find((item) => item.name.toLowerCase().includes("perch"));
  if (perchItem) {
    return perchItem.rate;
  }

  return items[0]?.rate ?? null;
}

export function resolveItemRate(
  location: string,
  items: QuotationItem[],
  fallbackRate: number | null,
): number | null {
  const loc = location.toLowerCase().trim();
  if (!loc) {
    return fallbackRate;
  }

  const match = items.find((item) => item.name.toLowerCase() === loc);
  return match?.rate ?? fallbackRate;
}
