# Machine Learning: formula sheet

## Linear Regression (Simple/Multiple)

**Least squares loss**
$$L = \sum_i (y_i - \hat y_i)^2$$
Add the squared gaps between real and predicted values · *Use when:* computing SSE of a line · *e.g.* residuals $0.1, -0.3$: $0.01 + 0.09 = 0.1$.

**Slope with intercept**
$$w_1 = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}$$
How $x$ and $y$ move together over how $x$ moves alone · *Use when:* fit $\hat y = w_0 + w_1 x$ · *e.g.* $(1,2),(2,3),(3,5),(4,6)$: $7/5 = 1.4$.

**Intercept**
$$w_0 = \bar y - w_1 \bar x$$
The line passes through the mean point · *Use when:* after the slope · *e.g.* $4 - 1.4 \times 2.5 = 0.5$.

**Line through the origin**
$$w^* = \frac{\sum x_i y_i}{\sum x_i^2}$$
Model $y = wx$ with no intercept · *Use when:* "fit $y = wx$" · *e.g.* $(-1,1),(2,-5),(3,5)$: $4/14 = 0.286$.

**Normal equation**
$$w^* = (X^\top X)^{-1} X^\top y$$
Many inputs; add a column of 1s for the intercept · *Use when:* matrix form · *e.g.* $x = 0,1,2$, $y = 1,3,4$: $w = (7/6, 1.5)$.

**Coefficient of determination**
$$R^2 = 1 - \frac{SSE}{SST}, \quad SST = \sum (y_i - \bar y)^2$$
Fraction of variation explained · *Use when:* fit quality · *e.g.* $1 - 0.2/10 = 0.98$.

**Residuals with intercept**
$$\sum_i e_i = 0$$
Positive and negative errors cancel exactly · *Use when:* find a missing residual · *e.g.* $0.4, -0.1, ?$ gives $-0.3$.

## Ridge Regression & Regularization

**Ridge objective**
$$J(w) = \sum_i (y_i - w^\top x_i)^2 + \lambda \lVert w \rVert_2^2$$
Error plus a fine on squared weights · *Use when:* value of regularized loss · *e.g.* error 9, $\lambda = 0.5$, $w = (2,-1)$: $9 + 2.5 = 11.5$.

**Squared L2 norm**
$$\lVert w \rVert_2^2 = \sum_j w_j^2$$
Sum of squared weights · *Use when:* ridge penalty · *e.g.* $(-3, 4)$: $25$.

**1-D ridge weight**
$$w = \frac{\sum x_i y_i}{\sum x_i^2 + \lambda}$$
Least squares with $\lambda$ added below · *Use when:* shrinkage NAT · *e.g.* $25/(14 + 6) = 1.25$.

**Matrix ridge**
$$w = (X^\top X + \lambda I)^{-1} X^\top y$$
Always invertible for $\lambda > 0$ · *Use when:* singular $X^\top X$ · *e.g.* more features than samples.

**Lasso**
$$J(w) = \sum_i (y_i - w^\top x_i)^2 + \lambda \sum_j \lvert w_j \rvert$$
L1 fine; sets some weights exactly 0 · *Use when:* ridge vs lasso MCQ · *e.g.* $(-3, 4)$: L1 $= 7$.

**Effect of $\lambda$**
$$\lambda \uparrow \;\Rightarrow\; \text{bias} \uparrow,\ \text{variance} \downarrow$$
Stronger fine = simpler model · *Use when:* statements · *e.g.* $\lambda = 0$ is OLS; $\lambda \to \infty$ gives $w \to 0$.

## Logistic Regression

**Sigmoid**
$$\sigma(z) = \frac{1}{1 + e^{-z}}$$
Squashes a score into $(0, 1)$ · *Use when:* probability of class 1 · *e.g.* $\sigma(0) = 0.5$, $\sigma(2) = 0.881$.

**Model**
$$P(y = 1 \mid x) = \sigma(w^\top x + b)$$
Discriminative: models $P(y \mid x)$ directly · *Use when:* predicting · *e.g.* $w = 1, b = -3, x = 4$: $\sigma(1) = 0.731$.

