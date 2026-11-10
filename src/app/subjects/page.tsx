import Link from "next/link";
import { subjectStats } from "@/lib/data";
import { SUBJECTS } from "@/lib/taxonomy";
import { Card, PageTitle, SubjectDot } from "@/components/ui";

export default function SubjectsPage() {
  const ordered = SUBJECTS.slice().sort((a, b) => (a.phase || 9) - (b.phase || 9));
  return (
    <div>
      <PageTitle
        title="Learn by subject"
        sub="Each subject page lists its topics in priority order. For every topic you get short beginner notes, the formulas, and all the past questions on it."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {ordered.map((s) => {
          const st = subjectStats.find((x) => x.subject === s.name)!;
          const asked = st.topics.filter((t) => t.count > 0).length;
          return (
            <Link key={s.slug} href={`/subjects/${s.slug}`}>
              <Card className="h-full transition hover:border-accent">
                <div className="flex items-center gap-2">
                  <SubjectDot subject={s.name} />
                  <h2 className="font-semibold">{s.name}</h2>
                  <span className="ml-auto text-sm font-semibold tabular-nums">{st.avgMarks}<span className="text-xs font-normal text-muted"> /paper</span></span>
                </div>
                <p className="mt-2 text-sm text-muted">{s.why}</p>
                <div className="mt-3 text-xs text-muted">
                  {st.count} past questions · {asked}/{s.topics.length} topics asked
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
