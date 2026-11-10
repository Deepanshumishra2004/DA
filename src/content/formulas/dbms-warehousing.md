# DBMS & Warehousing: formula sheet

## ER Model

**Strong entity**
$$E(K, A, B) \Rightarrow E(\underline{K}, A, B)$$
One table, key K. Flatten composite attributes, drop derived ones · *Use when:* any entity box · *e.g.* Student(sid, name, age) gives 1 table.

**Multivalued attribute**
$$E(K, \{M\}) \Rightarrow E\_M(\underline{K, M})$$
New table of (key, value) pairs · *Use when:* double oval / "multi-valued" · *e.g.* {phone} gives Student_Phone(sid, phone).

**M:N relationship**
$$E_1 \overset{M:N}{\longleftrightarrow} E_2 \Rightarrow R(\underline{K_1, K_2}, \text{attrs})$$
Always its own table, even with total participation · *Use when:* many-to-many · *e.g.* Enroll(sid, cid, marks).

**1:N relationship**
$$E_1 \overset{1:N}{\longleftrightarrow} E_2 \Rightarrow K_1 \text{ as foreign key in } E_2$$
No new table; key of the "one" side goes into the "many" side · *Use when:* 1:N or N:1 · *e.g.* `dept` column inside Student.

**1:1 relationship**
$$E_1 \overset{1:1}{\longleftrightarrow} E_2 \Rightarrow \text{FK on one side; merge if both total}$$
No new table · *Use when:* 1:1 · *e.g.* Employee-Locker, both total, gives 1 table.

**Weak entity**
$$W(p, A) \text{ owned by } E(K) \Rightarrow W(\underline{K, p}, A)$$
Owner key + partial key is the primary key · *Use when:* double rectangle · *e.g.* Dependent(eid, dname, age).

**Minimum table count (GATE pattern)**
$$\text{tables} = \#\text{entities} + \#\text{multivalued attrs} + \#\text{M:N rels} - \#\text{1:1 merges}$$
Count as you walk the diagram · *Use when:* "minimum number of relations" · *e.g.* 2 entities + 1 multivalued + 1 M:N = 4 (2026 Q.61).

## Relational Algebra

**Selection**
$$\sigma_{\text{cond}}(R)$$
Keep rows where the condition is true · *Use when:* "where / whose" · *e.g.* $\sigma_{dept='CS'}(\text{Student})$ gives 2 rows.

**Projection**
$$\pi_{A, B}(R)$$
Keep columns, remove duplicate rows (sets) · *Use when:* "list the names" · *e.g.* $\pi_{dept}(\text{Student})$ gives 3 rows, not 4.

**Set operations**
$$R \cup S, \quad R - S, \quad R \cap S = R - (R - S)$$
Or / but not / both; tables must be union-compatible · *Use when:* "either", "but not", "both" · *e.g.* $\{S1,S2,S3\} - \{S1,S3\} = \{S2\}$.

**Cartesian product**
$$\text{rows}(R \times S) = \text{rows}(R) \cdot \text{rows}(S)$$
Every row with every row · *Use when:* counting rows · *e.g.* Student × Course = $4 \times 3 = 12$.

**Natural join**
$$R \bowtie S$$
Match on **all** same-named columns; each common column shown once · *Use when:* data split across tables · *e.g.* Student ⋈ Enroll gives 7 rows.

**Theta join**
$$R \bowtie_{\theta} S = \sigma_{\theta}(R \times S)$$
Cross product, then filter · *Use when:* join on a named condition · *e.g.* $R.a = S.b$.

**Division**
$$R(X, Y) \div S(Y) = \pi_X(R) - \pi_X\big((\pi_X(R) \times S) - R\big)$$
X values paired with **every** Y in S · *Use when:* "every / all" · *e.g.* Enroll ÷ Course gives {S1}.

**Subset check**
$$A \subseteq B \iff A - B = \emptyset$$
Nothing of A is missing from B · *Use when:* "every X is a Y" · *e.g.* $\pi(\text{Team}) - (\pi(\text{Def}) \cup \pi(\text{Fwd})) = \emptyset$.

**Join size bounds**
$$0 \le \text{rows}(R \bowtie S) \le \text{rows}(R) \cdot \text{rows}(S)$$
No common columns means the join is a cross product · *Use when:* sanity-checking a count · *e.g.* 3 and 4 rows give at most 12.

## Tuple Relational Calculus

**Query form**
$$\{\, t \mid P(t) \,\}$$
All rows t that make P true; test candidates one by one · *Use when:* any TRC question · *e.g.* $\{t \mid t \in \text{Student} \land t[age] > 20\}$ gives 2 rows.

