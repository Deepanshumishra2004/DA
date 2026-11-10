# Linear Algebra

Linear algebra is the maths of **arrows** and **tables of numbers**. Think of a delivery boy on a map. He walks 3 blocks east and 2 blocks north. We can draw this as one arrow. We write it as a short list $(3, 2)$. That list is a **vector**.

Now imagine a big photocopier that can stretch, rotate or squash a whole picture. A **matrix** is that photocopier. You give it an arrow, and it gives you back a new arrow. Linear algebra studies how these machines move space around.

**Why it matters for data science and AI.** A dataset is a table: each row is a student, each column is a subject's marks. That table is a matrix. Linear regression finds the "shadow" of your data on a flat surface (a **projection**). PCA finds the directions in which the data spreads the most (**eigenvectors**). Recommender systems like Netflix use **SVD**. Neural networks are mostly matrix multiplications. So almost every ML topic in GATE DA uses this subject.

**How GATE tests it.** In GATE DA 2024, 2025 and 2026 there were **19 Linear Algebra questions worth 30 marks**. That is about **10 marks every year**, which is a lot. Most questions are short MSQs like "which statements about this matrix are always true". A few are NAT questions (you type a number) such as a determinant or a sum of singular values. Heavy calculation is rare. What wins marks is knowing **properties**: what happens when a matrix is a rotation, a projection, or built from a vector like $xx^\top$.

**Study order (and why).**
1. Vector spaces (the "arrows" world, everything lives here).
2. Matrices and special matrices (the "machines").
3. Systems of equations (using a machine backwards).
4. Rank, nullity, determinant (how much a machine squashes).
5. Eigenvalues and eigenvectors (directions a machine only stretches).
6. Quadratic forms (bowls and saddles, uses eigenvalues).
7. Projections (shadows, needed for regression).
8. LU and SVD (breaking a machine into simple pieces).

Each topic uses the ones before it. The notes below follow the app's topic order; projections come last in the list, but you can read them after quadratic forms.

**Free resources.**
- 3Blue1Brown, *Essence of Linear Algebra* (YouTube). Best for pictures. Watch this first.
- Gilbert Strang, MIT OCW 18.06 lectures (free on YouTube).
- NPTEL: *Essential Mathematics for Machine Learning* (IIT, nptel.ac.in).

## Vector Spaces, Subspaces & Independence

### The big idea
A **vector** is an arrow that starts at the origin (the point zero). A **vector space** is a world of arrows where you can add any two arrows and stretch any arrow, and you never leave the world.

A **subspace** is a smaller flat world inside it that always passes through the origin.

### Before you start
This is the first topic, so it needs only school maths. Here is each idea from scratch.

**1. Coordinates on a graph.** A point on graph paper is written $(x, y)$. The first number says how far to go right (east). The second says how far to go up (north). Example: $(3, 2)$ means 3 steps east and 2 steps north from the centre $(0, 0)$.

**2. Real numbers and the symbol $\mathbb{R}$.** A real number is any number on the number line: $5$, $-2$, $0.75$, $\sqrt2$. The symbol $\mathbb{R}$ means "the set of all real numbers". So "$c \in \mathbb{R}$" is read "$c$ is a real number".

**3. Set notation $\{\ \ :\ \ \}$.** Curly brackets describe a set (a collection). The colon is read "such that". Example: $\{x \in \mathbb{R} : x > 3\}$ is "all real numbers $x$ such that $x$ is bigger than 3".

**4. The symbol $\in$.** It means "belongs to" or "is a member of". Example: $2 \in \{1, 2, 3\}$ is true, and $5 \in \{1, 2, 3\}$ is false.

**5. Subscripts like $x_1, x_2$.** A small number below a letter is just a label, not a power. $x_1$ is "the first entry", $x_2$ is "the second entry". So in $x = (4, 7)$, $x_1 = 4$ and $x_2 = 7$.

**6. Right angle (perpendicular).** Two lines at a right angle make an "L" shape, $90^\circ$. East and north are at right angles. We will measure this with the dot product below.

**7. Square root and length (Pythagoras).** In a right triangle with sides 3 and 4, the long side is $\sqrt{3^2 + 4^2} = \sqrt{25} = 5$. So the arrow $(3, 4)$ has length 5. This is how we measure the length of any arrow.

### Intuition
Stand at the centre of a big playground. This centre is the **origin**. Every arrow you draw starts here.

- **Adding arrows.** Walk along arrow $u$, then along arrow $v$. Where you end up is $u + v$. On paper, you just add the numbers: $(3,2) + (1,4) = (4,6)$.
- **Stretching arrows.** Multiply an arrow by a number $c$. If $c = 2$, the arrow doubles in length. If $c = -1$, it flips to point the opposite way. If $c = 0$, it shrinks to the origin. On paper: $2 \cdot (3,2) = (6,4)$.

Now imagine a flat sheet of glass that passes through the centre of the playground. Take any two arrows lying on the glass and add them. The result still lies on the glass.

Stretch one, even backwards. It still lies on the glass. This sheet is a **subspace**.

What if the glass sheet is lifted 1 metre above the ground? The origin is not on it. Stretch any arrow on it by $0$ and you get the origin, which has fallen off the sheet, so a lifted sheet is **not** a subspace.

> **Intuition:** In 3D space, the only subspaces are: (1) the origin alone, (2) a line through the origin, (3) a plane through the origin, (4) the whole 3D space. Every subspace is flat, infinite, and passes through the origin.

**Independence.** Suppose a WhatsApp group has three members. If member C only forwards messages that A and B already sent, C adds nothing new.

Vectors are like this. If one arrow can be built by adding and stretching the others, it adds no new direction. Such a set is **dependent**. If every arrow brings a truly new direction, the set is **independent**.

For example, $(1,0)$ and $(0,1)$ are independent: one points east, the other north. But $(1,0)$, $(0,1)$ and $(2,3)$ are dependent, because $(2,3) = 2(1,0) + 3(0,1)$.

> **Intuition:** The **dimension** of a space is the number of truly independent directions it has. A line has 1, a plane has 2, our 3D room has 3.

### Words you need
- **$\mathbb{R}^n$**: the set of all lists of $n$ real numbers. Example: $(2, -1, 5)$ is in $\mathbb{R}^3$.
- **Vector**: one such list, drawn as an arrow from the origin. Example: $(3, 2)$.
- **Zero vector $\mathbf 0$**: the list of all zeros, the arrow of length 0. Example: $(0, 0, 0)$ in $\mathbb{R}^3$.
- **Scalar**: an ordinary number used to stretch a vector. Example: in $3v$, the scalar is $3$.
- **Linear combination**: adding stretched vectors. Example: $2u + 3v$.
- **Span**: all linear combinations of some vectors. Example: the span of $(1,0,0)$ and $(0,1,0)$ is the whole floor (the $xy$-plane).
- **Subspace**: a set that contains $\mathbf 0$ and is closed under adding and stretching. Example: the line $\{t(1,2): t \in \mathbb{R}\}$.
- **Closed under**: doing the operation never takes you outside the set. Example: even numbers are closed under addition.
- **Linearly independent**: no vector is a combination of the others. Example: $(1,1)$ and $(1,-1)$.
- **Basis**: an independent set that spans the whole space. Example: $(1,0),(0,1)$ for $\mathbb{R}^2$.
- **Dimension**: the number of vectors in a basis. Example: $\dim \mathbb{R}^3 = 3$.
- **Dot product**: $u^\top v = u_1v_1 + u_2v_2 + \dots$, a single number. Example: $(1,2)\cdot(3,4) = 3 + 8 = 11$. It is $0$ exactly when the arrows are at right angles.
- **Length (norm) $\|v\|$**: $\sqrt{v_1^2 + v_2^2 + \dots}$. Example: $\|(3,4)\| = 5$.
- **Orthonormal**: vectors that are at right angles to each other (dot product $0$) and each of length $1$. Example: $(1,0)$ and $(0,1)$.

### Formulas, explained

**Subspace test**

$$W \text{ is a subspace} \iff \mathbf 0 \in W,\quad u+v \in W,\quad cu \in W \;\text{ for all } u,v \in W,\ c \in \mathbb{R}$$

- **Read it as:** "W is a subspace if it contains zero, adding two members keeps you inside, and stretching a member by any number keeps you inside."
- **Symbols:** $W$ is the set we test; $\mathbf 0$ is the zero vector; $u, v$ are any members; $c$ is any real number (positive, negative or zero); $\in$ means "belongs to"; $\iff$ means "exactly when".
- **Why it makes sense:** a subspace must behave like a smaller copy of the big space. If adding or stretching could throw you out, it is not a complete world.
- **Use it when:** a question lists sets and asks "which are subspaces".

**Linear independence**

$$c_1v_1 + c_2v_2 + \dots + c_kv_k = \mathbf 0 \;\Rightarrow\; c_1 = c_2 = \dots = c_k = 0$$

- **Read it as:** "The only way to combine these vectors into zero is to use all-zero weights."
- **Symbols:** $v_1, \dots, v_k$ are the vectors; $c_1, \dots, c_k$ are the weights (scalars); $\Rightarrow$ means "forces".
- **Why it makes sense:** if some nonzero weights gave zero, you could move one vector to the other side and write it using the rest. Then it was not new.
- **Use it when:** you must decide if vectors are independent, or prove orthonormal vectors are independent.

**Dot product and length**

$$u^\top v = u_1v_1 + u_2v_2 + \dots + u_nv_n, \qquad \|v\| = \sqrt{v^\top v}$$

- **Read it as:** "Multiply matching entries and add. The length is the square root of a vector dotted with itself."
- **Symbols:** $u^\top v$ (also written $u \cdot v$) is one number; $\|v\|$ is the length of $v$.
- **Why it makes sense:** $v^\top v = v_1^2 + v_2^2 + \dots$, which is exactly Pythagoras.
- **Use it when:** checking right angles ($u^\top v = 0$) or measuring lengths.

**Dimension of a solution plane**

$$\dim\{x \in \mathbb{R}^n : Ax = \mathbf 0\} = n - \text{(number of independent equations)}$$

- **Read it as:** "Each truly new equation removes one free direction."
- **Symbols:** $n$ is the number of unknowns; $A$ is the table of equation coefficients (see topic: Matrices & Special Matrices).
- **Why it makes sense:** in 3D, one equation like $x - 2y + z = 0$ leaves a plane (2 directions). Two independent equations leave a line (1 direction).
- **Use it when:** you need the dimension of a set defined by equations equal to zero.

### Where the formulas come from

**A. Why the subspace test has exactly these three checks.**

Start with a concrete set: the line $L = \{t(1,2) : t \in \mathbb{R}\}$, which contains $(1,2)$, $(2,4)$, $(-3,-6)$ and so on.

1. Take two members, $(1,2)$ and $(2,4)$. Their sum is $(3,6) = 3(1,2)$, which is on $L$. This is allowed because $s(1,2) + t(1,2) = (s+t)(1,2)$: adding two multiples of the same arrow gives another multiple.
2. Stretch $(1,2)$ by $c = -5$: you get $(-5,-10) = -5(1,2)$, still on $L$. This works because $c\,(t(1,2)) = (ct)(1,2)$, again a multiple.
3. Stretch by $c = 0$: you get $(0,0)$. So the origin must be in $L$. This is why the zero test is the fastest check: every subspace is forced to contain $\mathbf 0$, because $0 \cdot u = \mathbf 0$.
4. Now generalise. "Vector space" means "you can add and stretch freely". A subset is a smaller vector space exactly when adding and stretching never take you out. That is the three checks, nothing more.

**B. Where the independence condition comes from.**

1. Take $v_1 = (1,0)$, $v_2 = (0,1)$, $v_3 = (2,3)$. We already saw $v_3 = 2v_1 + 3v_2$.
2. Move everything to one side: $2v_1 + 3v_2 - 1\cdot v_3 = \mathbf 0$. The weights are $2, 3, -1$, and they are not all zero.
3. So "one vector is a combination of the others" turns into "some weights, not all zero, give $\mathbf 0$". This works because moving a term to the other side only changes its sign.
4. The reverse is also true. Suppose $c_1v_1 + c_2v_2 + c_3v_3 = \mathbf 0$ with $c_3 \ne 0$. Divide by $c_3$ and rearrange: $v_3 = -\frac{c_1}{c_3}v_1 - \frac{c_2}{c_3}v_2$. So $v_3$ was not new.
5. So "independent" (nobody is a copy of the others) means exactly: the only weights that give $\mathbf 0$ are all zeros. That is the formula.

**C. Why the dot product measures right angles.**

1. Take $u = (1, 0)$ (east) and $v = (0, 1)$ (north). They are at right angles. $u^\top v = 1\cdot0 + 0\cdot1 = 0$.
2. Take $u = (1, 1)$ and $v = (1, -1)$. Draw them: one goes up-right, one goes down-right, an "L" shape. $u^\top v = 1 - 1 = 0$.
3. Why does this always work? Pythagoras says $u$ and $v$ are at right angles exactly when $\|u - v\|^2 = \|u\|^2 + \|v\|^2$ (the three arrows make a right triangle).
4. Expand the left side: $\|u - v\|^2 = (u - v)^\top(u - v) = u^\top u - 2u^\top v + v^\top v$. This is allowed because the dot product multiplies out like ordinary brackets.
5. Compare with the right side, $u^\top u + v^\top v$. They are equal exactly when $-2u^\top v = 0$, that is, $u^\top v = 0$.

**D. Why orthonormal vectors are always independent.**

1. Let $q_1, q_2, q_3$ be orthonormal: $q_i^\top q_i = 1$ and $q_i^\top q_j = 0$ for $i \ne j$.
2. Suppose $c_1q_1 + c_2q_2 + c_3q_3 = \mathbf 0$.
3. Take the dot product of both sides with $q_1$: $c_1(q_1^\top q_1) + c_2(q_1^\top q_2) + c_3(q_1^\top q_3) = q_1^\top\mathbf 0 = 0$.
4. Use the right-angle facts: this becomes $c_1 \cdot 1 + c_2 \cdot 0 + c_3 \cdot 0 = 0$, so $c_1 = 0$.
5. Do the same with $q_2$ and $q_3$ to get $c_2 = 0$ and $c_3 = 0$. All weights are zero, so by formula B the set is independent.

**E. Where "dimension $= n -$ number of equations" comes from.**

1. Start with $x - 2y + z = 0$ in $\mathbb{R}^3$ ($n = 3$ unknowns, 1 equation).
2. The equation lets you write one unknown using the others: $x = 2y - z$. So $x$ is not free; $y$ and $z$ are free.
3. Write every solution using the free ones: $(x, y, z) = (2y - z, y, z) = y(2,1,0) + z(-1,0,1)$. This is just splitting the vector into a "$y$ part" and a "$z$ part".
4. The two arrows $(2,1,0)$ and $(-1,0,1)$ are independent (look at the last two entries: $(1,0)$ and $(0,1)$). So the dimension is 2 $= 3 - 1$.
5. In general each independent equation fixes one unknown in terms of the others. So $n$ unknowns minus (number of independent equations) are left free, and each free unknown gives one direction. This is the same rule you will meet as rank-nullity (see topic: Rank, Nullity & Determinant).

### Examples

**Example 1 (easy):** Are $u = (2, 4)$ and $v = (3, 6)$ independent?

1. Look for a number $c$ with $v = c\,u$.
2. First entry: $3 = c \cdot 2$, so $c = 1.5$.
3. Second entry: $c \cdot 4 = 1.5 \cdot 4 = 6$. It matches, so $v = 1.5\,u$.
4. Both arrows point in the same direction, so their span is only a line, not the whole plane.

**Result:** They are **dependent**.

**Example 2 (medium):** Is $W = \{(x,y,z) : x - 2y + z = 0\}$ a subspace? Find its dimension.

1. Zero test. Put $(0,0,0)$: $0 - 0 + 0 = 0$. Yes, zero is in $W$.
2. Addition. If $(x_1,y_1,z_1)$ and $(x_2,y_2,z_2)$ both satisfy the equation, then $(x_1+x_2) - 2(y_1+y_2) + (z_1+z_2) = (x_1 - 2y_1 + z_1) + (x_2 - 2y_2 + z_2) = 0 + 0 = 0$. Yes.
3. Stretching. $cx - 2cy + cz = c(x - 2y + z) = c \cdot 0 = 0$. Yes. So $W$ is a subspace.
4. Dimension. Solve for $x$: $x = 2y - z$. So $(x,y,z) = y(2,1,0) + z(-1,0,1)$.
5. The two vectors $(2,1,0)$ and $(-1,0,1)$ are not multiples of each other, so they are independent. Hence $\dim W = 2$.
6. Compare $x - 2y + z = 3$. Put $(0,0,0)$: $0 \ne 3$. Zero is missing, so that set is **not** a subspace.

**Result:** $W$ is a subspace of dimension 2, a plane through the origin.

**Example 3 (GATE level):** Which of these are subspaces of $\mathbb{R}^3$?
(P) $\{\alpha(1,0,1) + \beta(0,1,1) : \alpha, \beta \in \mathbb{R}\}$
(Q) $\{\alpha^2(1,1,0) : \alpha \in \mathbb{R}\}$
(R) $\{x : x_1 + x_2 = 0,\ x_3 = 0\}$
(S) $\{x : x_1 x_2 = 0\}$

1. (P) is a span. A span is always a subspace. **Yes.**
2. (Q) The weight $\alpha^2$ is never negative. So $(1,1,0)$ is in the set ($\alpha = 1$), but $(-1,-1,0)$ needs $\alpha^2 = -1$, impossible. Stretching by $-1$ fails. **No.**
3. (R) Two equations, both "something $= 0$". Zero passes, sums pass, stretches pass. It is the line $t(1,-1,0)$. **Yes.**
4. (S) $(1,0,0)$ is in it ($1 \cdot 0 = 0$), and so is $(0,1,0)$. Their sum $(1,1,0)$ gives $1 \cdot 1 = 1 \ne 0$. Addition fails. This set is two planes glued together, not one flat world. **No.**

**Result:** P and R.

### Common mistakes
> **Common mistake:** Forgetting to test zero first. Any equation with a nonzero constant, like $x_1 + x_2 = 1$, fails at once. Always check $\mathbf 0$ before anything else.

> **Common mistake:** Testing only positive stretches. Weights like $\alpha^2$ or $\lvert\alpha\rvert$ are never negative, so the set cannot point backwards. Always try multiplying by $-1$.

> **Common mistake:** Thinking "independent" means "at right angles". $(1,0)$ and $(1,1)$ are independent but not at right angles. Orthonormal implies independent, but not the other way.

> **Common mistake:** Believing the union of two lines is a subspace. Adding one arrow from each line usually lands off both lines.

> **Common mistake:** Thinking an orthonormal basis is unique. Rotate $(1,0),(0,1)$ by any angle and you get another orthonormal basis.

### How GATE asks it
- **2024 Q.47** (2 marks, MSQ): pick the subspaces of $\mathbb{R}^3$. A span and a homogeneous system (all equations "$= 0$") were subspaces. A set with weights $\alpha^2, \beta^2$ and a plane with "$+4$" were not.
- **2025 Q.25** (1 mark, MSQ): true/false on orthonormal bases. Correct: orthonormal bases are **not unique**, and orthonormal vectors are always independent. Independent does not mean orthonormal.
- **2026 Q.22** (1 mark, MCQ): a ball $x^\top x \le 16$ (radius 4) cut by a 2D subspace. The key was "a subspace passes through the origin", so the plane cuts through the centre. The cut is a disk of radius 4, area $16\pi$.

