# Programming, DS & Algorithms: formula sheet

## Python Programming

**Name tags, not boxes**
$$\texttt{b = a} \Rightarrow \text{same object}$$
`b = a` never copies; both names point to one object · *Use when:* lists/dicts/sets are assigned · *e.g.* `a=[1]; b=a; b.append(2)` makes `a` equal `[1, 2]`

**Mutate vs re-point**
$$\texttt{L.append(x)},\ \texttt{L += [x]} \ \text{edit};\quad \texttt{L = L + [x]} \ \text{makes new}$$
Editing changes the caller's list; `=` moves only the local name · *Use when:* a function receives a list · *e.g.* `def g(x): x = x + [9]` leaves the caller's `[1]` as `[1]`

**Mutable default argument**
$$\texttt{def f(x, L=[])} \Rightarrow \text{one shared list}$$
The default is built once when `def` runs; a passed list is fresh · *Use when:* a function has `=[]` or `={}` · *e.g.* `f(1)`, `f(2)` with `L.append(x)` print `[1]`, `[1, 2]`

**Closures**
$$\text{each call of outer()} \Rightarrow \text{new enclosed variables}$$
An inner function keeps its own copy of the outer variables · *Use when:* `f1 = outer(); f2 = outer()` · *e.g.* `f1` and `f2` count separately: 1, 2 and 1

**Simultaneous assignment**
$$\texttt{a, b = b, a + b} \ \text{uses old values}$$
The whole right side is computed first, then assigned · *Use when:* tuple assignment in a loop · *e.g.* from (1, 2), three rounds give (5, 8)