**Decision boundary**
$$w^\top x + b = 0$$
Where $p = 0.5$; a straight line · *Use when:* "boundary" · *e.g.* $2x - 6 = 0$: $x = 3$.

**Log loss**
$$\ell = -[y \ln p + (1 - y)\ln(1 - p)]$$
Confident and wrong costs a lot · *Use when:* training loss · *e.g.* $y = 1$, $p = 0.8$: $0.223$.

**Gradient step**
$$w \leftarrow w - \eta \sum_i (p_i - y_i) x_i$$
Move against error times input · *Use when:* one update · *e.g.* sum $-3$, $\eta = 0.1$: $w = 0.3$.

## k-Nearest Neighbours

**Euclidean distance**
$$d = \sqrt{\sum_j (p_j - q_j)^2}$$
Straight-line length · *Use when:* default distance · *e.g.* $(0,0)$ to $(3,4)$: $5$.

**Manhattan distance**
$$d = \sum_j \lvert p_j - q_j \rvert$$
City-block length · *Use when:* "Manhattan" or L1 · *e.g.* $(0,0)$ to $(3,4)$: $7$.

**k-NN prediction**
$$\hat y = \text{majority of } k \text{ nearest labels} \;\;\text{or}\;\; \frac{1}{k}\sum_{j=1}^{k} y_{(j)}$$
Vote (class) or average (number) · *Use when:* any k-NN · *e.g.* R, B, B gives B.

**Effect of $k$**
$$k \text{ small: high variance}; \quad k \text{ large: high bias}$$
$k = 1$ follows noise; $k = n$ predicts the majority · *Use when:* concept MCQ · *e.g.* use odd $k$ for 2 classes.

## Naive Bayes

**Bayes rule**
$$P(y \mid x) = \frac{P(x \mid y) P(y)}{P(x)}$$
Posterior = likelihood times prior over evidence · *Use when:* class probability · *e.g.* $\frac{3/12}{5/12} = 0.6$.

**Naive Bayes decision**
$$\hat y = \arg\max_y P(y) \prod_j P(x_j \mid y)$$
Features independent given the class · *Use when:* "which class" · *e.g.* spam $1/3$ vs ham $1/18$: spam.

**Misclassification probability**
$$P(\text{error} \mid x) = 1 - \max_y P(y \mid x)$$
Rest of the probability is the error · *Use when:* "probability of misclassifying" · *e.g.* posteriors $0.6, 0.4$: $0.4$.

**Parameter count**
$$2K + 1 \;\;(\text{2 classes}), \qquad (C - 1) + CK \;\;(C \text{ classes})$$
$K$ binary features · *Use when:* counting · *e.g.* $C = 3$, $K = 4$: $14$.

**Laplace smoothing**
$$P(x_j = 1 \mid y) = \frac{n_{j,y} + 1}{n_y + 2}$$
Add 1 to avoid zero probabilities · *Use when:* a count is 0 · *e.g.* $0$ of $8$: $1/10$.

**Model type**
$$\text{Naive Bayes, LDA: generative}; \quad \text{logistic regression, SVM: discriminative}$$
Generative models $P(x \mid y)$ · *Use when:* matching MCQ · *e.g.* 2024 Q.18.

## Linear Discriminant Analysis

**Fisher criterion**
$$J(u) = \frac{u^\top S_B u}{u^\top S_W u}$$
Between-class spread over within-class spread · *Use when:* comparing directions · *e.g.* means 2, 8, scatter $2 + 2$: $36/4 = 9$.

**Within-class scatter**
$$S_W = \sum_k \sum_{x \in k} (x - \mu_k)(x - \mu_k)^\top$$
Covariance-like spread, added over classes · *Use when:* computing the direction · *e.g.* $S_W = \text{diag}(32, 2)$.

