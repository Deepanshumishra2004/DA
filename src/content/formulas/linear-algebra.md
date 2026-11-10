# Linear Algebra: formula sheet

## Vector Spaces, Subspaces & Independence

**Subspace test**
$$\mathbf 0 \in W,\quad u+v \in W,\quad cu \in W$$
Contains zero, closed under adding and stretching (any $c$, even negative) · *Use when:* "which sets are subspaces" · *e.g.* $x_1 + x_2 = 1$ fails: $(0,0)$ gives $0 \ne 1$.

**Always subspaces**
$$\operatorname{span}\{v_1,\dots,v_k\}, \qquad \{x : Ax = \mathbf 0\}$$
A span, or the solution set of equations all "$= 0$" · *Use when:* quick yes in MSQs · *e.g.* $\{x : x_1 - x_3 = 0\}$ is a plane through origin.

**Never subspaces**
$$\text{constant} \ne 0,\quad \alpha^2 v \text{ (non-negative weights)},\quad \text{union of two lines},\quad \text{balls}$$
Missing zero, cannot flip backwards, or sums escape · *Use when:* killing options · *e.g.* $\{\alpha^2(1,1)\}$ misses $(-1,-1)$.

**Linear independence**
$$c_1v_1 + \dots + c_kv_k = \mathbf 0 \Rightarrow \text{all } c_i = 0$$
No vector is built from the others · *Use when:* testing a set · *e.g.* $(2,4),(3,6)$: $(3,6) = 1.5(2,4)$, dependent.

**Too many vectors**
$$k > n \text{ vectors in } \mathbb{R}^n \Rightarrow \text{dependent}$$
Space has only $n$ independent directions · *Use when:* counting · *e.g.* 4 vectors in $\mathbb{R}^3$ are dependent.

**Dimension of a solution set**
$$\dim\{x \in \mathbb{R}^n : Ax = \mathbf 0\} = n - \operatorname{rank}A$$
Each independent equation removes one direction · *Use when:* dimension of a plane/line · *e.g.* $x + y + z + w = 0$ in $\mathbb{R}^4$: $4 - 1 = 3$.

**Orthonormal vectors**
$$u_i^\top u_j = 0 \ (i \ne j), \quad \|u_i\| = 1$$
Orthonormal implies independent (not reverse); orthonormal basis is not unique · *Use when:* true/false on bases · *e.g.* $(1,0),(1,1)$ independent but not orthonormal.

**Subspace through a ball**
$$\text{plane through origin} \cap \{x^\top x \le r^2\} = \text{disk of radius } r$$
Every subspace passes through the centre · *Use when:* geometry with subspaces · *e.g.* $r = 4$: area $16\pi$.

## Matrices & Special Matrices (Projection/Orthogonal/Idempotent)

**Reverse order rules**
$$(AB)^\top = B^\top A^\top, \quad (AB)^{-1} = B^{-1}A^{-1}, \quad \operatorname{tr}(AB) = \operatorname{tr}(BA)$$
Undo steps in reverse order, like socks then shoes · *Use when:* simplifying products · *e.g.* $\operatorname{tr}(xx^\top) = \operatorname{tr}(x^\top x) = \|x\|^2$.

**Orthogonal matrix**
$$Q^\top Q = I \iff \|Qx\| = \|x\| \ \forall x$$
Rotation or mirror; $Q^{-1} = Q^\top$, $\det Q = \pm 1$, full rank, eigenvalues of size 1 (may be complex) · *Use when:* "length preserved" · *e.g.* $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ has eigenvalues $\pm i$.

**Rotation powers**
$$R(\theta)^k = R(k\theta), \quad k\theta = 2\pi \Rightarrow R^k = I$$
Turning $k$ times adds the angles · *Use when:* huge powers · *e.g.* $\theta = 72^\circ$: $M^5 = I$, $M^{2026} = M^{1} = M$.

**Outer product $xx^\top$**
$$(xx^\top)x = \|x\|^2 x, \quad (xx^\top)v = 0 \text{ if } v \perp x$$
Rank 1; eigenvalues $\|x\|^2$ once, 0 ($n-1$ times) · *Use when:* $xx^\top$, $I + cxx^\top$ · *e.g.* $x = (1,2)$: eigenvalues $5, 0$.

**Shifted outer product**
$$I + c\,xx^\top \ (\|x\| = 1): \ \lambda = 1 + c \text{ once}, \ 1 \ (n-1 \text{ times})$$
Add $c\cdot$ (eigenvalue of $xx^\top$) to 1 · *Use when:* invertibility of $I + xx^\top$ · *e.g.* $c = 1$: eigenvalues 2 and 1, $\det = 2$.

