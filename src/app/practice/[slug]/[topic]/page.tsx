import Link from "next/link";
import { notFound } from "next/navigation";
import { asQuestion, practiceFor } from "@/lib/practice";
import { topicFocus } from "@/lib/focus";
import { SUBJECTS, subjectBySlug, topicSlug } from "@/lib/taxonomy";
import PracticeRunner from "@/components/PracticeRunner";
import FocusBadge from "@/components/FocusBadge";

export function generateStaticParams() {
  return SUBJECTS.flatMap((s) => s.topics.map((t) => ({ slug: s.slug, topic: topicSlug(t) })));
}

export default async function PracticeTopicPage({ params }: { params: Promise<{ slug: string; topic: string }> }) {
  const { slug, topic } = await params;
  const s = subjectBySlug(slug);
  if (!s) notFound();
  const idx = s.topics.findIndex((t) => topicSlug(t) === topic);
  if (idx === -1) notFound();
  const name = s.topics[idx];
  const qs = practiceFor(s.name, name).map((p, i) => asQuestion(p, i + 1));
  const { focus } = topicFocus(s.name, name);
  const prev = s.topics[idx - 1];
  const next = s.topics[idx + 1];

  return (
    <div>
      <div className="mb-3 text-sm text-muted">
        <Link href="/practice" className="hover:underline">Practice</Link> /{" "}
        <Link href={`/practice#${slug}`} className="hover:underline">{s.name}</Link>
      </div>
      <h1 className="text-2xl font-bold sm:text-3xl">Practice: {name}</h1>
      <div className="mt-2 mb-6 flex flex-wrap items-center gap-3 text-sm text-muted">
        {focus && <FocusBadge level={focus.level} />}
        <span>{qs.length} questions, easy → GATE level.</span>
        <Link href={`/subjects/${slug}/${topicSlug(name)}`} className="text-accent hover:underline">Read the notes first →</Link>
      </div>
      <div className="mb-6 rounded-xl border border-border bg-card p-4 text-sm">
        <b>How to practise:</b> solve on paper first. If you are stuck for 3–4 minutes, press <i>How to think (hint)</i> and try again. Then check, and always
        read the solution, even when you were right. Re-try the red ones after a few days.
      </div>
      <PracticeRunner questions={qs} />
      <div className="mt-8 flex justify-between gap-4 text-sm">
        {prev ? <Link className="text-accent hover:underline" href={`/practice/${slug}/${topicSlug(prev)}`}>← {prev}</Link> : <span />}
        {next ? <Link className="text-right text-accent hover:underline" href={`/practice/${slug}/${topicSlug(next)}`}>{next} →</Link> : <span />}
      </div>
    </div>
  );
}
