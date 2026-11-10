# Calculus & Optimization

**Calculus** is the maths of **change**. Think of a car journey. The speedometer tells you how fast your position is changing at this exact moment. That "speed right now" is a **derivative**. Calculus measures such changes and finds the best point.

**Optimization** means finding the best value of something. A shopkeeper wants the price that gives the **most** profit. In maths, we look for the **maximum** (highest point) or **minimum** (lowest point) of a function.

**Why it matters for data science and AI.** Every machine learning model has a **loss function**. The loss is a number that says "how wrong is the model right now?". Training a model means making this loss as small as possible. The method used is **gradient descent**: find the slope (derivative), then take a small step downhill. So derivatives and minima are at the heart of AI.

**How GATE DA tests it.** In 2024–2026 there were **15 questions worth 22 marks**, about 7 marks per paper. The marks split like this:

| Topic | Questions | Marks |
|---|---|---|
| Limits & Continuity | 2 | 3 |
| Differentiability & Derivatives | 6 | 9 |
| Taylor Series | 0 | 0 |
| Maxima, Minima & Optimization | 6 | 9 |
| Series & Integration (beyond syllabus) | 1 | 1 |

The calculations are short. The traps are ideas: local versus global minimum, forgetting the end points of an interval, and "corners" where a slope does not exist. The syllabus covers only functions of **one variable** (one input $x$).

**Order to study, and why.**
1. **Limits & Continuity** first. A derivative is defined using a limit, so you need limits before anything else.
2. **Differentiability & Derivatives** next. This is the main tool for every later topic.
3. **Taylor Series** after derivatives. It uses derivatives to build simple polynomial copies of a function. It also gives quick shortcuts for limits.
4. **Maxima, Minima & Optimization**. This uses first and second derivatives together.
5. **Series & Integration** last. It is outside the official syllabus but appeared once.

**Free resources.**
- 3Blue1Brown, *Essence of Calculus* (YouTube): beautiful pictures that build intuition.
- NCERT Class 12 Mathematics Part 1: chapters "Continuity and Differentiability" and "Application of Derivatives" for practice.
- NPTEL, *Essential Mathematics for Machine Learning*: calculus and optimization modules.

## Limits & Continuity

### The big idea
A **limit** tells us what value a function is **heading towards** as the input comes closer and closer to some number.

A function is **continuous** if its graph has no breaks, jumps or holes. You can draw it without lifting your pen.

### Before you start

**1. What a function is.** A function is a machine: you put in a number $x$, it gives back one number $f(x)$.

Example: $f(x) = x^2$ is the machine "square the input". Put in 3, get $f(3) = 9$. Put in $-2$, get $f(-2) = 4$.

**2. The graph of a function.** Draw all the points $(x, f(x))$ on squared paper. The input $x$ goes left–right, the output $f(x)$ goes up–down.

Example: for $f(x) = x^2$ the points $(0, 0)$, $(1, 1)$, $(2, 4)$, $(-1, 1)$ give a U-shaped curve.

**3. Why we cannot divide by 0.** Division asks "how many times does the bottom fit into the top?". $\frac{6}{2} = 3$ because $2 \times 3 = 6$.

For $\frac{6}{0}$ we need a number that, times 0, gives 6. No such number exists. And $\frac00$ is worse: every number times 0 gives 0, so the answer could be anything. That is why $\frac00$ "has no meaning" and we need limits.

**4. Factoring $p^2 - q^2$.** School algebra says

$$(p - q)(p + q) = p^2 - q^2$$

Check by multiplying out: $p^2 + pq - qp - q^2 = p^2 - q^2$. Example with numbers: $(5 - 3)(5 + 3) = 2 \times 8 = 16 = 25 - 9$.

**5. Square root.** $\sqrt{A}$ is the non-negative number whose square is $A$. Example: $\sqrt{9} = 3$ because $3^2 = 9$.

**6. Sine and cosine, in radians.** Draw a circle of radius 1. Walk along the circle, starting from the rightmost point, a distance $x$ (anticlockwise). Your height is $\sin x$ and your sideways position is $\cos x$.

An angle measured by "distance walked on a radius-1 circle" is in **radians**. A full circle is $2\pi \approx 6.28$ radians, which is $360°$. Example: $\sin 0 = 0$, $\cos 0 = 1$.

**7. The number $e$ and $\ln$.** $e \approx 2.718$ is a special number. The function $e^x$ ("e to the power x") has a nice property: its slope at each point equals its own height (we will use this in the next topic).

$\ln$ (natural log) undoes $e^x$: $\ln y$ is the power you must put on $e$ to get $y$. Example: $\ln 1 = 0$ because $e^0 = 1$; $\ln e = 1$.

**8. Log rule.** Since powers add when we multiply ($e^a \cdot e^b = e^{a+b}$), logs turn a product into a sum:

$$\ln(ab) = \ln a + \ln b$$

Example: $\ln(e^2 \cdot e^3) = \ln(e^5) = 5 = 2 + 3$.

### Intuition
Imagine you walk towards a wall. Each step, you cover half of the remaining distance. You get closer and closer: 1 m, 0.5 m, 0.25 m, 0.125 m...

You never touch the wall, but it is clear where you are **heading**: distance 0. That "heading towards" value is the limit.

Why do we need this? Some formulas break at one point. Take $\frac{\sin x}{x}$. At $x = 0$ it becomes $\frac{0}{0}$, which has no meaning. But try numbers near 0:

| $x$ | 0.1 | 0.01 | 0.001 |
|---|---|---|---|
| $\frac{\sin x}{x}$ | 0.99833 | 0.99998 | 0.9999998 |

The values clearly head towards 1. So we say the limit is 1, even though the formula cannot be computed at 0 itself.

> **Intuition:** A limit asks "where are you going?", not "where are you now?". The value at the point itself does not matter for the limit.

Now continuity. Think of a road. A continuous road has no missing bridge and no sudden step. To drive across the point $x = a$ smoothly, three things must hold:

1. The road coming from the left arrives at some height.
2. The road coming from the right arrives at the **same** height.
3. The road actually exists at $x = a$, at that same height.

> **Intuition:** Continuous at a point = "left side agrees, right side agrees, and the point itself agrees".

### Words you need
- **Limit**: the value $f(x)$ approaches as $x$ approaches a number. Example: as $x \to 2$, $x^2 \to 4$.
- **$x \to a$**: read "x tends to a". It means $x$ gets very close to $a$ but is not equal to $a$.
- **$\lim_{x \to a} f(x)$**: read "the limit of $f(x)$ as $x$ tends to $a$". It is the value $f(x)$ heads towards.
- **Left-hand limit ($x \to a^-$)**: coming from numbers smaller than $a$. Example: 1.9, 1.99, 1.999 towards 2.
- **Right-hand limit ($x \to a^+$)**: coming from numbers bigger than $a$. Example: 2.1, 2.01, 2.001 towards 2.
- **Indeterminate form**: a result like $\frac{0}{0}$, $\frac{\infty}{\infty}$ or $\infty - \infty$ that tells you nothing yet. You must do more work. Example: $\frac{x^2 - 1}{x - 1}$ at $x = 1$ gives $\frac00$, but the limit is 2.
- **$\infty$ (infinity)**: not a number, but the idea of "growing without any end". Example: $t \to \infty$ means $t$ = 10, 1000, 1000000, ...
- **Conjugate**: for $\sqrt{A} - B$, the conjugate is $\sqrt{A} + B$. Multiplying them gives $A - B^2$, which removes the root.
- **$\ln$**: natural logarithm (log to base $e \approx 2.718$). Example: $\ln 1 = 0$.
- **$\approx$**: "almost equal". Example: $\pi \approx 3.14$.

### Formulas, explained

**Continuity at a point**

$$\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x) = f(a)$$

- **Read it as:** the left limit, the right limit and the actual value at $a$ are all equal.
- **Symbols:** $f(a)$ is the value of the function at $a$; the two limits are the heights the graph approaches from each side.
- **Why it makes sense:** if one side stops at a different height, the graph jumps. If $f(a)$ is different, there is a hole with a dot somewhere else.
- **Use it when:** checking a piecewise function at the joining point.

**Standard limits (as $x \to 0$)**

$$\lim_{x\to0}\frac{\sin x}{x} = 1,\qquad \lim_{x\to0}\frac{e^x - 1}{x} = 1$$

$$\lim_{x\to0}\frac{\ln(1+x)}{x} = 1,\qquad \lim_{x\to0}\frac{1-\cos x}{x^2} = \frac12$$

- **Read it as:** near zero, $\sin x$, $e^x - 1$ and $\ln(1+x)$ all behave like $x$; $1 - \cos x$ behaves like $\frac{x^2}{2}$.
- **Symbols:** $x$ is a small number; $\sin$, $\cos$ use radians; $e \approx 2.718$.
- **Why it makes sense:** zoom in very close to 0 on the graph of $\sin x$. It looks like the straight line $y = x$. So $\frac{\sin x}{x} \approx \frac{x}{x} = 1$.
- **Use it when:** a $\frac00$ limit has $\sin$, $e^x$, $\ln$ or $\cos$ inside.

**Small-$x$ approximations**

$$\sin x \approx x,\quad \cos x \approx 1 - \frac{x^2}{2},\quad e^x \approx 1 + x,\quad \ln(1+x) \approx x$$

- **Read it as:** for tiny $x$, replace the hard function with this simple expression.
- **Symbols:** $\approx$ means "almost equal".
- **Why it makes sense:** each one is just a standard limit above, rewritten. For example $\frac{\sin x}{x} \approx 1$ means $\sin x \approx x$. They are also the first terms of the Taylor series (see topic: Taylor Series).
- **Use it when:** you want a quick answer to a $\frac00$ limit.

**L'Hôpital's rule**

$$\text{If } \frac{f(a)}{g(a)} = \frac00 \text{ or } \frac{\infty}{\infty}, \text{ then } \lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\frac{f'(x)}{g'(x)}$$

- **Read it as:** for $\frac00$ or $\frac\infty\infty$, differentiate the top and the bottom separately, then try again.
- **Symbols:** $f'$ and $g'$ are the derivatives (slopes) of the top and bottom (see topic: Differentiability & Derivatives).
- **Why it makes sense:** near $a$, both top and bottom are almost straight lines through 0. Their ratio is the ratio of their slopes.
- **Use it when:** you see $\frac00$ or $\frac\infty\infty$. Do **not** use it for other forms.

**Conjugate trick for $\infty - \infty$**

$$\sqrt{A} - B = \frac{A - B^2}{\sqrt{A} + B}$$

- **Read it as:** multiply and divide by the "plus" version to remove the square root from the top.
- **Symbols:** $A$ is what is under the root; $B$ is the other term.
- **Why it makes sense:** $(\sqrt{A} - B)(\sqrt{A} + B) = A - B^2$. This is the school identity $(p-q)(p+q) = p^2 - q^2$.
- **Use it when:** a square root minus something goes to $\infty - \infty$.

### Where the formulas come from

**A. Continuity: why exactly three conditions?**

Start with a concrete case: $f(x) = 2x + 1$ for $x < 1$ and $f(x) = x^2 + 2$ for $x \ge 1$.

