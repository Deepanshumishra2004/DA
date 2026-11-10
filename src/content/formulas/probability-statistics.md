# Probability & Statistics: formula sheet

## Counting & Combinatorics

**Multiplication / addition rule**
$$\text{step 1 AND step 2: } m \times n, \qquad \text{option A OR option B: } m + n$$
Steps in sequence multiply; separate alternatives add · *Use when:* building any count · *e.g.* 3 shirts, 2 trousers: 6 outfits.

**Permutation**
$$^nP_r = \frac{n!}{(n-r)!}$$
Order matters · *Use when:* ranks, positions · *e.g.* gold/silver/bronze among 8: $8 \cdot 7 \cdot 6 = 336$.

**Combination**
$$\binom{n}{r} = \frac{n!}{r!(n-r)!}, \qquad \binom{n}{r} = \binom{n}{n-r}$$
Order does not matter · *Use when:* teams, committees · *e.g.* $\binom{6}{3} = 20$.

**Subsets**
$$2^n \text{ subsets}, \qquad 2^n - 1 \text{ non-empty}$$
Each element is in or out · *Use when:* random subset questions · *e.g.* $\{1,\dots,5\}$: 31 non-empty.

**Stars and bars**
$$x_1 + \dots + x_k = n: \ \binom{n+k-1}{k-1} \text{ with } x_i \ge 0, \qquad \binom{n-1}{k-1} \text{ with } x_i \ge 1$$
Arrange $n$ stars and $k-1$ bars · *Use when:* integer solutions, identical items into boxes · *e.g.* $a+b+c = 10$: $\binom{12}{2} = 66$ non-negative, $\binom{9}{2} = 36$ positive.

**Lower bounds**
$$x_i \ge m: \text{ give each } m \text{ first, share } n - km$$
Remove the forced part, then stars and bars · *Use when:* "each at least 2" · *e.g.* $x_1+x_2+x_3 = 10$, $x_i \ge 2$: $\binom{6}{2} = 15$.

**Inclusion-exclusion**
$$\lvert A \cup B \rvert = \lvert A \rvert + \lvert B \rvert - \lvert A \cap B \rvert$$
Remove the double-counted overlap · *Use when:* "A or B" · *e.g.* 1–30 divisible by 2 or 3: $15 + 10 - 5 = 20$.

**Circular arrangements and pairings**
$$(n-1)! \text{ round table}, \qquad \frac{(2m)!}{2^m m!} \text{ ways to split } 2m \text{ into pairs}$$
Rotations are the same; pairs and pair-order do not matter · *Use when:* round tables, swaps · *e.g.* 4 objects into 2 pairs: 3.

**Involutions** ($f(f(x)) = x$)
$$\text{count} = \sum_{j} \frac{n!}{2^j\,j!\,(n-2j)!}$$
Only fixed points and swaps allowed · *Use when:* bijections with $f(f(n)) = n$ · *e.g.* $n = 4$: $1 + 6 + 3 = 10$; $n = 5$: $1 + 10 + 15 = 26$.

## Basic Probability & Conditional Probability

**Classical probability**
$$P(A) = \frac{\text{favourable}}{\text{total}}$$
Only when all outcomes are equally likely · *Use when:* dice, coins, cards · *e.g.* even on a die: $3/6 = 0.5$.

**Complement**
$$P(A^c) = 1 - P(A), \qquad P(\text{at least one}) = 1 - P(\text{none})$$
Count the opposite · *Use when:* "at least one", "not all" · *e.g.* 100 dice, at least one 1: $1 - (5/6)^{100}$.

**Union**
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$
Overlap is counted twice, so subtract once · *Use when:* "A or B" · *e.g.* $0.5 + 0.4 - 0.2 = 0.7$.

**Conditional probability**
$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$
Zoom into the world where $B$ happened · *Use when:* "given that" · *e.g.* sum of two dice is 8; P(a six) $= 2/5$.

