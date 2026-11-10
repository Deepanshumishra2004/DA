# Probability & Statistics

Think about a cricket match. Before the toss, nobody knows who will bat first. Before a ball is bowled, nobody knows if it will be a four, a dot ball or a wicket. But we are not completely lost. We know a good batter hits more fours. We know a toss is 50-50. **Probability** is the maths that puts numbers on this kind of uncertainty. It answers questions like "how likely is it?" and "what will happen on average?".

**Statistics** goes the other way. It starts with data that already happened (marks of 60 students, runs in 100 matches) and asks: what is the average, how spread out is it, and what can we say about the bigger population?

**Why it matters for data science and AI.** Almost every machine learning model is built on probability. A spam filter uses **Bayes theorem**. Logistic regression outputs a probability. Model errors are often assumed to follow a **normal distribution** (the bell curve). When you test whether a new model is really better, you use **hypothesis testing**. If you understand this subject, a large part of machine learning becomes easy to read.

**How GATE DA tests it.** This is the highest-mark subject in the paper. In 2024 to 2026 it had **34 questions worth 55 marks**: 15 marks in 2024, 19 in 2025 and 21 in 2026. So its share is growing. There were 16 MCQs (one correct option), 14 NATs (you type a number, often "round to two decimals") and 4 MSQs (one or more options correct). Most questions are short calculations once you know the right formula and the right idea. The heaviest topic is **Continuous Distributions** (9 questions, 14 marks). Then come **Central Limit Theorem**, **Expectation/Variance** and **Covariance/Correlation**.

**What you need before starting:** school algebra, the idea of a fraction and a percentage, basic integration (area under a curve) and the sum of a geometric series.

**Study order (and why).** Go in the order of the sections below. Counting gives you the "number of ways". Basic probability uses counting. Bayes uses conditional probability. Random variables turn outcomes into numbers. Distributions are ready-made random variables. Joint distributions handle two variables at once. Descriptive statistics summarise data. CLT explains why the bell curve is everywhere. Finally, confidence intervals and tests use all of the above.

**Free resources:**
- **StatQuest with Josh Starmer** (YouTube): very simple videos on distributions, p-values, CLT and Bayes.
- **Harvard Stat 110** (Joe Blitzstein) lectures on YouTube, and his free book *Introduction to Probability*.
- **NPTEL Probability and Statistics** (IIT Kharagpur), free on the NPTEL website and YouTube.

## Counting & Combinatorics

### The big idea
Counting is the skill of finding "how many ways" something can happen, without writing every way down.

In probability we often need two counts: the number of **favourable** ways and the number of **total** ways. Probability is then favourable divided by total, so good counting is the first tool you need.

### Before you start
This is the first topic, so it needs only school arithmetic. Here are the few ideas it uses.

**Multiplying and adding.** You know $3 \times 4 = 12$ and $3 + 4 = 7$. In counting, "and then" becomes multiply and "or" becomes add. We will see why below.

**Powers.** $2^5$ means "multiply 2 by itself 5 times": $2 \times 2 \times 2 \times 2 \times 2 = 32$. The small number on top (the **exponent**) says how many times.

**A set.** A set is a group of different things written inside curly brackets. Example: $\{1, 2, 3\}$ is a set with 3 elements. The order inside does not matter: $\{1,2,3\}$ and $\{3,1,2\}$ are the same set.

**Size of a set.** $|A|$ means "how many elements are in $A$". If $A = \{a, b, c\}$, then $|A| = 3$.

**Union and intersection.** $A \cup B$ (read "A union B") means "in $A$ or in $B$ or in both". $A \cap B$ (read "A intersect B") means "in both $A$ and $B$". Example: $A=\{1,2,3\}$, $B=\{3,4\}$. Then $A \cup B = \{1,2,3,4\}$ and $A \cap B = \{3\}$.

**A function.** A function is a rule that takes an input and gives exactly one output. Example: $f(n) = n + 1$ sends 3 to 4. We write $f(3) = 4$. The notation $f(f(n))$ means "apply the rule, then apply it again to the answer".

### Intuition
Imagine you have 3 shirts and 2 trousers. How many different outfits can you wear?

Pick a shirt first: 3 choices. For each shirt, pick a trouser: 2 choices. So the outfits are $3 \times 2 = 6$.

This is the **multiplication rule**: when you do one step **and then** another step, multiply the choices.

Now suppose for dinner you can eat either a dosa (4 types) or a pizza (3 types), but not both. You have $4 + 3 = 7$ choices.

This is the **addition rule**: when you do one thing **or** another (never both), add the choices.

Next, think about a class of 5 students. The teacher wants a **captain and a vice-captain**. The captain can be any of 5 students, and the vice-captain can be any of the remaining 4.

That gives $5 \times 4 = 20$ ways. Here **order matters**: (Ravi captain, Sita vice) is different from (Sita captain, Ravi vice).

But if the teacher only wants a **team of 2** for a quiz, then (Ravi, Sita) and (Sita, Ravi) are the same team. Each team was counted twice in the 20, so the number of teams is $20 / 2 = 10$. Here **order does not matter**.

> **Intuition:** Before using any formula, ask two questions. (1) Does the **order** matter? (2) Can the same item be used **again** (repetition)? The answers tell you which formula to use.

One more picture: **stars and bars**. You have 10 identical laddoos to share among 3 friends (someone may get zero).

Write the laddoos as stars: ★★★★★★★★★★. Put 2 bars to cut the row into 3 parts. For example ★★★|★★★★★|★★ means 3, 5, 2.

Every way of sharing is one arrangement of 10 stars and 2 bars. So we only need to choose which 2 of the 12 positions are bars.

### Words you need
- **Factorial** $n!$: the product $n \times (n-1) \times \dots \times 1$. Example: $4! = 4\times3\times2\times1 = 24$. Also $0! = 1$ by definition.
- **Permutation**: an arrangement where order matters. Example: captain and vice-captain.
- **Combination**: a selection where order does not matter. Example: a team of 2.
- **Subset**: any group taken from a set, including the empty group. Example: $\{1,3\}$ is a subset of $\{1,2,3\}$.
- **Empty set** $\emptyset$: the set with nothing in it. It is a subset of every set.
- **Bijection**: a function that pairs every element with exactly one element, with nothing left out. Example: a seating plan where each student gets one seat and each seat gets one student.
- **Complement counting**: count what you do NOT want, then subtract from the total. Example: "at least one" = total minus "none".

### Formulas, explained

**Factorial (arranging everything)**

$$n! = n \times (n-1) \times \dots \times 2 \times 1$$

- **Read it as:** "n factorial is the product of all whole numbers from n down to 1."
- **Symbols:** $n$ = number of different objects.
- **Why it makes sense:** the first place has $n$ choices, the next has $n-1$, and so on (multiplication rule).
- **Use it when:** you arrange all $n$ different objects in a row.

**Permutation (ordered selection)**

$$^nP_r = \frac{n!}{(n-r)!}$$

- **Read it as:** "the number of ways to choose $r$ things out of $n$ and put them in order."
- **Symbols:** $n$ = total objects, $r$ = how many you pick.
- **Why it makes sense:** it is $n \times (n-1) \times \dots$ for $r$ steps. Dividing by $(n-r)!$ cuts off the steps you did not do.
- **Use it when:** positions or ranks are different (captain/vice-captain, gold/silver/bronze).

**Combination (unordered selection)**

$$\binom{n}{r} = \frac{n!}{r!\,(n-r)!}$$

- **Read it as:** "n choose r."
- **Symbols:** $n$ = total objects, $r$ = how many you pick.
- **Why it makes sense:** take the ordered count $^nP_r$. Every group of $r$ was counted $r!$ times (all its orders). So divide by $r!$.
- **Use it when:** you choose a team, a committee, or a hand of cards.

**Number of subsets**

$$\text{subsets of an } n\text{-element set} = 2^n, \qquad \text{non-empty subsets} = 2^n - 1$$

- **Read it as:** "two to the power n."
- **Symbols:** $n$ = number of elements.
- **Why it makes sense:** each element has 2 choices: in or out. Multiply 2 by itself $n$ times. Only one subset (the empty set) has every element "out".
- **Use it when:** a question picks a "random subset" or "random non-empty subset".

**Stars and bars (sharing identical items)**

$$\text{non-negative solutions of } x_1+\dots+x_k=n \;=\; \binom{n+k-1}{k-1}$$

$$\text{positive solutions } (x_i \ge 1) \;=\; \binom{n-1}{k-1}$$

- **Read it as:** "the number of ways to share $n$ identical items among $k$ people is $(n+k-1)$ choose $(k-1)$."
- **Symbols:** $n$ = number of identical items (stars), $k$ = number of people (boxes), so $k-1$ bars.
- **Why it makes sense:** we arrange $n$ stars and $k-1$ bars in a row of $n+k-1$ places, and choose which places are bars.
- **Use it when:** "integer solutions", "distribute identical balls into boxes".

**Inclusion-exclusion**

$$|A \cup B| = |A| + |B| - |A \cap B|$$

- **Read it as:** "the size of A or B equals size of A plus size of B minus the overlap."
- **Symbols:** $|A|$ = number of items in $A$; $A \cup B$ = in A or B (or both); $A \cap B$ = in both.
- **Why it makes sense:** items in both groups were counted twice, so subtract them once.
- **Use it when:** "divisible by 2 or 3", "knows Hindi or English".

**Circular arrangements**

$$\text{ways to seat } n \text{ people at a round table} = (n-1)!$$

- **Read it as:** "n minus one, factorial."
- **Symbols:** $n$ = number of people.
- **Why it makes sense:** rotating everyone one seat gives the same arrangement. Fix one person, then arrange the other $n-1$.
- **Use it when:** round table, necklace-type seating.

### Where the formulas come from
Every formula in this topic comes from just **two rules**: the multiplication rule and the addition rule. Let us first see why those two rules are true, then build everything else.

**A. The multiplication rule**

1. Take 3 shirts (S1, S2, S3) and 2 trousers (T1, T2). List all outfits as a grid: rows are shirts, columns are trousers.
2. The grid has 3 rows and 2 columns, so it has $3 \times 2 = 6$ boxes. Each box is one outfit, because each outfit is one (shirt, trouser) pair.
3. In general, if step 1 has $a$ choices and step 2 has $b$ choices (whatever you chose in step 1), the grid has $a$ rows and $b$ columns. So there are $a \times b$ ways, because a grid of $a$ rows and $b$ columns has $a \times b$ boxes.
4. For more steps, repeat the idea: $a \times b \times c \times \dots$

**B. The addition rule**

1. Dosa list: 4 items. Pizza list: 3 items. You eat one item from one list.
2. Put both lists together: there are $4 + 3 = 7$ items. This is allowed **because** no item is on both lists, so nothing is counted twice.
3. If items **can** be on both lists, we must fix the double counting. That is inclusion-exclusion (part G below).

**C. Factorial $n!$**

1. Arrange 3 people A, B, C in 3 chairs.
2. Chair 1: any of 3 people, so 3 choices.
3. Chair 2: one person is already seated, so 2 choices.
4. Chair 3: only 1 person left, so 1 choice.
5. Multiplication rule: $3 \times 2 \times 1 = 6$. Check by listing: ABC, ACB, BAC, BCA, CAB, CBA. Six.
6. With $n$ people the same steps give $n \times (n-1) \times \dots \times 1 = n!$.

Why is $0! = 1$? There is exactly one way to arrange nothing: do nothing. It also makes the formulas below work when $r = 0$ or $r = n$.

**D. Permutation $^nP_r$ is a "stopped" factorial**

1. Choose gold, silver and bronze from 8 runners: $8 \times 7 \times 6 = 336$ (3 steps of the multiplication rule).
2. Notice $8! = 8 \times 7 \times 6 \times \underbrace{5 \times 4 \times 3 \times 2 \times 1}_{5!}$.
3. So $8 \times 7 \times 6 = \dfrac{8!}{5!}$, because dividing by $5!$ cancels the tail we did not use.
4. Here $5 = 8 - 3$. In general, $r$ steps from $n$ leave a tail of $(n-r)!$, so

$$^nP_r = n(n-1)\cdots(n-r+1) = \frac{n!}{(n-r)!}$$

**E. Combination $\binom{n}{r}$ is a permutation with repeats removed**

1. Ordered pairs of 2 from 5 students: $^5P_2 = 5 \times 4 = 20$.
2. Each team, say {Ravi, Sita}, appears in this list $2! = 2$ times: (Ravi, Sita) and (Sita, Ravi).
3. So the number of teams is $20 / 2 = 10$.
4. In general each group of $r$ people can be put in order in $r!$ ways (part C). So every group was counted $r!$ times in $^nP_r$. Divide:

$$\binom{n}{r} = \frac{^nP_r}{r!} = \frac{n!}{r!\,(n-r)!}$$

So the combination formula is just formula D divided by formula C.

**F. Number of subsets $2^n$**

1. Take the set $\{a, b, c\}$. To build a subset, go through the elements one by one.
2. For $a$: in or out (2 choices). For $b$: 2 choices. For $c$: 2 choices.
3. Multiplication rule: $2 \times 2 \times 2 = 8$. The list is $\emptyset$, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}.
4. With $n$ elements, you get $2^n$ subsets.
5. Only one choice sequence says "out, out, ..., out", and that gives the empty set. So non-empty subsets $= 2^n - 1$.

Another way to see it: subsets of size 0, 1, 2, ... add up to all subsets. So $\binom{n}{0} + \binom{n}{1} + \dots + \binom{n}{n} = 2^n$. For $n = 3$: $1 + 3 + 3 + 1 = 8$.

**G. Inclusion-exclusion**

1. In a class, 10 students know Hindi ($A$) and 8 know English ($B$). 3 of them know both.
2. If we add $10 + 8 = 18$, the 3 "both" students are counted once in $A$ and once in $B$, so twice.
3. We want each student counted once, so subtract the overlap once: $18 - 3 = 15$.
4. In symbols: $|A \cup B| = |A| + |B| - |A \cap B|$. This is the addition rule (part B) with a correction for double counting.

**H. Stars and bars**

1. Share 4 identical sweets among 3 friends, zero allowed. Write the 4 sweets as stars and use $3 - 1 = 2$ bars to split them into 3 groups.
2. Example: ★|★★|★ means (1, 2, 1). And ||★★★★ means (0, 0, 4).
3. Every sharing gives exactly one row of 4 stars and 2 bars, and every row gives one sharing. So counting sharings = counting rows. This one-to-one matching is a bijection.
4. A row has $4 + 2 = 6$ places. We choose which 2 places hold bars; the rest are stars. Order of choosing places does not matter, so this is $\binom{6}{2} = 15$ (part E).
5. In general: $n$ stars, $k - 1$ bars, $n + k - 1$ places, choose $k-1$ of them for bars:

$$\binom{n+k-1}{k-1}$$

6. For **positive** solutions ($x_i \ge 1$), first give each of the $k$ people 1 item. That uses $k$ items, so $n - k$ are left.
7. Share those $n - k$ freely with the formula from step 5: $\binom{(n-k)+k-1}{k-1} = \binom{n-1}{k-1}$.

**I. Circular arrangements $(n-1)!$**

1. Seat A, B, C round a table. In a row there are $3! = 6$ orders.
2. At a round table, ABC, BCA and CAB are the same seating: everyone just moved one seat. Each seating appears 3 times in the 6 row orders.
3. So round seatings $= 6 / 3 = 2$.
4. In general, each round seating appears $n$ times (one for each rotation), so $\dfrac{n!}{n} = (n-1)!$. This equals "fix one person, arrange the other $n-1$".

### Examples

**Example 1 (easy):** A cafe has 4 sandwiches, 3 drinks and 2 desserts. A combo has one of each. How many combos? Also, how many ways to choose 3 students out of 6 for a project?

1. A combo is sandwich **and** drink **and** dessert, so multiply: $4 \times 3 \times 2 = 24$.
2. For students, swapping two chosen students gives the same project group, so order does not matter. Use a combination.
3. $\binom{6}{3} = \dfrac{6!}{3!\,3!} = \dfrac{720}{6 \times 6} = \dfrac{720}{36} = 20$.

**Result:** 24 combos and 20 student groups.

**Example 2 (medium):** How many integer solutions does $x_1+x_2+x_3=10$ have with every $x_i \ge 2$?

1. Give each variable 2 first. That uses $3 \times 2 = 6$. Left over: $10 - 6 = 4$.
2. Write $x_i = 2 + y_i$. Now we need $y_1+y_2+y_3=4$ with $y_i \ge 0$.
3. Stars and bars with $n=4$, $k=3$: $\binom{4+3-1}{3-1} = \binom{6}{2} = \dfrac{6 \times 5}{2} = 15$.

**Result:** 15 solutions.

**Example 3 (GATE level):** A program outputs a random non-negative integer solution of $x_1+x_2+x_3=10$, all solutions equally likely. What is the probability that every $x_i$ is positive?

1. Total non-negative solutions: $\binom{10+3-1}{3-1} = \binom{12}{2} = \dfrac{12 \times 11}{2} = 66$.
2. Positive solutions: $\binom{10-1}{3-1} = \binom{9}{2} = \dfrac{9 \times 8}{2} = 36$.
3. All solutions are equally likely, so probability = favourable / total $= \dfrac{36}{66} = \dfrac{6}{11}$.

**Result:** $\dfrac{6}{11} \approx 0.545$.

**Example 4 (GATE level):** How many bijections $f$ on $\{1,2,3,4,5\}$ satisfy $f(f(n)) = n$ for all $n$?

1. Applying $f$ twice must bring every element back to itself.
2. So each element is either **fixed** ($f(a)=a$) or **swapped** with one partner ($f(a)=b$, $f(b)=a$). A 3-cycle like $1 \to 2 \to 3 \to 1$ would not return in 2 steps, so it is not allowed.
3. 0 swaps: everyone is fixed, 1 way.
4. 1 swap: choose the pair, $\binom{5}{2} = 10$ ways.
5. 2 swaps: choose the first pair $\binom{5}{2}=10$, then the second pair from the remaining 3, $\binom{3}{2}=3$. The two pairs have no order, so divide by 2: $\dfrac{10 \times 3}{2} = 15$.
6. 3 swaps would need 6 elements, but we have only 5, so 0 ways.
7. These cases never overlap, so add them (addition rule): $1 + 10 + 15 = 26$.

**Result:** 26 bijections.

### Common mistakes
> **Common mistake:** Using a permutation when order does not matter. A "team" or "committee" is a combination. Ask: if I swap two chosen people, is it a different result?

> **Common mistake:** In stars and bars, writing $\binom{n+k-1}{k}$ instead of $\binom{n+k-1}{k-1}$. The bottom number is the number of **bars**, which is $k-1$.

> **Common mistake:** Forgetting the empty set. "Non-empty subset" means $2^n - 1$ choices, not $2^n$.

> **Common mistake:** When counting pairs (like two swaps), forgetting to divide by the number of orders of the pairs. $\{12, 34\}$ and $\{34, 12\}$ are the same pairing.

### How GATE asks it
- **2026 Q.20:** a random non-negative solution of $n_1+n_2+n_3+n_4=20$. Probability that all are positive $= \binom{19}{3} / \binom{23}{3}$. Pure stars and bars. The wrong options used 4 at the bottom instead of $k-1=3$.
- **2026 Q.33:** count bijections on $\{1,2,3,4\}$ with $f(f(n))=n$. Only fixed points and swaps are allowed: $1 + \binom{4}{2} + 3 = 10$.
- Counting also sits inside probability questions. **2026 Q.19** needed "non-empty subsets $= 2^n - 1$".

> **GATE tip:** When you see "at least", "not all" or "non-empty", think about the complement first. It is usually a shorter count.

### Summary
- First we learned two basic rules: "and then" means **multiply**, and "or" (with no overlap) means **add**.
- Using the multiplication rule again and again, arranging $n$ things gives $n!$, and arranging only $r$ of them gives $^nP_r = n!/(n-r)!$.
- When order does not matter, each group was counted $r!$ times, so we divide and get $\binom{n}{r}$.
- Each element of a set is "in" or "out", so there are $2^n$ subsets; removing the empty one gives $2^n - 1$.
- Sharing identical items is the same as placing bars between stars, so it becomes a choose problem: $\binom{n+k-1}{k-1}$.
- When groups overlap, we add and then subtract the overlap once (inclusion-exclusion).
- Next topic builds on this: **Basic Probability**, where probability = favourable count / total count.

### Quick self-check
1. How many ways can 3 prizes (gold, silver, bronze) go to 8 runners?

**Answer:** Order matters: $8 \times 7 \times 6 = 336$.

2. How many non-negative integer solutions does $a+b+c+d=5$ have?

**Answer:** $\binom{5+4-1}{4-1} = \binom{8}{3} = 56$.

3. How many non-empty subsets does $\{1,2,3,4,5\}$ have?

**Answer:** $2^5 - 1 = 31$.

## Basic Probability & Conditional Probability

### The big idea
**Probability** is a number between 0 and 1 that says how likely something is. 0 means "impossible", 1 means "sure".

**Conditional probability** is the probability of something **after** you learn a new fact.

### Before you start
**Counting (see topic: Counting & Combinatorics).** You need to count "how many ways". The tools are the multiplication rule, $\binom{n}{r}$ ("n choose r"), and $2^n$ for the number of subsets.

**Fractions, decimals and percentages.** $\frac{3}{10}$, $0.3$ and $30\%$ are the same number. A probability can be written in any of these forms, but it always lies between 0 and 1 (0% and 100%).

**Sets.** A set is a group of things in curly brackets, like $\{2, 4, 6\}$. $A \cup B$ means "in A or B (or both)", and $A \cap B$ means "in both A and B". Example: $\{2,4,6\} \cap \{4,5,6\} = \{4,6\}$.

**Powers.** $\left(\frac{5}{6}\right)^3$ means $\frac56 \times \frac56 \times \frac56 = \frac{125}{216}$. We use this when the same thing happens again and again.

**The "if and only if" arrow.** $X \iff Y$ means "X is true exactly when Y is true". The two statements always go together.

### Intuition
Roll one fair die. There are 6 faces, all equally likely. The chance of getting an even number is "3 good faces out of 6", so $3/6 = 0.5$.

That is the basic idea: **favourable ÷ total**, when all outcomes are equally likely.

Now your friend rolls the die, hides it, and says: "It is more than 3." Now only 4, 5, 6 are possible. Out of these, 4 and 6 are even, so the chance of even is now $2/3$.

The new fact **shrank the world** from 6 outcomes to 3. That is conditional probability.

> **Intuition:** Conditional probability means "zoom in". Throw away all outcomes that the new fact rules out. Then count again inside the smaller world.

Two more ideas confuse many students:
- **Mutually exclusive** events cannot happen together. Example: in one toss, "head" and "tail".
- **Independent** events do not affect each other. Example: a coin toss in Delhi and a coin toss in Chennai.

These are very different. If two events are mutually exclusive and one happens, the other surely did not. So they **strongly affect** each other: they are NOT independent (unless one has probability 0).

Last picture: "at least one". Suppose you roll 10 dice and want at least one six. Counting all the ways to get one, two, three... sixes is painful.

Instead count the opposite: "no six at all". Then subtract from 1.

### Words you need
- **Experiment**: anything with an uncertain result. Example: tossing a coin.
- **Outcome**: one possible result. Example: "Head".
- **Sample space** $\Omega$ (omega): the set of all outcomes. Example: for one die, $\{1,2,3,4,5,6\}$.
- **Event**: a group of outcomes we care about. Example: "even" $= \{2,4,6\}$.
- **Complement** $A^c$: "A does not happen". Example: complement of "even" is "odd".
- **Intersection** $A \cap B$: A **and** B both happen. Example: "even and more than 3" $=\{4,6\}$.
- **Union** $A \cup B$: A **or** B (or both). Example: "even or more than 3" $= \{2,4,5,6\}$.
- **Mutually exclusive (disjoint)**: $A \cap B$ is empty. Example: "1" and "6" in one roll.
- **Independent**: knowing one gives no information about the other. Example: two separate coins.

### Formulas, explained

**Classical probability**

$$P(A) = \frac{\text{number of outcomes in } A}{\text{total number of outcomes}}$$

- **Read it as:** "probability of A is favourable over total."
- **Symbols:** $P(A)$ = probability of event $A$.
- **Why it makes sense:** if all outcomes are equally likely, each gets an equal share of the total probability 1.
- **Use it when:** dice, coins, cards, random subsets: all outcomes equally likely.

**Complement rule**

$$P(A^c) = 1 - P(A), \qquad P(\text{at least one}) = 1 - P(\text{none})$$

- **Read it as:** "the chance that A does not happen is one minus the chance that it does."
- **Symbols:** $A^c$ = "not A".
- **Why it makes sense:** either A happens or it does not. Together they make 1.
- **Use it when:** you see "at least one", "not all", "some".

**Addition rule (union)**

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

- **Read it as:** "probability of A or B equals P of A plus P of B minus P of both."
- **Symbols:** $A \cup B$ = A or B; $A \cap B$ = A and B.
- **Why it makes sense:** outcomes in both were added twice, so remove them once. If A and B are mutually exclusive, the last term is 0.
- **Use it when:** "A or B" questions.

**Conditional probability**

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) > 0$$

- **Read it as:** "probability of A given B equals probability of A and B, divided by probability of B."
- **Symbols:** the bar $\mid$ means "given that". $B$ is the fact we already know.
- **Why it makes sense:** $B$ is the new, smaller world. Inside it, we want the part where $A$ also happens. Dividing by $P(B)$ rescales the small world so its total is 1.
- **Use it when:** "given that", "if we know that", "after observing".

**Multiplication rule**

$$P(A \cap B) = P(A \mid B)\,P(B) = P(B \mid A)\,P(A)$$

- **Read it as:** "the chance of both equals the chance of the first times the chance of the second given the first."
- **Symbols:** same as above.
- **Why it makes sense:** it is the conditional formula rearranged. First B must happen, then A must happen inside B.
- **Use it when:** events happen in steps (draw a card, then another).

**Independence**

$$A, B \text{ independent} \iff P(A \cap B) = P(A)\,P(B) \iff P(A \mid B) = P(A)$$

- **Read it as:** "A and B are independent when the chance of both is the product of their chances."
- **Symbols:** $\iff$ = "exactly when".
- **Why it makes sense:** knowing B does not change the chance of A, so $P(A \mid B) = P(A)$. Put this into the multiplication rule.
- **Use it when:** separate coins, separate dice, "independent trials".

For $n$ independent trials, each with success chance $p$:

$$P(\text{at least one success}) = 1 - (1-p)^n$$

**Law of total probability**

$$P(A) = P(A \mid B)\,P(B) + P(A \mid B^c)\,P(B^c)$$

- **Read it as:** "the total chance of A is the chance through B plus the chance through not-B."
- **Symbols:** $B^c$ = "not B".
- **Why it makes sense:** split the world into two cases. Find A's chance in each case and weight by how likely the case is.
- **Use it when:** the answer depends on which "case" or "box" or "machine" happened. This is the bottom part of Bayes theorem.

### Where the formulas come from
All formulas here grow from one starting point: **probability = share of the total**. Think of the total probability 1 as one whole roti, shared among the outcomes.

**A. Classical probability**

1. A fair die has 6 faces, and "fair" means each face gets the same share of the roti.
2. Six equal shares make 1, so each share is $\frac16$.
3. The event "even" contains 3 faces, so it gets 3 shares: $3 \times \frac16 = \frac36$.
4. In general, with $N$ equally likely outcomes, each has $\frac1N$, and an event with $k$ outcomes has $\frac{k}{N}$. That is favourable ÷ total.

