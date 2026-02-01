
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
                    <span className="text-sm font-bold text-slate-400 ml-1 italic">initial capital committed</span>
                </div>
                <span className="text-xs font-black bg-primary/5 text-primary px-3 py-1.5 rounded-full ring-1 ring-primary/10">{campaign.percentage}% progress</span>
            </div>
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-primary rounded-full shadow-lg shadow-primary/20" style={{ width: `${campaign.percentage}%` }}></div>
            </div>
            <div className="text-xs font-semibold text-slate-500 mb-6">
                ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))} to unlock full program deployment
            </div>
            <div className="flex justify-around items-center py-6 border-y border-slate-50 dark:border-slate-800">
                <div className="text-center">
                    <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                        {formatNumber(campaign.patientsSupported ?? 0)}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Contributions</p>
                </div>
                <div className="w-[1px] h-8 bg-slate-100 dark:bg-slate-800"></div>
                <div className="text-center">
                    <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                        ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Deployment Gap</p>
                </div>
            </div>
        </section>
    );
};

export default CampaignProgress;
