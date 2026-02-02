
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import type { Campaign } from "../../types";
import { formatNumber } from "../../lib/format";

interface DonateScreenProps {
    backHref: string;
    campaignId: string;
    category: string | null;
    campaigns: Campaign[];
}

const CATEGORY_MAP: Record<string, string> = {
    mobility: "Mobility",
    emergency: "Emergency",
    urgent: "Recovery",
    smart: "Mobility",
};

const DonateScreen: React.FC<DonateScreenProps> = ({ backHref, campaignId, category, campaigns }) => {
    const [amount, setAmount] = useState<number>(50);
    const [selectedId, setSelectedId] = useState<string | null>(campaignId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
    const [termsError, setTermsError] = useState(false);

    const hasCampaigns = campaigns.length > 0;

    const matchingCampaigns = useMemo(() => {
        if (!category) return [];
        const targetCategory = CATEGORY_MAP[category] || category;
        return campaigns.filter(c => c.category === targetCategory && c.percentage < 100);
    }, [category, campaigns]);

    const categoryLabel = category ? CATEGORY_MAP[category] || category : "";

    // Determine the active campaign to show checkout for
    const activeCampaign = useMemo(() => {
        if (selectedId) return campaigns.find(c => c.id === selectedId);
        if (matchingCampaigns.length === 1) return matchingCampaigns[0];
        return null;
    }, [selectedId, matchingCampaigns, campaigns]);

    const handleAmountChange = (val: string) => {
        const next = Number.parseFloat(val);
        setAmount(Number.isFinite(next) ? next : 0);
    };

    const normalizedAmount = Number.isFinite(amount) ? amount : 0;
    const amountDisplay = normalizedAmount.toFixed(2);

    const presetOptions = [
        { value: 25, label: "$25" },
        { value: 50, label: "$50", badge: "Most Popular" },
        { value: 100, label: "$100" },
        { value: 250, label: "$250", badge: "High Impact" },
    ];

    const handleDonate = async () => {
        if (isSubmitting) return;
        if (!hasAcceptedTerms) {
            setTermsError(true);
            return;
        }
        setIsSubmitting(true);
        setTermsError(false);
        const payload = {
            campaignId: finalCampaign.id,
            amount: normalizedAmount,
        };
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const contentType = response.headers.get("content-type") || "";
                let errorBody: unknown = null;
                if (contentType.includes("application/json")) {
                    try {
                        errorBody = await response.json();
                    } catch {
                        errorBody = null;
                    }
                } else {
                    errorBody = await response.text().catch(() => null);
                }
                console.error("Checkout failed.", {
                    status: response.status,
                    statusText: response.statusText,
                    contentType,
                    error: errorBody,
                });
                return;
            }
            const data = (await response.json()) as { url?: string };
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Checkout URL missing.");
            }
        } catch (error) {
            console.error("Checkout error.", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!hasCampaigns) {
        return null;
    }

    // 1. Selection Step: Show list if multiple campaigns match and none selected yet
    if (!activeCampaign && matchingCampaigns.length > 1) {
        return (
        <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white min-h-screen flex flex-col pb-10">
            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
                <Link
                        href={backHref}
                        className="text-[#0d121b] dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </Link>
                    <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Select Initiative</h2>
                </div>

                <div className="px-4 py-6">
                    <h3 className="text-2xl font-serif italic text-slate-900 dark:text-white mb-2">Intentional Impact.</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">
                        There are {matchingCampaigns.length} priority initiatives in the <span className="text-primary font-bold">{categoryLabel}</span> category. Please choose which program you&apos;d like to support.
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                        {matchingCampaigns.map(campaign => (
                            <button 
                                key={campaign.id}
                                onClick={() => setSelectedId(campaign.id)}
                                className="flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all text-left hover:border-primary/30 group"
                            >
                                <div className="size-24 rounded-2xl bg-center bg-cover shrink-0 shadow-sm" style={{ backgroundImage: `url(${campaign.image})` }} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-full">Urgent</span>
                                    {campaign.verified && <span className="material-symbols-outlined text-[14px] text-success fill-1">verified</span>}
                                    </div>
                                    <h4 className="text-base font-black text-slate-900 dark:text-white truncate">{campaign.title}</h4>
                                    <p className="text-xs text-slate-400 font-medium line-clamp-2 mt-1 leading-snug">{campaign.description}</p>
                                    <div className="mt-3 text-[10px] font-semibold text-primary">
                                        ${formatNumber(campaign.raised)} initial capital committed
                                    </div>
                                    <div className="mt-2 flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-[10px] font-semibold text-slate-500">
                                        ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))} to unlock full program deployment
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary">chevron_right</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Fallback if somehow no campaigns are found (though logic above should handle selection or direct match)
    const finalCampaign = activeCampaign || campaigns[0];

    // 2. Donation Step: Final checkout screen
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white min-h-screen flex flex-col pb-36 lg:pb-16">
            {/* TopAppBar */}
            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 lg:hidden">
                <Link
                    href={backHref}
                    className="text-[#0d121b] dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </Link>
                <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Complete Contribution</h2>
            </div>

            <div className="lg:grid lg:grid-cols-[1.3fr_0.7fr] lg:gap-12 lg:px-10 xl:px-12 lg:max-w-6xl lg:mx-auto lg:w-full lg:pt-6">
                <div className="lg:pr-2 lg:max-w-2xl">
                    {/* ProfileHeader */}
                    <div className="flex p-4 lg:px-0 lg:pt-8">
                        <div className="flex w-full flex-col gap-4">
                            <div className="flex gap-4 items-center">
                                <div 
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 shadow-sm border-2 border-white dark:border-gray-800 shrink-0" 
                                    style={{ backgroundImage: `url("${finalCampaign.image}")` }}
                                ></div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-[#0d121b] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">You are supporting {finalCampaign.title}</p>
                                    <p className="text-[#4c669a] dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2">{finalCampaign.description}</p>
                                    {finalCampaign.verified && (
                                        <div className="flex items-center gap-1 mt-1 text-green-500">
                                            <span className="material-symbols-outlined text-sm">verified</span>
                                            <p className="text-xs font-semibold uppercase tracking-wider">Reviewed Initiative</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 lg:px-0">
                        <div className="h-px bg-gray-200 dark:bg-gray-800 w-full mb-4"></div>
                    </div>

                    {/* SectionHeader */}
                    <h3 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pt-4 pb-2 lg:px-0 lg:pt-10">Select Contribution</h3>

                    {/* Donation Presets */}
                    <div className="flex flex-col gap-3 px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-2 lg:gap-4 lg:px-0">
                        {presetOptions.map((preset) => {
                            const isSelected = amount === preset.value;
                            const hasBadge = Boolean(preset.badge);
                            return (
                            <button 
                                key={preset.value}
                                onClick={() => setAmount(preset.value)}
                                className={`relative w-full min-h-[64px] flex flex-col items-start justify-center rounded-2xl border px-5 py-4 text-left leading-tight cursor-pointer transition-all duration-150 ease-out ${isSelected ? 'border-slate-900/10 bg-slate-50 text-[#0d121b] shadow-sm' : 'border-slate-200 bg-white text-[#0d121b] shadow-sm'} lg:hover:shadow-md`}
                            >
                                <div className="flex w-full items-center justify-between">
                                    <span className="text-lg font-semibold">{preset.label}</span>
                                    {hasBadge ? (
                                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                                            {preset.badge}
                                        </span>
                                    ) : null}
                                </div>
                                {isSelected ? (
                                    <span className="mt-2 text-[10px] font-medium text-slate-500">Selected amount</span>
                                ) : null}
                            </button>
                        );
                        })}
                    </div>

                    {/* Custom Amount */}
                    <div className="px-4 py-3 lg:px-0">
                        <div className="flex w-full items-stretch rounded-xl overflow-hidden border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus-within:border-primary transition-colors">
                            <div className="flex items-center justify-center pl-4 pr-3 text-gray-400 border-r border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-lg">attach_money</span>
                            </div>
                            <input 
                                className="no-spinner appearance-none flex w-full border-none bg-transparent h-14 text-[#0d121b] dark:text-white placeholder:text-[#4c669a] dark:placeholder:text-gray-500 px-3 text-base font-medium caret-slate-900 dark:caret-white focus:outline-none focus:ring-0 focus:shadow-none [box-shadow:none]" 
                                placeholder="Enter custom amount" 
                                type="text"
                                inputMode="decimal"
                                autoComplete="off"
                                value={amount === 0 ? "" : amount}
                                onChange={(e) => handleAmountChange(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Campaign Progress */}
                    <section className="px-4 pt-4 lg:px-0 lg:pt-8">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Initiative Progress</h3>
                                <span className="text-xs font-black text-primary">{finalCampaign.percentage}% progress</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-primary" style={{ width: `${finalCampaign.percentage}%` }}></div>
                            </div>
                            <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="text-primary">${formatNumber(finalCampaign.raised)} initial capital committed</span>
                                <span className="text-slate-500">
                                    ${formatNumber(Math.max(finalCampaign.goal - finalCampaign.raised, 0))} to unlock full program deployment
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Impact Breakdown */}
                    <section className="px-4 pt-4 lg:px-0 lg:pt-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Impact Breakdown</h3>
                            <div className="space-y-3">
                                <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[18px] leading-none">medical_services</span>
                                        <p className="text-[13px] font-bold text-slate-900 dark:text-white">Medical care</p>
                                    </div>
                                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Direct treatment and clinical support.</p>
                                </div>
                                <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[18px] leading-none">biotech</span>
                                        <p className="text-[13px] font-bold text-slate-900 dark:text-white">Equipment</p>
                                    </div>
                                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Mobility devices and recovery tools.</p>
                                </div>
                                <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[18px] leading-none">local_shipping</span>
                                        <p className="text-[13px] font-bold text-slate-900 dark:text-white">Transport</p>
                                    </div>
                                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Access to appointments and rehab.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Trust & Safety */}
                    <section className="px-4 pt-3 lg:px-0 lg:pt-6">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Trust & Safety</h3>
                                {finalCampaign.verified && (
                                    <span className="inline-flex items-center gap-1 text-success text-xs font-black uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-sm fill-1">verified</span>
                                        Verified
                                    </span>
                                )}
                            </div>
                            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">lock</span>
                                    Secure Stripe Checkout
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">receipt_long</span>
                                    Receipts delivered via email
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="h-10 lg:h-0" />
                </div>

                <aside className="hidden lg:block lg:pl-2">
                    <div className="sticky top-24 bg-white dark:bg-gray-900 border border-slate-200/70 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Contribution Summary</h4>
                            <span className="text-[10px] font-semibold text-slate-500">Secure checkout</span>
                        </div>
                        <div className="mt-5 space-y-1">
                            <p className="text-3xl font-black text-slate-900 dark:text-white">
                                ${amountDisplay}
                            </p>
                            <p className="text-xs text-slate-500">Selected amount</p>
                            <p className="text-xs text-slate-400">{finalCampaign.title}</p>
                        </div>
                        <div className="mt-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-gray-900/60 px-4 py-3 text-xs text-slate-500">
                            This contribution supports program deployment and ongoing platform operations.
                        </div>
                        <div className={`mt-5 rounded-xl border px-3 py-2.5 transition-colors ${termsError ? "border-red-300 bg-red-50/60 dark:bg-red-950/20" : "border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-gray-900/70"}`}>
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
                                        className="inline-block border-b border-slate-500/80 text-slate-900 dark:text-white leading-none pb-[1px] hover:border-slate-700"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block border-b border-slate-500/80 text-slate-900 dark:text-white leading-none pb-[1px] hover:border-slate-700"
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
                            onClick={handleDonate}
                            disabled={isSubmitting}
                            className={`mt-4 w-full bg-primary text-white h-14 rounded-2xl font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 ${hasAcceptedTerms ? "hover:bg-blue-700" : "opacity-80"}`}
                        >
                            Contribute ${amountDisplay}
                        </button>
                        <div className="mt-4 space-y-2 text-[11px] text-slate-500">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">lock</span>
                                Secure Stripe checkout
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">receipt_long</span>
                                Receipts delivered via email
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                Reviewed Initiative Oversight
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Secure Badge */}
            <div className="flex items-center justify-center gap-2 mt-8 opacity-60 lg:hidden">
                <span className="material-symbols-outlined text-sm">lock</span>
                                <span className="text-[11px] font-medium tracking-wide uppercase">Secure 256-bit SSL Encrypted</span>
            </div>

            {/* Sticky Footer Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/85 dark:bg-background-dark/85 backdrop-blur-md border-t border-gray-200/90 dark:border-gray-800/90 w-full z-50 lg:hidden">
                <div className={`mb-3 rounded-xl border px-3 py-2.5 transition-colors ${termsError ? "border-red-300 bg-red-50/60 dark:bg-red-950/20" : "border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-gray-900/70"}`}>
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
                            <Link href="/terms" target="_blank" rel="noopener noreferrer" className="inline-block border-b border-slate-500/80 text-slate-900 dark:text-white leading-none pb-[1px] hover:border-slate-700">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="inline-block border-b border-slate-500/80 text-slate-900 dark:text-white leading-none pb-[1px] hover:border-slate-700">
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
                    onClick={handleDonate}
                    disabled={isSubmitting}
                    className={`w-full bg-primary text-white h-16 rounded-xl font-bold text-lg shadow-md shadow-primary/15 transition-all flex items-center justify-center gap-2 disabled:opacity-60 ${hasAcceptedTerms ? "hover:bg-blue-700" : "opacity-80"}`}
                >
                    Contribute ${amountDisplay}
                </button>
                <div className="mt-3 space-y-1 text-center text-[10px] text-[#4c669a] px-6 leading-tight">
                    <p>Secure Stripe checkout</p>
                    <p>Receipts delivered via email</p>
                    <p>Contributions support medical initiatives and platform operations</p>
                </div>
            </div>
        </div>
    );
};

export default DonateScreen;