> **GATE tip:** For "which are subspaces" MSQs, run three quick tests in order: (1) is zero inside? (2) does multiplying by $-1$ keep you inside? (3) does adding two members keep you inside? Most wrong options fail test 1 or 2.

### Summary
- First we said a vector is an arrow from the origin, written as a list of numbers, and we can add arrows and stretch them.
- A subspace is a set where adding and stretching never take you out. Stretching by 0 gives the origin, so every subspace must pass through $\mathbf 0$.
- Some arrows are copies of others (dependent). Moving terms to one side turns this into "nonzero weights give $\mathbf 0$", which is the independence test.
- The dot product tells right angles ($u^\top v = 0$) because of Pythagoras. Orthonormal vectors are therefore always independent, but independent vectors need not be orthonormal.
- The number of truly independent directions is the dimension. Each independent equation "$= 0$" removes one direction.
- Next topic builds on this: Matrices are machines that move these arrows, and their columns and outputs form subspaces.

### Quick self-check
1. Is the set $\{(x, y) : y = 3x\}$ a subspace of $\mathbb{R}^2$?
**Answer:** Yes. It is a line through the origin: zero passes, and sums and stretches stay on the line.

2. Are $(1,2,3)$, $(4,5,6)$, $(7,8,9)$, $(1,0,0)$ independent in $\mathbb{R}^3$?
**Answer:** No. More than 3 vectors in $\mathbb{R}^3$ are always dependent.

3. What is the dimension of $\{x \in \mathbb{R}^4 : x_1 + x_2 + x_3 + x_4 = 0\}$?
**Answer:** $4 - 1 = 3$. One equation removes one free direction.

4. Are $(1,2)$ and $(2,-1)$ at right angles?
**Answer:** Yes. Their dot product is $1\cdot2 + 2\cdot(-1) = 0$.

## Matrices & Special Matrices (Projection/Orthogonal/Idempotent)

### The big idea
A **matrix** is a machine that takes an arrow and gives back a new arrow. It can stretch, rotate, flip or squash space.

Some machines have a special shape. GATE loves them because you can read their properties without heavy calculation.

### Before you start
**1. Vectors, dot product and length** (see topic: Vector Spaces, Subspaces & Independence). A vector is a list like $x = (3, 4)$. The dot product $u^\top v = u_1v_1 + u_2v_2 + \dots$ is one number, and it is $0$ when the arrows are at right angles. The length is $\|x\| = \sqrt{x^\top x}$, so $\|(3,4)\| = \sqrt{9 + 16} = 5$.

**2. Row and column vectors.** In matrix work, a vector is usually written standing up, as a **column**. Laying it down gives a **row**. The symbol $\top$ (transpose) turns one into the other: if $x$ is the column with entries $1, 2$, then $x^\top = (1\ \ 2)$ is a row.

**3. Angles in radians and $\sin$, $\cos$.** A full turn is $360^\circ$, also written $2\pi$ radians (because a circle of radius 1 has length $2\pi$). So $\pi = 180^\circ$ and $\frac{\pi}{3} = 60^\circ$. On a circle of radius 1, the point at angle $\theta$ is $(\cos\theta, \sin\theta)$. Example: $\cos 0 = 1, \sin 0 = 0$, and $\cos 90^\circ = 0, \sin 90^\circ = 1$.

**4. Powers.** $M^2$ means "apply $M$, then apply $M$ again", that is $M \cdot M$. $M^5$ means five times in a row.

**5. Remainder.** Dividing 100 by 6 gives 16 with remainder 4, because $6 \times 16 = 96$ and $100 - 96 = 4$. We write $100 = 6 \times 16 + 4$. This helps with big powers of rotations.

**6. Eigenvalue (a first look).** If a machine sends an arrow $v$ to a multiple of itself, $Av = \lambda v$, then $v$ is an **eigenvector** and the number $\lambda$ (lambda) is its **eigenvalue**. Example: "double everything" sends every $v$ to $2v$, so its eigenvalue is 2. The full story is in topic: Eigenvalues & Eigenvectors. Here we only need: the trace is the sum of the eigenvalues, and the determinant is their product.

### Intuition
Think of a photo-editing app. You load a picture and press one button:

- **Rotate** turns the whole picture. No part gets longer or shorter.
- **Stretch** pulls the picture wider.
- **Flatten** squashes the 3D scene onto the floor, like a shadow at noon.

A matrix does exactly this to every arrow in space. If $A$ is the matrix and $x$ is an arrow, then $Ax$ is the new arrow.

**How the machine works on numbers.** Each entry of $Ax$ is a row of $A$ dotted with $x$. For $A = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$ and $x = (1, 1)$:

$$Ax = (2 \cdot 1 + 0 \cdot 1,\ 0 \cdot 1 + 3 \cdot 1) = (2, 3)$$

The machine stretched the east direction by 2 and the north direction by 3.

**Multiplying two matrices.** $AB$ means "first do $B$, then do $A$". The entry in row $i$, column $j$ of $AB$ is (row $i$ of $A$) dotted with (column $j$ of $B$).

Now the special machines, each with a picture:

1. **Orthogonal matrix (a rotation or a mirror).** It turns or flips space but never changes lengths. A 5 cm arrow stays 5 cm.
2. **Projection matrix (a shadow maker).** It drops every arrow straight down onto a floor (a subspace). Arrows already on the floor do not move.
3. **Idempotent matrix ("once is enough").** Applying it twice is the same as once. A shadow's shadow is the same shadow, so every projection is idempotent.
4. **Symmetric matrix.** The table is a mirror image across its main diagonal. Covariance matrices are symmetric.

> **Intuition:** Press "flatten to floor" once and the picture is flat. Press it again and nothing changes. That is idempotent: $P^2 = P$.

> **Intuition:** A rotation by $72^\circ$ done 5 times is $360^\circ$, a full turn. You are back where you started. So $R^5 = I$, the "do nothing" machine.

### Words you need
- **$m \times n$ matrix**: a table with $m$ rows and $n$ columns. Example: $\begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}$ is $2 \times 3$.
- **Entry $a_{ij}$**: the number in row $i$, column $j$. Example: in the matrix above, $a_{23} = 6$.
- **Identity $I$**: the "do nothing" machine, 1s on the diagonal, 0s elsewhere. Example: $Ix = x$.
- **Transpose $A^\top$**: flip rows into columns. Example: $\begin{pmatrix}1&2\\3&4\end{pmatrix}^\top = \begin{pmatrix}1&3\\2&4\end{pmatrix}$.
- **Symmetric**: $A^\top = A$. Example: $\begin{pmatrix}2&5\\5&1\end{pmatrix}$.
- **Inverse $A^{-1}$**: the "undo" machine, $A^{-1}A = I$. Example: undo "stretch by 2" with "shrink by 2".
- **Trace $\operatorname{tr}(A)$**: sum of diagonal entries. Example: $\operatorname{tr}\begin{pmatrix}4&1\\2&3\end{pmatrix} = 7$.
- **Norm $\|x\|$**: the length of arrow $x$, $\sqrt{x_1^2 + x_2^2 + \dots}$. Example: $\|(3,4)\| = 5$.
- **Outer product $xx^\top$**: a column times a row, giving a square matrix. Example: $x = (1,2)$ gives $\begin{pmatrix}1&2\\2&4\end{pmatrix}$.
- **Orthogonal**: $Q^\top Q = I$. Example: a rotation matrix.
- **Idempotent**: $P^2 = P$. Example: $\begin{pmatrix}1&0\\0&0\end{pmatrix}$ (keep $x$, kill $y$).
- **$\mathbf 1$**: the all-ones vector $(1,1,\dots,1)$.

### Formulas, explained

**Transpose and inverse of a product**

$$(AB)^\top = B^\top A^\top, \qquad (AB)^{-1} = B^{-1}A^{-1}$$

- **Read it as:** "To flip or undo two steps, reverse the order."
- **Symbols:** $A, B$ are matrices; $\top$ is transpose; $-1$ is inverse.
- **Why it makes sense:** you put on socks, then shoes. To undo, remove shoes first, then socks.
- **Use it when:** simplifying expressions like $(Q^\top Q)$ or $(X^\top X)^{-1}$.

**Orthogonal matrix**

$$Q^\top Q = I \quad\Longleftrightarrow\quad \|Qx\| = \|x\| \text{ for every } x$$

- **Read it as:** "Q transpose times Q is identity, which is the same as saying Q never changes any length."
- **Symbols:** $Q$ is a square matrix; $\|Qx\|$ is the length after the machine acts.
- **Why it makes sense:** $\|Qx\|^2 = (Qx)^\top(Qx) = x^\top Q^\top Q x = x^\top x = \|x\|^2$.
- **Facts that follow:** $Q^{-1} = Q^\top$; $\det Q = \pm 1$; $Q$ has full rank; every eigenvalue has size $1$, but it may be a complex number.
- **Use it when:** a question says "length is preserved" or "$\|Ax\| = \|x\|$".

**Rotation matrix in 2D**

$$R(\theta) = \begin{pmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{pmatrix}, \qquad R(\theta)^k = R(k\theta)$$

- **Read it as:** "Rotating by theta, k times, is rotating by k times theta."
- **Symbols:** $\theta$ is the angle; $k$ is a whole number.
- **Why it makes sense:** turning $30^\circ$ three times is turning $90^\circ$.
- **Use it when:** you see a big power like $M^{2026}$ of a rotation. If $k\theta$ is a full turn ($2\pi$), the power is $I$.

**Outer product $xx^\top$**

$$(xx^\top)\,x = x\,(x^\top x) = \|x\|^2\, x, \qquad (xx^\top)\,v = \mathbf 0 \text{ if } v \perp x$$

- **Read it as:** "xx-transpose stretches x by its squared length, and kills every arrow at right angles to x."
- **Symbols:** $x$ is a column vector; $x^\top x = \|x\|^2$ is a number; $v \perp x$ means $x^\top v = 0$.
- **Why it makes sense:** $xx^\top v = x(x^\top v)$. The bracket is a dot product, a number. If it is zero, the answer is zero.
- **Result:** eigenvalues of $xx^\top$ ($n \times n$) are $\|x\|^2$ once and $0$ repeated $n-1$ times. Rank is 1.
- **Use it when:** you see $xx^\top$, $I + xx^\top$, or a sum of such terms.

**Idempotent matrix**

$$P^2 = P \;\Rightarrow\; \text{eigenvalues are only } 0 \text{ or } 1, \quad \operatorname{rank}(P) = \operatorname{tr}(P)$$

- **Read it as:** "If doing it twice equals doing it once, every eigenvalue is 0 or 1, and rank equals trace."
- **Symbols:** $P$ is square; $\operatorname{rank}$ is the number of independent directions in the output.
- **Why it makes sense:** if $Pv = \lambda v$, then $P^2 v = \lambda^2 v$. But $P^2 = P$, so $\lambda^2 = \lambda$, giving $\lambda = 0$ or $1$. The trace is the sum of eigenvalues, so it counts the 1s, which is the rank.
- **Use it when:** you have shown $P^2 = P$ and need its trace, rank or eigenvalues.

**Projection from orthonormal columns**

$$P = QQ^\top = x_1x_1^\top + \dots + x_kx_k^\top$$

- **Read it as:** "Stack k orthonormal vectors as columns of Q. Then Q times Q-transpose projects onto their span."
- **Symbols:** $Q$ is $n \times k$ with $Q^\top Q = I_k$; $x_1, \dots, x_k$ are its columns.
- **Why it makes sense:** $P^2 = Q(Q^\top Q)Q^\top = QIQ^\top = P$, and $P^\top = P$. Each $x_i$ is kept ($Px_i = x_i$). Arrows at right angles to all of them are killed.
- **Result:** eigenvalues $1$ ($k$ times), $0$ ($n - k$ times); $\det P = 0$ unless $k = n$.
- **Use it when:** you see a sum of $x_ix_i^\top$ over orthonormal vectors.

**Centering matrix**

$$C = I - \tfrac{1}{n}\mathbf 1\mathbf 1^\top$$

- **Read it as:** "Identity minus one-over-n times the all-ones matrix."
- **Symbols:** $n$ is the size; $\mathbf 1\mathbf 1^\top$ is the $n \times n$ matrix full of 1s.
- **Why it makes sense:** $Cx$ subtracts the average of $x$ from every entry. Marks $(60, 70, 80)$ become $(-10, 0, 10)$. Doing it twice changes nothing (the average is already 0), so $C^2 = C$.
- **Facts:** symmetric, idempotent, $C\mathbf 1 = \mathbf 0$, $\operatorname{tr}(C) = \operatorname{rank}(C) = n - 1$, eigenvalues $0$ (once) and $1$ ($n-1$ times). $C^2 = C$, not $I$.
- **Use it when:** you see $I - \frac1n \mathbf 1\mathbf 1^\top$. It appeared twice in 2026.

### Where the formulas come from

**A. Why $(AB)^\top = B^\top A^\top$.**

1. Take $A = \begin{pmatrix}1&2\\0&1\end{pmatrix}$ and $B = \begin{pmatrix}1&0\\3&1\end{pmatrix}$. Then $AB = \begin{pmatrix}1+6 & 0+2\\ 0+3 & 0+1\end{pmatrix} = \begin{pmatrix}7&2\\3&1\end{pmatrix}$, so $(AB)^\top = \begin{pmatrix}7&3\\2&1\end{pmatrix}$.
2. Now $B^\top A^\top = \begin{pmatrix}1&3\\0&1\end{pmatrix}\begin{pmatrix}1&0\\2&1\end{pmatrix} = \begin{pmatrix}1+6&0+3\\0+2&0+1\end{pmatrix} = \begin{pmatrix}7&3\\2&1\end{pmatrix}$. Same answer.
3. Why in general: entry $(i,j)$ of $(AB)^\top$ is entry $(j,i)$ of $AB$, which is (row $j$ of $A$) dot (column $i$ of $B$).
4. Entry $(i,j)$ of $B^\top A^\top$ is (row $i$ of $B^\top$) dot (column $j$ of $A^\top$) = (column $i$ of $B$) dot (row $j$ of $A$). This is the same dot product, because a dot product does not care about order.

**B. Why $(AB)^{-1} = B^{-1}A^{-1}$.**

1. We need a machine that undoes $AB$, meaning (that machine)$\times AB = I$.
2. Try $B^{-1}A^{-1}$: $(B^{-1}A^{-1})(AB) = B^{-1}(A^{-1}A)B$. Brackets can move because matrix multiplication is associative (grouping does not matter).
3. $A^{-1}A = I$, so this is $B^{-1}IB = B^{-1}B = I$. It works.

**C. Why "keeps lengths" is the same as $Q^\top Q = I$.**

1. Example: the $90^\circ$ rotation $Q = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$. Then $Q^\top Q = \begin{pmatrix}0&1\\-1&0\end{pmatrix}\begin{pmatrix}0&-1\\1&0\end{pmatrix} = \begin{pmatrix}1&0\\0&1\end{pmatrix}$.
2. In general, squared length is a dot product with itself: $\|Qx\|^2 = (Qx)^\top(Qx)$.
3. Use rule A on $(Qx)^\top$: it equals $x^\top Q^\top$. So $\|Qx\|^2 = x^\top (Q^\top Q) x$.
4. If $Q^\top Q = I$, this is $x^\top x = \|x\|^2$. So lengths stay the same.
5. Then $Q^{-1} = Q^\top$, because $Q^\top Q = I$ is exactly the definition of "undoes $Q$".
6. For the determinant: $\det(Q^\top)\det(Q) = \det I = 1$, and $\det Q^\top = \det Q$ (see topic: Rank, Nullity & Determinant). So $(\det Q)^2 = 1$, which means $\det Q = \pm 1$.
7. For eigenvalues: if $Qv = \lambda v$, the length is kept, so $\|v\| = \|Qv\| = \lvert\lambda\rvert\,\|v\|$, which forces $\lvert\lambda\rvert = 1$.

**D. Where the rotation matrix comes from.**

1. A matrix is fully known once you know where it sends $(1,0)$ and $(0,1)$. Those images become its first and second columns, because $A(1,0)$ picks out column 1 and $A(0,1)$ picks out column 2.
2. Rotate $(1,0)$ (east, length 1) by angle $\theta$. It lands on the unit circle at $(\cos\theta, \sin\theta)$. That is column 1.
3. Rotate $(0,1)$ (north) by $\theta$. North is already $90^\circ$ ahead of east, so it lands at angle $90^\circ + \theta$, which is the point $(-\sin\theta, \cos\theta)$. That is column 2.
4. Check with $\theta = 90^\circ$: columns $(0, 1)$ and $(-1, 0)$, giving $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, the same matrix as in part C.
5. $R(\theta)^k = R(k\theta)$ because doing a turn of $\theta$ and then another turn of $\theta$ is a single turn of $2\theta$. Repeat $k$ times.

**E. Where the $xx^\top$ facts come from.**

1. Take $x = (1, 2)$. Then $xx^\top = \begin{pmatrix}1\\2\end{pmatrix}\begin{pmatrix}1&2\end{pmatrix} = \begin{pmatrix}1&2\\2&4\end{pmatrix}$.
2. Apply it to $x$ itself: $\begin{pmatrix}1&2\\2&4\end{pmatrix}\begin{pmatrix}1\\2\end{pmatrix} = \begin{pmatrix}5\\10\end{pmatrix} = 5x$. And $\|x\|^2 = 1 + 4 = 5$. So the eigenvalue is $\|x\|^2$.
3. Apply it to $v = (2, -1)$, which is at right angles to $x$: $\begin{pmatrix}2-2\\4-4\end{pmatrix} = \mathbf 0$. Eigenvalue $0$.
4. Why in general: $(xx^\top)v = x(x^\top v)$ by regrouping (associativity). The bracket $x^\top v$ is just a number.
5. With $v = x$, the number is $\|x\|^2$. With $v \perp x$, the number is $0$. In $\mathbb{R}^n$ there are $n - 1$ independent directions at right angles to $x$, so $0$ appears $n - 1$ times.
6. Every output $x(x^\top v)$ is a multiple of $x$, so the outputs fill only one line. That is rank 1.

**F. Where the idempotent facts come from.**

1. Suppose $Pv = \lambda v$ with $v \ne \mathbf 0$. Apply $P$ again: $P^2v = P(\lambda v) = \lambda Pv = \lambda^2 v$.
2. But $P^2 = P$, so $P^2v = Pv = \lambda v$.
3. So $\lambda^2 v = \lambda v$, which gives $(\lambda^2 - \lambda)v = \mathbf 0$. Since $v \ne \mathbf 0$, we need $\lambda^2 - \lambda = 0$, i.e. $\lambda(\lambda - 1) = 0$.
4. So $\lambda = 0$ or $\lambda = 1$.
5. The trace is the sum of eigenvalues, so it is (number of 1s). The rank is the number of directions that survive, which is also the number of 1s (directions with eigenvalue 0 are crushed). Hence $\operatorname{rank} P = \operatorname{tr} P$.

**G. Why $QQ^\top$ is a projection (this is formula E repeated).**

1. Write $QQ^\top$ column by column: $QQ^\top = x_1x_1^\top + \dots + x_kx_k^\top$. So it is just a sum of $k$ outer products from formula E.
2. Apply it to $x_1$: $x_1(x_1^\top x_1) + x_2(x_2^\top x_1) + \dots = x_1 \cdot 1 + x_2 \cdot 0 + \dots = x_1$. Kept, eigenvalue 1.
3. Apply it to any $v$ at right angles to all $x_i$: every bracket is 0, so the result is $\mathbf 0$. Eigenvalue 0.
4. Square it: $(QQ^\top)(QQ^\top) = Q(Q^\top Q)Q^\top = QIQ^\top = QQ^\top$. So it is idempotent, and formula F applies.

**H. Where the centering matrix facts come from.**

1. Take $n = 3$ and $x = (60, 70, 80)$. Then $\mathbf 1^\top x = 210$ (the total), and $\frac13\mathbf 1\mathbf 1^\top x = \frac{210}{3}\mathbf 1 = (70, 70, 70)$, the mean in every entry.
2. So $Cx = x - (70,70,70) = (-10, 0, 10)$. The matrix removes the mean.
3. In symbols, $\frac1n\mathbf 1\mathbf 1^\top = uu^\top$ with $u = \frac{1}{\sqrt n}\mathbf 1$, a unit vector (its length is $\sqrt{n \cdot \frac1n} = 1$). So $C = I - uu^\top$.
4. By formula E, $uu^\top$ has eigenvalues $1$ (once, along $\mathbf 1$) and $0$ ($n - 1$ times). Subtracting from $I$ turns each eigenvalue $t$ into $1 - t$, because $(I - uu^\top)v = v - tv$.
5. So $C$ has eigenvalues $0$ (once) and $1$ ($n-1$ times). Its trace is $n - 1$, and by formula F its rank is also $n - 1$.

### Examples

**Example 1 (easy):** A rotation by $90^\circ$ is $R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$. Apply it to $x = (3, 4)$ and check the length.

1. $Rx = (0 \cdot 3 + (-1) \cdot 4,\ 1 \cdot 3 + 0 \cdot 4) = (-4, 3)$.
2. Old length: $\sqrt{9 + 16} = \sqrt{25} = 5$.
3. New length: $\sqrt{16 + 9} = \sqrt{25} = 5$.

**Result:** $Rx = (-4, 3)$, with the same length 5, as expected for an orthogonal matrix.

**Example 2 (medium):** Let $u = \frac13(1, 2, 2)$ and $P = I - uu^\top$. Find $P^2$, $\operatorname{tr}(P)$ and $\det(P)$.

1. Length of $u$: $u^\top u = \frac19(1 + 4 + 4) = \frac99 = 1$. So $u$ is a unit vector.
2. Square $P$: $P^2 = (I - uu^\top)(I - uu^\top) = I - uu^\top - uu^\top + u(u^\top u)u^\top$.
3. Since $u^\top u = 1$, the last term is $uu^\top$. So $P^2 = I - 2uu^\top + uu^\top = I - uu^\top = P$. Idempotent.
4. Eigenvalues: $Pu = u - u(u^\top u) = u - u = \mathbf 0$, so eigenvalue $0$. For any $v \perp u$: $Pv = v - u(0) = v$, so eigenvalue $1$. In 3D there are 2 such independent directions.
5. $\operatorname{tr}(P) = 0 + 1 + 1 = 2$. $\det(P) = 0 \times 1 \times 1 = 0$.

**Result:** $P^2 = P$, $\operatorname{tr}P = 2$, $\det P = 0$. Picture: $P$ flattens space onto the plane at right angles to $u$.

**Example 3 (GATE level):** Let $M = \begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$ with $\theta = \frac{\pi}{3}$. Which is $M^{100}$: (A) $I$ (B) $M$ (C) $M^4$ (D) $M^{-1}$?

1. $\theta = 60^\circ$. Six turns: $6 \times 60^\circ = 360^\circ$. So $M^6 = I$.
2. Divide: $100 = 6 \times 16 + 4$ (because $6 \times 16 = 96$, and $100 - 96 = 4$).
3. $M^{100} = (M^6)^{16} M^4 = I \cdot M^4 = M^4$.
4. Check (D): $M^{-1} = M^5$ (since $M^5 M = M^6 = I$), which needs remainder 5, not 4.

**Result:** (C).

### Common mistakes
> **Common mistake:** Thinking an orthogonal matrix must be $I$. Any rotation or mirror (like $-I$) also keeps lengths.

> **Common mistake:** Saying orthogonal matrices have eigenvalues only $\pm 1$. A $90^\circ$ rotation has eigenvalues $\pm i$ (complex). Only their **size** is 1.

> **Common mistake:** Confusing idempotent ($P^2 = P$) with involutory ($A^2 = I$). A projection is idempotent. A mirror is involutory.

> **Common mistake:** Saying the trace of the centering matrix is $n$. It is $n - n\cdot\frac1n = n - 1$.

> **Common mistake:** Assuming a projection is invertible. It squashes some directions to zero, so $\det P = 0$ (unless $P = I$).

> **Common mistake:** Writing $(AB)^\top = A^\top B^\top$. The order must reverse.

### How GATE asks it
This is the highest-scoring Linear Algebra topic: 4 questions, 7 marks.

- **2025 Q.50** (2 marks, MSQ): $A = x_1x_1^\top + \dots + x_5x_5^\top$ for 5 orthonormal vectors in $\mathbb{R}^{10}$. Recognise $QQ^\top$, a projection. Eigenvalues = singular values = five 1s and five 0s. So $\det A = 0$ and $A$ is not invertible.
- **2025 Q.52** (2 marks, MSQ): $\|Ax\|^2 = \|x\|^2$ for all $x$. So $A$ is orthogonal and full rank. Traps: "$A = I$ only" and "eigenvalues are $\pm 1$" are false.
- **2026 Q.21** (1 mark, MCQ): rotation by $\frac{2\pi}{5}$ ($72^\circ$), so $M^5 = I$. $2026 = 5 \times 405 + 1$, so $M^{2026} = M$.
- **2026 Q.52** (2 marks, MSQ): centering matrix. True: symmetric, projection. False: $M^2 = I$, trace $= n$.

> **GATE tip:** For any matrix built from vectors, test it on the vectors themselves and on arrows at right angles to them. This gives all eigenvalues in seconds, and from them trace, determinant and rank.

### Summary
- First we saw a matrix as a machine: each output entry is a row of the matrix dotted with the input arrow.
- Reversing two steps reverses their order, which gives $(AB)^\top = B^\top A^\top$ and $(AB)^{-1} = B^{-1}A^{-1}$.
- Writing length as a dot product shows that "keeps every length" is the same as $Q^\top Q = I$. So rotations and mirrors have $Q^{-1} = Q^\top$ and $\det Q = \pm1$.
- The outer product $xx^\top$ works by $xx^\top v = x(x^\top v)$. That one regrouping gives its eigenvalues $\|x\|^2$ and $0$.
- Adding outer products of orthonormal vectors gives a projection $QQ^\top$, and $P^2 = P$ forces eigenvalues 0 or 1, so rank equals trace. The centering matrix is just $I$ minus one such outer product.
- Next topic builds on this: Systems of Linear Equations use these machines backwards, asking which input gives a wanted output.

### Quick self-check
1. If $Q$ is orthogonal, what is $Q^{-1}$?
**Answer:** $Q^\top$.

2. $x = (1, 1, 1, 1)$. What are the eigenvalues of $xx^\top$?
**Answer:** $\|x\|^2 = 4$ once, and $0$ three times.

3. A $6 \times 6$ matrix $P$ has $P^2 = P$ and trace 2. What is its rank?
**Answer:** 2, because for an idempotent matrix rank equals trace.

4. What does $R(\theta)$ do to the arrow $(1, 0)$?
**Answer:** It sends it to $(\cos\theta, \sin\theta)$, the first column of $R(\theta)$.

## Systems of Linear Equations & Gaussian Elimination

### The big idea
A system of linear equations asks: "which input arrow $x$ does the machine $A$ turn into the target arrow $b$?" We write it as $Ax = b$.

There are only three possible answers: exactly one solution, no solution, or infinitely many.

### Before you start
**1. An equation and its solution.** An equation like $2x + 1 = 7$ is a balance. A solution is a value that makes both sides equal: here $x = 3$, because $2 \cdot 3 + 1 = 7$. You may add, subtract, or multiply both sides by the same nonzero number without changing the solution.

**2. "Linear" equation.** Each unknown appears only to power 1, multiplied by a number, and the terms are added. Example: $2x + 3y = 12$ is linear. $x^2 + y = 1$ and $xy = 4$ are not.

**3. A straight line on a graph.** The points $(x, y)$ that satisfy one linear equation in two unknowns form a straight line. Example: $x + y = 10$ passes through $(10, 0)$, $(5, 5)$ and $(0, 10)$.

**4. Matrix times vector** (see topic: Matrices & Special Matrices). $Ax$ means: each entry is a row of $A$ dotted with $x$. So the two equations $2x + y = 50$ and $x + y = 35$ are exactly $\begin{pmatrix}2&1\\1&1\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix} = \begin{pmatrix}50\\35\end{pmatrix}$.