**Exists**
$$\exists\, s \in R\,(s[A] = t[A] \land \dots)$$
Keep t if some matching row exists; adds no columns, no duplicates · *Use when:* "some / has a" · *e.g.* students who took C3: S1, S3.

**For all**
$$\forall s\,P(s) \equiv \neg \exists s\,\neg P(s)$$
"Everyone passes" = "nobody fails"; matches RA division · *Use when:* "every / all" · *e.g.* courses where all marks $\ge 70$: only C3.

**Implication**
$$P \Rightarrow Q \equiv \neg P \lor Q$$
Rows where P is false pass automatically · *Use when:* $\forall e\,(e[cid] = t[cid] \Rightarrow \dots)$ · *e.g.* other courses' rows do not matter.

**Trivially true clause**
$$t \in X \Rightarrow \exists z \in X\,(z[P] = t[P]) \text{ is true}$$
Choose $z = t$ · *Use when:* a clause looks scary · *e.g.* 2026 Q.59.

**Safety**
$$\{\, t \mid \neg(t \in R) \,\} \text{ is unsafe}$$
Safe queries return finite answers; safe TRC = RA in power · *Use when:* "which is safe?" · *e.g.* "not a student" is infinite.

## SQL

**Clause order**
$$\texttt{FROM} \to \texttt{WHERE} \to \texttt{GROUP BY} \to \texttt{HAVING} \to \texttt{SELECT} \to \texttt{DISTINCT} \to \texttt{ORDER BY}$$
Rows filtered before grouping; groups filtered after · *Use when:* tracing any query · *e.g.* aggregates go in HAVING, not WHERE.

**Bags**
$$\texttt{SELECT} \text{ keeps duplicates}; \ \texttt{DISTINCT}, \texttt{UNION} \text{ remove them}; \ \texttt{UNION ALL} \text{ keeps them}$$
SQL results are bags · *Use when:* counting rows · *e.g.* `SELECT dept FROM Student` gives 4 rows.

**Join in WHERE**
$$\texttt{FROM R, S WHERE R.a = S.a} \equiv \sigma_{R.a = S.a}(R \times S)$$
Inner join · *Use when:* two tables in FROM · *e.g.* 2024 Q.31 gives 3 rows.

**Aggregates and NULL**
$$\texttt{COUNT(*)} = \text{all rows}, \quad \texttt{AVG(c)} = \frac{\texttt{SUM(c)}}{\texttt{COUNT(c)}} \text{ (NULLs skipped)}$$
Only COUNT(*) counts NULL rows · *Use when:* NULL in data · *e.g.* 8 rows with one NULL: COUNT(*) = 8, COUNT(marks) = 7.

**NULL comparisons**
$$\text{NULL} \ \theta \ x = \text{UNKNOWN}; \ \texttt{WHERE} \text{ keeps only TRUE}$$
Unknown rows dropped; `NOT IN` with a NULL in the list returns nothing · *Use when:* NULL in WHERE · *e.g.* NULL < 100 row is dropped.

**ALL / ANY**
$$x > \texttt{ALL}(S) \iff x > \max(S), \qquad x > \texttt{ANY}(S) \iff x > \min(S)$$
Empty S: ALL is TRUE, ANY is FALSE · *Use when:* quantified subqueries · *e.g.* marks > ALL {85, 60, 75}: 90, 88.

**Scalar / correlated subquery**
$$\text{correlated: re-run inner query once per outer row}$$
Make a table: outer row, subquery value, condition · *Use when:* inner query uses outer alias · *e.g.* 2026 Q.60 count larger vs smaller.

**Strict vs non-strict**
$$x > m \text{ excludes } x = m; \ \text{ties are neither } < \text{ nor } >$$
Equality decides counts · *Use when:* MAX or COUNT comparisons · *e.g.* 2025 Q.33: 65000 is not $> 65000$.

**Derived table**
$$\texttt{FROM (SELECT k, COUNT(*) AS c ... GROUP BY k) AS B}$$
Must expose every column used later · *Use when:* per-group value for each row · *e.g.* team size per employee (2026 Q.51).

## Integrity Constraints & Keys

| Term | Rule |
|---|---|
| Superkey | Values unique in every row |
| Candidate key | Minimal superkey |
| Primary key | Chosen candidate key; unique, NOT NULL |
| Foreign key | Value is NULL or exists in parent key; not unique by itself |
| Prime attribute | Part of some candidate key |

**Superkeys, one candidate key**
$$\#\text{superkeys} = 2^{\,n-k}$$
Key columns fixed, others in/out · *Use when:* one key · *e.g.* n = 5, key AB: $2^3 = 8$.

**Superkeys, two candidate keys**
$$N(K_1) + N(K_2) - N(K_1 \cup K_2), \quad N(K) = 2^{\,n - |K|}$$
Inclusion-exclusion · *Use when:* two keys · *e.g.* R(ABCD), keys A, BC: $8 + 4 - 2 = 10$.