**Optimal direction**
$$S_W^{-1} S_B u^* = \lambda u^*, \qquad u^* \propto S_W^{-1}(\mu_1 - \mu_2)$$
Top eigenvector; $\lambda = J(u^*)$ · *Use when:* "which equation" · *e.g.* $\text{diag}(1/32, 1/2)(2,3) = (0.0625, 1.5)$.

**Nearest-mean rule is linear**
$$f(x) = 2(\mu_g - \mu_r)^\top x + \lVert \mu_r \rVert^2 - \lVert \mu_g \rVert^2$$
$\lVert x \rVert^2$ cancels · *Use when:* linear vs quadratic MSQ · *e.g.* $\mu_r = (1,0)$, $\mu_g = (3,2)$: $w = (4,4)$, $b = -12$.

## Support Vector Machines

**Decision rule**
$$\hat y = \text{sign}(w^\top x + b)$$
Side of the line · *Use when:* classify · *e.g.* $w = (0.5, 0.5)$, $b = -2$, $(4,4)$: $+1$.

**Canonical constraint**
$$y_i (w^\top x_i + b) \ge 1, \quad = 1 \text{ for support vectors}$$
Nearest points score exactly $\pm 1$ · *Use when:* scaling $w$, finding SVs · *e.g.* $(3,0)$: $3k - 1 = 1$, $k = 2/3$.

**Margin**
$$\text{margin} = \frac{2}{\lVert w \rVert}$$
Full road width · *Use when:* "the margin is" · *e.g.* $w = (1,1)$: $\sqrt2$.

**Hard margin problem**
$$\min \tfrac12 \lVert w \rVert^2 \;\text{ s.t. }\; y_i(w^\top x_i + b) \ge 1$$
Shortest $w$ = widest road · *Use when:* formulation MCQ · *e.g.* separable data gives 100% training accuracy.

**Soft margin (hinge)**
$$\tfrac12 \lVert w \rVert^2 + C \sum_i \max(0, 1 - y_i(w^\top x_i + b))$$
Pay $C$ per unit of violation · *Use when:* non-separable data · *e.g.* score 0.25 gives hinge $0.75$.

**Polynomial kernel**
$$K(x, z) = (x^\top z)^2 = \phi(x)^\top \phi(z)$$
Dot product in a bigger space · *Use when:* kernel check · *e.g.* $(1,2),(3,1)$: $25$.

## Decision Trees & Entropy

**Entropy**
$$H = -\sum_i p_i \log_2 p_i$$
Mixedness in bits · *Use when:* any tree NAT · *e.g.* 4 Yes, 2 No: $0.918$.

**Information gain**
$$IG = H(S) - \sum_v \frac{\lvert S_v \rvert}{\lvert S \rvert} H(S_v)$$
Entropy before minus weighted entropy after · *Use when:* choose root · *e.g.* $1 - 0.811 = 0.189$.

**Gini impurity**
$$G = 1 - \sum_i p_i^2$$
0 when pure, 0.5 max for 2 classes · *Use when:* CART · *e.g.* 3 Yes, 1 No: $0.375$.

**Handy entropy values**

| Split | $H$ |
|---|---|
| 1/2, 1/2 | 1 |
| 1/3, 2/3 | 0.918 |
| 1/4, 3/4 | 0.811 |
| 0.4, 0.6 | 0.971 |
| 0.2, 0.8 | 0.722 |

## Bias-Variance & Model Evaluation

**Decomposition**
$$E[(\hat f - y)^2] = \text{Bias}^2 + \text{Variance} + \sigma^2$$
Off-centre + wobble + noise · *Use when:* trade-off statements · *e.g.* predictions 12, 8, 14, 10, truth 10: $1 + 5 = 6$.

**Accuracy**
$$\frac{TP + TN}{\text{total}}$$
Fraction correct · *Use when:* overall score · *e.g.* $22/30 = 11/15$.

**Precision**
$$\frac{TP}{TP + FP}$$
Of predicted positives, how many right (column) · *Use when:* false alarms matter · *e.g.* $14/16 = 0.875$.

