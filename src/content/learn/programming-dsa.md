# Programming, DS & Algorithms

Think of a kitchen. A **recipe** is a list of steps. The **cook** follows the steps one by one, in order, without guessing. A computer program is a recipe, and the computer is a very strict cook. This subject teaches you two things. First, how to **read a recipe** (a short Python program) and say exactly what comes out. Second, how to **organise the kitchen**: where to keep things so you can find them fast. These "ways of keeping things" are called **data structures** (stacks, queues, lists, trees, hash tables, graphs). The step-by-step methods that use them are called **algorithms** (searching, sorting, finding a shortest route).

**Why it matters for data science and AI.** Every model you train is code. Pandas, NumPy and PyTorch are Python. A recommendation system stores users in hash tables. Google Maps uses shortest paths. A decision tree is a tree. If you cannot trace code, you cannot debug a model.

**How GATE tests it.** In 2024–2026 there were **31 questions worth 48 marks** from this subject. That is 20 marks in 2024, 14 in 2025 and 14 in 2026, about one-seventh of the paper. **Python Programming alone gave 16 marks (9 questions), the biggest single topic in the whole exam.** Then come Sorting (7 marks), BFS/DFS (7 marks), and Stacks, Trees and Binary Search (4 marks each). Most questions say "here is a code or pseudocode, what is the output?" or "how many swaps/comparisons?". You never write long programs. You **trace** them by hand, line by line.

**Study order, and why.**
1. **Python Programming** first. It carries the most marks, and every later topic uses code.
2. **Stacks & Queues**, then **Linked Lists**: the simplest structures.
3. **Searching**, then **Basic Sorting**, then **Divide & Conquer**: each builds on the one before.
4. **Algorithm Complexity / Recurrences**: now you have examples to measure.
5. **Trees & BST** and **Hash Tables**.
6. **Graph Theory Basics**, **Graph Traversals**, **Shortest Paths**: graphs use queues, stacks and trees together.

**Free resources.**
- NPTEL: *Programming, Data Structures and Algorithms using Python* by Prof. Madhavan Mukund. It matches this syllabus almost exactly.
- pythontutor.com: paste any code and watch the memory picture change, step by step. Use it to check your hand traces.
- Abdul Bari on YouTube for sorting, trees and graph algorithms.

> **GATE tip:** For every code question, draw a **variable table** on rough paper. One column per variable, one row per step. Never trace in your head. This one habit saves more marks than any formula.

## Python Programming

### The big idea
GATE shows you a short Python program and asks what it prints. To answer, you act like the computer: run one line at a time and write down every variable's value. Most traps come from one fact: **a variable is a name tag stuck on an object, not a box that holds the object.**

### Before you start
This is the first topic, so it needs only school ideas. Here they are, one by one.

**What a program is.** A program is a list of lines. The computer runs them from top to bottom, one at a time. Example: `x = 2` then `x = x + 1` leaves `x` equal to 3.

**What `=` means in code.** In maths, $x = x + 1$ is impossible. In code, `=` means "work out the right side first, then stick the name on the left to that result". So `x = x + 1` means "take the old x, add 1, and let x now mean the new number".

**What a function is.** A function is a small machine with a name. You give it inputs, it runs its lines, and it can give back (return) one result. Example: `def double(n): return 2 * n`, so `double(4)` gives 8.

**What a list is.** A list is a row of items in order, written `[10, 20, 30]`. Positions (indices) start at **0**, so `L[0]` is 10 and `L[2]` is 30.

**Quotient and remainder (school division).** Divide 17 by 5: the quotient is 3 and the remainder is 2, because $5 \times 3 + 2 = 17$. The remainder is always smaller than the divisor.

**Rounding down ("floor").** $\lfloor x \rfloor$ means "the largest whole number that is not bigger than $x$". So $\lfloor 3.5 \rfloor = 3$ and $\lfloor -3.5 \rfloor = -4$ (on the number line, $-4$ is to the left of $-3.5$).

**Memory.** The computer's memory is a huge set of numbered shelves. Every value (a number, a list) is kept on some shelf. That stored value is called an **object**, and its shelf number is its **address** (Python shows it with `id(x)`).

### Intuition
**Step 1: the variable table.** Imagine a teacher marking attendance. She goes down the register one name at a time. She never jumps ahead. Tracing code is the same. Make a table. Each column is a variable. Each row is one step. When a value changes, write the new value in a new row.

```python
x = 1
total = 0
for i in range(1, 5):
    if i % 2 == 0:
        total += i * x
    else:
        x = x + 1
print(x, total)      # prints: 3 16
```

`range(1, 5)` gives 1, 2, 3, 4 (the end, 5, is **not** included). `i % 2` is the remainder when `i` is divided by 2.

| step | i | i % 2 == 0? | action | x | total |
|---|---|---|---|---|---|
| start | - | - | - | 1 | 0 |
| 1 | 1 | No | x = 1 + 1 | 2 | 0 |
| 2 | 2 | Yes | total = 0 + 2·2 | 2 | 4 |
| 3 | 3 | No | x = 2 + 1 | 3 | 4 |
| 4 | 4 | Yes | total = 4 + 4·3 | 3 | 16 |

The last row gives the output: `3 16`.

**Step 2: name tags, not boxes.** Think of a WhatsApp group. Ravi and Priya are both members of the same group. If Ravi posts a message, Priya sees it too, because there is only **one** group. In Python, `b = a` does not copy the list. It sticks a second name tag on the **same** list.

```python
a = [1, 2, 3]
b = a          # second name tag on the SAME list
c = a[:]       # a NEW list with the same values (a copy)
b.append(4)
c[0] = 99
print(a, b, c)           # prints: [1, 2, 3, 4] [1, 2, 3, 4] [99, 2, 3]
print(a is b, a is c)    # prints: True False
```

Memory picture after all lines run:

```text
a ──┐
    ├──►  [1, 2, 3, 4]      (one list, two names)
b ──┘
c ─────►  [99, 2, 3]        (a separate list)
```

> **Intuition:** A **mutable** object (list, dict, set) is like a shared Google Doc: anyone with the link can edit it, and everyone sees the edit. An **immutable** object (int, float, str, tuple) is like a printed photo: you cannot edit it, you can only print a new one and move your name tag to it.

**Step 3: changing vs re-pointing.** `L.append(5)` **changes** the object. `L = L + [5]` builds a **new** object and moves only the tag `L`. Inside a function this difference decides everything.

```python
def change(x):
    x.append(9)        # edits the caller's list
def repoint(x):
    x = x + [9]        # new list; only the local tag x moves
p = [1]; change(p);  print(p)    # prints: [1, 9]
q = [1]; repoint(q); print(q)    # prints: [1]
```

### Words you need
- **variable**: a name tag pointing to an object. `n = 5` sticks tag `n` on the object 5.
- **object**: the actual value in memory, like the list `[1, 2]`.
- **mutable**: can be changed in place. Lists, dicts, sets. `L[0] = 7` works.
- **immutable**: cannot be changed. int, float, str, tuple. `s[0] = "x"` gives an error for a string `s`.
- **alias**: two names for one object. After `b = a`, `b` is an alias of `a`.
- **shallow copy**: a new outer list whose items are the same objects. `a[:]`, `list(a)`, `a.copy()`.
- **`is` vs `==`**: `is` asks "same object?"; `==` asks "same value?". `[1] == [1]` is True, `[1] is [1]` is False.
- **default argument**: a value used when the caller leaves an argument out. In `def f(x, L=[])`, `L=[]` is a default.
- **closure**: an inner function that remembers the variables of the outer function that made it.
- **recursion**: a function that calls itself on a smaller input, like Russian dolls.
- **call stack**: the pile of unfinished function calls. The newest call sits on top.
- **slice**: `s[start:stop:step]`, a piece of a sequence. `"GATE"[1:3]` is `"AT"`.