**Multiplication rule**
$$P(A \cap B) = P(A \mid B)\,P(B)$$
First $B$, then $A$ inside $B$ · *Use when:* draws in steps · *e.g.* 2 aces without replacement: $\frac{4}{52}\cdot\frac{3}{51} = \frac{1}{221}$.

**Independence**
$$P(A \cap B) = P(A)\,P(B) \iff P(A \mid B) = P(A)$$
Knowing one changes nothing · *Use when:* separate coins/dice · *e.g.* "sum 7" and "first die 3": $\frac1{36} = \frac16 \cdot \frac16$, independent.

**Disjoint vs independent**
$$A \cap B = \emptyset \Rightarrow P(A \cap B) = 0 \ne P(A)P(B) \text{ if both } > 0$$
Mutually exclusive events with positive chance are dependent · *Use when:* true/false items · *e.g.* 3 coins: "≥2 heads" and "≥2 tails" have $P(\text{both}) = 0$.

**At least one success in $n$ trials**
$$1 - (1-p)^n$$
None succeed has chance $(1-p)^n$ · *Use when:* repeated independent tries · *e.g.* 5 tosses, at least one head: $31/32$.

**Total probability**
$$P(A) = \sum_i P(A \mid B_i)\,P(B_i)$$
Add the chance of $A$ through every case · *Use when:* boxes, machines, groups · *e.g.* $0.8(0.3) + 0.1(0.7) = 0.31$.

## Bayes Theorem

**Bayes (two cases)**
$$P(B \mid A) = \frac{P(A \mid B)P(B)}{P(A \mid B)P(B) + P(A \mid B^c)P(B^c)}$$
Your branch divided by all branches showing the evidence · *Use when:* reverse a conditional · *e.g.* $P(D \mid +) = \frac{0.24}{0.24 + 0.07} \approx 0.77$.

**Bayes (many causes)**
$$P(B_j \mid A) = \frac{P(A \mid B_j)P(B_j)}{\sum_i P(A \mid B_i)P(B_i)}$$
Posterior = prior × likelihood ÷ total · *Use when:* 3 boxes/machines · *e.g.* boxes $\frac12, \frac16, \frac13$ with white chances $\frac13, \frac23, \frac12$: $P(B_2 \mid W) = \frac{1/9}{4/9} = 0.25$.

**Words**
$$\text{prior } P(B), \quad \text{likelihood } P(A \mid B), \quad \text{posterior } P(B \mid A)$$
Before evidence, how evidence behaves, after evidence · *Use when:* reading the question · *e.g.* "test positive 80% if sick" is a likelihood.

**Odds form**
$$\frac{P(B \mid A)}{P(B^c \mid A)} = \frac{P(B)}{P(B^c)} \times \frac{P(A \mid B)}{P(A \mid B^c)}$$
Posterior odds = prior odds × likelihood ratio · *Use when:* quick check · *e.g.* $0.25 \times 10 = 2.5$ odds, so $2.5/3.5 \approx 0.714$.

**Test vocabulary**
$$\text{sensitivity} = P(+ \mid D), \quad \text{specificity} = P(- \mid D^c), \quad \text{false positive} = 1 - \text{specificity}$$
Rare disease ⇒ many positives are false · *Use when:* medical tests · *e.g.* 1% prevalence, 90% sensitivity, 5% false positive: $P(D \mid +) \approx 0.15$.

## Random Variables & Expectation/Variance

**Expectation**
$$E[X] = \sum x\,p(x) \quad \text{or} \quad \int x f(x)\,dx$$
Weighted average, balance point · *Use when:* "expected value" · *e.g.* values 0,1,2 with 0.2,0.5,0.3: $E = 1.1$.

**Function of X**
$$E[g(X)] = \sum g(x)\,p(x) \quad \text{or} \quad \int g(x) f(x)\,dx$$
Apply $g$, then average · *Use when:* $E[X^2]$ · *e.g.* above: $E[X^2] = 0.5 + 1.2 = 1.7$.

**Variance**
$$\mathrm{Var}(X) = E[X^2] - (E[X])^2$$
Mean of square minus square of mean · *Use when:* every variance · *e.g.* $1.7 - 1.21 = 0.49$.

