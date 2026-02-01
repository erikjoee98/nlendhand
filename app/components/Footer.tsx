"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hidden sm:block px-6 lg:px-8 xl:px-10 pb-12 pt-10 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-950">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Privately operated medical initiative platform.
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <Link href="/terms" className="hover:text-slate-600 dark:hover:text-slate-300">Terms</Link>
          <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-300">Privacy</Link>
          <Link href="/refund" className="hover:text-slate-600 dark:hover:text-slate-300">Refund Policy</Link>
          <Link href="/about" className="hover:text-slate-600 dark:hover:text-slate-300">About</Link>
          <Link href="/contact" className="hover:text-slate-600 dark:hover:text-slate-300">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
