"use client";

import { useEffect, useMemo, useState } from "react";
import { formatNumber } from "../../lib/format";

type ProgressResponse = {
  totalRaisedCents: number;
  activeInitiatives: number;
};

const DEFAULT_PROGRESS: ProgressResponse = {
  totalRaisedCents: 0,
  activeInitiatives: 0,
};

const POLL_INTERVAL_MS = 30000;

export default function ProofOfProgress() {
  const [progress, setProgress] = useState<ProgressResponse>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchProgress = async () => {
      try {
        const response = await fetch("/api/progress", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as ProgressResponse;
        if (!isActive) return;
        setProgress({
          totalRaisedCents: Number.isFinite(data.totalRaisedCents)
            ? data.totalRaisedCents
            : 0,
          activeInitiatives: Number.isFinite(data.activeInitiatives)
            ? data.activeInitiatives
            : 0,
        });
      } finally {
        if (!isActive) return;
        setIsLoading(false);
      }
    };

    fetchProgress();
    const timer = setInterval(fetchProgress, POLL_INTERVAL_MS);

    return () => {
      isActive = false;
      clearInterval(timer);
    };
  }, []);

  const totalRaisedDisplay = useMemo(
    () => `$${formatNumber(progress.totalRaisedCents / 100)}`,
    [progress.totalRaisedCents]
  );
  const hasCapital = progress.totalRaisedCents > 0;

  return (
    <section className="py-8 px-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-[18px] shadow-sm border border-slate-100 dark:border-slate-800 min-h-[160px] flex flex-col justify-center">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
            Foundational Capital
          </p>
          <p className="text-3xl lg:text-4xl font-black tracking-tighter text-primary">
            {isLoading ? "—" : hasCapital ? `${totalRaisedDisplay} secured` : "Foundational capital secured"}
          </p>
          <p className="mt-2 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
            Foundational capital secured to enable early deployment.
          </p>
          <p className="mt-1 text-[9px] text-slate-400 font-medium">
            Supporting long-term platform readiness.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-5 rounded-[18px] shadow-sm border border-slate-100 dark:border-slate-800 min-h-[160px] flex flex-col justify-center">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mb-2">
            <span className="material-symbols-outlined text-[14px] text-slate-400">local_hospital</span>
            Active Medical Programs
          </div>
          <p className="text-3xl lg:text-4xl font-black tracking-tighter text-primary">
            {isLoading ? "—" : formatNumber(progress.activeInitiatives)}
          </p>
          <p className="mt-2 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
            Active initiatives currently in deployment scope.
          </p>
        </div>
      </div>
      <p className="mt-4 text-center text-[10px] text-slate-400 font-medium">
        Platform metrics reflect processed contributions and active medical initiatives.
      </p>
    </section>
  );
}