**Linearity**
$$E[aX + bY + c] = aE[X] + bE[Y] + c$$
Always true, even if dependent · *Use when:* expected sums and counts · *e.g.* $E[3X - 2] = 3(1.1) - 2 = 1.3$.

**Scaling variance**
$$\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)$$
Shift does nothing; scale squares · *Use when:* $Y = aX + b$ · *e.g.* $\mathrm{Var}(3X - 2) = 9 \times 0.49 = 4.41$.

**Variance of sum/difference**
$$\mathrm{Var}(X \pm Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) \pm 2\,\mathrm{Cov}(X,Y)$$
Independent ⇒ variances just add (even for minus) · *Use when:* sums of independent pieces · *e.g.* $3 + 5 = 8$.

**Independent product**
$$E[XY] = E[X]E[Y], \qquad \mathrm{Var}(XY) = E[X^2]E[Y^2] - (E[X]E[Y])^2$$
Needs independence · *Use when:* product of independent RVs · *e.g.* $X \sim$ Bern(0.5), $Y \sim N(0,4)$: $\mathrm{Var}(XY) = 0.5 \times 4 = 2$.

**Indicator**
$$E[I_A] = P(A), \qquad I_A^2 = I_A$$
Count = sum of indicators · *Use when:* expected counts · *e.g.* expected sixes in 12 rolls: $12 \times \frac16 = 2$.

**CDF**
$$F(x) = P(X \le x), \quad P(a < X \le b) = F(b) - F(a)$$
Non-decreasing, from 0 to 1, right-continuous; discrete ⇒ jumps of size $P(X = a)$ · *Use when:* CDF true/false · *e.g.* "left-continuous" and "always positive" are false.

**Waiting time**
$$E[\text{first success}] = \frac1p, \qquad E[\text{2 in a row}] = \frac1p + \frac{1}{p^2}$$
States: $E_s = 1 + \sum P(\text{next})E_{\text{next}}$ · *Use when:* "expected throws until" · *e.g.* two evens in a row: $2 + 4 = 6$.

## Discrete Distributions

| Name | $P(X = k)$ | Mean | Variance |
|---|---|---|---|
| Bernoulli($p$) | $p$ for 1, $1-p$ for 0 | $p$ | $p(1-p)$ |
| Binomial($n,p$) | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Geometric($p$) | $(1-p)^{k-1}p$, $k \ge 1$ | $\frac1p$ | $\frac{1-p}{p^2}$ |
| Poisson($\lambda$) | $\frac{e^{-\lambda}\lambda^k}{k!}$ | $\lambda$ | $\lambda$ |
| Uniform $\{1..n\}$ | $\frac1n$ | $\frac{n+1}{2}$ | $\frac{n^2-1}{12}$ |

**Binomial**
$$P(X = k) = \binom{n}{k}p^k(1-p)^{n-k}$$
$k$ successes in $n$ independent trials (with replacement) · *Use when:* fixed $n$, same $p$ · *e.g.* 5 tosses, 2 heads: $10/32 = 0.3125$.

**Poisson**
$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}, \qquad \text{mean} = \text{variance} = \lambda$$
Rare events at an average rate · *Use when:* calls per hour, typos per page · *e.g.* $\lambda = 2$: $P(X \ge 2) = 1 - 3e^{-2} \approx 0.594$.

**Geometric tail and memory**
$$P(X > k) = (1-p)^k, \qquad P(X > s+t \mid X > s) = P(X > t)$$
First $k$ trials all fail; no memory · *Use when:* "until the first" · *e.g.* $p = \frac12$: $P(X > 3) = \frac18$.

**Sums**
$$\text{Bin}(n_1,p) + \text{Bin}(n_2,p) = \text{Bin}(n_1+n_2,p), \qquad \text{Pois}(\lambda_1) + \text{Pois}(\lambda_2) = \text{Pois}(\lambda_1+\lambda_2)$$
Independent copies combine · *Use when:* totals over time · *e.g.* Pois(2) + Pois(3) = Pois(5).

