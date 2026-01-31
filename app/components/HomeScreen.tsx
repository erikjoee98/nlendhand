
"use client";

import React from "react";
import Link from "next/link";
import { formatNumber } from "../../lib/format";
import { useDonateSelector } from "./AppShell";
import type { Campaign } from "../../types";

interface HomeScreenProps {
  campaigns: Campaign[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ campaigns }) => {
  const { openDonateSelector } = useDonateSelector();

  if (campaigns.length === 0) {
    return null;
  }

  // Curated logic for the home page
  const featuredCampaign = campaigns.find((c) => c.id === "1") || campaigns[0];
  const urgentNeeds = campaigns.filter(
    (c) => c.id !== featuredCampaign.id && c.percentage < 100
  ).slice(0, 2);

  return (
    <div className="pb-32 bg-white dark:bg-gray-950">
            {/* 1. TOP SECTION (ENTRY) */}
            <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-6 py-4 justify-between border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="text-primary flex size-8 items-center justify-center bg-primary/10 rounded-lg">
                        <span className="material-symbols-outlined text-lg">volunteer_activism</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-base font-black tracking-tight">LendAHand</h2>
                </div>
            </header>

            {/* Hero */}
            <section className="p-6">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-gray-900 px-8 py-10">
                    <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4">Direct Impact</span>
                        <h1 className="text-slate-900 dark:text-white text-3xl font-serif italic leading-tight mb-4">Help Rebuild Lives Today.</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 pr-4">Your contribution provides critical care and mobility to those recovering from life-changing injuries.</p>
                        <button
                            onClick={openDonateSelector}
                            className="w-full h-14 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 transition-transform active:scale-95"
                        >
                            Donate Now
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <span className="material-symbols-outlined text-9xl">heart_plus</span>
                    </div>
                </div>
            </section>

            {/* 2. FEATURED / MOST URGENT CASE */}
            <section className="px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900 dark:text-white text-lg font-black tracking-tight">Featured Case</h3>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded">Urgent</span>
                </div>
                <Link
                    href={`/campaign/${featuredCampaign.id}`}
                    className="group relative flex flex-col items-stretch rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-900 transition-all active:scale-[0.99] cursor-pointer"
                >
                    <div 
                        className="w-full aspect-video bg-center bg-cover" 
                        style={{ backgroundImage: `url("${featuredCampaign.image}")` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{featuredCampaign.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 line-clamp-2 leading-relaxed">{featuredCampaign.description}</p>
                        
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-lg font-black text-primary">${formatNumber(featuredCampaign.raised)} <span className="text-xs font-bold text-slate-400 italic">raised</span></span>
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{featuredCampaign.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${featuredCampaign.percentage}%` }}></div>
                        </div>
                    </div>
                </Link>
            </section>

            {/* 3. URGENT NOW (CURATED) */}
            <section className="px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-slate-900 dark:text-white text-lg font-black tracking-tight">Urgent Now</h3>
                    <button className="text-primary text-[11px] font-black uppercase tracking-widest hover:underline">View all</button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {urgentNeeds.map((campaign) => (
                        <Link
                            key={campaign.id}
                            href={`/campaign/${campaign.id}`}
                            className="flex items-center gap-4 bg-white dark:bg-gray-900 p-3 rounded-2xl border border-slate-50 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                        >
                            <div className="size-20 rounded-xl bg-center bg-cover shrink-0" style={{ backgroundImage: `url(${campaign.image})` }} />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">{campaign.title}</h4>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-1 h-1 bg-slate-100 dark:bg-gray-800 rounded-full">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }}></div>
                                    </div>
                                    <span className="text-[10px] font-black text-primary">{campaign.percentage}%</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 4. TRUST SIGNALS */}
            <section className="px-6 py-4">
                <div className="bg-slate-50 dark:bg-gray-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-success fill-1 text-2xl">verified</span>
                        <h4 className="font-black text-sm uppercase tracking-tight text-slate-900 dark:text-white">100% Transparent Relief</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">Every dollar is tracked on our secure ledger and verified by our clinical board before disbursement.</p>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <p className="text-xl font-black text-primary tracking-tighter">$14.2M</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Funds Managed</p>
                        </div>
                        <div className="w-[1px] h-10 bg-slate-200 dark:bg-gray-800"></div>
                        <div className="flex-1">
                            <p className="text-xl font-black text-primary tracking-tighter">100%</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Verified Use</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. IMPACT PREVIEW */}
            <section className="px-6 py-12 text-center">
                <h3 className="text-2xl font-serif italic text-slate-900 dark:text-white mb-2">Lives transformed.</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">12k+ individuals have reclaimed their independence.</p>
                <Link
                    href="/impact"
                    className="inline-flex items-center justify-center h-12 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest transition-transform active:scale-95"
                >
                    See your impact
                </Link>
            </section>
        </div>
  );
};

export default HomeScreen;
