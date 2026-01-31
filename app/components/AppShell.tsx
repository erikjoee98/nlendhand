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
import BottomNav from "./BottomNav";
import DonateSelector from "./DonateSelector";

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
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-white dark:bg-gray-950 overflow-x-hidden">
        {children}
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
    </DonateSelectorContext.Provider>
  );
};

export default AppShell;