**Poisson approximation**
$$\text{Bin}(n, p) \approx \text{Pois}(np), \ n \text{ large}, p \text{ small}$$
Many trials, tiny chance · *Use when:* rare defects in large batches · *e.g.* $n = 1000$, $p = 0.002$: Pois(2).

**Hypergeometric (no replacement)**
$$P(X = k) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}, \qquad E[X] = \frac{nK}{N}$$
Mean same as with replacement · *Use when:* drawing without putting back · *e.g.* 5 white, 10 black, draw 3: expected black $= 2$.

**Shared cell trick**
$$P(R = r, C = c) = \sum_{a} P(\text{cell} = a)\,P(\text{rest of row} = r - a)\,P(\text{rest of col} = c - a)$$
Condition on the overlap, then the rest is independent · *Use when:* row and column sums of a random matrix · *e.g.* $5 \times 5$ Bern(0.5), both 3: $\frac{13}{128} \approx 0.10$.

## Continuous Distributions

| Name | pdf | Mean | Variance |
|---|---|---|---|
| Uniform($a,b$) | $\frac{1}{b-a}$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Exponential (rate $\lambda$) | $\lambda e^{-\lambda x}$, $x \ge 0$ | $\frac1\lambda$ | $\frac1{\lambda^2}$ |
| Normal $N(\mu,\sigma^2)$ | $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$ | $\mu$ | $\sigma^2$ |
| Chi-square $\chi^2_k$ | sum of $k$ squared $N(0,1)$ | $k$ | $2k$ |
| Student $t_k$ | symmetric, heavy tails | $0$ ($k>1$) | $\frac{k}{k-2}$ ($k>2$) |

**Probability = area**
$$P(a \le X \le b) = \int_a^b f(x)\,dx = F(b) - F(a), \qquad f = F'$$
Single points have probability 0 · *Use when:* any interval · *e.g.* $F(x) = \frac14(x+1)^2$: $P(\lvert X \rvert \le 0.5) = 0.5625 - 0.0625 = 0.5$.

**Constant and median**
$$\int f(x)\,dx = 1, \qquad F(m) = 0.5$$
Total area 1; median halves the area · *Use when:* "find $c$", "find the median" · *e.g.* $f = cx^2$ on $[0,3]$: $c = \frac19$, median $= 13.5^{1/3} \approx 2.38$.

**Uniform CDF**
$$F(x) = \frac{x-a}{b-a}$$
Straight line from 0 to 1 · *Use when:* uniform probabilities, median = midpoint · *e.g.* median of $U(t, 4)$ is 3 ⇒ $t = 2$.

**Two independent uniforms**
$$P((X,Y) \in R) = \text{area}(R) \times \frac{1}{(b_1-a_1)(b_2-a_2)}$$
Joint density is a constant · *Use when:* $P(X \ge Y)$ · *e.g.* $U[1,3]$, $U[2,4]$: triangle $\frac12 \times \frac14 = 0.125$.

**Exponential survival**
$$P(X > x) = e^{-\lambda x} \quad (\text{mean } \theta: \ e^{-x/\theta})$$
Survival drops by a fixed factor per unit time · *Use when:* waiting times · *e.g.* $e^{-2\lambda} = 0.25 \Rightarrow \lambda = \ln 2$.

**Memoryless**
$$P(X > s + t \mid X > s) = P(X > t)$$
Past waiting is forgotten · *Use when:* "given it lasted" · *e.g.* $P(X > 10 \mid X > 5) = P(X > 5) = 0.35$.

**Exponential extras**
$$\text{median} = \frac{\ln 2}{\lambda}, \quad P(\lfloor X \rfloor = k) = q^k(1-q), \ q = e^{-\lambda}, \quad \min \sim \text{Exp}(\lambda_1 + \lambda_2)$$
Floor of exponential is geometric · *Use when:* median, floor, first failure · *e.g.* mean $\frac{1}{\ln 10}$: $q = 0.1$.

