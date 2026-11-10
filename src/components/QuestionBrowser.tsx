"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SUBJECTS, YEARS, subjectByName } from "@/lib/taxonomy";
import { useProgress } from "@/lib/progress";

export type QRow = {
  id: string;
  year: number;
  number: number;
  type: string;
  marks: number;
  subject: string;
  topic: string;
  subtopic: string;
  difficulty: string;
  preview: string;
  verified: boolean;
};

const sel = "rounded-lg border border-border bg-card px-2.5 py-1.5 text-sm";

export default function QuestionBrowser({ rows }: { rows: QRow[] }) {
  const sp = useSearchParams();
  const [year, setYear] = useState(sp.get("year") ?? "");
  const [subject, setSubject] = useState(sp.get("subject") ?? "");
  const [topic, setTopic] = useState(sp.get("topic") ?? "");
  const [type, setType] = useState("");
  const [diff, setDiff] = useState("");
  const [status, setStatus] = useState("");
  const [qText, setQText] = useState("");
  const { progress } = useProgress();

  const topics = subject ? subjectByName(subject)?.topics ?? [] : [];
  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (!year || r.year === +year) &&
          (!subject || r.subject === subject) &&
          (!topic || r.topic === topic) &&
          (!type || r.type === type) &&
          (!diff || r.difficulty === diff) &&
          (!status ||
            (status === "todo" ? !progress.solved[r.id] : progress.solved[r.id] === status)) &&
          (!qText || (r.preview + " " + r.subtopic + " " + r.topic).toLowerCase().includes(qText.toLowerCase())),
      ),
    [rows, year, subject, topic, type, diff, status, qText, progress],
  );
  const solvedCount = rows.filter((r) => progress.solved[r.id]).length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <select className={sel} value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">All years</option>
          {YEARS.map((y) => <option key={y}>{y}</option>)}
        </select>
        <select className={sel} value={subject} onChange={(e) => { setSubject(e.target.value); setTopic(""); }}>
          <option value="">All subjects</option>
          {SUBJECTS.map((s) => <option key={s.name}>{s.name}</option>)}
        </select>
        {subject && (
          <select className={sel} value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">All topics</option>
            {topics.map((t) => <option key={t}>{t}</option>)}
          </select>
        )}
        <select className={sel} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All types</option>
          <option>MCQ</option><option>MSQ</option><option>NAT</option>
        </select>
        <select className={sel} value={diff} onChange={(e) => setDiff(e.target.value)}>
          <option value="">Any difficulty</option>
          <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
        </select>
        <select className={sel} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Any status</option>
          <option value="todo">Not attempted</option>
          <option value="right">Got right</option>
          <option value="wrong">Got wrong</option>
        </select>
        <input className={`${sel} min-w-0 flex-1`} placeholder="Search…" value={qText} onChange={(e) => setQText(e.target.value)} />
      </div>
      <div className="mb-3 text-sm text-muted">
        Showing {filtered.length} of {rows.length} · attempted {solvedCount}/{rows.length}
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {filtered.map((r) => {
          const s = subjectByName(r.subject);
          const st = progress.solved[r.id];
          return (
            <Link key={r.id} href={`/questions/${r.id}`} className="flex gap-3 p-3 hover:bg-background">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s ? `var(${s.color})` : "var(--muted)" }} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 text-sm">
                  <b>{r.year} Q.{r.number}</b>
                  <span className="text-xs text-muted">{r.type} · {r.marks}m · {r.difficulty}</span>
                  <span className="text-xs">{r.topic}</span>
                  {st && <span className={`text-xs ${st === "right" ? "text-emerald-600" : "text-rose-600"}`}>{st === "right" ? "✓" : "✗"}</span>}
                </div>
                <div className="truncate text-sm text-muted">{r.preview}</div>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && <div className="p-6 text-center text-sm text-muted">No questions match.</div>}
      </div>
    </div>
  );
}
