import Markdown from "./Markdown";

/**
 * Formula-sheet topic text is a list of entries, each starting with a bold title on its own line:
 *   **Bayes theorem**
 *   $$...$$
 *   plain words · Use when · e.g.
 * Render each entry as its own card in a 2-column grid; anything else (tables, notes) spans full width.
 */
export function splitEntries(md: string): { title: string | null; body: string }[] {
  const chunks = md.replace(/\r\n/g, "\n").split(/\n(?=\*\*[^*\n]+\*\*[ \t]*\n)/);
  return chunks
    .map((c) => c.trim())
    .filter(Boolean)
    .map((c) => {
      const m = c.match(/^\*\*([^*\n]+)\*\*[ \t]*\n([\s\S]*)$/);
      // "meaning · *Use when:* … · *e.g.* …" → one line each (less cluttered)
      const tidy = (s: string) => s.replace(/[ \t]+·[ \t]+(?=\*[^*]+\*)/g, "\n\n");
      return m ? { title: m[1].trim(), body: tidy(m[2].trim()) } : { title: null, body: c };
    });
}

export default function FormulaEntries({ md, color = "var(--accent)" }: { md: string; color?: string }) {
  const entries = splitEntries(md);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {entries.map((e, i) =>
        e.title ? (
          <div key={i} className="formula-entry rounded-xl border border-border bg-background/60 p-4" style={{ borderTop: `3px solid ${color}` }}>
            <div className="mb-1 text-sm font-semibold">{e.title}</div>
            <Markdown className="text-sm">{e.body}</Markdown>
          </div>
        ) : (
          <div key={i} className="formula-entry md:col-span-2">
            <Markdown className="text-sm">{e.body}</Markdown>
          </div>
        ),
      )}
    </div>
  );
}
