"use client";
import { useProgress } from "@/lib/progress";

/** Tiny right/wrong bar for a set of question ids (from this browser's saved attempts). */
export default function PracticeProgress({ ids }: { ids: string[] }) {
  const { progress } = useProgress();
  const right = ids.filter((id) => progress.solved[id] === "right").length;
  const wrong = ids.filter((id) => progress.solved[id] === "wrong").length;
  const n = ids.length || 1;
  return (
    <span className="flex h-2 w-24 overflow-hidden rounded-full bg-border" title={`${right} right, ${wrong} wrong of ${ids.length}`}>
      <span style={{ width: `${(right / n) * 100}%`, background: "var(--st-sorted-strong)" }} />
      <span style={{ width: `${(wrong / n) * 100}%`, background: "var(--st-swap-strong)" }} />
    </span>
  );
}
