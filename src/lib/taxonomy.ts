// Subjects + topics mirror the GATE DA 2027 syllabus (IIT Madras).
// Topic strings MUST match the ones used in src/data/questions.json.

export type SubjectDef = {
  name: string;
  slug: string;
  short: string;
  color: string; // css var name
  phase: number; // roadmap phase (dependency order)
  why: string; // why this subject matters / how it connects
  topics: string[];
};

export const SUBJECTS: SubjectDef[] = [
  {
    name: "Probability & Statistics",
    slug: "probability-statistics",
    short: "Prob & Stats",
    color: "--c1",
    phase: 1,
    why: "Foundation for Machine Learning (Naive Bayes, logistic regression, Bayesian networks). Usually the single biggest subject in DA.",
    topics: [
      "Counting & Combinatorics",
      "Basic Probability & Conditional Probability",
      "Bayes Theorem",
      "Random Variables & Expectation/Variance",
      "Discrete Distributions",
      "Continuous Distributions",
      "Joint, Marginal & Conditional Distributions",
      "Descriptive Statistics, Covariance & Correlation",
      "Central Limit Theorem & Sampling",
      "Confidence Intervals & Hypothesis Testing",
    ],
  },
  {
    name: "Linear Algebra",
    slug: "linear-algebra",
    short: "Lin Alg",
    color: "--c2",
    phase: 1,
    why: "Language of ML: regression is a projection, PCA is eigenvectors, SVD everywhere.",
    topics: [
      "Vector Spaces, Subspaces & Independence",
      "Matrices & Special Matrices (Projection/Orthogonal/Idempotent)",
      "Systems of Linear Equations & Gaussian Elimination",
      "Rank, Nullity & Determinant",
      "Eigenvalues & Eigenvectors",
      "Quadratic Forms & Definiteness",
      "LU Decomposition & SVD",
      "Projections",
    ],
  },
  {
    name: "Calculus & Optimization",
    slug: "calculus-optimization",
    short: "Calculus",
    color: "--c3",
    phase: 1,
    why: "Small syllabus, needed for gradient descent and loss minimisation. Quick marks.",
    topics: [
      "Limits & Continuity",
      "Differentiability & Derivatives",
      "Taylor Series",
      "Maxima, Minima & Optimization",
      "Series & Integration (beyond syllabus)",
    ],
  },
  {
    name: "Machine Learning",
    slug: "machine-learning",
    short: "ML",
    color: "--c4",
    phase: 2,
    why: "Core of the paper. Builds directly on probability + linear algebra, so study after the maths.",
    topics: [
      "Linear Regression (Simple/Multiple)",
      "Ridge Regression & Regularization",
      "Logistic Regression",
      "k-Nearest Neighbours",
      "Naive Bayes",
      "Linear Discriminant Analysis",
      "Support Vector Machines",
      "Decision Trees & Entropy",
      "Bias-Variance & Model Evaluation",
      "Cross-Validation",
      "Neural Networks / MLP",
      "Clustering (k-means/k-medoid)",
      "Hierarchical Clustering",
      "PCA & Dimensionality Reduction",
    ],
  },
  {
    name: "Programming, DS & Algorithms",
    slug: "programming-dsa",
    short: "Prog & DSA",
    color: "--c5",
    phase: 3,
    why: "Python output-tracing + classic data structures. Independent of maths, very practice-driven.",
    topics: [
      "Python Programming",
      "Stacks & Queues",
      "Linked Lists",
      "Trees & BST",
      "Hash Tables",
      "Searching (Linear/Binary)",
      "Basic Sorting (Selection/Bubble/Insertion)",
      "Divide & Conquer (Merge/Quick Sort)",
      "Algorithm Complexity / Recurrences",
      "Graph Theory Basics",
      "Graph Traversals (BFS/DFS)",
      "Shortest Paths",
    ],
  },
  {
    name: "DBMS & Warehousing",
    slug: "dbms-warehousing",
    short: "DBMS",
    color: "--c6",
    phase: 4,
    why: "Self-contained, rule-based subject. SQL, relational algebra and normal forms are very scoring.",
    topics: [
      "ER Model",
      "Relational Algebra",
      "Tuple Relational Calculus",
      "SQL",
      "Integrity Constraints & Keys",
      "Functional Dependencies & Normal Forms",
      "File Organization & Indexing",
      "Data Transformation (Normalization/Discretization/Sampling/Compression)",
      "Data Warehouse Modelling (Star/Snowflake, OLAP, Concept Hierarchies)",
    ],
  },
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    short: "AI",
    color: "--c7",
    phase: 4,
    why: "Search + logic + Bayesian networks. Bayes nets reuse probability, search reuses graph traversal.",
    topics: [
      "Uninformed Search",
      "Informed Search (A*, heuristics)",
      "Adversarial Search (Minimax, Alpha-Beta)",
      "Propositional Logic",
      "Predicate / First-Order Logic",
      "Bayesian Networks & Conditional Independence",
      "Exact Inference (Variable Elimination)",
      "Approximate Inference (Sampling)",
    ],
  },
  {
    name: "General Aptitude",
    slug: "general-aptitude",
    short: "Aptitude",
    color: "--c8",
    phase: 0,
    why: "Fixed 15 marks every year (10 questions). Easiest marks in the paper; practise a little every week.",
    topics: [
      "Verbal Ability",
      "Quantitative Aptitude",
      "Analytical / Logical Reasoning",
      "Spatial / Visual Reasoning",
      "Data Interpretation",
    ],
  },
];

export const YEARS = [2024, 2025, 2026] as const;

export const subjectBySlug = (slug: string) => SUBJECTS.find((s) => s.slug === slug);
export const subjectByName = (name: string) => SUBJECTS.find((s) => s.name === name);

export const topicSlug = (t: string) =>
  t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
