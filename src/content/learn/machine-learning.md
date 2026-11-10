# Machine Learning

Think of a new cricket coach. On day one he knows nothing about the players. He watches many matches. Slowly he learns: "This batter scores well on spin pitches. That bowler gets wickets in the evening." Nobody gave him a rule book. He found the rules by looking at **data** (past matches). **Machine Learning (ML)** is the same idea, done by a computer. We give the computer examples, and it finds a rule that works on new examples too.

ML jobs come in three main types:
- **Regression**: predict a number. Example: predict a student's marks from hours of study.
- **Classification**: predict a label (a group name). Example: is this email "spam" or "not spam"?
- **Unsupervised learning**: no labels are given. The computer finds groups (**clustering**) or a simpler description of the data (**dimensionality reduction**).

**Why it matters.** ML is the heart of data science and AI. Spam filters, movie suggestions, face unlock and chatbots all use the ideas in this chapter.

**How GATE tests it.** From 2024 to 2026 there were **26 ML questions worth 40 marks**, about 13 marks in every paper. That is one of the biggest subjects in GATE DA. Most questions are small and concrete: compute one weight, one entropy, one gradient, count parameters, or merge points in a small distance table. A few are "which statement is true" questions about ideas. Neural networks (7 marks), SVM (5), hierarchical clustering (5) and ridge regression (4) carried the most marks.

**Before you start.** You need some probability (Bayes rule, mean, variance), some linear algebra (dot product, length of a vector, eigenvalues) and basic calculus (derivative, chain rule).

**Study order, and why.**
1. Linear Regression, then Ridge: the simplest models; every later idea builds on "loss" and "weights".
2. Bias-Variance & Model Evaluation, then Cross-Validation: how to judge any model.
3. Logistic Regression, Naive Bayes, k-NN, LDA, SVM, Decision Trees: the classifiers.
4. Neural Networks: stacks of simple units, uses the chain rule.
5. Unsupervised: k-means, Hierarchical Clustering, PCA.

In every section below, each algorithm is run **by hand on a tiny dataset (4 to 6 points)**, with every number shown. Do these by hand once with pen and paper. That is exactly the skill GATE checks.

**Free resources:**
- NPTEL: *Introduction to Machine Learning* (IIT Madras, Prof. Balaraman Ravindran).
- YouTube: *StatQuest with Josh Starmer* (short, very clear videos on almost every topic here).
- Book: *An Introduction to Statistical Learning* (James, Witten, Hastie, Tibshirani), free PDF.

## Linear Regression (Simple/Multiple)

### The big idea
Linear regression draws the **best straight line** through a set of points. Then we use the line to predict a number for a new input.

"Best" has an exact meaning: the line whose total squared mistake is the smallest.

### Before you start

**1. What a function is.** A function is a rule that takes an input and gives one output. Example: $f(x) = 2x + 1$ turns $x = 3$ into $f(3) = 7$.

A straight line is the function $y = w_0 + w_1 x$. Here $w_0$ is where the line crosses the $y$-axis and $w_1$ is the slope (how much $y$ rises when $x$ grows by 1).

**2. The sum symbol $\sum$.** The Greek letter $\sum$ (sigma) means "add up". $\sum_{i=1}^{n} x_i$ means $x_1 + x_2 + \dots + x_n$.

Example: if $x_1 = 1, x_2 = 2, x_3 = 4$, then $\sum_{i=1}^{3} x_i = 1 + 2 + 4 = 7$, and $\sum x_i^2 = 1 + 4 + 16 = 21$.

**3. The mean (average), $\bar x$.** Add all values and divide by how many there are: $\bar x = \frac{1}{n}\sum x_i$. Example: the mean of 1, 2, 3, 4 is $10/4 = 2.5$.

A useful fact: the gaps from the mean always add to zero, $\sum (x_i - \bar x) = 0$. For 1, 2, 3, 4: $-1.5 - 0.5 + 0.5 + 1.5 = 0$.

**4. The derivative (see topic: Calculus).** The derivative of a function tells you its slope at each point. At the very bottom of a valley-shaped curve the slope is **zero**, so to find the lowest point we set the derivative to 0.

Example: $f(w) = (w - 3)^2$ has derivative $f'(w) = 2(w - 3)$. Setting $2(w-3) = 0$ gives $w = 3$, and indeed $f(3) = 0$ is the smallest value.

**5. The chain rule.** For a "function inside a function", multiply the outer slope by the inner slope. Example: the derivative of $(5 - 2w)^2$ is $2(5 - 2w) \times (-2) = -4(5 - 2w)$.

**6. Matrices and transpose (see topic: Linear Algebra).** A matrix is a table of numbers. The transpose $X^\top$ swaps rows and columns. The inverse $A^{-1}$ "undoes" $A$, just as dividing undoes multiplying. For a $2 \times 2$ matrix:
$$\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

### Intuition
Four friends recorded hours of study ($x$) and marks out of 10 ($y$):

| Student | Hours $x$ | Marks $y$ |
|---|---|---|
| A | 1 | 2 |
| B | 2 | 3 |
| C | 3 | 5 |
| D | 4 | 6 |

Plot them. They almost lie on a line going up. We want one line $\hat y = w_0 + w_1 x$ that passes "through the middle" of them.

Here $\hat y$ (read "y-hat") means the **predicted** marks. The plain $y$ is the real marks.

For every student, the line makes a small mistake: the gap between the real marks and the line. We call it the **error** or **residual**. Some gaps are positive, some negative.

If we just add the gaps, positive and negative ones cancel. So we **square** each gap (squares are never negative) and add them. The best line is the one with the **smallest total of squared gaps**, called **least squares**.

> **Intuition:** Imagine each point is tied to the line with a rubber band that pulls vertically. Longer bands pull much harder (squared). The line settles where the total pull is smallest.

**Simple** regression has one input ($x$). **Multiple** regression has many inputs ($x_1, x_2, \dots$), for example hours of study and hours of sleep.

### Words you need
- **Feature (input), $x$**: what we know. Example: hours studied = 3.
- **Target (output), $y$**: what we want to predict. Example: marks = 5.
- **Weight, $w$**: a number the model learns; it multiplies a feature. Example: $w_1 = 1.4$ means each extra hour adds 1.4 marks.
- **Intercept (bias), $w_0$**: the prediction when all inputs are 0. Example: $w_0 = 0.5$.
- **Residual, $e_i = y_i - \hat y_i$**: real minus predicted. Example: real 5, predicted 4.7, residual 0.3.
- **SSE (sum of squared errors)**: $\sum e_i^2$, the total squared mistake. Example: residuals 0.1 and $-0.3$ give $0.01 + 0.09 = 0.1$.
- **Mean, $\bar x$** (read "x-bar"): the average. Example: mean of 1, 2, 3, 4 is 2.5.
- **Loss**: one number that says how bad the model is. Training means making the loss small.

### Formulas, explained

**Loss (sum of squared errors)**
$$L = \sum_{i=1}^{n} (y_i - \hat y_i)^2$$
- **Read it as:** add up, over all $n$ points, the square of (real value minus predicted value).
- **Symbols:** $n$ = number of points; $y_i$ = real value of point $i$; $\hat y_i$ = predicted value of point $i$; $\sum$ = "add up".
- **Why it makes sense:** squaring makes every mistake positive and punishes big mistakes more.
- **Use it when:** you must compute the error of a given line.

**Slope and intercept (simple regression)**
$$w_1 = \frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sum (x_i-\bar x)^2}$$
$$w_0 = \bar y - w_1 \bar x$$
- **Read it as:** slope = (how $x$ and $y$ move together) divided by (how much $x$ moves alone). Intercept = mean of $y$ minus slope times mean of $x$.
- **Symbols:** $\bar x, \bar y$ = means; $(x_i - \bar x)$ = how far point $i$ is from the average $x$.
- **Why it makes sense:** if $y$ goes up whenever $x$ goes up, the top is large and positive, so the slope is positive. The second formula means the line always passes through the "centre point" $(\bar x, \bar y)$.
- **Use it when:** fit $\hat y = w_0 + w_1 x$ to a small table.

**Line through the origin (no intercept)**
$$w^* = \frac{\sum x_i y_i}{\sum x_i^2}$$
- **Read it as:** best $w$ = (sum of $x$ times $y$) divided by (sum of $x$ squared).
- **Symbols:** $w^*$ = the best weight for the model $\hat y = wx$.
- **Why it makes sense:** it is the point where the slope of the loss curve is zero (derived below).
- **Use it when:** the model is $y = wx$ with **no** $w_0$. GATE 2025 asked exactly this.

**Normal equation (multiple regression)**
$$w^* = (X^\top X)^{-1} X^\top y$$
- **Read it as:** best weights = inverse of ($X$-transpose times $X$), times $X$-transpose times $y$.
- **Symbols:** $X$ = table of inputs, one row per point, with a first column of 1s for the intercept; $X^\top$ = transpose (rows become columns); $^{-1}$ = matrix inverse; $y$ = column of targets.
- **Why it makes sense:** it is the same "derivative = 0" idea, written for many weights at once.
- **Use it when:** there are 2 or more inputs, or the question gives matrices.

**$R^2$ (how good the fit is)**
$$R^2 = 1 - \frac{SSE}{SST}$$
$$SST = \sum (y_i - \bar y)^2$$
- **Read it as:** 1 minus (error of our line) divided by (error of just guessing the mean).
- **Symbols:** $SST$ = total spread of $y$ around its mean.
- **Why it makes sense:** $R^2 = 1$ means a perfect line; $R^2 = 0$ means the line is no better than guessing the average.
- **Use it when:** asked "what fraction of variation is explained".

### Where the formulas come from

**A. Why we square the gaps (the loss).** Take two points with residuals $+2$ and $-2$.

1. Plain sum: $2 + (-2) = 0$. This says "no error", which is false, because both points are missed by 2.
2. Absolute values: $2 + 2 = 4$. This works, but the absolute value has a sharp corner at 0, so we cannot easily take its derivative.
3. Squares: $4 + 4 = 8$. Always positive, smooth (easy derivative), and a gap of 4 costs 16, four times more than a gap of 2. So big mistakes are punished more.

So $L = \sum (y_i - \hat y_i)^2$ is chosen because it is positive, smooth, and dislikes big errors.

**B. The line through the origin, $w^* = \sum x_i y_i / \sum x_i^2$.** Start with real numbers: two points $(1, 2)$ and $(2, 3)$, model $\hat y = wx$.

1. Write the loss: $L(w) = (2 - 1w)^2 + (3 - 2w)^2$, because each term is (real minus predicted) squared.
2. Try some values: $L(1) = 1 + 1 = 2$; $L(1.5) = 0.25 + 0 = 0.25$; $L(1.6) = 0.16 + 0.04 = 0.2$; $L(2) = 0 + 1 = 1$. The loss goes down, then up again, like a valley.
3. The bottom of a valley has slope zero (see Before you start). Using the chain rule: $L'(w) = 2(2 - w)(-1) + 2(3 - 2w)(-2)$.
4. Set it to zero and divide by $-2$: $1(2 - w) + 2(3 - 2w) = 0$, so $2 + 6 = w(1 + 4)$, so $w = 8/5 = 1.6$. This matches the table in step 2.
5. Now do the same with symbols: $L(w) = \sum (y_i - w x_i)^2$, so $L'(w) = \sum 2(y_i - w x_i)(-x_i)$ by the chain rule.
6. Set $L'(w) = 0$ and divide by $-2$: $\sum x_i y_i - w \sum x_i^2 = 0$, because the sum of a difference is the difference of the sums.
7. Solve for $w$: $w^* = \sum x_i y_i / \sum x_i^2$. In the numbers: $\sum x_i y_i = 2 + 6 = 8$ and $\sum x_i^2 = 1 + 4 = 5$.

**C. The intercept, $w_0 = \bar y - w_1 \bar x$.** Now the model is $\hat y = w_0 + w_1 x$ and the loss is $L = \sum (y_i - w_0 - w_1 x_i)^2$.

1. We need the lowest point for **two** weights, so the slope in the $w_0$ direction must be zero, and also in the $w_1$ direction.
2. The derivative with respect to $w_0$ (treat $w_1$ as a fixed number): $\sum 2(y_i - w_0 - w_1 x_i)(-1) = 0$.
3. Divide by $-2$: $\sum (y_i - w_0 - w_1 x_i) = 0$. This says **the residuals add to zero**.
4. Split the sum: $\sum y_i - n w_0 - w_1 \sum x_i = 0$, because adding $w_0$ to itself $n$ times gives $n w_0$.
5. Divide by $n$: $\bar y - w_0 - w_1 \bar x = 0$, because $\sum y_i / n = \bar y$. So $w_0 = \bar y - w_1 \bar x$.
6. Rearranged, $\bar y = w_0 + w_1 \bar x$: the point $(\bar x, \bar y)$ is on the line. That is why the best line always passes through the centre of the data.

**D. The slope, $w_1 = \sum (x_i - \bar x)(y_i - \bar y) / \sum (x_i - \bar x)^2$.**

1. Put $w_0 = \bar y - w_1 \bar x$ into the prediction: $\hat y_i = \bar y + w_1(x_i - \bar x)$. So each residual is $(y_i - \bar y) - w_1(x_i - \bar x)$.
2. Write $a_i = x_i - \bar x$ and $b_i = y_i - \bar y$ (the gaps from the means). The loss becomes $\sum (b_i - w_1 a_i)^2$.
3. This is **exactly** the line-through-the-origin problem from part B, but with the gaps $a_i, b_i$ in place of $x_i, y_i$. Moving the origin to the centre $(\bar x, \bar y)$ removed the intercept.
4. So by part B: $w_1 = \sum a_i b_i / \sum a_i^2$, which is the slope formula.

So formula D is just formula B applied to data that has been shifted so its centre is at $(0, 0)$.

**E. The normal equation, $w^* = (X^\top X)^{-1} X^\top y$.** This is parts C and D for many weights at once.

1. Stack all predictions: $\hat y = Xw$. Each row of $X$ is $(1, x_i)$, so row $i$ gives $w_0 + w_1 x_i$.
2. The residual vector is $e = y - Xw$. Setting each derivative to zero gave two equations: $\sum e_i = 0$ (from $w_0$) and $\sum x_i e_i = 0$ (from $w_1$).
3. Look at $X^\top e$. Its first entry is (column of 1s)$\cdot e = \sum e_i$. Its second entry is (column of $x$)$\cdot e = \sum x_i e_i$. So both equations together are just $X^\top e = 0$.
4. Write it out: $X^\top (y - Xw) = 0$, so $X^\top X w = X^\top y$. These are called the **normal equations**.
5. Multiply both sides by $(X^\top X)^{-1}$, which is allowed when this inverse exists: $w^* = (X^\top X)^{-1} X^\top y$.

With more features, $X$ just gets more columns and there are more equations, but the steps are the same.

**F. $R^2$.** Think of the simplest possible model: always predict the mean $\bar y$.

1. Its total squared error is $SST = \sum (y_i - \bar y)^2$. This is our "baseline" mistake.
2. Our line has error $SSE$. With an intercept, the line can always copy the baseline (set $w_1 = 0$, $w_0 = \bar y$), so least squares gives $SSE \le SST$.
3. $SSE / SST$ is the fraction of the baseline error that is **still left**. So $1 - SSE/SST$ is the fraction **removed**, or "explained".
4. Example: $SST = 10$, $SSE = 0.2$. The line removed $9.8$ of $10$, so $R^2 = 0.98$.

### Examples

**Example 1 (easy): the four students, step by step.** Data: $(1,2), (2,3), (3,5), (4,6)$.

1. Means: $\bar x = (1+2+3+4)/4 = 10/4 = 2.5$ and $\bar y = (2+3+5+6)/4 = 16/4 = 4$.
2. Make a table of gaps from the means and their products:

| $x_i$ | $y_i$ | $x_i - \bar x$ | $y_i - \bar y$ | product | $(x_i-\bar x)^2$ |
|---|---|---|---|---|---|
| 1 | 2 | $-1.5$ | $-2$ | 3 | 2.25 |
| 2 | 3 | $-0.5$ | $-1$ | 0.5 | 0.25 |
| 3 | 5 | 0.5 | 1 | 0.5 | 0.25 |
| 4 | 6 | 1.5 | 2 | 3 | 2.25 |
| **Sum** | | | | **7** | **5** |

3. Slope: $w_1 = 7/5 = 1.4$.
4. Intercept: $w_0 = 4 - 1.4 \times 2.5 = 4 - 3.5 = 0.5$.
5. The line is $\hat y = 0.5 + 1.4x$. Predictions: $x=1$ gives $1.9$; $x=2$ gives $3.3$; $x=3$ gives $4.7$; $x=4$ gives $6.1$.
6. Residuals: $2-1.9 = 0.1$; $3-3.3 = -0.3$; $5-4.7 = 0.3$; $6-6.1 = -0.1$. They add to $0$, as part C of the derivation promised.
7. $SSE = 0.01 + 0.09 + 0.09 + 0.01 = 0.2$ and $SST = (-2)^2 + (-1)^2 + 1^2 + 2^2 = 10$.
8. $R^2 = 1 - 0.2/10 = 0.98$. A student studying 5 hours is predicted $0.5 + 1.4 \times 5 = 7.5$ marks.

**Result:** $\hat y = 0.5 + 1.4x$, with $R^2 = 0.98$ (the line explains 98% of the variation).

**Example 2 (medium): the same kind of fit with the normal equation.** Data $(0,1), (1,3), (2,4)$, model $\hat y = w_0 + w_1 x$.

1. $X$ has a column of 1s and a column of $x$; $y = (1, 3, 4)$.
$$X = \begin{bmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{bmatrix}, \quad X^\top X = \begin{bmatrix} 3 & 3 \\ 3 & 5 \end{bmatrix}, \quad X^\top y = \begin{bmatrix} 8 \\ 11 \end{bmatrix}$$
2. Where the numbers come from: top-left 3 = number of points; 3 = $0+1+2$; 5 = $0^2+1^2+2^2$. And $X^\top y$ = $(1+3+4,\; 0 \cdot 1 + 1 \cdot 3 + 2 \cdot 4) = (8, 11)$.
3. Determinant $= 3 \times 5 - 3 \times 3 = 6$. Inverse $= \frac{1}{6}\begin{bmatrix} 5 & -3 \\ -3 & 3 \end{bmatrix}$ (swap the diagonal, change sign of the others, divide by the determinant).
4. $w_0 = (5 \times 8 - 3 \times 11)/6 = (40 - 33)/6 = 7/6 \approx 1.167$.
5. $w_1 = (-3 \times 8 + 3 \times 11)/6 = 9/6 = 1.5$.
6. Check with the simple formula: $\bar x = 1$, $\bar y = 8/3$. Top $= (-1)(1 - 8/3) + 0 + (1)(4 - 8/3) = 5/3 + 4/3 = 3$. Bottom $= 1 + 0 + 1 = 2$. Slope $= 3/2 = 1.5$.

**Result:** $w_0 = 7/6 \approx 1.167$, $w_1 = 1.5$. Both methods agree, because they are the same equations.

**Example 3 (GATE level).** Data $\{(1, 3), (2, 1), (-2, -4)\}$. Fit $y = wx$ by least squares. Find $w$ to two decimals.

1. No intercept, so use $w^* = \sum x_i y_i / \sum x_i^2$.
2. $\sum x_i y_i = (1)(3) + (2)(1) + (-2)(-4) = 3 + 2 + 8 = 13$.
3. $\sum x_i^2 = 1 + 4 + 4 = 9$.
4. $w^* = 13/9 \approx 1.44$.
5. Sanity check: the points roughly go up together, so a positive slope between 1 and 2 is sensible.

**Result:** $w \approx 1.44$.

### Common mistakes
> **Common mistake:** Using the with-intercept slope formula when the model is $y = wx$. Read the model first. No $w_0$ means use $\sum xy / \sum x^2$.

> **Common mistake:** Forgetting the column of 1s in $X$. Without it, the normal equation fits a line through the origin.

> **Common mistake:** Adding residuals instead of squared residuals. With an intercept the plain sum is always 0, so it tells you nothing.

> **Common mistake:** Sign slips with negative $x$ values. Write each product $x_i y_i$ on its own line, with brackets.

### How GATE asks it
- **2025 Q.34** (NAT, 1 mark): fit $y = wx$ to three points $(-1,1), (2,-5), (3,5)$; answer $4/14 \approx 0.286$.
- Expect: compute a slope, an intercept, a prediction, an SSE or $R^2$. Also a conceptual MCQ on the normal equation. Ridge questions build on this formula.

> **GATE tip:** For a 1-mark NAT, write the three sums in a small table. It takes under a minute and avoids sign errors.

### Summary
- First we choose a model: a straight line $\hat y = w_0 + w_1 x$ (or many inputs, $\hat y = Xw$).
- Then we measure how bad a line is with the loss: the sum of squared residuals. Squaring stops positive and negative gaps from cancelling.
- The best line sits at the bottom of the loss "valley", where every derivative is zero.
- Setting the derivatives to zero gives simple formulas: $\sum xy / \sum x^2$ with no intercept, and the slope/intercept formulas with one. The line always passes through $(\bar x, \bar y)$.
- The normal equation $X^\top X w = X^\top y$ is the same idea for many weights, and $R^2$ tells what fraction of the spread the line explains.
- Next topic builds on this: Ridge Regression adds a penalty $\lambda \lVert w \rVert^2$ to this same loss.

### Quick self-check
1. Data $(1,1), (2,2), (3,3)$. Fit $y = wx$. What is $w$?

**Answer:** $\sum xy = 1+4+9 = 14$, $\sum x^2 = 14$, so $w = 1$.

2. A line with intercept has residuals $0.4, -0.1$ and one more. What is the third?

**Answer:** Residuals add to 0, so it is $-0.3$.

3. If $SSE = 2$ and $SST = 8$, what is $R^2$?

**Answer:** $1 - 2/8 = 0.75$.

4. Why does the least-squares line (with intercept) always pass through $(\bar x, \bar y)$?

**Answer:** Setting the derivative with respect to $w_0$ to zero gives $\bar y = w_0 + w_1 \bar x$.

## Ridge Regression & Regularization

### The big idea
**Regularization** means adding a small "fine" for large weights to the loss. **Ridge regression** is linear regression plus a fine equal to $\lambda$ times the sum of squared weights.

The fine keeps the model simple, so it works better on new data.

### Before you start

**1. Least squares loss (see topic: Linear Regression).** We judged a line by $L = \sum (y_i - \hat y_i)^2$, the sum of squared residuals. The best weight made the derivative of $L$ zero.

Example: for $\hat y = wx$ the best weight was $w^* = \sum x_i y_i / \sum x_i^2$.

**2. Dot product, $w^\top x$.** Multiply matching entries and add. Example: $w = (2, -1)$, $x = (3, 1)$ gives $w^\top x = 2 \times 3 + (-1) \times 1 = 5$. This is the model's prediction for input $x$.

**3. Absolute value, $\lvert a \rvert$.** The size of a number without its sign. Example: $\lvert -3 \rvert = 3$, $\lvert 4 \rvert = 4$.

**4. Two derivatives we need.** The derivative of $w^2$ is $2w$: the slope gets smaller and smaller as $w$ gets close to 0.

The derivative of $\lvert w \rvert$ is $+1$ when $w > 0$ and $-1$ when $w < 0$. Its slope stays the same size, even very close to 0 (and it has a sharp corner at 0).

**5. Identity matrix, $I$.** A square matrix with 1s on the diagonal and 0s elsewhere. $IA = A$, like multiplying by 1. And $\lambda I$ has $\lambda$ on the diagonal: $2I = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}$.

**6. Singular matrix.** A square matrix with determinant 0 has **no inverse**. Example: $\begin{bmatrix} 2 & 2 \\ 2 & 2 \end{bmatrix}$ has determinant $4 - 4 = 0$, so we cannot "divide" by it.

### Intuition
A student prepares for an exam by **memorising** the exact answers of last year's paper. On last year's paper he scores 100. On the new paper he scores 40.

He learned the noise, not the idea. In ML this is called **overfitting**: perfect on training data, poor on new data.

An overfit model usually has **huge weights**. It bends wildly to pass through every training point. Ridge says: "You may fit the data, but every big weight costs you a fine."

So the model chooses a balance: fit the data well enough, and keep weights small.

> **Intuition:** It is like a shopping budget. You want many things (good fit), but each costly item (big weight) reduces your money. You end up buying sensible things.

The fine strength is $\lambda$ (read "lambda"). $\lambda = 0$: no fine, plain least squares. Very large $\lambda$: the fine dominates, and all weights go near 0.

### Words you need
- **Overfitting**: great on training data, poor on test data. Example: 99% training accuracy, 60% test accuracy.
- **Underfitting**: poor even on training data; model too simple. Example: a flat line for curved data.
- **Regularizer (penalty)**: the extra term added to the loss. Example: $\lambda(w_1^2 + w_2^2)$.
- **$\lambda$ (regularization strength)**: how big the fine is. Example: $\lambda = 0.2$.
- **L2 norm squared, $\lVert w \rVert_2^2$**: sum of squares of weights. Example: $w = (-3, 4)$ gives $9 + 16 = 25$.
- **L1 norm, $\lVert w \rVert_1$**: sum of absolute values. Example: $w = (-3, 4)$ gives $3 + 4 = 7$.
- **Lasso**: regression with an L1 penalty instead of L2.
- **Shrinkage**: weights being pulled toward 0.

### Formulas, explained

**Ridge objective**
$$J(w) = \sum_{i=1}^{n} (y_i - w^\top x_i)^2 + \lambda \lVert w \rVert_2^2$$
- **Read it as:** total cost = sum of squared errors + lambda times sum of squared weights.
- **Symbols:** $w^\top x_i$ = prediction for point $i$ (weights times features, added); $\lVert w \rVert_2^2 = \sum_j w_j^2$.
- **Why it makes sense:** the first part wants a good fit; the second part wants small weights. The minimum is a compromise.
- **Use it when:** asked for the value of the regularized loss, or which $w$ is better.

**Ridge solution, one feature, no intercept**
$$w_{ridge} = \frac{\sum x_i y_i}{\sum x_i^2 + \lambda}$$
- **Read it as:** same as the least squares formula, but with $\lambda$ added to the bottom.
- **Symbols:** as in linear regression; $\lambda \ge 0$.
- **Why it makes sense:** a bigger bottom gives a smaller weight. That is the "shrinkage".
- **Use it when:** a 1-D ridge NAT.

**Ridge solution, matrix form**
$$w_{ridge} = (X^\top X + \lambda I)^{-1} X^\top y$$
- **Read it as:** normal equation with $\lambda$ added on the diagonal.
- **Symbols:** $I$ = identity matrix (1s on the diagonal, 0 elsewhere).
- **Why it makes sense:** adding $\lambda$ to the diagonal makes the matrix always invertible, even when features repeat or there are more features than points.
- **Use it when:** a question asks why ridge works when $X^\top X$ is singular.

**Lasso objective**
$$J(w) = \sum_{i=1}^{n} (y_i - w^\top x_i)^2 + \lambda \lVert w \rVert_1$$
- **Read it as:** squared errors + lambda times sum of absolute weights.
- **Symbols:** $\lVert w \rVert_1 = \sum_j \lvert w_j \rvert$.
- **Why it makes sense:** the L1 fine pushes some weights **exactly to 0**, so lasso also picks features. Ridge only makes weights small, rarely exactly 0.
- **Use it when:** a statement compares ridge (L2) and lasso (L1).

### Where the formulas come from

**A. The 1-D ridge formula.** Start with numbers: data $(1,2), (2,4), (3,5)$, model $\hat y = wx$, and $\lambda = 6$.

1. Write the cost: $J(w) = (2 - w)^2 + (4 - 2w)^2 + (5 - 3w)^2 + 6w^2$, because ridge = squared errors + $\lambda w^2$.
2. Take the derivative, term by term, with the chain rule: $J'(w) = -2(2 - w) - 4(4 - 2w) - 6(5 - 3w) + 12w$.
3. Set it to 0 and divide by $-2$: $(2 - w) + 2(4 - 2w) + 3(5 - 3w) - 6w = 0$.
4. Collect terms: $(2 + 8 + 15) - w(1 + 4 + 9) - 6w = 0$, so $25 = w(14 + 6)$, so $w = 25/20 = 1.25$.
5. Look at the numbers: $25 = \sum x_i y_i$ and $14 = \sum x_i^2$. The only new thing is the $+6$, which is $\lambda$.
6. With symbols: $J(w) = \sum (y_i - w x_i)^2 + \lambda w^2$, so $J'(w) = -2\sum x_i (y_i - w x_i) + 2\lambda w$.
7. Set to 0 and divide by 2: $\sum x_i y_i = w \sum x_i^2 + \lambda w = w(\sum x_i^2 + \lambda)$.
8. So $w_{ridge} = \sum x_i y_i / (\sum x_i^2 + \lambda)$.

