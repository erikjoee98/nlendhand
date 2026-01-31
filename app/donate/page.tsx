export const dynamic = "force-dynamic";

import { Suspense } from "react";
import DonateClient from "./DonateClient";
import { getActiveCampaigns } from "../../lib/data";

export default async function DonatePage() {
  const campaigns = await getActiveCampaigns();
  return (
    <Suspense>
      <DonateClient campaigns={campaigns} />
    </Suspense>
  );
}
