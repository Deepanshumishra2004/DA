import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestion, questions, topicStats } from "@/lib/data";
import { subjectByName, topicSlug } from "@/lib/taxonomy";
import QuestionView from "@/components/QuestionView";
import Markdown from "@/components/Markdown";
import { SubjectLink, TierBadge } from "@/components/ui";

// Only the pre-rendered pages exist; unknown params 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return questions.map((q) => ({ id: q.id }));
}

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const q = getQuestion(id);
  if (!q) notFound();
  const idx = questions.findIndex((x) => x.id === q.id);
  const prev = questions[idx - 1];
  const next = questions[idx + 1];
  const ts = topicStats.find((t) => t.subject === q.subject && t.topic === q.topic);
  const related = questions.filter((x) => x.topic === q.topic && x.id !== q.id);
  const slug = subjectByName(q.subject)?.slug;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <Link href="/questions" className="text-muted hover:underline">← All questions</Link>
        </div>
        <h1 className="text-xl font-bold">
          GATE DA {q.year} · Q.{q.number}
        </h1>
        <div className="mt-2 mb-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-border px-2 py-0.5">{q.type}</span>
          <span className="rounded-full border border-border px-2 py-0.5">{q.marks} mark{q.marks > 1 ? "s" : ""}</span>
          <span className="rounded-full border border-border px-2 py-0.5 capitalize">{q.difficulty}</span>
          {q.type === "MCQ" && (
            <span className="rounded-full border border-border px-2 py-0.5">−{q.marks === 1 ? "1/3" : "2/3"} if wrong</span>
          )}
        </div>
        <QuestionView key={q.id} q={q} />
        <div className="mt-6 flex justify-between text-sm">
          {prev ? <Link className="text-accent hover:underline" href={`/questions/${prev.id}`}>← {prev.year} Q.{prev.number}</Link> : <span />}
          {next ? <Link className="text-accent hover:underline" href={`/questions/${next.id}`}>{next.year} Q.{next.number} →</Link> : <span />}
        </div>
      </div>

      <aside className="space-y-4 text-sm">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-xs text-muted">Subject</div>
          <SubjectLink subject={q.subject} />
          <div className="mt-3 text-xs text-muted">Topic</div>
          <Link href={`/subjects/${slug}/${topicSlug(q.topic)}`} className="hover:underline">{q.topic}</Link>
          {ts && (
            <div className="mt-2 flex items-center gap-2">
              <TierBadge tier={ts.tier} />
              <span className="text-xs text-muted">{ts.marks} marks · {ts.yearsAsked}/3 yrs</span>
            </div>
          )}
          <div className="mt-3 text-xs text-muted">Sub-topic</div>
          <div>{q.subtopic}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 text-xs font-semibold text-muted">CONCEPTS TO KNOW</div>
          <ul className="list-disc space-y-1 pl-4">
            {q.concepts.map((c) => <li key={c}><Markdown className="[&_p]:m-0">{c}</Markdown></li>)}
          </ul>
        </div>
        {related.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-2 text-xs font-semibold text-muted">SAME TOPIC, OTHER QUESTIONS</div>
            <ul className="space-y-1">
              {related.map((r) => (
                <li key={r.id}>
                  <Link className="text-accent hover:underline" href={`/questions/${r.id}`}>{r.year} Q.{r.number}</Link>{" "}
                  <span className="text-xs text-muted">{r.subtopic}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
