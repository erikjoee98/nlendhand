"use client";

import { useSearchParams } from "next/navigation";
import DonateScreen from "../components/DonateScreen";
import type { Campaign } from "../../types";

interface DonateClientProps {
  campaigns: Campaign[];
}

export default function DonateClient({ campaigns }: DonateClientProps) {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const category = searchParams.get("category");

  const categoryMap: Record<string, string> = {
    mobility: "Mobility",
    emergency: "Emergency",
    urgent: "Recovery",
    smart: "Mobility",
  };

  const resolvedCampaignId = (() => {
    if (campaignId && campaigns.some((c) => c.id === campaignId)) {
      return campaignId;
    }
    if (category) {
      const targetCategory = categoryMap[category] || category;
      const match = campaigns.find(
        (c) => c.category === targetCategory && c.percentage < 100
      );
      if (match) return match.id;
    }
    return campaigns[0]?.id ?? "1";
  })();

  return (
    <DonateScreen
      backHref="/"
      campaignId={resolvedCampaignId}
      category={category}
      campaigns={campaigns}
    />
  );
}
