import ExploreScreen from "../components/ExploreScreen";
import { getActiveCampaigns } from "../../lib/data";

export default async function ExplorePage() {
  const campaigns = await getActiveCampaigns();
  return <ExploreScreen campaigns={campaigns} />;
}