**Idempotent**
$$P^2 = P \Rightarrow \lambda \in \{0,1\}, \ \operatorname{rank}P = \operatorname{tr}P$$
Once is enough; eigenvalues satisfy $\lambda^2 = \lambda$ · *Use when:* rank/trace of a projection · *e.g.* trace 2 means rank 2.

**Projection from orthonormal columns**
$$P = QQ^\top = \sum_{i=1}^k x_ix_i^\top$$
Keeps the $k$ vectors, kills the rest; eigenvalues 1 ($k$), 0 ($n-k$) · *Use when:* sum of $x_ix_i^\top$ · *e.g.* 5 vectors in $\mathbb{R}^{10}$: $\det = 0$.

**Centering matrix**
$$C = I - \tfrac1n\mathbf 1\mathbf 1^\top$$
Subtracts the mean; symmetric, $C^2 = C$ (not $I$), $C\mathbf 1 = \mathbf 0$, $\operatorname{tr}C = n - 1$ · *Use when:* you see $\mathbf 1\mathbf 1^\top$ · *e.g.* $(60,70,80) \to (-10,0,10)$.

**Special matrix comparison**

| Type | Definition | Eigenvalues | Invertible? |
|---|---|---|---|
| Symmetric | $A^\top = A$ | real | depends |
| Orthogonal | $Q^\top Q = I$ | size 1 (maybe complex) | always |
| Idempotent | $P^2 = P$ | 0 or 1 | only if $P = I$ |
| Involutory | $A^2 = I$ | $\pm 1$ | always |
| Orthogonal projection | $P^2 = P = P^\top$ | 0 or 1 | only if $P = I$ |

## Systems of Linear Equations & Gaussian Elimination

**Consistency**
$$Ax = b \text{ solvable} \iff \operatorname{rank}A = \operatorname{rank}[A \mid b]$$
Adding $b$ must not add a new direction · *Use when:* "no solution?" · *e.g.* a row $0 = 5$ after elimination means none.

**All solutions**
$$x = x_p + x_h, \quad Ax_h = \mathbf 0$$
One solution plus anything crushed to zero · *Use when:* unique vs infinite · *e.g.* $N(A) = \{\mathbf 0\}$ gives unique.

**Free variables**
$$\text{free} = n - \operatorname{rank}A$$
Unknowns minus independent equations (if consistent) · *Use when:* classifying · *e.g.* $3$ unknowns, rank 2: 1 free, infinite.

**Outcomes**
$$\text{exactly } 0,\ 1, \text{ or } \infty \text{ solutions}$$
Never exactly 2; uniqueness depends only on $A$; existence also on $b$ · *Use when:* MSQ traps · *e.g.* a $2\times3$ system is never unique.

**Homogeneous system**
$$Ax = \mathbf 0 \text{ always has } x = \mathbf 0; \ \text{nonzero solution} \iff \det A = 0 \ (\text{square})$$
Zero always works · *Use when:* $Bx = 0$ questions · *e.g.* $B\mathbf 1 = 0$ means infinitely many.

**Operation counts**
$$\text{full elimination} \approx \tfrac23 n^3 = O(n^3), \quad \text{back substitution} \approx \tfrac{n^2}{2} = O(n^2)$$
Triangular systems skip elimination · *Use when:* complexity MCQ · *e.g.* upper triangular: $O(n^2)$.

## Rank, Nullity & Determinant

**Rank-nullity**
$$\operatorname{rank}A + \operatorname{nullity}A = n \ (\text{columns})$$
Each input direction survives or is crushed · *Use when:* find the missing one · *e.g.* $5\times7$, rank 4: nullity 3.

**Rank bounds**
$$\operatorname{rank}A \le \min(m,n), \ \operatorname{rank}(AB) \le \min(\operatorname{rank}A, \operatorname{rank}B), \ \operatorname{rank}(A^\top A) = \operatorname{rank}A$$
Multiplying never creates directions · *Use when:* chain arguments · *e.g.* $A^3 = A \Rightarrow \operatorname{rank}A^2 = \operatorname{rank}A$.

**2 by 2 determinant**
$$\det\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad - bc$$
Signed area of the parallelogram of columns · *Use when:* any $2\times2$ · *e.g.* $\begin{pmatrix}3&2\\1&4\end{pmatrix}$: $12 - 2 = 10$.

**3 by 3 determinant**
$$a(ei - fh) - b(di - fg) + c(dh - eg)$$
Expand along row 1 with signs $+,-,+$ · *Use when:* no shortcut exists · *e.g.* first check for a dependent row: then $\det = 0$.