So the ridge formula is just the least-squares formula $\sum xy / \sum x^2$ with $\lambda$ added to the bottom. The extra $\lambda$ comes from the derivative of the fine $\lambda w^2$.

**B. The matrix formula.** This is step 7 above for many weights.

1. In Linear Regression, setting the derivatives of the squared error to zero gave $X^\top X w = X^\top y$.
2. The fine is $\lambda \lVert w \rVert^2 = \lambda(w_1^2 + w_2^2 + \dots)$. Its derivative with respect to $w_j$ is $2\lambda w_j$, so for all weights together it adds $\lambda w$ (after dividing by 2, as before).
3. So the new equation is $X^\top X w + \lambda w = X^\top y$.
4. Write $\lambda w = \lambda I w$, because $I w = w$. Then $(X^\top X + \lambda I) w = X^\top y$.
5. Multiply by the inverse: $w_{ridge} = (X^\top X + \lambda I)^{-1} X^\top y$.

**C. Why $+\lambda I$ fixes a singular matrix.** Take two points where the two features are identical: rows $(1, 1)$ and $(1, 1)$.

1. Then $X^\top X = \begin{bmatrix} 2 & 2 \\ 2 & 2 \end{bmatrix}$, with determinant $4 - 4 = 0$. No inverse, so plain least squares has no unique answer.
2. Add $\lambda I$ with $\lambda = 1$: $\begin{bmatrix} 3 & 2 \\ 2 & 3 \end{bmatrix}$, with determinant $9 - 4 = 5 \ne 0$. Now it has an inverse.
3. In general, the eigenvalues of $X^\top X$ are never negative (see topic: Linear Algebra). Adding $\lambda I$ adds $\lambda$ to every eigenvalue, so all become at least $\lambda > 0$. A matrix with no zero eigenvalue has an inverse.

**D. Why lasso gives exact zeros but ridge does not.** Use the smallest possible case: one weight, cost $(w - a)^2$ plus a fine. Take $a = 1$ and $\lambda = 4$.

1. Ridge: $J = (w - 1)^2 + 4w^2$. Derivative $2(w - 1) + 8w = 0$ gives $w = 1/5 = 0.2$. Small, but **not zero**. For any $\lambda$, $w = a/(1 + \lambda)$, which is never exactly 0.
2. Lasso: $J = (w - 1)^2 + 4\lvert w \rvert$. Suppose $w > 0$. Then the derivative is $2(w - 1) + 4 = 0$, giving $w = -1$. That is not positive, so the guess $w > 0$ was wrong.
3. Suppose $w < 0$. Then the derivative is $2(w - 1) - 4 = 0$, giving $w = 3$. Not negative, so that guess is wrong too.
4. The only place left is the corner: $w = 0$. Check: $J(0) = 1$, while $J(0.1) = 0.81 + 0.4 = 1.21$ and $J(-0.1) = 1.21 + 0.4 = 1.61$. So $w = 0$ is the minimum.
5. The reason: the L2 push $2\lambda w$ becomes tiny near 0, so it never quite reaches 0. The L1 push has the same strength $\lambda$ all the way down to 0, so it can push a weight exactly onto 0.

**E. Why ridge raises bias and lowers variance.** The full proof is not needed for GATE. The picture is enough.

1. Shrinking $w$ toward 0 means the model is pulled away from the best training fit, so on average it is a little wrong: **more bias**.
2. But a small weight cannot jump around much when the training data changes a little, so different training sets give similar models: **less variance**.
3. See topic: Bias-Variance & Model Evaluation for these two words.

### Examples

**Example 1 (easy): shrinkage on 3 points.** Data $(1,2), (2,4), (3,5)$, model $\hat y = wx$.

1. $\sum x_i y_i = 2 + 8 + 15 = 25$ and $\sum x_i^2 = 1 + 4 + 9 = 14$.
2. Plain least squares ($\lambda = 0$): $w = 25/14 \approx 1.786$.
3. Ridge, $\lambda = 1$: $w = 25/(14+1) = 25/15 \approx 1.667$.
4. Ridge, $\lambda = 6$: $w = 25/(14+6) = 25/20 = 1.25$.

**Result:** as $\lambda$ grows, $w$ moves toward 0 (1.786, then 1.667, then 1.25).

**Example 2 (medium): why ridge picks the smaller weight.** Same data, $\lambda = 6$. Compare the ridge cost of $w = 1.786$ and $w = 1.25$.

1. For $w = 1.25$: predictions $1.25, 2.5, 3.75$. Errors $0.75, 1.5, 1.25$.
2. SSE $= 0.5625 + 2.25 + 1.5625 = 4.375$. Penalty $= 6 \times 1.25^2 = 6 \times 1.5625 = 9.375$. Total $= 13.75$.
3. For $w = 1.786$: predictions $1.786, 3.571, 5.357$. Errors $0.214, 0.429, -0.357$.
4. SSE $= 0.046 + 0.184 + 0.128 = 0.357$. Penalty $= 6 \times 1.786^2 = 6 \times 3.189 = 19.13$. Total $\approx 19.49$.
5. The plain weight fits better (SSE 0.357 vs 4.375), but its fine is much larger.

**Result:** under the ridge cost, $w = 1.25$ wins ($13.75 < 19.49$), exactly the weight the formula gave.

**Example 3 (GATE level).** A ridge model $y_{pred} = w^\top x$ uses **squared error** for one sample, with regularizer weight $0.5$. Currently $w = [2, -1]^\top$. Input $x = [3, 1]^\top$, and $y_{true} = x_1 - x_2$. Find the regularized loss for this sample.

1. Prediction: $(2)(3) + (-1)(1) = 6 - 1 = 5$.
2. True value: $3 - 1 = 2$.
3. Squared error: $(2 - 5)^2 = 9$.
4. Penalty: $0.5 \times (2^2 + (-1)^2) = 0.5 \times 5 = 2.5$.
5. Total: $9 + 2.5 = 11.5$.

**Result:** $11.5$.

If the question used **absolute** error (MAE) instead, the error part would be $\lvert 2 - 5 \rvert = 3$ and the total $3 + 2.5 = 5.5$. Read which error is asked.

### Common mistakes
> **Common mistake:** Saying ridge uses the L1 norm. Ridge = L2 (squares). Lasso = L1 (absolute values).

> **Common mistake:** Forgetting to square the weights in the penalty. For $w = (-3, 4)$ the ridge penalty uses $9 + 16 = 25$, not $-3 + 4 = 1$.

> **Common mistake:** Thinking regularization fixes "good on test, bad on train". It fixes the opposite: good on train, bad on test (overfitting).

> **Common mistake:** Saying ridge reduces bias. It usually **increases bias a little** and **reduces variance**.

### How GATE asks it
- **2026 Q.37** (MCQ, 2 marks): which ridge statement is true. Answer: it may increase bias but reduces variance. Traps: L1 norm, "reduces negative weights", reversed overfitting definition.
- **2026 Q.55** (NAT, 2 marks): compute MAE plus $0.2 \lVert w \rVert^2$ for $w = (-3, 4)$, $x = (1, 2)$; $\lvert 3 - 5 \rvert + 0.2 \times 25 = 7$.
- Expect: plug numbers into the ridge loss, or the 1-D shrinkage formula, or ridge vs lasso statements.

> **GATE tip:** In loss questions, compute three things on separate lines: prediction, error term, penalty. Then add.

### Summary
- First we saw that a model can overfit: it memorises training data using huge weights and fails on new data.
- So we add a fine for big weights to the least-squares loss: ridge uses $\lambda \sum w_j^2$, lasso uses $\lambda \sum \lvert w_j \rvert$.
- Setting the derivative to zero gives the ridge formula: the least-squares formula with $\lambda$ added to the bottom (or $\lambda I$ added to $X^\top X$).
- That extra $\lambda$ shrinks the weights and also makes the matrix always invertible.
- Lasso's L1 fine pushes with constant force, so it sets some weights exactly to 0; ridge only makes them small.
- The price: a little more bias; the gain: much less variance.
- Next topic builds on this: the same "loss + penalty" idea appears in Logistic Regression, SVM (the $\frac{1}{2}\lVert w \rVert^2$ term) and neural networks (weight decay).

### Quick self-check
1. $w = (1, -2, 2)$, $\lambda = 0.1$. Ridge penalty?

**Answer:** $0.1 \times (1 + 4 + 4) = 0.9$.

2. Which method can set weights exactly to zero: ridge or lasso?

**Answer:** Lasso.

3. 1-D data with $\sum xy = 12$, $\sum x^2 = 4$, $\lambda = 2$. Ridge weight?

**Answer:** $12/(4+2) = 2$.

4. Where does the $+\lambda$ in the bottom of the 1-D ridge formula come from?

**Answer:** From the derivative of the fine $\lambda w^2$, which is $2\lambda w$; after dividing by 2 it adds $\lambda w$ to the right side.

## Logistic Regression

### The big idea
Logistic regression is a **classifier** for two classes (yes/no). It computes a score $z = w^\top x + b$ and squashes it into a **probability between 0 and 1** using the **sigmoid** function.

### Before you start

**1. Probability and "given" (see topic: Probability).** A probability is a number from 0 to 1 that says how likely something is. $P(y = 1 \mid x)$ is read "the probability that $y$ is 1, **given** that we know $x$".

Example: $P(\text{pass} \mid \text{studied 5 hours}) = 0.88$ means: among students who studied 5 hours, about 88% pass.

**2. The number $e$ and powers of $e$.** $e \approx 2.718$ is a special constant. $e^{z}$ grows very fast when $z$ is positive and shrinks toward 0 when $z$ is negative.

Example: $e^{0} = 1$, $e^{1} \approx 2.718$, $e^{2} \approx 7.389$, $e^{-2} \approx 0.135$. Note $e^{-z} = 1/e^{z}$.

**3. The natural log, $\ln$.** $\ln$ is the "undo" of $e$: if $e^{a} = b$ then $\ln b = a$. Example: $\ln 1 = 0$, $\ln e = 1$, $\ln 0.5 \approx -0.693$.

Two rules we use: $\ln(ab) = \ln a + \ln b$ (a log turns products into sums), and $\ln$ of a number between 0 and 1 is negative.

**4. Score as a dot product (see topic: Linear Regression).** $z = w^\top x + b = w_1 x_1 + w_2 x_2 + \dots + b$. Example: $w = (2, -1)$, $b = -1$, $x = (2, 1)$ gives $z = 4 - 1 - 1 = 2$.

**5. Derivative and chain rule (see topic: Calculus).** A derivative is a slope. The chain rule says: for a function inside a function, multiply the slopes. We use it to find how the loss changes when a weight changes.

**6. Gradient descent.** To go down a hill, step **opposite** to the slope. If the slope of the loss is $g$, the update is $w \leftarrow w - \eta g$, where $\eta$ (eta) is a small step size.

Example: loss slope $g = -3$ at $w = 0$, $\eta = 0.1$. New $w = 0 - 0.1 \times (-3) = 0.3$.

### Intuition
Will a student pass? More study hours means a higher chance. But a chance can never go above 1 or below 0.

A straight line would give silly values like 1.4 or $-0.3$. So we take the line's score and pass it through an "S-shaped" curve.

Very negative score gives a probability near 0. Score 0 gives exactly 0.5. Very positive score gives a probability near 1.

> **Intuition:** The sigmoid is like a dimmer switch for a bulb. Turn the knob (score) far left: dark (0). Middle: half bright (0.5). Far right: full bright (1).

Logistic regression models $P(y \mid x)$ directly. It does not model how $x$ itself is produced. So it is a **discriminative** model (unlike Naive Bayes, which is **generative**).

### Words you need
- **Sigmoid, $\sigma(z)$**: the S-curve. Example: $\sigma(0) = 0.5$, $\sigma(2) = 0.881$.
- **Score (logit), $z$**: the linear part $w^\top x + b$. Example: $w = 1, b = -3, x = 4$ gives $z = 1$.
- **Odds**: $p / (1 - p)$, "how many times more likely yes is than no". Example: $p = 0.8$ gives odds $0.8/0.2 = 4$.
- **Log-odds**: $\ln$ of the odds. Example: $\ln 4 \approx 1.386$.
- **Decision boundary**: where $p = 0.5$, that is $z = 0$. Example: $x - 3 = 0$, so $x = 3$.
- **Log loss (cross-entropy)**: the error measure. Confident and wrong costs a lot.
- **Learning rate, $\eta$** (read "eta"): step size in gradient descent. Example: $\eta = 0.1$.

### Formulas, explained

**Sigmoid**
$$\sigma(z) = \frac{1}{1 + e^{-z}}$$
- **Read it as:** sigma of z equals 1 over (1 plus e to the minus z).
- **Symbols:** $e \approx 2.718$; $z$ = score.
- **Why it makes sense:** for large $z$, $e^{-z}$ is tiny, so $\sigma \approx 1$; for very negative $z$, $e^{-z}$ is huge, so $\sigma \approx 0$.
- **Use it when:** converting a score to a probability.

**Log loss for one point**
$$\ell = -\left[ y \ln p + (1-y) \ln(1-p) \right]$$
- **Read it as:** if the true label is 1, loss is $-\ln p$; if it is 0, loss is $-\ln(1-p)$.
- **Symbols:** $y \in \{0, 1\}$ = true label; $p$ = predicted probability of class 1; $\ln$ = natural log.
- **Why it makes sense:** $p = 0.99$ for a true 1 gives a tiny loss; $p = 0.01$ gives a huge loss.
- **Use it when:** asked for the training loss.

**Gradient descent update**
$$w \leftarrow w - \eta \sum_i (p_i - y_i) x_i$$
$$b \leftarrow b - \eta \sum_i (p_i - y_i)$$
- **Read it as:** move each weight against the error times the input.
- **Symbols:** $p_i - y_i$ = how wrong point $i$ is; $\eta$ = step size.
- **Why it makes sense:** if the model says too low for a true 1 ($p - y < 0$), the weight goes up.
- **Use it when:** one training step is asked.

### Where the formulas come from

**A. The sigmoid comes from "log-odds = a straight line".** A line can give any number from $-\infty$ to $+\infty$, but a probability is stuck between 0 and 1. So we turn the probability into something that can be any number.

1. Start with $p = 0.8$. The odds are $p/(1-p) = 0.8/0.2 = 4$. Odds can be any positive number, because $1 - p$ can be tiny.
2. Take the log: $\ln 4 \approx 1.386$. Log-odds can be any number at all, because $\ln$ of a number below 1 is negative. So log-odds is a fair thing to model with a line.
3. The model says: $\ln \frac{p}{1-p} = z$, where $z = w^\top x + b$.
4. Undo the log with $e$: $\frac{p}{1-p} = e^{z}$, because $e$ and $\ln$ cancel.
5. Solve for $p$: $p = e^{z}(1 - p)$, so $p + p e^{z} = e^{z}$, so $p = \frac{e^{z}}{1 + e^{z}}$.
6. Divide top and bottom by $e^{z}$: $p = \frac{1}{e^{-z} + 1}$, because $1/e^{z} = e^{-z}$. This is $\sigma(z)$.
7. Check with numbers: $\sigma(1.386) = 1/(1 + e^{-1.386}) = 1/(1 + 0.25) = 0.8$. We got back $p = 0.8$.

That is why the "regression" in the name is about the log-odds, and why the model is still a classifier.

**B. The decision boundary is $z = 0$.** We say "class 1" when $p \ge 0.5$.

1. $\sigma(z) = 0.5$ means $1 + e^{-z} = 2$, so $e^{-z} = 1$, so $z = 0$, because only $e^{0}$ equals 1.
2. $z = w^\top x + b = 0$ is the equation of a straight line (a plane in more dimensions). So the boundary is straight, even though the sigmoid is curved.

**C. The log loss comes from "make the true labels likely".** Take two students: student 1 passed ($y = 1$) and the model gives $p = 0.9$; student 2 failed ($y = 0$) and the model gives $p = 0.2$.

1. The probability the model gives to what really happened: student 1 gets $0.9$; student 2 gets $1 - 0.2 = 0.8$.
2. One formula covers both cases: $p^{y}(1 - p)^{1 - y}$. If $y = 1$ it gives $p$; if $y = 0$ it gives $1 - p$, because anything to the power 0 is 1.
3. Treat students as independent, so multiply: likelihood $= 0.9 \times 0.8 = 0.72$. A good model makes this large.
4. Products of many small numbers are hard to handle, so take $\ln$: $\ln 0.9 + \ln 0.8 = -0.105 - 0.223 = -0.328$, because $\ln$ turns products into sums.
5. We prefer to **minimise** a loss, so flip the sign: loss $= 0.328$. Small loss means the model gave high probability to the truth.
6. For one point in symbols: $\ln[p^{y}(1-p)^{1-y}] = y \ln p + (1 - y)\ln(1 - p)$. With the minus sign this is $\ell$.

**D. The gradient $(p - y)x$.** We need the slope of $\ell$ with respect to $w$. The chain goes $w \to z \to p \to \ell$.

1. Slope of the sigmoid: $\frac{dp}{dz} = p(1 - p)$. Reason: $\sigma = (1 + e^{-z})^{-1}$, its derivative is $\frac{e^{-z}}{(1 + e^{-z})^2}$, and $\frac{e^{-z}}{1 + e^{-z}} = 1 - \sigma$. Check: at $z = 0$, slope $= 0.5 \times 0.5 = 0.25$.
2. Slope of the loss in $p$: $\frac{d\ell}{dp} = -\frac{y}{p} + \frac{1 - y}{1 - p}$, because the derivative of $\ln p$ is $1/p$, and of $\ln(1-p)$ is $-1/(1-p)$.
3. Multiply (chain rule): $\left(-\frac{y}{p} + \frac{1-y}{1-p}\right) p(1-p) = -y(1-p) + (1-y)p = p - y$. The messy parts cancel.
4. Slope of $z$ in $w$: $\frac{dz}{dw} = x$, because $z = wx + b$. And $\frac{dz}{db} = 1$.
5. So $\frac{d\ell}{dw} = (p - y)x$ and $\frac{d\ell}{db} = p - y$. Add over all points and step opposite to the slope: this is the update rule.

This update looks exactly like linear regression's gradient (error times input), with $p$ in place of $\hat y$.

### Examples

**Example 1 (easy): predicting with a given model.** Hours $x = 1, 2, 4, 5$; pass $y = 0, 0, 1, 1$. Model $w = 1$, $b = -3$, so $z = x - 3$.

1. Compute $z$, then $p = \sigma(z)$, then the loss for each point:

| $x$ | $y$ | $z$ | $p = \sigma(z)$ | loss |
|---|---|---|---|---|
| 1 | 0 | $-2$ | 0.119 | $-\ln(0.881) = 0.127$ |
| 2 | 0 | $-1$ | 0.269 | $-\ln(0.731) = 0.313$ |
| 4 | 1 | 1 | 0.731 | $-\ln(0.731) = 0.313$ |
| 5 | 1 | 2 | 0.881 | $-\ln(0.881) = 0.127$ |

2. For $y = 0$ the loss uses $1 - p$; for $y = 1$ it uses $p$.
3. Boundary: $z = 0$ at $x = 3$. Points below 3 get $p < 0.5$ (class 0) and points above get class 1.
4. Total log loss $= 0.127 + 0.313 + 0.313 + 0.127 = 0.88$.

**Result:** all four points are classified correctly; total log loss $\approx 0.88$.

**Example 2 (medium): one gradient step.** Same data, start at $w = 0$, $b = 0$, $\eta = 0.1$.

1. Every $z = 0$, so every $p = 0.5$.
2. Errors $p - y$: $0.5, 0.5, -0.5, -0.5$.
3. $\sum (p-y)x = 0.5(1) + 0.5(2) - 0.5(4) - 0.5(5) = 0.5 + 1 - 2 - 2.5 = -3$.
4. $\sum (p-y) = 0.5 + 0.5 - 0.5 - 0.5 = 0$.
5. New $w = 0 - 0.1 \times (-3) = 0.3$. New $b = 0 - 0.1 \times 0 = 0$.
6. Now $p(x=5) = \sigma(1.5) = 0.818$, up from 0.5. Good, the true label is 1.

**Result:** $w = 0.3$, $b = 0$ after one step.

**Example 3 (GATE level).** A logistic model has $w = (2, -1)$, $b = -1$. For $x = (1, 1)$, find $P(y=1 \mid x)$ and the class.

1. $z = 2(1) - 1(1) - 1 = 0$.
2. $p = \sigma(0) = 0.5$, so the point lies exactly **on** the boundary.
3. For comparison, $x = (2, 1)$: $z = 4 - 1 - 1 = 2$, $p = 0.881$, class 1.

**Result:** $P(y = 1 \mid x) = 0.5$; the point is on the decision boundary.

### Common mistakes
> **Common mistake:** Calling logistic regression a regression method for numbers. It is a **classifier**; the "regression" is on the log-odds.

> **Common mistake:** Calling it generative. It is **discriminative**: it models $P(y \mid x)$ only.

> **Common mistake:** Thinking the boundary is curved. $z = 0$ is a straight line (a plane in higher dimensions).

> **Common mistake:** Using $-\ln p$ for a point with $y = 0$. For $y = 0$ the loss is $-\ln(1 - p)$.

### How GATE asks it
Not asked as its own topic in 2024 to 2026. It appeared inside **2024 Q.18** (match: logistic regression is a **discriminative** model).

Likely question: compute $\sigma(w^\top x + b)$ for a given point, find the decision boundary, or compute one log-loss value.

> **GATE tip:** Remember three sigmoid values: $\sigma(0) = 0.5$, $\sigma(1) \approx 0.731$, $\sigma(2) \approx 0.881$. And $\sigma(-z) = 1 - \sigma(z)$.

### Summary
- First we want a probability, but a line gives any number. So we let the line model the **log-odds**, which can be any number.
- Undoing the log gives the sigmoid $p = 1/(1 + e^{-z})$, which squashes any score into $(0, 1)$.
- The class flips at $p = 0.5$, which is $z = 0$, so the boundary is a straight line.
- To train, we make the true labels as likely as possible; taking $-\ln$ of that likelihood gives the log loss.
- The chain rule turns the slope of the log loss into the simple form (error) $\times$ (input), and gradient descent steps against it.
- Next topic builds on this: a neural network is many sigmoid units stacked in layers, trained with the same chain rule (see Neural Networks / MLP).

### Quick self-check
1. What is $\sigma(0)$?

**Answer:** 0.5.

2. Model $z = 2x - 6$. Where is the boundary?

**Answer:** $2x - 6 = 0$, so $x = 3$.

3. True label 1, predicted $p = 0.5$. Log loss?

**Answer:** $-\ln 0.5 = 0.693$.

4. If $p = 0.75$, what are the odds and the score $z$?

**Answer:** Odds $= 0.75/0.25 = 3$, so $z = \ln 3 \approx 1.099$.

## k-Nearest Neighbours

### The big idea
To label a new point, look at the **$k$ closest** training points and take a **majority vote** of their labels. For predicting a number, take the **average** of their values.

### Before you start

**1. Points as lists of numbers.** A data point with $d$ features is a list $p = (p_1, p_2, \dots, p_d)$. Example: a student with 3 hours of study and 7 hours of sleep is $p = (3, 7)$; here $p_1 = 3$ and $p_2 = 7$.

**2. Squares and square roots.** $\sqrt{a}$ is the number that, multiplied by itself, gives $a$. Example: $\sqrt{25} = 5$ because $5 \times 5 = 25$.

Bigger numbers have bigger square roots: if $a < b$ then $\sqrt a < \sqrt b$. Example: $4 < 9$ and $2 < 3$.

**3. Pythagoras' theorem.** In a right-angled triangle with short sides $a$ and $b$, the long side $c$ satisfies $c^2 = a^2 + b^2$. Example: sides 3 and 4 give $c = \sqrt{9 + 16} = 5$.

**4. Absolute value, $\lvert a \rvert$.** The size of a number without its sign. Example: $\lvert 2 - 5 \rvert = \lvert -3 \rvert = 3$.

**5. Mean and majority.** The mean of $10, 12, 14$ is $36/3 = 12$. The majority of Red, Blue, Blue is Blue: the label that appears most.

**6. Bias and variance in one line (see topic: Bias-Variance & Model Evaluation).** High bias = too simple, wrong on average. High variance = too jumpy, changes a lot when the training data changes a little.

### Intuition
You move to a new city and want to know if a street is "quiet" or "noisy". You ask your 3 nearest neighbours. Two say "noisy", one says "quiet".

You decide "noisy". That is k-NN with $k = 3$.

There is no real "training". The algorithm just stores all points.

All the work happens when a new point arrives: measure distances, sort, vote. So it is called a **lazy learner**.

> **Intuition:** "Tell me who your friends are, and I will tell you who you are." A point gets the label of its nearest friends.

The choice of $k$ matters:
- $k = 1$: follows the single nearest point. Very sensitive to one noisy point (overfitting, high variance).
- Very large $k$: almost everyone votes, so it predicts the majority class everywhere (underfitting, high bias).

### Words you need
- **Query point**: the new point we want to label. Example: the diamond at $(2, 1)$.
- **Euclidean distance**: straight-line distance. Example: $(0,0)$ to $(3,4)$ is $5$.
- **Manhattan distance**: sum of absolute differences, like walking along city blocks. Example: $(0,0)$ to $(3,4)$ is $3 + 4 = 7$.
- **Majority vote**: the label that appears most among the $k$ neighbours. Example: R, B, B gives B.
- **Odd $k$**: for two classes, an odd $k$ avoids a tied vote. Example: $k = 3$ cannot give 1.5 vs 1.5.
- **Feature scaling**: putting features on similar ranges so one feature does not dominate distance. Example: income in rupees (50000) vs age in years (30).

### Formulas, explained

**Euclidean distance**
$$d(p, q) = \sqrt{(p_1 - q_1)^2 + (p_2 - q_2)^2 + \dots + (p_d - q_d)^2}$$
- **Read it as:** square root of the sum of squared differences in each coordinate.
- **Symbols:** $p, q$ = two points; $p_1$ = first coordinate of $p$; $d$ = number of features.
- **Why it makes sense:** it is Pythagoras' theorem, the straight-line length.
- **Use it when:** "Euclidean distance" or no distance named.

**Manhattan distance**
$$d(p, q) = \lvert p_1 - q_1 \rvert + \lvert p_2 - q_2 \rvert + \dots + \lvert p_d - q_d \rvert$$
- **Read it as:** add the absolute difference in each coordinate.
- **Symbols:** $\lvert \cdot \rvert$ = absolute value (drop the minus sign).
- **Why it makes sense:** in a city grid you cannot walk diagonally through buildings.
- **Use it when:** "Manhattan" or "L1 distance" is named.

**k-NN prediction**
$$\hat y_{\text{class}} = \text{majority label among the } k \text{ nearest}$$
$$\hat y_{\text{number}} = \frac{1}{k}\sum_{j=1}^{k} y_{(j)}$$
- **Read it as:** classification: most common neighbour label. Regression: average of neighbour values.
- **Symbols:** $y_{(j)}$ = value of the $j$-th nearest neighbour.
- **Why it makes sense:** nearby points tend to be similar.
- **Use it when:** any k-NN question.

> **Remember:** Comparing distances? You can compare **squared** Euclidean distances and skip the square root. The order stays the same.

### Where the formulas come from

**A. Euclidean distance is Pythagoras.** Start with $p = (0, 0)$ and $q = (3, 4)$.

1. Walk from $p$ to $q$: 3 steps along $x$, then 4 steps along $y$. These two moves meet at a right angle.
2. The straight line from $p$ to $q$ is the long side of a right-angled triangle with short sides 3 and 4.
3. By Pythagoras: $d^2 = 3^2 + 4^2 = 25$, so $d = 5$.
4. In general the short sides are $\lvert p_1 - q_1 \rvert$ and $\lvert p_2 - q_2 \rvert$. Squaring removes the sign, so $d = \sqrt{(p_1 - q_1)^2 + (p_2 - q_2)^2}$.
5. For 3 features, use Pythagoras twice: first the diagonal of the floor, $\sqrt{a^2 + b^2}$; then that diagonal with the height $c$, giving $\sqrt{a^2 + b^2 + c^2}$. Each new feature adds one more squared term in the same way.

**B. Manhattan distance is walking on a grid.** Same $p = (0, 0)$ and $q = (3, 4)$.

1. In a city with square blocks you cannot cut diagonally through buildings.
2. You must walk 3 blocks east and 4 blocks north, in any order: $3 + 4 = 7$.
3. In general, add the absolute differences: $\lvert p_1 - q_1 \rvert + \lvert p_2 - q_2 \rvert + \dots$. We use absolute values because distance walked is never negative.
4. Manhattan is never smaller than Euclidean (7 vs 5 here), because the straight line is the shortest path.

