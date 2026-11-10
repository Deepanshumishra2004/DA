"use client";
import { useCallback, useEffect, useState } from "react";

// Per-browser progress (solved questions, finished topics). localStorage may be unavailable; fail soft.
const KEY = "gate-da-progress-v1";
type Progress = { solved: Record<string, "right" | "wrong">; topicsDone: Record<string, boolean> };
const empty: Progress = { solved: {}, topicsDone: {} };

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

export function useProgress() {
  const [p, setP] = useState<Progress>(empty);
  useEffect(() => {
    setP(read());
    const on = () => setP(read());
    window.addEventListener("storage", on);
    window.addEventListener("gate-progress", on);
    return () => {
      window.removeEventListener("storage", on);
      window.removeEventListener("gate-progress", on);
    };
  }, []);
  const update = useCallback((fn: (p: Progress) => Progress) => {
    const next = fn(read());
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    setP(next);
    window.dispatchEvent(new Event("gate-progress"));
  }, []);
  return { progress: p, update };
}
