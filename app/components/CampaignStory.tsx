
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
                This initiative supports specialized medical equipment and recovery resources. Every contribution advances the program toward its goal.
            </p>
        </section>
    );
};

export default CampaignStory;
