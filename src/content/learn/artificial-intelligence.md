# Artificial Intelligence

**Artificial Intelligence (AI)** is about making a computer act in a smart way. In GATE DA, "smart" means three simple skills. First, **finding a way** to a goal, like Google Maps finding a route from your home to the railway station. Second, **reasoning with facts**, like a detective who says "if the shop was closed, then he could not buy milk". Third, **reasoning when you are not sure**, like a doctor who says "fever and cough make flu likely, but not certain".

So the subject has three parts:
- **Search**: uninformed search (BFS, DFS), informed search (A\*), and game search (minimax, alpha-beta).
- **Logic**: propositional logic (true/false sentences) and first-order logic (sentences about "all" and "some").
- **Uncertainty**: Bayesian networks, exact inference and approximate inference (sampling).

**Why it matters for data science and AI.** Route planners, game engines and robot planners use search. Rule engines and databases use logic. Spam filters, medical tools and many ML models use Bayesian networks. They are all built on probability, which you already study in Probability & Statistics.

**How GATE tests it.** From 2024 to 2026, GATE asked **17 AI questions worth 24 marks** (10 marks in 2024, 6 in 2025, 8 in 2026). Logic alone gave **10 of the 24 marks**. Most questions test one clear idea: Is this a tautology? Is this heuristic admissible? Which independence is false? A few ask you to trace an algorithm by hand: the A\* expansion order, an alpha-beta pruning condition, a minimax value, or a joint probability from tables. The questions are short. If you know the idea clearly, they are easy marks.

**Study order, and why.**
1. **Uninformed Search** first. It reuses BFS and DFS from Data Structures.
2. **Informed Search**. It adds one number (the heuristic) to the same idea.
3. **Adversarial Search**. It is search with two players.
4. **Propositional Logic**, then **First-Order Logic**. The second one is built on the first.
5. **Bayesian Networks**, then **Exact Inference**, then **Approximate Inference**. Revise conditional probability and Bayes' rule before this part.

**Free resources.**
- Russell & Norvig, *Artificial Intelligence: A Modern Approach*, chapters 3, 5, 7, 8, 13, 14. GATE questions follow this book's definitions.
- NPTEL: *An Introduction to Artificial Intelligence* by Prof. Mausam (IIT Delhi).
- UC Berkeley CS188 lecture videos on YouTube. They explain A\*, alpha-beta and Bayes nets very clearly.

## Uninformed Search

### The big idea
A computer must find a path from a **start** to a **goal**, but it has no idea where the goal is. **Uninformed search** (also called **blind search**) tries paths in a fixed order. The algorithms differ only in **which waiting place they visit next**.

### Before you start
This topic needs a few small ideas. Each one is explained from zero here.

**1. A graph (from Data Structures).** A graph is a set of dots, called **nodes**, joined by lines, called **edges**. An edge with an arrow is **directed**: you may walk it only in that direction.

An edge can carry a number called its **cost**, like the km of a road. *Example: S → A with cost 1 means "you can go from S to A, and it costs 1".*

**2. A tree and its levels.** A tree is a graph that starts at one top node, the **root**, and branches downward with no loops. The root is at **level 0** (depth 0), its children are at level 1, their children at level 2, and so on.

*Example: a family tree. Grandfather = level 0, his sons = level 1, grandchildren = level 2.*

**3. Queue and stack (see Data Structures).** A **queue** is a line at a ticket counter: the first person in is the first person out (FIFO). A **stack** is a pile of plates: the last plate put on top is the first one taken off (LIFO).

*Example: put 1, 2, 3 in. A queue gives back 1 first. A stack gives back 3 first.*

**4. Priority queue.** A list that always gives back the item with the **smallest number** attached, no matter when it was added. *Example: items A(5), B(2), C(9). It gives back B first, because 2 is the smallest.*

**5. Powers.** $b^d$ means "$b$ multiplied by itself $d$ times". *Example: $2^3 = 2 \times 2 \times 2 = 8$, and $b^0 = 1$ for any $b$.*

**6. The sum symbol $\sum$.** $\sum_{k=0}^{d} b^k$ means "put $k = 0, 1, 2, \dots, d$ into $b^k$ and add all the results". *Example: $\sum_{k=0}^{2} 3^k = 3^0 + 3^1 + 3^2 = 1 + 3 + 9 = 13$.*

**7. Big-O.** $O(b^d)$ means "grows roughly like $b^d$ when the problem gets big". We keep only the biggest term and drop small terms and constant multipliers. *Example: $1000 + 100 + 10 + 1$ is "about $1000$", so it is $O(10^3)$.*

**8. Floor.** $\lfloor x \rfloor$ means "round $x$ down to a whole number". *Example: $\lfloor 3.7 \rfloor = 3$, and $\lfloor 4 \rfloor = 4$.*

### Intuition
Imagine you are new in a big college. You must find the library. Nobody gives you a map.

You stand at the gate. You can see three corridors. You write them on a paper list called **"to visit"**. You walk into one corridor. You find more corridors, so you add them to the list. You also keep a second list, **"already visited"**, so you never walk the same corridor twice.

Now the only question is: **which place on the "to visit" list do you pick next?**
- **BFS (Breadth-First Search)**: pick the place you wrote **earliest**. Like a queue at a ticket counter: first come, first served. You check all places one step away, then all places two steps away, and so on.
- **DFS (Depth-First Search)**: pick the place you wrote **most recently**. Like a stack of plates: you take the top plate. You go deeper and deeper down one corridor, and come back only at a dead end.
- **UCS (Uniform-Cost Search)**: pick the place that is **cheapest to reach so far** (in metres walked). Like an auto driver who always continues the shortest trip found so far.

> **Intuition:** All blind search algorithms are the same machine: take a place off the "to visit" list, check if it is the goal, add its neighbours. Only the rule for "take" changes. Queue gives BFS. Stack gives DFS. Cheapest-first gives UCS.

### Words you need
- **State**: one situation of the problem. *Example: "I am at corridor A".*
- **Start state / goal state**: where you begin / where you want to reach. *Example: gate = start, library = goal.*
- **Successor (child)**: a state you can reach in one move. *Example: from S you can go to A or B, so A and B are successors of S.*
- **Expand a node**: take it off the list and generate all its children. *Example: expanding S adds A and B.*
- **Frontier (open list)**: states that are found but **not yet expanded**. The "to visit" list. *Example: after expanding S, frontier = [A, B].*
- **Explored set (closed list)**: states already expanded. The "already visited" list. *Example: {S}.*
- **Branching factor $b$**: the number of children each node has. *Example: every corridor splits into 3, so $b = 3$.*
- **Depth $d$**: number of steps from start to the nearest goal. *Example: gate → A → library has $d = 2$.*
- **Maximum depth $m$**: the longest path in the whole space. Can be infinite.
- **Complete**: the algorithm always finds a goal if one exists.
- **Optimal**: the algorithm finds the **cheapest** path.
- **Step cost**: the price of one move, like distance in km. *Example: S→A costs 1.*
- **Depth-limited search (DLS)**: DFS that is not allowed to go deeper than a limit $\ell$.
- **Iterative deepening search (IDS)**: run DLS with limit 0, then 1, then 2, ... until the goal is found.

### Formulas, explained

**Nodes in a full tree up to depth $d$**
$$1 + b + b^2 + \dots + b^d = \frac{b^{d+1}-1}{b-1}$$
- **Read it as:** "one root, plus $b$ children, plus $b$ squared grandchildren, and so on, up to depth $d$."
- **Symbols:** $b$ = branching factor; $d$ = depth of the goal.
- **Why it makes sense:** each level has $b$ times more nodes than the level above. So level $k$ has $b^k$ nodes. The fraction is a shortcut for this sum (see "Where the formulas come from").
- **Use it when:** asked how many nodes BFS may generate, or how much memory it needs.

**Time and space of each algorithm**

| Algorithm | Frontier type | Complete? | Optimal? | Time | Space |
|---|---|---|---|---|---|
| BFS | queue (FIFO) | Yes, if $b$ is finite | Yes, if all step costs are equal | $O(b^d)$ | $O(b^d)$ |
| DFS | stack (LIFO) | No (can fall into an infinite path) | No | $O(b^m)$ | $O(bm)$ |
| DLS (limit $\ell$) | stack, stop at depth $\ell$ | Only if $\ell \ge d$ | No | $O(b^\ell)$ | $O(b\ell)$ |
| IDS | DLS with $\ell = 0,1,2,\dots$ | Yes | Yes, if all step costs are equal | $O(b^d)$ | $O(bd)$ |
| UCS | priority queue on cost $g$ | Yes, if every cost $\ge \epsilon > 0$ | Yes | $O(b^{1+\lfloor C^*/\epsilon \rfloor})$ | same as time |

- **Read it as:** "BFS uses time and memory that grow like $b$ to the power $d$. DFS needs only about $b$ times $m$ memory."
- **Symbols:** FIFO = first in, first out. LIFO = last in, first out. $C^*$ = cost of the cheapest solution. $\epsilon$ (epsilon) = the smallest step cost. $\lfloor x \rfloor$ = round $x$ down.
- **Why it makes sense:** BFS must remember a whole level, and the last level has about $b^d$ nodes. DFS remembers only the current path ($m$ nodes) plus the brothers of each node on the path (about $b$ each), so $bm$.
- **Use it when:** a question asks "which algorithm is complete / optimal / memory-efficient?"

**Total nodes generated by IDS**
$$(d+1)\cdot 1 + d\cdot b + (d-1)\cdot b^2 + \dots + 1 \cdot b^d$$
- **Read it as:** "the root is generated $d+1$ times, level 1 is generated $d$ times, ..., the last level only once."
- **Symbols:** $b$ = branching factor; $d$ = goal depth.
- **Why it makes sense:** IDS restarts from the root each round. Shallow levels are repeated, but they are small. The last level is the biggest and is generated only once. So the extra work is small.
- **Use it when:** asked to compare IDS work with BFS work.

### Where the formulas come from

**A. Nodes in a full tree: $1 + b + \dots + b^d = \frac{b^{d+1}-1}{b-1}$**

Start with real numbers: $b = 2$ (every node has 2 children) and $d = 3$.

1. Level 0 has 1 node, the root. This is $2^0 = 1$.
2. Level 1 has $1 \times 2 = 2$ nodes, because the root has 2 children.
3. Level 2 has $2 \times 2 = 4$ nodes, because each of the 2 level-1 nodes has 2 children.
4. Level 3 has $4 \times 2 = 8$ nodes, for the same reason.
5. Total $= 1 + 2 + 4 + 8 = 15$.

Now use symbols. Every node on level $k-1$ has $b$ children, so level $k$ has $b$ times as many nodes as level $k-1$.

1. Level 0 has $1 = b^0$ node.
2. Level 1 has $b^1$ nodes, level 2 has $b^2$, and level $k$ has $b^k$. This is because we multiply by $b$ once per level.
3. Call the total $T$:
$$T = 1 + b + b^2 + \dots + b^d$$
4. Multiply both sides by $b$. Every term moves up one power:
$$bT = b + b^2 + \dots + b^d + b^{d+1}$$
5. Subtract line 3 from line 4. All the middle terms cancel, because they appear in both lines:
$$bT - T = b^{d+1} - 1$$
6. The left side is $(b-1)T$. Divide by $(b-1)$, which is allowed because $b > 1$:
$$T = \frac{b^{d+1}-1}{b-1}$$

Check with our numbers: $\frac{2^4 - 1}{2 - 1} = \frac{15}{1} = 15$. It matches the count above.

**B. Why BFS takes time and space $O(b^d)$**

1. BFS looks at the tree level by level. So before it reaches the goal at depth $d$, it may touch every node up to level $d$. That count is formula A.
2. Take $b = 10$, $d = 3$: total $= 1 + 10 + 100 + 1000 = 1111$. The last level alone is $1000$, which is 90% of the total.
3. So the total is "about $b^d$", because the last level is much bigger than all the others together. In Big-O we write $O(b^d)$.
4. For space: when BFS is at the last level, the queue holds that whole level, about $b^d$ nodes. That is why BFS memory is also $O(b^d)$.

**C. Why DFS needs only $O(bm)$ space**

1. DFS goes down one path. The path has at most $m$ nodes, because $m$ is the deepest possible path.
2. For each node on the path, DFS also stores its brothers that are still waiting on the stack. Each node has at most $b - 1$ brothers.
3. So memory is about $m \times b$ nodes. *Example: $b = 3$, $m = 4$ gives about $3 \times 4 = 12$ nodes, while BFS could need $3^4 = 81$.*

**D. Why BFS is optimal only when all step costs are equal**

1. BFS finds the goal with the **fewest edges** first, because it finishes level 1 before level 2, and so on.
2. If every edge costs the same, say 1, then cost $=$ number of edges. So the fewest edges also means the cheapest path.
3. If costs differ, a path with fewer edges can cost more. That is exactly what happens in Example 1 below (S-B-G has 2 edges but costs 7).

**E. Why DFS is not complete**

1. DFS always goes deeper before it tries a brother.
2. If one branch is infinitely long, DFS keeps going down it forever, because it never reaches a dead end that would send it back.
3. So it may never try the branch that has the goal. Example 3 below shows this with $1 \to 2 \to 4 \to 8 \to \dots$.

**F. IDS total: $(d+1)\cdot 1 + d\cdot b + \dots + 1\cdot b^d$**

This is formula A again, but each level is counted once for every round that reaches it.

1. IDS runs depth limit $0, 1, 2, \dots, d$. That is $d + 1$ rounds.
2. The root (level 0) is in every round, so it is generated $d + 1$ times.
3. Level 1 is in every round except the limit-0 round, so it is generated $d$ times. Each time it has $b$ nodes, giving $d \cdot b$.
4. Level $k$ is in the rounds with limit $k, k+1, \dots, d$. That is $d - k + 1$ rounds, giving $(d-k+1)\, b^k$.
5. The last level $d$ is only in the last round, so it counts once: $1 \cdot b^d$.

Numbers: $b = 10$, $d = 3$. IDS total $= 4 \cdot 1 + 3 \cdot 10 + 2 \cdot 100 + 1 \cdot 1000 = 1234$, while BFS total $= 1111$. So IDS does only about 11% extra work, because the repeated levels are the small ones.

That is why IDS also has time $O(b^d)$. And since each round is a DFS, it keeps the small DFS memory $O(bd)$.

**G. UCS time $O(b^{1+\lfloor C^*/\epsilon \rfloor})$**

1. UCS expands every path that is cheaper than the best answer $C^*$, because it always takes the cheapest path first.
2. Every step costs at least $\epsilon$. So a path with $k$ steps costs at least $k\epsilon$.
3. A path cheaper than $C^*$ therefore has at most $C^*/\epsilon$ steps. Round down, since steps are whole numbers: $\lfloor C^*/\epsilon \rfloor$.
4. UCS also generates the children of those nodes, which is one more level. So the depth is $1 + \lfloor C^*/\epsilon \rfloor$, and by idea B the work is $b$ to that power.

*Example: $C^* = 10$, $\epsilon = 3$. Then $\lfloor 10/3 \rfloor = 3$, so the work is about $b^{1+3} = b^4$.*

If all costs are equal, UCS expands nodes in the same order as BFS. So UCS is simply the "cost version" of BFS.

### Examples

We use **one small graph** for all traces. Edges are one-way (directed), with costs:

| Edge | Cost |
|---|---|
| S → A | 1 |
| S → B | 5 |
| A → C | 2 |
| A → D | 4 |
| B → G | 2 |
| C → G | 6 |
| D → G | 1 |

Start = S, goal = G. Rules: break ties in **alphabetical order**; test for the goal when a node is **expanded** (taken off the frontier); do not add a state that is already in the frontier or explored set (except UCS may **update** a cheaper cost). The possible paths are S-B-G (cost 7), S-A-C-G (cost 9) and S-A-D-G (cost 6).

**Example 1 (easy): BFS on the graph.** The frontier is a queue. New nodes join at the back.

| Step | Expand | Children added | Frontier (front → back) | Explored |
|---|---|---|---|---|
| 0 | none | none | [S] | { } |
| 1 | S | A, B | [A, B] | {S} |
| 2 | A | C, D | [B, C, D] | {S, A} |
| 3 | B | G | [C, D, G] | {S, A, B} |
| 4 | C | none (G already in frontier) | [D, G] | {S, A, B, C} |
| 5 | D | none (G already in frontier) | [G] | {S, A, B, C, D} |
| 6 | G | goal found | [ ] | {S, A, B, C, D, G} |

