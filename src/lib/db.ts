import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT || "3306", 10),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export function getDbPool() {
  return pool;
}

export async function getDbConnection() {
  if (!process.env.DB_HOST || !process.env.DB_DATABASE || !process.env.DB_USERNAME) {
    throw new Error("Database environment variables are missing.");
  }

  try {
    return await pool.getConnection();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Cannot connect to the WordPress database: ${message}`);
  }
}
