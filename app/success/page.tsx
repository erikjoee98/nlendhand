import { getCampaignById } from "../../lib/data";
import { formatNumber } from "../../lib/format";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  searchParams?: { campaignId?: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const campaignId = searchParams?.campaignId;
  const campaign = campaignId ? await getCampaignById(campaignId) : null;
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 px-6 py-20">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-serif italic mb-4">Thank you.</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Your donation was successful.
        </p>
        {campaign && (
          <div className="mt-8 text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              Updated Campaign Total
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              ${formatNumber(campaign.raised)} raised
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Goal ${formatNumber(campaign.goal)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
