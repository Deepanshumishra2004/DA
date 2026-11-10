import Link from "next/link";
import { getFormulaSheet } from "@/lib/learn";
import { SUBJECTS } from "@/lib/taxonomy";
import { Card, PageTitle, SubjectDot } from "@/components/ui";

export default function FormulasIndex() {
  const ordered = SUBJECTS.slice().sort((a, b) => (a.phase || 9) - (b.phase || 9));
  return (
    <div>
      <PageTitle
        title="Formula sheets"
        sub="Clean one-page-per-subject revision sheets: each formula, what it means in plain words, when to use it, and a tiny example. Use your browser's Print (Ctrl+P) to save one as a PDF."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {ordered.map((s) => {
          const sheet = getFormulaSheet(s.slug);
          const n = sheet ? Object.keys(sheet.topics).length : 0;
          return (
            <Link key={s.slug} href={`/formulas/${s.slug}`}>
              <Card className="flex items-center gap-3 p-4 transition hover:border-accent">
                <SubjectDot subject={s.name} />
                <span className="font-semibold">{s.name}</span>
                <span className="ml-auto text-xs text-muted">{sheet ? `${n} topics` : "coming soon"}</span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
