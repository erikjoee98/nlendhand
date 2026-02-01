
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Campaign } from "../../types";
import { formatNumber } from "../../lib/format";

interface DonateSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

const DonateSelector: React.FC<DonateSelectorProps> = ({ isOpen, onClose }) => {
    const options = [
        {
            id: 'urgent',
            title: 'Priority Initiatives',
            desc: 'Accelerate programs that address urgent care gaps.',
            icon: 'priority_high',
            color: 'text-red-500',
            bg: 'bg-red-50'
        },
        {
            id: 'mobility',
            title: 'Mobility Innovation',
            desc: 'Equipment and assistive technology for mobility access.',
            icon: 'accessible',
            color: 'text-primary',
            bg: 'bg-primary/5'
        },
        {
            id: 'emergency',
            title: 'Critical Care',
            desc: 'Essential equipment and response readiness programs.',
            icon: 'medical_services',
            color: 'text-success',
            bg: 'bg-success/5'
        },
        {
            id: 'smart',
            title: 'Strategic Allocation',
            desc: 'Direct contributions to the highest‑impact initiatives.',
            icon: 'psychology',
            color: 'text-purple-500',
            bg: 'bg-purple-50'
        }
    ];

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const selectedOption = useMemo(
        () => options.find((option) => option.id === selectedCategory) || null,
        [options, selectedCategory]
    );

    const resetSelection = useCallback(() => {
        setSelectedCategory(null);
        setCampaigns([]);
        setErrorMessage(null);
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        if (!selectedCategory) return;
        let isActive = true;
        setIsLoading(true);
        setErrorMessage(null);
        fetch(`/api/campaigns?category=${encodeURIComponent(selectedCategory)}`)
            .then(async (response) => {
                if (!response.ok) {
                    const text = await response.text().catch(() => "");
                    throw new Error(text || "Failed to load initiatives.");
                }
                return response.json() as Promise<{ campaigns: Campaign[] }>;
            })
            .then((data) => {
                if (!isActive) return;
                setCampaigns(data.campaigns || []);
            })
            .catch((error) => {
                if (!isActive) return;
                setErrorMessage(
                    error instanceof Error ? error.message : "Failed to load initiatives."
                );
            })
            .finally(() => {
                if (!isActive) return;
                setIsLoading(false);
            });
        return () => {
            isActive = false;
        };
    }, [isOpen, selectedCategory]);

    useEffect(() => {
        if (isOpen) return;
        resetSelection();
    }, [isOpen, resetSelection]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white dark:bg-gray-950 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
                <div className="px-8 pt-8 pb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            {selectedCategory && (
                                <button
                                    onClick={resetSelection}
                                    className="size-8 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-slate-500"
                                    aria-label="Back"
                                >
                                    <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
                                </button>
                            )}
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic font-serif">
                                Support Progress.
                            </h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className="size-8 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-slate-400"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">
                        {selectedOption
                            ? `Choose a ${selectedOption.title.toLowerCase()} initiative to support.`
                            : "How would you like to direct your contribution today?"}
                    </p>
                    
                    {!selectedCategory && (
                        <div className="grid grid-cols-1 gap-3">
                            {options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setSelectedCategory(option.id)}
                                    className="flex items-center gap-4 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-slate-50 dark:hover:bg-gray-900 transition-all active:scale-[0.98] text-left group"
                                >
                                    <div className={`size-12 shrink-0 rounded-2xl ${option.bg} flex items-center justify-center ${option.color}`}>
                                        <span className="material-symbols-outlined text-2xl">{option.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{option.title}</h4>
                                        <p className="text-[11px] text-slate-400 font-medium leading-tight">{option.desc}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {selectedCategory && (
                        <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-1">
                            {isLoading && (
                                <div className="text-sm text-slate-400 font-medium">Loading initiatives...</div>
                            )}
                            {!isLoading && errorMessage && (
                                <div className="text-sm text-red-500 font-medium">{errorMessage}</div>
                            )}
                            {!isLoading && !errorMessage && campaigns.length === 0 && (
                                <div className="text-sm text-slate-400 font-medium">
                                    No active initiatives available right now.
                                </div>
                            )}
                            {!isLoading &&
                                !errorMessage &&
                                campaigns.map((campaign) => (
                                    <Link
                                        key={campaign.id}
                                        href={`/donate?campaignId=${campaign.id}`}
                                        onClick={onClose}
                                        className="flex flex-col gap-4 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-slate-50 dark:hover:bg-gray-900 transition-all active:scale-[0.98] text-left group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="size-14 shrink-0 rounded-2xl bg-center bg-cover shadow-sm"
                                                style={{ backgroundImage: `url(${campaign.image})` }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                                                    {campaign.title}
                                                </h4>
                                                <p className="text-[11px] text-slate-400 font-medium leading-tight line-clamp-2">
                                                    {campaign.description}
                                                </p>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">
                                                chevron_right
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-[10px] font-bold text-primary">
                                                ${formatNumber(campaign.raised)} initial capital committed
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${campaign.percentage}%` }}></div>
                                            </div>
                                            <div className="text-[10px] font-semibold text-slate-500">
                                                ${formatNumber(Math.max(campaign.goal - campaign.raised, 0))} to unlock full program deployment
                                            </div>
                                            <div className="pt-2">
                                                <span className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black uppercase tracking-widest">
                                                    Contribute
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    )}

                    <div className="mt-8 pb-4">
                        <button 
                            onClick={onClose}
                            className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest transition-transform active:scale-95"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateSelector;
