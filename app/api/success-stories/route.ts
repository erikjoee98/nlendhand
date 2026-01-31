import { getSuccessStories } from "../../../lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stories = await getSuccessStories();
  return Response.json({ stories });
}
