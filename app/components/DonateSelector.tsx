
"use client";

import React from "react";
import Link from "next/link";

interface DonateSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

const DonateSelector: React.FC<DonateSelectorProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const options = [
        {
            id: 'urgent',
            title: 'Urgent Needs',
            desc: 'Fund cases with immediate deadlines.',
            icon: 'priority_high',
            color: 'text-red-500',
            bg: 'bg-red-50'
        },
        {
            id: 'mobility',
            title: 'Mobility Fund',
            desc: 'Wheelchairs, exoskeletons, and accessibility.',
            icon: 'accessible',
            color: 'text-primary',
            bg: 'bg-primary/5'
        },
        {
            id: 'emergency',
            title: 'Emergency Care',
            desc: 'Post-trauma recovery and critical surgeries.',
            icon: 'medical_services',
            color: 'text-success',
            bg: 'bg-success/5'
        },
        {
            id: 'smart',
            title: 'Smart Allocation',
            desc: 'Let our experts direct funds where needed most.',
            icon: 'psychology',
            color: 'text-purple-500',
            bg: 'bg-purple-50'
        }
    ];

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
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic font-serif">Support Growth.</h2>
                        <button 
                            onClick={onClose}
                            className="size-8 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-slate-400"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">How would you like to direct your impact today?</p>
                    
                    <div className="grid grid-cols-1 gap-3">
                        {options.map((option) => (
                            <Link
                                key={option.id}
                                href={`/donate?category=${option.id}`}
                                onClick={onClose}
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
                            </Link>
                        ))}
                    </div>

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
