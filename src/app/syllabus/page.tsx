import Link from "next/link";
import { subjectStats } from "@/lib/data";
import { SUBJECTS } from "@/lib/taxonomy";
import { Card, PageTitle, SubjectDot, TierBadge } from "@/components/ui";

export default function SyllabusPage() {
  return (
    <div>
      <PageTitle
        title="GATE DA 2027 syllabus vs. what was asked"
        sub={
          <>
            Official syllabus from IIT Madras, the GATE 2027 organising institute. It is unchanged from 2026. Every topic is shown
            with how often it appeared in 2024–2026.{" "}
            <a href="/papers/DA_GATE2027_Syllabus.pdf" className="text-accent underline" target="_blank">Official DA syllabus PDF</a>{" · "}
            <a href="/papers/GA_GATE2027_Syllabus.pdf" className="text-accent underline" target="_blank">General Aptitude syllabus PDF</a>
          </>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {SUBJECTS.map((s) => {
          const st = subjectStats.find((x) => x.subject === s.name)!;
          return (
            <Card key={s.slug}>
              <Link href={`/subjects/${s.slug}`} className="flex items-center gap-2 font-semibold hover:underline">
                <SubjectDot subject={s.name} /> {s.name}
                <span className="ml-auto text-xs font-normal text-muted">{st.marks} marks / 3 yrs</span>
              </Link>
              <ul className="mt-3 space-y-1.5 text-sm">
                {s.topics.map((t) => {
                  const ts = st.topics.find((x) => x.topic === t)!;
                  return (
                    <li key={t} className="flex items-center justify-between gap-2">
                      <span className={ts.count === 0 ? "text-muted" : ""}>{t}</span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="text-xs tabular-nums text-muted">{ts.marks}m</span>
                        <TierBadge tier={ts.tier} />
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
