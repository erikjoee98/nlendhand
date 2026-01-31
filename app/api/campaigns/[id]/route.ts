import { getCampaignById } from "../../../../lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!id) {
    return Response.json({ error: "Missing id." }, { status: 400 });
  }
  const campaign = await getCampaignById(id);
  if (!campaign) {
    return Response.json({ error: "Not found." }, { status: 404 });
  }
  return Response.json({ campaign });
}