**Standardise**
$$Z = \frac{X - \mu}{\sigma}, \qquad P(X \le x) = \Phi\!\left(\frac{x-\mu}{\sigma}\right)$$
Shift and stretch to $N(0,1)$; use $\sigma$, not $\sigma^2$ · *Use when:* every normal question · *e.g.* $N(50,16)$: $P(46 < X < 58) = \Phi(2) - \Phi(-1) = 0.8185$.

**$\Phi$ values**
$$\Phi(-z) = 1 - \Phi(z); \ \Phi(1) = 0.8413, \ \Phi(1.645) = 0.95, \ \Phi(1.96) = 0.975, \ \Phi(2) = 0.9772, \ \Phi(2.576) = 0.995$$
68-95-99.7 within 1, 2, 3 SD · *Use when:* reading probabilities · *e.g.* $P(\lvert Z \rvert \le 2) \approx 0.954$.

**Normal moments**
$$E[Z] = E[Z^3] = 0, \quad E[Z^2] = 1, \quad E[Z^4] = 3, \quad \mathrm{Var}(Z^2) = 2$$
Odd moments vanish by symmetry · *Use when:* polynomials in $Z$ · *e.g.* $\mathrm{Var}(Z^2) = 3 - 1 = 2$.

**Normal sums**
$$aX + b \sim N(a\mu + b, a^2\sigma^2), \qquad X + Y \sim N(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$$
Linear changes and independent sums stay normal · *Use when:* combining normals · *e.g.* $N(1,4) + N(2,5) = N(3, 9)$.

**Chi-square facts**
$$Z^2 \sim \chi^2_1, \quad \chi^2_2 = \text{Exp(mean 2)}, \quad \chi^2_a + \chi^2_b = \chi^2_{a+b}$$
Degrees of freedom add · *Use when:* MSQs on chi-square · *e.g.* $Z_1^2 + Z_2^2 + Z_3^2$: mean 3, variance 6.

**t and Cauchy**
$$t_k = \frac{Z}{\sqrt{V/k}}, \qquad t_1: \ h(y) = \frac{1}{\pi(1+y^2)}, \ h(0) = 0.318 < \phi(0) = 0.399$$
Same centre, lower peak, heavier tails than $N(0,1)$; curves cross near $\pm 1.85$ · *Use when:* comparing $t$ with $Z$ · *e.g.* $G(0) = H(0) = 0.5$, $G(-c) < H(-c)$.

## Joint, Marginal & Conditional Distributions

**Marginal**
$$p_X(x) = \sum_y p(x,y), \qquad f_X(x) = \int f(x,y)\,dy$$
Add out the other variable over its allowed range · *Use when:* one variable from a joint · *e.g.* $f = 6y$ on $0<y<x<1$: $f_X = 3x^2$.

**Conditional**
$$f_{Y \mid X}(y \mid x) = \frac{f(x,y)}{f_X(x)}$$
A slice rescaled to area 1; constants cancel · *Use when:* "given $X = x$" · *e.g.* $f \propto xy$ on $0<y<x$: $f_{Y \mid X} = \frac{2y}{x^2}$.

**Conditional mean**
$$E[Y \mid X = x] = \int y\,f_{Y \mid X}(y \mid x)\,dy$$
Average of the slice · *Use when:* $E[Y \mid X = 1.5]$ · *e.g.* slice $\frac{2y}{x^2}$: $E = \frac{2x}{3}$, at 1.5 gives 1.

**Tower rule**
$$E[E[Y \mid X]] = E[Y], \qquad E[XY] = E[X\,E[Y \mid X]]$$
Average of slice averages · *Use when:* two-stage models · *e.g.* $E[Y \mid X] = 3X$, $E[X] = 2$ ⇒ $E[Y] = 6$.

**Total variance**
$$\mathrm{Var}(Y) = E[\mathrm{Var}(Y \mid X)] + \mathrm{Var}(E[Y \mid X])$$
Within-slice spread + between-slice spread · *Use when:* hierarchical models · *e.g.* $Y \mid X \sim N(X, 1)$, $X \sim N(0,4)$: $1 + 4 = 5$.

**Independence**
$$f(x,y) = f_X(x)f_Y(y) \ \text{everywhere}$$
Non-rectangular support ⇒ dependent · *Use when:* "are they independent?" · *e.g.* $4xy$ on $[0,1]^2$: independent.

## Descriptive Statistics, Covariance & Correlation

**Mean update**
$$\bar x_{\text{new}} = \frac{n\bar x + x_{\text{new}}}{n+1}$$
Rebuild the total, then divide · *Use when:* a point is added · *e.g.* $\frac{50 \times 40 + 142}{51} = 42$.

**Median and mode**
$$\text{median} = \text{middle of sorted data}, \qquad \text{mode} = \text{most frequent}$$
Even $n$: average the two middles · *Use when:* centre questions · *e.g.* 2,4,4,5,7,8: median 4.5, mode 4.

**Variance (data)**
$$\sigma^2 = \frac1n\sum(x_i - \bar x)^2, \qquad s^2 = \frac{1}{n-1}\sum(x_i - \bar x)^2$$
Sample version divides by $n-1$ (unbiased) · *Use when:* read which one is asked · *e.g.* deviations squared sum 24, $n = 6$: 4 and 4.8.

**Shortcut**
$$\sum(x_i - \bar x)^2 = \sum x_i^2 - n\bar x^2, \qquad \sum(x_i - \bar x) = 0$$
Faster than deviations · *Use when:* given $\sum x^2$ · *e.g.* $\sum x^2 = 174$, $n = 6$, $\bar x = 5$: $174 - 150 = 24$.

**Pairwise identity**
$$\sum_i\sum_j (x_i - x_j)^2 = 2n\sum_i (x_i - \bar x)^2$$
Cross term vanishes because deviations sum to 0 · *Use when:* double sums of differences · *e.g.* $n = 100$, double sum 198000 ⇒ $\sum d^2 = 990$, $s^2 = 10$.

**Linear transform**
$$y = ax + b: \ \bar y = a\bar x + b, \ \mathrm{SD}_y = \lvert a \rvert \mathrm{SD}_x$$
Shift moves centre only · *Use when:* unit changes · *e.g.* SD 2, $y = 3x + 4$: SD 6.

**Covariance**
$$\mathrm{Cov}(X,Y) = E[XY] - E[X]E[Y], \qquad \mathrm{Cov}(aX+b, cY+d) = ac\,\mathrm{Cov}(X,Y)$$
Do they move together? · *Use when:* any covariance · *e.g.* indicators "HH" and "≥1 H": $\frac14 - \frac{3}{16} = 0.0625$.

**Correlation**
$$\rho = \frac{\mathrm{Cov}(X,Y)}{\sigma_X\sigma_Y} \in [-1, 1]$$
Unit-free straight-line strength; $\lvert \rho \rvert = 1$ iff exact line · *Use when:* "correlation" · *e.g.* Cov 6, SDs 2 and 5: 0.6.

**Uncorrelated is not independent**
$$X \text{ symmetric about } 0, \ Y = g(X^2) \Rightarrow \mathrm{Cov}(X, Y) = 0$$
Odd moments vanish · *Use when:* "find correlation" with a U-shape · *e.g.* $X \sim U(-1,1)$, $E[Y \mid X] = X^2$: $\rho = 0$.

## Central Limit Theorem & Sampling

**Sum and mean**
$$E[S_n] = n\mu, \ \mathrm{SD}(S_n) = \sigma\sqrt n; \qquad E[\bar X] = \mu, \ \mathrm{SD}(\bar X) = \frac{\sigma}{\sqrt n}$$
Variances add, SDs do not · *Use when:* step 1 of every CLT question · *e.g.* 100 packets, SD 5: total SD 50.

**CLT**
$$\frac{S_n - n\mu}{\sigma\sqrt n} \approx N(0,1)$$
Sums of many i.i.d. pieces are bell-shaped · *Use when:* "approximately", large $n$ · *e.g.* 300 Bern(0.25): mean 75, SD 7.5, $P(60 \le Y \le 90) \approx \Phi(2) - \Phi(-2)$.

**Sample proportion**
$$E[\hat p] = p, \qquad \mathrm{Var}(\hat p) = \frac{p(1-p)}{n}$$
Unbiased, variance shrinks with $n$ · *Use when:* coin-toss estimators · *e.g.* $p = 0.5$, $n = 100$: SD 0.05.

**Normal approximations**
$$\text{Bin}(n,p) \approx N(np, np(1-p)), \qquad \text{Pois}(n) \approx N(n, n)$$
Both are sums · *Use when:* large $n$; disguised limits · *e.g.* $\lim \sum_{k=0}^{n} e^{-n}n^k/k! = \Phi(0) = 0.5$.

**Normal sample results**
$$\bar X \sim N\!\left(\mu, \frac{\sigma^2}{n}\right), \quad \frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1}, \quad \frac{\bar X - \mu}{S/\sqrt n} \sim t_{n-1}$$
One degree of freedom used by $\bar X$ · *Use when:* MSQs on sampling distributions · *e.g.* $n = 10$: $\chi^2_9$, $t_9$.

