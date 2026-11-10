"use client";
import { useState } from "react";

/** Hides its children (a self-check answer) until the button is pressed. */
export default function Reveal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-3">
      {open ? (
        <div className="reveal-open rounded-lg px-4 py-2">{children}</div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg border border-dashed border-emerald-500/60 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-300"
        >
          Show answer
        </button>
      )}
    </div>
  );
}
