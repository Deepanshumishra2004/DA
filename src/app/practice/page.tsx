import Link from "next/link";
import { practiceCount } from "@/lib/practice";
import { subjectFocus, FOCUS_INFO } from "@/lib/focus";
import { SUBJECTS, topicSlug } from "@/lib/taxonomy";
import { Card, PageTitle, SubjectDot } from "@/components/ui";
import PracticeProgress from "@/components/PracticeProgress";
import practiceJson from "@/data/practice.json";

export default function PracticeIndex() {
  const ordered = SUBJECTS.slice().sort((a, b) => (a.phase || 9) - (b.phase || 9));
  const idsByTopic = (subject: string, topic: string) =>
    (practiceJson as { id: string; subject: string; topic: string }[]).filter((q) => q.subject === subject && q.topic === topic).map((q) => q.id);
  const total = (practiceJson as unknown[]).length;
  return (
    <div>
      <PageTitle
        title="Practice bank"
        sub={`${total} new questions written for this app, from easy to GATE level, covering every topic. Each has a hint and a full solution, and computed answers were checked with Python. Topics with more marks have more questions.`}
      />
      <div className="space-y-6">
        {ordered.map((s) => {
          const focus = subjectFocus(s.name).topics;
          return (
            <Card key={s.slug} id={s.slug} className="scroll-mt-20">
              <div className="mb-3 flex items-center gap-2">
                <SubjectDot subject={s.name} />
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <span className="ml-auto text-xs text-muted">{practiceCount(s.name)} questions</span>
              </div>
              <ul className="divide-y divide-border">
                {s.topics.map((t) => {
                  const n = practiceCount(s.name, t);
                  const lv = focus.find((f) => f.topic === t)?.level;
                  return (
                    <li key={t} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2 text-sm">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: lv ? FOCUS_INFO[lv].dot : "var(--muted)" }} title={lv} />
                      {n > 0 ? (
                        <Link href={`/practice/${s.slug}/${topicSlug(t)}`} className="hover:underline">{t}</Link>
                      ) : (
                        <span className="text-muted">{t}</span>
                      )}
                      <span className="ml-auto flex items-center gap-3">
                        {n > 0 && <PracticeProgress ids={idsByTopic(s.name, t)} />}
                        <span className="w-16 text-right text-xs text-muted tabular-nums">{n > 0 ? `${n} Qs` : "coming"}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
