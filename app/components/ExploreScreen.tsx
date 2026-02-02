
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { formatNumber } from "../../lib/format";
import type { Campaign } from "../../types";

interface ExploreScreenProps {
    campaigns: Campaign[];
}

const ExploreScreen: React.FC<ExploreScreenProps> = ({ campaigns }) => {
    const [selectedChip, setSelectedChip] = useState<string>("All");
    
    const categories = ["All", "Mobility", "Recovery", "Emergency"];
    
    const filteredCampaigns = useMemo(() => {
        if (selectedChip === "All") return campaigns;
        return campaigns.filter(c => c.category === selectedChip);
    }, [selectedChip, campaigns]);

    const urgentNeeds = useMemo(() => 
        campaigns.filter(c => c.percentage >= 80 && c.percentage < 100),
    [campaigns]);

    return (
        <div className="pb-20 bg-background-light dark:bg-gray-950 min-h-screen">
            <section className="px-6 pt-10 lg:px-8 xl:px-10 lg:pt-14">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-2 text-primary font-black text-[11px] uppercase tracking-[0.2em]">
                        <span className="material-symbols-outlined text-sm fill-1">verified</span>
                        Vetted Institutional Framework
                    </div>
                    <h1 className="mt-4 text-4xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                        Explore Medical Initiatives.
                    </h1>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Select a focus area to review initiatives with clear progress, verified oversight, and secure contribution flows.
                    </p>
                </div>
            </section>

            <section className="px-6 pt-10 lg:px-8 xl:px-10">
                <div className="border-b border-slate-200 dark:border-slate-800">
                    <div className="flex gap-8 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedChip(cat)}
                                className={`pb-4 text-sm font-bold transition-colors border-b-[3px] ${
                                    selectedChip === cat
                                        ? "border-primary text-slate-900 dark:text-white"
                                        : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                            >
                                {cat === "All" ? "All Initiatives" : cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-5" />
            </section>

            <section className="px-6 pt-8 lg:px-8 xl:px-10">
                {selectedChip === "All" && urgentNeeds.length > 0 && (
                    <div className="mb-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-gray-900/50 p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-sm">bolt</span>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Near Completion</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {urgentNeeds.map((campaign, index) => (
                                <Link
                                    key={campaign.id}
                                    href={`/campaign/${campaign.id}`}
                                    className="group bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div
                                        className="relative w-full aspect-[16/10] rounded-lg bg-center bg-cover overflow-hidden"
                                        style={{ backgroundImage: `url(${campaign.image})` }}
                                    >
                                        <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary inline-flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[12px] fill-1">verified</span>
                                            Verified
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {index === 0 && (
                                            <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                                Priority Initiative
                                            </span>
                                        )}
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                                            {campaign.title}
                                        </h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                            {campaign.description}
                                        </p>
                                        <div className="pt-2">
                                            <div className="flex justify-between text-xs font-bold">
                                                <span>Capital Deployed</span>
                                                <span>${formatNumber(campaign.raised)} / ${formatNumber(campaign.goal)}</span>
                                            </div>
                                            <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCampaigns.map((campaign) => (
                        <Link
                            key={campaign.id}
                            href={`/campaign/${campaign.id}`}
                            className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
                        >
                            <div
                                className="relative w-full aspect-[16/10] rounded-lg bg-center bg-cover overflow-hidden"
                                style={{ backgroundImage: `url(${campaign.image})` }}
                            >
                                <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary inline-flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px] fill-1">verified</span>
                                    Verified
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded truncate">
                                        {campaign.category}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">{campaign.title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{campaign.description}</p>
                                <div className="pt-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span>Capital Deployed</span>
                                        <span>${formatNumber(campaign.raised)} / ${formatNumber(campaign.goal)}</span>
                                    </div>
                                    <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {filteredCampaigns.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">search_off</span>
                    <h3 className="font-black text-slate-900 dark:text-white">No initiatives found</h3>
                    <p className="text-sm text-slate-400 mt-1">Try selecting a different category or browsing all initiatives.</p>
                </div>
            )}
        </div>
    );
};

export default ExploreScreen;
