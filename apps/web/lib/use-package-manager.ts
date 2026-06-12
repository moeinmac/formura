"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_PACKAGE_MANAGER,
  PM_STORAGE_KEY,
  type PackageManager,
  isPackageManager,
} from "./package-manager";

const PM_CHANGE_EVENT = "formura:package-manager";

const getSnapshot = (): PackageManager => {
  if (typeof window === "undefined") return DEFAULT_PACKAGE_MANAGER;
  const stored = localStorage.getItem(PM_STORAGE_KEY);
  return stored && isPackageManager(stored) ? stored : DEFAULT_PACKAGE_MANAGER;
};

const getServerSnapshot = (): PackageManager => DEFAULT_PACKAGE_MANAGER;

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(PM_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PM_CHANGE_EVENT, callback);
  };
};

export const usePackageManager = () => {
  const packageManager = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setPackageManager = useCallback((next: PackageManager) => {
    localStorage.setItem(PM_STORAGE_KEY, next);
    window.dispatchEvent(new Event(PM_CHANGE_EVENT));
  }, []);

  return { packageManager, setPackageManager };
};
