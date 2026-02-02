
"use client";

import React from "react";
import Link from "next/link";

interface CampaignDonateBarProps {
    donateHref: string;
}

const CampaignDonateBar: React.FC<CampaignDonateBarProps> = ({ donateHref }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl border-t border-slate-200/90 dark:border-slate-800/90 z-50">
            <div className="max-w-md mx-auto">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-2 px-1">Secure Contribution</p>
                <Link
                    href={donateHref}
                    className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-base shadow-md shadow-slate-900/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
                >
                    Contribute Now
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
                <p className="mt-2 text-[10px] text-slate-500 text-center">Processed securely via Stripe</p>
            </div>
        </div>
    );
};

export default CampaignDonateBar;
