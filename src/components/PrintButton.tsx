"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="no-print rounded-lg border border-border px-3 py-1.5 text-sm hover:border-accent">
      Print / save as PDF
    </button>
  );
}
