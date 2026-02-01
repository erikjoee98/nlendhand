
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
        <div className="pb-32 bg-white dark:bg-gray-950 min-h-screen">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 lg:hidden">
                <h1 className="text-2xl font-serif italic text-slate-900 dark:text-white">Explore Initiatives.</h1>
            </header>

            <section className="px-6 pt-10 lg:px-8 xl:px-10 lg:pt-16">
                <div className="max-w-3xl">
                    <h1 className="hidden lg:block text-4xl font-serif italic text-slate-900 dark:text-white mb-4">Explore Medical Initiatives.</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-medium leading-relaxed">
                        Select a focus area to review initiatives with clear progress, verified oversight, and secure contribution flows.
                    </p>
                </div>
            </section>

            {/* Category Chips */}
            <div className="flex gap-2 px-6 py-7 overflow-x-auto no-scrollbar lg:px-8 xl:px-10 lg:justify-start">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedChip(cat)}
                        className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                            selectedChip === cat 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                            : 'bg-slate-50 dark:bg-gray-900 text-slate-400 border border-slate-100 dark:border-slate-800'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Results */}
            <section className="px-6 space-y-10 lg:px-8 xl:px-10">
                {/* Priority Section: Only if "All" is selected */}
                {selectedChip === "All" && urgentNeeds.length > 0 && (
                    <div className="rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-gray-900/30 p-5 lg:p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined text-primary text-sm font-black">bolt</span>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Near Completion</h3>
                        </div>
                        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible">
                            {urgentNeeds.map((campaign, index) => (
                                <Link
                                    key={campaign.id}
                                    href={`/campaign/${campaign.id}`}
                                    className="block shrink-0 w-64 lg:w-auto bg-white dark:bg-gray-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-4 transition-all active:scale-95 cursor-pointer lg:hover:-translate-y-1 lg:hover:shadow-lg"
                                >
                                    <div className="aspect-video rounded-2xl bg-center bg-cover mb-4" style={{ backgroundImage: `url(${campaign.image})` }} />
                                    {index === 0 && (
                                        <span className="inline-flex items-center text-[9px] font-black uppercase tracking-widest text-primary mb-2">
                                            Priority Initiative
                                        </span>
                                    )}
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white mb-2 truncate">{campaign.title}</h4>
                                    <div className="text-xs font-bold text-primary mb-1">
                                        ${formatNumber(campaign.raised)} committed
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${campaign.percentage}%` }} />
                                    </div>
                                    <div className="mt-2 text-[10px] font-semibold text-slate-500">
                                        ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))} needed to activate patient access
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main List */}
                <div>
                    <div className="flex items-center gap-2 mb-5">
                        <span className="material-symbols-outlined text-slate-400 text-sm font-black">list</span>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                            {selectedChip === "All" ? "Browse All" : `${selectedChip} Initiatives`}
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                        {filteredCampaigns.map(campaign => (
                            <Link
                                key={campaign.id}
                                href={`/campaign/${campaign.id}`}
                                className="group bg-white dark:bg-gray-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all cursor-pointer hover:border-primary/30 hover:-translate-y-1 hover:shadow-2xl"
                            >
                                <div className="aspect-[4/3] rounded-2xl bg-center bg-cover mb-4" style={{ backgroundImage: `url(${campaign.image})` }} />
                                <div className="space-y-3">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-primary">{campaign.category}</p>
                                    <h4 className="text-base font-black text-slate-900 dark:text-white line-clamp-2">{campaign.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2">{campaign.description}</p>
                                    <div className="text-[10px] font-semibold text-primary">
                                        ${formatNumber(campaign.raised)} committed
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 lg:h-2 bg-slate-100 dark:bg-gray-800 rounded-full">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-semibold text-slate-500">
                                        ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))} needed to deploy critical equipment
                                    </div>
                                    <div className="pt-2">
                                        <span className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest">
                                            Contribute
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Empty State */}
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