**C. Why squared distances give the same neighbours.** Take distances $1.414$ and $2$.

1. Their squares are $2$ and $4$. The order stays the same: smaller distance, smaller square.
2. This works because, for numbers $\ge 0$, squaring never changes which one is bigger.
3. So for sorting we can skip the square root. It saves time and avoids rounding.

**D. Why majority vote and average.** We trust that close points behave alike, so we copy the neighbours.

1. Classification: we must give one label and want the fewest wrong guesses among the neighbours, so we pick the most common label. Example: R, B, B. Guess B: 1 wrong. Guess R: 2 wrong.
2. Regression: we must give one number $c$ and want the smallest squared error $\sum (y_{(j)} - c)^2$. Example: neighbours 30, 36, 41, with mean $107/3 \approx 35.67$.
3. Squared error for $c = 35.67$: $(30 - 35.67)^2 + (36 - 35.67)^2 + (41 - 35.67)^2 \approx 32.1 + 0.1 + 28.4 = 60.6$.
4. Squared error for $c = 36$: $(30 - 36)^2 + 0 + (41 - 36)^2 = 36 + 25 = 61$. The mean gives the smaller value.
5. Why the mean always wins: the derivative of $\sum (y_{(j)} - c)^2$ is $-2\sum (y_{(j)} - c)$. Setting it to 0 gives $kc = \sum y_{(j)}$, so $c = \frac{1}{k}\sum y_{(j)}$. This is the same idea as the intercept in Linear Regression.

**E. Why $k$ controls bias and variance.** The full proof is not needed for GATE. A picture is enough.

1. $k = 1$: move the query a tiny bit and the single nearest point may change, so the answer jumps. One noisy point decides alone. This is **high variance**.
2. $k = n$ (all points): every query gets the same answer, the overall majority. It ignores where the query is. This is **high bias**.
3. A middle $k$ averages away some noise but still listens to the local area.

### Examples

**Example 1 (easy): how the answer changes with $k$.** Query $q = (3, 3)$. Six training points:

| Point | Class | Difference from $q$ | Squared distance | Distance |
|---|---|---|---|---|
| $(2,3)$ | Red | $(1, 0)$ | $1 + 0 = 1$ | 1 |
| $(4,4)$ | Blue | $(1, 1)$ | $1 + 1 = 2$ | 1.414 |
| $(5,3)$ | Blue | $(2, 0)$ | $4 + 0 = 4$ | 2 |
| $(1,2)$ | Red | $(2, 1)$ | $4 + 1 = 5$ | 2.236 |
| $(1,5)$ | Red | $(2, 2)$ | $4 + 4 = 8$ | 2.828 |
| $(3,0)$ | Blue | $(0, 3)$ | $0 + 9 = 9$ | 3 |

1. Compute each squared distance (table above) and sort from nearest to farthest. The table is already sorted.
2. $k = 1$: {Red}. Prediction **Red**.
3. $k = 3$: {Red, Blue, Blue}. Blue 2, Red 1. Prediction **Blue**.
4. $k = 5$: {Red, Blue, Blue, Red, Red}. Red 3, Blue 2. Prediction **Red**.

**Result:** Red for $k = 1$, Blue for $k = 3$, Red for $k = 5$. The same point gets different labels for different $k$, which is why GATE asks "for which $k$".

**Example 2 (medium): k-NN for a number.** House sizes (in 100 sq ft) and prices (in lakh rupees): $(5, 20), (8, 30), (10, 36), (12, 41), (15, 50)$. Predict the price for size 11 with $k = 3$.

1. Distances from 11: $\lvert 5-11 \rvert = 6$, $\lvert 8-11 \rvert = 3$, $\lvert 10-11 \rvert = 1$, $\lvert 12-11 \rvert = 1$, $\lvert 15-11 \rvert = 4$.
2. Three nearest: size 10 (36), size 12 (41), size 8 (30).
3. Prediction $= (36 + 41 + 30)/3 = 107/3 \approx 35.67$.

**Result:** about 35.67 lakh rupees.

**Example 3 (GATE level): Euclidean vs Manhattan.** Query $(0, 0)$, $k = 3$. Points: $(1,0)$ circle, $(0,2)$ square, $(2,2)$ square, $(3,0)$ circle, $(-4,0)$ square. Find the label under each distance.

| Point | Class | Euclidean | Manhattan |
|---|---|---|---|
| $(1,0)$ | circle | 1 | 1 |
| $(0,2)$ | square | 2 | 2 |
| $(2,2)$ | square | $\sqrt8 \approx 2.83$ | 4 |
| $(3,0)$ | circle | 3 | 3 |
| $(-4,0)$ | square | 4 | 4 |

1. Fill the table. The query is the origin, so Euclidean is $\sqrt{x^2 + y^2}$ and Manhattan is $\lvert x \rvert + \lvert y \rvert$.
2. Euclidean, 3 nearest: $(1,0)$ circle, $(0,2)$ square, $(2,2)$ square. Two squares win.
3. Manhattan, 3 nearest: $(1,0)$ circle, $(0,2)$ square, $(3,0)$ circle. Two circles win.

**Result:** square under Euclidean, circle under Manhattan. The diagonal point $(2,2)$ is "closer" by straight line but "farther" by city blocks.

### Common mistakes
> **Common mistake:** Forgetting the square root, then comparing a squared distance with a normal one. Use one kind for all points.

> **Common mistake:** Using an even $k$ for two classes and getting a tie. GATE usually asks for **odd** $k$.

> **Common mistake:** Thinking k-NN has a training phase that learns weights. It only stores the data.

> **Common mistake:** Ignoring ties in distance. If two points are at the same distance and both fit inside $k$, include both and count.

### How GATE asks it
- **2024 Q.63** (NAT, 2 marks): five points on a grid, query $(2,1)$; smallest odd $k$ that gives "square". Distances $1, \sqrt2, \sqrt2, 2, \sqrt5$; $k = 1, 3$ give circle, $k = 5$ gives square. The answer is 5.
- Expect: read points from a figure, sort by distance, vote for $k = 1, 3, 5$. Also concept MCQs: lazy learner, effect of $k$ on bias and variance, need for scaling.

> **GATE tip:** Make a distance table with squared distances. Sort once. Then read off any $k$.

### Summary
- First we assume that points close to each other have similar labels.
- To measure "close" we use Euclidean distance (Pythagoras, the straight line) or Manhattan distance (walking along a grid).
- For a new point we find the $k$ nearest training points; squared distances are enough for sorting.
- Then we copy them: majority vote for a label (fewest wrong guesses), mean for a number (smallest squared error).
- Small $k$ is jumpy (high variance); large $k$ is too smooth (high bias). That is why the answer can change with $k$.
- Next topic builds on this: distances return in k-means and Hierarchical Clustering, and the bias-variance trade-off is studied in Bias-Variance & Model Evaluation.

### Quick self-check
1. Manhattan distance between $(1, 2)$ and $(4, -2)$?

**Answer:** $3 + 4 = 7$.

2. Does increasing $k$ increase or decrease variance?

**Answer:** It decreases variance (and increases bias).

3. Neighbours' values for $k = 4$: 10, 12, 14, 20. Prediction?

**Answer:** $56/4 = 14$.

4. Euclidean distance between $(1, 1, 1)$ and $(2, 3, 3)$?

**Answer:** $\sqrt{1 + 4 + 4} = \sqrt 9 = 3$.

## Naive Bayes

### The big idea
Naive Bayes uses **Bayes' theorem** to find the probability of each class, given the features. It makes one "naive" assumption: **inside each class, the features are independent**.

Then it picks the class with the highest probability.

### Before you start
**What probability is.** A probability is a number from 0 to 1 that says how likely something is. If 3 of 6 emails are spam, then $P(\text{spam}) = 3/6 = 0.5$. (See subject: Probability and Statistics, topic: Basic Probability.)

**What "given" means.** $P(A \mid B)$ is read "probability of $A$ **given** $B$". It means: look only at the cases where $B$ happened, and ask how often $A$ happened among them. Example: of 3 spam emails, 2 have a link, so $P(\text{link} \mid \text{spam}) = 2/3$.

**What $P(A \cap B)$ means.** The symbol $\cap$ means "and". $P(A \cap B)$ is the probability that $A$ and $B$ both happen. Example: 2 of 6 emails are spam **and** have a link, so $P(\text{spam} \cap \text{link}) = 2/6$.

**Conditional probability rule.** "Given $B$" means we divide by how often $B$ happens:
$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$
With the emails: $P(\text{link} \mid \text{spam}) = \frac{2/6}{3/6} = \frac23$. This matches the direct count above.

**Independence.** Two events are independent if knowing one tells you nothing about the other. Then $P(A \cap B) = P(A) \times P(B)$. Example: two fair coin tosses: $P(\text{both heads}) = \frac12 \times \frac12 = \frac14$.

**Product symbol $\prod$.** $\prod_{j=1}^{3} a_j$ means "multiply $a_1 \times a_2 \times a_3$". It is like $\sum$ (add up), but for multiplying. Example: $\prod_{j=1}^{3} j = 1 \times 2 \times 3 = 6$.

**$\arg\max$.** $\max$ gives the biggest value. $\arg\max$ gives **which choice** gives the biggest value. Example: scores spam = 0.3, ham = 0.1. Then $\max = 0.3$, but $\arg\max = \text{spam}$.

### Intuition
A doctor sees a patient with fever and cough. She thinks: "How common is flu? And among flu patients, how often do I see fever? And cough?" She multiplies these numbers for flu, then does the same for a cold.

Whichever product is larger is her guess.

The "naive" part: she treats fever and cough as unrelated **once she knows the disease**. In real life they may be linked, but this shortcut makes counting easy and still works well. Spam filters were built this way for years.

> **Intuition:** Score of a class = (how common the class is) $\times$ (how typical each feature is for that class). Biggest score wins.

Naive Bayes learns how the features are produced inside each class, $P(x \mid y)$. A model that describes how the data is generated is called **generative**.

### Words you need
- **Prior, $P(y)$**: how common a class is before looking at features. Example: 3 of 6 emails are spam, so $P(\text{spam}) = 0.5$.
- **Likelihood, $P(x \mid y)$**: how likely the features are inside class $y$. Read "$\mid$" as "given". Example: $P(\text{has "free"} \mid \text{spam}) = 1$.
- **Posterior, $P(y \mid x)$**: probability of the class after seeing the features. Example: $P(\text{spam} \mid \text{email}) = 6/7$.
- **Evidence, $P(x)$**: total probability of the features; same for every class.
- **Conditional independence**: inside one class, knowing one feature tells nothing about another.
- **Laplace smoothing**: add 1 to every count so no probability becomes exactly 0.
- **Parameter**: one number the model must learn from data. Example: $P(\text{link} \mid \text{spam}) = 2/3$ is one parameter.
- **Generative vs discriminative**: generative models learn $P(x \mid y)$ and $P(y)$ (Naive Bayes, LDA); discriminative models learn $P(y \mid x)$ or the boundary directly (logistic regression, SVM).

### Formulas, explained

**Bayes' theorem for classification**
$$P(y \mid x) = \frac{P(x \mid y)\, P(y)}{P(x)}$$
- **Read it as:** probability of class given features = likelihood times prior, divided by evidence.
- **Symbols:** $y$ = class; $x$ = feature vector (the list of all feature values).
- **Why it makes sense:** we turn "how features look in a class" into "which class fits these features".
- **Use it when:** you need an actual posterior probability.

**Evidence (bottom of Bayes)**
$$P(x) = \sum_{y} P(x \mid y)\, P(y)$$
- **Read it as:** add up the score (likelihood times prior) of every class.
- **Symbols:** $\sum_y$ = add over all classes.
- **Why it makes sense:** $x$ must come from some class, so we add the ways it can happen.
- **Use it when:** you turn scores into posteriors that add to 1.

