import { getSuccessStories } from "../../../lib/data";

export async function GET() {
  const stories = await getSuccessStories();
  return Response.json({ stories });
}
