import { getPrisma } from "../../../lib/db";
import { getTotalRaised } from "../../../lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrisma();
  const [totalRaisedCents, activeInitiatives] = await Promise.all([
    getTotalRaised(),
    prisma.campaign.count({
      where: { isActive: true },
    }),
  ]);

  return Response.json({
    totalRaisedCents,
    activeInitiatives,
  });
}