**Naive Bayes rule**
$$\hat y = \arg\max_{y} \; P(y) \prod_{j=1}^{K} P(x_j \mid y)$$
- **Read it as:** choose the class that makes (prior times product of each feature's likelihood) largest.
- **Symbols:** $\arg\max_y$ = "the $y$ that gives the maximum"; $\prod$ = multiply; $K$ = number of features; $x_j$ = feature number $j$.
- **Why it makes sense:** $P(x)$ is the same for all classes, so we can skip it when we only compare.
- **Use it when:** "which class is predicted".

**Laplace (add-one) smoothing for a binary feature**
$$P(x_j = 1 \mid y) = \frac{\text{count}(x_j = 1, y) + 1}{\text{count}(y) + 2}$$
- **Read it as:** (times the feature was 1 in class $y$, plus 1) over (size of class $y$, plus 2).
- **Symbols:** "+2" because a binary feature has 2 possible values (0 and 1).
- **Why it makes sense:** one unseen value should not make the whole product 0.
- **Use it when:** a count is zero, or the question says "Laplace" or "add-one".

**Number of parameters (two classes, $K$ binary features)**
$$\text{parameters} = 1 + 2K$$
- **Read it as:** one prior number, plus one number per feature per class.
- **Symbols:** $P(y=1)$ is 1 number (the other prior is $1$ minus it). Each $P(x_j = 1 \mid y)$ is one number, for $K$ features and 2 classes.
- **Why it makes sense:** without the naive assumption we would need $2 \times (2^K - 1) + 1$ numbers.
- **Use it when:** "how many parameters". For $C$ classes: $(C - 1) + CK$.

**Probability of misclassifying $x$**
$$P(\text{error} \mid x) = 1 - \max_y P(y \mid x)$$
- **Read it as:** we are wrong whenever the true class is not the one we picked.
- **Why it makes sense:** we pick the largest posterior; the rest of the probability is our error.
- **Use it when:** "probability of misclassification".

### Where the formulas come from

**1. Bayes' theorem, from the "given" rule.**

Take the 6 emails of Example 1 below: 3 spam, and 2 of the spam emails have a link. Also 1 ham email has a link, so 3 emails have a link in total.

1. Count directly: among the 3 link emails, 2 are spam. So $P(\text{spam} \mid \text{link}) = 2/3$.
2. Write "spam and link" in two ways. From the "given" rule, $P(\text{spam} \cap \text{link}) = P(\text{link} \mid \text{spam}) \, P(\text{spam})$. Because "given $B$" means divide by $P(B)$, so multiplying back by $P(B)$ undoes it.
3. With numbers: $P(\text{link} \mid \text{spam}) \, P(\text{spam}) = \frac23 \times \frac36 = \frac26$. This is 2 of 6 emails, which is right.
4. Also, by the same rule, $P(\text{spam} \mid \text{link}) = \frac{P(\text{spam} \cap \text{link})}{P(\text{link})} = \frac{2/6}{3/6} = \frac23$. It matches step 1.
5. Now replace "spam" by $y$ and "link" by $x$. Put step 2 inside step 4:
$$P(y \mid x) = \frac{P(y \cap x)}{P(x)} = \frac{P(x \mid y)\, P(y)}{P(x)}$$
6. This is Bayes' theorem. It is only the "given" rule used twice, because "$x$ and $y$" is the same event as "$y$ and $x$".

**2. The evidence $P(x)$, by adding over classes.**

1. Every email with a link is either spam-with-link or ham-with-link. These two groups do not overlap. So $P(\text{link}) = P(\text{spam} \cap \text{link}) + P(\text{ham} \cap \text{link})$.
2. Write each part as likelihood times prior (step 2 above): $P(\text{link}) = \frac23 \cdot \frac12 + \frac13 \cdot \frac12 = \frac13 + \frac16 = \frac12$.
3. Check by counting: 3 of 6 emails have a link, which is $\frac12$. Correct.
4. In symbols: $P(x) = \sum_y P(x \mid y)\, P(y)$. This is called the **law of total probability**.
5. So the posterior is just "my class score divided by the total of all class scores". That is why posteriors always add to 1.

**3. The naive product, from independence.**

1. An email has many features, like free = 1 and link = 1. So $x = (x_1, x_2)$, and we need $P(x_1, x_2 \mid y)$.
2. Counting all combinations is hard. With $K$ binary features there are $2^K$ combinations. With 30 features that is over a billion, and most never appear in the data.
3. So we **assume** that inside one class, the features are independent. Then the "and" becomes a product, because independent events multiply: $P(x_1, x_2 \mid y) = P(x_1 \mid y) \times P(x_2 \mid y)$.
4. For $K$ features this gives $P(x \mid y) = \prod_{j=1}^{K} P(x_j \mid y)$.
5. Put this in Bayes: $P(y \mid x) = \frac{P(y) \prod_j P(x_j \mid y)}{P(x)}$.
6. The bottom $P(x)$ is the same number for every class. Dividing every score by the same positive number does not change which score is biggest. So we drop it and take $\arg\max$ of the top. That gives the Naive Bayes rule.

**4. Laplace smoothing, from "imaginary examples".**

1. Suppose a class has 3 emails and "free = 0" never appears in it. Then $P(\text{free} = 0 \mid \text{spam}) = 0/3 = 0$.
2. In a product, one zero makes the whole score zero, because anything times 0 is 0. So one missing value can kill a class, even if all other features agree.
3. Fix: pretend we saw **one extra example of each value**. A binary feature has 2 values, so we add 2 imaginary examples: one with value 0, one with value 1.
4. The count of each value goes up by 1, and the class size goes up by 2. So $P = \frac{0 + 1}{3 + 2} = \frac15$.
5. The probabilities still add to 1: $\frac{0+1}{5} + \frac{3+1}{5} = \frac{5}{5}$. Good.
6. General rule: if a feature has $V$ possible values, add 1 on top and $V$ at the bottom. Binary features have $V = 2$, so "+2".

**5. Counting parameters.**

1. Prior: two classes, $P(\text{spam}) + P(\text{ham}) = 1$. If we know one, we know the other. So the prior needs **1** number.
2. Each binary feature in each class: $P(x_j = 1 \mid y)$ is one number. $P(x_j = 0 \mid y) = 1 - P(x_j = 1 \mid y)$ is free.
3. There are $K$ features and 2 classes, so $2K$ numbers.
4. Total $= 1 + 2K$. Example: $K = 3$ gives $7$.
5. For $C$ classes the prior needs $C - 1$ numbers (the last one is "1 minus the rest"). The features need $CK$. Total $(C-1) + CK$.
6. Without the naive assumption: each class needs a probability for each of the $2^K$ combinations, minus 1 because they add to 1. That is $2(2^K - 1)$ numbers, plus 1 for the prior. For $K = 3$: $2 \times 7 + 1 = 15$, versus 7 with Naive Bayes.

**6. The error formula.**

1. Suppose posteriors are $P(y_1 \mid x) = 0.6$ and $P(y_2 \mid x) = 0.4$.
2. We predict $y_1$ because it is larger.
3. We are right with probability $0.6$ and wrong with probability $1 - 0.6 = 0.4$, because the two posteriors add to 1.
4. In general: error $= 1 - \max_y P(y \mid x)$. Picking the biggest posterior gives the smallest possible error, so this is the best any classifier can do with these probabilities.

### Examples

**Example 1 (easy): a 6-email spam filter.** Features: contains "free" (1/0), contains a link (1/0).

| Email | free | link | Class |
|---|---|---|---|
| 1 | 1 | 1 | spam |
| 2 | 1 | 0 | spam |
| 3 | 1 | 1 | spam |
| 4 | 0 | 1 | ham |
| 5 | 0 | 0 | ham |
| 6 | 1 | 0 | ham |

("Ham" means a normal email.) New email: free = 1, link = 1.

1. Priors: $P(\text{spam}) = 3/6 = 1/2$, $P(\text{ham}) = 3/6 = 1/2$.
2. Spam likelihoods (count inside the 3 spam emails): "free" = 1 in emails 1, 2, 3, so $3/3 = 1$. Link = 1 in emails 1, 3, so $2/3$.
3. Ham likelihoods: "free" = 1 in email 6, so $1/3$. Link = 1 in email 4, so $1/3$.
4. Spam score $= \frac12 \times 1 \times \frac23 = \frac13$.
5. Ham score $= \frac12 \times \frac13 \times \frac13 = \frac{1}{18}$.
6. Normalise (divide by the total of scores): $P(\text{spam} \mid x) = \frac{1/3}{1/3 + 1/18} = \frac{6/18}{7/18} = \frac67 \approx 0.857$.

**Result:** predict **spam**, with posterior $6/7 \approx 0.857$.

**Example 2 (medium): the zero problem and Laplace smoothing.** Same table. New email: free = 0, link = 1.

1. Without smoothing: $P(\text{free}=0 \mid \text{spam}) = 0/3 = 0$, so the spam score is 0. One unseen value kills the class. That is too extreme.
2. With add-one smoothing, each class has 3 emails, so divide by $3 + 2 = 5$.
3. Spam: $P(\text{free}=0) = (0+1)/5 = 1/5$. $P(\text{link}=1) = (2+1)/5 = 3/5$.
4. Ham: $P(\text{free}=0) = (2+1)/5 = 3/5$. $P(\text{link}=1) = (1+1)/5 = 2/5$.
5. Spam score $= \frac12 \times \frac15 \times \frac35 = \frac{3}{50} = 0.06$.
6. Ham score $= \frac12 \times \frac35 \times \frac25 = \frac{6}{50} = 0.12$.
7. $P(\text{spam} \mid x) = 0.06 / (0.06 + 0.12) = 1/3$.

**Result:** predict **ham**; $P(\text{spam} \mid x) = 1/3$.

**Example 3 (GATE level).** Two classes with $P(y_1) = 0.4$, $P(y_2) = 0.6$. For a feature vector $x$: $P(x \mid y_1) = 0.5$, $P(x \mid y_2) = 0.2$. Find the probability that the Bayes classifier misclassifies $x$.

1. Score $y_1$: $0.5 \times 0.4 = 0.20$. Score $y_2$: $0.2 \times 0.6 = 0.12$.
2. Evidence: $P(x) = 0.20 + 0.12 = 0.32$.
3. $P(y_1 \mid x) = 0.20/0.32 = 0.625$. $P(y_2 \mid x) = 0.12/0.32 = 0.375$.
4. Predict $y_1$ (larger). We are wrong if the truth is $y_2$.

**Result:** error $= 1 - 0.625 = 0.375 \approx 0.38$.

### Common mistakes
> **Common mistake:** Comparing likelihoods only and forgetting the prior. Always multiply by $P(y)$.

> **Common mistake:** Giving the posterior of the chosen class as the error. Error is $1 -$ (largest posterior).

> **Common mistake:** Counting 2 parameters for the prior. With two classes, one number is enough. Answer is $2K + 1$, not $2K + 2$.

> **Common mistake:** Calling Naive Bayes discriminative. It is **generative**.

> **Common mistake:** Adding only 1 to the bottom in Laplace smoothing. Add the number of possible values (2 for a binary feature).

### How GATE asks it
- **2024 Q.18** (MCQ, 1 mark): match PCA, Naive Bayes, logistic regression with dimensionality reduction, generative, discriminative.
- **2024 Q.20** (MCQ, 1 mark): parameters for $K$ binary features, 2 classes: $2K + 1$.
- **2025 Q.35** (NAT, 1 mark): priors $1/3, 2/3$, likelihoods $3/4, 1/4$; misclassification probability $0.4$.
- Expect: small posterior computations from a table, parameter counting, generative vs discriminative.

> **GATE tip:** Write fractions over a common denominator (like twelfths). Posteriors then come out as simple ratios.

### Summary
- First we want $P(\text{class} \mid \text{features})$, but data tells us the reverse: how features look inside each class.
- Bayes' theorem flips it: posterior = likelihood $\times$ prior $/$ evidence. It is just the "given" rule used twice.
- Counting every feature combination is impossible, so we assume features are independent inside a class. Then the likelihood is a simple product.
- The evidence is the same for all classes, so to pick a class we only compare prior $\times$ product.
- A zero count would kill a class, so Laplace smoothing adds imaginary examples.
- That is why Naive Bayes needs only $1 + 2K$ numbers and is fast to train.
- Next topic builds on this: Linear Discriminant Analysis, another generative model that uses Bayes with Gaussian (bell-curve) likelihoods.

### Quick self-check
1. Three classes, 4 binary features. How many Naive Bayes parameters?

**Answer:** $(3 - 1) + 3 \times 4 = 14$.

2. Scores (prior times likelihood) are 0.1 and 0.3. Posterior of the second class?

**Answer:** $0.3 / 0.4 = 0.75$.

3. A class has 8 examples; a binary feature is 1 in 0 of them. Smoothed $P(x = 1 \mid y)$?

**Answer:** $(0 + 1)/(8 + 2) = 0.1$.

4. Why can we drop $P(x)$ when choosing the class?

**Answer:** It is the same positive number for every class, so dividing by it does not change which score is largest.

## Linear Discriminant Analysis

### The big idea
**Linear Discriminant Analysis (LDA)** finds a direction to look at the data so that the two classes are **far apart** and each class is **tightly packed**.

It then separates the classes with a straight line (a linear boundary).

### Before you start
**Vectors.** A vector is a list of numbers, like a point $x = (4, 3)$. We usually write it as a column. Each number is one feature. (See subject: Linear Algebra, topic: Vectors.)

**Mean of points.** Add the points coordinate by coordinate and divide by how many there are. Example: mean of $(0,0)$ and $(4,2)$ is $\left(\frac{0+4}{2}, \frac{0+2}{2}\right) = (2, 1)$.

**Dot product.** $u^\top x$ means multiply matching numbers and add. Example: $u = (1, 2)$, $x = (4, 3)$ gives $u^\top x = 1 \cdot 4 + 2 \cdot 3 = 10$. The symbol $^\top$ (transpose) turns a column into a row so the multiplication fits.

**Projection.** If $u$ is a direction, the single number $u^\top x$ tells "how far $x$ goes along $u$". Example: $u = (0, 1)$ (straight up), $x = (4, 3)$ gives 3, which is the height of the point. Projecting turns a 2-D point into a 1-D number, like the shadow of the point on a line.

**Length squared $\lVert x \rVert^2$.** It is $x^\top x$, the sum of squares of the entries. Example: $\lVert (3, 4) \rVert^2 = 9 + 16 = 25$. The squared distance between two points $a, b$ is $\lVert a - b \rVert^2$.

**Outer product.** $v v^\top$ is a column times a row, which gives a matrix. Example: $v = (2, 3)$ gives $\begin{bmatrix} 4 & 6 \\ 6 & 9 \end{bmatrix}$ (entry in row $i$, column $j$ is $v_i v_j$).

**Matrix inverse.** $A^{-1}$ undoes $A$, like dividing by a number. For a diagonal matrix, just flip each diagonal entry: $\begin{bmatrix} 4 & 0 \\ 0 & 2 \end{bmatrix}^{-1} = \begin{bmatrix} 1/4 & 0 \\ 0 & 1/2 \end{bmatrix}$.

**Eigenvector.** A direction $v$ that a matrix $A$ only stretches, never turns: $Av = \lambda v$. The stretch factor $\lambda$ is the eigenvalue. Example: $\begin{bmatrix} 2 & 0 \\ 0 & 5 \end{bmatrix}$ times $(0, 1)$ gives $(0, 5) = 5 \times (0, 1)$. (See subject: Linear Algebra, topic: Eigenvalues and Eigenvectors.)

**Variance and spread.** Variance measures how far numbers are from their mean, using squared gaps. (See subject: Probability and Statistics, topic: Mean and Variance.) Here we use **scatter**: the sum of squared gaps, without dividing by $n$.

### Intuition
Two groups of students stand in a playground: class 10 students and class 12 students. You take a photo from one side. From some angles the two groups overlap in the photo.

From the best angle, the groups look well separated. LDA finds that best camera angle.

"Far apart" alone is not enough. Suppose each group is spread very wide in the left-right direction. Then even if their centres differ left-right, they still overlap.

LDA prefers a direction where the centres differ **and** the groups are narrow.

> **Intuition:** LDA maximises "signal over noise": (distance between class centres)$^2$ divided by (spread inside the classes).

LDA is supervised: it uses the labels. (PCA does not use labels.) LDA can be used to **classify** and also for **feature extraction** (reduce dimensions while keeping classes apart).

### Words you need
- **Class mean, $\mu$**: the centre of one class. Example: mean of $(0,0)$ and $(4,0)$ is $(2,0)$.
- **Projection**: squash a point onto a direction; the result is one number $u^\top x$. Example: $u = (0, 1)$, $x = (4, 3)$ gives 3.
- **Within-class scatter, $S_W$**: how spread out each class is around its own mean, added over classes.
- **Between-class scatter, $S_B$**: how far apart the class means are. For two classes, $S_B = (\mu_1 - \mu_2)(\mu_1 - \mu_2)^\top$.
- **Fisher criterion, $J(u)$**: the score of a direction (bigger is better).
- **Eigenvector**: a direction that a matrix only stretches, never turns.
- **Linear boundary**: a separating line (or flat plane) of the form $w^\top x + b = 0$.

### Formulas, explained

**Fisher criterion**
$$J(u) = \frac{u^\top S_B u}{u^\top S_W u}$$
- **Read it as:** between-class spread along $u$, divided by within-class spread along $u$.
- **Symbols:** $u$ = direction; $S_B$, $S_W$ = scatter matrices ($d \times d$, where $d$ = number of features).
- **Why it makes sense:** top big = centres far apart; bottom small = classes tight.
- **Use it when:** comparing directions, or the question shows this ratio.

**Scatter of one class**
$$S_k = \sum_{x \in \text{class } k} (x - \mu_k)(x - \mu_k)^\top$$
$$S_W = S_1 + S_2$$
- **Read it as:** for every point, multiply its deviation by itself (as an outer product), and add.
- **Symbols:** $(x - \mu_k)$ = deviation, a column vector; times its transpose gives a $d \times d$ matrix.
- **Why it makes sense:** it is a covariance matrix without dividing by $n$.
- **Use it when:** computing the LDA direction by hand.

**Best direction (two classes)**
$$u^* \propto S_W^{-1}(\mu_1 - \mu_2)$$
$$\text{in general:} \quad S_W^{-1} S_B u^* = \lambda u^*$$
- **Read it as:** best direction is proportional to (inverse within-scatter) times (difference of means). In general it is the top eigenvector of $S_W^{-1} S_B$, and the eigenvalue $\lambda$ equals the best $J$.
- **Symbols:** $\propto$ = "proportional to" (length does not matter, only direction).
- **Why it makes sense:** $S_W^{-1}$ shrinks directions where classes are widely spread, so the answer turns away from noisy directions.
- **Use it when:** "which equation does $u^*$ satisfy" or "find the LDA direction".

**Nearest-class-mean rule is linear**
$$\lVert \mu_r - x \rVert^2 - \lVert \mu_g - x \rVert^2 = 2(\mu_g - \mu_r)^\top x + \lVert \mu_r \rVert^2 - \lVert \mu_g \rVert^2$$
- **Read it as:** the difference of the two squared distances is a straight-line function $w^\top x + b$.
- **Symbols:** $\mu_r, \mu_g$ = means of red and green classes.
- **Why it makes sense:** both squared distances contain $\lVert x \rVert^2$; it cancels, so no square term remains.
- **Use it when:** "is this classifier linear or quadratic".

### Where the formulas come from

**1. The Fisher score in 1-D (numbers only).**

1. Suppose after projecting, class A sits at 1, 2, 3 and class B at 7, 8, 9.
2. Signal: the gap between the means is $8 - 2 = 6$. We square it, $36$, so the sign does not matter.
3. Noise: scatter of A is $(1-2)^2 + (2-2)^2 + (3-2)^2 = 2$. Scatter of B is also 2. Total $4$.
4. Score $= \frac{36}{4} = 9$. A big gap with small spread gives a big score.
5. In symbols, with projected means $m_1, m_2$ and projected scatters $s_1^2, s_2^2$:
$$J = \frac{(m_1 - m_2)^2}{s_1^2 + s_2^2}$$

**2. From 1-D to matrices (where $S_B$ and $S_W$ come from).**

1. Project with direction $u$. A point $x$ becomes the number $u^\top x$.
2. The projected mean is $m_k = u^\top \mu_k$. Because the mean of $u^\top x$ is $u^\top$ (mean of $x$): projection is multiply-and-add, and averaging can be done before or after.
3. Top of $J$: $(m_1 - m_2)^2 = \left(u^\top(\mu_1 - \mu_2)\right)^2$.
4. A number squared is the number times itself. Write it as $u^\top(\mu_1 - \mu_2) \cdot (\mu_1 - \mu_2)^\top u$, because $u^\top v = v^\top u$ for a dot product.
5. So the top $= u^\top \left[(\mu_1 - \mu_2)(\mu_1 - \mu_2)^\top\right] u = u^\top S_B u$. The bracket is exactly $S_B$.
6. Bottom: one point's projected gap is $u^\top(x - \mu_k)$. Its square is $u^\top (x - \mu_k)(x - \mu_k)^\top u$, by the same trick as step 4.
7. Add over all points of class $k$: $s_k^2 = u^\top S_k u$. Add both classes: $s_1^2 + s_2^2 = u^\top S_W u$.
8. Put steps 5 and 7 together: $J(u) = \frac{u^\top S_B u}{u^\top S_W u}$. This is the 1-D score of part 1, written for every possible direction at once.

**3. The best direction.**

1. We want the $u$ that makes $J(u)$ largest. At a maximum the slope (derivative) is zero, like at the top of a hill. (See subject: Calculus, topic: Maxima and Minima.)
2. A fact from matrix calculus: the derivative of $u^\top A u$ with respect to $u$ is $2Au$, when $A$ is symmetric. In 1-D this is the familiar rule: derivative of $a u^2$ is $2au$. The full matrix proof is not needed for GATE.
3. Use the quotient rule (derivative of $\frac{f}{g}$ is $\frac{f'g - fg'}{g^2}$) and set the top to zero:
$$2 S_B u \,(u^\top S_W u) - (u^\top S_B u)\, 2 S_W u = 0$$
4. Divide by $2\, u^\top S_W u$, a positive number. The ratio $\frac{u^\top S_B u}{u^\top S_W u}$ is just $J$, call it $\lambda$:
$$S_B u = \lambda S_W u$$
5. Multiply both sides on the left by $S_W^{-1}$: $S_W^{-1} S_B u = \lambda u$. This is an eigenvector equation, and $\lambda = J$. So the best $u$ is the eigenvector with the **largest** eigenvalue.
6. Two-class shortcut. $S_B u = (\mu_1 - \mu_2)\left[(\mu_1 - \mu_2)^\top u\right]$. The bracket is just a number. So $S_B u$ always points along $(\mu_1 - \mu_2)$.
7. Then step 4 says $S_W u$ points along $(\mu_1 - \mu_2)$. Multiply by $S_W^{-1}$: $u \propto S_W^{-1}(\mu_1 - \mu_2)$. We ignore length, because only the direction matters for $J$ (doubling $u$ multiplies top and bottom by 4).
8. Special case: if $S_W = I$ (round classes), then $u \propto \mu_1 - \mu_2$. So "join the means" is the right answer only for round classes.

**4. Why the nearest-mean rule is linear.**

1. Take $\mu_r = (1, 0)$, $\mu_g = (3, 2)$, $x = (2, 0)$. Squared distances are $1$ and $5$, so the difference is $-4$.
2. Expand a squared distance, because $\lVert a - b \rVert^2 = (a - b)^\top (a - b)$ multiplies out like $(a - b)^2 = a^2 - 2ab + b^2$:
$$\lVert \mu - x \rVert^2 = \lVert \mu \rVert^2 - 2\mu^\top x + \lVert x \rVert^2$$
3. Write this for red and for green and subtract. The $\lVert x \rVert^2$ appears in both, so it cancels.
4. What is left: $-2\mu_r^\top x + 2\mu_g^\top x + \lVert \mu_r \rVert^2 - \lVert \mu_g \rVert^2 = 2(\mu_g - \mu_r)^\top x + \lVert \mu_r \rVert^2 - \lVert \mu_g \rVert^2$.
5. Check with numbers: $2(2, 2)^\top(2, 0) + 1 - 13 = 8 - 12 = -4$. Same as step 1.
6. It has the form $w^\top x + b$, which is a straight line. So the boundary $f(x) = 0$ is a line, exactly halfway between the means and at right angles to $\mu_g - \mu_r$.

### Examples

**Example 1 (easy): 1-D Fisher score.** Compare two directions using the projected values.

1. Direction 1: class A at 1, 2, 3; class B at 7, 8, 9. Means 2 and 8.
2. Scatter A $= 1 + 0 + 1 = 2$, scatter B $= 2$. $J = (8-2)^2/(2+2) = 36/4 = 9$.
3. Direction 2: A at 1, 4, 7; B at 5, 8, 11. Means 4 and 8.
4. Scatter A $= 9 + 0 + 9 = 18$, B $= 18$. $J = 16/36 \approx 0.44$.

**Result:** the first direction ($J = 9$) is much better than the second ($J \approx 0.44$).

**Example 2 (medium): full LDA on 8 points.**
Class A: $(0,0), (4,0), (0,1), (4,1)$. Class B: $(2,3), (6,3), (2,4), (6,4)$.

1. Means: $\mu_A = (8/4, 2/4) = (2, 0.5)$. $\mu_B = (16/4, 14/4) = (4, 3.5)$.
2. Deviations of A from its mean: $(-2,-0.5), (2,-0.5), (-2,0.5), (2,0.5)$.
3. Scatter of A, entry by entry: $xx$ part $= 4 + 4 + 4 + 4 = 16$; $yy$ part $= 0.25 \times 4 = 1$; $xy$ part $= 1 - 1 - 1 + 1 = 0$. So $S_A = \begin{bmatrix} 16 & 0 \\ 0 & 1 \end{bmatrix}$.
4. Class B has the same shape, so its scatter is the same. Then $S_W = \begin{bmatrix} 32 & 0 \\ 0 & 2 \end{bmatrix}$.
5. Direction: $\mu_B - \mu_A = (2, 3)$. $S_W^{-1} = \begin{bmatrix} 1/32 & 0 \\ 0 & 1/2 \end{bmatrix}$. So $u^* = (2/32, 3/2) = (0.0625, 1.5)$. It points almost straight up.
6. Why up: classes are spread 4 units left-right but only 1 unit up-down. So LDA looks up-down, where they are tight.
7. Project with $u^\top x = 0.0625 x_1 + 1.5 x_2$. A gives $0, 0.25, 1.5, 1.75$. B gives $4.625, 4.875, 6.125, 6.375$. No overlap.
8. Projected means: A $= 0.0625(2) + 1.5(0.5) = 0.875$; B $= 0.0625(4) + 1.5(3.5) = 5.5$. Threshold midway: $(0.875 + 5.5)/2 = 3.1875$.
9. Score of LDA's $u = (0.0625, 1.5)$. Here $u^\top S_B u = (u^\top (2,3))^2$. Top $= (0.125 + 4.5)^2 \approx 21.39$; bottom $= 32(0.0625^2) + 2(1.5^2) = 0.125 + 4.5 = 4.625$; $J = 4.625$.
10. Score of $u = (2, 3)$ (just joining the means): top $= 13^2 = 169$; bottom $= 32(4) + 2(9) = 146$; $J \approx 1.16$.

**Result:** $u^* = (0.0625, 1.5)$ with $J = 4.625$, about four times better than "join the means" ($J \approx 1.16$).

**Example 3 (GATE level).** $\mu_{red} = (1, 0)$, $\mu_{green} = (3, 2)$. Rule: $f(x) = \lVert \mu_{red} - x \rVert^2 - \lVert \mu_{green} - x \rVert^2$; red if $f < 0$. Find $w$, $b$ and the label of $x = (2, 0)$.

1. $w = 2(\mu_{green} - \mu_{red}) = 2(2, 2) = (4, 4)$.
2. $b = \lVert \mu_{red} \rVert^2 - \lVert \mu_{green} \rVert^2 = 1 - (9 + 4) = -12$.
3. $f(2,0) = 4(2) + 4(0) - 12 = -4 < 0$.
4. Check directly: distance$^2$ to red $= 1^2 + 0^2 = 1$; to green $= 1^2 + 2^2 = 5$; $1 - 5 = -4$. Same.

**Result:** $w = (4, 4)$, $b = -12$, and $x = (2, 0)$ is labelled **red**.

### Common mistakes
> **Common mistake:** Writing $S_W u = \lambda S_B u$. The correct form is $S_B u = \lambda S_W u$, that is $S_W^{-1} S_B u = \lambda u$.

> **Common mistake:** Thinking the best direction is simply $\mu_1 - \mu_2$. That is true only when $S_W$ is a multiple of $I$ (round classes).

> **Common mistake:** Calling the nearest-mean rule quadratic because it has squares. The $\lVert x \rVert^2$ terms cancel; it is linear.

> **Common mistake:** Confusing LDA with PCA. LDA uses labels and separates classes; PCA ignores labels and keeps variance.

### How GATE asks it
- **2024 Q.22** (MCQ, 1 mark): maximiser of $J(u)$ satisfies $S_W^{-1} S_B u^* = \lambda u^*$.
- **2025 Q.55** (MSQ, 2 marks): nearest-class-mean rule is linear, $w = 2(\mu_g - \mu_r)$, $b = \lVert \mu_r \rVert^2 - \lVert \mu_g \rVert^2$.
- **2026 Q.23** (MSQ, 1 mark, listed under clustering): LDA matched to feature extraction.
- Expect: the eigen-equation, linear boundary facts, a tiny 2-D direction calculation.

> **GATE tip:** For the eigen-equation MCQ, remember "between on top": $S_B$ is with $\lambda$'s partner side, $S_B u = \lambda S_W u$.

### Summary
- First we squash every point onto one direction, so each point becomes a single number.
- On that line we want class means far apart (signal) and each class tight (noise). Their ratio is the Fisher score $J$.
- Writing the 1-D score with matrices gives $J(u) = \frac{u^\top S_B u}{u^\top S_W u}$.
- Setting the derivative to zero gives $S_B u = \lambda S_W u$, an eigen-equation, and $\lambda$ is the score itself.
- For two classes this simplifies to $u \propto S_W^{-1}(\mu_1 - \mu_2)$, which turns away from noisy directions.
- That is why LDA beats "just join the means", and why its boundaries are straight lines.
- Next topic builds on this: Support Vector Machines, which also find a straight-line boundary but choose it by the widest gap between classes. Later, PCA uses the same eigenvector idea without labels.

### Quick self-check
1. Is LDA supervised or unsupervised?

**Answer:** Supervised; it uses class labels.

2. $S_W = I$, $\mu_1 = (5, 1)$, $\mu_2 = (1, 1)$. LDA direction?

**Answer:** $(4, 0)$, that is, along the $x_1$ axis.

3. Projected means 3 and 7, total within scatter 8. $J$?

**Answer:** $16/8 = 2$.

4. Why does $\lVert x \rVert^2$ disappear in the nearest-mean rule?

**Answer:** It appears in both squared distances, so it cancels when we subtract them.

## Support Vector Machines

### The big idea
A **Support Vector Machine (SVM)** separates two classes with the straight line that leaves the **widest possible empty gap** (the **margin**) on both sides.

The points touching the edge of the gap are the **support vectors**.

### Before you start

**1. Dot product (see topic: Linear Algebra).** $w^\top x = w_1 x_1 + w_2 x_2 + \dots$. Example: $w = (1, 1)$, $x = (3, 3)$ gives $3 + 3 = 6$.

**2. Length of a vector, $\lVert w \rVert$.** $\lVert w \rVert = \sqrt{w_1^2 + w_2^2 + \dots}$, by Pythagoras. Example: $\lVert (3, 4) \rVert = \sqrt{9 + 16} = 5$.

Dividing a vector by its length gives a **unit vector** (length 1) pointing the same way. Example: $(3, 4)/5 = (0.6, 0.8)$.

**3. A line as an equation.** In 2-D, $w_1 x_1 + w_2 x_2 + b = 0$ is a straight line. Example: $x_1 + x_2 - 4 = 0$ passes through $(4, 0)$, $(2, 2)$ and $(0, 4)$.

Points where $w^\top x + b > 0$ are on one side; points where it is $< 0$ are on the other side. Example: $(3, 3)$ gives $3 + 3 - 4 = 2 > 0$.

**4. Perpendicular.** Two directions are perpendicular (at a right angle) when their dot product is 0. Example: $(1, 1) \cdot (1, -1) = 1 - 1 = 0$.

**5. The sign function and $\max$.** $\text{sign}(a)$ is $+1$ if $a > 0$ and $-1$ if $a < 0$. $\max(0, a)$ means "$a$ if positive, else 0". Example: $\max(0, 0.75) = 0.75$ and $\max(0, -2) = 0$.

**6. "Minimise subject to".** "Minimise $f$ subject to a rule" means: among all choices that obey the rule, find the one with the smallest $f$.

**7. Labels as $\pm 1$.** SVM codes the two classes as $y = +1$ and $y = -1$. Then "correct side" is one test: $y \times (\text{score}) > 0$.

### Intuition
Think of a road between two villages. Houses of village A are on one side, houses of village B on the other. You want to build the **widest straight road** that touches no house.

The road's centre line is the decision boundary. The houses that touch the road's edges decide where the road goes.

Move any other house a little, and the road does not change. Those edge houses are the support vectors.

> **Intuition:** Many lines can separate the classes. SVM picks the one with the most "breathing room", because a wide gap is safer for new points.

Two versions:
- **Hard margin**: no point may enter the road. Works only if the data is **linearly separable** (one straight line can split it).
- **Soft margin**: some points may enter the road or cross it, at a cost $C$ per unit of violation.

If no straight line works (like the XOR pattern), a **kernel** maps the data to more dimensions where a flat cut works.

### Words you need
- **Hyperplane**: a straight boundary $w^\top x + b = 0$. In 2-D it is a line. Example: $x_1 + x_2 - 4 = 0$.
- **$w$ (normal vector)**: arrow perpendicular to the boundary. Example: $w = (1, 1)$.
- **$b$ (bias)**: shifts the boundary. Example: $b = -4$.
- **Margin**: total width of the empty road. Example: $2\sqrt2$.
- **Support vectors**: points exactly on the road edges, $y_i(w^\top x_i + b) = 1$.
- **Linearly separable**: one straight line can split the classes. Example: XOR is **not**.
- **Labels $y_i \in \{+1, -1\}$**: the two classes coded as numbers.
- **Kernel**: a shortcut that computes dot products in a bigger feature space.

### Formulas, explained

**Decision rule**
$$\hat y = \text{sign}(w^\top x + b)$$
- **Read it as:** compute the score; positive means class $+1$, negative means class $-1$.
- **Symbols:** $w^\top x = w_1 x_1 + w_2 x_2 + \dots$.
- **Why it makes sense:** the score tells which side of the line the point is on.
- **Use it when:** classifying a point or checking training accuracy.

**Distance from a point to the boundary**
$$\text{dist}(x) = \frac{\lvert w^\top x + b \rvert}{\lVert w \rVert}$$
- **Read it as:** size of the score, divided by the length of $w$.
- **Symbols:** $\lvert \cdot \rvert$ = absolute value.
- **Why it makes sense:** the raw score grows if we double $w$ and $b$, but the line does not move; dividing by $\lVert w \rVert$ removes that effect.
- **Use it when:** a question asks how far a point is from the boundary.

**Canonical constraints**
$$y_i (w^\top x_i + b) \ge 1 \quad \text{for every training point}$$
- **Read it as:** every point is on its correct side, with score at least 1 in size.
- **Symbols:** $y_i (w^\top x_i + b)$ = "signed score"; equal to 1 exactly for support vectors.
- **Why it makes sense:** we scale $w$ and $b$ so the nearest points score exactly $\pm 1$.
- **Use it when:** finding $w$ and $b$ from support vectors; checking which points are support vectors.

**Margin**
$$\text{margin} = \frac{2}{\lVert w \rVert}$$
- **Read it as:** road width = 2 divided by the length of $w$.
- **Symbols:** $\lVert w \rVert = \sqrt{w_1^2 + w_2^2}$.
- **Why it makes sense:** the edges are the lines $w^\top x + b = +1$ and $-1$; each is $1/\lVert w \rVert$ from the centre. Maximising the margin = minimising $\lVert w \rVert$.
- **Use it when:** "the margin is ...".

**Hard-margin problem**
$$\min_{w, b} \; \tfrac12 \lVert w \rVert^2 \quad \text{subject to} \quad y_i (w^\top x_i + b) \ge 1$$
- **Read it as:** make $w$ as short as possible while keeping all points outside the road.
- **Symbols:** $\min_{w,b}$ = "find the $w$ and $b$ that make this smallest".
- **Why it makes sense:** short $w$ means a wide margin, and the rule keeps every point on its correct side.
- **Use it when:** a statement asks what SVM optimises.

**Soft margin (hinge loss)**
$$\min_{w,b} \; \tfrac12 \lVert w \rVert^2 + C \sum_i \max\left(0,\, 1 - y_i(w^\top x_i + b)\right)$$
- **Read it as:** short $w$, plus $C$ times the total amount by which points break the road rule.
- **Symbols:** $C$ = penalty strength. Large $C$ behaves like hard margin; small $C$ allows more violations and a wider road.
- **Why it makes sense:** a point with signed score $\ge 1$ costs nothing; a point inside the road or on the wrong side pays for how far it is from score 1.
- **Use it when:** hinge loss values, or the effect of changing $C$.

**Polynomial kernel**
$$K(x, z) = (x^\top z)^2$$
- **Read it as:** dot product, squared.
- **Symbols:** $\phi(x) = (x_1^2, \sqrt2 x_1 x_2, x_2^2)$ = the hidden 3-D features.
- **Why it makes sense:** in 2-D it equals $\phi(x)^\top \phi(z)$, a dot product in 3-D, without ever building $\phi$.
- **Use it when:** checking a kernel value, or explaining how SVM handles non-separable data.

### Where the formulas come from

**A. Why $w$ is perpendicular to the boundary.** Take the line $x_1 + x_2 - 4 = 0$, so $w = (1, 1)$.

1. Two points on the line: $a = (4, 0)$ and $c = (0, 4)$. The direction along the line is $a - c = (4, -4)$.
2. Dot product with $w$: $(1)(4) + (1)(-4) = 0$. Zero means perpendicular (see Before you start).
3. In general, if $a$ and $c$ are both on the line, $w^\top a + b = 0$ and $w^\top c + b = 0$. Subtract: $w^\top (a - c) = 0$. So $w$ is perpendicular to every direction along the line.

**B. Distance from a point to the line.** Use the point $x = (3, 3)$ and the same line.

1. The shortest path from the point to the line goes straight across, along $w$ (because $w$ is perpendicular to the line).
2. The unit vector along $w$ is $w / \lVert w \rVert = (1, 1)/\sqrt2$.
3. Walk back a distance $t$: we reach $x - t\, w/\lVert w \rVert$. We stop when this point is on the line: $w^\top (x - t\, w/\lVert w \rVert) + b = 0$.
4. Open the bracket: $w^\top x + b - t\, \frac{w^\top w}{\lVert w \rVert} = 0$. Since $w^\top w = \lVert w \rVert^2$, this is $w^\top x + b - t\lVert w \rVert = 0$.
5. So $t = (w^\top x + b)/\lVert w \rVert$. With numbers: $t = (3 + 3 - 4)/\sqrt2 = 2/\sqrt2 = \sqrt2 \approx 1.414$.
6. Check by geometry: the nearest point of the line to $(3, 3)$ is $(2, 2)$, and the distance is $\sqrt{1 + 1} = \sqrt2$. Same.

**C. Why we may set the nearest score to exactly 1.** The line $x_1 + x_2 - 4 = 0$ is the same as $2x_1 + 2x_2 - 8 = 0$.

1. Multiplying $w$ and $b$ by any positive number does not move the line, so $w$ and $b$ are not unique.
2. To fix one choice, we scale so that the nearest points have $\lvert w^\top x + b \rvert = 1$. Then every point obeys $y_i(w^\top x_i + b) \ge 1$.
3. Example: for the nearest point $(3, 3)$, the score with $w = (1, 1)$, $b = -4$ is 2. Divide everything by 2: $w = (0.5, 0.5)$, $b = -2$, score 1.

**D. The margin $2/\lVert w \rVert$ and why we minimise $\tfrac12 \lVert w \rVert^2$.**

1. A support vector has score exactly $\pm 1$. By part B its distance to the centre line is $1/\lVert w \rVert$.
2. The road reaches $1/\lVert w \rVert$ on each side, so the full width is $2/\lVert w \rVert$.
3. Example: $w = (0.5, 0.5)$ gives $\lVert w \rVert = \sqrt{0.5} \approx 0.707$ and margin $2/0.707 \approx 2.83$.
4. A wide margin means a small $\lVert w \rVert$. Minimising $\lVert w \rVert$ gives the same answer as minimising $\tfrac12 \lVert w \rVert^2$, because squaring keeps the order of positive numbers. The square has no square root, so it is easier, and the $\tfrac12$ cancels the 2 that appears when we take the derivative.

**E. The hinge loss.** It measures how much a point breaks the rule "signed score $\ge 1$".

1. Signed score 1.5: no break. $\max(0, 1 - 1.5) = 0$.
2. Signed score 0.25 (inside the road, correct side): break of $1 - 0.25 = 0.75$.
3. Signed score $-1$ (wrong side): break of $1 - (-1) = 2$.
4. So the loss is $\max(0, 1 - y(w^\top x + b))$. The soft-margin problem adds $C$ times these breaks to the hard-margin objective, like the "loss + penalty" idea in Ridge Regression.

**F. The kernel trick.** Take $x = (x_1, x_2)$ and $z = (z_1, z_2)$.

1. $x^\top z = x_1 z_1 + x_2 z_2$.
2. Square it with $(a + b)^2 = a^2 + 2ab + b^2$: $(x^\top z)^2 = x_1^2 z_1^2 + 2 x_1 x_2 z_1 z_2 + x_2^2 z_2^2$.
3. Split each term into an $x$-part times a $z$-part: $(x_1^2)(z_1^2) + (\sqrt2 x_1 x_2)(\sqrt2 z_1 z_2) + (x_2^2)(z_2^2)$.
4. That is the dot product of $\phi(x) = (x_1^2, \sqrt2 x_1 x_2, x_2^2)$ with $\phi(z)$. So one squared 2-D dot product equals a 3-D dot product.
5. In 3-D, a flat cut can separate patterns like "one class in the middle, the other around it", which no 2-D line can.

### Examples

**Example 1 (easy): SVM in 1-D.** Negatives at $-2, -1$; positives at $2, 3$.

1. Nearest opposite points: $-1$ and $2$. The boundary is the middle: $(-1 + 2)/2 = 0.5$.
2. Scale so that $w(2) + b = 1$ and $w(-1) + b = -1$.
3. Subtract the second equation from the first: $3w = 2$, so $w = 2/3$, and $b = 1 - 4/3 = -1/3$.
4. Margin $= 2/w = 2/(2/3) = 3$. Check: the distance from $-1$ to $2$ is 3.

**Result:** $w = 2/3$, $b = -1/3$, margin 3; support vectors $-1$ and $2$.

**Example 2 (medium): 6 points in 2-D.** Negatives: $(1,1), (0,1), (1,0)$. Positives: $(3,3), (4,3), (4,4)$.

1. Closest pair across classes: $(1,1)$ and $(3,3)$. Distance $= \sqrt{2^2 + 2^2} = 2\sqrt2 \approx 2.83$.
2. The boundary is the perpendicular bisector. Midpoint $(2, 2)$; the direction between them is $(1,1)$. So the boundary is $x_1 + x_2 = 4$, giving $w = (k, k)$ and $b = -4k$.
3. Scale with $(3,3)$: $3k + 3k - 4k = 2k = 1$, so $k = 0.5$. Then $w = (0.5, 0.5)$, $b = -2$.
4. Check every point with the signed score $y(w^\top x + b)$:

| Point | $y$ | $w^\top x + b$ | signed score |
|---|---|---|---|
| $(1,1)$ | $-1$ | $1 - 2 = -1$ | 1 (support vector) |
| $(0,1)$ | $-1$ | $0.5 - 2 = -1.5$ | 1.5 |
| $(1,0)$ | $-1$ | $-1.5$ | 1.5 |
| $(3,3)$ | $+1$ | $3 - 2 = 1$ | 1 (support vector) |
| $(4,3)$ | $+1$ | $3.5 - 2 = 1.5$ | 1.5 |
| $(4,4)$ | $+1$ | $4 - 2 = 2$ | 2 |

5. All signed scores are $\ge 1$, so the solution is valid.
6. Margin $= 2/\lVert w \rVert = 2/\sqrt{0.5} \approx 2.83 = 2\sqrt2$, the same as the gap in step 1.
7. Soft-margin check: a new positive point $(2, 2.5)$ would score $2.25 - 2 = 0.25$, so its hinge loss is $\max(0, 1 - 0.25) = 0.75$. It sits inside the road.

**Result:** $w = (0.5, 0.5)$, $b = -2$, margin $2\sqrt2$; support vectors $(1,1)$ and $(3,3)$.

**Example 3 (GATE level).** Class $+1$: $(3,0), (0,3), (3,3)$. Class $-1$: $(0,0)$. Hard-margin SVM. Find $w$, $b$, the margin and the number of support vectors.

1. Nearest positives to the origin: $(3,0)$ and $(0,3)$, on the line $x_1 + x_2 = 3$. The boundary is halfway: $x_1 + x_2 = 1.5$.
2. $w = (k, k)$. The origin must score $-1$: $b = -1$. Point $(3,0)$ must score $+1$: $3k - 1 = 1$, so $k = 2/3$.
3. $\lVert w \rVert = \sqrt{4/9 + 4/9} = \sqrt{8}/3 \approx 0.943$. Margin $= 2/0.943 \approx 2.12 = 3/\sqrt2$ (the distance from the origin to the line $x_1 + x_2 = 3$).
4. $(3,3)$ scores $4 - 1 = 3 > 1$, so it is not a support vector.
5. Kernel check (extra): $x = (1, 2)$, $z = (3, 1)$: $x^\top z = 5$, $K = 25$. $\phi(x) = (1, 2\sqrt2, 4)$, $\phi(z) = (9, 3\sqrt2, 1)$, dot $= 9 + 12 + 4 = 25$. Same.

**Result:** $w = (2/3, 2/3)$, $b = -1$, margin $\approx 2.12$; **3** support vectors: $(0,0), (3,0), (0,3)$. Training accuracy 100%.

### Common mistakes
> **Common mistake:** Choosing support vectors from only one class. A separating SVM always has support vectors from **both** classes.

> **Common mistake:** Writing margin $= 1/\lVert w \rVert$. That is the half-width. The full margin is $2/\lVert w \rVert$.

> **Common mistake:** Picking a far point (like $(2,2)$ when $(1,0), (0,1)$ are nearer) as a support vector.

> **Common mistake:** Saying hard-margin SVM may misclassify training points. If it has a solution, training accuracy is 100%.

### How GATE asks it
- **2024 Q.17** (MCQ, 1 mark): six points symmetric about the origin; support vectors are the four points on $x_1 + x_2 = \pm 1$.
- **2024 Q.53** (MSQ, 2 marks): which of four pictures are linearly separable; XOR and "one point surrounded" are not.
- **2025 Q.53** (MSQ, 2 marks): three points vs the origin; 3 support vectors, margin $\sqrt2$.
- Expect: find the boundary by geometry, scale $w$, compute $2/\lVert w \rVert$, count support vectors, separability pictures.

> **GATE tip:** Find the closest parts of the two classes first. The boundary is the perpendicular bisector between them. Then scale using $y(w^\top x + b) = 1$.

### Summary
- First we see that many lines can separate two classes, and we choose the one with the widest empty road around it.
- The vector $w$ is perpendicular to the line, so the distance of a point to the line is its score divided by $\lVert w \rVert$.
- We scale $w$ and $b$ so the nearest points score exactly $\pm 1$; these are the support vectors, and the road width becomes $2/\lVert w \rVert$.
- So "widest road" means "shortest $w$": minimise $\tfrac12 \lVert w \rVert^2$ while every point keeps signed score $\ge 1$.
- Soft margin lets points break the rule and pays $C$ times the hinge loss; kernels let a flat cut work in a bigger hidden space.
- Next topic builds on this: the "linear score $w^\top x + b$" idea is also the building block of each unit in Neural Networks / MLP.

### Quick self-check
1. $w = (3, 4)$. Margin?

**Answer:** $\lVert w \rVert = 5$, so the margin is $2/5 = 0.4$.

2. Can XOR data be separated by a hard-margin linear SVM?

**Answer:** No; it needs a kernel.

3. A point has signed score 2.5. Is it a support vector?

**Answer:** No; support vectors have signed score exactly 1.

4. Distance from $(1, 2)$ to the line $3x_1 + 4x_2 - 1 = 0$?

**Answer:** $\lvert 3 + 8 - 1 \rvert / 5 = 10/5 = 2$.

## Decision Trees & Entropy

### The big idea
A **decision tree** asks a series of questions about the features ("Is it raining?") and follows the answers down to a final label.

To choose the best question at each step, it uses **entropy** (how mixed a group is) and **information gain** (how much a question reduces that mix).

### Before you start
- **Probability as a fraction.** If 4 out of 6 days were "Yes", the fraction (probability) of Yes is $p = 4/6 = 2/3$. All the fractions of the classes add up to 1. Example: $2/3 + 1/3 = 1$. (See subject: Probability and Statistics.)

- **What a log is.** $\log_2 x$ answers: "2 to which power gives $x$?" Example: $2^3 = 8$, so $\log_2 8 = 3$. Also $2^{-1} = 1/2$, so $\log_2(1/2) = -1$.

- **Logs of fractions are negative.** For any number between 0 and 1, $\log_2$ is negative. Example: $\log_2(1/4) = -2$. That is why the entropy formula has a minus sign in front.

- **The key log rule.** $\log_2(a \times b) = \log_2 a + \log_2 b$. Example: $\log_2(2 \times 4) = \log_2 8 = 3 = 1 + 2$. Logs turn "multiply" into "add". Also $\log_2(1/p) = -\log_2 p$.

- **Your calculator.** Most calculators have only $\ln$ or $\log_{10}$. Use $\log_2 x = \dfrac{\ln x}{\ln 2}$. Example: $\log_2 3 = 1.0986/0.6931 = 1.585$.

- **The sum symbol $\sum$.** $\sum_i p_i$ means "add $p_i$ for every class $i$". Example: with $p_1 = 0.5, p_2 = 0.3, p_3 = 0.2$, the sum is $1$.

- **Weighted average.** If group A (3 items) has score 0 and group B (3 items) has score 0.918, the weighted average is $\frac36 \times 0 + \frac36 \times 0.918 = 0.459$. Bigger groups get bigger weight.

- **Set size $\lvert S \rvert$.** The bars around a set mean "how many items in it". Example: if $S$ has 6 days, $\lvert S \rvert = 6$.

### Intuition
Remember the game "20 questions"? You guess a hidden animal by asking questions. A good first question is "Does it live in water?" because it splits the possibilities into two useful groups.

A bad first question is "Is it a blue whale?" The answer is almost always "no", so you learn little.

A decision tree plays this game with data. At each step it picks the feature whose answer makes the groups most **pure** (each group mostly one class).

**Entropy** measures how mixed a group is:
- All students in a group passed: no surprise, entropy $= 0$.
- Half passed, half failed: maximum confusion, entropy $= 1$ (for two classes).

> **Intuition:** Entropy is "how surprised you will be" when you see the label. Information gain is "how much less surprised you are" after asking a question.

### Words you need
- **Node**: a point in the tree where a question is asked. The top one is the **root**.
- **Leaf**: an end point that gives a label. Example: "Play = Yes".
- **Split**: dividing data by a feature's values. Example: Sunny vs Rainy.
- **Pure node**: all examples have one class; entropy 0.
- **Entropy, $H$**: mixedness of labels, in **bits**. Example: 4 Yes, 2 No gives 0.918.
- **Information gain (IG)**: drop in entropy after a split. Example: 0.459.
- **Gini impurity**: another mixedness measure, $1 - \sum p_i^2$.
- **$\log_2$**: log to base 2. Example: $\log_2 8 = 3$, $\log_2 0.5 = -1$.
- **Bit**: the information in one fair yes/no answer (like one coin toss).

### Formulas, explained

**Entropy**
$$H(S) = -\sum_{i} p_i \log_2 p_i$$
- **Read it as:** minus the sum, over classes, of (fraction times log-base-2 of the fraction).
- **Symbols:** $S$ = a set of examples; $p_i$ = fraction of $S$ in class $i$. Use $0 \log_2 0 = 0$.
- **Why it makes sense:** $\log_2 p_i$ is negative (as $p_i < 1$), so the minus makes $H$ positive. Rare classes add more "surprise".
- **Use it when:** any entropy or information gain question.

**Information gain**
$$IG(S, A) = H(S) - \sum_{v} \frac{\lvert S_v \rvert}{\lvert S \rvert} H(S_v)$$
- **Read it as:** entropy before, minus the weighted average entropy of the groups after splitting on $A$.
- **Symbols:** $A$ = feature; $v$ = one value of $A$; $S_v$ = examples with $A = v$; $\lvert S_v \rvert$ = how many.
- **Why it makes sense:** bigger groups count more. A good feature leaves pure groups, so after-entropy is small and IG is big.
- **Use it when:** "which feature is chosen at the root" or "compute IG".

**Gini impurity**
$$G(S) = 1 - \sum_i p_i^2$$
- **Read it as:** 1 minus the sum of squared class fractions.
- **Symbols:** $p_i$ = fraction of class $i$, same as in entropy.
- **Why it makes sense:** pure node gives $1 - 1 = 0$; a 50/50 node gives $1 - 0.5 = 0.5$.
- **Use it when:** CART trees, or the question says Gini.

> **Remember:** Useful values: $\log_2(1/2) = -1$, $\log_2(1/3) = -1.585$, $\log_2(2/3) = -0.585$, $\log_2(1/4) = -2$, $\log_2(3/4) = -0.415$. $H(1/3, 2/3) = 0.918$, $H(1/4, 3/4) = 0.811$, $H(0.4, 0.6) = 0.971$, $H(0.2, 0.8) = 0.722$.

### Where the formulas come from

**Entropy: from "surprise" to the formula.**

1. Start with a fair coin. Heads has probability $1/2$. Learning the result gives you exactly 1 yes/no answer, which we call **1 bit**.
$$\text{surprise}(1/2) = 1$$

2. Now think of an event with probability $1/4$, like "two coins both heads". That is two coin results, so it carries 2 bits. Because two independent coins give $\frac12 \times \frac12 = \frac14$.
$$\text{surprise}(1/4) = 2$$

3. Probability $1/8$ (three heads) gives 3 bits. The pattern is: surprise $= \log_2(1/p)$. Because $\log_2 2 = 1$, $\log_2 4 = 2$, $\log_2 8 = 3$.
$$\text{surprise}(p) = \log_2 \frac{1}{p} = -\log_2 p$$

4. Why a log and not something else? When two independent events happen, probabilities **multiply** but we want surprises to **add**. The log is the function that turns multiply into add, because $\log_2(ab) = \log_2 a + \log_2 b$.

5. A rare label surprises us a lot; a common label surprises us little. Entropy is the **average surprise** over all labels. An average weights each value by how often it happens, so we multiply each surprise by its probability $p_i$ and add.
$$H = \sum_i p_i \times \left(-\log_2 p_i\right) = -\sum_i p_i \log_2 p_i$$

6. Check with numbers. A 50/50 group: $H = 0.5 \times 1 + 0.5 \times 1 = 1$. A pure group ($p = 1$): $H = 1 \times \log_2 1 = 0$, because $\log_2 1 = 0$ (since $2^0 = 1$).

7. Why does 50/50 give the maximum? When both classes are equally likely, you have no hint at all, so the average surprise is largest. Any lean towards one class makes the guess easier and $H$ smaller (e.g. $H(1/4, 3/4) = 0.811 < 1$).

**Information gain: before minus after.**

1. Before the question, the group $S$ has mixedness $H(S)$.

2. After asking about feature $A$, the examples fall into child groups $S_v$. Each child has its own entropy $H(S_v)$.

3. A random example lands in child $v$ with probability $\lvert S_v \rvert / \lvert S \rvert$. So the expected entropy after the split is the weighted average. Because "expected value" means weight each outcome by its probability.
$$H_{\text{after}} = \sum_v \frac{\lvert S_v \rvert}{\lvert S \rvert} H(S_v)$$

4. The gain is how much mixedness disappeared:
$$IG = H(S) - H_{\text{after}}$$

5. Example: 6 days, $H(S) = 0.918$. Children of size 3 and 3 with entropies 0 and 0.918. After $= 0.459$, so $IG = 0.459$. IG is never negative: on average, asking a question cannot make you more confused.

**Gini: the chance of a wrong random guess.**

1. Pick one example at random from the group, then pick a second one at random (with replacement).

2. The chance both are class $i$ is $p_i \times p_i = p_i^2$, because the two picks are independent.

3. The chance both have the **same** class (any class) is $\sum_i p_i^2$. So the chance they **differ** is:
$$G = 1 - \sum_i p_i^2$$

4. Example: 3 Yes, 1 No. Same class: $0.75^2 + 0.25^2 = 0.625$. Gini $= 0.375$. Gini is just a cheaper cousin of entropy (no logs). Both are 0 for a pure node and largest for a 50/50 node.

### Examples

**Example 1 (easy): entropy of small groups.**

1. 4 Yes, 0 No: $p = 1$. $H = -1 \times \log_2 1 = 0$.
2. 2 Yes, 2 No: $p = 0.5, 0.5$. $H = -0.5(-1) - 0.5(-1) = 1$.
3. 4 Yes, 2 No: $p = 2/3, 1/3$. $H = \frac23(0.585) + \frac13(1.585) = 0.390 + 0.528 = 0.918$.

**Result:** entropies are 0, 1 and 0.918.

**Example 2 (medium): building a tree on 6 days.** Should we play cricket?

| Day | Weather | Wind | Play |
|---|---|---|---|
| 1 | Sunny | Weak | Yes |
| 2 | Sunny | Strong | Yes |
| 3 | Sunny | Strong | Yes |
| 4 | Rainy | Weak | Yes |
| 5 | Rainy | Weak | No |
| 6 | Rainy | Strong | No |

1. Root entropy: 4 Yes, 2 No, so $H(S) = 0.918$.
2. Split on **Weather**. Sunny = days 1, 2, 3: all Yes, $H = 0$. Rainy = days 4, 5, 6: 1 Yes, 2 No, $H = 0.918$.
3. Weighted after $= \frac36(0) + \frac36(0.918) = 0.459$. So $IG(\text{Weather}) = 0.918 - 0.459 = 0.459$.
4. Split on **Wind**. Weak = days 1, 4, 5: 2 Yes, 1 No, $H = 0.918$. Strong = days 2, 3, 6: 2 Yes, 1 No, $H = 0.918$.
5. Weighted after $= 0.918$. So $IG(\text{Wind}) = 0.918 - 0.918 = 0$.
6. Weather has the bigger gain, so it becomes the root. The Sunny branch is pure: leaf "Yes".
7. Rainy branch (days 4, 5, 6, $H = 0.918$). Split on Wind: Weak = days 4, 5 (1 Yes, 1 No), $H = 1$. Strong = day 6 (No), $H = 0$.
8. Weighted $= \frac23(1) + \frac13(0) = 0.667$. $IG = 0.918 - 0.667 = 0.251$.
9. Gini check at the root: $1 - (\frac23)^2 - (\frac13)^2 = 1 - \frac49 - \frac19 = \frac49 \approx 0.444$.

**Result:** Sunny gives Yes; Rainy and Strong gives No; Rainy and Weak is still mixed (1 Yes, 1 No). With no features left, take a majority or tie-break.

**Example 3 (GATE level).** 8 matches. Toss won: 4 matches, team wins 3, loses 1. Toss lost: 4 matches, wins 1, loses 3. Find IG(Toss), two decimals.

1. Before: 4 wins, 4 losses. $H = 1$.
2. Toss won: $p = 3/4, 1/4$. $H = 0.75(0.415) + 0.25(2) = 0.311 + 0.5 = 0.811$.
3. Toss lost: same fractions (just swapped), so $H = 0.811$.
4. After $= \frac48(0.811) + \frac48(0.811) = 0.811$.
5. $IG = 1 - 0.811 = 0.189$.

**Result:** $IG \approx 0.19$.

### Common mistakes
> **Common mistake:** Using a simple average of child entropies. Weight each child by its size $\lvert S_v \rvert / \lvert S \rvert$.

> **Common mistake:** Using natural log instead of $\log_2$. With $\ln$ the maximum entropy is 0.693, not 1.

> **Common mistake:** Miscounting rows. Write the match numbers of each group before counting classes.

> **Common mistake:** Thinking a high-entropy split is good. We want **low** entropy after the split, that is **high** gain.

### How GATE asks it
- **2024 Q.62** (NAT, 2 marks): 10 cricket matches, IG of Pitch. Before: 4 Green, 6 Blue, $H = 0.971$. S: 3/2 split, $H = 0.971$; F: 1/4 split, $H = 0.722$; after $= 0.5(0.971) + 0.5(0.722) = 0.846$; IG $= 0.971 - 0.846 = 0.12$.
- Expect: IG or entropy NAT from a table; "which attribute is the root"; Gini vs entropy facts; deep trees overfit.

> **GATE tip:** Memorise the 4 entropy values in the Remember box. Most GATE tables use those fractions.

### Summary
- First we measure how mixed a group of labels is. Entropy is the average surprise, $-\sum p_i \log_2 p_i$: 0 for a pure group, 1 for a 50/50 group.
- Then, for each feature, we split the data and compute the weighted average entropy of the children.
- The drop from "before" to "after" is the information gain. The feature with the biggest gain becomes the question at that node.
- We repeat this inside each child until the groups are pure or no features are left.
- Gini $1 - \sum p_i^2$ is a log-free alternative that ranks splits in almost the same way.
- A tree that keeps splitting can memorise noise, so very deep trees overfit.

Next topic builds on this: Bias-Variance & Model Evaluation (why a very deep tree has low bias but high variance); random forests in ML also average many trees.

### Quick self-check
1. Entropy of 8 examples, all of one class?

**Answer:** 0, because $p = 1$ and $\log_2 1 = 0$.

2. Gini of a node with 3 Yes and 1 No?

**Answer:** $1 - (0.75^2 + 0.25^2) = 1 - 0.625 = 0.375$.

3. A split leaves both children with the same class mix as the parent. IG?

**Answer:** 0, because the after-entropy equals the before-entropy.

4. What is the surprise, in bits, of an event with probability $1/8$?

**Answer:** $\log_2 8 = 3$ bits.

## Bias-Variance & Model Evaluation

### The big idea
A model's error on new data comes from two sources. **Bias** is a mistake built into the model (too simple). **Variance** is wobbling: the model changes a lot when the training data changes (too complex).

To judge a classifier, we count its hits and misses in a **confusion matrix**. Then we compute **accuracy, precision and recall** from those counts.

### Before you start
- **Mean (average).** Add the values and divide by how many. Example: the mean of 12, 8, 14, 10 is $44/4 = 11$. (See subject: Probability and Statistics.)

- **Expected value $E[\cdot]$.** $E[X]$ is the long-run average of a quantity that changes randomly. Example: if a model trained on 4 different datasets predicts 12, 8, 14, 10, we estimate $E[\hat f] = 11$.

- **Variance.** The average squared distance from the mean. Example: for 12, 8, 14, 10 (mean 11): $(1 + 9 + 9 + 1)/4 = 5$. Big variance means the values are spread out.

- **Squaring a sum.** $(a + b)^2 = a^2 + 2ab + b^2$. Example: $(3 + 2)^2 = 9 + 12 + 4 = 25$. We use this to split the error into pieces.

- **Training data vs new data.** A model learns from the training set. What we really care about is how it does on data it has never seen (the test set). (See topic: Linear Regression for "loss" and "fitting".)

- **Fractions as rates.** "3 out of 4 sick people were caught" is the rate $3/4 = 0.75$. Every metric below is one such fraction.

### Intuition
Picture four archers shooting at a target.
- Archer 1: arrows close together, but all to the left of the centre. Low variance, **high bias**.
- Archer 2: arrows spread everywhere, but centred on the bull's eye on average. Low bias, **high variance**.
- Archer 3: spread out and off-centre. Bad at both.
- Archer 4: tight and centred. The goal.

A straight line fitted to curved data is Archer 1 (underfitting). A wiggly curve that passes through every training point is Archer 2 (overfitting).

Making a model more complex lowers bias but raises variance. This is the **bias-variance trade-off**.

> **Intuition:** Bias = "wrong on average". Variance = "unstable from one training set to another".

For classifiers, accuracy alone can fool you. If 95 of 100 patients are healthy, a model that always says "healthy" gets 95% accuracy but finds no sick person. Precision and recall look at one class at a time.

### Words you need
- **Training error / test error**: error on data used for learning / on new data.
- **Underfitting**: high bias; both errors high. Example: linear model for a parabola.
- **Overfitting**: high variance; training error low, test error high.
- **Noise, $\sigma^2$**: random scatter in the data itself. No model can remove it.
- **True positive (TP)**: actually positive, predicted positive. Example: sick and test says sick.
- **False positive (FP)**: actually negative, predicted positive (false alarm).
- **False negative (FN)**: actually positive, predicted negative (a miss).
- **True negative (TN)**: actually negative, predicted negative.
- **Confusion matrix**: a table of these four counts; rows = actual, columns = predicted.

### Formulas, explained

**Bias-variance decomposition (at one input $x$)**
$$E\left[(\hat f(x) - y)^2\right] = \text{Bias}^2 + \text{Variance} + \sigma^2$$
- **Read it as:** expected squared error = bias squared + variance + noise.
- **Symbols:** $\hat f(x)$ = model prediction (it changes with the training set); $f(x)$ = the true value; $\text{Bias} = E[\hat f(x)] - f(x)$, the average prediction minus the truth; $\text{Variance} = E[(\hat f(x) - E[\hat f(x)])^2]$; $\sigma^2$ = noise in the data that no model can remove.
- **Why it makes sense:** error comes from being off-centre (bias), from wobbling (variance), and from random noise.
- **Use it when:** a statement asks what more complexity or regularization does.

**Accuracy**
$$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$
- **Read it as:** correct predictions over all predictions.
- **Use it when:** classes are roughly balanced.

**Precision**
$$\text{Precision} = \frac{TP}{TP + FP}$$
- **Read it as:** of everything I **called** positive, the fraction that really was.
- **Why it makes sense:** high precision means few false alarms.

**Recall (sensitivity)**
$$\text{Recall} = \frac{TP}{TP + FN}$$
- **Read it as:** of all **actual** positives, the fraction I found.
- **Why it makes sense:** high recall means few misses.

**F1 score**
$$F_1 = \frac{2 \cdot P \cdot R}{P + R} = \frac{2TP}{2TP + FP + FN}$$
- **Read it as:** the harmonic mean of precision $P$ and recall $R$; it is high only if both are high.
- **Use it when:** classes are unbalanced.

> **Remember:** Precision divides by a **column** total (predicted). Recall divides by a **row** total (actual). For class X, "positive" means "X"; every class has its own precision and recall.

### Where the formulas come from

**Bias-variance: splitting the error into pieces.** First, a small example with no noise. The truth is $f = 10$; four training sets give predictions 12, 8, 14, 10.

1. Compute the average prediction: $m = E[\hat f] = 11$.

2. Write each error as two pieces: (prediction minus average) plus (average minus truth). Because adding and subtracting $m$ changes nothing.
$$\hat f - f = (\hat f - m) + (m - f)$$

3. For the prediction 14: $14 - 10 = (14 - 11) + (11 - 10) = 3 + 1$.

4. Square both sides using $(a+b)^2 = a^2 + 2ab + b^2$:
$$(\hat f - f)^2 = (\hat f - m)^2 + 2(\hat f - m)(m - f) + (m - f)^2$$

5. Now average over the training sets. The middle term vanishes, because $(m - f)$ is a fixed number and the average of $(\hat f - m)$ is $0$ (values above and below the mean cancel). Check: $1 - 3 + 3 - 1 = 0$.

6. What is left is: average of $(\hat f - m)^2$, which is the **variance**, plus $(m - f)^2$, which is **bias squared**.
$$E[(\hat f - f)^2] = \text{Variance} + \text{Bias}^2$$

7. Check with numbers: squared errors $4, 4, 16, 0$ average to $6$. Variance $= 5$, bias$^2 = 1$, and $5 + 1 = 6$.

8. Real data has noise: $y = f + \varepsilon$, where $\varepsilon$ has mean 0 and variance $\sigma^2$. Repeating the same trick adds one more piece $\sigma^2$. The cross term again vanishes, because the noise is independent of the model and averages to 0.
$$E[(\hat f - y)^2] = \text{Bias}^2 + \text{Variance} + \sigma^2$$

9. Why the trade-off? A simple model gives similar answers on every training set (small variance) but is often off-centre (big bias). A very flexible model follows each training set closely, so it is centred on average (small bias) but jumps around (big variance). The full proof of the trade-off curve is not needed for GATE; the picture of the archers is enough.

**Precision and recall: just counting.**

1. Draw the 2 by 2 table: rows = what really is, columns = what the model said.

2. Precision asks about the "said positive" **column**. That column holds $TP$ (right) and $FP$ (wrong), so the fraction right is $TP/(TP + FP)$.

3. Recall asks about the "really positive" **row**. That row holds $TP$ (found) and $FN$ (missed), so the fraction found is $TP/(TP + FN)$.

4. Accuracy uses the whole table: the correct cells ($TP$ and $TN$) over all four cells.

**F1: why the harmonic mean, and where the second form comes from.**

1. An ordinary average of $P = 1$ and $R = 0.1$ is $0.55$, which looks fine although recall is terrible. The harmonic mean $\frac{2PR}{P+R}$ gives $0.2/1.1 \approx 0.18$. It is pulled towards the smaller value, so it punishes a weak side.

2. Substitute $P = \frac{TP}{TP+FP}$ and $R = \frac{TP}{TP+FN}$. The top becomes $2PR = \dfrac{2TP^2}{(TP+FP)(TP+FN)}$.

3. The bottom becomes $P + R = \dfrac{TP(TP+FN) + TP(TP+FP)}{(TP+FP)(TP+FN)} = \dfrac{TP(2TP + FP + FN)}{(TP+FP)(TP+FN)}$, because we put both fractions over the same denominator.

4. Divide: the long denominators cancel and one $TP$ cancels.
$$F_1 = \frac{2TP}{2TP + FP + FN}$$

5. Check: $TP = 3, FP = 2, FN = 1$ gives $6/9 = 0.667$, same as $2(0.6)(0.75)/1.35$.

### Examples

**Example 1 (easy): bias and variance by hand.** True value at some $x$ is 10. We train the same model on 4 different training sets and get predictions 12, 8, 14, 10.

1. Average prediction $= (12 + 8 + 14 + 10)/4 = 44/4 = 11$.
2. Bias $= 11 - 10 = 1$, so $\text{Bias}^2 = 1$.
3. Variance $= [(12-11)^2 + (8-11)^2 + (14-11)^2 + (10-11)^2]/4 = (1 + 9 + 9 + 1)/4 = 5$.
4. Check: squared errors are $4, 4, 16, 0$; average $= 24/4 = 6 = 1 + 5$. (No noise here.)

**Result:** $\text{Bias}^2 = 1$, Variance $= 5$, expected error $= 6$.

**Example 2 (medium): a medical test on 10 people.** 4 are sick, 6 healthy. The test catches 3 sick people, misses 1, and wrongly flags 2 healthy people.

| | Pred sick | Pred healthy | Total |
|---|---|---|---|
| Actual sick | TP = 3 | FN = 1 | 4 |
| Actual healthy | FP = 2 | TN = 4 | 6 |
| Total | 5 | 5 | 10 |

1. Accuracy $= (3 + 4)/10 = 0.7$.
2. Precision $= 3/(3 + 2) = 0.6$.
3. Recall $= 3/(3 + 1) = 0.75$.
4. $F_1 = 2(0.6)(0.75)/(0.6 + 0.75) = 0.9/1.35 \approx 0.667$.

**Result:** accuracy 0.7, precision 0.6, recall 0.75, $F_1 \approx 0.667$.

**Example 3 (GATE level).** 50 emails: 15 spam, 35 ham. 12 spam are flagged as spam; 5 ham are wrongly flagged as spam. Which is true? (a) accuracy 0.84 (b) precision of spam > recall of spam (c) recall of ham $= 30/35$.

1. Spam row: TP = 12, FN = $15 - 12 = 3$. Ham row: FP = 5, TN = $35 - 5 = 30$.
2. Accuracy $= (12 + 30)/50 = 42/50 = 0.84$. So (a) is true.
3. Precision(spam) $= 12/(12 + 5) = 12/17 \approx 0.706$. Recall(spam) $= 12/15 = 0.8$. So (b) is false.
4. Recall(ham) $= 30/35 \approx 0.857$. So (c) is true. Precision(ham) $= 30/(30 + 3) = 30/33 \approx 0.909$.
5. $F_1$(spam) $= 24/(24 + 5 + 3) = 24/32 = 0.75$.

**Result:** (a) and (c) are true.

### Common mistakes
> **Common mistake:** Swapping precision and recall. Precision: "of predicted". Recall: "of actual".

> **Common mistake:** Reading the counts into the wrong cells. "6 of X's stories were classified as Y" means actual X, predicted Y: that is a miss for X and a false alarm for Y.

> **Common mistake:** Saying regularization reduces bias. It reduces **variance** and may increase bias.

> **Common mistake:** Trusting accuracy on unbalanced data. Check per-class recall.

### How GATE asks it
- **2026 Q.47** (MSQ, 2 marks): 20 stories of X, 10 of Y; 6 X called Y, 2 Y called X. Accuracy $22/30 = 11/15$; precision X $= 14/16$ > precision Y $= 8/14$; recall X $= 0.7$ < recall Y $= 0.8$.
- **2026 Q.37** (ridge question): "increase bias, reduce variance".
- Expect: confusion-matrix MSQs, F1, and statements on underfitting/overfitting.

> **GATE tip:** Always draw the 2 by 2 table with row and column totals first. Every metric is then one division.

### Summary
- First we ask why a model fails on new data. We split its expected error into bias squared, variance and noise, using the trick "add and subtract the average prediction".
- Bias is being wrong on average (too simple, underfitting). Variance is changing a lot between training sets (too complex, overfitting).
- More complexity lowers bias but raises variance, so the best model sits in the middle. Regularization moves a model towards lower variance and higher bias.
- For classifiers, we put the counts in a confusion matrix: TP, FP, FN, TN.
- Accuracy uses the whole table, precision uses the "predicted positive" column, recall uses the "actually positive" row. F1 is their harmonic mean, high only when both are high.

Next topic builds on this: Cross-Validation, which estimates the test error so we can pick the model at the sweet spot.

### Quick self-check
1. TP = 8, FP = 2, FN = 4. Precision and recall?

**Answer:** Precision $= 8/10 = 0.8$; recall $= 8/12 \approx 0.667$.

2. Training error 1%, test error 30%. Bias or variance problem?

**Answer:** High variance (overfitting).

3. Predictions 5, 7 for a true value 5. Bias?

**Answer:** Average 6, bias $= 1$.

4. Using TP = 8, FP = 2, FN = 4, find $F_1$.

**Answer:** $16/(16 + 2 + 4) = 16/22 \approx 0.727$.

## Cross-Validation

### The big idea
**Cross-validation** checks how well a model works on unseen data **without touching the test set**.

We split the training data into parts, train on some parts, and check on the left-out part. We repeat so every part gets a turn, and average the scores.

### Before you start
- **Training error is too optimistic.** A model is tested best on data it did not learn from. On its own training data it looks better than it really is (see topic: Bias-Variance & Model Evaluation). Example: a student who memorised the answers to one paper scores 100% on that same paper.

- **Mean (average).** Add the values and divide by how many. Example: errors 0.1, 0.2, 0.3, 0.2 have mean $0.8/4 = 0.2$.

- **The sum symbol $\sum$.** $\sum_{j=1}^{k} E_j$ means $E_1 + E_2 + \dots + E_k$. Example: with $k = 3$ and errors 1, 2, 3, the sum is 6.

- **Dividing into equal parts.** Splitting $n$ items into $k$ equal parts gives $n/k$ in each. Example: 900 points into 3 parts gives 300 each.

- **Counting by multiplying.** If each of 4 settings needs 5 runs, the total is $4 \times 5 = 20$ runs. (See subject: Probability, counting rule.)

- **Hyperparameter.** A setting we choose before training, not learned from data. Example: $\lambda$ in ridge regression (see topic: Ridge Regression & Regularization) or $k$ in k-NN (see topic: k-Nearest Neighbours).

### Intuition
A teacher wants to know if a student really understands, not just memorises. She has 5 practice papers. She lets the student study 4 and tests on the 5th.

Then she repeats with a different paper held back, five times in all. The average score is a fair estimate of exam performance.

Why not just test on the final test set many times? Because if you keep choosing models by looking at the test set, you slowly "learn" the test set. Then the test score is no longer honest, so the test set must stay locked until the very end.

> **Intuition:** Training data = what you study. Validation folds = mock tests to choose your strategy. Test set = the real exam, opened only once.

Common versions:
- **k-fold**: split into $k$ equal parts (folds). Train on $k - 1$, validate on 1, repeat $k$ times.
- **Leave-One-Out (LOOCV)**: k-fold with $k = n$. Each split leaves out exactly **one** point.

### Words you need
- **Training set**: data the model learns from.
- **Validation set (fold)**: data used to compare models or choose settings.
- **Test set**: data used once at the end for the final score.
- **Hyperparameter**: a setting chosen by us, not learned. Example: $k$ in k-NN, $\lambda$ in ridge.
- **Fold**: one of the $k$ equal parts. Example: 900 points, 3 folds, 300 each.
- **Split (run)**: one round of "train on these, validate on those".
- **Model selection**: picking the best hyperparameter using validation error.
- **Data leakage**: test information sneaking into training or selection.

### Formulas, explained

**k-fold CV error**
$$CV_{(k)} = \frac{1}{k} \sum_{j=1}^{k} E_j$$
- **Read it as:** cross-validation error = average of the $k$ fold errors.
- **Symbols:** $E_j$ = error on fold $j$ when the model is trained on the other $k - 1$ folds.
- **Why it makes sense:** every point is used for validation exactly once, so the estimate uses all data fairly.
- **Use it when:** combining fold errors.

**Sizes in k-fold**
$$\text{validation size} = \frac{n}{k}$$
$$\text{training size} = n - \frac{n}{k}$$
- **Read it as:** each fold has $n/k$ points; the model trains on the rest.
- **Symbols:** $n$ = number of points available for CV (test set excluded).
- **Use it when:** "how many points in each training run".

**Number of splits and trainings**
$$\text{LOOCV splits} = n$$
$$\text{trainings} = k \times (\text{number of settings tried})$$
- **Read it as:** LOOCV makes one split per point. Trying several settings multiplies the work.
- **Why it makes sense:** each setting needs its own $k$ runs.
- **Use it when:** counting splits or model fits.

### Where the formulas come from

**The CV error is just an average of honest test scores.**

1. Take 6 points and 3 folds of 2 points each. In run $j$, the model never sees fold $j$ while training. So its error $E_j$ on fold $j$ is an honest "unseen data" error, like a real exam.

2. One run alone is noisy: fold 1 might be easy by luck. So we do all 3 runs, one per fold.

3. To combine 3 numbers into one estimate, we take their mean. Because the mean balances lucky and unlucky folds.
$$CV_{(3)} = \frac{E_1 + E_2 + E_3}{3}$$

4. With $k$ folds the same idea gives the general formula, written with $\sum$:
$$CV_{(k)} = \frac{1}{k} \sum_{j=1}^{k} E_j$$

5. Note: this simple average is right when all folds have the same size. If fold sizes differ, weight each $E_j$ by its fold size (the same weighted-average idea as information gain in Decision Trees).

**Fold sizes come from equal division.**

1. We have $n$ points after removing the test set. Example: $1000 - 200 = 800$.

2. Cutting them into $k$ equal folds gives $n/k$ per fold, because "equal parts" means divide. Example: $800/4 = 200$.

3. In each run, one fold is held out and the rest trains the model. So the training size is $n - n/k$. Example: $800 - 200 = 600$.

4. As $k$ grows, the training size gets closer to $n$. That is why larger $k$ gives an estimate closer to "a model trained on all the data".

**LOOCV is k-fold with $k = n$.**

1. Put $k = n$ into the size formula: each fold has $n/n = 1$ point. So each run leaves out exactly one point.

2. There is one run per fold, so there are $n$ runs (splits). Example: 900 points give 900 splits.

3. Each run trains on $n - 1$ points, almost all the data. So LOOCV has very little bias, but it costs $n$ trainings.

**Counting trainings.**

1. One setting (one value of $\lambda$) needs $k$ trainings, one per fold.

2. Each setting is tested separately, so with $s$ settings the total is $k \times s$, by the counting rule "for each of $s$ choices do $k$ things".

3. After choosing the best setting, we usually train once more on all $n$ points. Then we use the test set exactly once.

### Examples

**Example 1 (easy): folds by hand.** 6 points $P_1 \dots P_6$, 3-fold CV.

1. Make folds: Fold 1 = $\{P_1, P_2\}$, Fold 2 = $\{P_3, P_4\}$, Fold 3 = $\{P_5, P_6\}$.
2. Run 1: train on $P_3 \dots P_6$, validate on $P_1, P_2$.
3. Run 2: train on $P_1, P_2, P_5, P_6$, validate on $P_3, P_4$.
4. Run 3: train on $P_1 \dots P_4$, validate on $P_5, P_6$.

**Result:** each run trains on $6 - 6/3 = 4$ points and checks 2. Every point is checked exactly once.

**Example 2 (medium): LOOCV with the "predict the mean" model.** Values $y = 2, 4, 6, 8$. The model predicts the mean of its training values. Compute LOOCV mean squared error.

| Left out | Training values | Prediction (mean) | Error | Squared |
|---|---|---|---|---|
| 2 | 4, 6, 8 | $18/3 = 6$ | $2 - 6 = -4$ | 16 |
| 4 | 2, 6, 8 | $16/3 \approx 5.333$ | $-1.333$ | 1.778 |
| 6 | 2, 4, 8 | $14/3 \approx 4.667$ | $1.333$ | 1.778 |
| 8 | 2, 4, 6 | $12/3 = 4$ | $4$ | 16 |

1. Leave out each point in turn (4 points, so 4 splits).
2. Predict it with the mean of the other three (third column).
3. Square each error (last column).
4. Average: $(16 + 1.778 + 1.778 + 16)/4 = 35.556/4$.

**Result:** LOOCV MSE $\approx 8.89$.

**Example 3 (GATE level).** 1200 samples. The first 200 are kept for testing. 5-fold CV chooses $\lambda$ from $\{0.01, 0.1, 1, 10\}$. Fold errors for $\lambda = 0.1$ are $0.20, 0.25, 0.15, 0.20, 0.20$; for $\lambda = 1$ they are $0.18, 0.22, 0.20, 0.16, 0.19$.

1. Data for CV: $1200 - 200 = 1000$. Each fold: $1000/5 = 200$ points. Each training run: $800$ points.
2. Trainings for selection: $5 \times 4 = 20$ (plus 1 final retrain on all 1000 with the best $\lambda$).
3. $CV(0.1) = (0.20 + 0.25 + 0.15 + 0.20 + 0.20)/5 = 1.00/5 = 0.200$.
4. $CV(1) = (0.18 + 0.22 + 0.20 + 0.16 + 0.19)/5 = 0.95/5 = 0.190$.
5. If LOOCV were used instead: $1000$ splits.

**Result:** $\lambda = 1$ has the lower CV error (assuming the other two are worse), so choose it. Only then use the 200 test samples, once.

### Common mistakes
> **Common mistake:** Counting the test samples in LOOCV. Only the data used for model selection counts: $1000 - 100 = 900$ in GATE 2026.

> **Common mistake:** Using the number of classes or features as the number of folds. They have nothing to do with it.

> **Common mistake:** Tuning on the test set. Use validation folds; touch the test set once.

> **Common mistake:** Thinking LOOCV is cheap. It needs $n$ trainings; with large $n$ it is the most expensive choice.

### How GATE asks it
- **2026 Q.12** (MCQ, 1 mark): 1000 samples, first 100 for testing, LOOCV for selection; number of splits $= 900$. Distractors: 10 (classes), 512 (features), 1000 (includes test).
- Expect: counting splits, fold sizes and trainings; averaging fold errors; where the test set may be used.

> **GATE tip:** First subtract the test set. Then LOOCV splits $= n$, k-fold splits $= k$.

### Summary
- First we lock away the test set, because looking at it while choosing a model makes its score dishonest.
- Then we cut the remaining $n$ points into $k$ equal folds of $n/k$ points each.
- Each fold takes one turn as the "mock exam" while the other $n - n/k$ points train the model. So every point is validated exactly once.
- The CV error is the average of the $k$ fold errors, and we pick the hyperparameter with the smallest CV error.
- LOOCV is the special case $k = n$: $n$ splits, nearly unbiased, but expensive. Trying $s$ settings costs $k \times s$ trainings.

Next topic builds on this: Neural Networks / MLP, where CV is used to choose settings such as the number of hidden units and the learning rate.

### Quick self-check
1. 500 training points, 10-fold CV. Size of each training run?

**Answer:** Each fold has $500/10 = 50$, so training uses $500 - 50 = 450$.

2. 300 points, LOOCV. How many splits?

**Answer:** 300.

3. 4-fold errors 0.1, 0.2, 0.3, 0.2. CV error?

**Answer:** $0.8/4 = 0.2$.

4. 5-fold CV, 3 values of $\lambda$ tried. How many trainings for selection?

**Answer:** $5 \times 3 = 15$.

## Neural Networks / MLP

### The big idea
A **neural network** is many tiny calculators (**neurons**) arranged in layers. Each neuron takes a weighted sum of its inputs, adds a bias, and passes the result through an **activation function**.

A **multi-layer perceptron (MLP)** stacks such layers one after another. It learns its weights by **gradient descent**, and the gradients come from the chain rule. This way of finding gradients is called **backpropagation**.

### Before you start
You need these earlier ideas. Each one is explained here from scratch.

**1. A function.** A function is a rule that takes an input and gives one output. Example: $f(x) = 2x + 1$ turns 3 into 7. A neuron is just a function of its inputs.

**2. The sum symbol $\sum$.** $\sum_{i=1}^{3} x_i$ means "add $x_1 + x_2 + x_3$". Example: if $x = (2, 5, 1)$, the sum is 8. The small $i=1$ below and $3$ above say where to start and stop counting.

**3. Weighted sum and dot product.** A weighted sum multiplies each input by its own weight, then adds: $w^\top x = w_1 x_1 + w_2 x_2 + \dots$. Example: $w = (1, 2)$, $x = (3, 4)$ gives $3 + 8 = 11$. This is the same $w_0 + w_1 x_1 + \dots$ you met in (see topic: Linear Regression (Simple/Multiple)).

**4. Length squared of a vector, $\lVert x \rVert^2$.** It is the dot product of a vector with itself: square every entry and add. Example: $x = (2, 1)$ gives $\lVert x \rVert^2 = 4 + 1 = 5$.

**5. The number $e$ and the sigmoid.** $e \approx 2.718$ is a fixed number, like $\pi$. $e^{-z}$ is large when $z$ is very negative and close to 0 when $z$ is very positive. So the sigmoid $\sigma(z) = 1/(1 + e^{-z})$ goes smoothly from 0 to 1 (see topic: Logistic Regression). Example: $\sigma(0) = 1/(1+1) = 0.5$.

**6. The sign function.** $\text{sign}(z)$ is $+1$ if $z > 0$ and $-1$ if $z < 0$. Each question tells you what to do when $z = 0$. Example: $\text{sign}(3) = +1$, $\text{sign}(-0.2) = -1$.

**7. Derivative (slope).** The derivative $\frac{df}{dx}$ says how fast $f$ changes when $x$ changes a tiny bit. Example: for $f(x) = x^2$, the derivative is $2x$; at $x = 3$ the slope is 6, so a tiny step of 0.01 in $x$ raises $f$ by about 0.06.

**8. Partial derivative.** When a function has many inputs, $\frac{\partial L}{\partial w_1}$ means "the slope of $L$ when only $w_1$ moves and all other inputs stay fixed". Example: $L = 3w_1 + 5w_2$ gives $\partial L/\partial w_1 = 3$.

**9. Chain rule.** If $y$ depends on $h$, and $h$ depends on $w$, then $\frac{dy}{dw} = \frac{dy}{dh} \cdot \frac{dh}{dw}$. Example: $h = 2w$ and $y = 5h$. Each unit of $w$ gives 2 units of $h$, each unit of $h$ gives 5 units of $y$, so $dy/dw = 5 \times 2 = 10$.

**10. Loss and gradient descent.** A loss measures how wrong the model is (see topic: Linear Regression (Simple/Multiple)). We change the weights to make the loss smaller.

### Intuition
Think of a school selection committee. Each teacher (neuron) looks at a few marks, gives some subjects more importance (weights), and gives a score. Only clear positives pass on (activation).

A head teacher then combines the teachers' scores into a final decision. If the final decision is wrong, the head teacher tells each teacher how much their score was to blame. Each teacher then adjusts how much importance they give to each subject. That "passing blame backwards" is backpropagation.

> **Intuition:** Forward pass = compute the answer. Backward pass = share the blame for the error, layer by layer, using the chain rule.

The simplest network is a single neuron: the **perceptron**. It outputs $\text{sign}(w^\top x + b)$. When it makes a mistake, it nudges $w$ toward the correct side.

Why layers? One neuron can only draw a straight line between classes. XOR (top-left and bottom-right corners are one class, the other two corners are the other class) cannot be split by one straight line. A hidden layer bends the boundary.

### Words you need
- **Neuron**: computes $z = w^\top x + b$, then $a = g(z)$. Example: $w = (1, 1)$, $b = -1$, $x = (2, 2)$ gives $z = 2 + 2 - 1 = 3$.
- **Activation, $g$**: the bending function. **ReLU**: $\max(0, z)$, for example $\text{ReLU}(-2) = 0$, $\text{ReLU}(3) = 3$. **Sigmoid**: $1/(1 + e^{-z})$.
- **Layer**: input layer (the features), hidden layers (in the middle), output layer (the answer).
- **Fully connected**: every neuron of one layer connects to every neuron of the next.
- **Parameters**: the learnable weights and biases.
- **Loss**: error measure. Example: $\frac12(\hat y - t)^2$, where $t$ is the target (the correct answer).
- **Learning rate, $\eta$** (read "eta"): step size for updates. Example: 0.05.
- **Epoch (pass)**: one full sweep over the training data.
- **Dead neuron**: a ReLU neuron whose input is negative, so its output is 0 and it passes no gradient back.

### Formulas, explained

**One neuron**
$$a = g(w^\top x + b)$$
- **Read it as:** output = activation of (weighted sum plus bias).
- **Symbols:** $x$ = inputs; $w$ = weights; $b$ = bias; $g$ = activation.
- **Why it makes sense:** weights say which inputs matter; the activation adds bending.
- **Use it when:** any forward pass.

**Perceptron update (only on a mistake)**
$$w_{new} = w_{old} + y_n x_n$$
$$b_{new} = b_{old} + y_n$$
- **Read it as:** if point $n$ is misclassified, add (label times point) to $w$ and add the label to $b$.
- **Symbols:** $y_n \in \{+1, -1\}$ is the true label of point $x_n$.
- **Why it makes sense:** the new score on that point is $f_{old} + y_n(\lVert x_n \rVert^2 + 1)$. For $y_n = +1$ the score goes **up**; for $-1$ it goes down. So the point moves toward its correct side.
- **Use it when:** tracing perceptron training.

**Gradient descent**
$$w \leftarrow w - \eta \frac{\partial L}{\partial w}$$
- **Read it as:** new weight = old weight minus step size times slope of the loss.
- **Symbols:** $\leftarrow$ means "replace with"; $\eta$ = learning rate.
- **Why it makes sense:** the slope points uphill; we step downhill.
- **Use it when:** any weight update after backprop.

**Chain rule (backpropagation)**
$$\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial \hat y} \cdot \frac{\partial \hat y}{\partial h} \cdot \frac{\partial h}{\partial w_1}$$
- **Read it as:** effect of $w_1$ on the loss = product of effects along the path from $w_1$ to the loss.
- **Symbols:** $h$ = hidden output; $\hat y$ = network output.
- **Why it makes sense:** a small change in $w_1$ changes $h$, which changes $\hat y$, which changes $L$; multiply the rates.
- **Use it when:** "find $\partial y / \partial a$".