**5. Span, independence and dimension** (see topic: Vector Spaces, Subspaces & Independence). The span of some arrows is everything you can build by adding and stretching them. Independent arrows each bring a new direction.

**6. Rank (a first look).** The rank of a matrix is the number of independent rows (it is always the same as the number of independent columns). Example: $\begin{pmatrix}1&2\\2&4\end{pmatrix}$ has rank 1, because row 2 is twice row 1. More in topic: Rank, Nullity & Determinant.

**7. The sum symbol $\sum$.** $\sum_{i=1}^{n} i$ means "add $i$ for $i = 1, 2, \dots, n$". Example: $\sum_{i=1}^{4} i = 1 + 2 + 3 + 4 = 10$.

### Intuition
At a shop, 2 pens and 1 notebook cost 50 rupees. 1 pen and 1 notebook cost 35 rupees. What does each cost? Call the pen price $x$ and the notebook price $y$:

$$2x + y = 50, \qquad x + y = 35$$

Subtract the second from the first: $x = 15$. Then $y = 35 - 15 = 20$.

**Picture it.** Each equation is a straight line on graph paper. The solution is where the lines cross.

- Two lines cross at **one point**: one solution.
- Two lines are **parallel**: they never meet, no solution.
- Two lines are the **same line**: they meet everywhere, infinitely many solutions.

They can never cross at exactly two points. Straight lines do not bend back.

> **Intuition:** Think of $A$ as a machine that may squash space. If it squashes nothing (no direction is crushed to zero), every target $b$ has exactly one input. If it squashes some direction flat, two things happen: some targets are never reached (no solution), and targets that are reached have a whole line of inputs (infinitely many).

**Gaussian elimination** is the school method of subtracting equations, done in an organised way. We clear the numbers below the diagonal, column by column, until the system looks like a staircase (upper triangular).

Then we solve from the bottom row upward. This last part is called **back substitution**.

### Words you need
- **Coefficient matrix $A$**: the numbers in front of the unknowns. Example: for $2x + y = 50,\ x + y = 35$, $A = \begin{pmatrix}2&1\\1&1\end{pmatrix}$.
- **Augmented matrix $[A \mid b]$**: $A$ with the right-hand side added as an extra column. Example: $\begin{pmatrix}2&1&50\\1&1&35\end{pmatrix}$.
- **Row operations**: swap two rows; multiply a row by a nonzero number; add a multiple of one row to another. These never change the solutions.
- **Pivot**: the first nonzero entry of a row after elimination; it is used to clear the entries below it.
- **Upper triangular**: all entries below the diagonal are 0. Example: $\begin{pmatrix}2&1\\0&3\end{pmatrix}$.
- **Consistent**: has at least one solution.
- **Homogeneous**: right side is all zeros, $Ax = \mathbf 0$. Always has at least $x = \mathbf 0$.
- **Null space $N(A)$**: all $x$ with $Ax = \mathbf 0$. Example: for $A = \begin{pmatrix}1&1\end{pmatrix}$, $N(A)$ is the line $t(1,-1)$.
- **Column space**: all outputs $Ax$ the machine can produce. It is the span of the columns of $A$.
- **Free variable**: an unknown you can choose freely. Each one adds a direction of solutions.
- **$O(n^2)$**: "grows like $n$ squared". Double $n$, and the work becomes about 4 times.

### Formulas, explained

**When a solution exists (consistency)**

$$Ax = b \text{ has a solution} \iff \operatorname{rank}(A) = \operatorname{rank}([A \mid b])$$

- **Read it as:** "A solution exists exactly when adding the column b does not increase the rank."
- **Symbols:** $\operatorname{rank}$ is the number of independent rows; $[A \mid b]$ is the augmented matrix.
- **Why it makes sense:** if $b$ adds a new independent direction, then $b$ is outside the machine's reach. Elimination would then give a row like $0 = 5$, which is impossible.
- **Use it when:** deciding "no solution" vs "some solution".

**Structure of all solutions**

$$x = x_p + x_h, \qquad x_h \in N(A)$$

- **Read it as:** "Every solution is one particular solution plus something the machine crushes to zero."
- **Symbols:** $x_p$ is any one solution of $Ax = b$; $x_h$ solves $Ax_h = \mathbf 0$.
- **Why it makes sense:** $A(x_p + x_h) = Ax_p + Ax_h = b + \mathbf 0 = b$. Adding a crushed direction does not change the output.
- **Use it when:** deciding unique vs infinite. If $N(A) = \{\mathbf 0\}$, the solution (if it exists) is unique. Otherwise there are infinitely many.

**Counting free variables** ($n$ unknowns, consistent system)

$$\text{number of free variables} = n - \operatorname{rank}(A)$$

- **Read it as:** "Free choices equal unknowns minus independent equations."
- **Symbols:** $n$ is the number of unknowns (columns of $A$).
- **Why it makes sense:** each independent equation pins down one unknown; the rest stay free.
- **Use it when:** classifying the solution set. Zero free variables means unique.

**Cost of solving**

$$\text{elimination on a full } n\times n \approx \tfrac{2}{3}n^3 = O(n^3)$$

$$\text{back substitution} \approx n^2 = O(n^2)$$

- **Read it as:** "Clearing a full matrix costs about n-cubed steps. Solving an already-triangular one costs about n-squared."
- **Symbols:** $n$ is the number of unknowns; $O(\cdot)$ means "grows like".
- **Why it makes sense:** back substitution touches each entry above the diagonal about once. Elimination does about $n^2$ work for each of $n$ columns.
- **Use it when:** a question asks the order of operations.

### Where the formulas come from

**A. Why row operations do not change the solutions.**

1. Take $2x + y = 50$ and $x + y = 35$. The answer is $(15, 20)$.
2. Replace row 1 by (row 1 $-$ row 2): $x = 15$. The point $(15, 20)$ still satisfies it, because if both old equations are true, their difference is also true ($50 - 35 = 15$).
3. We can also go back: (new row 1) + row 2 gives the old row 1. So no solution is gained or lost.
4. Swapping rows only changes the order of the list. Multiplying a row by a nonzero number $c$ can be undone by dividing by $c$. So all three row operations keep exactly the same solutions.

**B. Why a solution exists exactly when the rank does not grow.**

1. Example with no solution: $x + y = 2$ and $2x + 2y = 5$.
2. Do $R_2 - 2R_1$: $0x + 0y = 5 - 4 = 1$. The row reads $0 = 1$, which is impossible.
3. In the matrix $A$ that row is all zeros, so $\operatorname{rank}(A) = 1$. In $[A \mid b]$ that row is $(0\ \ 0\ \ 1)$, not zero, so $\operatorname{rank}([A \mid b]) = 2$. The rank grew by 1.
4. In general, elimination ends with some all-zero rows of $A$. If the matching right-side numbers are also 0, every row is fine and back substitution works. If any is nonzero, we get "$0 =$ nonzero" and there is no solution.
5. "A zero row of $A$ with a nonzero right side" is exactly "the extra column $b$ adds a new independent row". So: solution exists $\iff$ ranks are equal.
6. Picture version: $Ax$ is a combination of the columns of $A$ (each $x_j$ is a weight on column $j$). So $Ax = b$ is solvable exactly when $b$ lies in the column space, i.e. $b$ adds no new direction.

**C. Why every solution is $x_p + x_h$.**

1. Take $x + y = 4$. One solution is $x_p = (4, 0)$. The null space ($x + y = 0$) is the line $t(1, -1)$.
2. Then $x_p + t(1,-1) = (4 + t, -t)$, and $(4 + t) + (-t) = 4$. Every such point works.
3. Why always: $A(x_p + x_h) = Ax_p + Ax_h$, because a matrix acts on a sum piece by piece (this is what "linear" means). That gives $b + \mathbf 0 = b$.
4. Why these are all the solutions: if $x$ is any solution, then $A(x - x_p) = b - b = \mathbf 0$. So $x - x_p$ is in the null space, and $x = x_p + (x - x_p)$ has the required form.
5. This explains "never exactly two solutions". If the null space contains one nonzero arrow $h$, it contains every $th$, so there are infinitely many solutions.

**D. Why free variables $= n - \operatorname{rank}(A)$.**

1. Example: $x + y + z = 1$ and $y + 2z = 1$ (already a staircase, rank 2, $n = 3$).
2. The bottom row gives $y = 1 - 2z$. The top row gives $x = 1 - y - z = 1 - (1 - 2z) - z = z$.
3. So $x$ and $y$ are fixed once $z$ is chosen; $z$ is free. Free count $= 1 = 3 - 2$.
4. In general, each nonzero row of the staircase has one pivot, and each pivot fixes one unknown. There are $\operatorname{rank}(A)$ pivots, so $n - \operatorname{rank}(A)$ unknowns are left free. This is the rank-nullity theorem (see topic: Rank, Nullity & Determinant).

**E. Where the costs $O(n^2)$ and $O(n^3)$ come from.**

1. Back substitution on a $3 \times 3$ staircase: the last row needs 1 division. Row 2 needs 1 multiplication (use the known $x_3$) plus a division. Row 1 needs 2 multiplications plus a division.
2. For $n$ rows, row $i$ needs about $(n - i)$ multiplications. Total $= 0 + 1 + 2 + \dots + (n-1) = \sum_{i=1}^{n} (n - i) = \frac{n(n-1)}{2}$.
3. Why $0 + 1 + \dots + (n-1) = \frac{n(n-1)}{2}$: write the list forwards and backwards and add in pairs. Each pair adds to $n - 1$, there are $n$ pairs, and we counted everything twice.
4. $\frac{n(n-1)}{2}$ grows like $\frac{n^2}{2}$, so back substitution is $O(n^2)$.
5. Elimination: to clear column 1 we change about $n$ rows of about $n$ entries each, about $n^2$ work. Column 2 costs about $(n-1)^2$, and so on.
6. Adding $n^2 + (n-1)^2 + \dots + 1^2$ gives about $\frac{n^3}{3}$ multiplications (and the same number of subtractions, so about $\frac23 n^3$ operations). The full proof of this sum is not needed for GATE; just remember it grows like $n^3$, one power more than back substitution.

### Examples

**Example 1 (easy):** Solve $x + y = 10$, $x - y = 2$.

1. Add the two equations: $(x + y) + (x - y) = 10 + 2$, so $2x = 12$ and $x = 6$.
2. Then $y = 10 - 6 = 4$.
3. Check: $6 - 4 = 2$. Correct.

**Result:** $x = 6, y = 4$. One solution, because the lines have different slopes.

**Example 2 (medium):** For which $k$ does this system have infinitely many solutions?

$$x + y + z = 1,\quad x + 2y + 3z = 2,\quad 2x + 3y + kz = 3$$

1. $R_2 - R_1$: $(1-1)x + (2-1)y + (3-1)z = 2 - 1$, so $y + 2z = 1$.
2. $R_3 - 2R_1$: $(2-2)x + (3-2)y + (k-2)z = 3 - 2$, so $y + (k-2)z = 1$.
3. Subtract the new row 2 from the new row 3: $(k - 2 - 2)z = 1 - 1$, so $(k - 4)z = 0$.
4. If $k \ne 4$: $z = 0$, then $y = 1$, then $x = 1 - 1 - 0 = 0$. One solution.
5. If $k = 4$: the last row is $0 = 0$. Rank is 2 but there are 3 unknowns, so one free variable ($z$).
6. No $k$ gives "no solution" here, because the right side of the last row also became $0$.