This only works when the outcomes are **equally likely**. That is why we use counting (previous topic) to find $k$ and $N$.

**B. Complement rule**

1. Every outcome is either inside $A$ or inside $A^c$, never both.
2. So the shares of $A$ and $A^c$ together make the whole roti: $P(A) + P(A^c) = 1$.
3. Move $P(A)$ to the other side: $P(A^c) = 1 - P(A)$.
4. "At least one six" has the complement "no six at all". So $P(\text{at least one}) = 1 - P(\text{none})$.

**C. Addition rule**

1. Roll a die. $A$ = even $= \{2,4,6\}$, $B$ = more than 3 $= \{4,5,6\}$.
2. $A \cup B = \{2,4,5,6\}$, which has 4 faces, so $P(A \cup B) = \frac46$.
3. If we just add, $P(A) + P(B) = \frac36 + \frac36 = \frac66$. That is too big.
4. The faces 4 and 6 are in both, so they were added twice. Their share is $P(A \cap B) = \frac26$.
5. Remove them once: $\frac66 - \frac26 = \frac46$. Correct.
6. In general: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$. This is the inclusion-exclusion idea from the counting topic, divided by the total.

**D. Conditional probability**

1. Same die. We are told "more than 3", so the world is now $B = \{4,5,6\}$.
2. Inside this world, the even faces are $\{4, 6\}$. That is exactly $A \cap B$.
3. Counting inside the small world: $P(A \mid B) = \dfrac{2}{3}$.
4. Now write the same thing with probabilities instead of counts. Divide top and bottom by 6 (the old total): $\dfrac{2/6}{3/6} = \dfrac{P(A \cap B)}{P(B)}$.
5. This step is allowed because dividing top and bottom of a fraction by the same number does not change it.
6. So in general:

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$

The division by $P(B)$ makes the new small world have total 1 again. We need $P(B) > 0$, because we cannot divide by 0.

**E. Multiplication rule**

1. Start from formula D: $P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$.
2. Multiply both sides by $P(B)$: $P(A \cap B) = P(A \mid B)\,P(B)$.
3. The roles of $A$ and $B$ can be swapped, because "A and B" is the same event as "B and A". So also $P(A \cap B) = P(B \mid A)\,P(A)$.

Example: draw 2 cards without putting back. $P(\text{both aces}) = \frac{4}{52} \times \frac{3}{51}$, because after the first ace only 3 aces are left in 51 cards.

**F. Independence**

1. "Independent" means: learning $B$ does not change the chance of $A$. In symbols, $P(A \mid B) = P(A)$.
2. Put this into the multiplication rule E: $P(A \cap B) = P(A \mid B)\,P(B) = P(A)\,P(B)$.
3. So independence is the same as "the chance of both = product of chances".

Now the "at least one" formula for $n$ independent trials:

1. Each trial fails with chance $1 - p$.
2. All $n$ trials fail: multiply, because they are independent. $P(\text{none}) = (1-p)^n$.
3. Complement rule B: $P(\text{at least one}) = 1 - (1-p)^n$.

**G. Law of total probability**

1. A shop gets bulbs from two factories. Factory B makes 60% of bulbs and 2% of its bulbs are faulty. The other factory makes 40% and 5% of its bulbs are faulty.
2. Every faulty bulb came from B or from not-B. These two cases do not overlap, so we can add (addition rule with zero overlap).
3. $P(\text{faulty and from B}) = 0.02 \times 0.60 = 0.012$ by the multiplication rule E.
4. $P(\text{faulty and not B}) = 0.05 \times 0.40 = 0.020$.
5. Add: $P(\text{faulty}) = 0.012 + 0.020 = 0.032$.
6. In symbols: $P(A) = P(A \cap B) + P(A \cap B^c) = P(A \mid B)P(B) + P(A \mid B^c)P(B^c)$.

So the law of total probability is just "split into cases" + multiplication rule + addition rule.

### Examples

**Example 1 (easy):** A bag has 3 red and 7 blue balls. You draw one. What is P(red)? What is P(not red)?

1. There are $3 + 7 = 10$ balls, all equally likely. Red ones: 3.
2. $P(\text{red}) = \dfrac{3}{10} = 0.3$.
3. Complement rule: $P(\text{not red}) = 1 - 0.3 = 0.7$.

**Result:** $P(\text{red}) = 0.3$, $P(\text{not red}) = 0.7$.

**Example 2 (medium):** Two fair dice are rolled. Given that the sum is 8, what is the probability that at least one die shows 6?

1. Make the small world. Pairs with sum 8: $(2,6), (3,5), (4,4), (5,3), (6,2)$. That is 5 equally likely outcomes.
2. Inside it, pairs with a 6: $(2,6)$ and $(6,2)$. That is 2.
3. $P(\text{a six} \mid \text{sum}=8) = \dfrac{2}{5} = 0.4$.
4. Compare: without the information, $P(\text{at least one six}) = 1 - \left(\frac{5}{6}\right)^2 = 1 - \frac{25}{36} = \frac{11}{36} \approx 0.306$.

**Result:** $0.4$. The new fact changed the chance from about $0.306$ to $0.4$.

**Example 3 (GATE level):** A non-empty subset $M$ of $\{1,2,\dots,10\}$ is chosen at random (all non-empty subsets equally likely). What is the probability that the product of the elements of $M$ is even?

1. Total non-empty subsets: $2^{10} - 1 = 1024 - 1 = 1023$.
2. Complement: the product is **odd** only if every element is odd. The odd numbers are $1,3,5,7,9$: 5 of them.
3. Non-empty subsets of these 5 odd numbers: $2^5 - 1 = 31$.
4. Even-product subsets: $1023 - 31 = 992$.
5. $P = \dfrac{992}{1023}$.
6. Sanity check: the answer is close to 1. That makes sense, because a random subset almost always contains some even number.

**Result:** $\dfrac{992}{1023} \approx 0.970$.

**Example 4 (independence check):** Roll two dice. $A$ = "sum is 7", $B$ = "first die is 3". Are they independent?

1. There are 36 equally likely pairs. Sum 7 happens for 6 pairs, so $P(A) = \frac{6}{36} = \frac16$.
2. $P(B) = \frac16$, because the first die shows 3 in 6 of the 36 pairs.
3. $A \cap B$ is only $(3,4)$, so $P(A \cap B) = \frac{1}{36}$.
4. $P(A)P(B) = \frac16 \times \frac16 = \frac1{36}$. This equals $P(A \cap B)$.

**Result:** $A$ and $B$ are independent.

### Common mistakes
> **Common mistake:** Thinking "mutually exclusive" means "independent". Disjoint events with positive probability are always dependent: if one happens, the other cannot.

> **Common mistake:** For "at least one", adding probabilities like $\frac16 + \frac16 + \dots$. This can go above 1. Use $1 - P(\text{none})$.

> **Common mistake:** Confusing $P(A \mid B)$ with $P(B \mid A)$. "Probability of rain given clouds" is not "probability of clouds given rain".

> **Common mistake:** Counting the empty set when the question says "non-empty". The total becomes $2^n - 1$.

### How GATE asks it
- **2024 Q.12:** 3 coins. $T$ = at least 2 heads, $S$ = at least 2 tails. Heads + tails $= 3$, so both cannot happen. $P(T \cap S) = 0$. The trap option 0.5 is $P(T)$.
- **2025 Q.45:** 100 dice, at least one shows 1. Answer $1 - \left(\frac56\right)^{100}$. Complement plus independence.
- **2026 Q.19:** random non-empty subset of $\{1,\dots,2026\}$, product even. Answer $\frac{2^{1013}(2^{1013}-1)}{2^{2026}-1}$. Trap: the option with $2^{2026}$ in the denominator counts the empty set.

> **GATE tip:** These are mostly 1-mark MCQs. They test whether you spot the **complement** or the **disjointness**, not heavy calculation. Spend 30 seconds thinking, then 30 seconds calculating.

### Summary
- First we said probability is a share of the total 1. When outcomes are equally likely, it is favourable ÷ total, so counting gives the answer.
- "Not A" takes the rest of the share, so $P(A^c) = 1 - P(A)$. This makes "at least one" questions easy.
- For "A or B" we add, then remove the double-counted overlap once.
- A new fact shrinks the world to $B$. Inside it, $P(A \mid B) = P(A \cap B)/P(B)$, and rearranging gives the multiplication rule.
- If learning $B$ changes nothing, the events are independent and $P(A \cap B) = P(A)P(B)$.
- Splitting into cases and adding gives the law of total probability.
- Next topic builds on this: **Bayes Theorem** turns $P(A \mid B)$ around into $P(B \mid A)$ using exactly these rules.

### Quick self-check
1. A coin is tossed 5 times. What is P(at least one head)?

**Answer:** $1 - \left(\frac12\right)^5 = 1 - \frac{1}{32} = \frac{31}{32} \approx 0.969$.

2. $P(A) = 0.5$, $P(B) = 0.4$, $P(A \cap B) = 0.2$. Are A and B independent? What is $P(A \cup B)$?

**Answer:** $0.5 \times 0.4 = 0.2$, so yes. $P(A \cup B) = 0.5 + 0.4 - 0.2 = 0.7$.

3. $P(A \cap B) = 0.12$ and $P(B) = 0.3$. Find $P(A \mid B)$.

**Answer:** $\frac{0.12}{0.3} = 0.4$.

## Bayes Theorem

### The big idea
Bayes theorem lets you **reverse** a conditional probability.

You usually know "if the cause, how likely is the evidence?" Bayes gives you "given the evidence, how likely is the cause?".

### Before you start
**What probability is (see topic: Basic Probability & Conditional Probability).** A probability is a number from 0 to 1 that tells how likely something is. Example: a fair coin shows heads with probability $0.5$.

**"Given" means "zoom in".** $P(A \mid B)$ is read "probability of A given B". It is the chance of A **after** we know B happened. Example: a die shows more than 3; given this, P(even) $= \frac23$ because only 4, 5, 6 remain and 2 of them are even.

**"And" means both.** $P(A \cap B)$ is the chance that A and B **both** happen. Example: on a die, "even and more than 3" is $\{4, 6\}$, so $P = \frac26$.

**The multiplication rule.** $P(A \cap B) = P(A \mid B)\,P(B)$. In words: chance of both = chance of B, times chance of A once B has happened. Example: P(pick Bag 1 and draw red) = $\frac12 \times \frac45$.

**Complement.** $B^c$ (also written $\bar{B}$) means "not B". Its probability is $1 - P(B)$. Example: if 30% are sick, then 70% are not sick.

**The sum symbol $\sum$.** $\sum_{i=1}^{3} x_i$ means "add $x_1 + x_2 + x_3$". The letter $i$ just counts from the bottom number (1) to the top number (3). Example: if $x_1 = 2, x_2 = 5, x_3 = 1$, then $\sum_{i=1}^{3} x_i = 8$.

**Law of total probability (see topic: Basic Probability).** To find the total chance of A, split into cases, find A's chance in each case, and add. Example: $P(A) = P(A \mid B)P(B) + P(A \mid B^c)P(B^c)$.

### Intuition
A doctor knows how a test behaves: "If a person has the disease, the test is positive 80% of the time." But a patient wants the reverse answer: "My test is positive. What is the chance I really have the disease?"

These two numbers are **not** the same. Bayes theorem connects them.

Let us build it with 100 people. Suppose:
- 30 out of 100 people have the disease (30%).
- If sick, the test is positive 80% of the time. So $0.8 \times 30 = 24$ sick people test positive.
- If healthy, the test is still positive 10% of the time (a false alarm). There are 70 healthy people, so $0.1 \times 70 = 7$ healthy people test positive.

Now look only at the people who tested positive: $24 + 7 = 31$ people. Of these, 24 are really sick. So

$$P(\text{sick} \mid \text{positive}) = \frac{24}{31} \approx 0.77$$

That is the whole of Bayes theorem. You did not need any formula.

> **Intuition:** Bayes = "Out of everyone who shows the evidence, what fraction came from this cause?" Make a list of all the ways the evidence can happen. Your answer is your way divided by all the ways.

A **tree diagram** is the fastest exam tool. Draw one branch for each cause. On each branch write (chance of cause) $\times$ (chance of evidence given that cause).

Then add all the branches that show the evidence. Divide your branch by this total.

Why does this matter for AI? A **Naive Bayes** spam filter does exactly this. It knows how often words like "offer" appear in spam and in normal mail, and reverses this to find "probability this mail is spam, given it contains 'offer'".

### Words you need
- **Cause / hypothesis** $B_i$: the possible "reasons" or "sources", exactly one of which is true. Example: Box 1, Box 2, Box 3; or "sick" and "healthy".
- **Evidence** $A$: what you actually observed. Example: "a white ball came out", "the test is positive".
- **Prior** $P(B_i)$: how likely the cause was **before** you saw the evidence. Example: 30% of people are sick.
- **Likelihood** $P(A \mid B_i)$: how likely the evidence is **if** that cause is true. Example: P(positive | sick) $= 0.8$.
- **Posterior** $P(B_i \mid A)$: how likely the cause is **after** seeing the evidence. This is what Bayes gives you.
- **Partition**: a list of cases that do not overlap and together cover everything. Example: "sick" and "healthy" form a partition of all people.
- **Sensitivity**: P(positive | sick). **Specificity**: P(negative | healthy). **False positive rate** $= 1 -$ specificity.

### Formulas, explained

**Bayes theorem (two causes)**

$$P(B \mid A) = \frac{P(A \mid B)\,P(B)}{P(A \mid B)\,P(B) + P(A \mid B^c)\,P(B^c)}$$

- **Read it as:** "the probability of B given A equals the probability of the B-branch divided by the total probability of A."
- **Symbols:** $B$ = the cause we ask about, $B^c$ = the other case (not B), $A$ = the evidence.
- **Why it makes sense:** the top is the chance of "B and A both happen". The bottom is the chance of A by any route (law of total probability). The ratio is the share of A that came from B.
- **Use it when:** you are given $P(\text{evidence} \mid \text{cause})$ and asked for $P(\text{cause} \mid \text{evidence})$.

**Bayes theorem (many causes)**

$$P(B_j \mid A) = \frac{P(A \mid B_j)\,P(B_j)}{\sum_{i=1}^{k} P(A \mid B_i)\,P(B_i)}$$

- **Read it as:** "posterior of cause $j$ equals its branch divided by the sum of all branches."
- **Symbols:** $B_1, \dots, B_k$ = all possible causes (a partition). $\sum_{i=1}^{k}$ means "add up for $i = 1$ to $k$".
- **Why it makes sense:** same as before, but now there are $k$ routes to the evidence instead of 2.
- **Use it when:** 3 boxes, 3 machines, 3 factories, etc.

**Total probability (the denominator)**

$$P(A) = \sum_{i=1}^{k} P(A \mid B_i)\,P(B_i)$$

- **Read it as:** "the total chance of the evidence is the sum over all causes of (prior times likelihood)."
- **Symbols:** same as above.
- **Why it makes sense:** the evidence must come through exactly one cause. Add the chance through each.
- **Use it when:** always, as step 1 of a Bayes question. Sometimes GATE asks only for this number.

**Odds form (quick check)**

$$\frac{P(B \mid A)}{P(B^c \mid A)} = \frac{P(B)}{P(B^c)} \times \frac{P(A \mid B)}{P(A \mid B^c)}$$

- **Read it as:** "posterior odds equal prior odds times the likelihood ratio."
- **Symbols:** **odds** of an event = (chance it happens) ÷ (chance it does not).
- **Why it makes sense:** the denominators $P(A)$ cancel when you divide the two Bayes formulas.
- **Use it when:** checking your answer quickly, or when options are given as odds.

### Where the formulas come from
Bayes theorem is not a new law. It is the multiplication rule used **twice**, plus the law of total probability. Let us build it step by step.

**A. Bayes for two causes, with the 100-people example**

1. We know $P(\text{sick}) = 0.3$, $P(+ \mid \text{sick}) = 0.8$, $P(+ \mid \text{healthy}) = 0.1$. We want $P(\text{sick} \mid +)$.
2. Write the definition of conditional probability: $P(\text{sick} \mid +) = \dfrac{P(\text{sick} \cap +)}{P(+)}$. This is allowed because it is just the meaning of "given" (zoom into the positive group).
3. Top: use the multiplication rule the **other** way round: $P(\text{sick} \cap +) = P(+ \mid \text{sick})\,P(\text{sick}) = 0.8 \times 0.3 = 0.24$. Allowed because "sick and positive" is the same event as "positive and sick".
4. Bottom: a positive result comes from a sick person **or** a healthy person, never both. So by the law of total probability, $P(+) = 0.8 \times 0.3 + 0.1 \times 0.7 = 0.24 + 0.07 = 0.31$.
5. Divide: $\dfrac{0.24}{0.31} \approx 0.77$. This matches the "24 out of 31 people" count.

Now repeat with symbols. Write $B$ for the cause and $A$ for the evidence.

1. Definition of "given": $P(B \mid A) = \dfrac{P(B \cap A)}{P(A)}$.
2. Multiplication rule on the top: $P(B \cap A) = P(A \mid B)\,P(B)$.
3. Total probability on the bottom: $P(A) = P(A \mid B)P(B) + P(A \mid B^c)P(B^c)$.
4. Put steps 2 and 3 into step 1:

$$P(B \mid A) = \frac{P(A \mid B)\,P(B)}{P(A \mid B)\,P(B) + P(A \mid B^c)\,P(B^c)}$$

So the top of Bayes is "your branch", and the bottom is "all branches". The bottom always contains the top as one of its terms.

**B. Many causes**

1. Suppose there are 3 boxes $B_1, B_2, B_3$, and exactly one of them is chosen. They form a partition.
2. The evidence $A$ must come through exactly one box. So $P(A) = P(A \cap B_1) + P(A \cap B_2) + P(A \cap B_3)$, by the addition rule (no overlaps).
3. Each piece is a branch: $P(A \cap B_i) = P(A \mid B_i)P(B_i)$, by the multiplication rule.
4. So $P(A) = \sum_{i=1}^{3} P(A \mid B_i)P(B_i)$. With $k$ boxes, the sum goes to $k$. This is the total probability formula.
5. The top for box $j$ is still $P(A \mid B_j)P(B_j)$. So the many-cause formula is just formula A with a longer bottom.

**C. Odds form**

1. Write Bayes for $B$: $P(B \mid A) = \dfrac{P(A \mid B)P(B)}{P(A)}$.
2. Write Bayes for $B^c$: $P(B^c \mid A) = \dfrac{P(A \mid B^c)P(B^c)}{P(A)}$.
3. Divide step 1 by step 2. The $P(A)$ on both bottoms cancels, because $\dfrac{x / c}{y / c} = \dfrac{x}{y}$.
4. What is left: $\dfrac{P(B \mid A)}{P(B^c \mid A)} = \dfrac{P(B)}{P(B^c)} \times \dfrac{P(A \mid B)}{P(A \mid B^c)}$.
5. With our numbers: prior odds $\frac{0.3}{0.7}$, likelihood ratio $\frac{0.8}{0.1} = 8$. Posterior odds $= \frac{0.3}{0.7} \times 8 = \frac{24}{7}$. Probability $= \dfrac{24/7}{1 + 24/7} = \dfrac{24}{31}$. Same answer.

To turn odds $o$ back into a probability, use $p = \dfrac{o}{1+o}$. This is because odds $= \dfrac{p}{1-p}$; solving for $p$ gives $p = \dfrac{o}{1+o}$.

### Examples

**Example 1 (easy):** Bag 1 has 4 red and 1 blue ball. Bag 2 has 1 red and 4 blue balls. You pick a bag by tossing a fair coin, then draw one ball. It is red. What is the chance it came from Bag 1?

1. Bag 1 branch: $\frac12 \times \frac45 = \frac{4}{10}$.
2. Bag 2 branch: $\frac12 \times \frac15 = \frac{1}{10}$.
3. Total red: $\frac{4}{10} + \frac{1}{10} = \frac{5}{10}$.
4. $P(\text{Bag 1} \mid \text{red}) = \dfrac{4/10}{5/10} = \dfrac45$.

**Result:** $0.8$.

**Example 2 (medium):** 20% of emails are spam. The word "offer" appears in 50% of spam and 5% of normal emails. An email contains "offer". What is the chance it is spam?

1. Spam branch: $0.2 \times 0.5 = 0.10$.
2. Normal branch: $0.8 \times 0.05 = 0.04$.
3. Total $P(\text{offer}) = 0.10 + 0.04 = 0.14$.
4. $P(\text{spam} \mid \text{offer}) = \dfrac{0.10}{0.14} = \dfrac{10}{14} \approx 0.714$.
5. Odds check: prior odds $= \frac{0.2}{0.8} = 0.25$. Likelihood ratio $= \frac{0.5}{0.05} = 10$. Posterior odds $= 0.25 \times 10 = 2.5$. Probability $= \frac{2.5}{1 + 2.5} = \frac{2.5}{3.5} \approx 0.714$. Same answer.

**Result:** about $0.714$.

**Example 3 (GATE level):** A factory has three machines. Machine M1 makes 50% of the items, M2 makes 30%, M3 makes 20%. Their defect rates are 1%, 2% and 3%. A randomly chosen item is defective. What is the probability it was made by M3? (Round to two decimals.)

1. M1 branch: $0.5 \times 0.01 = 0.005$.
2. M2 branch: $0.3 \times 0.02 = 0.006$.
3. M3 branch: $0.2 \times 0.03 = 0.006$.
4. Total $P(\text{defective}) = 0.005 + 0.006 + 0.006 = 0.017$.
5. $P(\text{M3} \mid \text{defective}) = \dfrac{0.006}{0.017} \approx 0.353$.
6. Sanity check: M3 makes only 20% of items but has the highest defect rate. So its share among defective items rises from 0.20 to 0.35. That direction makes sense.

**Result:** $0.35$.

**Example 4 (the rare-disease surprise):** A disease affects 1% of people. The test catches 90% of sick people, but also gives a positive result for 5% of healthy people. You test positive. What is the chance you are sick?

1. Sick branch: $0.01 \times 0.9 = 0.009$.
2. Healthy branch: $0.99 \times 0.05 = 0.0495$.
3. Total $= 0.009 + 0.0495 = 0.0585$.
4. $P(\text{sick} \mid +) = \dfrac{0.009}{0.0585} \approx 0.154$.
5. Why so small? The disease is so rare that most positive results are false alarms from the large healthy group.

**Result:** only about 15%.

### Common mistakes
> **Common mistake:** Mixing up $P(B)$ and $P(B^c)$. If the question gives $P(\bar T) = 0.6$, then $P(T) = 0.4$. Write both down before you start.

> **Common mistake:** Assuming the causes are equally likely. If the question says "Box 1 is chosen with probability 1/2", use 1/2, not 1/3.

> **Common mistake:** Answering with the likelihood $P(A \mid B)$ instead of the posterior $P(B \mid A)$. The 80% test accuracy is not the 77% answer.

> **Common mistake:** Rounding the branches too early. GATE ranges are tight (like 0.76 to 0.78). Keep fractions until the last step.

### How GATE asks it
All three past questions were straightforward 1-2 mark NATs:
- **2024 Q.58:** given $P(\bar T) = 0.6$, $P(S \mid T) = 0.3$, $P(S \mid \bar T) = 0.6$. Find $P(T \mid S) = \frac{0.3 \times 0.4}{0.3 \times 0.4 + 0.6 \times 0.6} = \frac{0.12}{0.48} = 0.25$. Trap: using 0.6 as $P(T)$.
- **2025 Q.31:** three boxes chosen with probabilities $\frac12, \frac16, \frac13$. A white ball is drawn. $P(\text{Box 2} \mid W) = \frac{1/9}{4/9} = 0.25$. Trap: treating boxes as equally likely.
- **2026 Q.57:** disease test with 30% prevalence, 80% sensitivity, 10% false positive. $P(D \mid +) = \frac{0.24}{0.31} \approx 0.77$.

> **GATE tip:** Always do it in 3 lines: (1) list every branch as prior $\times$ likelihood, (2) add them, (3) divide. A 3-box question should take under 2 minutes.

### Summary
- We usually know "evidence given cause", but we want "cause given evidence". Bayes turns one into the other.
- First we write $P(B \mid A) = P(B \cap A) / P(A)$, which is just the meaning of "given".
- Then the multiplication rule gives the top: $P(A \mid B)P(B)$, one branch of the tree.
- The law of total probability gives the bottom: the sum of all branches that lead to the evidence.
- So the posterior is "my branch ÷ all branches". A rare cause stays fairly unlikely even after strong evidence.
- Next topic builds on this: **Random Variables**, which turn outcomes into numbers. Later, Bayes is the base of the Naive Bayes classifier and of Bayesian thinking in ML.

### Quick self-check
1. $P(B) = 0.5$, $P(A \mid B) = 0.6$, $P(A \mid B^c) = 0.2$. Find $P(B \mid A)$.

**Answer:** $\frac{0.3}{0.3 + 0.1} = 0.75$.

2. In question 1, what is $P(A)$?

**Answer:** $0.5 \times 0.6 + 0.5 \times 0.2 = 0.3 + 0.1 = 0.4$.

3. Two coins: one fair, one with heads on both sides. You pick one at random and toss it. It shows heads. Chance it is the two-headed coin?

**Answer:** $\frac{0.5 \times 1}{0.5 \times 1 + 0.5 \times 0.5} = \frac{0.5}{0.75} = \frac23$.

## Random Variables & Expectation/Variance

### The big idea
A **random variable** is a number that comes from a random experiment, like "number of heads in 3 tosses". Its **expectation** is its long-run average. Its **variance** tells how much it spreads around that average.

### Before you start
**Probability of an event (see topic: Basic Probability).** $P(A)$ is a number from 0 to 1 that says how often event $A$ happens in the long run. Example: a fair die shows 6 with $P = \frac16$, so about 1 roll in 6.

**All probabilities add to 1.** Something must happen. For a die, $\frac16 + \frac16 + \frac16 + \frac16 + \frac16 + \frac16 = 1$.

**What a function is.** A function is a rule that takes an input and gives one output. Example: $g(x) = x^2$ takes 3 and gives 9. We write $g(X)$ when we apply the rule to a random number $X$.

**The sum symbol $\sum$.** $\sum_x$ means "add up the thing that follows, once for every value of $x$". Example: if $x$ can be 1, 2, 3, then $\sum_x x^2 = 1 + 4 + 9 = 14$.

**The integral $\int$ as a continuous sum.** $\int_a^b f(x)\,dx$ is the **area** under the curve $f$ between $a$ and $b$. Think of it as cutting the range into very thin strips and adding "height times width" for every strip. Example: $\int_0^1 2x\,dx = [x^2]_0^1 = 1 - 0 = 1$ (a triangle of base 1 and height 2 has area 1).

**Square and square root.** $(-3)^2 = 9$ and $3^2 = 9$, so squaring makes every number non-negative. $\sqrt{9} = 3$ undoes the square for positive numbers.

**Absolute value $\lvert a \rvert$.** It is the size of a number without its sign. Example: $\lvert -2 \rvert = 2$, $\lvert 5 \rvert = 5$.

**Independent events (see topic: Basic Probability).** $A$ and $B$ are independent when $P(A \cap B) = P(A)\,P(B)$. Here $A \cap B$ means "both $A$ and $B$ happen". Example: two dice both show 6 with chance $\frac16 \times \frac16 = \frac{1}{36}$.

