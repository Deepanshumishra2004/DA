import Link from "next/link";
import { notFound } from "next/navigation";
import { questions, topicStats } from "@/lib/data";
import { getFormulaSheet, getLearnNotes, splitSubsections, subHeadings } from "@/lib/learn";
import { sectionStyle } from "@/lib/sections";
import FormulaEntries from "@/components/FormulaEntries";
import WalkthroughSection, { hasWalkthroughs } from "@/components/diagrams/WalkthroughSection";
import { practiceCount } from "@/lib/practice";
import { Fragment } from "react";
import { SUBJECTS, subjectBySlug, topicSlug } from "@/lib/taxonomy";
import Markdown, { headingId } from "@/components/Markdown";
import TopicCheck from "@/components/TopicCheck";
import FocusBadge from "@/components/FocusBadge";
import { FOCUS_INFO, subjectFocus, topicFocus } from "@/lib/focus";
import { Card } from "@/components/ui";

export function generateStaticParams() {
  return SUBJECTS.flatMap((s) => s.topics.map((t) => ({ slug: s.slug, topic: topicSlug(t) })));
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string; topic: string }> }) {
  const { slug, topic } = await params;
  const s = subjectBySlug(slug);
  if (!s) notFound();
  const idx = s.topics.findIndex((t) => topicSlug(t) === topic);
  if (idx === -1) notFound();
  const name = s.topics[idx];
  const ts = topicStats.find((t) => t.subject === s.name && t.topic === name)!;
  const notes = getLearnNotes(slug)?.topics[name];
  const formulas = getFormulaSheet(slug)?.topics[name];
  const qs = questions.filter((q) => q.subject === s.name && q.topic === name);
  const toc = notes ? subHeadings(notes) : [];
  const { focus, weeks } = topicFocus(s.name, name);
  const allFocus = subjectFocus(s.name).topics;
  const nPractice = practiceCount(s.name, name);
  const prev = s.topics[idx - 1];
  const next = s.topics[idx + 1];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
      <article className="min-w-0">
        <div className="mb-3 text-sm text-muted">
          <Link href="/subjects" className="hover:underline">Learn</Link> /{" "}
          <Link href={`/subjects/${slug}`} className="hover:underline">{s.name}</Link>
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">{name}</h1>
        <div className="mt-2 mb-4 flex flex-wrap items-center gap-3 text-sm">
          {focus && <FocusBadge level={focus.level} />}
          <span className="text-muted">
            {ts.count > 0 ? `${ts.marks} marks from ${ts.count} questions, asked in ${ts.yearsAsked} of 3 papers` : "Not asked in 2024–2026 (still in syllabus)"}
          </span>
          <TopicCheck id={`${s.name}::${name}`} label={<span className="text-muted">Done</span>} />
        </div>

        {focus && (
          <div className="mb-8 rounded-xl border border-border border-l-4 bg-card p-4 text-sm" style={{ borderLeftColor: FOCUS_INFO[focus.level].dot }}>
            <div className="font-semibold">{FOCUS_INFO[focus.level].short}</div>
            <div className="mt-1 text-muted">
              {focus.marksShare > 0 && <>This topic gave <b className="text-foreground">{focus.marksShare}%</b> of the marks in {s.name}. </>}
              Spend about <b className="text-foreground">{focus.timePct}%</b> of your {s.short} time here
              {focus.days && weeks && s.name !== "General Aptitude" ? <> (≈ <b className="text-foreground">{focus.days} day{focus.days === 1 ? "" : "s"}</b> of the {weeks}-week plan)</> : null}.
            </div>
            <ul className="mt-2 list-disc space-y-0.5 pl-5">
              {FOCUS_INFO[focus.level].depth.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <Link href={`/subjects/${slug}#focus`} className="mt-2 inline-block text-xs text-accent hover:underline">See the whole {s.short} focus plan →</Link>
          </div>
        )}

        {notes ? (
          <div className="space-y-6">
            {splitSubsections(notes).map((sec, i) => {
              const st = sectionStyle(sec.title);
              const isCheck = !!sec.title && /self-check/i.test(sec.title);
              const afterIntuition = !!sec.title && /^intuition$/i.test(sec.title);
              return (
                <Fragment key={i}>
                <section
                  id={sec.title ? headingId(sec.title) : undefined}
                  className="note-section scroll-mt-20 overflow-hidden rounded-2xl border border-border bg-card"
                >
                  {sec.title && (
                    <div
                      className="flex items-center gap-3 border-b border-border px-5 py-3 sm:px-7"
                      style={{ background: `color-mix(in srgb, ${st.color} 9%, transparent)` }}
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white"
                        style={{ background: st.color }}
                      >
                        {st.icon}
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-lg leading-tight font-bold" style={{ color: st.color }}>{sec.title}</h2>
                        {st.hint && <div className="text-xs text-muted">{st.hint}</div>}
                      </div>
                    </div>
                  )}
                  <div className="px-5 py-5 sm:px-7 sm:py-6">
                    <Markdown hideAnswers={isCheck}>{sec.body}</Markdown>
                  </div>
                </section>
                {afterIntuition && <WalkthroughSection topic={name} />}
                </Fragment>
              );
            })}
          </div>
        ) : (
          <p className="text-muted">Notes coming soon.</p>
        )}

        {formulas && (
          <Card className="formula-sheet mt-10 scroll-mt-20" id="topic-formulas">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Formula sheet: this topic</h2>
              <Link href={`/formulas/${slug}#${headingId(name)}`} className="text-sm text-accent hover:underline">Full sheet →</Link>
            </div>
            <FormulaEntries md={formulas} color={`var(${s.color})`} />
          </Card>
        )}

        <Card className="mt-6 border-accent/40">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <h2 className="text-lg font-semibold">Practise this topic</h2>
              <p className="text-sm text-muted">
                {nPractice > 0 ? `${nPractice} new questions, easy → GATE level, each with a hint and a full solution.` : "Practice questions for this topic are being written."}
              </p>
            </div>
            {nPractice > 0 && (
              <Link href={`/practice/${slug}/${topicSlug(name)}`} className="ml-auto rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
                Start practice →
              </Link>
            )}
          </div>
        </Card>

        <Card className="mt-6">
          <h2 className="text-lg font-semibold">Real past GATE questions</h2>
          {qs.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No past DA question on this topic yet. Use the self-check above, and GATE CS papers for extra practice.</p>
          ) : (
            <>
              <p className="mt-1 text-sm text-muted">Try each one yourself first. Press &quot;How to think&quot; if you are stuck, then read the solution.</p>
              <ul className="mt-3 space-y-2">
                {qs.map((q) => (
                  <li key={q.id}>
                    <Link href={`/questions/${q.id}`} className="flex flex-wrap items-baseline gap-x-2 rounded-lg border border-border p-2.5 hover:border-accent">
                      <b>{q.year} Q.{q.number}</b>
                      <span className="text-xs text-muted">{q.type} · {q.marks} mark{q.marks > 1 ? "s" : ""} · {q.difficulty}</span>
                      <span className="text-sm">{q.subtopic}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>

        <div className="mt-6 flex justify-between gap-4 text-sm">
          {prev ? <Link className="text-accent hover:underline" href={`/subjects/${slug}/${topicSlug(prev)}`}>← {prev}</Link> : <span />}
          {next ? <Link className="text-right text-accent hover:underline" href={`/subjects/${slug}/${topicSlug(next)}`}>{next} →</Link> : <span />}
        </div>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-4 text-sm">
          {toc.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-semibold text-muted">ON THIS PAGE</div>
              <ul className="space-y-1.5 border-l border-border pl-3">
                {toc.map((h) => (
                  <li key={h}>
                    <a href={`#${headingId(h)}`} className="flex items-center gap-2 text-muted hover:text-foreground">
                      <span className="w-4 text-center text-xs" style={{ color: sectionStyle(h).color }}>{sectionStyle(h).icon}</span>
                      {h}
                    </a>
                  </li>
                ))}
                {hasWalkthroughs(name) && <li><a href="#watch-it-step-by-step" className="flex items-center gap-2 text-muted hover:text-foreground"><span className="w-4 text-center text-xs" style={{ color: "#0ea5e9" }}>▶</span>Watch it step by step</a></li>}
                {formulas && <li><a href="#topic-formulas" className="text-muted hover:text-foreground">Formula sheet ↓</a></li>}
              </ul>
            </div>
          )}
          <div>
            <div className="mb-2 text-xs font-semibold text-muted">{s.short.toUpperCase()} TOPICS</div>
            <ul className="space-y-1">
              {s.topics.map((t) => {
                const lv = allFocus.find((f) => f.topic === t)?.level;
                return (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: lv ? FOCUS_INFO[lv].dot : "var(--muted)" }} title={lv} />
                    <Link href={`/subjects/${slug}/${topicSlug(t)}`} className={t === name ? "font-semibold" : "text-muted hover:text-foreground"}>{t}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
