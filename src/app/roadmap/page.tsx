import Link from "next/link";
import { buildPlan } from "@/lib/plan";
import { questions } from "@/lib/data";
import { subjectByName, topicSlug } from "@/lib/taxonomy";
import TopicCheck from "@/components/TopicCheck";
import { Card, PageTitle, SubjectDot, TierBadge } from "@/components/ui";

export default function RoadmapPage() {
  if (questions.length === 0) return <PageTitle title="No data yet" />;
  const plan = buildPlan();
  return (
    <div>
      <PageTitle
        title="13-week roadmap to GATE DA 2027"
        sub={
          <>
            Runs from 9 Nov 2026 to the exam window starting 6 Feb 2027. Each subject gets weeks in proportion to the marks it
            carried in past papers. Subjects come in dependency order: maths first, because Machine Learning and AI build on it.
            Inside each subject, the highest-priority topics come first. Tick topics off as you go; ticks are saved in this browser.
          </>
        }
      />

      <Card className="mb-6 text-sm">
        <h2 className="font-semibold">How to study each topic (the loop)</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li><b>Learn:</b> read the topic notes on its Learn page (5–15 min) and watch a lecture if it is still unclear.</li>
          <li><b>Try:</b> open each past question on that topic and attempt it before looking at anything.</li>
          <li><b>Understand:</b> read the worked solution, even if you got it right. Note the &quot;key idea&quot;.</li>
          <li><b>Practise more:</b> GATE CS papers since 2000 share Prob, LA, Calculus, DSA and DBMS topics. Use them for extra questions.</li>
          <li><b>Revise:</b> add the formula to your notebook. Re-attempt questions you got wrong after 1 week.</li>
        </ol>
      </Card>

      <div className="relative space-y-4 border-l-2 border-border pl-6">
        {plan.map((w) => {
          const s = w.subject ? subjectByName(w.subject) : undefined;
          return (
            <div key={w.week} className="relative">
              <span
                className="absolute top-5 -left-[33px] h-4 w-4 rounded-full border-2 border-background"
                style={{ background: s ? `var(${s.color})` : "var(--accent)" }}
              />
              <Card>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xs font-semibold text-muted">WEEK {w.week} · from {new Date(w.start).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  <h2 className="flex items-center gap-2 font-semibold">
                    {w.subject && <SubjectDot subject={w.subject} />}
                    {s ? <Link href={`/subjects/${s.slug}`} className="hover:underline">{w.title}</Link> : w.title}
                  </h2>
                </div>
                {w.topics.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {w.topics.map((t) => (
                      <li key={t.topic} className="flex flex-wrap items-center justify-between gap-2">
                        <TopicCheck
                          id={`${t.subject}::${t.topic}`}
                          label={
                            <Link href={`/subjects/${s?.slug}/${topicSlug(t.topic)}`} className="hover:underline">
                              {t.topic}
                            </Link>
                          }
                        />
                        <span className="flex items-center gap-2 text-xs text-muted">
                          {t.count > 0 ? `${t.count} PYQs` : "no PYQs"}
                          <TierBadge tier={t.tier} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-3 list-disc space-y-0.5 pl-5 text-xs text-muted">
                  {w.tasks.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
