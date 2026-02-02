
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
            <div className="rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-slate-800 shadow-sm p-5 lg:rounded-none lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0">
                <div className="flex justify-between items-end mb-3">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-1">Capital Committed</p>
                        <span className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 dark:text-white">${formatNumber(campaign.raised)}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">{campaign.percentage}% progress</span>
                </div>
                <div className="w-full h-1.5 lg:h-2 bg-slate-100 dark:bg-gray-800 rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }}></div>
                </div>
                <div className="text-xs font-medium text-slate-500 mb-5">
                    ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))} capital remaining for full deployment
                </div>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50/90 dark:bg-gray-900/70 border border-slate-100 dark:border-slate-800 px-4 py-4 lg:bg-transparent lg:border-0 lg:px-0 lg:py-6">
                <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="text-left">
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            {formatNumber(campaign.patientsSupported ?? 0)}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.16em] font-black text-slate-400 mt-1">Contributions</p>
                    </div>
                    <div className="text-left">
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.16em] font-black text-slate-400 mt-1">Deployment Gap</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CampaignProgress;
