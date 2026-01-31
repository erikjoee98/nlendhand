import { getActiveCampaigns } from "../../../lib/data";
import type { Campaign } from "../../../types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const categoryMap: Record<string, string> = {
  mobility: "Mobility",
  emergency: "Emergency",
  urgent: "Recovery",
  smart: "Mobility",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");
  const campaigns = await getActiveCampaigns();
  if (!categoryParam) {
    return Response.json({ campaigns });
  }
  const mappedCategory = categoryMap[categoryParam] || categoryParam;
  const filtered = campaigns.filter(
    (campaign: Campaign) =>
      campaign.category === mappedCategory && campaign.percentage < 100
  );
  return Response.json({ campaigns: filtered });
}
