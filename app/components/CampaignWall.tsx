
"use client";

import React from "react";

const CampaignWall: React.FC = () => {
    return (
        <section className="px-6 py-8">
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <p className="font-black text-sm mb-1">Anonymous Supporter</p>
                        <p className="text-xs text-slate-500 italic">"Stay strong! We are all rooting for you."</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CampaignWall;
