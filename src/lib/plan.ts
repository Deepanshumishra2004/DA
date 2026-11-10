import { subjectStats, type TopicStat } from "./data";
import { SUBJECTS, subjectByName } from "./taxonomy";

export type Week = {
  week: number;
  start: string; // ISO date
  title: string;
  subject?: string;
  topics: TopicStat[];
  tasks: string[];
};

const START = new Date("2026-11-09T00:00:00Z"); // Monday (UTC so ISO date strings don't shift)
const STUDY_WEEKS = 11; // weeks 12-13: full mocks + revision before 6 Feb 2027

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x.toISOString().slice(0, 10);
}

/** Weeks per subject ∝ average marks, at least 1, total = STUDY_WEEKS. Order = dependency phase, then marks. */
export function allocate() {
  const subs = subjectStats
    .filter((s) => s.subject !== "General Aptitude")
    .map((s) => ({ ...s, phase: subjectByName(s.subject)!.phase }))
    .sort((a, b) => a.phase - b.phase || b.marks - a.marks);
  const total = subs.reduce((a, s) => a + s.marks, 0) || 1;
  const raw = subs.map((s) => Math.max(1, (s.marks / total) * STUDY_WEEKS));
  const weeks = raw.map((r) => Math.max(1, Math.floor(r)));
  let left = STUDY_WEEKS - weeks.reduce((a, b) => a + b, 0);
  const order = raw.map((r, i) => ({ i, frac: r - Math.floor(r) })).sort((a, b) => b.frac - a.frac);
  for (let k = 0; left > 0; k++, left--) weeks[order[k % order.length].i]++;
  while (weeks.reduce((a, b) => a + b, 0) > STUDY_WEEKS) {
    const i = weeks.indexOf(Math.max(...weeks));
    weeks[i]--;
  }
  return subs.map((s, i) => ({ subject: s.subject, weeks: weeks[i], topics: s.topics }));
}

export function buildPlan(): Week[] {
  const plan: Week[] = [];
  let w = 0;
  for (const a of allocate()) {
    // asked topics first (by priority), never-asked topics last
    const ts = [...a.topics.filter((t) => t.count > 0), ...a.topics.filter((t) => t.count === 0)];
    const per = Math.ceil(ts.length / a.weeks);
    for (let k = 0; k < a.weeks; k++) {
      const chunk = ts.slice(k * per, (k + 1) * per);
      plan.push({
        week: w + 1,
        start: addDays(START, w * 7),
        title: a.weeks > 1 ? `${a.subject} (part ${k + 1}/${a.weeks})` : a.subject,
        subject: a.subject,
        topics: chunk,
        tasks: [
          "Read the notes for each topic on the Learn page. Write the formulas into your own notebook.",
          "Watch one lecture on any topic that still feels unclear (NPTEL or a coaching YouTube playlist).",
          "Solve every past GATE DA question on these topics without looking at the solution, then check.",
          "Also solve GATE CS questions on the same topics; there are 20+ years of them (good for Prog, DBMS, Prob, LA).",
          "10 GA questions spread over the week (≈30 min/day).",
        ],
      });
      w++;
    }
  }
  plan.push({
    week: w + 1,
    start: addDays(START, w * 7),
    title: "Full mock tests: 2024 & 2025 papers",
    topics: [],
    tasks: [
      "Sit the 2024 paper as a timed 3-hour exam (use the virtual calculator only). Score it with the official key.",
      "Two days later, do the same with the 2025 paper.",
      "List every mistake and its topic, then re-read those topics' notes.",
      "Take the official GATE mock test on the GATE 2027 site to get used to the interface.",
    ],
  });
  w++;
  plan.push({
    week: w + 1,
    start: addDays(START, w * 7),
    title: "Final mock (2026 paper) + revision",
    topics: [],
    tasks: [
      "Sit the 2026 paper timed. It is the closest in style to 2027.",
      "Revise all 'Must do' topics from your formula notebook.",
      "Light review only in the last 2 days. Sleep well.",
    ],
  });
  return plan;
}

export const GA_SUBJECT = SUBJECTS.find((s) => s.name === "General Aptitude")!;