### Formulas, explained
**Division rule (floor division and remainder)**
$$a = b \cdot (a \,//\, b) + (a \,\%\, b)$$
- **Read it as:** "a equals b times the quotient, plus the remainder."
- **Symbols:** $a$ is the number being divided; $b$ is the divisor; $//$ is floor division (divide, then round **down**); $\%$ is the remainder.
- **Why it makes sense:** 17 sweets shared among 5 children: each gets 3, and 2 are left. $17 = 5 \cdot 3 + 2$. Python keeps this true even for negatives by always rounding **down** (towards minus infinity). So the remainder takes the sign of $b$.
- **Use it when:** you see `//` or `%` with negative numbers. Example: `-7 // 2` is $-4$ (because $-3.5$ rounds down to $-4$), and `-7 % 2` is $1$, since $-7 = 2 \cdot (-4) + 1$.

**Number of calls in a two-branch recursion**
$$C(n) = 1 + C(n-1) + C(n-2), \qquad C(\text{base}) = 1$$
- **Read it as:** "calls for n = this one call, plus all calls made for n−1, plus all calls made for n−2."
- **Symbols:** $C(n)$ is the total number of function calls started by calling `f(n)`, including that first call.
- **Why it makes sense:** a base case returns at once, so it is 1 call. Any other call is itself (1) plus everything its two children do.
- **Use it when:** a question asks "how many function calls / stack activations?" (2026 Q.39).

Other rules to remember (no formula, just facts):

| Expression | Value | Why |
|---|---|---|
| `7 / 2` | `3.5` | `/` always gives a float. `4 / 2` is `2.0`. |
| `7 // 2`, `-7 // 2` | `3`, `-4` | `//` rounds down |
| `-7 % 2`, `7 % -2` | `1`, `-1` | remainder has the sign of the divisor |
| `int(-3.7)` | `-3` | `int()` chops towards 0 |
| `round(2.5)`, `round(3.5)` | `2`, `4` | ties go to the even number |
| `2 ** 3 ** 2` | `512` | `**` works right to left: $2^9$ |
| `-2 ** 2` | `-4` | `**` before the minus sign |
| `"ab" * 3` | `'ababab'` | repeat |
| `[[0] * 3] * 3` | 3 tags on ONE inner list | changing one row changes all |

### Where the formulas come from
**1. The division rule, built from sharing sweets.**

Start with positive numbers: 17 sweets, 5 children.

1. Each child gets $\lfloor 17/5 \rfloor = \lfloor 3.4 \rfloor = 3$ sweets. This is `17 // 5`, because `//` means "divide, then round down".
2. The sweets given away are $5 \times 3 = 15$, because 5 children each took 3.
3. The sweets left over are $17 - 15 = 2$. This is `17 % 5`, because the remainder is by definition "what is left".
4. Put steps 2 and 3 together: $17 = 5 \cdot 3 + 2$. In symbols, $a = b \cdot (a // b) + (a \% b)$.

Now a negative number: $a = -7$, $b = 2$.

1. $-7 / 2 = -3.5$.
2. Python rounds **down**, so $-7 // 2 = \lfloor -3.5 \rfloor = -4$, because $-4$ is the largest whole number not bigger than $-3.5$.
3. Python then **chooses** the remainder so that the rule still holds: $-7 \% 2 = -7 - 2 \cdot (-4) = -7 + 8 = 1$.
4. Check: $2 \cdot (-4) + 1 = -7$. The rule is true.

So the rule is not a fact to memorise separately. It is the **definition** of `%`:

$$a \,\%\, b = a - b \cdot \lfloor a / b \rfloor$$

Because the floor is always at or below $a/b$, this remainder always has the same sign as $b$ (or is 0). That is why `7 % -2` is $-1$: $7 // -2 = \lfloor -3.5 \rfloor = -4$, and $7 - (-2)(-4) = 7 - 8 = -1$.

**2. The call-count formula, built from a call tree.**

Take `f(n)` from Example 5: it calls `f(n-1)` and `f(n-2)` unless $n \le 1$.

1. Calling `f(1)` or `f(0)` starts exactly 1 call and stops, because the `if n <= 1` line returns at once. So $C(0) = C(1) = 1$.
2. Calling `f(2)` starts 1 call (itself). Inside, it calls `f(1)` (1 call) and `f(0)` (1 call). Total $C(2) = 1 + 1 + 1 = 3$.
3. Calling `f(3)` starts itself (1), then everything `f(2)` starts (3), then everything `f(1)` starts (1). Total $C(3) = 1 + 3 + 1 = 5$.
4. In general, one call of `f(n)` is "itself, plus the whole tree under `f(n-1)`, plus the whole tree under `f(n-2)`". Those trees do not share calls, because each call runs separately (Python does not remember old answers). So:

$$C(n) = 1 + C(n-1) + C(n-2)$$

5. Continue: $C(4) = 1 + 5 + 3 = 9$, $C(5) = 1 + 9 + 5 = 15$. These match the numbers a program counts when it adds 1 to a counter inside `f`.

This is the same shape as the Fibonacci numbers, plus 1 each time. Fibonacci numbers grow by about 1.6 times per step, so the number of calls grows **exponentially** (see topic: Algorithm Complexity / Recurrences).

**3. Why Python behaves this way: the memory model.**

Every rule in this topic comes from one picture: **names live in one table, objects live on shelves, and `=` only writes a shelf number next to a name.**

1. `a = [1, 2]` puts a list object on a shelf, say shelf 500. The name table now says `a → 500`.
2. `b = a` copies the **shelf number**, not the list. The table says `b → 500`. So `b is a` is True, because `is` compares shelf numbers.
3. `b.append(3)` goes to shelf 500 and changes the list there. Both names see `[1, 2, 3]`, because they point to the same shelf.
4. `a = a + [4]` first builds a **new** list on a new shelf, say 800. Then `=` changes only the table entry `a → 800`. `b` still says 500.
5. Integers are immutable, so `x = x + 1` always makes a new object and moves the tag. That is why after `x = 5; y = x; x = x + 1`, `y` is still 5. No line can change the object 5 itself.

**Why a default list is shared.** The line `def add(k, bag=[])` runs **once**, when Python first reads the function. At that moment it builds one empty list and stores its shelf number inside the function (you can see it as `add.__defaults__`). Each call that leaves out `bag` just reuses that stored shelf number. Running the code shows `([],)`, then `([1],)` after the first call, then `([1, 2],)`.

**Why `[[0] * 3] * 3` shares rows.** `[0] * 3` builds one inner list. The outer `* 3` repeats what is **inside** the outer list, and what is inside is a shelf number. So you get three copies of the same shelf number. Checking `m[0] is m[1]` gives True.

**Why closures do not share.** Each time `make()` runs, Python makes a fresh workspace (a "frame") with a fresh `count = [0]`. The inner `tick` keeps the shelf number of **that** `count`. So `t1` and `t2` hold different shelf numbers, and their counters are separate.

**Why `L += [x]` edits but `L = L + [x]` does not.** For lists, `+=` is defined as "extend this same list in place". The `+` operator always builds a new list. So `L += [2]` keeps `L` on the same shelf (`L is old` stays True), while `L = L + [3]` moves `L` to a new shelf.

### Examples
**Example 1 (easy): simultaneous assignment.** Python evaluates the **whole right side first**, using old values, and then assigns.

```python
a, b = 1, 2
for _ in range(3):
    a, b = b, a + b
print(a, b)          # prints: 5 8
```

| loop | old a | old b | new a = old b | new b = old a + old b |
|---|---|---|---|---|
| 1 | 1 | 2 | 2 | 1 + 2 = 3 |
| 2 | 2 | 3 | 3 | 2 + 3 = 5 |
| 3 | 3 | 5 | 5 | 3 + 5 = 8 |

Output: `5 8`. If you wrote two lines `a = b` then `b = a + b`, the second line would use the **new** a, and you would get a different answer.

**Result:** `5 8`.

**Example 2 (medium): the grid trap.**

```python
m = [[0] * 3] * 3
m[0][0] = 1
print(m)             # prints: [[1, 0, 0], [1, 0, 0], [1, 0, 0]]
g = [[0] * 3 for _ in range(3)]
g[0][0] = 1
print(g)             # prints: [[1, 0, 0], [0, 0, 0], [0, 0, 0]]
```

Memory picture for `m`:

```text
m ──► [ • , • , • ]
        │   │   │
        └───┴───┴──►  [1, 0, 0]     (ONE inner list, three arrows)
```

`* 3` copied the **arrow** three times, not the inner list. The list comprehension runs `[0] * 3` three separate times, so `g` has three different rows.

**Result:** `m` has all three rows changed, `[[1, 0, 0], [1, 0, 0], [1, 0, 0]]`; `g` has only its first row changed.

**Example 3 (GATE level): mutable default plus re-pointing.**

```python
def add(k, bag=[]):
    bag.append(k)
    bag = bag + [k * 10]
    bag.append(0)
    return len(bag)

r1 = add(1)
r2 = add(2)
r3 = add(3, [7])
r4 = add(4)
print(r1, r2, r3, r4)    # prints: 3 4 4 5
```

Rule: the default `[]` is created **once**, when `def` runs. Call it `D`. Every call that leaves out `bag` uses that same `D`.

| call | bag starts as | after `append(k)` | `D` now | `bag = bag + [k*10]` (new list) | after `append(0)` | returns |
|---|---|---|---|---|---|---|
| `add(1)` | D = [] | [1] | [1] | [1, 10] | [1, 10, 0] | 3 |
| `add(2)` | D = [1] | [1, 2] | [1, 2] | [1, 2, 20] | [1, 2, 20, 0] | 4 |
| `add(3, [7])` | [7] (fresh) | [7, 3] | [1, 2] | [7, 3, 30] | [7, 3, 30, 0] | 4 |
| `add(4)` | D = [1, 2] | [1, 2, 4] | [1, 2, 4] | [1, 2, 4, 40] | [1, 2, 4, 40, 0] | 5 |

Only `append(k)` touches `D`. After `bag = bag + ...`, the tag `bag` points to a new list, so `append(0)` edits that new list, not `D`. Output: `3 4 4 5`.

**Result:** `3 4 4 5`.

**Example 4 (GATE level): closures.** Each call of the outer function makes **fresh** variables.

```python
def make():
    count = [0]
    def tick():
        count[0] += 1
        return count[0]
    return tick
t1 = make()
t2 = make()
print(t1(), t1(), t2(), t1())   # prints: 1 2 1 3
```

`t1` and `t2` each own a separate `count` list, like two separate step counters. `t1` goes 1, 2, then 3; `t2` starts at 1.

**Result:** `1 2 1 3`.

**Example 5 (GATE level): recursion with a call tree.**

```python
def f(n):
    if n <= 1:
        return n
    return f(n - 1) + 2 * f(n - 2)
print(f(4))          # prints: 5
```

Work **bottom-up**: $f(0)=0$, $f(1)=1$, $f(2)=f(1)+2f(0)=1+0=1$, $f(3)=f(2)+2f(1)=1+2=3$, $f(4)=f(3)+2f(2)=3+2=5$.
Number of calls: $C(0)=C(1)=1$, $C(2)=1+1+1=3$, $C(3)=1+3+1=5$, $C(4)=1+5+3=9$.

**Result:** `f(4)` returns 5, using 9 calls.

### Common mistakes
> **Common mistake:** Thinking `b = a` copies a list. It only adds a second name. Draw the arrow picture whenever you see `=` between two list names.

> **Common mistake:** Thinking a default like `L=[]` is fresh on each call. It is made once and shared. Only an explicitly passed list is fresh.

> **Common mistake:** Mixing up `append` and `extend`. `[1].append([2, 3])` gives `[1, [2, 3]]`; `[1].extend([2, 3])` gives `[1, 2, 3]`. Lists have no `update` method.

> **Common mistake:** Updating variables one at a time in `a, b = b, a + b`. The right side uses only the **old** values.

> **Common mistake:** Forgetting that `/` gives a float (`4/2` is `2.0`) and that `//` rounds **down** for negatives (`-7 // 2` is `-4`, not `-3`).

### How GATE asks it
- **2024 Q.38**: a dict of child lists with a recursive `count`; it counts nodes in a subtree (answer 9).
- **2024 Q.39**: pseudocode `computeS` on `[6, 3, 5, 4, 10]`; trace a row per loop to get `[1, 1, 2, 1, 2]`.
- **2024 Q.41**: swap `D[s1]`, `D[s2]` and recurse inward, so the function reverses a segment.
- **2025 Q.23**: `extend` vs `append` vs `insert` vs a non-existent `update`.
- **2025 Q.47**: set operations (`-` and union) inside `A, B, C = ...` in a while loop; uses old values on the right.
- **2025 Q.63**: a recursion where `(a-1)/2` makes floats; the answer is still 160.
- **2026 Q.16**: mutable default list shared between calls.
- **2026 Q.39**: count stack activations of `mystery(4)` with $C(n)=1+C(n-1)+C(n-2)$; answer 15.
- **2026 Q.50**: closures; `f1` and `f2` each own a separate list.

> **GATE tip:** In an MSQ, judge each option separately. When an option says two things are "shared", count how many times the line that **creates** the object actually ran.

### Summary
- First we learned to trace code like a strict cook: one line at a time, with a variable table on paper.
- Then we saw that a variable is a name tag pointing to an object on a memory shelf, not a box.
- So `b = a` makes two tags on one object, and changing a mutable object (list, dict, set) through one tag shows through the other.
- But `=` with a new value (like `a = a + [3]`) only moves one tag, and immutable objects (int, str, tuple) can never be changed in place.
- That is why default lists are shared (built once at `def`), `[[0]*3]*3` shares rows, and each closure call gets fresh variables.
- For numbers, `//` rounds down and `%` is defined so that $a = b \cdot (a//b) + (a\%b)$ always holds; for recursion, count calls with $C(n) = 1 + C(n-1) + C(n-2)$.
- Next topic builds on this: Stacks & Queues, which are just Python lists used with special rules, and the call stack you saw in recursion.

### Quick self-check
1. What does `print(-9 // 4, -9 % 4)` print?
**Answer:** `-3 3`, because $-9/4=-2.25$ rounds down to $-3$, and $-9 = 4 \cdot (-3) + 3$.
2. `a = [1, 2]; b = a; a = a + [3]; print(b)`. What is printed?
**Answer:** `[1, 2]`. `a + [3]` makes a new list and moves only tag `a`; `b` still points to the old list.
3. `x = [5]; y = [x, x]; x.append(6); print(y)`. What is printed?
**Answer:** `[[5, 6], [5, 6]]`. Both items of `y` are arrows to the same list `x`.

## Stacks & Queues

### The big idea
A **stack** and a **queue** are containers where you may add and remove items only at fixed ends. A stack removes the **newest** item first. A queue removes the **oldest** item first.

### Before you start
**Python lists (see topic: Python Programming).** A list is a row of items with positions 0, 1, 2, … . `L.append(x)` adds `x` at the right end, and `L.pop()` removes and returns the right-end item. Example: `L = [4, 7]; L.append(1)` gives `[4, 7, 1]`, then `L.pop()` returns 1.

**Counting steps ("time").** We measure how fast a method is by counting basic steps (look at one item, move one item). If a job takes the same few steps for 10 items or 10 million items, we call it $O(1)$, "constant time". If it touches every item once, it is $O(n)$, where $n$ is the number of items. (Full detail in topic: Algorithm Complexity / Recurrences.)

**Remainder, `mod`.** $a \bmod n$ is the remainder when $a$ is divided by $n$. Example: $7 \bmod 5 = 2$ and $5 \bmod 5 = 0$. It is the same as Python's `a % n` for positive numbers.

**Choose, $\binom{m}{k}$.** $\binom{m}{k}$ ("m choose k") is the number of ways to pick $k$ places out of $m$ places, when order does not matter. Example: $\binom{4}{2} = 6$: from places 1, 2, 3, 4 you can pick {1,2}, {1,3}, {1,4}, {2,3}, {2,4}, {3,4}. Formula: $\binom{m}{k} = \frac{m!}{k!\,(m-k)!}$, where $m! = 1 \times 2 \times \dots \times m$.

### Intuition
**A stack is a pile of plates** in a wedding buffet. You put a clean plate on **top**. The next guest takes the plate from the **top**. The plate you put last is taken first. This is **LIFO**: Last In, First Out.

**A queue is the line at a railway ticket counter.** New people join at the **back** (the rear). The person at the **front** gets the ticket and leaves. The first to come is the first to go. This is **FIFO**: First In, First Out.

**A deque** (say "deck", short for double-ended queue) is a line where people may join or leave at **both** ends.

> **Intuition:** Your browser's Back button is a stack: the page you opened most recently is the first one you go back to. A printer's job list is a queue: the document sent first prints first.

Watch a stack change, one step at a time (top is on the right):

| operation | stack after | value returned |
|---|---|---|
| push(4) | [4] | - |
| push(7) | [4, 7] | - |
| push(1) | [4, 7, 1] | - |
| pop() | [4, 7] | 1 |
| push(9) | [4, 7, 9] | - |
| pop() | [4, 7] | 9 |

Now the same operations on a queue (front on the left, rear on the right):

| operation | queue after | value returned |
|---|---|---|
| enqueue(4) | [4] | - |
| enqueue(7) | [4, 7] | - |
| enqueue(1) | [4, 7, 1] | - |
| dequeue() | [7, 1] | 4 |
| enqueue(9) | [7, 1, 9] | - |
| dequeue() | [1, 9] | 7 |

Same inputs, different outputs. That is the whole difference.

### Words you need
- **push**: put an item on top of a stack. push(5) on [2] gives [2, 5].
- **pop**: remove and return the top item. pop() on [2, 5] returns 5.
- **peek / top**: look at the top item without removing it.
- **enqueue**: add at the rear of a queue. **dequeue**: remove from the front.
- **underflow**: popping from an empty stack (an error). **overflow**: pushing into a full fixed-size stack.
- **circular queue**: a queue stored in a fixed array where the indices wrap around to 0, like seats on a merry-go-round.
- **postfix expression**: the operator comes after its two numbers. `3 4 +` means 3 + 4.

### Formulas, explained
**Every basic operation is constant time**
$$\text{push, pop, enqueue, dequeue} = O(1)$$
- **Read it as:** "each of these takes the same small time, however many items there are."
- **Symbols:** $O(1)$ means "constant time": the time does not grow with the number of items $n$.
- **Why it makes sense:** you only touch one end. You never walk through the other items.
- **Use it when:** comparing structures or computing the total cost of $n$ operations ($n \times O(1) = O(n)$).

**Circular queue index**
$$\text{rear} = (\text{rear} + 1) \bmod n$$
- **Read it as:** "move rear one step forward; if it falls off the end, wrap back to 0."
- **Symbols:** $n$ is the array size; $\bmod$ is the remainder after dividing by $n$.
- **Why it makes sense:** with $n = 5$, index 4 plus 1 is 5, and $5 \bmod 5 = 0$: we go back to the start, like a clock going from 12 to 1.
- **Use it when:** a question uses a fixed array for a queue. If one slot is kept empty, the queue is full when $(\text{rear}+1) \bmod n = \text{front}$, so it holds at most $n-1$ items.

**Number of possible pop orders**
$$C_n = \frac{1}{n+1}\binom{2n}{n}$$
- **Read it as:** "the n-th Catalan number."
- **Symbols:** $n$ items are pushed in order 1, 2, …, n, and you may pop at any time. $\binom{2n}{n}$ is "2n choose n".
- **Why it makes sense:** each valid order is a valid sequence of n pushes and n pops where pops never outnumber pushes.
- **Use it when:** "how many output orders are possible?" For $n=3$: $\frac{1}{4}\binom{6}{3} = \frac{20}{4} = 5$.

### Where the formulas come from
**1. Why push and pop are $O(1)$: count the steps.**

Think of a Python list `[4, 7, 1]` used as a stack, with the top at the right end.

1. `pop()` reads the last item (1 step), then makes the list one shorter (1 step). That is 2 steps, because the list knows its own length, so it can jump straight to the last position.
2. `append(9)` writes 9 in the next free slot (1 step) and adds 1 to the length (1 step). Again about 2 steps.
3. With 1,000,000 items, these are still about 2 steps each, because no other item is looked at. So the time does not depend on $n$, which is the meaning of $O(1)$.
4. One honest detail: a Python list keeps a few spare empty slots at the end. When they run out, Python moves the whole list to a bigger space, which costs $O(n)$ once. It grows by a fixed fraction each time, so these moves are rare. Averaged over many appends, each append is still $O(1)$. The full proof of this "average" is not needed for GATE.

**2. Why `list.pop(0)` is $O(n)$ for a queue.**

1. Take `[4, 7, 1, 9]` and remove the front item 4.
2. Python keeps items side by side starting at position 0. So 7 must move to position 0, 1 to position 1, and 9 to position 2.
3. That is 3 moves for 4 items. With $n$ items it is $n - 1$ moves, because every item except the removed one shifts left by one.
4. So `pop(0)` costs $O(n)$. A `collections.deque` avoids this by remembering where the front is instead of moving items.

**3. The circular queue index, built from a clock.**

Take an array of size $n = 5$ with positions 0, 1, 2, 3, 4.

1. Start with `rear = 0`. Adding 1 each time gives 1, 2, 3, 4.
2. The next step would be 5, but position 5 does not exist. We want to go back to 0, because the front slots may be free again after dequeues.
3. $5 \bmod 5 = 0$. And for every smaller value, $k \bmod 5 = k$, because a number smaller than 5 has remainder itself.
4. So one formula handles both cases: $\text{rear} = (\text{rear} + 1) \bmod n$. Running it from 0 gives 0, 1, 2, 3, 4, 0, 1, … exactly like a clock.

**Why one slot is kept empty.** Suppose `front == rear` means "empty". If we filled all $n$ slots, rear would wrap round and become equal to front again. Then "empty" and "full" would look the same. So we stop one slot early: full means $(\text{rear}+1) \bmod n = \text{front}$, and the queue holds at most $n - 1$ items.

**4. The Catalan number, built from push/pop words.**

Push 1, 2, 3 in this order, popping whenever you like. Write U for a push and O for a pop.

1. Every run is a word of 3 U's and 3 O's, because each item is pushed once and popped once. Example: U O U U O O pushes 1, pops 1, pushes 2, pushes 3, pops 3, pops 2, so the output is 1, 3, 2.
2. A word is **valid** only if, reading left to right, the number of O's never exceeds the number of U's. Otherwise you would pop an empty stack.
3. Different valid words give different output orders, and every order you can make comes from one valid word. So "number of orders" = "number of valid words".
4. The total number of words with 3 U's and 3 O's is $\binom{6}{3} = 20$, because we choose which 3 of the 6 places hold U.
5. The bad words (somewhere O's get ahead) number $\binom{6}{4} = 15$. The reason is a "flip" trick: at the first moment O gets ahead, swap every later U and O. This turns each bad word into a word with 4 O's and 2 U's, and the swap can be undone, so the counts match. The full proof is not needed for GATE.
6. Valid words: $20 - 15 = 5$. In general:

$$C_n = \binom{2n}{n} - \binom{2n}{n+1} = \frac{1}{n+1}\binom{2n}{n}$$

The last step is algebra: $\binom{2n}{n+1} = \binom{2n}{n} \cdot \frac{n}{n+1}$, so the difference is $\binom{2n}{n}\left(1 - \frac{n}{n+1}\right) = \frac{1}{n+1}\binom{2n}{n}$.

7. Check by brute force (a program trying every push/pop choice): $n = 3$ gives the 5 orders 123, 132, 213, 231, 321, and $n = 4$ gives 14. The missing order for $n = 3$ is 3, 1, 2: to pop 3 first, 1 and 2 are already on the stack with 2 on top, so 1 cannot come next.

### Examples
**Example 1 (easy): balanced brackets.** Is `( [ ] { } )` balanced? Push every opening bracket. On a closing bracket, pop and check it matches.

| read | action | stack after |
|---|---|---|
| ( | push | [ ( ] |
| [ | push | [ (, [ ] |
| ] | pop "[" , matches | [ ( ] |
| { | push | [ (, { ] |
| } | pop "{" , matches | [ ( ] |
| ) | pop "(" , matches | [ ] |

The stack is empty at the end, so it is **balanced**.

**Result:** the string is balanced.

**Example 2 (medium): evaluate postfix `5 1 2 + 4 * + 3 -`.** Push numbers. On an operator, pop the top (call it R, the right number), pop again (L, the left number), push L op R.

| token | action | stack after |
|---|---|---|
| 5, 1, 2 | push each | [5, 1, 2] |
| + | R = 2, L = 1, push 1 + 2 = 3 | [5, 3] |
| 4 | push | [5, 3, 4] |
| * | R = 4, L = 3, push 3 × 4 = 12 | [5, 12] |
| + | R = 12, L = 5, push 5 + 12 = 17 | [17] |
| 3 | push | [17, 3] |
| - | R = 3, L = 17, push 17 − 3 = 14 | [14] |

Answer: **14**.

**Result:** 14.

**Example 3 (GATE level): stack with a condition.** Trace this code.

```python
S = []
total = 0
for x in [3, 8, 2, 7, 6, 1]:
    if x % 2 == 0:
        S.append(x)
    elif S:
        total += S.pop() * x
print(total, S)      # prints: 20 [8]
```

`elif S:` is True when `S` is not empty.

| x | even? | action | S after | total |
|---|---|---|---|---|
| 3 | No | S is empty, do nothing | [] | 0 |
| 8 | Yes | push 8 | [8] | 0 |
| 2 | Yes | push 2 | [8, 2] | 0 |
| 7 | No | pop 2, add 2 × 7 = 14 | [8] | 14 |
| 6 | Yes | push 6 | [8, 6] | 14 |
| 1 | No | pop 6, add 6 × 1 = 6 | [8] | 20 |

Output: `20 [8]`. The odd numbers 7 and 1 each consume the even number on top of the stack. The 8 is never popped, because after 2 and 6 are used no odd number is left.

**Result:** `20 [8]`.

**Example 4 (GATE level): deque.** Start empty. Do: insertLast(5), insertFirst(2), insertLast(9), removeFirst(), insertFirst(4), removeLast(). Front is on the left.

| operation | deque after | removed |
|---|---|---|
| insertLast(5) | [5] | - |
| insertFirst(2) | [2, 5] | - |
| insertLast(9) | [2, 5, 9] | - |
| removeFirst() | [5, 9] | 2 |
| insertFirst(4) | [4, 5, 9] | - |
| removeLast() | [4, 5] | 9 |

Last removed value: **9**.

**Result:** the last removed value is 9.

### Common mistakes
> **Common mistake:** Reversing L and R in postfix. For `8 2 -`, the first pop is 2 (right), the second is 8 (left), so the answer is 8 − 2 = 6, not −6.

> **Common mistake:** In pseudocode loops, missing that a flag set in one `if` is checked by the next `if` **in the same iteration** (2025 Q.64). Read every `if` in order, every time.

> **Common mistake:** Using `list.pop(0)` as a fast queue in Python. It works but costs $O(n)$, because every item shifts left. Use `collections.deque` and `popleft()`.

### How GATE asks it
- **2024 Q.16**: match FIFO to queue, LIFO to stack, lookup to hash table. Free marks.
- **2024 Q.32**: trace a deque with insertFirst/insertLast/removeFirst/removeLast; the last removed value is 17.
- **2025 Q.64**: push 0..8, then pop with an extra pop for odd values and add to a sum; answer 24. Keep columns for stack, popped value and sum.

### Summary
- First we met two containers that allow changes only at fixed ends: a stack (top only) and a queue (add at rear, remove at front).
- A stack gives LIFO order, so it is perfect for anything "nested": brackets, postfix expressions, the Back button and function calls.
- A queue gives FIFO order, so it is perfect for "wait your turn" jobs like printers and, later, BFS.
- Each operation touches only one end, so it costs $O(1)$; `list.pop(0)` breaks this because every item shifts.
- A fixed array can act as a queue by wrapping indices with $\bmod n$, keeping one slot empty to tell "full" from "empty".
- The number of pop orders from pushing $1..n$ is the Catalan number $\frac{1}{n+1}\binom{2n}{n}$, because orders match valid push/pop words.
- Next topic builds on this: Linked Lists, another way to store a sequence, and later BFS (queue) and DFS (stack) in Graph Traversals.

### Quick self-check
1. Push 1, 2, 3, pop, push 4, pop, pop. What is popped, in order?
**Answer:** 3, 4, 2.
2. Enqueue 1, 2, 3, dequeue, enqueue 4, dequeue. What is left in the queue?
**Answer:** [3, 4].
3. Evaluate postfix `2 3 4 * +`.
**Answer:** 3 × 4 = 12, then 2 + 12 = 14.

## Linked Lists

### The big idea
A **linked list** is a chain of boxes called **nodes**. Each node holds a value and an arrow (a **pointer**) to the next node. You can only move forward along the arrows.

### Before you start
**Name tags and arrows (see topic: Python Programming).** In Python, a variable is a tag pointing to an object. A linked list uses exactly this idea: each node holds a tag (`next`) that points to another node. Example: after `b = a`, both `a` and `b` point to one object; after `n1.next = n2`, node `n1` points to node `n2`.

**`None`.** `None` is Python's word for "nothing". A `next` that is `None` means "there is no next node", so the chain ends there.

**A class and `self`.** `class Node:` describes a new kind of object, like a form with blank fields. `Node(10)` fills in one form. Inside the class, `self.val` means "the `val` field of this particular node". Example: `n = Node(10)` then `n.val` is 10.

**Arrays.** A Python list is stored as an array: items sit side by side in memory, so position $k$ can be found with one calculation, "start address + $k$ steps". That is why `L[5]` is instant.

**$O(\cdot)$ notation.** $O(1)$ means a fixed number of steps; $O(n)$ means steps grow in proportion to the number of items $n$ (see topic: Algorithm Complexity / Recurrences).

### Intuition
Think of a **treasure hunt**. The first clue tells you where the second clue is hidden. The second clue tells you where the third is. To reach clue 5, you must visit clues 1, 2, 3 and 4 first. You cannot jump.

An **array** is different. It is like seats numbered 0, 1, 2, … in a cinema row. You can walk straight to seat 5.

But adding a new clue in the middle of a treasure hunt is easy: change one clue to point to the new one, and make the new one point to the old next clue. In a cinema row, adding a seat in the middle means everyone after it must shift.

> **Intuition:** Linked list = easy to insert, slow to reach. Array = fast to reach, slow to insert in the middle.

```text
head ──► [10 | •] ──► [20 | •] ──► [30 | •] ──► None
```

### Words you need
- **node**: one box with a value and a `next` pointer. `[20 | •]` holds 20.
- **head**: a pointer to the first node. If `head` is `None`, the list is empty.
- **None**: "nothing here", the end of the chain.
- **doubly linked list**: each node also has `prev`, an arrow back.
- **circular list**: the last node points back to the head.

### Formulas, explained
**Cost to reach the k-th node**
$$\text{access}(k) = O(k)$$
- **Read it as:** "reaching node k takes about k steps."
- **Symbols:** $k$ is the position counted from the head.
- **Why it makes sense:** you must follow k arrows, one at a time.
- **Use it when:** comparing with an array, where access is $O(1)$. This is why binary search on a linked list is $O(n)$ (2025 Q.27).

| operation | singly linked list | array |
|---|---|---|
| reach k-th item | $O(k)$ | $O(1)$ |
| insert/delete at front | $O(1)$ | $O(n)$ |
| insert after a known node | $O(1)$ | $O(n)$ |
| search for a value | $O(n)$ | $O(n)$ |

### Where the formulas come from
**1. Why reaching node $k$ costs $O(k)$.**

1. The only door into the list is `head`, which points to node 1. Reaching node 1 costs 0 moves.
2. To reach node 2, you must read node 1's `next` arrow: 1 move. The list has no other record of where node 2 lives.
3. Each further node needs one more arrow-follow, because node $j$'s address is written only inside node $j - 1$.
4. So reaching node $k$ costs $k - 1$ moves, which grows like $k$: that is $O(k)$. In the worst case ($k = n$) it is $O(n)$.

An array is different because the address of item $k$ is a formula ("start + $k$"), so no walking is needed. That one difference makes the "reach" row of the table.

**2. Why insert at the front is $O(1)$ for a list but $O(n)$ for an array.**

1. Linked list, insert 5 at the front of 10 → 20 → 30: make `[5]`, set its `next` to the current head (1 step), set `head` to the new node (1 step). Two steps, whatever the length, so $O(1)$.
2. Array `[10, 20, 30]`, insert 5 at position 0: 30 moves to position 3, 20 to position 2, 10 to position 1, then 5 goes in position 0. That is 3 moves for 3 items, so $n$ moves for $n$ items: $O(n)$.

**3. Why binary search on a sorted linked list is $O(n)$.**

1. Binary search first looks at the middle. On a linked list, reaching the middle of $n$ nodes costs about $n/2$ moves (from point 1).
2. Next round, the middle of the remaining half is about $n/4$ moves away.
3. Total moves are about $\frac{n}{2} + \frac{n}{4} + \frac{n}{8} + \dots$, which is less than $n$, because each term fills half of what is left of the gap up to $n$.
4. A quick program that counts the moves confirms it: for $n = 1024$ the worst case is 1023 moves, and for $n = 10^6$ it is 999,999 moves. So the time is $O(n)$, no better than simply walking through.

**4. Why the reverse loop is correct.**

At the start of every loop round, two facts are true:
- `prev` points to the nodes already visited, now linked **backwards**.
- `head` points to the nodes not yet visited, still linked **forwards**.

1. At the start, `prev = None` (no visited nodes) and `head` is the whole list. Both facts hold.
2. One round saves `nxt`, flips `head.next` to `prev`, then moves both tags one node on. The visited part grows by one node, still backwards. The unvisited part loses one node, still forwards. So both facts still hold.
3. The loop ends when `head` is `None`: no unvisited nodes. Then `prev` is the whole list, backwards. That is exactly the reversed list.

**5. Why fast and slow pointers find the middle.**

1. After $r$ rounds, `slow` is at node $1 + r$ and `fast` is at node $1 + 2r$, because they move 1 and 2 steps per round.
2. For an odd length $n$, `fast` stops at the last node when $1 + 2r = n$, so $r = \frac{n-1}{2}$.
3. Then `slow` is at node $1 + \frac{n-1}{2} = \frac{n+1}{2}$, which is the middle. For $n = 5$: node 3. For $n = 7$: node 4.

**6. Why fast catches slow if there is a loop (Floyd).**

1. Once both pointers are inside the loop, look at the gap: how many steps `fast` is behind `slow`, going round the loop.
2. Each round, `slow` moves 1 and `fast` moves 2, so the gap shrinks by exactly 1.
3. A gap that shrinks by 1 each round must hit 0, and it cannot jump past 0. When the gap is 0, they are on the same node.
4. Example: 1 → 2 → … → 7 → 3 (7 points back to 3, a loop of 5 nodes). Running it gives (slow, fast) = (2, 3), (3, 5), (4, 7), (5, 4), (6, 6). They meet at node 6 in round 5.
5. If there is no loop, `fast` reaches `None` first, so the test ends.

### Examples
**Example 1 (easy): insert 15 after 10.** Make node `[15]`. Point it to 20. Point 10 to it.

```text
before: [10] ──► [20] ──► [30]
step 1: new [15] ──► [20]
step 2: [10] ──► [15] ──► [20] ──► [30]
```

Order matters. If you first point 10 to 15, you lose the arrow to 20.

**Result:** 10 → 15 → 20 → 30.

**Example 2 (medium): reverse the list 1 → 2 → 3.**

```python
class Node:
    def __init__(self, val, nxt=None):
        self.val, self.next = val, nxt

def reverse(head):
    prev = None
    while head:
        nxt = head.next      # remember the rest
        head.next = prev     # flip this arrow
        prev = head
        head = nxt
    return prev

h = reverse(Node(1, Node(2, Node(3))))
out = []
while h:
    out.append(h.val); h = h.next
print(out)           # prints: [3, 2, 1]
```

| step | prev | head | arrows flipped so far |
|---|---|---|---|
| start | None | 1 | none |
| 1 | 1 | 2 | 1 → None |
| 2 | 2 | 3 | 2 → 1 → None |
| 3 | 3 | None | 3 → 2 → 1 → None |

**Result:** `[3, 2, 1]`.

**Example 3 (GATE level): fast and slow pointers.** `slow` moves 1 step, `fast` moves 2 steps. On 1 → 2 → 3 → 4 → 5:

| round | slow | fast |
|---|---|---|
| start | 1 | 1 |
| 1 | 2 | 3 |
| 2 | 3 | 5 |

`fast` is at the last node, so we stop. `slow` is at 3, the **middle**. If the list had a loop, `fast` would never reach `None` and would catch `slow` from behind. This is Floyd's cycle check.

**Result:** `slow` stops at node 3, the middle of 5 nodes.

### Common mistakes
> **Common mistake:** Changing `head.next` before saving it. You lose the rest of the list. Always save `nxt = head.next` first.

> **Common mistake:** Believing binary search is fast on a sorted linked list. Reaching the middle alone costs $n/2$ steps, so the total is $O(n)$.

### How GATE asks it
Not asked in 2024–2026 as its own topic, but still in the syllabus. It appeared inside 2025 Q.27 (binary search on a linked list is not $O(\log n)$). A likely question: trace a short pointer function (reverse, delete every second node, find the middle) and give the final list.

### Summary
- First we built a sequence differently from an array: separate nodes joined by `next` arrows, starting at `head`.
- Because each node's address is stored only in the node before it, reaching node $k$ means walking $k-1$ arrows: $O(k)$.
- But inserting or deleting at a known place changes only one or two arrows, so it is $O(1)$, while an array must shift items.
- That is why binary search does not help on a linked list: just walking to the middles adds up to about $n$ moves.
- Pointer tricks are proved by simple counting: the reverse loop keeps "visited part backwards, rest forwards"; fast/slow pointers meet because the gap shrinks by 1 each round.
- Next topic builds on this: Trees & BST, where each node has two arrows (left and right) instead of one.

### Quick self-check
1. How many steps to reach the 6th node from the head (head is the 1st)?
**Answer:** 5 arrows.
2. Deleting the first node of a linked list costs what?
**Answer:** $O(1)$: set `head = head.next`.
3. In 1 → 2 → 3 → 4 → 5 → 6 → 7, where is `slow` when `fast` reaches 7?
**Answer:** at 4 (fast goes 1, 3, 5, 7 while slow goes 1, 2, 3, 4).

## Trees & BST

### The big idea
A **tree** stores items in a hierarchy, like a family tree. A **binary tree** lets each item have at most two children. A **binary search tree (BST)** keeps smaller values on the left and larger values on the right, so searching is fast.

### Before you start
**Nodes and arrows (see topic: Linked Lists).** A linked-list node has one arrow, `next`. A tree node is the same idea with two arrows, `left` and `right`. An arrow that is `None` means "no child there".

**Recursion (see topic: Python Programming).** A recursive function solves a problem by calling itself on smaller pieces. Trees are natural for this, because each child is the root of a smaller tree. Example: size of a tree = 1 + size of left part + size of right part.

**Powers of 2.** $2^k$ means 2 multiplied by itself $k$ times: $2^0 = 1$, $2^1 = 2$, $2^2 = 4$, $2^3 = 8$. Each power is double the one before.

**Logarithm, $\log_2$.** $\log_2 n$ answers "2 to what power gives $n$?". So $\log_2 8 = 3$ because $2^3 = 8$, and $\log_2 1024 = 10$. Roughly, it is how many times you can halve $n$ before you reach 1. It grows very slowly: $\log_2 1{,}000{,}000 \approx 20$.

**Inequality signs.** $a \le b$ means "$a$ is at most $b$". A double inequality $3 \le N \le 7$ means $N$ is somewhere from 3 to 7.

**$O(h)$.** Time that grows in proportion to $h$, here the height of the tree (see topic: Algorithm Complexity / Recurrences).

### Intuition
Think of your **school's organisation**. The principal is at the top. Under her are two vice-principals. Under each are teachers. Each person (except the principal) has exactly one boss. That is a **rooted tree**. The principal is the **root**. Teachers with nobody under them are **leaves**.

Now think of a **number-guessing game**. I pick a number from 1 to 100. You guess 50. I say "smaller". You never look at 51–100 again. A BST stores numbers so that every question cuts away one side, just like this game.

> **Intuition:** In a BST, at each node ask "is my key smaller or bigger than this?". Smaller: go left. Bigger: go right. You walk one path from top to bottom, never the whole tree.

**Three ways to walk a tree** (traversals). They differ only in **when** you write the root:
- **Preorder**: Root, then Left subtree, then Right subtree. ("Root first.")
- **Inorder**: Left, Root, Right. ("Root in the middle.")
- **Postorder**: Left, Right, Root. ("Root last.")

### Words you need
- **root**: the top node, with no parent.
- **parent / child**: a node directly above / below another.
- **leaf**: a node with no children.
- **internal node**: a node with at least one child.
- **subtree**: a node together with everything below it.
- **height**: number of edges on the longest path from the root down to a leaf. A single node has height 0.
- **full binary tree**: every node has 0 or 2 children (never exactly 1).
- **perfect binary tree**: full, and all leaves at the same depth.
- **skewed tree**: every node has only one child; it looks like a line.
- **inorder successor**: the next bigger key; the smallest key in the right subtree.

### Formulas, explained
**Nodes for a given height**
$$H + 1 \le N \le 2^{H+1} - 1$$
- **Read it as:** "a tree of height H has at least H+1 and at most 2 to the power H+1, minus 1, nodes."
- **Symbols:** $H$ is the height; $N$ is the total number of nodes.
- **Why it makes sense:** the fewest nodes is a straight line: H edges need H+1 nodes. The most is a perfect tree: $1 + 2 + 4 + \dots + 2^H = 2^{H+1} - 1$.
- **Use it when:** checking "always true" inequalities. Test both extremes: a line and a perfect tree.

**Internal nodes for a given height**
$$H \le I \le 2^H - 1$$
- **Read it as:** "the number of internal nodes is between H and 2 to the H, minus 1."
- **Symbols:** $I$ is the number of internal (non-leaf) nodes.
- **Why it makes sense:** on the longest path, all nodes except the last are internal: that is H nodes. At most, every level except the bottom is full: $2^H - 1$ nodes.
- **Use it when:** 2024 Q.52 style questions.

**Leaves and two-child nodes**
$$L = n_2 + 1$$
- **Read it as:** "leaves equal the number of two-child nodes, plus one."
- **Symbols:** $L$ is the number of leaves; $n_2$ is the number of nodes with exactly 2 children.
- **Why it makes sense:** start with one node (1 leaf). Giving a leaf one child keeps the leaf count the same. Giving a node a second child adds one leaf. So each two-child node adds exactly one leaf. Since $n_2 \le I$, we also get $L \le I + 1$. In a full tree, $L = I + 1$.
- **Use it when:** counting leaves or testing $L$ vs $I$.

**BST search cost**
$$\text{search} = O(h)$$
- **Read it as:** "search time grows with the tree's height."
- **Symbols:** $h$ is the height. Balanced tree: $h \approx \log_2 n$. Skewed tree: $h = n - 1$.
- **Why it makes sense:** you walk one root-to-leaf path at most.
- **Use it when:** asked about best/worst search, insert or delete cost.

**Rebuilding rule** (a fact, not a formula): Inorder + Preorder, or Inorder + Postorder, fixes any binary tree uniquely. Preorder + Postorder fixes it only if the tree is **full**. Inorder alone is never enough.

### Where the formulas come from
**1. Most and fewest nodes for height $H$.**

Start with the most nodes. Take height $H = 2$ and fill every level.

1. Level 0 (the root) has 1 node.
2. Level 1 has at most 2 nodes, because the root has at most 2 children.
3. Level 2 has at most 4 nodes, because each of the 2 nodes above has at most 2 children.
4. In general, level $d$ has at most $2^d$ nodes, because each level can at most double the one above.
5. Total for $H = 2$: $1 + 2 + 4 = 7 = 2^3 - 1$.
6. Why $1 + 2 + \dots + 2^H = 2^{H+1} - 1$: call the sum $S$. Then $2S = 2 + 4 + \dots + 2^{H+1}$. Subtract: $2S - S = 2^{H+1} - 1$, because every middle term cancels. So $S = 2^{H+1} - 1$. (Check: for $H = 0, 1, 2, 3$ this gives 1, 3, 7, 15.)

Now the fewest nodes.

1. Height $H$ means some path from the root goes down $H$ edges.
2. A path of $H$ edges passes through $H + 1$ nodes, like 3 fence gaps needing 4 posts.
3. A straight line (skewed tree) has only that path, so it uses exactly $H + 1$ nodes. No tree of height $H$ can have fewer.

Together:

$$H + 1 \le N \le 2^{H+1} - 1$$

**2. Internal nodes, $H \le I \le 2^H - 1$.**

1. The longest path has $H + 1$ nodes. All except the last one have a child on the path, so they are internal. That gives at least $H$ internal nodes.
2. Bottom-level nodes (level $H$) cannot have children, because there is no level below. So internal nodes live only on levels $0$ to $H - 1$.
3. Those levels hold at most $1 + 2 + \dots + 2^{H-1} = 2^H - 1$ nodes, by the same sum as above with $H - 1$ in place of $H$.

**3. Leaves, $L = n_2 + 1$, by counting edges two ways.**

Let $n_0 = L$ (no children), $n_1$ (one child) and $n_2$ (two children).

1. Count nodes: $N = n_0 + n_1 + n_2$, because every node has 0, 1 or 2 children.
2. Count edges from the top: every node except the root has exactly one edge going up to its parent. So edges $= N - 1$.
3. Count edges from the bottom: a one-child node sends out 1 edge and a two-child node sends out 2. So edges $= n_1 + 2n_2$.
4. Both counts describe the same edges, so $N - 1 = n_1 + 2n_2$.
5. Put in step 1: $n_0 + n_1 + n_2 - 1 = n_1 + 2n_2$. Cancel $n_1$ from both sides and move terms: $n_0 = n_2 + 1$.

Check on Example 1's tree: leaves 20, 40, 60, 80 give $L = 4$; two-child nodes 50, 30, 70 give $n_2 = 3$; and $4 = 3 + 1$. A program that built 1000 random BSTs found $L = n_2 + 1$ in every one.

**4. Why BST search is $O(h)$, and what $h$ is.**

1. At each node you compare once and go left or right. You never come back up.
2. Each move goes one level down, so you make at most $h + 1$ comparisons, where $h$ is the height.
3. If the tree is balanced, it has about $2^{h+1}$ nodes, so $n \approx 2^{h+1}$ and $h \approx \log_2 n$. For $n = 1024$ that is about 10 levels.
4. If you insert 1, 2, 3, 4, 5 in sorted order, each key goes to the right of the last, so the tree is a line and $h = n - 1$. Search becomes $O(n)$.

**5. Why inorder of a BST is sorted.**

1. Inorder prints the left subtree, then the root, then the right subtree.
2. In a BST, everything in the left subtree is smaller than the root, and everything in the right is bigger.
3. So the root is printed after all smaller keys and before all bigger keys, which is its correct sorted place.
4. The same argument works inside each subtree, because each subtree is itself a BST. So the whole output is sorted.

**6. Why inorder is needed to rebuild a tree.**

1. Preorder tells you the **root** (first item). Postorder also tells you the root (last item).
2. Only inorder tells you which keys are **left** of the root and which are **right**, because the root sits between them.
3. Preorder + postorder fail when a node has one child. Example: root A with one child B. Both "B on the left" and "B on the right" give preorder A B and postorder B A. In a full tree no node has one child, so this confusion never arises.

### Examples
**Example 1 (easy): traversals.** Insert 50, 30, 70, 20, 40, 60, 80 into an empty BST, one at a time.

| insert | path taken | placed as |
|---|---|---|
| 50 | empty tree | root |
| 30 | 30 < 50, go left | left of 50 |
| 70 | 70 > 50, go right | right of 50 |
| 20 | < 50 left, < 30 left | left of 30 |
| 40 | < 50 left, > 30 right | right of 30 |
| 60 | > 50 right, < 70 left | left of 70 |
| 80 | > 50 right, > 70 right | right of 70 |

```text
          50
        /    \
      30      70
     /  \    /  \
   20   40  60   80
```

- Preorder: 50 30 20 40 70 60 80
- Inorder: 20 30 40 50 60 70 80 (sorted, always, for a BST)
- Postorder: 20 40 30 60 80 70 50

**Result:** preorder 50 30 20 40 70 60 80, inorder 20 30 40 50 60 70 80, postorder 20 40 30 60 80 70 50.

**Example 2 (medium): delete from a BST.** Delete 50 from the tree above. It has two children. Replace it with its **inorder successor**: the smallest key in its right subtree. Go right to 70, then left as far as possible: 60. Put 60 at the root and remove the old leaf 60.

```text
          60
        /    \
      30      70
     /  \       \
   20   40       80
```

Inorder is still sorted: 20 30 40 60 70 80.

**Result:** 60 becomes the root; inorder is 20 30 40 60 70 80.

**Example 3 (GATE level): rebuild from traversals.** Preorder: `A B D E C F`. Inorder: `D B E A F C`. Find the postorder.

1. Preorder's first item is the root: **A**.
2. Find A in inorder: `D B E | A | F C`. Left subtree = {D, B, E}; right subtree = {F, C}.
3. Left part: in preorder the left items come next: `B D E`. Root is **B**. In inorder `D B E`: D is left of B, E is right of B.
4. Right part: preorder `C F`. Root is **C**. Inorder `F C`: F is left of C.

```text
        A
      /   \
     B     C
    / \   /
   D   E F
```

Postorder (Left, Right, Root): D E B F C A.

```python
def build(pre, ino):
    if not pre:
        return None
    r = pre[0]; k = ino.index(r)
    return (r, build(pre[1:k+1], ino[:k]), build(pre[k+1:], ino[k+1:]))
def post(t):
    return [] if t is None else post(t[1]) + post(t[2]) + [t[0]]
print(" ".join(post(build(list("ABDECF"), list("DBEAFC")))))   # prints: D E B F C A
```

Also note: node C has one child, so this tree is **not** full.

**Result:** postorder D E B F C A.

### Common mistakes
> **Common mistake:** Mixing up height conventions. GATE usually counts **edges** (single node = height 0). Check with a one-node tree before using any formula.

> **Common mistake:** Testing a claim only on a nice, balanced tree. "Always true" must hold for a skewed line too. Try both extremes.

> **Common mistake:** Thinking preorder + postorder never works. It works when the tree is **full** (2024 Q.28).

> **Common mistake:** In BST deletion, using the largest key of the right subtree. The successor is the **smallest** key in the right subtree.

### How GATE asks it
- **2024 Q.28**: which traversal pairs rebuild a **full** binary tree? All three pairs; inorder alone does not.
- **2024 Q.52**: always-true inequalities linking $H$, $I$, $L$, $N$; test a line and a perfect tree.
- **2026 Q.25**: build the tree from preorder `P Q S E R F G` and inorder `S Q E P F R G`, then check the root, the postorder and children.

### Summary
- First we gave each node two arrows (left and right), which turns a chain into a tree with a root, internal nodes and leaves.
- Because each level can at most double, a tree of height $H$ has between $H+1$ and $2^{H+1}-1$ nodes.
- Counting edges two ways shows $L = n_2 + 1$: only two-child nodes create extra leaves.
- A BST puts smaller keys left and bigger keys right, so search walks one path and costs $O(h)$: about $\log_2 n$ if balanced, $n$ if skewed.
- That same rule makes inorder print keys in sorted order, and inorder plus one other traversal rebuilds any tree.
- Next topic builds on this: Hash Tables, another way to find keys fast; trees return in Graph Theory Basics (a tree is a connected graph with no cycle) and as decision trees in ML.

### Quick self-check
1. Inorder of any BST gives what?
**Answer:** the keys in increasing (sorted) order.
2. Maximum nodes in a binary tree of height 3?
**Answer:** $2^{3+1} - 1 = 16 - 1 = 15$.
3. A binary tree has 6 nodes with two children. How many leaves?
**Answer:** $L = n_2 + 1 = 6 + 1 = 7$.

## Hash Tables

### The big idea
A **hash table** stores items in an array of slots. A **hash function** turns each key into a slot number, so you jump straight to the right slot instead of searching. Python's `dict` and `set` are hash tables.

### Before you start
**Arrays (see topic: Linked Lists).** An array is a row of numbered slots, and slot $k$ can be reached in one step. A hash table is an array plus a rule for choosing the slot.

**Remainder, `mod`.** $k \bmod m$ is the remainder when $k$ is divided by $m$. It is always between $0$ and $m - 1$, so it is always a valid slot number. Example: $1234 \bmod 10 = 4$ and $17 \bmod 7 = 3$.

**Function.** A function is a rule that turns an input into exactly one output. $h(k) = k \bmod 10$ turns the key 1234 into 4, every time.

**Probability (chance).** A probability is a number from 0 to 1 that says how likely something is. If 7 of 10 rooms are full and you pick a room at random, the chance it is full is $7/10 = 0.7$. Chances of separate steps multiply: two full rooms in a row has chance about $0.7 \times 0.7 = 0.49$.

**Average, or expected value, $E[\cdot]$.** $E[X]$ is the long-run average of a quantity $X$ that changes from try to try. Example: a die gives 1 to 6 equally often, so $E[\text{roll}] = \frac{1+2+3+4+5+6}{6} = 3.5$.

**Endless sum $1 + \alpha + \alpha^2 + \dots$** For $0 \le \alpha < 1$, this sum equals $\frac{1}{1-\alpha}$. Example: $1 + \frac12 + \frac14 + \frac18 + \dots = 2$, and $\frac{1}{1 - 1/2} = 2$. (Reason: call the sum $S$. Then $\alpha S = \alpha + \alpha^2 + \dots$ is $S$ without the first 1, so $S - \alpha S = 1$ and $S = \frac{1}{1-\alpha}$.)

**$\ln$.** $\ln x$ is the natural logarithm, a log with base $e \approx 2.718$. You only need to plug numbers in: $\ln 2 \approx 0.69$, $\ln 4 \approx 1.39$.

### Intuition
Think of a **college hostel with 10 rooms**, numbered 0 to 9. The warden has a rule: "your room number is the **last digit of your roll number**." Roll number 1234 goes to room 4. To find a student, the warden does not knock on every door. She computes the last digit and goes straight there. That rule is the **hash function**.

But roll numbers 1234 and 5674 both end in 4. Two students want room 4. This is a **collision**. There are two common fixes:
- **Chaining**: room 4 keeps a list of students. Both live there, in a line.
- **Open addressing**: only one student per room. If room 4 is taken, try room 5, then 6, and so on, until you find an empty room. Trying "the next room" is **linear probing**.

> **Intuition:** A hash table is fast because the key itself tells you where to look. It slows down only when many keys fight for the same slots.

### Words you need
- **key**: the thing you search by, like a roll number.
- **slot**: one position in the table, like a room. There are $m$ slots.
- **hash function** $h(k)$: the rule giving the home slot. Example: $h(k) = k \bmod 10$.
- **collision**: two keys with the same home slot.
- **probe**: one look at one slot.
- **load factor** $\alpha$: how full the table is. 7 keys in 10 slots gives $\alpha = 0.7$.
- **primary clustering**: in linear probing, filled slots form long runs that keep growing.
- **tombstone**: a "deleted" marker left in open addressing, so later searches do not stop early.

### Formulas, explained
**Load factor**
$$\alpha = \frac{n}{m}$$
- **Read it as:** "alpha equals keys divided by slots."
- **Symbols:** $n$ is the number of keys stored; $m$ is the number of slots.
- **Why it makes sense:** it is simply "what fraction of rooms are full".
- **Use it when:** any expected-cost formula.

**Linear probing sequence**
$$h(k, i) = (h(k) + i) \bmod m, \quad i = 0, 1, 2, \dots$$
- **Read it as:** "try the home slot, then the next, then the next, wrapping round at the end."
- **Symbols:** $i$ is the attempt number (0 for the first try).
- **Why it makes sense:** "room taken? try the next room."
- **Use it when:** tracing insertions (2025 Q.18). Quadratic probing uses $(h(k) + c_1 i + c_2 i^2) \bmod m$. Double hashing uses $(h_1(k) + i \cdot h_2(k)) \bmod m$.

**Expected probes, open addressing (unsuccessful search and insert)**
$$E[\text{probes}] \le \frac{1}{1-\alpha}$$
- **Read it as:** "on average, at most one over one minus alpha probes."
- **Symbols:** $E[\cdot]$ means average (expected value). Valid for $\alpha < 1$ under uniform hashing.
- **Why it makes sense:** each probe hits a full slot with chance about $\alpha$. When the table is half full ($\alpha = 0.5$), you expect at most $1/0.5 = 2$ probes. When 90% full, $1/0.1 = 10$ probes. An insert probes until it finds an empty slot, exactly like a failed search. So the same bound holds.
- **Use it when:** 2024 Q.21. A successful search is cheaper: at most $\frac{1}{\alpha}\ln\frac{1}{1-\alpha}$.

**Chaining average cost**
$$\Theta(1 + \alpha)$$
- **Read it as:** "one step to compute the slot, plus about alpha steps to walk the chain."
- **Symbols:** $\Theta$ means "grows exactly like".
- **Why it makes sense:** on average each chain has $\alpha$ keys.
- **Use it when:** a question uses chaining instead of probing.

### Where the formulas come from
**1. Load factor.** This is a definition, not a result. With 7 keys and 10 slots, the fraction of full slots is $7/10$. In symbols, $\alpha = n/m$. Every cost formula below uses it, because "how full" is what decides how often you hit a taken slot.

**2. The linear probing sequence, built from "try the next room".**

Take $m = 7$ and a key whose home slot is $h(k) = 5$.

1. Try 0 ($i = 0$): slot $5$.
2. Try 1 ($i = 1$): slot $6$, because we add 1.
3. Try 2 ($i = 2$): $5 + 2 = 7$, but slot 7 does not exist. We wrap: $7 \bmod 7 = 0$.
4. So try $i$ looks at $(5 + i) \bmod 7$: slots 5, 6, 0, 1, 2, 3, 4. In symbols, $h(k, i) = (h(k) + i) \bmod m$.

This is the same wrap-around trick as the circular queue (see topic: Stacks & Queues). Quadratic probing and double hashing change only the "$+ i$" part, to jump further and avoid long runs.

**3. The $\frac{1}{1-\alpha}$ bound, built step by step.**

Assume "uniform hashing": each probe lands on a slot that looks random, and different probes look at different slots. Take $\alpha = 0.5$ first.

1. The first probe is always made. Count 1.
2. A second probe is needed only if the first slot was full. Chance $\approx 0.5$, because half the slots are full.
3. A third probe is needed only if the first two were both full. Chance $\le 0.5 \times 0.5 = 0.25$, because chances of separate steps multiply. (It is a little less, since one full slot has already been used up.)
4. In general, the $i$-th probe happens with chance at most $\alpha^{i-1}$.
5. The average number of probes is the sum of "chance that probe $i$ happens" over all $i$, because each probe that happens adds exactly 1. So

$$E[\text{probes}] \le 1 + \alpha + \alpha^2 + \dots = \frac{1}{1-\alpha}$$

using the endless-sum fact from "Before you start".
6. For $\alpha = 0.5$ this gives 2. For $\alpha = 0.9$ it gives 10.

An insert is the same as an unsuccessful search, because both keep probing until they reach an empty slot. So the same bound holds.

**Check by simulation.** A program filled $\alpha m$ random slots of a 1000-slot table and probed in random order until it hit an empty slot, 2000 times each. The averages were 1.97 for $\alpha = 0.5$, 3.97 for $\alpha = 0.75$, and 10.1 for $\alpha = 0.9$, matching $\frac{1}{1-\alpha}$ = 2, 4 and 10.

**4. Why a successful search is cheaper.**

1. Finding a key that **is** stored costs exactly what it cost to insert that key, because the search follows the same probe path and stops at the same slot.
2. Early keys were inserted into an almost empty table, so they cost about 1 probe. Only the last keys paid close to $\frac{1}{1-\alpha}$.
3. Averaging the insert costs over all keys gives $\frac{1}{\alpha}\ln\frac{1}{1-\alpha}$. That averaging step needs calculus (an integral), so the full proof is not needed for GATE. Just remember: successful search is cheaper. At $\alpha = 0.5$ it is $2 \ln 2 \approx 1.39$, less than 2.

**5. Chaining, $\Theta(1 + \alpha)$.**

1. Computing $h(k)$ and jumping to the slot costs 1 step.
2. The $n$ keys are spread over $m$ chains, so the average chain length is $n/m = \alpha$.
3. Walking a chain costs about its length. So the total is about $1 + \alpha$.
4. The 1 matters: even with $\alpha = 0$ (empty table) you still spend one step on the hash.

**Why Python's `dict` is so fast.** It is an open-addressing hash table. Python grows the table (and re-inserts every key) before it gets about two-thirds full, so $\alpha$ stays small and lookups stay close to $O(1)$ on average.

### Examples
**Example 1 (easy).** $m = 10$, $h(k) = k \bmod 10$, chaining. Insert 12, 25, 32, 47, 52.
- 12 → slot 2. 25 → slot 5. 32 → slot 2 (chain: 12, 32). 47 → slot 7. 52 → slot 2 (chain: 12, 32, 52).
Slot 2 has 3 keys; searching for 52 looks at 3 keys.

**Result:** slot 2 holds 12, 32, 52; the other keys sit alone in slots 5 and 7.

**Example 2 (medium): linear probing.** $m = 7$, $h(k) = k \bmod 7$. Insert 10, 17, 3, 24, 6.

| key | $k \bmod 7$ | slots tried | stored at |
|---|---|---|---|
| 10 | 3 | 3 free | 3 |
| 17 | 3 | 3 taken, 4 free | 4 |
| 3 | 3 | 3, 4 taken, 5 free | 5 |
| 24 | 3 | 3, 4, 5 taken, 6 free | 6 |
| 6 | 6 | 6 taken, (6+1) mod 7 = 0 free | 0 |

Table after all inserts: slot 0 = 6, slot 3 = 10, slot 4 = 17, slot 5 = 3, slot 6 = 24. The key 6 **wrapped around** to slot 0.

**Result:** slots 0, 3, 4, 5, 6 hold 6, 10, 17, 3, 24.

**Example 3 (GATE level).** $m = 10$, $h(x) = 7x \bmod 10$, linear probing. Insert 3, 13, 9, 23, 5. Where do 23 and 5 go?

| key | $7x$ | $h(x)$ | slots tried | stored at |
|---|---|---|---|---|
| 3 | 21 | 1 | 1 free | 1 |
| 13 | 91 | 1 | 1 taken, 2 free | 2 |
| 9 | 63 | 3 | 3 free | 3 |
| 23 | 161 | 1 | 1, 2, 3 taken, 4 free | 4 |
| 5 | 35 | 5 | 5 free | 5 |

Answer: 23 at slot **4**, 5 at slot **5**.

```python
m, T = 10, [None] * 10
for x in [3, 13, 9, 23, 5]:
    s = (7 * x) % m
    while T[s] is not None:
        s = (s + 1) % m
    T[s] = x
print(T)     # prints: [None, 3, 13, 9, 23, 5, None, None, None, None]
```

**Result:** 23 goes to slot 4 and 5 goes to slot 5.

### Common mistakes
> **Common mistake:** Using the key instead of $h(\text{key})$. In 2025 Q.18, key 14 hashes to $42 \bmod 10 = 2$, not 4.

> **Common mistake:** Forgetting to wrap round. After slot $m-1$ comes slot 0.

> **Common mistake:** Mixing the two formulas. Insert = unsuccessful search = $\frac{1}{1-\alpha}$. The $\ln$ formula is for a successful search.

### How GATE asks it
- **2024 Q.21**: expected probes to insert in open addressing is at most $\frac{1}{1-\alpha}$, same as an unsuccessful search.
- **2025 Q.18**: $h(x) = 3x \bmod 10$ with linear probing; insert 1, 4, 5, 6, 14, 15; keys 14 and 15 land at 4 and 6.

### Summary
- First we used an array with a hash function that turns a key straight into a slot number, so there is no searching.
- Then we hit collisions, and fixed them with chaining (a list per slot) or open addressing (try the next slot).
- How often we hit a full slot depends only on the load factor $\alpha = n/m$.
- Each extra probe happens with chance at most $\alpha$ times the last, so the probes add up to at most $1 + \alpha + \alpha^2 + \dots = \frac{1}{1-\alpha}$ for an insert or failed search.
- A successful search is cheaper, and chaining costs about $1 + \alpha$, which is why keeping tables not too full keeps them $O(1)$.
- Next topic builds on this: Searching (Linear/Binary), the methods you need when you do not have a hash table; in ML, hashing is used for feature hashing and fast lookups of words and IDs.

### Quick self-check
1. 6 keys in a table of 8 slots. What is $\alpha$?
**Answer:** $6/8 = 0.75$.
2. With $\alpha = 0.75$, at most how many probes for an insert (open addressing)?
**Answer:** $\frac{1}{1-0.75} = \frac{1}{0.25} = 4$.
3. $m = 5$, $h(k) = k \bmod 5$, linear probing. Insert 4, 9. Where does 9 go?
**Answer:** 9 mod 5 = 4 is taken, so try (4+1) mod 5 = 0. Slot **0**.

## Searching (Linear/Binary)

### The big idea
**Linear search** checks items one by one from the start. **Binary search** works only on **sorted** data: look at the middle, throw away the half that cannot hold the answer, and repeat.

### Before you start
**Arrays and indices (see topic: Linked Lists).** An array stores items in positions 0, 1, 2, …, and `A[5]` is reached in one step. Binary search depends on this jump.

**Floor division `//` (see topic: Python Programming).** `a // b` divides and rounds down. `(0 + 9) // 2` is 4, because $4.5$ rounds down to 4.

**Floor symbol $\lfloor x \rfloor$.** The largest whole number not bigger than $x$. $\lfloor 6.64 \rfloor = 6$, $\lfloor 3 \rfloor = 3$.

**Powers of 2 and $\log_2$ (see topic: Trees & BST).** $2^{10} = 1024$, so $\log_2 1024 = 10$. For a number between powers, like 100, $2^6 = 64 \le 100 < 128 = 2^7$, so $\log_2 100$ is between 6 and 7 and $\lfloor \log_2 100 \rfloor = 6$.

**Recurrence.** A recurrence is a formula that defines a value using the same formula on a smaller input. Example: $F(n) = F(n/2) + 1$ with $F(1) = 1$ gives $F(2) = 2$, $F(4) = 3$, $F(8) = 4$.

**Sum symbol $\sum$.** $\sum_{i=1}^{n} i$ means "add $i$ for every $i$ from 1 to $n$", that is $1 + 2 + \dots + n$. For $n = 4$: $1 + 2 + 3 + 4 = 10$.

### Intuition
You lost your pen in a classroom. You check every desk, from the first to the last. That is **linear search**. It always works, but with 60 desks you may check all 60.

Now you look up the word "monsoon" in a printed dictionary. You open it near the middle and see "kite". "m" comes after "k", so the word is in the right half. You never look at the left half again. You open the middle of the right half, and so on. Each look **halves** the pages left. That is **binary search**.

> **Intuition:** Halving is powerful. 1000 pages → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1. About 10 looks instead of 1000.

Binary search needs two things:
1. The data is **sorted** (otherwise "go right" might throw away the answer).
2. You can **jump to the middle** in one step (an array can; a linked list cannot).

### Words you need
- **sorted array**: items in increasing order, stored in numbered positions.
- **lo, hi**: the left and right ends of the part still being searched.
- **mid**: the middle position, `mid = (lo + hi) // 2`.
- **comparison**: one check of the target against `A[mid]` (equal, less or greater).
- **successful / unsuccessful search**: the target is found / is not in the array.
- **worst case**: the largest number of steps over all possible inputs of size $n$.

### Formulas, explained
**Worst-case comparisons, as a recurrence**
$$F(n) = F(\lfloor n/2 \rfloor) + 1, \quad F(0) = 0$$
- **Read it as:** "the worst case for n items is one comparison plus the worst case for half of them."
- **Symbols:** $F(n)$ is the maximum number of comparisons for $n$ items; $\lfloor x \rfloor$ is the floor (round down).
- **Why it makes sense:** one comparison with the middle, then the larger remaining half has $\lfloor n/2 \rfloor$ items.
- **Use it when:** 2024 Q.40 asks which recurrence is right.

**Worst-case comparisons, closed form**
$$F(n) = \lfloor \log_2 n \rfloor + 1$$
- **Read it as:** "the floor of log base 2 of n, plus one."
- **Symbols:** $\log_2 n$ answers "2 to what power gives n?". $\log_2 8 = 3$.
- **Why it makes sense:** it counts how many times you can halve $n$ before reaching 1, plus the last comparison on that single item.
- **Use it when:** a NAT asks for maximum comparisons, found or not found (2026 Q.31: $n=1000$ gives 10).

**Linear search cost**
$$\text{worst} = n, \qquad \text{average (found)} = \frac{n+1}{2}$$
- **Read it as:** "worst case n checks; on average about half."
- **Symbols:** $n$ is the number of items.
- **Why it makes sense:** if the item is equally likely to be anywhere, the average position is $(1 + 2 + \dots + n)/n = (n+1)/2$.
- **Use it when:** comparing with binary search.

### Where the formulas come from
**1. Why binary search is correct: the "still inside" rule.**

At the start of every loop round this is true: **if $x$ is in the array at all, it is somewhere in `A[lo..hi]`.**

1. At the start, `lo = 0` and `hi = n - 1`, the whole array. So the rule is true.
2. Suppose `A[mid] < x`. Because the array is sorted, every item at or left of `mid` is at most `A[mid]`, so it is smaller than $x$. Setting `lo = mid + 1` throws away only items that cannot be $x$. The rule stays true.
3. Suppose `A[mid] > x`. By the same reason, everything at or right of `mid` is too big. Setting `hi = mid - 1` keeps the rule true.
4. If the loop ends with `lo > hi`, the range is empty. By the rule, $x$ is nowhere in the array, so returning $-1$ is correct.
5. The loop always ends, because each round makes `hi - lo` smaller by at least 1.

This argument uses "sorted" in steps 2 and 3. That is exactly why binary search fails on unsorted data.

**2. The recurrence $F(n) = F(\lfloor n/2 \rfloor) + 1$.**

Take $n = 10$, positions 0 to 9.

1. `mid = (0 + 9) // 2 = 4`. One comparison is spent on `A[4]`.
2. If we go left, positions 0 to 3 remain: 4 items. If we go right, positions 5 to 9 remain: 5 items.
3. The worst case takes the larger side: $5 = \lfloor 10/2 \rfloor$.
4. In general, after removing `mid`, $n - 1$ items are left and split into two parts. The larger part has $\lceil (n-1)/2 \rceil$ items, and this always equals $\lfloor n/2 \rfloor$. (Check: $n = 10$ gives $\lceil 4.5 \rceil = 5 = \lfloor 5 \rfloor$; $n = 7$ gives $\lceil 3 \rceil = 3 = \lfloor 3.5 \rfloor$.)
5. So worst-case comparisons $= 1 + $ worst case for $\lfloor n/2 \rfloor$ items. With 0 items, no comparison is made: $F(0) = 0$.

**3. The closed form $F(n) = \lfloor \log_2 n \rfloor + 1$, by unrolling.**

1. Take $n = 8$. Follow the largest part: $8 \to 4 \to 2 \to 1 \to 0$. Each arrow is one comparison, so $F(8) = 4$.
2. Take $n = 500$: $500 \to 250 \to 125 \to 62 \to 31 \to 15 \to 7 \to 3 \to 1 \to 0$. Nine arrows, so $F(500) = 9$.
3. Count the arrows in general. Halving (rounding down) reaches 1 after exactly $k$ steps, where $2^k \le n < 2^{k+1}$. That $k$ is $\lfloor \log_2 n \rfloor$, by the meaning of $\log_2$.
4. Then one more comparison is spent on the last single item ($1 \to 0$). So $F(n) = \lfloor \log_2 n \rfloor + 1$.
5. A program that tried every present and absent target confirms it: $n = 8$ gives 4, $n = 100$ gives 7, $n = 1000$ gives 10, and $n = 1024$ gives 11.

**4. Linear search average, $\frac{n+1}{2}$.**

1. If the target is at position 1, we make 1 check; at position 2, 2 checks; at position $n$, $n$ checks.
2. If every position is equally likely, the average is $\frac{1 + 2 + \dots + n}{n}$.
3. Find $1 + 2 + \dots + n$ by pairing: write the sum forwards and backwards and add them. Each column gives $n + 1$, and there are $n$ columns. So twice the sum is $n(n+1)$, and

$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

4. Divide by $n$: the average is $\frac{n+1}{2}$. For $n = 10$: $\frac{55}{10} = 5.5$.

### Examples
**Example 1 (easy).** How many comparisons, at most, for binary search on 100 sorted items?
$2^6 = 64 \le 100 < 128 = 2^7$, so $\lfloor \log_2 100 \rfloor = 6$. Answer: $6 + 1 = 7$.

**Result:** at most 7 comparisons.

**Example 2 (medium): trace binary search.** Find 23 in `A = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]` (indices 0 to 9).

```python
def bsearch(A, x):
    lo, hi, steps = 0, len(A) - 1, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        steps += 1
        if A[mid] == x:
            return mid, steps
        elif A[mid] < x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1, steps
A = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(bsearch(A, 23), bsearch(A, 40))   # prints: (5, 3) (-1, 4)
```

| step | lo | hi | mid | A[mid] | decision |
|---|---|---|---|---|---|
| 1 | 0 | 9 | (0+9)//2 = 4 | 16 | 16 < 23, so lo = 5 |
| 2 | 5 | 9 | (5+9)//2 = 7 | 56 | 56 > 23, so hi = 6 |
| 3 | 5 | 6 | (5+6)//2 = 5 | 23 | found at index 5 |

Now search for 40 (not present):

| step | lo | hi | mid | A[mid] | decision |
|---|---|---|---|---|---|
| 1 | 0 | 9 | 4 | 16 | 16 < 40, lo = 5 |
| 2 | 5 | 9 | 7 | 56 | 56 > 40, hi = 6 |
| 3 | 5 | 6 | 5 | 23 | 23 < 40, lo = 6 |
| 4 | 6 | 6 | 6 | 38 | 38 < 40, lo = 7 |
| stop | 7 | 6 | - | - | lo > hi, return -1 |

The search for 40 needs **4** comparisons, not 3. At step 4, lo and hi are both 6. The loop runs while `lo <= hi`, and 6 ≤ 6 is true, so one item is still left to check.

**Result:** 23 is found at index 5 after 3 comparisons; 40 is reported missing after 4 comparisons.

**Example 3 (GATE level).** A sorted array has 500 distinct numbers. What is the maximum number of 3-way comparisons for an unsuccessful binary search?
Track the largest remaining part: $500 \to 250 \to 125 \to 62 \to 31 \to 15 \to 7 \to 3 \to 1 \to 0$. Count the arrows: **9**.
Check with the formula: $2^8 = 256 \le 500 < 512$, so $\lfloor \log_2 500 \rfloor = 8$, and $8 + 1 = 9$.

**Result:** 9 comparisons.

### Common mistakes
> **Common mistake:** Using $\lceil \log_2 n \rceil$ instead of $\lfloor \log_2 n \rfloor + 1$. They differ when $n$ is a power of 2. For $n = 8$: $\lceil \log_2 8 \rceil = 3$ but the real worst case is $\lfloor 3 \rfloor + 1 = 4$.

> **Common mistake:** Stopping the trace too early. The loop runs while `lo <= hi`. When lo equals hi, there is still one item to check.

> **Common mistake:** Thinking binary search is $O(\log n)$ on a sorted linked list. Reaching the middle costs $O(n)$.

### How GATE asks it
- **2024 Q.40**: pick the worst-case recurrence: $F(n) = F(\lfloor n/2 \rfloor) + 1$.
- **2025 Q.27**: which inputs give $O(\log n)$? Only a sorted **array**.
- **2026 Q.31**: max comparisons for an unsuccessful search on 1000 items: 10.

### Summary
- First we searched by checking every item: linear search, $n$ checks in the worst case and $\frac{n+1}{2}$ on average.
- Then we used sorted order: one look at the middle tells us which half can still hold the target.
- The rule "if $x$ is anywhere, it is in `A[lo..hi]`" stays true every round, so binary search is correct.
- Each comparison keeps at most $\lfloor n/2 \rfloor$ items, giving $F(n) = F(\lfloor n/2 \rfloor) + 1$.
- Halving reaches 1 after $\lfloor \log_2 n \rfloor$ steps, plus one last check, so $F(n) = \lfloor \log_2 n \rfloor + 1$: only 10 for 1000 items.
- Next topic builds on this: Basic Sorting, because binary search needs sorted data; the same halving idea returns in Divide & Conquer and in Algorithm Complexity.

### Quick self-check
1. Max comparisons for binary search on 64 items?
**Answer:** $\lfloor \log_2 64 \rfloor + 1 = 6 + 1 = 7$.
2. Why can't binary search run on an unsorted array?
**Answer:** it may throw away the half that contains the target.
3. In `[1, 3, 5, 7, 9]`, what is the first `mid` index and value?
**Answer:** $(0 + 4) // 2 = 2$, value 5.

## Basic Sorting (Selection/Bubble/Insertion)

### The big idea
**Sorting** means putting items in order, smallest to largest. Selection, bubble and insertion sort are three simple methods. Each one fixes one more item per **pass** (one sweep over the array).

### Before you start
**Arrays and swapping (see topic: Python Programming).** Items sit in positions 0, 1, 2, … . In Python, `a[i], a[j] = a[j], a[i]` swaps two items, because the right side is computed first from the old values.

**Loops inside loops.** A `for` inside another `for` runs the inner loop completely for **each** round of the outer loop. Example: outer 3 rounds, inner 4 rounds gives $3 \times 4 = 12$ inner steps.

**Counting pairs, $\binom{n}{2}$ (see topic: Stacks & Queues).** The number of ways to pick 2 items out of $n$ is $\binom{n}{2} = \frac{n(n-1)}{2}$. From $\{a, b, c, d\}$ there are 6 pairs: ab, ac, ad, bc, bd, cd.

**Sum $1 + 2 + \dots + k$ (see topic: Searching).** It equals $\frac{k(k+1)}{2}$. Example: $1 + 2 + 3 + 4 = 10 = \frac{4 \cdot 5}{2}$.

**Big-O (see topic: Algorithm Complexity / Recurrences).** $O(n^2)$ means "the steps grow like $n \times n$": doubling $n$ makes the work about 4 times bigger. $O(n)$ means doubling $n$ doubles the work.

### Intuition
Imagine a PT teacher lining up 5 students by height.
- **Selection sort**: she scans the whole line, finds the **shortest** student, and swaps him into position 1. Then she finds the shortest of the rest for position 2. And so on.
- **Bubble sort**: she walks along the line comparing **neighbours**. Whenever a taller student stands before a shorter one, they swap. After one walk, the **tallest** has "bubbled" to the end.
- **Insertion sort**: like arranging playing cards in your hand. You pick up one new card and slide it left into its correct place among the cards you already hold.

> **Intuition:** Selection fixes the **front** one by one (smallest first). Bubble fixes the **back** one by one (largest first). Insertion keeps a **sorted left part** that grows by one each pass.

**The key idea: inversions.** An **inversion** is a pair of items in the wrong order. In `[3, 1, 2]`, the pairs (3, 1) and (3, 2) are inversions; (1, 2) is fine. So it has 2 inversions. Swapping two **neighbours** that are out of order fixes **exactly one** inversion. So bubble sort and insertion sort always make exactly "number of inversions" swaps.

### Words you need
- **pass**: one sweep over the (unsorted part of the) array.
- **comparison**: checking which of two items is bigger.
- **swap**: exchanging two items. **shift**: moving an item one place right (insertion sort).
- **inversion**: a pair $i < j$ with $a_i > a_j$. `[2, 1]` has 1.
- **stable**: equal items keep their original order. Bubble and insertion are stable; selection is not.
- **early exit**: bubble sort stops if a pass makes no swap (the array is already sorted).
- **in place**: needs no extra array.

### Formulas, explained
**Maximum inversions**
$$\text{inv}_{\max} = \frac{n(n-1)}{2}$$
- **Read it as:** "n times n minus one, over two."
- **Symbols:** $n$ is the number of items.
- **Why it makes sense:** in a fully reversed array, **every** pair is wrong. The number of pairs is "n choose 2". For $n=5$: $\frac{5 \cdot 4}{2} = 10$.
- **Use it when:** worst-case swaps of bubble/insertion sort.

**Swaps in bubble and insertion sort**
$$\text{swaps} = \text{number of inversions}$$
- **Read it as:** "the swap count equals the inversion count."
- **Why it makes sense:** each neighbour swap fixes exactly one wrong pair, and the algorithm stops when none are left.
- **Use it when:** a NAT asks for swaps (2025 Q.29, 2026 Q.58). Count inversions instead of tracing.

**Comparisons**
$$\text{selection: } \frac{n(n-1)}{2} \text{ always}; \quad \text{bubble (no early exit): } \frac{n(n-1)}{2}$$
$$\text{insertion: between } \text{inv} \text{ and } \text{inv} + (n-1)$$
- **Read it as:** selection and plain bubble always do every pair; insertion does about one comparison per inversion plus one "stop" comparison per item.
- **Symbols:** inv = number of inversions.
- **Why it makes sense:** selection must look at every remaining item to be sure it found the minimum. Insertion stops as soon as it meets a smaller item.
- **Use it when:** comparing comparison counts (2026 Q.49).

| | Selection | Bubble | Insertion |
|---|---|---|---|
| comparisons | $n(n-1)/2$ always | $n(n-1)/2$ plain | inv to inv $+ (n-1)$ |
| swaps | at most $n-1$ | = inv | = inv (shifts) |
| best case | $O(n^2)$ | $O(n)$ with early exit | $O(n)$, sorted input |
| worst case | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ |
| stable? | No | Yes | Yes |
| after pass $k$ | $k$ smallest in final place | $k$ largest at the end | first $k+1$ sorted among themselves |

### Where the formulas come from
**1. Maximum inversions, $\frac{n(n-1)}{2}$.**

Take the fully reversed array `[4, 3, 2, 1]`.

1. Item 4 is bigger than all 3 items to its right: 3 inversions.
2. Item 3 is bigger than the 2 items to its right: 2 inversions.
3. Item 2 gives 1, and item 1 gives 0.
4. Total $3 + 2 + 1 + 0 = 6$. This is every pair, because in a reversed array every pair is in the wrong order.
5. In general the count is $(n-1) + (n-2) + \dots + 1 + 0$. By the pairing sum with $k = n - 1$, this is $\frac{(n-1)n}{2}$. It is also $\binom{n}{2}$, the number of pairs, which is the same thing said differently.

No array can have more, because there are only $\binom{n}{2}$ pairs to be wrong.

**2. Why one neighbour swap fixes exactly one inversion.**

Take `[2, 5, 4, 1]` and swap the neighbours 5 and 4.

1. The pair (5, 4) itself was wrong and becomes right. That is one inversion fixed.
2. Any pair that does not involve 5 or 4, like (2, 1), is untouched, because those items did not move.
3. A pair of one swapped item and one other item, like (5, 1) or (2, 4): the other item is still on the same side of both 5 and 4, because 5 and 4 only traded places with each other. So the pair's order does not change.
4. So exactly one inversion disappears. Before: (2,1), (5,4), (5,1), (4,1) = 4. After `[2, 4, 5, 1]`: (2,1), (4,1), (5,1) = 3.
5. Bubble and insertion sort swap only neighbours that are out of order, and they stop when the array is sorted (0 inversions). Each swap removes exactly 1, so the number of swaps must equal the starting number of inversions.

A program that checked every arrangement of up to 6 items confirmed: insertion sort shifts = inversions, every time.

**3. Selection sort comparisons, counted step by step.**

Take $n = 5$.

1. Pass 1 finds the minimum of 5 items. It compares the current best with each of the other 4: 4 comparisons.
2. Pass 2 works on the remaining 4 items: 3 comparisons. Pass 3: 2. Pass 4: 1.
3. Total $4 + 3 + 2 + 1 = 10 = \frac{5 \cdot 4}{2}$.
4. In general, $(n-1) + (n-2) + \dots + 1 = \frac{n(n-1)}{2}$. This never changes with the input, because selection has no way to stop early: it must see every item to be sure it has the minimum.

Plain bubble sort has the same count: pass 1 compares $n - 1$ neighbour pairs, pass 2 compares $n - 2$, and so on.

**4. Insertion sort comparisons, between inv and inv $+ (n-1)$.**

1. When inserting item $i$, each comparison either **shifts** a bigger item right, or **stops** the insertion.
2. Shifts in total equal the inversions (point 2).
3. Each of the $n - 1$ inserted items makes at most one "stop" comparison. It makes none if it slides all the way to the front, because there is nothing left to compare with.
4. So comparisons $=$ inv $+$ (number of stops), which is between inv and inv $+ (n-1)$. For `[5, 2, 4, 6, 1]`: inv $= 6$ and comparisons $= 8$, inside $[6, 10]$.

**5. Best and worst cases.**

1. Already sorted input has 0 inversions. Insertion sort then makes just 1 stop comparison per item: $n - 1$ comparisons, so $O(n)$.
2. Bubble sort with early exit also sees "no swap" in its first pass on sorted input and stops after $n - 1$ comparisons: $O(n)$.
3. Reversed input has $\frac{n(n-1)}{2}$ inversions, so bubble and insertion do that many swaps: $O(n^2)$.

**6. Why each method is correct (what stays true after each pass).**

1. Selection: after pass $k$, the first $k$ positions hold the $k$ smallest items in order, because each pass picks the smallest of what is left.
2. Bubble: after pass $k$, the last $k$ positions hold the $k$ largest items, because the biggest unsorted item wins every neighbour comparison and is carried to the end.
3. Insertion: after pass $k$, the first $k + 1$ items are sorted among themselves, because the new item is slid left until it meets a smaller one.
4. After $n - 1$ passes, each statement covers the whole array, so it is sorted.

**7. Why selection sort is not stable.** Take `[2a, 2b, 1]`, where 2a and 2b are equal keys. Pass 1 swaps 2a with 1, giving `[1, 2b, 2a]`. The long-distance swap jumped 2a over 2b, so equal items changed order. Running this in Python prints `[(1, 'c'), (2, 'b'), (2, 'a')]`. Bubble and insertion only swap neighbours that are strictly out of order, so equal items never pass each other.

### Examples
**Example 1 (easy): count inversions** of `[5, 2, 4, 6, 1]`. For each item, count smaller items to its **right**:
5 → (2, 4, 1) = 3; 2 → (1) = 1; 4 → (1) = 1; 6 → (1) = 1; 1 → none = 0. Total = 3 + 1 + 1 + 1 = **6**.
So bubble and insertion sort will each make exactly 6 swaps.

**Result:** 6 inversions, so 6 swaps for bubble and for insertion sort.

**Example 2 (medium): state after each pass** on `[5, 2, 4, 6, 1]`.

Selection sort (find min of the unsorted part, swap to the front):

| pass | min of unsorted part | swap | array after |
|---|---|---|---|
| 1 | 1 (in [5,2,4,6,1]) | 5 ↔ 1 | [1, 2, 4, 6, 5] |
| 2 | 2 (in [2,4,6,5]) | none needed | [1, 2, 4, 6, 5] |
| 3 | 4 (in [4,6,5]) | none needed | [1, 2, 4, 6, 5] |
| 4 | 5 (in [6,5]) | 6 ↔ 5 | [1, 2, 4, 5, 6] |

Bubble sort (compare neighbours left to right):

| pass | swaps in this pass | array after |
|---|---|---|
| 1 | (5,2), (5,4), (6,1) = 3 | [2, 4, 5, 1, 6] |
| 2 | (5,1) = 1 | [2, 4, 1, 5, 6] |
| 3 | (4,1) = 1 | [2, 1, 4, 5, 6] |
| 4 | (2,1) = 1 | [1, 2, 4, 5, 6] |

Total swaps: 3 + 1 + 1 + 1 = 6 = inversions. Notice 6 reached the end in pass 1, but 1 moves left only **one step per pass**.

Insertion sort (slide the new item left into the sorted part):

| pass | item inserted | comparisons | array after |
|---|---|---|---|
| 1 | 2 | 1 (with 5) | [2, 5, 4, 6, 1] |
| 2 | 4 | 2 (5 shifts, 2 stops) | [2, 4, 5, 6, 1] |
| 3 | 6 | 1 (5 stops) | [2, 4, 5, 6, 1] |
| 4 | 1 | 4 (6, 5, 4, 2 all shift) | [1, 2, 4, 5, 6] |

Comparisons: 1 + 2 + 1 + 4 = 8. Shifts: 1 + 1 + 0 + 4 = 6 = inversions.

**Result:** all three end at `[1, 2, 4, 5, 6]`; bubble and insertion use 6 swaps, insertion uses 8 comparisons.

**Example 3 (GATE level).** Array `[2, 1, 3, 5, 4, 6]`. Bubble sort with early exit vs insertion sort: comparisons and swaps?
- Inversions: (2,1) and (5,4) = 2. So both make **2 swaps**.
- Bubble, pass 1: 5 comparisons, swaps (2,1) and (5,4), giving [1, 2, 3, 4, 5, 6]. Pass 2: 4 comparisons, no swap, so stop. Total $5 + 4 = 9$.
- Insertion: insert 1 (1 comparison, shift), insert 3 (1), insert 5 (1), insert 4 (2: shift past 5, stop at 3), insert 6 (1). Total $1+1+1+2+1 = 6$.

```python
def bubble_count(a):
    a = a[:]; comps = swaps = 0
    for p in range(len(a) - 1):
        swapped = False
        for j in range(len(a) - 1 - p):
            comps += 1
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]; swaps += 1; swapped = True
        if not swapped:
            break
    return comps, swaps
print(bubble_count([2, 1, 3, 5, 4, 6]))   # prints: (9, 2)
```

**Result:** both make 2 swaps; bubble uses 9 comparisons and insertion uses 6.

### Common mistakes
> **Common mistake:** Thinking bubble sort moves small items quickly to the front. A small item moves left only **one place per pass**. That is why `[4, 3, 2, 1, 5]` is not sorted after 2 bubble passes (2024 Q.45).

> **Common mistake:** Forgetting the "stop" comparison in insertion sort. Inserting 4 into [1, 2, 3, 5] needs 2 comparisons (with 5, then with 3), not 1.

> **Common mistake:** Not checking the bubble sort version. Plain bubble does all $n(n-1)/2$ comparisons; early exit may do fewer. If the question does not say, check that your option is true for both (2026 Q.49).

> **Common mistake:** Thinking selection sort swaps = inversions. Selection makes at most $n-1$ swaps, far fewer.

### How GATE asks it
- **2024 Q.45**: which sort finishes `[4, 3, 2, 1, 5]` in exactly 2 passes? Only selection.
- **2025 Q.29**: insertion sort takes exactly 2 swaps on `[1,3,5,7,9,11,x,15,13]`; find $x$ by counting inversions (10 or 14).
- **2026 Q.49**: bubble vs insertion comparisons and swaps on `[1, 2, 3, 5, 4]`.
- **2026 Q.58**: a recursive Python function doing one bubble pass, called 5 times; total swaps = inversions = 8.

### Summary
- First we defined an inversion: a pair of items in the wrong order. Sorting means bringing inversions down to 0.
- A reversed array has every pair wrong, so at most $\frac{n(n-1)}{2}$ inversions.
- A neighbour swap fixes exactly one inversion, so bubble and insertion sort make exactly "inversions" swaps.
- Selection sort always scans the whole unsorted part, so it always makes $\frac{n(n-1)}{2}$ comparisons but at most $n-1$ swaps.
- Insertion sort stops early, so it uses between inv and inv $+(n-1)$ comparisons: $O(n)$ on sorted input, $O(n^2)$ on reversed input.
- Next topic builds on this: Divide & Conquer, where merge sort and quick sort beat $O(n^2)$ by splitting the array.

### Quick self-check
1. How many inversions in `[4, 3, 2, 1]`?
**Answer:** all pairs: $\frac{4 \cdot 3}{2} = 6$.
2. After 1 pass of selection sort on `[3, 1, 2]`, what is the array?
**Answer:** min is 1; swap with 3: `[1, 3, 2]`.
3. After 1 pass of bubble sort on `[3, 1, 2]`, what is the array?
**Answer:** (3,1) swap → [1, 3, 2]; (3,2) swap → `[1, 2, 3]`.

## Divide & Conquer (Merge/Quick Sort)

### The big idea
**Divide and conquer** means: break a big problem into smaller pieces, solve each piece the same way, and combine the answers. **Merge sort** and **quicksort** sort an array this way, in $O(n \log n)$ time on average.

### Before you start
**Recursion (see topic: Python Programming).** A function that calls itself on a smaller input, and stops at a "base case". Here the base case is "a list of 0 or 1 items is already sorted".

**Basic sorting and inversions (see topic: Basic Sorting).** Selection, bubble and insertion sort take $O(n^2)$ steps in the worst case. Divide and conquer is how we do better.

**$\log_2 n$ (see topic: Trees & BST).** The number of times you can halve $n$ until you reach 1. $\log_2 8 = 3$ because $8 \to 4 \to 2 \to 1$ is 3 halvings.

**$T(n)$ notation.** $T(n)$ means "the time (number of steps) to solve a problem of size $n$". $T(n/2)$ is the time for a problem half as big. An equation like $T(n) = 2T(n/2) + n$ is a **recurrence** (see topic: Searching).

**$\Theta$ and $O$.** $\Theta(n)$ means "grows exactly in proportion to $n$" (between two fixed multiples of $n$). $O(n)$ means "at most in proportion to $n$". Details in topic: Algorithm Complexity / Recurrences.

**Sum $\sum$ and average.** $\frac{1}{n}\sum_{k=0}^{n-1} x_k$ means "add the $n$ values $x_0, \dots, x_{n-1}$ and divide by $n$", that is, their average (see topic: Hash Tables for expected value).

### Intuition
A teacher must sort 64 answer sheets by roll number. Doing it alone is slow. So she splits the pile in two and gives each half to a helper. Each helper splits again and passes it on. Soon every person holds just 1 sheet, which is already "sorted". Now the piles come back up: two people **merge** their sorted piles into one sorted pile by repeatedly taking the smaller top sheet. That is **merge sort**: easy split, clever combine.

**Quicksort** does the clever work **before** splitting. Pick one sheet, the **pivot**, say roll number 30. Put every sheet with a smaller number on the left and every bigger one on the right. Now 30 is in its final place. Sort the left pile and the right pile the same way. No merging is needed.

> **Intuition:** Merge sort: split blindly, then merge carefully. Quicksort: partition carefully, then the parts are already in the right order relative to each other.

### Words you need
- **merge**: combine two sorted lists into one sorted list. [2, 5] and [3] give [2, 3, 5].
- **pivot**: the item quicksort uses to split. Often the first or last item.
- **partition**: rearranging so that items ≤ pivot come first, then the pivot, then items > pivot.
- **Lomuto partition**: a partition method with the **last** item as pivot.
- **recurrence**: an equation giving the time for size $n$ in terms of smaller sizes.
- **stable**: equal items keep their original order. Merge sort is stable; quicksort is not.

### Formulas, explained
**Merge sort time**
$$T(n) = 2T(n/2) + \Theta(n) = \Theta(n \log n)$$
- **Read it as:** "sorting n items = sorting two halves, plus linear work to merge."
- **Symbols:** $T(n)$ is the time for $n$ items; $\Theta(n)$ means "proportional to n".
- **Why it makes sense:** the halving gives $\log_2 n$ levels. Each level merges all $n$ items once. So total work is $n \times \log_2 n$.
- **Use it when:** merge sort, any input (best = average = worst).

**Quicksort worst case**
$$T(n) = T(n-1) + \Theta(n) = \Theta(n^2)$$
- **Read it as:** "the pivot splits off nothing, so the problem shrinks by only one."
- **Why it makes sense:** if the pivot is always the smallest or largest (for example, a sorted array with first or last pivot), the partitions are of sizes 0 and $n-1$. Work: $n + (n-1) + \dots + 1 = \frac{n(n+1)}{2}$.
- **Use it when:** "worst case of quicksort" or sorted input.

**Quicksort expected time (random input)**
$$T(n) = \frac{1}{n}\sum_{k=0}^{n-1}\big[T(k) + T(n-1-k)\big] + \Theta(n)$$
- **Read it as:** "average, over every possible pivot rank k, of the time to sort the two parts, plus partition work."
- **Symbols:** $k$ is how many items are smaller than the pivot (0 to $n-1$), each with chance $\frac{1}{n}$; $\sum$ means "add up".
- **Why it makes sense:** on random input, the first (or last) item is equally likely to be the smallest, 2nd smallest, …, largest. This averages to $\Theta(n \log n)$.
- **Use it when:** 2026 Q.15.

**Comparisons to merge two sorted lists**
$$\min(p, q) \le \text{comparisons} \le p + q - 1$$
- **Read it as:** "at least the shorter length, at most total minus one."
- **Symbols:** $p$ and $q$ are the two list lengths.
- **Why it makes sense:** each comparison outputs one item. The last item never needs a comparison. At best, the shorter list runs out first after $\min(p,q)$ comparisons.
- **Use it when:** counting merge comparisons.

### Where the formulas come from
**1. Merge comparisons, $\min(p,q) \le \text{comparisons} \le p + q - 1$.**

1. Each comparison looks at the front of both lists and moves the smaller item to the output. So every comparison outputs exactly 1 item.
2. When one list becomes empty, the rest of the other list is copied with no comparisons, because there is nothing left to compare against.
3. Most comparisons: the lists run out together, as in Example 1. The very last item is copied for free, so at most $p + q - 1$ items needed a comparison. For $3 + 3$: 5.
4. Fewest comparisons: every item of the shorter list is smaller than everything in the longer one, as in `[1, 2, 3]` and `[4, 5, 6]`. After $\min(p,q)$ comparisons the shorter list is empty, and the rest is copied.

**2. Why merging gives a correct sorted list.** At every moment, the output holds the smallest items seen so far, in order. The smallest remaining item must be at the front of one of the two lists, because each list is sorted. Taking the smaller front item therefore always adds the next smallest item.

**3. Merge sort time, $\Theta(n \log n)$, by counting levels.**

Take $n = 8$.

1. Level 0: one list of 8. Merging two halves of 4 costs at most $8 - 1 = 7$ comparisons, so about 8 steps.
2. Level 1: two lists of 4. Each merge of 2 + 2 costs about 4 steps. Total $2 \times 4 = 8$.
3. Level 2: four lists of 2. Each costs about 2 steps. Total $4 \times 2 = 8$.
4. Level 3: eight lists of 1. Nothing to merge; this is the base case.
5. So each working level costs about $n = 8$ steps, because the pieces on one level together hold all $n$ items once.
6. The number of working levels is $\log_2 8 = 3$, because each level halves the piece size, from 8 down to 1.
7. Total about $8 \times 3 = 24 = n \log_2 n$. A program that counted actual comparisons got 16 for $n = 8$ and 8935 for $n = 1024$, both below $n \log_2 n$ (24 and 10240), as expected since a merge costs at most $n - 1$, not $n$.

In symbols, sorting $n$ items is two half-size sorts plus the merge:

$$T(n) = 2T(n/2) + n$$

and the level picture shows that this adds up to $n \log_2 n$.

**4. Quicksort worst case, $\Theta(n^2)$.**

Take the sorted array `[1, 2, 3, 4, 5]` with the last item as pivot.

1. Pivot 5. Partition compares it with the other 4 items: 4 comparisons. All are smaller, so the parts have sizes 4 and 0.
2. Pivot 4 on `[1, 2, 3, 4]`: 3 comparisons, parts 3 and 0.
3. Then 2 comparisons, then 1.
4. Total $4 + 3 + 2 + 1 = 10 = \frac{5 \cdot 4}{2}$.
5. In general, $(n-1) + (n-2) + \dots + 1 = \frac{n(n-1)}{2}$, which grows like $n^2$. In symbols, each step removes only the pivot: $T(n) = T(n-1) + \Theta(n)$.

A program running this quicksort on sorted input of size 500 counted exactly $124{,}750 = \frac{500 \cdot 499}{2}$ comparisons.

**5. Quicksort expected time: where the averaged recurrence comes from.**

1. On random input, the pivot (first or last item) is equally likely to be the 1st, 2nd, …, $n$-th smallest. Each case has chance $\frac{1}{n}$.
2. If $k$ items are smaller than the pivot, the parts have sizes $k$ and $n - 1 - k$. Sorting them costs $T(k) + T(n-1-k)$.
3. Partitioning always costs about $n$ steps, because the pivot is compared with every other item.
4. The expected time is the average of step 2 over all $k$ (each with chance $\frac{1}{n}$), plus step 3. That is exactly the formula in the box.

Solving that recurrence exactly needs long algebra, and the full proof is not needed for GATE. Here is an honest picture of why the answer is $\Theta(n \log n)$:

1. Call a pivot "good" if it lands in the middle half of the sorted order. Half of all ranks are in the middle half, so a pivot is good with chance $\frac{1}{2}$.
2. A good pivot leaves each part at most $\frac{3}{4}$ of the size.
3. So on average every 2 levels, the pieces shrink by at least a factor $\frac{3}{4}$. That means only about $\log n$ levels (times a constant) before pieces reach size 1.
4. Each level partitions all items once, so it costs about $n$. Total: about $n \log n$.

**Check by simulation.** Average comparisons over 20 random arrays were about 11,200 for $n = 1000$ and 154,708 for $n = 10{,}000$. Multiplying $n$ by 10 multiplied the work by about 13.8, close to $n \log n$ growth (which predicts about 13.3), and far from $n^2$ growth (which would predict 100).

**6. Why Lomuto partition is correct.**

During the loop, three zones exist: positions $0..i$ hold items $\le$ pivot, positions $i+1..j-1$ hold items $>$ pivot, and positions from $j$ on are not yet seen.

1. At the start, $i = -1$ and $j = 0$, so the first two zones are empty. The statement is true.
2. If $A[j] > $ pivot, just move $j$ on: the "$>$" zone grows by one. Still true.
3. If $A[j] \le$ pivot, add 1 to $i$ and swap $A[i]$ with $A[j]$. The item at new $i$ was the first of the "$>$" zone (or $A[j]$ itself), so the small item joins the "$\le$" zone and the big item moves to the end of the "$>$" zone. Still true.
4. At the end, swapping the pivot into position $i + 1$ puts it right between the two zones, which is its final sorted place.

### Examples
**Example 1 (easy): merge `[2, 5, 8]` and `[3, 4, 9]`.**

| compare | take | output so far |
|---|---|---|
| 2 vs 3 | 2 | [2] |
| 5 vs 3 | 3 | [2, 3] |
| 5 vs 4 | 4 | [2, 3, 4] |
| 5 vs 9 | 5 | [2, 3, 4, 5] |
| 8 vs 9 | 8 | [2, 3, 4, 5, 8] |
| left list empty | copy 9 | [2, 3, 4, 5, 8, 9] |

5 comparisons $= 3 + 3 - 1$, the maximum.

**Result:** `[2, 3, 4, 5, 8, 9]` with 5 comparisons.

**Example 2 (medium): merge sort levels** on `[38, 27, 43, 3]`.

```text
split:   [38, 27, 43, 3]
         [38, 27]   [43, 3]
         [38] [27]  [43] [3]
merge:   [27, 38]   [3, 43]
         [3, 27, 38, 43]
```

**Result:** `[3, 27, 38, 43]`.

**Example 3 (GATE level): Lomuto partition** on `[4, 8, 1, 6, 3, 5]`, pivot = last = 5. Start $i = -1$. For each $j$: if $A[j] \le 5$, add 1 to $i$ and swap $A[i]$, $A[j]$.

| j | A[j] | ≤ 5? | i | action | array after |
|---|---|---|---|---|---|
| 0 | 4 | Yes | 0 | swap A0 with itself | [4, 8, 1, 6, 3, 5] |
| 1 | 8 | No | 0 | skip | [4, 8, 1, 6, 3, 5] |
| 2 | 1 | Yes | 1 | swap A1, A2 | [4, 1, 8, 6, 3, 5] |
| 3 | 6 | No | 1 | skip | [4, 1, 8, 6, 3, 5] |
| 4 | 3 | Yes | 2 | swap A2, A4 | [4, 1, 3, 6, 8, 5] |
| end | - | - | 2 | swap A3 with pivot | [4, 1, 3, 5, 8, 6] |

The pivot 5 sits at index 3. Left of it: 4, 1, 3 (all ≤ 5). Right: 8, 6 (all > 5). Real swaps (two different positions): 3.

```python
def lomuto(A):
    p, i = A[-1], -1
    for j in range(len(A) - 1):
        if A[j] <= p:
            i += 1
            A[i], A[j] = A[j], A[i]
    A[i + 1], A[-1] = A[-1], A[i + 1]
    return i + 1
A = [4, 8, 1, 6, 3, 5]
print(lomuto(A), A)     # prints: 3 [4, 1, 3, 5, 8, 6]
```

**Result:** pivot 5 ends at index 3, array `[4, 1, 3, 5, 8, 6]`, 3 real swaps.

### Common mistakes
> **Common mistake:** Thinking sorted input is the worst case for **swaps**. With last-element pivot it is the worst case for **comparisons**, but every swap is a self-swap, so the minimum real swaps is 0 (2024 Q.30).

> **Common mistake:** Choosing $T(n) = T(1) + T(n-1) + O(n)$ for the **expected** time. That is the worst case. The expected time averages over all pivot ranks (2026 Q.15).

> **Common mistake:** Saying merge sort is $O(n^2)$ in the worst case. It is $\Theta(n \log n)$ always; the price is $O(n)$ extra memory.

### How GATE asks it
- **2024 Q.30**: minimum swaps for quicksort (last pivot) on sorted `[60, 70, 80, 90, 100]`: 0.
- **2026 Q.15**: the recurrence for expected quicksort time with first-element pivot on random input: the averaged sum.

### Summary
- First we split a big sorting job into smaller jobs of the same kind, solved each, and combined the answers.
- Merge sort splits blindly in half and merges carefully; each merge costs about one step per item, at most $p + q - 1$ comparisons.
- Halving gives $\log_2 n$ levels, each costing about $n$, so merge sort is $\Theta(n \log n)$ on every input.
- Quicksort partitions around a pivot first, so no merge is needed; the partition is correct because it keeps "small zone, big zone, unseen zone" true.
- A pivot that is always the smallest or largest removes only one item per level, giving $\frac{n(n-1)}{2}$ steps, which is $\Theta(n^2)$.
- On random input the pivot is usually near the middle, and averaging over all pivot ranks gives $\Theta(n \log n)$.
- Next topic builds on this: Algorithm Complexity / Recurrences, which gives general tools (like the Master theorem) to solve $T(n) = 2T(n/2) + n$ and similar equations.

### Quick self-check
1. Merge [1, 2, 3] with [4, 5, 6]. How many comparisons?
**Answer:** 3 (1, 2, 3 each beat 4; then copy the rest). This is $\min(3, 3) = 3$.
2. Quicksort's worst-case time?
**Answer:** $\Theta(n^2)$.
3. Which of merge sort and quicksort is stable?
**Answer:** merge sort.

## Algorithm Complexity / Recurrences

### The big idea
**Complexity** tells us how the running time grows when the input grows. We ignore small constants and ask: if $n$ doubles, does the time double, quadruple, or barely change? A **recurrence** is an equation for the time of a recursive function.

### Before you start
**Powers.** $n^k$ means $n$ multiplied by itself $k$ times: $2^3 = 8$. Two rules are used here: $(n^k)^2 = n^{2k}$, and $\frac{a^i}{b^{i}} = \left(\frac{a}{b}\right)^i$. Also $n^0 = 1$ for any $n \ne 0$.

**Logarithms (see topic: Trees & BST).** $\log_b n$ answers "$b$ to what power gives $n$?". So $\log_2 8 = 3$ and $\log_3 9 = 2$. Key fact: $b^{\log_b n} = n$, because that is the definition. In big-O, the base of a log does not matter, because changing the base only multiplies by a fixed number.

**Square root.** $\sqrt{n}$ is the number that, times itself, gives $n$. $\sqrt{16} = 4$. It is the same as $n^{1/2}$.

**Factorial.** $n! = 1 \times 2 \times \dots \times n$. $4! = 24$. It grows extremely fast.

**Sum of a doubling or shrinking series.** $1 + r + r^2 + \dots + r^{m}$: if $r < 1$, the total is less than $\frac{1}{1-r}$, a fixed number (see topic: Hash Tables). If $r = 2$, then $1 + 2 + 4 + \dots + 2^m = 2^{m+1} - 1$, less than twice the last term (see topic: Trees & BST).

**Recurrences and $T(n)$ (see topics: Searching and Divide & Conquer).** $T(n)$ is the time for input size $n$. A recurrence like $T(n) = 2T(n/2) + n$ describes a recursive algorithm: two calls on halves, plus $n$ extra work.

### Intuition
Two ways to find a friend's name in a WhatsApp group of $n$ people:
- Scroll from the top: the time grows like $n$. A group 10 times bigger takes 10 times longer.
- Compare every pair of people to find duplicates: about $n^2$ pairs. A group 10 times bigger takes **100** times longer.

> **Intuition:** Big-O is like saying "this train journey takes about a day", not "23 hours 41 minutes". We only care about the **shape** of the growth.

Growth order, slowest to fastest:
$$1 < \log n < \sqrt{n} < n < n \log n < n^2 < n^3 < 2^n < n!$$

### Words you need
- **$O(g)$ (big-O)**: grows **no faster** than $g$. $3n + 5 = O(n)$.
- **$\Omega(g)$ (big-Omega)**: grows **no slower** than $g$.
- **$\Theta(g)$ (big-Theta)**: grows **exactly like** $g$ (both $O$ and $\Omega$).
- **recurrence**: e.g. $T(n) = T(n/2) + 1$, "time for n = time for half, plus 1".
- **unrolling**: substituting the recurrence into itself until a pattern appears.

### Formulas, explained
**Master theorem**
$$T(n) = a\,T(n/b) + \Theta(n^k)$$
- **Read it as:** "split into $a$ problems, each of size $n/b$, and spend $n^k$ extra work."
- **Symbols:** $a \ge 1$ is the number of sub-problems; $b > 1$ is the shrink factor; $n^k$ is the split/combine cost.
- **Rule:** compare $k$ with $\log_b a$:
  - $k < \log_b a$: $T = \Theta(n^{\log_b a})$ (the leaves dominate);
  - $k = \log_b a$: $T = \Theta(n^k \log n)$ (every level costs the same);
  - $k > \log_b a$: $T = \Theta(n^k)$ (the top level dominates).
- **Why it makes sense:** $\log_b a$ measures how fast the number of sub-problems grows; $k$ measures how costly each level's extra work is. The bigger one wins.
- **Use it when:** a divide-and-conquer recurrence appears.

**Standard recurrences**

| recurrence | solution | example |
|---|---|---|
| $T(n) = T(n/2) + 1$ | $\Theta(\log n)$ | binary search |
| $T(n) = T(n-1) + 1$ | $\Theta(n)$ | linear recursion |
| $T(n) = T(n-1) + n$ | $\Theta(n^2)$ | quicksort worst case |
| $T(n) = 2T(n/2) + n$ | $\Theta(n \log n)$ | merge sort |
| $T(n) = 2T(n-1) + 1$ | $2^n - 1$ | Tower of Hanoi |
| $T(n) = T(n-1) + T(n-2) + 1$ | exponential, about $1.618^n$ | naive Fibonacci |

**Sum of 1 to n**
$$1 + 2 + \dots + n = \frac{n(n+1)}{2}$$
- **Read it as:** "n times n plus one, over two."
- **Why it makes sense:** pair the first and last (1 + n), second and second-last (2 + n − 1): each pair sums to $n+1$, and there are $n/2$ pairs.
- **Use it when:** counting nested loops.

### Where the formulas come from
**1. What $O$ really means, with numbers.**

1. Claim: $3n + 5 = O(n)$. This means: from some point on, $3n + 5$ is at most a fixed number times $n$.
2. Try the fixed number 4. We need $3n + 5 \le 4n$, which is $5 \le n$. So for all $n \ge 5$ it is true.
3. That is the full definition: $f(n) = O(g(n))$ if there are fixed numbers $c$ and $n_0$ with $f(n) \le c \cdot g(n)$ for every $n \ge n_0$.
4. $\Omega$ is the same with $\ge$ ($3n + 5 \ge 3n$, so $3n + 5 = \Omega(n)$). Both together give $\Theta(n)$.

This is why constants and small terms are dropped: they only change $c$ or $n_0$.

**2. The growth order, by plugging in numbers.**

| $n$ | $\log_2 n$ | $\sqrt{n}$ | $n \log_2 n$ | $n^2$ | $2^n$ |
|---|---|---|---|---|---|
| 16 | 4 | 4 | 64 | 256 | 65,536 |
| 1024 | 10 | 32 | 10,240 | 1,048,576 | about $10^{308}$ |

1. At $n = 1024$, $\log n$ is 10 but $\sqrt{n}$ is 32, so $\sqrt{n}$ wins. This is why $n^{1.5} = n \sqrt{n}$ beats $n \log n$.
2. $n!$ beats $2^n$ because $n!$ multiplies by $n$ at each step, while $2^n$ multiplies only by 2. At $n = 16$, $16! \approx 2.1 \times 10^{13}$, far above 65,536.

**3. Unrolling the standard recurrences.**

**$T(n) = T(n/2) + 1$.** Take $n = 16$.

1. $T(16) = T(8) + 1 = T(4) + 2 = T(2) + 3 = T(1) + 4$, because each line replaces $T(m)$ by $T(m/2) + 1$.
2. We reach $T(1)$ after 4 halvings, and $\log_2 16 = 4$. So $T(n) = T(1) + \log_2 n = \Theta(\log n)$.

**$T(n) = T(n-1) + n$.**

1. $T(n) = n + T(n-1) = n + (n-1) + T(n-2) = \dots = n + (n-1) + \dots + 1$.
2. That is $\frac{n(n+1)}{2}$ by the pairing sum, so $\Theta(n^2)$.

**$T(n) = 2T(n-1) + 1$ (Tower of Hanoi), with $T(1) = 1$.**

1. $T(2) = 2 \cdot 1 + 1 = 3$, $T(3) = 2 \cdot 3 + 1 = 7$, $T(4) = 15$, $T(5) = 31$.
2. Each value is one less than a power of 2: $2^n - 1$.
3. Why it stays true: if $T(n-1) = 2^{n-1} - 1$, then $T(n) = 2(2^{n-1} - 1) + 1 = 2^n - 2 + 1 = 2^n - 1$.

**$T(n) = T(n-1) + T(n-2) + 1$ (naive Fibonacci).**

1. This is the same as the call count $C(n)$ in topic: Python Programming.
2. Each value is about the sum of the two before it, so the ratio of neighbours settles near $1.618$ (the "golden ratio"). Computing up to $n = 20$ gives $T(20) / T(19) \approx 1.6181$.
3. So the time multiplies by about 1.618 with each $+1$ in $n$: exponential, about $1.618^n$.

**4. The Master theorem, from a recursion tree.**

Look at $T(n) = a\,T(n/b) + n^k$ level by level.

1. Level 0: one problem of size $n$, extra work $n^k$.
2. Level 1: $a$ problems, each of size $n/b$. Extra work $a \cdot (n/b)^k = n^k \cdot \frac{a}{b^k}$.
3. Level $i$: $a^i$ problems of size $n/b^i$. Extra work $a^i \cdot (n/b^i)^k = n^k \left(\frac{a}{b^k}\right)^i$, by the power rules.
4. So the level costs form a series with ratio $r = \frac{a}{b^k}$. There are about $\log_b n$ levels, because size $n$ divided by $b$ that many times reaches 1.
5. Case $r < 1$ (that is, $a < b^k$, or $k > \log_b a$): the levels shrink, so their sum is less than a fixed multiple of the first level. Total $\Theta(n^k)$.
6. Case $r = 1$ ($k = \log_b a$): every level costs $n^k$, and there are $\log_b n$ levels. Total $\Theta(n^k \log n)$.
7. Case $r > 1$ ($k < \log_b a$): the levels grow, so the last level (the leaves) dominates. The number of leaves is $a^{\log_b n}$. Using $a = b^{\log_b a}$, this equals $b^{\log_b a \cdot \log_b n} = n^{\log_b a}$. Total $\Theta(n^{\log_b a})$.

Comparing $k$ with $\log_b a$ is the same as comparing $b^k$ with $a$, which is just asking whether $r$ is below, equal to or above 1.

Merge sort is case 6: $a = 2$, $b = 2$, $k = 1$, $r = 1$, so $\Theta(n \log n)$. That matches the level picture in topic: Divide & Conquer.

**Check by computing.** A program computed each recurrence exactly for $n = 1024$ and $n = 2048$. Doubling $n$ multiplied $T$ by 2.18 for $2T(n/2) + n$ (an $n \log n$ curve predicts 2.2), by 4.36 for $4T(n/2) + n^2$ ($n^2 \log n$ predicts 4.4), and by 8.00 for $8T(n/2) + n^2$ ($n^3$ predicts 8).

**5. The doubling loop with an inner loop.**

1. `i` takes values 1, 2, 4, …, up to below $n$. For each `i`, the inner loop runs `i` times.
2. Total $1 + 2 + 4 + \dots + 2^m$ where $2^m < n$. This is $2^{m+1} - 1$, less than $2n$.
3. So the total is $\Theta(n)$, not $n \log n$: the last round alone does about half the work.

### Examples
**Example 1 (easy).** `i = 1; while i < 1000: i *= 2`. How many loop runs?
$i$ goes 1, 2, 4, …, 512 (all less than 1000), then becomes 1024 and stops. That is $2^0$ to $2^9$: **10** runs. In general a doubling loop runs about $\log_2 n$ times.

**Result:** 10 runs.

**Example 2 (medium).** Count `c` for `for i in range(10): for j in range(i, 10): c += 1`.
When $i = 0$ the inner loop runs 10 times, $i = 1$ runs 9 times, …, $i = 9$ runs 1 time. Total $10 + 9 + \dots + 1 = \frac{10 \cdot 11}{2} = 55$.

**Result:** $c = 55$.

**Example 3 (GATE level).** Solve $T(n) = 4T(n/2) + n^2$ and $T(n) = 8T(n/2) + n^2$.
- First: $a = 4$, $b = 2$, $\log_2 4 = 2 = k$. Equal case: $\Theta(n^2 \log n)$.
- Second: $\log_2 8 = 3 > k = 2$. Leaves win: $\Theta(n^3)$.

**Result:** $\Theta(n^2 \log n)$ and $\Theta(n^3)$.

### Common mistakes
> **Common mistake:** Saying a doubling outer loop with an inner loop `for j in range(i)` is $n \log n$. The inner counts are $1 + 2 + 4 + \dots$, which is less than $2n$, so the total is $\Theta(n)$.

> **Common mistake:** Applying the master theorem to $T(n) = T(n-1) + n$. It needs $n/b$, not $n-1$. Unroll instead: $n + (n-1) + \dots + 1 = \Theta(n^2)$.

### How GATE asks it
Not asked as a separate topic in 2024–2026, but recurrences appeared inside other topics: binary search $F(n) = F(\lfloor n/2 \rfloor) + 1$ (2024 Q.40), expected quicksort (2026 Q.15) and call counting $T(n) = 1 + T(n-1) + T(n-2)$ (2026 Q.39). A likely question: match recurrences to $\Theta$ answers, or count loop iterations.

### Summary
- First we agreed to measure time by how it grows with $n$, ignoring constants: $O$, $\Omega$ and $\Theta$ say this precisely with "$f(n) \le c \cdot g(n)$ from some $n_0$ on".
- Plugging in numbers gives the order $1 < \log n < \sqrt{n} < n < n \log n < n^2 < 2^n < n!$.
- Loops are counted by adding their rounds, often with $1 + 2 + \dots + n = \frac{n(n+1)}{2}$.
- Recursive code gives recurrences, which we solve by unrolling: halving gives $\log n$, "minus one plus $n$" gives $n^2$, doubling calls give $2^n$.
- For $T(n) = aT(n/b) + n^k$, the levels form a series with ratio $a / b^k$, and whichever end is biggest decides the answer: that is the Master theorem.
- Next topic builds on this: Graph Theory Basics and Graph Traversals, where we measure BFS and DFS as $O(V + E)$; in ML, the same counting tells you whether training scales to big data.

### Quick self-check
1. $T(n) = 2T(n/2) + 1$?
**Answer:** $\log_2 2 = 1 > k = 0$, so $\Theta(n)$.
2. Which grows faster: $n \log n$ or $n^{1.5}$?
**Answer:** $n^{1.5}$, because $\sqrt{n}$ grows faster than $\log n$.
3. Nested loops `for i in range(n): for j in range(n)` run how many times?
**Answer:** $n \times n = n^2$.

## Graph Theory Basics

### The big idea
A **graph** is a set of dots (**vertices**) joined by lines (**edges**). It models anything with connections: cities and roads, people and friendships, web pages and links.

### Before you start
**Sets and $\lvert \cdot \rvert$.** A set is a collection of different things, written in curly brackets: $V = \{a, b, c\}$. $|V|$ means "how many items are in $V$", so here $|V| = 3$.

**The symbol $\in$.** $v \in V$ means "$v$ is a member of the set $V$". So $\sum_{v \in V} \deg(v)$ means "add $\deg(v)$ for every vertex $v$".

**Sum symbol $\sum$ (see topic: Searching).** $\sum$ means "add up". $\sum_{i=1}^{3} i = 1 + 2 + 3 = 6$.

**Counting pairs, $\binom{n}{2} = \frac{n(n-1)}{2}$ (see topic: Basic Sorting).** The number of ways to choose 2 things from $n$. With 4 people there are 6 possible handshakes.

**Even and odd.** An even number is a multiple of 2 (0, 2, 4, …); an odd number is not. Adding odd numbers: an even count of them gives an even total ($3 + 5 = 8$); an odd count gives an odd total ($3 + 5 + 7 = 15$).

**Trees (see topic: Trees & BST).** A rooted tree has $N - 1$ edges for $N$ nodes, because every node except the root has one edge up to its parent. Here we meet the same fact without a root.

**Lists and 2-D tables (see topic: Python Programming).** An adjacency list is like a Python dict of lists, `{"a": ["b", "c"]}`. An adjacency matrix is a list of rows, like `[[0, 1], [1, 0]]`.

### Intuition
Draw your friends as dots. Draw a line between two dots if those two people are friends on Instagram. That picture is a graph. Friendship goes both ways, so the lines have no arrows: an **undirected** graph. On Twitter, you can follow someone who does not follow you back. Now each line needs an arrow: a **directed** graph. Add the distance in km to each road between cities and you have a **weighted** graph.

> **Intuition:** Every handshake involves two hands. So if you add up how many hands each person shook, you get exactly twice the number of handshakes. This is the handshake lemma.

### Words you need
- **vertex (node)**: a dot. $V$ is the set of vertices; $|V|$ is how many.
- **edge**: a line between two vertices. $E$ is the set of edges.
- **degree** $\deg(v)$: the number of edges touching $v$.
- **path**: a route along edges, like a − b − c.
- **cycle**: a path that comes back to its start without repeating edges.
- **connected**: there is a path between every pair of vertices.
- **tree**: a connected graph with no cycle.
- **DAG**: a directed graph with no directed cycle (directed acyclic graph).
- **adjacency list**: for each vertex, a list of its neighbours.
- **adjacency matrix**: an $n \times n$ table with 1 where an edge exists.

### Formulas, explained
**Handshake lemma**
$$\sum_{v \in V} \deg(v) = 2|E|$$
- **Read it as:** "adding all degrees gives twice the number of edges."
- **Symbols:** $\sum_{v \in V}$ means "add over every vertex"; $|E|$ is the number of edges.
- **Why it makes sense:** each edge has two ends, and adds 1 to the degree of each end.
- **Use it when:** finding $|E|$ from degrees, or checking if a degree list is possible. The sum must be even, so the number of odd-degree vertices is even.

**Maximum edges in a simple graph**
$$|E| \le \frac{n(n-1)}{2} \text{ (undirected)}, \qquad |E| \le n(n-1) \text{ (directed)}$$
- **Read it as:** "at most one edge per pair of vertices."
- **Symbols:** $n = |V|$. A simple graph has no self-loops and no repeated edges.
- **Why it makes sense:** there are $\binom{n}{2}$ pairs; with direction, each pair can have two arrows.
- **Use it when:** counting edges of a complete graph.

**Tree edges**
$$|E| = n - 1$$
- **Read it as:** "a tree with n vertices has n minus one edges."
- **Why it makes sense:** start with one vertex; each new vertex joins with exactly one new edge.
- **Use it when:** tree or spanning-tree questions.

**Storage cost**
$$\text{matrix: } \Theta(n^2), \qquad \text{list: } \Theta(|V| + |E|)$$
- **Read it as:** "a matrix needs space for every pair of vertices; a list needs space only for the vertices and the edges that exist."
- **Symbols:** $n = |V|$; space means how many memory cells are used.
- **Why it makes sense:** the matrix has $n$ rows and $n$ columns, filled even where there is no edge. The list stores one entry per vertex plus one entry per edge end.
- **Use it when:** choosing a storage. The matrix checks "is $u$–$v$ an edge?" in $O(1)$; the list is better for sparse graphs (few edges).

### Where the formulas come from
**1. Handshake lemma, by counting edge-ends.**

Take a triangle a–b–c plus one extra edge c–d.

1. Degrees: a has 2, b has 2, c has 3, d has 1. Sum $= 8$.
2. Edges: a–b, b–c, a–c, c–d. That is 4 edges.
3. $8 = 2 \times 4$. Why: give every edge two tokens, one at each end. Each end-token sits at a vertex and counts 1 towards that vertex's degree.
4. Adding all degrees counts every token once. There are exactly 2 tokens per edge, so the sum is $2|E|$.

$$\sum_{v \in V} \deg(v) = 2|E|$$

**Consequence: odd-degree vertices come in an even number.** The total $2|E|$ is even. The even degrees add to an even number. So the odd degrees must also add to an even number, which needs an even count of them (from "Before you start"). A program that built 500 random graphs found both facts true every time.

**2. Maximum edges.**

1. In a simple undirected graph, each pair of vertices has at most one edge. So the edges can be at most the number of pairs.
2. The number of pairs is $\binom{n}{2} = \frac{n(n-1)}{2}$. Why: each of the $n$ vertices can pair with $n - 1$ others, giving $n(n-1)$, but this counts a–b and b–a separately, so divide by 2.
3. In a directed graph, a→b and b→a are different arrows, so we do not divide by 2: $n(n-1)$.

**3. A tree has exactly $n - 1$ edges.**

Build any tree by growing it.

1. Start with 1 vertex and 0 edges: $0 = 1 - 1$.
2. A tree with at least 2 vertices always has a leaf (a vertex of degree 1). Reason: walk along edges without going back; since there is no cycle, you never revisit a vertex, so the walk must get stuck at some end vertex, which has only one edge.
3. Remove that leaf and its one edge. What is left is still connected and has no cycle, so it is still a tree, with one vertex and one edge fewer.
4. Repeat until 1 vertex is left. Each removal took away exactly 1 vertex and 1 edge, so vertices minus edges stayed equal to $1 - 0 = 1$ the whole time.
5. So for the original tree, $n - |E| = 1$, that is $|E| = n - 1$.

Fewer edges would leave it disconnected, and one more edge would create a cycle. So a tree is the "just enough" way to connect $n$ vertices.

**4. Storage cost.**

1. Matrix: $n$ rows times $n$ columns. For $n = 1000$, that is $1{,}000{,}000$ cells, even if there are only 3000 edges.
2. List: one entry per vertex (1000) plus one entry per edge end ($2 \times 3000 = 6000$ for an undirected graph). About 7000 cells, which grows like $|V| + |E|$.
3. A matrix answers "is $u$–$v$ an edge?" with one look at row $u$, column $v$: $O(1)$. A list must scan $u$'s neighbours, which takes up to $\deg(u)$ steps.

### Examples
**Example 1 (easy):** a graph has degrees 3, 3, 2, 2, 2. How many edges?

1. Add the degrees: $3 + 3 + 2 + 2 + 2 = 12$.
2. By the handshake lemma, $12 = 2|E|$.
3. Divide by 2: $|E| = 6$.

**Result:** 6 edges.

**Example 2 (medium):** can a simple graph have degrees 3, 3, 3, 2, 2?

1. Add the degrees: $3 + 3 + 3 + 2 + 2 = 13$.
2. The sum must equal $2|E|$, which is even. But 13 is odd.
3. Another view: there are three odd-degree vertices, and the count of odd-degree vertices must be even.

**Result:** impossible.

**Example 3 (GATE level):** how many edges does a complete graph on 6 vertices have, and what does reversing edges do to reachability?

1. A complete graph has an edge for every pair of vertices.
2. Pairs: $\binom{6}{2} = \frac{6 \cdot 5}{2} = 15$.
3. Reverse every edge of a directed graph $G$ to get $G^R$. A path $v \to a \to u$ in $G$ becomes $u \to a \to v$ in $G^R$, because each arrow flips.
4. So $v$ reaches $u$ in $G$ exactly when $u$ reaches $v$ in $G^R$ (2026 Q.40 used this).

**Result:** 15 edges; reversing all edges reverses every path.

### Common mistakes
> **Common mistake:** Forgetting the factor 2: the degree sum is $2|E|$, not $|E|$.

> **Common mistake:** Using $n(n-1)/2$ for a directed graph. With arrows, the maximum is $n(n-1)$.

### How GATE asks it
Not asked as its own topic in 2024–2026, but still in the syllabus. Its ideas sit inside traversal and shortest-path questions, such as the reversed graph in 2026 Q.40. A likely question: find the number of edges from degrees, or the space of a matrix vs a list.

### Summary
- First we drew connections as a graph: vertices for things, edges for links, with or without arrows and weights.
- Each edge has two ends, so the degrees always add to $2|E|$, and the number of odd-degree vertices is always even.
- At most one edge per pair gives the limits $\frac{n(n-1)}{2}$ (undirected) and $n(n-1)$ (directed).
- Removing leaves one by one shows a tree on $n$ vertices has exactly $n - 1$ edges: the fewest that keep everything connected.
- A matrix stores all $n^2$ pairs; a list stores only $|V| + |E|$ entries, which is why traversals use lists.
- Next topic builds on this: Graph Traversals (BFS/DFS), which walk through a graph stored as an adjacency list.

### Quick self-check
1. A tree has 10 vertices. How many edges?
**Answer:** $10 - 1 = 9$.
2. Max edges in a simple undirected graph with 5 vertices?
**Answer:** $\frac{5 \cdot 4}{2} = 10$.
3. 7 vertices each of degree 3: possible?
**Answer:** no; the sum $21$ is odd.

## Graph Traversals (BFS/DFS)

### The big idea
A **traversal** visits every vertex you can reach from a start vertex. **BFS** (breadth-first search) spreads out in rings, nearest first, using a **queue**. **DFS** (depth-first search) goes as deep as possible down one path, then backs up, using a **stack** (or recursion).

### Before you start
**Queue and stack (see topic: Stacks & Queues).** A queue gives back the oldest item first (FIFO); a stack gives back the newest item first (LIFO). BFS uses a queue and DFS uses a stack.

**Recursion and the call stack (see topic: Python Programming).** When a function calls itself, the unfinished calls wait on the call stack. Recursive DFS uses this hidden stack, so "backing up" just means a call returning.

**Graphs, degree and adjacency lists (see topic: Graph Theory Basics).** An adjacency list stores the neighbours of each vertex. By the handshake lemma, all the lists together have $2|E|$ entries in an undirected graph (and $|E|$ in a directed one).

**Sets for "seen".** A Python `set` answers "is $v$ in it?" in about one step, because it is a hash table (see topic: Hash Tables). Example: `seen = {"A"}; "A" in seen` is True.

**Directed graphs and cycles.** An arrow $u \to v$ can be followed only from $u$ to $v$. A directed cycle is a route that follows arrows and returns to its start, like $a \to b \to c \to a$.

**Big-O (see topic: Algorithm Complexity / Recurrences).** $O(|V| + |E|)$ means "time grows in proportion to the number of vertices plus the number of edges".

### Intuition
News spreads in a village. On day 1, the sarpanch tells his direct neighbours. On day 2, each of them tells their neighbours. On day 3, the next ring hears it. That is **BFS**: everyone at distance 1, then everyone at distance 2, and so on. It naturally finds the **fewest steps** from the start to everyone.

Now you explore a **maze**. You walk down one corridor as far as you can. At a dead end, you walk **back** to the last junction with an unexplored corridor, and try that one. That is **DFS**. Many new rooms are found while **backtracking**.

> **Intuition:** BFS = ripples in a pond (a queue: first discovered, first explored). DFS = a maze walker with a ball of thread (a stack: the most recent junction is revisited first).

Both visit **exactly the same set** of vertices (all reachable ones). Only the **order** differs. Both take $O(|V| + |E|)$ time with adjacency lists.

### Words you need
- **discovered (visited)**: seen for the first time. We mark it so we never visit it again.
- **adjacency order**: the order neighbours are listed. It decides the visiting order. Always follow the order the question gives.
- **tree edge**: an edge DFS uses to reach a new vertex.
- **back edge**: an edge from a vertex to an ancestor that is still active (on the current path). Back edges mean cycles.
- **forward / cross edge**: other edge types; they appear only in **directed** graphs. Undirected DFS has only tree and back edges.
- **topological order**: for a DAG, a line-up of vertices so every arrow $u \to v$ has $u$ before $v$. Like getting dressed: socks before shoes.
- **in-degree**: number of arrows coming into a vertex.

### Formulas, explained
**Traversal time**
$$O(|V| + |E|)$$
- **Read it as:** "time grows with vertices plus edges."
- **Symbols:** $|V|$ is the number of vertices, $|E|$ the number of edges.
- **Why it makes sense:** each vertex is taken out once, and each adjacency list is scanned once.
- **Use it when:** asked the cost of BFS, DFS or topological sort. With an adjacency matrix it becomes $O(|V|^2)$.

**BFS distance rule**
$$d[v] = d[u] + 1 \text{ when } v \text{ is first discovered from } u$$
- **Read it as:** "a new vertex is one step further than the vertex that found it."
- **Symbols:** $d[v]$ is the number of edges on the shortest path from the start to $v$.
- **Why it makes sense:** BFS finishes every vertex at distance $k$ before touching distance $k+1$.
- **Use it when:** shortest paths in an **unweighted** graph.

**Topological order check**
$$\text{for every edge } u \to v: \quad \text{position}(u) < \text{position}(v)$$
- **Read it as:** "for every arrow, the tail comes before the head in the line-up."
- **Symbols:** position$(u)$ is where $u$ stands in the proposed order (1st, 2nd, …).
- **Why it makes sense:** an arrow $u \to v$ means "$u$ must be done before $v$", like socks before shoes.
- **Use it when:** checking options in an MSQ. Test **every** edge; one failure rejects the option.

### Where the formulas come from
**1. Traversal time $O(|V| + |E|)$, counted step by step.**

Use the graph of Examples 1 and 2 (6 vertices, 6 edges).

1. Each vertex enters the queue at most once, because we mark it as seen at the moment we add it and never add a seen vertex. So there are at most $|V| = 6$ "take out" steps.
2. When a vertex is taken out, we scan its whole adjacency list once. The scans together read every list once.
3. The lists together hold $2|E| = 12$ entries, by the handshake lemma. Running BFS and counting confirms: 6 take-outs and 12 neighbour checks.
4. Each check is $O(1)$, because "is $v$ seen?" is a set lookup. So the total is about $6 + 12$, that is $|V| + 2|E|$, which is $O(|V| + |E|)$.
5. With a matrix, finding the neighbours of one vertex means reading its whole row of $|V|$ cells. Doing that for every vertex costs $|V| \times |V| = O(|V|^2)$, even if there are few edges.

DFS has the same count: each vertex is entered once, and each list is scanned once.

**2. Why BFS gives shortest distances, $d[v] = d[u] + 1$.**

1. The start has distance 0 and is the only item in the queue at first.
2. Taking out the start adds all its neighbours with $d = 1$. Now the queue holds only distance-1 vertices.
3. While those are taken out, they add distance-2 vertices **at the back**. Because a queue is FIFO, every distance-1 vertex is taken out before any distance-2 vertex.
4. So the queue always holds at most two neighbouring "rings", $k$ then $k+1$, in that order. Rings are finished one at a time.
5. Suppose $v$ is truly $k + 1$ steps from the start. Its neighbour $u$ on a shortest path is at distance $k$, so $u$ is taken out during ring $k$ and discovers $v$ (if nobody did earlier). No vertex at distance less than $k$ can be next to $v$, because then $v$ would be closer than $k + 1$. So $v$ is first found from ring $k$, and $d[v] = k + 1$ is correct.

This needs every edge to cost the same. With weights, a 1-edge path can be longer than a 3-edge path, which is why weighted graphs need Dijkstra (see topic: Shortest Paths).

**3. Why BFS and DFS reach the same set of vertices.**

1. Both start at $s$ and, whenever they visit a vertex, they eventually look at all its neighbours.
2. Suppose some vertex $v$ is reachable by a path $s \to a \to b \to v$, but was never visited. Walk along the path: $s$ was visited, so its neighbour $a$ was looked at and visited. Then $b$, then $v$. That contradicts "never visited".
3. And neither method can visit an unreachable vertex, because they only move along edges.
4. So both visit exactly the reachable vertices. Only the order differs, because the order depends on queue vs stack.

**4. Why a back edge means a cycle, and why undirected DFS has only tree and back edges.**

1. The active vertices form one path from the start to the current vertex (the recursion stack), joined by tree edges.
2. If the current vertex $u$ has an edge to an active ancestor $w$, then "$w$ down the tree path to $u$, then back to $w$" is a cycle. In Example 2, C sees A, giving A − B − E − F − C − A.
3. In an undirected graph, take any edge $u$–$v$ and say DFS reaches $u$ first. While $u$ is active, DFS will scan $u$'s list and reach $v$. So $v$ is found either directly through this edge (a tree edge), or earlier inside $u$'s exploration, making $v$ a descendant of $u$ (then the edge joins a vertex to its ancestor: a back edge). No other case is possible, so there are no forward or cross edges.

**5. Why a topological order exists exactly for DAGs.**

1. If there is a cycle $a \to b \to c \to a$, then $a$ must come before $b$, $b$ before $c$, and $c$ before $a$. That is impossible, so no order exists.
2. If there is no cycle, some vertex has in-degree 0. Reason: walk backwards along arrows from any vertex; without a cycle you can never repeat, so the walk must stop at a vertex with no incoming arrow.
3. Put that vertex first and delete it. The rest is still a DAG, so repeat. Every arrow points from an earlier-deleted vertex to a later one, so this gives a valid order. This is Kahn's algorithm, and it also runs in $O(|V| + |E|)$.

### Examples
Graph for Examples 1 and 2 (undirected), adjacency lists in alphabetical order:
A: B, C · B: A, D, E · C: A, F · D: B · E: B, F · F: C, E

```text
      A
     / \
    B   C
   / \   \
  D   E───F
```

**Example 1 (easy): BFS from A.** Queue front on the left.

| step | take out | new neighbours added | queue after | visit order |
|---|---|---|---|---|
| 1 | A | B, C | [B, C] | A |
| 2 | B | D, E (A already seen) | [C, D, E] | A B |
| 3 | C | F | [D, E, F] | A B C |
| 4 | D | none | [E, F] | A B C D |
| 5 | E | none (B, F seen) | [F] | A B C D E |
| 6 | F | none | [] | A B C D E F |

Distances: A = 0; B, C = 1; D, E, F = 2.

**Result:** BFS order A B C D E F; distances 0, 1, 1, 2, 2, 2.

**Example 2 (medium): DFS from A.** Recursion stack shown with the top on the right.

| step | at | action | stack after | visit order |
|---|---|---|---|---|
| 1 | A | discover A, go to B | [A, B] | A B |
| 2 | B | A seen; go to D | [A, B, D] | A B D |
| 3 | D | only B, seen; back up | [A, B] | A B D |
| 4 | B | go to E | [A, B, E] | A B D E |
| 5 | E | B seen; go to F | [A, B, E, F] | A B D E F |
| 6 | F | go to C | [A, B, E, F, C] | A B D E F C |
| 7 | C | A, F seen; back up all the way | [] | A B D E F C |

When C looks at A, A is an active ancestor, so **C − A is a back edge**. It reveals the cycle A − B − E − F − C − A.

```python
from collections import deque
adj = {'A': ['B', 'C'], 'B': ['A', 'D', 'E'], 'C': ['A', 'F'],
       'D': ['B'], 'E': ['B', 'F'], 'F': ['C', 'E']}
seen, q, bfs = {'A'}, deque(['A']), []
while q:
    u = q.popleft(); bfs.append(u)
    for v in adj[u]:
        if v not in seen:
            seen.add(v); q.append(v)
dfs_order, done = [], set()
def dfs(u):
    done.add(u); dfs_order.append(u)
    for v in adj[u]:
        if v not in done:
            dfs(v)
dfs('A')
print(bfs, dfs_order)   # prints: ['A', 'B', 'C', 'D', 'E', 'F'] ['A', 'B', 'D', 'E', 'F', 'C']
```

**Result:** DFS order A B D E F C; C − A is a back edge.

**Example 3 (GATE level).** Directed graph on vertices 0 to 9. Edges $i \to i+1$ and $i \to i+3$ (when the target is at most 9). Adjacency lists are in **decreasing** order, so $i+3$ is tried first. DFS from 0. How many vertices are discovered after vertex 6?

- Go deep with +3: 0 → 3 → 6 → 9. Vertex 9 has no out-edges.
- Back to 6: try 7 (6+1). From 7: 10 does not exist, try 8. From 8: 9 is seen. Back up.
- Back to 3: try 4. From 4: 7 seen, try 5. From 5: 8 and 6 seen. Back up.
- Back to 0: try 1. From 1: 4 seen, try 2. From 2: 5 and 3 seen. Done.

Discovery order: 0, 3, 6, 9, 7, 8, 4, 5, 1, 2. After 6 come 9, 7, 8, 4, 5, 1, 2: **7 vertices**.

**Result:** 7 vertices are discovered after 6.

### Common mistakes
> **Common mistake:** Forgetting that DFS discovers new vertices **while backtracking**. In Example 3, seven vertices come after 6, most of them on the way back.

> **Common mistake:** Ignoring the given adjacency order. A different order gives a different BFS/DFS sequence.

> **Common mistake:** Checking only some edges in a topological-order option. One violated edge makes the whole option wrong.

> **Common mistake:** Thinking BFS and DFS can reach different sets of vertices from the same start. They reach the same set; only the order differs.

### How GATE asks it
- **2024 Q.14**: in DFS of an undirected graph, the edge $(u, v)$ first explored from $u$ (closer to the start) becomes a **tree** edge (official key).
- **2024 Q.51**: which orderings are valid topological sorts of a DAG? Check every edge.
- **2025 Q.65**: DFS on $i \to i+1, i+2$ for 0..100, decreasing adjacency order; 75 vertices are discovered after 50.
- **2026 Q.40**: reachability in the reversed graph $G^R$; $u$ reachable from $v$ in $G$ means $v$ reachable from $u$ in $G^R$.

### Summary
- First we wanted to visit everything reachable from a start vertex, marking each vertex as seen so it is visited once.
- BFS uses a queue, so it finishes one ring of distance before the next; that is why it finds shortest paths in unweighted graphs.
- DFS uses a stack (or recursion), so it dives deep and discovers many vertices while backtracking.
- Both reach exactly the same vertices, and both cost $O(|V| + |E|)$ because each vertex is taken once and each adjacency list is read once.
- In DFS, an edge to an active ancestor (a back edge) proves a cycle; with no cycle, repeatedly removing an in-degree-0 vertex gives a topological order.
- Next topic builds on this: Shortest Paths, where edges have weights and BFS is replaced by Dijkstra's algorithm.

### Quick self-check
1. Which data structure does BFS use?
**Answer:** a queue (FIFO).
2. Edges $a \to b$, $a \to c$, $c \to b$. Is "a b c" a topological order?
**Answer:** No. Edge $c \to b$ needs c before b. "a c b" is the only valid order.
3. In an undirected graph, which DFS edge types can occur?
**Answer:** only tree edges and back edges.

## Shortest Paths

### The big idea
A **shortest path** is the cheapest route between two vertices. In an unweighted graph, "cheapest" means fewest edges. In a weighted graph, it means the smallest total weight (like total km).

### Before you start
**Graphs and weights (see topic: Graph Theory Basics).** A weighted graph puts a number on each edge, like the km of a road. $w(u, v)$ is the number on the edge from $u$ to $v$. Example: $w(\text{S}, \text{A}) = 4$.

**BFS (see topic: Graph Traversals).** BFS visits vertices ring by ring and gives fewest-edge distances. It is the shortest-path method when every edge costs the same.

**Infinity, $\infty$.** We write $\infty$ for "no route known yet". It behaves like a number bigger than every real number, so any real route cost is smaller: $7 < \infty$.

**Minimum.** $\min(a, b)$ is the smaller of $a$ and $b$. $\min(9, 7) = 7$. Relaxation is just "keep the minimum of the old cost and the new cost".

**Heap (priority queue).** A heap is a container that always hands out its **smallest** item first. Adding an item or removing the smallest costs $O(\log n)$ steps for $n$ items. Python has it as `heapq`. Example: push 5, 1, 3; pop gives 1.

**Big-O (see topic: Algorithm Complexity / Recurrences).** Time is measured by how it grows with $|V|$ and $|E|$.

### Intuition
You travel from Delhi to Chennai by train. One route has fewer stops. Another is shorter in km. Google Maps picks the route with the least total time. That is a shortest-path problem on a weighted graph.

**Dijkstra's algorithm** works like water spreading from the start city through pipes. The water reaches the nearest city first, then the next nearest, and so on. Once water reaches a city, no later route can reach it faster (if no pipe has negative length). So that city's distance is **final**.

> **Intuition:** Every piece of a shortest path is itself a shortest path. If the best Delhi → Chennai route passes through Nagpur, then its Delhi → Nagpur part must be the best Delhi → Nagpur route. Otherwise you could swap in the better piece and beat the "best" route.

### Words you need
- **weight** $w(u, v)$: the cost of the edge from $u$ to $v$, e.g. km or minutes.
- **source** $s$: the start vertex.
- **distance** $d[v]$: the current best known cost from $s$ to $v$. It starts at $\infty$ (infinity, "not reached yet").
- **relaxation**: checking if going through $u$ gives a cheaper route to $v$, and updating if so.
- **finalised**: Dijkstra's distance for that vertex will never change again.
- **negative cycle**: a loop whose total weight is below 0. Then "shortest" has no meaning, because you could loop forever.

### Formulas, explained
**Relaxation**
$$\text{if } d[u] + w(u,v) < d[v] \text{ then } d[v] = d[u] + w(u,v)$$
- **Read it as:** "if reaching v through u is cheaper than the best I knew, use it."
- **Symbols:** $d[u]$ is the best known cost to $u$; $w(u, v)$ is the edge cost.
- **Why it makes sense:** like finding a cheaper bus route via another town and updating your plan.
- **Use it when:** tracing Dijkstra or Bellman–Ford.

**Triangle inequality**
$$d(s, v) \le d(s, u) + w(u, v)$$
- **Read it as:** "the true shortest distance to v is never more than going to u first and then taking the edge u–v."
- **Symbols:** $d(s, v)$ is the true shortest distance.
- **Why it makes sense:** the route via $u$ is one possible route; the shortest is at most that.
- **Use it when:** ruling out edges. In an unweighted graph, neighbours' distances differ by at most 1. If an edge would create a shorter route than a given shortest path, that edge cannot exist (2025 Q.58).

**Which algorithm, and its time**

| situation | algorithm | time |
|---|---|---|
| unweighted | BFS | $O(\lvert V \rvert + \lvert E \rvert)$ |
| weights $\ge 0$ | Dijkstra (with a heap) | $O((\lvert V \rvert + \lvert E \rvert)\log \lvert V \rvert)$ |
| negative weights allowed | Bellman–Ford | $O(\lvert V \rvert \cdot \lvert E \rvert)$ |
| all pairs | Floyd–Warshall | $O(\lvert V \rvert^3)$ |

### Where the formulas come from
**1. The triangle inequality: one route is an upper limit for the best route.**

1. Suppose the best route from $s$ to $u$ costs 5 and the edge $u \to v$ costs 2.
2. Then "go to $u$ the best way, then take the edge" is a real route to $v$ costing $5 + 2 = 7$.
3. The shortest route to $v$ is the cheapest of **all** routes, so it is at most 7.
4. In symbols: $d(s, v) \le d(s, u) + w(u, v)$.

In an unweighted graph every $w$ is 1. Using the inequality in both directions along an edge $u$–$v$ shows that neighbours' distances differ by at most 1. That is the test used in Example 3.

**2. Relaxation: the triangle inequality turned into an update.**

1. $d[v]$ is our best known cost so far, not yet the true answer.
2. If $d[u] + w(u, v) < d[v]$, then the route through $u$ beats what we knew, so the true shortest distance is at most $d[u] + w(u, v)$. We lower $d[v]$ to it.
3. If not, we keep $d[v]$. Either way, the new value is $\min(d[v],\ d[u] + w(u, v))$.
4. Relaxation never makes $d[v]$ smaller than the true distance, because it only ever writes the cost of a real route.

**3. Pieces of a shortest path are shortest.**

1. Suppose the best S → D route is S → B → A → C → D (cost 7) and its S → C piece costs 4.
2. If some other S → C route cost 3, we could use it and then C → D (3), getting $3 + 3 = 6 < 7$.
3. That beats the "best" route, which is impossible. So the S → C piece must already be a best S → C route.

This is why building distances out of smaller best distances (relaxation) works at all.

**4. Why Dijkstra's "finalise the smallest" is correct (when weights are $\ge 0$).**

1. Look at the moment Dijkstra picks the unfinished vertex $x$ with the smallest $d[x]$. Say $d[x] = 4$.
2. Any other route to $x$ must leave the finished region at some unfinished vertex $y$. The vertex just before $y$ is finished, and its edge to $y$ was relaxed, so the route's cost up to $y$ is at least $d[y]$. And $d[y] \ge 4$, because $x$ had the smallest tentative value.
3. The rest of the route, from $y$ to $x$, adds edges of weight $\ge 0$, so the total is still $\ge 4$.
4. So no route can beat 4, and $d[x]$ is final.

Step 3 is where "no negative edges" is used. **Counterexample:** directed edges S → A (2), S → B (5), B → A ($-4$). Dijkstra finalises A at 2 first. But S → B → A costs $5 - 4 = 1$. Running Dijkstra in Python gives A = 2 (wrong), while Bellman–Ford gives A = 1 (right).

**5. Where the running times come from.**

**Dijkstra with a heap.**

1. Each vertex is taken out of the heap as "smallest" and finalised once: $|V|$ removals.
2. Each edge is relaxed at most once from each end, and each successful relaxation pushes into the heap: at most about $|E|$ pushes (twice that for undirected).
3. Each heap push or removal costs $O(\log |V|)$ (the heap size stays at most a fixed multiple of $|E|$, and $\log |E| \le 2 \log |V|$).
4. Total: $(|V| + |E|) \times O(\log |V|)$.

**Bellman–Ford.**

1. A shortest path with no cycle visits each vertex at most once, so it has at most $|V| - 1$ edges.
2. One round relaxes every edge. After round 1, every vertex whose best path has 1 edge is correct. After round 2, those with 2 edges, and so on, because each round extends correct distances by one more edge.
3. So $|V| - 1$ rounds are enough, each costing $|E|$ relaxations: $O(|V| \cdot |E|)$.

**Floyd–Warshall.** It has three loops inside each other: for each possible middle vertex $k$, for each start $i$, for each end $j$, try "go through $k$". That is $|V| \times |V| \times |V| = O(|V|^3)$ checks, each $O(1)$.

### Examples
**Example 1 (easy): unweighted.** Path a − b − c − d is given as a shortest path, so $d(a, d) = 3$. Could there be an edge b − d? Then a − b − d has length 2 < 3. Contradiction. So no.

**Result:** the edge b − d cannot exist.

**Example 2 (medium): Dijkstra.** Undirected weighted edges: S−A 4, S−B 1, B−A 2, A−C 1, B−C 5, C−D 3, B−D 8. Source S. Each row finalises the unfinished vertex with the smallest distance, then relaxes its edges.

| finalise | S | A | B | C | D | updates made |
|---|---|---|---|---|---|---|
| start | 0 | ∞ | ∞ | ∞ | ∞ | - |
| S (0) | 0 | 4 | 1 | ∞ | ∞ | A = 0+4, B = 0+1 |
| B (1) | 0 | 3 | 1 | 6 | 9 | A = 1+2 = 3 < 4; C = 1+5; D = 1+8 |
| A (3) | 0 | 3 | 1 | 4 | 9 | C = 3+1 = 4 < 6 |
| C (4) | 0 | 3 | 1 | 4 | 7 | D = 4+3 = 7 < 9 |
| D (7) | 0 | 3 | 1 | 4 | 7 | none |

Shortest path to D: S → B → A → C → D, cost $1 + 2 + 1 + 3 = 7$. The direct-looking B − D edge (cost 8) loses.

**Result:** the shortest cost from S to D is 7, by S → B → A → C → D.

**Example 3 (GATE level).** In a simple unweighted undirected graph, p − q − r − s is a shortest path from p to s, and p − x − y is a shortest path from p to y. Which of these edges can **not** exist: (q, s), (x, r), (p, y)?
- (q, s): gives p − q − s of length 2 < 3. **Cannot exist.**
- (p, y): gives p − y of length 1 < 2. **Cannot exist.**
- (x, r): gives p − x − r of length 2 to r. The given path reaches r in 2 too (p − q − r), so nothing gets shorter. p − x − r − s is 3, not shorter. **May exist.**

**Result:** (q, s) and (p, y) cannot exist; (x, r) may exist.

### Common mistakes
> **Common mistake:** Using Dijkstra with negative edges. A vertex finalised early might later get a cheaper route. Use Bellman–Ford.

> **Common mistake:** In "which edge cannot exist", checking only one given path. Check the new edge against **every** stated shortest path.

> **Common mistake:** Finalising a vertex because it was updated most recently. Always finalise the **smallest** tentative distance.

### How GATE asks it
- **2025 Q.58**: given three shortest paths of length 3, which edges cannot be in $G$? (b, d), (b, h) and (e, g) would each create a shorter path; (b, g) does not.

### Summary
- First we noticed that any route gives an upper limit on the best route: the triangle inequality $d(s, v) \le d(s, u) + w(u, v)$.
- Turning that into an update gives relaxation: if going through $u$ is cheaper, lower $d[v]$.
- Because pieces of a shortest path are themselves shortest, good distances can be built from smaller good distances.
- With no negative edges, the smallest unfinished distance can never be beaten, so Dijkstra finalises vertices in that order in $O((|V| + |E|) \log |V|)$.
- Negative edges break that argument, so Bellman–Ford instead relaxes every edge $|V| - 1$ times; for unweighted graphs BFS is enough.
- This idea is used later in AI: search algorithms like uniform-cost search and A* are Dijkstra with extra guidance (see the Artificial Intelligence subject).

### Quick self-check
1. Which algorithm for shortest paths in an unweighted graph?
**Answer:** BFS.
2. $d[u] = 5$, $w(u, v) = 2$, $d[v] = 9$. After relaxing (u, v)?
**Answer:** $5 + 2 = 7 < 9$, so $d[v] = 7$.
3. Why does Dijkstra fail with negative edges?
**Answer:** a finalised distance could later be improved by a negative edge, but Dijkstra never revisits it.