**Activation derivatives**
$$\text{ReLU}'(z) = \begin{cases} 1 & z > 0 \\ 0 & z < 0 \end{cases}$$
$$\sigma'(z) = \sigma(z)\,(1 - \sigma(z))$$
- **Read it as:** ReLU passes gradient fully when active and blocks it when not. Sigmoid's slope is "output times (1 minus output)".
- **Symbols:** the dash $'$ means derivative.
- **Why it makes sense:** ReLU is a flat line (slope 0) on the left and the line $z$ (slope 1) on the right.
- **Use it when:** any backward step through an activation.

> **Remember:** A ReLU neuron with negative input passes **no** gradient. The sigmoid slope is largest at $z = 0$, where it equals $0.5 \times 0.5 = 0.25$.

**Parameter count of a fully connected layer**
$$\text{params} = n_{in} \times n_{out} + n_{out}$$
- **Read it as:** one weight per connection, plus one bias per output neuron.
- **Symbols:** $n_{in}, n_{out}$ = neurons in the two layers. Drop the $+ n_{out}$ if there are no biases.
- **Why it makes sense:** each of the $n_{out}$ neurons needs one weight for each of the $n_{in}$ inputs, plus its own bias.
- **Use it when:** counting parameters.

**Collapse of a linear path**
$$\text{effective weight of } x_i = \sum_{\text{paths}} \prod_{\text{edges on path}} w$$
- **Read it as:** if every ReLU is active, the network is linear; add, over all paths from $x_i$ to the output, the product of weights on that path.
- **Symbols:** $\prod$ means "multiply together", just as $\sum$ means "add together".
- **Why it makes sense:** an active ReLU does nothing ($\text{ReLU}(z) = z$), so we just expand the brackets.
- **Use it when:** "equivalent single neuron" questions.