1. Walk in from the left: $x = 0.9, 0.99, 0.999$ gives $f = 2.8, 2.98, 2.998$. So the left road arrives at height 3, because $2x + 1 \to 2(1) + 1 = 3$.
2. Walk in from the right: $x = 1.1, 1.01, 1.001$ gives $f = 3.21, 3.0201, 3.002$. So the right road arrives at height 3, because $x^2 + 2 \to 1 + 2 = 3$.
3. The point itself: $f(1) = 1^2 + 2 = 3$, because $x = 1$ belongs to the "$x \ge 1$" piece.
4. All three heights are equal, so the pen does not lift. That is continuity.
5. Now generalise. If condition 1 and 2 disagree, the two roads arrive at different heights: a **jump**. If they agree but $f(a)$ is different, there is a **hole** with a lonely dot elsewhere. Only when all three agree is there no break, which gives the formula $\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x) = f(a)$.

**B. Where $\frac{\sin x}{x} \to 1$ comes from (a picture proof)**

Draw a circle of radius 1 with centre $O$. Take a small angle $x$ (in radians, with $0 < x < \frac{\pi}{2}$). We compare three areas.

1. The small triangle inside the slice joins $O$, the start point $(1, 0)$ and the end point $(\cos x, \sin x)$. It has base 1 and height $\sin x$. Its area is $\frac12 \sin x$, because a triangle's area is half base times height.
2. The pie slice (sector) of angle $x$ has area $\frac{x}{2}$. This is because the full circle has area $\pi$ and angle $2\pi$, so a slice of angle $x$ is the fraction $\frac{x}{2\pi}$ of it: $\pi \cdot \frac{x}{2\pi} = \frac{x}{2}$.
3. The big triangle that touches the circle on the outside has base 1 and height $\tan x = \frac{\sin x}{\cos x}$. Its area is $\frac12 \tan x$.
4. In the picture, small triangle ⊂ slice ⊂ big triangle. So

$$\frac12\sin x \le \frac{x}{2} \le \frac12\cdot\frac{\sin x}{\cos x}$$

5. Multiply everything by $\frac{2}{\sin x}$ (a positive number, so the $\le$ signs stay): $1 \le \frac{x}{\sin x} \le \frac{1}{\cos x}$.
6. Flip each part (flipping positive numbers reverses $\le$): $\cos x \le \frac{\sin x}{x} \le 1$.
7. As $x \to 0$, $\cos x \to \cos 0 = 1$. So $\frac{\sin x}{x}$ is squeezed between something going to 1 and the number 1 itself. It must also go to 1.

This only works in radians, because step 2 used "slice area $= \frac{x}{2}$", which is true only when $x$ is measured as distance walked on the circle.

**C. Where $\frac{e^x - 1}{x} \to 1$ comes from**

This one is really the **definition** of the number $e$. The full proof is not needed for GATE, but here is the honest idea.

1. Look at the curves $2^x$ and $3^x$. Both pass through $(0, 1)$, because any number to the power 0 is 1.
2. Measure their slope at $x = 0$ with a tiny step $h = 0.001$. For $2^x$: $\frac{2^{0.001} - 1}{0.001} \approx 0.693$. For $3^x$: $\frac{3^{0.001} - 1}{0.001} \approx 1.099$.
3. So somewhere between 2 and 3 there is a base whose slope at 0 is exactly 1. That base is named $e \approx 2.718$.
4. "Slope of $e^x$ at 0 equals 1" written as a formula is exactly $\lim_{x\to0}\frac{e^x - e^0}{x - 0} = \lim_{x\to0}\frac{e^x - 1}{x} = 1$.
5. Check with numbers: $x = 0.001$ gives $\frac{1.0010005 - 1}{0.001} = 1.0005$. Very close to 1.

**D. Where $\frac{\ln(1+x)}{x} \to 1$ comes from**

This is formula C seen "backwards", because $\ln$ undoes $e^x$.

1. Give a name: $u = \ln(1 + x)$. Then $e^u = 1 + x$, so $x = e^u - 1$. This is allowed because $\ln$ and $e^{(\,)}$ undo each other.
2. As $x \to 0$, $u = \ln(1 + x) \to \ln 1 = 0$.
3. So $\frac{\ln(1+x)}{x} = \frac{u}{e^u - 1}$.
4. By formula C, $\frac{e^u - 1}{u} \to 1$. Its flip $\frac{u}{e^u - 1}$ therefore also goes to $\frac11 = 1$.

**E. Where $\frac{1 - \cos x}{x^2} \to \frac12$ comes from**

We turn cosine into sine, then use formula B.

1. Multiply top and bottom by $(1 + \cos x)$. This is allowed because we multiply by $\frac{1 + \cos x}{1 + \cos x} = 1$.
2. Top: $(1 - \cos x)(1 + \cos x) = 1 - \cos^2 x$, by $(p - q)(p + q) = p^2 - q^2$.
3. On the radius-1 circle, height² + side² = 1 (Pythagoras), so $\sin^2 x + \cos^2 x = 1$. Hence $1 - \cos^2 x = \sin^2 x$.
4. So the expression becomes $\frac{\sin^2 x}{x^2}\cdot\frac{1}{1 + \cos x} = \left(\frac{\sin x}{x}\right)^2\cdot\frac{1}{1 + \cos x}$.
5. As $x \to 0$: the first part $\to 1^2 = 1$ (formula B), and the second part $\to \frac{1}{1 + 1} = \frac12$.
6. Result: $1 \times \frac12 = \frac12$.

**F. Small-$x$ approximations are the standard limits in disguise**

1. "$\frac{\sin x}{x} \to 1$" means: for tiny $x$, $\sin x$ divided by $x$ is about 1, so $\sin x \approx x$.
2. In the same way, formula C gives $e^x - 1 \approx x$, so $e^x \approx 1 + x$.
3. Formula D gives $\ln(1 + x) \approx x$.
4. Formula E gives $1 - \cos x \approx \frac{x^2}{2}$, so $\cos x \approx 1 - \frac{x^2}{2}$.
5. Check: $x = 0.1$. $\sin 0.1 = 0.0998 \approx 0.1$. $\cos 0.1 = 0.99500 \approx 1 - 0.005 = 0.995$.

**G. Where L'Hôpital's rule comes from**

This uses the derivative from the next topic. Start with a concrete case: $\lim_{x\to3}\frac{x^2 - 9}{x - 3}$.

1. Top $f(x) = x^2 - 9$ and bottom $g(x) = x - 3$ are both 0 at $x = 3$.
2. Near $x = 3$, a smooth curve looks like a straight line through its point. The top is about $f(3) + f'(3)(x - 3) = 0 + 6(x - 3)$, because its slope $f'(x) = 2x$ is 6 at 3.
3. The bottom is exactly $1 \cdot (x - 3)$, because its slope is 1.
4. Divide: $\frac{6(x - 3)}{1\cdot(x - 3)} = 6$. The $(x - 3)$ cancels because $x \ne 3$ while approaching.
5. General version: if $f(a) = g(a) = 0$, then $\frac{f(x)}{g(x)} \approx \frac{f'(a)(x - a)}{g'(a)(x - a)} = \frac{f'(a)}{g'(a)}$. That is L'Hôpital's rule.

The $\frac\infty\infty$ case has a longer proof that is not needed for GATE. The idea is the same: compare how fast the top and bottom change.

**H. Where the conjugate trick and the shortcut $\frac{k}{2}$ come from**

First with numbers: $\sqrt{10} - 3 \approx 0.1623$.

1. Multiply and divide by $\sqrt{10} + 3$: $\frac{(\sqrt{10} - 3)(\sqrt{10} + 3)}{\sqrt{10} + 3}$. Allowed because we multiplied by 1.
2. Top: $10 - 9 = 1$, by $(p - q)(p + q) = p^2 - q^2$. So $\sqrt{10} - 3 = \frac{1}{\sqrt{10} + 3} \approx \frac{1}{6.162} \approx 0.1623$. Same value, but no subtraction of big numbers.
3. In general, $\sqrt{A} - B = \frac{A - B^2}{\sqrt{A} + B}$.

Now the shortcut $\sqrt{t^2 + kt} - t \to \frac{k}{2}$:

4. Use $A = t^2 + kt$, $B = t$. Then $A - B^2 = kt$. So the expression equals $\frac{kt}{\sqrt{t^2 + kt} + t}$.
5. Divide top and bottom by $t$ (with $t > 0$, $\frac{\sqrt{t^2 + kt}}{t} = \sqrt{1 + \frac{k}{t}}$): we get $\frac{k}{\sqrt{1 + k/t} + 1}$.
6. As $t \to \infty$, $\frac{k}{t} \to 0$, so the bottom $\to \sqrt{1} + 1 = 2$. Result: $\frac{k}{2}$.

### Examples

**Example 1 (easy):** Find $\displaystyle\lim_{x\to3}\frac{x^2 - 9}{x - 3}$.

1. Put $x = 3$: top $= 9 - 9 = 0$, bottom $= 3 - 3 = 0$. Form $\frac00$, so more work is needed.
2. Factor the top: $x^2 - 9 = (x - 3)(x + 3)$, by $p^2 - q^2 = (p - q)(p + q)$.
3. Cancel $(x - 3)$. This is allowed because $x \ne 3$ while approaching.
4. We get $x + 3$. Put $x = 3$: $3 + 3 = 6$.

**Result:** 6.

**Example 2 (medium):** Is $f(x) = 2x + 1$ for $x < 1$, and $f(x) = x^2 + 2$ for $x \ge 1$, continuous at $x = 1$?

1. Left limit: $2(1) + 1 = 3$.
2. Right limit: $1^2 + 2 = 3$.
3. Value: $f(1) = 1^2 + 2 = 3$.
4. All three are equal to 3.

**Result:** Yes, continuous.

**Example 3 (GATE level):** Find $\displaystyle\lim_{t\to\infty}\left(\sqrt{t^2 + 6t} - t\right)$.

1. Direct substitution gives $\infty - \infty$. Use the conjugate.
2. Top: $(t^2 + 6t) - t^2 = 6t$. So the expression is $\frac{6t}{\sqrt{t^2 + 6t} + t}$.
3. Divide top and bottom by $t$ (note $\sqrt{t^2 + 6t}/t = \sqrt{1 + 6/t}$ for $t > 0$): $\frac{6}{\sqrt{1 + 6/t} + 1}$.
4. As $t \to \infty$, $6/t \to 0$. So we get $\frac{6}{\sqrt{1} + 1} = \frac{6}{2} = 3$.

**Result:** 3. This matches the pattern $\sqrt{t^2 + kt} - t \to \frac{k}{2}$ with $k = 6$.

**Example 4 (GATE level):** Find $\displaystyle\lim_{x\to0}\frac{\ln(1 + 3x^2)}{x^2}$.

1. Put $x = 0$: $\frac{\ln 1}{0} = \frac00$.
2. Use $\ln(1 + u) \approx u$ with $u = 3x^2$ (tiny when $x$ is tiny): $\ln(1 + 3x^2) \approx 3x^2$.
3. So the expression $\approx \frac{3x^2}{x^2} = 3$.

**Result:** 3.

### Common mistakes
> **Common mistake:** Saying $\infty - \infty = 0$. It can be any number. In Example 3 it was 3. Always rationalise first.

> **Common mistake:** Using L'Hôpital when the form is not $\frac00$ or $\frac\infty\infty$. Check the form by substituting first.

> **Common mistake:** Using the quotient rule in L'Hôpital. You differentiate top and bottom **separately**, not $\left(\frac fg\right)'$.

> **Common mistake:** Using degrees in $\frac{\sin x}{x} \to 1$. This only works in radians.

### How GATE asks it
- **2024 Q.60** (NAT, 2 marks): $\lim\frac{\ln((1+x^2)\cos x)}{x^2}$. Split using $\ln(ab) = \ln a + \ln b$: the first part $\to 1$, the second part $\to -\frac12$. Answer 0.5.
- **2025 Q.32** (NAT, 1 mark): $\lim_{t\to\infty}(\sqrt{t^2 + t} - t)$. Conjugate trick. Answer 0.5.
- Pattern: short NAT questions with "nice" answers like 0.5. Continuity of piecewise functions is also tested inside the derivatives topic (2024 Q.37, 2025 Q.48).

