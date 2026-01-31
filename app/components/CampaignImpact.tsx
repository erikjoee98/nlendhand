
"use client";

import React from "react";
import { Milestone } from "../../types";

interface CampaignImpactProps {
    milestones: Milestone[];
}

const CampaignImpact: React.FC<CampaignImpactProps> = ({ milestones }) => {
    return (
        <section className="px-8 py-10">
            <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">show_chart</span>
                Impact Milestones
            </h3>
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
                {milestones.map((m, i) => (
                    <div key={i} className={`relative flex items-center justify-between gap-8 ${m.status === 'target' ? 'opacity-50' : ''}`}>
                        <div className={`absolute left-0 flex items-center justify-center size-10 rounded-full border-4 border-white dark:border-gray-950 ${m.status === 'achieved' ? 'bg-primary text-white' : m.status === 'current' ? 'bg-white dark:bg-gray-800 text-primary border-primary' : 'bg-slate-100 dark:bg-gray-800 text-slate-400'} shadow-lg`}>
                            {m.status === 'achieved' ? (
                                <span className="material-symbols-outlined text-sm font-black">check</span>
                            ) : m.status === 'current' ? (
                                <span className="text-[11px] font-black">{m.progress}%</span>
                            ) : (
                                <span className="material-symbols-outlined text-sm">lock</span>
                            )}
                        </div>
                        <div className="ml-14 flex-1">
                            <p className={`text-[10px] font-black uppercase tracking-widest ${m.status === 'achieved' ? 'text-success' : m.status === 'current' ? 'text-primary' : 'text-slate-400'}`}>
                                {m.status.toUpperCase()}
                            </p>
                            <h4 className="font-black text-xl">{m.amount} <span className="text-slate-400 font-medium italic text-sm">/ {m.label}</span></h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1">{m.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CampaignImpact;
