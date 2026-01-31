
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { MOCK_CAMPAIGNS } from "../../lib/mockData";

interface DonateScreenProps {
    backHref: string;
    campaignId: string;
    category: string | null;
}

const DonateScreen: React.FC<DonateScreenProps> = ({ backHref, campaignId, category }) => {
    const [frequency, setFrequency] = useState<"once" | "monthly">("once");
    const [amount, setAmount] = useState<number>(50);
    const [selectedId, setSelectedId] = useState<string | null>(campaignId);

    // Map intent categories to data categories
    const categoryMap: Record<string, string> = {
        mobility: "Mobility",
        emergency: "Emergency",
        urgent: "Recovery",
        smart: "Mobility",
    };

    const matchingCampaigns = useMemo(() => {
        if (!category) return [];
        const targetCategory = categoryMap[category] || category;
        return MOCK_CAMPAIGNS.filter(c => c.category === targetCategory && c.percentage < 100);
    }, [category]);

    const categoryLabel = category ? categoryMap[category] || category : "";

    // Determine the active campaign to show checkout for
    const activeCampaign = useMemo(() => {
        if (selectedId) return MOCK_CAMPAIGNS.find(c => c.id === selectedId);
        if (matchingCampaigns.length === 1) return matchingCampaigns[0];
        return null;
    }, [selectedId, matchingCampaigns]);

    const handleAmountChange = (val: string) => {
        const next = Number.parseFloat(val);
        setAmount(Number.isFinite(next) ? next : 0);
    };

    const normalizedAmount = Number.isFinite(amount) ? amount : 0;
    const amountDisplay = normalizedAmount.toFixed(2);

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
                    <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Select Recipient</h2>
                </div>

                <div className="px-6 py-8">
                    <h3 className="text-2xl font-serif italic text-slate-900 dark:text-white mb-2">Intentional Impact.</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">
                        There are {matchingCampaigns.length} urgent cases in the <span className="text-primary font-bold">{categoryLabel}</span> category. Please choose who you&apos;d like to support.
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
                                    <div className="mt-3 flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-black text-primary">{campaign.percentage}%</span>
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
    const finalCampaign = activeCampaign || MOCK_CAMPAIGNS[0];

    // 2. Donation Step: Final checkout screen
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white min-h-screen flex flex-col pb-40">
            {/* TopAppBar */}
            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
                <Link
                    href={backHref}
                    className="text-[#0d121b] dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </Link>
                <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Complete Donation</h2>
            </div>

            {/* ProfileHeader */}
            <div className="flex p-4">
                <div className="flex w-full flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <div 
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 shadow-sm border-2 border-white dark:border-gray-800 shrink-0" 
                            style={{ backgroundImage: `url("${finalCampaign.image}")` }}
                        ></div>
                        <div className="flex flex-col justify-center">
                            <p className="text-[#0d121b] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">You are supporting {finalCampaign.author || finalCampaign.title.split("'")[0]}</p>
                            <p className="text-[#4c669a] dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2">{finalCampaign.description}</p>
                            {finalCampaign.verified && (
                                <div className="flex items-center gap-1 mt-1 text-green-500">
                                    <span className="material-symbols-outlined text-sm">verified</span>
                                    <p className="text-xs font-semibold uppercase tracking-wider">Verified Campaign</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4">
                <div className="h-px bg-gray-200 dark:bg-gray-800 w-full mb-4"></div>
            </div>

            {/* Frequency Toggle */}
            <div className="px-4 py-2">
                <div className="flex h-11 items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-800 p-1">
                    <button 
                        onClick={() => setFrequency('once')}
                        className={`flex h-full grow items-center justify-center rounded-lg px-2 text-sm font-semibold transition-all ${frequency === 'once' ? 'bg-white dark:bg-gray-700 shadow-sm text-[#0d121b] dark:text-white' : 'text-[#4c669a] dark:text-gray-400'}`}
                    >
                        One-time
                    </button>
                    <button 
                        onClick={() => setFrequency('monthly')}
                        className={`flex h-full grow items-center justify-center rounded-lg px-2 text-sm font-semibold transition-all ${frequency === 'monthly' ? 'bg-white dark:bg-gray-700 shadow-sm text-[#0d121b] dark:text-white' : 'text-[#4c669a] dark:text-gray-400'}`}
                    >
                        <span className="flex items-center gap-1">
                            Monthly
                            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">+15% Impact</span>
                        </span>
                    </button>
                </div>
            </div>

            {/* SectionHeader */}
            <h3 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pt-6 pb-2">Select Amount</h3>

            {/* Donation Presets */}
            <div className="grid grid-cols-4 gap-2 px-4 py-2">
                {[10, 25, 50, 100].map((val) => (
                    <button 
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`flex h-12 items-center justify-center rounded-xl border-2 transition-all font-bold ${amount === val ? 'border-primary bg-primary/5 text-primary' : 'border-transparent bg-gray-100 dark:bg-gray-800 text-[#0d121b] dark:text-white'}`}
                    >
                        ${val}
                    </button>
                ))}
            </div>

            {/* Custom Amount */}
            <div className="px-4 py-3">
                <div className="flex w-full items-stretch rounded-xl overflow-hidden border border-[#cfd7e7] dark:border-gray-700 bg-white dark:bg-gray-900 focus-within:border-primary transition-colors">
                    <div className="flex items-center justify-center pl-4 pr-2 text-gray-400">
                        <span className="material-symbols-outlined text-lg">attach_money</span>
                    </div>
                    <input 
                        className="flex w-full border-none bg-transparent h-14 text-[#0d121b] dark:text-white placeholder:text-[#4c669a] dark:placeholder:text-gray-500 p-0 text-base font-medium focus:ring-0" 
                        placeholder="Enter custom amount" 
                        type="number"
                        value={amount === 0 ? "" : amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                    />
                </div>
            </div>

            {/* Payment Method */}
            <h3 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pt-6 pb-2">Payment Method</h3>
            <div className="px-4 flex flex-col gap-3">
                <button className="w-full h-14 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center font-bold text-lg gap-2 shadow-sm active:scale-[0.98] transition-transform">
                    <span className="text-2xl leading-none"></span> Pay
                </button>
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-gray-400">credit_card</span>
                    <div className="flex-1 text-left">
                        <p className="text-sm font-semibold">Credit or Debit Card</p>
                        <p className="text-xs text-[#4c669a]">Visa, Mastercard, Amex</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-blue-600">account_balance_wallet</span>
                    <div className="flex-1 text-left">
                        <p className="text-sm font-semibold">PayPal</p>
                        <p className="text-xs text-[#4c669a]">Safe & Secure checkout</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </div>
            </div>

            {/* Secure Badge */}
            <div className="flex items-center justify-center gap-2 mt-8 opacity-60">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span className="text-[11px] font-medium tracking-wide uppercase">Secure 256-bit SSL Encrypted</span>
            </div>

            {/* Sticky Footer Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 max-w-md mx-auto z-50">
                <button
                    onClick={async (event) => {
                        event.preventDefault();
                        const payload = {
                            campaignId: finalCampaign.id,
                            amount: normalizedAmount,
                            frequency,
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
                                console.error("Checkout failed.");
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
                        }
                    }}
                    className="w-full bg-primary hover:bg-blue-700 text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                    Complete ${amountDisplay} Donation
                </button>
                <p className="text-center text-[10px] text-[#4c669a] mt-3 px-6 leading-tight">
                    By donating, you agree to the Terms of Service. 100% of your donation (minus processing fees) goes directly to the recipient.
                </p>
            </div>
        </div>
    );
};

export default DonateScreen;
