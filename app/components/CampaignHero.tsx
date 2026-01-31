
"use client";

import React from "react";
import { Campaign } from "../../types";

interface CampaignHeroProps {
    campaign: Campaign;
}

const CampaignHero: React.FC<CampaignHeroProps> = ({ campaign }) => {
    return (
        <>
            <div className="relative w-full aspect-[4/3] bg-center bg-no-repeat bg-cover overflow-hidden" style={{ backgroundImage: `url("${campaign.image}")` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-14 rounded-full border-2 border-white shadow-2xl bg-cover bg-center" style={{ backgroundImage: `url("https://picsum.photos/seed/${campaign.id}/100/100")` }}></div>
                        <div className="text-white">
                            <p className="font-black text-lg leading-tight">{campaign.author || "Recipient"}</p>
                            <p className="text-[10px] uppercase tracking-wider font-bold opacity-80">{campaign.category} • Location Verified</p>
                        </div>
                    </div>
                    {campaign.verified && (
                        <div className="bg-white/20 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-white text-[14px] fill-1">verified</span>
                            <span className="text-white text-[9px] font-black uppercase tracking-widest">Identity Verified</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-5 -mt-6 relative z-10">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                    <div className="flex items-start gap-4">
                        <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-primary text-3xl">medical_services</span>
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 dark:text-white mb-1">Verified Medical Need</h4>
                            <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                                Recipient identity and clinical requirements have been validated by <strong>Accredited Partners</strong>.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 bg-success/5 text-success text-[9px] font-black rounded-lg border border-success/10 uppercase tracking-widest">ID Verified</span>
                                <span className="px-2.5 py-1 bg-primary/5 text-primary text-[9px] font-black rounded-lg border border-primary/10 uppercase tracking-widest">Funds Managed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CampaignHero;
