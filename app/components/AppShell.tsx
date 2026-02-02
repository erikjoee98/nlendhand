"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileHeaderVisible, setIsMobileHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const openDonateSelector = useCallback(() => {
    setIsDonateSelectorOpen(true);
  }, []);

  const closeDonateSelector = useCallback(() => {
    setIsDonateSelectorOpen(false);
  }, []);

  const showMobileHeader = useMemo(() => {
    if (!pathname) return true;
    if (pathname.startsWith("/donate")) return false;
    if (pathname.startsWith("/campaign/")) return false;
    if (pathname.startsWith("/impact/story/")) return false;
    return true;
  }, [pathname]);

  useEffect(() => {
    if (!showMobileHeader) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const previousY = lastScrollY.current;

        if (currentY < 12) {
          setIsMobileHeaderVisible(true);
        } else if (currentY > previousY + 8 && currentY > 64) {
          setIsMobileHeaderVisible(false);
          setIsMobileMenuOpen(false);
        } else if (currentY < previousY - 6) {
          setIsMobileHeaderVisible(true);
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showMobileHeader]);

  return (
    <DonateSelectorContext.Provider value={{ openDonateSelector }}>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="mx-auto w-full max-w-md lg:max-w-6xl xl:max-w-[1280px] min-h-screen relative shadow-2xl bg-white dark:bg-gray-950 overflow-x-hidden pb-8 lg:pb-0 lg:shadow-none lg:border-x lg:border-slate-100 dark:lg:border-slate-800">
          {showMobileHeader && (
            <header className={`lg:hidden sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-transform duration-300 ${isMobileHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}>
              <div className="px-5 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <svg className="size-4" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                      <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
                    </svg>
                  </div>
                  <p className="text-base font-black text-slate-900 dark:text-white tracking-tight">Lumira</p>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className="size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center"
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isMobileMenuOpen ? "close" : "menu"}
                  </span>
                </button>
              </div>
              {isMobileMenuOpen && (
                <div className="px-5 pb-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-950">
                  <nav className="flex flex-col gap-1 pt-3">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="h-11 rounded-lg px-3 flex items-center text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900">
                      Home
                    </Link>
                    <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className="h-11 rounded-lg px-3 flex items-center text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900">
                      Explore
                    </Link>
                    <Link href="/impact" onClick={() => setIsMobileMenuOpen(false)} className="h-11 rounded-lg px-3 flex items-center text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900">
                      Impact
                    </Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="h-11 rounded-lg px-3 flex items-center text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900">
                      About
                    </Link>
                  </nav>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openDonateSelector();
                    }}
                    className="mt-3 w-full h-12 rounded-xl bg-slate-900 text-white text-sm font-bold tracking-wide"
                  >
                    Contribute
                  </button>
                </div>
              )}
            </header>
          )}
          <header className="hidden lg:block sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
            <div className="px-8 xl:px-10 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <svg className="size-5" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">Lumira</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Medical Initiatives</p>
                </div>
              </Link>
              <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
                <Link href="/explore" className="hover:text-slate-900 dark:hover:text-white transition-colors">Explore</Link>
                <Link href="/impact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Impact</Link>
                <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link>
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
