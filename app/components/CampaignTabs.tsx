
"use client";

import React from "react";

interface CampaignTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const CampaignTabs: React.FC<CampaignTabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="px-6 mt-8 sticky top-16 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md py-3">
            <div className="flex p-1 bg-slate-100/80 dark:bg-gray-800/90 rounded-2xl">
                <button 
                    onClick={() => setActiveTab('story')} 
                    className={`flex-1 py-2 text-sm font-black rounded-xl transition-all ${activeTab === 'story' ? 'bg-white dark:bg-gray-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
                >
                    Story
                </button>
                <button 
                    onClick={() => setActiveTab('impact')} 
                    className={`flex-1 py-2 text-sm font-black rounded-xl transition-all ${activeTab === 'impact' ? 'bg-white dark:bg-gray-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
                >
                    Impact
                </button>
                <button 
                    onClick={() => setActiveTab('wall')} 
                    className={`flex-1 py-2 text-sm font-black rounded-xl transition-all ${activeTab === 'wall' ? 'bg-white dark:bg-gray-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
                >
                    Wall
                </button>
            </div>
        </div>
    );
};

export default CampaignTabs;
