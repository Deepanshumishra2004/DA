import Link from "next/link";
import { YEARS } from "@/lib/taxonomy";
import { Card, PageTitle } from "@/components/ui";

const ORG: Record<number, string> = { 2024: "IISc Bangalore", 2025: "IIT Roorkee", 2026: "IIT Guwahati" };

export default function PapersPage() {
  return (
    <div>
      <PageTitle
        title="Original papers & answer keys"
        sub="The official PDFs. Keep at least one paper unseen and take it as a timed 3-hour mock near the end of your preparation."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {YEARS.map((y) => (
          <Card key={y}>
            <h2 className="text-lg font-semibold">GATE DA {y}</h2>
            <p className="text-xs text-muted">Organised by {ORG[y]}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><a className="text-accent underline" target="_blank" href={`/papers/${y}/GATE_DA_${y}_Question_Paper.pdf`}>Question paper (PDF)</a></li>
              <li><a className="text-accent underline" target="_blank" href={`/papers/${y}/GATE_DA_${y}_Answer_Key.pdf`}>Answer key (PDF)</a></li>
              <li><Link className="text-accent underline" href={`/questions?year=${y}`}>Solve online with solutions →</Link></li>
            </ul>
          </Card>
        ))}
      </div>
      <Card className="mt-6 text-sm">
        <h2 className="font-semibold">Paper pattern (same every year)</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>3 hours, 65 questions, 100 marks. GA: 10 questions (15 marks). DA: 55 questions (85 marks).</li>
          <li>Questions are worth 1 or 2 marks. Types: MCQ (one correct option), MSQ (one or more correct), NAT (type a number).</li>
          <li>Negative marking only on MCQ: −1/3 for a wrong 1-mark answer, −2/3 for a wrong 2-mark answer.</li>
          <li>Only the on-screen virtual calculator is allowed. Practise with it.</li>
        </ul>
      </Card>
    </div>
  );
}
