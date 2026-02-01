
"use client";

import React from "react";
import Link from "next/link";
import { formatNumber } from "../../lib/format";
import { useDonateSelector } from "./AppShell";
import type { Campaign } from "../../types";

interface HomeScreenProps {
  campaigns: Campaign[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ campaigns }) => {
  const { openDonateSelector } = useDonateSelector();

  if (campaigns.length === 0) {
    return null;
  }

  const heroFeatured = campaigns.find((c) => c.id === "1") || campaigns[0];

  const urgentNeeds = campaigns
    .filter(
      (c) =>
        c.id !== heroFeatured.id && c.percentage >= 70 && c.percentage < 100
    )
    .sort(
      (a, b) =>
        Math.max(a.goal - a.raised, 0) - Math.max(b.goal - b.raised, 0)
    )
    .slice(0, 3);

  return (
    <div className="pb-32 bg-white dark:bg-gray-950">
            {/* 1. TOP SECTION (ENTRY) */}
            <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-6 py-4 justify-between border-b border-gray-100 dark:border-gray-800 lg:hidden">
                <div className="flex items-center gap-2">
                    <div className="text-primary flex size-8 items-center justify-center bg-primary/10 rounded-lg">
                        <span className="material-symbols-outlined text-lg">volunteer_activism</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-base font-black tracking-tight">Lumira</h2>
                </div>
            </header>

            {/* Hero */}
            <section className="px-6 pt-8 pb-8 lg:pt-12 lg:pb-12 lg:px-8 xl:px-10">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center min-h-[70vh] lg:min-h-[65vh]">
                    <div className="space-y-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                            Secure Medical Initiatives
                        </span>
                        <h1 className="text-slate-900 dark:text-white text-4xl lg:text-6xl font-serif italic leading-tight">
                            Premium, transparent contributions for modern medical impact.
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base lg:text-lg font-medium leading-relaxed max-w-xl">
                            Fund essential equipment, rehabilitation access, and breakthrough mobility programs with a platform built for trust, clarity, and long-term outcomes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={openDonateSelector}
                                className="h-14 px-8 rounded-2xl bg-slate-900 text-white font-black text-base shadow-xl shadow-slate-900/25 transition-transform active:scale-95 lg:h-16 lg:text-lg lg:px-10"
                            >
                                Contribute Now
                            </button>
                            <Link
                                href="/explore"
                                className="h-14 px-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-black text-base flex items-center justify-center hover:border-slate-400 transition-colors lg:h-16 lg:text-lg"
                            >
                                Explore Initiatives
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-md border border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-900">
                            <div className="relative h-64 sm:h-72 lg:h-[280px] bg-center bg-cover">
                                <div
                                    className="absolute inset-0 bg-center bg-cover"
                                    style={{ backgroundImage: `url("${heroFeatured.image}")` }}
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Featured Initiative</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full">Priority</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">{heroFeatured.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2">{heroFeatured.description}</p>
                                <div className="text-lg font-black text-primary">
                                    ${formatNumber(heroFeatured.raised)}{" "}
                                    <span className="text-xs font-bold text-slate-400 italic">committed</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: `${heroFeatured.percentage}%` }}></div>
                                </div>
                                <div className="text-xs font-semibold text-slate-500">
                                    ${formatNumber(Math.max(heroFeatured.goal - heroFeatured.raised, 0))} remaining to activate the program
                                </div>
                                <div className="text-[11px] font-medium text-slate-400">
                                    Foundational support already in place — your contribution helps expand access.
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/campaign/${heroFeatured.id}`}
                                        className="inline-flex items-center justify-center h-11 px-4 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest"
                                    >
                                        View Initiative
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 lg:px-8 xl:px-10 pb-8 lg:pb-12 mt-3 lg:mt-4">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 bg-slate-50 dark:bg-gray-900/40 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-600 shadow-md">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-success text-[18px] shrink-0">lock</span>
                        Secure payments via Stripe
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">fact_check</span>
                        Transparent allocation model
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">verified</span>
                        Privately operated initiative
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">public</span>
                        Program-first capital
                    </div>
                </div>
            </section>

            {/* 2. ACTIVE INITIATIVES */}
            <section className="px-6 py-6 lg:px-8 xl:px-10 lg:py-10">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-slate-900 dark:text-white text-lg font-black tracking-tight">Active Medical Initiatives</h3>
                    <Link href="/explore" className="text-primary text-[11px] font-black uppercase tracking-widest hover:underline">View all</Link>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {campaigns
                        .filter((c) => c.id !== heroFeatured.id && c.percentage < 100)
                        .slice(0, 3)
                        .map((campaign) => (
                            <Link
                                key={campaign.id}
                                href={`/campaign/${campaign.id}`}
                                className="group flex flex-col rounded-[1.75rem] overflow-hidden bg-white dark:bg-gray-900 border border-slate-100 dark:border-slate-800 shadow-md transition-all active:scale-[0.99] lg:hover:-translate-y-1 lg:hover:shadow-xl"
                            >
                                <div
                                    className="w-full h-44 bg-center bg-cover"
                                    style={{ backgroundImage: `url("${campaign.image}")` }}
                                />
                                <div className="p-5 space-y-3">
                                    <h4 className="text-base font-black text-slate-900 dark:text-white line-clamp-1">{campaign.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">{campaign.description}</p>
                                    <div className="text-xs font-bold text-primary">
                                        ${formatNumber(campaign.raised)} committed
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }}></div>
                                    </div>
                                    <div className="text-xs font-semibold text-slate-500">
                                        ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))} remaining to fully launch
                                    </div>
                                    <span className="inline-flex items-center text-[11px] font-black uppercase tracking-widest text-primary">
                                        Contribute
                                    </span>
                                </div>
                            </Link>
                        ))}
                </div>
            </section>

            {/* 3. URGENT CAPITAL NEEDS */}
            {urgentNeeds.length > 0 && (
                <section className="px-6 py-10 lg:px-8 xl:px-10 lg:py-12">
                    <div className="rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-gray-900/30 p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-slate-900 dark:text-white text-lg font-black tracking-tight">Urgent Capital Needs</h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-6">
                            Critical initiatives that are close to their program targets.
                        </p>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {urgentNeeds.map((campaign) => (
                                <Link
                                    key={campaign.id}
                                    href={`/campaign/${campaign.id}`}
                                    className="group flex flex-col rounded-[1.75rem] overflow-hidden bg-white dark:bg-gray-900 border border-slate-100 dark:border-slate-800 shadow-md transition-all active:scale-[0.99] lg:hover:-translate-y-1 lg:hover:shadow-lg"
                                >
                                    <div
                                        className="w-full h-44 bg-center bg-cover"
                                        style={{ backgroundImage: `url(${campaign.image})` }}
                                    />
                                    <div className="p-5 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Closing Capital Gap</span>
                                        </div>
                                        <h4 className="text-base font-black text-slate-900 dark:text-white line-clamp-1">{campaign.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">{campaign.description}</p>
                                        <div className="text-xs font-bold text-primary">
                                            ${formatNumber(campaign.raised)} committed
                                        </div>
                                        <div className="h-3 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${campaign.percentage}%` }}></div>
                                        </div>
                                        <div className="text-xs font-semibold text-slate-500">
                                            ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))} remaining to expand access
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 4. TRUST SIGNALS */}
            <section className="px-6 py-4 lg:px-8 xl:px-10">
                <div className="bg-slate-50 dark:bg-gray-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-success fill-1 text-2xl">verified</span>
                        <h4 className="font-black text-sm uppercase tracking-tight text-slate-900 dark:text-white">Transparent Allocation</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        Secure payments via Stripe, transparent allocation model, and independently operated oversight.
                    </p>
                </div>
            </section>

            {/* 5. IMPACT PREVIEW */}
            <section className="px-6 py-12 text-center lg:px-8 xl:px-10">
                <h3 className="text-2xl font-serif italic text-slate-900 dark:text-white mb-2">Lives transformed.</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">See how contributions translate into measurable progress.</p>
                <Link
                    href="/impact"
                    className="inline-flex items-center justify-center h-12 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest transition-transform active:scale-95"
                >
                    See your impact
                </Link>
            </section>

            {/* 6. TRUST & TRANSPARENCY */}
            <section className="px-6 pb-12 lg:px-8 xl:px-10">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Trust & Transparency</h3>
                    <div className="space-y-3 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        <p>This platform is independently operated and is not a registered nonprofit organization.</p>
                        <p>Contributions support medical initiatives and help sustain platform operations and growth.</p>
                        <p>Allocation decisions are managed by the platform operator to maximize long-term impact.</p>
                        <p>Secure payments are processed via Stripe.</p>
                        <p>Questions? Contact: support@lendahand.com</p>
                    </div>
                </div>
            </section>

        </div>
  );
};

export default HomeScreen;
