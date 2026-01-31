
"use client";

import React from "react";
import Link from "next/link";
import { MOCK_SUCCESS_STORIES } from "../../lib/mockData";

interface SuccessStoryDetailScreenProps {
    storyId: string | null;
}

const SuccessStoryDetailScreen: React.FC<SuccessStoryDetailScreenProps> = ({ storyId }) => {
    const story = MOCK_SUCCESS_STORIES.find(s => s.id === storyId) || MOCK_SUCCESS_STORIES[0];

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen pb-40">
            {/* Header */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between p-4 h-16">
                    <Link
                        href="/impact"
                        className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                    </Link>
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Success Story</h2>
                    <div className="size-10"></div> {/* Spacer */}
                </div>
            </nav>

            {/* Hero Image */}
            <div className="w-full aspect-square relative bg-slate-100">
                <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-transparent to-transparent"></div>
            </div>

            {/* Story Content */}
            <main className="px-6 -mt-12 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-success fill-1">verified</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-success">Outcome Achieved</span>
                </div>
                
                <h1 className="text-4xl font-serif italic text-slate-900 dark:text-white mb-6 leading-[1.1]">
                    {story.name}
                </h1>

                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-10">
                        {story.fullStory}
                    </p>
                </div>

                {/* Before vs After Impact Grid */}
                <section className="mb-12">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Impact Highlights</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {story.highlights.map((h, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-gray-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">{h.label}</p>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Before</p>
                                        <p className="text-sm font-black text-slate-600 dark:text-slate-400">{h.before}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-success">arrow_forward</span>
                                    <div className="flex-1 text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">After</p>
                                        <p className="text-sm font-black text-success">{h.after}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10 text-center">
                    <span className="material-symbols-outlined text-primary text-5xl mb-4">volunteer_activism</span>
                    <h4 className="text-2xl font-serif italic text-slate-900 dark:text-white mb-2">This was possible because of you.</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">
                        Your small acts of kindness create life-changing milestones. 
                    </p>
                </div>
            </main>

            {/* Fixed CTA Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl border-t border-slate-100 dark:border-slate-800 z-50">
                <div className="max-w-md mx-auto">
                    <Link
                        href="/explore"
                        className="w-full h-14 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 transition-transform active:scale-[0.98] flex items-center justify-center"
                    >
                        Support another life
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessStoryDetailScreen;