**Result:** $k = 4$ gives infinitely many solutions.

**Example 3 (GATE level):** Let $M$ be a $4 \times 3$ real matrix. Which statements can be true?
(P) $Mx = p$ has a unique solution and $Mx = q$ has no solution.
(Q) $Mx = p$ has a unique solution and $Mx = q$ has infinitely many.
(R) $Mx = 0$ has only the zero solution.

1. (P) **Can be true.** Take $M$ with 3 independent columns. Then $N(M) = \{\mathbf 0\}$. The column space is only 3-dimensional inside $\mathbb{R}^4$. Choose $p$ inside it (unique solution) and $q$ outside it (no solution).
2. (Q) **Never.** A unique solution means $N(M) = \{\mathbf 0\}$. That depends only on $M$, so no right side can give infinitely many.
3. (R) **Can be true.** The same $M$ with independent columns works.

**Result:** P and R.

### Common mistakes
> **Common mistake:** Thinking a linear system can have exactly 2 solutions. If $x_1$ and $x_2$ both work, every point on the line through them works too.

> **Common mistake:** Mixing up existence and uniqueness. Uniqueness depends only on $A$ (its null space). Existence also depends on $b$.

> **Common mistake:** Saying $Ax = \mathbf 0$ "has no solution". It always has $x = \mathbf 0$.

> **Common mistake:** Choosing $O(n^3)$ for a triangular matrix. The elimination is already done; only back substitution remains, which is $O(n^2)$.

> **Common mistake:** Forgetting that a wide matrix (more unknowns than equations, like $2 \times 3$) can never give a unique solution. It always has free variables.

### How GATE asks it
- **2024 Q.48** (2 marks, MSQ): existence claims about $Mx = p$ and $Mx = q$ for $3\times3$, $2\times3$ and $3\times2$ matrices. True: a singular $3 \times 3$ can give "no solution" for one $b$ and "infinitely many" for another; a tall $3 \times 2$ can give "unique" for one $b$ and "none" for another. False: "unique" with "infinite" for the same matrix; a unique solution for a $2 \times 3$.
- **2025 Q.12** (1 mark, MCQ): operations for Gaussian elimination on an upper triangular matrix: $O(n^2)$.

> **GATE tip:** For "there exist M, p, q" questions, build tiny examples. Try $M = \operatorname{diag}(1,1,0)$ (a singular one) or $M = \begin{pmatrix}1&0\\0&1\\0&0\end{pmatrix}$ (a tall one). One good example proves "exists".

### Summary
- First we wrote a set of linear equations as one machine equation $Ax = b$.
- Row operations can always be undone, so they never change the solutions. Elimination uses them to make a staircase.
- At the end of elimination, a row "$0 =$ nonzero" means no solution. That happens exactly when $b$ raises the rank, i.e. $b$ is outside the column space.
- Because $A$ acts on sums piece by piece, every solution is one particular solution plus a null-space arrow. So the count is 0, 1 or infinitely many, never 2.
- Each pivot fixes one unknown, so free variables $= n - \operatorname{rank}$. Back substitution costs about $n^2$, elimination about $n^3$.
- Next topic builds on this: Rank, Nullity & Determinant measure exactly how much $A$ squashes, which decides all of the above.

### Quick self-check
1. Two lines in a plane are parallel and different. How many solutions?
**Answer:** None.

2. A $3 \times 3$ system has rank 2 and is consistent. How many free variables?
**Answer:** $3 - 2 = 1$, so infinitely many solutions.

3. Is $x = \mathbf 0$ always a solution of $Ax = \mathbf 0$?
**Answer:** Yes, because $A\mathbf 0 = \mathbf 0$.

4. After elimination a row reads $0\ \ 0\ \ 0 \mid 7$. What does this mean?
**Answer:** The equation $0 = 7$ is impossible, so the system has no solution.

## Rank, Nullity & Determinant

### The big idea
**Rank** is how many truly independent directions a matrix's output has. **Nullity** is how many independent directions it crushes to zero.

The **determinant** is one number that tells how much the matrix scales area or volume. It is zero exactly when the matrix squashes space flat.

### Before you start
**1. Independence and dimension** (see topic: Vector Spaces, Subspaces & Independence). Arrows are independent if none can be built from the others. The dimension of a flat world is the number of independent directions in it: a line has 1, a plane has 2.

**2. Null space and column space** (see topic: Systems of Linear Equations & Gaussian Elimination). The null space of $A$ is all $x$ with $Ax = \mathbf 0$, the arrows the machine crushes. The column space is all outputs $Ax$, the span of the columns.

**3. Elimination and pivots.** Row operations turn a matrix into a staircase without changing its solutions. Each nonzero row of the staircase has one pivot.

**4. Area of a rectangle and a parallelogram.** A rectangle with sides 3 and 2 has area $3 \times 2 = 6$. A parallelogram (a slanted rectangle) has area base $\times$ height. Sliding the top edge sideways does not change the height, so the area stays the same.

**5. Inverse and identity** (see topic: Matrices & Special Matrices). $I$ does nothing; $A^{-1}$ undoes $A$, so $A^{-1}A = I$.

**6. Powers of a number.** $c^n$ means $c$ multiplied by itself $n$ times. Example: $2^3 = 2 \times 2 \times 2 = 8$.

**7. Eigenvalue (a first look).** If $Av = \lambda v$ for a nonzero $v$, then $\lambda$ is an eigenvalue. If $\lambda = 0$, some nonzero arrow is crushed. Full details in topic: Eigenvalues & Eigenvectors.

### Intuition
Imagine a 3D room full of balloons. A matrix machine acts on the whole room.

- A **rank 3** machine keeps the room 3D. It may stretch or twist it, but nothing is flattened.
- A **rank 2** machine flattens the room onto a wall. One whole direction is lost. Everything on that lost direction becomes the zero arrow. That lost direction is the **null space**, and its size (1 here) is the **nullity**.
- A **rank 1** machine squashes the room onto a single line. Two directions are lost.

> **Intuition:** Rank + nullity = the number of input directions. Every input direction either survives (counts in rank) or gets crushed (counts in nullity). Nothing disappears from the bookkeeping.

**Rank as "truly independent rows".** Think of a class report card table. If the "total marks" column is just maths + science, it carries no new information. The table's rank does not count it.

**Determinant as volume.** Take a $1 \times 1 \times 1$ cube and push it through the machine. It becomes a slanted box. The volume of that box is $\lvert\det A\rvert$.

- $\det A = 6$: volumes grow 6 times.
- $\det A = -2$: volumes double, and space is flipped like a mirror image.
- $\det A = 0$: the box is flat, zero volume. The machine lost a direction. It cannot be undone, so $A$ has no inverse.

> **Intuition:** You cannot un-squash a pancake back into a ball. A matrix with $\det = 0$ has destroyed information, so no inverse exists.

### Words you need
- **Rank**: number of independent rows (always equal to the number of independent columns). Example: $\begin{pmatrix}1&2\\2&4\end{pmatrix}$ has rank 1.
- **Null space**: all $x$ with $Ax = \mathbf 0$. Example: for the matrix above, $(2,-1)$ is in it, since $1\cdot2 + 2\cdot(-1) = 0$.
- **Nullity**: the dimension of the null space. Example: 1 for the matrix above.
- **Full rank**: rank equals the smaller of rows and columns. Example: $I$ is full rank.
- **Singular**: a square matrix with $\det = 0$. Example: $\begin{pmatrix}1&2\\2&4\end{pmatrix}$.
- **Invertible (non-singular)**: has an inverse; $\det \ne 0$.
- **Minor**: the determinant of the smaller matrix left after deleting one row and one column.
- **Cofactor expansion**: computing a $3 \times 3$ determinant using $2 \times 2$ minors with signs $+, -, +$.

### Formulas, explained

**Rank-nullity theorem**

$$\operatorname{rank}(A) + \operatorname{nullity}(A) = n \quad (A \text{ is } m \times n)$$

- **Read it as:** "Rank plus nullity equals the number of columns."
- **Symbols:** $n$ is the number of columns (input directions); $m$ is the number of rows.
- **Why it makes sense:** each input direction either survives or is crushed.
- **Use it when:** you know one of rank or nullity and need the other.

**Rank rules**

$$\operatorname{rank}(A) \le \min(m, n)$$

$$\operatorname{rank}(AB) \le \min(\operatorname{rank}A, \operatorname{rank}B), \qquad \operatorname{rank}(A^\top A) = \operatorname{rank}(A)$$

- **Read it as:** "Rank cannot exceed rows or columns. Multiplying machines can never create new directions. A-transpose A has the same rank as A."
- **Symbols:** $\min(m, n)$ is the smaller of the two numbers.
- **Why it makes sense:** if machine $B$ flattens space to a plane, machine $A$ after it cannot rebuild the lost third direction.
- **Use it when:** chain arguments like "if $A^3 = A$ then $\operatorname{rank}A^2 = \operatorname{rank}A$".

**2 by 2 determinant**

$$\det\begin{pmatrix}a & b\\ c & d\end{pmatrix} = ad - bc$$

- **Read it as:** "Main diagonal product minus the other diagonal product."
- **Symbols:** $a, b, c, d$ are the four entries.
- **Why it makes sense:** it is the signed area of the parallelogram made by the two columns.
- **Use it when:** any $2 \times 2$ question, and inside $3 \times 3$ expansion.

**3 by 3 determinant (expand along row 1)**

$$\det\begin{pmatrix}a&b&c\\d&e&f\\g&h&i\end{pmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)$$

- **Read it as:** "Each top entry times the 2-by-2 determinant left after deleting its row and column, with signs plus, minus, plus."
- **Symbols:** $a$ to $i$ are the nine entries, row by row.
- **Why it makes sense:** it splits the volume into three pieces, one for each entry of the top row.
- **Use it when:** you must compute, after checking for a shortcut (dependent rows give 0).

**Determinant rules**

$$\det(AB) = \det A \cdot \det B, \qquad \det(A^\top) = \det A$$

$$\det(A^{-1}) = \frac{1}{\det A}, \qquad \det(cA) = c^n \det A$$

- **Read it as:** "Determinant of a product is the product of determinants. Transpose does not change it. Inverse flips it. Scaling an n-by-n matrix by c scales the determinant by c to the power n."
- **Symbols:** $c$ is a number; $n$ is the size of the square matrix.
- **Why it makes sense:** volumes multiply when machines are chained. Scaling every one of $n$ directions by $c$ scales volume by $c^n$.
- **More facts:** $\det A$ = product of eigenvalues; triangular matrix: product of diagonal entries; swapping two rows flips the sign; adding a multiple of one row to another changes nothing; a row that is a combination of others gives $\det = 0$.
- **Use it when:** you see $\det$ of a product or a polynomial like $M^2 + 12M = M(M + 12I)$.

**The big equivalence (square $A$)**

$$A \text{ invertible} \iff \det A \ne 0 \iff \operatorname{rank}A = n \iff \operatorname{nullity}A = 0 \iff 0 \text{ is not an eigenvalue}$$

- **Read it as:** "All these say the same thing: nothing is squashed."
- **Symbols:** $n$ is the size of $A$; $\iff$ means "exactly when".
- **Why it makes sense:** each one is a different way of saying "no nonzero arrow is sent to $\mathbf 0$".
- **Use it when:** an MSQ lists several of these. They are all true together or all false together.

### Where the formulas come from

**A. Where rank-nullity comes from.**

1. Take $A = \begin{pmatrix}1&2&3\\2&4&6\end{pmatrix}$ ($n = 3$ columns). Row 2 is twice row 1, so the rank is 1.
2. The null space is all $x$ with $x_1 + 2x_2 + 3x_3 = 0$. Here $x_1 = -2x_2 - 3x_3$, with $x_2, x_3$ free. So the nullity is 2.
3. Check: $1 + 2 = 3 = n$.
4. In general, after elimination there is one pivot per independent row, so there are $\operatorname{rank}(A)$ pivots. Each pivot fixes one unknown.
5. The other $n - \operatorname{rank}(A)$ unknowns are free. Each free unknown gives one independent null-space arrow (set it to 1 and the other free ones to 0). So nullity $= n - \operatorname{rank}(A)$, which is the theorem.

**B. Why $\operatorname{rank}(AB) \le \operatorname{rank}(A)$ and $\le \operatorname{rank}(B)$.**

1. Every output of $AB$ is $A(Bx)$, which is an output of $A$. So the outputs of $AB$ sit inside the outputs of $A$, and cannot have more directions. Hence $\operatorname{rank}(AB) \le \operatorname{rank}(A)$.
2. The outputs of $B$ form a flat world of dimension $\operatorname{rank}(B)$. The machine $A$ maps that world to something with at most as many directions, because a machine cannot create new directions from nothing (each output direction comes from some input direction).
3. So $\operatorname{rank}(AB) \le \operatorname{rank}(B)$ as well.

**C. Why $\operatorname{rank}(A^\top A) = \operatorname{rank}(A)$.**

1. Show both have the same null space. If $Ax = \mathbf 0$, then $A^\top A x = A^\top\mathbf 0 = \mathbf 0$.
2. Now suppose $A^\top A x = \mathbf 0$. Multiply on the left by $x^\top$: $x^\top A^\top A x = 0$, which is $(Ax)^\top(Ax) = \|Ax\|^2 = 0$ (see topic: Matrices & Special Matrices for $(Ax)^\top = x^\top A^\top$).
3. A length is 0 only for the zero arrow, so $Ax = \mathbf 0$.
4. Same null space, and both have $n$ columns. By rank-nullity, they have the same rank.

**D. Where $ad - bc$ comes from (area of a parallelogram).**

1. Start with $\begin{pmatrix}3&0\\0&2\end{pmatrix}$. Its columns $(3, 0)$ and $(0, 2)$ make a $3 \times 2$ rectangle, area 6. And $ad - bc = 6 - 0 = 6$.
2. Now take $\begin{pmatrix}3&1\\0&2\end{pmatrix}$. Columns $(3, 0)$ and $(1, 2)$. The second edge leans sideways, but its height is still 2. Base 3 times height 2 is still 6, and $ad - bc = 6 - 0 = 6$.
3. General case: the area of the parallelogram from $(a, c)$ and $(b, d)$. Draw the big rectangle $(a + b) \times (c + d)$ around it and cut off the corner triangles and rectangles.
4. The pieces outside the parallelogram are: two triangles of area $\frac{ac}{2}$, two triangles of area $\frac{bd}{2}$, and two rectangles of area $bc$. Their total is $ac + bd + 2bc$.
5. Area $= (a+b)(c+d) - ac - bd - 2bc = ac + ad + bc + bd - ac - bd - 2bc = ad - bc$.
6. The sign tells whether the second column is anticlockwise from the first (positive) or clockwise (negative, a mirror flip).

**E. Where the 3 by 3 expansion comes from.**

1. The full proof is not needed for GATE. Here is the honest idea.
2. A determinant must be linear in each row (doubling a row doubles the volume) and must flip sign when two rows swap. Those two rules force a unique formula.
3. Split row 1: $(a, b, c) = a(1,0,0) + b(0,1,0) + c(0,0,1)$. By linearity, the determinant splits into three pieces.
4. In the first piece, the top row is $(1,0,0)$, which points straight along axis 1. The volume is $1 \times$ (area of what rows 2 and 3 make in the other two axes) $= ei - fh$.
5. The second and third pieces work the same way, but bringing the chosen column to the front needs one swap for the middle column. One swap means one sign flip, which gives the pattern $+, -, +$.

**F. Why $\det(cA) = c^n \det A$ and $\det(AB) = \det A \det B$.**

1. Take $A = I$ in 3D, a unit cube of volume 1. $2I$ doubles every edge, so the new box is $2 \times 2 \times 2$ with volume $8 = 2^3$. Each of the $n$ edges is multiplied by $c$, so the volume is multiplied by $c^n$.
2. For a product, $B$ first multiplies every volume by $\det B$, then $A$ multiplies the result by $\det A$. So the total factor is $\det A \cdot \det B$.
3. From this, $\det(A^{-1})\det(A) = \det(A^{-1}A) = \det I = 1$, so $\det(A^{-1}) = \frac{1}{\det A}$.
4. For a triangular matrix, expand along the first column again and again: only the diagonal entry survives each time. So the determinant is the product of the diagonal entries.

**G. Why the row facts hold.**

1. Adding a multiple of row 1 to row 2 slides the box sideways without changing its height, exactly like step D2. So the determinant does not change.
2. If row 3 = row 1 + row 2, subtract row 1 and row 2 from row 3. By step 1 the determinant is unchanged, but now row 3 is all zeros.
3. A zero row means a flat box (no height in that direction), so the volume is 0. Hence any dependent row gives $\det = 0$.

**H. Why the big equivalence holds.**

1. $\det A \ne 0$ means volume is not crushed, so no direction is lost: nullity 0.
2. Nullity 0 means rank $= n$ by rank-nullity.
3. Nullity 0 also means no nonzero $v$ has $Av = \mathbf 0 = 0 \cdot v$, so 0 is not an eigenvalue.
4. With nothing lost, every output comes from exactly one input (see topic: Systems of Linear Equations & Gaussian Elimination), so an undo machine $A^{-1}$ exists. If $\det A = 0$, all these fail together.

### Examples

**Example 1 (easy):** Find $\det\begin{pmatrix}3 & 2\\ 1 & 4\end{pmatrix}$.

1. Main diagonal product: $3 \times 4 = 12$.
2. Other diagonal product: $2 \times 1 = 2$.
3. Subtract: $12 - 2 = 10$.

**Result:** $\det = 10$. A unit square becomes a parallelogram of area 10.

**Example 2 (medium):** $A = \begin{pmatrix}1&2&1\\2&4&2\\0&1&1\end{pmatrix}$. Find rank, nullity and $\det A$.

1. Row 2 $= (2,4,2) = 2 \times (1,2,1) = 2 \times$ row 1. So rows are dependent and $\det A = 0$.
2. Check by expansion: $1(4\cdot1 - 2\cdot1) - 2(2\cdot1 - 2\cdot0) + 1(2\cdot1 - 4\cdot0) = 2 - 4 + 2 = 0$. Correct.
3. Rows 1 and 3 are $(1,2,1)$ and $(0,1,1)$, not multiples. So rank $= 2$.
4. Nullity $= 3 - 2 = 1$.

**Result:** rank 2, nullity 1, $\det A = 0$.

**Example 3 (GATE level):** $M = \begin{pmatrix}2&1&0\\1&3&1\\3&4&1\end{pmatrix}$. Find $\det(M^3 - 5M^2)$.

1. Factor: $M^3 - 5M^2 = M^2(M - 5I)$. So $\det(M^3 - 5M^2) = (\det M)^2 \cdot \det(M - 5I)$.
2. Look at rows. Row 1 + row 2 $= (2+1,\ 1+3,\ 0+1) = (3, 4, 1) =$ row 3. Dependent rows, so $\det M = 0$.
3. Answer $= 0^2 \times \det(M - 5I) = 0$. No big calculation needed.

**Result:** $0$.

### Common mistakes
> **Common mistake:** Expanding a $3 \times 3$ determinant without first checking if a row is a sum or multiple of others. GATE often hides a dependent row so the answer is 0.

