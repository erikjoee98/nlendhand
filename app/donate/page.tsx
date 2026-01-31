import { Suspense } from "react";
import DonateClient from "./DonateClient";

export default function DonatePage() {
  return (
    <Suspense>
      <DonateClient />
    </Suspense>
  );
}