### Intuition
Think of a simple game at a school fair. You roll a die. If it shows 6, you win Rs 10. Otherwise you win nothing.

The amount you win is a random variable. Call it $X$. It is either 10 or 0.

If you play 600 times, about 100 rolls show 6. You win about $100 \times 10 = 1000$ rupees in total. Per game, that is $1000 / 600 \approx 1.67$ rupees.

This long-run average per game is the **expectation**:

$$E[X] = 10 \times \tfrac16 + 0 \times \tfrac56 \approx 1.67$$

> **Intuition:** Expectation is a **weighted average**. Each value is weighted by how often it happens. It is also the "balance point": if you put weights on a ruler at each value, the ruler balances at $E[X]$.

Now compare two batters. Both average 40 runs. Batter A scores 38, 42, 40, 39, 41. Batter B scores 0, 100, 5, 90, 5.

The averages are the same, but B is much more "risky". **Variance** measures this. It is the average of the **squared distance** from the mean, and B's distances are large, so B's variance is large.

Why squared? Distances above and below the mean would cancel if we just added them (the plain deviations always sum to zero). Squaring makes them all positive.

The **standard deviation** (SD) is the square root of variance. It brings the unit back to "runs" instead of "runs squared".

There are two kinds of random variables:
- **Discrete**: takes separate values you can list, like 0, 1, 2, 3 (number of heads).
- **Continuous**: can take any value in a range, like 2.371 seconds (waiting time). For these, the chance of one exact value is 0. We only talk about the chance of a range, which is an **area** under a curve.

### Words you need
- **Random variable (RV)** $X$: a number decided by chance. Example: the sum of two dice.
- **pmf (probability mass function)** $p(x) = P(X = x)$: for discrete RVs, the chance of each value. Example: for a fair die, $p(3) = \frac16$.
- **pdf (probability density function)** $f(x)$: for continuous RVs, a curve whose **area** gives probability. Example: $P(1 \le X \le 2) = \int_1^2 f(x)\,dx$.
- **CDF (cumulative distribution function)** $F(x) = P(X \le x)$: the chance of being at most $x$. Example: for a fair die, $F(2) = \frac26$.
- **Expectation / mean** $E[X]$ or $\mu$ (mu): the long-run average.
- **Variance** $\mathrm{Var}(X)$ or $\sigma^2$ (sigma squared): average squared distance from the mean.
- **Standard deviation** $\sigma$: square root of variance.
- **Indicator** $I_A$: equals 1 if event $A$ happens, else 0. Example: $I_{\text{head}}$ for one toss.
- **Independent RVs**: knowing one tells nothing about the other. In symbols, $P(X = x, Y = y) = P(X = x)\,P(Y = y)$ for every pair of values. Example: two different dice.
- **Covariance** $\mathrm{Cov}(X,Y) = E[XY] - E[X]E[Y]$: measures whether $X$ and $Y$ move together. It is 0 for independent RVs. (Full details in the topic: Descriptive Statistics, Covariance & Correlation.)
- **Constant**: a fixed number that is not random, like 3 or $-2$. The average of a constant is the constant itself: $E[c] = c$.

### Formulas, explained

**Expectation**

$$E[X] = \sum_x x\,p(x) \quad \text{(discrete)}$$

$$E[X] = \int_{-\infty}^{\infty} x\,f(x)\,dx \quad \text{(continuous)}$$

- **Read it as:** "the expected value of X is the sum of each value times its probability."
- **Symbols:** $x$ = a possible value, $p(x)$ = its probability, $f(x)$ = density.
- **Why it makes sense:** it is a weighted average. An integral is just a sum over a continuous range.
- **Use it when:** "expected number", "mean", "average value".

**Expectation of a function**

$$E[g(X)] = \sum_x g(x)\,p(x) \quad \text{or} \quad \int g(x)\,f(x)\,dx$$

- **Read it as:** "to find the average of $g(X)$, apply $g$ to each value and weight by probability."
- **Symbols:** $g$ = any rule, for example $g(x) = x^2$. Then $E[X^2] = \sum x^2 p(x)$.
- **Why it makes sense:** $g(X)$ takes the value $g(x)$ exactly when $X = x$, so it happens with the same probability $p(x)$.
- **Use it when:** you need $E[X^2]$ for a variance, or the average of any formula in $X$.

**Variance**

$$\mathrm{Var}(X) = E\big[(X - \mu)^2\big] = E[X^2] - (E[X])^2$$

- **Read it as:** "variance is the mean of the square minus the square of the mean."
- **Symbols:** $\mu = E[X]$.
- **Why it makes sense:** the first form is the definition (average squared distance from the mean). The second form is the same number, but faster to compute (see the derivation below).
- **Use it when:** any variance calculation. Also use it backwards: $E[X^2] = \mathrm{Var}(X) + (E[X])^2$.

**Linearity of expectation**

$$E[aX + bY + c] = a\,E[X] + b\,E[Y] + c$$

- **Read it as:** "the average of a sum is the sum of the averages."
- **Symbols:** $a, b, c$ = fixed numbers (constants).
- **Why it makes sense:** if every student's marks go up by 5, the class average goes up by 5. If marks double, the average doubles. This works **even when $X$ and $Y$ are dependent**.
- **Use it when:** expected sums, expected counts.

**Variance of a linear change**

$$\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X), \qquad \mathrm{SD}(aX+b) = \lvert a \rvert\,\mathrm{SD}(X)$$

- **Read it as:** "adding a constant does not change variance; multiplying by $a$ multiplies variance by $a$ squared."
- **Symbols:** $a, b$ = constants.
- **Why it makes sense:** adding 5 marks to everyone shifts the whole class, but the spread stays the same. Doubling marks doubles every distance, so squared distances become 4 times bigger.
- **Use it when:** $Y = 3X - 2$ type questions, or converting units.

**Variance of a sum**

$$\mathrm{Var}(X \pm Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) \pm 2\,\mathrm{Cov}(X, Y)$$

- **Read it as:** "the variance of a sum is the two variances plus twice the covariance."
- **Symbols:** $\mathrm{Cov}(X,Y) = E[XY] - E[X]E[Y]$.
- **Why it makes sense:** if $X$ and $Y$ tend to move together, they push the sum further, so spread increases. If **independent**, $\mathrm{Cov} = 0$ and variances simply add. Note: even for $X - Y$, the variances **add**.
- **Use it when:** sums of independent things (dice, tosses, samples).

**Product of independent RVs**

$$X, Y \text{ independent} \Rightarrow E[XY] = E[X]\,E[Y]$$

- **Read it as:** "for independent variables, the average of the product is the product of the averages."
- **Symbols:** $XY$ = the product of the two random numbers.
- **Why it makes sense:** independence means the values of one do not "line up" with the values of the other.
- **Use it when:** finding $\mathrm{Var}(XY) = E[X^2Y^2] - (E[XY])^2 = E[X^2]E[Y^2] - (E[X]E[Y])^2$.

**Indicator trick**

$$E[I_A] = P(A)$$

- **Read it as:** "the expected value of an indicator is the probability of its event."
- **Symbols:** $I_A$ = 1 if $A$ happens, 0 if not.
- **Why it makes sense:** $E[I_A] = 1 \times P(A) + 0 \times P(A^c) = P(A)$. Here $A^c$ means "$A$ does not happen".
- **Use it when:** "expected number of ..." Write the count as a sum of indicators, then use linearity.

**CDF facts**

$$F(x) = P(X \le x), \qquad P(a < X \le b) = F(b) - F(a)$$

- **Read it as:** "F of x is the chance that X is at most x."
- **Symbols:** $a < b$ are two numbers.
- **Why it makes sense:** $F$ never decreases; $F \to 0$ on the far left and $F \to 1$ on the far right; $F$ is **right-continuous**. For a discrete RV, $F$ is a **staircase** that jumps by $P(X = a)$ at each value $a$. For a continuous RV, $f(x) = F'(x)$ (the slope of $F$) and $P(X = a) = 0$.
- **Use it when:** "probability that X lies between", or MSQs on CDF properties. Right-continuous means: at a jump point $a$, $F(a) = P(X \le a)$ already **includes** the jump, so $F$ agrees with the values just to its right.

**Expected waiting time (first-step analysis)**

$$E[\text{trials until first success}] = \frac{1}{p}$$

$$E[\text{trials until 2 successes in a row}] = \frac{1}{p} + \frac{1}{p^2}$$

- **Read it as:** "on average you wait one over p trials for a success."
- **Symbols:** $p$ = chance of success in one trial; trials are independent.
- **Why it makes sense:** if success happens 1 time in 6, you wait about 6 tries. For patterns, define **states** (how much of the pattern you have) and write $E_{\text{state}} = 1 + \sum P(\text{next state})\,E_{\text{next state}}$. The "1" is the trial you just used.
- **Use it when:** "expected number of throws until ...".

### Where the formulas come from

**1. Expectation is a long-run average.**

1. Take the fair-game $X$: value 10 with chance $\frac16$, value 0 with chance $\frac56$. Play $N = 600$ games.
2. About $600 \times \frac16 = 100$ games give 10, and about $600 \times \frac56 = 500$ give 0, because a probability is a long-run fraction.
3. The total is $100 \times 10 + 500 \times 0 = 1000$, so the average per game is $\frac{1000}{600}$.
4. Write the same thing with the fractions kept: $\frac{(600 \cdot \frac16) \cdot 10 + (600 \cdot \frac56) \cdot 0}{600} = 10 \cdot \frac16 + 0 \cdot \frac56$, because the 600 cancels.
5. Now do it with symbols. In $N$ games, value $x$ shows up about $N\,p(x)$ times, so the average is $\frac{\sum_x x \cdot N p(x)}{N} = \sum_x x\,p(x)$.
6. For a continuous RV, cut the line into thin strips of width $dx$. The chance of landing in the strip near $x$ is about $f(x)\,dx$ (height times width). Adding $x \cdot f(x)\,dx$ over all strips gives $\int x\,f(x)\,dx$.

So the integral formula is just the sum formula with very thin strips.

**2. Expectation of a function.**

1. $g(X)$ is also a random number. It equals $g(x)$ whenever $X = x$, because we apply the rule to whatever $X$ turned out to be.
2. So the value $g(x)$ has probability $p(x)$.
3. Use formula 1 on this new random number: $E[g(X)] = \sum_x g(x)\,p(x)$.

Example: a die, $g(x) = x^2$. $E[X^2] = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}{6}$.

**3. Linearity of expectation.**

1. Small example first. Let $X$ be 1 or 3 (each with chance $\frac12$). Let $Y = 2X$ (so they are dependent). $X + Y$ is 3 or 9, average $6$. Separately, $E[X] = 2$ and $E[Y] = 4$, and $2 + 4 = 6$. It matches.
2. General proof (discrete). $X$ and $Y$ together take pairs $(x, y)$ with probability $p(x, y)$.
3. By formula 2 on the pair, $E[X + Y] = \sum_{x}\sum_{y} (x + y)\,p(x,y)$, because $X+Y$ equals $x+y$ when the pair is $(x,y)$.
4. Split the sum: $\sum_x\sum_y x\,p(x,y) + \sum_x\sum_y y\,p(x,y)$, because a sum of $(A+B)$ terms is the sum of the $A$ terms plus the sum of the $B$ terms.
5. In the first part, $\sum_y p(x,y) = p(x)$, because adding over every possible $y$ gives just "the chance that $X = x$". So the first part is $\sum_x x\,p(x) = E[X]$.
6. In the same way the second part is $E[Y]$. So $E[X+Y] = E[X] + E[Y]$.
7. For constants: $E[aX] = \sum_x a x\,p(x) = a \sum_x x\,p(x) = a\,E[X]$, because $a$ is a common factor. And $E[X + c] = \sum (x + c)p(x) = E[X] + c\sum p(x) = E[X] + c$, because $\sum p(x) = 1$.

We never used independence in these steps. That is why linearity always works.

**4. The variance shortcut $E[X^2] - \mu^2$.**

1. Start from the definition: $\mathrm{Var}(X) = E[(X - \mu)^2]$, where $\mu = E[X]$ is a constant.
2. Expand the square: $(X - \mu)^2 = X^2 - 2\mu X + \mu^2$, because $(a - b)^2 = a^2 - 2ab + b^2$.
3. Take the average of each piece using linearity (formula 3): $E[X^2] - 2\mu\,E[X] + \mu^2$.
4. Put $E[X] = \mu$: $E[X^2] - 2\mu^2 + \mu^2 = E[X^2] - \mu^2$.

Check with numbers. $X$ = 1 or 3, each with chance $\frac12$, so $\mu = 2$. Definition: $\frac{(1-2)^2 + (3-2)^2}{2} = 1$. Shortcut: $E[X^2] = \frac{1 + 9}{2} = 5$, and $5 - 2^2 = 1$. Same answer.

**5. $\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)$.**

1. The new mean is $E[aX + b] = a\mu + b$ (linearity).
2. The distance from the new mean is $(aX + b) - (a\mu + b) = a(X - \mu)$, because the $b$ cancels.
3. Square it: $a^2 (X - \mu)^2$.
4. Average it: $E[a^2(X-\mu)^2] = a^2\,E[(X-\mu)^2] = a^2\,\mathrm{Var}(X)$, because $a^2$ is a constant factor.
5. SD is the square root: $\sqrt{a^2\,\mathrm{Var}(X)} = \lvert a \rvert\,\mathrm{SD}(X)$, because $\sqrt{a^2} = \lvert a \rvert$.

**6. Variance of a sum.**

1. Let $\mu_X = E[X]$ and $\mu_Y = E[Y]$. Then $E[X + Y] = \mu_X + \mu_Y$ (linearity).
2. Distance from the mean: $(X + Y) - (\mu_X + \mu_Y) = (X - \mu_X) + (Y - \mu_Y)$.
3. Square it with $(a+b)^2 = a^2 + 2ab + b^2$: $(X-\mu_X)^2 + 2(X-\mu_X)(Y-\mu_Y) + (Y-\mu_Y)^2$.
4. Average each piece: $\mathrm{Var}(X) + 2\,E[(X-\mu_X)(Y-\mu_Y)] + \mathrm{Var}(Y)$.
5. The middle average is the definition of $\mathrm{Cov}(X,Y)$. So $\mathrm{Var}(X+Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) + 2\,\mathrm{Cov}(X,Y)$.
6. For $X - Y$, use step 3 with $-(Y - \mu_Y)$: the middle term changes sign, but $(-(Y-\mu_Y))^2 = (Y-\mu_Y)^2$ stays positive. So the variances still add.

**7. $E[XY] = E[X]E[Y]$ for independent RVs.**

1. Small example. $X$ = 1 or 2 and $Y$ = 0 or 4, each with chance $\frac12$, independent. The four pairs each have chance $\frac14$, and the products are 0, 4, 0, 8. So $E[XY] = \frac{0+4+0+8}{4} = 3$. Also $E[X]E[Y] = 1.5 \times 2 = 3$. It matches.
2. General: $E[XY] = \sum_x\sum_y xy\,p(x,y)$ (formula 2 on the pair).
3. Independence gives $p(x,y) = p(x)\,p(y)$. So the sum is $\sum_x\sum_y x\,p(x)\; y\,p(y)$.
4. For a fixed $x$, the factor $x\,p(x)$ does not depend on $y$, so pull it out: $\sum_x x\,p(x) \left(\sum_y y\,p(y)\right)$.
5. The bracket is $E[Y]$, a constant, so pull it out too: $E[Y] \sum_x x\,p(x) = E[X]\,E[Y]$.

So $\mathrm{Cov}(X,Y) = E[XY] - E[X]E[Y] = 0$ for independent RVs, which is why variances simply add in formula 6.

**8. The indicator trick.** $I_A$ takes only two values: 1 (chance $P(A)$) and 0 (chance $1 - P(A)$). By formula 1, $E[I_A] = 1 \cdot P(A) + 0 \cdot (1 - P(A)) = P(A)$.

**9. CDF difference.**

1. The event "$X \le b$" splits into two parts that cannot both happen: "$X \le a$" and "$a < X \le b$".
2. Probabilities of non-overlapping parts add (see topic: Basic Probability): $F(b) = F(a) + P(a < X \le b)$.
3. Move $F(a)$ across: $P(a < X \le b) = F(b) - F(a)$.

This also shows why $F$ never goes down: $F(b) - F(a)$ is a probability, so it is never negative.

**10. Waiting time $\frac1p$.**

1. Let $E$ = expected number of trials until the first success.
2. Do one trial. That costs 1 trial, because we count it.
3. With chance $p$ it succeeds, and we need 0 more. With chance $1 - p$ it fails, and we are back at the start, so we need $E$ more on average, because the trials are independent and the past does not matter.
4. So $E = 1 + p \cdot 0 + (1-p)\,E$.
5. Subtract $(1-p)E$ from both sides: $pE = 1$, so $E = \frac1p$.

**11. Two successes in a row: $\frac1p + \frac1{p^2}$.** This is formula 10 with one extra state.

1. $E_0$ = expected trials still needed with no current streak. $E_1$ = expected trials still needed when the last trial was a success.
2. From state 0: $E_0 = 1 + p\,E_1 + (1-p)\,E_0$. Subtract $(1-p)E_0$ and divide by $p$: $E_0 = \frac1p + E_1$.
3. From state 1: success (chance $p$) finishes, failure (chance $1-p$) sends you back to state 0. So $E_1 = 1 + (1-p)\,E_0$.
4. Put step 3 into step 2: $E_0 = \frac1p + 1 + (1-p)E_0$.
5. Subtract $(1-p)E_0$: $p\,E_0 = \frac1p + 1$.
6. Divide by $p$: $E_0 = \frac{1}{p^2} + \frac{1}{p}$.

Check with a fair coin ($p = \frac12$): $4 + 2 = 6$ tosses on average to get two heads in a row.

### Examples

**Example 1 (easy):** $X$ takes values 0, 1, 2 with probabilities 0.2, 0.5, 0.3. Find $E[X]$, $\mathrm{Var}(X)$, and the mean and variance of $Y = 3X - 2$.

1. $E[X] = 0(0.2) + 1(0.5) + 2(0.3) = 0 + 0.5 + 0.6 = 1.1$.
2. $E[X^2] = 0^2(0.2) + 1^2(0.5) + 2^2(0.3) = 0 + 0.5 + 1.2 = 1.7$.
3. $\mathrm{Var}(X) = 1.7 - (1.1)^2 = 1.7 - 1.21 = 0.49$. So $\mathrm{SD} = \sqrt{0.49} = 0.7$.
4. $E[Y] = 3(1.1) - 2 = 3.3 - 2 = 1.3$, by linearity.
5. $\mathrm{Var}(Y) = 3^2 \times 0.49 = 9 \times 0.49 = 4.41$. The $-2$ does not matter.

**Result:** $E[X] = 1.1$, $\mathrm{Var}(X) = 0.49$, $E[Y] = 1.3$, $\mathrm{Var}(Y) = 4.41$.

**Example 2 (medium):** $X$ has pdf $f(x) = 2x$ on $[0, 1]$. Find $E[X]$ and $\mathrm{Var}(X)$.

1. Check it is a pdf: $\int_0^1 2x\,dx = [x^2]_0^1 = 1$. Good, the total area is 1.
2. $E[X] = \int_0^1 x \cdot 2x\,dx = \int_0^1 2x^2\,dx = \left[\frac{2x^3}{3}\right]_0^1 = \frac23$.
3. $E[X^2] = \int_0^1 x^2 \cdot 2x\,dx = \int_0^1 2x^3\,dx = \left[\frac{2x^4}{4}\right]_0^1 = \frac12$.
4. $\mathrm{Var}(X) = \frac12 - \left(\frac23\right)^2 = \frac12 - \frac49 = \frac{9}{18} - \frac{8}{18} = \frac{1}{18}$.

**Result:** $E[X] = \frac23$, $\mathrm{Var}(X) = \frac{1}{18} \approx 0.056$.

**Example 3 (GATE level):** A fair die is thrown again and again. What is the expected number of throws until two consecutive throws both show 5 or 6?

1. One throw shows 5 or 6 with probability $p = \frac26 = \frac13$.
2. States: $E_0$ = expected throws still needed when the current streak is 0. $E_1$ = expected throws still needed when the last throw was a 5 or 6.
3. From state 0, throw once. With chance $\frac13$ go to state 1, with chance $\frac23$ stay in state 0:
$$E_0 = 1 + \tfrac13 E_1 + \tfrac23 E_0 \;\Rightarrow\; \tfrac13 E_0 = 1 + \tfrac13 E_1 \;\Rightarrow\; E_0 = 3 + E_1$$
4. From state 1, throw once. With chance $\frac13$ you are done (0 more), with chance $\frac23$ go back to state 0:
$$E_1 = 1 + \tfrac23 E_0$$
5. Substitute $E_0 = 3 + E_1$: $E_1 = 1 + \frac23(3 + E_1) = 3 + \frac23 E_1$. So $\frac13 E_1 = 3$, giving $E_1 = 9$.
6. Then $E_0 = 3 + 9 = 12$.
7. Check with the shortcut: $\frac1p + \frac1{p^2} = 3 + 9 = 12$.

**Result:** 12 throws.

**Example 4 (GATE level):** $X \sim \text{Bernoulli}(0.5)$ and $Y \sim N(0, 4)$ are independent. Find $\mathrm{Var}(XY)$. (Bernoulli(0.5) means $X$ is 1 with chance 0.5, else 0. $N(0, 4)$ means a normal RV with mean 0 and variance 4.)

1. $E[XY] = E[X]E[Y] = 0.5 \times 0 = 0$, because they are independent.
2. $E[X^2] = 0.5$, since $X^2 = X$ for a 0/1 variable.
3. $E[Y^2] = \mathrm{Var}(Y) + (E[Y])^2 = 4 + 0 = 4$.
4. $E[(XY)^2] = E[X^2]\,E[Y^2] = 0.5 \times 4 = 2$, because $X^2$ and $Y^2$ are also independent.
5. $\mathrm{Var}(XY) = E[(XY)^2] - (E[XY])^2 = 2 - 0^2 = 2$.

**Result:** $\mathrm{Var}(XY) = 2$.

### Common mistakes
> **Common mistake:** Writing $\mathrm{Var}(aX + b) = a\,\mathrm{Var}(X) + b$. The correct rule is $a^2\,\mathrm{Var}(X)$, and $b$ disappears.

> **Common mistake:** Writing $\mathrm{Var}(X - Y) = \mathrm{Var}(X) - \mathrm{Var}(Y)$. For independent $X, Y$, variances always **add**, even for a difference.

> **Common mistake:** Using $E[XY] = E[X]E[Y]$ or $\mathrm{Var}(X+Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)$ without independence. Linearity $E[X+Y] = E[X] + E[Y]$ is the only one that needs no independence.

> **Common mistake:** Saying a CDF is "left-continuous" or "always positive". It is **right**-continuous, and it can be exactly 0 (to the left of all values).

> **Common mistake:** In waiting-time questions, answering $1/p^2$ only. You must also count the trials spent before the streak starts.

### How GATE asks it
- **2024 Q.36:** expected throws of a die until two consecutive even numbers. $p = \frac12$, so $\frac1p + \frac1{p^2} = 2 + 4 = 6$. Traps: 4 (only $1/p^2$) and 2 (the minimum, not the mean).
- **2025 Q.20:** $X = aZ + b$ with $Z \sim N(0,1)$. $E[X] = b = 1$; $E[(X - E[X])Z] = E[aZ^2] = a = -2$; check $a^2 = 4$. The sign of $a$ comes from the covariance, not the variance.
- **2026 Q.44:** $\mathrm{Var}((2X - 1)Y)$ with $X \sim$ Bernoulli(0.3), $Y \sim N(0, 100)$. Since $(2X-1)^2 = 1$ always, the answer is $E[Y^2] = 100$. Trap: thinking $p = 0.3$ matters.
- **2026 Q.54 (MSQ):** properties of a discrete CDF. True: non-decreasing, has jumps. False: "always positive", "left-continuous".

> **GATE tip:** For any variance of a product or a strange function, go back to the safe formula $\mathrm{Var}(W) = E[W^2] - (E[W])^2$. Compute the two pieces separately.

### Summary
- First we turn a random outcome into a number $X$, and list how likely each value is (pmf for lists, pdf for ranges).
- Then we find its long-run average $E[X]$ by weighting each value by its probability.
- Averages behave nicely: the average of a sum is the sum of the averages, always. That is linearity, and it makes "expected count" questions easy with indicators.
- To measure spread, we average the squared distance from the mean. Expanding the square gives the fast form $E[X^2] - (E[X])^2$.
- Shifting does not change spread, scaling by $a$ multiplies variance by $a^2$, and for independent RVs variances add because the covariance is 0.
- Waiting-time questions are solved by "do one step, then see where you land", which gives $\frac1p$ and $\frac1p + \frac1{p^2}$.
- Next topic builds on this: Discrete Distributions, where we compute $E[X]$ and $\mathrm{Var}(X)$ once for famous RVs like the Binomial and Poisson.

### Quick self-check
1. $E[X] = 4$, $\mathrm{Var}(X) = 9$. Find $E[X^2]$ and $\mathrm{Var}(2X + 7)$.

**Answer:** $E[X^2] = 9 + 16 = 25$. $\mathrm{Var}(2X+7) = 4 \times 9 = 36$.

2. $X$ and $Y$ are independent with variances 3 and 5. Find $\mathrm{Var}(X - Y)$.

**Answer:** $3 + 5 = 8$.

3. Expected number of fair-coin tosses until the first head?

**Answer:** $\frac{1}{1/2} = 2$.

## Discrete Distributions

### The big idea
A few "ready-made" random variables appear again and again: **Bernoulli**, **Binomial**, **Geometric**, **Poisson** and **discrete Uniform**. If you recognise which one a question describes, you get the mean and variance for free.

### Before you start
**Counting with $\binom{n}{k}$ (see topic: Counting & Combinatorics).** $\binom{n}{k}$ is the number of ways to choose $k$ things from $n$ when order does not matter. Example: $\binom{5}{2} = \frac{5 \times 4}{2} = 10$. And $k! = k \times (k-1) \times \dots \times 1$, with $0! = 1$.

**Independent trials multiply (see topic: Basic Probability).** If trials do not affect each other, the chance that several things all happen is the product of their chances. Example: two heads in two fair tosses has chance $\frac12 \times \frac12 = \frac14$.

**The complement rule.** $P(\text{not } A) = 1 - P(A)$. Example: "at least one six" $= 1 - P(\text{no six})$.

**Expectation and variance (see topic: Random Variables & Expectation/Variance).** $E[X] = \sum x\,p(x)$ is the long-run average. $\mathrm{Var}(X) = E[X^2] - (E[X])^2$ is the spread. Linearity: $E[X + Y] = E[X] + E[Y]$, always. For independent RVs, $\mathrm{Var}(X+Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)$.

**Powers.** $p^k$ means $p$ multiplied by itself $k$ times. Example: $0.5^3 = 0.125$. Also $p^0 = 1$ and $p^{-1} = \frac1p$.

**The number $e$.** $e \approx 2.718$ is a special constant. It appears when something is split into very many tiny steps. The key fact we need is:

$$\left(1 - \frac{\lambda}{n}\right)^n \approx e^{-\lambda} \quad \text{when } n \text{ is large}$$

Example: $(1 - \frac{2}{1000})^{1000} \approx 0.1351$, and $e^{-2} \approx 0.1353$. Very close.

