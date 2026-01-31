
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { MOCK_CAMPAIGNS } from "../../lib/mockData";
import { formatNumber } from "../../lib/format";

const ExploreScreen: React.FC = () => {
    const [selectedChip, setSelectedChip] = useState<string>("All");
    
    const categories = ["All", "Mobility", "Recovery", "Emergency"];
    
    const filteredCampaigns = useMemo(() => {
        if (selectedChip === "All") return MOCK_CAMPAIGNS;
        return MOCK_CAMPAIGNS.filter(c => c.category === selectedChip);
    }, [selectedChip]);

    const urgentNeeds = useMemo(() => 
        MOCK_CAMPAIGNS.filter(c => c.percentage >= 80 && c.percentage < 100),
    []);

    return (
        <div className="pb-32 bg-white dark:bg-gray-950 min-h-screen">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h1 className="text-2xl font-serif italic text-slate-900 dark:text-white">Discover Needs.</h1>
            </header>

            {/* Category Chips */}
            <div className="flex gap-2 px-6 py-6 overflow-x-auto no-scrollbar">
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
            <section className="px-6 space-y-8">
                {/* Priority Section: Only if "All" is selected */}
                {selectedChip === "All" && urgentNeeds.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-sm font-black">bolt</span>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Near Completion</h3>
                        </div>
                        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
                            {urgentNeeds.map(campaign => (
                                <Link
                                    key={campaign.id}
                                    href={`/campaign/${campaign.id}`}
                                    className="block shrink-0 w-64 bg-slate-50 dark:bg-gray-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-4 transition-transform active:scale-95 cursor-pointer"
                                >
                                    <div className="aspect-video rounded-2xl bg-center bg-cover mb-4" style={{ backgroundImage: `url(${campaign.image})` }} />
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white mb-2 truncate">{campaign.title}</h4>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] font-black text-primary">{campaign.percentage}%</span>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase">Goal: ${formatNumber(campaign.goal)}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${campaign.percentage}%` }} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main List */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-slate-400 text-sm font-black">list</span>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                            {selectedChip === "All" ? "Browse All" : `${selectedChip} Cases`}
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {filteredCampaigns.map(campaign => (
                            <Link
                                key={campaign.id}
                                href={`/campaign/${campaign.id}`}
                                className="group flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all cursor-pointer hover:border-primary/20"
                            >
                                <div className="size-20 rounded-2xl bg-center bg-cover shrink-0" style={{ backgroundImage: `url(${campaign.image})` }} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">{campaign.category}</p>
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white truncate mb-1">{campaign.title}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-slate-100 dark:bg-gray-800 rounded-full">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400">{campaign.percentage}%</span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary">chevron_right</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Empty State */}
            {filteredCampaigns.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">search_off</span>
                    <h3 className="font-black text-slate-900 dark:text-white">No campaigns found</h3>
                    <p className="text-sm text-slate-400 mt-1">Try selecting a different category or browsing all needs.</p>
                </div>
            )}
        </div>
    );
};

export default ExploreScreen;