**Standard normal samples**
$$\sum X_i^2 \sim \chi^2_n, \qquad (\sqrt n\,\bar X)^2 \sim \chi^2_1$$
No estimation ⇒ all $n$ degrees; $\sqrt n \bar X$ is one $N(0,1)$ · *Use when:* true/false on chi-square · *e.g.* $(\sqrt n \bar X)^2 \sim \chi^2_2$ is false.

## Confidence Intervals & Hypothesis Testing

**Mean CI**
$$\bar x \pm z_{\alpha/2}\frac{\sigma}{\sqrt n} \ (\sigma \text{ known}), \qquad \bar x \pm t_{\alpha/2, n-1}\frac{s}{\sqrt n}$$
Estimate ± critical value × standard error · *Use when:* "95% CI" · *e.g.* $52 \pm 1.96 \times 2 = [48.08, 55.92]$.

**Critical values**
$$z_{0.05} = 1.645, \quad z_{0.025} = 1.96, \quad z_{0.005} = 2.576$$
For 90%, 95%, 99% two-sided · *Use when:* building intervals/tests · *e.g.* 99% CI uses 2.576.

**Width vs n**
$$\text{width} \propto \frac{1}{\sqrt n}$$
Halve the width ⇒ 4 times the data · *Use when:* sample-size questions · *e.g.* 3 times narrower ⇒ 9 times $n$.

