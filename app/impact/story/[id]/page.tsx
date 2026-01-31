"use client";

import { use } from "react";
import SuccessStoryDetailScreen from "../../../components/SuccessStoryDetailScreen";

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

export default function StoryPage({ params }: StoryPageProps) {
  const { id } = use(params);
  return <SuccessStoryDetailScreen storyId={id} />;
}
