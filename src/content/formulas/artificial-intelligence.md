# Artificial Intelligence: formula sheet

## Uninformed Search

**Frontier rule decides the algorithm**
$$\text{BFS = queue (FIFO)}, \quad \text{DFS = stack (LIFO)}, \quad \text{UCS = smallest } g$$
Only the "which node next" rule changes · *Use when:* tracing a search · *e.g.* frontier [A, B], new child C: BFS gives [A, B, C] (take A); DFS gives [C, A, B] (take C)

**Nodes in a full tree to depth $d$**
$$1 + b + b^2 + \dots + b^d = \frac{b^{d+1}-1}{b-1}$$
Each level is $b$ times bigger · *Use when:* counting BFS nodes · *e.g.* $b=3, d=2$: $\frac{27-1}{2} = 13$

**Properties table**

| Algorithm | Complete? | Optimal? | Time | Space |
|---|---|---|---|---|
| BFS | Yes (finite $b$) | Yes if equal step costs | $O(b^d)$ | $O(b^d)$ |
| DFS | No (infinite paths) | No | $O(b^m)$ | $O(bm)$ |
| DLS (limit $\ell$) | Only if $\ell \ge d$ | No | $O(b^\ell)$ | $O(b\ell)$ |
| IDS | Yes | Yes if equal step costs | $O(b^d)$ | $O(bd)$ |
| UCS | Yes (costs $\ge \epsilon > 0$) | Yes | $O(b^{1+\lfloor C^*/\epsilon \rfloor})$ | same |

$b$ = branching factor, $d$ = goal depth, $m$ = max depth, $C^*$ = best cost · *Use when:* theory MCQs · *e.g.* least memory and still complete: IDS

**IDS total nodes generated**
$$(d+1)\cdot 1 + d\,b + (d-1)\,b^2 + \dots + 1\cdot b^d$$
Shallow levels repeat but are small · *Use when:* comparing IDS with BFS · *e.g.* $b=10, d=5$: IDS 123,456 vs BFS 111,111

**Uninformed vs informed**
$$\text{uses } h(n) \Rightarrow \text{informed}$$
BFS, DFS, DLS, IDS, UCS are blind; greedy and A\* are informed · *Use when:* classification questions · *e.g.* A\* is not uninformed

## Informed Search (A*, heuristics)

**A\* score**
$$f(n) = g(n) + h(n)$$
Cost paid so far plus guessed cost to go; expand smallest $f$ · *Use when:* tracing A\* · *e.g.* $g=4, h=2$: $f=6$

**Greedy best-first**
$$f(n) = h(n)$$
Only the guess; fast but not optimal · *Use when:* comparing with A\* · *e.g.* $h$: A 4, B 2 → greedy takes B

**A\* with $h = 0$ is UCS**
$$h(n) = 0 \Rightarrow f(n) = g(n)$$
No guess means cheapest-first · *e.g.* A\* with $h=0$ expands in UCS order

**Admissible**
$$0 \le h(n) \le h^*(n)$$
Never overestimates the true remaining cost · *Use when:* "is A\* optimal?" · *e.g.* $h^*=10$: $h=8$ ok, $h=12$ not

**Consistent (monotone)**
$$h(n) \le c(n,n') + h(n'), \quad h(\text{goal}) = 0$$
Guess drops by at most the edge cost; consistent implies admissible · *Use when:* checking a table edge by edge · *e.g.* $h(A)=4$, edge 2, $h(B)=2$: $4 \le 4$ ok

**Combining admissible $h_1, h_2$**

| Combination | Always admissible? |
|---|---|
| $\max(h_1,h_2)$, $\min(h_1,h_2)$ | Yes |
| $\lambda h_1 + (1-\lambda)h_2$, $0 \le \lambda \le 1$ | Yes |
| $\lvert h_1 - h_2 \rvert$ | Yes |
| $h_1+h_2$, $h_1 h_2$, $h_1/h_2$ | No |

Test with $h_1 = h_2 = h^*$ · *e.g.* $h^*=4$: $h_1+h_2 = 8 > 4$

**Dominance**
$$h_2(n) \ge h_1(n) \ \forall n, \text{ both admissible} \Rightarrow h_2 \text{ is better}$$
Bigger honest guess expands no more nodes · *e.g.* 8-puzzle: Manhattan distance dominates misplaced tiles

**Optimality conditions**
$$\text{tree search: admissible}; \quad \text{graph search: consistent}$$
*Use when:* theory MCQs · *e.g.* A\* graph search with consistent $h$ is optimal

**Trace rules**
Update a node's $g$ when a cheaper path appears; stop only when the goal is **expanded** · *e.g.* B at $g=4$, new path gives $g=3$: replace

## Adversarial Search (Minimax, Alpha-Beta)

