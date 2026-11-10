// Visual style per note sub-section ("### " heading in the learn notes).
export type SectionStyle = { icon: string; color: string; hint?: string };

const STYLES: { match: RegExp; style: SectionStyle }[] = [
  { match: /big idea/i, style: { icon: "💡", color: "#6366f1", hint: "The topic in one breath" } },
  { match: /before you start/i, style: { icon: "🧱", color: "#64748b", hint: "Basics this topic stands on" } },
  { match: /intuition/i, style: { icon: "🎯", color: "#8b5cf6", hint: "Feel it before the maths" } },
  { match: /words you need/i, style: { icon: "📖", color: "#0891b2", hint: "Every term, in plain words" } },
  { match: /where the formulas come from/i, style: { icon: "🔍", color: "#059669", hint: "Built step by step, with reasons" } },
  { match: /formulas/i, style: { icon: "∑", color: "#2563eb", hint: "What each formula says and when to use it" } },
  { match: /examples?/i, style: { icon: "✏️", color: "#d97706", hint: "Worked fully, easy → GATE level" } },
  { match: /mistake/i, style: { icon: "⚠️", color: "#e11d48", hint: "Traps that cost marks" } },
  { match: /how gate asks/i, style: { icon: "🎓", color: "#ea580c", hint: "Patterns from 2024–2026 papers" } },
  { match: /summary/i, style: { icon: "📝", color: "#4f46e5", hint: "The whole topic as one story" } },
  { match: /self-check|check yourself/i, style: { icon: "✅", color: "#16a34a", hint: "Try first, then reveal the answer" } },
];

export function sectionStyle(title: string | null): SectionStyle {
  if (!title) return { icon: "•", color: "#a8a29e" };
  return STYLES.find((s) => s.match.test(title))?.style ?? { icon: "•", color: "#78716c" };
}
