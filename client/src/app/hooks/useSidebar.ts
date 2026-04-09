import { useState, useEffect, useCallback } from "react";

const SIDEBAR_OPEN_KEY = "sidebar_open";
const SIDEBAR_COLLAPSED_KEY = "sidebar_collapsed";

const getInitialMobile = () =>
  typeof window !== "undefined" ? window.innerWidth < 1024 : false;

const getInitialOpen = (isMobile: boolean): boolean => {
  if (isMobile) return false;
  const stored = localStorage.getItem(SIDEBAR_OPEN_KEY);
  return stored !== null ? stored === "true" : true;
};

const getInitialCollapsed = (): boolean => {
  const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
  return stored !== null ? stored === "true" : false;
};

export const useSidebar = () => {
  const [isMobile, setIsMobile] = useState<boolean>(getInitialMobile);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() =>
    getInitialOpen(getInitialMobile())
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(getInitialCollapsed);

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        // Auto-close drawer when switching to mobile
        setIsSidebarOpen(false);
      } else {
        // Restore desktop open state from localStorage when switching to desktop
        const stored = localStorage.getItem(SIDEBAR_OPEN_KEY);
        setIsSidebarOpen(stored !== null ? stored === "true" : true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => {
      const next = !prev;
      if (!getInitialMobile()) {
        localStorage.setItem(SIDEBAR_OPEN_KEY, String(next));
      }
      return next;
    });
  }, []);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      return next;
    });
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return {
    isSidebarOpen,
    isCollapsed,
    isMobile,
    toggleSidebar,
    toggleCollapsed,
    closeSidebar,
  };
};
