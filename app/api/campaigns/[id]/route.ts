import { getCampaignById } from "../../../../lib/data";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const campaign = await getCampaignById(id);
  if (!campaign) {
    return Response.json({ error: "Not found." }, { status: 404 });
  }
  return Response.json({ campaign });
}