> **Common mistake:** Writing $\det(cA) = c \det A$. It is $c^n \det A$. For a $3 \times 3$, $\det(2A) = 8\det A$.

> **Common mistake:** Writing $\det(A + B) = \det A + \det B$. This is false in general. Only products split.

> **Common mistake:** Using rank-nullity with the number of rows. It uses the number of **columns** $n$.

> **Common mistake:** Answering "always true" questions with one example. Test with $A = 0$, $A = I$ and $A = \operatorname{diag}(1, 0)$ to kill false options.

### How GATE asks it
- **2024 Q.35** (1 mark, NAT): $\det(M^2 + 12M)$ for a $3 \times 3$. Factor as $M(M + 12I)$. Row 3 = row 1 + row 2, so $\det M = 0$ and the answer is **0**.
- **2025 Q.37** (2 marks, MCQ): $A^3 = A$; which is always true? Chain: $\operatorname{rank}A = \operatorname{rank}A^3 \le \operatorname{rank}A^2 \le \operatorname{rank}A$, so $A$ and $A^2$ have the same rank. "Invertible", "$\det = 0$" and "trace = 1" fail for $A = 0$ or $A = I$.

> **GATE tip:** Whenever you see $\det$ of a polynomial in $M$, factor out $M$ and check $\det M$ first. If it is 0, you are done.

### Summary
- First we counted directions: each input direction either survives (rank) or is crushed (nullity). Pivots in elimination make this count exact, so rank + nullity $= n$.
- Chaining machines can only lose directions, never create them, so the rank of a product is at most the rank of each factor.
- Then we measured volume. In 2D, cutting pieces off a rectangle shows the parallelogram area is $ad - bc$, and the $3 \times 3$ rule is the same idea with signs from row swaps.
- Volumes multiply when machines are chained, so $\det(AB) = \det A \det B$ and $\det(cA) = c^n\det A$.
- Sliding a row does not change volume, so a dependent row gives a flat box and $\det = 0$. That is why "invertible", "$\det \ne 0$", "full rank" and "no zero eigenvalue" all mean the same thing.
- Next topic builds on this: Eigenvalues are found by asking when $\det(A - \lambda I) = 0$.

### Quick self-check
1. A $5 \times 7$ matrix has rank 4. What is its nullity?
**Answer:** $7 - 4 = 3$.

2. A $3 \times 3$ matrix has $\det A = 2$. What is $\det(3A)$?
**Answer:** $3^3 \times 2 = 27 \times 2 = 54$.

3. If $\det A = 0$, can $Ax = \mathbf 0$ have a nonzero solution?
**Answer:** Yes. $\det A = 0$ means nullity is at least 1, so some nonzero $x$ is crushed to zero.

4. What is the area of the parallelogram made by $(2, 0)$ and $(5, 3)$?
**Answer:** $\lvert 2 \cdot 3 - 5 \cdot 0\rvert = 6$.

## Eigenvalues & Eigenvectors

### The big idea
When a matrix acts on space, most arrows get turned to a new direction. An **eigenvector** is a special arrow that keeps its direction and only gets stretched (or shrunk, or flipped).

The stretch factor is its **eigenvalue**.

### Before you start
**1. Matrix times vector** (see topic: Matrices & Special Matrices). Each entry of $Av$ is a row of $A$ dotted with $v$. Example: $\begin{pmatrix}2&0\\0&1\end{pmatrix}\begin{pmatrix}1\\1\end{pmatrix} = \begin{pmatrix}2\\1\end{pmatrix}$.

**2. Determinant and squashing** (see topic: Rank, Nullity & Determinant). $\det M = 0$ exactly when $M$ crushes some nonzero arrow to $\mathbf 0$. For $2 \times 2$: $\det\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad - bc$.

**3. Trace.** The sum of the diagonal entries. Example: $\operatorname{tr}\begin{pmatrix}4&1\\2&3\end{pmatrix} = 4 + 3 = 7$.

**4. Quadratic equation.** An equation $a\lambda^2 + b\lambda + c = 0$ has roots $\lambda = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. Example: $\lambda^2 - 5\lambda + 6 = 0$ factors as $(\lambda - 2)(\lambda - 3) = 0$, so $\lambda = 2$ or $3$.

**5. Sum and product of roots.** If $\lambda^2 - s\lambda + p = 0$ has roots $r_1, r_2$, then it equals $(\lambda - r_1)(\lambda - r_2) = \lambda^2 - (r_1 + r_2)\lambda + r_1r_2$. So $r_1 + r_2 = s$ and $r_1 r_2 = p$. Example: roots 2 and 3 give $s = 5$, $p = 6$.

**6. Complex numbers.** The square root of a negative number is not on the number line. We write $i = \sqrt{-1}$, so $\sqrt{-11} = i\sqrt{11}$. A complex number looks like $p + qi$. They come in pairs $p \pm qi$ when the equation has real coefficients.

**7. Polynomial.** An expression like $p(t) = t^3 - 2t^2 + t$ made of powers of $t$ times numbers. For a matrix, $p(A) = A^3 - 2A^2 + A$ (a constant $c$ becomes $cI$).

**8. Null space** (see topic: Systems of Linear Equations & Gaussian Elimination). All $x$ with $Mx = \mathbf 0$.

### Intuition
Take a rubber sheet with arrows drawn on it. Pull the sheet so it becomes twice as wide, but keep its height the same.

- An arrow pointing **east** just gets longer. It still points east. It was stretched by 2, so east is an eigenvector with eigenvalue 2.
- An arrow pointing **north** does not change at all. It is an eigenvector with eigenvalue 1.
- An arrow pointing **north-east** tilts towards east. Its direction changed, so it is **not** an eigenvector.

> **Intuition:** Eigenvectors are the "natural axes" of a matrix. Along these directions, the complicated machine acts like simple multiplication by a number.

**What the eigenvalue tells you:**

- $\lambda = 3$: the arrow becomes 3 times longer.
- $\lambda = 0.5$: it shrinks to half.
- $\lambda = -1$: it flips to point backwards.
- $\lambda = 0$: it is crushed to zero. So the matrix squashes something, and it is not invertible.

**Rotations have no real eigenvectors.** Rotate the sheet by $90^\circ$. Every arrow turns, so no real direction stays put.

The eigenvalues become complex numbers (like $i$ and $-i$). They still count in the trace and determinant rules below.

**Why data science cares.** In PCA, the eigenvectors of the covariance matrix are the directions in which the data spreads most. The eigenvalue is how much spread there is in that direction.

> **Intuition:** If you know what a matrix does to its eigenvectors, you know what it does to $A^2$, $A^{10}$, $A^{-1}$ or $A + 5I$ almost for free: just apply the same operation to the number $\lambda$.

### Words you need
- **Eigenvector $v$**: a nonzero arrow with $Av = \lambda v$. Example: for $\begin{pmatrix}2&0\\0&1\end{pmatrix}$, $v = (1,0)$.
- **Eigenvalue $\lambda$** (lambda): the stretch factor. Example: $2$ for the vector above.
- **Characteristic equation**: $\det(A - \lambda I) = 0$, the equation whose roots are the eigenvalues.
- **Trace**: sum of diagonal entries.
- **Discriminant**: for $a\lambda^2 + b\lambda + c = 0$, the number $b^2 - 4ac$. Negative means complex roots.
- **Complex conjugate pair**: two complex numbers $p + qi$ and $p - qi$. Example: $\frac{3 \pm i\sqrt{11}}{2}$.
- **Diagonalizable**: $A = PDP^{-1}$, where $D$ is diagonal. Happens when there are enough independent eigenvectors.
- **Spectral theorem**: a symmetric matrix has real eigenvalues and perpendicular eigenvectors.

### Formulas, explained

**Eigen equation**

$$Av = \lambda v, \qquad v \ne \mathbf 0$$

- **Read it as:** "A times v equals lambda times v."
- **Symbols:** $A$ is a square matrix; $v$ is the eigenvector; $\lambda$ is the eigenvalue.
- **Why it makes sense:** the machine's output points the same way as the input, only scaled.
- **Use it when:** checking whether a given vector is an eigenvector.

**Characteristic equation**

$$\det(A - \lambda I) = 0$$

- **Read it as:** "Find lambda so that A minus lambda I squashes space."
- **Symbols:** $I$ is the identity of the same size as $A$.
- **Why it makes sense:** $Av = \lambda v$ means $(A - \lambda I)v = \mathbf 0$ with $v \ne \mathbf 0$. A nonzero arrow is crushed, so $A - \lambda I$ is singular and its determinant is 0.
- **Use it when:** you need actual eigenvalues (mainly for $2 \times 2$).

**2 by 2 shortcut**

$$\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0$$

- **Read it as:** "Lambda squared minus trace times lambda plus determinant equals zero."
- **Symbols:** $\operatorname{tr}A = a + d$ and $\det A = ad - bc$ for $A = \begin{pmatrix}a&b\\c&d\end{pmatrix}$.
- **Why it makes sense:** it is the characteristic equation multiplied out.
- **Test:** complex eigenvalues when $(\operatorname{tr}A)^2 < 4\det A$.
- **Use it when:** any $2 \times 2$ eigenvalue question. Takes 20 seconds.

**Trace and determinant rules**

$$\lambda_1 + \lambda_2 + \dots + \lambda_n = \operatorname{tr}(A), \qquad \lambda_1 \lambda_2 \cdots \lambda_n = \det(A)$$

- **Read it as:** "Eigenvalues add up to the trace and multiply to the determinant."
- **Symbols:** $\lambda_1, \dots, \lambda_n$ are all $n$ eigenvalues, counted with repeats, complex ones included.
- **Why it makes sense:** for a diagonal matrix the eigenvalues are the diagonal entries, so both rules are easy to see there. The general case is shown below.
- **Use it when:** a question asks the sum or product of eigenvalues. Never solve a cubic for this.

**Functions of a matrix**

$$Av = \lambda v \;\Rightarrow\; A^k v = \lambda^k v,\quad A^{-1}v = \tfrac{1}{\lambda}v,\quad (A + cI)v = (\lambda + c)v,\quad p(A)v = p(\lambda)v$$

- **Read it as:** "Whatever you do to the matrix, do to the eigenvalue. The eigenvector stays the same."
- **Symbols:** $k$ is a power; $c$ is a number; $p$ is any polynomial, like $p(t) = t^3 - 2t^2 + t$.
- **Why it makes sense:** $A^2v = A(Av) = A(\lambda v) = \lambda(Av) = \lambda^2 v$. Repeat for higher powers.
- **Use it when:** you see $A^3 - 2A^2 + A$, $I + xx^\top$, $A^{-1}$, and so on.

**Hidden eigenvectors**

$$\text{rows of } A \text{ sum to } s \;\Rightarrow\; A\mathbf 1 = s\,\mathbf 1$$

- **Read it as:** "If every row adds up to s, the all-ones vector is an eigenvector with eigenvalue s."
- **Symbols:** $\mathbf 1 = (1, 1, \dots, 1)$. Each entry of $A\mathbf 1$ is a row sum.
- **Why it makes sense:** dotting a row with all-ones just adds the row.
- **Also:** triangular matrix: eigenvalues are the diagonal entries. Symmetric matrix: real eigenvalues, perpendicular eigenvectors, $A = Q\Lambda Q^\top$ with $Q$ orthogonal and $\Lambda$ diagonal.
- **Use it when:** a question mentions row sums, column sums, or a triangular matrix.

### Where the formulas come from

**A. Where $\det(A - \lambda I) = 0$ comes from.**

1. Take $A = \begin{pmatrix}4&1\\2&3\end{pmatrix}$ and try $v = (1, 1)$: $Av = (5, 5) = 5v$. So $\lambda = 5$ works.
2. Rewrite $Av = 5v$ as $Av - 5v = \mathbf 0$. Since $5v = 5Iv$, this is $(A - 5I)v = \mathbf 0$. We need $I$ because we cannot subtract a number from a matrix directly.
3. $A - 5I = \begin{pmatrix}-1&1\\2&-2\end{pmatrix}$. It crushes the nonzero arrow $(1,1)$ to $\mathbf 0$.
4. A matrix that crushes a nonzero arrow has determinant 0 (see topic: Rank, Nullity & Determinant). Check: $(-1)(-2) - (1)(2) = 0$. Yes.
5. General: $\lambda$ is an eigenvalue $\iff$ $(A - \lambda I)v = \mathbf 0$ has a nonzero $v$ $\iff$ $A - \lambda I$ is singular $\iff$ $\det(A - \lambda I) = 0$.

**B. Where the 2 by 2 shortcut comes from.**

1. $A - \lambda I = \begin{pmatrix}a - \lambda & b\\ c & d - \lambda\end{pmatrix}$, because subtracting $\lambda I$ only changes the diagonal.
2. Its determinant is $(a - \lambda)(d - \lambda) - bc$, by the $ad - bc$ rule.
3. Multiply out: $ad - a\lambda - d\lambda + \lambda^2 - bc = \lambda^2 - (a + d)\lambda + (ad - bc)$.
4. Recognise $a + d = \operatorname{tr}A$ and $ad - bc = \det A$. So the equation is $\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0$.
5. By the quadratic formula, the roots are complex when the discriminant $(\operatorname{tr}A)^2 - 4\det A$ is negative.

**C. Where "sum = trace, product = determinant" comes from.**

1. For $2 \times 2$: compare step B4 with "Before you start" item 5. The equation $\lambda^2 - s\lambda + p = 0$ has roots adding to $s$ and multiplying to $p$. Here $s = \operatorname{tr}A$ and $p = \det A$.
2. Check with $A = \begin{pmatrix}4&1\\2&3\end{pmatrix}$: eigenvalues 5 and 2. Sum $7 = 4 + 3$. Product $10 = 12 - 2$.
3. Product rule for any size: $\det(A - \lambda I)$ is a polynomial with roots $\lambda_1, \dots, \lambda_n$, so it equals $(\lambda_1 - \lambda)(\lambda_2 - \lambda)\cdots(\lambda_n - \lambda)$. Put $\lambda = 0$: $\det A = \lambda_1\lambda_2\cdots\lambda_n$.
4. Sum rule for any size: the full proof is not needed for GATE. The idea is that when you expand $\det(A - \lambda I)$, the $\lambda^{n-1}$ term comes only from the product of the diagonal entries $(a_{11} - \lambda)\cdots(a_{nn} - \lambda)$, and its coefficient is $\pm(a_{11} + \dots + a_{nn})$. In the factored form the same coefficient is $\pm(\lambda_1 + \dots + \lambda_n)$. So they are equal.

**D. Where "do it to $\lambda$" comes from.**

1. Take $Av = \lambda v$. Apply $A$ again: $A^2v = A(\lambda v)$.
2. A number can be pulled out of a matrix product, so $A(\lambda v) = \lambda(Av) = \lambda(\lambda v) = \lambda^2 v$.
3. Repeating gives $A^kv = \lambda^kv$ for any whole number $k$.
4. Shifting: $(A + cI)v = Av + cv = \lambda v + cv = (\lambda + c)v$.
5. Inverse: start from $Av = \lambda v$ and apply $A^{-1}$ to both sides: $v = \lambda A^{-1}v$. Divide by $\lambda$ (allowed because an invertible $A$ has $\lambda \ne 0$): $A^{-1}v = \frac{1}{\lambda}v$.
6. A polynomial is just a sum of powers times numbers, so put steps 3 and 4 together: $p(A)v = p(\lambda)v$. Example: $(A^2 - 3A)v = \lambda^2v - 3\lambda v = (\lambda^2 - 3\lambda)v$.

**E. Where the hidden eigenvectors come from.**

1. Row sums: $A\mathbf 1$ dots each row with $(1, \dots, 1)$, which adds the row. If every row adds to $s$, then $A\mathbf 1 = (s, \dots, s) = s\mathbf 1$.
2. Triangular: for $A = \begin{pmatrix}5&7\\0&-2\end{pmatrix}$, $A - \lambda I$ is still triangular. Its determinant is the product of its diagonal, $(5 - \lambda)(-2 - \lambda)$, which is zero at $\lambda = 5$ and $\lambda = -2$.
3. $A$ and $A^\top$ have the same eigenvalues, because $\det(A^\top - \lambda I) = \det((A - \lambda I)^\top) = \det(A - \lambda I)$. So column sums work too (they are row sums of $A^\top$).
4. Symmetric matrices: the full proof of the spectral theorem is not needed for GATE. A picture: a symmetric matrix stretches a circle into an ellipse without any twisting, and the axes of an ellipse are always at right angles. Those axes are the eigenvectors.

### Examples

**Example 1 (easy):** Is $v = (1,1)$ an eigenvector of $A = \begin{pmatrix}3&1\\1&3\end{pmatrix}$?

1. $Av = (3 \cdot 1 + 1 \cdot 1,\ 1 \cdot 1 + 3 \cdot 1) = (4, 4)$.
2. $(4, 4) = 4(1,1)$, a multiple of $v$.
3. Each row sums to 4, so this was predictable from the row-sum rule.

**Result:** Yes, with eigenvalue 4.

**Example 2 (medium):** $A = \begin{pmatrix}4&1\\2&3\end{pmatrix}$. Find the eigenvalues, eigenvectors, and the eigenvalues of $A^2 - 3A$.

1. $\operatorname{tr}A = 4 + 3 = 7$. $\det A = 4 \cdot 3 - 1 \cdot 2 = 12 - 2 = 10$.
2. $\lambda^2 - 7\lambda + 10 = 0$, so $(\lambda - 5)(\lambda - 2) = 0$, giving $\lambda = 5$ or $2$. Check: $5 + 2 = 7$, $5 \times 2 = 10$.
3. $\lambda = 5$: $A - 5I = \begin{pmatrix}-1&1\\2&-2\end{pmatrix}$. Row 1 says $-v_1 + v_2 = 0$, so $v = (1,1)$.
4. $\lambda = 2$: $A - 2I = \begin{pmatrix}2&1\\2&1\end{pmatrix}$. Row 1 says $2v_1 + v_2 = 0$, so $v = (1,-2)$.
5. $p(t) = t^2 - 3t$. $p(5) = 25 - 15 = 10$. $p(2) = 4 - 6 = -2$.

**Result:** eigenvalues 5 and 2 with eigenvectors $(1,1)$ and $(1,-2)$; $A^2 - 3A$ has eigenvalues $10$ and $-2$.

**Example 3 (GATE level):** Every column of $A \in \mathbb{R}^{n \times n}$ sums to 2. Let $B = A^2 - 4I$. Which is true? (A) $B$ is invertible (B) $\det B = 0$ (C) $\operatorname{tr}B = 0$ (D) $B$ has no real eigenvalue.

1. Columns of $A$ sum to 2 means the rows of $A^\top$ sum to 2. So $A^\top \mathbf 1 = 2 \cdot \mathbf 1$, and 2 is an eigenvalue of $A^\top$.
2. $A$ and $A^\top$ have the same eigenvalues. So 2 is an eigenvalue of $A$.
3. Use $p(t) = t^2 - 4$. $B$ has the eigenvalue $p(2) = 4 - 4 = 0$.
4. Eigenvalue 0 means $\det B = 0$ and $B$ is not invertible. So (B) is true, (A) is false. (D) is false because 0 is real. (C) is not forced.

**Result:** (B).

### Common mistakes
> **Common mistake:** Forgetting complex eigenvalues still count in the trace and determinant rules. A rotation's eigenvalues $e^{\pm i\theta}$ add up to $2\cos\theta$, which is its trace.

> **Common mistake:** Expanding $\det(A - \lambda I)$ for a $3 \times 3$ when the question only asks a sum or product. Use trace or determinant directly.

