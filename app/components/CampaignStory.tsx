
"use client";

import React from "react";

interface CampaignStoryProps {
    description: string;
}

const CampaignStory: React.FC<CampaignStoryProps> = ({ description }) => {
    return (
        <section className="px-6 py-8">
            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {description} 
                <br /><br />
                This campaign aims to cover the full costs of specialized recovery. Every donation brings us one step closer to the final goal.
            </p>
        </section>
    );
};

export default CampaignStory;
