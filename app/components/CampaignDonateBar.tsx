
"use client";

import React from "react";
import Link from "next/link";

interface CampaignDonateBarProps {
    donateHref: string;
}

const CampaignDonateBar: React.FC<CampaignDonateBarProps> = ({ donateHref }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl border-t border-slate-100 dark:border-slate-800 z-50">
            <div className="max-w-md mx-auto flex items-center gap-4">
                <button className="flex flex-col items-center justify-center size-14 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all bg-white dark:bg-gray-900 shadow-sm active:scale-90">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="text-[9px] font-black uppercase mt-0.5">Support</span>
                </button>
                <Link
                    href={donateHref}
                    className="flex-1 h-14 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
                >
                    Donate Now
                    <span className="material-symbols-outlined font-black">arrow_forward</span>
                </Link>
            </div>
        </div>
    );
};

export default CampaignDonateBar;