**Floor division and remainder**
$$a = b \cdot (a \,//\, b) + (a \,\%\, b)$$
`//` rounds down; `%` takes the sign of the divisor · *Use when:* negatives · *e.g.* `-7 // 2` is $-4$, `-7 % 2` is $1$

**Number quick facts**
$$7/2 = 3.5,\quad \texttt{int(-3.7)} = -3,\quad \texttt{round(2.5)} = 2,\quad 2^{3^2} = 512$$
`/` gives a float; `int` chops towards 0; ties round to even; `**` works right to left · *Use when:* arithmetic lines · *e.g.* `4/2` is `2.0`, `-2**2` is $-4$

**Grid trap**
$$\texttt{[[0]*3]*3} \Rightarrow 3 \text{ arrows to one row}$$
Use `[[0]*3 for _ in range(3)]` for separate rows · *Use when:* 2-D lists · *e.g.* setting `m[0][0]=1` changes every row

**List methods**
$$\texttt{append(x)}: +1 \text{ item};\quad \texttt{extend(it)}: + \text{each item}$$
`insert` needs `(index, value)`; lists have no `update`; `sort()` returns `None` · *Use when:* building lists · *e.g.* `[1].append([2])` gives `[1, [2]]`

**Slicing**
$$\texttt{s[start:stop:step]}, \ \text{stop excluded}$$
Negative step walks backwards; out of range gives empty · *Use when:* strings/lists · *e.g.* `"GATE"[::-1]` is `'ETAG'`, `"GATE"[1:3]` is `'AT'`

**Calls in a two-branch recursion**
$$C(n) = 1 + C(n-1) + C(n-2),\quad C(\text{base}) = 1$$
This call plus everything its two children call · *Use when:* "how many function calls" · *e.g.* base $n \le 0$: $C(1)=3, C(2)=5, C(3)=9, C(4)=15$

## Stacks & Queues

**Order rules**
$$\text{stack} = \text{LIFO}, \quad \text{queue} = \text{FIFO}$$
Stack removes the newest; queue removes the oldest; deque works at both ends · *Use when:* matching or tracing · *e.g.* push 1, 2, 3 then pop gives 3; enqueue 1, 2, 3 then dequeue gives 1

**Operation cost**
$$\text{push, pop, enqueue, dequeue} = O(1)$$
Only one end is touched · *Use when:* cost of $n$ operations · *e.g.* $n$ pushes cost $O(n)$

**Circular queue**
$$\text{rear} = (\text{rear} + 1) \bmod n$$
Index wraps to 0; full when $(\text{rear}+1) \bmod n = \text{front}$ · *Use when:* array queues · *e.g.* $n=5$, rear 4 moves to 0

**Postfix evaluation**
$$\text{result} = L \ \text{op} \ R \quad (R \text{ popped first})$$
Push numbers; on an operator pop R, then L · *Use when:* postfix expressions · *e.g.* `8 2 -` gives $8 - 2 = 6$

**Possible pop orders**
$$C_n = \frac{1}{n+1}\binom{2n}{n}$$
Catalan number for pushing $1..n$ in order · *Use when:* counting valid output orders · *e.g.* $n=3$: $\frac{20}{4} = 5$

## Linked Lists

**Cost table**

| operation | linked list | array |
|---|---|---|
| reach k-th item | $O(k)$ | $O(1)$ |
| insert/delete at front | $O(1)$ | $O(n)$ |
| search | $O(n)$ | $O(n)$ |
| binary search (sorted) | $O(n)$ | $O(\log n)$ |

**Safe pointer update**
$$\texttt{nxt = head.next} \text{ before } \texttt{head.next = prev}$$
Save the rest before flipping an arrow · *Use when:* reversing or deleting · *e.g.* 1 → 2 → 3 reverses to 3 → 2 → 1 in 3 steps

**Fast and slow pointers**
$$\text{slow} + 1, \quad \text{fast} + 2$$
When fast hits the end, slow is at the middle; they meet only if there is a cycle · *Use when:* middle or cycle questions · *e.g.* in 1..7, slow stops at 4

## Trees & BST

**Traversals**
$$\text{Pre} = \text{Root, L, R};\ \text{In} = \text{L, Root, R};\ \text{Post} = \text{L, R, Root}$$
Inorder of a BST is sorted · *Use when:* listing a tree · *e.g.* root 2, left 1, right 3: pre 2 1 3, in 1 2 3, post 1 3 2

**Nodes vs height**
$$H + 1 \le N \le 2^{H+1} - 1$$
A line is the minimum, a perfect tree the maximum (height in edges) · *Use when:* always-true checks · *e.g.* $H=3$: $4 \le N \le 15$

**Internal nodes vs height**
$$H \le I \le 2^{H} - 1$$
Internal nodes fill levels $0$ to $H-1$ at most · *Use when:* 2024 Q.52 style · *e.g.* $H=3$: $3 \le I \le 7$

**Leaves**
$$L = n_2 + 1, \quad L \le I + 1$$
Leaves = two-child nodes plus one; equality $L = I+1$ in a full tree · *Use when:* counting leaves · *e.g.* $n_2 = 6$ gives $L = 7$

**Rebuilding a tree**
$$\text{In + Pre}, \ \text{In + Post}: \text{always};\quad \text{Pre + Post}: \text{only if full}$$
Inorder alone never fixes the tree · *Use when:* reconstruction questions · *e.g.* pre `A B D E C F`, in `D B E A F C` gives post `D E B F C A`

**BST cost**
$$\text{search/insert/delete} = O(h)$$
Balanced $h \approx \log_2 n$; skewed $h = n-1$ · *Use when:* best/worst BST cost · *e.g.* inserting 1, 2, 3, 4 makes a line, $h = 3$

**BST delete (two children)**
$$\text{replace by min of right subtree}$$
The inorder successor keeps the BST order · *Use when:* deletion · *e.g.* delete 50 from 50(30, 70(60, 80)): 60 becomes root

## Hash Tables

**Load factor**
$$\alpha = \frac{n}{m}$$
Fraction of slots filled · *Use when:* any expected cost · *e.g.* 6 keys, 8 slots: $\alpha = 0.75$

**Linear probing**
$$h(k, i) = (h(k) + i) \bmod m$$
Try home slot, then the next ones, wrapping round · *Use when:* tracing inserts · *e.g.* $m=7$, $h(k) = k \bmod 7$: 10 → 3, then 17 → 4

**Other probes**
$$\text{quadratic: } (h(k) + c_1 i + c_2 i^2) \bmod m;\quad \text{double: } (h_1(k) + i\,h_2(k)) \bmod m$$
Spread probes out to reduce clustering · *Use when:* the question names them · *e.g.* $h=3$, $c_1=0, c_2=1$, $m=10$: try 3, 4, 7, 2

**Insert or unsuccessful search (open addressing)**
$$E[\text{probes}] \le \frac{1}{1-\alpha}$$
Insert probes until it finds an empty slot, like a failed search · *Use when:* 2024 Q.21 · *e.g.* $\alpha = 0.75$: at most 4

**Successful search (open addressing)**
$$E[\text{probes}] \le \frac{1}{\alpha}\ln\frac{1}{1-\alpha}$$
Cheaper than a failed search · *Use when:* "found" searches · *e.g.* $\alpha = 0.5$: $2\ln 2 \approx 1.39$

**Chaining**
$$\Theta(1 + \alpha)$$
Compute the slot, then walk a chain of about $\alpha$ keys · *Use when:* chaining questions · *e.g.* $\alpha = 2$: about 3 steps

## Searching (Linear/Binary)

**Binary search recurrence**
$$F(n) = F(\lfloor n/2 \rfloor) + 1,\quad F(0) = 0$$
One comparison, then at most half remains · *Use when:* "which recurrence" (2024 Q.40) · *e.g.* $F(7) = F(3) + 1 = F(1) + 2 = 3$

**Binary search worst case**
$$F(n) = \lfloor \log_2 n \rfloor + 1$$
Found or not found, 3-way comparisons · *Use when:* NAT on max comparisons · *e.g.* $n = 1000$: $9 + 1 = 10$

**Middle index**
$$\text{mid} = \lfloor (\text{lo} + \text{hi}) / 2 \rfloor$$
Loop runs while lo ≤ hi · *Use when:* tracing · *e.g.* lo 5, hi 9: mid 7

**Binary search needs**
$$\text{sorted} + O(1) \text{ random access}$$
Only a sorted array qualifies; a sorted linked list costs $O(n)$ · *Use when:* 2025 Q.27 · *e.g.* unsorted array: binary search may miss the key

**Linear search**
$$\text{worst} = n,\quad \text{average (found)} = \frac{n+1}{2}$$
Check items one by one · *Use when:* unsorted data · *e.g.* $n = 9$: average 5

## Basic Sorting (Selection/Bubble/Insertion)

**Inversion**
$$i < j \text{ and } a_i > a_j$$
A pair in the wrong order · *Use when:* counting swaps · *e.g.* `[5, 2, 4, 6, 1]` has $3+1+1+1 = 6$

**Maximum inversions**
$$\frac{n(n-1)}{2}$$
A reversed array has every pair wrong · *Use when:* worst-case swaps · *e.g.* $n = 5$: 10

**Swaps in bubble and insertion sort**
$$\text{swaps} = \text{inversions}$$
Each neighbour swap fixes exactly one wrong pair · *Use when:* NAT on swaps · *e.g.* `[5, 3, 4, 1, 2]`: 8 swaps

**Comparisons**

| | Selection | Bubble | Insertion |
|---|---|---|---|
| comparisons | $n(n-1)/2$ always | $n(n-1)/2$ plain | inv to inv $+(n-1)$ |
| swaps | $\le n-1$ | = inv | = inv (shifts) |
| best case | $O(n^2)$ | $O(n)$ early exit | $O(n)$ sorted |
| worst case | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ |
| stable | No | Yes | Yes |
| after pass $k$ | $k$ smallest fixed at front | $k$ largest fixed at end | first $k+1$ sorted |

**Bubble with early exit**
$$\text{stop after a pass with 0 swaps}$$
Sorted input needs only $n-1$ comparisons · *Use when:* "optimised bubble sort" · *e.g.* `[2, 1, 3, 5, 4, 6]`: $5 + 4 = 9$ comparisons

## Divide & Conquer (Merge/Quick Sort)

**Merge sort**
$$T(n) = 2T(n/2) + \Theta(n) = \Theta(n \log n)$$
Same in best, average and worst case; stable; $O(n)$ extra space · *Use when:* merge sort cost · *e.g.* $n = 8$: 3 levels of 8 work

**Merge comparisons**
$$\min(p, q) \le \text{comparisons} \le p + q - 1$$
Each comparison outputs one item · *Use when:* merging sorted lists of sizes $p$, $q$ · *e.g.* `[2,5,8]` + `[3,4,9]`: 5

**Quicksort worst case**
$$T(n) = T(n-1) + \Theta(n) = \Theta(n^2)$$
Pivot always min or max (sorted input, first/last pivot) · *Use when:* worst case · *e.g.* $n = 5$: about $5+4+3+2+1 = 15$ steps

**Quicksort expected**
$$T(n) = \frac{1}{n}\sum_{k=0}^{n-1}\big[T(k) + T(n-1-k)\big] + \Theta(n)$$
Average over all pivot ranks; gives $\Theta(n \log n)$ · *Use when:* random input (2026 Q.15) · *e.g.* each rank has chance $\frac{1}{n}$

**Lomuto partition**
$$\text{if } A[j] \le \text{pivot}: \ i{+}{+},\ \text{swap}(A[i], A[j]);\ \text{end: swap}(A[i+1], \text{pivot})$$
Pivot = last item · *Use when:* tracing quicksort · *e.g.* `[4,8,1,6,3,5]` becomes `[4,1,3,5,8,6]`, pivot at index 3

**Sorted input, last pivot**
$$\text{real swaps} = 0$$
Every swap is with itself · *Use when:* 2024 Q.30 · *e.g.* `[60,70,80,90,100]`: 0 swaps

## Algorithm Complexity / Recurrences

**Growth order**
$$1 < \log n < \sqrt{n} < n < n\log n < n^2 < n^3 < 2^n < n!$$
Slowest to fastest growth · *Use when:* ranking functions · *e.g.* $n^{1.5}$ beats $n \log n$

**Master theorem**
$$T(n) = aT(n/b) + \Theta(n^k)$$
$k < \log_b a$: $\Theta(n^{\log_b a})$; $k = \log_b a$: $\Theta(n^k \log n)$; $k > \log_b a$: $\Theta(n^k)$ · *Use when:* divide-and-conquer · *e.g.* $4T(n/2) + n^2$: $\Theta(n^2 \log n)$

**Standard recurrences**

| recurrence | solution |
|---|---|
| $T(n) = T(n/2) + 1$ | $\Theta(\log n)$ |
| $T(n) = T(n-1) + 1$ | $\Theta(n)$ |
| $T(n) = T(n-1) + n$ | $\Theta(n^2)$ |
| $T(n) = 2T(n/2) + n$ | $\Theta(n \log n)$ |
| $T(n) = 2T(n/2) + 1$ | $\Theta(n)$ |
| $T(n) = 2T(n-1) + 1$ | $2^n - 1$ |

**Sum 1 to n**
$$1 + 2 + \dots + n = \frac{n(n+1)}{2}$$
Pairs from both ends each sum to $n+1$ · *Use when:* triangular nested loops · *e.g.* $n = 10$: 55

**Doubling loop**
$$\texttt{i *= 2} \Rightarrow \approx \log_2 n \text{ runs}$$
Inner `range(i)` inside it gives total $< 2n$ · *Use when:* counting loops · *e.g.* $n = 1000$: 10 runs

## Graph Theory Basics

**Handshake lemma**
$$\sum_{v} \deg(v) = 2|E|$$
Each edge adds 1 to two degrees · *Use when:* edges from degrees · *e.g.* degrees 3, 3, 2, 2, 2: $|E| = 6$

**Maximum edges**
$$\frac{n(n-1)}{2} \ \text{undirected},\quad n(n-1) \ \text{directed}$$
One edge per pair · *Use when:* complete graphs · *e.g.* $n = 6$: 15

**Tree edges**
$$|E| = n - 1$$
Connected and no cycle · *Use when:* trees, spanning trees · *e.g.* 10 vertices: 9 edges

**Storage**
$$\text{matrix } \Theta(|V|^2),\quad \text{list } \Theta(|V| + |E|)$$
Matrix checks an edge in $O(1)$; list suits sparse graphs · *Use when:* choosing a representation · *e.g.* 1000 vertices: matrix has $10^6$ cells

**Reversed graph**
$$v \leadsto u \text{ in } G \iff u \leadsto v \text{ in } G^R$$
Reversing every edge reverses every path · *Use when:* 2026 Q.40 · *e.g.* edge $x \to v$ in $G$ becomes $v \to x$

## Graph Traversals (BFS/DFS)

**Traversal time**
$$O(|V| + |E|)$$
Each vertex once, each list once (matrix: $O(|V|^2)$) · *Use when:* BFS/DFS cost · *e.g.* 10 vertices, 20 edges: about 30 steps

**BFS vs DFS**
$$\text{BFS} = \text{queue, layers};\quad \text{DFS} = \text{stack, deep first}$$
Same reachable set, different order · *Use when:* tracing · *e.g.* A: B, C; B: D: BFS A B C D, DFS A B D C

**BFS distance**
$$d[v] = d[u] + 1$$
First discovery gives fewest edges · *Use when:* unweighted shortest paths · *e.g.* A → B → D: $d[D] = 2$

**DFS edge types**
$$\text{undirected: only tree and back edges}$$
A back edge means a cycle · *Use when:* edge classification (2024 Q.14) · *e.g.* in triangle A-B-C, DFS from A makes C−A a back edge

**Topological order**
$$\forall\, u \to v: \ u \text{ before } v$$
Check every edge; DFS finish times (decreasing) or in-degree 0 removal give one · *Use when:* 2024 Q.51 · *e.g.* $a \to c$, $c \to b$: only "a c b"

## Shortest Paths

**Relaxation**
$$d[u] + w(u,v) < d[v] \Rightarrow d[v] = d[u] + w(u,v)$$
Update if the route via $u$ is cheaper · *Use when:* Dijkstra, Bellman–Ford · *e.g.* $5 + 2 < 9$: $d[v] = 7$

**Triangle inequality**
$$d(s,v) \le d(s,u) + w(u,v)$$
No shortcut beats a true shortest path · *Use when:* "which edge cannot exist" (2025 Q.58) · *e.g.* shortest a−b−c−d rules out edge b−d

**Algorithm choice**

| graph | algorithm | time |
|---|---|---|
| unweighted | BFS | $O(\lvert V \rvert + \lvert E \rvert)$ |
| weights $\ge 0$ | Dijkstra (heap) | $O((\lvert V \rvert + \lvert E \rvert)\log \lvert V \rvert)$ |
| negative edges | Bellman–Ford | $O(\lvert V \rvert \lvert E \rvert)$ |
| all pairs | Floyd–Warshall | $O(\lvert V \rvert^3)$ |

**Dijkstra rule**
$$\text{finalise the smallest tentative } d$$
Final distances never change if all weights are $\ge 0$ · *Use when:* tracing Dijkstra · *e.g.* S−B 1, B−A 2, S−A 4: $d[A] = 3$
