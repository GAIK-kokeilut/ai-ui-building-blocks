import dotenv from "dotenv";
import path from "path";
import { Client } from "pg";

// Lataa ympäristömuuttujat
const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

async function testConnection() {
  // Tulostetaan connection string (salasana sensuroituna)
  const dbUrl = new URL(process.env.DATABASE_URL || "");
  console.log(
    "Testing connection to:",
    dbUrl.href.replace(dbUrl.password, "****"),
  );

  // Vaihda portti 5432:een
  const connectionString = dbUrl.href.replace(":6543", ":5432");

  try {
    const client = new Client({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    await client.connect();
    const result = await client.query("SELECT current_timestamp");
    console.log("Connection successful!");
    console.log("Server time:", result.rows[0].current_timestamp);

    await client.end();
    return true;
  } catch (error) {
    console.error("Connection failed:", error);
    return false;
  }
}

// Suoritetaan testi
testConnection()
  .then((success) => {
    console.log(success ? "Test completed successfully!" : "Test failed!");
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });
