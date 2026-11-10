"use client";
import { useState } from "react";
import Markdown from "./Markdown";
import type { Question } from "@/lib/data";
import { useProgress } from "@/lib/progress";

function isCorrect(q: Question, picked: string[], nat: string): boolean {
  if (q.type === "NAT") {
    const v = parseFloat(nat);
    if (Number.isNaN(v)) return false;
    const m = q.answer.match(/(-?[\d.]+)\s*to\s*(-?[\d.]+)/i);
    if (m) return v >= parseFloat(m[1]) - 1e-9 && v <= parseFloat(m[2]) + 1e-9;
    return Math.abs(v - parseFloat(q.answer)) < 1e-9;
  }
  const key = q.answer.split(/[;,\s]+/).filter(Boolean).map((s) => s.toUpperCase()).sort().join(";");
  return picked.slice().sort().join(";") === key;
}

export default function QuestionView({ q }: { q: Question }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [nat, setNat] = useState("");
  const [checked, setChecked] = useState(false);
  const [showSol, setShowSol] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [showThink, setShowThink] = useState(false);
  const { progress, update } = useProgress();
  const status = progress.solved[q.id];
  const keyLetters = q.type === "NAT" ? [] : q.answer.toUpperCase().split(/[;,\s]+/);
  const answerable = /^[A-D]([;,][A-D])*$|to/i.test(q.answer.replace(/\s/g, "")) || q.type === "NAT";

  const toggle = (l: string) => {
    if (checked) return;
    if (q.type === "MCQ") setPicked([l]);
    else setPicked((p) => (p.includes(l) ? p.filter((x) => x !== l) : [...p, l]));
  };

  const check = () => {
    const ok = isCorrect(q, picked, nat);
    setChecked(true);
    update((p) => ({ ...p, solved: { ...p.solved, [q.id]: ok ? "right" : "wrong" } }));
  };

  const ok = checked && isCorrect(q, picked, nat);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-5">
        <Markdown>{q.question}</Markdown>
        {q.hasFigure && q.figureNote && (
          <div className="mt-3 rounded-lg border border-dashed border-border p-3 text-sm">
            <div className="mb-1 text-xs font-semibold text-muted">FIGURE (described in text)</div>
            <Markdown>{q.figureNote}</Markdown>
          </div>
        )}

        {q.options && (
          <div className="mt-4 grid gap-2">
            {q.type === "MSQ" && <div className="text-xs text-muted">Pick one or more options (MSQ).</div>}
            {q.options.map((o) => {
              const sel = picked.includes(o.label);
              const isKey = keyLetters.includes(o.label);
              let cls = "border-border hover:border-accent";
              if (checked && isKey) cls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
              else if (checked && sel && !isKey) cls = "border-rose-500 bg-rose-50 dark:bg-rose-950/40";
              else if (sel) cls = "border-accent bg-accent/10";
              return (
                <button
                  key={o.label}
                  onClick={() => toggle(o.label)}
                  className={`flex items-start gap-3 rounded-lg border p-3 text-left transition ${cls}`}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold">
                    {o.label}
                  </span>
                  <Markdown className="min-w-0 flex-1">{o.text}</Markdown>
                </button>
              );
            })}
          </div>
        )}

        {q.type === "NAT" && (
          <div className="mt-4 flex items-center gap-2">
            <input
              value={nat}
              onChange={(e) => setNat(e.target.value)}
              disabled={checked}
              inputMode="decimal"
              placeholder="Type your numerical answer"
              className="w-56 rounded-lg border border-border bg-background px-3 py-2"
            />
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {answerable && !checked && (
            <button
              onClick={check}
              disabled={q.type === "NAT" ? !nat : picked.length === 0}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              Check answer
            </button>
          )}
          {checked && (
            <>
              <span className={`text-sm font-semibold ${ok ? "text-emerald-600" : "text-rose-600"}`}>
                {ok ? "Correct ✓" : "Not quite ✗"}
              </span>
              <span className="text-sm text-muted">Official answer: <b className="text-foreground">{q.answer}</b></span>
              <button onClick={() => { setChecked(false); setPicked([]); setNat(""); }} className="text-sm text-accent underline">
                Try again
              </button>
            </>
          )}
          {q.intuition && (
            <button
              onClick={() => setShowThink((s) => !s)}
              className="rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-800 hover:border-indigo-500 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-200"
            >
              {showThink ? "Hide hint" : "How to think (hint)"}
            </button>
          )}
          <button
            onClick={() => setShowSol((s) => !s)}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-accent"
          >
            {showSol ? "Hide solution" : "Show solution"}
          </button>
          {q.page > 0 && (
            <button onClick={() => setShowPage((s) => !s)} className="rounded-lg border border-border px-4 py-2 text-sm hover:border-accent">
              {showPage ? "Hide original page" : "Original paper page"}
            </button>
          )}
          {status && !checked && (
            <span className="text-xs text-muted">Last attempt: {status === "right" ? "correct ✓" : "wrong ✗"}</span>
          )}
        </div>
      </div>

      {showThink && q.intuition && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5 dark:border-indigo-900 dark:bg-indigo-950/30">
          <h2 className="mb-2 text-lg font-semibold">How to think about this question</h2>
          <Markdown>{q.intuition}</Markdown>
          {q.formulasUsed && (
            <div className="mt-4 border-t border-indigo-200 pt-3 dark:border-indigo-900">
              <div className="mb-1 text-xs font-semibold text-muted">FORMULAS USED, EXPLAINED</div>
              <Markdown>{q.formulasUsed}</Markdown>
            </div>
          )}
          <p className="mt-3 text-xs text-muted">Now try the question again before opening the full solution.</p>
        </div>
      )}

      {showPage && q.page > 0 && (
        <div className="rounded-xl border border-border bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/papers/${q.year}/p-${String(q.page).padStart(2, "0")}.png`} alt={`${q.year} paper page ${q.page}`} className="mx-auto" />
          <p className="p-2 text-center text-xs text-zinc-500">Page {q.page}. A question can run onto the next page.</p>
        </div>
      )}

      {showSol && (
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">Solution</h2>
            {!q.verified && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                unverified: double-check against the official key
              </span>
            )}
          </div>
          {q.keyIdea && (
            <div className="mb-4 rounded-lg bg-accent/10 p-3 text-sm">
              <b>Key idea:</b> <Markdown className="inline [&_p]:inline">{q.keyIdea}</Markdown>
            </div>
          )}
          <Markdown>{q.solution}</Markdown>
          {q.notes && <p className="mt-4 text-xs text-muted">Note: {q.notes}</p>}
        </div>
      )}
    </div>
  );
}
