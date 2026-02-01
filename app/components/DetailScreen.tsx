
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Milestone, Campaign } from "../../types";
import { formatNumber } from "../../lib/format";
import CampaignHero from "./CampaignHero";
import CampaignProgress from "./CampaignProgress";
import CampaignTabs from "./CampaignTabs";
import CampaignStory from "./CampaignStory";
import CampaignImpact from "./CampaignImpact";
import CampaignWall from "./CampaignWall";
import CampaignDonateBar from "./CampaignDonateBar";

interface DetailScreenProps {
    campaign: Campaign;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ campaign }) => {
    const [activeTab, setActiveTab] = useState("story");

    const milestones: Milestone[] = useMemo(() => {
        const thresholds = [20, 45, 70, 100];
        const currentIndex = thresholds.findIndex((t) => campaign.percentage < t);

        const items = [
            {
                label: "Assessment",
                amount: Math.round(campaign.goal * 0.2),
                description: "Program planning, clinical evaluation, and resource coordination.",
            },
            {
                label: "Equipment",
                amount: Math.round(campaign.goal * 0.45),
                description: "Procurement and deployment of essential mobility equipment.",
            },
            {
                label: "Rehabilitation",
                amount: Math.round(campaign.goal * 0.7),
                description: "Expanded access to recovery and therapy services.",
            },
            {
                label: "Completion",
                amount: Math.round(campaign.goal),
                description: "Sustained support and long-term program delivery.",
            },
        ];

        return items.map((item, index) => {
            let status: Milestone["status"] = "target";
            if (currentIndex === -1 || index < currentIndex) status = "achieved";
            if (index === currentIndex) status = "current";

            return {
                label: item.label,
                amount: `$${formatNumber(item.amount)}`,
                description: item.description,
                status,
                progress: status === "current" ? campaign.percentage : undefined,
            };
        });
    }, [campaign.goal, campaign.percentage]);

    return (
        <div className="pb-40 bg-white dark:bg-gray-950">
            {/* Nav */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 lg:hidden">
                <div className="flex items-center justify-between p-4 h-16">
                    <Link
                        href="/"
                        className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                    </Link>
                    <div className="flex flex-col items-center">
                        <h2 className="text-sm font-black leading-tight truncate max-w-[150px]">{campaign.title}</h2>
                        {campaign.verified && (
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px] text-success fill-1">verified</span>
                                <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">Verified</span>
                            </div>
                        )}
                    </div>
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <span className="material-symbols-outlined text-2xl">share</span>
                    </button>
                </div>
            </nav>

            <div className="lg:px-8 xl:px-10">
                <CampaignHero campaign={campaign} />

                <div className="lg:grid lg:grid-cols-[1.6fr_1fr] lg:gap-10 lg:items-start">
                    <div>
                        <CampaignProgress campaign={campaign} />

                        <CampaignTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                        {/* Content Rendering based on Active Tab */}
                        {activeTab === 'story' && <CampaignStory description={campaign.description} />}
                        {activeTab === 'impact' && <CampaignImpact milestones={milestones} />}
                        {activeTab === 'wall' && <CampaignWall />}
                    </div>

                    <aside className="hidden lg:block sticky top-28">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg space-y-5">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Contribution Summary</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white mt-2">${formatNumber(campaign.raised)} initial capital committed</p>
                                <p className="text-xs text-slate-400 font-medium">Program goal ${formatNumber(campaign.goal)} • {campaign.percentage}% progress</p>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }}></div>
                            </div>
                            <div className="text-xs font-semibold text-slate-500">
                                ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))} to unlock full program deployment
                            </div>
                            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">lock</span>
                                    Secure contribution processed via Stripe
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">verified</span>
                                    Verified initiative oversight
                                </div>
                            </div>
                            <Link
                                href={`/donate?campaignId=${campaign.id}`}
                                className="w-full h-12 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest flex items-center justify-center"
                            >
                                Contribute Now
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="lg:hidden">
                <CampaignDonateBar donateHref={`/donate?campaignId=${campaign.id}`} />
            </div>
        </div>
    );
};

export default DetailScreen;