> **Common mistake:** Allowing $v = \mathbf 0$ as an eigenvector. The zero vector is never an eigenvector (although the eigenvalue $0$ is allowed).

> **Common mistake:** Thinking the eigenvector changes when you take $A^2$ or $A + cI$. It stays the same; only the eigenvalue changes.

> **Common mistake:** Getting the sign wrong in the $2 \times 2$ shortcut. It is $-(\operatorname{tr}A)\lambda$ and $+\det A$.

### How GATE asks it
4 questions, 5 marks.

- **2024 Q.13** (1 mark, MCQ): $M = \begin{pmatrix}2&-1\\3&1\end{pmatrix}$. Trace 3, determinant 5. Discriminant $9 - 20 = -11 < 0$, so a complex conjugate pair.
- **2025 Q.13** (1 mark, MCQ): rows of $A$ sum to 1, $B = A^3 - 2A^2 + A$. Then $B\mathbf 1 = (1 - 2 + 1)\mathbf 1 = \mathbf 0$, so $Bx = 0$ has infinitely many solutions.
- **2025 Q.28** (1 mark, MSQ): $A = I + xx^\top$ with $\|x\| = 1$. Eigenvalues are 2 (once) and 1 ($n-1$ times). So rank $n$ and invertible; 0 is not an eigenvalue; $A^{-1}$ has eigenvalues $\frac12$ and 1, none negative.
- **2026 Q.46** (2 marks, MCQ): a $3 \times 3$ rotation-type matrix; sum of eigenvalues $= 1 + 2\cos t = 1 + \sqrt2$. So $\cos t = \frac{1}{\sqrt2}$ and $t = \pm\frac{\pi}{4}$.

> **GATE tip:** For $n \ge 3$, almost never compute the characteristic polynomial. Use trace, determinant, row sums, triangular diagonals and the "do it to $\lambda$" rule.

### Summary
- First we asked which arrows keep their direction: $Av = \lambda v$.
- Moving everything to one side gives $(A - \lambda I)v = \mathbf 0$ with $v \ne \mathbf 0$. A matrix that crushes a nonzero arrow has determinant 0, so eigenvalues solve $\det(A - \lambda I) = 0$.
- For $2 \times 2$ this multiplies out to $\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0$. The sum and product of roots then give trace and determinant, and this works for any size.
- Applying $A$ again and pulling out the number shows $A^k$, $A^{-1}$, $A + cI$ and any polynomial just act on $\lambda$, with the same eigenvector.
- Row sums, triangular diagonals and symmetry let you read eigenvalues without any calculation.
- Next topic builds on this: Quadratic Forms use the eigenvalues of a symmetric matrix to decide if a surface is a bowl or a saddle; later, PCA and SVD are built on eigenvectors.

### Quick self-check
1. A $3 \times 3$ matrix has eigenvalues $1, 2, 3$. What is its determinant?
**Answer:** $1 \times 2 \times 3 = 6$.

2. $A$ has eigenvalue 4. What eigenvalue does $A^{-1} + I$ have?
**Answer:** $\frac14 + 1 = \frac54$.

3. Eigenvalues of $\begin{pmatrix}5&7\\0&-2\end{pmatrix}$?
**Answer:** $5$ and $-2$ (triangular, so read the diagonal).

4. A $2 \times 2$ matrix has trace 6 and determinant 9. What are its eigenvalues?
**Answer:** $\lambda^2 - 6\lambda + 9 = (\lambda - 3)^2 = 0$, so $3$ and $3$.

## Quadratic Forms & Definiteness

### The big idea
A **quadratic form** is an expression where every term has total power 2, like $3x^2 + 2xy + y^2$. We write it as $x^\top A x$ with a symmetric matrix $A$.

**Definiteness** asks about its shape: is it a bowl (always positive), a flat-bottom valley, an upside-down bowl, or a saddle?

### Before you start
**1. Squares are never negative.** For any real number $t$, $t^2 \ge 0$, and $t^2 = 0$ only when $t = 0$. Example: $(-3)^2 = 9$. This single fact drives the whole topic.

**2. Total power of a term.** In $x_1x_2$, each variable has power 1, so the total is 2. In $x_1^2$ the total is also 2. In $x_1$ it is 1. A quadratic form has only total-power-2 terms.

**3. Row times matrix times column** (see topic: Matrices & Special Matrices). $x^\top A x$ means: first compute the column $Ax$, then dot it with $x$. The result is one number.

**4. Symmetric matrix and transpose.** $A$ is symmetric if $A^\top = A$, i.e. $a_{12} = a_{21}$ and so on. Also $(Ax)^\top = x^\top A^\top$.

**5. Eigenvalues and eigenvectors** (see topic: Eigenvalues & Eigenvectors). $Av = \lambda v$. For a symmetric matrix the eigenvalues are real and the eigenvectors can be chosen orthonormal, so $A = Q\Lambda Q^\top$, where $Q$ holds the eigenvectors as columns and $\Lambda$ (capital lambda) is diagonal with the eigenvalues.

**6. Orthogonal matrix keeps lengths** (see topic: Matrices & Special Matrices). If $Q^\top Q = I$, then $\|Q^\top x\| = \|x\|$.

**7. The double sum $\sum_i\sum_j$.** $\sum_{i=1}^{2}\sum_{j=1}^{2} a_{ij}x_ix_j$ means add the term for every pair $(i, j)$: $(1,1), (1,2), (2,1), (2,2)$. So it is $a_{11}x_1^2 + a_{12}x_1x_2 + a_{21}x_2x_1 + a_{22}x_2^2$.

**8. Weighted average.** If weights $w_1, w_2$ are $\ge 0$ and add to 1, then $w_1\lambda_1 + w_2\lambda_2$ lies between the smaller and the larger $\lambda$. Example: $0.3 \times 2 + 0.7 \times 10 = 7.6$, between 2 and 10.

### Intuition
Think of a surface over the floor. At each point $(x, y)$ on the floor, the height is $q(x, y)$.

- $q = x^2 + y^2$ is a **bowl**. Every point except the centre is above the floor. This is **positive definite**.
- $q = x^2$ is a **valley** (like a half-pipe). It is never below the floor, but it touches the floor along the whole $y$-axis. This is **positive semidefinite**.
- $q = -x^2 - y^2$ is an **upside-down bowl** (a hill). **Negative definite**.
- $q = x^2 - y^2$ is a **saddle** (like a horse saddle or a Pringles chip). Up in one direction, down in another. **Indefinite**.

> **Intuition:** The eigenvectors of $A$ are the main directions of the bowl. The eigenvalues are how steep the bowl is along each direction. All eigenvalues positive means the surface curves up in every direction: a bowl.

**Why data science cares.** To check if a point is a minimum of a loss function, you check if the curvature (the Hessian matrix) is positive definite.

Covariance matrices and matrices like $X^\top X$ are always positive semidefinite, because they measure squared lengths, which are never negative.

**Maximum on a circle.** Walk around the unit circle ($x^\top x = 1$) and record the height $x^\top A x$. The highest point is along the steepest direction, so the maximum height is the biggest eigenvalue. The lowest is the smallest eigenvalue.

### Words you need
- **Quadratic form**: $x^\top A x = \sum_i \sum_j a_{ij}x_ix_j$. Example: $x^\top\begin{pmatrix}1&0\\0&3\end{pmatrix}x = x_1^2 + 3x_2^2$.
- **Positive definite (PD)**: $x^\top A x > 0$ for every $x \ne \mathbf 0$. Example: $x_1^2 + x_2^2$.
- **Positive semidefinite (PSD)**: $x^\top A x \ge 0$ for every $x$. Example: $(x_1 + x_2)^2$, which is 0 at $(1,-1)$.
- **Indefinite**: takes both positive and negative values. Example: $x_1^2 - x_2^2$.
- **Leading principal minors**: determinants of the top-left $1\times1$, $2\times2$, ... corners.
- **Gram matrix**: $A_{ij} = x_i^\top x_j$, i.e. $A = X^\top X$ where the $x_i$ are the columns of $X$.
- **Unit sphere**: all $x$ with $x^\top x = 1$ (length 1). In 2D it is the unit circle.
- **Hessian**: the matrix of second derivatives of a function; it measures curvature (see subject: Calculus & Optimization).

### Formulas, explained

**Writing a 2-variable form as a matrix**

$$ax_1^2 + 2bx_1x_2 + cx_2^2 = \begin{pmatrix}x_1 & x_2\end{pmatrix}\begin{pmatrix}a & b\\ b & c\end{pmatrix}\begin{pmatrix}x_1\\ x_2\end{pmatrix}$$

- **Read it as:** "Squares go on the diagonal. The cross term is split in half between the two off-diagonal spots."
- **Symbols:** $a, c$ are the coefficients of the squares; $2b$ is the coefficient of $x_1x_2$.
- **Why it makes sense:** multiplying out gives $ax_1^2 + bx_1x_2 + bx_2x_1 + cx_2^2$. The two $b$ terms add to $2b$.
- **Use it when:** you are given the expression and need the matrix.

**Eigenvalue test** ($A$ symmetric)

$$x^\top A x = \lambda_1 y_1^2 + \lambda_2 y_2^2 + \dots + \lambda_n y_n^2, \qquad y = Q^\top x$$

- **Read it as:** "In eigenvector coordinates, the form is just a weighted sum of squares, with the eigenvalues as weights."
- **Symbols:** $\lambda_i$ are the eigenvalues of $A$; $Q$ holds the orthonormal eigenvectors; $y$ is $x$ measured along the eigenvector directions.
- **Why it makes sense:** squares are never negative, so the signs of the $\lambda$'s decide everything.
- **Use it when:** deciding the type using the table below.

| Type | Meaning | Eigenvalues |
|---|---|---|
| Positive definite | $x^\top Ax > 0$ for all $x \ne 0$ | all $> 0$ |
| Positive semidefinite | $x^\top Ax \ge 0$ for all $x$ | all $\ge 0$ |
| Negative definite | $x^\top Ax < 0$ for all $x \ne 0$ | all $< 0$ |
| Indefinite | both signs appear | some $> 0$, some $< 0$ |

**Sylvester's criterion (for PD)**

$$A \text{ is PD} \iff \text{all leading principal minors} > 0$$

$$2\times2:\quad a > 0 \;\text{ and }\; ac - b^2 > 0$$

- **Read it as:** "A is positive definite exactly when every top-left corner determinant is positive."
- **Symbols:** for $\begin{pmatrix}a&b\\b&c\end{pmatrix}$ the corners are $a$ and the full determinant $ac - b^2$.
- **Why it makes sense:** see the derivation below; it is completing the square.
- **Use it when:** you want to avoid computing eigenvalues.

**Gram matrix is PSD**

$$z^\top (X^\top X) z = (Xz)^\top(Xz) = \|Xz\|^2 \ge 0$$

- **Read it as:** "z-transpose X-transpose X z is the squared length of Xz, so it is never negative."
- **Symbols:** $X$ has the vectors as columns; $z$ is any vector.
- **Why it makes sense:** a squared length cannot be negative. It is zero only if $Xz = \mathbf 0$. If the columns of $X$ are independent, that forces $z = \mathbf 0$, so then $X^\top X$ is PD.
- **Use it when:** you see $A_{ij} = x_i^\top x_j$ or $X^\top X$.

**Rayleigh quotient (max and min on the unit sphere)**

$$\max_{x^\top x = 1} x^\top A x = \lambda_{\max}, \qquad \min_{x^\top x = 1} x^\top A x = \lambda_{\min}$$

- **Read it as:** "Over all unit vectors, the biggest value of x-transpose A x is the largest eigenvalue, and the smallest value is the smallest eigenvalue."
- **Symbols:** $A$ is symmetric; $\lambda_{\max}, \lambda_{\min}$ are its largest and smallest eigenvalues.
- **Why it makes sense:** on the unit sphere, $x^\top Ax$ is a weighted average of the $\lambda$'s. Put all the weight on the biggest one.
- **Use it when:** "maximise $x^\top Ax$ subject to $\|x\| = 1$". This is exactly PCA's first direction.

### Where the formulas come from

**A. Where the matrix form comes from (and why the cross term is halved).**

1. Take $A = \begin{pmatrix}3&2\\2&5\end{pmatrix}$ and $x = (x_1, x_2)$.
2. First compute $Ax = (3x_1 + 2x_2,\ 2x_1 + 5x_2)$, by dotting each row with $x$.
3. Now dot with $x$: $x^\top Ax = x_1(3x_1 + 2x_2) + x_2(2x_1 + 5x_2) = 3x_1^2 + 2x_1x_2 + 2x_1x_2 + 5x_2^2$.
4. That is $3x_1^2 + 4x_1x_2 + 5x_2^2$. The cross term appears twice (once from each off-diagonal entry), so each off-diagonal entry holds half of it.
5. We choose a symmetric $A$ because any matrix gives the same form as its symmetric "average" $\frac12(A + A^\top)$, and symmetric matrices have the nice eigen facts.

**B. Where the eigenvalue test comes from.**

1. Start simple: $A = \operatorname{diag}(2, -1)$. Then $x^\top Ax = 2x_1^2 - x_2^2$. At $(1, 0)$ it is $2 > 0$; at $(0, 1)$ it is $-1 < 0$. Mixed signs on the diagonal give a saddle.
2. For a diagonal matrix the form is $\lambda_1x_1^2 + \dots + \lambda_nx_n^2$. Each $x_i^2 \ge 0$, so if every $\lambda_i > 0$ the sum is positive unless all $x_i = 0$.
3. A general symmetric $A$ is a diagonal matrix seen in tilted axes: $A = Q\Lambda Q^\top$ (the spectral theorem, see topic: Eigenvalues & Eigenvectors).
4. Then $x^\top Ax = x^\top Q\Lambda Q^\top x = (Q^\top x)^\top\Lambda(Q^\top x)$, using $(Q^\top x)^\top = x^\top Q$.
5. Call $y = Q^\top x$ (the same arrow, measured along the eigenvector directions). Then $x^\top Ax = y^\top \Lambda y = \lambda_1y_1^2 + \dots + \lambda_ny_n^2$, which is step 2 again.
6. Since $Q$ is orthogonal, $y = \mathbf 0$ only when $x = \mathbf 0$. So the signs of the eigenvalues give the table exactly.

**C. Where Sylvester's $2 \times 2$ test comes from (completing the square).**

1. Take $q = ax_1^2 + 2bx_1x_2 + cx_2^2$ with $a \ne 0$.
2. Pull out $a$ from the first two terms and complete the square: $q = a\left(x_1 + \frac{b}{a}x_2\right)^2 + \left(c - \frac{b^2}{a}\right)x_2^2$. Check by expanding: $a\left(x_1^2 + \frac{2b}{a}x_1x_2 + \frac{b^2}{a^2}x_2^2\right) = ax_1^2 + 2bx_1x_2 + \frac{b^2}{a}x_2^2$, and adding $\left(c - \frac{b^2}{a}\right)x_2^2$ gives back $q$.
3. The second bracket is $\frac{ac - b^2}{a}$.
4. Now $q$ is (weight) $\times$ square $+$ (weight) $\times$ square. It is positive for all nonzero $x$ exactly when both weights are positive: $a > 0$ and $\frac{ac - b^2}{a} > 0$, i.e. $ac - b^2 > 0$.
5. Numbers: $q = 2x_1^2 + 2x_1x_2 + 2x_2^2$ has $a = 2, b = 1, c = 2$, so $q = 2(x_1 + \frac12x_2)^2 + \frac32x_2^2$. Both weights positive, so PD.
6. For bigger matrices, the full proof is not needed for GATE. Elimination does the same completing of squares one variable at a time, and each new weight is a ratio of corner determinants.

**D. Where "Gram matrix is PSD" comes from.**

1. Take $X = \begin{pmatrix}1&1\\0&1\end{pmatrix}$ (columns $(1,0)$ and $(1,1)$). Then $X^\top X = \begin{pmatrix}1&1\\1&2\end{pmatrix}$. Entry $(i,j)$ is column $i$ dotted with column $j$.
2. For any $z$: $z^\top X^\top Xz = (Xz)^\top(Xz)$, because $(Xz)^\top = z^\top X^\top$.
3. A vector dotted with itself is its squared length, which is $\ge 0$. So $X^\top X$ is PSD.
4. It is 0 only when $Xz = \mathbf 0$, which means $z_1(\text{column }1) + z_2(\text{column }2) = \mathbf 0$. If the columns are independent, this forces $z = \mathbf 0$ (see topic: Vector Spaces, Subspaces & Independence). So then it is PD.

**E. Where the Rayleigh max and min come from.**

1. Example: $A = \operatorname{diag}(3, 1)$ and $x = (\cos t, \sin t)$ on the unit circle. Then $x^\top Ax = 3\cos^2 t + \sin^2 t$.
2. Since $\cos^2 t + \sin^2 t = 1$, this is a weighted average of 3 and 1. It is largest (3) at $t = 0$ and smallest (1) at $t = 90^\circ$.
3. General: by step B5, $x^\top Ax = \lambda_1y_1^2 + \dots + \lambda_ny_n^2$.
4. Since $Q^\top$ keeps lengths, $y_1^2 + \dots + y_n^2 = \|y\|^2 = \|x\|^2 = 1$. So the weights $y_i^2$ are $\ge 0$ and add to 1.
5. A weighted average is at most the largest value and at least the smallest. Putting all weight on the top eigenvalue (choose $x$ = its eigenvector) reaches $\lambda_{\max}$; all weight on the bottom one reaches $\lambda_{\min}$.

### Examples

**Example 1 (easy):** Write $q = 3x_1^2 + 4x_1x_2 + 5x_2^2$ as $x^\top Ax$.

1. Squares: $a = 3$, $c = 5$.
2. Cross term $4 = 2b$, so $b = 2$.
3. Check: $3x_1^2 + 2x_1x_2 + 2x_2x_1 + 5x_2^2 = 3x_1^2 + 4x_1x_2 + 5x_2^2$. Correct.

**Result:** $A = \begin{pmatrix}3&2\\2&5\end{pmatrix}$.

**Example 2 (medium):** $q = 2x_1^2 + 2x_1x_2 + 2x_2^2$. Is it PD? Find its max and min on the unit circle.

1. $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ (cross term 2, so $b = 1$).
2. Sylvester: $a = 2 > 0$, $ac - b^2 = 4 - 1 = 3 > 0$. So PD.
3. Eigenvalues: trace 4, determinant 3. $\lambda^2 - 4\lambda + 3 = 0$, so $(\lambda - 3)(\lambda - 1) = 0$, giving $\lambda = 3, 1$.
4. Max on the unit circle $= 3$, min $= 1$.
5. Check the max at $x = \frac{1}{\sqrt2}(1,1)$: $x_1^2 = x_2^2 = x_1x_2 = \frac12$. So $q = 1 + 1 + 1 = 3$. Correct.

**Result:** PD, max 3, min 1.

**Example 3 (GATE level):** Let $x \in \mathbb{R}^4$ be a unit vector and $A = I_4 - 3xx^\top$. Find $\max_{z^\top z = 1} z^\top A z$ and $\min_{z^\top z = 1} z^\top A z$. Is $A$ PD?

1. Eigenvalues of $xx^\top$: $\|x\|^2 = 1$ (once) and 0 (three times) (see topic: Matrices & Special Matrices).
2. $A = I - 3xx^\top$. Apply $p(t) = 1 - 3t$: $p(1) = -2$ and $p(0) = 1$. So eigenvalues are $-2$ (once) and $1$ (three times).
3. Max $= 1$, min $= -2$.
4. One negative and some positive eigenvalues, so $A$ is **indefinite**. Its determinant is $-2 \times 1 \times 1 \times 1 = -2 \ne 0$, so it is still invertible.