**Proportion CI**
$$\hat p \pm z_{\alpha/2}\sqrt{\frac{\hat p(1-\hat p)}{n}}$$
Same pattern for fractions · *Use when:* surveys · *e.g.* $\hat p = 0.5$, $n = 100$: $0.5 \pm 0.098$.

**z and t statistics**
$$z = \frac{\bar x - \mu_0}{\sigma/\sqrt n}, \qquad t = \frac{\bar x - \mu_0}{s/\sqrt n} \ (n-1 \text{ d.f.})$$
How many standard errors from the claim · *Use when:* testing a mean · *e.g.* $\frac{52 - 50}{2} = 1 < 1.96$: do not reject.

**Chi-square tests**
$$\chi^2 = \sum \frac{(O - E)^2}{E}; \quad \text{d.f.} = k - 1 \ (\text{fit}), \ (r-1)(c-1) \ (\text{independence})$$
Observed vs expected counts · *Use when:* categorical data · *e.g.* die 60 rolls: $\chi^2 = 4.2$, 5 d.f.

**Errors and p-value**
$$\alpha = P(\text{Type I}), \quad \beta = P(\text{Type II}), \quad \text{power} = 1 - \beta$$
Reject $H_0$ iff p-value $\le \alpha$ · *Use when:* concept MSQs · *e.g.* p-value 0.317 at $\alpha = 0.05$: keep $H_0$.
