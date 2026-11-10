import Link from "next/link";
import { TIER_STYLE, type Tier } from "@/lib/data";
import { YEARS, subjectByName } from "@/lib/taxonomy";

export function Card({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`rounded-xl border border-border bg-card p-5 ${className}`}>{children}</div>;
}

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${TIER_STYLE[tier]}`}>
      {tier}
    </span>
  );
}

export function SubjectDot({ subject }: { subject: string }) {
  const s = subjectByName(subject);
  return (
    <span
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
      style={{ background: s ? `var(${s.color})` : "var(--muted)" }}
    />
  );
}

export function SubjectLink({ subject }: { subject: string }) {
  const s = subjectByName(subject);
  if (!s) return <span>{subject}</span>;
  return (
    <Link href={`/subjects/${s.slug}`} className="inline-flex items-center gap-1.5 hover:underline">
      <SubjectDot subject={subject} />
      {subject}
    </Link>
  );
}

/** Horizontal bar split into one segment per year. */
export function YearBar({ byYear, max }: { byYear: Record<number, number>; max: number }) {
  const total = YEARS.reduce((a, y) => a + (byYear[y] ?? 0), 0);
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-border/60" title={YEARS.map((y) => `${y}: ${byYear[y] ?? 0}`).join("  ")}>
      {YEARS.map((y) => (
        <div
          key={y}
          style={{ width: `${max ? ((byYear[y] ?? 0) / max) * 100 : 0}%`, background: `var(--y${y})` }}
        />
      ))}
      <span className="sr-only">{total} marks</span>
    </div>
  );
}

export function YearLegend() {
  return (
    <div className="flex gap-3 text-xs text-muted">
      {YEARS.map((y) => (
        <span key={y} className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: `var(--y${y})` }} />
          {y}
        </span>
      ))}
    </div>
  );
}

export function Stat({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </Card>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      {sub && <p className="mt-2 max-w-3xl text-muted">{sub}</p>}
    </div>
  );
}
