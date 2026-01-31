import { prisma } from "../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  const [patientsSupported, totals] = await Promise.all([
    prisma.campaign.count({
      where: {
        OR: [{ isActive: true }, { raisedCents: { gt: 0 } }],
      },
    }),
    prisma.campaign.aggregate({
      _sum: {
        raisedCents: true,
        goalCents: true,
      },
    }),
  ]);

  const totalRaised = totals._sum.raisedCents ?? 0;
  const totalGoal = totals._sum.goalCents ?? 0;
  const rehabCompletion = totalGoal > 0 ? (totalRaised / totalGoal) * 100 : 0;

  return Response.json({
    patientsSupported,
    rehabCompletion,
  });
}
