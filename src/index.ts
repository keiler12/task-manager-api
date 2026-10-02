import pool from "./config/database.js";

async function testDatabaseConnection(): Promise<void> {
  try {
    const result = await pool.query("SELECT current_database()");

    console.log("Conexión a PostgreSQL exitosa.");
    console.log("Base de datos:", result.rows[0].current_database);
  } catch (error) {
    console.error("Error al conectar con PostgreSQL:", error);
  } finally {
    await pool.end();
  }
}

testDatabaseConnection();