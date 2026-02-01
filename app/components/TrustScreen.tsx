
import React from 'react';

const TrustScreen: React.FC = () => {
    return (
        <div className="pb-32">
            <header className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl px-4 py-3 justify-between border-b border-slate-100 dark:border-slate-800 lg:hidden">
                <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-slate-400 text-lg">lock</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Portal</span>
                </div>
                <h2 className="text-sm font-black absolute left-1/2 -translate-x-1/2">Trust Center</h2>
                <button className="material-symbols-outlined text-slate-900 dark:text-white">close</button>
            </header>

            <main>
                <section className="px-6 py-10 border-b border-slate-100 dark:border-slate-800 lg:px-8 xl:px-10 lg:py-14">
                    <h1 className="font-serif text-5xl mb-6 leading-[1.1] italic text-slate-900 dark:text-white">Radical Accountability.</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                        Our commitment to supporters is anchored in transparent allocation. Explore how contributions advance long-term impact.
                    </p>
                </section>

                <section className="py-12 px-6 lg:px-8 xl:px-10">
                    <div className="flex items-center gap-2 mb-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Operational Flow</span>
                        <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
                    </div>
                    <h3 className="text-2xl font-black mb-10">Lifecycle of Your Contribution</h3>
                    <div className="space-y-12 relative">
                        <div className="absolute left-4 top-2 bottom-2 w-[1px] bg-slate-100 dark:bg-slate-800"></div>
                        
                        <div className="relative pl-12">
                            <div className="absolute left-0 top-0 size-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-black ring-4 ring-white dark:ring-gray-950 shadow-lg shadow-primary/20">01</div>
                            <h4 className="font-black text-sm mb-2 uppercase tracking-tight">Direct Contribution</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Funds are received via secure, encrypted processing and recorded for allocation tracking.</p>
                        </div>

                        <div className="relative pl-12">
                            <div className="absolute left-0 top-0 size-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-black ring-4 ring-white dark:ring-gray-950 shadow-lg shadow-primary/20">02</div>
                            <h4 className="font-black text-sm mb-2 uppercase tracking-tight">Vetting & Verification</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Programs are reviewed against clinical needs and operational readiness before allocation.</p>
                        </div>

                        <div className="relative pl-12">
                            <div className="absolute left-0 top-0 size-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-black ring-4 ring-white dark:ring-gray-950 shadow-lg shadow-primary/20">03</div>
                            <h4 className="font-black text-sm mb-2 uppercase tracking-tight">Direct Disbursement</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Allocations are executed through vetted partners and tracked for accountability.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 dark:bg-gray-900 py-12 px-6 lg:px-8 xl:px-10">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Platform Standards</span>
                            <h3 className="text-3xl font-black">Trust Signals</h3>
                        </div>
                        <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Secure Payments</p>
                            <p className="text-sm font-black tracking-tight text-slate-900 dark:text-white">Processed via Stripe</p>
                            <div className="mt-4 flex items-center gap-1 text-[10px] text-success font-black">
                                <span className="material-symbols-outlined text-xs">verified</span> Verified provider
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Allocation Model</p>
                            <p className="text-sm font-black tracking-tight text-slate-900 dark:text-white">Transparent oversight</p>
                            <div className="mt-4 flex items-center gap-1 text-[10px] text-primary font-black">
                                <span className="material-symbols-outlined text-xs">fact_check</span> Clear reporting
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-black text-sm uppercase tracking-tight">Allocation Principles</h4>
                            <button className="text-[10px] font-black text-primary uppercase border border-primary/20 px-2 py-1 rounded">View Policy</button>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            Contributions support medical initiatives and platform sustainability. Allocation decisions are managed by the operator with verified partner oversight.
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <h3 className="px-6 text-2xl font-black mb-8">Program Updates</h3>
                    <div className="flex overflow-x-auto gap-6 px-6 no-scrollbar pb-4">
                        {[
                            {
                                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCON3XrxHX8dTRrOKvYijKCGk_TvGKb9RctNBL8XDguS1slpSZJBBdFP56NJpFO_rul_JceGkyawS_07qNpbIwSjHyu0DaDedgJATSCTqGG9jZm4UJvhhFWJ-zgTeO3C1cCLvL_VFHMMzc7RqY2O5hjSwkut-WQfarfzeWFWQITKNcVrvwnL2Z7-tb1pBmOa1iogKKIaiwXaqVKgyQyZ_kEn81jjVMtioYafxe4_XE6rURSY-yDz76DpyO1BI4a7dZrW0ticQuHVbs",
                                title: "Mobility Initiative Update",
                                quote: "Expanded access to next-generation mobility equipment in partner clinics."
                            },
                            {
                                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYfGq-w28cZ7cToX5xptnZP1urj_QTSP6Tetn2ZiVaVqHtxDiL-v949eLxUepqj61dJtLY75lYLrb6ntsgX5y8rnQlYGp6Y5QnCmsT2sz4_qbK-JPGJoD7vLPzU8tpcJNJesMS09ax8HCFsEFYPjRVG7vXJ9CZxsi7Lt3pUnHL8ZxpvJ5Wr03tHpdOmyeblGjqOQ_O9vlLC0KMKfgqMF0aAomw826ai2PLmJPACwwIZfvuxJPRfcQenItAD_E1TnfdF-7lBvmKLo0",
                                title: "Rehab Access Program",
                                quote: "Additional recovery resources allocated to reduce wait times."
                            }
                        ].map((voice, idx) => (
                            <div key={idx} className="shrink-0 w-72 transition-transform active:scale-95">
                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200 shadow-md">
                                    <img src={voice.img} alt={voice.title} className="w-full h-full object-cover grayscale-[20%]" />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <div className="size-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white ring-1 ring-white/50">
                                            <span className="material-symbols-outlined text-3xl fill-1">play_arrow</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-black text-base">{voice.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 italic font-medium">"{voice.quote}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                <section className="mt-8 px-6 pb-20">
                    <div className="bg-slate-900 text-white p-8 rounded-[2rem] relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="material-symbols-outlined text-8xl">account_balance</span>
                        </div>
                        <h3 className="text-2xl font-serif italic mb-4">Board Governance</h3>
                        <p className="text-sm text-slate-300 leading-relaxed mb-8 font-medium">
                            Our board of directors meets quarterly to review ethics compliance and strategic fund allocation.
                        </p>
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <img key={i} alt="Director" className="size-12 rounded-full border-4 border-slate-900 object-cover" src={`https://picsum.photos/seed/${i+10}/100/100`} />
                            ))}
                            <div className="size-12 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black">+5</div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TrustScreen;