**Referential integrity**
$$c.\text{FK} = \text{NULL} \ \lor \ c.\text{FK} \in \pi_{PK}(\text{Parent})$$
No dangling references · *Use when:* insert/delete questions · *e.g.* inserting (S5, C1, 70) into Enroll fails.

**FK-safe operations**

| Operation | Can violate FK? |
|---|---|
| Insert into parent | Never |
| Delete from child | Never |
| Insert / update child | Yes |
| Delete / update parent key | Yes (unless CASCADE / SET NULL) |

**Entity integrity**
$$\text{PK columns} \neq \text{NULL}$$
Primary key never NULL; other columns NULL-able unless NOT NULL · *Use when:* DDL MSQs · *e.g.* 2025 Q.56: phone can be NULL.

## Functional Dependencies & Normal Forms

**FD meaning**
$$X \to Y: \ t_1[X] = t_2[X] \Rightarrow t_1[Y] = t_2[Y]$$
Rows equal on X are equal on Y · *Use when:* reading FDs · *e.g.* sid → name.

**Armstrong's axioms**
$$Y \subseteq X \Rightarrow X \to Y; \quad X \to Y \Rightarrow XZ \to YZ; \quad X \to Y, Y \to Z \Rightarrow X \to Z$$
Reflexivity, augmentation, transitivity; plus union and decomposition · *Use when:* proving FDs · *e.g.* A → B, B → C give A → C.

**Closure test**
$$X \to Y \text{ follows} \iff Y \subseteq X^+$$
Grow X with any FD whose left side is inside · *Use when:* "which FDs can be derived" · *e.g.* 2024 Q.46: $VW^+ = VWXYZ$, so $VW \to YZ$.

**Key test**
$$X \text{ superkey} \iff X^+ = \text{all columns}; \ \text{candidate key} = \text{minimal}$$
Check no proper subset works · *Use when:* finding keys · *e.g.* $A^+ = ABCDEFG$ in 2025 Q.57.

**Key shortcut**
$$\text{never on any right side} \Rightarrow \text{in every key}$$
Start from these, add one column at a time · *Use when:* "all candidate keys" · *e.g.* 2026 Q.17: D in every key; keys AD, ED, CD.

**Normal forms**

| NF | For every nontrivial $X \to A$ |
|---|---|
| 1NF | Atomic cells |
| 2NF | No non-prime A depends on a proper part of a key |
| 3NF | X superkey **or** A prime |
| BCNF | X superkey |

**Lossless join (2 pieces)**
$$R_1 \cap R_2 \to R_1 \ \text{ or } \ R_1 \cap R_2 \to R_2$$
Common columns must be a key of one piece · *Use when:* checking decompositions · *e.g.* (A,B), (A,C) with A → B: lossless.

**Dependency preservation**
$$(F_1 \cup \dots \cup F_k)^+ = F^+$$
Else a lost FD needs a **join** to check · *Use when:* 2025 Q.16 type · *e.g.* AB → C lost when A and B are in different pieces.

**Facts**
$$\text{BCNF} \Rightarrow \text{3NF} \Rightarrow \text{2NF} \Rightarrow \text{1NF}$$
BCNF decomposition: lossless, may lose FDs. 3NF synthesis: lossless and preserving. Any 2-column table is BCNF · *Use when:* theory MCQs · *e.g.* R(A, B) is always BCNF.

## File Organization & Indexing

**Blocking factor**
$$bfr = \left\lfloor \frac{B}{R} \right\rfloor, \qquad b = \left\lceil \frac{r}{bfr} \right\rceil$$
Records per block (round down), blocks needed (round up) · *Use when:* sizes in bytes · *e.g.* B = 1000, R = 100, r = 10000: bfr = 10, b = 1000.

**Search cost**
$$\text{binary} = \lceil \log_2 b \rceil, \qquad \text{index} = \lceil \log_2 b_i \rceil + 1$$
Halve each step; +1 for the data block · *Use when:* "block accesses" · *e.g.* $b = 1000$: 10; $b_i = 20$: 6.

**B+ internal node order**
$$p \cdot P + (p - 1) K \le B$$
p node pointers, p - 1 keys; no record pointers · *Use when:* "max pointers in non-leaf" · *e.g.* $10p + 11(p-1) \le 4096$: p = 195.

**B+ leaf order**
$$n (K + P_r) + P \le B$$
Key + record pointer pairs + next-leaf pointer · *Use when:* "max keys in a leaf" · *e.g.* $24n + 8 \le 2048$: n = 85.

**Insertion**
$$\text{leaf split: copy up}; \quad \text{internal split: move up middle key}$$
Root split adds one level · *Use when:* tracing inserts · *e.g.* 2026 Q.41: new root holds only 5.

