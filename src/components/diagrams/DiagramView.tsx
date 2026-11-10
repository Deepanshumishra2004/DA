import { useId } from "react";
import type {
  ArrayDiagram,
  BarsDiagram,
  CellState,
  Diagram,
  GraphDiagram,
  MatrixDiagram,
  NodeState,
  PlotDiagram,
  PointsDiagram,
  TreeDiagram,
  TreeNode,
} from "@/lib/walkthrough";

// ---------- shared palette (CSS vars defined in globals.css, so dark mode works) ----------
const CELL_FILL: Record<CellState, string> = {
  compare: "var(--st-compare)",
  swap: "var(--st-swap)",
  sorted: "var(--st-sorted)",
  pivot: "var(--st-pivot)",
  active: "var(--st-active)",
  dim: "var(--st-dim)",
  found: "var(--st-sorted)",
  bad: "var(--st-swap)",
};
const NODE_FILL: Record<NodeState, string> = {
  current: "var(--st-compare)",
  frontier: "var(--st-active)",
  visited: "var(--st-sorted)",
  goal: "var(--st-pivot)",
  start: "var(--st-active)",
  dim: "var(--st-dim)",
  bad: "var(--st-swap)",
  active: "var(--st-active)",
};
const GROUP = ["#6366f1", "#e11d48", "#059669", "#d97706", "#0891b2", "#a855f7"];

const txt = { fill: "var(--foreground)", fontFamily: "var(--font-geist-sans), sans-serif" } as const;

function Title({ t }: { t?: string }) {
  return t ? <div className="mb-2 text-center text-xs font-semibold tracking-wide text-muted uppercase">{t}</div> : null;
}