**Result:** max 1, min $-2$; not PD (indefinite).

### Common mistakes
> **Common mistake:** Putting the full cross-term coefficient off the diagonal. For $4x_1x_2$, the off-diagonal entries are $2$ and $2$, not $4$.

> **Common mistake:** Using Sylvester's test for PSD by checking "minors $\ge 0$" on leading minors only. That is not enough for PSD. Use eigenvalues instead.

> **Common mistake:** Thinking PSD means invertible. $\begin{pmatrix}1&0\\0&0\end{pmatrix}$ is PSD but has $\det = 0$. Only PD guarantees invertible.

> **Common mistake:** Forgetting the constraint. Without $x^\top x = 1$, the maximum of a PD form is infinite (stretch $x$).

### How GATE asks it
- **2025 Q.38** (2 marks, MCQ): $A_{ij} = x_i^\top x_j$ for independent $x_1, \dots, x_n$. Recognise the Gram matrix $X^\top X$. It is PD, so invertible, $\det > 0$, no zero singular value, and $z^\top Az > 0$ for all nonzero $z$.
- **2026 Q.65** (2 marks, NAT): maximise $x^\top Ax$ over unit vectors, $A$ the centering matrix $I - \frac1n\mathbf 1\mathbf 1^\top$. It is a projection with eigenvalues 0 and 1, so the answer is **1**.

> **GATE tip:** "Max of $x^\top Ax$ with $x^\top x = 1$" is always "largest eigenvalue". Spend your time finding eigenvalues smartly, not with calculus.

### Summary
- First we wrote any "power 2" expression as $x^\top Ax$, splitting each cross term in half because it appears twice.
- Then we turned the axes to the eigenvector directions. There the form becomes $\lambda_1y_1^2 + \dots + \lambda_ny_n^2$, a sum of squares with eigenvalue weights.
- Squares are never negative, so the signs of the eigenvalues decide bowl (PD), valley (PSD), hill or saddle. Completing the square gives the same answer through corner determinants (Sylvester).
- $X^\top X$ is a squared length in disguise, so it is always PSD, and PD when the columns are independent.
- On the unit sphere the weights $y_i^2$ add to 1, so the form is a weighted average of eigenvalues: max is $\lambda_{\max}$, min is $\lambda_{\min}$.
- Next topic builds on this: SVD uses $A^\top A$ (always PSD) to get singular values, and PCA's best direction is exactly the Rayleigh maximum.

### Quick self-check
1. Is $x_1^2 - 4x_1x_2 + x_2^2$ positive definite?
**Answer:** No. $A = \begin{pmatrix}1&-2\\-2&1\end{pmatrix}$, and $ac - b^2 = 1 - 4 = -3 < 0$. It is indefinite.

2. Eigenvalues of symmetric $A$ are $4, 1, 0$. What kind of form is it?
**Answer:** Positive semidefinite (all $\ge 0$, one is 0).

3. Max of $x^\top Ax$ on the unit sphere if $A = \operatorname{diag}(2, 7, 5)$?
**Answer:** 7.

4. Is $(x_1 - x_2)^2$ PD or only PSD?
**Answer:** Only PSD. It is never negative, but it is 0 at the nonzero point $(1, 1)$.

## LU Decomposition & SVD

### The big idea
A **decomposition** breaks a matrix into a product of simpler matrices, just as $12 = 3 \times 4$.

**LU** splits $A$ into a lower-triangular part and an upper-triangular part; it is Gaussian elimination saved for reuse. **SVD** shows that every matrix is just "rotate, then stretch along the axes, then rotate again".

### Before you start
**1. Gaussian elimination and back substitution** (see topic: Systems of Linear Equations & Gaussian Elimination). Subtract multiples of rows to make a staircase (upper triangular), then solve from the bottom up. Example: from $2x + y = 5$ and $6x + 5y = 19$, do $R_2 - 3R_1$ to get $2y = 4$, so $y = 2$, then $x = 1.5$.

**2. Triangular matrices.** Lower triangular has zeros above the diagonal; upper triangular has zeros below it. A triangular system is solved one unknown at a time. Its determinant is the product of the diagonal.

**3. Matrix multiplication order and transpose** (see topic: Matrices & Special Matrices). $AB$ means "first $B$, then $A$". $(AB)^\top = B^\top A^\top$.

**4. Orthogonal matrices** (see topic: Matrices & Special Matrices). $Q^\top Q = I$; they are rotations or mirrors and keep every length.

**5. Eigenvalues of a symmetric matrix** (see topic: Eigenvalues & Eigenvectors). A symmetric $S$ can be written $S = Q\Lambda Q^\top$ with orthonormal eigenvectors in $Q$ and eigenvalues on the diagonal of $\Lambda$.

**6. $A^\top A$ is PSD** (see topic: Quadratic Forms & Definiteness). $z^\top A^\top Az = \|Az\|^2 \ge 0$, so all eigenvalues of $A^\top A$ are $\ge 0$.

**7. Rank** (see topic: Rank, Nullity & Determinant). The number of independent directions in the output.

**8. Absolute value $\lvert t\rvert$.** The size of a number without its sign: $\lvert -4\rvert = 4$, $\lvert 3\rvert = 3$. Also $\sqrt{t^2} = \lvert t\rvert$.

### Intuition
**LU, the recipe card.** A school canteen makes the same dish every day for different numbers of students. Instead of working out the recipe from scratch each morning, the cook writes it on a card once.

LU is that card. The hard work (elimination, about $n^3$ steps) is done once. Then each new right side $b$ is solved cheaply (about $n^2$ steps) by two easy triangular solves.

- $U$ (upper triangular) is the staircase you get after elimination.
- $L$ (lower triangular) records the multipliers you used: "subtract 3 times row 1 from row 2" puts a 3 in $L$.

**SVD, the three-step dance.** Draw a circle on a rubber sheet and push it through any matrix machine. The circle always becomes an ellipse (possibly flattened). SVD says this happens in three steps:

1. **Rotate** the circle ($V^\top$). A circle looks the same after rotation, so nothing seems to happen, but the axes are now lined up.
2. **Stretch** along the axes by amounts $\sigma_1, \sigma_2, \dots$ ($\Sigma$). The circle becomes an ellipse.
3. **Rotate** the ellipse into its final position ($U$).

> **Intuition:** The **singular values** $\sigma_i$ are the half-lengths of the ellipse's axes. They tell you how much the machine stretches space in its main directions. They are never negative, because a length is never negative.

> **Intuition:** If a singular value is 0, the ellipse is flat in that direction: the machine squashes it. So the number of nonzero singular values is the **rank**.

**Why data science cares.** Keep only the biggest few singular values and throw away the small ones. You get the best low-rank copy of the matrix. This is how image compression, PCA and Netflix-style recommenders work.

### Words you need
- **Lower triangular $L$**: zeros above the diagonal. Example: $\begin{pmatrix}1&0\\3&1\end{pmatrix}$.
- **Upper triangular $U$**: zeros below the diagonal. Example: $\begin{pmatrix}2&1\\0&2\end{pmatrix}$.
- **Multiplier $\ell_{ij}$**: the number used to clear entry $(i,j)$. Example: $\ell_{21} = 6/2 = 3$.
- **Pivot**: the diagonal entry used to clear the entries below it.
- **Forward substitution**: solving a lower-triangular system from the top row down.
- **Singular value $\sigma$** (sigma): a stretch amount in SVD, always $\ge 0$.
- **$\Sigma$** (capital sigma): the diagonal matrix of singular values, largest first. (Not the sum sign here.)
- **Frobenius norm $\|A\|_F$**: square root of the sum of squares of all entries.

### Formulas, explained

**LU decomposition**

$$A = LU$$

- **Read it as:** "A equals a lower-triangular matrix times an upper-triangular matrix."
- **Symbols:** $L$ has 1s on its diagonal and the multipliers below; $U$ is the result of elimination.
- **Why it makes sense:** elimination turns $A$ into $U$ using row operations. Undoing those operations is $L$. So $A = LU$.
- **Note:** works without row swaps when every leading principal minor is nonzero. Otherwise use $PA = LU$ with a row-swap matrix $P$.
- **Use it when:** computing $L$ or $U$ entries, or solving many systems with the same $A$.

**Solving with LU**

$$Ax = b \;\Longrightarrow\; Ly = b \text{ (forward)}, \quad Ux = y \text{ (backward)}$$

- **Read it as:** "First solve L y equals b from the top down, then U x equals y from the bottom up."
- **Symbols:** $y$ is a helper vector, $y = Ux$.
- **Why it makes sense:** $Ax = L(Ux) = Ly = b$. Each triangular solve costs about $n^2$.
- **Use it when:** the same $A$ is used with many right sides $b$.

**Determinant from LU**

$$\det A = \det L \cdot \det U = u_{11}u_{22}\cdots u_{nn}$$

- **Read it as:** "The determinant is the product of the pivots."
- **Symbols:** $u_{ii}$ are the diagonal entries of $U$; $\det L = 1$ because its diagonal is all 1s.
- **Why it makes sense:** determinants of products multiply, and a triangular determinant is the product of its diagonal.
- **Use it when:** you already have $U$ and need $\det A$.

**Singular value decomposition**

$$A = U\Sigma V^\top$$

- **Read it as:** "A equals rotate, stretch, rotate."
- **Symbols:** $A$ is $m \times n$ (any shape); $U$ ($m \times m$) and $V$ ($n \times n$) are orthogonal (rotations or mirrors); $\Sigma$ is $m \times n$ with $\sigma_1 \ge \sigma_2 \ge \dots \ge 0$ on its diagonal.
- **Why it makes sense:** every matrix turns a circle into an ellipse; SVD names the turns and the stretches.
- **Use it when:** questions mention singular values, rank, or best approximation.

**Computing singular values**

$$\sigma_i = \sqrt{\lambda_i(A^\top A)}$$

- **Read it as:** "Each singular value is the square root of an eigenvalue of A-transpose A."
- **Symbols:** $\lambda_i(A^\top A)$ is the $i$-th eigenvalue of the matrix $A^\top A$.
- **Why it makes sense:** $A^\top A = V\Sigma^\top\Sigma V^\top$, so its eigenvalues are the $\sigma_i^2$. Also $A^\top A$ is PSD, so these eigenvalues are $\ge 0$ and the square root is real.
- **Use it when:** you need singular values of a non-symmetric matrix.

**Shortcuts for special matrices**

$$A \text{ symmetric PSD} \Rightarrow \sigma_i = \lambda_i$$

$$A \text{ symmetric} \Rightarrow \sigma_i = \lvert\lambda_i\rvert$$

$$A = uv^\top \Rightarrow \sigma_1 = \|u\|\,\|v\|, \text{ the rest are } 0$$

- **Read it as:** "For a symmetric PSD matrix, singular values equal eigenvalues. For any symmetric matrix, take the sizes of the eigenvalues. A rank-one matrix u v-transpose has one nonzero singular value, length of u times length of v."
- **Symbols:** $u, v$ are column vectors (possibly of different sizes).
- **Why it makes sense:** for symmetric $A$, $A^\top A = A^2$, whose eigenvalues are $\lambda_i^2$, and $\sqrt{\lambda_i^2} = \lvert\lambda_i\rvert$.
- **Use it when:** you see $uu^\top$, a projection, or a covariance matrix.

**Sum of squares**

$$\|A\|_F^2 = \sum_{i,j} a_{ij}^2 = \sigma_1^2 + \sigma_2^2 + \dots$$

- **Read it as:** "Add the squares of all entries; you get the sum of squared singular values."
- **Symbols:** $a_{ij}$ is the entry in row $i$, column $j$; the sum runs over all entries.
- **Why it makes sense:** rotations do not change lengths, so only the stretches $\sigma_i$ are left.
- **Use it when:** a quick check of your singular values.

### Where the formulas come from

**A. Where $A = LU$ comes from.**

1. Take $A = \begin{pmatrix}2&1\\6&5\end{pmatrix}$. Elimination does $R_2 \to R_2 - 3R_1$ and gives $U = \begin{pmatrix}2&1\\0&2\end{pmatrix}$.
2. That row operation is itself a matrix: $E = \begin{pmatrix}1&0\\-3&1\end{pmatrix}$. Check: $EA$ keeps row 1 and replaces row 2 by $-3 \times$ row 1 + row 2. So $EA = U$.
3. Undo it: the inverse of "subtract 3 times row 1" is "add 3 times row 1", which is $L = E^{-1} = \begin{pmatrix}1&0\\3&1\end{pmatrix}$.
4. Multiply both sides of $EA = U$ by $L$ on the left: $LEA = LU$, and $LE = I$, so $A = LU$.
5. For bigger matrices, each step clears one entry and its undo puts the multiplier $\ell_{ij}$ in the same place in $L$. All the undo matrices together still form one lower-triangular $L$ with 1s on the diagonal.
6. Why row swaps are sometimes needed: if a pivot is 0 (e.g. $A = \begin{pmatrix}0&1\\1&0\end{pmatrix}$), you cannot divide by it. Then you swap rows first, which is the $P$ in $PA = LU$.

**B. Why solving with LU is cheap.**

1. Replace $Ux$ by a helper $y$. Then $Ax = L(Ux) = Ly$, so $Ax = b$ becomes $Ly = b$.
2. $L$ is lower triangular, so $y_1$ comes from row 1 alone, then $y_2$ from row 2, and so on. This costs about $\frac{n^2}{2}$ steps (see topic: Systems of Linear Equations & Gaussian Elimination).
3. Then solve $Ux = y$ from the bottom up, again about $\frac{n^2}{2}$ steps.
4. So each new $b$ costs $O(n^2)$, while the one-time elimination cost $O(n^3)$ is already paid.

**C. Where $A = U\Sigma V^\top$ and $\sigma_i = \sqrt{\lambda_i(A^\top A)}$ come from.**

1. Start with $B = \begin{pmatrix}3&0\\4&0\end{pmatrix}$. It sends $(1, 0)$ to $(3, 4)$, an arrow of length 5, and sends $(0, 1)$ to $\mathbf 0$. So the stretches are 5 and 0.
2. To find stretches in general, measure squared lengths: $\|Ax\|^2 = (Ax)^\top(Ax) = x^\top(A^\top A)x$.
3. $A^\top A$ is symmetric and PSD, so it has orthonormal eigenvectors $v_1, \dots, v_n$ with eigenvalues $\lambda_i \ge 0$ (see topic: Quadratic Forms & Definiteness).
4. Along $v_i$: $\|Av_i\|^2 = v_i^\top(\lambda_iv_i) = \lambda_i$, because $v_i^\top v_i = 1$. So $A$ stretches the unit arrow $v_i$ to length $\sigma_i = \sqrt{\lambda_i}$.
5. The outputs $Av_i$ are also at right angles: $(Av_i)^\top(Av_j) = v_i^\top A^\top Av_j = \lambda_j\,v_i^\top v_j = 0$ for $i \ne j$.
6. So set $u_i = \frac{Av_i}{\sigma_i}$ (unit arrows at right angles) whenever $\sigma_i > 0$. Then $Av_i = \sigma_iu_i$ for every $i$: $A$ takes the right-angled set $v_i$ to the right-angled set $u_i$, stretching by $\sigma_i$.
7. Stack these as columns: $AV = U\Sigma$. Multiply on the right by $V^\top$ (and use $VV^\top = I$): $A = U\Sigma V^\top$. If some $\sigma_i = 0$, extra $u$'s can always be added to complete $U$; the full existence proof is not needed for GATE.
8. Check the formula: $A^\top A = V\Sigma^\top U^\top U\Sigma V^\top = V(\Sigma^\top\Sigma)V^\top$. This is the eigen form, with eigenvalues $\sigma_i^2$.

**D. Where the rank fact comes from.**

1. $U$ and $V^\top$ are rotations; they lose no directions.
2. So the only place a direction can be crushed is $\Sigma$, and it crushes exactly the directions with $\sigma_i = 0$.
3. Hence the rank equals the number of nonzero singular values.

**E. Where the shortcuts come from.**

1. Symmetric $A$: $A^\top A = AA = A^2$. If $Av = \lambda v$ then $A^2v = \lambda^2v$ (see topic: Eigenvalues & Eigenvectors). So the eigenvalues of $A^\top A$ are $\lambda_i^2$ and $\sigma_i = \sqrt{\lambda_i^2} = \lvert\lambda_i\rvert$.
2. Example: $\operatorname{diag}(3, -4)$ has eigenvalues $3, -4$ and singular values $3, 4$. The $-4$ is a stretch by 4 plus a flip, and the flip is put into $U$.
3. If also PSD, every $\lambda_i \ge 0$, so $\lvert\lambda_i\rvert = \lambda_i$.
4. Rank one $A = uv^\top$: $A^\top A = vu^\top uv^\top = \|u\|^2\,vv^\top$, because $u^\top u = \|u\|^2$ is a number.
5. The matrix $vv^\top$ has eigenvalues $\|v\|^2$ and 0s (see topic: Matrices & Special Matrices). So $A^\top A$ has eigenvalues $\|u\|^2\|v\|^2$ and 0s, and $\sigma_1 = \|u\|\,\|v\|$.

**F. Where the Frobenius identity comes from.**

1. $\|A\|_F^2$ is the sum of squared lengths of the columns of $A$. Column $j$ is $Ae_j$, where $e_j$ is the $j$-th unit arrow.
2. Swapping the unit arrows $e_j$ for the orthonormal $v_j$ does not change this total. The full proof is not needed for GATE; it is the same reason a rotation does not change total length.
3. Using the $v_j$: $\sum_j\|Av_j\|^2 = \sum_j\sigma_j^2$, by step C4.
4. Check with $B = \begin{pmatrix}3&0\\4&0\end{pmatrix}$: entries squared add to $9 + 16 = 25 = 5^2 + 0^2$.

### Examples

**Example 1 (easy):** Find the LU decomposition of $A = \begin{pmatrix}2&1\\6&5\end{pmatrix}$.

1. Pivot is 2. Multiplier $\ell_{21} = 6 / 2 = 3$.
2. $R_2 - 3R_1 = (6 - 3\cdot2,\ 5 - 3\cdot1) = (0, 2)$. So $U = \begin{pmatrix}2&1\\0&2\end{pmatrix}$.
3. $L = \begin{pmatrix}1&0\\3&1\end{pmatrix}$.
4. Check: $LU = \begin{pmatrix}1\cdot2 + 0 & 1\cdot1 + 0\\ 3\cdot2 + 1\cdot0 & 3\cdot1 + 1\cdot2\end{pmatrix} = \begin{pmatrix}2&1\\6&5\end{pmatrix}$. Correct.
5. Also $\det A = 2 \times 2 = 4$, and directly $2\cdot5 - 1\cdot6 = 4$.

**Result:** $L = \begin{pmatrix}1&0\\3&1\end{pmatrix}$, $U = \begin{pmatrix}2&1\\0&2\end{pmatrix}$.

**Example 2 (medium):** Find the singular values of $B = \begin{pmatrix}3&0\\4&0\end{pmatrix}$.

1. $B^\top = \begin{pmatrix}3&4\\0&0\end{pmatrix}$. $B^\top B = \begin{pmatrix}3\cdot3 + 4\cdot4 & 0\\ 0 & 0\end{pmatrix} = \begin{pmatrix}25&0\\0&0\end{pmatrix}$.
2. Eigenvalues are 25 and 0. Square roots: $\sigma_1 = 5$, $\sigma_2 = 0$.
3. One nonzero singular value, so rank 1.
4. Check with Frobenius: $9 + 16 + 0 + 0 = 25 = 5^2 + 0^2$. Correct.