**Determinant rules**
$$\det(AB) = \det A\det B, \ \det A^\top = \det A, \ \det A^{-1} = \tfrac{1}{\det A}, \ \det(cA) = c^n\det A$$
Volumes multiply · *Use when:* $\det$ of products/polynomials · *e.g.* $3\times3$, $\det A = 2$: $\det 3A = 54$.

**Factor matrix polynomials**
$$\det(M^2 + kM) = \det M \cdot \det(M + kI)$$
Pull out $M$ first · *Use when:* $\det$ of a polynomial in $M$ · *e.g.* row 3 = row 1 + row 2 gives 0.

**Row operation effects**
$$\text{swap: } \times(-1), \quad \text{scale row by } c: \times c, \quad \text{add multiple of a row: no change}$$
· *Use when:* simplifying before expanding · *e.g.* triangular: $\det$ = product of diagonal.

**Invertibility equivalence**
$$\det A \ne 0 \iff \operatorname{rank} = n \iff \operatorname{nullity} = 0 \iff 0 \text{ not an eigenvalue}$$
All say "nothing squashed" · *Use when:* MSQs listing several · *e.g.* projection $\ne I$: all false.

## Eigenvalues & Eigenvectors

**Eigen equation**
$$Av = \lambda v, \ v \ne \mathbf 0$$
Direction kept, only stretched by $\lambda$ · *Use when:* checking a vector · *e.g.* $\begin{pmatrix}3&1\\1&3\end{pmatrix}(1,1) = 4(1,1)$.

**Characteristic equation**
$$\det(A - \lambda I) = 0$$
$\lambda$ makes $A - \lambda I$ squash a direction · *Use when:* actual eigenvalues · *e.g.* diagonal/triangular: read the diagonal.

**2 by 2 shortcut**
$$\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0$$
Complex iff $(\operatorname{tr}A)^2 < 4\det A$ · *Use when:* any $2\times2$ · *e.g.* tr 3, det 5: $9 < 20$, complex pair.

**Trace and determinant**
$$\textstyle\sum \lambda_i = \operatorname{tr}A, \quad \prod \lambda_i = \det A$$
Includes complex and repeated ones · *Use when:* sum/product asked · *e.g.* trace $1 + 2\cos t$ for a 3D rotation.

**Functions of $A$**
$$A^k v = \lambda^k v, \ A^{-1}v = \tfrac1\lambda v, \ (A + cI)v = (\lambda + c)v, \ p(A)v = p(\lambda)v$$
Do to $\lambda$ what you do to $A$; eigenvector unchanged · *Use when:* $A^3 - 2A^2 + A$ etc. · *e.g.* $\lambda = 1$: $1 - 2 + 1 = 0$.

**Row sums**
$$\text{each row sums to } s \Rightarrow A\mathbf 1 = s\mathbf 1$$
$\mathbf 1$ is an eigenvector · *Use when:* "row sums" in the question · *e.g.* stochastic matrix has eigenvalue 1.

**Same eigenvalues**
$$\lambda(A) = \lambda(A^\top)$$
So column sums $s$ also give eigenvalue $s$ · *Use when:* column-sum questions · *e.g.* columns sum to 2: $\lambda = 2$.

**Symmetric (spectral theorem)**
$$A = A^\top \Rightarrow A = Q\Lambda Q^\top$$
Real eigenvalues, perpendicular eigenvectors · *Use when:* covariance, $xx^\top$, quadratic forms · *e.g.* $\begin{pmatrix}2&1\\1&2\end{pmatrix}$: $3, 1$.

## Quadratic Forms & Definiteness

**Matrix of a form**
$$ax_1^2 + 2bx_1x_2 + cx_2^2 = x^\top\begin{pmatrix}a&b\\b&c\end{pmatrix}x$$
Split the cross term in half · *Use when:* converting · *e.g.* $3x_1^2 + 4x_1x_2 + 5x_2^2$: $b = 2$.

**Definiteness by eigenvalues**

| Type | Eigenvalues | Shape |
|---|---|---|
| Positive definite | all $> 0$ | bowl |
| Positive semidefinite | all $\ge 0$ | valley |
| Negative definite | all $< 0$ | hill |
| Indefinite | mixed signs | saddle |

**Sylvester (PD test)**
$$\text{all leading minors} > 0; \quad 2\times2: a > 0, \ ac - b^2 > 0$$
Top-left corner determinants positive · *Use when:* quick PD check · *e.g.* $\begin{pmatrix}2&1\\1&2\end{pmatrix}$: $2 > 0$, $3 > 0$.

**Gram matrix**
$$z^\top X^\top X z = \|Xz\|^2 \ge 0$$
$X^\top X$ always PSD; PD (so invertible) iff columns independent · *Use when:* $A_{ij} = x_i^\top x_j$ · *e.g.* independent $x_i$: $\det A > 0$.

