import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getPrisma() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const directUrl =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || undefined;
  const accelerateUrl =
    directUrl ? undefined : process.env.PRISMA_DATABASE_URL || undefined;

  if (!directUrl && !accelerateUrl) {
    throw new Error(
      "Missing database configuration. Set DATABASE_URL or POSTGRES_URL for direct Postgres, or PRISMA_DATABASE_URL for Accelerate."
    );
  }

  const adapter = directUrl
    ? new PrismaPg({
        connectionString: directUrl,
      })
    : undefined;

  const prisma = new PrismaClient({
    log: ["error", "warn"],
    ...(adapter ? { adapter } : {}),
    ...(accelerateUrl ? { accelerateUrl } : {}),
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }

  return prisma;
}