### Where the formulas come from

**1. One neuron comes from linear regression.**

1. In linear regression the prediction is $w_0 + w_1 x_1 + w_2 x_2$. Example: $w = (1, 2)$, bias $0.5$, $x = (3, 4)$ gives $0.5 + 3 + 8 = 11.5$.
2. Rename $w_0$ as $b$ and write the sum as a dot product: $z = w^\top x + b$. This is the same number, only shorter notation.
3. Stacking linear steps gives only another straight line, because "a linear function of a linear function is linear" (example: $3(2x) = 6x$).
4. So we pass $z$ through a bending function $g$: $a = g(z)$. Now stacking layers can make curves.

**2. Why the perceptron update moves the point the right way.**

1. Take a point $x_n = (2, 1)$ with label $y_n = +1$, and $w = (0, 0)$, $b = 0$. Old score $f_{old} = 0$, so it is a mistake (score not positive).
2. Update: $w = (0,0) + (2,1) = (2,1)$ and $b = 0 + 1 = 1$, because the rule adds $y_n x_n$ and $y_n$.
3. New score: $2 \times 2 + 1 \times 1 + 1 = 6$. It rose by 6.
4. Now in symbols: $f_{new} = (w + y_n x_n)^\top x_n + (b + y_n)$, because we plug the new $w$ and $b$ into the score.
5. Open the bracket: $f_{new} = w^\top x_n + b + y_n(x_n^\top x_n + 1)$, because a dot product spreads over addition.
6. So $f_{new} = f_{old} + y_n(\lVert x_n \rVert^2 + 1)$, because $x_n^\top x_n = \lVert x_n \rVert^2$. Check: $\lVert (2,1) \rVert^2 + 1 = 5 + 1 = 6$. Matches step 3.
7. $\lVert x_n \rVert^2 + 1$ is always positive, so the score moves in the direction of $y_n$: up for $+1$, down for $-1$.

**3. Gradient descent comes from the meaning of slope.**

1. Take the loss $L(w) = (w - 3)^2$. Its smallest value is 0, at $w = 3$.
2. Stand at $w = 5$. The slope is $L'(w) = 2(w - 3) = 4$, positive, because the curve goes up to the right here.
3. Positive slope means "moving right makes $L$ bigger", so we should move left. Subtracting the slope does exactly that.
4. With $\eta = 0.25$: $w = 5 - 0.25 \times 4 = 4$. Loss falls from $(5-3)^2 = 4$ to $(4-3)^2 = 1$.
5. In general $w \leftarrow w - \eta \frac{\partial L}{\partial w}$. A small $\eta$ makes the step safe, because the slope is only accurate near the current point.

**4. The chain rule is "multiply the rates".**

1. Example: $h = 2w$ and $\hat y = 3h$. If $w$ rises by 0.1, $h$ rises by 0.2, and $\hat y$ rises by 0.6.
2. So $\hat y$ changes 6 times as fast as $w$: $\frac{d\hat y}{dw} = 3 \times 2 = 6 = \frac{d\hat y}{dh} \cdot \frac{dh}{dw}$.
3. A network is a long chain like $w_1 \to h \to \hat y \to L$. Each arrow has its own rate, so the total rate is the product of all rates on the path.
4. Backpropagation computes these products starting from $L$ and moving backwards. This reuses $\frac{\partial L}{\partial h}$ for every weight feeding into $h$, which saves work.

**5. The activation derivatives.**

1. ReLU: for $z > 0$, $\text{ReLU}(z) = z$, a line with slope 1. For $z < 0$, $\text{ReLU}(z) = 0$, a flat line with slope 0. That is the whole formula.
2. Sigmoid: write $\sigma(z) = (1 + e^{-z})^{-1}$.
3. By the chain rule, $\sigma'(z) = -(1 + e^{-z})^{-2} \cdot (-e^{-z}) = \frac{e^{-z}}{(1 + e^{-z})^2}$, because the derivative of $u^{-1}$ is $-u^{-2}$ and the derivative of $e^{-z}$ is $-e^{-z}$.
4. Split it: $\frac{1}{1 + e^{-z}} \cdot \frac{e^{-z}}{1 + e^{-z}}$.
5. The first factor is $\sigma(z)$. The second is $1 - \sigma(z)$, because $1 - \frac{1}{1+e^{-z}} = \frac{e^{-z}}{1+e^{-z}}$.
6. So $\sigma'(z) = \sigma(z)(1 - \sigma(z))$. At $z = 0$: $0.5 \times 0.5 = 0.25$.

**6. Parameter count.**

1. Example: a layer from 3 inputs to 2 neurons. Neuron 1 needs 3 weights, neuron 2 needs 3 weights: $3 \times 2 = 6$ weights.
2. Each neuron has 1 bias: 2 biases. Total $6 + 2 = 8$.
3. In general, $n_{out}$ neurons each need $n_{in}$ weights and 1 bias: $n_{in} \times n_{out} + n_{out}$.
4. For a whole network, add this for every pair of neighbouring layers.

**7. Collapsing a network with all ReLUs active.**

1. Take $h_1 = R(1 \cdot x_1 + 2 x_2)$, $h_2 = R(3x_1 + 1 \cdot x_2)$, $y = 2h_1 + 1 \cdot h_2$, with all inputs positive.
2. All ReLU inputs are positive, so each $R$ does nothing: $y = 2(x_1 + 2x_2) + 1(3x_1 + x_2)$.
3. Open the brackets: $y = (2 \times 1 + 1 \times 3)x_1 + (2 \times 2 + 1 \times 1)x_2 = 5x_1 + 5x_2$.
4. The coefficient of $x_1$ is "sum over paths of product of weights": path via $h_1$ gives $1 \times 2$, path via $h_2$ gives $3 \times 1$.

All seven formulas fit together: a neuron (1) makes a prediction, the loss measures it, the chain rule (4, 5) gives the slope, and gradient descent (3) uses the slope. The perceptron rule (2) is an older, simpler cousin of gradient descent.

### Examples

**Example 1 (easy): perceptron on 4 points.** Points with labels: $A = (2,2), +1$; $B = (0,1), -1$; $C = (3,1), +1$; $D = (1,0), -1$. Start $w = (0,0)$, $b = 0$. Rule: predict $+1$ if $f > 0$, else $-1$.

| Step | Point | $f = w^\top x + b$ | Predict | Correct? | New $w$, $b$ |
|---|---|---|---|---|---|
| 1 | $A$, +1 | $0$ | $-1$ | No | $w = (0,0) + (2,2) = (2,2)$, $b = 1$ |
| 2 | $B$, $-1$ | $0 + 2 + 1 = 3$ | $+1$ | No | $w = (2,2) - (0,1) = (2,1)$, $b = 0$ |
| 3 | $C$, +1 | $6 + 1 + 0 = 7$ | $+1$ | Yes | no change |
| 4 | $D$, $-1$ | $2 + 0 + 0 = 2$ | $+1$ | No | $w = (2,1) - (1,0) = (1,1)$, $b = -1$ |
| 5 | $A$, +1 | $2 + 2 - 1 = 3$ | $+1$ | Yes | |
| 6 | $B$, $-1$ | $0 + 1 - 1 = 0$ | $-1$ | Yes | |
| 7 | $C$, +1 | $3 + 1 - 1 = 3$ | $+1$ | Yes | |
| 8 | $D$, $-1$ | $1 + 0 - 1 = 0$ | $-1$ | Yes | |

1. Pass 1 (steps 1 to 4) makes three mistakes, so there are three updates.
2. On a mistake with label $-1$ (steps 2 and 4), we subtract the point and subtract 1 from $b$.
3. Pass 2 (steps 5 to 8) makes no mistakes, so training stops.

**Result:** final boundary $x_1 + x_2 - 1 = 0$, after 3 updates.

**Example 2 (medium): one backprop step.** Network: $x \to h = \text{ReLU}(w_1 x) \to \hat y = w_2 h$. Loss $L = \frac12(\hat y - t)^2$. Values: $x = 2$, $w_1 = 0.5$, $w_2 = 3$, target $t = 2$, $\eta = 0.05$.

