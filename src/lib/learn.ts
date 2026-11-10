import fs from "node:fs";
import path from "node:path";

// Notes live in src/content/<kind>/<subject-slug>.md.
// Text before the first "## " heading = intro; each "## <Topic name>" section = that topic.
export type Sectioned = { intro: string; topics: Record<string, string> };

function readSectioned(kind: "learn" | "formulas", slug: string): Sectioned | null {
  const file = path.join(process.cwd(), "src", "content", kind, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const md = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const parts = md.split(/^## /m);
  const intro = parts.shift() ?? "";
  const topics: Record<string, string> = {};
  for (const p of parts) {
    const nl = p.indexOf("\n");
    const title = (nl === -1 ? p : p.slice(0, nl)).trim();
    topics[title] = nl === -1 ? "" : p.slice(nl + 1).trim();
  }
  return { intro: intro.replace(/^# .*\n/, "").trim(), topics };
}

export const getLearnNotes = (slug: string) => readSectioned("learn", slug);
export const getFormulaSheet = (slug: string) => readSectioned("formulas", slug);

/** First paragraph under "### The big idea" (fallback: first paragraph of the section). */
export function bigIdea(section: string | undefined): string | null {
  if (!section) return null;
  const m = section.match(/###\s*The big idea\s*\n+([\s\S]*?)(?=\n###|\n## |$)/i);
  const body = (m ? m[1] : section).trim();
  const para = body.split(/\n\s*\n/)[0]?.trim();
  return para || null;
}

/** Split a topic section into its "### " sub-sections (text before the first ### becomes an untitled block). */
export function splitSubsections(section: string): { title: string | null; body: string }[] {
  const out: { title: string | null; body: string }[] = [];
  const parts = section.split(/^### /m);
  const pre = parts.shift()?.trim();
  if (pre) out.push({ title: null, body: pre });
  for (const p of parts) {
    const nl = p.indexOf("\n");
    out.push({ title: (nl === -1 ? p : p.slice(0, nl)).trim(), body: nl === -1 ? "" : p.slice(nl + 1).trim() });
  }
  return out;
}

/** "### " sub-headings of a topic section, for an in-page table of contents. */
export function subHeadings(section: string): string[] {
  return [...section.matchAll(/^###\s+(.+)$/gm)].map((m) => m[1].trim());
}
