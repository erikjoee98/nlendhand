import DetailScreen from "../../components/DetailScreen";
import { getActiveCampaigns, getCampaignById } from "../../../lib/data";

interface CampaignPageProps {
  params: Promise<{ id: string }>;
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { id } = await params;
  const campaign = await getCampaignById(id);
  const fallback = campaign ?? (await getActiveCampaigns())[0];
  if (!fallback) return null;
  return <DetailScreen campaign={fallback} />;
}
