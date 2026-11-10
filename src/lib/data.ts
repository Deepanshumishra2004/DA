import questionsJson from "@/data/questions.json";
import { SUBJECTS, YEARS, subjectByName } from "./taxonomy";

export type Option = { label: string; text: string };
export type Question = {
  id: string;
  year: number;
  number: number;
  page: number;
  section: "GA" | "DA";
  type: "MCQ" | "MSQ" | "NAT";
  marks: number;
  question: string;
  options: Option[] | null;
  hasFigure: boolean;
  figureNote: string | null;
  answer: string;
  subject: string;
  topic: string;
  subtopic: string;
  concepts: string[];
  difficulty: "easy" | "medium" | "hard";
  keyIdea: string;
  solution: string;
  verified: boolean;
  notes: string | null;
  intuition: string | null; // beginner "how to think" text
  formulasUsed: string | null; // formulas used, symbols explained
};

export const questions: Question[] = (questionsJson as Question[])
  .slice()
  .sort((a, b) => a.year - b.year || a.number - b.number);

export const getQuestion = (id: string) => questions.find((q) => q.id === id);

// Recent papers weigh a bit more: the paper style is still settling (DA started 2024).
const YEAR_WEIGHT: Record<number, number> = { 2024: 1, 2025: 1.25, 2026: 1.5 };

export type TopicStat = {
  subject: string;
  topic: string;
  marks: number;
  count: number;
  byYear: Record<number, number>; // marks per year
  yearsAsked: number;
  score: number;
  tier: Tier;
  questionIds: string[];
};
export type Tier = "Must do" | "Important" | "Good to know" | "Not asked yet";

export type SubjectStat = {
  subject: string;
  marks: number;
  count: number;
  byYear: Record<number, number>;
  avgMarks: number;
  topics: TopicStat[];
};

function emptyYears() {
  return Object.fromEntries(YEARS.map((y) => [y, 0])) as Record<number, number>;
}

function computeTopicStats(): TopicStat[] {
  const stats: TopicStat[] = [];
  for (const s of SUBJECTS) {
    for (const t of s.topics) {
      const qs = questions.filter((q) => q.subject === s.name && q.topic === t);
      const byYear = emptyYears();
      let score = 0;
      for (const q of qs) {
        byYear[q.year] = (byYear[q.year] ?? 0) + q.marks;
        score += q.marks * (YEAR_WEIGHT[q.year] ?? 1);
      }
      const yearsAsked = YEARS.filter((y) => byYear[y] > 0).length;
      score += yearsAsked * 1.5; // consistency bonus: asked every year = reliable
      stats.push({
        subject: s.name,
        topic: t,
        marks: qs.reduce((a, q) => a + q.marks, 0),
        count: qs.length,
        byYear,
        yearsAsked,
        score: Math.round(score * 10) / 10,
        tier: "Not asked yet",
        questionIds: qs.map((q) => q.id),
      });
    }
  }
  // Tier by rank among topics that were asked (GA excluded from ranking pressure but still tiered)
  const asked = stats.filter((s) => s.count > 0).sort((a, b) => b.score - a.score);
  asked.forEach((s, i) => {
    const p = i / asked.length;
    s.tier = p < 0.25 ? "Must do" : p < 0.6 ? "Important" : "Good to know";
  });
  return stats;
}

export const topicStats = computeTopicStats();

export const subjectStats: SubjectStat[] = SUBJECTS.map((s) => {
  const qs = questions.filter((q) => q.subject === s.name);
  const byYear = emptyYears();
  qs.forEach((q) => (byYear[q.year] += q.marks));
  const marks = qs.reduce((a, q) => a + q.marks, 0);
  return {
    subject: s.name,
    marks,
    count: qs.length,
    byYear,
    avgMarks: Math.round((marks / YEARS.length) * 10) / 10,
    topics: topicStats.filter((t) => t.subject === s.name).sort((a, b) => b.score - a.score),
  };
}).sort((a, b) => b.marks - a.marks);

export const unmatched = questions.filter((q) => {
  const s = subjectByName(q.subject);
  return !s || !s.topics.includes(q.topic);
});

export const totals = {
  questions: questions.length,
  marks: questions.reduce((a, q) => a + q.marks, 0),
  unverified: questions.filter((q) => !q.verified).length,
  byType: (["MCQ", "MSQ", "NAT"] as const).map((t) => ({
    type: t,
    count: questions.filter((q) => q.type === t).length,
    marks: questions.filter((q) => q.type === t).reduce((a, q) => a + q.marks, 0),
  })),
  byDifficulty: (["easy", "medium", "hard"] as const).map((d) => ({
    d,
    count: questions.filter((q) => q.difficulty === d).length,
  })),
};

export const TIER_STYLE: Record<Tier, string> = {
  "Must do": "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
  Important: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  "Good to know": "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  "Not asked yet": "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
};
