import { getCampaignById } from "../../../../lib/data";

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, context: RouteContext) {
  const campaign = await getCampaignById(context.params.id);
  if (!campaign) {
    return Response.json({ error: "Not found." }, { status: 404 });
  }
  return Response.json({ campaign });
}
