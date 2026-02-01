
"use client";

import React from "react";
import Link from "next/link";
import type { SuccessStory } from "../../types";
import ProofOfProgress from "./ProofOfProgress";

interface ImpactScreenProps {
    stories: SuccessStory[];
}

const ImpactScreen: React.FC<ImpactScreenProps> = ({ stories }) => {
    return (
        <div className="pb-32 bg-white dark:bg-gray-950">
            {/* Header - Reusing Trust/Home pattern */}
            <header className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl px-4 py-3 justify-between border-b border-slate-100 dark:border-slate-800 lg:hidden">
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
                <section className="px-6 py-10 border-b border-slate-100 dark:border-slate-800 lg:px-8 xl:px-10 lg:py-12">
                    <h1 className="font-serif text-5xl mb-6 leading-[1.1] italic text-slate-900 dark:text-white">Proof of Progress.</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                        A consolidated view of active programs, verified contributions, and operational deployment.
                    </p>
                </section>

                <div className="px-6 lg:px-8 xl:px-10 pt-6">
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-gray-900/40 rounded-2xl px-4 py-2.5">
                        <span className="inline-flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-slate-500">lock</span>
                            Secure payment infrastructure
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-slate-500">fact_check</span>
                            Transparent allocation model
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-slate-500">verified</span>
                            Independently operated
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-slate-500">health_and_safety</span>
                            Long-term medical focus
                        </span>
                    </div>
                </div>

                <div className="px-6 lg:px-8 xl:px-10 pt-6">
                    <p className="text-xl lg:text-2xl font-semibold text-slate-900 dark:text-white">
                        Foundational capital secured. Deployment underway.
                    </p>
                </div>

                <div className="px-6 lg:px-8 xl:px-10 mt-6">
                    <ProofOfProgress />
                </div>

                {/* Early Platform Progress */}
                <section className="px-8 py-8 bg-slate-50/50 dark:bg-gray-900/30 lg:px-8 xl:px-10 mt-6">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Early Platform Progress</span>
                        <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="bg-white/70 dark:bg-gray-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Platform Launch Phase</p>
                            <h4 className="font-black text-lg text-slate-900 dark:text-white mb-2">Initial program onboarding</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                Initial medical initiatives are being onboarded to support responsible program activation.
                            </p>
                        </div>
                        <div className="bg-white/70 dark:bg-gray-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Secure Payment Infrastructure</p>
                            <h4 className="font-black text-lg text-slate-900 dark:text-white mb-2">Encrypted transaction flows</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                Contributions are processed through trusted providers with encrypted transaction flows.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Transparency - Reusing Trust Progress bar pattern */}
                <section className="py-10 px-6 lg:px-8 xl:px-10">
                    <h3 className="text-2xl font-black mb-6">Allocation Overview</h3>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-black uppercase text-slate-500">Capital Allocation</span>
                            <span className="text-sm font-black text-primary">Initiatives & Operations</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-4 leading-relaxed font-medium italic text-center">
                            Capital supports both medical initiatives and the infrastructure required to operate the platform securely and responsibly.
                        </p>
                    </div>
                </section>

                {/* Stories - Reusing Trust Voices pattern */}
                <section className="py-6">
                    <div className="flex items-center justify-between px-6 mb-8 lg:px-8 xl:px-10">
                        <h3 className="text-2xl font-black">Success Stories</h3>
                        <button className="text-primary text-sm font-bold">Read All</button>
                    </div>
                    <div className="flex overflow-x-auto gap-6 px-6 no-scrollbar pb-8 lg:px-8 xl:px-10">
                        {stories
                            .filter((story) => story.img)
                            .slice(0, 2)
                            .map((story, idx) => (
                            <Link
                                key={idx} 
                                href={`/impact/story/${story.id}`}
                                className="block shrink-0 w-64 group active:scale-95 transition-all cursor-pointer"
                            >
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative shadow-lg">
                                {story.img ? (
                                    <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-200 dark:bg-gray-800" />
                                )}
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
                <section className="px-6 mt-6 pb-12 lg:px-8 xl:px-10">
                    <div className="bg-slate-50 dark:bg-gray-900/40 text-slate-900 dark:text-slate-100 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                        <h3 className="text-xl font-serif italic mb-2">Support Medical Progress.</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5 font-medium">
                            Participate in long-term program delivery with clear operational oversight.
                        </p>
                        <Link
                            href="/donate"
                            className="w-full h-12 bg-primary text-white rounded-2xl font-black text-base transition-transform active:scale-[0.98] flex items-center justify-center"
                        >
                            Advance Critical Care Access
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ImpactScreen;
