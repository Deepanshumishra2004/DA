"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Diagram } from "@/lib/walkthrough";
import DiagramView, { DiagramLegend } from "./DiagramView";

export type PlayerFrame = { caption: React.ReactNode; diagrams: Diagram[] };

const SPEEDS = [
  { label: "Slow", ms: 6000 },
  { label: "Normal", ms: 4000 },
  { label: "Fast", ms: 2500 },
];

export default function WalkthroughPlayer({ title, intro, frames }: { title: string; intro?: React.ReactNode; frames: PlayerFrame[] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const box = useRef<HTMLDivElement>(null);
  const n = frames.length;
  const last = i === n - 1;

  const go = useCallback((k: number) => setI(Math.max(0, Math.min(n - 1, k))), [n]);

  useEffect(() => {
    if (!playing) return;
    if (last) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setI((x) => x + 1), SPEEDS[speed].ms);
    return () => clearTimeout(t);
  }, [playing, i, last, speed]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
    if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
  };

  const f = frames[i];
  const kinds = f.diagrams.map((d) => d.kind);

  return (
    <div ref={box} tabIndex={0} onKeyDown={onKey} className="rounded-2xl border border-border bg-background/50 outline-none focus-visible:ring-2 focus-visible:ring-accent">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <span className="font-semibold">{title}</span>
        <span className="ml-auto text-xs text-muted tabular-nums">Step {i + 1} / {n}</span>
      </div>
      {intro && i === 0 && <div className="border-b border-border px-5 py-3 text-sm text-muted">{intro}</div>}

      {/* diagram stage */}
      {f.diagrams.length > 0 && (
        <div className="space-y-4 px-3 pt-5 pb-2 sm:px-6">
          {f.diagrams.map((d, k) => (
            <DiagramView key={k} d={d} />
          ))}
          <DiagramLegend kinds={kinds} />
        </div>
      )}

      {/* caption */}
      <div className="min-h-24 px-5 py-4 sm:px-7" aria-live="polite">
        {f.caption}
      </div>

      {/* progress */}
      <div className="flex gap-1 px-5">
        {frames.map((_, k) => (
          <button
            key={k}
            aria-label={`Go to step ${k + 1}`}
            onClick={() => { setPlaying(false); go(k); }}
            className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ background: k <= i ? "var(--accent)" : "var(--border)" }}
          />
        ))}
      </div>

      {/* controls */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3">
        <button onClick={() => { setPlaying(false); go(i - 1); }} disabled={i === 0} className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40 hover:border-accent">
          ← Back
        </button>
        <button
          onClick={() => { if (last) { setI(0); setPlaying(true); } else setPlaying((p) => !p); }}
          className="rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-white"
        >
          {playing ? "❚❚ Pause" : last ? "↺ Replay" : "▶ Play"}
        </button>
        <button onClick={() => { setPlaying(false); go(i + 1); }} disabled={last} className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40 hover:border-accent">
          Next →
        </button>
        <div className="ml-auto flex items-center gap-1 text-xs text-muted">
          Speed:
          {SPEEDS.map((s, k) => (
            <button key={s.label} onClick={() => setSpeed(k)} className={`rounded px-2 py-1 ${k === speed ? "bg-accent/15 font-semibold text-accent" : "hover:text-foreground"}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-3 text-[11px] text-muted">Tip: click the player, then use the ← → keys, or Space to play/pause.</div>
    </div>
  );
}
