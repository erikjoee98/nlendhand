
"use client";

import React from "react";
import { Campaign } from "../../types";
import { formatNumber } from "../../lib/format";

interface CampaignProgressProps {
    campaign: Campaign;
}

const CampaignProgress: React.FC<CampaignProgressProps> = ({ campaign }) => {
    return (
        <section className="px-6 mt-10">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <span className="text-4xl font-black tracking-tighter text-primary">${formatNumber(campaign.raised)}</span>
                    <span className="text-sm font-bold text-slate-400 ml-1 italic">raised of ${formatNumber(campaign.goal)}</span>
                </div>
                <span className="text-xs font-black bg-primary/5 text-primary px-3 py-1.5 rounded-full ring-1 ring-primary/10">{campaign.percentage}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-primary rounded-full shadow-lg shadow-primary/20" style={{ width: `${campaign.percentage}%` }}></div>
            </div>
            <div className="flex justify-around items-center py-6 border-y border-slate-50 dark:border-slate-800">
                <div className="text-center">
                    <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{(campaign.raised / 50).toFixed(0)}</p>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Supporters</p>
                </div>
                <div className="w-[1px] h-8 bg-slate-100 dark:bg-slate-800"></div>
                <div className="text-center">
                    <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{Math.floor(Math.random() * 20) + 1}</p>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Days Left</p>
                </div>
            </div>
        </section>
    );
};

export default CampaignProgress;
