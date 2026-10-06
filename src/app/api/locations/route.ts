import type { PoolConnection } from "mysql2/promise";
import { getDbConnection } from "@/lib/db";
import { normalizeItems, resolvePricePerPerch, type QuotationItem } from "@/lib/quotation";

const TABLE_CANDIDATES = [
  process.env.WP_QUOTATION_TABLE,
  "QuotationConfigurations",
  `${process.env.WP_TABLE_PREFIX || "wp_"}quotation_configurations`,
].filter((table): table is string => Boolean(table));

const WP_PREFIX = process.env.WP_TABLE_PREFIX || "wp_";

export async function GET() {
  try {
    const items = await fetchQuotationItems();
    const pricePerPerch = resolvePricePerPerch(items);
    const configMap = Object.fromEntries(
      items.map((item) => [item.name.toLowerCase(), item.rate]),
    );

    return Response.json({
      success: true,
      items,
      pricePerPerch,
      configMap,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error";
    console.error("Database error:", error);
    throw new Error(message);
  }
}

async function fetchQuotationItems(): Promise<QuotationItem[]> {
  const connection = await getDbConnection();

  try {
    for (const table of TABLE_CANDIDATES) {
      const items = await queryCustomTable(connection, table);
      if (items.length > 0) {
        return items;
      }
    }

    const wordpressItems = await queryWordpressPosts(connection);
    if (wordpressItems.length === 0) {
      throw new Error("Connected to the database but no quotation items were found.");
    }
    return wordpressItems;
  } finally {
    connection.release();
  }
}

async function queryCustomTable(
  connection: PoolConnection,
  table: string,
): Promise<QuotationItem[]> {
  try {
    const [rows] = await connection.query(`SELECT name, rate FROM \`${table}\``);
    return normalizeItems(rows as Array<{ name?: unknown; rate?: unknown }>);
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? error.code : "";
    if (code === "ER_NO_SUCH_TABLE") {
      return [];
    }
    throw error;
  }
}

async function queryWordpressPosts(
  connection: PoolConnection,
): Promise<QuotationItem[]> {
  try {
    const [rows] = await connection.query(
      `
        SELECT p.post_title AS name, pm.meta_value AS rate
        FROM \`${WP_PREFIX}posts\` p
        INNER JOIN \`${WP_PREFIX}postmeta\` pm ON pm.post_id = p.ID
        WHERE p.post_status = 'publish'
          AND p.post_type IN (
            'quotation',
            'quotation_item',
            'quotation-item',
            'quotation_configuration',
            'quotation-configuration'
          )
          AND pm.meta_key IN ('rate', 'price', '_price', 'amount', 'value')
      `,
    );

    return normalizeItems(rows as Array<{ name?: unknown; rate?: unknown }>);
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? error.code : "";
    if (code === "ER_NO_SUCH_TABLE") {
      return [];
    }
    throw error;
  }
}
