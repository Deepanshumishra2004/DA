// Step-by-step visual walkthroughs ("video replacement").
// Content lives in ../analysis/walkthroughs/<subject-slug>.json  →  merged into src/data/walkthroughs.json
//   { "<exact topic>": Walkthrough[] }

export type CellState = "compare" | "swap" | "sorted" | "pivot" | "active" | "dim" | "found" | "bad";
export type NodeState = "current" | "frontier" | "visited" | "goal" | "start" | "dim" | "bad" | "active";

export type ArrayDiagram = {
  kind: "array";
  values: (number | string)[];
  states?: Record<string, CellState>; // index -> state
  pointers?: Record<string, number>; // label -> index (drawn under the cell)
  labels?: string[]; // optional label above each cell (e.g. index)
  title?: string;
};

export type GraphDiagram = {
  kind: "graph";
  directed?: boolean;
  nodes: { id: string; x: number; y: number; label?: string; note?: string }[]; // x,y in 0..100
  edges: { from: string; to: string; weight?: number | string }[];
  nodeStates?: Record<string, NodeState>;
  edgeStates?: { from: string; to: string; state: "tree" | "active" | "pruned" | "path" }[];
  title?: string;
};

export type TreeNode = {
  label: string;
  note?: string; // small text under node (value, distance, ...)
  state?: NodeState;
  edgeLabel?: string; // label on edge from parent
  pruned?: boolean; // draws dashed edge + faded subtree
  children?: TreeNode[];
};
export type TreeDiagram = { kind: "tree"; root: TreeNode; title?: string };

export type PointsDiagram = {
  kind: "points";
  points: { x: number; y: number; group?: number; label?: string }[];
  centers?: { x: number; y: number; group?: number; label?: string }[];
  lines?: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean; label?: string }[];
  xRange?: [number, number];
  yRange?: [number, number];
  xLabel?: string;
  yLabel?: string;
  title?: string;
};

export type PlotDiagram = {
  kind: "plot";
  series: { points: [number, number][]; label?: string }[];
  shade?: { series?: number; from: number; to: number; label?: string };
  vlines?: { x: number; label?: string }[];
  hlines?: { y: number; label?: string }[];
  dots?: { x: number; y: number; label?: string }[];
  xRange?: [number, number];
  yRange?: [number, number];
  xLabel?: string;
  yLabel?: string;
  title?: string;
};

export type BarsDiagram = {
  kind: "bars";
  bars: { label: string; value: number; state?: CellState }[];
  title?: string;
  max?: number;
};

export type MatrixDiagram = {
  kind: "matrix";
  rows: (number | string)[][];
  highlight?: { r: number; c: number; state?: CellState }[];
  rowLabels?: string[];
  colLabels?: string[];
  title?: string;
};

export type Diagram = ArrayDiagram | GraphDiagram | TreeDiagram | PointsDiagram | PlotDiagram | BarsDiagram | MatrixDiagram;

export type Frame = { caption: string; diagram?: Diagram; diagrams?: Diagram[] };
export type Walkthrough = { title: string; intro?: string; frames: Frame[] };
export type WalkthroughData = Record<string, Walkthrough[]>;
