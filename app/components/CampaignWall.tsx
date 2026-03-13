
"use client";

import React from "react";

const CampaignWall: React.FC = () => {
    const entries = [
        {
            name: "R. Chen",
            message: "Thinking of you and cheering every step forward.",
        },
        {
            name: "Luna Health",
            message: "Grateful to support this work and the people it helps.",
        },
        {
            name: "Maya K.",
            message: "Wishing you strength, peace, and steady progress.",
        },
    ];

    return (
        <section className="px-6 py-8">
            <div className="space-y-4">
                {entries.map((entry) => (
                    <div
                        key={entry.name}
                        className="p-4 bg-slate-50 dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-slate-800"
                    >
                        <p className="font-black text-sm mb-1">{entry.name}</p>
                        <p className="text-xs text-slate-500 italic">"{entry.message}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CampaignWall;
