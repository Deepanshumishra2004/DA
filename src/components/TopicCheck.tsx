"use client";
import { useProgress } from "@/lib/progress";

export default function TopicCheck({ id, label }: { id: string; label: React.ReactNode }) {
  const { progress, update } = useProgress();
  const done = !!progress.topicsDone[id];
  return (
    <label className="flex cursor-pointer items-start gap-2">
      <input
        type="checkbox"
        checked={done}
        onChange={() => update((p) => ({ ...p, topicsDone: { ...p.topicsDone, [id]: !done } }))}
        className="mt-1 accent-[var(--accent)]"
      />
      <span className={done ? "text-muted line-through" : ""}>{label}</span>
    </label>
  );
}
