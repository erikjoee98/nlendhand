"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BottomNav from "./BottomNav";
import DonateSelector from "./DonateSelector";
import Footer from "./Footer";

type DonateSelectorContextValue = {
  openDonateSelector: () => void;
};

const DonateSelectorContext = createContext<DonateSelectorContextValue | null>(
  null
);

export function useDonateSelector() {
  const ctx = useContext(DonateSelectorContext);
  if (!ctx) {
    throw new Error("useDonateSelector must be used within AppShell.");
  }
  return ctx;
}

interface AppShellProps {
  children: ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isDonateSelectorOpen, setIsDonateSelectorOpen] = useState(false);
  const pathname = usePathname();

  const openDonateSelector = useCallback(() => {
    setIsDonateSelectorOpen(true);
  }, []);

  const closeDonateSelector = useCallback(() => {
    setIsDonateSelectorOpen(false);
  }, []);

  const showBottomNav = useMemo(() => {
    if (!pathname) return true;
    if (pathname.startsWith("/donate")) return false;
    if (pathname.startsWith("/campaign/")) return false;
    if (pathname.startsWith("/impact/story/")) return false;
    return true;
  }, [pathname]);

  return (
    <DonateSelectorContext.Provider value={{ openDonateSelector }}>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="mx-auto w-full max-w-md lg:max-w-6xl xl:max-w-[1280px] min-h-screen relative shadow-2xl bg-white dark:bg-gray-950 overflow-x-hidden pb-28 lg:pb-0 lg:shadow-none lg:border-x lg:border-slate-100 dark:lg:border-slate-800">
          <header className="hidden lg:block sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
            <div className="px-8 xl:px-10 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">health_and_safety</span>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">Lumira</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Medical Initiatives</p>
                </div>
              </Link>
              <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <Link href="/explore" className="hover:text-slate-900 dark:hover:text-white transition-colors">Explore</Link>
                <Link href="/impact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Impact</Link>
                <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Support</Link>
              </nav>
              <button
                onClick={openDonateSelector}
                className="h-11 px-6 rounded-full bg-slate-900 text-white font-bold text-sm tracking-wide shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all"
              >
                Contribute
              </button>
            </div>
          </header>
          {children}
          <div className="lg:hidden px-6 pt-4 pb-5 text-center">
            <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-3" />
            <div className="text-[12px] text-slate-500 font-medium">
              <Link href="/terms" className="hover:text-slate-700 active:opacity-70">Terms</Link>{" "}
              •{" "}
              <Link href="/privacy" className="hover:text-slate-700 active:opacity-70">Privacy</Link>{" "}
              •{" "}
              <Link href="/refund" className="hover:text-slate-700 active:opacity-70">Refund</Link>{" "}
              •{" "}
              <Link href="/contact" className="hover:text-slate-700 active:opacity-70">Contact</Link>
            </div>
          </div>
          <Footer />
        {showBottomNav && (
          <BottomNav
            currentPath={pathname || "/"}
            onOpenDonateSelector={openDonateSelector}
          />
        )}
        <DonateSelector
          isOpen={isDonateSelectorOpen}
          onClose={closeDonateSelector}
        />
        </div>
      </div>
    </DonateSelectorContext.Provider>
  );
};

export default AppShell;
