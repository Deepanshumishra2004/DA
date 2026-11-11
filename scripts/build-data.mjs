// Merge agent outputs (../analysis/**) into src/data/*.json.
//
// The ../analysis folder only exists on the author's machine. On CI / Vercel it is
// absent, so every section below is skipped and the committed src/data/*.json files
// are used as-is. Never overwrite committed data with an empty result.
import fs from "node:fs";
import path from "node:path";

const ANALYSIS = path.resolve(process.env.ANALYSIS_DIR ?? "../analysis");
const dataDir = path.resolve("src/data");
const isDir = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();

if (!isDir(ANALYSIS)) {
  console.log(`build-data: ${ANALYSIS} not found, using committed src/data/*.json`);
  process.exit(0);
}

// Repair LaTeX broken by Python escapes: form feed / bell / backspace / vtab -> backslash + f/a/b/v.
function fixLatex(v) {
  if (typeof v === "string")
    return v.replace(/\x0c/g, "\\f").replace(/\x07/g, "\\a").replace(/\x08/g, "\\b").replace(/\x0b/g, "\\v");
  if (Array.isArray(v)) return v.map(fixLatex);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fixLatex(x)]));
  return v;
}

// ---------- Past questions: ../analysis/questions/*.json -> src/data/questions.json ----------
const src = path.join(ANALYSIS, "questions");
if (isDir(src)) {
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
  const intDir = path.join(ANALYSIS, "intuition");
  const intuition = {};
  if (isDir(intDir))
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
  if (all.length) {
    fs.writeFileSync(path.join(dataDir, "questions.json"), JSON.stringify(all, null, 1));
    console.log(`wrote ${all.length} questions`);
  }
} else console.log("questions: no source, keeping committed questions.json");

// ---------- Practice bank: ../analysis/practice/<slug>/*.json -> src/data/practice.json ----------
const prDir = path.join(ANALYSIS, "practice");
if (isDir(prDir)) {
  const practice = [];
  for (const sub of fs.readdirSync(prDir).sort()) {
    const d = path.join(prDir, sub);
    if (!isDir(d)) continue;
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
  if (practiceClean.length) {
    fs.writeFileSync(path.join(dataDir, "practice.json"), JSON.stringify(practiceClean));
    console.log(`practice: ${practiceClean.length} questions`);
  }
} else console.log("practice: no source, keeping committed practice.json");

// ---------- Walkthroughs: ../analysis/walkthroughs/<slug>.json -> src/data/walkthroughs.json ----------
const wkDir = path.join(ANALYSIS, "walkthroughs");
if (isDir(wkDir)) {
  const walk = {};
  for (const f of fs.readdirSync(wkDir).filter((f) => f.endsWith(".json")).sort()) {
    try {
      Object.assign(walk, fixLatex(JSON.parse(fs.readFileSync(path.join(wkDir, f), "utf8"))));
    } catch (e) {
      console.warn(`walkthroughs: skipping unreadable ${f}: ${e.message}`);
    }
  }
  if (Object.keys(walk).length) {
    fs.writeFileSync(path.join(dataDir, "walkthroughs.json"), JSON.stringify(walk));
    console.log(`walkthroughs: ${Object.values(walk).reduce((a, v) => a + v.length, 0)} for ${Object.keys(walk).length} topics`);
  }
} else console.log("walkthroughs: no source, keeping committed walkthroughs.json");
