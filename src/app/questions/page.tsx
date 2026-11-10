import { Suspense } from "react";
import { questions } from "@/lib/data";
import QuestionBrowser, { type QRow } from "@/components/QuestionBrowser";
import { PageTitle } from "@/components/ui";

function plain(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, " [code] ")
    .replace(/\$\$?([^$]*)\$\$?/g, "$1")
    .replace(/[\\*_#|`>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

export default function QuestionsPage() {
  const rows: QRow[] = questions.map((q) => ({
    id: q.id,
    year: q.year,
    number: q.number,
    type: q.type,
    marks: q.marks,
    subject: q.subject,
    topic: q.topic,
    subtopic: q.subtopic,
    difficulty: q.difficulty,
    preview: plain(q.question),
    verified: q.verified,
  }));
  return (
    <div>
      <PageTitle
        title="All previous-year questions"
        sub="Try each question yourself first, check your answer, then read the solution. Your attempts are saved in this browser."
      />
      <Suspense>
        <QuestionBrowser rows={rows} />
      </Suspense>
    </div>
  );
}
