import Link from "next/link";
import { notFound } from "next/navigation";
import { subjectStats } from "@/lib/data";
import { FOCUS_INFO, FOCUS_ORDER, subjectFocus } from "@/lib/focus";
import { bigIdea, getLearnNotes } from "@/lib/learn";
import { SUBJECTS, YEARS, subjectBySlug, topicSlug } from "@/lib/taxonomy";
import Markdown from "@/components/Markdown";
import TopicCheck from "@/components/TopicCheck";
import FocusBadge from "@/components/FocusBadge";
import { practiceCount } from "@/lib/practice";
import { Card, PageTitle, YearBar, YearLegend } from "@/components/ui";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ slug: s.slug }));
}

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = subjectBySlug(slug);
  if (!s) notFound();
  const st = subjectStats.find((x) => x.subject === s.name)!;
  const notes = getLearnNotes(slug);
  const { topics: focus, weeks } = subjectFocus(s.name);
  const maxT = Math.max(1, ...focus.map((t) => t.marks));
  // Study order = taxonomy order (concepts build on each other); focus level shown as badge.
  const ordered = s.topics.map((name) => focus.find((t) => t.topic === name)!);
  const isGA = s.name === "General Aptitude";

  return (
    <div>
      <PageTitle title={s.name} sub={s.why} />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="p-4"><div className="text-xs text-muted">Avg marks / paper</div><div className="text-2xl font-bold">{st.avgMarks}</div></Card>
        {YEARS.map((y) => (
          <Card key={y} className="p-4"><div className="text-xs text-muted">{y}</div><div className="text-2xl font-bold">{st.byYear[y]} <span className="text-sm font-normal text-muted">marks</span></div></Card>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        <a href="#focus" className="rounded-lg border border-border bg-card px-3 py-1.5 hover:border-accent">Focus plan ↓</a>
        <a href="#topics" className="rounded-lg border border-border bg-card px-3 py-1.5 hover:border-accent">Topics in study order ↓</a>
        <Link href={`/formulas/${slug}`} className="rounded-lg border border-border bg-card px-3 py-1.5 hover:border-accent">Formula sheet →</Link>
        <Link href={`/questions?subject=${encodeURIComponent(s.name)}`} className="rounded-lg border border-border bg-card px-3 py-1.5 hover:border-accent">All {st.count} past questions →</Link>
      </div>

      {notes?.intro && (
        <Card className="mb-8"><Markdown>{notes.intro}</Markdown></Card>
      )}

      {/* ---------- Focus plan ---------- */}
      <section id="focus" className="mb-10 scroll-mt-20">
        <h2 className="text-xl font-bold">Focus plan: where to spend your time</h2>
        <p className="mt-1 mb-4 max-w-3xl text-sm text-muted">
          The topics of this subject are grouped by how many marks they brought in 2024–2026 (recent years count a little more).
          {weeks && !isGA ? (
            <> The roadmap gives {s.name} <b>{weeks} week{weeks > 1 ? "s" : ""}</b> (about {weeks * 6} study days). The time shares below split those days.</>
          ) : isGA ? (
            <> Aptitude has no fixed weeks in the roadmap: practise about 30 minutes a day, split as shown.</>
          ) : null}
        </p>

        <div className="space-y-4">
          {FOCUS_ORDER.map((level) => {
            const group = focus.filter((t) => t.level === level);
            if (group.length === 0) return null;
            const info = FOCUS_INFO[level];
            const groupTime = group.reduce((a, t) => a + t.timePct, 0);
            const groupMarks = group.reduce((a, t) => a + t.marks, 0);
            return (
              <Card key={level} className="overflow-hidden p-0">
                <div className="border-l-4 p-5" style={{ borderLeftColor: info.dot }}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <FocusBadge level={level} />
                    <span className="text-sm font-medium">{info.short}</span>
                    <span className="ml-auto text-xs text-muted">
                      {level !== "Basics only" && `${groupMarks} marks · `}≈{groupTime}% of your time
                    </span>
                  </div>

                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[520px] text-sm">
                      <thead className="text-left text-xs text-muted">
                        <tr>
                          <th className="py-1.5 pr-3 font-medium">Topic</th>
                          <th className="py-1.5 pr-3 text-right font-medium">Past marks</th>
                          <th className="py-1.5 pr-3 text-right font-medium">Asked in</th>
                          <th className="py-1.5 pr-3 text-right font-medium">Time share</th>
                          {weeks && !isGA && <th className="py-1.5 text-right font-medium">≈ Days</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {group.map((t) => (
                          <tr key={t.topic} className="border-t border-border">
                            <td className="py-2 pr-3">
                              <Link href={`/subjects/${slug}/${topicSlug(t.topic)}`} className="hover:underline">{t.topic}</Link>
                            </td>
                            <td className="py-2 pr-3 text-right tabular-nums">
                              {t.marks}{t.marks > 0 && <span className="text-xs text-muted"> ({t.marksShare}%)</span>}
                            </td>
                            <td className="py-2 pr-3 text-right tabular-nums text-muted">{t.yearsAsked}/3 yrs</td>
                            <td className="py-2 pr-3 text-right">
                              <span className="inline-flex items-center gap-2">
                                <span className="hidden h-2 w-16 overflow-hidden rounded-full bg-border sm:inline-block">
                                  <span className="block h-full" style={{ width: `${Math.min(100, t.timePct * 2.5)}%`, background: info.dot }} />
                                </span>
                                <span className="w-9 tabular-nums">{t.timePct}%</span>
                              </span>
                            </td>
                            {weeks && !isGA && <td className="py-2 text-right tabular-nums">{t.days}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-3 text-sm">
                    <div className="mb-1 text-xs font-semibold text-muted">HOW DEEP TO GO</div>
                    <ul className="list-disc space-y-0.5 pl-5">
                      {info.depth.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted">
          How the levels are set: topics are sorted by marks. Those that make up the first half of this subject&apos;s marks are
          High focus, the next ~35% are Medium, and the rest are Low. A topic that is a top topic across the whole paper is always
          High. Never-asked topics are Basics only. Only 3 papers exist, so a Low topic can still appear. Never skip a topic
          completely.
        </p>
      </section>

      {/* ---------- Topics in study order ---------- */}
      <section id="topics" className="scroll-mt-20">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold">Topics in study order</h2>
          <YearLegend />
        </div>
        <p className="mb-4 text-sm text-muted">
          Study in this order, because later topics build on earlier ones. Use the focus badge to decide how deep to go in each.
        </p>
        <div className="space-y-3">
          {ordered.map((t, i) => {
            const idea = bigIdea(notes?.topics[t.topic]);
            return (
              <Card key={t.topic} className="p-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-sm text-muted tabular-nums">{i + 1}.</span>
                  <Link href={`/subjects/${slug}/${topicSlug(t.topic)}`} className="font-semibold hover:underline">{t.topic}</Link>
                  <FocusBadge level={t.level} />
                  <span className="ml-auto flex w-full items-center gap-2 sm:w-48">
                    <YearBar byYear={t.byYear} max={maxT} />
                    <span className="w-16 shrink-0 text-right text-xs tabular-nums text-muted">{t.marks}m · {t.count}q</span>
                  </span>
                </div>
                {idea && <Markdown className="mt-2 text-sm text-muted">{idea}</Markdown>}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <TopicCheck id={`${t.subject}::${t.topic}`} label={<span className="text-xs text-muted">Mark as done</span>} />
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-muted">≈{t.timePct}% of time{weeks && !isGA ? ` · ${t.days} days` : ""}</span>
                    {practiceCount(s.name, t.topic) > 0 && (
                      <Link href={`/practice/${slug}/${topicSlug(t.topic)}`} className="hover:underline">Practice ({practiceCount(s.name, t.topic)}) →</Link>
                    )}
                    <Link href={`/subjects/${slug}/${topicSlug(t.topic)}`} className="text-accent hover:underline">Learn this topic →</Link>
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