**Rayleigh quotient**
$$\max_{x^\top x = 1} x^\top Ax = \lambda_{\max}, \quad \min_{x^\top x = 1} x^\top Ax = \lambda_{\min}$$
Weighted average of eigenvalues · *Use when:* max/min on unit sphere · *e.g.* centering matrix: max 1.

**PD consequences**
$$\text{PD} \Rightarrow \det A > 0, \ A^{-1} \text{ PD}$$
PSD alone does not give invertible · *Use when:* MSQ options · *e.g.* $\operatorname{diag}(1,0)$ is PSD, singular.

## LU Decomposition & SVD

**LU**
$$A = LU$$
$L$: 1s on diagonal, multipliers below; $U$: elimination result · *Use when:* computing factors · *e.g.* $\begin{pmatrix}2&1\\6&5\end{pmatrix}$: $\ell_{21} = 3$, $U = \begin{pmatrix}2&1\\0&2\end{pmatrix}$.

**Solving with LU**
$$Ly = b, \ Ux = y$$
Forward then backward, each $O(n^2)$ after one $O(n^3)$ factorisation · *Use when:* many right sides · *e.g.* $\det A = \prod u_{ii} = 4$.

**SVD**
$$A = U\Sigma V^\top$$
Rotate, stretch, rotate; works for any shape · *Use when:* singular value questions · *e.g.* $\sigma_1 \ge \sigma_2 \ge \dots \ge 0$.

**Singular values**
$$\sigma_i = \sqrt{\lambda_i(A^\top A)}$$
Never negative · *Use when:* general matrix · *e.g.* $\begin{pmatrix}3&0\\4&0\end{pmatrix}$: $A^\top A = \operatorname{diag}(25,0)$, $\sigma = 5, 0$.

**Special cases**
$$\text{sym. PSD: } \sigma_i = \lambda_i; \quad \text{sym.: } \sigma_i = \lvert \lambda_i \rvert$$
· *Use when:* $uu^\top$, $QQ^\top$, $X^\top X$ · *e.g.* $\operatorname{diag}(3,-4)$: $\sigma = 4, 3$.

**Rank-one matrix**
$$uv^\top: \ \sigma_1 = \|u\|\,\|v\|, \text{ others } 0$$
· *Use when:* outer products · *e.g.* $u = (1,2,3,4,5)$, $uu^\top$: $\sigma_1 = 55$.

**Rank from SVD**
$$\operatorname{rank}A = \#\{\sigma_i > 0\}$$
· *Use when:* rank questions · *e.g.* $\sigma = 4,2,0$: rank 2.

**Frobenius norm**
$$\|A\|_F^2 = \sum_{i,j} a_{ij}^2 = \sum_i \sigma_i^2$$
· *Use when:* checking singular values · *e.g.* $9 + 16 = 25 = 5^2$.

## Projections

**Onto a line**
$$\operatorname{proj}_a b = \frac{a^\top b}{a^\top a}a, \quad P = \frac{aa^\top}{a^\top a}$$
Shadow of $b$ on the line through $a$ · *Use when:* one direction · *e.g.* $b = (2,3,4)$, $a = (1,1,1)$: $(3,3,3)$.

**Error is perpendicular**
$$a^\top(b - \operatorname{proj}_a b) = 0, \quad X^\top(y - X\hat\beta) = \mathbf 0$$
Leftover is at right angles to the floor · *Use when:* checking answers · *e.g.* $e = (-1,0,1)$, $a^\top e = 0$.

**Onto column space**
$$P = X(X^\top X)^{-1}X^\top, \quad \hat\beta = (X^\top X)^{-1}X^\top y$$
Least squares = projection · *Use when:* regression · *e.g.* normal equations $X^\top X\hat\beta = X^\top y$.

**Orthonormal basis**
$$P = QQ^\top$$
· *Use when:* columns orthonormal · *e.g.* $Q = (1,0)^\top$: $P = \operatorname{diag}(1,0)$.

**Projection properties**
$$P^2 = P = P^\top, \ \lambda \in \{0,1\}, \ \operatorname{rank}P = \operatorname{tr}P = \dim U, \ \operatorname{nullity}P = n - \dim U$$
· *Use when:* MSQs on projections · *e.g.* onto a line in $\mathbb{R}^3$: rank 1, nullity 2.

**Complement**
$$I - P \text{ projects onto } U^\perp$$
· *Use when:* residual maker, centering · *e.g.* $I - \frac1n\mathbf 1\mathbf 1^\top$ removes the mean.
