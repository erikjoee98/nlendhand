import HomeScreen from "./components/HomeScreen";
import { getActiveCampaigns } from "../lib/data";

export default async function Home() {
  const campaigns = await getActiveCampaigns();
  return <HomeScreen campaigns={campaigns} />;
}