**Infinite sums.** A **geometric series** is $1 + r + r^2 + r^3 + \dots$. If $0 \le r < 1$, it adds up to $\frac{1}{1-r}$. Example: $1 + \frac12 + \frac14 + \dots = \frac{1}{1 - 1/2} = 2$. Also, $e^{\lambda} = \sum_{k=0}^{\infty} \frac{\lambda^k}{k!} = 1 + \lambda + \frac{\lambda^2}{2} + \dots$ (this is how $e^{\lambda}$ is built as a sum).

### Intuition
Think of a cricket bowler.
- **One ball**: wicket or no wicket. That is a single yes/no trial: **Bernoulli**.
- **An over of 6 balls**: how many wickets? Count of successes in a fixed number of independent trials: **Binomial**.
- **How many balls until the first wicket?** Waiting for the first success: **Geometric**.
- **How many sixes are hit in a whole T20 match?** Sixes happen "now and then" at some average rate. Counting such rare, random events in a fixed time is **Poisson**.
- **A fair die**: each face equally likely: **discrete Uniform**.

> **Intuition:** Ask yourself: Is there a **fixed number of trials** (Binomial)? Am I **waiting** for the first success (Geometric)? Am I counting **random events in a time or space** with a known average rate (Poisson)?

Why is the Binomial mean $np$? If you toss a fair coin 100 times, you expect about $100 \times 0.5 = 50$ heads. Each toss contributes $p$ on average, and there are $n$ tosses.

Why is the Poisson mean equal to its variance? Poisson is the limit of a Binomial with very many trials ($n$ large) and tiny success chance ($p$ small). Its variance $np(1-p)$ is almost $np$, because $1 - p$ is almost 1, so mean and variance are both $\lambda = np$.

### Words you need
- **Trial**: one try with two results, success or failure. Example: one coin toss.
- **Success probability** $p$: chance of success in one trial. Example: $p = \frac16$ for "roll a six".
- **Bernoulli($p$)**: 1 with chance $p$, 0 with chance $1-p$.
- **Binomial($n, p$)**: number of successes in $n$ independent Bernoulli($p$) trials. Example: heads in 10 tosses.
- **Geometric($p$)**: number of trials until the first success (the success trial is counted). Example: rolls until the first six.
- **Poisson($\lambda$)**: count of random events in a fixed interval, with average $\lambda$ (lambda). Example: calls per hour at a help desk.
- **Discrete Uniform on $\{1, \dots, n\}$**: each of the $n$ values has the same chance $\frac1n$. Example: a fair die ($n = 6$).
- **With replacement**: you put the item back after each draw, so every draw has the same chances. This gives a Binomial.
- **Without replacement**: you keep the item out. Chances change after each draw. This gives a **Hypergeometric**.
- **Memoryless**: the past does not change the future waiting time.
- **Tail probability** $P(X > k)$: the chance that $X$ is bigger than $k$.

### Formulas, explained

**Summary table**

| Distribution | $P(X = k)$ | Mean | Variance |
|---|---|---|---|
| Bernoulli($p$) | $P(1) = p$, $P(0) = 1-p$ | $p$ | $p(1-p)$ |
| Binomial($n,p$) | $\binom{n}{k}p^k(1-p)^{n-k}$, $k = 0,\dots,n$ | $np$ | $np(1-p)$ |
| Geometric($p$) | $(1-p)^{k-1}p$, $k = 1, 2, \dots$ | $\frac{1}{p}$ | $\frac{1-p}{p^2}$ |
| Poisson($\lambda$) | $\frac{e^{-\lambda}\lambda^k}{k!}$, $k = 0, 1, \dots$ | $\lambda$ | $\lambda$ |
| Uniform on $\{1,\dots,n\}$ | $\frac{1}{n}$ | $\frac{n+1}{2}$ | $\frac{n^2-1}{12}$ |

**Binomial pmf**

$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

- **Read it as:** "the chance of exactly $k$ successes is ($n$ choose $k$) times $p$ to the $k$ times $(1-p)$ to the $(n-k)$."
- **Symbols:** $n$ = number of trials, $k$ = number of successes, $p$ = success chance.
- **Why it makes sense:** one particular order (like SSFFF) has chance $p^k(1-p)^{n-k}$. There are $\binom{n}{k}$ orders with exactly $k$ successes.
- **Use it when:** fixed $n$, independent trials, same $p$ each time, "exactly $k$" or "at least $k$".

**Geometric pmf and tail**

$$P(X = k) = (1-p)^{k-1}p, \qquad P(X > k) = (1-p)^k$$

- **Read it as:** "first success on trial $k$ means $k-1$ failures, then a success."
- **Symbols:** $k$ = the trial on which the first success happens.
- **Why it makes sense:** $X > k$ means the first $k$ trials all failed.
- **Use it when:** "number of tries until the first ...". It is **memoryless**: $P(X > s + t \mid X > s) = P(X > t)$.

**Poisson pmf**

$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$

- **Read it as:** "the chance of exactly $k$ events is e to the minus lambda, times lambda to the $k$, over $k$ factorial."
- **Symbols:** $\lambda$ = average number of events in the interval, $e \approx 2.718$.
- **Why it makes sense:** it is the Binomial formula when $n$ is huge and $p$ is tiny, with $np = \lambda$.
- **Use it when:** "on average 3 calls per minute", "2 typos per page", rare events. Also: Binomial with large $n$, small $p$ is about Poisson($np$).

**Sums of independent copies**

$$\text{Bin}(n_1, p) + \text{Bin}(n_2, p) = \text{Bin}(n_1 + n_2, p)$$

$$\text{Pois}(\lambda_1) + \text{Pois}(\lambda_2) = \text{Pois}(\lambda_1 + \lambda_2)$$

- **Read it as:** "adding independent binomials with the same $p$ gives a binomial; adding independent Poissons gives a Poisson with the rates added."
- **Symbols:** $n_1, n_2$ = trial counts; $\lambda_1, \lambda_2$ = average rates.
- **Why it makes sense:** 3 tosses plus 5 tosses is just 8 tosses. Calls in the first hour plus calls in the second hour is calls in two hours.
- **Use it when:** combining counts. It is also why Poisson($n$) is a sum of $n$ Poisson(1), which matters for the CLT.

**Hypergeometric (without replacement)**

$$P(X = k) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}, \qquad E[X] = n\frac{K}{N}$$

- **Read it as:** "choose $k$ good items from the $K$ good ones, and the rest from the bad ones, over all ways to choose $n$."
- **Symbols:** $N$ = total items, $K$ = good items, $n$ = items drawn.
- **Why it makes sense:** every group of $n$ items is equally likely, so probability = favourable groups / all groups.
- **Use it when:** drawing **without** replacement. Note: the mean is the same as with replacement.

### Where the formulas come from

**1. Bernoulli mean and variance.**

1. $X$ is 1 with chance $p$ and 0 with chance $1-p$.
2. $E[X] = 1 \cdot p + 0 \cdot (1-p) = p$, by the definition of expectation.
3. $X^2 = X$, because $1^2 = 1$ and $0^2 = 0$. So $E[X^2] = p$.
4. $\mathrm{Var}(X) = E[X^2] - (E[X])^2 = p - p^2 = p(1-p)$.

Check: a fair coin ($p = 0.5$) has variance $0.25$, the largest possible. A sure thing ($p = 1$) has variance 0, because nothing varies.

**2. The Binomial pmf.**

1. Small case: 3 tosses, $p$ = chance of success. Find $P(\text{exactly 2 successes})$.
2. The orders with 2 successes are SSF, SFS, FSS. That is $\binom{3}{2} = 3$ orders, because we choose which 2 of the 3 places are S.
3. One order, like SSF, has chance $p \cdot p \cdot (1-p) = p^2(1-p)$, because independent trials multiply.
4. Every order has the same chance (the same factors, just shuffled). The orders cannot happen together, so we add: $3\,p^2(1-p)$.
5. General case: an order with $k$ successes and $n-k$ failures has chance $p^k(1-p)^{n-k}$. There are $\binom{n}{k}$ such orders. So

$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

**3. Binomial mean $np$ and variance $np(1-p)$.** The Binomial is just $n$ Bernoullis added.

1. Write $X = X_1 + X_2 + \dots + X_n$, where $X_i = 1$ if trial $i$ is a success, else 0. This is true because adding 1 for each success counts the successes.
2. Each $X_i$ is Bernoulli($p$), so $E[X_i] = p$ and $\mathrm{Var}(X_i) = p(1-p)$ (formula 1).
3. By linearity, $E[X] = p + p + \dots + p = np$.
4. The trials are independent, so variances add: $\mathrm{Var}(X) = n\,p(1-p)$.

Doing the sum $\sum k \binom{n}{k}p^k(1-p)^{n-k}$ directly also gives $np$, but the indicator way is much shorter.

**4. Geometric pmf, tail and mean.**

1. "First success on trial $k$" means trials $1, \dots, k-1$ fail and trial $k$ succeeds.
2. By independence, the chance is $(1-p)^{k-1} \cdot p$.
3. "$X > k$" means the first $k$ trials all fail, so $P(X > k) = (1-p)^k$.
4. Check that the pmf adds to 1: $p\left(1 + (1-p) + (1-p)^2 + \dots\right) = p \cdot \frac{1}{1 - (1-p)} = p \cdot \frac1p = 1$, using the geometric series with $r = 1-p$.
5. The mean $\frac1p$ is exactly the waiting-time formula from the topic Random Variables & Expectation/Variance: $E = 1 + (1-p)E$, so $E = \frac1p$.

**5. Geometric variance $\frac{1-p}{p^2}$ (first-step idea again).**