1. Forward: $w_1 x = 0.5 \times 2 = 1$, so $h = \text{ReLU}(1) = 1$.
2. Forward: $\hat y = 3 \times 1 = 3$, and $L = \frac12(3 - 2)^2 = 0.5$.
3. Backward: $\partial L / \partial \hat y = \hat y - t = 1$, because the derivative of $\frac12 u^2$ is $u$.
4. Backward: $\partial L / \partial w_2 = 1 \times h = 1$, because $\hat y = w_2 h$ changes at rate $h$ when $w_2$ moves.
5. Backward: $\partial L / \partial h = 1 \times w_2 = 3$.
6. The ReLU input was $1 > 0$, so its derivative is 1. Then $\partial L / \partial w_1 = 3 \times 1 \times x = 3 \times 2 = 6$.
7. Update: $w_2 = 3 - 0.05 \times 1 = 2.95$ and $w_1 = 0.5 - 0.05 \times 6 = 0.2$.
8. Check: new $h = 0.2 \times 2 = 0.4$, $\hat y = 2.95 \times 0.4 = 1.18$, $L = \frac12(1.18 - 2)^2 = \frac12(0.6724) = 0.336$.

**Result:** $w_1 = 0.2$, $w_2 = 2.95$; the loss fell from 0.5 to 0.336.

**Example 3 (medium): XOR with one hidden layer.** $h_1 = \text{ReLU}(x_1 + x_2)$, $h_2 = \text{ReLU}(x_1 + x_2 - 1)$, $y = h_1 - 2h_2$.

1. $(0,0)$: $h_1 = 0$, $h_2 = \text{ReLU}(-1) = 0$, $y = 0$.
2. $(0,1)$: $h_1 = 1$, $h_2 = \text{ReLU}(0) = 0$, $y = 1$.
3. $(1,0)$: same sums as $(0,1)$, so $y = 1$.
4. $(1,1)$: $h_1 = 2$, $h_2 = 1$, $y = 2 - 2 = 0$.

**Result:** outputs $0, 1, 1, 0$. That is XOR, which no single perceptron can do.

**Example 4 (GATE level).** Inputs $u = 1$, $v = 2$. Hidden ReLU units: $h_1 = R(au + bv)$, $h_2 = R(cu + dv)$. Output $y = R(e h_1 + f h_2)$. Weights $a = 1, b = 2, c = 3, d = -2, e = 2, f = 3$. No biases. Find $\partial y/\partial a$, $\partial y/\partial c$, $\partial y/\partial f$.

1. Forward: $h_1 = R(1 + 4) = R(5) = 5$.
2. Forward: $h_2 = R(3 - 4) = R(-1) = 0$.
3. Forward: $y = R(2 \times 5 + 3 \times 0) = R(10) = 10$. The output ReLU input is $10 > 0$, so its derivative is 1.
4. $\partial y/\partial a = 1 \times e \times R'(5) \times u = 1 \times 2 \times 1 \times 1 = 2$.
5. $\partial y/\partial c = 1 \times f \times R'(-1) \times u = 3 \times 0 \times 1 = 0$, because $h_2$ is "dead".
6. $\partial y/\partial f = 1 \times h_2 = 0$, because $f$ multiplies $h_2 = 0$.
7. Bonus count: a fully connected net $10 \to 5 \to 3 \to 2$ **with** biases has $(10 \times 5 + 5) + (5 \times 3 + 3) + (3 \times 2 + 2) = 55 + 18 + 8 = 81$ parameters.

**Result:** $\partial y/\partial a = 2$, $\partial y/\partial c = 0$, $\partial y/\partial f = 0$; the bonus net has 81 parameters.

### Common mistakes
> **Common mistake:** Forgetting that ReLU blocks the gradient when its input is negative. Check the sign of every ReLU input in the forward pass first.

> **Common mistake:** Adding biases when the question says "no bias". Then parameters = connections only.

> **Common mistake:** Updating the perceptron when the prediction is already correct. Update only on mistakes.

> **Common mistake:** Using $\text{sign}(0) = +1$. Read the question; GATE 2025 defined sign of 0 as $-1$.

> **Common mistake:** In "collapse the network" questions, counting edges wrongly. List every path from each input to the output.

> **Common mistake:** Adding the gradient instead of subtracting it. Gradient descent always uses a minus sign.

### How GATE asks it
- **2024 Q.43** (MCQ, 2 marks): positive inputs, ReLU network collapses to $36x_1 + 24x_2 + 24x_3$ by summing path products.
- **2025 Q.22** (MCQ, 1 mark): perceptron update on a misclassified $+1$ point increases its score by $\lVert x_n \rVert^2 + 1$.
- **2025 Q.42** (MCQ, 2 marks): backprop in a 2-layer ReLU net; $\partial y/\partial a = 8$, $\partial y/\partial f = 0$.
- **2026 Q.56** (NAT, 2 marks): $30 \to 4 \to 3 \to 1$ with no biases: $120 + 12 + 3 = 135$.
- Expect: one of these four patterns every year, worth up to 2 marks each.

> **GATE tip:** For any network question, first write the forward pass values next to each neuron. Gradients then take seconds.

### Summary
- First we build one neuron: a weighted sum plus bias, like linear regression, passed through a bending activation.
- Then we stack neurons in layers, because one neuron can only draw a straight line, and layers can bend the boundary (XOR).
- To learn, we measure the error with a loss and find the slope of the loss for every weight.
- The chain rule gives these slopes by multiplying rates along each path; a ReLU with negative input makes the product 0.
- So gradient descent subtracts "learning rate times slope" from every weight, and the loss goes down.
- The perceptron is the one-neuron version: on each mistake it adds $y_n x_n$, which pushes the score by $y_n(\lVert x_n \rVert^2 + 1)$.
- Next topic builds on this: the same "repeat a simple update until nothing changes" idea appears in k-means clustering, and neural networks are the base of deep learning and modern AI.

### Quick self-check
1. Fully connected $4 \to 3 \to 1$ with biases. Parameters?

**Answer:** $(12 + 3) + (3 + 1) = 19$.

2. $\text{ReLU}(-0.5)$ and its derivative?

**Answer:** 0 and 0.

3. Perceptron: $w = (1, 0)$, $b = 0$, point $(-2, 1)$ with label $+1$. New $w$, $b$?

**Answer:** $f = -2$, mistake. $w = (1,0) + (-2,1) = (-1, 1)$, $b = 1$.

4. If $\sigma(z) = 0.8$, what is $\sigma'(z)$?

**Answer:** $0.8 \times 0.2 = 0.16$.

## Clustering (k-means/k-medoid)

### The big idea
**Clustering** puts similar points into groups without any labels. **k-means** finds $k$ groups by repeating two steps: assign each point to the nearest centre, then move each centre to the **mean** of its points.

**k-medoid** is the same, but each centre must be an **actual data point** (the medoid).

### Before you start
You need these earlier ideas. Each one is explained here from scratch.

**1. A point as a list of numbers.** A point in 2-D is a pair $(x_1, x_2)$, like a position on graph paper. Example: $(5, 4)$ is 5 steps right and 4 steps up.

**2. Euclidean distance and squared distance.** The straight-line distance between $a$ and $b$ comes from Pythagoras: $\lVert a - b \rVert = \sqrt{(a_1 - b_1)^2 + (a_2 - b_2)^2}$. Example: $(1,1)$ to $(4,5)$: $\sqrt{9 + 16} = 5$. The **squared distance** just skips the square root: $25$. The nearest point is the same either way, because a bigger distance always has a bigger square.

**3. Manhattan distance.** Add the absolute differences: $\lvert a_1 - b_1 \rvert + \lvert a_2 - b_2 \rvert$. Example: $(1,1)$ to $(4,5)$ gives $3 + 4 = 7$, like walking along city blocks.

**4. Mean (average) of points.** Average each coordinate separately. Example: mean of $(1,1)$ and $(3,5)$ is $((1+3)/2, (1+5)/2) = (2, 3)$ (see topic: Linear Regression (Simple/Multiple), where $\bar x$ was the mean).

**5. The sum symbol $\sum$.** $\sum_{x \in C} x$ means "add up every point $x$ that belongs to the group $C$". The symbol $\in$ means "is a member of". Example: $C = \{2, 4, 9\}$ gives $\sum_{x \in C} x = 15$.

**6. $\arg\min$.** $\min$ gives the smallest value; $\arg\min$ gives **which choice** produced it. Example: distances $(7, 3, 5)$ to centres 1, 2, 3: $\min = 3$, $\arg\min = 2$.

**7. Set size $\lvert C \rvert$.** The bars around a set mean "how many members". Example: $\lvert \{2, 4, 9\} \rvert = 3$.

**8. Derivative = 0 at the bottom.** At the lowest point of a smooth U-shaped curve, the slope is 0 (see topic: Linear Regression (Simple/Multiple), where we used this to find the best $w$).

**9. Nearest neighbour idea.** "Join the closest one" is the same rule as 1-NN (see topic: k-Nearest Neighbours), but here the "neighbours" are centres, not labelled points.

### Intuition
A city wants to open 2 water tanks for 6 houses. Start by placing the tanks anywhere. Each house connects to its nearest tank.

Then move each tank to the middle of the houses it serves. Some houses may now be closer to the other tank, so they switch. Repeat until nothing changes. That is k-means.

> **Intuition:** "Assign, then average. Assign, then average." Stop when no point changes its group.

k-means never makes the total squared distance worse, so it always stops. But it can stop at a poor answer if the starting centres are bad. So we usually run it several times with different starts.

**k-medoid** is useful when there are outliers (points far from all others). One very far house drags a mean far away. A medoid must be a real house, so it stays in the crowd.

### Words you need
- **Cluster**: a group of similar points.
- **Centroid**: the mean of a cluster's points. Example: mean of $(1,1)$ and $(1,2)$ is $(1, 1.5)$.
- **Medoid**: the cluster point with the smallest total distance to the others.
- **$k$**: number of clusters, chosen by us.
- **SSE (within-cluster sum of squares)**: total squared distance of points to their centroids. Lower is tighter.
- **Convergence**: assignments stop changing.
- **Outlier**: a point far away from the rest. Example: 100 among $1, 2, 3, 4$.
- **Voronoi cell**: the region of space nearer to one centre than to all others. It is always **convex**.
- **Convex set**: for any two points inside, the whole straight segment between them is inside. Example: a square is convex; a crescent moon shape is not.
- **Half-plane**: one side of a straight line. Example: all points with $x_1 < 1$.
- **Unsupervised**: no labels are used.

### Formulas, explained

**k-means objective (SSE)**
$$J = \sum_{j=1}^{k} \sum_{x \in C_j} \lVert x - \mu_j \rVert^2$$
- **Read it as:** for each cluster, add squared distances of its points to its centroid; then add over clusters.
- **Symbols:** $C_j$ = cluster $j$; $\mu_j$ (read "mu j") = its centroid.
- **Why it makes sense:** small $J$ means tight clusters. Both k-means steps can only lower $J$.
- **Use it when:** computing SSE or comparing clusterings.

**Assignment step**
$$\text{cluster}(x) = \arg\min_{j} \lVert x - \mu_j \rVert^2$$
- **Read it as:** each point joins the nearest centroid.
- **Symbols:** $j$ runs over the $k$ centroids.
- **Why it makes sense:** for fixed centres, this choice gives each point its smallest possible term in $J$.
- **Use it when:** step 1 of every k-means iteration.

**Update step**
$$\mu_j = \frac{1}{\lvert C_j \rvert} \sum_{x \in C_j} x$$
- **Read it as:** new centroid = average of its points.
- **Symbols:** $\lvert C_j \rvert$ = number of points in cluster $j$.
- **Why it makes sense:** the mean is exactly the point that minimises total squared distance.
- **Use it when:** step 2 of every k-means iteration.

**Medoid**
$$m_j = \arg\min_{m \in C_j} \sum_{x \in C_j} d(x, m)$$
- **Read it as:** pick the member with the smallest total distance to all members.
- **Symbols:** $d$ = any distance (often Manhattan or Euclidean).
- **Why it makes sense:** it is the "most central real point"; one far outlier adds the same amount to every candidate, so it cannot pull the choice far away.
- **Use it when:** k-medoid / PAM questions.

> **Remember:** The boundary between two centroids is the perpendicular bisector (a straight line). So each k-means cluster region is convex. If two points are in cluster 3, every point on the segment between them is also in cluster 3.

### Where the formulas come from

**1. The objective $J$ is "total squared distance".**

1. Take one cluster $\{(1,1), (1,3)\}$ with centroid $(1,2)$. Squared distances are $0 + 1 = 1$ and $0 + 1 = 1$, total 2.
2. Do the same for every cluster and add, because we want all clusters to be tight at once.
3. Writing "add over points in a cluster" as $\sum_{x \in C_j}$ and "add over clusters" as $\sum_{j=1}^{k}$ gives $J$.
4. We use squared distance (not plain distance) because it has no square root, and it makes the best centre the mean (see part 3 below).

**2. Why the assignment step is "nearest centre".**

1. Fix the centres. Each point $x$ adds exactly one term $\lVert x - \mu_j \rVert^2$ to $J$, for the cluster $j$ it is in.
2. The terms of different points do not affect each other, so we can choose each point's cluster separately.
3. To make its term smallest, the point should pick the $j$ with the smallest squared distance, because that is what "smallest term" means.
4. That is $\arg\min_j \lVert x - \mu_j \rVert^2$. So this step never raises $J$.

**3. Why the update step uses the mean.**

1. Take 1-D points $1, 2, 6$ and try centres. At $c = 3$: $(1-3)^2 + (2-3)^2 + (6-3)^2 = 4 + 1 + 9 = 14$.
2. At $c = 2$: $1 + 0 + 16 = 17$. At $c = 4$: $9 + 4 + 4 = 17$. Both are worse than $c = 3$, and $3$ is the mean $(1+2+6)/3$.
3. In symbols, $f(c) = \sum_i (x_i - c)^2$. Its slope is $f'(c) = -2\sum_i (x_i - c)$, because the derivative of $(x_i - c)^2$ with respect to $c$ is $-2(x_i - c)$.
4. Set the slope to 0 (the bottom of the U-curve): $\sum_i x_i - n c = 0$, because $c$ is added $n$ times.
5. So $c = \frac{1}{n}\sum_i x_i$, the mean. In 2-D, do this for each coordinate separately, because the squared distance is a sum of one term per coordinate.
6. So, with fixed groups, moving each centre to its mean never raises $J$.

**4. Why k-means always stops.**

1. Steps 2 and 3 above both keep $J$ the same or lower it.
2. There are only finitely many ways to split $n$ points into $k$ groups, so $J$ cannot keep falling forever.
3. So at some point the assignment stops changing. That is convergence.
4. It stops at a "local" best, not always the overall best, because a different start can lead to a different stopping point.

**5. Why the boundary is a straight line, so regions are convex.**

1. Take centres $a = (0,0)$ and $b = (2,0)$. A point $x$ is equally near both when $\lVert x - a \rVert^2 = \lVert x - b \rVert^2$.
2. Write it out: $x_1^2 + x_2^2 = (x_1 - 2)^2 + x_2^2$.
3. The squares $x_1^2$ and $x_2^2$ cancel on both sides, leaving $0 = -4x_1 + 4$, so $x_1 = 1$. That is a straight line, halfway between the centres and at right angles to the line joining them.
4. In general the squares always cancel, leaving $2(b - a)^\top x = \lVert b \rVert^2 - \lVert a \rVert^2$, which is a straight-line equation.
5. "Nearer to $a$ than to $b$" is one side of that line: a half-plane. Cluster $a$'s region is the overlap of such half-planes, one for each other centre.
6. Each half-plane is convex, and the overlap of convex sets is convex, because a segment inside all of them is inside their overlap.

**6. The medoid formula.**

1. The medoid must be a real member, so we cannot use the derivative trick. We simply try every member.
2. For each candidate $m$, add its distances to all members: $\sum_{x \in C_j} d(x, m)$.
3. Pick the candidate with the smallest total; that is the $\arg\min$.
4. The medoid is the "real-point version" of the update step: same goal (be central), but the choice is limited to data points.

### Examples

**Example 1 (easy): medoid vs mean with an outlier.** 1-D points $1, 2, 3, 4, 100$.

1. Mean $= (1+2+3+4+100)/5 = 110/5 = 22$. No real point is near 22.
2. Total absolute distance from candidate 2: $1 + 0 + 1 + 2 + 98 = 102$.
3. From candidate 3: $2 + 1 + 0 + 1 + 97 = 101$.
4. From candidate 4: $3 + 2 + 1 + 0 + 96 = 102$. Candidates 1 and 100 are larger still.

**Result:** medoid $= 3$. It stays with the crowd, while the mean is pulled to 22.

**Example 2 (medium): k-means on 6 points, $k = 2$.** Points $P_1 = (1,1)$, $P_2 = (2,1)$, $P_3 = (1,2)$, $P_4 = (5,4)$, $P_5 = (6,5)$, $P_6 = (5,5)$. Start (badly) with $\mu_1 = (1,1)$, $\mu_2 = (2,1)$.

Iteration 1, assign (squared distances to $\mu_1$ and $\mu_2$):

| Point | to $\mu_1 = (1,1)$ | to $\mu_2 = (2,1)$ | Cluster |
|---|---|---|---|
| $(1,1)$ | 0 | 1 | 1 |
| $(2,1)$ | 1 | 0 | 2 |
| $(1,2)$ | $0 + 1 = 1$ | $1 + 1 = 2$ | 1 |
| $(5,4)$ | $16 + 9 = 25$ | $9 + 9 = 18$ | 2 |
| $(6,5)$ | $25 + 16 = 41$ | $16 + 16 = 32$ | 2 |
| $(5,5)$ | $16 + 16 = 32$ | $9 + 16 = 25$ | 2 |

1. Iteration 1 update: $\mu_1 = \text{mean}\{(1,1), (1,2)\} = (1, 1.5)$.
2. Iteration 1 update: $\mu_2 = \text{mean}\{(2,1), (5,4), (6,5), (5,5)\} = (18/4, 15/4) = (4.5, 3.75)$.
3. Iteration 2 assign: the only point that changes is $(2,1)$. To $\mu_1 = (1, 1.5)$: $1^2 + 0.5^2 = 1.25$. To $\mu_2 = (4.5, 3.75)$: $2.5^2 + 2.75^2 = 6.25 + 7.5625 = 13.81$. So $(2,1)$ moves to cluster 1.
4. Iteration 2 update: $\mu_1 = \text{mean}\{(1,1), (2,1), (1,2)\} = (4/3, 4/3) \approx (1.33, 1.33)$.
5. Iteration 2 update: $\mu_2 = \text{mean}\{(5,4), (6,5), (5,5)\} = (16/3, 14/3) \approx (5.33, 4.67)$.
6. Iteration 3: no point changes. **Converged.**
7. SSE of cluster 1: $(1,1)$ gives $\frac19 + \frac19 = \frac29$; $(2,1)$ gives $\frac49 + \frac19 = \frac59$; $(1,2)$ gives $\frac19 + \frac49 = \frac59$. Sum $\frac{12}{9}$.
8. SSE of cluster 2: $(5,4)$ gives $\frac59$; $(6,5)$ gives $\frac59$; $(5,5)$ gives $\frac29$. Sum $\frac{12}{9}$.
9. Medoid of cluster 1 (Manhattan): from $(1,1)$: $1 + 1 = 2$; from $(2,1)$: $1 + 2 = 3$; from $(1,2)$: $1 + 2 = 3$. Medoid $= (1,1)$.

**Result:** clusters $\{P_1, P_2, P_3\}$ and $\{P_4, P_5, P_6\}$, total $J = \frac{24}{9} \approx 2.67$, medoid of cluster 1 is $(1,1)$.

**Example 3 (GATE level).** k-means with $k = 4$ on 200 points converged. The points $(2, 0)$ and $(2, 4)$ are both in cluster 1. Which point is **necessarily** in cluster 1: $(0,0)$, $(2,2)$, $(4,2)$, $(2,6)$?

1. Cluster 1's region is convex, because it is an overlap of half-planes.
2. The segment from $(2,0)$ to $(2,4)$ contains $(2,2)$: it is the midpoint $((2+2)/2, (0+4)/2)$.
3. The other three points are not on the segment, so some other centroid could be nearer to them.

**Result:** $(2,2)$ is necessarily in cluster 1.

### Common mistakes
> **Common mistake:** Updating centroids before assigning all points. Assign all, then update all.

> **Common mistake:** Thinking k-means always finds the best clustering. It finds a local minimum that depends on the start.

> **Common mistake:** Choosing a medoid that is not a data point. A medoid must be one of the points.

> **Common mistake:** Calling k-means supervised. It uses no labels. LDA and Naive Bayes use labels.

> **Common mistake:** Comparing plain distances with squared distances in one table. Pick one kind and use it for every centre.

### How GATE asks it
- **2024 Q.19** (MCQ, 1 mark): $(1,1)$ and $(-1,1)$ in cluster 3, so the midpoint $(0,1)$ must be too (convex Voronoi cells).
- **2026 Q.23** (MSQ, 1 mark): match tasks to algorithms: K-Medoid for clustering, Naive Bayes for classification, MCMC for sampling, LDA for feature extraction.
- Expect: one iteration of k-means by hand, SSE, medoid choice, convexity, task-algorithm matching.

> **GATE tip:** Use squared distances in the assign step. No square roots needed.

### Summary
- First we choose $k$ and place $k$ starting centres anywhere.
- Then each point joins its nearest centre, because that gives it the smallest squared distance.
- Then each centre moves to the mean of its points, because the mean is the point with the smallest total squared distance.
- So the total squared distance $J$ never goes up, and the algorithm stops when no point switches.
- The boundary between two centres is a straight line, so every cluster region is convex; that is why midpoints stay in the same cluster.
- k-medoid does the same with real data points as centres, which makes it robust to outliers.
- Next topic builds on this: Hierarchical Clustering also groups points by distance, but builds a whole tree of groups instead of fixing $k$ at the start.

### Quick self-check
1. Centroid of $(0,0)$, $(2,0)$, $(4,6)$?

**Answer:** $(6/3, 6/3) = (2, 2)$.

2. Centroids at 2 and 8 on a line. Which cluster gets 5.5?

**Answer:** Distance 3.5 to 2 and 2.5 to 8, so the cluster at 8.

3. Can increasing $k$ increase the best possible SSE?

**Answer:** No; more clusters can only keep it equal or lower it.

4. Centres $(0,0)$ and $(4,0)$. What is the boundary line between their clusters?

**Answer:** The perpendicular bisector $x_1 = 2$.

## Hierarchical Clustering

### The big idea
**Agglomerative hierarchical clustering** starts with every point as its own cluster. Then it **repeatedly merges the two closest clusters** until only one cluster is left.

The full history of merges is drawn as a tree called a **dendrogram**.

### Before you start
- **Cluster (see topic: Clustering (k-means/k-medoid))**: a group of points that are close to each other. Example: the points 0, 1 and 3 on a number line form one cluster, and 8 and 10.5 form another.

- **Distance between two points**: one number that says how far apart two points are. On a number line it is the gap: from 3 to 8 the distance is $8 - 3 = 5$.

- **Absolute value, $\lvert a \rvert$**: the size of a number without its sign. Example: $\lvert -2 \rvert = 2$ and $\lvert 2 \rvert = 2$. So a distance is never negative.

- **Euclidean vs Manhattan distance**: Euclidean is the straight-line distance, $\sqrt{(\text{gap}_1)^2 + (\text{gap}_2)^2 + \dots}$. Manhattan adds the gaps without squaring, like walking along city blocks. From $(0,0)$ to $(3,4)$: Euclidean $= \sqrt{9 + 16} = 5$, Manhattan $= 3 + 4 = 7$.

- **min and max**: $\min(6, 4.5) = 4.5$ picks the smallest number; $\max(6, 4.5) = 6$ picks the largest. A small "$x \in C_1$" under min means "try every point $x$ inside cluster $C_1$".

- **Sum symbol, $\sum$**: means "add up". $\sum_{x \in C_1}$ means "add one term for every point $x$ in $C_1$". Example: if $C_1 = \{1, 2\}$, then $\sum_{x \in C_1} x = 1 + 2 = 3$.

- **Size of a set, $\lvert C \rvert$**: the number of points in cluster $C$. Example: $\lvert \{A, B, C\} \rvert = 3$.

- **Union, $A \cup B$**: the set made by putting $A$ and $B$ together. Example: $\{P, Q\} \cup \{R\} = \{P, Q, R\}$.

### Intuition
Think of a family tree, built from the bottom. First, twins join (they are the most similar). Then siblings join the twins. Then cousins. Then the whole family.

At each step you join the **two closest groups**.

The only tricky part: how far apart are two **groups**? There are three common answers, called **linkages**:
- **Single linkage**: distance between the **closest** pair (one point from each group). Like two WhatsApp groups being "connected" if any one member of each is friends.
- **Complete linkage**: distance between the **farthest** pair. Two groups are close only if **every** member is close.
- **Average linkage**: the average over all pairs.

> **Intuition:** Single = "nearest neighbours shake hands". Complete = "the two farthest people must still be close".

Single linkage tends to make long chains, because one close pair is enough to join two groups. Complete linkage makes compact, round groups.

You do not choose $k$ (the number of clusters) in advance. You cut the dendrogram at any height to get clusters.

### Words you need
- **Agglomerative**: bottom-up, merging. (**Divisive** = top-down, splitting.)
- **Linkage**: the rule for the distance between two clusters.
- **Dendrogram**: the tree of merges. The height of each join is the merge distance. Example: $\{A, B\}$ joined at height 1.
- **Distance matrix**: a table of distances between every pair of points. It is symmetric: the distance from $P$ to $Q$ equals the distance from $Q$ to $P$, and the diagonal is 0.
- **Manhattan distance**: the sum of absolute differences. Example: $(2,3,-1)$ to $(3,1,1)$ is $1 + 2 + 2 = 5$.
- **Cutting the dendrogram**: drawing a horizontal line across the tree. The branches hanging below the line are the clusters.

### Formulas, explained

**Single linkage**
$$D_{single}(C_1, C_2) = \min_{x \in C_1,\, y \in C_2} D(x, y)$$
- **Read it as:** cluster distance = the smallest distance between any member of $C_1$ and any member of $C_2$.
- **Symbols:** $C_1, C_2$ = clusters; $D(x, y)$ = distance between two points.
- **Why it makes sense:** two groups are "close" if they have at least one close pair.
- **Use it when:** the question says "single linkage" or "nearest neighbour linkage".

**Complete linkage**
$$D_{complete}(C_1, C_2) = \max_{x \in C_1,\, y \in C_2} D(x, y)$$
- **Read it as:** cluster distance = the largest distance between members.
- **Symbols:** same as single linkage.
- **Why it makes sense:** two groups are "close" only if even their farthest pair is close.
- **Use it when:** "complete linkage" or "farthest neighbour".

**Average linkage**
$$D_{avg}(C_1, C_2) = \frac{1}{\lvert C_1 \rvert \lvert C_2 \rvert} \sum_{x \in C_1} \sum_{y \in C_2} D(x, y)$$
- **Read it as:** the average of the distances of all cross pairs.
- **Symbols:** $\lvert C_1 \rvert \lvert C_2 \rvert$ = number of cross pairs.
- **Why it makes sense:** every member gets a vote, so one odd point does not decide alone.
- **Use it when:** "average linkage" or "UPGMA".

**Update shortcut after merging $A$ and $B$**
$$D(A \cup B, C) = \min\big(D(A, C), D(B, C)\big) \quad \text{(single)}$$
$$D(A \cup B, C) = \max\big(D(A, C), D(B, C)\big) \quad \text{(complete)}$$
- **Read it as:** the new row of the table is the min (or max) of the two old rows.
- **Symbols:** $A \cup B$ = the new merged cluster; $C$ = any other cluster.
- **Why it makes sense:** the closest (or farthest) pair must involve a member of $A$ or a member of $B$.
- **Use it when:** updating a distance matrix by hand.

> **Remember:** At the very first step every cluster is one point. So the first merge is just the closest pair, **whatever the linkage**.

### Where the formulas come from

**Single and complete linkage: start from a tiny example.**

1. Take cluster $C_1 = \{0, 1\}$ and cluster $C_2 = \{3\}$ on a number line. We want one number for "how far apart are these groups".
2. List every cross pair (one point from each group): $(0, 3)$ with distance 3, and $(1, 3)$ with distance 2. We list them because each group has many points, so there are many possible distances.
3. Single linkage keeps the smallest: $\min(3, 2) = 2$. This is allowed because we decided "close" means "the nearest members are close".
4. Complete linkage keeps the largest: $\max(3, 2) = 3$. This matches the rule "even the farthest members must be close".
5. In symbols, "try every $x$ in $C_1$ and every $y$ in $C_2$, then take the min (or max)" is exactly
$$\min_{x \in C_1,\, y \in C_2} D(x, y) \quad \text{and} \quad \max_{x \in C_1,\, y \in C_2} D(x, y).$$

