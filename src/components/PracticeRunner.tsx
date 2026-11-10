"use client";
import { useMemo, useState } from "react";
import type { Question } from "@/lib/data";
import QuestionView from "./QuestionView";
import { useProgress } from "@/lib/progress";

const LEVELS = [
  { key: "all", label: "All" },
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "hard", label: "GATE level" },
] as const;

export default function PracticeRunner({ questions }: { questions: Question[] }) {
  const [level, setLevel] = useState<(typeof LEVELS)[number]["key"]>("all");
  const list = useMemo(() => (level === "all" ? questions : questions.filter((q) => q.difficulty === level)), [questions, level]);
  const [idx, setIdx] = useState(0);
  const { progress, update } = useProgress();
  const i = Math.min(idx, Math.max(0, list.length - 1));
  const q = list[i];

  const right = questions.filter((x) => progress.solved[x.id] === "right").length;
  const wrong = questions.filter((x) => progress.solved[x.id] === "wrong").length;

  const resetTopic = () =>
    update((p) => {
      const solved = { ...p.solved };
      questions.forEach((x) => delete solved[x.id]);
      return { ...p, solved };
    });

  if (!questions.length) return <p className="text-muted">Practice questions for this topic are being written. Check back soon.</p>;

  return (
    <div className="space-y-5">
      {/* score + level tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg border border-border bg-card p-1 text-sm">
          {LEVELS.map((l) => {
            const n = l.key === "all" ? questions.length : questions.filter((x) => x.difficulty === l.key).length;
            return (
              <button key={l.key} onClick={() => { setLevel(l.key); setIdx(0); }} className={`rounded-md px-3 py-1 ${level === l.key ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}>
                {l.label} <span className="opacity-70">{n}</span>
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <span className="text-emerald-600">✓ {right}</span>
          <span className="text-rose-600">✗ {wrong}</span>
          <span className="text-muted">{questions.length - right - wrong} left</span>
          <button onClick={resetTopic} className="text-xs text-muted underline hover:text-foreground">reset</button>
        </div>
      </div>

      {/* question grid */}
      <div className="flex flex-wrap gap-1.5">
        {list.map((x, k) => {
          const st = progress.solved[x.id];
          return (
            <button
              key={x.id}
              onClick={() => setIdx(k)}
              title={`${x.difficulty} · ${x.type}`}
              className={`h-8 w-8 rounded-lg border text-xs font-semibold tabular-nums ${k === i ? "ring-2 ring-accent" : ""}`}
              style={{
                background: st === "right" ? "var(--st-sorted)" : st === "wrong" ? "var(--st-swap)" : "var(--card)",
                borderColor: "var(--border-strong)",
              }}
            >
              {questions.indexOf(x) + 1}
            </button>
          );
        })}
      </div>

      {q && (
        <>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-border px-2 py-0.5 font-semibold">Q{questions.indexOf(q) + 1}</span>
            <span className={`rounded-full px-2 py-0.5 font-medium ${q.difficulty === "easy" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" : q.difficulty === "medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200" : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200"}`}>
              {q.difficulty === "hard" ? "GATE level" : q.difficulty}
            </span>
            <span className="rounded-full border border-border px-2 py-0.5">{q.type}</span>
            <span className="rounded-full border border-border px-2 py-0.5">{q.marks} mark{q.marks > 1 ? "s" : ""}</span>
          </div>
          <QuestionView key={q.id} q={q} />
          <div className="flex justify-between">
            <button onClick={() => setIdx(i - 1)} disabled={i === 0} className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40 hover:border-accent">← Previous</button>
            <button onClick={() => setIdx(i + 1)} disabled={i >= list.length - 1} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-40">Next question →</button>
          </div>
        </>
      )}
    </div>
  );
}
