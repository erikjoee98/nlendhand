"use client";

import { use } from "react";
import DetailScreen from "../../components/DetailScreen";

interface CampaignPageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignPage({ params }: CampaignPageProps) {
  const { id } = use(params);
  return <DetailScreen campaignId={id} />;
}