**Result:** $\sigma_1 = 5$, $\sigma_2 = 0$.

**Example 3 (GATE level):** Let $u = (2, 1, 2)$ and $v = (1, 1, 1, 1)$. Find the sum of the singular values of $M = uv^\top$ (a $3 \times 4$ matrix).

1. $M$ is rank one, so only one singular value is nonzero.
2. $\|u\| = \sqrt{4 + 1 + 4} = \sqrt9 = 3$. $\|v\| = \sqrt{1 + 1 + 1 + 1} = \sqrt4 = 2$.
3. $\sigma_1 = 3 \times 2 = 6$. The others are 0.
4. Check: every entry of $M$ is $u_iv_j = u_i$, so the sum of squares of all entries is $4\times(4 + 1 + 4) = 36 = 6^2$. Correct.

**Result:** $6$.

### Common mistakes
> **Common mistake:** Reporting a negative eigenvalue as a singular value. Singular values are never negative. For $\operatorname{diag}(3, -4)$, they are $4$ and $3$.

> **Common mistake:** Thinking singular values always equal eigenvalues. That is only true for symmetric PSD matrices.

> **Common mistake:** Putting the multiplier with the wrong sign in $L$. If you did $R_2 - 3R_1$, then $\ell_{21} = +3$.

> **Common mistake:** Forgetting that the number of nonzero singular values is the rank, not the size of the matrix.

### How GATE asks it
- **2024 Q.61** (2 marks, NAT): sum of singular values of $uu^\top$ with $u = (1,2,3,4,5)$. It is symmetric PSD and rank 1, so the only nonzero singular value is $\|u\|^2 = 1 + 4 + 9 + 16 + 25 = 55$. Answer **55**.
- **2025 Q.50** also asked about singular values of a projection (they equal its eigenvalues, 0 or 1). It is filed under special matrices.
- An explicit LU computation has not been asked yet. A likely question: find $\ell_{21}$ or $u_{33}$ of a $3 \times 3$, or the cost of solving with known $L$ and $U$ ($O(n^2)$).

> **GATE tip:** For singular values of a matrix built from vectors, first ask "is it symmetric PSD?" (like $uu^\top$, $QQ^\top$, $X^\top X$). If yes, singular values = eigenvalues, and you can use the eigen shortcuts.

### Summary
- First we saw that each elimination step is a simple matrix, and undoing all of them gives $L$. So elimination itself is $A = LU$.
- With $L$ and $U$ saved, every new right side needs only two triangular solves, $O(n^2)$ each.
- For SVD we measured how much $A$ stretches each direction: $\|Ax\|^2 = x^\top A^\top Ax$. The eigenvectors of $A^\top A$ are the special input directions, and the stretches are $\sigma_i = \sqrt{\lambda_i}$.
- Those input directions stay at right angles after $A$ acts, which gives "rotate, stretch, rotate": $A = U\Sigma V^\top$.
- Rotations lose nothing, so rank = number of nonzero $\sigma$. For symmetric matrices $\sigma = \lvert\lambda\rvert$, and for $uv^\top$ the single $\sigma$ is $\|u\|\,\|v\|$.
- Next topic builds on this: Projections, where $QQ^\top$ from SVD gives the shadow onto a subspace; in ML, SVD powers PCA and low-rank recommenders.

### Quick self-check
1. A $5 \times 3$ matrix has singular values $4, 2, 0$. What is its rank?
**Answer:** 2 (two nonzero singular values).

2. Singular values of $\begin{pmatrix}-6&0\\0&2\end{pmatrix}$?
**Answer:** 6 and 2.

3. In $A = LU$, what is on the diagonal of $L$?
**Answer:** All 1s.

4. $A = LU$ with $U$ having diagonal $2, 3, 5$. What is $\det A$?
**Answer:** $2 \times 3 \times 5 = 30$.

## Projections

### The big idea
**Projecting** an arrow onto a line or a plane means finding its **shadow** there: the closest point on that line or plane.

The leftover piece (the **error**) is always at right angles to the line or plane.

### Before you start
**1. Dot product and right angles** (see topic: Vector Spaces, Subspaces & Independence). $a^\top b = a_1b_1 + a_2b_2 + \dots$ is one number. It is 0 exactly when $a$ and $b$ are at right angles. Also $a^\top a = \|a\|^2$.

**2. Pythagoras for arrows.** If $u$ and $w$ are at right angles, then $\|u + w\|^2 = \|u\|^2 + \|w\|^2$. Example: $u = (3, 0)$, $w = (0, 4)$: $\|(3,4)\|^2 = 25 = 9 + 16$.

**3. Column space** (see topic: Systems of Linear Equations & Gaussian Elimination). All combinations $X\beta$ of the columns of $X$. Each entry of $\beta$ is a weight on one column.

**4. Transpose and inverse rules** (see topic: Matrices & Special Matrices). $(AB)^\top = B^\top A^\top$ and $Q^\top Q = I$ for orthonormal columns.

**5. Idempotent matrix** (see topic: Matrices & Special Matrices). $P^2 = P$ forces every eigenvalue to be 0 or 1, and then rank = trace.

**6. $X^\top X$ is invertible when columns are independent** (see topic: Quadratic Forms & Definiteness). $X^\top X$ is then positive definite, so it has no zero eigenvalue and an inverse exists.

**7. Mean (average).** The mean of $2, 3, 4$ is $\frac{2 + 3 + 4}{3} = 3$.

### Intuition
It is noon and the sun is straight overhead. You hold a stick at a slant. Its shadow on the floor is the **projection** of the stick onto the floor.

- The shadow lies on the floor.
- The line from the stick's tip to the tip of its shadow points straight up. It is at right angles to the floor. This is the **error**.
- If the stick is already lying on the floor, its shadow is the stick itself. Nothing changes.
- If the stick points straight up, its shadow is just a dot (zero). It is crushed.
- The shadow of a shadow is the same shadow. So projecting twice equals projecting once: $P^2 = P$.

> **Intuition:** The shadow is the **closest** point on the floor to the stick's tip. Any other point on the floor is further away, because you would need to walk sideways as well as down.

**Why data science cares.** In linear regression, you want predictions $\hat y$ that are as close as possible to the real values $y$, but they must come from your features (the columns of $X$).

So $\hat y$ is the shadow of $y$ on the "floor" made by the columns of $X$. The residuals $y - \hat y$ are the error, at right angles to every feature column.

**Projection onto the all-ones direction.** Project marks $(60, 70, 80)$ onto the direction $(1,1,1)$. You get $(70, 70, 70)$: every entry replaced by the mean.

The error is $(-10, 0, 10)$: the centered marks. This is why the centering matrix $I - \frac1n\mathbf 1\mathbf 1^\top$ is a projection.

### Words you need
- **Projection $\operatorname{proj}_a b$**: the shadow of $b$ on the line through $a$. Example: shadow of $(3,4)$ on the $x$-axis is $(3,0)$.
- **Projection matrix $P$**: the machine that makes shadows; $Pb$ is the shadow of $b$.
- **Error (residual) $e$**: $b - Pb$, the part of $b$ not in the floor. Example: $(3,4) - (3,0) = (0,4)$.
- **Orthogonal complement $U^\perp$**: all arrows at right angles to every arrow in $U$. Example: if $U$ is the floor, $U^\perp$ is the vertical line.
- **Column space of $X$**: all combinations of the columns of $X$.
- **Least squares**: choosing $\hat\beta$ to make $\|y - X\beta\|^2$ (the sum of squared errors) as small as possible.
- **Normal equations**: $X^\top X\hat\beta = X^\top y$, the equations that give regression coefficients.

### Formulas, explained

**Projection onto a line**

$$\operatorname{proj}_a b = \frac{a^\top b}{a^\top a}\, a, \qquad P = \frac{aa^\top}{a^\top a}$$

- **Read it as:** "The shadow of b on a is: (a dot b) divided by (a dot a), times a."
- **Symbols:** $a$ is the direction of the line; $b$ is the arrow being projected; $a^\top b$ is the dot product (a number); $a^\top a = \|a\|^2$.
- **Why it makes sense:** the shadow must be some multiple $c\,a$, and the error must be at right angles to $a$.
- **Use it when:** projecting onto a single direction.

**Projection onto a subspace (column space of $X$)**

$$\hat\beta = (X^\top X)^{-1}X^\top y$$

$$P = X(X^\top X)^{-1}X^\top, \qquad \hat y = X\hat\beta = Py$$

- **Read it as:** "The regression coefficients are (X-transpose X) inverse times X-transpose y. The projection matrix is X times (X-transpose X) inverse times X-transpose."
- **Symbols:** $X$ is $n \times k$ with independent columns; $y$ is the data vector; $\hat\beta$ (beta-hat) are the best weights; $\hat y$ (y-hat) are the predictions.
- **Why it makes sense:** the error $y - X\hat\beta$ must be at right angles to every column of $X$.
- **Use it when:** least squares and linear regression.

**Orthonormal columns**

$$P = QQ^\top$$

- **Read it as:** "If the floor's directions are orthonormal, the projection is just Q times Q-transpose."
- **Symbols:** $Q$ is $n \times k$ with $Q^\top Q = I$.
- **Why it makes sense:** $Q^\top Q = I$, so the inverse in the general formula disappears.
- **Use it when:** the floor is given by orthonormal vectors, or you see a sum of $x_ix_i^\top$.

**Properties of any orthogonal projection onto $U$ (inside $\mathbb{R}^n$)**

$$P^2 = P, \quad P^\top = P, \quad \lambda \in \{0, 1\}$$

$$\operatorname{rank}P = \operatorname{tr}P = \dim U, \qquad \operatorname{nullity}P = n - \dim U$$

- **Read it as:** "Projecting twice is once; P is symmetric; eigenvalues are 0 or 1; rank and trace equal the floor's dimension; the crushed part has the remaining dimension."
- **Symbols:** $U$ is the floor (a subspace); $\dim U$ is its dimension; $n$ is the size of the whole space.
- **Why it makes sense:** arrows on the floor are kept (eigenvalue 1, $\dim U$ of them). Arrows straight up are crushed (eigenvalue 0, $n - \dim U$ of them). Also $I - P$ projects onto $U^\perp$.
- **Use it when:** MSQs about rank, null space, powers, or invertibility of a projection.

### Where the formulas come from

**A. Where the line formula comes from.**

1. Project $b = (2, 3, 4)$ onto $a = (1, 1, 1)$. The shadow lies on the line, so it is $c\,a = (c, c, c)$ for some number $c$.
2. The error is $b - ca = (2 - c, 3 - c, 4 - c)$. For the closest point, it must be at right angles to $a$ (the stick-and-sun picture).
3. Set the dot product to zero: $(2 - c) + (3 - c) + (4 - c) = 0$, so $9 - 3c = 0$ and $c = 3$. The shadow is $(3, 3, 3)$, the mean in every entry.
4. Now in symbols: $a^\top(b - ca) = 0$. Expand: $a^\top b - c\,a^\top a = 0$, because a number $c$ can be pulled out of a dot product.
5. Solve: $c = \frac{a^\top b}{a^\top a}$. Dividing is allowed because $a^\top a = \|a\|^2 > 0$ for a nonzero $a$.
6. The matrix form: $\frac{a^\top b}{a^\top a}\,a = \frac{a\,(a^\top b)}{a^\top a} = \frac{aa^\top}{a^\top a}\,b$, by moving the number to the other side and regrouping. So $P = \frac{aa^\top}{a^\top a}$. This is the outer product $xx^\top$ from topic: Matrices & Special Matrices, with $x = \frac{a}{\|a\|}$.

**B. Why the shadow is the closest point.**

1. Let $p$ be the shadow and $e = b - p$ the error, at right angles to the floor. Let $z$ be any other point on the floor.
2. Write $b - z = (b - p) + (p - z) = e + (p - z)$.
3. $p - z$ lies on the floor (both points are on it, and the floor is a subspace), so it is at right angles to $e$.
4. By Pythagoras, $\|b - z\|^2 = \|e\|^2 + \|p - z\|^2$.
5. The second term is $\ge 0$ and is 0 only when $z = p$. So $p$ is the unique closest point.

**C. Where the normal equations and $P = X(X^\top X)^{-1}X^\top$ come from.**

1. The floor is now the column space of $X$. Any floor point is $X\beta$ for some weights $\beta$.
2. By step B, the best point $X\hat\beta$ has error $y - X\hat\beta$ at right angles to the whole floor. It is enough to be at right angles to each column of $X$, because every floor arrow is a combination of the columns.
3. "At right angles to every column" in one line is $X^\top(y - X\hat\beta) = \mathbf 0$, because each entry of $X^\top v$ is one column dotted with $v$.
4. Expand: $X^\top y - X^\top X\hat\beta = \mathbf 0$, so $X^\top X\hat\beta = X^\top y$. These are the normal equations.
5. Independent columns make $X^\top X$ invertible, so $\hat\beta = (X^\top X)^{-1}X^\top y$.
6. The shadow is $\hat y = X\hat\beta = X(X^\top X)^{-1}X^\top y$, so $P = X(X^\top X)^{-1}X^\top$.
7. Check that the line formula A is the special case $k = 1$: if $X = a$ (one column), then $X^\top X = a^\top a$, a number, and $P = \frac{aa^\top}{a^\top a}$.

**D. Where $P = QQ^\top$ comes from.**

1. Put $X = Q$ with orthonormal columns into step C6.
2. $Q^\top Q = I$, and the inverse of $I$ is $I$.
3. So $P = QIQ^\top = QQ^\top$. It is formula C with the hard part gone.

**E. Where the properties come from.**

1. $P^2 = P$: $P^2 = X(X^\top X)^{-1}(X^\top X)(X^\top X)^{-1}X^\top$. The middle part $(X^\top X)(X^\top X)^{-1} = I$, so $P^2 = X(X^\top X)^{-1}X^\top = P$.
2. $P^\top = P$: using $(ABC)^\top = C^\top B^\top A^\top$, and $X^\top X$ (and so its inverse) is symmetric, the transpose gives back the same product.
3. Eigenvalues 0 or 1: $P^2 = P$ forces this (see topic: Matrices & Special Matrices). Picture: floor arrows are kept ($\lambda = 1$), vertical arrows are crushed ($\lambda = 0$).
4. Every arrow splits as (floor part) + (vertical part). So there are $\dim U$ independent eigenvalue-1 directions and $n - \dim U$ eigenvalue-0 directions.
5. Rank = directions kept = $\dim U$. Trace = sum of eigenvalues = number of 1s = $\dim U$. Nullity = $n - \dim U$, which agrees with rank-nullity.
6. $I - P$: $(I - P)b = b - Pb = e$, the error, which lives in $U^\perp$. So $I - P$ is the projection onto $U^\perp$, with rank $n - \dim U$.

### Examples

**Example 1 (easy):** Project $b = (3, 4)$ onto the $x$-axis, direction $a = (1, 0)$.

1. $a^\top b = 1 \cdot 3 + 0 \cdot 4 = 3$. $a^\top a = 1$.
2. Shadow $= \frac31(1,0) = (3, 0)$.
3. Error $= (3,4) - (3,0) = (0,4)$.
4. Check: $a^\top e = 1 \cdot 0 + 0 \cdot 4 = 0$. At right angles.

**Result:** shadow $(3, 0)$, error $(0, 4)$.

**Example 2 (medium):** Project $b = (2, 3, 4)$ onto the line through $a = (1, 1, 1)$.

1. $a^\top b = 2 + 3 + 4 = 9$. $a^\top a = 1 + 1 + 1 = 3$.
2. $c = \frac93 = 3$. Shadow $= 3(1,1,1) = (3,3,3)$. (This is the mean, 3, in every entry.)
3. Error $e = (2-3,\ 3-3,\ 4-3) = (-1, 0, 1)$.
4. Check: $a^\top e = -1 + 0 + 1 = 0$. Correct.

**Result:** shadow $(3, 3, 3)$, error $(-1, 0, 1)$.

**Example 3 (GATE level):** $P$ is the $4 \times 4$ matrix of orthogonal projection onto a 3-dimensional subspace $U$ of $\mathbb{R}^4$. Which are true? (A) $\det P = 0$ (B) $\operatorname{tr}P = 3$ (C) $P^5 = P$ (D) $I - P$ has rank 3.

1. Eigenvalues: 1 three times (the floor), 0 once (the perpendicular direction).
2. (A) $\det P = 1 \cdot 1 \cdot 1 \cdot 0 = 0$. **True.**
3. (B) $\operatorname{tr}P = 1 + 1 + 1 + 0 = 3$. **True.**
4. (C) $P^2 = P$, so $P^3 = P^2 P = PP = P$, and so on. $P^5 = P$. **True.**
5. (D) $I - P$ projects onto $U^\perp$, which has dimension $4 - 3 = 1$. Its rank is 1, not 3. **False.**

**Result:** A, B, C.

### Common mistakes
> **Common mistake:** Assuming a projection is invertible. Unless $P = I$, it crushes some direction, so it has eigenvalue 0 and $\det P = 0$.

> **Common mistake:** Mixing up rank and nullity. Rank = dimension of the floor $U$. Nullity = $n - \dim U$. For a line in $\mathbb{R}^3$: rank 1, nullity 2.

> **Common mistake:** Forgetting to divide by $a^\top a$ when $a$ is not a unit vector.

> **Common mistake:** Saying $P^2 = I$. It is $P^2 = P$. Only $P = I$ satisfies both.

### How GATE asks it
- **2024 Q.49** (2 marks, MSQ): $M$ projects $\mathbb{R}^3$ onto a subspace $U$. True: if $\dim U = 2$, the null space has dimension 1; $M^2 = M$; $M^3 = M$. False: if $\dim U = 1$, the null space has dimension 1 (it is actually 2).
- Projection ideas also power **2025 Q.50** ($QQ^\top$), **2026 Q.52** and **2026 Q.65** (centering matrix as a projection).

> **GATE tip:** For any projection question, first write the eigenvalues: 1 repeated $\dim U$ times, 0 repeated $n - \dim U$ times. Rank, trace, nullity, determinant and powers all follow in one line.

### Summary
- First we said the shadow of $b$ on a line is some multiple $c\,a$, and the error must be at right angles to $a$. Setting the dot product to 0 gives $c = \frac{a^\top b}{a^\top a}$.
- Pythagoras shows this right-angle shadow is the closest point on the floor, which is why it is the "best fit".
- For a floor made by many columns, "error at right angles to every column" is $X^\top(y - X\hat\beta) = \mathbf 0$. That gives the normal equations and $P = X(X^\top X)^{-1}X^\top$; with orthonormal columns it shrinks to $QQ^\top$.
- Floor arrows are kept and vertical arrows are crushed, so $P^2 = P$, eigenvalues are 0 or 1, and rank = trace = $\dim U$.
- That is why a projection is never invertible (unless $P = I$), and why $I - P$ gives the error.
- Where this is used later: linear regression in Machine Learning is exactly this projection, and the residuals are the error $y - \hat y$.

### Quick self-check
1. $P$ projects $\mathbb{R}^5$ onto a 2-dimensional subspace. What is the nullity of $P$?
**Answer:** $5 - 2 = 3$.

2. Project $(5, 5)$ onto the direction $(1, 0)$.
**Answer:** $(5, 0)$.

3. If $P$ is a projection, what is $P^{100}$?
**Answer:** $P$.

4. Project $(1, 3)$ onto the direction $a = (1, 1)$.
**Answer:** $\frac{1 + 3}{2}(1,1) = (2, 2)$.