> **GATE tip:** For $\frac00$ limits near 0, replace each function with its small-$x$ approximation. It is faster than L'Hôpital and gives fewer errors.

### Summary
- First we asked "where is $f(x)$ heading?" instead of "what is $f(x)$ at the point?". That is a limit.
- Then we saw that some formulas give $\frac00$ or $\infty - \infty$ at a point, so we must use limits to find their true value.
- The basic limits ($\frac{\sin x}{x} \to 1$, $\frac{e^x - 1}{x} \to 1$, and friends) come from a circle picture and from the definition of $e$. They give the small-$x$ copies $\sin x \approx x$, $e^x \approx 1 + x$, $\ln(1+x) \approx x$, $\cos x \approx 1 - \frac{x^2}{2}$.
- For $\infty - \infty$ with a root, the conjugate removes the root, which gives the shortcut $\frac{k}{2}$.
- Continuity means the left limit, the right limit and the value all agree, so the graph has no jump or hole.
- Next topic builds on this: the derivative is defined as a limit of "rise over run", so limits are the base of all of calculus.

### Quick self-check
1. Find $\displaystyle\lim_{x\to0}\frac{\sin 5x}{x}$.

**Answer:** $\sin 5x \approx 5x$, so the limit is $\frac{5x}{x} = 5$.

2. Find $\displaystyle\lim_{t\to\infty}(\sqrt{t^2 + 10t} - t)$.

**Answer:** $\frac{10}{2} = 5$ (conjugate trick).

3. $f(x) = x + 1$ for $x < 0$ and $f(x) = x$ for $x \ge 0$. Is $f$ continuous at 0?

**Answer:** No. The left limit is 1 but $f(0) = 0$. There is a jump.

## Differentiability & Derivatives

### The big idea
The **derivative** of a function tells you how fast its output changes when you change its input a tiny bit. On a graph, it is the **slope** (steepness) of the curve at a point.

A function is **differentiable** at a point if a clear, single slope exists there.

### Before you start

**1. Limits (see topic: Limits & Continuity).** $\lim_{h\to0}$ means "what value do we head towards as $h$ becomes tiny, but never exactly 0?". The derivative is built from this.

**2. Slope of a straight line.** Slope = rise ÷ run = (change in height) ÷ (change in sideways position).

Example: the line through $(1, 2)$ and $(3, 8)$ has slope $\frac{8 - 2}{3 - 1} = \frac{6}{2} = 3$. It goes up 3 for every 1 step right.

**3. Powers.** $x^n$ means $x$ multiplied by itself $n$ times. Rules: $x^a \cdot x^b = x^{a+b}$, $x^{-1} = \frac1x$, $x^{1/2} = \sqrt{x}$.

Example: $x^{-2} = \frac{1}{x^2}$, and $4^{1/2} = 2$.

**4. Expanding $(x + h)^2$.** $(x + h)^2 = (x + h)(x + h) = x^2 + 2xh + h^2$.

Example: $(3 + 0.1)^2 = 9 + 0.6 + 0.01 = 9.61$.

**5. $e^x$ and $\ln x$ (see topic: Limits & Continuity).** $e \approx 2.718$. $\ln$ undoes $e^x$: $\ln(e^x) = x$ and $e^{\ln y} = y$. Two facts we will use: $e^{a + b} = e^a e^b$, and $\ln a - \ln b = \ln\frac{a}{b}$.

**6. Absolute value $\lvert x\rvert$.** It means "size without sign". $\lvert 3\rvert = 3$, $\lvert -3\rvert = 3$. Its graph is a V shape with the corner at 0.

**7. Function inside a function.** $f(g(x))$ means "first compute $g(x)$, then feed that answer into $f$".

Example: $g(x) = x + 1$, $f(u) = u^2$. Then $f(g(2)) = f(3) = 9$.

### Intuition
You are on a bike ride. Your distance from home is $f(t)$ at time $t$. Between minute 10 and minute 12 you go from 3 km to 4 km.

Your **average** speed is $\frac{4 - 3}{12 - 10} = 0.5$ km per minute. Now shrink the time gap: 10 to 11 minutes, then 10 to 10.1, then 10 to 10.001. The average speed settles to one number.

That number is your speed **at exactly minute 10**. This is the derivative.

> **Intuition:** Derivative = "rise over run" for a run so tiny that it becomes a single point. It is the speedometer reading of a function.

When does a slope **not** exist? Picture a road:

- A **jump** (a broken bridge): you cannot even drive across. Not continuous, so not differentiable.
- A **corner** (a sharp V-turn): the road is connected, but the direction changes suddenly. Coming from the left the slope is one number, from the right it is another. No single slope.
- A **smooth curve**: one clear slope at each point. Differentiable.

> **Intuition:** Differentiable means "smooth with no sharp corners". Every smooth road is connected, but a connected road can still have corners. So differentiable implies continuous, but not the reverse.

The famous example is $\lvert x\rvert$ (and the ML function **ReLU**). At $x = 0$ both make a corner. Left slope and right slope are different.

### Words you need
- **Slope**: rise divided by run. Example: the line $y = 3x$ rises 3 for each 1 step right, slope 3.
- **Derivative $f'(x)$**: the slope of $f$ at $x$. Example: for $f(x) = x^2$, $f'(x) = 2x$, so at $x = 3$ the slope is 6. Another way to write it is $\frac{df}{dx}$ ("change in $f$ per change in $x$").
- **$f''(x)$**: the second derivative, the derivative of $f'$. It measures bending. Example: $f(x) = x^3$ gives $f' = 3x^2$, then $f'' = 6x$.
- **$f^{(n)}(x)$**: the $n$-th derivative (differentiate $n$ times).
- **Corner**: a point where left slope $\ne$ right slope. Example: $\lvert x\rvert$ at 0 has slopes $-1$ and $+1$.
- **Piecewise function**: a function given by different formulas on different parts. Example: ReLU $= 0$ for $x < 0$ and $x$ for $x \ge 0$.
- **Composition $f \circ g$**: "first apply $g$, then apply $f$". Example: $g(x) = x + 1$, $f(x) = x^2$, so $(f \circ g)(x) = (x+1)^2$.
- **Sigmoid $\sigma(x)$**: an S-shaped function used in logistic regression. Its output is between 0 and 1. ($\sigma$ is the Greek letter "sigma".)
- **ReLU**: $\max(x, 0)$, the most common activation function in neural networks. $\max(x, 0)$ means "the bigger of $x$ and 0".
- **$\sinh x$, $\cosh x$**: hyperbolic sine and cosine, $\frac{e^x - e^{-x}}{2}$ and $\frac{e^x + e^{-x}}{2}$.
- **$\frac{\partial f}{\partial w}$**: "partial derivative". The slope of $f$ when only $w$ changes and every other letter is held fixed.

### Formulas, explained

**Definition of the derivative**

$$f'(a) = \lim_{h\to0}\frac{f(a+h) - f(a)}{h}$$

- **Read it as:** the slope at $a$ is the limit of (change in output) divided by (change in input), as the change $h$ shrinks to 0.
- **Symbols:** $h$ is a tiny step; $f(a+h) - f(a)$ is the rise; $h$ is the run.
- **Why it makes sense:** it is exactly the bike story: average speed over a shrinking time gap.
- **Use it when:** a question gives an inequality about $f$ (like 2025 Q.59), or asks about slopes at a corner.

**Basic derivatives**

$$(x^n)' = nx^{n-1},\quad (e^x)' = e^x,\quad (\ln x)' = \frac1x$$

$$(\sin x)' = \cos x,\quad (\cos x)' = -\sin x$$

- **Read it as:** "bring the power down and reduce it by one"; $e^x$ is its own slope; and so on.
- **Symbols:** $n$ is any fixed number.
- **Why it makes sense:** for $x^2$: $\frac{(x+h)^2 - x^2}{h} = \frac{2xh + h^2}{h} = 2x + h \to 2x$.
- **Use it when:** always. Memorise these.

**Product, quotient and chain rules**

$$(fg)' = f'g + fg'$$

$$\left(\frac fg\right)' = \frac{f'g - fg'}{g^2}$$

$$\big(f(g(x))\big)' = f'(g(x))\cdot g'(x)$$

- **Read it as:** product: "first's slope times second, plus first times second's slope". Chain: "outer slope (at the inner value) times inner slope".
- **Symbols:** $f, g$ are functions; $g^2$ is $g$ times $g$, which must not be 0.
- **Why it makes sense:** the chain rule is like gears. If gear $g$ turns 3 times as fast as $x$, and $f$ turns 2 times as fast as $g$, then $f$ turns $2 \times 3 = 6$ times as fast as $x$.
- **Use it when:** functions are multiplied, divided or nested.

**Sigmoid derivative**

$$\sigma(x) = \frac{1}{1 + e^{-x}},\qquad \sigma'(x) = \sigma(x)\big(1 - \sigma(x)\big)$$

- **Read it as:** the slope of the sigmoid equals (its value) times (one minus its value).
- **Symbols:** $\sigma(x)$ is a number between 0 and 1.
- **Why it makes sense:** the slope is largest ($0.5 \times 0.5 = 0.25$) in the middle, where $\sigma = 0.5$, and tiny at the flat ends where $\sigma$ is near 0 or 1.
- **Use it when:** you know $\sigma(x)$ and need the slope. You do not need $x$ itself.

**Differentiable at a joint (piecewise function)**

$$\text{left value} = \text{right value}\quad\text{and}\quad\text{left slope} = \text{right slope}$$

- **Read it as:** the two pieces must meet, and must meet with the same steepness.
- **Why it makes sense:** meeting removes jumps; equal slopes remove corners.
- **Use it when:** finding unknown constants $a, b, c$ that make a piecewise function smooth.

**Zero derivative means constant (from the Mean Value Theorem)**

$$f'(x) = 0 \text{ for all } x \;\Rightarrow\; f \text{ is constant}$$

- **Read it as:** if the slope is zero everywhere, the function never goes up or down.
- **Symbols:** $\Rightarrow$ means "therefore" or "implies".
- **Why it makes sense:** a car whose speedometer always shows 0 never moves.
- **Use it when:** you prove $f' = 0$ and need $f(1) - f(0)$.

### Where the formulas come from

**A. The definition: from average speed to speed at one moment**

Take $f(t) = t^2$ (distance in km after $t$ minutes) and ask for the speed at $t = 3$.

1. From $t = 3$ to $t = 4$: average speed $= \frac{16 - 9}{1} = 7$. Because average speed = distance covered ÷ time taken.
2. From $t = 3$ to $t = 3.1$: $\frac{9.61 - 9}{0.1} = 6.1$.
3. From $t = 3$ to $t = 3.01$: $\frac{9.0601 - 9}{0.01} = 6.01$.
4. The answers 7, 6.1, 6.01 head towards 6. So the speed at exactly $t = 3$ is 6.
5. In symbols, call the time step $h$. The average speed is $\frac{f(3 + h) - f(3)}{h}$, and we let $h \to 0$. Replace 3 by any point $a$: this is the definition $f'(a) = \lim_{h\to0}\frac{f(a+h) - f(a)}{h}$.

**B. Power rule $(x^n)' = nx^{n-1}$**

