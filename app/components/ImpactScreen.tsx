
"use client";

import React from "react";
import Link from "next/link";
import { MOCK_SUCCESS_STORIES } from "../../lib/mockData";

const ImpactScreen: React.FC = () => {
    return (
        <div className="pb-32 bg-white dark:bg-gray-950">
            {/* Header - Reusing Trust/Home pattern */}
            <header className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl px-4 py-3 justify-between border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="text-primary flex size-8 items-center justify-center bg-primary/10 rounded-lg">
                        <span className="material-symbols-outlined text-lg fill-1">monitoring</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Impact Reports</span>
                </div>
                <h2 className="text-sm font-black absolute left-1/2 -translate-x-1/2">Your Impact</h2>
                <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span className="material-symbols-outlined">share</span>
                </button>
            </header>

            <main>
                {/* Hero Title - Reusing Trust Pattern */}
                <section className="px-6 py-10 border-b border-slate-100 dark:border-slate-800">
                    <h1 className="font-serif text-5xl mb-6 leading-[1.1] italic text-slate-900 dark:text-white">Proof of Progress.</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                        Beyond the numbers, these are the lives reclaimed through your collective generosity.
                    </p>
                </section>

                {/* Global Stats - Reusing Home/Trust Card patterns */}
                <section className="py-8 px-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Patients Supported</p>
                            <p className="text-2xl font-black tracking-tighter text-primary">12,482</p>
                            <div className="mt-4 flex items-center gap-1 text-[10px] text-success font-black">
                                <span className="material-symbols-outlined text-xs">check_circle</span> 100% Verified
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Rehab Completion</p>
                            <p className="text-2xl font-black tracking-tighter text-primary">94.8%</p>
                            <div className="mt-4 flex items-center gap-1 text-[10px] text-primary font-black">
                                <span className="material-symbols-outlined text-xs">star</span> High Success
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Roadmap - Reusing Detail Milestones pattern */}
                <section className="px-8 py-10 bg-slate-50/50 dark:bg-gray-900/30">
                    <div className="flex items-center gap-2 mb-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Community Achievements</span>
                        <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
                    </div>
                    
                    <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
                        {[
                            {
                                label: "New York Hub",
                                date: "October 2024",
                                title: "1,000 Exoskeletons Delivered",
                                description: "A major milestone providing mobility to spinal injury veterans across the East Coast.",
                                status: 'achieved'
                            },
                            {
                                label: "National Expansion",
                                date: "Current Goal",
                                title: "Opening 5 New Rehab Centers",
                                description: "Expanding our network to rural areas to reduce travel time for critical therapy.",
                                status: 'current',
                                progress: 68
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative flex items-center justify-between gap-8">
                                <div className={`absolute left-0 flex items-center justify-center size-10 rounded-full border-4 border-white dark:border-gray-950 ${item.status === 'achieved' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-primary border-primary'} shadow-lg`}>
                                    {item.status === 'achieved' ? (
                                        <span className="material-symbols-outlined text-sm font-black">celebration</span>
                                    ) : (
                                        <span className="text-[11px] font-black">{item.progress}%</span>
                                    )}
                                </div>
                                <div className="ml-14 flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label} • {item.date}</p>
                                    <h4 className="font-black text-xl text-slate-900 dark:text-white">{item.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Transparency - Reusing Trust Progress bar pattern */}
                <section className="py-12 px-6">
                    <h3 className="text-2xl font-black mb-6">Efficiency of Care</h3>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-black uppercase text-slate-500">Fund Utilization</span>
                            <span className="text-sm font-black text-primary">95% Direct Relief</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: '95%' }}></div>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-4 leading-relaxed font-medium italic text-center">
                            Only 5% of your donation is used for essential administrative security and ledger maintenance.
                        </p>
                    </div>
                </section>

                {/* Stories - Reusing Trust Voices pattern */}
                <section className="py-8">
                    <div className="flex items-center justify-between px-6 mb-8">
                        <h3 className="text-2xl font-black">Success Stories</h3>
                        <button className="text-primary text-sm font-bold">Read All</button>
                    </div>
                    <div className="flex overflow-x-auto gap-6 px-6 no-scrollbar pb-8">
                        {MOCK_SUCCESS_STORIES.map((story, idx) => (
                            <Link
                                key={idx} 
                                href={`/impact/story/${story.id}`}
                                className="block shrink-0 w-64 group active:scale-95 transition-all cursor-pointer"
                            >
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative shadow-lg">
                                    <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <p className="font-black text-lg">{story.name}</p>
                                        <p className="text-xs text-white/80 font-medium">{story.detail}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Final CTA - Reusing Home patterns */}
                <section className="px-6 mt-8 pb-20">
                    <div className="bg-primary text-white p-8 rounded-[2rem] relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="material-symbols-outlined text-8xl">volunteer_activism</span>
                        </div>
                        <h3 className="text-2xl font-serif italic mb-2">Be the catalyst.</h3>
                        <p className="text-sm text-white/80 leading-relaxed mb-8 font-medium">
                            Join over 50,000 monthly supporters dedicated to healing and mobility.
                        </p>
                        <Link
                            href="/donate"
                            className="w-full h-14 bg-white text-primary rounded-2xl font-black text-lg shadow-xl transition-transform active:scale-[0.98] flex items-center justify-center"
                        >
                            Multiply Your Impact
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ImpactScreen;