**Recall**
$$\frac{TP}{TP + FN}$$
Of actual positives, how many found (row) · *Use when:* misses matter · *e.g.* $14/20 = 0.7$.

**F1 score**
$$F_1 = \frac{2PR}{P + R} = \frac{2TP}{2TP + FP + FN}$$
Harmonic mean of $P$ and $R$ · *Use when:* unbalanced classes · *e.g.* $24/32 = 0.75$.

**Under vs overfitting**

| | Train error | Test error | Problem |
|---|---|---|---|
| Underfit | high | high | high bias |
| Overfit | low | high | high variance |

## Cross-Validation

**k-fold CV error**
$$CV_{(k)} = \frac{1}{k} \sum_{j=1}^{k} E_j$$
Average of fold errors · *Use when:* comparing settings · *e.g.* $0.95/5 = 0.19$.

**Fold sizes**
$$\text{val} = n/k, \quad \text{train} = n - n/k$$
$n$ excludes the test set · *Use when:* sizes · *e.g.* $n = 1000$, $k = 5$: 200 and 800.

**LOOCV splits**
$$\text{splits} = n$$
One point left out each time · *Use when:* counting splits · *e.g.* $1000 - 100$ test $= 900$.

**Trainings for model selection**
$$k \times (\text{number of settings})$$
Each setting needs its own $k$ runs · *Use when:* cost questions · *e.g.* $5 \times 4 = 20$.

## Neural Networks / MLP

**Neuron**
$$a = g(w^\top x + b)$$
Weighted sum, bias, activation · *Use when:* forward pass · *e.g.* $\text{ReLU}(1 \cdot 2 + 1 \cdot 3) = 5$.

**ReLU and its slope**
$$\text{ReLU}(z) = \max(0, z), \quad \text{ReLU}'(z) = \begin{cases} 1 & z > 0 \\ 0 & z < 0 \end{cases}$$
Negative input blocks the gradient · *Use when:* backprop · *e.g.* $\text{ReLU}(-1) = 0$, gradient 0.

**Sigmoid slope**
$$\sigma'(z) = \sigma(z)(1 - \sigma(z))$$
Max $0.25$ at $z = 0$ · *Use when:* sigmoid backprop · *e.g.* $\sigma = 0.5$: $0.25$.

**Perceptron update (on a mistake)**
$$w \leftarrow w + y_n x_n, \quad b \leftarrow b + y_n$$
Score on that point changes by $y_n(\lVert x_n \rVert^2 + 1)$ · *Use when:* tracing training · *e.g.* $(2,2)$, $+1$, from 0: $w = (2,2)$, $b = 1$.

**Chain rule**
$$\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial \hat y} \frac{\partial \hat y}{\partial h} \frac{\partial h}{\partial w_1}$$
Multiply slopes along the path · *Use when:* gradients · *e.g.* $e \cdot u = 4 \times 2 = 8$.

**Gradient descent**
$$w \leftarrow w - \eta \frac{\partial L}{\partial w}$$
Step downhill · *Use when:* one update · *e.g.* $0.5 - 0.05 \times 6 = 0.2$.

**Parameter count (fully connected)**
$$\sum_{\text{layers}} (n_{in} n_{out} + n_{out})$$
Drop $+ n_{out}$ if no biases · *Use when:* counting · *e.g.* $30 \to 4 \to 3 \to 1$, no bias: $135$.

**Collapsed linear network**
$$\text{weight of } x_i = \sum_{\text{paths}} \prod_{\text{edges}} w$$
All ReLUs active = linear · *Use when:* "equivalent network" · *e.g.* 3 paths $\times 12 = 36$.

## Clustering (k-means/k-medoid)

**k-means objective**
$$J = \sum_j \sum_{x \in C_j} \lVert x - \mu_j \rVert^2$$
Total squared distance to centroids · *Use when:* SSE · *e.g.* two clusters with $12/9$ each: $24/9$.

**Assign step**
$$\text{cluster}(x) = \arg\min_j \lVert x - \mu_j \rVert^2$$
Join nearest centroid · *Use when:* each iteration · *e.g.* $(2,1)$: $1.25$ vs $13.81$, cluster 1.

