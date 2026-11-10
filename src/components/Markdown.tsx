import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Reveal from "./Reveal";

// Blockquotes starting with **Intuition:** / **Remember:** / **Common mistake:** / **GATE tip:** become coloured callouts.
const CALLOUTS: Record<string, string> = {
  intuition: "callout callout-intuition",
  remember: "callout callout-remember",
  "common mistake": "callout callout-mistake",
  "gate tip": "callout callout-tip",
};

type HastNode = { type: string; tagName?: string; value?: string; children?: HastNode[] };

function firstStrongText(node: HastNode | undefined): string | null {
  if (!node?.children) return null;
  for (const c of node.children) {
    if (c.type === "element" && c.tagName === "strong") {
      return (c.children ?? []).map((x) => x.value ?? "").join("");
    }
    if (c.type === "element") {
      const r = firstStrongText(c);
      if (r !== null) return r;
      return null; // only look at the very first element
    }
    if (c.type === "text" && c.value?.trim()) return null;
  }
  return null;
}

export const headingId = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function textOf(n: unknown): string {
  if (typeof n === "string" || typeof n === "number") return String(n);
  if (Array.isArray(n)) return n.map(textOf).join("");
  if (n && typeof n === "object" && "props" in n) return textOf((n as { props: { children?: unknown } }).props.children);
  return "";
}

const baseComponents: Components = {
  p({ node, children }) {
    const label = firstStrongText(node as unknown as HastNode)?.trim().toLowerCase() ?? "";
    if (/^example\b/.test(label)) return <p className="example-head">{children}</p>;
    if (/^(result|answer)\s*:/.test(label)) return <p className="result-line">{children}</p>;
    if (/^(step|case)\s*\d/.test(label)) return <p className="step-head">{children}</p>;
    return <p>{children}</p>;
  },
  h2({ children }) {
    return <h2 id={headingId(textOf(children))} className="scroll-mt-20">{children}</h2>;
  },
  h3({ children }) {
    return <h3 id={headingId(textOf(children))} className="scroll-mt-20">{children}</h3>;
  },
  blockquote({ node, children }) {
    const label = firstStrongText(node as unknown as HastNode)?.replace(/:$/, "").trim().toLowerCase() ?? "";
    const cls = CALLOUTS[label];
    return <blockquote className={cls ?? undefined}>{children}</blockquote>;
  },
};

// In self-check sections, "**Answer:** ..." paragraphs are hidden behind a button.
const revealComponents: Components = {
  ...baseComponents,
  p(props) {
    const label = firstStrongText(props.node as unknown as HastNode)?.trim().toLowerCase() ?? "";
    if (/^answer\s*:/.test(label)) return <Reveal><p className="m-0">{props.children}</p></Reveal>;
    const P = baseComponents.p as (p: typeof props) => React.ReactNode;
    return P(props);
  },
};

/**
 * A line that is only `$$...$$` (no blank lines around it) is parsed by remark-math as INLINE math,
 * so it renders small inside the sentence. Rewrite such lines into real display blocks,
 * keeping any blockquote (">") / list-indent prefix so the structure is preserved.
 * Fenced code blocks are left untouched.
 */
function displayMathBlocks(md: string): string {
  let inFence = false;
  return md
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => {
      if (/^\s*(>\s*)*```/.test(line)) inFence = !inFence;
      if (inFence) return line;
      const block = (p: string, x: string) => `${p.trimEnd()}\n${p}$$\n${p}${x.trim()}\n${p}$$\n${p.trimEnd()}`;
      const m = line.match(/^(\s*(?:>\s*)*)\$\$(.+?)\$\$\s*$/);
      if (m) return block(m[1], m[2]);
      // "**Name** $$formula$$" on one line → bold line, then a display block
      const b = line.match(/^(\s*(?:>\s*)*)(\*\*[^*\n]+\*\*[^$\n]*?)\s*\$\$(.+?)\$\$\s*$/);
      if (b) return `${b[1]}${b[2]}\n${block(b[1], b[3])}`;
      return line;
    })
    .join("\n");
}

/** Make every "**Answer:**" line its own paragraph (so it can be hidden), keeping list/quote indentation. */
function separateAnswers(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let itemIndent: string | null = null; // content indent of the list item we are inside, if any
  for (const line of lines) {
    const li = line.match(/^(\s*)(\d+[.)]|[-*+])\s+/);
    if (li) itemIndent = " ".repeat(li[0].length);
    else if (line.trim() === "") {
      /* blank line: keep current item (answers may follow) */
    } else if (!/^\s/.test(line) && !/^\*\*Answer/.test(line)) itemIndent = null;

    const ans = line.match(/^([ \t]*(?:>[ \t]*)*)(\*\*Answer:?\*\*.*)$/);
    if (ans && out.length && out[out.length - 1].trim() !== "") {
      // inside a list item → indent so the answer stays in that item (numbering survives)
      const p = itemIndent && ans[1].length < itemIndent.length ? itemIndent : ans[1];
      out.push(p.trimEnd(), p + ans[2]);
      continue;
    }
    out.push(line);
  }
  return out.join("\n");
}

export default function Markdown({
  children,
  className = "",
  hideAnswers = false,
}: {
  children: string;
  className?: string;
  hideAnswers?: boolean;
}) {
  return (
    <div className={`prose-q ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }]]}
        components={hideAnswers ? revealComponents : baseComponents}
      >
        {displayMathBlocks(hideAnswers ? separateAnswers(children) : children)}
      </ReactMarkdown>
    </div>
  );
}
