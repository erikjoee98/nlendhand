import ImpactScreen from "../components/ImpactScreen";
import { getSuccessStories } from "../../lib/data";

export default async function ImpactPage() {
  const stories = await getSuccessStories();
  return <ImpactScreen stories={stories} />;
}
