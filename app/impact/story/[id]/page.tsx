import SuccessStoryDetailScreen from "../../../components/SuccessStoryDetailScreen";
import { getSuccessStories, getSuccessStoryById } from "../../../../lib/data";

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  const story = await getSuccessStoryById(id);
  const fallback = story ?? (await getSuccessStories())[0];
  if (!fallback) return null;
  return <SuccessStoryDetailScreen story={fallback} />;
}
