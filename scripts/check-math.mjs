// Find KaTeX parse errors.
//   node scripts/check-math.mjs              -> checks everything (questions, learn notes, formula sheets, intuition files)
//   node scripts/check-math.mjs <file> ...   -> checks only the given .md / .json files
import fs from "node:fs";
import path from "node:path";
import katex from "katex";

const strip = (s) => s.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
let total = 0;

function check(where, text) {
  if (!text || typeof text !== "string") return;
  const t = strip(text);
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let m;
  while ((m = re.exec(t))) {
    const expr = m[1] ?? m[2];
    try {
      katex.renderToString(expr, { throwOnError: true, displayMode: !!m[1], strict: false });
    } catch (e) {
      total++;
      console.log(`${where}: ${e.message.split("\n")[0].slice(0, 120)}  ::  ${expr.slice(0, 80)}`);
    }
  }
  // unbalanced $$ blocks
  const dd = (t.match(/\$\$/g) || []).length;
  if (dd % 2) { total++; console.log(`${where}: odd number of $$ delimiters`); }
}

function walkJson(where, v) {
  if (typeof v === "string") check(where, v);
  else if (Array.isArray(v)) v.forEach((x, i) => walkJson(`${where}[${i}]`, x));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walkJson(`${where}.${k}`, x);
}

function checkFile(f) {
  const txt = fs.readFileSync(f, "utf8");
  if (f.endsWith(".json")) walkJson(path.basename(f), JSON.parse(txt));
  else check(path.basename(f), txt);
}

const args = process.argv.slice(2);
if (args.length) args.forEach(checkFile);
else {
  checkFile("src/data/questions.json");
  for (const dir of ["src/content/learn", "src/content/formulas", "../analysis/intuition"])
    if (fs.existsSync(dir)) fs.readdirSync(dir).forEach((f) => checkFile(path.join(dir, f)));
}
console.log("math errors:", total);
