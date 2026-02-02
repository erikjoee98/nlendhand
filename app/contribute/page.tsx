import { getActiveCampaigns } from "../../lib/data";
import ContributeScreen from "../components/ContributeScreen";

export const dynamic = "force-dynamic";

export default async function ContributePage() {
  const campaigns = await getActiveCampaigns();
  return <ContributeScreen campaigns={campaigns} />;
}
