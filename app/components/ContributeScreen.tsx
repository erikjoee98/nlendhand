"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { formatNumber } from "../../lib/format";
import type { Campaign } from "../../types";

interface ContributeScreenProps {
  campaigns: Campaign[];
}

const PRESETS = [50, 100, 250, 500];

const ContributeScreen: React.FC<ContributeScreenProps> = ({ campaigns }) => {
  const curated = useMemo(() => campaigns.slice(0, 4), [campaigns]);
  const [selectedCampaignId, setSelectedCampaignId] = useState(
    curated[0]?.id ?? ""
  );
  const [amount, setAmount] = useState<number>(100);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const selectedCampaign =
    curated.find((campaign) => campaign.id === selectedCampaignId) ?? curated[0];

  const normalizedAmount = Number.isFinite(amount) ? amount : 0;
  const amountDisplay = normalizedAmount.toFixed(2);

  const handleAmountChange = (value: string) => {
    const parsed = Number.parseFloat(value);
    setAmount(Number.isFinite(parsed) ? parsed : 0);
  };

  const handleInitiativeSelect = (campaignId: string) => {
    setSelectedCampaignId(campaignId);

    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    requestAnimationFrame(() => {
      summaryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleContribute = async () => {
    if (isSubmitting || !selectedCampaign) return;
    if (!hasAcceptedTerms) {
      setTermsError(true);
      return;
    }

    setIsSubmitting(true);
    setTermsError(false);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: selectedCampaign.id,
          amount: normalizedAmount,
        }),
      });

      if (!response.ok) {
        console.error("Checkout failed.");
        return;
      }

      const data = (await response.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedCampaign) {
    return null;
  }

  return (
    <div className="px-6 py-8 lg:px-8 xl:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif italic text-slate-900 dark:text-white">
            Capital Allocation
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Select a verified initiative and allocate capital through a secure,
            institution-grade checkout flow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10">
          <section className="space-y-4">
            {curated.map((campaign) => {
              const isSelected = campaign.id === selectedCampaign.id;
              return (
                <button
                  key={campaign.id}
                  type="button"
                  onClick={() => handleInitiativeSelect(campaign.id)}
                  className={`w-full text-left rounded-2xl border p-5 transition-all ${
                    isSelected
                      ? "border-primary/40 bg-primary/5"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="size-20 rounded-xl bg-center bg-cover shrink-0"
                      style={{ backgroundImage: `url("${campaign.image}")` }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                          Verified Initiative
                        </span>
                        {campaign.verified && (
                          <span className="material-symbols-outlined text-success text-sm">
                            verified
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white truncate">
                        {campaign.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {campaign.description}
                      </p>
                      <div className="mt-3 text-xs font-semibold text-primary">
                        ${formatNumber(campaign.raised)} committed
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </section>

          <aside className="lg:pl-2" ref={summaryRef}>
            <div className="lg:sticky lg:top-24 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-5">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Contribution Summary
                </p>
                <p className="mt-2 text-lg font-black text-slate-900 dark:text-white">
                  {selectedCampaign.title}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-black text-slate-400 mb-2">
                  Amount
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`h-11 rounded-xl border text-sm font-bold transition-colors ${
                        amount === preset
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
                <div className="mt-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 flex items-center h-12">
                  <span className="text-slate-400 mr-2">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount === 0 ? "" : amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="no-spinner w-full bg-transparent border-none outline-none text-base font-semibold text-slate-900 dark:text-white"
                    placeholder="Custom amount"
                  />
                </div>
                <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                  ${amountDisplay}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-500">
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Secure Stripe checkout
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Verified initiative oversight
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">description</span>
                  Reporting and transparency standards
                </p>
              </div>

              <div
                className={`rounded-xl border px-3 py-2.5 ${
                  termsError
                    ? "border-red-300 bg-red-50/70 dark:bg-red-950/20"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-gray-900/70"
                }`}
              >
                <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={hasAcceptedTerms}
                    onChange={(e) => {
                      setHasAcceptedTerms(e.target.checked);
                      if (e.target.checked) setTermsError(false);
                    }}
                    className="mt-0.5 size-5 rounded border-slate-400 text-primary focus:ring-primary"
                  />
                  <span>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border-b border-slate-500/80 text-slate-900 dark:text-white leading-none pb-[1px]"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border-b border-slate-500/80 text-slate-900 dark:text-white leading-none pb-[1px]"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {termsError && (
                  <p className="mt-2 text-[11px] font-medium text-red-600 dark:text-red-400">
                    Please accept the Terms of Service to continue.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleContribute}
                disabled={isSubmitting}
                className={`w-full h-14 rounded-xl text-white font-bold text-base transition-all ${
                  hasAcceptedTerms
                    ? "bg-primary hover:bg-blue-700 shadow-md shadow-primary/20"
                    : "bg-primary/85 shadow-sm"
                } disabled:opacity-60`}
              >
                Contribute ${amountDisplay}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ContributeScreen;
