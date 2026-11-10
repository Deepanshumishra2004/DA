// Merge agent outputs (../analysis/questions/*.json) into src/data/questions.json
import fs from "node:fs";
import path from "node:path";

const src = path.resolve("../analysis/questions");
const out = path.resolve("src/data/questions.json");
const all = [];
for (const f of fs.readdirSync(src).filter((f) => f.endsWith(".json")).sort()) {
  const arr = JSON.parse(fs.readFileSync(path.join(src, f), "utf8"));
  console.log(`${f}: ${arr.length}`);
  all.push(...arr);
}
const ids = new Set();
for (const q of all) {
  if (ids.has(q.id)) console.warn("duplicate id", q.id);
  ids.add(q.id);
}
// Attach beginner intuition (../analysis/intuition/<subject>.json: { id: { intuition, formulas } })
const intDir = path.resolve("../analysis/intuition");
const intuition = {};
if (fs.existsSync(intDir))
  for (const f of fs.readdirSync(intDir).filter((f) => f.endsWith(".json")))
    Object.assign(intuition, JSON.parse(fs.readFileSync(path.join(intDir, f), "utf8")));
let withInt = 0;
for (const q of all) {
  const it = intuition[q.id];
  q.intuition = it?.intuition ?? null;
  q.formulasUsed = it?.formulas ?? null;
  if (it) withInt++;
}
console.log(`intuition attached to ${withInt}/${all.length}`);
all.sort((a, b) => a.year - b.year || a.number - b.number);
fs.writeFileSync(out, JSON.stringify(all, null, 1));
console.log(`wrote ${all.length} questions -> ${out}`);


// Repair LaTeX broken by Python escapes: form feed / bell / backspace / vtab -> backslash + f/a/b/v.
function fixLatex(v) {
  if (typeof v === "string")
    return v.replace(/\x0c/g, "\\f").replace(/\x07/g, "\\a").replace(/\x08/g, "\\b").replace(/\x0b/g, "\\v");
  if (Array.isArray(v)) return v.map(fixLatex);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fixLatex(x)]));
  return v;
}

// ---------- Practice bank: ../analysis/practice/<slug>/*.json -> src/data/practice.json ----------
const prDir = path.resolve("../analysis/practice");
const practice = [];
if (fs.existsSync(prDir))
  for (const sub of fs.readdirSync(prDir).sort()) {
    const d = path.join(prDir, sub);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((f) => f.endsWith(".json")).sort()) {
      try {
        const arr = fixLatex(JSON.parse(fs.readFileSync(path.join(d, f), "utf8")));
        if (Array.isArray(arr)) practice.push(...arr);
      } catch (e) {
        console.warn(`practice: skipping unreadable ${sub}/${f}: ${e.message}`);
      }
    }
  }
const pids = new Set();
const practiceClean = practice.filter((q) => {
  if (!q?.id || pids.has(q.id)) return false;
  pids.add(q.id);
  return true;
});
fs.writeFileSync(path.resolve("src/data/practice.json"), JSON.stringify(practiceClean));
console.log(`practice: ${practiceClean.length} questions`);

// ---------- Walkthroughs: ../analysis/walkthroughs/<slug>.json -> src/data/walkthroughs.json ----------
const wkDir = path.resolve("../analysis/walkthroughs");
const walk = {};
if (fs.existsSync(wkDir))
  for (const f of fs.readdirSync(wkDir).filter((f) => f.endsWith(".json")).sort()) {
    try {
      Object.assign(walk, fixLatex(JSON.parse(fs.readFileSync(path.join(wkDir, f), "utf8"))));
    } catch (e) {
      console.warn(`walkthroughs: skipping unreadable ${f}: ${e.message}`);
    }
  }
fs.writeFileSync(path.resolve("src/data/walkthroughs.json"), JSON.stringify(walk));
console.log(`walkthroughs: ${Object.values(walk).reduce((a, v) => a + v.length, 0)} for ${Object.keys(walk).length} topics`);
