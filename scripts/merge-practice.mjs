// Merge new practice files into src/data/practice.json.
//   node scripts/merge-practice.mjs <dir>
// <dir> holds <subject-slug>/<topic-slug>.json files (arrays of PracticeQ).
// Every question is validated first; questions with the same id replace the old ones.
import fs from "node:fs";
import path from "node:path";
import { validate } from "./validate-practice.mjs";

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node scripts/merge-practice.mjs <dir>");
  process.exit(1);
}
const outFile = path.resolve("src/data/practice.json");
const existing = JSON.parse(fs.readFileSync(outFile, "utf8"));
const byId = new Map(existing.map((q) => [q.id, q]));

let added = 0,
  replaced = 0,
  problems = 0;
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".json") ? [path.join(d, e.name)] : []));
const files = walk(dir).sort();
const fresh = [];
for (const f of files) {
  for (const q of JSON.parse(fs.readFileSync(f, "utf8"))) {
    const errs = validate(q);
    if (errs.length) {
      problems++;
      console.log(`${path.relative(dir, f)} ${q.id}: ${errs.join("; ")}`);
      continue;
    }
    fresh.push(q);
  }
}
if (problems) {
  console.error(`${problems} invalid questions, nothing written`);
  process.exit(1);
}
for (const q of fresh) {
  if (byId.has(q.id)) replaced++;
  else added++;
  byId.set(q.id, q);
}
fs.writeFileSync(outFile, JSON.stringify([...byId.values()]));
console.log(`${files.length} files: ${added} added, ${replaced} replaced, total ${byId.size}`);