**Minimax value**
$$\text{MAX node} = \max(\text{children}), \quad \text{MIN node} = \min(\text{children})$$
Back up from leaves to root · *Use when:* root value or best move · *e.g.* MIN leaves (8,6,-1) → -1; (1,5,7) → 1; MAX picks 1

**Alpha and beta**
$$\alpha = \text{highest so far for MAX}, \quad \beta = \text{lowest so far for MIN}$$
Start $\alpha = -\infty$, $\beta = +\infty$ · *e.g.* after MAX sees child 3: $\alpha = 3$

**Pruning rule**
$$\text{prune when } \alpha \ge \beta$$
At a MIN node prune if value $\le \alpha$; at a MAX node prune if value $\ge \beta$ · *e.g.* $\alpha = 3$, MIN's first leaf 2: prune the rest

**Pruning condition with an unknown leaf**
$$\text{MIN's first leaf} \le \alpha \text{ of MAX ancestor}$$
Write $\alpha$ as an expression, then solve · *e.g.* $\alpha = \min(6,y)$, first leaf 3: prune iff $y \ge 3$

**Search cost**
$$\text{minimax } O(b^m); \quad \text{alpha-beta best } O(b^{m/2}); \quad \text{random order } \approx O(b^{3m/4})$$
Good ordering doubles the searchable depth · *e.g.* $b=10, m=4$: $10^4$ vs $10^2$

**Facts**
Alpha-beta never changes the root value; the first child is never pruned.

## Propositional Logic

**Truth table of connectives**

| $p$ | $q$ | $\neg p$ | $p \wedge q$ | $p \vee q$ | $p \Rightarrow q$ | $p \Leftrightarrow q$ |
|---|---|---|---|---|---|---|
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

$p \Rightarrow q$ is false only for T, F · *Use when:* any evaluation

**Implication as OR**
$$p \Rightarrow q \equiv \neg p \vee q$$
Condition false or result true · *e.g.* $p$=F: $\neg p \vee q$ = T

**Contrapositive**
$$p \Rightarrow q \equiv \neg q \Rightarrow \neg p$$
Equivalent; converse $q \Rightarrow p$ and inverse $\neg p \Rightarrow \neg q$ are not · *e.g.* "rain → wet" = "not wet → no rain"

**Biconditional**
$$p \Leftrightarrow q \equiv (p \Rightarrow q) \wedge (q \Rightarrow p)$$
True when both match · *Use when:* "exactly when", "if ... and not otherwise" · *e.g.* T, F gives F

**De Morgan**
$$\neg(p \wedge q) \equiv \neg p \vee \neg q, \quad \neg(p \vee q) \equiv \neg p \wedge \neg q$$
NOT flips AND/OR · *e.g.* "not (tea and coffee)" = "no tea or no coffee"

**Entailment**
$$X \models Y \iff X \Rightarrow Y \text{ valid} \iff X \wedge \neg Y \text{ unsatisfiable}$$
No row with $X$ = T and $Y$ = F · *e.g.* $P \wedge Q \models P$, but not $P \models P \wedge Q$

**Tautology shortcut**
$$A \Rightarrow B \text{ is a tautology iff } B = T \text{ in every row where } A = T$$
*e.g.* $(x \wedge \neg y) \Rightarrow (y \Rightarrow x)$: only row $x$=T, $y$=F; $F \Rightarrow T$ = T, tautology

**Inference rules**
$$\text{MP: } p,\ p \Rightarrow q \vdash q; \quad \text{MT: } \neg q,\ p \Rightarrow q \vdash \neg p; \quad \text{Res: } a \vee p,\ \neg p \vee b \vdash a \vee b$$
$\vdash$ = "lets us conclude" · *e.g.* $\neg Q \vee R$ and $\neg R$ resolve to $\neg Q$

**Rows in a truth table**
$$2^n$$
*e.g.* 3 variables: 8 rows

**Translation**
"A only if B" = $A \Rightarrow B$; "A if B" = $B \Rightarrow A$; "A unless B" = $\neg B \Rightarrow A$ · *e.g.* "Creative person succeeds iff disciplined" = $C \Rightarrow (S \Leftrightarrow D)$

## Predicate / First-Order Logic

**All A are B**
$$\forall x\ (A(x) \Rightarrow B(x))$$
Use $\Rightarrow$ with $\forall$ · *e.g.* all humans are mortal

**Some A is B**
$$\exists x\ (A(x) \wedge B(x))$$
Use $\wedge$ with $\exists$ · *e.g.* some fruit is sweet

**No A is B**
$$\forall x\ (A(x) \Rightarrow \neg B(x)) \equiv \neg \exists x\ (A(x) \wedge B(x))$$
*e.g.* no cat is a dog

**Quantifier negation**
$$\neg \forall x\ P(x) \equiv \exists x\ \neg P(x), \quad \neg \exists x\ P(x) \equiv \forall x\ \neg P(x)$$
$\forall$ = big AND, $\exists$ = big OR · *e.g.* $\forall x\ P \equiv \neg \exists x\ \neg P$

**Valid one way only**
$$\forall x\ P(x) \Rightarrow \exists x\ P(x); \quad \exists y \forall x\ R(x,y) \Rightarrow \forall x \exists y\ R(x,y)$$
Reverse directions fail · *e.g.* domain {1,2}, $P(1)$=T, $P(2)$=F breaks $\exists \Rightarrow \forall$

**Distribution**
$$\forall x\,(P \wedge Q) \equiv \forall x\,P \wedge \forall x\,Q; \quad \exists x\,(P \vee Q) \equiv \exists x\,P \vee \exists x\,Q$$
Not $\forall$ over $\vee$, not $\exists$ over $\wedge$ · *e.g.* $\exists x(P \wedge Q) \Rightarrow \exists x P \wedge \exists x Q$ one way only

**Validity check**
Valid = true in every non-empty domain; one counter-model proves "not valid" · *e.g.* use a 2-object domain

## Bayesian Networks & Conditional Independence

**Factorisation**
$$P(x_1,\dots,x_n) = \prod_{i} P(x_i \mid \text{parents}(X_i))$$
Multiply one CPT entry per node · *e.g.* $0.5 \times 0.5 \times 1 \times 0.5 = 0.125$

**Complement in a CPT**
$$P(X=0 \mid \text{pa}) = 1 - P(X=1 \mid \text{pa})$$
*e.g.* $P(S=1 \mid C=1)=0.1 \Rightarrow P(S=0 \mid C=1)=0.9$

**d-separation**

| Shape | Middle unobserved | Middle (or descendant) observed |
|---|---|---|
| Chain $A \to B \to C$ | open | blocked |
| Fork $A \leftarrow B \to C$ | open | blocked |
| Collider $A \to B \leftarrow C$ | blocked | open |

Independent given $Z$ iff every path is blocked · *e.g.* $U \to W \leftarrow V$: $U \perp V$ but not given $W$

**Explaining away**
Observing a common effect makes its causes dependent · *e.g.* wet grass: $P(R \mid W) = 0.740$ drops to $0.236$ once the sprinkler is known

**Local independences**
A node $\perp$ non-descendants given parents; a node $\perp$ everything given its Markov blanket (parents, children, children's other parents)

**Parameter count (binary)**
$$\text{node with } k \text{ parents: } 2^k; \quad \text{full joint: } 2^n - 1$$
*e.g.* C→S, C→R, S→W, R→W: $1+2+2+4 = 9$ vs 15

## Exact Inference (Variable Elimination)

**Posterior by enumeration**
$$P(Q \mid e) = \alpha \sum_y P(Q, e, y), \quad \alpha = \frac{1}{P(e)}$$
Add over hidden variables, then normalise · *e.g.* $0.432$ and $0.168$ → $\frac{0.432}{0.6} = 0.72$

**Summing out**
$$P(b) = \sum_a P(a)\,P(b \mid a)$$
Law of total probability · *e.g.* $0.6 \times 0.7 + 0.4 \times 0.2 = 0.5$

**VE loop**
Fix evidence → multiply factors with variable $Y$ → sum out $Y$ → repeat → normalise

**Order and cost**
Order changes cost, not the answer; cost depends on largest factor; polytree: linear; general: NP-hard

**Exact vs approximate**

| Method | Type |
|---|---|
| Enumeration, variable elimination | Exact |
| Prior, rejection, likelihood weighting, Gibbs | Approximate |

## Approximate Inference (Sampling)

**Draw a variable**
$$X = 1 \text{ if } u < P(X=1 \mid \text{pa})$$
*e.g.* $u = 0.15$, $P = 0.2$ → $X = 1$

**Rejection sampling**
$$\hat P(q \mid e) = \frac{N(q,e)}{N(e)}$$
Keep only samples matching evidence · *e.g.* 3 of 4 kept have $q$ → 0.75

**Likelihood weighting**
$$w = \prod_i P(e_i \mid \text{parents}(E_i)), \quad \hat P(q \mid e) = \frac{\sum_{q} w}{\sum w}$$
Evidence fixed, samples weighted · *e.g.* $\frac{0.9+0.99}{2.69} \approx 0.70$

**Gibbs sampling**
Resample one non-evidence variable at a time from $P(X \mid \text{Markov blanket})$; approximate (MCMC)

**Error**
$$\text{error} \propto \frac{1}{\sqrt N}$$
4 times more samples halves the error · *e.g.* $N$ from 100 to 400
