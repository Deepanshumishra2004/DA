// Validate practice-question JSON files (arrays of PracticeQ, see src/lib/practice.ts).
//   node scripts/validate-practice.mjs <file.json> ...
// Checks shape, answer format, option labels and that every $...$ snippet parses in KaTeX.
import fs from "node:fs";
import katex from "katex";
import { pathToFileURL } from "node:url";

const LEVELS = ["easy", "medium", "gate"];
const strip = (s) => s.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");

function mathErrors(text) {
  const out = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let m;
  const t = strip(text ?? "");
  while ((m = re.exec(t))) {
    try {
      katex.renderToString(m[1] ?? m[2], { throwOnError: true, displayMode: !!m[1], strict: false });
    } catch (e) {
      out.push(`${(m[1] ?? m[2]).slice(0, 60)} -> ${e.message.split("\n")[0]}`);
    }
  }
  return out;
}

export function validate(q) {
  const e = [];
  for (const k of ["id", "subject", "topic", "level", "type", "question", "answer", "hint", "solution"])
    if (typeof q[k] !== "string" || !q[k].trim()) e.push(`missing ${k}`);
  if (!LEVELS.includes(q.level)) e.push(`bad level ${q.level}`);
  if (![1, 2].includes(q.marks)) e.push(`marks must be 1 or 2`);
  if (!Array.isArray(q.concepts)) e.push("concepts must be an array");
  if (q.type === "NAT") {
    if (q.options !== null) e.push("NAT options must be null");
    if (!/^-?\d+(\.\d+)? to -?\d+(\.\d+)?$/.test(q.answer ?? "")) e.push(`NAT answer must be "x to y", got ${q.answer}`);
  } else if (q.type === "MCQ" || q.type === "MSQ") {
    const labels = (q.options ?? []).map((o) => o.label).join("");
    if (labels !== "ABCD") e.push(`options must be labelled A-D, got ${labels}`);
    const re = q.type === "MCQ" ? /^[A-D]$/ : /^[A-D](;[A-D])*$/;
    if (!re.test(q.answer ?? "")) e.push(`${q.type} answer format bad: ${q.answer}`);
  } else e.push(`bad type ${q.type}`);
  for (const k of ["question", "hint", "solution"]) for (const m of mathErrors(q[k])) e.push(`math in ${k}: ${m}`);
  for (const o of q.options ?? []) for (const m of mathErrors(o.text)) e.push(`math in option ${o.label}: ${m}`);
  return e;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  let bad = 0;
  for (const f of process.argv.slice(2)) {
    let arr;
    try {
      arr = JSON.parse(fs.readFileSync(f, "utf8"));
    } catch (err) {
      console.log(`${f}: invalid JSON: ${err.message}`);
      bad++;
      continue;
    }
    const ids = new Set();
    for (const q of arr) {
      const errs = validate(q);
      if (ids.has(q.id)) errs.push("duplicate id");
      ids.add(q.id);
      if (errs.length) {
        bad += errs.length;
        console.log(`${f} ${q.id}:\n  ${errs.join("\n  ")}`);
      }
    }
    console.log(`${f}: ${arr.length} questions`);
  }
  console.log(bad ? `${bad} problems` : "all valid");
  process.exit(bad ? 1 : 0);
}
