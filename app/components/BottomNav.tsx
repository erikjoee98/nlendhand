
"use client";

import React from "react";
import Link from "next/link";

interface BottomNavProps {
    currentPath: string;
    onOpenDonateSelector: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPath, onOpenDonateSelector }) => {
    const isHome = currentPath === "/";
    const isExplore = currentPath.startsWith("/explore");
    const isImpact = currentPath.startsWith("/impact");
    const isAbout = currentPath.startsWith("/about");

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto pointer-events-none lg:hidden">
            {/* The Main Navigation Bar Container */}
            <div className="relative h-[88px] bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl border-t border-slate-100 dark:border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pointer-events-auto">
                <div className="relative h-full flex items-center px-2">
                    {/* Left Tabs */}
                    <div className="flex-1 flex justify-around items-center">
                        <Link
                            href="/"
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isHome ? 'text-primary' : 'text-slate-400 active:scale-90'}`}
                        >
                            <span className={`material-symbols-outlined text-[24px] ${isHome ? 'fill-1 font-bold' : ''}`}>home</span>
                            <span className="text-[9px] font-black tracking-wider uppercase">Home</span>
                        </Link>

                        <Link
                            href="/explore"
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isExplore ? 'text-primary' : 'text-slate-400 active:scale-90'}`}
                        >
                            <span className={`material-symbols-outlined text-[24px] ${isExplore ? 'fill-1 font-bold' : ''}`}>search</span>
                            <span className="text-[9px] font-black tracking-wider uppercase">Explore</span>
                        </Link>
                    </div>

                    {/* Spacer for the Centered Absolute Button */}
                    <div className="w-20 shrink-0"></div>

                    {/* Right Tabs */}
                    <div className="flex-1 flex justify-around items-center">
                        <Link
                            href="/impact"
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isImpact ? 'text-primary' : 'text-slate-400 active:scale-90'}`}
                        >
                            <span className={`material-symbols-outlined text-[24px] ${isImpact ? 'fill-1 font-bold' : ''}`}>monitoring</span>
                            <span className="text-[9px] font-black tracking-wider uppercase">Impact</span>
                        </Link>

                    <Link
                            href="/about"
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isAbout ? 'text-primary' : 'text-slate-400 active:scale-90'}`}
                    >
                            <span className={`material-symbols-outlined text-[24px] ${isAbout ? 'fill-1 font-bold' : ''}`}>verified_user</span>
                            <span className="text-[9px] font-black tracking-wider uppercase">About</span>
                    </Link>
                    </div>
                </div>

                {/* Refined Circular Contribute FAB */}
                <button 
                    onClick={onOpenDonateSelector}
                    className="absolute left-1/2 -translate-x-1/2 top-8 -translate-y-1/2 flex flex-col items-center pointer-events-auto group"
                >
                    <div className="size-14 bg-primary text-white rounded-full flex items-center justify-center shadow-md border-[3px] border-white dark:border-gray-950 transition-transform active:scale-95">
                        <span className="material-symbols-outlined text-[30px] font-bold leading-none">add</span>
                    </div>
                    <span className="text-[9px] font-black tracking-wider uppercase mt-2 text-slate-400">Contribute</span>
                </button>
            </div>

            {/* iOS Bottom Safe Area Visual Placeholder */}
            <div className="h-4 bg-white dark:bg-gray-950 pointer-events-auto"></div>
        </nav>
    );
};

export default BottomNav;
