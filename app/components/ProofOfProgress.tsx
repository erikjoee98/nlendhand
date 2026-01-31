"use client";

import { useEffect, useMemo, useState } from "react";
import { formatNumber } from "../../lib/format";

type ProgressResponse = {
  patientsSupported: number;
  rehabCompletion: number;
};

const DEFAULT_PROGRESS: ProgressResponse = {
  patientsSupported: 0,
  rehabCompletion: 0,
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
          patientsSupported: Number.isFinite(data.patientsSupported)
            ? data.patientsSupported
            : 0,
          rehabCompletion: Number.isFinite(data.rehabCompletion)
            ? data.rehabCompletion
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

  const completionDisplay = useMemo(
    () => `${Math.min(100, Math.max(0, progress.rehabCompletion)).toFixed(1)}%`,
    [progress.rehabCompletion]
  );

  return (
    <section className="py-8 px-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
            Patients Supported
          </p>
          <p className="text-2xl font-black tracking-tighter text-primary">
            {isLoading ? "—" : formatNumber(progress.patientsSupported)}
          </p>
          <div className="mt-4 flex items-center gap-1 text-[10px] text-success font-black">
            <span className="material-symbols-outlined text-xs">check_circle</span>{" "}
            100% Verified
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
            Rehab Completion
          </p>
          <p className="text-2xl font-black tracking-tighter text-primary">
            {isLoading ? "—" : completionDisplay}
          </p>
          <div className="mt-4 flex items-center gap-1 text-[10px] text-primary font-black">
            <span className="material-symbols-outlined text-xs">star</span>{" "}
            High Success
          </div>
        </div>
      </div>
    </section>
  );
}
