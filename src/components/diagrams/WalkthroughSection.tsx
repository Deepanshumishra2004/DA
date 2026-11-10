import walkJson from "@/data/walkthroughs.json";
import type { WalkthroughData } from "@/lib/walkthrough";
import Markdown from "@/components/Markdown";
import WalkthroughPlayer from "./WalkthroughPlayer";

const DATA = walkJson as unknown as WalkthroughData;

export function hasWalkthroughs(topic: string) {
  return (DATA[topic]?.length ?? 0) > 0;
}

/** Server component: renders captions to HTML on the server, hands diagrams to the client player. */
export default function WalkthroughSection({ topic }: { topic: string }) {
  const list = DATA[topic] ?? [];
  if (!list.length) return null;
  return (
    <section id="watch-it-step-by-step" className="note-section scroll-mt-20 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-5 py-3 sm:px-7" style={{ background: "color-mix(in srgb, #0ea5e9 10%, transparent)" }}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white" style={{ background: "#0ea5e9" }}>▶</span>
        <div>
          <h2 className="text-lg leading-tight font-bold" style={{ color: "#0ea5e9" }}>Watch it step by step</h2>
          <div className="text-xs text-muted">Like a video: press Play, or go one step at a time</div>
        </div>
      </div>
      <div className="space-y-6 px-4 py-5 sm:px-6">
        {list.map((w, k) => (
          <WalkthroughPlayer
            key={k}
            title={w.title}
            intro={w.intro ? <Markdown className="text-sm">{w.intro}</Markdown> : undefined}
            frames={w.frames.map((f) => ({
              caption: <Markdown>{f.caption}</Markdown>,
              diagrams: f.diagrams ?? (f.diagram ? [f.diagram] : []),
            }))}
          />
        ))}
      </div>
    </section>
  );
}