**Result:** BFS returns **S-B-G**. It has the fewest edges (2), but it costs $5 + 2 = 7$. This is not the cheapest, because BFS ignores costs.

**Example 2 (medium): DFS and UCS on the same graph.**

*DFS.* The frontier is a stack. We push children so that the alphabetically first child is on top. The top of the stack is written first.

| Step | Expand | Children pushed | Frontier (top → bottom) | Explored |
|---|---|---|---|---|
| 0 | none | none | [S] | { } |
| 1 | S | A, B | [A, B] | {S} |
| 2 | A | C, D | [C, D, B] | {S, A} |
| 3 | C | G | [G, D, B] | {S, A, C} |
| 4 | G | goal found | [D, B] | {S, A, C, G} |

**Result (DFS):** DFS returns **S-A-C-G**, cost $1 + 2 + 6 = 9$. It found a goal fast, but the worst path.

*UCS.* The frontier is sorted by $g$, the cost from S so far. The number after each node is its $g$.

| Step | Expand | What happens | Frontier (by $g$) | Explored |
|---|---|---|---|---|
| 0 | none | none | [S0] | { } |
| 1 | S (0) | A: $0+1=1$; B: $0+5=5$ | [A1, B5] | {S} |
| 2 | A (1) | C: $1+2=3$; D: $1+4=5$ | [C3, B5, D5] | {S, A} |
| 3 | C (3) | G: $3+6=9$ | [B5, D5, G9] | {S, A, C} |
| 4 | B (5) | G via B: $5+2=7 < 9$, update G to 7 | [D5, G7] | {S, A, C, B} |
| 5 | D (5) | G via D: $5+1=6 < 7$, update G to 6 | [G6] | {S, A, C, B, D} |
| 6 | G (6) | goal found | [ ] | {S, A, C, B, D, G} |

In step 4, B and D tie at 5, and B goes first by the alphabet rule.

**Result (UCS):** UCS returns **S-A-D-G** with cost **6**. This is the cheapest path.

**Example 3 (hard):** GATE level. Start state is 1. The successors of state $n$ are $2n$ and $2n+1$ (an infinite binary tree). States are taken in ascending order when there is a tie. Goal = 6. How many states does BFS expand **before** reaching 6? What happens to DFS?

*BFS:*

| Step | Expand | Children | Frontier |
|---|---|---|---|
| 0 | none | none | [1] |
| 1 | 1 | 2, 3 | [2, 3] |
| 2 | 2 | 4, 5 | [3, 4, 5] |
| 3 | 3 | 6, 7 | [4, 5, 6, 7] |
| 4 | 4 | 8, 9 | [5, 6, 7, 8, 9] |
| 5 | 5 | 10, 11 | [6, 7, 8, 9, 10, 11] |
| 6 | 6 | goal | |

**Result (BFS):** BFS expands **5 states** (1, 2, 3, 4, 5) before taking out the goal 6.

*DFS:* expand 1, then the smaller child 2, then 4, then 8, then 16, ... The path $1 \to 2 \to 4 \to 8 \to \dots$ never ends. DFS **never reaches 6**. This shows DFS is **not complete** on an infinite space.

*IDS fixes it:*
1. Limit 0 visits only 1.
2. Limit 1 visits 1, 2, 3.
3. Limit 2 visits 1, 2, 4, 5, 3, 6, and finds 6 at depth 2.

**Result:** BFS expands 5 states before 6. DFS never reaches 6. IDS finds 6 in the round with limit 2.

### Common mistakes
> **Common mistake:** Forgetting the tie-break rule. GATE always states one (for example "ascending order"). Write the frontier after every step and obey the rule exactly.

> **Common mistake:** Mixing up "goal test on generation" and "goal test on expansion". In Example 1, testing on generation would stop at step 3. Read the question for which rule it uses. The default in Russell & Norvig graph search is on expansion for UCS and A\*.

> **Common mistake:** Thinking BFS is always optimal. It is optimal only when **all step costs are equal**. Example 1 shows BFS returning cost 7 when 6 exists.

> **Common mistake:** Calling A\* or greedy search "uninformed". Any algorithm that uses a heuristic $h(n)$ is **informed**.

### How GATE asks it
- **2026 Q.13**: which algorithm is NOT uninformed? Answer: A\*, because it uses a heuristic. BFS, DFS and depth-limited search are blind.
- **2024 Q.44**: successors of $n$ are $n+1$ and $n+2$, goal 6, ascending tie-break, no re-expansion. Both BFS and DFS expand 1, 2, 3, 4, 5, so the counts are **equal**. The trap is assuming they must differ. Always simulate.
- Likely patterns: complete/optimal/space table facts; IDS overhead; a frontier trace with a given tie-break rule.

### Summary
- First we keep a "to visit" list (the frontier) and an "already visited" list (the explored set).
- Then we repeat one loop: take a node off the frontier, test it for the goal, and add its children.
- The only difference between BFS, DFS and UCS is the rule for taking: queue, stack, or cheapest $g$ first.
- BFS finds the path with the fewest edges, but it needs $O(b^d)$ memory, because the last level is huge.
- DFS needs little memory ($O(bm)$), but it can run forever down an infinite path, so it is not complete.
- IDS mixes the two: DFS memory with BFS completeness, for a small extra cost. UCS is the right choice when step costs differ.
- Next topic builds on this: Informed Search adds a guess $h(n)$ of the distance to the goal, so the search walks toward the goal instead of in all directions.

### Quick self-check
1. Which frontier data structure gives BFS, and which gives DFS?
**Answer:** BFS uses a queue (first in, first out). DFS uses a stack (last in, first out).

2. With $b = 2$ and $d = 3$, how many nodes are in the full tree up to depth 3?
**Answer:** $\frac{2^{4}-1}{2-1} = \frac{16-1}{1} = 15$. Check: $1 + 2 + 4 + 8 = 15$.

3. Which uninformed algorithm is optimal even when step costs are different?
**Answer:** Uniform-cost search (UCS), because it always expands the cheapest path first.

## Informed Search (A*, heuristics)

### The big idea
**Informed search** uses a **heuristic**: a quick guess of how far each state is from the goal. **A\*** picks the state where "cost already paid + guessed cost still to pay" is the smallest. With a good guess, it finds the cheapest path while exploring fewer states.

### Before you start
**1. Frontier, expand and $g(n)$ (see topic: Uninformed Search).** The frontier is the "to visit" list. To expand a node means to take it off the list and add its children.

$g(n)$ is the total cost paid from the start to node $n$. *Example: S → A costs 1 and A → B costs 2, so $g(B) = 1 + 2 = 3$ along that path.*

**2. UCS (see topic: Uninformed Search).** Uniform-cost search always expands the frontier node with the smallest $g$. A\* is UCS with one extra number added.

**3. What a function is.** A function is a rule that takes an input and gives back one output. $h(n)$ means "the number that the rule $h$ gives for node $n$".

*Example: if $h$ is "straight-line km to Mumbai", then $h(\text{Pune}) = 120$.*

**4. Inequality signs.** $a \le b$ means "$a$ is less than or equal to $b$". $a \ge b$ means "$a$ is greater than or equal to $b$". *Example: $3 \le 5$ is true, and $5 \le 5$ is also true.*

**5. max, min and $\lvert x \rvert$.** $\max(a, b)$ is the bigger of the two, and $\min(a, b)$ is the smaller. $\lvert x \rvert$ (absolute value) is the size of $x$ without its sign.

*Example: $\max(4, 7) = 7$, $\min(4, 7) = 4$, and $\lvert 4 - 7 \rvert = \lvert -3 \rvert = 3$.*

**6. The triangle rule.** Going straight from X to Z is never longer than going from X to Y and then Y to Z. *Example: Pune to Mumbai direct is not longer than Pune to Lonavala plus Lonavala to Mumbai.*

### Intuition
You are driving from Pune to Mumbai. At a junction you have two roads.
- Road 1: you have already driven 40 km. A signboard says "Mumbai 110 km".
- Road 2: you have already driven 20 km. The board says "Mumbai 150 km".

Which road looks better for the **whole trip**? Road 1: $40 + 110 = 150$ km. Road 2: $20 + 150 = 170$ km. So Road 1 looks better. That is exactly A\*.

The signboard is the **heuristic**. Here is the important part: the signboard should **never lie upward**. If a board says "110 km" but the real distance is only 90 km, you might wrongly reject a good road. A board that says less than or equal to the real distance is safe. Such a heuristic is called **admissible**.

Compare three drivers:
- **UCS driver**: looks only at km already driven. Safe, but explores in all directions.
- **Greedy driver**: looks only at the signboard. Fast, but can take a road that looks close but is long in total.
- **A\* driver**: adds both. Fast and, with an honest signboard, always finds the cheapest route.

> **Intuition:** $g$ is the money you already spent. $h$ is your estimate of the money still needed. A\* chooses the plan with the smallest total bill. If your estimate is never too high, you will never throw away the truly cheapest plan.

### Words you need
- **Heuristic $h(n)$**: a guess of the cost from state $n$ to the goal. *Example: straight-line distance on a map.*
- **True remaining cost $h^*(n)$**: the actual cheapest cost from $n$ to the goal. *Example: real road distance.*
- **Path cost $g(n)$**: cost already paid from the start to $n$. *Example: 40 km driven.*
- **Evaluation $f(n)$**: the score used to choose the next node. In A\*, $f = g + h$.
- **Admissible**: $h$ never overestimates. *Example: straight-line distance is never more than the road distance.*
- **Consistent (monotone)**: for every edge, $h$ cannot drop by more than the edge cost. *Example: if one road is 5 km, the guess can fall by at most 5 between its two ends.*
- **Dominates**: $h_2$ dominates $h_1$ if $h_2(n) \ge h_1(n)$ for all $n$ and both are admissible. A bigger honest guess is more useful.
- **Greedy best-first search**: expands the node with the smallest $h$ only.

### Formulas, explained

**A\* evaluation function**
$$f(n) = g(n) + h(n)$$
- **Read it as:** "f of n equals cost so far plus guessed cost to go."
- **Symbols:** $g(n)$ = cost from start to $n$; $h(n)$ = heuristic estimate from $n$ to goal; $f(n)$ = estimated total cost of the best path through $n$.
- **Why it makes sense:** it scores the **whole** trip, not just half of it.
- **Use it when:** tracing A\*. Always expand the frontier node with the smallest $f$.

**Admissible heuristic**
$$0 \le h(n) \le h^*(n) \quad \text{for every } n$$
- **Read it as:** "the guess is between zero and the true remaining cost."
- **Symbols:** $h^*(n)$ = true cheapest cost from $n$ to a goal.
- **Why it makes sense:** an underestimate makes a path look **cheaper** than it is, so A\* will still check it. An overestimate can hide the best path.
- **Use it when:** asked "is this heuristic admissible?" or "is A\* optimal here?"

**Consistent heuristic**
$$h(n) \le c(n, n') + h(n') \quad \text{and} \quad h(\text{goal}) = 0$$
- **Read it as:** "my guess at $n$ is at most the step cost to a neighbour plus the neighbour's guess."
- **Symbols:** $n'$ = a successor of $n$; $c(n, n')$ = cost of the edge from $n$ to $n'$.
- **Why it makes sense:** it is like the triangle rule for distances: one side cannot be longer than the other two sides together. Consistent always implies admissible, and with it $f$ never decreases along a path (both are shown in "Where the formulas come from").
- **Use it when:** checking a heuristic table edge by edge.

**Combining two admissible heuristics $h_1$ and $h_2$**

| Combination | Always admissible? |
|---|---|
| $\max(h_1, h_2)$ | Yes |
| $\min(h_1, h_2)$ | Yes |
| $\lambda h_1 + (1-\lambda) h_2$, with $0 \le \lambda \le 1$ | Yes (a weighted average) |
| $\lvert h_1 - h_2 \rvert$ | Yes |
| $h_1 + h_2$, $h_1 \times h_2$, $h_1 / h_2$ | No |

- **Read it as:** "the largest, the smallest, an average, or the gap of two honest guesses is still honest. A sum, product or ratio can overshoot."
- **Why it makes sense:** both values lie between $0$ and $h^*$. Max, min and average stay in that range. The gap $\lvert h_1 - h_2 \rvert$ is at most the bigger one, so it is also in range. But $h^* + h^* = 2h^*$ is too big.
- **Use it when:** a question lists combinations. Test with $h_1 = h_2 = h^*$.

**Special cases**

If $h(n) = 0$ for every node, A\* becomes **UCS**:
$$h(n) = 0 \;\Rightarrow\; f(n) = g(n)$$

If we use only the guess, we get **greedy best-first search**:
$$f(n) = h(n)$$

### Where the formulas come from

**A. $f(n) = g(n) + h(n)$**

1. Use the Pune example: Road 1 has 40 km already driven and a board says 110 km more.
2. The whole trip through Road 1 is "paid part + remaining part" $= 40 + 110 = 150$ km.
3. Name the paid part $g(n)$ and the guessed remaining part $h(n)$. Then the whole-trip estimate is $f(n) = g(n) + h(n)$.
4. Choosing the smallest $f$ means choosing the road whose **whole trip** looks shortest. That is the only new idea compared with UCS.

**B. Special cases come straight from formula A**

1. Put $h(n) = 0$ everywhere. Then $f(n) = g(n) + 0 = g(n)$. Picking the smallest $f$ is now picking the smallest $g$, which is UCS.
2. Drop $g$ and use $f(n) = h(n)$. Now we only look at the guess, which is greedy best-first search.
3. So UCS, greedy and A\* are one family: they differ only in which parts of $g + h$ they use.

**C. Why an admissible $h$ makes A\* find the cheapest path**

The full proof for graph search is longer, but the core idea fits in five steps. Let $C^*$ be the cost of the cheapest path.

1. Suppose a worse goal $G_2$ with cost $C_2 > C^*$ sits in the frontier. At a goal $h = 0$, so $f(G_2) = C_2$.
2. Some node $n$ on the cheapest path is still in the frontier, because that path has not been finished yet.
3. For this $n$: $f(n) = g(n) + h(n) \le g(n) + h^*(n)$, because admissible means $h(n) \le h^*(n)$.
4. And $g(n) + h^*(n) = C^*$, because "cost to reach $n$ on the best path + true cost from $n$ to the goal" is the whole best path.
5. So $f(n) \le C^* < C_2 = f(G_2)$. A\* takes the smaller $f$ first, so it expands $n$ before $G_2$, and this repeats until the best goal comes out first.

With numbers: Example 2 below has a best path of cost 5 and a worse goal of cost 6. With an honest $h(A) \le 3$, we get $f(A) \le 2 + 3 = 5 < 6$, so A would come out before the cost-6 goal. With the dishonest $h(A) = 5$, $f(A) = 7 > 6$, and the mistake happens.

**D. Why consistent implies admissible**

Small chain first: $n \to m \to \text{goal}$ with costs 2 and 3. So $h^*(m) = 3$ and $h^*(n) = 5$.

1. At the goal, $h(\text{goal}) = 0$ by definition.
2. Consistency on edge $m \to$ goal: $h(m) \le 3 + 0 = 3 = h^*(m)$.
3. Consistency on edge $n \to m$: $h(n) \le 2 + h(m) \le 2 + 3 = 5 = h^*(n)$, because we just showed $h(m) \le 3$.
4. In general, walk back from the goal one edge at a time along the cheapest path. Each step adds the true edge cost, so $h$ can never get above the true remaining cost $h^*$.

**E. Why consistent makes $f$ never decrease along a path**

