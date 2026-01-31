import path from "node:path";
import { defineConfig, env } from "prisma/config";
import "dotenv/config";  // Betölti a környezeti változókat

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "tsx prisma/seed.ts",  // A seed fájl beállítása
  },
  datasource: {
    url: env("DATABASE_URL"), // A környezeti változó használata
  },
  
});
