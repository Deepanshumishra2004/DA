import { subjectStats, type TopicStat } from "./data";
import { allocate } from "./plan";

// Focus levels INSIDE one subject, so every subject gets its own high/medium/low split
// (the global tiers rank topics across the whole paper instead).

export type FocusLevel = "High focus" | "Medium focus" | "Low focus" | "Basics only";

export type TopicFocus = TopicStat & {
  level: FocusLevel;
  timePct: number; // share of this subject's study time
  days: number | null; // ≈ study days, from the roadmap's weeks for this subject
  marksShare: number; // % of this subject's past marks
};

export const FOCUS_INFO: Record<
  FocusLevel,
  { style: string; dot: string; short: string; depth: string[] }
> = {
  "High focus": {
    style: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
    dot: "#e11d48",
    short: "Master it. These topics bring most of this subject's marks.",
    depth: [
      "Read every part of the notes and do all the examples yourself.",
      "Solve every past question on it, then solve them again a week later.",
      "Get extra practice from GATE CS papers on the same topic.",
      "Know every formula on the formula sheet by heart.",
    ],
  },
  "Medium focus": {
    style: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
    dot: "#d97706",
    short: "Understand well. Asked regularly, but fewer marks.",
    depth: [
      "Read the notes and do the examples.",
      "Solve every past question on it once, and re-try the ones you got wrong.",
      "Revise its formulas from the formula sheet.",
    ],
  },
  "Low focus": {
    style: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
    dot: "#0284c7",
    short: "Learn the core idea. Asked rarely, so don't go deep.",
    depth: [
      "Read The big idea, the Intuition and Formulas, explained.",
      "Do Example 1 and solve its past questions.",
      "Don't spend extra time here until the High topics are strong.",
    ],
  },
  "Basics only": {
    style: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
    dot: "#a1a1aa",
    short: "Not asked in 2024–2026. Know the basics, in case it appears.",
    depth: [
      "Read The big idea and the formulas once.",
      "Do the Quick self-check.",
      "Come back in the revision weeks only if time is left.",
    ],
  },
};

export const FOCUS_ORDER: FocusLevel[] = ["High focus", "Medium focus", "Low focus", "Basics only"];

const NEVER_ASKED_WEIGHT = 1.5;
const STUDY_DAYS_PER_WEEK = 6;

export function subjectFocus(subject: string): { topics: TopicFocus[]; weeks: number | null } {
  const st = subjectStats.find((s) => s.subject === subject);
  if (!st) return { topics: [], weeks: null };
  const alloc = allocate().find((a) => a.subject === subject);
  const weeks = alloc?.weeks ?? null;

  const asked = st.topics.filter((t) => t.count > 0).sort((a, b) => b.score - a.score);
  const never = st.topics.filter((t) => t.count === 0);
  const totalMarks = asked.reduce((a, t) => a + t.marks, 0) || 1;
  const totalWeight = asked.reduce((a, t) => a + t.score, 0) + never.length * NEVER_ASKED_WEIGHT || 1;

  const out: TopicFocus[] = [];
  let cum = 0; // cumulative marks share BEFORE this topic
  for (const t of asked) {
    const share = t.marks / totalMarks;
    let level: FocusLevel = cum < 0.5 ? "High focus" : cum < 0.85 ? "Medium focus" : "Low focus";
    if (t.tier === "Must do") level = "High focus"; // a top topic of the whole paper is always high focus
    cum += share;
    out.push(mk(t, level, t.score / totalWeight, share));
  }
  for (const t of never) out.push(mk(t, "Basics only", NEVER_ASKED_WEIGHT / totalWeight, 0));

  function mk(t: TopicStat, level: FocusLevel, pct: number, share: number): TopicFocus {
    return {
      ...t,
      level,
      timePct: Math.round(pct * 100),
      days: weeks ? Math.max(0.5, Math.round(pct * weeks * STUDY_DAYS_PER_WEEK * 2) / 2) : null,
      marksShare: Math.round(share * 100),
    };
  }
  return { topics: out, weeks };
}

export function topicFocus(subject: string, topic: string) {
  const f = subjectFocus(subject);
  return { focus: f.topics.find((t) => t.topic === topic) ?? null, weeks: f.weeks };
}