1. Let $n'$ be a child of $n$. Then $g(n') = g(n) + c(n, n')$, because you pay one more edge.
2. So $f(n') = g(n) + c(n, n') + h(n')$.
3. Consistency says $c(n, n') + h(n') \ge h(n)$.
4. Put that in: $f(n') \ge g(n) + h(n) = f(n)$.

So $f$ only goes up (or stays the same) as you go deeper. Example 3 below shows this: the $f$ values come out as 5, 5, 5, 5, 7.

**F. The combination table**

Take a node with true cost $h^* = 10$, and two admissible guesses $h_1 = 6$, $h_2 = 8$.

1. $\max(6, 8) = 8 \le 10$. Safe, because the bigger of two numbers that are each $\le 10$ is still $\le 10$.
2. $\min(6, 8) = 6 \le 10$. Safe, for the same reason.
3. Average with $\lambda = 0.5$: $0.5 \times 6 + 0.5 \times 8 = 7 \le 10$. Safe, because an average always lies between the two numbers.
4. Gap: $\lvert 6 - 8 \rvert = 2 \le 10$. Safe, because subtracting a non-negative number from the larger one can only make it smaller, so the gap is $\le \max(h_1, h_2) \le h^*$.
5. Sum: $6 + 8 = 14 > 10$. Not safe, because two honest guesses added together can pass $h^*$.
6. Product: $6 \times 8 = 48 > 10$. Not safe.
7. Ratio: with $h_1 = 6$, $h_2 = 0.5$ we get $6 / 0.5 = 12 > 10$. Not safe, because dividing by a small number makes it big.

So the rule is: an operation is safe if its answer can never go above the bigger input.

### Examples

**Example 1 (easy):** The frontier holds three cities: P with $g = 30, h = 50$; Q with $g = 45, h = 20$; R with $g = 10, h = 80$. Which does A\* expand next? Which does greedy expand?
1. $f(P) = 30 + 50 = 80$
2. $f(Q) = 45 + 20 = 65$
3. $f(R) = 10 + 80 = 90$
4. Greedy looks only at $h$: 50, 20, 80. The smallest is Q's 20.
5. UCS looks only at $g$: 30, 45, 10. The smallest is R's 10.

**Result:** A\* expands **Q** (smallest $f = 65$). Greedy also picks **Q** here. UCS picks **R**.

**Example 2 (medium):** an overestimating heuristic gives a wrong answer. Edges: S→A cost 2, A→G cost 3, S→G cost 6. Heuristic: $h(S) = 4$, $h(A) = 5$, $h(G) = 0$.
1. True cost from A: $h^*(A) = 3$. But $h(A) = 5 > 3$. So $h$ is **not admissible**.
2. A\* expands S. Then A gets $f = 2 + 5 = 7$, and G gets $f = 6 + 0 = 6$.
3. G has the smaller $f$, so A\* expands G and stops with cost **6**.
4. But the path S-A-G costs $2 + 3 = 5$. A\* missed it because the guess at A was too high.

**Result:** A\* returns cost 6 instead of the true best 5. An overestimate can hide the best path.

**Example 3 (hard):** full A\* trace (GATE level). Directed edges with costs:

| Edge | Cost |
|---|---|
| S → A | 1 |
| S → B | 4 |
| A → B | 2 |
| A → C | 5 |
| B → C | 1 |
| C → G | 3 |

Heuristic: $h(S) = 5$, $h(A) = 4$, $h(B) = 2$, $h(C) = 1$, $h(G) = 0$. Find the expansion order and the path.

First, is $h$ consistent? Check every edge with $h(n) \le c + h(n')$:
- S→A: $5 \le 1 + 4 = 5$. Yes.
- S→B: $5 \le 4 + 2 = 6$. Yes.
- A→B: $4 \le 2 + 2 = 4$. Yes.
- A→C: $4 \le 5 + 1 = 6$. Yes.
- B→C: $2 \le 1 + 1 = 2$. Yes.
- C→G: $1 \le 3 + 0 = 3$. Yes.

So $h$ is consistent, and A\* will find the cheapest path. Now the trace. Each frontier entry is written as node($g$, $f$).

| Step | Expand | Work | Frontier | Explored |
|---|---|---|---|---|
| 0 | none | none | [S(0, 5)] | { } |
| 1 | S | A: $g = 1$, $f = 1+4 = 5$. B: $g = 4$, $f = 4+2 = 6$ | [A(1,5), B(4,6)] | {S} |
| 2 | A | B via A: $g = 1+2 = 3 < 4$, so update B to $f = 3+2 = 5$. C: $g = 1+5 = 6$, $f = 6+1 = 7$ | [B(3,5), C(6,7)] | {S, A} |
| 3 | B | C via B: $g = 3+1 = 4 < 6$, so update C to $f = 4+1 = 5$ | [C(4,5)] | {S, A, B} |
| 4 | C | G: $g = 4+3 = 7$, $f = 7+0 = 7$ | [G(7,7)] | {S, A, B, C} |
| 5 | G | goal | [ ] | {S, A, B, C, G} |

**Result:** expansion order **S, A, B, C, G**. Path **S-A-B-C-G**, cost $1 + 2 + 1 + 3 = 7$.

Compare with greedy search, which uses only $h$: expand S (frontier A $h=4$, B $h=2$), then B (adds C $h=1$), then C (adds G $h=0$), then G. Path S-B-C-G costs $4 + 1 + 3 = 8$. Greedy is worse.

### Common mistakes
> **Common mistake:** Expanding by $h$ alone or by $g$ alone. A\* always uses the **sum** $f = g + h$.

> **Common mistake:** Forgetting to **update** a node when a cheaper path to it appears. In Example 3, B's $g$ drops from 4 to 3 in step 2. Missing this changes the order.

> **Common mistake:** Stopping when the goal is first **added** to the frontier. A\* stops only when the goal is **taken out** (expanded). A cheaper path may still appear.

> **Common mistake:** Thinking $h_1 + h_2$ is admissible "because both parts are". Try $h_1 = h_2 = h^*$: the sum is $2h^*$, which overestimates.

### How GATE asks it
- **2024 Q.23**: two admissible heuristics. Which is always admissible? Answer: $\lvert h_1 - h_2 \rvert$. The sum, product and ratio can overestimate.
- **2025 Q.44**: give the A\* expansion order on a small graph with costs and $h$ values. Keep a $g$/$f$ table, ignore worse paths, and expand the smallest $f$ each time. Answer: S, A, E, B, C, D, G.
- **2026 Q.13** (tagged Uninformed): A\* is informed because it uses $h$.
- Likely patterns: check admissibility/consistency from a table; dominance; greedy vs A\* path.

### Summary
- Uninformed search explores in all directions, because it has no idea where the goal is.
- So we add a guess $h(n)$ of the remaining cost, and score each node by the whole trip $f = g + h$.
- If the guess never overestimates (admissible), the cheapest path is never hidden, so A\* returns it.
- A consistent guess obeys the triangle rule on every edge; it is always admissible, and it makes $f$ never decrease.
- Setting $h = 0$ gives back UCS, and using $h$ alone gives greedy search, which is fast but not always cheapest.
- Max, min, average and gap of two honest guesses stay honest; sum, product and ratio can overshoot.
- Next topic builds on this: Adversarial Search keeps the idea of searching a tree of moves, but now an opponent picks every second move.

### Quick self-check
1. A node has $g = 7$ and $h = 4$. What is its $f$?
**Answer:** $f = 7 + 4 = 11$.

2. True cost to goal from X is 10. Is $h(X) = 12$ admissible?
**Answer:** No. $12 > 10$, so it overestimates.

3. What does A\* become when $h(n) = 0$ everywhere?
**Answer:** Uniform-cost search, because then $f = g$.

## Adversarial Search (Minimax, Alpha-Beta)

### The big idea
In a two-player game, you must plan for an opponent who is working **against** you. **Minimax** assumes both players play perfectly: you pick the best move, and the opponent picks the move that is worst for you. **Alpha-beta pruning** gives the same answer while skipping branches that cannot change the decision.

### Before you start
**1. Trees, root and leaves (see topic: Uninformed Search).** A tree starts at one top node, the root, and branches down. A node with no children is a **leaf**. *Example: root = "my move now", leaves = "game over" positions.*

**2. max and min.** $\max(3, 9) = 9$ picks the bigger number, and $\min(3, 9) = 3$ picks the smaller. $\max_c$ means "the biggest value over all children $c$".

*Example: children worth 3, 12, 8 give $\max_c = 12$ and $\min_c = 3$.*

**3. Infinity.** $+\infty$ means "bigger than every number" and $-\infty$ means "smaller than every number". We use them as starting values. *Example: $\max(-\infty, 5) = 5$, so the first real value always replaces $-\infty$.*

**4. A rule written in cases.** A big curly bracket $\{$ lists different rules for different situations, like "if leaf, do this; if MAX, do that". You read the line whose condition is true.

**5. A rule that uses itself.** The minimax value of a node is defined using the minimax values of its children. This is fine because the children are lower in the tree, and at the leaves we stop. *Example: your marks total = marks of section A + marks of section B, and each section total is built from its own questions.*

**6. Intervals.** $[3, \infty)$ means "every number from 3 upward, including 3". A square bracket includes the end point; a round bracket does not. *Example: $y = 3$ and $y = 50$ are in $[3, \infty)$, but $y = 2.9$ is not.*

**7. DFS order (see topic: Uninformed Search).** Minimax and alpha-beta visit the tree in DFS order: go down the leftmost branch fully, then come back and try the next one.

### Intuition
You and your friend play a game for chocolates. You choose a box. Then your friend chooses one chocolate packet from that box **for you**. Your friend wants you to get as few chocolates as possible.

- Box 1 has packets of 8, 6 and 1 chocolates.
- Box 2 has packets of 4, 5 and 7.

If you pick Box 1, your friend gives you the packet with 1. If you pick Box 2, your friend gives you 4. So Box 1 is worth 1 and Box 2 is worth 4. You should pick **Box 2**, even though Box 1 has the biggest packet (8). Your friend will never let you have the 8.

That is minimax. You are **MAX** (you want a big number). Your friend is **MIN** (wants a small number). We fill values from the bottom up.

Now alpha-beta. Suppose you already know Box 2 gives you at least 4. You open Box 3 and the first packet is 2. Your friend can give you 2 or something even smaller. So Box 3 is worth **at most 2**, which is less than 4. You do not need to look at the other packets in Box 3. You will never choose it. Skipping those packets is called **pruning**.

> **Intuition:** $\alpha$ (alpha) is "the best MAX can already guarantee". $\beta$ (beta) is "the best MIN can already guarantee". Once a branch is clearly worse for one player than an option they already have, stop looking at it.

### Words you need
- **Game tree**: a tree of all moves. The root is the current position. *Example: root = your turn, children = your 3 possible moves.*
- **MAX node**: a node where MAX moves and picks the largest child value.
- **MIN node**: a node where MIN moves and picks the smallest child value.
- **Terminal (leaf) node**: the game ends here. It has a **utility**, a score for MAX. *Example: +1 win, 0 draw, -1 loss.*
- **Ply**: one move by one player. *Example: MAX then MIN = 2 plies.*
- **Zero-sum**: one player's gain is the other's loss.
- **Back up a value**: copy the max or min of the children up to the parent.
- **$\alpha$**: the **highest** value found so far for MAX along the current path. It starts at $-\infty$.
- **$\beta$**: the **lowest** value found so far for MIN along the current path. It starts at $+\infty$.
- **Prune**: skip the remaining children of a node.

### Formulas, explained

**Minimax value**
$$\text{MINIMAX}(n)=\begin{cases}\text{Utility}(n) & \text{if } n \text{ is a leaf}\\ \max_{c}\ \text{MINIMAX}(c) & \text{if } n \text{ is a MAX node}\\ \min_{c}\ \text{MINIMAX}(c) & \text{if } n \text{ is a MIN node}\end{cases}$$
- **Read it as:** "a leaf's value is its score. A MAX node takes the biggest child value. A MIN node takes the smallest child value."
- **Symbols:** $n$ = a node; $c$ = each child of $n$.
- **Why it makes sense:** each player picks what is best for them, assuming the other does the same.
- **Use it when:** asked for the root value or MAX's best move.

**Alpha-beta update and pruning rules**
At a **MAX** node, after each child value $v$:
$$\alpha = \max(\alpha, v), \qquad \text{prune the rest if } v \ge \beta$$

At a **MIN** node, after each child value $v$:
$$\beta = \min(\beta, v), \qquad \text{prune the rest if } v \le \alpha$$

Both rules are one rule:
$$\text{Prune when } \alpha \ge \beta$$
- **Read it as:** "stop exploring when MAX's guaranteed value is at least MIN's guaranteed value."
- **Symbols:** $\alpha$ = MAX's best so far (a floor); $\beta$ = MIN's best so far (a ceiling).
- **Why it makes sense:** the final answer must be at least $\alpha$ and at most $\beta$. If $\alpha \ge \beta$, no value fits in between, so this branch cannot be chosen.
- **Use it when:** asked which leaves are pruned, or for what value of $x$ a branch is pruned.

**Cost of the search**
$$\text{Minimax: } O(b^m) \qquad \text{Alpha-beta, best ordering: } O(b^{m/2})$$
- **Read it as:** "minimax looks at about $b$ to the power $m$ nodes. Alpha-beta with perfect move order looks at about $b$ to the power $m/2$."
- **Symbols:** $b$ = moves per position; $m$ = depth of the tree.
- **Why it makes sense:** with good ordering, about half the levels are skipped. So, in the same time, alpha-beta can search about **twice as deep**. With random order it is about $O(b^{3m/4})$.
- **Use it when:** a theory question asks about the effect of pruning or move ordering.

Two facts: alpha-beta **never changes the root value**, and the **first child** of a node is never pruned.

### Where the formulas come from

**A. The minimax value**

Use the chocolate game from the Intuition. Box 1 has 8, 6, 1. Box 2 has 4, 5, 7.

1. Start at the leaves. Their values are given: the number of chocolates.
2. Inside a box, your friend (MIN) chooses. MIN wants you to get little, so MIN takes the smallest: Box 1 $= \min(8, 6, 1) = 1$ and Box 2 $= \min(4, 5, 7) = 4$.
3. At the top, you (MAX) choose. You want a lot, so you take the biggest: $\max(1, 4) = 4$.
4. Now write the same three steps as a rule. A leaf keeps its score. A MIN node takes the min of its children. A MAX node takes the max of its children.

That rule is exactly the formula $\text{MINIMAX}(n)$. It works from the bottom up, because each node needs its children's values first.

**B. Why we prune when $\alpha \ge \beta$**

Numbers first, from the Intuition. You already know Box 2 is worth 4.

1. So MAX can already guarantee 4. That is $\alpha = 4$.
2. In Box 3, the first packet is 2. MIN can give you 2 or less, so Box 3 is worth **at most 2**. That is $\beta = 2$ for Box 3.
3. Box 3 is worth at most 2, and you already have 4. So you will never pick Box 3, whatever the other packets are.
4. Here $\alpha = 4 \ge \beta = 2$, and we stop looking inside Box 3.

Now in general.

1. $\alpha$ is a **floor**: MAX already has a choice worth $\alpha$ somewhere above, so MAX will never accept less.
2. $\beta$ is a **ceiling**: MIN already has a choice worth $\beta$ somewhere above, so MIN will never allow more.
3. So a node can only matter to the final answer if its value lies between $\alpha$ and $\beta$.
4. If $\alpha \ge \beta$, no value is both $\ge \alpha$ and $\le \beta$ (apart from the edge case of equality, where either choice gives the same value). So nothing in this branch can change the decision, and we skip it.

At a MIN node, this check reads "value so far $v \le \alpha$". At a MAX node, it reads "value so far $v \ge \beta$". Both are the same rule $\alpha \ge \beta$ written from each side.

**C. Why alpha-beta never changes the root value**

1. We only skip a branch after showing that its player above would never choose it (idea B).
2. A branch that is never chosen cannot affect the max or min taken above it.
3. So the root gets exactly the same value as plain minimax, only with less work.

**D. Cost: $O(b^m)$ and $O(b^{m/2})$**

1. Plain minimax visits every node. A full tree with $b$ moves per position and depth $m$ has about $b^m$ leaves (see topic: Uninformed Search, formula A).
2. The exact proof for alpha-beta is not needed for GATE. The idea: if the best move is always looked at first, then at every second level only **one** child needs full checking, and the others are cut after their first look.
3. So we pay a full factor $b$ only on half of the $m$ levels. That gives about $b^{m/2}$.

With numbers: $b = 10$, $m = 4$. Minimax looks at $10^4 = 10000$ leaves. Perfect alpha-beta looks at about $10^{2} = 100$.

Turn it around: in the time minimax needs for depth $m$, alpha-beta can reach depth $2m$, because $b^{2m/2} = b^m$. That is why we say it searches about twice as deep.

### Examples

**Example 1 (easy):** two-ply minimax. MAX at the root has two moves, L and R. After L, MIN chooses from leaves 3 and 9. After R, MIN chooses from leaves 5 and 6.
1. MIN after L: $\min(3, 9) = 3$.
2. MIN after R: $\min(5, 6) = 5$.
3. MAX at root: $\max(3, 5) = 5$.

**Result:** root value = 5, and MAX plays **R**.

**Example 2 (medium):** alpha-beta trace. Root A is MAX. It has three MIN children, read left to right:
- B with leaves 3, 12, 8
- C with leaves 2, 4, 6
- D with leaves 14, 5, 2

| Step | Node | Leaf seen | Value so far | $\alpha$ | $\beta$ | Action |
|---|---|---|---|---|---|---|
| 1 | B (MIN) | 3 | 3 | $-\infty$ | 3 | continue |
| 2 | B | 12 | $\min(3,12) = 3$ | $-\infty$ | 3 | continue |
| 3 | B | 8 | $\min(3,8) = 3$ | $-\infty$ | 3 | B done, B = 3 |
| 4 | A (MAX) | B = 3 | 3 | 3 | $+\infty$ | update $\alpha = 3$ |
| 5 | C (MIN) | 2 | 2 | 3 | 2 | $2 \le \alpha = 3$: **prune 4 and 6** |
| 6 | A | C = 2 | $\max(3,2) = 3$ | 3 | $+\infty$ | no change |
| 7 | D (MIN) | 14 | 14 | 3 | 14 | $14 > 3$, continue |
| 8 | D | 5 | 5 | 3 | 5 | $5 > 3$, continue |
| 9 | D | 2 | 2 | 3 | 2 | D done, D = 2 |
| 10 | A | D = 2 | $\max(3,2) = 3$ | 3 | $+\infty$ | root = 3 |

**Result:** root value = **3**, MAX moves to B. Two leaves (4 and 6) were pruned. If D's leaves were in order 2, 5, 14, then 5 and 14 would also be pruned. Good ordering prunes more.

**Example 3 (hard):** pruning condition with an unknown leaf (GATE level). Root R is MAX with two MIN children, in this order:
- P with leaves 6 and $y$
- Q with a first leaf 3, and then a second subtree T

For which $y$ is T pruned?

1. P is a MIN node, so $P = \min(6, y)$.
2. After P, the root (MAX) has $\alpha = \min(6, y)$.
3. At Q (MIN), the first leaf is 3. So Q's value will be **at most 3**, because MIN can always choose 3.
4. T is pruned if $3 \le \alpha$, that is, $3 \le \min(6, y)$.
5. $\min(6, y) \ge 3$ means both $6 \ge 3$ (true) and $y \ge 3$, because the smaller of two numbers is $\ge 3$ only when both are.

**Result:** T is pruned exactly when $y \in [3, \infty)$.

Sanity check: take $y = 1$. Then $\alpha = 1$, and Q could still be 3, which beats 1. MAX must keep looking, so no pruning. That matches.

### Common mistakes
> **Common mistake:** Picking the branch with the **biggest leaf**. MIN will never let MAX reach it. Always back up values level by level.

> **Common mistake:** Swapping $\alpha$ and $\beta$. $\alpha$ belongs to **MAX** (highest so far). $\beta$ belongs to **MIN** (lowest so far).

> **Common mistake:** Pruning with a strict inequality. The standard rule prunes on **equality** too ($\alpha \ge \beta$). Check the options for $\le$ versus $<$.

> **Common mistake:** Thinking alpha-beta can change the answer. It only saves work. The root value is the same as plain minimax.

### How GATE asks it
- **2024 Q.25**: fill in the blanks. $\alpha$ = the **highest** value for MAX, $\beta$ = the **lowest** value for MIN.
- **2025 Q.43**: find the ranges of $x$ and $y$ for which a branch is pruned in two small trees. Answers: $x \le 2$ and $y \ge 2$. Same method as Example 3.
- **2026 Q.30 (NAT)**: two-ply tree with three moves each. Back up MIN values $-1, 1, -12$. MAX picks strategy **2**.
- Likely patterns: count pruned leaves; root value of a 3-ply tree; effect of move ordering.

### Summary
- In a game, the opponent picks every second move, and they work against us.
- So we fill values from the bottom up: MIN nodes take the smallest child value, MAX nodes take the biggest. This is minimax.
- That is why the branch with the biggest leaf is often not the best: MIN never lets MAX reach it.
- Alpha-beta keeps two numbers while searching: $\alpha$, the floor MAX already has, and $\beta$, the ceiling MIN already has.
- When $\alpha \ge \beta$, the current branch can never be chosen, so we skip it. The root value does not change.
- With good move order, alpha-beta looks at about $b^{m/2}$ nodes instead of $b^m$, so it can search about twice as deep.
- Next topic builds on this: Propositional Logic moves from searching to reasoning with true/false facts.

### Quick self-check
1. A MIN node has leaves 7, 2, 9. What is its value?
**Answer:** $\min(7, 2, 9) = 2$.

2. At a MIN node, $\alpha = 5$. Its first leaf is 4. What happens?
**Answer:** $4 \le 5$, so the remaining children are pruned. MAX already has 5 elsewhere.

3. Does the leftmost child of a node ever get pruned?
**Answer:** No. Pruning needs at least one value seen first.

## Propositional Logic

### The big idea
**Propositional logic** studies sentences that are either **true (T)** or **false (F)**, and how they combine with words like NOT, AND, OR, IF-THEN. A **truth table** lists every possible case, so you can check any claim mechanically.

### Before you start
This topic does not need earlier AI topics. It needs only a few school ideas, explained here.

**1. A statement.** A statement is a sentence that is either true or false, never both. *Example: "Delhi is in India" is true. "Close the door" is not a statement, because it is neither true nor false.*

**2. T and F.** We write **T** for true and **F** for false. A letter like $p$ stands for one statement, the way $x$ stands for a number in algebra.

**3. Counting cases by multiplying.** If one thing has 2 choices and another thing has 2 choices, together they have $2 \times 2 = 4$ choices. *Example: a shirt (red or blue) and a pant (black or grey) give 4 outfits.*

**4. Powers of 2.** $2^n$ means 2 multiplied by itself $n$ times. *Example: $2^3 = 2 \times 2 \times 2 = 8$.*

**5. "Same as" signs.** $\equiv$ means "has the same truth value in every case". $\iff$ (or $\Leftrightarrow$) means "if and only if": each side holds exactly when the other does. *Example: "today is Sunday" $\iff$ "tomorrow is Monday".*

**6. Brackets first.** As in arithmetic, work out what is inside brackets first. *Example: in $\neg(p \wedge q)$, first find $p \wedge q$, then flip it.*

### Intuition
Your mother says: "**If** it rains, **then** I will carry an umbrella."

When has she broken her promise? Think about all four cases.

1. It rains, she carries an umbrella. Promise kept.
2. It rains, she does **not** carry an umbrella. Promise **broken**.
3. It does not rain, she carries an umbrella. Promise kept (she said nothing about dry days).
4. It does not rain, no umbrella. Promise kept.

So an IF-THEN sentence is false in **only one case**: the "if" part is true and the "then" part is false. This one fact solves most GATE logic questions.

A **truth table** is exactly this list of cases. With 2 basic sentences there are $2 \times 2 = 4$ cases. With 3 sentences there are 8 cases.

> **Intuition:** Treat "if P then Q" as a promise. A promise is broken only when P happens and Q does not. Every other case keeps the promise.

### Words you need
- **Proposition**: a sentence that is true or false. *Example: p = "it is raining".*
- **Negation $\neg p$** (NOT): flips the truth value. *Example: $\neg p$ = "it is not raining".*
- **Conjunction $p \wedge q$** (AND): true only when both are true.
- **Disjunction $p \vee q$** (OR): true when at least one is true.
- **Implication $p \Rightarrow q$** (IF p THEN q): false only when $p$ is T and $q$ is F. Also written $p \rightarrow q$. Here $p$ is the **antecedent**, $q$ is the **consequent**.
- **Biconditional $p \Leftrightarrow q$** (p IF AND ONLY IF q): true when both have the **same** value.
- **Model**: one row of the truth table, one assignment of T/F to every variable.
- **Tautology (valid)**: true in **every** row. *Example: $p \vee \neg p$.*
- **Contradiction (unsatisfiable)**: false in every row. *Example: $p \wedge \neg p$.*
- **Satisfiable**: true in at least one row.
- **Equivalent ($\equiv$)**: two sentences with the same value in every row.
- **Entailment ($X \models Y$)**: in every row where $X$ is true, $Y$ is also true.
- **Contrapositive** of $p \Rightarrow q$: $\neg q \Rightarrow \neg p$. **Converse**: $q \Rightarrow p$. **Inverse**: $\neg p \Rightarrow \neg q$.

### Formulas, explained

**The five basic truth tables**

| $p$ | $q$ | $\neg p$ | $p \wedge q$ | $p \vee q$ | $p \Rightarrow q$ | $p \Leftrightarrow q$ |
|---|---|---|---|---|---|---|
| T | T | F | T | T | T | T |
| T | F | F | F | T | **F** | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

- **Read it as:** each column shows when the connective is true.
- **Why it makes sense:** AND needs both; OR needs one; IF-THEN fails only in the "broken promise" row; IFF needs agreement.
- **Use it when:** evaluating any formula row by row.

**Implication as OR**
$$p \Rightarrow q \ \equiv\ \neg p \vee q$$
- **Read it as:** "if p then q" means the same as "not p, or q".
- **Symbols:** $\equiv$ = "has the same truth value in every row".
- **Why it makes sense:** the promise is kept if the condition did not happen ($\neg p$), or the result did happen ($q$). Check the table:

| $p$ | $q$ | $\neg p$ | $\neg p \vee q$ | $p \Rightarrow q$ |
|---|---|---|---|---|
| T | T | F | T | T |
| T | F | F | F | F |
| F | T | T | T | T |
| F | F | T | T | T |

The last two columns match in every row.
- **Use it when:** simplifying a formula, or comparing two formulas.

**Contrapositive**
$$p \Rightarrow q \ \equiv\ \neg q \Rightarrow \neg p$$
- **Read it as:** "if p then q" is the same as "if not q then not p".
- **Why it makes sense:** "If it rains, the road is wet" means "if the road is not wet, it did not rain". The converse $q \Rightarrow p$ is **not** the same ("road wet, so it rained" fails: a water tanker could wet it).

| $p$ | $q$ | $p \Rightarrow q$ | $\neg q \Rightarrow \neg p$ | $q \Rightarrow p$ (converse) |
|---|---|---|---|---|
| T | T | T | T | T |
| T | F | F | F | T |
| F | T | T | T | F |
| F | F | T | T | T |

- **Use it when:** options give the same rule written in different forms.

**Biconditional**
$$p \Leftrightarrow q \ \equiv\ (p \Rightarrow q) \wedge (q \Rightarrow p)$$
- **Read it as:** "p if and only if q" means "p implies q, and q implies p".
- **Use it when:** English says "exactly when", "if and only if", or "if ... and not otherwise".

**De Morgan's laws**
$$\neg(p \wedge q) \equiv \neg p \vee \neg q \qquad \neg(p \vee q) \equiv \neg p \wedge \neg q$$
- **Read it as:** "NOT (both)" = "at least one is not". "NOT (either)" = "neither".
- **Why it makes sense:** "It is not true that I ate both idli and dosa" means I skipped at least one.
- **Use it when:** pushing a NOT inside brackets.

**Entailment, three ways**
$$X \models Y \iff (X \Rightarrow Y) \text{ is a tautology} \iff (X \wedge \neg Y) \text{ is unsatisfiable}$$
- **Read it as:** "X entails Y" means "X implies Y is always true", which means "X true with Y false never happens".
- **Why it makes sense:** all three say the same thing: there is no row with X = T and Y = F.
- **Use it when:** a question defines entailment, or asks for proof by contradiction (**resolution**).

**Size of a truth table**
$$\text{rows} = 2^n$$
- **Read it as:** "$n$ variables give 2 to the power $n$ rows."
- **Why it makes sense:** each variable doubles the cases (T or F).

**Inference rules**

Modus ponens: from $p$ and $p \Rightarrow q$, conclude $q$.
$$\frac{p \qquad p \Rightarrow q}{q}$$

Modus tollens: from $\neg q$ and $p \Rightarrow q$, conclude $\neg p$.
$$\frac{\neg q \qquad p \Rightarrow q}{\neg p}$$

Resolution: from $(a \vee p)$ and $(\neg p \vee b)$, conclude $(a \vee b)$.
$$\frac{a \vee p \qquad \neg p \vee b}{a \vee b}$$

- **Read it as:** "what is above the line lets you write what is below the line."
- **Why it makes sense:** each rule only writes something that is true in every row where the top parts are true.
- **Use it when:** proving that a knowledge base entails a sentence.

### Where the formulas come from

**A. Why a table has $2^n$ rows**

1. One statement $p$ has 2 cases: T or F.
2. Add $q$. For each case of $p$, $q$ can be T or F. So $2 \times 2 = 4$ cases, because we multiply choices.
3. Add $r$. Each of those 4 cases splits again: $4 \times 2 = 8$.
4. Each new variable doubles the rows. After $n$ variables we have doubled $n$ times, starting from 1: $2^n$.

**B. Why IF-THEN is false in only one row**

1. Take the promise: "If you score 90, I will buy you a phone."
2. You score 90 and get the phone: promise kept (T).
3. You score 90 and get no phone: promise broken (F).
4. You score 70: the promise said nothing about this case. Phone or no phone, nobody was cheated, so we call it kept (T).
5. So $p \Rightarrow q$ is F only when $p$ = T and $q$ = F. This is a choice of definition, made so that "IF-THEN" only makes a claim when the "if" part happens.

**C. $p \Rightarrow q \equiv \neg p \vee q$**

1. From B, $p \Rightarrow q$ is false in exactly one row: $p$ = T, $q$ = F.
2. That row is described by "$p$ and not $q$", which is $p \wedge \neg q$. So $p \Rightarrow q$ is true exactly when this is **not** the case:
$$p \Rightarrow q \equiv \neg(p \wedge \neg q)$$
3. Use De Morgan (idea D) to push the NOT inside: $\neg(p \wedge \neg q) \equiv \neg p \vee \neg\neg q$.
4. Two NOTs cancel, because flipping twice gives back the start: $\neg\neg q \equiv q$. So we get $\neg p \vee q$.

**D. De Morgan's laws**

1. $p \wedge q$ is T only in the row $p$ = T, $q$ = T. So $\neg(p \wedge q)$ is F only in that row.
2. $\neg p \vee \neg q$ is F only when both $\neg p$ and $\neg q$ are F, which means $p$ = T and $q$ = T. The same single row.
3. Two sentences that are F in exactly the same rows (and T in all others) are equivalent. So $\neg(p \wedge q) \equiv \neg p \vee \neg q$.
4. The second law works the same way: $p \vee q$ is F only when both are F, so $\neg(p \vee q)$ is T only in the row $p$ = F, $q$ = F, and that is exactly when $\neg p \wedge \neg q$ is T.

**E. Contrapositive is equivalent, the converse is not**

1. Start from C: $p \Rightarrow q \equiv \neg p \vee q$.
2. OR does not care about order, so this is $q \vee \neg p$.
3. Write $q$ as $\neg(\neg q)$, because two NOTs cancel: $\neg(\neg q) \vee \neg p$.
4. By C again (with $\neg q$ in place of $p$, and $\neg p$ in place of $q$), this is $\neg q \Rightarrow \neg p$.

The converse $q \Rightarrow p$ is, by C, $\neg q \vee p$. It is F in the row $p$ = F, $q$ = T, where $p \Rightarrow q$ is T. So they differ in one row and are not equivalent.

**F. Biconditional**

1. $p \Rightarrow q$ fails only in row (T, F). $q \Rightarrow p$ fails only in row (F, T).
2. So "both directions hold" is true in rows (T, T) and (F, F), which are exactly the rows where $p$ and $q$ agree.
3. "Agree" is the definition of $p \Leftrightarrow q$. So $p \Leftrightarrow q \equiv (p \Rightarrow q) \wedge (q \Rightarrow p)$.

**G. Entailment, three ways**

1. $X \models Y$ means: no row has $X$ = T and $Y$ = F.
2. $X \Rightarrow Y$ is F only in rows with $X$ = T and $Y$ = F (idea B). If there is no such row, it is T everywhere: a tautology.
3. $X \wedge \neg Y$ is T only in rows with $X$ = T and $Y$ = F. If there is no such row, it is never T: unsatisfiable.
4. All three sentences describe the same thing, "the bad row does not exist", so they are equivalent.

**H. Inference rules come from one case split**

Resolution first: from $(a \vee p)$ and $(\neg p \vee b)$, conclude $(a \vee b)$.

1. Either $p$ is T or $p$ is F. There is no third case.
2. If $p$ is T, then $\neg p$ is F, so the second clause forces $b$ to be T.
3. If $p$ is F, then the first clause forces $a$ to be T.
4. In both cases, $a$ or $b$ is T. So $a \vee b$ follows.

Modus ponens is resolution with nothing in place of $a$. From $p$ and $\neg p \vee q$ (which is $p \Rightarrow q$), we get $q$. Modus tollens is the same with $\neg q$: from $\neg p \vee q$ and $\neg q$, we get $\neg p$.

### Examples

**Example 1 (easy):** Is $(p \wedge q) \Rightarrow p$ a tautology?

| $p$ | $q$ | $p \wedge q$ | $(p \wedge q) \Rightarrow p$ |
|---|---|---|---|
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | T |

**Result:** all rows are T, so it is a tautology. In words: "if I have both tea and biscuits, then I have tea" is always true.

**Example 2 (medium):** resolution. Knowledge base: $P \Rightarrow Q$, $Q \Rightarrow R$, $P$. Does it entail $R$?

1. Rewrite each implication as OR, using $p \Rightarrow q \equiv \neg p \vee q$: $\neg P \vee Q$ and $\neg Q \vee R$. Also keep $P$.
2. Add the **negated goal** $\neg R$, because we try to show that "KB true and $R$ false" is impossible.
3. Resolve $\neg Q \vee R$ with $\neg R$. The $R$ and $\neg R$ cancel, leaving $\neg Q$.
4. Resolve $\neg P \vee Q$ with $\neg Q$, leaving $\neg P$.
5. Resolve $\neg P$ with $P$, leaving the **empty clause**: nothing is left that could be true, which is a contradiction.

**Result:** $KB \wedge \neg R$ is impossible, so $KB \models R$.

**Example 3 (hard):** GATE level, MSQ. Which are tautologies?
(a) $(p \wedge (p \Rightarrow q)) \Rightarrow q$
(b) $(q \wedge (p \Rightarrow q)) \Rightarrow p$
(c) $(\neg q \wedge (p \Rightarrow q)) \Rightarrow \neg p$

Use the table of $p \Rightarrow q$ (T, F, T, T) and evaluate each.

| $p$ | $q$ | $p \Rightarrow q$ | (a) left part | (a) | (b) left part | (b) | (c) left part | (c) |
|---|---|---|---|---|---|---|---|---|
| T | T | T | T | T | T | T | F | T |
| T | F | F | F | T | F | T | F | T |
| F | T | T | F | T | T | **F** | F | T |
| F | F | T | F | T | F | T | T | T |

Here "left part" means the antecedent: $p \wedge (p \Rightarrow q)$ for (a), $q \wedge (p \Rightarrow q)$ for (b), and $\neg q \wedge (p \Rightarrow q)$ for (c).
- (a) all T: **tautology** (this is modus ponens).
- (b) row 3 is F: **not** a tautology. Seeing the result $q$ does not prove the cause $p$.
- (c) all T: **tautology** (this is modus tollens).

**Result:** (a) and (c).

Shortcut: to test "$A \Rightarrow B$ is a tautology", look only at rows where $A$ is T. If $B$ is T in all of them, it is a tautology.

### Common mistakes
> **Common mistake:** Treating $p \Rightarrow q$ as false when $p$ is false. A false "if" part makes the implication **true**.

> **Common mistake:** Confusing the contrapositive (equivalent) with the converse or inverse (not equivalent).

> **Common mistake:** Translating "A only if B" as $B \Rightarrow A$. It is $A \Rightarrow B$. "You can vote only if you are 18" means voting implies age 18.

> **Common mistake:** Adding conditions the English does not state. "A creative person succeeds if disciplined" says nothing about non-creative people, so the formula must not restrict them.

### How GATE asks it
- **2024 Q.29 (MSQ)**: four implications. Each antecedent is true in exactly one row, so check only that row. Tautologies: B, C, D.
- **2025 Q.15**: which pair is equivalent? $p \rightarrow q \equiv \neg p \vee q$. A 4-row truth table settles it.
- **2026 Q.24 (MSQ)**: if $X$ entails $Y$, which hold? $X \Rightarrow Y$, "$X \wedge \neg Y$ is false", "if X then Y". The converse does not follow.
- **2026 Q.38**: translate "a creative person succeeds if disciplined, and not otherwise" into $C \Rightarrow (S \Leftrightarrow D)$. A distractor contains $(D \Rightarrow S) \vee \neg S$, which is a tautology.
- Likely patterns: truth-table equivalence, tautology check, English translation, entailment.

### Summary
- First we treat every basic sentence as T or F, and list all $2^n$ cases in a truth table.
- Then we define NOT, AND, OR, IF-THEN and IFF by their table columns.
- The key fact is that IF-THEN is false only when the "if" part is T and the "then" part is F. From it we get $p \Rightarrow q \equiv \neg p \vee q$.
- With De Morgan's laws and "two NOTs cancel", we can rewrite any formula and get the contrapositive.
- Entailment means "the bad row ($X$ true, $Y$ false) never happens". Resolution proves it by showing that adding $\neg Y$ leads to a contradiction.
- That is why most GATE questions are solved by checking only the one row that could break the claim.
- Next topic builds on this: First-Order Logic keeps all these connectives and adds "for all" and "there exists" to talk about many objects at once.

### Quick self-check
1. When is $p \Rightarrow q$ false?
**Answer:** Only when $p$ is T and $q$ is F.

2. Write $\neg(p \vee q)$ without brackets around an OR.
**Answer:** $\neg p \wedge \neg q$ (De Morgan).

3. How many rows does a truth table with variables $p, q, r$ have?
**Answer:** $2^3 = 8$.

## Predicate / First-Order Logic

### The big idea
**First-order logic (FOL)** lets us talk about **objects** and their **properties**, using "for all" ($\forall$) and "there exists" ($\exists$). It can say "every student passed" in one sentence, which propositional logic cannot do neatly.

### Before you start
**1. Connectives and truth tables (see topic: Propositional Logic).** $\neg$ is NOT, $\wedge$ is AND, $\vee$ is OR, $\Rightarrow$ is IF-THEN. Every FOL sentence is built with these same connectives.

**2. IF-THEN is true when the "if" part is false (see topic: Propositional Logic).** $F \Rightarrow$ anything is T. *Example: "if my phone is a human, it is mortal" is T, because the phone is not a human.* This one fact explains why "all A are B" uses $\Rightarrow$.

**3. De Morgan's laws (see topic: Propositional Logic).** $\neg(p \wedge q) \equiv \neg p \vee \neg q$ and $\neg(p \vee q) \equiv \neg p \wedge \neg q$. Also $p \Rightarrow q \equiv \neg p \vee q$.

**4. A set.** A set is a collection of things written in curly brackets. *Example: {Asha, Bala, Chitra} is a set of 3 students.* The set of all objects we talk about is called the domain.

**5. A predicate is like a function that answers T or F.** A function takes an input and gives one output. $Passed(x)$ takes a student and gives T or F.

*Example: $Passed(\text{Asha}) = T$. $Likes(x, y)$ takes two inputs: $Likes(\text{Asha}, \text{Cricket}) = T$.*

**6. A variable.** $x$ is a placeholder that can stand for any object of the domain, the same way $x$ in algebra can stand for any number.

### Intuition
Think of a class of three students: Asha, Bala and Chitra. Some like cricket. Here is a small table.

| Student $x$ | $Likes(x, Cricket)$ |
|---|---|
| Asha | T |
| Bala | T |
| Chitra | F |

- "**Everyone** likes cricket" is $\forall x\ Likes(x, Cricket)$. It is like a **big AND**: Asha likes it AND Bala likes it AND Chitra likes it. Here it is T AND T AND F = **F**.
- "**Someone** likes cricket" is $\exists x\ Likes(x, Cricket)$. It is like a **big OR**: T OR T OR F = **T**.

So FOL is propositional logic repeated over every object in the group. The group of objects is called the **domain**.

Now the most important pattern. "All humans are mortal" means: for every object, **if** it is a human, **then** it is mortal. We use $\Rightarrow$ with $\forall$. If we wrongly wrote $\forall x\ (Human(x) \wedge Mortal(x))$, it would say "every object in the world is a human and mortal", including your phone and your chair.

> **Intuition:** $\forall$ is a big AND over the domain. $\exists$ is a big OR over the domain. "All A are B" uses $\Rightarrow$. "Some A is B" uses $\wedge$.

### Words you need
- **Object / constant**: a specific thing. *Example: Asha, Cricket.*
- **Variable**: a placeholder for any object. *Example: $x$.*
- **Predicate**: a property or relation that is T or F. *Example: $Student(x)$, $Likes(x, y)$.*
- **Universal quantifier $\forall x$**: "for every $x$".
- **Existential quantifier $\exists x$**: "there is at least one $x$".
- **Domain**: the set of all objects we talk about. In FOL it is always **non-empty**.
- **Interpretation (model)**: a choice of domain plus the meaning (T/F table) of every predicate.
- **Valid**: true in **every** interpretation.
- **Counter-model**: one interpretation where the sentence is false. One counter-model proves "not valid".

### Formulas, explained

**"All A are B"**
$$\forall x\ (A(x) \Rightarrow B(x))$$
- **Read it as:** "for every $x$, if $x$ is A then $x$ is B."
- **Why it makes sense:** objects that are not A are not restricted. The implication is automatically true for them.
- **Use it when:** translating "all", "every", "each".

**"Some A is B"**
$$\exists x\ (A(x) \wedge B(x))$$
- **Read it as:** "there is an $x$ that is A and also B."
- **Why it makes sense:** we need one object with both properties. Using $\Rightarrow$ here is wrong: $\exists x\ (A(x) \Rightarrow B(x))$ is true as soon as any non-A object exists.
- **Use it when:** translating "some", "at least one", "there is".

**"No A is B"**
$$\forall x\ (A(x) \Rightarrow \neg B(x)) \ \equiv\ \neg \exists x\ (A(x) \wedge B(x))$$
- **Read it as:** "every A is not B", which is the same as "there is no object that is both A and B".

**Negating quantifiers**
$$\neg \forall x\ P(x) \equiv \exists x\ \neg P(x) \qquad \neg \exists x\ P(x) \equiv \forall x\ \neg P(x)$$
- **Read it as:** "not everyone has P" = "someone does not have P". "Nobody has P" = "everyone lacks P".
- **Why it makes sense:** this is De Morgan's law for a big AND and a big OR.
- **Use it when:** pushing a NOT through a quantifier. It also gives $\forall x\ P(x) \equiv \neg \exists x\ \neg P(x)$.

**One-direction facts (valid only left to right)**
$$\forall x\ P(x) \Rightarrow \exists x\ P(x)$$
$$\exists y\ \forall x\ R(x,y) \Rightarrow \forall x\ \exists y\ R(x,y)$$
$$\exists x\ (P(x) \wedge Q(x)) \Rightarrow \exists x\ P(x) \wedge \exists x\ Q(x)$$
- **Read it as:** "if all have P, some has P" (because the domain is non-empty). "If one $y$ works for every $x$, then every $x$ has some $y$." "If one object has both P and Q, then something has P and something has Q."
- **Why it makes sense:** the left side is the stronger claim. The reverse directions fail.
- **Use it when:** checking validity.

**Rules that work both ways**

$\forall$ splits over AND, and $\exists$ splits over OR:
$$\forall x\ (P(x) \wedge Q(x)) \equiv \forall x\ P(x) \wedge \forall x\ Q(x)$$
$$\exists x\ (P(x) \vee Q(x)) \equiv \exists x\ P(x) \vee \exists x\ Q(x)$$

Two quantifiers of the same kind can swap places:
$$\forall x\ \forall y\ R(x,y) \equiv \forall y\ \forall x\ R(x,y) \qquad \exists x\ \exists y\ R(x,y) \equiv \exists y\ \exists x\ R(x,y)$$

- **Read it as:** "a big AND can be regrouped, and so can a big OR."
- **Why it makes sense:** the order of terms in a long AND (or a long OR) does not change its value.
- **Use it when:** simplifying. Mixed quantifiers ($\forall$ with $\exists$) can NOT swap.

### Where the formulas come from

**A. $\forall$ is a big AND, $\exists$ is a big OR**

1. Domain = {Asha, Bala, Chitra}. "Everyone passed" means Asha passed, and Bala passed, and Chitra passed.
2. So $\forall x\ Passed(x)$ is $Passed(\text{Asha}) \wedge Passed(\text{Bala}) \wedge Passed(\text{Chitra})$.
3. "Someone passed" means Asha passed, or Bala passed, or Chitra passed. So $\exists x\ Passed(x)$ is the same three facts joined by $\vee$.
4. For a domain with any number of objects, write one copy for each object. That is the meaning of $\forall$ and $\exists$.

**B. "All A are B" uses $\Rightarrow$**

Domain = {Ravi, phone}. Ravi is human and mortal. The phone is neither.

1. With $\Rightarrow$: for Ravi, $T \Rightarrow T = T$. For the phone, $F \Rightarrow F = T$, because a false "if" part makes IF-THEN true.
2. The big AND is $T \wedge T = T$. Correct: "all humans are mortal" is true here.
3. With $\wedge$: for the phone, $Human \wedge Mortal = F \wedge F = F$. The big AND becomes F.
4. So $\wedge$ wrongly demands that the phone is human. $\Rightarrow$ leaves non-humans free, which is what "all humans are mortal" means.

**C. "Some A is B" uses $\wedge$**

Same domain, but now we ask "some human is immortal", which is false.

1. With $\wedge$: Ravi gives $T \wedge F = F$, the phone gives $F \wedge T = F$ (the phone is not mortal). The big OR is F. Correct.
2. With $\Rightarrow$: the phone gives $F \Rightarrow T = T$. The big OR becomes T. Wrong.
3. The mistake happens because any non-human object makes the $\Rightarrow$ true. So for "some", we need $\wedge$: one object that has both properties.

**D. Negating quantifiers**

1. $\neg \forall x\ P(x)$ is $\neg(P(a) \wedge P(b) \wedge P(c))$, by idea A.
2. By De Morgan, this is $\neg P(a) \vee \neg P(b) \vee \neg P(c)$.
3. A big OR is $\exists$. So it is $\exists x\ \neg P(x)$.
4. The same steps with OR and AND swapped give $\neg \exists x\ P(x) \equiv \forall x\ \neg P(x)$.

**E. "No A is B"**

1. "No A is B" means "there is no object that is A and B": $\neg \exists x\ (A(x) \wedge B(x))$.
2. Move the NOT inside using D: $\forall x\ \neg(A(x) \wedge B(x))$.
3. De Morgan inside: $\forall x\ (\neg A(x) \vee \neg B(x))$.
4. Use $p \Rightarrow q \equiv \neg p \vee q$ backwards: $\forall x\ (A(x) \Rightarrow \neg B(x))$.

**F. Why the one-direction facts hold, and why the reverse fails**

$\forall x\ P(x) \Rightarrow \exists x\ P(x)$:

1. If the big AND is T, every object has $P$.
2. The domain has at least one object (FOL rule). That object has $P$, so the big OR is T.
3. The reverse fails: domain {1, 2}, $P(1) = T$, $P(2) = F$. Someone has $P$, but not everyone.

$\exists y\ \forall x\ R(x,y) \Rightarrow \forall x\ \exists y\ R(x,y)$:

1. The left side says there is one $y$, say $y_0$, with $R(x, y_0)$ T for every $x$.
2. So for each $x$, we can pick $y = y_0$, and $R(x, y)$ is T. That is the right side.
3. The reverse fails: Example 2 below gives each $x$ a different $y$, and no single $y$ works for all.

$\exists x\ (P(x) \wedge Q(x)) \Rightarrow \exists x\ P(x) \wedge \exists x\ Q(x)$:

1. One object has both $P$ and $Q$. That same object shows that something has $P$, and also that something has $Q$.
2. The reverse fails: domain {1, 2}, with only $P(1)$ and only $Q(2)$ T. Something has $P$ and something has $Q$, but no single object has both.

**G. Which quantifiers distribute**

1. $\forall x\ (P(x) \wedge Q(x))$ is one long AND of all $P$'s and $Q$'s. AND does not care about order, so we can group all $P$'s together and all $Q$'s together. That gives $\forall x\ P(x) \wedge \forall x\ Q(x)$.
2. The same regrouping works for $\exists$ over $\vee$, because it is one long OR.
3. Mixing fails. $\forall x\ (P(x) \vee Q(x))$ is not $\forall x\ P(x) \vee \forall x\ Q(x)$: with {1, 2}, $P(1)$ T and $Q(2)$ T, each object has one of them, but neither property is held by all.

### Examples

**Example 1 (easy):** Domain = {Asha, Bala, Chitra}. $Passed$: Asha T, Bala F, Chitra T. Evaluate $\forall x\ Passed(x)$, $\exists x\ Passed(x)$ and $\exists x\ \neg Passed(x)$.
1. $\forall x\ Passed(x)$ = T AND F AND T = **F**.
2. $\exists x\ Passed(x)$ = T OR F OR T = **T**.
3. $\exists x\ \neg Passed(x)$: $\neg Passed$ is F, T, F. OR gives **T**.
4. Check: $\neg \forall x\ Passed(x)$ = NOT F = T, the same as step 3.

**Result:** F, T, T.

**Example 2 (medium):** swapping quantifiers. Is $\forall x\ \exists y\ Loves(x, y) \Rightarrow \exists y\ \forall x\ Loves(x, y)$ valid?

Build a counter-model. Domain = {a, b}. $Loves$ table:

| $x$ | $y$ | $Loves(x,y)$ |
|---|---|---|
| a | a | T |
| a | b | F |
| b | a | F |
| b | b | T |

1. Left side: for $x = a$ choose $y = a$ (T). For $x = b$ choose $y = b$ (T). So "everyone loves someone" is **T**.
2. Right side: is there one $y$ loved by everyone? $y = a$: $Loves(b,a)$ = F. $y = b$: $Loves(a,b)$ = F. So **F**.
3. T $\Rightarrow$ F = F.

**Result:** not valid, because we found one interpretation where it is false.

**Example 3 (hard):** GATE level, MSQ. "Only rugby balls are oval." Let $G(x)$ = "$x$ is used in rugby" and $O(x)$ = "$x$ is oval". Which formulas represent it?
(a) $\forall x\ (O(x) \Rightarrow G(x))$
(b) $\forall x\ (G(x) \Rightarrow O(x))$
(c) $\forall x\ (\neg G(x) \Rightarrow \neg O(x))$
(d) $\neg \exists x\ (O(x) \wedge \neg G(x))$

1. "Only rugby balls are oval" means: if a ball is oval, it must be a rugby ball. That is (a).
2. (c) is the contrapositive of (a): $\neg G \Rightarrow \neg O$ is the same as $O \Rightarrow G$. So (c) is correct.
3. (d) says "there is no ball that is oval and not rugby". Push the negation in:
$$\forall x\ \neg(O(x) \wedge \neg G(x)) \equiv \forall x\ (\neg O(x) \vee G(x)) \equiv \forall x\ (O(x) \Rightarrow G(x))$$
So (d) is correct.
4. (b) is the converse ("every rugby ball is oval"). The sentence does not say this, so (b) is wrong.

**Result:** **(a), (c), (d)**.

### Common mistakes
> **Common mistake:** Writing $\forall x\ (A(x) \wedge B(x))$ for "all A are B". That says every object is both A and B. Use $\Rightarrow$.

> **Common mistake:** Writing $\exists x\ (A(x) \Rightarrow B(x))$ for "some A is B". It becomes true just because a non-A object exists. Use $\wedge$.

> **Common mistake:** Swapping $\forall x\ \exists y$ and $\exists y\ \forall x$. "Every student has a favourite teacher" is not "one teacher is everyone's favourite".

> **Common mistake:** Forgetting the domain is non-empty. That is why $\forall x\ P(x) \Rightarrow \exists x\ P(x)$ is valid.

### How GATE asks it
- **2024 Q.54 (MSQ)**: "All balls are round except balls used in rugby" has two parts: $\neg G \Rightarrow R$ and $G \Rightarrow \neg R$. Options use contrapositives. Correct: $s1 \wedge s3$ and $s2 \wedge s3$.
- **2026 Q.14**: spot the wrong translation. "Each king is a person" is NOT $\forall x\ (IsKing(x) \wedge IsPerson(x))$. Also tests $\forall x\ P \equiv \neg \exists x\ \neg P$.
- **2026 Q.48 (MSQ)**: which quantified formulas are not valid? Use a 2-object counter-model. $\forall \Rightarrow \exists$ is valid; $\exists \Rightarrow \forall$ is not.
- Likely patterns: translate "only", "no", "except"; negate a quantified sentence.

### Summary
- Propositional logic can only say one fixed fact at a time, so we add objects, predicates and variables.
- Then $\forall$ becomes a big AND over the domain, and $\exists$ becomes a big OR.
- Because a false "if" part makes IF-THEN true, "all A are B" must use $\Rightarrow$. Because one object must have both properties, "some A is B" must use $\wedge$.
- De Morgan for a big AND and a big OR tells us how to push NOT through a quantifier.
- Some facts work only in one direction, like $\exists y\ \forall x \Rightarrow \forall x\ \exists y$. A small 2-object counter-model shows that the reverse fails.
- That is why most GATE FOL questions are solved by translating carefully and testing a tiny domain.
- Next topic builds on this: Bayesian Networks move from "true or false" to "how likely", for when we are not sure.

### Quick self-check
1. Translate "Some fruit is sweet".
**Answer:** $\exists x\ (Fruit(x) \wedge Sweet(x))$.

2. Negate $\forall x\ Happy(x)$.
**Answer:** $\exists x\ \neg Happy(x)$: someone is not happy.

3. Is $\exists x\ P(x) \Rightarrow \forall x\ P(x)$ valid?
**Answer:** No. Domain {1, 2} with $P(1)$ = T and $P(2)$ = F makes the left side T and the right side F.

## Bayesian Networks & Conditional Independence

### The big idea
A **Bayesian network** is a picture of cause and effect. Each circle is a random event, and each arrow means "directly affects". Each circle also keeps a small probability table. Multiplying these small tables gives the probability of any full situation, and the arrows tell you which events are independent.

### Before you start
This topic is built on basic probability (see subject: Probability & Statistics). Here are the pieces you need.

**1. Probability.** A probability is a number from 0 to 1 that says how likely something is. 0 means "never", 1 means "always".

*Example: a fair coin gives heads with probability $\frac{1}{2} = 0.5$, because 1 of the 2 equally likely sides is heads.*

**2. "Not" (the complement).** The probability that A does not happen is $1 - P(A)$, because "happens" and "does not happen" together cover everything, which has probability 1. *Example: if $P(\text{rain}) = 0.2$, then $P(\text{no rain}) = 0.8$.*

**3. Joint probability $P(A \cap B)$, also written $P(A, B)$.** This is the probability that A and B **both** happen. *Example: two fair coins both show heads: $P = 0.25$.*

**4. Conditional probability $P(A \mid B)$.** Read the bar $\mid$ as "given". It is the probability of A when we already know B happened:
$$P(A \mid B) = \frac{P(A, B)}{P(B)}$$
*Example: out of 10 days, 4 are cloudy, and on 3 of those it rains. Then $P(\text{rain} \mid \text{cloudy}) = 3/4$, because we look only inside the 4 cloudy days.*

**5. Product rule.** Multiply both sides of item 4 by $P(B)$: $P(A, B) = P(B)\,P(A \mid B)$. *Example: $P(\text{cloudy and rain}) = 0.4 \times 0.75 = 0.3$, which is 3 days out of 10.*

**6. Independence.** A and B are independent if knowing B does not change A: $P(A \mid B) = P(A)$. Then the product rule becomes $P(A, B) = P(A)\,P(B)$. *Example: two different coins.*

**7. Adding over cases (marginalising).** If B is either 1 or 0, then $P(A) = P(A, B=1) + P(A, B=0)$, because these two cases do not overlap and together cover everything. *Example: $P(\text{wet}) = P(\text{wet, rain}) + P(\text{wet, no rain})$.*

**8. The product symbol $\prod$.** $\prod_{i=1}^{3} a_i$ means $a_1 \times a_2 \times a_3$. It is like $\sum$, but with multiplication. *Example: $\prod_{i=1}^{3} i = 1 \times 2 \times 3 = 6$.*

**9. A directed graph (see topic: Uninformed Search).** Dots joined by arrows. Here every dot is a random event and every arrow means "directly affects".

### Intuition
Think about wet grass in the morning. Two things can make it wet: **Rain** (R) and the **Sprinkler** (S). So we draw R → W ← S, where W = "grass is wet".

Rain and sprinkler do not affect each other. Knowing it rained tells you nothing about the sprinkler. They are **independent**.

Now you see the grass is wet. Then your neighbour says, "The sprinkler was on last night." Suddenly rain looks **less likely**, because the sprinkler already explains the wet grass. Once you know W, rain and sprinkler become **dependent**. This is called **explaining away**.

Now a different shape. **Cloudy** (C) causes **Rain** (R), and rain causes **Traffic jam** (T): C → R → T. If you do not know about rain, seeing clouds makes a jam more likely. But if you already **know** it rained, clouds tell you nothing more about the jam. Knowing the middle node **blocks** the flow.

> **Intuition:** Information flows along arrows like water in pipes. In a chain or a fork, knowing the middle node **closes** the pipe. In a collider (two arrows pointing into one node), the pipe is closed by default, and knowing the middle node **opens** it.

### Words you need
- **Random variable**: something with uncertain value. *Example: R = 1 if it rains, 0 if not.*
- **DAG (directed acyclic graph)**: arrows with no loop back to the start. A Bayesian network is a DAG.
- **Parent / child**: in $A \to B$, A is the parent and B is the child.
- **Descendant**: a child, grandchild, and so on.
- **CPT (conditional probability table)**: for each node, $P(\text{node} \mid \text{parents})$ for every parent combination.
- **Conditional probability $P(A \mid B)$**: probability of A when we already know B.
- **Independent ($A \perp B$)**: knowing A does not change the probability of B.
- **Conditionally independent ($A \perp B \mid C$)**: once C is known, A tells nothing more about B.
- **Chain** $A \to B \to C$; **fork** $A \leftarrow B \to C$; **collider (v-structure)** $A \to B \leftarrow C$.
- **d-separation**: a graph rule for reading conditional independence.
- **Markov blanket** of X: its parents, its children, and its children's other parents.

### Formulas, explained

**Chain rule for a Bayesian network (factorisation)**
$$P(x_1, x_2, \dots, x_n) = \prod_{i=1}^{n} P(x_i \mid \text{parents}(X_i))$$
- **Read it as:** "the probability of the full situation is the product, over all nodes, of each node's probability given its parents."
- **Symbols:** $x_i$ = the value of variable $X_i$; $\prod$ = multiply all terms; $\text{parents}(X_i)$ = the nodes with arrows into $X_i$.
- **Why it makes sense:** each node only "listens" to its parents. So we read one entry from each CPT and multiply.
- **Use it when:** asked for a joint probability like $P(U=1, V=1, W=1, Z=1)$.

**d-separation table** (path through a middle node B)

| Shape | B not observed | B (or a descendant of B) observed |
|---|---|---|
| Chain $A \to B \to C$ | open (dependent) | blocked |
| Fork $A \leftarrow B \to C$ | open (dependent) | blocked |
| Collider $A \to B \leftarrow C$ | **blocked** | **open** |

- **Read it as:** "X and Y are independent given Z if **every** path between them is blocked."
- **Why it makes sense:** see the Intuition. A known middle cause or step stops the flow. A known common effect creates a link between its causes.
- **Use it when:** a question asks "which independence is true or false?"

**Number of CPT numbers (binary variables)**
$$\text{numbers for a node with } k \text{ binary parents} = 2^k \qquad \text{full joint} = 2^n - 1$$
- **Read it as:** "a yes/no node with $k$ yes/no parents needs 2 to the power $k$ numbers. A full table over $n$ yes/no variables needs $2^n - 1$."
- **Why it makes sense:** there is one row per parent combination, and each row needs only $P(X=1)$, because $P(X=0) = 1 - P(X=1)$.
- **Use it when:** asked how much a Bayesian network saves.

**Two other independence facts**

A node is independent of its **non-descendants** given its **parents**:
$$X \perp \text{NonDescendants}(X) \mid \text{Parents}(X)$$

A node is independent of **everything else** given its **Markov blanket** MB:
$$X \perp \text{Rest} \mid \text{MB}(X), \qquad \text{MB}(X) = \text{parents} \cup \text{children} \cup \text{children's other parents}$$

- **Read it as:** "once you know the parents (or the whole blanket), nothing else in that group tells you more about X."
- **Symbols:** $\cup$ = "put the groups together".
- **Use it when:** asked for a Markov blanket, or which nodes can be ignored.

### Where the formulas come from

**A. The factorisation $P(x_1, \dots, x_n) = \prod_i P(x_i \mid \text{parents}(X_i))$**

Start with the wet-grass network R → W ← S.

1. By the product rule, $P(R, S, W) = P(R, S)\,P(W \mid R, S)$. This is allowed because it is item 5 with $A = W$ and $B = (R, S)$.
2. Use the product rule again on $P(R, S)$: $P(R, S) = P(R)\,P(S \mid R)$.
3. So $P(R, S, W) = P(R)\,P(S \mid R)\,P(W \mid R, S)$. This "peel one variable at a time" step is called the **general chain rule**, and it is true for any three variables.
4. Now use the picture. There is no arrow between R and S, so S does not depend on R: $P(S \mid R) = P(S)$.
5. So $P(R, S, W) = P(R)\,P(S)\,P(W \mid R, S)$. Each factor is "one node given its parents".

In general:

1. Put the nodes in an order where every parent comes before its child. A DAG always allows this, because it has no loops.
2. Apply the general chain rule: each $x_i$ is conditioned on all the nodes before it.
3. The network's rule says: a node is independent of earlier non-parent nodes once its parents are known. So in each factor we can drop everything except the parents.
4. What is left is $\prod_i P(x_i \mid \text{parents}(X_i))$.

**B. Counting CPT numbers**

1. A yes/no node with $k$ yes/no parents has one CPT row for each combination of parent values. Each parent doubles the combinations, so there are $2^k$ rows.
2. Each row needs only $P(X = 1 \mid \dots)$, because $P(X = 0 \mid \dots) = 1 - P(X = 1 \mid \dots)$.
3. So the node needs $2^k$ numbers.
4. A full joint table over $n$ yes/no variables has $2^n$ rows. All rows add up to 1, so the last row is "1 minus the rest". That leaves $2^n - 1$ free numbers.

*Example: 4 variables. Full table: $2^4 - 1 = 15$. Example 3 below needs only 9.*

**C. Why a chain is blocked when the middle is known**

Chain $A \to B \to C$.

1. By idea A: $P(A, B, C) = P(A)\,P(B \mid A)\,P(C \mid B)$.
2. By the product rule, $P(A, B) = P(A)\,P(B \mid A)$.
3. By the definition of conditional probability:
$$P(C \mid A, B) = \frac{P(A, B, C)}{P(A, B)} = \frac{P(A)\,P(B \mid A)\,P(C \mid B)}{P(A)\,P(B \mid A)} = P(C \mid B)$$
4. A has disappeared. So once B is known, A tells us nothing more about C: $A \perp C \mid B$.

**D. Why a fork is blocked when the middle is known**

Fork $A \leftarrow B \to C$.

1. By idea A: $P(A, B, C) = P(B)\,P(A \mid B)\,P(C \mid B)$.
2. Divide by $P(B)$, using the definition of "given":
$$P(A, C \mid B) = \frac{P(A, B, C)}{P(B)} = P(A \mid B)\,P(C \mid B)$$
3. "Joint given B = product given B" is exactly independence inside the world where B is known. So $A \perp C \mid B$.

**E. Why a collider is blocked by default, and opened by observing it**

Collider $A \to B \leftarrow C$.

1. By idea A: $P(A, B, C) = P(A)\,P(C)\,P(B \mid A, C)$.
2. To get $P(A, C)$, add over both values of B (item 7): $P(A, C) = P(A)\,P(C)\,[P(B=1 \mid A, C) + P(B=0 \mid A, C)]$.
3. The bracket is 1, because B must be either 1 or 0. So $P(A, C) = P(A)\,P(C)$: independent when B is not known.
4. When B is known, the factor $P(B \mid A, C)$ stays in and mixes A and C together. So in general they become dependent. The full proof is not needed for GATE; Example 2 below shows it with numbers (rain drops from 0.740 to 0.236 once we learn the sprinkler was on).

**F. The other independence facts**

1. "Independent of non-descendants given parents" is the rule we used in step 3 of idea A. It is the meaning of the arrows.
2. The Markov blanket adds children and the children's other parents. Children are needed because they carry news about X (like a chain). Co-parents are needed because a child is a collider between X and them (like idea E).

### Examples

**Example 1 (easy):** wet grass. R → W ← S. $P(R=1) = 0.2$, $P(S=1) = 0.1$. CPT for $P(W=1 \mid R, S)$:

| $R$ | $S$ | $P(W=1 \mid R,S)$ |
|---|---|---|
| 1 | 1 | 0.99 |
| 1 | 0 | 0.9 |
| 0 | 1 | 0.8 |
| 0 | 0 | 0 |

Find $P(R=1, S=0, W=1)$.
1. $P(R=1) = 0.2$
2. $P(S=0) = 1 - 0.1 = 0.9$
3. $P(W=1 \mid R=1, S=0) = 0.9$
4. Multiply, using $P(R)\,P(S)\,P(W \mid R, S)$: $0.2 \times 0.9 \times 0.9 = 0.162$.

**Result:** $P(R=1, S=0, W=1) = 0.162$.

**Example 2 (medium):** explaining away with numbers. Same network. First find $P(W=1)$ by adding all four $(R, S)$ cases:
1. $R=1, S=1$: $0.2 \times 0.1 \times 0.99 = 0.0198$
2. $R=1, S=0$: $0.2 \times 0.9 \times 0.9 = 0.162$
3. $R=0, S=1$: $0.8 \times 0.1 \times 0.8 = 0.064$
4. $R=0, S=0$: $0.8 \times 0.9 \times 0 = 0$
5. Total: $0.0198 + 0.162 + 0.064 + 0 = 0.2458$.
6. Belief in rain after seeing wet grass: keep only the rows with $R=1$ and divide by the total, using $P(A \mid B) = P(A, B)/P(B)$:
$$P(R=1 \mid W=1) = \frac{0.0198 + 0.162}{0.2458} = \frac{0.1818}{0.2458} \approx 0.740$$
7. Now we also know $S=1$. Keep only rows with $S=1$ (rows 1 and 3), and among them the one with $R=1$:
$$P(R=1 \mid W=1, S=1) = \frac{0.0198}{0.0198 + 0.064} = \frac{0.0198}{0.0838} \approx 0.236$$

**Result:** learning that the sprinkler was on drops belief in rain from 0.740 to 0.236. That is explaining away.

**Example 3 (hard):** GATE level. Network: C → S, C → R, S → W, R → W (C = cloudy, S = sprinkler, R = rain, W = wet grass). CPTs:
- $P(C=1) = 0.5$
- $P(S=1 \mid C=1) = 0.1$, $P(S=1 \mid C=0) = 0.5$
- $P(R=1 \mid C=1) = 0.8$, $P(R=1 \mid C=0) = 0.2$
- $P(W=1 \mid S, R)$: 0.99 for (1,1), 0.9 for (1,0), 0.9 for (0,1), 0 for (0,0)

(i) Find $P(C=1, S=0, R=1, W=1)$.

Factorisation: $P(C)\,P(S \mid C)\,P(R \mid C)\,P(W \mid S, R)$.
1. $P(C=1) = 0.5$
2. $P(S=0 \mid C=1) = 1 - 0.1 = 0.9$
3. $P(R=1 \mid C=1) = 0.8$
4. $P(W=1 \mid S=0, R=1) = 0.9$
5. Multiply step by step: $0.5 \times 0.9 = 0.45$; $0.45 \times 0.8 = 0.36$; $0.36 \times 0.9 = 0.324$.

(ii) Is $S \perp R \mid C$? Paths between S and R: $S \leftarrow C \to R$ (fork, C observed: blocked) and $S \to W \leftarrow R$ (collider, W not observed: blocked). All paths blocked, so **yes**.

(iii) Is $S \perp R \mid \{C, W\}$? Now the collider W is observed, so that path **opens**. **No.**

(iv) How many CPT numbers? C: $2^0 = 1$. S: $2^1 = 2$. R: $2$. W: $2^2 = 4$. Total $1 + 2 + 2 + 4 = 9$, against $2^4 - 1 = 15$ for the full table.

**Result:** (i) 0.324, (ii) yes, (iii) no, (iv) 9 numbers.

### Common mistakes
> **Common mistake:** Thinking that observing a collider blocks the path. It is the **opposite**: a collider blocks when unobserved and opens when it (or a descendant) is observed.

> **Common mistake:** Reading the wrong CPT row. Always fix the parent values first, then find the column for the child's value.

> **Common mistake:** Using $P(S=1 \mid \cdot)$ when the question needs $S = 0$. Remember $P(S=0 \mid \cdot) = 1 - P(S=1 \mid \cdot)$.

> **Common mistake:** Saying two parents of a collider are dependent "because they share a child". They are independent until the child is observed.

### How GATE asks it
- **2024 Q.24**: from $P(U)P(V)P(W \mid U,V)P(X \mid W)P(Y \mid W)$, draw the DAG and find the FALSE statement. $U \to W \leftarrow V$ is a collider, so $U$ and $V$ are dependent given $W$.
- **2024 Q.64 (NAT)**: joint probability from four CPTs: $P(U=1)P(V=1 \mid U=1)P(W=1 \mid U=1)P(Z=1 \mid V=1, W=1) = 0.5 \times 0.5 \times 1 \times 0.5 = 0.125$.
- Likely patterns: count CPT parameters; find a Markov blanket; d-separation with a descendant of a collider.

### Summary
- A full probability table over many variables is huge: $2^n - 1$ numbers for $n$ yes/no variables.
- So we draw arrows for "directly affects", and give each node a small table: its probability given only its parents.
- The product rule, plus "a node depends only on its parents", turns the big joint into a product of small CPT entries.
- From the same product we can read independence: a known middle node blocks a chain or a fork.
- A collider is the opposite: its causes are independent until we observe the common effect, then they become linked (explaining away).
- That is why GATE questions reduce to "multiply the right CPT entries" or "check each path with the three shapes".
- Next topic builds on this: Exact Inference uses this product to answer questions like $P(\text{rain} \mid \text{wet grass})$.

### Quick self-check
1. In $A \to B \to C$, is $A \perp C \mid B$?
**Answer:** Yes. B is the middle of a chain, and observing it blocks the path.

2. In $A \to B \leftarrow C$, are A and C independent when B is not observed?
**Answer:** Yes. A collider blocks the path when unobserved.

3. A binary node has 3 binary parents. How many CPT numbers does it need?
**Answer:** $2^3 = 8$.

## Exact Inference (Variable Elimination)

### The big idea
**Inference** means answering a question like "given what I observed, how likely is this?" using a Bayesian network. **Exact inference** gets the precise answer by adding up probabilities. **Variable elimination** is a smart way to do this adding, which avoids repeating the same multiplication again and again.

### Before you start
**1. Conditional probability (see topic: Bayesian Networks & Conditional Independence).** $P(A \mid B)$ is the chance of A when B is known:
$$P(A \mid B) = \frac{P(A, B)}{P(B)}$$
*Example: $P(A, B) = 0.27$ and $P(B) = 0.41$ give $P(A \mid B) = 0.27 / 0.41 \approx 0.66$.*

**2. Product rule.** $P(A, B) = P(A)\,P(B \mid A)$. *Example: $P(\text{rainy}) = 0.3$ and $P(\text{umbrella} \mid \text{rainy}) = 0.9$ give $P(\text{rainy and umbrella}) = 0.27$.*

**3. Adding over cases.** If A can be 1 or 0, then $P(B) = P(A=1, B) + P(A=0, B)$, because the two cases do not overlap and cover everything. This is called **marginalising** or **summing out** A.

**4. The sum symbol with a variable below it.** $\sum_a f(a)$ means "put every possible value of $a$ into $f$ and add". For a yes/no variable, $\sum_a f(a) = f(1) + f(0)$.

*Example: if $f(1) = 0.27$ and $f(0) = 0.14$, then $\sum_a f(a) = 0.41$.*

**5. The CPT factorisation (see topic: Bayesian Networks & Conditional Independence).** The joint probability is a product of CPT entries, one per node. *Example: in $A \to B \to C$, $P(a, b, c) = P(a)\,P(b \mid a)\,P(c \mid b)$.*

**6. Normalising.** If a list of numbers should add to 1 but adds to $T$, divide each by $T$. *Example: 0.432 and 0.168 add to 0.6. Dividing gives 0.72 and 0.28, which add to 1.*

**7. The distributive law (school algebra).** $a \times b + a \times c = a \times (b + c)$. *Example: $2 \times 3 + 2 \times 5 = 16$, and $2 \times (3 + 5) = 16$. The second way uses one multiplication instead of two.*

### Intuition
A school has 3 sections, A, B and C. You want the total number of students who passed maths. You could list every student one by one (slow). Or you could first total each section, then add the three section totals (fast). The answer is the same. You just grouped the work.

Inference works the same way. Suppose we know the grass is wet, and we want the chance that it rained. We must add the probability of every situation that matches "grass wet and rain", over all the unknown variables, and then divide by the total for "grass wet".

- **Enumeration** writes out every full situation and adds them. Correct, but it repeats work.
- **Variable elimination (VE)** adds over one unknown variable at a time and stores the partial result in a small table called a **factor**. Like totalling each section first.

Both give the **exact** answer. VE is just faster.

> **Intuition:** "Eliminating a variable" means "adding over all its values so it disappears from the table". You do it one variable at a time, and keep the small result tables to reuse.

### Words you need
- **Query variable $Q$**: what we want to know. *Example: Rain.*
- **Evidence $E = e$**: what we observed. *Example: WetGrass = 1.*
- **Hidden variable $Y$**: neither query nor evidence. We add it out. *Example: Sprinkler.*
- **Posterior $P(Q \mid e)$**: the probability of the query after seeing the evidence.
- **Marginal**: a probability for fewer variables, got by adding over the others. *Example: $P(B) = \sum_a P(a, B)$.*
- **Sum out (marginalise)**: add a table over all values of one variable.
- **Factor**: any table of numbers over some variables. A CPT is a factor.
- **Normalise**: divide numbers by their total so they add to 1.
- **Exact vs approximate**: exact gives the true value; approximate (sampling) gives an estimate.

### Formulas, explained

**Inference by enumeration**
$$P(Q \mid e) = \alpha \sum_{y} P(Q, e, y), \qquad \alpha = \frac{1}{P(e)}$$
- **Read it as:** "the posterior equals a constant times the sum, over all values of the hidden variables, of the joint probability."
- **Symbols:** $Q$ = query; $e$ = evidence values; $y$ = each combination of hidden values; $\alpha$ = normalising constant (here alpha is NOT the alpha-beta alpha); $P(e)$ = total probability of the evidence.
- **Why it makes sense:** conditional probability is "favourable part divided by total part". The sum gives the favourable part for each value of $Q$. Dividing by $P(e)$ makes the answers add to 1.
- **Use it when:** computing any posterior on a small network.

**Marginalisation (summing out)**
$$P(B = b) = \sum_{a} P(A = a)\, P(B = b \mid A = a)$$
- **Read it as:** "the chance of B is the sum, over each value of A, of chance of A times chance of B given A."
- **Why it makes sense:** this is the law of total probability. B can happen through each value of A.
- **Use it when:** eliminating a parent variable.

**Variable elimination loop**
1. Write each CPT as a factor. Fix the evidence values.
2. Pick a hidden variable. **Multiply** all factors that contain it.
3. **Sum it out**. This gives a new, smaller factor.
4. Repeat for each hidden variable.
5. Multiply the remaining factors and **normalise**.

The key move, on the chain $A \to B \to C$, is pushing a sum inside:
$$\sum_a \sum_b P(a)\,P(b \mid a)\,P(c \mid b) = \sum_b P(c \mid b) \sum_a P(a)\,P(b \mid a)$$

- **Read it as:** "do the inner sum over $a$ once, keep it as a small table over $b$, then use it."
- **Why it makes sense:** sums are pushed inside products, so repeated parts are computed only once.
- **Cost facts:** the order of elimination **does not change the answer**, but it changes the work. The cost depends on the biggest factor created. On a **polytree** (no undirected loops) VE is fast (linear). In general, exact inference is **NP-hard** (no known fast method).
- **Barren nodes:** a hidden variable that is not an ancestor of the query or evidence sums to 1, so you may drop it:
$$\sum_x P(x \mid \text{parents}(X)) = 1$$

### Where the formulas come from

**A. Inference by enumeration**

Numbers first, from Example 1 below: Rainy (A) → Umbrella (B), and we want $P(A=1 \mid B=1)$.

1. By the definition of "given": $P(A=1 \mid B=1) = P(A=1, B=1) / P(B=1)$.
2. The top part comes from the CPTs by the product rule: $0.3 \times 0.9 = 0.27$.
3. The bottom part comes from adding over both values of A (item 3): $0.27 + 0.14 = 0.41$.
4. So the answer is $0.27 / 0.41 \approx 0.659$.

Now in general, with query $Q$, evidence $e$ and hidden variables $y$.

1. Definition of "given":
$$P(Q \mid e) = \frac{P(Q, e)}{P(e)}$$
2. $P(Q, e)$ does not mention $y$, so we add over all values of $y$ (summing out):
$$P(Q, e) = \sum_y P(Q, e, y)$$
3. Each $P(Q, e, y)$ is a full situation, so it is a product of CPT entries (item 5).
4. $P(e)$ is the same number for every value of $Q$. Call $\alpha = 1/P(e)$. Then
$$P(Q \mid e) = \alpha \sum_y P(Q, e, y)$$
5. We do not need to find $P(e)$ separately. Since the answers for all values of $Q$ must add to 1, we compute the sums and normalise. The total we divide by is exactly $P(e)$.

**B. Marginalisation $P(B=b) = \sum_a P(A=a)\, P(B=b \mid A=a)$**

1. B can happen together with $A = 1$ or together with $A = 0$. So $P(B=b) = P(A=1, B=b) + P(A=0, B=b)$.
2. Write each term with the product rule: $P(A=a, B=b) = P(A=a)\,P(B=b \mid A=a)$.
3. Put them together: $P(B=b) = \sum_a P(A=a)\,P(B=b \mid A=a)$.

*Example (self-check 2): $0.5 \times 0.8 + 0.5 \times 0.4 = 0.6$.*

**C. Why variable elimination saves work**

Take the chain $A \to B \to C$ and the question $P(C=1)$.

1. Enumeration adds over all 4 combinations of $(a, b)$:
$$P(C=1) = \sum_a \sum_b P(a)\,P(b \mid a)\,P(C=1 \mid b)$$
Each of the 4 terms needs 2 multiplications, so 8 multiplications.
2. The factor $P(C=1 \mid b)$ does not depend on $a$. By the distributive law (item 7), we can pull it out of the sum over $a$:
$$P(C=1) = \sum_b P(C=1 \mid b) \sum_a P(a)\,P(b \mid a)$$
3. The inner sum is a small table over $b$. Call it $f_1(b)$. It takes 4 multiplications to build (2 values of $b$ × 2 values of $a$).
4. Then $P(C=1) = \sum_b P(C=1 \mid b)\,f_1(b)$ takes 2 more. Total 6 instead of 8.
5. The saving grows fast. For a chain of $n$ yes/no nodes, enumeration has $2^{n-1}$ terms, while VE does about 4 multiplications per node, so about $4n$.

So VE is the distributive law used again and again: multiply only the factors that mention a variable, sum that variable out, and reuse the small result.

**D. Why the elimination order does not change the answer**

1. VE only regroups a sum of products, using the distributive law and the fact that the order of adding does not matter.
2. Regrouping never changes the value of a sum. So every order gives the same number.
3. What changes is the size of the tables made in the middle. A bad order can create a table over many variables, which is slow.

**E. Why barren nodes can be dropped**

1. Let X be hidden, and not an ancestor of the query or the evidence. Then X appears in only one factor: its own CPT $P(x \mid \text{parents})$, and no one else's CPT mentions it.
2. Summing it out gives $\sum_x P(x \mid \text{parents}) = 1$, because a CPT row always adds to 1.
3. Multiplying by 1 changes nothing. So X can be removed before we start.

**F. Why exact inference is hard in general**

The full proof is not needed for GATE. The picture: in a network with many loops, eliminating one variable can join many others into one big table. A table over $k$ yes/no variables has $2^k$ entries, so the work can grow exponentially, and no known method avoids this for all networks. On a polytree (no loops even when you ignore arrow directions) the tables stay small, so VE is fast.

### Examples

**Example 1 (easy):** two nodes. Rainy (A) → Umbrella (B). $P(A=1) = 0.3$. $P(B=1 \mid A=1) = 0.9$, $P(B=1 \mid A=0) = 0.2$. You see an umbrella. What is $P(A=1 \mid B=1)$?
1. Favourable: $P(A=1, B=1) = 0.3 \times 0.9 = 0.27$.
2. Other case: $P(A=0, B=1) = 0.7 \times 0.2 = 0.14$, because $P(A=0) = 1 - 0.3 = 0.7$.
3. Total: $P(B=1) = 0.27 + 0.14 = 0.41$.
4. Posterior: $\frac{0.27}{0.41} \approx 0.659$.

**Result:** $P(A=1 \mid B=1) \approx 0.659$.

**Example 2 (medium):** VE on a chain. $A \to B \to C$, all binary.
- $P(A=1) = 0.6$
- $P(B=1 \mid A=1) = 0.7$, $P(B=1 \mid A=0) = 0.2$
- $P(C=1 \mid B=1) = 0.9$, $P(C=1 \mid B=0) = 0.3$

Find $P(C=1)$.

1. Eliminate A. Build the small table $f_1(B) = \sum_a P(a)\,P(B \mid a)$.
2. $f_1(B=1) = 0.6 \times 0.7 + 0.4 \times 0.2 = 0.42 + 0.08 = 0.50$
3. $f_1(B=0) = 0.6 \times 0.3 + 0.4 \times 0.8 = 0.18 + 0.32 = 0.50$, using $P(B=0 \mid a) = 1 - P(B=1 \mid a)$.
4. Eliminate B: $P(C=1) = \sum_b f_1(b)\,P(C=1 \mid b)$.
5. $= 0.50 \times 0.9 + 0.50 \times 0.3 = 0.45 + 0.15 = 0.60$.

**Result:** $P(C=1) = 0.60$.

**Example 3 (hard):** a posterior on the same chain (GATE level). Find $P(A=1 \mid C=1)$.

Here A is the query, C = 1 is evidence, B is hidden. Eliminate B for each value of A.

1. For $A = 1$, sum over B: $P(B=1 \mid A=1)P(C=1 \mid B=1) + P(B=0 \mid A=1)P(C=1 \mid B=0)$.
2. $= 0.7 \times 0.9 + 0.3 \times 0.3 = 0.63 + 0.09 = 0.72$
3. Multiply by $P(A=1)$: $0.6 \times 0.72 = 0.432$. This is $P(A=1, C=1)$.
4. For $A = 0$: $0.2 \times 0.9 + 0.8 \times 0.3 = 0.18 + 0.24 = 0.42$.
5. Multiply by $P(A=0)$: $0.4 \times 0.42 = 0.168$. This is $P(A=0, C=1)$.
6. Normalise. Total $= 0.432 + 0.168 = 0.600$, which matches $P(C=1)$ from Example 2.
7. $P(A=1 \mid C=1) = \frac{0.432}{0.600} = 0.72$.

**Result:** $P(A=1 \mid C=1) = 0.72$.

Sanity check: seeing C = 1 raised our belief in A = 1 from 0.6 to 0.72. That makes sense, because A = 1 makes B = 1 likely, and B = 1 makes C = 1 likely.

### Common mistakes
> **Common mistake:** Calling variable elimination "approximate". It is **exact**. Sampling methods are the approximate ones.

> **Common mistake:** Forgetting to normalise. The sums give $P(Q, e)$, not $P(Q \mid e)$. Divide by the total.

> **Common mistake:** Thinking a different elimination order gives a different answer. Only the amount of work changes.

> **Common mistake:** Using $P(B=1 \mid A)$ for both values of B. Remember $P(B=0 \mid A) = 1 - P(B=1 \mid A)$.

### How GATE asks it
- **2025 Q.26 (MSQ)**: which statements are correct? Variable elimination is **exact** and is used to find conditional probabilities. Gibbs sampling and rejection sampling are **approximate**. Correct: C and D.
- Likely patterns: a small numeric posterior on a 3-node network (like Example 3); "does the elimination order change the answer?" (no); which variables can be dropped (barren nodes).

### Summary
- We want a posterior like $P(\text{rain} \mid \text{wet grass})$, and a Bayesian network gives us every full joint probability as a product of CPT entries.
- So, by the definition of "given", we add the joint probabilities over all hidden variables, then divide by the total. That is enumeration.
- Enumeration repeats the same multiplications many times.
- Variable elimination uses the distributive law: multiply only the factors that mention a variable, sum it out, and keep the small table.
- The answer is exact and does not depend on the order. Only the work changes, and it can still be exponential on networks with many loops.
- Next topic builds on this: Approximate Inference (sampling) estimates the same posteriors when exact adding is too slow.

### Quick self-check
1. Is variable elimination exact or approximate?
**Answer:** Exact.

2. $P(A=1) = 0.5$, $P(B=1 \mid A=1) = 0.8$, $P(B=1 \mid A=0) = 0.4$. Find $P(B=1)$.
**Answer:** $0.5 \times 0.8 + 0.5 \times 0.4 = 0.4 + 0.2 = 0.6$.

3. Does changing the elimination order change the final probability?
**Answer:** No. It changes only the computation cost.

## Approximate Inference (Sampling)

### The big idea
When a network is too big for exact adding, we **simulate** it many times, like rolling dice, and count. The fraction of matching simulations is an **estimate** of the probability. More samples give a better estimate.

### Before you start
**1. Probability as a long-run fraction (see subject: Probability & Statistics).** If something has probability 0.2, then over many tries it happens about 20% of the time. *Example: roll a fair die 600 times, and you get a six about 100 times, because $600 \times \frac{1}{6} = 100$.*

**2. A random number $u$ between 0 and 1.** A computer can give a number $u$ where every value from 0 to 1 is equally likely. The chance that $u$ lands in a stretch of length $L$ is $L$.

*Example: the stretch from 0 to 0.2 has length 0.2, so $u < 0.2$ happens 20% of the time.*

**3. CPTs and the factorisation (see topic: Bayesian Networks & Conditional Independence).** Each node has a table $P(\text{node} \mid \text{parents})$, and the probability of a full situation is the product of one entry from each table. *Example: $P(R=1, S=0, W=1) = 0.2 \times 0.9 \times 0.9 = 0.162$.*

**4. Conditional probability.** $P(q \mid e) = P(q, e) / P(e)$: the share of the "$e$ happened" cases in which $q$ also happened.

**5. Topological order.** List the nodes so that every parent comes before its children. *Example: in R → W ← S, the order R, S, W works, because W's parents R and S come first.*

**6. The hat symbol.** $\hat P$ ("P hat") means an **estimate** of $P$ from data, not the exact value. *Example: 7 heads in 10 tosses gives $\hat P(\text{heads}) = 0.7$, while the true $P$ is 0.5.*

**7. Markov blanket (see topic: Bayesian Networks & Conditional Independence).** The parents, children, and children's other parents of a node. Given its blanket, a node is independent of everything else.

**8. Exact inference (see topic: Exact Inference).** It gives the true posterior by adding over all hidden variables. Sampling estimates the same number when that adding is too slow.

### Intuition
You want to know how often it rains when the grass is wet. Instead of doing algebra, you "play" the network 1000 times. Each time, you toss a weighted coin for Rain, then for Sprinkler, then for Wet grass.

Then you keep only the mornings with wet grass and count how many of them had rain. *Example: 250 mornings had wet grass, and 185 of them had rain, so the estimate is $185/250 = 0.74$.*

> **Intuition:** Sampling is like an opinion poll. You cannot ask all of India, so you ask 1000 people and use the fraction. The answer is close, not exact, and it gets closer as the sample grows.

### Words you need
- **Sample**: one simulated full situation. *Example: (R=1, S=0, W=1).*
- **Topological order**: parents before children. *Example: R, S, then W.*
- **Prior sampling**: draw each variable from its CPT in topological order.
- **Rejection sampling**: throw away samples that disagree with the evidence.
- **Likelihood weighting**: fix the evidence values and give each sample a **weight**.
- **Gibbs sampling (MCMC)**: change one non-evidence variable at a time, using its Markov blanket.

### Formulas, explained

**Drawing a value with a random number**
$$X = 1 \text{ if } u < P(X=1 \mid \text{parents}), \text{ else } X = 0$$
- **Read it as:** "pick a random number $u$ between 0 and 1. If it is below the probability, set X to 1."
- **Symbols:** $u$ = a random number from 0 to 1, every value equally likely.
- **Why it makes sense:** $u$ falls below 0.2 exactly 20% of the time.
- **Use it when:** a question gives random numbers and asks which sample is generated.

**Rejection sampling estimate**
$$\hat P(q \mid e) = \frac{N(q, e)}{N(e)}$$
- **Read it as:** "estimate = number of kept samples with $q$, divided by the number of samples matching the evidence."
- **Symbols:** $\hat P$ = estimate; $N(\cdot)$ = count of samples.
- **Use it when:** given a list of samples. Weakness: if $P(e)$ is small, most samples are thrown away.

**Likelihood weighting estimate**
$$w = \prod_i P(e_i \mid \text{parents}(E_i)), \qquad \hat P(q \mid e) = \frac{\text{sum of } w \text{ for samples with } q}{\text{sum of all } w}$$
- **Read it as:** "each sample's weight is how likely the evidence is, given that sample. The estimate is a weighted fraction."
- **Symbols:** $e_i$ = the value of the $i$-th evidence variable $E_i$; $w$ = the weight of one sample.
- **Why it makes sense:** we never waste a sample, but samples that explain the evidence well count more.
- **Use it when:** given samples with evidence fixed, and asked for a weight or a weighted estimate.

**Gibbs sampling step**
$$P(x \mid \text{MB}(X)) \ \propto\ P(x \mid \text{parents}(X)) \prod_{C \in \text{children}(X)} P(c \mid \text{parents}(C))$$
- **Read it as:** "the chance of a new value $x$, given the Markov blanket, is proportional to X's own CPT entry times its children's CPT entries."
- **Symbols:** $\propto$ = "proportional to": compute the right side for each value of $x$, then normalise so they add to 1.
- **Use it when:** a theory question asks what Gibbs sampling conditions on (the Markov blanket).

### Where the formulas come from

**A. Drawing a value with a random number**

1. We want $X = 1$ with probability 0.2.
2. Pick $u$ between 0 and 1, and say "$X = 1$ if $u < 0.2$".
3. The stretch from 0 to 0.2 has length 0.2, so $u$ lands there 20% of the time (item 2). So $X = 1$ exactly 20% of the time, as we wanted.
4. Replace 0.2 by any probability $p$: "$X = 1$ if $u < p$" gives $X = 1$ with probability $p$.

**B. Why prior sampling copies the network's probabilities**

1. In Example 1 below, we draw R first, then S, then W, each from its own CPT row.
2. R = 1 happens with probability 0.2. Then S = 0 happens with probability 0.9. Then, given these, W = 1 happens with probability 0.9.
3. Each draw uses fresh random numbers, so we multiply: the chance of getting the sample (R=1, S=0, W=1) is $0.2 \times 0.9 \times 0.9 = 0.162$.
4. That is exactly the Bayesian network's joint probability (item 3). So in 1000 samples we expect about $1000 \times 0.162 = 162$ copies of this situation.

The full proof that the fraction gets closer as $N$ grows (the law of large numbers) is not needed for GATE. The simulation picture is enough: more coin tosses give a fraction closer to the true chance.

**C. The rejection sampling estimate $\hat P(q \mid e) = N(q, e) / N(e)$**

1. Start from the definition: $P(q \mid e) = P(q, e) / P(e)$.
2. With $N$ prior samples, $P(q, e) \approx N(q, e) / N$, because by idea B a fraction of samples estimates a probability.
3. In the same way, $P(e) \approx N(e) / N$.
4. Divide: the $N$ on top and bottom cancels, leaving $N(q, e) / N(e)$.

Why it is wasteful: we keep only about $N \times P(e)$ samples. *Example: $P(e) = 0.01$ and $N = 1000$ keep only about 10 samples.*

**D. The likelihood-weighting weight $w = \prod_i P(e_i \mid \text{parents}(E_i))$**

Use the wet-grass network with evidence W = 1.

1. We draw only R and S, and simply set W = 1. So the sample (R=1, S=0) appears with probability $0.2 \times 0.9 = 0.18$.
2. But its true share of the evidence world is $P(R=1, S=0, W=1) = 0.18 \times 0.9 = 0.162$.
3. The missing factor is $0.9 = P(W=1 \mid R=1, S=0)$, the evidence entry we skipped.
4. So we give the sample a weight of 0.9. "How often it appears × its weight" now matches the true joint.
5. With several evidence variables, each one we fix skips one CPT factor. The weight is the product of all the skipped factors, which is the formula.
6. Finally, divide "total weight with $q$" by "total weight", which is the same normalising step as idea C.

**E. Gibbs sampling**

The full proof is not needed for GATE. The idea: start with any full situation that agrees with the evidence. Then, again and again, pick one non-evidence variable and redraw it from its probability given its Markov blanket, which by item 7 is all it depends on.

1. That probability is built from the node's own CPT and its children's CPTs, because these are the only factors of the joint that mention the node.
2. Over a long run, the chain visits each situation about as often as its true probability. So counting visits gives an estimate, like in idea C.

### Examples

**Example 1 (easy):** prior sampling. Use R → W ← S with $P(R=1) = 0.2$, $P(S=1) = 0.1$, $P(W=1 \mid R=1, S=0) = 0.9$. Random numbers: 0.15, 0.42, 0.63.
1. R first (no parents): $0.15 < 0.2$, so R = 1.
2. S next (no parents): $0.42 \ge 0.1$, so S = 0.
3. W last, using the row for R=1, S=0: $0.63 < 0.9$, so W = 1.

**Result:** the sample is (R=1, S=0, W=1).

**Example 2 (medium):** rejection sampling. Ten samples are drawn. 4 have W = 1, and of those, 3 have R = 1. Estimate $P(R=1 \mid W=1)$.

1. Keep only samples that match the evidence W = 1: that is 4 samples. The other 6 are rejected.
2. Among the 4 kept, count those with R = 1: 3.
3. Estimate $= \frac{N(R=1, W=1)}{N(W=1)} = \frac{3}{4}$.

**Result:** $\hat P(R=1 \mid W=1) = 0.75$.

**Example 3 (hard):** likelihood weighting (GATE level). Evidence W = 1. Four samples of (R, S) with weight $P(W=1 \mid R, S)$: (1,0) weight 0.9; (0,1) weight 0.8; (0,0) weight 0; (1,1) weight 0.99.

1. Add the weights of samples with R = 1: $0.9 + 0.99 = 1.89$.
2. Add all weights: $0.9 + 0.8 + 0 + 0.99 = 2.69$.
3. Estimate $= \frac{1.89}{2.69} \approx 0.70$.

**Result:** $\hat P(R=1 \mid W=1) \approx 0.70$. The exact value (see topic: Bayesian Networks, Example 2) is 0.740. Close, not exact.

### Common mistakes
> **Common mistake:** Calling Gibbs or rejection sampling "exact". All sampling methods are **approximate**.

> **Common mistake:** In rejection sampling, dividing by all samples. Divide only by the samples that match the evidence.

> **Common mistake:** In likelihood weighting, sampling the evidence variable. Evidence is **fixed**; it only gives the weight.

### How GATE asks it
Not asked in 2024–2026 as its own topic, but still in the syllabus. **2025 Q.26** (tagged Exact Inference) tested that rejection and Gibbs sampling are approximate. A likely question: given random numbers, write the generated sample; or compute a rejection or weighted estimate from a sample list.

### Summary
- Exact inference can be too slow on big networks, so we simulate instead.
- First we draw each variable from its CPT in parent-first order, using a random number $u$. The chance of each full sample equals the network's joint probability.
- So fractions of samples estimate probabilities, and they get closer as we take more samples.
- Rejection sampling keeps only samples that match the evidence; it is simple but wastes samples when the evidence is rare.
- Likelihood weighting fixes the evidence and gives each sample the weight of the CPT entries it skipped, so nothing is wasted.
- Gibbs sampling changes one variable at a time using its Markov blanket. All sampling answers are approximate, never exact.
- Where this is used later: the same "simulate and count" idea (Monte Carlo) appears in ML for estimating expectations and in training probabilistic models.

### Quick self-check
1. Is rejection sampling exact?
**Answer:** No, it is approximate.

2. 20 samples match the evidence; 5 of them have $q$. Estimate $P(q \mid e)$.
**Answer:** $\frac{5}{20} = 0.25$.

3. Why is rejection sampling wasteful when the evidence is rare?
**Answer:** Almost all samples disagree with the evidence and are thrown away.
