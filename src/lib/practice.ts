import practiceJson from "@/data/practice.json";
import type { Question } from "./data";

export type PracticeQ = {
  id: string;
  subject: string;
  topic: string;
  level: "easy" | "medium" | "gate";
  type: "MCQ" | "MSQ" | "NAT";
  marks: number;
  question: string;
  options: { label: string; text: string }[] | null;
  answer: string;
  hint: string;
  solution: string;
  concepts: string[];
  checkedBy?: string;
};

export const practice: PracticeQ[] = practiceJson as PracticeQ[];

const LEVEL_ORDER = { easy: 0, medium: 1, gate: 2 } as const;

export function practiceFor(subject: string, topic: string) {
  return practice
    .filter((q) => q.subject === subject && q.topic === topic)
    .sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
}

export function practiceCount(subject: string, topic?: string) {
  return practice.filter((q) => q.subject === subject && (!topic || q.topic === topic)).length;
}

/** Shape a practice question like a past-paper Question so the same QuestionView can render it. */
export function asQuestion(p: PracticeQ, n: number): Question {
  return {
    id: p.id,
    year: 0,
    number: n,
    page: 0,
    section: p.subject === "General Aptitude" ? "GA" : "DA",
    type: p.type,
    marks: p.marks,
    question: p.question,
    options: p.options,
    hasFigure: false,
    figureNote: null,
    answer: p.answer,
    subject: p.subject,
    topic: p.topic,
    subtopic: p.level,
    concepts: p.concepts ?? [],
    difficulty: p.level === "gate" ? "hard" : p.level,
    keyIdea: "",
    solution: p.solution,
    verified: true,
    notes: null,
    intuition: p.hint,
    formulasUsed: null,
  };
}
