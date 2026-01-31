
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

    const milestones: Milestone[] = useMemo(() => [
        {
            label: "Consultation",
            amount: "$5,000",
            description: "Initial expert surgical assessment and MRI scans.",
            status: 'achieved'
        },
        {
            label: "Robotics",
            amount: "$25,000",
            description: "Purchase of the custom lightweight exoskeleton kit.",
            status: 'achieved'
        },
        {
            label: "Therapy",
            amount: "$45,000",
            description: "3 months of intensive physical therapy (120 hours).",
            status: 'current',
            progress: campaign.percentage
        },
        {
            label: "Recovery",
            amount: `$${formatNumber(campaign.goal)}`,
            description: "Full mobility transition program and home modifications.",
            status: 'target'
        }
    ], [campaign]);

    return (
        <div className="pb-40 bg-white dark:bg-gray-950">
            {/* Nav */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
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

            <CampaignHero campaign={campaign} />
            
            <CampaignProgress campaign={campaign} />

            <CampaignTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content Rendering based on Active Tab */}
            {activeTab === 'story' && <CampaignStory description={campaign.description} />}
            {activeTab === 'impact' && <CampaignImpact milestones={milestones} />}
            {activeTab === 'wall' && <CampaignWall />}

            <CampaignDonateBar donateHref={`/donate?campaignId=${campaign.id}`} />
        </div>
    );
};

export default DetailScreen;
