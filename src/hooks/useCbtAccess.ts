"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cbtAccess";

type CbtAccess = {
  email: string;
  attemptId: string;
  accessCode: string;
  attemptsRemaining: number;
};

export function useCbtAccess() {
  const [access, setAccessState] = useState<CbtAccess | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setAccessState(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  const setAccess = useCallback((next: CbtAccess) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAccessState(next);
  }, []);

  const clearAccess = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAccessState(null);
  }, []);

  const updateAttemptsRemaining = useCallback((n: number) => {
    setAccessState((prev) => {
      if (!prev) return prev;
      const next = { ...prev, attemptsRemaining: n };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { access, hydrated, setAccess, clearAccess, updateAttemptsRemaining };
}