1. For $x^2$: $\frac{(x+h)^2 - x^2}{h} = \frac{x^2 + 2xh + h^2 - x^2}{h} = \frac{2xh + h^2}{h} = 2x + h$. We may divide by $h$ because $h \ne 0$ while approaching.
2. Let $h \to 0$: we get $2x$. This matches step 4 of part A ($2 \times 3 = 6$).
3. For $x^3$: $(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$ (multiply $(x+h)^2$ by $(x + h)$ once more).
4. So $\frac{(x+h)^3 - x^3}{h} = 3x^2 + 3xh + h^2 \to 3x^2$, because every term with an $h$ in it goes to 0.
5. Pattern: when we expand $(x + h)^n$, the first term is $x^n$ (it cancels), the next term is $n x^{n-1} h$ (there are $n$ brackets, each can supply the one $h$), and all other terms have $h^2$ or more, which vanish after dividing by $h$. So $(x^n)' = nx^{n-1}$.
6. The rule also works for negative and fractional powers. The full proof is not needed for GATE. Check one: $\left(x^{1/2}\right)' = \frac12 x^{-1/2} = \frac{1}{2\sqrt{x}}$. At $x = 4$ that is $0.25$; and indeed $\frac{\sqrt{4.01} - 2}{0.01} \approx 0.2498$.

**C. $(e^x)' = e^x$**

1. Write the definition: $\frac{e^{x+h} - e^x}{h}$.
2. Use $e^{x+h} = e^x \cdot e^h$ (powers add when we multiply): $\frac{e^x e^h - e^x}{h} = e^x \cdot \frac{e^h - 1}{h}$.
3. By the standard limit $\frac{e^h - 1}{h} \to 1$ (see topic: Limits & Continuity), this becomes $e^x \cdot 1 = e^x$.

So $e^x$ is its own slope. That is exactly why the number $e$ was chosen.

**D. $(\ln x)' = \frac1x$**

1. Definition: $\frac{\ln(x + h) - \ln x}{h} = \frac{1}{h}\ln\frac{x + h}{x} = \frac1h \ln\left(1 + \frac{h}{x}\right)$. Because $\ln a - \ln b = \ln\frac ab$.
2. For tiny $h$, $\frac{h}{x}$ is tiny, so $\ln\left(1 + \frac hx\right) \approx \frac hx$ (standard limit $\ln(1 + u) \approx u$).
3. So the ratio is about $\frac1h \cdot \frac hx = \frac1x$.
4. Check with numbers: at $x = 2$, $\frac{\ln 2.001 - \ln 2}{0.001} \approx 0.49988 \approx \frac12$.

**E. $(\sin x)' = \cos x$ and $(\cos x)' = -\sin x$**

This uses the school "addition formula" $\sin(x + h) = \sin x\cos h + \cos x \sin h$. You do not need to prove it for GATE.

1. Definition: $\frac{\sin(x+h) - \sin x}{h} = \sin x \cdot \frac{\cos h - 1}{h} + \cos x \cdot \frac{\sin h}{h}$.
2. As $h \to 0$: $\frac{\sin h}{h} \to 1$, and $\frac{\cos h - 1}{h} = -h\cdot\frac{1 - \cos h}{h^2} \to -0 \cdot \frac12 = 0$. Both come from the standard limits.
3. So the slope is $\sin x \cdot 0 + \cos x \cdot 1 = \cos x$.
4. Picture check: at $x = 0$ the sine wave rises most steeply (slope $\cos 0 = 1$); at $x = \frac\pi2$ it is at its top, flat (slope $\cos\frac\pi2 = 0$).
5. Cosine is the same wave shifted, and the same steps give $(\cos x)' = -\sin x$.

**F. Product rule: a growing rectangle**

1. Think of $f(x)\cdot g(x)$ as the area of a rectangle with sides $f$ and $g$. Example: sides 5 and 3, area 15.
2. Now each side grows a little: $f$ by $\Delta f = 0.1$, $g$ by $\Delta g = 0.2$. New area $= 5.1 \times 3.2 = 16.32$.
3. The extra area $1.32$ has three pieces: a strip $\Delta f \cdot g = 0.1 \times 3 = 0.3$, a strip $f \cdot \Delta g = 5 \times 0.2 = 1.0$, and a tiny corner $\Delta f \cdot \Delta g = 0.02$.
4. Divide by the small step $h$ in $x$ and let $h \to 0$. The two strips give $f'g + fg'$. The corner is (small) × (small), so after dividing by $h$ it still goes to 0.
5. Result: $(fg)' = f'g + fg'$.

**G. Chain rule: gears**

1. Example: $y = (x + 1)^2$. Inside $u = x + 1$, outside $y = u^2$.
2. If $x$ moves by a tiny amount, $u$ moves by the same amount, because $u' = 1$.
3. If $u$ moves a tiny amount, $y$ moves $2u$ times as much, because $(u^2)' = 2u$.
4. So $y$ moves $2u \times 1 = 2(x + 1)$ times as much as $x$. Rates multiply, like gears.
5. Check by expanding: $(x+1)^2 = x^2 + 2x + 1$ has slope $2x + 2 = 2(x+1)$. Same answer.
6. General: $\big(f(g(x))\big)' = f'(g(x))\cdot g'(x)$. Note the outer slope is measured at the inner value $g(x)$, because that is where $f$ is working.

**H. Quotient rule is the product rule plus the chain rule**

1. Write $\frac fg = f \cdot g^{-1}$.
2. Chain rule on $g^{-1}$: outer $u^{-1}$ has slope $-u^{-2}$, so $(g^{-1})' = -g^{-2}g' = -\frac{g'}{g^2}$.
3. Product rule: $\left(f g^{-1}\right)' = f' \cdot \frac1g + f \cdot\left(-\frac{g'}{g^2}\right)$.
4. Common denominator $g^2$: $\frac{f'g - fg'}{g^2}$. That is the quotient rule. It needs $g \ne 0$ because we divided by $g$.

**I. Sigmoid derivative $\sigma' = \sigma(1 - \sigma)$**

1. Write $\sigma(x) = (1 + e^{-x})^{-1}$.
2. Chain rule, outer part: the slope of $u^{-1}$ is $-u^{-2}$.
3. Chain rule, inner part: the slope of $1 + e^{-x}$ is $-e^{-x}$ (the inner chain: $e^{(\,)}$ has slope $e^{(\,)}$, times the slope of $-x$, which is $-1$).
4. Multiply: $\sigma'(x) = -(1 + e^{-x})^{-2}\cdot(-e^{-x}) = \frac{e^{-x}}{(1 + e^{-x})^2}$.
5. Split it: $\frac{1}{1 + e^{-x}}\cdot\frac{e^{-x}}{1 + e^{-x}}$. The first factor is $\sigma$.
6. The second factor: $\frac{e^{-x}}{1 + e^{-x}} = \frac{(1 + e^{-x}) - 1}{1 + e^{-x}} = 1 - \frac{1}{1 + e^{-x}} = 1 - \sigma$.
7. Result: $\sigma' = \sigma(1 - \sigma)$. Check at $x = 0$: $\sigma(0) = \frac{1}{1 + 1} = 0.5$, slope $0.25$.

**J. $\sinh$ and $\cosh$ derivatives**

1. By the chain rule, $(e^{-x})' = e^{-x}\cdot(-1) = -e^{-x}$.
2. So $(\sinh x)' = \frac{e^x - (-e^{-x})}{2} = \frac{e^x + e^{-x}}{2} = \cosh x$.
3. And $(\cosh x)' = \frac{e^x + (-e^{-x})}{2} = \sinh x$.
4. So the derivatives go $\sinh \to \cosh \to \sinh \to \cdots$, repeating every 2 steps.

**K. Conditions at a joint, and why differentiable implies continuous**

1. Differentiable at $a$ means $\frac{f(a+h) - f(a)}{h}$ heads to one number $f'(a)$ from both sides. So the left slope and the right slope must be equal.
2. Also $f(a + h) - f(a) = \frac{f(a+h) - f(a)}{h}\times h$, which heads to $f'(a) \times 0 = 0$. So $f(a + h) \to f(a)$: the function is continuous at $a$.
3. That is why a joint needs both "values meet" (continuity) and "slopes meet" (no corner).
4. The reverse fails: $\lvert x\rvert$ is continuous at 0 but its left slope is $-1$ and right slope is $+1$.

**L. Zero slope everywhere means constant (Mean Value Theorem idea)**

1. The Mean Value Theorem says: between $x = p$ and $x = q$, a smooth curve has at least one point where its slope equals the average slope $\frac{f(q) - f(p)}{q - p}$.
2. Picture: if you drive 60 km in 1 hour, at some moment your speedometer showed exactly 60 km/h. You cannot average 60 without passing through 60. (The formal proof is not needed for GATE.)
3. If $f' = 0$ everywhere, then every possible "slope at some point" is 0. So the average slope $\frac{f(q) - f(p)}{q - p} = 0$.
4. Hence $f(q) = f(p)$ for any two points: $f$ is constant.

### Examples

**Example 1 (easy):** A shop's profit is $P(x) = 50x - x^2$ rupees when it sells $x$ items. Find $P'(10)$.

1. Differentiate each term: $(50x)' = 50$ and $(x^2)' = 2x$. So $P'(x) = 50 - 2x$.
2. Put $x = 10$: $P'(10) = 50 - 20 = 30$.
3. Meaning: near 10 items, one extra item adds about 30 rupees of profit.

**Result:** $P'(10) = 30$.

**Example 2 (medium):** If $\sigma(x) = 0.8$, find $\sigma'(x)$.

1. Use $\sigma' = \sigma(1 - \sigma)$. No need to find $x$.
2. $\sigma' = 0.8 \times (1 - 0.8) = 0.8 \times 0.2 = 0.16$.
3. Sanity check: it is below the maximum 0.25. Good.

**Result:** 0.16.

**Example 3 (GATE level):** Find $a, b$ so that $f(x) = ax^2 + b$ for $x \le 1$ and $f(x) = 4\sqrt{x}$ for $x > 1$ is differentiable at $x = 1$.

1. **Values meet:** left value $a(1)^2 + b = a + b$. Right value $4\sqrt1 = 4$. So $a + b = 4$.
2. **Slopes meet:** left slope $(ax^2 + b)' = 2ax$, at 1 it is $2a$.
3. Right slope $(4x^{1/2})' = 4 \cdot \frac12 x^{-1/2} = \frac{2}{\sqrt x}$, at 1 it is 2.
4. So $2a = 2$, giving $a = 1$.
5. Then $b = 4 - 1 = 3$.

**Result:** $a = 1$, $b = 3$.

**Example 4 (GATE level):** Let $f(x) = \cosh x = \frac{e^x + e^{-x}}{2}$. Find $f^{(7)}(0)$.

1. $f' = \frac{e^x - e^{-x}}{2} = \sinh x$. Then $f'' = \cosh x$. The pattern repeats every 2 steps.
2. Odd-order derivatives are $\sinh x$. So $f^{(7)}(x) = \sinh x$.
3. $\sinh 0 = \frac{1 - 1}{2} = 0$.

**Result:** 0.

### Common mistakes
> **Common mistake:** Thinking continuous means differentiable. ReLU and $\lvert x\rvert$ are continuous but have a corner at 0. Always compare left and right slopes.

> **Common mistake:** For a piecewise function, matching only the values. Differentiability needs the slopes to match too.

> **Common mistake:** In the chain rule, forgetting that $f$ must be differentiable at $g(c)$, not at $c$. "Both differentiable at $c$" does not make $f \circ g$ differentiable at $c$.

> **Common mistake:** Solving for $x$ in a sigmoid question. Use $\sigma(1 - \sigma)$ directly.

### How GATE asks it
- **2024 Q.33** (NAT, 1 mark): sigmoid with $f(x) = 0.4$. Slope $= 0.4 \times 0.6 = 0.24$.
- **2024 Q.37** (MCQ, 2 marks): piecewise $-x$, $ax^2 + bx + c$, $x$ joined at $\pm 2$. Match values and slopes to get $a = \frac14, b = 0, c = 1$.
- **2025 Q.14** (MCQ, 1 mark): 10th derivative of $\sinh x$ at 0. Even derivatives are $\sinh x$, so the answer is 0.
- **2025 Q.24** (MSQ, 1 mark): $f, g$ differentiable at $c$. $f \pm g$, $fg$, $f/g$ (with $g > 1$) are differentiable; $f \circ g$ is not guaranteed.
- **2025 Q.48** (MSQ, 2 marks): ReLU is continuous everywhere, but not differentiable at 0.
- **2025 Q.59** (NAT, 2 marks): $\lvert f(x) - f(y)\rvert \le (x - y)^2$ forces $f' = 0$ everywhere, so $f(1) - f(0) = 0$.

> **GATE tip:** This is the highest-scoring calculus topic (9 marks in 3 years). ML functions (sigmoid, ReLU) and "always true?" MSQs appear often. For MSQs, try one counter-example for each option.

### Summary
- First we measured average speed over a time gap, then shrank the gap to 0 using a limit. The result is the derivative: the slope at one point.
- Then we used this definition on simple functions and got the basic rules: $x^n \to nx^{n-1}$, $e^x \to e^x$, $\ln x \to \frac1x$, $\sin x \to \cos x$.
- To combine functions we built the product rule (growing rectangle), the chain rule (gears) and the quotient rule (product + chain).
- The chain rule gives the ML results: the sigmoid slope $\sigma(1 - \sigma)$, and the $\sinh$/$\cosh$ swap.
- A slope exists only when left and right slopes agree, so corners (like $\lvert x\rvert$ and ReLU at 0) have no derivative. Differentiable always means continuous, not the reverse.
- Next topic builds on this: Taylor Series uses $f', f'', f''', \ldots$ to copy a function with a polynomial, and later Maxima & Minima uses $f'$ and $f''$ to find the best point. In ML, backpropagation is the chain rule applied many times.

### Quick self-check
1. Find the derivative of $f(x) = x^3 e^x$.

**Answer:** Product rule: $3x^2 e^x + x^3 e^x$.

2. If $\sigma(x) = 0.5$, what is $\sigma'(x)$?

**Answer:** $0.5 \times 0.5 = 0.25$ (the maximum possible).

3. Is $f(x) = \lvert x - 3\rvert$ differentiable at $x = 3$?

**Answer:** No. Left slope $-1$, right slope $+1$. It has a corner.

## Taylor Series

### The big idea
A **Taylor series** writes a complicated function as a long polynomial: a number, plus a multiple of $x$, plus a multiple of $x^2$, and so on.

Near a chosen point, the first few terms already give a very good copy of the function.

### Before you start

**1. Derivatives (see topic: Differentiability & Derivatives).** $f'(a)$ is the slope at $a$; $f''(a)$ is the slope of the slope (bending); $f'''(a)$ is the third derivative, and so on.

Example: $f(x) = x^3$ gives $f' = 3x^2$, $f'' = 6x$, $f''' = 6$, $f'''' = 0$.

**2. Polynomial.** A sum of whole-number powers of $x$, each with a number in front. Example: $3 + 2x + x^2$. Its value at $x = 1$ is $3 + 2 + 1 = 6$.

**3. Factorial $n!$.** $n! = 1 \times 2 \times \cdots \times n$. Example: $3! = 6$, $4! = 24$, $5! = 120$. By agreement $0! = 1$.

Factorials appear because differentiating $x^n$ again and again gives $n \cdot (n-1) \cdots 1 = n!$.

**4. The sum symbol $\sum$.** $\sum_{n=0}^{3} a_n$ means $a_0 + a_1 + a_2 + a_3$. The "$\cdots$" at the end of a series means "the pattern continues forever".

**5. Small-$x$ approximations (see topic: Limits & Continuity).** $\sin x \approx x$, $\cos x \approx 1 - \frac{x^2}{2}$, $e^x \approx 1 + x$. Taylor series is the full version of these.

**6. Odd and even functions.** Even: $f(-x) = f(x)$, like $x^2$ or $\cos x$ (mirror image in the up–down axis). Odd: $f(-x) = -f(x)$, like $x^3$ or $\sin x$.

Example: $(-2)^2 = 4 = 2^2$ (even); $(-2)^3 = -8 = -(2^3)$ (odd).

### Intuition
You want to predict where a train will be one minute from now. First guess: "where it is now". Better: "where it is now + speed × time".

Even better: also add the effect of acceleration. Each extra term uses one more derivative and makes the guess more accurate.

> **Intuition:** Taylor series = "value now + slope × step + bending × step² / 2 + ...". It copies a curve using its value, slope, bending, and so on, at one point.

### Words you need
- **Polynomial**: a sum of powers of $x$. Example: $3 + 2x + x^2$.
- **$n!$ (n factorial)**: $1 \times 2 \times \dots \times n$. Example: $4! = 24$, and $0! = 1$.
- **Expand around $a$**: build the copy near the point $x = a$.
- **Maclaurin series**: a Taylor series around $a = 0$.
- **Coefficient**: the number in front of a power. Example: in $5x^3$, the coefficient is 5.
- **Taylor polynomial of order 2**: keep only the terms up to $(x - a)^2$.

### Formulas, explained

**Taylor series around $a$**

$$f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + \cdots$$

- **Read it as:** the value at $a$, plus slope times distance, plus half the bending times distance squared, and so on.
- **Symbols:** $x - a$ is how far you move from $a$; $f^{(n)}(a)$ is the $n$-th derivative at $a$.
- **Why it makes sense:** the polynomial is chosen so that its value, slope, bending, ... at $a$ all match $f$.
- **Use it when:** approximating a function near a point.

**Key Maclaurin series**

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$

$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$$

$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$$

$$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots\quad (\lvert x\rvert < 1)$$

- **Read it as:** standard copies of these functions near 0.
- **Symbols:** $x$ is the distance from 0; $\lvert x\rvert < 1$ means $x$ is between $-1$ and $1$.
- **Why it makes sense:** $\sin x$ is an odd function (symmetric through the origin), so it has only odd powers. $\cos x$ is even, so only even powers.
- **Use it when:** limits near 0 or higher derivatives at 0.

**Coefficient and derivative link**

$$\text{coefficient of } x^n = \frac{f^{(n)}(0)}{n!}$$

$$f^{(n)}(0) = n! \times \text{coefficient of } x^n$$

- **Read it as:** you can read a high derivative straight from the series.
- **Symbols:** $f^{(n)}(0)$ is the $n$-th derivative at 0.
- **Why it makes sense:** it is the Taylor formula with $a = 0$, read backwards.
- **Use it when:** asked for something like $f^{(10)}(0)$.

### Where the formulas come from

**A. Building the Taylor formula step by step**

We want a polynomial $p(x) = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \cdots$ that copies $f$ near $0$. We choose each number $c_n$ so that one more derivative matches.

1. Match the value: put $x = 0$ in $p$. Every term with $x$ vanishes, so $p(0) = c_0$. We want $p(0) = f(0)$, so $c_0 = f(0)$.
2. Match the slope: $p'(x) = c_1 + 2c_2 x + 3c_3x^2 + \cdots$ (power rule). At $x = 0$: $p'(0) = c_1$. So $c_1 = f'(0)$.
3. Match the bending: $p''(x) = 2c_2 + 3\cdot2\,c_3 x + \cdots$. At $x = 0$: $p''(0) = 2c_2$. So $c_2 = \frac{f''(0)}{2}$.
4. Third derivative: $p'''(x) = 3\cdot2\cdot1\,c_3 + \cdots$, so $p'''(0) = 3!\,c_3$. Hence $c_3 = \frac{f'''(0)}{3!}$.
5. Pattern: differentiating $x^n$ exactly $n$ times leaves $n!$, and every other term is either already gone or still has an $x$ (so it is 0 at $x = 0$). So $c_n = \frac{f^{(n)}(0)}{n!}$.
6. Around any point $a$ instead of 0, use the distance $(x - a)$ in place of $x$. This gives the Taylor formula above.

The "coefficient and derivative link" is just step 5 written backwards: $f^{(n)}(0) = n! \, c_n$.

Why do more terms make a better copy? With tiny $x$, say $x = 0.1$, the powers shrink fast: $0.1$, $0.01$, $0.001$, and they are also divided by growing factorials. So later terms add almost nothing. (When the copy becomes exact for every $x$ needs a longer proof that is not needed for GATE.)

**B. The series of $e^x$**

1. Every derivative of $e^x$ is $e^x$ (see topic: Differentiability & Derivatives).
2. At $x = 0$, each one is $e^0 = 1$. So $f^{(n)}(0) = 1$ for every $n$.
3. By step 5, $c_n = \frac{1}{n!}$. So $e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$.
4. Check at $x = 1$: $1 + 1 + 0.5 + 0.1667 + 0.0417 + 0.0083 \approx 2.7167$, close to $e \approx 2.7183$.

**C. The series of $\sin x$ and $\cos x$**

1. Derivatives of $\sin x$ cycle: $\sin x \to \cos x \to -\sin x \to -\cos x \to \sin x$.
2. At $x = 0$ they give $0, 1, 0, -1, 0, 1, \ldots$ (because $\sin 0 = 0$, $\cos 0 = 1$).
3. So the even powers get coefficient 0, and the odd powers get $\frac{1}{1!}, \frac{-1}{3!}, \frac{1}{5!}, \ldots$. Hence $\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$.
4. For $\cos x$, the same cycle starts one place later: values $1, 0, -1, 0, 1, \ldots$. So only even powers: $\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$.
5. Link to limits: keep only the first terms and you get the small-$x$ copies $\sin x \approx x$ and $\cos x \approx 1 - \frac{x^2}{2}$.

**D. The series of $\ln(1 + x)$**

1. $f(x) = \ln(1+x)$, so $f(0) = \ln 1 = 0$.
2. $f'(x) = \frac{1}{1+x}$ (chain rule), so $f'(0) = 1$.
3. $f''(x) = -\frac{1}{(1+x)^2}$, so $f''(0) = -1$, giving $c_2 = \frac{-1}{2!} = -\frac12$.
4. $f'''(x) = \frac{2}{(1+x)^3}$, so $f'''(0) = 2$, giving $c_3 = \frac{2}{3!} = \frac13$.
5. Pattern: $\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$.
6. Why only $\lvert x\rvert < 1$? The terms are $\frac{x^n}{n}$. If $\lvert x\rvert > 1$, the powers $x^n$ grow faster than $n$, so the terms get bigger and the sum never settles. Try $x = 2$: $2 - 2 + 2.67 - 4 + 6.4 - \cdots$ swings wildly.

### Examples

**Example 1 (easy):** Estimate $e^{0.1}$ using three terms.

1. Use $e^x \approx 1 + x + \frac{x^2}{2}$ with $x = 0.1$.
2. $1 + 0.1 + \frac{0.01}{2} = 1 + 0.1 + 0.005 = 1.105$.
3. The true value is $1.10517$. Very close.

**Result:** $e^{0.1} \approx 1.105$.

**Example 2 (medium):** Second-order Taylor polynomial of $\ln x$ at $a = 1$, then estimate $\ln 1.1$.

1. $f(1) = \ln 1 = 0$.
2. $f'(x) = \frac1x$, so $f'(1) = 1$.
3. $f''(x) = -\frac{1}{x^2}$, so $f''(1) = -1$.
4. Taylor: $\ln x \approx 0 + 1\cdot(x-1) + \frac{-1}{2}(x-1)^2$.
5. At $x = 1.1$: $0.1 - \frac{0.01}{2} = 0.1 - 0.005 = 0.095$.

**Result:** $\ln 1.1 \approx 0.095$. The true value is $0.0953$.

**Example 3 (GATE level):** Let $f(x) = x^2 e^x$. Find $f^{(5)}(0)$.

1. Write $x^2 e^x = x^2\left(1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots\right)$.
2. The $x^5$ term comes from $x^2 \cdot \frac{x^3}{3!} = \frac{x^5}{6}$. Coefficient $= \frac16$.
3. Use $f^{(5)}(0) = 5! \times \frac16 = \frac{120}{6} = 20$.

**Result:** 20.

### Common mistakes
> **Common mistake:** Confusing the coefficient with the derivative. $f^{(n)}(0) = n! \times$ coefficient, not the coefficient itself (a trap in 2025 Q.14 options).

> **Common mistake:** Forgetting the factorials in the denominators.

> **Common mistake:** Using the $\ln(1+x)$ series when $\lvert x\rvert \ge 1$. It does not work there.

### How GATE asks it
Not asked in 2024–2026 as its own topic, but still in the syllabus. It helps indirectly: **2025 Q.14** is fast if you know $\sinh x$ has only odd powers, and **2024 Q.60** uses $\cos x \approx 1 - \frac{x^2}{2}$.

A likely question: "find the coefficient of $x^3$ in $e^x \sin x$" (answer $\frac13$), or "find $f^{(5)}(0)$" as in Example 3.

### Summary
- First we wanted a simple polynomial copy of a hard function near one point.
- Then we chose each coefficient so that the value, slope, bending, and so on all match. Differentiating $x^n$ $n$ times gives $n!$, so the coefficient is $\frac{f^{(n)}(a)}{n!}$.
- Using this recipe on $e^x$, $\sin x$, $\cos x$ and $\ln(1+x)$ gives the standard series. Odd functions keep only odd powers; even functions only even powers.
- Reading the recipe backwards gives a quick way to find high derivatives: $f^{(n)}(0) = n! \times$ coefficient.
- The first one or two terms are the small-$x$ shortcuts used for limits.
- Next topic builds on this: in Maxima & Minima, the second-order copy $f(a) + \frac{f''(a)}{2}(x - a)^2$ at a flat point explains the second derivative test. In ML, Newton's method and many optimizer ideas use this same copy.

### Quick self-check
1. Write the first three non-zero terms of $\cos x$.

**Answer:** $1 - \frac{x^2}{2} + \frac{x^4}{24}$.

2. In the series of $\sin x$, what is the coefficient of $x^4$?

**Answer:** 0 (only odd powers appear).

3. If the coefficient of $x^3$ in $f$ is 2, what is $f'''(0)$?

**Answer:** $3! \times 2 = 12$.

## Maxima, Minima & Optimization

### The big idea
**Optimization** means finding the input that makes a function as large as possible (**maximum**) or as small as possible (**minimum**).

At the top of a smooth hill or the bottom of a smooth valley, the slope is zero. So we find points where $f'(x) = 0$, and then check what kind of point each one is.

### Before you start

**1. Derivative = slope (see topic: Differentiability & Derivatives).** $f'(x) > 0$ means the graph goes up as you move right. $f'(x) < 0$ means it goes down. $f'(x) = 0$ means it is flat at that point.

Example: $f(x) = x^2$ has $f'(x) = 2x$. At $x = -1$ slope $-2$ (going down), at $x = 1$ slope $2$ (going up), at $x = 0$ slope 0 (flat).

**2. Second derivative = bending.** $f''$ is the slope of the slope. If $f'' > 0$, the slope keeps increasing, so the curve bends up like a cup. If $f'' < 0$, it bends down like a cap.

Example: $x^2$ has $f'' = 2 > 0$, a cup. $-x^2$ has $f'' = -2 < 0$, a cap.

**3. Solving $f'(x) = 0$ by factoring.** If a product is 0, one of its factors is 0.

Example: $3(x - 1)(x - 3) = 0$ means $x = 1$ or $x = 3$.

**4. Intervals and brackets.** $[0, 5]$ means all $x$ with $0 \le x \le 5$ (ends included). $(0, 5]$ means $0 < x \le 5$: the round bracket leaves 0 out.

**5. Taylor's second-order copy (see topic: Taylor Series).** Near a point $c$:

$$f(x) \approx f(c) + f'(c)(x - c) + \frac{f''(c)}{2}(x - c)^2$$

**6. A square is never negative.** $(x - c)^2 \ge 0$ for every $x$, and it is 0 only at $x = c$. Example: $(-3)^2 = 9$, $0^2 = 0$.

### Intuition
Imagine you are walking on a hilly road with your eyes closed. You can only feel the slope under your feet.

- When the road goes **up**, the slope is positive.
- When it goes **down**, the slope is negative.
- At the **top of a hill** or the **bottom of a valley**, the road is flat for a moment. Slope = 0.

So flat points are the candidates. But a flat point can be a top, a bottom, or just a flat step (like $x^3$ at 0). How do we tell? Feel how the road **bends**:

- Bending up like a cup (smile) → you are at a **bottom** (minimum).
- Bending down like a cap (frown) → you are at a **top** (maximum).

> **Intuition:** $f' = 0$ says "flat here". $f'' > 0$ says "shaped like a cup", so the flat point is a bottom. $f'' < 0$ says "shaped like a cap", so it is a top.

Now, **local** versus **global**. A small hill in your village is the highest point **nearby** (local maximum). Mount Everest is the highest point **on Earth** (global maximum). A local maximum need not be global.

> **Intuition:** On a road that starts at gate A and ends at gate B, the highest point may be **at a gate**, not on any hilltop. Always check the end points.

**Gradient descent** is how machines find a minimum. Imagine standing on a foggy hill. You cannot see the valley. So you feel the slope and take a small step downhill. Repeat. Slowly you reach the bottom. Machine learning uses this to minimise the loss.

### Words you need
- **Critical point (stationary point)**: a point where $f'(x) = 0$ (or $f'$ does not exist). Example: $f(x) = x^2$ has a critical point at 0.
- **Local minimum**: lower than all nearby points. Example: $x = 1$ for $x^3 - 3x$.
- **Global minimum**: lowest point over the whole domain. Example: $x = 0$ for $x^2$.
- **Domain**: the set of allowed inputs. Example: $[0, 5]$ means $0 \le x \le 5$.
- **Closed interval $[a, b]$**: includes both end points. **Open end $(a$**: the round bracket means $a$ itself is **not** included.
- **Convex function**: shaped like a cup everywhere ($f'' > 0$). Example: $x^2$, $e^x$.
- **Learning rate $\eta$**: the step size in gradient descent. Example: $\eta = 0.1$. ($\eta$ is the Greek letter "eta".)
- **Loss / objective function**: the quantity being minimised.
- **Gradient**: the slope of the loss with respect to the parameter. With one variable it is just $f'(w)$.

### Formulas, explained

**Finding candidates**

$$f'(x) = 0$$

- **Read it as:** find where the slope is zero.
- **Symbols:** $f'(x)$ is the slope at $x$.
- **Why it makes sense:** at a smooth top or bottom, the tangent is flat.
- **Use it when:** always, as the first step.

**Second derivative test**

$$f'(c) = 0 \text{ and } f''(c) > 0 \;\Rightarrow\; \text{local min}$$

$$f'(c) = 0 \text{ and } f''(c) < 0 \;\Rightarrow\; \text{local max}$$

- **Read it as:** flat and cup-shaped is a bottom; flat and cap-shaped is a top.
- **Symbols:** $c$ is a critical point; $f''(c)$ is the bending there.
- **Why it makes sense:** $f'' > 0$ means the slope is increasing. So the slope goes from negative (going down) to positive (going up). That is a valley.
- **Use it when:** classifying critical points. If $f''(c) = 0$, the test says nothing (check $x^3$ and $x^4$ at 0: one is neither, one is a minimum).

**Global extremes on a closed interval $[a, b]$**

$$\max_{[a,b]} f \text{ and } \min_{[a,b]} f \text{ are among } f(a),\ f(b),\ f(\text{critical points inside})$$

- **Read it as:** compute $f$ at both end points and at every critical point, then pick the largest and the smallest.
- **Symbols:** $a, b$ are the end points; $\max_{[a,b]} f$ is the largest value of $f$ on the interval.
- **Why it makes sense:** the top is either on a hilltop or at a gate.
- **Use it when:** the question gives an interval. If an end is open, that end value is **not** reached.

**Strict convexity fact**

$$f''(x) > 0 \text{ for all } x \;\Rightarrow\; \text{at most one critical point, and it is the global min}$$

- **Read it as:** a function that is a cup everywhere has at most one bottom.
- **Symbols:** "for all $x$" means at every input.
- **Why it makes sense:** $f'' > 0$ means $f'$ always increases. An increasing function can cross 0 only once. But it may never cross 0: $e^x$ has $f'' > 0$ and no minimum.
- **Use it when:** MSQs asking "which is always true" about $f'' > 0$.

**Gradient descent update**

$$w_{\text{new}} = w_{\text{old}} - \eta\, f'(w_{\text{old}})$$

- **Read it as:** new weight = old weight minus (step size times slope).
- **Symbols:** $w$ is the parameter being learned; $\eta$ is the learning rate; $f'(w)$ is the slope of the loss at $w$.
- **Why it makes sense:** if the slope is positive, going right goes uphill, so we move left (subtract). If negative, we move right.
- **Use it when:** a question asks for $w$ after one step.

**Vertex of a parabola**

$$ax^2 + bx + c \text{ turns at } x = -\frac{b}{2a}$$

- **Read it as:** the top or bottom of a parabola is at $-\frac{b}{2a}$.
- **Symbols:** $a, b, c$ are fixed numbers, $a \ne 0$.
- **Why it makes sense:** it is the point where the slope $2ax + b$ is zero.
- **Use it when:** finding the min of $f'$ when $f'$ is a quadratic (2025 Q.49).

### Where the formulas come from

**A. Why the slope is zero at a smooth top or bottom**

Take the fence area $A(x) = 20x - x^2$ from Example 1, with slope $A'(x) = 20 - 2x$.

1. At $x = 9$: slope $= 2 > 0$. Moving right raises the area, so 9 is not the top.
2. At $x = 11$: slope $= -2 < 0$. Moving left raises the area, so 11 is not the top.
3. At any point with a non-zero slope, a tiny step in one direction goes higher. So that point cannot be a top. Because $f(x + h) \approx f(x) + f'(x)\,h$, and we can choose the sign of $h$ to make $f'(x)\,h > 0$.
4. The only place left for a smooth top is where the slope is 0: $20 - 2x = 0$, so $x = 10$.
5. General rule: at a smooth local max or min, $f'(c) = 0$. The same reason works for a bottom.

Note: this does not say every flat point is a top or bottom. $x^3$ is flat at 0 but keeps rising on both sides.

**B. Where the second derivative test comes from**

Use the second-order Taylor copy at a flat point $c$ (so $f'(c) = 0$).

1. Taylor: $f(x) \approx f(c) + f'(c)(x - c) + \frac{f''(c)}{2}(x - c)^2$.
2. Since $f'(c) = 0$, the middle term vanishes: $f(x) - f(c) \approx \frac{f''(c)}{2}(x - c)^2$.
3. $(x - c)^2$ is positive for every $x \ne c$, because a square is never negative.
4. If $f''(c) > 0$: the right side is positive, so $f(x) > f(c)$ for nearby $x$. Every neighbour is higher, so $c$ is a **local min**.
5. If $f''(c) < 0$: the right side is negative, so every neighbour is lower. $c$ is a **local max**.
6. If $f''(c) = 0$: the copy says nothing; higher terms decide. $x^3$ (neither) and $x^4$ (minimum) both have $f''(0) = 0$.

Number check with $f(x) = x^2 - 4x + 7$ at $c = 2$: $f'(2) = 0$, $f''(2) = 2$. Prediction: $f(2.1) - f(2) \approx \frac{2}{2}(0.1)^2 = 0.01$. Real: $f(2.1) = 3.01$, $f(2) = 3$, difference $0.01$.

Why only **local**? The Taylor copy is good only near $c$. Far away the function can go lower, like $x^3 - 3x$.

**C. Why global extremes are at critical points or end points**

1. A continuous function on a closed interval $[a, b]$ always reaches a highest and a lowest value. (This is the Extreme Value Theorem; its proof is not needed for GATE. Picture: a road between two gates with no breaks must have a highest spot.)
2. Where can the highest spot be? Either at a gate ($a$ or $b$), or somewhere inside.
3. If it is inside and the function is smooth there, part A says the slope is 0 there. So it is a critical point.
4. So the list "end points + critical points" surely contains the answer. Compute $f$ at each and compare.
5. If an end is open, like $(-1, 3]$, the function may come close to a value at $-1$ without reaching it. Then that value does not count.

**D. Why $f'' > 0$ everywhere gives at most one critical point**

1. $f'' > 0$ means the slope $f'$ is always increasing (because $f''$ is the slope of $f'$).
2. A number that always increases can be equal to 0 at most once. Example: $f' = 2x$ is 0 only at $x = 0$.
3. So there is at most one point with $f' = 0$.
4. If such a point $c$ exists, left of $c$ the slope is negative (going down) and right of $c$ it is positive (going up). So $c$ is the lowest point of the whole graph: the global min.
5. It may not exist: $f(x) = e^x$ has $f' = e^x > 0$ always, never 0. It keeps decreasing to the left but never reaches a lowest value.

**E. Where the gradient descent update comes from**

1. We stand at $w$ and want a nearby $w_{\text{new}}$ with a smaller loss.
2. First-order Taylor: $f(w + h) \approx f(w) + f'(w)\,h$.
3. Choose the step $h = -\eta\, f'(w)$ with a small $\eta > 0$.
4. Then $f(w + h) \approx f(w) - \eta\,\big(f'(w)\big)^2$.
5. $\big(f'(w)\big)^2 \ge 0$, so the loss goes down (or stays the same at a flat point). That is why we **subtract** the slope.
6. Why must $\eta$ be small? The copy in step 2 is good only for small steps. A huge $\eta$ can jump over the valley.

Number check: $L(w) = (w - 2)^2$ at $w = 5$, $\eta = 0.1$. $L(5) = 9$. New $w = 4.4$, $L(4.4) = 5.76$. Prediction from step 4: $9 - 0.1 \times 36 = 5.4$. Close, and the loss did go down.

**F. Vertex of a parabola**

1. The slope of $ax^2 + bx + c$ is $2ax + b$ (power rule).
2. At the turning point the slope is 0: $2ax + b = 0$.
3. Solve: $x = -\frac{b}{2a}$.
4. Example: $x^2 + 7x + 10$ turns at $x = -\frac{7}{2}$.

### Examples

**Example 1 (easy):** A farmer has 40 m of fence for a rectangle. What length $x$ gives the largest area?

1. Width $= 20 - x$, because $2x + 2 \cdot \text{width} = 40$.
2. Area $A(x) = x(20 - x) = 20x - x^2$.
3. $A'(x) = 20 - 2x = 0$, so $x = 10$.
4. $A''(x) = -2 < 0$, so it is a maximum.
5. Area $= 10 \times 10 = 100$ square metres.

**Result:** $x = 10$ m, area $100$ m².

**Example 2 (medium):** Classify the critical points of $f(x) = x^3 - 3x$.

1. $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$. Critical points: $x = 1, -1$.
2. $f''(x) = 6x$.
3. $f''(1) = 6 > 0$: local min. $f''(-1) = -6 < 0$: local max.
4. Neither is global: as $x \to \infty$, $f \to \infty$; as $x \to -\infty$, $f \to -\infty$.

**Result:** local min at 1, local max at $-1$, no global extremes.

**Example 3 (GATE level):** Find the global max and min of $f(x) = x^3 - 6x^2 + 9x + 1$ on $[0, 5]$.

1. $f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3)$. Critical points 1 and 3 (both inside).
2. $f(0) = 0 - 0 + 0 + 1 = 1$.
3. $f(1) = 1 - 6 + 9 + 1 = 5$.
4. $f(3) = 27 - 54 + 27 + 1 = 1$.
5. $f(5) = 125 - 150 + 45 + 1 = 21$.
6. Largest is 21 at the end point $x = 5$ (not at the local max $x = 1$). Smallest is 1, reached at both $x = 0$ and $x = 3$.

**Result:** global max 21 at $x = 5$; global min 1 at $x = 0$ and $x = 3$.

**Example 4 (GATE level):** Loss $L(w) = (w - 2)^2$, start $w = 5$, $\eta = 0.1$. Find $w$ after one step.

1. $L'(w) = 2(w - 2)$ by the chain rule. At $w = 5$: $2 \times 3 = 6$.
2. $w_{\text{new}} = 5 - 0.1 \times 6 = 5 - 0.6 = 4.4$.
3. Sanity check: the minimum is at $w = 2$, and 4.4 moved towards 2. Good.

**Result:** $w = 4.4$.

```python
w, eta = 5.0, 0.1
for step in range(3):
    w = w - eta * 2 * (w - 2)   # slope of (w-2)^2 is 2(w-2)
    print(round(w, 4))          # 4.4, 3.92, 3.536 -> moving to 2
```

### Common mistakes
> **Common mistake:** Forgetting the end points. In 2025 Q.49, both the max and the min were at end points, not at the critical points.

> **Common mistake:** Saying "$f'' > 0$ gives a **global** minimum". It only gives a **local** minimum (2024 Q.15).

> **Common mistake:** Counting an open end point as reached. On $(-1, 3]$, the value at $-1$ is never attained (2026 Q.27).

> **Common mistake:** Adding instead of subtracting in gradient descent. We move **against** the slope.

> **Common mistake:** Saying "at 0 only" when the same max value is reached at two points. Check for ties.

### How GATE asks it
- **2024 Q.15** (MCQ, 1 mark): $f' = 0$ and $f'' > 0$ guarantees only a **local** minimum.
- **2024 Q.50** (MSQ, 2 marks): quartic with $f' = x(x - 3)(x + 1)$; classify $-1, 0, 3$ using $f''$.
- **2025 Q.49** (MSQ, 2 marks): cubic on $[-8, 0]$. End points beat the local extremes. Also: the minimum of $f'$ is at its vertex.
- **2025 Q.51** (MSQ, 2 marks): $f'' > 0$ everywhere: at most one critical point and at most one min, but a min may not exist.
- **2026 Q.27** (MSQ, 1 mark): cubic on the half-open interval $(-1, 3]$. Ties and an excluded end point.
- **2026 Q.29** (NAT, 1 mark): one SGD step for $f = wx$. The gradient is $x$, so $w = 10 - 0.1 \times 10 = 9$.

> **GATE tip:** Make a small table of $x$ and $f(x)$ for all critical points and end points. Most MSQ options can then be checked in seconds.

### Summary
- First we saw that at a smooth top or bottom the slope must be 0, because otherwise a tiny step would go higher or lower. So we solve $f'(x) = 0$ to get candidates.
- Then we used the Taylor copy at a flat point: $f(x) - f(c) \approx \frac{f''(c)}{2}(x - c)^2$. The sign of $f''(c)$ decides cup (min) or cap (max).
- This test only looks nearby, so it gives **local** answers. For the **global** answer on an interval, we compare end points and critical points.
- If $f'' > 0$ everywhere, the slope only increases, so there is at most one bottom, and it may not exist.
- Gradient descent comes from the first-order Taylor copy: stepping against the slope always lowers the loss for a small step.
- Where this is used later: every ML model (linear regression, logistic regression, neural networks) is trained by gradient descent on a loss function.

### Quick self-check
1. $f'(2) = 0$ and $f''(2) = -4$. What is at $x = 2$?

**Answer:** A local maximum.

2. Global min of $f(x) = x^2$ on $[1, 3]$?

**Answer:** $f' = 2x = 0$ gives $x = 0$, outside the interval. End points: $f(1) = 1$, $f(3) = 9$. Min is 1 at $x = 1$.

3. $w = 4$, slope $= -2$, $\eta = 0.5$. New $w$?

**Answer:** $4 - 0.5 \times (-2) = 4 + 1 = 5$.

## Series & Integration (beyond syllabus)

> **Remember:** This topic is **outside the official GATE DA calculus syllabus**. The syllabus lists only limits, continuity, differentiability, Taylor series, maxima/minima and single-variable optimization. But one question (2026 Q.35, 1 mark) asked for the sum of an infinite series. Also, integration is used all the time in Probability (areas under density curves). So learn the basics here, but do not spend too long on it.

### The big idea
An **infinite series** is a sum that never stops, like $1 + \frac12 + \frac14 + \cdots$. Sometimes this endless sum still has a fixed, finite total.

**Integration** is the reverse of differentiation. It adds up tiny pieces to find a total, such as the area under a curve.

### Before you start

**1. The sum symbol $\sum$.** $\sum_{k=1}^{4} k$ means "put $k = 1, 2, 3, 4$ and add": $1 + 2 + 3 + 4 = 10$. The number under $\sum$ is where you start; the number on top is where you stop. $\infty$ on top means "never stop".

**2. Negative powers.** $2^{-k} = \frac{1}{2^k} = \left(\frac12\right)^k$. Example: $2^{-3} = \frac18$, and $3^{-2} = \frac19$.

**3. Limits (see topic: Limits & Continuity).** An endless sum has a total only if the running totals head towards one number. Example: if $r = \frac12$, then $r^n \to 0$ as $n$ grows ($\frac12, \frac14, \frac18, \ldots$).

**4. Derivatives (see topic: Differentiability & Derivatives).** We need $(x^n)' = nx^{n-1}$, $(e^{ax})' = ae^{ax}$ (chain rule), and $(\ln x)' = \frac1x$.

**5. Area of a rectangle.** Width × height. Example: width 0.1, height 3, area 0.3. Integration adds up many thin rectangles.

**6. Expanding brackets.** $(a_1 + a_2)(b_1 + b_2) = a_1b_1 + a_1b_2 + a_2b_1 + a_2b_2$. Every term of the first bracket meets every term of the second.

### Intuition
Take a 1-metre chocolate bar. Eat half. Then eat half of what is left. Then half again.

You eat $\frac12 + \frac14 + \frac18 + \cdots$ metres. You can never eat more than the whole bar, and you get as close to it as you like. So the total is exactly 1.

> **Intuition:** A **geometric series** keeps multiplying by the same fraction $r$. If $r$ is smaller than 1 in size, the pieces shrink fast enough that the total stays finite.

For integration, think of a water tap. The flow rate changes each second. To find the total water in the bucket, add up (rate × tiny time) for every tiny moment.

That total is the **integral**. On a graph, it is the area under the rate curve.

> **Intuition:** Derivative: "from total, find the rate". Integral: "from rate, find the total". They undo each other.

### Words you need
- **Series**: a sum of terms. $\sum$ (capital sigma) means "add up". Example: $\sum_{k=1}^{3} k = 1 + 2 + 3 = 6$.
- **Geometric series**: each term is the previous one times a fixed ratio $r$. Example: $1 + \frac13 + \frac19 + \cdots$ has $r = \frac13$.
- **Converges**: the endless sum approaches a finite number.
- **Starting index**: where the counting starts, like $k = 0$ or $k = 1$. It changes the answer.
- **Double sum $\sum_i\sum_j$**: add over every pair $(i, j)$. Like adding every cell of a table.
- **Integral $\int_a^b f(x)\,dx$**: the area under $f$ from $x = a$ to $x = b$ (area below the axis counts as negative). The $dx$ means "a tiny width in the $x$ direction".
- **Antiderivative $F$**: a function whose derivative is $f$. Example: $F(x) = x^2$ is an antiderivative of $f(x) = 2x$.
- **$[F(x)]_a^b$**: shorthand for $F(b) - F(a)$.

### Formulas, explained

**Infinite geometric series**

$$\sum_{k=0}^{\infty} r^k = 1 + r + r^2 + \cdots = \frac{1}{1-r}\qquad (\lvert r\rvert < 1)$$

$$\sum_{k=1}^{\infty} r^k = r + r^2 + \cdots = \frac{r}{1-r}\qquad (\lvert r\rvert < 1)$$

- **Read it as:** starting from 1, the total is one over (one minus $r$). Starting from $r$, the total is $r$ over (one minus $r$).
- **Symbols:** $r$ is the common ratio; $k$ counts the terms.
- **Why it makes sense:** each term is a fixed fraction of the one before, so the pieces shrink quickly and the total settles.
- **Use it when:** you see a sum of powers like $2^{-k}$ or $\left(\frac13\right)^k$.

**Splitting a double sum of a product**

$$\sum_i\sum_j a_i\, b_j = \Big(\sum_i a_i\Big)\Big(\sum_j b_j\Big)$$

- **Read it as:** if each term is (something with only $i$) times (something with only $j$), the double sum is the product of two single sums.
- **Symbols:** $a_i$ depends only on $i$; $b_j$ depends only on $j$.
- **Why it makes sense:** $(a_1 + a_2)(b_1 + b_2) = a_1b_1 + a_1b_2 + a_2b_1 + a_2b_2$. Expanding a product gives every pair once.
- **Use it when:** a double sum has a term like $2^{-i}3^{-j}$.

**Fundamental theorem of calculus**

$$\int_a^b f(x)\,dx = F(b) - F(a),\quad\text{where } F' = f$$

- **Read it as:** the area from $a$ to $b$ equals the antiderivative at $b$ minus the antiderivative at $a$.
- **Symbols:** $F$ is any antiderivative of $f$.
- **Why it makes sense:** in the tap story, the total water collected = (meter reading at end) − (meter reading at start).
- **Use it when:** computing any definite integral.

**Basic integrals**

$$\int x^n\,dx = \frac{x^{n+1}}{n+1}\quad (n \ne -1)$$

$$\int e^{ax}\,dx = \frac{e^{ax}}{a},\qquad \int \frac1x\,dx = \ln\lvert x\rvert$$

- **Read it as:** "raise the power by one and divide by the new power"; and so on.
- **Symbols:** $n$ and $a$ are fixed numbers ($a \ne 0$).
- **Why it makes sense:** differentiate the right side and you get back the left side.
- **Use it when:** probability density questions, areas.

### Where the formulas come from

**A. The geometric series total $\frac{1}{1-r}$**

First with numbers, $r = \frac12$.

1. Call the total $S = 1 + \frac12 + \frac14 + \frac18 + \cdots$.
2. Multiply every term by $\frac12$: $\frac12 S = \frac12 + \frac14 + \frac18 + \cdots$. Allowed because multiplying a sum multiplies each term.
3. Subtract line 2 from line 1. Everything after the first 1 cancels, because the same terms appear in both lines: $S - \frac12 S = 1$.
4. So $\frac12 S = 1$, and $S = 2$.

Now with a general $r$:

5. $S = 1 + r + r^2 + \cdots$ and $rS = r + r^2 + r^3 + \cdots$.
6. Subtract: $S - rS = 1$, so $S(1 - r) = 1$, giving $S = \frac{1}{1-r}$.
7. Why $\lvert r\rvert < 1$? With a finite number of terms, the same trick gives $1 + r + \cdots + r^{n-1} = \frac{1 - r^n}{1 - r}$. When $\lvert r\rvert < 1$, $r^n \to 0$, so the total heads to $\frac{1}{1 - r}$. When $\lvert r\rvert \ge 1$, $r^n$ does not shrink and there is no total. Try $r = 2$: $1 + 2 + 4 + 8 + \cdots$ just grows.
8. Starting from $k = 1$ is the same sum with every term multiplied by $r$: $r + r^2 + \cdots = r(1 + r + \cdots) = \frac{r}{1 - r}$.

**B. Splitting a double sum**

1. Small table: rows $a_1 = 1, a_2 = 2$; columns $b_1 = 10, b_2 = 20$. Cell $(i, j)$ holds $a_i b_j$.
2. The cells are $10, 20, 20, 40$. Their total is $90$.
3. Row sum × column sum: $(1 + 2) \times (10 + 20) = 3 \times 30 = 90$. Same.
4. Reason: expanding the brackets $(a_1 + a_2)(b_1 + b_2)$ produces every product $a_ib_j$ exactly once, and that is exactly the list of cells.
5. With endless rows and columns it works the same way, as long as both single sums converge (the terms here are all positive, so the order of adding does not matter).

**C. Fundamental theorem: area = $F(b) - F(a)$**

Start with a concrete case: area under $f(x) = 2x$ from 0 to 3.

1. This region is a triangle with base 3 and height $2 \times 3 = 6$, so the area is $\frac12 \times 3 \times 6 = 9$.
2. An antiderivative of $2x$ is $F(x) = x^2$, since $(x^2)' = 2x$. And $F(3) - F(0) = 9 - 0 = 9$. Same.

Why does it work in general?

3. Let $A(x)$ be the area under $f$ from $a$ up to $x$.
4. Move $x$ a tiny bit to $x + h$. The extra area is a thin strip of width $h$ and height about $f(x)$, so $A(x + h) - A(x) \approx f(x)\,h$.
5. Divide by $h$ and let $h \to 0$: $A'(x) = f(x)$. So the area function is an antiderivative of $f$.
6. Two antiderivatives can differ only by a constant (their difference has slope 0, so it is constant; see topic: Differentiability & Derivatives). So $A(x) = F(x) + C$.
7. $A(a) = 0$ (no width, no area), so $C = -F(a)$. Then the area up to $b$ is $A(b) = F(b) - F(a)$.

**D. The basic integrals**

Each one is a derivative rule read backwards.

1. $\left(\frac{x^{n+1}}{n+1}\right)' = \frac{(n+1)x^n}{n+1} = x^n$, by the power rule. We need $n \ne -1$, because otherwise we would divide by 0.
2. $\left(\frac{e^{ax}}{a}\right)' = \frac{a e^{ax}}{a} = e^{ax}$, by the chain rule.
3. $(\ln x)' = \frac1x$ for $x > 0$. This fills the gap $n = -1$ from step 1. (For $x < 0$, $\ln(-x)$ also has slope $\frac1x$, so we write $\ln\lvert x\rvert$.)

### Examples

**Example 1 (easy):** Find $1 + \frac14 + \frac1{16} + \cdots$.

1. Ratio $r = \frac14$, and the sum starts at 1 (index 0).
2. Sum $= \frac{1}{1 - 1/4} = \frac{1}{3/4} = \frac43$.

**Result:** $\frac43 \approx 1.333$.

**Example 2 (medium):** Find $\int_0^2 3x^2\,dx$.

1. Antiderivative: $3 \cdot \frac{x^3}{3} = x^3$.
2. $F(2) - F(0) = 8 - 0 = 8$.

**Result:** 8.

**Example 3 (GATE level):** Find $\displaystyle\sum_{i=1}^{\infty}\sum_{j=0}^{\infty}\frac{1}{4^i\,2^j}$.

1. Each term is ($i$-part) × ($j$-part), so split: $\left(\sum_{i=1}^\infty \left(\frac14\right)^i\right) \times \left(\sum_{j=0}^\infty \left(\frac12\right)^j\right)$.
2. First sum starts at 1: $\frac{1/4}{1 - 1/4} = \frac{1/4}{3/4} = \frac13$.
3. Second sum starts at 0: $\frac{1}{1 - 1/2} = \frac{1}{1/2} = 2$.
4. Product: $\frac13 \times 2 = \frac23$.

**Result:** $\frac23 \approx 0.667$.

**Example 4 (GATE level, probability style):** Find $c$ so that $\int_0^2 c\,x^2\,dx = 1$.

1. $\int_0^2 x^2\,dx = \frac{2^3}{3} - 0 = \frac83$.
2. So $c \cdot \frac83 = 1$.
3. Divide: $c = \frac38$.

**Result:** $c = 0.375$.

### Common mistakes
> **Common mistake:** Ignoring the starting index. $\sum_{k=0}^\infty \left(\frac12\right)^k = 2$, but $\sum_{k=1}^\infty \left(\frac12\right)^k = 1$.

> **Common mistake:** Using $\frac{1}{1-r}$ when $\lvert r\rvert \ge 1$. Then the sum does not converge (it grows without end).

> **Common mistake:** Writing $2^{-i}$ as ratio 2. The ratio is $\frac12$, because $2^{-i} = \left(\frac12\right)^i$.

### How GATE asks it
- **2026 Q.35** (NAT, 1 mark): $\sum_{i\ge0}\sum_{j\ge1} 2^{-i}3^{-j}$. Split into $2 \times \frac12 = 1$. The trap is the different starting indices.
- Integrals appear more often in **Probability & Statistics** (making a density's total area 1, finding expected values). Since this topic is outside the calculus syllabus, expect at most one easy question.

> **GATE tip:** For any series question, first write down $r$ and the starting index. Then use the matching formula.

### Summary
- First we saw that an endless sum can have a finite total when each piece is a fixed fraction $r$ of the one before, with $\lvert r\rvert < 1$.
- The "multiply by $r$ and subtract" trick gives the total $\frac{1}{1-r}$; starting one step later just multiplies it by $r$.
- A double sum of an ($i$-part) × ($j$-part) is a table, and the table total is (row sum) × (column sum), so it splits into two geometric series.
- Integration adds thin strips to get an area. Because the area grows at the rate $f(x)$, the area function is an antiderivative, which gives $\int_a^b f\,dx = F(b) - F(a)$.
- The basic integrals are just the derivative rules read backwards.
- Where this is used later: in Probability & Statistics, a density must have total area 1, and expected values are integrals; geometric series give the totals for the geometric distribution.

### Quick self-check
1. Find $\sum_{k=1}^\infty \left(\frac13\right)^k$.

**Answer:** $\frac{1/3}{1 - 1/3} = \frac{1/3}{2/3} = \frac12$.

2. Find $\int_0^1 2x\,dx$.

**Answer:** $[x^2]_0^1 = 1 - 0 = 1$.

3. Find $\sum_{i=0}^\infty\sum_{j=0}^\infty 2^{-i}2^{-j}$.

**Answer:** $2 \times 2 = 4$.