**Average linkage: it is just an ordinary average.**

1. Same groups: the cross distances are 3 and 2.
2. An average is "add them up, divide by how many": $(3 + 2)/2 = 2.5$.
3. How many cross pairs are there? Each of the $\lvert C_1 \rvert = 2$ points pairs with each of the $\lvert C_2 \rvert = 1$ points, so $2 \times 1 = 2$ pairs. This is because every point of one group is matched with every point of the other.
4. "Add them up" over all pairs is the double sum $\sum_{x \in C_1} \sum_{y \in C_2} D(x, y)$. Dividing by the number of pairs $\lvert C_1 \rvert \lvert C_2 \rvert$ gives the formula.
5. Notice: average linkage always lies between single and complete, because an average is never below the smallest value or above the largest value. Here $2 \le 2.5 \le 3$.

**The update shortcut: why we never need to recompute from scratch.**

1. Suppose $A = \{0\}$ and $B = \{1\}$ merge into $A \cup B = \{0, 1\}$, and $C = \{3\}$.
2. The cross pairs of $A \cup B$ with $C$ are the pairs of $A$ with $C$ **plus** the pairs of $B$ with $C$. This is true because every point of $A \cup B$ comes from $A$ or from $B$.
3. The smallest of all these pairs is the smaller of (smallest $A$-to-$C$ pair) and (smallest $B$-to-$C$ pair). So $D_{single}(A \cup B, C) = \min(D(A, C), D(B, C)) = \min(3, 2) = 2$.
4. The same reasoning with "largest" gives $D_{complete}(A \cup B, C) = \max(3, 2) = 3$.
5. So the shortcut is just the single/complete linkage formula, organised in two parts. That is why, in a GATE table, you only take the min (or max) of two old rows.

**Why the first merge does not depend on the linkage.**

1. At the start every cluster has one point, so each pair of clusters has exactly one cross pair.
2. The min, max and average of one number are all that same number. So all three linkages give the same table, and the closest pair merges first.

### Examples

**Example 1 (easy): 5 points on a line.** $A = 0$, $B = 1$, $C = 3$, $D = 8$, $E = 10.5$.

Single linkage:
1. The closest pair is $A, B$ (distance $1 - 0 = 1$). Merge at height 1.
2. Update: $D(AB, C) = \min(3, 2) = 2$. Other gaps: $D(D, E) = 2.5$, $D(C, D) = 5$. The smallest is 2, so merge $AB$ with $C$ at height 2.
3. Now $D(ABC, D) = \min(8, 7, 5) = 5$ and $D(D, E) = 2.5$. The smallest is 2.5, so merge $D, E$ at height 2.5.
4. Last: $D(ABC, DE) = $ the closest pair, which is $C$ and $D$: $8 - 3 = 5$. Final merge at height 5.

**Result:** single-linkage merge heights are 1, 2, 2.5, 5.

Complete linkage:
1. Merge $A, B$ at height 1 (the first merge is the same for every linkage).
2. Update: $D(AB, C) = \max(3, 2) = 3$, while $D(D, E) = 2.5$. Now 2.5 is smaller, so merge $D, E$ first, at height 2.5.
3. Next: $D(AB, C) = 3$ and $D(C, DE) = \max(5, 7.5) = 7.5$. The smallest is 3, so merge $ABC$ at height 3.
4. Last: $D(ABC, DE) = $ the farthest pair, $A$ and $E$: $10.5 - 0 = 10.5$. Final merge at height 10.5.

**Result:** complete-linkage merge heights are 1, 2.5, 3, 10.5. The two final groups are the same, $\{A, B, C\}$ and $\{D, E\}$, but the heights and the merge order differ.

**Example 2 (medium): linkage changes the tree.** Distance matrix for $P, Q, R, S, T$:

| | $P$ | $Q$ | $R$ | $S$ | $T$ |
|---|---|---|---|---|---|
| $P$ | 0 | 2 | 6 | 10 | 9 |
| $Q$ | 2 | 0 | 4.5 | 9 | 8 |
| $R$ | 6 | 4.5 | 0 | 4 | 7 |
| $S$ | 10 | 9 | 4 | 0 | 3 |
| $T$ | 9 | 8 | 7 | 3 | 0 |

1. The smallest entry is 2, so merge $P, Q$ at height 2 (same for both linkages).
2. The next smallest original distance is $D(S, T) = 3$. It does not involve $P$ or $Q$, and every distance from $\{P, Q\}$ to another point is at least 4.5 (single) or larger (complete). So merge $S, T$ at height 3 for both linkages.
3. Single linkage, where does $R$ go? $D(R, PQ) = \min(6, 4.5) = 4.5$ and $D(R, ST) = \min(4, 7) = 4$. Also $D(PQ, ST) = \min(10, 9, 9, 8) = 8$. The smallest is 4, so $R$ joins $ST$ at height 4.
4. Single linkage, last merge: $D(PQ, RST) = \min(6, 4.5, 10, 9, 9, 8) = 4.5$. Final merge at 4.5.
5. Complete linkage, where does $R$ go? $D(R, PQ) = \max(6, 4.5) = 6$ and $D(R, ST) = \max(4, 7) = 7$. Also $D(PQ, ST) = \max(10, 9, 9, 8) = 10$. The smallest is 6, so $R$ joins $PQ$ at height 6.
6. Complete linkage, last merge: $D(PQR, ST) = \max(10, 9, 9, 8, 4, 7) = 10$. Final merge at 10.

**Result:** single linkage gives $\{P, Q\}, \{R, S, T\}$; complete linkage gives $\{P, Q, R\}, \{S, T\}$. Different trees from the same table.

**Example 3 (GATE level).** Points in 3-D: $P_1 = (1, 0, 2)$, $P_2 = (3, 1, 0)$, $P_3 = (2, 2, 2)$, $P_4 = (0, 1, 4)$. Use Manhattan distance. Which two merge first?

1. For each pair, subtract coordinate by coordinate and drop the signs. Example: $P_1 - P_2 = (1-3, 0-1, 2-0) = (-2, -1, 2)$, absolute values $2, 1, 2$.
2. Add the absolute differences to get the Manhattan distance. Do this for all 6 pairs:

| Pair | Absolute differences | Distance |
|---|---|---|
| $P_1, P_2$ | 2, 1, 2 | 5 |
| $P_1, P_3$ | 1, 2, 0 | **3** |
| $P_1, P_4$ | 1, 1, 2 | 4 |
| $P_2, P_3$ | 1, 1, 2 | 4 |
| $P_2, P_4$ | 3, 0, 4 | 7 |
| $P_3, P_4$ | 2, 1, 2 | 5 |

3. The first merge is the smallest distance, whatever the linkage. The smallest is 3.

**Result:** $P_1$ and $P_3$ merge first, at distance 3.

### Common mistakes
> **Common mistake:** Swapping single and complete. Single = **min**, complete = **max**.

> **Common mistake:** Merging only one pair when two pairs tie at the smallest distance and do not overlap. Both merges happen at that height (in either order).

> **Common mistake:** Using Euclidean distance when Manhattan is asked. Add absolute differences; do not square.

> **Common mistake:** Forgetting to update the table after a merge. Rewrite the row of the new cluster each time.

> **Common mistake:** Comparing only the new cluster's row. Also check the old distances between other clusters; in Example 1 (complete), $D, E$ merged before $AB$ took $C$.

### How GATE asks it
- **2024 Q.42** (MCQ, 2 marks): single linkage on a 5 by 5 matrix; $\{x_1, x_2\}$ and $\{x_4, x_5\}$ at 1, $x_3$ joins $\{x_4, x_5\}$ at 2, all at 3.
- **2025 Q.30** (MSQ, 1 mark): single linkage uses min (DIS-2), complete uses max (DIS-1).
- **2026 Q.36** (MCQ, 2 marks): four 3-D points, Manhattan distance; first merge $P_2, P_4$ (distance 4).
- Expect: run single or complete linkage on a small matrix and pick the dendrogram; first merge; linkage definitions.

> **GATE tip:** Circle the smallest entry, merge, then write one new row using min (single) or max (complete). Five points need only four steps.

### Summary
- First, every point is its own little cluster.
- Then we find the two closest clusters and merge them, again and again, until one cluster is left.
- To measure the distance between two groups we need a linkage: single (closest pair, min), complete (farthest pair, max) or average (mean of all pairs).
- After each merge we update the table with a shortcut: the new row is the min (single) or max (complete) of the two old rows.
- The record of all merges and their heights is the dendrogram. Cutting it at a height gives clusters, so we never fix $k$ in advance.
- Different linkages can give different trees, which is why GATE asks you to run both on the same table.
- Next topic builds on this: PCA & Dimensionality Reduction, another unsupervised tool, which simplifies data instead of grouping it.

### Quick self-check
1. $D(a, c) = 4$, $D(b, c) = 7$. Distance from $\{a, b\}$ to $c$ in single and complete linkage?

**Answer:** Single $\min(4, 7) = 4$, complete $\max(4, 7) = 7$.

2. Which linkage tends to form long chains?

**Answer:** Single linkage, because one close pair is enough to join two groups.

3. Do you need to fix $k$ before running agglomerative clustering?

**Answer:** No; cut the dendrogram later at the height you want.

4. With the same cross distances 4 and 7, what is the average-linkage distance?

**Answer:** $(4 + 7)/2 = 5.5$.

## PCA & Dimensionality Reduction

### The big idea
**Principal Component Analysis (PCA)** finds new axes (directions) along which the data **spreads out the most**.

Keeping only the top few axes lets us describe each point with fewer numbers, while losing little information.

### Before you start
- **Mean (average)**: add the values and divide by how many. Example: the mean of 1, 3, 2, 4 is $10/4 = 2.5$.

- **Variance (see topic: Bias-Variance & Model Evaluation, and your probability notes)**: the average of squared distances from the mean. It measures spread. Example: values $-1, 1$ have mean 0 and variance $(1 + 1)/2 = 1$.

- **Covariance**: the average of (gap of $x$ from its mean) times (gap of $y$ from its mean). It is positive when $x$ and $y$ go up together. Example: centred pairs $(-1, -1)$ and $(1, 1)$ give $\big((-1)(-1) + (1)(1)\big)/2 = 1$.

- **Vector and transpose**: a vector is a list of numbers, written as a column, like $x = \begin{bmatrix} 2 \\ 3 \end{bmatrix}$. The transpose $x^\top$ writes the same numbers as a row, $[2 \;\; 3]$.

- **Dot product, $u^\top x$**: multiply matching entries and add. Example: $u = (1, 0)$, $x = (2, 3)$ gives $1 \cdot 2 + 0 \cdot 3 = 2$. If $u$ has length 1, $u^\top x$ is the "shadow" of $x$ on the line of $u$.

- **Length and unit vector**: the length of $(a, b)$ is $\sqrt{a^2 + b^2}$. A unit vector has length 1, which means $u^\top u = 1$. Example: $(1, 1)/\sqrt2$ has length $\sqrt{1/2 + 1/2} = 1$.

- **Matrix times vector**: each row of the matrix is dotted with the vector. Example: $\begin{bmatrix} 4 & 0 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 4 \\ 1 \end{bmatrix}$.

- **Eigenvector and eigenvalue (see your Linear Algebra notes)**: a direction $v$ that a matrix only stretches, not turns: $\Sigma v = \lambda v$. The stretch factor $\lambda$ is the eigenvalue. Example: $\begin{bmatrix} 4 & 0 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 4 \\ 0 \end{bmatrix} = 4\begin{bmatrix} 1 \\ 0 \end{bmatrix}$, so $(1, 0)$ is an eigenvector with $\lambda = 4$.

- **Trace**: the sum of the diagonal entries of a square matrix. Example: trace of $\begin{bmatrix} 1.25 & 1 \\ 1 & 1.25 \end{bmatrix}$ is $2.5$.

- **Sum symbol, $\sum_{i=1}^{n}$**: "add the term for $i = 1, 2, \dots, n$". Example: $\sum_{i=1}^{3} i = 1 + 2 + 3 = 6$.

### Intuition
You photograph a long train from different angles. From the front, the train looks like a small square: you lose almost everything. From the side, you see the whole length: the most information.

PCA finds the "side view" of your data: the direction where points are most spread out. That is the **first principal component**. The second component is the best direction **at a right angle** to the first, and so on.

> **Intuition:** Spread = information. If all students have nearly the same height, height tells you little about who is who. PCA keeps the directions with big spread and drops the flat ones.

PCA does not use labels, so it is **unsupervised**. Its main uses: compress data, remove noise, plot high-dimensional data in 2-D, and speed up other models.

### Words you need
- **Centering**: subtract the mean from every point so the data's centre is at 0. Example: mean $(2.5, 2.5)$; point $(1,1)$ becomes $(-1.5, -1.5)$.
- **Variance**: average squared distance from the mean. Example: values $-1, 1$ have variance 1.
- **Covariance matrix, $\Sigma$** (capital sigma, not the sum sign): a table with variances on the diagonal and covariances off the diagonal, for all features.
- **Eigenvector, $v$**: a direction that a matrix only stretches: $\Sigma v = \lambda v$.
- **Eigenvalue, $\lambda$** (lambda): the stretch factor; for PCA it equals the variance along that eigenvector.
- **Principal component (PC)**: an eigenvector of $\Sigma$, sorted by eigenvalue (largest first).
- **Projection / score**: the coordinate of a point along a PC, $u^\top x$.
- **Orthogonal**: at $90^\circ$; dot product 0.
- **Explained variance ratio**: the fraction of total variance kept.
- **Reconstruction error**: how far a point is from its compressed-then-rebuilt version.

### Formulas, explained

**Covariance matrix (centred data)**
$$\Sigma = \frac{1}{n} \sum_{i=1}^{n} x^{(i)} x^{(i)\top}$$
- **Read it as:** the average of each centred point (a column) times its own transpose (a row).
- **Symbols:** $x^{(i)}$ = centred point number $i$; $n$ = number of points. Some books divide by $n - 1$; the directions do not change.
- **Why it makes sense:** diagonal entries are variances; off-diagonal entries show how two features move together.
- **Use it when:** building PCA by hand.

**Variance along a unit direction $u$**
$$\frac{1}{n} \sum_{i=1}^{n} (u^\top x^{(i)})^2 = u^\top \Sigma u$$
- **Read it as:** the average squared projection onto $u$ equals "$u$-transpose, Sigma, $u$".
- **Symbols:** $u$ with $u^\top u = 1$ (unit length).
- **Why it makes sense:** project every point to one number, then take the variance of those numbers.
- **Use it when:** "variance of the data along $u$".

**Principal components**
$$\Sigma v_j = \lambda_j v_j$$
$$\lambda_1 \ge \lambda_2 \ge \dots \ge \lambda_d$$
- **Read it as:** the PCs are eigenvectors of $\Sigma$, sorted by eigenvalue.
- **Symbols:** $d$ = number of features; $v_j$ = the $j$-th PC; $\lambda_j$ = variance along it.
- **Why it makes sense:** the largest value of $u^\top \Sigma u$ over unit $u$ is $\lambda_1$, reached at $u = v_1$.
- **Use it when:** "direction of maximum variance" and "maximum value".

**Explained variance with $k$ components**
$$\text{ratio} = \frac{\lambda_1 + \dots + \lambda_k}{\lambda_1 + \dots + \lambda_d}$$
- **Read it as:** kept variance divided by total variance.
- **Symbols:** total variance $= \sum \lambda_j = $ trace of $\Sigma$ (sum of the diagonal).
- **Why it makes sense:** each PC carries its own share $\lambda_j$ of the spread.
- **Use it when:** "how many components keep 90%".

**Reconstruction error with $k$ components**
$$\text{average squared error} = \lambda_{k+1} + \dots + \lambda_d$$
- **Read it as:** what you lose is exactly the variance of the directions you dropped.
- **Use it when:** "average squared reconstruction error".

> **Remember:** $\Sigma$ is symmetric, so its eigenvectors are **orthogonal**. Any two different PCs meet at exactly $90^\circ$.

### Where the formulas come from

**1. The covariance matrix is just variances and covariances arranged in a table.**

1. Take one centred 2-D point $x = (a, b)$. Then
$$x x^\top = \begin{bmatrix} a \\ b \end{bmatrix}\begin{bmatrix} a & b \end{bmatrix} = \begin{bmatrix} a^2 & ab \\ ab & b^2 \end{bmatrix}.$$
This is how a column times a row works: entry (row $r$, column $c$) = entry $r$ of the column times entry $c$ of the row.
2. With the point $(-1.5, -1.5)$ this gives $\begin{bmatrix} 2.25 & 2.25 \\ 2.25 & 2.25 \end{bmatrix}$.
3. Average this matrix over all $n$ points. The top-left becomes the average of $a^2$, which is $\text{Var}(x)$, because the data is centred (mean 0).
4. The off-diagonal becomes the average of $ab$, which is $\text{Cov}(x, y)$, for the same reason. The bottom-right becomes $\text{Var}(y)$.
5. So $\Sigma = \frac1n \sum x^{(i)} x^{(i)\top}$ is simply the table $\begin{bmatrix} \text{Var}(x) & \text{Cov} \\ \text{Cov} & \text{Var}(y) \end{bmatrix}$. It is symmetric because $ab = ba$.

**2. Variance along a direction $u$ equals $u^\top \Sigma u$.**

1. Let $u = (p, q)$ with $p^2 + q^2 = 1$. The shadow (projection) of point $(a, b)$ on $u$ is the single number $u^\top x = pa + qb$.
2. The projections also have mean 0, because the points are centred and projection is just "multiply and add". So their variance is the average of their squares.
3. Square one projection: $(pa + qb)^2 = p^2 a^2 + 2pq\,ab + q^2 b^2$. This is the school rule $(m + n)^2 = m^2 + 2mn + n^2$.
4. Average over all points: $p^2\,\text{Var}(x) + 2pq\,\text{Cov}(x, y) + q^2\,\text{Var}(y)$. We may average term by term because the average of a sum is the sum of the averages.
5. Now multiply out $u^\top \Sigma u = [p \;\; q]\begin{bmatrix} \text{Var}(x) & \text{Cov} \\ \text{Cov} & \text{Var}(y) \end{bmatrix}\begin{bmatrix} p \\ q \end{bmatrix}$. You get the same expression $p^2\,\text{Var}(x) + 2pq\,\text{Cov} + q^2\,\text{Var}(y)$. So the two sides are equal.
6. Number check (data from Example 2 below): with $u = (1, 0)$ we get $1^2 \times 1.25 + 0 + 0 = 1.25$, which is just $\text{Var}(x)$. That makes sense: the shadow on the $x$-axis is the $x$ value itself.

**3. The best direction is the top eigenvector.**

1. Start with the easy case $\Sigma = \begin{bmatrix} 4 & 0 \\ 0 & 1 \end{bmatrix}$. By step 2, the variance along $u = (p, q)$ is $4p^2 + 1q^2$.
2. Because $p^2 + q^2 = 1$, we can write $4p^2 + q^2 = 4p^2 + (1 - p^2) = 1 + 3p^2$.
3. This is largest when $p^2$ is largest, which is $p^2 = 1$ (since $p^2 \le 1$). So the best $u$ is $(1, 0)$ and the best variance is $4$.
4. And $(1, 0)$ is exactly the eigenvector with the biggest eigenvalue $4$. The variance along it is that eigenvalue.
5. For a general symmetric $\Sigma$: the full proof (using Lagrange multipliers) is not needed for GATE. The honest picture is this: rotate your axes so they point along the eigenvectors of $\Sigma$. In those axes $\Sigma$ looks diagonal, with the eigenvalues on the diagonal, so you are back in steps 1 to 4. The best direction is the eigenvector with the largest $\lambda$, and the best value is $\lambda_1$.
6. The second PC is the best direction at $90^\circ$ to the first. By the same picture it is the eigenvector of the second-largest eigenvalue.

**4. Why the PCs are at $90^\circ$ (short and honest proof).**

1. Let $\Sigma v_1 = \lambda_1 v_1$ and $\Sigma v_2 = \lambda_2 v_2$ with $\lambda_1 \ne \lambda_2$.
2. Compute $v_2^\top \Sigma v_1$ in two ways. First way: $v_2^\top(\lambda_1 v_1) = \lambda_1\, v_2^\top v_1$.
3. Second way: because $\Sigma$ is symmetric, $v_2^\top \Sigma v_1 = (\Sigma v_2)^\top v_1 = \lambda_2\, v_2^\top v_1$.
4. The two answers must be equal, so $(\lambda_1 - \lambda_2)\, v_2^\top v_1 = 0$.
5. Since $\lambda_1 - \lambda_2 \ne 0$, we must have $v_2^\top v_1 = 0$. A zero dot product means a $90^\circ$ angle.

**5. Explained variance and reconstruction error.**

1. Total variance = $\text{Var}(x) + \text{Var}(y) + \dots$ = the trace of $\Sigma$. This is the definition of "total spread": add the spread of each feature.
2. The trace does not change when you rotate the axes (a fact from linear algebra; the full proof is not needed for GATE). In the eigenvector axes the diagonal is $\lambda_1, \dots, \lambda_d$, so total variance $= \lambda_1 + \dots + \lambda_d$.
3. Example: $\Sigma = \begin{bmatrix} 1.25 & 1 \\ 1 & 1.25 \end{bmatrix}$ has trace $2.5$, and its eigenvalues $2.25 + 0.25 = 2.5$. They match.
4. Keeping the first $k$ PCs keeps the spread $\lambda_1 + \dots + \lambda_k$. Dividing by the total gives the explained variance ratio.
5. What we throw away is the shadow on the dropped directions. Its average square is the variance along those directions, $\lambda_{k+1} + \dots + \lambda_d$. That is the reconstruction error formula: it is just "total minus kept".

### Examples

**Example 1 (easy): a diagonal covariance.** $\Sigma = \begin{bmatrix} 4 & 0 \\ 0 & 1 \end{bmatrix}$.

1. A diagonal matrix only stretches the axes, so its eigenvalues are the diagonal entries: 4 and 1.
2. PC1 $= (1, 0)$ with variance 4. PC2 $= (0, 1)$ with variance 1.
3. Keeping only PC1 keeps $4/(4 + 1) = 4/5 = 80\%$ of the variance.
4. Check another direction: $u = (1/\sqrt2, 1/\sqrt2)$ gives $u^\top \Sigma u = \frac12(4) + \frac12(1) = 2.5$, which is less than 4.

**Result:** PC1 is the $x$-axis, variance 4, explained ratio 80%.

**Example 2 (medium): full PCA on 4 points.** Points $(1,1), (2,3), (3,2), (4,4)$.

1. Mean: $x$: $(1+2+3+4)/4 = 2.5$; $y$: $(1+3+2+4)/4 = 2.5$.
2. Centre (subtract 2.5 from each coordinate): $(-1.5, -1.5), (-0.5, 0.5), (0.5, -0.5), (1.5, 1.5)$.
3. $\text{Var}(x) = (2.25 + 0.25 + 0.25 + 2.25)/4 = 5/4 = 1.25$. $\text{Var}(y) = 1.25$ (the same squares).
4. $\text{Cov}(x, y) = [(-1.5)(-1.5) + (-0.5)(0.5) + (0.5)(-0.5) + (1.5)(1.5)]/4 = (2.25 - 0.25 - 0.25 + 2.25)/4 = 4/4 = 1$. So
$$\Sigma = \begin{bmatrix} 1.25 & 1 \\ 1 & 1.25 \end{bmatrix}.$$
5. Eigenvalues: solve $\det(\Sigma - \lambda I) = 0$, which is $(1.25 - \lambda)^2 - 1^2 = 0$. So $1.25 - \lambda = \pm 1$, giving $\lambda_1 = 2.25$ and $\lambda_2 = 0.25$.
6. Eigenvector for $\lambda = 2.25$: the first row of $(\Sigma - 2.25 I)v = 0$ says $(1.25 - 2.25)a + b = 0$, so $b = a$. Make it unit length: $v_1 = (1, 1)/\sqrt2$.
7. Eigenvector for $\lambda = 0.25$: $(1.25 - 0.25)a + b = 0$, so $b = -a$: $v_2 = (1, -1)/\sqrt2$. Check: $v_1^\top v_2 = (1 - 1)/2 = 0$, so they are orthogonal.
8. Project onto PC1 using $v_1^\top x = (x_1 + x_2)/\sqrt2$: $(-1.5, -1.5) \to -3/\sqrt2 \approx -2.121$; $(-0.5, 0.5) \to 0$; $(0.5, -0.5) \to 0$; $(1.5, 1.5) \to 2.121$.
9. Variance of these scores: $(4.5 + 0 + 0 + 4.5)/4 = 2.25 = \lambda_1$. It matches the formula $u^\top \Sigma u = \lambda_1$.
10. Explained ratio: $2.25/(2.25 + 0.25) = 2.25/2.5 = 0.9$.

**Result:** PC1 $= (1, 1)/\sqrt2$. One number per point (instead of two) keeps 90% of the spread.

**Example 3 (GATE level).** Zero-mean data in $\mathbb{R}^3$ (3-D real vectors) has covariance eigenvalues $6, 3, 1$. Let $u$ be the unit direction of maximum variance.

1. (a) The variance along $u$ is $\frac1n \sum (u^\top x^{(i)})^2 = u^\top \Sigma u = \lambda_1 = 6$.
2. (b) Keeping 2 PCs keeps $(6 + 3)/(6 + 3 + 1) = 9/10 = 90\%$.
3. (c) The average squared reconstruction error with 2 PCs is the dropped eigenvalue, $1$.
4. (d) The angle between PC1 and PC3 is $90^\circ$, because PCs are orthogonal.

**Result:** (a) 6, (b) 90%, (c) 1, (d) $90^\circ$.

### Common mistakes
> **Common mistake:** Forgetting to centre the data. PCA on uncentred data finds the direction of the mean, not of the spread.

> **Common mistake:** Picking the eigenvector of the **smallest** eigenvalue. Maximum variance = **largest** eigenvalue.

> **Common mistake:** Thinking PCs can be at any angle. They are always orthogonal ($90^\circ$).

> **Common mistake:** Thinking PCA uses labels. It is unsupervised; LDA uses labels.

> **Common mistake:** Ignoring feature scale. A feature in rupees (thousands) dominates one in metres. Standardise first if units differ.

> **Common mistake:** Forgetting to make the eigenvector unit length. $(1, 1)$ gives $u^\top \Sigma u = 4.5$, not $2.25$; divide by $\sqrt2$ first.

### How GATE asks it
- **2025 Q.60** (NAT, 2 marks): eigenvalues $100^{2-i}$; variance along the top direction $= \lambda_1 = 100$.
- **2026 Q.11** (MCQ, 1 mark): angle between the 1st and 10th PCs is $90^\circ$.
- **2024 Q.18** (match): PCA = dimensionality reduction.
- Expect: variance along PC1, explained-variance fractions, orthogonality, a $2 \times 2$ PCA by hand.

> **GATE tip:** For a $2 \times 2$ matrix $\begin{bmatrix} a & b \\ b & a \end{bmatrix}$, eigenvalues are $a + b$ and $a - b$, with eigenvectors $(1,1)$ and $(1,-1)$. This pattern appears often.

### Summary
- First we centre the data, so its average point sits at the origin.
- Then we build the covariance matrix $\Sigma$, a table of how much each feature spreads and how features move together.
- The spread along any unit direction $u$ is $u^\top \Sigma u$, so finding the "best view" means making this number as large as possible.
- That maximum is reached at the eigenvector with the largest eigenvalue, and the spread there equals that eigenvalue. The next PCs are the next eigenvectors, all at $90^\circ$.
- So each eigenvalue is a share of the total variance: keeping the top $k$ keeps $(\lambda_1 + \dots + \lambda_k)/\sum \lambda_j$, and the dropped eigenvalues are the error.
- That is why PCA compresses data with little loss, and why GATE questions reduce to "find or use the eigenvalues".
- Where this is used later: PCA feeds smaller, cleaner inputs to any model (regression, k-NN, neural networks), and the same eigenvector idea returns in SVD and LDA.

### Quick self-check
1. Eigenvalues 5, 3, 2. Fraction kept by PC1?

**Answer:** $5/(5 + 3 + 2) = 5/10 = 0.5$.

2. $\Sigma = \begin{bmatrix} 3 & 2 \\ 2 & 3 \end{bmatrix}$. Eigenvalues?

**Answer:** $3 + 2 = 5$ and $3 - 2 = 1$.

3. Dot product of PC2 and PC4?

**Answer:** 0, because PCs are orthogonal.

4. Eigenvalues 5, 3, 2 and you keep 2 PCs. Average squared reconstruction error?

**Answer:** The dropped eigenvalue, 2.