1. Do the first trial. With chance $p$ it succeeds and $X = 1$.
2. With chance $1-p$ it fails, and then $X = 1 + X'$, where $X'$ is a fresh Geometric (same distribution), because the trials are independent.
3. So $E[X^2] = p \cdot 1^2 + (1-p)\,E[(1 + X')^2]$.
4. Expand: $E[(1+X')^2] = 1 + 2E[X'] + E[X'^2] = 1 + \frac2p + E[X^2]$.
5. So $E[X^2] = p + (1-p)\left(1 + \frac2p\right) + (1-p)E[X^2]$.
6. Move $(1-p)E[X^2]$ left: $p\,E[X^2] = p + (1-p) + \frac{2(1-p)}{p} = 1 + \frac{2(1-p)}{p} = \frac{2-p}{p}$.
7. So $E[X^2] = \frac{2-p}{p^2}$.
8. $\mathrm{Var}(X) = \frac{2-p}{p^2} - \frac{1}{p^2} = \frac{1-p}{p^2}$.

**6. Memoryless.**

1. $P(X > s + t \mid X > s) = \frac{P(X > s+t \text{ and } X > s)}{P(X > s)}$, by the definition of conditional probability.
2. If $X > s + t$, then $X > s$ is automatic, so the top is just $P(X > s+t) = (1-p)^{s+t}$.
3. Divide: $\frac{(1-p)^{s+t}}{(1-p)^s} = (1-p)^t = P(X > t)$.

In words: after $s$ failures, the coin does not "remember" them. You start fresh.

**7. Poisson pmf from the Binomial.**

1. Take one hour with on average $\lambda$ calls. Cut it into $n$ tiny pieces (say $n = 3600$ seconds).
2. Each piece gets a call with chance $p = \frac{\lambda}{n}$ (tiny), and at most one call. So the number of calls is Binomial($n$, $\frac{\lambda}{n}$), whose mean is $n \cdot \frac{\lambda}{n} = \lambda$.
3. Write the Binomial pmf with $p = \frac{\lambda}{n}$:
$$\binom{n}{k}\left(\frac{\lambda}{n}\right)^k\left(1-\frac{\lambda}{n}\right)^{n-k} = \frac{n(n-1)\cdots(n-k+1)}{n^k} \cdot \frac{\lambda^k}{k!} \cdot \left(1-\frac{\lambda}{n}\right)^{n} \cdot \left(1-\frac{\lambda}{n}\right)^{-k}$$
This is only regrouping, because $\binom{n}{k} = \frac{n(n-1)\cdots(n-k+1)}{k!}$.
4. Let $n$ be very large. The first fraction is $\frac{n}{n} \cdot \frac{n-1}{n} \cdots$, and each factor is almost 1, so it goes to 1.
5. $\left(1-\frac{\lambda}{n}\right)^n \to e^{-\lambda}$, by the fact about $e$ in "Before you start".
6. $\left(1-\frac{\lambda}{n}\right)^{-k} \to 1$, because $\frac{\lambda}{n}$ goes to 0 and $k$ stays fixed.
7. What remains is $\frac{\lambda^k}{k!} e^{-\lambda}$, the Poisson pmf.

Check that it adds to 1: $\sum_k \frac{e^{-\lambda}\lambda^k}{k!} = e^{-\lambda} \cdot e^{\lambda} = 1$, using the series for $e^{\lambda}$.

**8. Poisson mean and variance both $\lambda$.**

1. Poisson is the limit of Binomial($n$, $\frac{\lambda}{n}$).
2. The Binomial mean is $n \cdot \frac{\lambda}{n} = \lambda$, for every $n$.
3. The Binomial variance is $n \cdot \frac{\lambda}{n}\left(1 - \frac{\lambda}{n}\right) = \lambda\left(1 - \frac{\lambda}{n}\right)$.
4. As $n$ grows, $\frac{\lambda}{n} \to 0$, so the variance goes to $\lambda$.

**9. Sums of Binomials and Poissons.**

1. Bin($n_1$, $p$) counts successes in $n_1$ trials. Bin($n_2$, $p$) counts successes in $n_2$ more independent trials with the same $p$.
2. Together they count successes in $n_1 + n_2$ trials, which is Bin($n_1 + n_2$, $p$). This needs the **same** $p$, because otherwise the trials are not all alike.
3. For Poisson, put the two intervals side by side. Each is a Binomial with tiny $p$, so by step 2 their sum is a Binomial with $n_1 + n_2$ pieces and mean $\lambda_1 + \lambda_2$. Taking the limit gives Pois($\lambda_1 + \lambda_2$).

**10. Discrete Uniform mean and variance.**

1. $E[X] = \frac{1 + 2 + \dots + n}{n}$, because each value has weight $\frac1n$.
2. Use $1 + 2 + \dots + n = \frac{n(n+1)}{2}$ (pair the first and last: $1 + n$, $2 + (n-1)$, ..., giving $\frac{n}{2}$ pairs of size $n+1$). So $E[X] = \frac{n+1}{2}$.
3. $E[X^2] = \frac{1^2 + 2^2 + \dots + n^2}{n} = \frac{(n+1)(2n+1)}{6}$, using the school formula $\sum k^2 = \frac{n(n+1)(2n+1)}{6}$.
4. $\mathrm{Var}(X) = \frac{(n+1)(2n+1)}{6} - \frac{(n+1)^2}{4} = \frac{(n+1)\left[2(2n+1) - 3(n+1)\right]}{12} = \frac{(n+1)(n-1)}{12} = \frac{n^2-1}{12}$.

Check with a die ($n = 6$): mean 3.5, variance $\frac{35}{12} \approx 2.92$.

**11. Hypergeometric pmf and mean.**

1. Small case: a bag has $N = 5$ balls, $K = 2$ red. Draw $n = 2$ without replacement. $P(\text{both red}) = \frac{\binom22\binom30}{\binom52} = \frac{1}{10}$.
2. General pmf: every group of $n$ items is equally likely, and there are $\binom{N}{n}$ groups. The favourable groups pick $k$ from the $K$ good ones and $n - k$ from the $N - K$ bad ones. Multiply (multiplication rule) and divide.
3. Mean: write $X = I_1 + \dots + I_n$, where $I_j = 1$ if draw $j$ is good.
4. Each single draw, looked at alone, is equally likely to be any of the $N$ items, so $P(I_j = 1) = \frac{K}{N}$. This is true by symmetry, even though the draws depend on each other.
5. By linearity (no independence needed), $E[X] = n\frac{K}{N}$. That is why the mean is the same as with replacement.

### Examples

**Example 1 (easy):** A fair coin is tossed 5 times. Find P(exactly 2 heads), the mean and the variance.

1. This is Binomial with $n = 5$, $p = \frac12$.
2. $P(X = 2) = \binom{5}{2}\left(\frac12\right)^2\left(\frac12\right)^3 = 10 \times \frac{1}{32} = \frac{10}{32} = 0.3125$.
3. Mean $= np = 5 \times 0.5 = 2.5$.
4. Variance $= np(1-p) = 5 \times 0.5 \times 0.5 = 1.25$.

**Result:** $P(X=2) = 0.3125$, mean 2.5, variance 1.25.

**Example 2 (medium):** A page has on average 2 typos (Poisson with $\lambda = 2$). Find P(at least 2 typos).

1. Use the complement: $P(X \ge 2) = 1 - P(X=0) - P(X=1)$.
2. $P(X = 0) = e^{-2}\frac{2^0}{0!} = e^{-2}$.
3. $P(X = 1) = e^{-2}\frac{2^1}{1!} = 2e^{-2}$.
4. $P(X \ge 2) = 1 - e^{-2} - 2e^{-2} = 1 - 3e^{-2}$.
5. $e^{-2} \approx 0.1353$, so $3e^{-2} \approx 0.406$.

**Result:** $P(X \ge 2) \approx 1 - 0.406 = 0.594$.

**Example 3 (GATE level):** Every entry of a $4 \times 4$ matrix is independently 0 or 1 with probability 0.5 each. What is the probability that row 1 sums to 2 **and** column 1 sums to 2?

1. Row 1 and column 1 **share** the entry $a_{11}$. So the two sums are not independent. Condition on $a_{11}$.
2. The other 3 entries of the row sum to a Binomial(3, 0.5): $P(=k) = \frac{\binom{3}{k}}{8}$. Same for the other 3 entries of the column. The row part and column part share no cell, so they are independent.
3. Case $a_{11} = 1$ (chance $\frac12$): each remaining part must sum to 1. Chance $= \frac{\binom31}{8} \times \frac{\binom31}{8} = \frac38 \times \frac38 = \frac{9}{64}$.
4. Case $a_{11} = 0$ (chance $\frac12$): each remaining part must sum to 2. Chance $= \frac{\binom32}{8} \times \frac{\binom32}{8} = \frac{9}{64}$.
5. Add the cases (total probability): $\frac12 \times \frac{9}{64} + \frac12 \times \frac{9}{64} = \frac{9}{64}$.

**Result:** $\frac{9}{64} \approx 0.14$.

**Example 4 (GATE level):** A bag has 4 red and 6 green balls. 50 balls are drawn **with replacement**. Expected number of red?

1. Each draw is red with chance $\frac{4}{10} = 0.4$, independently, because the ball goes back each time.
2. So the count is Binomial(50, 0.4).
3. Mean $= np = 50 \times 0.4 = 20$.

**Result:** 20 red balls on average.

### Common mistakes
> **Common mistake:** Treating two overlapping counts (a row and a column that share a cell) as independent. Condition on the shared part first.

> **Common mistake:** Using Binomial when draws are **without** replacement. That is hypergeometric (but the mean $nK/N$ is still the same).

> **Common mistake:** Mixing the two Geometric versions. "Trials until first success" has mean $\frac1p$. "Failures before first success" has mean $\frac{1-p}{p}$. Read which one the question uses.

> **Common mistake:** Forgetting $P(X = 0)$ in Poisson "at least" questions. $P(X \ge 1) = 1 - e^{-\lambda}$.

### How GATE asks it
- **2024 Q.11:** true/false facts: Poisson has mean = variance; standard normal has mean 0 and variance 1. Both true.
- **2025 Q.61:** 5 white + 10 black balls, 100 draws **with replacement**. Expected black $= 100 \times \frac{10}{15} \approx 66.7$.
- **2026 Q.64:** $5 \times 5$ matrix of Bernoulli(0.5). P(row 2 sum = 3 and column 3 sum = 3). Condition on the shared entry $a_{23}$: $\frac12\left(\frac{6}{16}\right)^2 + \frac12\left(\frac{4}{16}\right)^2 = \frac{13}{128} \approx 0.10$.
- Poisson also hides inside a CLT question (**2026 Q.45**): you must recognise $\frac{e^{-n}n^k}{k!}$ as a Poisson pmf.

> **GATE tip:** Learn the table above by heart. Many questions are just "recognise the distribution, read off the mean".

### Summary
- First we start with the simplest random number: one yes/no trial (Bernoulli), with mean $p$ and variance $p(1-p)$.
- Then we add $n$ independent Bernoullis to get the Binomial. Counting orders gives its pmf, and linearity gives mean $np$ and variance $np(1-p)$.
- If instead we wait for the first success, we get the Geometric. Its tail $(1-p)^k$ makes it memoryless, and first-step analysis gives mean $\frac1p$.
- If we cut time into very many tiny Binomial pieces, the limit is the Poisson, so its mean and variance are both $\lambda$.
- Drawing without replacement changes the pmf (Hypergeometric), but not the mean, because linearity does not need independence.
- So most questions become: recognise the story, pick the distribution, read the mean and variance from the table.
- Next topic builds on this: Continuous Distributions, where the Geometric becomes the Exponential and sums of many trials become the Normal.

### Quick self-check
1. $X \sim$ Binomial(20, 0.3). Mean and variance?

**Answer:** Mean $= 6$, variance $= 20 \times 0.3 \times 0.7 = 4.2$.

2. Calls arrive at 4 per hour (Poisson). P(no call in an hour)?

**Answer:** $e^{-4} \approx 0.018$.

3. You roll a die until a 6 appears. Expected number of rolls?

**Answer:** Geometric with $p = \frac16$: mean $= 6$.

## Continuous Distributions

### The big idea
A **continuous** random variable can take any value in a range, like a waiting time of 3.27 minutes. Its probabilities are **areas under a curve** called the pdf.

Four families matter most: **Uniform**, **Exponential**, **Normal**, and the two built from normals, **Chi-square** and **Student's t**. This is the most-asked topic in GATE DA probability.

### Before you start
This topic uses some school maths and some earlier topics. Here is each idea from scratch.

**1. Function.** A function is a rule that takes a number in and gives one number out. Example: $f(x) = 2x$ takes 3 and gives 6. We draw it as a curve: for each $x$ on the flat axis, the height of the curve is $f(x)$.

**2. Area under a curve (integral).** The symbol $\int_a^b f(x)\,dx$ means "the area under the curve $f$ between $x = a$ and $x = b$". Example: if $f(x) = 2$ (a flat line), the area from 1 to 4 is a rectangle of width 3 and height 2, so $\int_1^4 2\,dx = 6$. For curved shapes we use rules like $\int x^n\,dx = \frac{x^{n+1}}{n+1}$.

**3. Square-bracket notation.** $\left[g(x)\right]_a^b$ means $g(b) - g(a)$. Example: $\left[\frac{x^2}{2}\right]_0^2 = \frac{4}{2} - 0 = 2$.

**4. Infinity in a limit.** $\int_0^\infty$ means "the area from 0 all the way to the right, without end". The area can still be a finite number if the curve falls to 0 fast enough.

**5. Derivative (slope).** $F'(x)$ is how fast $F$ is rising at $x$. Example: if $F(x) = x^2$ then $F'(x) = 2x$. Area and slope undo each other: the slope of "area so far" is the height of the curve.

**6. The number $e$ and $e^{-x}$.** $e \approx 2.718$ is a special number. The curve $e^{-x}$ starts at $e^0 = 1$ and falls smoothly towards 0: $e^{-1} \approx 0.368$, $e^{-2} \approx 0.135$. We also write $\exp(x)$ for $e^x$. A key rule: $e^{a} \times e^{b} = e^{a+b}$.

**7. Natural log $\ln$.** $\ln$ undoes $e$: if $e^y = 5$ then $y = \ln 5 \approx 1.609$. Useful values: $\ln 2 \approx 0.693$, and $\ln\frac{1}{c} = -\ln c$.

**8. Floor $\lfloor x \rfloor$.** The floor is the whole-number part, rounding down. Example: $\lfloor 3.7 \rfloor = 3$, $\lfloor 0.2 \rfloor = 0$.

**9. Mean, variance, SD** (see topic: Random Variables & Expectation/Variance). The mean $E[X]$ is the long-run average. The variance $\mathrm{Var}(X) = E[X^2] - (E[X])^2$ measures spread. The SD $\sigma$ is the square root of the variance. For a continuous variable, $E[X] = \int x f(x)\,dx$: it is the same "value times chance" idea, with a sum replaced by an area.

**10. Conditional probability** (see topic: Basic Probability & Conditional Probability). $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ means "the chance of $A$, now that we know $B$ happened". Example: a die shows an even number; the chance it is 6 is $\frac{1/6}{1/2} = \frac13$.

**11. Geometric distribution** (see topic: Discrete Distributions). The number of tries until the first success, when each try succeeds with chance $p$. Its mean is $\frac1p$ and its variance is $\frac{q}{p^2}$ with $q = 1-p$.

### Intuition
Think of the time your bus arrives. It can come at 7:03, or 7:03:15, or 7:03:15.4. There are infinitely many possible times.

So the chance of **exactly** 7:03:15.4000... is 0. Instead we ask: "what is the chance the bus comes between 7:00 and 7:05?" That is a **range**, and its chance is an **area**.

Picture a curve drawn over a number line. The total area under it is 1 (100%). The area above any range $[a, b]$ is the chance of landing in that range.

Where the curve is tall, values are common. Where it is low, values are rare. This curve is the **pdf** (probability density function).

> **Intuition:** For a continuous variable, **probability = area**. A single point has zero width, so zero area. That is why $P(X < a)$ and $P(X \le a)$ are the same.

Now meet the four shapes:
- **Uniform**: a flat, rectangular curve. Every value in $[a, b]$ is equally likely. Example: a random arrival time when the bus "comes any time in the next 20 minutes".
- **Exponential**: tall at 0, then falling smoothly. It is the waiting time until a random event, like the next phone call or the next customer. Short waits are common, long waits are rare. It is the continuous version of the Geometric distribution.
- **Normal**: the famous **bell curve**. Heights of students, measurement errors and exam marks look like this. It is symmetric around the mean.
- **Chi-square and t**: you get these when you square and divide normal variables. They appear in sampling and testing.

**The memoryless property** of the exponential is worth a picture. A light bulb has an exponential lifetime, and it has already worked for 500 hours. What is the chance it lasts 1000 more?

The exponential says: exactly the same as for a brand-new bulb. The bulb does not "get tired". The past wait gives no information about the future wait.

> **Intuition:** Exponential = "a random event that has no memory". Like waiting for a WhatsApp message from a random friend. Having waited 5 minutes does not make the message "due".

### Words you need
- **pdf** $f(x)$: the density curve. It must be $\ge 0$ and have total area 1. Example: $f(x) = \frac12$ on $[0, 2]$.
- **CDF** $F(x) = P(X \le x)$: area to the left of $x$. Example: for Uniform(0, 2), $F(1) = 0.5$.
- **Survival function** $P(X > x) = 1 - F(x)$: area to the right of $x$.
- **Median** $m$: the point with half the area on each side, $F(m) = 0.5$.
- **Rate** $\lambda$ (lambda): for an exponential, the average number of events per unit time. The mean wait is $\frac1\lambda$. Example: 2 calls per minute means mean wait 0.5 minute.
- **Standard normal** $Z$: a normal with mean 0 and variance 1, written $N(0, 1)$.
- **Standardising**: turning any normal $X$ into $Z$ by $Z = \frac{X - \mu}{\sigma}$.
- $\Phi(z)$ (capital phi): the CDF of $Z$, $\Phi(z) = P(Z \le z)$. Read from a table.
- **Degrees of freedom** $k$: the number of independent squared normals added in a chi-square (and the parameter of a $t$).
- **Heavy tails**: the curve goes down slowly far from the centre, so extreme values are more common.
- **Independent**: knowing one variable tells you nothing about the other. Then joint chances multiply: $P(A \cap B) = P(A)P(B)$.

### Formulas, explained

**Probability from a pdf or CDF**
$$P(a \le X \le b) = \int_a^b f(x)\,dx = F(b) - F(a), \qquad f(x) = F'(x)$$
- **Read it as:** "the chance of being between a and b is the area under f from a to b, which equals F of b minus F of a."
- **Symbols:** $f$ = pdf (height of the curve), $F$ = CDF (area to the left).
- **Why it makes sense:** $F(b)$ is all area left of $b$. Remove the area left of $a$, and you keep only the part between.
- **Use it when:** any interval question. Also: find a missing constant $c$ from $\int f = 1$, and the median from $F(m) = 0.5$. An event like $X^2 \le c$ becomes $-\sqrt{c} \le X \le \sqrt{c}$.

**Uniform($a, b$)**
$$f(x) = \frac{1}{b-a} \ (a \le x \le b), \qquad F(x) = \frac{x - a}{b - a}$$
$$E[X] = \frac{a+b}{2}, \qquad \mathrm{Var}(X) = \frac{(b-a)^2}{12}$$
- **Read it as:** "the height is one over the length; the mean is the midpoint."
- **Symbols:** $a$ = left end, $b$ = right end.
- **Why it makes sense:** a rectangle of width $b - a$ must have area 1, so its height is $\frac{1}{b-a}$. By symmetry, the mean and the median are both at the midpoint.
- **Use it when:** "uniformly distributed", "equally likely in an interval". For two independent uniforms, the joint density is the product of heights (constant), so **probability = area of the region × joint height**.

**Exponential with rate $\lambda$**
$$f(x) = \lambda e^{-\lambda x} \ (x \ge 0), \qquad P(X > x) = e^{-\lambda x}$$
$$E[X] = \frac1\lambda, \qquad \mathrm{Var}(X) = \frac{1}{\lambda^2}$$
- **Read it as:** "the chance of waiting more than $x$ is e to the minus lambda x."
- **Symbols:** $\lambda$ = rate (events per unit time), $x$ = waiting time.
- **Why it makes sense:** the survival chance drops by the same factor for every extra unit of time. That is exponential decay, like a radioactive substance.
- **Use it when:** waiting times, lifetimes, "exponentially distributed". **Careful:** if the question says "with mean $\lambda$", the rate is $\frac1\lambda$ and $P(X > x) = e^{-x/\lambda}$.

**Memoryless property**
$$P(X > s + t \mid X > s) = P(X > t)$$
- **Read it as:** "given you have already waited $s$, the chance of waiting $t$ more is the same as from the start."
- **Symbols:** $s$ = time already waited, $t$ = extra time.
- **Why it makes sense:** the $s$ cancels when you divide two exponentials (see the next section).
- **Use it when:** "given it has lasted ...", "given $X > 5$".

**Other exponential facts**
$$\text{median} = \frac{\ln 2}{\lambda}$$
$$P(\lfloor X \rfloor = k) = (e^{-\lambda})^k(1 - e^{-\lambda})$$
$$\min(X_1, X_2) \sim \text{Exp}(\lambda_1 + \lambda_2)$$
- **Read it as:** (1) half the waits are shorter than $\ln 2 / \lambda$; (2) the whole-number part of an exponential is Geometric with $q = e^{-\lambda}$; (3) the first of two independent waits is exponential with the rates added.
- **Why it makes sense:** each one comes straight from the survival formula $e^{-\lambda x}$ (steps below).
- **Use it when:** median questions, floor questions, "first of two machines to fail".

**Normal $N(\mu, \sigma^2)$ and standardising**
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$
$$Z = \frac{X - \mu}{\sigma} \sim N(0, 1), \qquad P(X \le x) = \Phi\!\left(\frac{x - \mu}{\sigma}\right)$$
- **Read it as:** "to find any normal probability, subtract the mean, divide by the SD, and read the Z table."
- **Symbols:** $\mu$ (mu) = mean (centre), $\sigma$ (sigma) = standard deviation (width), $\sigma^2$ = variance.
- **Why it makes sense:** every normal curve is the same bell, just shifted and stretched. Standardising undoes the shift and stretch.
- **Use it when:** "normally distributed", and in all CLT questions. Note: $N(50, 16)$ means variance 16, so $\sigma = 4$.

**Normal table facts**
$$\Phi(-z) = 1 - \Phi(z), \qquad \Phi(0) = 0.5, \qquad \Phi(1) = 0.8413$$
$$\Phi(1.645) = 0.95, \qquad \Phi(1.96) = 0.975, \qquad \Phi(2) = 0.9772$$
- **Read it as:** "the bell is symmetric, so the area left of minus $z$ equals the area right of $z$."
- **68-95-99.7 rule:** about 68% of values lie within 1 SD of the mean, 95% within 2 SD, 99.7% within 3 SD.
- **More facts:** $aX + b$ is normal if $X$ is normal. A sum of independent normals is normal (means add, variances add). The peak height of $N(0,1)$ is $\frac{1}{\sqrt{2\pi}} \approx 0.399$.

**Moments of the standard normal**
$$E[Z] = 0, \quad E[Z^2] = 1, \quad E[Z^3] = 0, \quad E[Z^4] = 3$$
$$\mathrm{Var}(Z^2) = E[Z^4] - (E[Z^2])^2 = 3 - 1 = 2$$
- **Read it as:** "odd powers average to zero; the fourth power averages to three."
- **Symbols:** a "moment" is the average of a power, $E[Z^n]$.
- **Why it makes sense:** odd powers are 0 because the bell is symmetric: positive and negative values cancel. $E[Z^2] = \mathrm{Var}(Z) + 0^2 = 1$.
- **Use it when:** variance of $Z^2$, or any polynomial in $Z$.

**Chi-square with $k$ degrees of freedom**
$$\chi^2_k = Z_1^2 + Z_2^2 + \dots + Z_k^2, \qquad E = k, \qquad \mathrm{Var} = 2k$$
- **Read it as:** "chi-square with $k$ degrees of freedom is the sum of $k$ independent squared standard normals."
- **Symbols:** $Z_i$ = independent $N(0,1)$ variables; $\chi$ is the Greek letter "chi" (say "kai").
- **Why it makes sense:** each $Z_i^2$ has mean 1 and variance 2. Add $k$ independent ones: mean $k$, variance $2k$.
- **Special facts:** $Z^2 \sim \chi^2_1$. $\chi^2_2$ is exactly the **exponential with mean 2** (pdf $\frac12 e^{-x/2}$). Independent chi-squares add their degrees of freedom.

**Student's $t$ with $k$ degrees of freedom**
$$t_k = \frac{Z}{\sqrt{V/k}}, \qquad V \sim \chi^2_k \text{ independent of } Z$$
$$t_1 \text{ (Cauchy)}: \quad h(y) = \frac{1}{\pi(1 + y^2)}$$
- **Read it as:** "t is a standard normal divided by the square root of an independent chi-square over its degrees of freedom."
- **Why it makes sense:** dividing by a random amount sometimes divides by something small, which makes big values more common. So $t$ is **symmetric about 0** like $Z$, but **shorter in the middle and heavier in the tails**. As $k$ grows, $t_k$ becomes $N(0,1)$.
- **Key comparison:** $h(0) = \frac1\pi \approx 0.318$, less than the normal peak $0.399$. The two curves cross at about $\pm 1.85$. Beyond that, $t_1$ is taller (heavier tail). $t_1$ has no mean at all.

### Where the formulas come from

**A. Probability = area, and $f = F'$**

Start with a small example. Let $f(x) = \frac12$ on $[0, 2]$.

1. The chance of landing in $[0.5, 1.5]$ is the area of a rectangle: width $1$, height $\frac12$, so $0.5$. Because probability is defined as area for continuous variables.
2. $F(x)$ is the area from the far left up to $x$: $F(x) = \frac{x}{2}$. Because the rectangle up to $x$ has width $x$ and height $\frac12$.
3. Then $F(1.5) - F(0.5) = 0.75 - 0.25 = 0.5$, the same answer. Because the area left of $1.5$ minus the area left of $0.5$ leaves only the strip between them.
4. In general, $P(a \le X \le b) = F(b) - F(a) = \int_a^b f(x)\,dx$. Because the same "remove the left part" idea works for any shape.
5. If you move $x$ a tiny step $h$ to the right, $F$ grows by a thin strip of area about $f(x) \times h$. So $\frac{F(x+h) - F(x)}{h} \approx f(x)$, which means $F'(x) = f(x)$. Because a thin strip is almost a rectangle of height $f(x)$.

**B. Uniform: height, CDF, mean and variance**

Example first: Uniform(0, 4).

1. The rectangle has width 4 and area 1, so the height is $\frac14$. Because total probability must be 1.
2. In general the height is $\frac{1}{b-a}$. Because width × height $= (b-a) \times \frac{1}{b-a} = 1$.
3. The CDF is the area from $a$ to $x$: width $x - a$, height $\frac{1}{b-a}$, so $F(x) = \frac{x-a}{b-a}$.
4. The mean is $E[X] = \int_a^b x \cdot \frac{1}{b-a}\,dx = \frac{1}{b-a}\left[\frac{x^2}{2}\right]_a^b = \frac{b^2 - a^2}{2(b-a)}$. Because $E[X] = \int x f(x)\,dx$ (see Before you start).
5. Use $b^2 - a^2 = (b-a)(b+a)$ and cancel $(b-a)$: $E[X] = \frac{a+b}{2}$. For Uniform(0, 4) this is 2, the midpoint.
6. Next, $E[X^2] = \frac{1}{b-a}\left[\frac{x^3}{3}\right]_a^b = \frac{b^3 - a^3}{3(b-a)} = \frac{a^2 + ab + b^2}{3}$. Because $b^3 - a^3 = (b-a)(a^2 + ab + b^2)$.
7. Variance $= E[X^2] - (E[X])^2 = \frac{a^2 + ab + b^2}{3} - \frac{(a+b)^2}{4}$.
8. Put both over 12: $\frac{4a^2 + 4ab + 4b^2 - 3a^2 - 6ab - 3b^2}{12} = \frac{a^2 - 2ab + b^2}{12} = \frac{(b-a)^2}{12}$.
9. Check with Uniform(0, 4): $E[X^2] = \frac{16}{3}$, so variance $= \frac{16}{3} - 4 = \frac43$, and $\frac{(4-0)^2}{12} = \frac{16}{12} = \frac43$. They match.

**C. Exponential: from the Geometric distribution**

The exponential is the Geometric distribution with very tiny time steps.

1. Example: calls come at rate $\lambda = 2$ per minute. Cut each minute into $n = 100$ tiny steps. In each step, a call comes with chance $p = \frac{2}{100} = 0.02$. Because 2 calls per minute spread over 100 steps is 0.02 per step.
2. No call in the first $x$ minutes means no call in $100x$ steps in a row. The chance is $(1 - 0.02)^{100x}$. Because independent steps multiply (see topic: Discrete Distributions, Geometric).
3. In symbols: $P(X > x) = \left(1 - \frac{\lambda}{n}\right)^{nx}$.
4. As $n$ gets huge (steps become tiny), $\left(1 - \frac{\lambda}{n}\right)^{n}$ gets closer and closer to $e^{-\lambda}$. This is one of the ways the number $e$ is defined. Check: $(1 - 0.02)^{100} \approx 0.1326$ and $e^{-2} \approx 0.1353$, already very close.
5. So $P(X > x) = (e^{-\lambda})^x = e^{-\lambda x}$. This is the **survival function**.
6. The CDF is $F(x) = 1 - e^{-\lambda x}$. Because "wait at most $x$" is the opposite of "wait more than $x$".
7. The pdf is the slope of the CDF: $f(x) = F'(x) = \lambda e^{-\lambda x}$. Because the slope of $e^{-\lambda x}$ is $-\lambda e^{-\lambda x}$, and the minus sign in front of it cancels.
8. **Mean:** a Geometric has mean $\frac1p = \frac{n}{\lambda}$ steps. Each step lasts $\frac1n$ minute, so the mean time is $\frac{n}{\lambda} \times \frac1n = \frac{1}{\lambda}$. For $\lambda = 2$, the mean wait is half a minute.
9. **Variance:** a Geometric has variance $\frac{q}{p^2}$ steps², with $q = 1 - \frac{\lambda}{n}$. In time units, multiply by $\left(\frac1n\right)^2$: $\frac{1 - \lambda/n}{(\lambda/n)^2} \times \frac{1}{n^2} = \frac{1 - \lambda/n}{\lambda^2}$. As $n$ grows, $\frac{\lambda}{n} \to 0$, so the variance becomes $\frac{1}{\lambda^2}$.

**D. Memoryless property**

1. Example: $\lambda = 0.1$, already waited $s = 5$, ask about $t = 3$ more.
2. By the definition of conditional probability: $P(X > 8 \mid X > 5) = \frac{P(X > 8 \text{ and } X > 5)}{P(X > 5)}$.
3. "$X > 8$ and $X > 5$" is the same as "$X > 8$". Because every wait longer than 8 is also longer than 5.
4. So the answer is $\frac{e^{-0.8}}{e^{-0.5}} = e^{-0.8 + 0.5} = e^{-0.3}$. Because $\frac{e^a}{e^b} = e^{a-b}$.
5. And $P(X > 3) = e^{-0.1 \times 3} = e^{-0.3}$. Same number.
6. In symbols: $\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(X > t)$. The $s$ cancels, so the past does not matter.

**E. Median, floor and minimum**

1. **Median:** set $F(m) = 0.5$, so $1 - e^{-\lambda m} = 0.5$, so $e^{-\lambda m} = 0.5$.
2. Take $\ln$ of both sides: $-\lambda m = \ln 0.5 = -\ln 2$. So $m = \frac{\ln 2}{\lambda}$. Because $\ln$ undoes $e$.
3. **Floor:** $\lfloor X \rfloor = k$ means $k \le X < k + 1$. Example: $\lfloor X \rfloor = 2$ means $X$ is between 2 and 3.
4. So $P(\lfloor X \rfloor = k) = P(X > k) - P(X > k+1) = e^{-\lambda k} - e^{-\lambda(k+1)}$. Because survival to $k$ minus survival to $k+1$ leaves the part between.
5. Take out the common factor $e^{-\lambda k}$: $e^{-\lambda k}(1 - e^{-\lambda}) = q^k(1 - q)$ with $q = e^{-\lambda}$. This is a Geometric shape: $k$ "failures" with chance $q$, then one "success" with chance $1 - q$.
6. **Minimum:** the first failure comes after $x$ only if **both** machines survive past $x$. So $P(\min > x) = P(X_1 > x)P(X_2 > x)$. Because the machines are independent, so chances multiply.
7. This is $e^{-\lambda_1 x}e^{-\lambda_2 x} = e^{-(\lambda_1 + \lambda_2)x}$, which is the survival of an exponential with rate $\lambda_1 + \lambda_2$. Example: rates 1 and 2 give a first failure at rate 3, mean $\frac13$.

**F. The normal pdf**

The full proof of the normal formula is not needed for GATE. Here is an honest picture of where it comes from.

1. The normal appears when you **add many small, independent effects**. A student's height is the sum of many small genetic and food effects. This is the Central Limit Theorem (see topic: Central Limit Theorem & Sampling).
2. Simulation idea: toss 100 coins and count heads. Repeat this 10,000 times and draw a histogram. You get a bell shape centred at 50. Any sum of many small pieces gives this same bell.
3. The shape $e^{-x^2/2}$ has the right features. It is highest at $x = 0$, it is symmetric because $(-x)^2 = x^2$, and it falls very fast for big $x$: $e^{-2} \approx 0.135$ at $x = 2$, $e^{-4.5} \approx 0.011$ at $x = 3$.
4. The area under $e^{-x^2/2}$ over the whole line is exactly $\sqrt{2\pi}$. This is a known result (its proof uses a two-dimensional trick, not needed for GATE). So we divide by $\sqrt{2\pi}$ to make the total area 1. That is where the constant $\frac{1}{\sqrt{2\pi}}$ comes from.
5. To get $N(\mu, \sigma^2)$, shift the centre to $\mu$ (replace $x$ by $x - \mu$) and stretch the width by $\sigma$ (divide by $\sigma$). Stretching makes the curve wider, so we also divide the height by $\sigma$ to keep the area 1. This gives $\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$.

**G. Standardising and $\Phi(-z) = 1 - \Phi(z)$**

1. Example: $X \sim N(50, 16)$, so $\sigma = 4$. We want $P(X \le 58)$.
2. Subtract 50 from both sides: $X - 50 \le 8$. Divide both sides by 4: $\frac{X - 50}{4} \le 2$. Because doing the same thing to both sides keeps the inequality true (4 is positive).
3. The left side is $Z$, which has mean 0 and SD 1. Because subtracting the mean moves the centre to 0, and dividing by $\sigma$ makes the SD 1 (see topic: Random Variables, $\mathrm{Var}(aX) = a^2\mathrm{Var}(X)$).
4. So $P(X \le 58) = P(Z \le 2) = \Phi(2)$. In general, $P(X \le x) = \Phi\!\left(\frac{x - \mu}{\sigma}\right)$.
5. Symmetry: the area left of $-z$ is a mirror image of the area right of $z$. The area right of $z$ is $1 - \Phi(z)$. So $\Phi(-z) = 1 - \Phi(z)$.

**H. Moments of $Z$, and $\mathrm{Var}(Z^2) = 2$**

1. $E[Z] = 0$ and $E[Z^3] = 0$: for every value $z$ there is a mirror value $-z$ with the same height. Their odd powers $z^3$ and $-z^3$ cancel.
2. $E[Z^2] = \mathrm{Var}(Z) + (E[Z])^2 = 1 + 0 = 1$. Because $\mathrm{Var}(Z) = E[Z^2] - (E[Z])^2$, rearranged.
3. $E[Z^4] = 3$: the full calculation uses integration by parts and is not needed for GATE. The idea: the normal curve $\varphi(z)$ has slope $\varphi'(z) = -z\varphi(z)$, and this gives the rule $E[Z^4] = 3 \times E[Z^2] = 3$. (In general $E[Z^n] = (n-1)E[Z^{n-2}]$.)
4. Simulation check: square 1000 random normal numbers twice ($z^4$) and average them. You get about 3, because rare large values like $z = 2$ give $z^4 = 16$.
5. Then $\mathrm{Var}(Z^2) = E[(Z^2)^2] - (E[Z^2])^2 = E[Z^4] - 1^2 = 3 - 1 = 2$. Because this is the variance formula applied to the variable $Z^2$.

**I. Chi-square: mean $k$, variance $2k$**

1. Example: $k = 3$, so $\chi^2_3 = Z_1^2 + Z_2^2 + Z_3^2$.
2. Mean: $E[Z_1^2] + E[Z_2^2] + E[Z_3^2] = 1 + 1 + 1 = 3$. Because the mean of a sum is the sum of the means (always true).
3. Variance: $2 + 2 + 2 = 6$. Because for **independent** variables, variances add, and each $\mathrm{Var}(Z_i^2) = 2$ from H.
4. In general: mean $k$, variance $2k$.
5. Link to the exponential: $\chi^2_2$ has mean 2 and variance 4. An exponential with mean 2 has rate $\lambda = \frac12$ and variance $\frac{1}{\lambda^2} = 4$. They match. The full proof that the shapes are equal is not needed for GATE.

**J. Student's $t$**

1. $t_k$ is $Z$ divided by $\sqrt{V/k}$, where $V/k$ is the average of $k$ squared normals.
2. Each squared normal has mean 1, so for big $k$ the average $V/k$ is very close to 1. Because averages of many values settle near their mean (law of large numbers).
3. So for big $k$, $t_k \approx \frac{Z}{\sqrt 1} = Z$. That is why $t$ becomes normal as $k$ grows.
4. For small $k$, $V/k$ is sometimes small (like 0.1). Dividing by $\sqrt{0.1} \approx 0.32$ makes $Z$ about 3 times larger. That creates extra extreme values, so the tails are heavier.
5. The total area is still 1. So if more area sits in the tails, less area sits in the middle, and the peak is lower: $\frac1\pi \approx 0.318 < 0.399$. For $t_1$, put $y = 0$ into $h(y) = \frac{1}{\pi(1 + y^2)}$ to get $\frac1\pi$.

### Examples

**Example 1 (easy):** A bus comes at a uniformly random time in the next 20 minutes. What is P(wait more than 15 minutes)? Mean and variance of the wait?

1. $X \sim$ Uniform(0, 20), so the height is $\frac{1}{20}$.
2. $P(X > 15)$ is a rectangle of width $20 - 15 = 5$ and height $\frac{1}{20}$: $\frac{5}{20} = 0.25$.
3. Mean $= \frac{0 + 20}{2} = 10$ minutes.
4. Variance $= \frac{(20 - 0)^2}{12} = \frac{400}{12} \approx 33.3$.

**Result:** $P(X > 15) = 0.25$, mean 10 minutes, variance about 33.3.

**Example 2 (medium):** $f(x) = cx^2$ on $[0, 3]$. Find $c$, $P(X \le 1.5)$ and the median.

1. Total area must be 1: $\int_0^3 cx^2\,dx = c\left[\frac{x^3}{3}\right]_0^3 = c \times \frac{27}{3} = 9c$.
2. So $9c = 1$ and $c = \frac19$.
3. CDF: $F(x) = \int_0^x \frac{t^2}{9}\,dt = \frac{1}{9} \times \frac{x^3}{3} = \frac{x^3}{27}$.
4. $P(X \le 1.5) = \frac{1.5^3}{27} = \frac{3.375}{27} = 0.125$.
5. Median: $\frac{m^3}{27} = 0.5$, so $m^3 = 13.5$ and $m = 13.5^{1/3} \approx 2.38$.

**Result:** $c = \frac19$, $P(X \le 1.5) = 0.125$, median $\approx 2.38$.

**Example 3 (GATE level):** $X$ is exponential and $P(X > 3) = 0.2$. Find (a) $P(X > 9 \mid X > 6)$, (b) the rate $\lambda$.

1. (a) Use memorylessness with $s = 6$, $t = 3$: $P(X > 9 \mid X > 6) = P(X > 3) = 0.2$.
2. (b) Survival formula: $e^{-3\lambda} = 0.2$.
3. Take $\ln$: $-3\lambda = \ln 0.2 = -\ln 5$.
4. So $\lambda = \frac{\ln 5}{3} \approx \frac{1.609}{3} \approx 0.536$.

**Result:** (a) 0.2, (b) $\lambda \approx 0.536$.

**Example 4 (GATE level):** $X \sim$ Uniform(0, 3) and $Y \sim$ Uniform(1, 2) are independent. Find $P(X \ge Y)$.

1. Joint height $= \frac13 \times \frac11 = \frac13$ on the rectangle $[0, 3] \times [1, 2]$ (area 3). Because independent densities multiply.
2. Region $x \ge y$: for each $y$ in $[1, 2]$, $x$ goes from $y$ to 3, a length of $3 - y$.
3. Area $= \int_1^2 (3 - y)\,dy = \left[3y - \frac{y^2}{2}\right]_1^2 = (6 - 2) - (3 - 0.5) = 4 - 2.5 = 1.5$.
4. $P(X \ge Y) = 1.5 \times \frac13 = 0.5$.

**Result:** $P(X \ge Y) = 0.5$.

**Example 5 (medium, normal):** $X \sim N(50, 16)$. Find $P(46 < X < 58)$.

1. $\sigma = \sqrt{16} = 4$.
2. Standardise the ends: $\frac{58 - 50}{4} = 2$ and $\frac{46 - 50}{4} = -1$.
3. $P = \Phi(2) - \Phi(-1)$.
4. $\Phi(-1) = 1 - 0.8413 = 0.1587$.
5. $P = 0.9772 - 0.1587 = 0.8185$.

**Result:** $P(46 < X < 58) \approx 0.8185$.

**Example 6 (easy, chi-square):** $Z_1, Z_2, Z_3$ are independent $N(0,1)$. Find the mean and variance of $W = Z_1^2 + Z_2^2 + Z_3^2$.

1. $W$ is a sum of 3 independent squared standard normals, so $W \sim \chi^2_3$.
2. Mean $= k = 3$.
3. Variance $= 2k = 6$.

**Result:** mean 3, variance 6.

### Common mistakes
> **Common mistake:** Mixing "rate $\lambda$" and "mean $\lambda$". With rate $\lambda$: $P(X > x) = e^{-\lambda x}$. With mean $\lambda$: $P(X > x) = e^{-x/\lambda}$. Read the question line by line.

> **Common mistake:** Using $F(b)$ alone for $P(a \le X \le b)$. You must subtract $F(a)$.

> **Common mistake:** Using the variance as the SD when standardising. $N(50, 16)$ has $\sigma = 4$, not 16.

> **Common mistake:** Solving $e^{-2\lambda} = 0.25$ as $\lambda = \ln 4$. It is $2\lambda = \ln 4$, so $\lambda = \frac{\ln 4}{2} = \ln 2$.

> **Common mistake:** Thinking $t$ is "taller" than the normal because it has heavier tails. It is **shorter** at the centre ($0.318 < 0.399$) and **taller** only in the tails.

### How GATE asks it
Nine questions in 2024 to 2026, the most of any topic:
- **2024 Q.57:** exponential with $5E[X] = \mathrm{Var}(X)$: $\frac{5}{\lambda} = \frac{1}{\lambda^2} \Rightarrow \lambda = 0.2$.
- **2025 Q.21:** $P(X \ge 2) = 0.25$: $e^{-2\lambda} = \frac14 \Rightarrow \lambda = \ln 2$.
- **2025 Q.41:** floor of an exponential with mean $\frac{1}{\ln 10}$ is Geometric with $q = e^{-\ln 10} = 0.1$.
- **2026 Q.34:** memoryless: $P(X > 10 \mid X > 5) = P(X > 5) = 0.35$.
- **2024 Q.56:** $P(X \ge Y)$ for $X \sim U[1,3]$, $Y \sim U[2,4]$: triangle area $\frac12$ × joint height $\frac14 = 0.125$.
- **2025 Q.19:** a CDF of Uniform($t$, 4) with median 3: $\frac{3 - t}{4 - t} = \frac12 \Rightarrow t = 2$.
- **2025 Q.39:** given a CDF, $P(X^2 \le 0.25) = F(0.5) - F(-0.5) = 0.5625 - 0.0625 = 0.5$.
- **2025 Q.36:** $\mathrm{Var}(Z^2) = E[Z^4] - 1 = 2$.
- **2026 Q.28 (MSQ):** $N(0,1)$ vs $t_1$: both CDFs are 0.5 at 0; the peaks differ; heavier $t_1$ tail gives $G(-c) < H(-c)$.

> **GATE tip:** Memorise the exponential survival $e^{-\lambda x}$, the memoryless property, the uniform mean and variance, $E[Z^4] = 3$ and "chi-square $k$: mean $k$, variance $2k$". These alone covered most of the 14 marks.

### Summary
- First we said: for a continuous variable, a single point has zero chance, so probability is the **area** under a pdf, and $F(b) - F(a)$ gives the chance of an interval.
- The **uniform** is a flat rectangle: height $\frac{1}{b-a}$, mean at the midpoint, variance $\frac{(b-a)^2}{12}$ from the usual $E[X^2] - (E[X])^2$.
- The **exponential** is the Geometric waiting time with tiny steps. That is why its survival is $e^{-\lambda x}$, its mean is $\frac1\lambda$, and it has no memory.
- The **normal** bell comes from adding many small effects. Any normal becomes $Z$ after subtracting $\mu$ and dividing by $\sigma$, so one table $\Phi$ answers every normal question.
- Squaring and adding normals gives the **chi-square** (mean $k$, variance $2k$, because $E[Z^2] = 1$ and $\mathrm{Var}(Z^2) = 2$). Dividing a normal by a chi-square root gives the **t**, which has heavier tails and becomes normal for large $k$.
- Next topic builds on this: Joint, Marginal & Conditional Distributions (two variables at once), and later the CLT and confidence intervals, which use the normal, chi-square and $t$.

### Quick self-check
1. $X \sim$ Exponential with mean 4. Find $P(X > 8)$.

**Answer:** Rate $= \frac14$, so $e^{-8/4} = e^{-2} \approx 0.135$.

2. $X \sim N(100, 25)$. Find $P(X > 110)$.

**Answer:** $\sigma = 5$, $z = 2$, $1 - \Phi(2) = 0.0228$.

3. What are the mean and variance of $\chi^2_{10}$?

**Answer:** Mean 10, variance 20.

## Joint, Marginal & Conditional Distributions

### The big idea
When we study **two** random variables together (like height and weight), we need their **joint distribution**: the chance of each pair of values.

From it we can get each variable alone (the **marginal**). We can also get one variable after fixing the other (the **conditional**).

### Before you start
**Random variable (see topic: Random Variables & Expectation/Variance).** A random variable is a number that comes out of a random experiment. Example: roll a die, $X$ = the number shown. $X$ can be 1, 2, ..., 6, each with chance $\frac16$.

**pmf and pdf (see topics: Discrete Distributions, Continuous Distributions).** A **pmf** $p(x) = P(X = x)$ gives the chance of each value of a discrete variable. A **pdf** $f(x)$ is a curve for a continuous variable. The chance of landing between $a$ and $b$ is the **area** under the curve from $a$ to $b$.

**Conditional probability (see topic: Basic Probability & Conditional Probability).** $P(A \mid B)$ means "the chance of $A$ when we already know $B$ happened". The formula is

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$

Here $A \cap B$ means "both $A$ and $B$ happen". Example: 30 of 100 students study daily, and 20 of those passed. Then $P(\text{pass} \mid \text{study}) = \frac{0.2}{0.3} = \frac23$.

**Sum symbol $\sum$.** $\sum_y p(x, y)$ means "add $p(x, y)$ for every possible value of $y$". Example: if $y$ can be 0 or 1, it means $p(x, 0) + p(x, 1)$.

**Integral $\int$.** $\int_a^b g(y)\,dy$ is the area under the curve $g$ from $a$ to $b$. It is the "continuous version" of adding. Example: $\int_0^1 2y\,dy = \big[y^2\big]_0^1 = 1$.

**Double integral $\iint$.** $\iint f(x, y)\,dx\,dy$ means: integrate over $y$ first (with $x$ held fixed), then integrate the result over $x$. It gives the **volume** under a surface. Example: $\int_0^1\int_0^1 1\,dy\,dx = \int_0^1 1\,dx = 1$ (a box of base $1 \times 1$ and height 1).

**Expectation $E[X]$ (see topic: Random Variables & Expectation/Variance).** $E[X]$ is the long-run average: $E[X] = \sum x\,p(x)$ or $E[X] = \int x\,f(x)\,dx$. Example: for a fair die, $E[X] = 3.5$.

**Independence (see topic: Basic Probability & Conditional Probability).** Events $A$ and $B$ are independent if $P(A \cap B) = P(A)\,P(B)$. Knowing one tells you nothing about the other.

### Intuition
Think of a class of 100 students. For each student we write two things: X = "studies maths daily?" (0 or 1) and Y = "passed the test?" (0 or 1).

We make a 2 × 2 table of counts. That table, divided by 100, is the **joint distribution**. Each cell is the chance of one combination, like "studies and passed".

Now add up each row. You get the chance of X alone, ignoring Y. These totals are written in the **margin** (edge) of the table, so they are called **marginal** probabilities.

Next, look only at the row "studies daily". Among these students, what fraction passed? You divide the cell by the row total. This is the **conditional** distribution of Y given X, the same "zoom in" idea as conditional probability.

> **Intuition:** Joint = the full table. Marginal = the row or column totals (add out the other variable). Conditional = one row, rescaled so it adds to 1.

For continuous variables, the table becomes a **surface** $f(x, y)$ over the floor (the xy-plane). The chance of landing in a region is the **volume** under the surface above that region. To get the marginal of $X$, you "squash" the surface onto the x-axis by integrating over $y$.

**Conditional expectation** $E[Y \mid X = x]$ is the average of $Y$ in that one slice. Example: the average weight of students who are exactly 170 cm tall.

If you average these slice-averages over all heights (weighted by how common each height is), you get back the overall average weight. This is the **tower rule**: $E[E[Y \mid X]] = E[Y]$.

### Words you need
- **Joint pmf** $p(x, y) = P(X = x, Y = y)$: the chance of a pair. Example: the cell "studies and passed".
- **Joint pdf** $f(x, y)$: a density surface; volume under it gives probability.
- **Support**: the region where $f(x, y) > 0$. Example: $0 < y < x < 1$ is a triangle.
- **Marginal** $p_X(x)$ or $f_X(x)$: distribution of $X$ alone. Example: row totals.
- **Conditional** $f_{Y \mid X}(y \mid x)$: distribution of $Y$ in the slice $X = x$.
- **Conditional expectation** $E[Y \mid X = x]$: the mean of that slice. $E[Y \mid X]$ (without a number) is itself a random variable, a function of $X$.
- **Independent**: the joint is the product of the marginals everywhere.

### Formulas, explained

**Marginals**
$$p_X(x) = \sum_y p(x, y), \qquad f_X(x) = \int f(x, y)\,dy$$
- **Read it as:** "to get X alone, add (or integrate) over all values of Y."
- **Symbols:** $p(x, y)$ = joint pmf, $f(x, y)$ = joint pdf, $p_X$, $f_X$ = marginal of $X$.
- **Why it makes sense:** "X = 2" happens together with some value of $Y$. Add all those cases.
- **Use it when:** you are given a joint table or joint pdf and need one variable. **Careful:** integrate $y$ only over the support for that $x$ (e.g. $0$ to $x$ for a triangle).

**Conditional distribution**
$$f_{Y \mid X}(y \mid x) = \frac{f(x, y)}{f_X(x)}$$
- **Read it as:** "the conditional density of Y given X equals the joint divided by the marginal of X."
- **Symbols:** $x$ is a fixed number; $y$ is the variable.
- **Why it makes sense:** take the slice at $X = x$, then divide by its total so the slice has area 1.
- **Use it when:** "given $X = x$". Any constant in $f$ cancels, so the slice shape alone decides the answer.

**Conditional expectation**
$$E[Y \mid X = x] = \int y\,f_{Y \mid X}(y \mid x)\,dy$$
- **Read it as:** "the expected Y given X equals x is the average of y over the slice."
- **Why it makes sense:** it is the usual $E[Y] = \int y\,f(y)\,dy$, but using the slice density instead of the full density.
- **Use it when:** "find $E[Y \mid X = 1.5]$".

**Tower rule (law of total expectation)**
$$E\big[E[Y \mid X]\big] = E[Y]$$
- **Read it as:** "the average of the slice averages is the overall average."
- **Why it makes sense:** the class average equals the weighted average of section averages.
- **Use it when:** recall questions, and to compute $E[XY] = E\big[X\,E[Y \mid X]\big]$ quickly.

**Law of total variance**
$$\mathrm{Var}(Y) = E\big[\mathrm{Var}(Y \mid X)\big] + \mathrm{Var}\big(E[Y \mid X]\big)$$
- **Read it as:** "total spread = average spread inside slices + spread between slice averages."
- **Why it makes sense:** students differ because sections differ (between) and because students in one section differ (inside).
- **Use it when:** $Y$ is built in two stages (first pick $X$, then $Y$ given $X$).

**Independence**
$$X, Y \text{ independent} \iff f(x, y) = f_X(x)\,f_Y(y) \text{ for all } x, y$$
- **Read it as:** "the joint is the product of the marginals."
- **Why it makes sense:** it is $P(A \cap B) = P(A)P(B)$ applied to every pair of values.
- **Shortcut:** if the support is not a rectangle (like $0 < y < x$), they are **not** independent, because knowing $x$ limits $y$.
- **Use it when:** "are X and Y independent?" For independent uniforms, probability $=$ area of region × constant height.

**Valid joint pdf**
$$f(x, y) \ge 0, \qquad \iint f(x, y)\,dx\,dy = 1$$
- **Read it as:** "a joint pdf is never negative and has total volume 1."
- **Why it makes sense:** total probability of "something happens" is 1.
- **Use it when:** finding a constant $c$, or checking a given pdf.

### Where the formulas come from

**1. Marginal: adding out the other variable**

Start with the table in Example 1 below: $p(0,0) = 0.1$, $p(0,1) = 0.3$.

1. The event "$X = 0$" happens in exactly two ways: "$X = 0, Y = 0$" or "$X = 0, Y = 1$". Because $Y$ must take some value.
2. These two ways cannot both happen. Because $Y$ cannot be 0 and 1 at the same time.
3. So we add them: $P(X = 0) = 0.1 + 0.3 = 0.4$. Because for events that cannot happen together, $P(A \cup B) = P(A) + P(B)$.
4. In general, split "$X = x$" by every value of $y$ and add:

$$p_X(x) = \sum_y p(x, y)$$

5. For continuous variables, adding over all $y$ becomes integrating over $y$. Because an integral is the continuous version of a sum:

$$f_X(x) = \int f(x, y)\,dy$$

**2. Conditional: one slice, rescaled**

1. Start from the conditional probability rule: $P(Y = y \mid X = x) = \frac{P(X = x, Y = y)}{P(X = x)}$. Because this is just $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ with $A$ = "$Y = y$" and $B$ = "$X = x$".
2. Replace the pieces by their names: top $= p(x, y)$, bottom $= p_X(x)$.

$$p_{Y \mid X}(y \mid x) = \frac{p(x, y)}{p_X(x)}$$

3. Check it adds to 1: $\sum_y \frac{p(x, y)}{p_X(x)} = \frac{p_X(x)}{p_X(x)} = 1$. Because the top adds to $p_X(x)$ by the marginal formula.
4. For densities we use the same shape with $f$ in place of $p$. Because a density behaves like "probability per unit", and the same division rescales the slice to area 1.
5. Any constant $c$ in $f(x, y) = c\,g(x, y)$ appears in both top and bottom, so it cancels. That is why a conditional depends only on the **shape** of the slice.

**3. Conditional expectation**

1. Ordinary expectation is $E[Y] = \int y\,f_Y(y)\,dy$: each value times its weight.
2. Inside the slice $X = x$, the correct weights are $f_{Y \mid X}(y \mid x)$. Because that is the distribution of $Y$ once we know $X = x$.
3. So we use the same recipe with the slice weights:

$$E[Y \mid X = x] = \int y\,f_{Y \mid X}(y \mid x)\,dy$$

**4. Tower rule**

Small example: a school has section A with 40 students (average mark 60) and section B with 60 students (average mark 70).

1. The overall average is total marks divided by 100. Total marks $= 40 \times 60 + 60 \times 70 = 2400 + 4200 = 6600$. Because each section's total is (count × average).
2. Overall average $= \frac{6600}{100} = 66$.
3. Write the same thing as weights: $0.4 \times 60 + 0.6 \times 70 = 66$. Here 0.4 and 0.6 are $P(X = A)$ and $P(X = B)$, and 60, 70 are $E[Y \mid X]$.
4. So "average of section averages, weighted by section size" $=$ overall average. In symbols, for discrete $X$:

$$E[Y] = \sum_x P(X = x)\,E[Y \mid X = x] = E\big[E[Y \mid X]\big]$$

5. The last step is true because $E[Y \mid X]$ is a function of $X$, and the average of any function $g(X)$ is $\sum_x g(x)\,P(X = x)$.

**5. $E[XY] = E[X\,E[Y \mid X]]$**

1. Apply the tower rule to the variable $XY$: $E[XY] = E\big[E[XY \mid X]\big]$.
2. Inside the slice $X = x$, the value $X$ is the fixed number $x$, so it comes out: $E[XY \mid X = x] = x\,E[Y \mid X = x]$. Because $E[cY] = c\,E[Y]$ for a constant $c$.
3. So $E[XY] = E\big[X\,E[Y \mid X]\big]$.

**6. Law of total variance (intuitive reason)**

The full algebra is not needed for GATE. Here is the honest idea with the sections example.

1. Suppose marks inside section A vary with variance 25, and inside section B with variance 16.
2. **Inside part:** the average of these, $0.4 \times 25 + 0.6 \times 16 = 10 + 9.6 = 19.6$. This is $E[\mathrm{Var}(Y \mid X)]$.
3. **Between part:** the section averages 60 and 70 also differ. Their spread around 66 is $0.4 \times (60-66)^2 + 0.6 \times (70-66)^2 = 14.4 + 9.6 = 24$. This is $\mathrm{Var}(E[Y \mid X])$.
4. Total variance $= 19.6 + 24 = 43.6$. Because a student's distance from 66 is (distance from own section average) + (section average's distance from 66), and the two parts do not cancel or overlap on average.

**7. Independence as a product**

1. Independence of events means $P(A \cap B) = P(A)\,P(B)$.
2. Take $A$ = "$X = x$" and $B$ = "$Y = y$". Then $p(x, y) = p_X(x)\,p_Y(y)$. Because this must hold for every pair of values.
3. Same rule for densities: $f(x, y) = f_X(x)\,f_Y(y)$.
4. Connection: then the conditional equals the marginal, $f_{Y \mid X} = \frac{f_X f_Y}{f_X} = f_Y$. Knowing $x$ changes nothing.
5. Why a triangle support breaks it: on $0 < y < x$, the point $x = 0.2$, $y = 0.5$ has $f = 0$. But $f_X(0.2) > 0$ and $f_Y(0.5) > 0$, so the product is not 0. The product rule fails, so they are dependent.

### Examples

**Example 1 (easy):** The joint table of $X$ and $Y$ is below. Find the marginals, check independence, find $P(Y = 1 \mid X = 1)$ and the covariance.

| | $Y = 0$ | $Y = 1$ | $p_X$ |
|---|---|---|---|
| $X = 0$ | 0.1 | 0.3 | 0.4 |
| $X = 1$ | 0.2 | 0.4 | 0.6 |
| $p_Y$ | 0.3 | 0.7 | 1 |

1. Marginals of $X$ (row sums): $p_X(0) = 0.1 + 0.3 = 0.4$, $p_X(1) = 0.2 + 0.4 = 0.6$.
2. Marginals of $Y$ (column sums): $p_Y(0) = 0.1 + 0.2 = 0.3$, $p_Y(1) = 0.3 + 0.4 = 0.7$.
3. Independence test: $P(X=0, Y=0) = 0.1$, but $p_X(0)\,p_Y(0) = 0.4 \times 0.3 = 0.12$. Not equal, so **not independent**.
4. Conditional: $P(Y = 1 \mid X = 1) = \frac{0.4}{0.6} = \frac23$.
5. $E[XY]$: only the cell $X = 1, Y = 1$ gives $XY \ne 0$, so $E[XY] = 1 \times 1 \times 0.4 = 0.4$.
6. $E[X] = 0.6$, $E[Y] = 0.7$. Covariance $= E[XY] - E[X]E[Y] = 0.4 - 0.42 = -0.02$.

**Result:** not independent, $P(Y = 1 \mid X = 1) = \frac23$, $\mathrm{Cov}(X, Y) = -0.02$.

**Example 2 (medium):** $f(x, y) = x + y$ on $[0,1] \times [0,1]$. Check validity, find $f_X$ and $P(X + Y \le 1)$.

1. Inner integral: $\int_0^1 (x + y)\,dy = x + \frac12$. Because $\int_0^1 x\,dy = x$ and $\int_0^1 y\,dy = \frac12$.
2. Outer integral: $\int_0^1 \left(x + \frac12\right)dx = \frac12 + \frac12 = 1$. So $f$ is valid.
3. Marginal: $f_X(x) = \int_0^1 (x + y)\,dy = x + \frac12$ (the inner integral from step 1).
4. For $X + Y \le 1$, with $x$ fixed, $y$ runs from 0 to $1 - x$. So $P = \int_0^1 \int_0^{1-x} (x + y)\,dy\,dx$.
5. Inner: $x(1-x) + \frac{(1-x)^2}{2} = \frac{(1-x)\big(2x + (1 - x)\big)}{2} = \frac{(1-x)(1+x)}{2} = \frac{1 - x^2}{2}$.
6. Outer: $\int_0^1 \frac{1 - x^2}{2}\,dx = \frac12\left(1 - \frac13\right) = \frac13$.

**Result:** valid, $f_X(x) = x + \frac12$, $P(X + Y \le 1) = \frac13$.

**Example 3 (GATE level):** $f(x, y) = 6y$ for $0 < y < x < 1$, else 0. Find $E[Y \mid X = 0.6]$.

1. Draw the region: a triangle under the line $y = x$. For a fixed $x$, $y$ goes from 0 to $x$.
2. Validity: $\int_0^1 \int_0^x 6y\,dy\,dx = \int_0^1 3x^2\,dx = 1$. Good.
3. Marginal: $f_X(x) = \int_0^x 6y\,dy = 3x^2$.
4. Conditional: $f_{Y \mid X}(y \mid x) = \frac{6y}{3x^2} = \frac{2y}{x^2}$ for $0 < y < x$.
5. Conditional mean: $E[Y \mid X = x] = \int_0^x y \cdot \frac{2y}{x^2}\,dy = \frac{2}{x^2} \cdot \frac{x^3}{3} = \frac{2x}{3}$.
6. At $x = 0.6$: $\frac{2 \times 0.6}{3} = 0.4$.
7. Sanity check: $Y$ lives in $(0, 0.6)$ and the density $2y/x^2$ leans to the right, so the mean should be above the midpoint 0.3. 0.4 fits.

**Result:** $E[Y \mid X = 0.6] = 0.4$.

### Common mistakes
> **Common mistake:** Integrating $y$ from 0 to 1 when the support is the triangle $0 < y < x$. Draw the region first and read the limits from the picture.

> **Common mistake:** Calling variables independent because $f(x, y)$ "looks like a product", such as $2xy$. If the support is a triangle, they are dependent.

> **Common mistake:** Forgetting to divide by the marginal. A slice of the joint is not a density until you rescale it.

> **Common mistake:** Treating $E[X \mid Y]$ as a number. It is a function of $Y$; its average is $E[X]$.

### How GATE asks it
- **2024 Q.59:** $E[Y \mid X = 1.5]$ from $f = 2xy$ on $0 < y < x < 2$. The given $f$ integrates to 4, not 1, so the official key was **marks to all**. The intended method: $f_{Y \mid X} = \frac{2y}{x^2}$, so $E = \frac{2x}{3} = 1$. The constant does not matter for a conditional.
- **2025 Q.11:** $E[E[X \mid Y]] = E[X]$. A 1-mark recall of the tower rule.
- The same tools appear in questions tagged elsewhere: **2024 Q.56** ($P(X \ge Y)$ as an area), **2026 Q.63** ($E[XY] = E[X\,E[Y \mid X]]$), **2026 Q.64** (conditioning on a shared entry).

> **GATE tip:** For any "given $X = x$" question, use 3 steps: write the slice $f(x, y)$ as a function of $y$, find its total, divide. Then integrate $y$ times the slice.

### Summary
- First we put two random variables in one table (or one surface): the **joint** distribution.
- Then we add out one variable to get the other alone: the **marginal** (row and column totals).
- Next we zoom into one row or slice and divide by its total: the **conditional**, which is just $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ again.
- The average of that slice is the **conditional expectation**, and averaging the slice averages gives back the overall average (tower rule).
- If every cell equals (row total) × (column total), the variables are **independent**; a non-rectangle support always means dependent.
- Next topic builds on this: Descriptive Statistics, Covariance & Correlation, where $E[XY]$ from the joint gives the covariance.

### Quick self-check
1. $P(X = 1, Y = 1) = 0.2$, $P(X = 1) = 0.5$. Find $P(Y = 1 \mid X = 1)$.

**Answer:** $\frac{0.2}{0.5} = 0.4$.

2. Is $f(x, y) = 4xy$ on $[0,1]^2$ a product of marginals?

**Answer:** Yes: $f_X = 2x$, $f_Y = 2y$, product $4xy$, and the support is a square. Independent.

3. $E[Y \mid X] = 3X$ and $E[X] = 2$. Find $E[Y]$.

**Answer:** By the tower rule, $E[Y] = E[3X] = 3 \times 2 = 6$.

## Descriptive Statistics, Covariance & Correlation

### The big idea
**Descriptive statistics** summarise a pile of numbers with a few key values. We describe the **centre** (mean, median, mode) and the **spread** (variance, standard deviation).

For two variables, we also describe **how they move together** (covariance, correlation).

### Before you start
**Sum symbol $\sum$.** $\sum_{i=1}^n x_i$ means "add $x_1 + x_2 + \dots + x_n$". The letter $i$ is a counter that runs from 1 to $n$. Example: for data 2, 4, 6, $\sum_{i=1}^3 x_i = 12$.

**Double sum $\sum_i \sum_j$.** $\sum_{i=1}^n \sum_{j=1}^n a_{ij}$ means "add $a_{ij}$ for every pair $(i, j)$", which is $n \times n$ terms. Example: with $n = 2$, it is $a_{11} + a_{12} + a_{21} + a_{22}$.

**Two sum rules.** A constant can come out of a sum: $\sum c\,x_i = c\sum x_i$. Adding a constant $n$ times gives $\sum_{i=1}^n c = nc$. Example: $\sum_{i=1}^3 5 = 15$.

**Squares and square roots.** $(a - b)^2 = a^2 - 2ab + b^2$. The square root $\sqrt{v}$ undoes squaring: $\sqrt{9} = 3$. We square deviations so that negative and positive distances do not cancel.

**Absolute value $\lvert a \rvert$.** The size of a number without its sign: $\lvert -3 \rvert = 3$.

**Expectation $E[X]$ and variance (see topic: Random Variables & Expectation/Variance).** $E[X]$ is the long-run average of a random variable. $\mathrm{Var}(X) = E[(X - \mu)^2]$ is the average squared distance from the mean $\mu$. Rules: $E[aX + b] = aE[X] + b$ and $E[X + Y] = E[X] + E[Y]$.

**Indicator variable.** $I_A = 1$ if event $A$ happens, else 0. Its average is $E[I_A] = 1 \cdot P(A) + 0 \cdot (1 - P(A)) = P(A)$.

**Joint distribution and $E[XY]$ (see topic: Joint, Marginal & Conditional Distributions).** To find $E[XY]$, multiply $x \cdot y$ for each cell of the joint table by its probability and add.

**Independence (see topic: Basic Probability & Conditional Probability).** If $X$ and $Y$ are independent, then $E[XY] = E[X]\,E[Y]$.

### Intuition
Your class gets marks in a test. The teacher cannot read out 60 marks. She says: "The average is 62, the middle student got 65, and most students were within 10 marks of the average." That is descriptive statistics.

- **Mean**: add everything and divide by how many. It is the "fair share" if everyone pooled their marks.
- **Median**: sort the marks and take the middle one. One topper with 100 does not move it much, so it is **robust** to extreme values.
- **Mode**: the most common value.

For spread, measure each student's **deviation** (distance from the mean). Square them, then average. That is the **variance**, and its square root is the **standard deviation**.

Now think of two variables: hours studied (X) and marks (Y). If students who study more usually score more, then when X is above its mean, Y is usually above its mean too.

The product (X − mean)(Y − mean) is then mostly positive. Its average is the **covariance**. Positive means "move together", negative means "move opposite", near zero means "no straight-line link".

Covariance depends on units (hours × marks). To get a pure number, divide by both standard deviations. This gives the **correlation** $\rho$ (rho), always between $-1$ and $+1$.

> **Intuition:** Correlation measures how close the points are to a **straight line**. $+1$ = perfect rising line, $-1$ = perfect falling line, 0 = no straight-line pattern. But 0 does NOT mean "no relationship". Points on a U-shaped curve ($y = x^2$) have zero correlation, yet $y$ is fully decided by $x$.

### Words you need
- **Data set** $x_1, \dots, x_n$: the $n$ numbers. Example: 2, 4, 4, 5, 7, 8.
- **Mean** $\bar x$ ("x bar"): the average. Example: $30 / 6 = 5$.
- **Median**: the middle value after sorting (average of the two middles if $n$ is even).
- **Mode**: the most frequent value.
- **Deviation** $x_i - \bar x$: distance from the mean. The deviations always add to 0.
- **Population variance** (divide by $n$) and **sample variance** $s^2$ (divide by $n - 1$).
- **Standard deviation (SD)**: the square root of the variance, in the same units as the data.
- **Covariance** $\mathrm{Cov}(X, Y)$: average product of deviations.
- **Correlation** $\rho$ or $r$: covariance scaled to $[-1, 1]$.
- **Uncorrelated**: correlation is 0.

### Formulas, explained

**Mean and updating a mean**
$$\bar x = \frac{1}{n}\sum_{i=1}^n x_i, \qquad \bar x_{\text{new}} = \frac{n\bar x + x_{\text{new}}}{n + 1}$$
- **Read it as:** "the mean is the total divided by the count; to add a point, rebuild the total."
- **Symbols:** $\sum_{i=1}^n x_i$ = sum of all $n$ values.
- **Why it makes sense:** $n\bar x$ gives back the old total. Add the new value and divide by the new count.
- **Use it when:** "the average of 50 numbers is 40; a new value is added".

**Variance (population and sample)**
$$\sigma^2 = \frac{1}{n}\sum_{i=1}^n (x_i - \bar x)^2, \qquad s^2 = \frac{1}{n-1}\sum_{i=1}^n (x_i - \bar x)^2$$
- **Read it as:** "variance is the average squared deviation; the sample version divides by n minus 1."
- **Symbols:** $\sigma^2$ (sigma squared) = population variance, $s^2$ = sample variance.
- **Why it makes sense:** squaring makes all distances positive, and averaging gives a typical squared distance. The $n - 1$ is explained in the next section.
- **Shortcut:** $\sum (x_i - \bar x)^2 = \sum x_i^2 - n\bar x^2$.
- **Use it when:** "sample variance" means $n - 1$; "population variance" or "variance of the data" usually means $n$. Read carefully.

**Pairwise-difference identity**
$$\sum_{i=1}^n \sum_{j=1}^n (x_i - x_j)^2 = 2n \sum_{i=1}^n (x_i - \bar x)^2$$
- **Read it as:** "the sum of squared differences over all pairs equals 2n times the sum of squared deviations."
- **Why it makes sense:** spread can be measured from the mean or between every pair of points. Both measure the same spread, so they are linked by a fixed factor.
- **Use it when:** a question gives a double sum of $(x_i - x_j)^2$.

**Linear transformation of data**
$$y = ax + b \Rightarrow \bar y = a\bar x + b, \quad \mathrm{SD}_y = \lvert a \rvert\,\mathrm{SD}_x, \quad \mathrm{Var}_y = a^2\,\mathrm{Var}_x$$
- **Read it as:** "shifting moves the centre but not the spread; scaling multiplies both."
- **Why it makes sense:** adding $b$ to everyone moves everyone together, so distances between them do not change.
- **Use it when:** converting units (Celsius to Fahrenheit), adding bonus marks.

**Covariance**
$$\mathrm{Cov}(X, Y) = E\big[(X - \mu_X)(Y - \mu_Y)\big] = E[XY] - E[X]\,E[Y]$$
- **Read it as:** "covariance is the mean of the product minus the product of the means."
- **Symbols:** $\mu_X, \mu_Y$ = means of $X$ and $Y$.
- **Why it makes sense:** if big $X$ comes with big $Y$, the products of deviations are positive. The second form is the expanded version, and it is faster.
- **Rules:** $\mathrm{Cov}(X, X) = \mathrm{Var}(X)$. $\mathrm{Cov}(aX + b, cY + d) = ac\,\mathrm{Cov}(X, Y)$. Independent $\Rightarrow$ $\mathrm{Cov} = 0$. For indicators: $\mathrm{Cov}(I_A, I_B) = P(A \cap B) - P(A)P(B)$.
- **Use it when:** any "covariance" question. Data version: $\frac{1}{n-1}\sum (x_i - \bar x)(y_i - \bar y)$.

**Correlation**
$$\rho = \frac{\mathrm{Cov}(X, Y)}{\sigma_X\,\sigma_Y}, \qquad -1 \le \rho \le 1$$
- **Read it as:** "correlation is covariance divided by the product of standard deviations."
- **Symbols:** $\sigma_X, \sigma_Y$ = standard deviations of $X$ and $Y$.
- **Why it makes sense:** dividing removes the units. $\lvert \rho \rvert = 1$ exactly when $Y = aX + b$.
- **Facts:** unchanged by shifting or by scaling with positive numbers; the sign flips if one variable is multiplied by a negative number. **Independent $\Rightarrow$ uncorrelated, but uncorrelated does not imply independent.**
- **Use it when:** "correlation", "strength of linear relationship".

### Where the formulas come from

**1. Updating a mean**

Small example: the mean of 4 numbers is 10, and we add the number 20.

1. The old total is $4 \times 10 = 40$. Because mean = total / count, so total = count × mean.
2. The new total is $40 + 20 = 60$, and the new count is 5.
3. The new mean is $\frac{60}{5} = 12$.
4. In symbols: old total $= n\bar x$, new total $= n\bar x + x_{\text{new}}$, new count $= n + 1$. So

$$\bar x_{\text{new}} = \frac{n\bar x + x_{\text{new}}}{n + 1}$$

**2. Deviations add to zero**

1. Data 2, 4, 6 has mean 4. Deviations: $-2, 0, 2$. Sum $= 0$.
2. In general, $\sum (x_i - \bar x) = \sum x_i - n\bar x$. Because $\bar x$ is a constant added $n$ times.
3. And $n\bar x = \sum x_i$ by the definition of the mean. So the sum is $0$.

**3. Variance shortcut $\sum (x_i - \bar x)^2 = \sum x_i^2 - n\bar x^2$**

1. Expand one square: $(x_i - \bar x)^2 = x_i^2 - 2\bar x\,x_i + \bar x^2$. Because $(a - b)^2 = a^2 - 2ab + b^2$.
2. Add over all $i$: $\sum x_i^2 - 2\bar x \sum x_i + n\bar x^2$. Because $\bar x$ is a constant and comes out of the sum.
3. Replace $\sum x_i$ by $n\bar x$: $\sum x_i^2 - 2n\bar x^2 + n\bar x^2 = \sum x_i^2 - n\bar x^2$.
4. Check with 2, 4, 6: $\sum x_i^2 = 4 + 16 + 36 = 56$, and $n\bar x^2 = 3 \times 16 = 48$. Difference 8. Direct: $4 + 0 + 4 = 8$. Same.

**4. Why the sample variance divides by $n - 1$**

The full proof is not needed for GATE. Here is the honest reason.

1. We really want the spread around the **true** mean $\mu$, but we only know the sample mean $\bar x$.
2. $\bar x$ is computed from the same data, so it sits in the middle of these points. It is closer to them than $\mu$ usually is.
3. So $\sum(x_i - \bar x)^2$ is a bit **too small** on average. Example: one data point $x_1$ gives $\bar x = x_1$ and a sum of $0$, even though the true spread is not 0.
4. Another view: the deviations must add to 0, so once you know $n - 1$ of them, the last one is fixed. Only $n - 1$ deviations are "free".
5. Dividing by $n - 1$ instead of $n$ makes the answer slightly bigger. It corrects the shortfall exactly on average, so $s^2$ is called **unbiased**.

**5. Pairwise-difference identity**

1. Let $d_i = x_i - \bar x$. Then $x_i - x_j = d_i - d_j$. Because the $\bar x$ cancels.
2. Expand: $(d_i - d_j)^2 = d_i^2 + d_j^2 - 2d_id_j$.
3. Sum of the $d_i^2$ terms over all pairs: for each $i$, $j$ takes $n$ values, so we get $n\sum_i d_i^2$.
4. Sum of the $d_j^2$ terms: the same by symmetry, $n\sum_j d_j^2$.
5. Sum of the $-2d_id_j$ terms: $-2\big(\sum_i d_i\big)\big(\sum_j d_j\big) = -2 \times 0 \times 0 = 0$. Because deviations add to 0 (part 2).
6. Total: $2n\sum d_i^2$, which is the identity.
7. Check with data 1, 3 ($n = 2$, $\bar x = 2$): pairs give $0 + 4 + 4 + 0 = 8$. Right side: $2 \times 2 \times (1 + 1) = 8$. Same.

**6. Linear transformation**

1. Each new value is $y_i = ax_i + b$. Mean: $\bar y = \frac{1}{n}\sum(ax_i + b) = a\bar x + b$. Because the constant comes out and $b$ is added $n$ times then divided by $n$.
2. Deviation: $y_i - \bar y = (ax_i + b) - (a\bar x + b) = a(x_i - \bar x)$. The $b$ cancels, so shifting does not change spread.
3. Square: $(y_i - \bar y)^2 = a^2(x_i - \bar x)^2$, so the variance is multiplied by $a^2$.
4. Square root: SD is multiplied by $\sqrt{a^2} = \lvert a \rvert$. Because an SD is never negative.

**7. Covariance: the short form**

1. Start from the definition $E[(X - \mu_X)(Y - \mu_Y)]$.
2. Multiply out: $XY - \mu_Y X - \mu_X Y + \mu_X\mu_Y$.
3. Take the average of each piece: $E[XY] - \mu_Y\mu_X - \mu_X\mu_Y + \mu_X\mu_Y$. Because $E$ of a sum is the sum of $E$s, and constants come out.
4. Two middle terms cancel one copy, leaving

$$\mathrm{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$$

5. Connection: put $Y = X$ and you get $E[X^2] - (E[X])^2$, which is the variance formula. So variance is covariance of a variable with itself.
6. If $X$ and $Y$ are independent, $E[XY] = E[X]E[Y]$, so $\mathrm{Cov} = 0$.
7. Scaling rule: $(aX + b) - (a\mu_X + b) = a(X - \mu_X)$ and likewise for $cY + d$. So the product of deviations gets multiplied by $ac$, and $\mathrm{Cov}$ does too.

**8. Indicator covariance**

1. $I_A I_B = 1$ only when both $A$ and $B$ happen, else 0. So $E[I_A I_B] = P(A \cap B)$.
2. $E[I_A] = P(A)$ and $E[I_B] = P(B)$.
3. Put into the short form: $\mathrm{Cov}(I_A, I_B) = P(A \cap B) - P(A)P(B)$.

**9. Correlation and why it stays in $[-1, 1]$**

1. Covariance has units (hours × marks). Dividing by $\sigma_X$ (hours) and $\sigma_Y$ (marks) removes them, giving $\rho$.
2. If $Y = aX + b$ exactly, then $\mathrm{Cov}(X, Y) = a\,\mathrm{Var}(X)$ and $\sigma_Y = \lvert a \rvert \sigma_X$. So $\rho = \frac{a\sigma_X^2}{\sigma_X \cdot \lvert a \rvert \sigma_X} = \pm 1$.
3. Why it cannot pass 1: the full proof (Cauchy–Schwarz) is not needed for GATE. Intuition: a variance is never negative, and $\mathrm{Var}\big(\frac{X}{\sigma_X} - \frac{Y}{\sigma_Y}\big) = 2 - 2\rho \ge 0$, which forces $\rho \le 1$. The same with a plus sign gives $2 + 2\rho \ge 0$, so $\rho \ge -1$.
4. Scaling by positive numbers changes top and bottom by the same factor, so $\rho$ is unchanged. A negative factor flips only the sign of the top.

### Examples

**Example 1 (easy):** Data: 2, 4, 4, 5, 7, 8. Find mean, median, mode, population variance and sample variance.

1. Mean $= \frac{2+4+4+5+7+8}{6} = \frac{30}{6} = 5$.
2. Median: the data is sorted; the middle two are 4 and 5, so median $= 4.5$.
3. Mode: 4 appears twice, so mode $= 4$.
4. Deviations: $-3, -1, -1, 0, 2, 3$ (sum $= 0$). Squares: $9, 1, 1, 0, 4, 9$, total $24$.
5. Population variance $= \frac{24}{6} = 4$. Sample variance $= \frac{24}{5} = 4.8$.

**Result:** mean 5, median 4.5, mode 4, population variance 4, sample variance 4.8.

**Example 2 (medium):** One fair die is rolled. $X = 1$ if it shows 6, else 0. $Y = 1$ if it is even, else 0. Find $\mathrm{Cov}(X, Y)$.

1. $E[X] = P(6) = \frac16$. $E[Y] = P(\text{even}) = \frac36 = \frac12$.
2. A 6 is always even, so whenever $X = 1$, also $Y = 1$. So $XY = X$ and $E[XY] = \frac16$.
3. $\mathrm{Cov} = E[XY] - E[X]E[Y] = \frac16 - \frac16 \times \frac12 = \frac16 - \frac1{12} = \frac1{12}$.

**Result:** $\mathrm{Cov}(X, Y) = \frac1{12} \approx 0.083$.

**Example 3 (GATE level):** For $n = 10$ data points, $\sum_{i=1}^{10}\sum_{j=1}^{10}(x_i - x_j)^2 = 3600$. Find the sample variance $\frac{1}{9}\sum(x_i - \bar x)^2$.

1. Identity: $2n\sum(x_i - \bar x)^2 = 3600$, so $20\sum(x_i - \bar x)^2 = 3600$.
2. $\sum(x_i - \bar x)^2 = \frac{3600}{20} = 180$.
3. Sample variance $= \frac{180}{9} = 20$.

**Result:** sample variance $= 20$.

**Example 4 (GATE level):** $X \sim$ Uniform(−1, 1) and $Y = X^2$. Find the correlation.

1. $E[X] = 0$, because the distribution is symmetric around 0.
2. $E[XY] = E[X \cdot X^2] = E[X^3] = 0$. Because $x^3$ is negative for negative $x$ and positive for positive $x$, and these cancel on a symmetric range.
3. $\mathrm{Cov} = E[XY] - E[X]E[Y] = 0 - 0 \times E[Y] = 0$.
4. So $\rho = 0$, even though $Y$ is completely decided by $X$.

**Result:** $\rho = 0$ (uncorrelated but not independent).

**Example 5 (medium, correlation from data):** $x = (1, 2, 3)$, $y = (2, 4, 5)$. Find $r$.

1. Means: $\bar x = 2$, $\bar y = \frac{11}{3}$.
2. Deviations of $x$: $-1, 0, 1$. Deviations of $y$: $-\frac53, \frac13, \frac43$.
3. $S_{xy} = \sum (x_i - \bar x)(y_i - \bar y) = (-1)(-\frac53) + 0 + (1)(\frac43) = \frac53 + \frac43 = 3$.
4. $S_{xx} = 1 + 0 + 1 = 2$. $S_{yy} = \frac{25 + 1 + 16}{9} = \frac{42}{9} = \frac{14}{3}$.
5. The $\frac{1}{n-1}$ factors cancel between top and bottom, so

$$r = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}} = \frac{3}{\sqrt{2 \times 14/3}} = \frac{3}{\sqrt{9.33}} \approx \frac{3}{3.055} \approx 0.982$$

**Result:** $r \approx 0.982$, a strong rising straight-line pattern.

### Common mistakes
> **Common mistake:** Dividing by $n$ when the question asks for the **sample** variance (divide by $n - 1$), or the other way round. Check the exact formula written in the question.

> **Common mistake:** Concluding "independent" from correlation 0. Correlation only detects straight-line links.

> **Common mistake:** Forgetting that $\mathrm{Cov}(aX, bY) = ab\,\mathrm{Cov}(X, Y)$, not $a^2b^2$. Only variance squares the constants.

> **Common mistake:** In the updated-mean question, adding the new value to the old mean and dividing by 2. Rebuild the total first.

### How GATE asks it
- **2024 Q.34:** mean of 50 points is 40; add 142. New mean $= \frac{2000 + 142}{51} = 42$.
- **2024 Q.65:** covariance of the indicators "both heads" and "at least one head" for 2 coins. $XY = X$, so $\mathrm{Cov} = \frac14 - \frac14 \times \frac34 = \frac1{16} = 0.0625$.
- **2026 Q.62:** given $\frac{1}{2000}\sum\sum(x_i - x_j)^2 = 99$ with $n = 100$, find $\frac{1}{99}\sum(x_i - \bar x)^2$. Identity gives 990, answer 10.
- **2026 Q.63:** $X \sim U(-1, 1)$, $Y \mid X \sim U(x^2 - 0.1, x^2 + 0.1)$. $E[Y \mid X] = X^2$, so $\mathrm{Cov} = E[X^3] = 0$. Correlation 0.

> **GATE tip:** These are NAT questions that reward identities more than arithmetic. Know $E[XY] - E[X]E[Y]$, the $2n$ identity, and "symmetric $X$ ⇒ odd moments are 0".

### Summary
- First we summarise one list of numbers by its centre: the mean (total / count), the median (middle) and the mode (most common).
- Then we measure spread by squaring each distance from the mean and averaging: the variance, and its square root, the SD.
- Because the sample mean hugs its own data, the sample variance divides by $n - 1$ to fix a small shortfall.
- For two variables, we average the product of their deviations: the covariance, which simplifies to $E[XY] - E[X]E[Y]$.
- Dividing covariance by both SDs removes units and gives the correlation, a number in $[-1, 1]$ that measures straight-line strength only.
- Next topic builds on this: Central Limit Theorem & Sampling, where the variance of a sample mean is $\frac{\sigma^2}{n}$; later, correlation and covariance drive linear regression and PCA in ML.

### Quick self-check
1. The mean of 10 numbers is 20. One number, 38, is removed. New mean?

**Answer:** $\frac{200 - 38}{9} = \frac{162}{9} = 18$.

2. $\mathrm{Cov}(X, Y) = 6$, $\sigma_X = 2$, $\sigma_Y = 5$. Find $\rho$ and $\mathrm{Cov}(3X, -Y)$.

**Answer:** $\rho = \frac{6}{10} = 0.6$. $\mathrm{Cov}(3X, -Y) = 3 \times (-1) \times 6 = -18$.

3. Every value in a data set is multiplied by 3 and then 4 is added. The old SD was 2. New SD?

**Answer:** $3 \times 2 = 6$ (adding 4 does not change spread).

## Central Limit Theorem & Sampling

### The big idea
When you add up (or average) many independent random numbers, the result follows a **bell curve** (normal distribution), no matter what shape the original numbers had. This is the **Central Limit Theorem (CLT)**.

It lets us compute probabilities for sums and averages using only three things: the mean, the standard deviation and the $\Phi$ table.

### Before you start
**Random variable, mean and variance** (see topic: Random Variables & Expectation/Variance). A random variable $X$ is a number that comes out of a random experiment, like the face of a die. Its mean $E[X] = \mu$ is the long-run average. Its variance $\mathrm{Var}(X) = \sigma^2$ measures how far values spread from the mean, and the standard deviation (SD) is $\sigma = \sqrt{\sigma^2}$.

Tiny example: for a fair die, $\mu = 3.5$ and $\sigma^2 = \frac{35}{12} \approx 2.92$.

**Two rules about mean and variance** (see topic: Random Variables & Expectation/Variance).

- Means always add: $E[X + Y] = E[X] + E[Y]$.
- Variances add **only when** $X$ and $Y$ are independent: $\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)$.
- Multiplying by a number $c$: $E[cX] = c\,E[X]$ but $\mathrm{Var}(cX) = c^2\,\mathrm{Var}(X)$. The square appears because variance is measured in "squared units".

Tiny example: if $\mathrm{Var}(X) = 4$, then $\mathrm{Var}(3X) = 9 \times 4 = 36$, not 12.

**The sum symbol $\sum$.** $\sum_{i=1}^{n} X_i$ means "add $X_1 + X_2 + \dots + X_n$". The letter $i$ is a counter that runs from 1 to $n$.

Tiny example: if $X_1 = 2, X_2 = 5, X_3 = 1$, then $\sum_{i=1}^{3} X_i = 8$.

**Independent.** Two random variables are independent if knowing one tells you nothing about the other (see topic: Basic Probability & Conditional Probability). Two separate dice rolls are independent.

**Normal distribution and $\Phi$** (see topic: Continuous Distributions). $N(\mu, \sigma^2)$ is the bell curve centred at $\mu$ with spread $\sigma$. The **standard normal** $Z \sim N(0,1)$ has mean 0 and SD 1. $\Phi(z) = P(Z \le z)$ is the area under the bell to the left of $z$, read from a table.

Tiny example: $\Phi(0) = 0.5$ (half the bell is left of the centre), $\Phi(2) \approx 0.9772$, and by symmetry $\Phi(-2) = 1 - \Phi(2) = 0.0228$.

**Standardising.** To turn any normal value $x$ into a $z$ value, subtract the mean and divide by the SD:
$$z = \frac{x - \text{mean}}{\text{SD}}$$
Tiny example: marks have mean 60 and SD 10; a mark of 80 gives $z = \frac{80 - 60}{10} = 2$, meaning "2 SDs above the mean".

**Bernoulli, Binomial, Poisson** (see topic: Discrete Distributions). Bernoulli($p$) is 1 with chance $p$ and 0 otherwise; mean $p$, variance $p(1-p)$. Binomial($n,p$) counts successes in $n$ Bernoulli trials. Poisson($\lambda$) counts rare events, with mean and variance both $\lambda$.

**The number $e$ and $k!$.** $e \approx 2.718$ is a fixed constant that appears in growth and in the Poisson formula $P(N = k) = \frac{e^{-\lambda}\lambda^k}{k!}$. $k! = k \times (k-1) \times \dots \times 1$ (see topic: Counting & Combinatorics).

### Intuition
Roll one die. Each face 1 to 6 is equally likely. The picture of chances is flat, not a bell.

Now roll two dice and add them. Sum 7 is most common (6 ways), sums 2 and 12 are rare (1 way each). The picture is a triangle with a peak in the middle.

Roll 10 dice and add them. The picture of the sum now looks almost exactly like a **bell**. Extreme sums (all ones, all sixes) are very rare, because they need every die to be extreme together. Middle sums happen in a huge number of ways.

> **Intuition:** In a sum of many independent pieces, the highs and lows of individual pieces mostly **cancel out**. Only a few combinations give extreme totals, and very many give middle totals. That always creates a bell shape.

Second idea: averages become **less spread out** as you take more data. One student's mark can be anywhere from 20 to 100. But the average mark of a class of 100 students will be very close to the true average.

The spread of the average shrinks like $\frac{1}{\sqrt n}$. With 4 times more data, the average is twice as precise. This is why bigger samples give better estimates. (The fact that the average settles at the true mean is the **Law of Large Numbers**.)

Third idea: **sampling from a normal population**. If the original data is itself normal, then some exact results hold for any $n$, even small $n$.

- The sample mean is exactly normal.
- The scaled sample variance follows a **chi-square** distribution with $n - 1$ degrees of freedom.
- The standardised mean (using $s$ instead of $\sigma$) follows a **t** distribution with $n - 1$ degrees of freedom.

### Words you need
- **Population**: the whole group we care about. Example: all voters in India.
- **Sample**: the few we actually observe. Example: 1000 voters asked in a survey.
- **i.i.d.**: "independent and identically distributed": each observation is independent, and all come from the same distribution. Example: 100 rolls of the same die.
- **Statistic**: a number computed from the sample, like $\bar X$ (sample mean, read "X bar") or $S^2$ (sample variance).
- **Sampling distribution**: the distribution of a statistic over many repeated samples. Example: take 1000 different classes of 30 students and record each class average; the histogram of those 1000 averages is the sampling distribution of $\bar X$.
- **Standard error (SE)**: the standard deviation of $\bar X$, which is $\frac{\sigma}{\sqrt n}$.
- **Unbiased estimator**: a statistic whose average equals the true value. Example: $E[\bar X] = \mu$.
- **Sample proportion** $\hat p$ ("p hat"): the fraction of successes in the sample.
- **Chi-square** $\chi^2_k$: the distribution of $Z_1^2 + \dots + Z_k^2$, a sum of $k$ squared independent standard normals. $k$ is called the **degrees of freedom**. Its mean is $k$.
- **t distribution** $t_k$: looks like the standard normal bell but with fatter tails. It appears when we divide by an estimated SD instead of the true one. For large $k$ it becomes $N(0,1)$.

### Formulas, explained

**Mean and variance of a sum and an average**

$$S_n = \sum_{i=1}^n X_i: \quad E[S_n] = n\mu, \quad \mathrm{Var}(S_n) = n\sigma^2$$

$$\bar X = \frac{S_n}{n}: \quad E[\bar X] = \mu, \quad \mathrm{Var}(\bar X) = \frac{\sigma^2}{n}$$

- **Read it as:** "the sum has mean n mu and variance n sigma squared; the average has mean mu and variance sigma squared over n."
- **Symbols:** $\mu$ = mean of one $X_i$, $\sigma^2$ = variance of one $X_i$, $n$ = sample size.
- **Why it makes sense:** means add (linearity). Variances add for independent variables. Dividing by $n$ divides the variance by $n^2$, so $\frac{n\sigma^2}{n^2} = \frac{\sigma^2}{n}$.
- **Use it when:** every CLT question, step 1. Note: SD of the sum is $\sigma\sqrt n$, **not** $n\sigma$.

**Central Limit Theorem**

$$\frac{S_n - n\mu}{\sigma\sqrt n} = \frac{\bar X - \mu}{\sigma / \sqrt n} \approx N(0, 1) \quad \text{for large } n$$

- **Read it as:** "the standardised sum (or average) is approximately standard normal."
- **Symbols:** $S_n$ = the sum, $n\mu$ = its mean, $\sigma\sqrt n$ = its SD.
- **Why it makes sense:** see the dice picture. Subtract the mean and divide by the SD to get to the standard bell.
- **Use it when:** "approximately", "using CLT", a sum of many independent things, $n \ge 30$ roughly.

Then probabilities come from the table:

$$P(a \le S_n \le b) \approx \Phi\!\left(\frac{b - n\mu}{\sigma\sqrt n}\right) - \Phi\!\left(\frac{a - n\mu}{\sigma\sqrt n}\right)$$

**Sample proportion**

$$\hat p = \frac{1}{n}\sum_{i=1}^n X_i, \qquad E[\hat p] = p, \qquad \mathrm{Var}(\hat p) = \frac{p(1-p)}{n}$$

- **Read it as:** "the sample fraction is unbiased, and its variance shrinks as n grows."
- **Symbols:** $X_i$ = Bernoulli($p$), 1 for success, 0 for failure.
- **Why it makes sense:** $\hat p$ is just $\bar X$ for 0/1 data, so use $\mu = p$ and $\sigma^2 = p(1-p)$.
- **Use it when:** coin tosses, surveys, "fraction of heads".

**Normal approximation to Binomial and Poisson**

$$\text{Bin}(n, p) \approx N\big(np, \ np(1-p)\big), \qquad \text{Pois}(n) \approx N(n, n)$$

- **Read it as:** "a binomial is roughly normal with the same mean and variance; so is a Poisson with large mean."
- **Why it makes sense:** a Binomial is a sum of $n$ Bernoullis. A Poisson($n$) is a sum of $n$ independent Poisson(1) variables. Both are sums, so the CLT applies.
- **Use it when:** large $n$. (A **continuity correction** of $\pm 0.5$ makes it more accurate, but GATE options so far did not use it.)

**Sampling from a normal population** $N(\mu, \sigma^2)$

$$\bar X \sim N\!\left(\mu, \frac{\sigma^2}{n}\right)$$

$$\frac{(n-1)S^2}{\sigma^2} = \frac{\sum (X_i - \bar X)^2}{\sigma^2} \sim \chi^2_{n-1}$$

$$\frac{\bar X - \mu}{S / \sqrt n} \sim t_{n-1}$$

- **Read it as:** (1) the sample mean is exactly normal; (2) the sum of squared deviations over sigma squared is chi-square with n minus 1 degrees of freedom; (3) using $S$ in place of $\sigma$ turns $Z$ into $t$ with n minus 1 degrees of freedom.
- **Symbols:** $S^2 = \frac{1}{n-1}\sum (X_i - \bar X)^2$ is the sample variance. The symbol $\sim$ means "has the distribution".
- **Why it makes sense:** the deviations $X_i - \bar X$ must add to 0, so one of them is fixed by the others. One degree of freedom is "used up" by estimating $\bar X$.
- **Use it when:** the data is said to be normal, $n$ is small, or a question asks "what is the distribution of ...".

Two extra facts for $X_i \sim N(0,1)$:

$$\sum_{i=1}^n X_i^2 \sim \chi^2_n, \qquad \sqrt n\,\bar X \sim N(0,1) \ \text{ so } \ (\sqrt n\,\bar X)^2 \sim \chi^2_1$$

### Where the formulas come from

**Formula 1: mean and variance of the sum and the average.**

Start with a concrete case: two fair dice, $X_1$ and $X_2$, each with $\mu = 3.5$ and $\sigma^2 = \frac{35}{12}$.

1. Mean of the sum: $E[X_1 + X_2] = 3.5 + 3.5 = 7$, because means always add (linearity of expectation).
2. Variance of the sum: $\mathrm{Var}(X_1 + X_2) = \frac{35}{12} + \frac{35}{12} = \frac{70}{12}$, because the two dice are independent, so their variances add.
3. Now generalise to $n$ dice (or any i.i.d. $X_i$). Adding $n$ copies gives $E[S_n] = \mu + \mu + \dots + \mu = n\mu$, by the same rule repeated.
4. In the same way, $\mathrm{Var}(S_n) = \sigma^2 + \dots + \sigma^2 = n\sigma^2$, because all $X_i$ are independent.
5. So the SD of the sum is $\sqrt{n\sigma^2} = \sigma\sqrt n$, because SD is the square root of variance.
6. The average is $\bar X = \frac{1}{n} S_n$, so $E[\bar X] = \frac{1}{n} \cdot n\mu = \mu$, because a constant multiplier comes out of $E$.
7. For the variance, the constant $\frac{1}{n}$ comes out **squared**: $\mathrm{Var}(\bar X) = \frac{1}{n^2} \cdot n\sigma^2 = \frac{\sigma^2}{n}$, because $\mathrm{Var}(cX) = c^2\mathrm{Var}(X)$.
8. Taking the square root, $\mathrm{SE} = \frac{\sigma}{\sqrt n}$. This is where the "$\sqrt n$" law comes from: 4 times the data halves the SE, because $\sqrt 4 = 2$.

**Formula 2: the Central Limit Theorem.**

The full proof is not needed for GATE (it uses a tool called the moment generating function). Here is an honest picture and a simulation-style argument instead.

1. Count the ways for 2 dice: sums 2, 3, ..., 12 happen in 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1 ways. This is a triangle, already peaked in the middle, because middle sums can be made in many ways.
2. For 3 dice, the counts of sums 3 to 18 are 1, 3, 6, 10, 15, 21, 25, 27, 27, 25, 21, 15, 10, 6, 3, 1. The edges have become curved: it already looks like a bell.
3. Each time you add one more die, you "smear" the previous picture across 6 shifted positions. Smearing repeatedly rounds off corners, because every new value is an average of nearby old values.
4. A simulation tells the same story: if a computer adds 30 random numbers from almost any shape (flat, skewed, two-humped) and repeats 10,000 times, the histogram of the totals is a bell. Only the centre $n\mu$ and the width $\sigma\sqrt n$ depend on the original shape.
5. That is why we only need $\mu$ and $\sigma$: the bell's centre and width come from Formula 1, and the bell shape itself comes from the CLT.
6. Finally, we standardise to use one table: subtract the centre $n\mu$ and divide by the width $\sigma\sqrt n$. This gives $\frac{S_n - n\mu}{\sigma\sqrt n} \approx N(0,1)$.
7. The average version is the same thing: divide top and bottom by $n$. Then $\frac{S_n/n - \mu}{\sigma\sqrt n / n} = \frac{\bar X - \mu}{\sigma/\sqrt n}$, because $\frac{\sqrt n}{n} = \frac{1}{\sqrt n}$.

The CLT needs the variance $\sigma^2$ to be finite. It is an approximation, and it improves as $n$ grows.

**Formula 3: the sample proportion.** It is Formula 1 applied to 0/1 data.

1. Example: toss a coin with $p = 0.25$ chance of head, $n = 4$ times. Results 1, 0, 0, 1 give $\hat p = \frac{2}{4} = 0.5$.
2. In general $\hat p = \frac{1}{n}\sum X_i = \bar X$, because counting heads and dividing by $n$ is the same as averaging the 0/1 values.
3. A single Bernoulli has $\mu = p$ and $\sigma^2 = p(1-p)$ (see topic: Discrete Distributions).
4. Put these into Formula 1: $E[\hat p] = p$ and $\mathrm{Var}(\hat p) = \frac{p(1-p)}{n}$.

**Formula 4: normal approximation to Binomial and Poisson.** It is the CLT applied to sums we already know.

1. A Binomial($n,p$) count is $X_1 + \dots + X_n$ with each $X_i \sim$ Bernoulli($p$), because each trial adds 1 if success.
2. By Formula 1, its mean is $np$ and its variance is $np(1-p)$.
3. It is a sum of $n$ i.i.d. pieces, so the CLT says it is close to $N(np, np(1-p))$ for large $n$.
4. A Poisson($n$) is the sum of $n$ independent Poisson(1) values, because independent Poissons add (their means add). Each piece has mean 1 and variance 1.
5. So by Formula 1 the sum has mean $n$ and variance $n$, and by the CLT it is close to $N(n, n)$.

**Formula 5: sampling from a normal population.**

1. Sample mean: a sum of independent normals is exactly normal (a known property of the bell curve; the proof is not needed for GATE). With Formula 1 for its mean and variance, $\bar X \sim N(\mu, \frac{\sigma^2}{n})$ exactly, for any $n$.
2. Chi-square with $n$: if $Z_i = \frac{X_i - \mu}{\sigma}$, each $Z_i$ is $N(0,1)$. Then $\sum Z_i^2 \sim \chi^2_n$, because that is the definition of chi-square with $n$ degrees of freedom.
3. Why $n - 1$ when we use $\bar X$: take $n = 3$ values 4, 6, 8. Then $\bar x = 6$ and the deviations are $-2, 0, 2$, which add to 0.
4. If you know any two deviations, the third is forced, because they must add to 0. So only $n - 1 = 2$ deviations are "free". This is why $\frac{\sum (X_i - \bar X)^2}{\sigma^2} \sim \chi^2_{n-1}$ (full proof not needed for GATE).
5. This also explains why $S^2$ divides by $n - 1$: then $E[S^2] = \sigma^2$, because the chi-square with $n-1$ degrees of freedom has mean $n - 1$, and $E\!\left[\frac{(n-1)S^2}{\sigma^2}\right] = n - 1$ gives $E[S^2] = \sigma^2$.
6. The t result: start from $\frac{\bar X - \mu}{\sigma/\sqrt n} \sim N(0,1)$. Replace the unknown $\sigma$ by the estimate $S$. The extra randomness in $S$ makes the tails a bit fatter, and the result is called $t_{n-1}$.
7. The extra fact $(\sqrt n\,\bar X)^2 \sim \chi^2_1$: for $X_i \sim N(0,1)$, $\bar X \sim N(0, \frac{1}{n})$, so $\sqrt n\,\bar X \sim N(0,1)$ because multiplying by $\sqrt n$ multiplies the variance by $n$. Squaring **one** standard normal gives $\chi^2_1$.

### Examples

**Example 1 (easy):** One packet weighs on average 50 g with SD 5 g. A crate has 100 packets. Find the mean and SD of the total weight.

1. Mean of the total $= n\mu = 100 \times 50 = 5000$ g.
2. Variance of the total $= n\sigma^2 = 100 \times 5^2 = 2500$.
3. SD $= \sqrt{2500} = 50$ g. (Not $100 \times 5 = 500$.)

**Result:** mean 5000 g, SD 50 g.

**Example 2 (medium):** In Example 1, find $P(\text{total} > 5100)$ approximately.

1. By the CLT the total is about $N(5000, 50^2)$.
2. Standardise: $z = \frac{5100 - 5000}{50} = 2$.
3. $P(\text{total} > 5100) \approx P(Z > 2) = 1 - \Phi(2) = 1 - 0.9772 = 0.0228$.
4. Check through the average: $\bar X$ has SE $\frac{5}{\sqrt{100}} = 0.5$. Total $> 5100$ means $\bar X > 51$, so $z = \frac{51 - 50}{0.5} = 2$. Same answer.

**Result:** about $0.0228$.

**Example 3 (GATE level):** $Y = \sum_{i=1}^{192} X_i$ with $X_i$ i.i.d. Bernoulli(0.25). Using the CLT, $P(36 \le Y \le 60)$ is about?

1. $E[Y] = np = 192 \times 0.25 = 48$.
2. $\mathrm{Var}(Y) = np(1-p) = 192 \times 0.25 \times 0.75 = 192 \times 0.1875 = 36$, so SD $= 6$.
3. Standardise both ends: $\frac{36 - 48}{6} = -2$ and $\frac{60 - 48}{6} = 2$.
4. $P \approx \Phi(2) - \Phi(-2) = 0.9772 - 0.0228 = 0.9544$.

**Result:** about $0.954$.

**Example 4 (GATE level):** Find $\lim_{n \to \infty} \sum_{k=0}^{2n} \frac{e^{-2n}(2n)^k}{k!}$.

1. Each term $\frac{e^{-2n}(2n)^k}{k!}$ is the Poisson pmf $P(N = k)$ with mean $\lambda = 2n$.
2. Adding the terms from $k = 0$ to $2n$ gives $P(N \le 2n)$ for $N \sim \text{Pois}(2n)$.
3. By Formula 4, $N \approx N(2n, 2n)$ for large $n$.
4. Standardise: $P(N \le 2n) = P\!\left(\frac{N - 2n}{\sqrt{2n}} \le 0\right) \to \Phi(0) = 0.5$.

**Result:** $0.5$.

### Common mistakes
> **Common mistake:** Using SD $= n\sigma$ for a sum. Variances add, so SD $= \sigma\sqrt n$.

> **Common mistake:** Forgetting to standardise. $\Phi(90) - \Phi(60)$ is meaningless; first convert to $z$ values.

> **Common mistake:** Saying $\sum (X_i - \bar X)^2 / \sigma^2$ has $n$ degrees of freedom. It has $n - 1$, because $\bar X$ was estimated from the same data.

> **Common mistake:** Thinking the CLT needs normal data. It works for any distribution with finite variance; only the exact small-sample results ($\chi^2$, $t$) need normal data.

### How GATE asks it
- **2025 Q.40:** sum of 300 Bernoulli(0.25): mean 75, SD 7.5. $P(60 \le Y \le 90) \approx \Phi(2) - \Phi(-2)$. Trap: $\Phi(90) - \Phi(60)$.
- **2025 Q.54 (MSQ):** $\hat p$ is unbiased ($E[\hat p] = p$) and its variance $\frac{p(1-p)}{n}$ decreases with $n$.
- **2026 Q.45:** $\lim \sum_{k=0}^{n} \frac{e^{-n}n^k}{k!} = P(\text{Pois}(n) \le n) \to \Phi(0) = 0.5$.
- **2026 Q.53 (MSQ):** for $X_i \sim N(0,1)$: $\sum X_i^2 \sim \chi^2_n$ (true), $\sum (X_i - \bar X)^2 \sim \chi^2_{n-1}$ (true), $X_1^2 + X_n^2 \sim \chi^2_2 =$ Exp(mean 2) (true), $(\sqrt n\,\bar X)^2 \sim \chi^2_2$ (false; it is $\chi^2_1$).

> **GATE tip:** All four were 2-mark questions. The reflex "mean $n\mu$, SD $\sigma\sqrt n$, then standardise" solves most of them in one minute.

### Summary
- First we found the mean and variance of a sum: means add to $n\mu$, and (because the pieces are independent) variances add to $n\sigma^2$.
- Dividing by $n$ gives the average, with the same mean $\mu$ but a much smaller spread $\frac{\sigma}{\sqrt n}$. So more data gives more precise averages.
- Then the CLT tells us the **shape**: a sum or average of many independent pieces is close to a bell curve, whatever the shape of one piece.
- So any "sum of many things" question becomes: find mean, find SD, standardise, read $\Phi$.
- Binomial and Poisson are sums too, which is why they also look normal for large $n$.
- When the data itself is normal, we get exact results even for small $n$: $\bar X$ is normal, the scaled sample variance is $\chi^2_{n-1}$, and using $S$ instead of $\sigma$ gives $t_{n-1}$.
- Next topic builds on this: Confidence Intervals & Hypothesis Testing use the standard error $\frac{\sigma}{\sqrt n}$ and the $z$, $t$ and $\chi^2$ distributions from here.

### Quick self-check
1. 64 i.i.d. values with mean 10 and SD 8. SD of $\bar X$?

**Answer:** $\frac{8}{\sqrt{64}} = 1$.

2. Sum of 100 fair coin tosses (1 = head). Mean and SD?

**Answer:** Mean 50, SD $\sqrt{100 \times 0.25} = 5$.

3. $X_1, \dots, X_{10}$ i.i.d. $N(0, 1)$. Distribution of $\sum (X_i - \bar X)^2$?

**Answer:** $\chi^2_9$.

## Confidence Intervals & Hypothesis Testing

### The big idea
We use a **sample** to say something about an unknown **population** value, like the true average $\mu$. A **confidence interval** gives a range that probably contains $\mu$. A **hypothesis test** checks whether a claim about $\mu$ fits the data.

### Before you start
**Population and sample** (see topic: Central Limit Theorem & Sampling). The population is everyone we care about; the sample is the few we measure. The population mean $\mu$ is unknown. The sample mean $\bar x$ is what we can compute.

Tiny example: we want the average height of all students in India ($\mu$), but we measure only 25 students and get $\bar x = 162$ cm.

**Standard error** (see topic: Central Limit Theorem & Sampling). The sample mean $\bar X$ changes from sample to sample. Its SD is the standard error $\mathrm{SE} = \frac{\sigma}{\sqrt n}$, where $\sigma$ is the SD of one value and $n$ is the sample size.

Tiny example: $\sigma = 10$, $n = 25$ gives $\mathrm{SE} = \frac{10}{5} = 2$.

**Normal distribution, $Z$ and $\Phi$** (see topic: Continuous Distributions). $Z \sim N(0,1)$ is the standard bell curve. $\Phi(z) = P(Z \le z)$ is the area to the left of $z$. The bell is symmetric around 0, so $P(Z > z) = 1 - \Phi(z)$ and $\Phi(-z) = 1 - \Phi(z)$.

Tiny example: $\Phi(1.96) = 0.975$, so the area between $-1.96$ and $1.96$ is $0.975 - 0.025 = 0.95$.

**CLT** (see topic: Central Limit Theorem & Sampling). For large $n$, $\bar X$ is about $N(\mu, \frac{\sigma^2}{n})$, so $\frac{\bar X - \mu}{\sigma/\sqrt n}$ is about $Z$. This one fact powers this whole topic.

**$t$ and $\chi^2$ distributions** (see topic: Central Limit Theorem & Sampling). $t_{n-1}$ is a bell with fatter tails, used when we replace $\sigma$ by the sample SD $s$. $\chi^2_k$ is the distribution of a sum of $k$ squared standard normals; it is never negative.

**Sample SD $s$** (see topic: Descriptive Statistics, Covariance & Correlation). $s = \sqrt{\frac{1}{n-1}\sum (x_i - \bar x)^2}$ is the SD computed from the data.

**Inequality and absolute value.** $\lvert z \rvert$ means "size of $z$ ignoring the sign": $\lvert -3 \rvert = 3$. "$\lvert z \rvert > 1.96$" means $z > 1.96$ or $z < -1.96$.

### Intuition
A company says its 1-litre bottles contain 1000 ml on average. You measure 25 bottles. Their average is 996 ml.

Is the company lying, or is this just random variation? The test asks: "If the claim were true, how surprising would 996 be?" If it is very surprising, we **reject** the claim.

A confidence interval is like throwing a net, not a spear. A single guess ($\bar x$) almost never hits $\mu$ exactly. A net of width "$\bar x \pm$ margin" catches $\mu$ 95% of the time, if we repeat the sampling many times.

> **Intuition:** The test works like a court. The **null hypothesis** $H_0$ is "innocent" (the claim is true). We only reject it when the evidence is very strong. The **significance level** $\alpha$ is the risk we accept of punishing an innocent claim.

### Words you need
- **Null hypothesis** $H_0$: the default claim. Example: $\mu = 1000$.
- **Alternative** $H_1$: what we accept if we reject $H_0$. Example: $\mu \ne 1000$ (two-sided) or $\mu < 1000$ (one-sided).
- **Significance level** $\alpha$: allowed false-alarm chance, often 0.05.
- **Confidence level** $1 - \alpha$: how often the method's interval catches $\mu$. Example: $\alpha = 0.05$ gives 95%.
- **p-value**: the chance, if $H_0$ is true, of a result at least as extreme as ours. Small p-value = strong evidence against $H_0$.
- **Type I error**: rejecting a true $H_0$ (chance $\alpha$). **Type II error**: keeping a false $H_0$ (chance $\beta$). **Power** $= 1 - \beta$.
- **Critical value** $z_{\alpha/2}$: the cut-off from the table with area $\frac{\alpha}{2}$ to its right. 1.645 (90%), 1.96 (95%), 2.576 (99%).
- **Test statistic**: one number computed from the data that measures how far the data is from $H_0$. Example: $z = \frac{\bar x - \mu_0}{\sigma/\sqrt n}$.
- **Observed and expected counts** $O$, $E$: in a chi-square test, $O$ is what we counted and $E$ is what $H_0$ predicts.

### Formulas, explained

**Confidence interval for a mean**

$$\bar x \pm z_{\alpha/2}\frac{\sigma}{\sqrt n} \quad (\sigma \text{ known})$$

$$\bar x \pm t_{\alpha/2,\,n-1}\frac{s}{\sqrt n} \quad (\sigma \text{ unknown})$$

- **Read it as:** "sample mean plus or minus critical value times standard error."
- **Symbols:** $\bar x$ = sample mean, $\sigma$ = population SD, $s$ = sample SD, $n$ = sample size, $z_{\alpha/2}$ and $t_{\alpha/2,\,n-1}$ = critical values.
- **Why it makes sense:** $\bar X$ lies within $1.96$ standard errors of $\mu$ 95% of the time, so $\mu$ lies within $1.96$ standard errors of $\bar X$ 95% of the time.
- **Use it when:** "95% confidence interval". Width $\propto \frac{1}{\sqrt n}$: to halve the width, use **4 times** the data. Higher confidence gives a wider interval.

**Proportion interval**

$$\hat p \pm z_{\alpha/2}\sqrt{\frac{\hat p(1 - \hat p)}{n}}$$

- **Read it as:** "sample fraction plus or minus critical value times its standard error."
- **Symbols:** $\hat p$ = fraction of successes in the sample.
- **Why it makes sense:** it is the mean interval for 0/1 data, whose SD is $\sqrt{p(1-p)}$.
- **Use it when:** surveys, "fraction of defective items".

**Test statistics**

| Test | When | Statistic | Compare with |
|---|---|---|---|
| z-test | mean, $\sigma$ known | $\frac{\bar x - \mu_0}{\sigma/\sqrt n}$ | $N(0,1)$ |
| t-test | mean, $\sigma$ unknown | $\frac{\bar x - \mu_0}{s/\sqrt n}$ | $t_{n-1}$ |
| chi-square fit | counts in $k$ groups | $\sum \frac{(O - E)^2}{E}$ | $\chi^2_{k-1}$ |
| chi-square independence | $r \times c$ table | same | $\chi^2_{(r-1)(c-1)}$ |

- **Read it as:** "how many standard errors is the data away from the claim?" For chi-square: "how far are the counts from what $H_0$ expects?"
- **Symbols:** $\mu_0$ = the value of $\mu$ claimed by $H_0$; $O$ = observed count; $E$ = expected count.
- **Why it makes sense:** if $H_0$ is true, the statistic follows the distribution in the last column, so a value far out in its tail is surprising.
- **Use it when:** z for known $\sigma$ (or large $n$), t for unknown $\sigma$ and small $n$, chi-square for counts in categories.

The decision rule for a two-sided test at level $\alpha$:

$$\text{reject } H_0 \iff \lvert z \rvert > z_{\alpha/2} \iff \text{p-value} \le \alpha \iff \mu_0 \notin \text{the } (1-\alpha) \text{ interval}$$

### Where the formulas come from

**Formula 1: the confidence interval for a mean.** It is built from the CLT plus one table value.

Start with numbers: $\sigma = 10$, $n = 25$, so $\mathrm{SE} = 2$.

1. From the table, $P(-1.96 \le Z \le 1.96) = 0.95$, because $\Phi(1.96) - \Phi(-1.96) = 0.975 - 0.025$.
2. By the CLT, $Z = \frac{\bar X - \mu}{2}$ (that is, divided by the SE). So $P\!\left(-1.96 \le \frac{\bar X - \mu}{2} \le 1.96\right) = 0.95$.
3. Multiply all three parts by 2: $P(-3.92 \le \bar X - \mu \le 3.92) = 0.95$, because multiplying an inequality by a positive number keeps it true.
4. This says "the distance between $\bar X$ and $\mu$ is at most 3.92", 95% of the time. Distance is the same from either side, so it also says $\mu$ is within 3.92 of $\bar X$.
5. Rearranged: $P(\bar X - 3.92 \le \mu \le \bar X + 3.92) = 0.95$. That is the interval $\bar x \pm 3.92$.
6. In symbols, replace 2 by $\frac{\sigma}{\sqrt n}$ and 1.96 by $z_{\alpha/2}$. This gives $\bar x \pm z_{\alpha/2}\frac{\sigma}{\sqrt n}$.
7. Width $= 2 z_{\alpha/2}\frac{\sigma}{\sqrt n}$. Making $n$ four times bigger makes $\sqrt n$ twice bigger, so the width halves.
8. If $\sigma$ is unknown we use $s$. Then (see topic: Central Limit Theorem & Sampling) the standardised mean follows $t_{n-1}$, not $Z$, so we take the critical value from the $t$ table. Since $t$ has fatter tails, its critical value is larger, so the interval is wider: the price of not knowing $\sigma$.

**Formula 2: the proportion interval.** It is Formula 1 for 0/1 data.

1. Code each answer as 1 (yes) or 0 (no). Then $\hat p$ is just the sample mean $\bar x$.
2. One 0/1 value has variance $p(1-p)$ (Bernoulli; see topic: Discrete Distributions), so $\mathrm{SE} = \sqrt{\frac{p(1-p)}{n}}$.
3. We do not know $p$, so we plug in our best guess $\hat p$. This gives $\hat p \pm z_{\alpha/2}\sqrt{\frac{\hat p(1-\hat p)}{n}}$.

**Formula 3: the z and t statistics.** They are the same standardising step, but done with the claimed value $\mu_0$.

1. Suppose $H_0: \mu = 50$ is true, $\sigma = 10$, $n = 25$. Then by the CLT, $\bar X \sim N(50, 2^2)$.
2. If we observe $\bar x = 52$, it is $\frac{52 - 50}{2} = 1$ standard error above the claim.
3. In symbols, $z = \frac{\bar x - \mu_0}{\sigma/\sqrt n}$, which follows $N(0,1)$ when $H_0$ is true, because we subtracted the true mean and divided by the true SD.
4. The t statistic is the same with $s$ in place of $\sigma$, so it follows $t_{n-1}$ (see topic: Central Limit Theorem & Sampling).

**Formula 4: the decision rule and the p-value.**

1. Under $H_0$, $\lvert Z \rvert > 1.96$ happens only 5% of the time. So if our $\lvert z \rvert > 1.96$, either a rare 5% event happened or $H_0$ is wrong. We choose to reject.
2. This rule rejects a true $H_0$ exactly 5% of the time. That is why the Type I error chance equals $\alpha$.
3. The p-value for a two-sided test is $2(1 - \Phi(\lvert z \rvert))$: the area in both tails beyond our $z$, because "at least as extreme" counts both directions.
4. $\lvert z \rvert > 1.96$ is the same as "the tail area beyond $z$ is smaller than 5%", so it is the same as "p-value $< \alpha$".
5. $\lvert z \rvert > 1.96$ also means $\lvert \bar x - \mu_0 \rvert > 1.96\,\mathrm{SE}$, which means $\mu_0$ is outside $\bar x \pm 1.96\,\mathrm{SE}$. So the test and the interval always agree.

**Formula 5: the chi-square statistic and its degrees of freedom.** The full proof that it follows $\chi^2$ is not needed for GATE. Here is why the shape and the degrees of freedom make sense.

1. Each count $O$ is roughly normal with mean $E$ and variance about $E$, like a Poisson count (see topic: Discrete Distributions).
2. So $\frac{O - E}{\sqrt E}$ is roughly a standard normal, because we subtracted the mean and divided by the SD.
3. Squaring and adding gives $\sum \frac{(O - E)^2}{E}$, a sum of squared standard normals. That is the definition of a chi-square.
4. With $k$ groups, the counts must add to the fixed total $n$. So if you know $k - 1$ counts, the last one is forced. That leaves $k - 1$ degrees of freedom.
5. In an $r \times c$ table, each row total and column total is fixed. In each row, only $c - 1$ cells are free; and the last row is forced by the column totals. So $(r-1)(c-1)$ cells are free.

### Examples

**Example 1 (easy):** $n = 25$, $\bar x = 52$, $\sigma = 10$. Find the 95% CI.

1. $\mathrm{SE} = \frac{10}{\sqrt{25}} = \frac{10}{5} = 2$.
2. Margin $= 1.96 \times 2 = 3.92$.
3. CI $= 52 \pm 3.92$, so from $52 - 3.92 = 48.08$ to $52 + 3.92 = 55.92$.

**Result:** $[48.08, 55.92]$.

**Example 2 (medium):** Same data. Test $H_0: \mu = 50$ vs $H_1: \mu \ne 50$ at 5%.

1. $z = \frac{52 - 50}{2} = 1$.
2. The critical value is 1.96. Since $\lvert 1 \rvert < 1.96$, do **not** reject $H_0$.
3. p-value $= 2(1 - \Phi(1)) = 2 \times 0.1587 = 0.317$, which is bigger than 0.05. Same decision.
4. Check with the CI: 50 lies inside $[48.08, 55.92]$, so again do not reject.

**Result:** do not reject $H_0$; p-value about $0.317$.

**Example 3 (GATE level):** A die is rolled 60 times: counts 8, 12, 9, 11, 6, 14. Find the chi-square statistic and degrees of freedom.

1. If the die is fair, each face is expected $\frac{60}{6} = 10$ times.
2. Differences $O - E$: $-2, 2, -1, 1, -4, 4$. Squares: $4, 4, 1, 1, 16, 16$.
3. $\chi^2 = \frac{4 + 4 + 1 + 1 + 16 + 16}{10} = \frac{42}{10} = 4.2$.
4. Degrees of freedom $= 6 - 1 = 5$.
5. The 5% critical value of $\chi^2_5$ is 11.07. Since $4.2 < 11.07$, we do not reject "the die is fair".

**Result:** $\chi^2 = 4.2$ with 5 degrees of freedom; the die is not shown to be unfair.

### Common mistakes
> **Common mistake:** Saying "there is a 95% chance $\mu$ is in this interval". $\mu$ is fixed; 95% describes the method over repeated samples.

> **Common mistake:** Thinking a large p-value proves $H_0$. It only means the data do not give enough evidence against it.

> **Common mistake:** Using $z$ when $\sigma$ is unknown and $n$ is small. Use $t$ with $n - 1$ degrees of freedom.

> **Common mistake:** Thinking that 3 times narrower needs 3 times the data. Width depends on $\frac{1}{\sqrt n}$, so you need $3^2 = 9$ times the data.

### How GATE asks it
Not asked in 2024–2026, but still in the syllabus.

A likely question: a NAT asking for a z statistic or the endpoints of a 95% CI (critical value given). Or an MCQ like "how much bigger must the sample be to halve the width?" (4 times). Or an MSQ on p-values, Type I/II errors and degrees of freedom.

> **GATE tip:** Every question here is "estimate $\pm$ critical value $\times$ standard error" or "(estimate $-$ claim) $\div$ standard error". Find the SE first.

### Summary
- First we use the CLT: the sample mean $\bar X$ is roughly normal around the true $\mu$, with spread $\mathrm{SE} = \frac{\sigma}{\sqrt n}$.
- Then we turn this around: since $\bar X$ is within $1.96$ SE of $\mu$ 95% of the time, the interval $\bar x \pm 1.96\,\mathrm{SE}$ catches $\mu$ 95% of the time.
- For a test, we assume the claim $\mu_0$ is true and ask how many SEs the data is from it. Too many SEs means the data is surprising, so we reject.
- The test, the p-value and the interval are three views of the same idea, so they always give the same decision.
- If $\sigma$ is unknown we use $s$ and the $t$ table; for counts in categories we use the chi-square statistic with "number of free counts" as degrees of freedom.
- Where this is used later: comparing two ML models (is the new accuracy really higher?), A/B testing, and error bars on any estimate.

### Quick self-check
1. To make a CI 3 times narrower, how much more data?

**Answer:** 9 times.

2. Which error is "rejecting a true $H_0$"?

**Answer:** Type I.

3. Degrees of freedom for a chi-square independence test on a $3 \times 4$ table?

**Answer:** $(3-1)(4-1) = 6$.