**Update step**
$$\mu_j = \frac{1}{\lvert C_j \rvert} \sum_{x \in C_j} x$$
Centroid = mean · *Use when:* each iteration · *e.g.* $(1,1),(1,2)$: $(1, 1.5)$.

**Medoid**
$$m = \arg\min_{m \in C} \sum_{x \in C} d(x, m)$$
A real point with least total distance · *Use when:* k-medoid · *e.g.* $\{1,2,3,4,100\}$: $3$.

**Convex cells**
$$x, z \in C_j \Rightarrow \tfrac{x + z}{2} \in C_j$$
k-means regions are convex · *Use when:* "necessarily in the cluster" · *e.g.* $(1,1), (-1,1)$ give $(0,1)$.

## Hierarchical Clustering

**Single linkage**
$$D(C_1, C_2) = \min_{x \in C_1, y \in C_2} D(x, y)$$
Closest pair · *Use when:* "single" · *e.g.* $\min(4, 7) = 4$.

**Complete linkage**
$$D(C_1, C_2) = \max_{x \in C_1, y \in C_2} D(x, y)$$
Farthest pair · *Use when:* "complete" · *e.g.* $\max(4, 7) = 7$.

**Average linkage**
$$D(C_1, C_2) = \frac{1}{\lvert C_1 \rvert \lvert C_2 \rvert} \sum \sum D(x, y)$$
Mean of all cross pairs · *Use when:* "average" · *e.g.* $(6 + 4.5)/2 = 5.25$.

**Row update after merging $A, B$**
$$D(A \cup B, C) = \min \text{ or } \max \{D(A, C), D(B, C)\}$$
Min for single, max for complete · *Use when:* updating a matrix · *e.g.* $\min(4, 3) = 3$.

**First merge**
$$\arg\min_{i < j} D(x_i, x_j)$$
Same for every linkage · *Use when:* "which pair first" · *e.g.* Manhattan $0 + 2 + 2 = 4$.

## PCA & Dimensionality Reduction

**Covariance (centred data)**
$$\Sigma = \frac1n \sum_i x^{(i)} x^{(i)\top}$$
Variances on the diagonal · *Use when:* building PCA · *e.g.* $\begin{bmatrix} 1.25 & 1 \\ 1 & 1.25 \end{bmatrix}$.

**Variance along unit $u$**
$$\frac1n \sum_i (u^\top x^{(i)})^2 = u^\top \Sigma u$$
Projected variance · *Use when:* NAT on projections · *e.g.* top direction gives $\lambda_1 = 100$.

**Principal components**
$$\Sigma v = \lambda v, \quad \max_{\lVert u \rVert = 1} u^\top \Sigma u = \lambda_1$$
PCs = eigenvectors sorted by eigenvalue · *Use when:* max-variance direction · *e.g.* $(1,1)/\sqrt2$ with $\lambda = 2.25$.

**Explained variance**
$$\frac{\lambda_1 + \dots + \lambda_k}{\sum_j \lambda_j}$$
Fraction kept · *Use when:* how many PCs · *e.g.* $(6 + 3)/10 = 0.9$.

**Reconstruction error**
$$\text{error} = \sum_{j > k} \lambda_j$$
Sum of dropped eigenvalues · *Use when:* loss from compression · *e.g.* drop $\lambda_3 = 1$: error 1.

**Orthogonality**
$$v_i^\top v_j = 0 \;(i \ne j), \quad \theta = 90^\circ$$
$\Sigma$ is symmetric · *Use when:* angle between PCs · *e.g.* PC1 and PC10: $90^\circ$.

**$2 \times 2$ shortcut**
$$\begin{bmatrix} a & b \\ b & a \end{bmatrix}: \; \lambda = a \pm b, \; v = (1, \pm 1)$$
Symmetric pattern · *Use when:* quick PCA · *e.g.* $a = 3, b = 2$: $5, 1$.