**Minimum occupancy**
$$\text{non-root internal} \ge \lceil p/2 \rceil \text{ pointers}$$
Nodes at least half full · *Use when:* deletion/occupancy questions · *e.g.* p = 4: at least 2 pointers.

**Index types**

| Index | Supports | Note |
|---|---|---|
| Hash | Equality only | O(1) lookup |
| B+ tree | Equality, range, ordered scan | Leaves linked |
| Primary (clustering) | On sort field | At most one; can be sparse |
| Secondary | Any other field | Must be dense |

## Data Transformation (Normalization/Discretization/Sampling/Compression)

**Min-max**
$$v' = \frac{v - \min}{\max - \min}(\text{new\_max} - \text{new\_min}) + \text{new\_min}$$
Position in old range, stretched to new range · *Use when:* min and max given · *e.g.* 75 in [60, 90] to [0, 1]: 0.5.

**z-score**
$$z = \frac{v - \mu}{\sigma}$$
Standard steps from the mean; ignore min/max · *Use when:* mean and SD given · *e.g.* $(106000 - 96000)/21000 \approx 0.476$.

**Decimal scaling**
$$v' = v / 10^{j}, \ j \text{ smallest with } \max \lvert v' \rvert < 1$$
Shift the decimal point · *Use when:* quick scaling · *e.g.* max 90: j = 2, 75 becomes 0.75.

**Equal-width bins**
$$\text{width} = \frac{\max - \min}{k}$$
Same range per bin · *Use when:* bin boundaries · *e.g.* 60 to 90, k = 3: width 10.

**Equal-frequency bins**
$$\text{values per bin} = N / k$$
Same count per bin · *Use when:* "equal-depth" · *e.g.* 9 values, 3 bins: 3 each.

**Smoothing**
$$\text{by mean / median / nearest boundary}$$
Replace bin values by one representative · *Use when:* noise removal · *e.g.* [4, 8, 15]: means 9, 9, 9; boundaries 4, 4, 15.

**Stratified sampling**
$$n_h = n \cdot \frac{N_h}{N}$$
Each group sampled in proportion · *Use when:* imbalanced classes · *e.g.* 600 of 1000, n = 50: 30.

**Compression**
$$\text{lossless: exact rebuild}; \ \text{lossy: approximate (PCA, wavelets)}$$
PCA keeps highest-variance directions · *Use when:* theory MCQs · *e.g.* ZIP is lossless, JPEG is lossy.

## Data Warehouse Modelling (Star/Snowflake, OLAP, Concept Hierarchies)

**Cuboids, no hierarchy**
$$2^{n}$$
Each dimension in or out · *Use when:* plain dimensions · *e.g.* n = 4: 16.

**Cuboids with hierarchies**
$$\prod_{i=1}^{n} (L_i + 1)$$
Each dimension at one of its levels or "all" · *Use when:* hierarchy figure · *e.g.* 3 dims × 3 levels: $4^3 = 64$ (2026 Q.43).

**CUBE rows**
$$\sum_{G \subseteq D} (\text{groups in } G) = \prod (v_i + 1) \text{ if all combinations present}$$
All $2^n$ groupings · *Use when:* `GROUP BY CUBE` · *e.g.* 3 and 2 values: $6 + 3 + 2 + 1 = 12$ (2025 Q.46).

**ROLLUP rows**
$$\text{prefixes only: } (D_1..D_n), \dots, (D_1), ()$$
n + 1 groupings · *Use when:* `GROUP BY ROLLUP` · *e.g.* 3 and 2 values: $6 + 3 + 1 = 10$.

**OLAP operations**

| Operation | Effect | Example |
|---|---|---|
| Roll-up | Coarser level / drop a dimension | City → Country |
| Drill-down | Finer level | Country → State |
| Slice | Fix one dimension to one value | Semester = 1 |
| Dice | Ranges on two or more dimensions | CS, EE and C1, C2 |
| Pivot | Rotate axes | Swap rows and columns |

**Schemas**

| Schema | Shape | Joins |
|---|---|---|
| Star | 1 fact + flat dimension tables | Fewer |
| Snowflake | Dimensions normalized into sub-tables | More |
| Fact constellation | Many facts share dimensions | Varies |

**Measures**

| Type | Examples |
|---|---|
| Distributive | SUM, COUNT, MIN, MAX |
| Algebraic | AVG, standard deviation |
| Holistic | Median, mode, rank |

**Warehouse properties**
$$\text{subject-oriented, integrated, time-variant, non-volatile}$$
OLAP = read-heavy analysis; OLTP = many small updates · *Use when:* theory MCQs · *e.g.* history kept = time-variant.
