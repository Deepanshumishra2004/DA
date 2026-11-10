import Link from "next/link";
import { notFound } from "next/navigation";
import { getFormulaSheet } from "@/lib/learn";
import { SUBJECTS, subjectBySlug, topicSlug } from "@/lib/taxonomy";
import Markdown, { headingId } from "@/components/Markdown";
import PrintButton from "@/components/PrintButton";
import FormulaEntries from "@/components/FormulaEntries";
import { Card } from "@/components/ui";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ slug: s.slug }));
}

export default async function FormulaSheetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = subjectBySlug(slug);
  if (!s) notFound();
  const sheet = getFormulaSheet(slug);
  const topics = s.topics.filter((t) => sheet?.topics[t]);

  return (
    <div className="formula-sheet">
      <div className="no-print mb-4 flex flex-wrap items-center gap-2 text-sm">
        <Link href="/formulas" className="text-muted hover:underline">← All formula sheets</Link>
        <span className="text-muted">·</span>
        {SUBJECTS.map((x) => (
          <Link key={x.slug} href={`/formulas/${x.slug}`} className={`rounded-md px-2 py-0.5 ${x.slug === slug ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}>{x.short}</Link>
        ))}
      </div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">{s.name}: formula sheet</h1>
        <PrintButton />
      </div>

      {!sheet ? (
        <p className="text-muted">Coming soon.</p>
      ) : (
        <>
          {sheet.intro && <Markdown className="mb-4">{sheet.intro}</Markdown>}
          <nav className="no-print mb-6 flex flex-wrap gap-2 text-xs">
            {topics.map((t) => (
              <a key={t} href={`#${headingId(t)}`} className="rounded-full border border-border px-2.5 py-1 hover:border-accent">{t}</a>
            ))}
          </nav>
          <div className="space-y-4">
            {topics.map((t) => (
              <section key={t} id={headingId(t)} className="scroll-mt-20">
                <Card className="p-4">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold">{t}</h2>
                    <Link href={`/subjects/${slug}/${topicSlug(t)}`} className="no-print text-xs text-accent hover:underline">Learn →</Link>
                  </div>
                  <FormulaEntries md={sheet.topics[t]} color={`var(${s.color})`} />
                </Card>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