// ---------- array ----------
function ArrayView({ d }: { d: ArrayDiagram }) {
  const n = d.values.length;
  const w = Math.max(36, Math.min(64, 560 / Math.max(1, n)));
  const W = n * w + 20;
  const ptrs = Object.entries(d.pointers ?? {});
  const H = 30 + w + (ptrs.length ? 44 : 10) + (d.labels ? 0 : 0);
  // group pointers by index so labels stack
  const byIdx: Record<number, string[]> = {};
  ptrs.forEach(([l, i]) => (byIdx[i] = [...(byIdx[i] ?? []), l]));
  return (
    <div>
      <Title t={d.title} />
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block w-full" style={{ maxWidth: W * 1.3 }}>
        {d.values.map((v, i) => {
          const st = d.states?.[String(i)];
          const x = 10 + i * w;
          return (
            <g key={i}>
              <text x={x + w / 2} y={16} textAnchor="middle" fontSize={11} {...txt} opacity={0.55}>
                {d.labels ? d.labels[i] : i}
              </text>
              <rect x={x + 2} y={24} width={w - 4} height={w - 4} rx={8} fill={st ? CELL_FILL[st] : "var(--card)"} stroke="var(--border-strong)" strokeWidth={1.5} />
              <text x={x + w / 2} y={24 + (w - 4) / 2 + 6} textAnchor="middle" fontSize={Math.min(18, w / 2.4)} fontWeight={600} {...txt}>
                {String(v)}
              </text>
            </g>
          );
        })}
        {Object.entries(byIdx).map(([i, labels]) => {
          const x = 10 + Number(i) * w + w / 2;
          return (
            <g key={i}>
              <path d={`M ${x} ${28 + w} l -5 9 h 10 z`} fill="var(--accent)" />
              <text x={x} y={52 + w} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--accent)">
                {labels.join(", ")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ---------- graph ----------
function GraphView({ d }: { d: GraphDiagram }) {
  const W = 600,
    H = 340,
    R = 20;
  const pos = (id: string) => {
    const n = d.nodes.find((x) => x.id === id);
    return n ? { x: 30 + (n.x / 100) * (W - 60), y: 30 + (n.y / 100) * (H - 60) } : { x: 0, y: 0 };
  };
  const eState = (a: string, b: string) =>
    d.edgeStates?.find((e) => (e.from === a && e.to === b) || (!d.directed && e.from === b && e.to === a))?.state;
  const id = `arr-${useId().replace(/:/g, "")}`;
  return (
    <div>
      <Title t={d.title} />
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block w-full max-w-2xl">
        <defs>
          <marker id={id} viewBox="0 0 10 10" refX={10} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
          </marker>
        </defs>
        {d.edges.map((e, i) => {
          const a = pos(e.from),
            b = pos(e.to);
          const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
          const ux = (b.x - a.x) / len,
            uy = (b.y - a.y) / len;
          const x1 = a.x + ux * R,
            y1 = a.y + uy * R,
            x2 = b.x - ux * (R + (d.directed ? 3 : 0)),
            y2 = b.y - uy * (R + (d.directed ? 3 : 0));
          const st = eState(e.from, e.to);
          const stroke = st === "tree" || st === "path" ? "var(--st-sorted-strong)" : st === "active" ? "var(--st-compare-strong)" : "var(--border-strong)";
          return (
            <g key={i} opacity={st === "pruned" ? 0.35 : 1}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={st && st !== "pruned" ? 4 : 2} strokeDasharray={st === "pruned" ? "6 5" : undefined} markerEnd={d.directed ? `url(#${id})` : undefined} />
              {e.weight !== undefined && (
                <g>
                  <rect x={(a.x + b.x) / 2 - 12} y={(a.y + b.y) / 2 - 10} width={24} height={18} rx={5} fill="var(--card)" stroke="var(--border)" />
                  <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 + 4} textAnchor="middle" fontSize={12} fontWeight={600} {...txt}>
                    {e.weight}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        {d.nodes.map((n) => {
          const p = pos(n.id);
          const st = d.nodeStates?.[n.id];
          return (
            <g key={n.id}>
              <circle cx={p.x} cy={p.y} r={R} fill={st ? NODE_FILL[st] : "var(--card)"} stroke={st === "current" ? "var(--st-compare-strong)" : "var(--border-strong)"} strokeWidth={st === "current" ? 3.5 : 2} />
              <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={15} fontWeight={700} {...txt}>
                {n.label ?? n.id}
              </text>
              {n.note && (
                <text x={p.x} y={p.y + R + 15} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="var(--accent)">
                  {n.note}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ---------- tree (auto layout) ----------
type Placed = { node: TreeNode; x: number; y: number; parent?: Placed; faded: boolean };
function layoutTree(root: TreeNode) {
  const placed: Placed[] = [];
  let leaf = 0;
  let depthMax = 0;
  function walk(n: TreeNode, depth: number, parent: Placed | undefined, faded: boolean): Placed {
    depthMax = Math.max(depthMax, depth);
    const me: Placed = { node: n, x: 0, y: depth, parent, faded: faded || !!n.pruned };
    placed.push(me);
    if (!n.children?.length) me.x = leaf++;
    else {
      const kids = n.children.map((c) => walk(c, depth + 1, me, me.faded));
      me.x = (kids[0].x + kids[kids.length - 1].x) / 2;
    }
    return me;
  }
  walk(root, 0, undefined, false);
  return { placed, leaves: Math.max(1, leaf), depth: depthMax + 1 };
}
function TreeView({ d }: { d: TreeDiagram }) {
  const { placed, leaves, depth } = layoutTree(d.root);
  const colW = Math.max(56, Math.min(110, 640 / leaves));
  const rowH = 82;
  const W = leaves * colW + 20,
    H = depth * rowH + 10;
  const X = (p: Placed) => 10 + p.x * colW + colW / 2;
  const Y = (p: Placed) => 30 + p.y * rowH;
  return (
    <div>
      <Title t={d.title} />
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block w-full" style={{ maxWidth: Math.max(320, W * 1.15) }}>
        {placed.map(
          (p, i) =>
            p.parent && (
              <g key={`e${i}`} opacity={p.faded ? 0.3 : 1}>
                <line x1={X(p.parent)} y1={Y(p.parent) + 17} x2={X(p)} y2={Y(p) - 17} stroke="var(--border-strong)" strokeWidth={2} strokeDasharray={p.node.pruned ? "6 5" : undefined} />
                {p.node.edgeLabel && (
                  <text x={(X(p.parent) + X(p)) / 2 + (X(p) >= X(p.parent) ? 8 : -8)} y={(Y(p.parent) + Y(p)) / 2 + 2} textAnchor={X(p) >= X(p.parent) ? "start" : "end"} fontSize={11} fill="var(--muted)">
                    {p.node.edgeLabel}
                  </text>
                )}
                {p.node.pruned && (
                  <text x={(X(p.parent) + X(p)) / 2} y={(Y(p.parent) + Y(p)) / 2 - 6} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--st-swap-strong)">
                    ✂
                  </text>
                )}
              </g>
            ),
        )}
        {placed.map((p, i) => {
          const st = p.node.state;
          const w = Math.max(34, Math.min(colW - 6, p.node.label.length * 9 + 18));
          return (
            <g key={`n${i}`} opacity={p.faded ? 0.35 : 1}>
              <rect x={X(p) - w / 2} y={Y(p) - 17} width={w} height={34} rx={17} fill={st ? NODE_FILL[st] : "var(--card)"} stroke={st === "current" ? "var(--st-compare-strong)" : "var(--border-strong)"} strokeWidth={st === "current" ? 3 : 1.8} />
              <text x={X(p)} y={Y(p) + 5} textAnchor="middle" fontSize={13.5} fontWeight={700} {...txt}>
                {p.node.label}
              </text>
              {p.node.note && (
                <text x={X(p)} y={Y(p) + 32} textAnchor="middle" fontSize={11.5} fontWeight={600} fill="var(--accent)">
                  {p.node.note}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ---------- axes helper ----------
function ticks(lo: number, hi: number, n = 5) {
  const span = hi - lo || 1;
  const step0 = span / n;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= n + 1) ?? step0;
  const out: number[] = [];
  for (let t = Math.ceil(lo / step) * step; t <= hi + 1e-9; t += step) out.push(+t.toFixed(10));
  return out;
}
const fmt = (v: number) => (Math.abs(v) >= 1000 || (Math.abs(v) < 0.01 && v !== 0) ? v.toExponential(1) : +v.toFixed(3) + "");

function Axes({ W, H, P, xr, yr, xLabel, yLabel }: { W: number; H: number; P: number; xr: [number, number]; yr: [number, number]; xLabel?: string; yLabel?: string }) {
  const sx = (x: number) => P + ((x - xr[0]) / (xr[1] - xr[0] || 1)) * (W - 2 * P);
  const sy = (y: number) => H - P - ((y - yr[0]) / (yr[1] - yr[0] || 1)) * (H - 2 * P);
  return (
    <g fontSize={10.5} fill="var(--muted)">
      {ticks(xr[0], xr[1]).map((t) => (
        <g key={`x${t}`}>
          <line x1={sx(t)} x2={sx(t)} y1={P} y2={H - P} stroke="var(--border)" strokeWidth={1} />
          <text x={sx(t)} y={H - P + 14} textAnchor="middle">{fmt(t)}</text>
        </g>
      ))}
      {ticks(yr[0], yr[1]).map((t) => (
        <g key={`y${t}`}>
          <line x1={P} x2={W - P} y1={sy(t)} y2={sy(t)} stroke="var(--border)" strokeWidth={1} />
          <text x={P - 6} y={sy(t) + 3.5} textAnchor="end">{fmt(t)}</text>
        </g>
      ))}
      <rect x={P} y={P} width={W - 2 * P} height={H - 2 * P} fill="none" stroke="var(--border-strong)" />
      {xLabel && <text x={W / 2} y={H - 4} textAnchor="middle" fontWeight={600}>{xLabel}</text>}
      {yLabel && <text x={12} y={H / 2} textAnchor="middle" fontWeight={600} transform={`rotate(-90 12 ${H / 2})`}>{yLabel}</text>}
    </g>
  );
}

function extent(vals: number[], pad = 0.08): [number, number] {
  let lo = Math.min(...vals),
    hi = Math.max(...vals);
  if (!isFinite(lo)) return [0, 1];
  if (lo === hi) {
    lo -= 1;
    hi += 1;
  }
  const p = (hi - lo) * pad;
  return [lo - p, hi + p];
}

// ---------- scatter points ----------
function PointsView({ d }: { d: PointsDiagram }) {
  const clip = `clip-${useId().replace(/:/g, "")}`;
  const W = 560,
    H = 360,
    P = 42;
  const all = [...d.points, ...(d.centers ?? [])];
  const xr = d.xRange ?? extent([...all.map((p) => p.x), ...(d.lines ?? []).flatMap((l) => [l.x1, l.x2])]);
  const yr = d.yRange ?? extent([...all.map((p) => p.y), ...(d.lines ?? []).flatMap((l) => [l.y1, l.y2])]);
  const sx = (x: number) => P + ((x - xr[0]) / (xr[1] - xr[0] || 1)) * (W - 2 * P);
  const sy = (y: number) => H - P - ((y - yr[0]) / (yr[1] - yr[0] || 1)) * (H - 2 * P);
  return (
    <div>
      <Title t={d.title} />
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block w-full max-w-xl">
        <Axes W={W} H={H} P={P} xr={xr} yr={yr} xLabel={d.xLabel} yLabel={d.yLabel} />
        <clipPath id={clip}><rect x={P} y={P} width={W - 2 * P} height={H - 2 * P} /></clipPath>
        <g clipPath={`url(#${clip})`}>
          {(d.lines ?? []).map((l, i) => (
            <line key={i} x1={sx(l.x1)} y1={sy(l.y1)} x2={sx(l.x2)} y2={sy(l.y2)} stroke="var(--accent)" strokeWidth={2.5} strokeDasharray={l.dashed ? "7 5" : undefined} />
          ))}
        </g>
        {(d.lines ?? []).map((l, i) => l.label && (
          <text key={`ll${i}`} x={sx(l.x2) - 4} y={sy(l.y2) - 6} textAnchor="end" fontSize={11.5} fontWeight={600} fill="var(--accent)">{l.label}</text>
        ))}
        {d.points.map((p, i) => (
          <g key={i}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r={7} fill={p.group !== undefined ? GROUP[p.group % GROUP.length] : "var(--muted)"} stroke="var(--card)" strokeWidth={1.5} />
            {p.label && <text x={sx(p.x) + 10} y={sy(p.y) - 8} fontSize={11.5} {...txt}>{p.label}</text>}
          </g>
        ))}
        {(d.centers ?? []).map((c, i) => {
          const col = c.group !== undefined ? GROUP[c.group % GROUP.length] : "var(--foreground)";
          const x = sx(c.x), y = sy(c.y);
          return (
            <g key={`c${i}`}>
              <path d={`M ${x - 9} ${y - 9} L ${x + 9} ${y + 9} M ${x + 9} ${y - 9} L ${x - 9} ${y + 9}`} stroke={col} strokeWidth={4.5} strokeLinecap="round" />
              {c.label && <text x={x + 12} y={y + 16} fontSize={11.5} fontWeight={700} fill={col}>{c.label}</text>}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ---------- function plot with shaded area ----------
function PlotView({ d }: { d: PlotDiagram }) {
  const W = 560,
    H = 330,
    P = 42;
  const xs = d.series.flatMap((s) => s.points.map((p) => p[0]));
  const ys = d.series.flatMap((s) => s.points.map((p) => p[1]));
  const xr = d.xRange ?? extent(xs, 0);
  const yr = d.yRange ?? extent([0, ...ys], 0.06);
  const sx = (x: number) => P + ((x - xr[0]) / (xr[1] - xr[0] || 1)) * (W - 2 * P);
  const sy = (y: number) => H - P - ((y - yr[0]) / (yr[1] - yr[0] || 1)) * (H - 2 * P);
  const colors = ["var(--accent)", "#e11d48", "#059669", "#d97706"];
  let shadePath: string | null = null;
  if (d.shade) {
    const s = d.series[d.shade.series ?? 0];
    const pts = s.points.filter((p) => p[0] >= d.shade!.from - 1e-9 && p[0] <= d.shade!.to + 1e-9);
    if (pts.length > 1) {
      const base = sy(Math.max(yr[0], 0));
      shadePath = `M ${sx(pts[0][0])} ${base} ` + pts.map((p) => `L ${sx(p[0])} ${sy(p[1])}`).join(" ") + ` L ${sx(pts[pts.length - 1][0])} ${base} Z`;
    }
  }
  return (
    <div>
      <Title t={d.title} />
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block w-full max-w-xl">
        <Axes W={W} H={H} P={P} xr={xr} yr={yr} xLabel={d.xLabel} yLabel={d.yLabel} />
        {shadePath && <path d={shadePath} fill="var(--accent)" opacity={0.22} />}
        {d.shade?.label && (
          <text x={sx((d.shade.from + d.shade.to) / 2)} y={sy((yr[0] + yr[1]) / 3)} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--accent)">{d.shade.label}</text>
        )}
        {d.series.map((s, i) => (
          <g key={i}>
            <polyline points={s.points.map((p) => `${sx(p[0])},${sy(p[1])}`).join(" ")} fill="none" stroke={colors[i % colors.length]} strokeWidth={2.6} strokeLinejoin="round" />
            {s.label && s.points.length > 0 && (
              <text x={sx(s.points[Math.floor(s.points.length * 0.7)][0]) + 6} y={sy(s.points[Math.floor(s.points.length * 0.7)][1]) - 8} fontSize={12} fontWeight={600} fill={colors[i % colors.length]}>{s.label}</text>
            )}
          </g>
        ))}
        {(d.vlines ?? []).map((v, i) => (
          <g key={`v${i}`}>
            <line x1={sx(v.x)} x2={sx(v.x)} y1={P} y2={H - P} stroke="#d97706" strokeWidth={2} strokeDasharray="6 4" />
            {v.label && <text x={sx(v.x) + 4} y={P + 14} fontSize={11.5} fontWeight={600} fill="#d97706">{v.label}</text>}
          </g>
        ))}
        {(d.hlines ?? []).map((h, i) => (
          <g key={`h${i}`}>
            <line x1={P} x2={W - P} y1={sy(h.y)} y2={sy(h.y)} stroke="#d97706" strokeWidth={2} strokeDasharray="6 4" />
            {h.label && <text x={W - P - 4} y={sy(h.y) - 5} textAnchor="end" fontSize={11.5} fontWeight={600} fill="#d97706">{h.label}</text>}
          </g>
        ))}
        {(d.dots ?? []).map((p, i) => (
          <g key={`d${i}`}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r={6} fill="#e11d48" stroke="var(--card)" strokeWidth={1.5} />
            {p.label && <text x={sx(p.x) + 9} y={sy(p.y) - 8} fontSize={11.5} fontWeight={600} fill="#e11d48">{p.label}</text>}
          </g>
        ))}
      </svg>
    </div>
  );
}

// ---------- bars ----------
function BarsView({ d }: { d: BarsDiagram }) {
  const n = d.bars.length;
  const bw = Math.max(28, Math.min(70, 520 / Math.max(1, n)));
  const W = n * bw + 40,
    H = 240;
  const max = d.max ?? Math.max(...d.bars.map((b) => b.value), 1e-9);
  return (
    <div>
      <Title t={d.title} />
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block w-full" style={{ maxWidth: Math.max(300, W * 1.2) }}>
        <line x1={20} x2={W - 20} y1={H - 34} y2={H - 34} stroke="var(--border-strong)" />
        {d.bars.map((b, i) => {
          const h = (b.value / max) * (H - 80);
          const x = 20 + i * bw;
          return (
            <g key={i}>
              <rect x={x + 5} y={H - 34 - h} width={bw - 10} height={h} rx={5} fill={b.state ? CELL_FILL[b.state] : "var(--st-active)"} stroke="var(--border-strong)" />
              <text x={x + bw / 2} y={H - 40 - h} textAnchor="middle" fontSize={11.5} fontWeight={600} {...txt}>{fmt(b.value)}</text>
              <text x={x + bw / 2} y={H - 16} textAnchor="middle" fontSize={11.5} fill="var(--muted)">{b.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ---------- matrix / table ----------
function MatrixView({ d }: { d: MatrixDiagram }) {
  const hl = (r: number, c: number) => d.highlight?.find((h) => h.r === r && h.c === c);
  return (
    <div>
      <Title t={d.title} />
      <div className="flex justify-center overflow-x-auto">
        <table className="border-separate border-spacing-1 text-center text-sm">
          {d.colLabels && (
            <thead>
              <tr>
                {d.rowLabels && <th />}
                {d.colLabels.map((c, i) => <th key={i} className="px-2 text-xs font-semibold text-muted">{c}</th>)}
              </tr>
            </thead>
          )}
          <tbody>
            {d.rows.map((row, r) => (
              <tr key={r}>
                {d.rowLabels && <th className="px-2 text-xs font-semibold text-muted">{d.rowLabels[r]}</th>}
                {row.map((v, c) => {
                  const h = hl(r, c);
                  return (
                    <td key={c} className="min-w-10 rounded-md border px-3 py-2 font-semibold tabular-nums" style={{ background: h ? CELL_FILL[h.state ?? "compare"] : "var(--card)", borderColor: "var(--border-strong)" }}>
                      {String(v)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DiagramView({ d }: { d: Diagram }) {
  switch (d.kind) {
    case "array": return <ArrayView d={d} />;
    case "graph": return <GraphView d={d} />;
    case "tree": return <TreeView d={d} />;
    case "points": return <PointsView d={d} />;
    case "plot": return <PlotView d={d} />;
    case "bars": return <BarsView d={d} />;
    case "matrix": return <MatrixView d={d} />;
    default: return null;
  }
}

export function DiagramLegend({ kinds }: { kinds: string[] }) {
  const items: [string, string][] = [];
  if (kinds.some((k) => ["array", "bars", "matrix"].includes(k)))
    items.push(["var(--st-compare)", "comparing / current"], ["var(--st-swap)", "swap / wrong"], ["var(--st-sorted)", "done / visited"], ["var(--st-pivot)", "pivot / goal"]);
  else if (kinds.some((k) => ["graph", "tree"].includes(k)))
    items.push(["var(--st-compare)", "current"], ["var(--st-active)", "in frontier / waiting"], ["var(--st-sorted)", "visited / done"], ["var(--st-pivot)", "goal"]);
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap justify-center gap-3 text-xs text-muted">
      {items.map(([c, l]) => (
        <span key={l} className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded" style={{ background: c, border: "1px solid var(--border-strong)" }} />
          {l}
        </span>
      ))}
    </div>
  );
}
