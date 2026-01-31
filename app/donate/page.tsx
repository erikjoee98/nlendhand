"use client";

import { useSearchParams } from "next/navigation";
import DonateScreen from "../components/DonateScreen";
import { MOCK_CAMPAIGNS } from "../../lib/mockData";

export default function DonatePage() {
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
    if (campaignId && MOCK_CAMPAIGNS.some((c) => c.id === campaignId)) {
      return campaignId;
    }
    if (category) {
      const targetCategory = categoryMap[category] || category;
      const match = MOCK_CAMPAIGNS.find(
        (c) => c.category === targetCategory && c.percentage < 100
      );
      if (match) return match.id;
    }
    return MOCK_CAMPAIGNS[0]?.id ?? "1";
  })();

  return (
    <DonateScreen
      backHref="/"
      campaignId={resolvedCampaignId}
      category={category}
    />
  );
}
