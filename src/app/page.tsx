import Link from "next/link";
import { questions, subjectStats, topicStats, totals, unmatched } from "@/lib/data";
import { YEARS, subjectByName, topicSlug } from "@/lib/taxonomy";
import Countdown from "@/components/Countdown";
import { Card, PageTitle, Stat, SubjectLink, TierBadge, YearBar, YearLegend } from "@/components/ui";


export default function Home() {
  if (questions.length === 0) {
    return <PageTitle title="No data yet" sub="Run `npm run data` after the question JSON files are generated." />;
  }
  const maxSubject = Math.max(...subjectStats.map((s) => s.marks));
  const ranked = topicStats.filter((t) => t.count > 0).sort((a, b) => b.score - a.score);
  const maxTopic = Math.max(...ranked.map((t) => t.marks));
  const neverAsked = topicStats.filter((t) => t.count === 0 && t.subject !== "General Aptitude");
  const daSubjects = subjectStats.filter((s) => s.subject !== "General Aptitude");
  const daMarks = daSubjects.reduce((a, s) => a + s.marks, 0);
  const top3 = daSubjects.slice(0, 3);
  const top3Share = Math.round((top3.reduce((a, s) => a + s.marks, 0) / daMarks) * 100);
  const mustDo = ranked.filter((t) => t.tier === "Must do");
  const mustDoShare = Math.round((mustDo.reduce((a, t) => a + t.marks, 0) / totals.marks) * 100);

  return (
    <div className="space-y-8">
      <PageTitle
        title="What GATE DA actually asks"
        sub={
          <>
            I took every question from the three DA papers so far ({YEARS.join(", ")}), tagged each one with its syllabus
            topic, and added up the marks. Use this page to decide <b>what to study first</b>. Then go to the{" "}
            <Link className="text-accent underline" href="/roadmap">roadmap</Link>.
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Days to exam window" value={<Countdown />} sub="GATE 2027 starts 6 Feb 2027" />
        <Stat label="Questions analysed" value={totals.questions} sub={`${YEARS.length} papers × 65`} />
        <Stat label="Marks analysed" value={totals.marks} sub="100 per paper" />
        <Stat label="Topics never asked" value={neverAsked.length} sub="of the syllabus topics" />
      </div>

      <Card>
        <h2 className="text-lg font-semibold">Key takeaways</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
          <li>
            Every paper has <b>15 marks of General Aptitude</b> (10 questions) and <b>85 marks of DA subjects</b>.
          </li>
          <li>
            The top 3 subjects (
            {top3.map((s, i) => (
              <span key={s.subject}>
                {i > 0 && ", "}
                <b>{s.subject}</b> ≈{s.avgMarks}/paper
              </span>
            ))}
            ) give <b>{top3Share}%</b> of the DA-section marks.
          </li>
          <li>
            The <b>{mustDo.length} &quot;Must do&quot; topics</b> alone account for <b>{mustDoShare}%</b> of all marks asked so far.
          </li>
          <li>
            Question types: {totals.byType.map((t) => `${t.type} ${t.count} (${t.marks} marks)`).join(" · ")}. Only MCQs carry
            negative marking (−1/3 on 1-mark, −2/3 on 2-mark questions). MSQ and NAT questions lose nothing when wrong.
          </li>
          <li>
            Only 3 papers exist so far, so treat this as a guide, not a rule. Prepare the whole syllabus, but{" "}
            <b>go deep where the marks are</b>.
          </li>
        </ul>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Marks by subject</h2>
          <YearLegend />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="text-left text-xs text-muted">
              <tr>
                <th className="py-2 pr-3 font-medium">Subject</th>
                <th className="py-2 pr-3 font-medium">Total ({YEARS.length} yrs)</th>
                {YEARS.map((y) => (
                  <th key={y} className="py-2 pr-3 text-right font-medium">{y}</th>
                ))}
                <th className="py-2 text-right font-medium">Avg / paper</th>
              </tr>
            </thead>
            <tbody>
              {subjectStats.map((s) => (
                <tr key={s.subject} className="border-t border-border">
                  <td className="py-2.5 pr-3 whitespace-nowrap"><SubjectLink subject={s.subject} /></td>
                  <td className="w-[35%] py-2.5 pr-3">
                    <div className="flex items-center gap-2">
                      <YearBar byYear={s.byYear} max={maxSubject} />
                      <span className="w-8 text-right tabular-nums">{s.marks}</span>
                    </div>
                  </td>
                  {YEARS.map((y) => (
                    <td key={y} className="py-2.5 pr-3 text-right tabular-nums text-muted">{s.byYear[y]}</td>
                  ))}
                  <td className="py-2.5 text-right font-semibold tabular-nums">{s.avgMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Topic priority ranking</h2>
          <YearLegend />
        </div>
        <p className="mt-1 text-sm text-muted">
          How the score works: marks asked, with recent years counting a little more (2024 ×1, 2025 ×1.25, 2026 ×1.5), plus a
          bonus for each year the topic appeared.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs text-muted">
              <tr>
                <th className="py-2 pr-2 font-medium">#</th>
                <th className="py-2 pr-3 font-medium">Topic</th>
                <th className="py-2 pr-3 font-medium">Priority</th>
                <th className="py-2 pr-3 font-medium">Marks</th>
                <th className="py-2 pr-3 text-right font-medium">Qs</th>
                <th className="py-2 text-right font-medium">Years</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((t, i) => (
                <tr key={t.subject + t.topic} className="border-t border-border">
                  <td className="py-2 pr-2 text-muted tabular-nums">{i + 1}</td>
                  <td className="py-2 pr-3">
                    <Link href={`/subjects/${subjectByName(t.subject)?.slug}/${topicSlug(t.topic)}`} className="hover:underline">
                      {t.topic}
                    </Link>
                    <div className="text-xs text-muted">{t.subject}</div>
                  </td>
                  <td className="py-2 pr-3"><TierBadge tier={t.tier} /></td>
                  <td className="w-[28%] py-2 pr-3">
                    <div className="flex items-center gap-2">
                      <YearBar byYear={t.byYear} max={maxTopic} />
                      <span className="w-6 text-right tabular-nums">{t.marks}</span>
                    </div>
                  </td>
                  <td className="py-2 pr-3 text-right tabular-nums">{t.count}</td>
                  <td className="py-2 text-right tabular-nums">{t.yearsAsked}/3</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Syllabus topics never asked (yet)</h2>
        <p className="mt-1 text-sm text-muted">
          These are still in the syllabus and could appear. Learn the basics, but put them after everything above.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {neverAsked.map((t) => (
            <span key={t.topic} className="rounded-full border border-border px-2.5 py-1 text-xs">
              {t.topic} <span className="text-muted">· {subjectByName(t.subject)?.short}</span>
            </span>
          ))}
        </div>
      </Card>

      {unmatched.length > 0 && (
        <Card className="border-amber-400">
          <h2 className="font-semibold">Data warning</h2>
          <p className="text-sm text-muted">
            {unmatched.length} questions have a subject/topic outside the taxonomy:{" "}
            {unmatched.map((q) => q.id).join(", ")}
          </p>
        </Card>
      )}
    </div>
  );
}
