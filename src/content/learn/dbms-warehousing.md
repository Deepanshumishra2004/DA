# DBMS & Warehousing

Think of your college office. It keeps a register of students, a list of courses, and a record of who took which course and what marks they got. A **database** is this register kept on a computer. A **DBMS (Database Management System)** is the software that stores the register, keeps it correct, and answers questions like "Which students scored above 80 in DBMS?". MySQL, PostgreSQL and Oracle are examples of a DBMS.

This subject has four parts:
- **Designing tables**: ER model, keys, functional dependencies and normal forms.
- **Asking questions (queries)**: relational algebra, tuple relational calculus and SQL.
- **Storing tables on disk**: files, B+ trees and hashing.
- **Preparing data for analysis**: data transformation and data warehouses (OLAP cubes).

**Why it matters for data science and AI.** Almost all real data lives in databases. Before you train any model, you write SQL to pull the data, join tables and compute group totals. Then you clean and rescale the numbers. Companies also build **data warehouses** so analysts can see summaries like "sales per state per month".

**How GATE tests it.** From 2024 to 2026 there were **23 questions worth 36 marks**: 7 marks in 2024, 11 in 2025 and 18 in 2026. So this subject is growing fast. Most questions give a tiny table and ask "how many rows does this query return?". Others ask you to find candidate keys, trace a B+ tree insertion, or count cuboids in a data cube. Very little needs to be memorised. You need to follow rules carefully, one step at a time.

**Our running example.** Every topic uses the same small college database. It has three tables, `Student`, `Course` and `Enroll`. You first meet these tables in the ER Model section, and then we use them in every query example.

**Study order.** ER Model, then Integrity Constraints & Keys, Relational Algebra, Tuple Relational Calculus, SQL, Functional Dependencies & Normal Forms, File Organization & Indexing, Data Transformation, and last Data Warehouse Modelling. Design ideas (tables and keys) come first because every query needs them. Relational algebra comes before SQL because SQL is built on it.

**Free resources.**
- Silberschatz, Korth, Sudarshan, *Database System Concepts*: chapters on the relational model, SQL, normalization and indexing.
- Han, Kamber, Pei, *Data Mining: Concepts and Techniques*: Chapter 3 (Data Preprocessing) and Chapter 4 (Data Warehousing and OLAP).
- NPTEL *Database Management System* by Prof. Partha Pratim Das (IIT Kharagpur), and the Gate Smashers DBMS playlist on YouTube.

## ER Model

### The big idea
The **ER (Entity-Relationship) model** is a picture of your data that you draw *before* you make tables. It shows the things you store, their details, and how the things are connected.

Then you convert the picture into tables using fixed rules. GATE asks you to apply these rules and count the tables.

### Before you start
This is the first topic, so it needs only a few everyday ideas.

**What a table is.** A table is a grid of rows and columns, like an attendance register. Each **row** is one thing (one student). Each **column** is one detail (name, age).

**One cell, one value.** In a database table, each cell (one row, one column) holds exactly one value. A cell can say `age = 20`. It cannot say `phone = 98xxx, 97xxx`. This single rule explains most of the ER mapping rules below.

**What "identify" means.** To identify a row means to point at exactly one row without confusion. "The student named Ravi" may match two people. "The student with roll number S2" matches exactly one.

**Counting pairs.** If 4 students can each take any of 3 courses, there are $4 \times 3 = 12$ possible (student, course) pairs. A table of pairs lists only the pairs that really happen.

**The words 1, N and M.** In "1:N", the 1 means "one" and N means "many" (any number: 0, 1, 2, ...). M:N means "many on both sides". These are just labels, not numbers you compute with.

### Intuition
Imagine you are asked to computerise your college office. You do not start by typing tables. You first think:

1. **What things do we store?** Students, courses, departments. These are **entities**.
2. **What details does each thing have?** A student has a roll number, a name, an age, maybe several phone numbers. These are **attributes**.
3. **How are things connected?** A student *enrolls in* a course. A student *belongs to* a department. These are **relationships**.

You draw boxes for entities, ovals for attributes and diamonds for relationships. This drawing is the ER diagram. It is like the architect's plan before building a house.

> **Intuition:** An ER diagram is the plan. The tables are the building. GATE asks how many rooms (tables) the building needs.

Now, how many tables do we need? Think of a WhatsApp group. Many students are in many groups, and many groups have many students.

You cannot write "all groups" in one cell of the student row. So you keep a separate list of (student, group) pairs. This is exactly the **M:N rule**: a many-to-many relationship always gets its own table.

The same idea works for phone numbers. One student can have 3 phone numbers, but one cell cannot hold 3 values. So phone numbers go into their own table of (roll, phone) pairs.

**Our running example database.** Our college has students and courses, and students enroll in courses with marks. The ER diagram has two entities, **Student** and **Course**, joined by an M:N relationship **Enroll** with the attribute `marks`.

It becomes these three tables, which we will use in every topic:

**Student**

| sid | name | dept | age |
|---|---|---|---|
| S1 | Asha | CS | 20 |
| S2 | Ravi | EE | 21 |
| S3 | Meena | CS | 22 |
| S4 | Kiran | ME | 20 |

**Course**

| cid | title | credits |
|---|---|---|
| C1 | DBMS | 4 |
| C2 | Python | 3 |
| C3 | Maths | 4 |

**Enroll**

| sid | cid | marks |
|---|---|---|
| S1 | C1 | 85 |
| S1 | C2 | 70 |
| S1 | C3 | 90 |
| S2 | C1 | 60 |
| S3 | C1 | 75 |
| S3 | C3 | 88 |
| S4 | C2 | 65 |

`Enroll` is the table made for the M:N relationship. Its key is (sid, cid) together, because one pair appears only once.

### Words you need
- **Entity**: one real thing you store. *Example:* the student Asha.
- **Entity set**: the group of all similar things. *Example:* all students. It becomes one table.
- **Attribute**: a detail of an entity. *Example:* `name`, `age`.
- **Key attribute**: an attribute whose value is different for every entity, so it identifies the entity. It is drawn underlined. *Example:* `sid`.
- **Simple attribute**: one value that is not split. *Example:* `age`.
- **Composite attribute**: made of smaller parts. *Example:* `address` = (street, city, pin).
- **Multivalued attribute**: can have many values for one entity. Drawn as a double oval. *Example:* `{phone}`.
- **Derived attribute**: can be calculated from others, so it need not be stored. *Example:* `age` from `date_of_birth`.
- **Relationship**: a link between entities. *Example:* Asha *enrolls in* DBMS.
- **Cardinality**: how many entities on each side can be linked. 1:1 (one person, one Aadhaar), 1:N (one department, many students), M:N (many students, many courses).
- **Participation**: **total** if every entity must take part (double line), **partial** if some need not. *Example:* every student must belong to a department (total), but not every department must have a student (partial).
- **Weak entity**: an entity with no key of its own. It is identified using its owner's key plus a **partial key**. *Example:* a Dependent (child) of an Employee is identified by (employee id, child name).
- **Foreign key**: a column in one table that holds the key of another table, so it "points" to a row there. *Example:* `dept` inside Student points to a row of Dept. (More in topic: Integrity Constraints & Keys.)

### Formulas, explained
In ER, the "formulas" are mapping rules. Let $K_1$ be the key of entity $E_1$ and $K_2$ the key of entity $E_2$.

**Rule 1: Strong entity**

$$E(K, A, B) \;\Rightarrow\; \text{table } E(\underline{K}, A, B)$$

- **Read it as:** an entity with key K becomes one table with K as the primary key.
- **Symbols:** $E$ = entity, $K$ = key attribute, $A, B$ = other attributes. Underline means primary key.
- **Why it makes sense:** each entity is one row, and the key keeps rows unique. Composite attributes are broken into their parts. Derived attributes are dropped.
- **Use it when:** you see any normal entity box.

**Rule 2: Multivalued attribute**

$$E(K, \{M\}) \;\Rightarrow\; \text{table } E\_M(\underline{K, M})$$

- **Read it as:** a multivalued attribute M of entity E becomes a new table of (K, M) pairs, with both columns as the key.
- **Symbols:** $\{M\}$ = multivalued attribute (curly brackets mean "a set of values").
- **Why it makes sense:** one cell holds one value. So each phone number gets its own row.
- **Use it when:** you see a double oval or the words "multi-valued".

**Rule 3: M:N relationship**

$$E_1 \overset{M:N}{\longleftrightarrow} E_2 \;\Rightarrow\; \text{table } R(\underline{K_1, K_2}, \text{relationship attributes})$$

- **Read it as:** a many-to-many relationship always becomes its own table. Its key is both entity keys together.
- **Symbols:** $R$ = relationship table, $K_1, K_2$ = keys of the two entities.
- **Why it makes sense:** a student has many courses and a course has many students. Neither side can hold one foreign key column for the other.
- **Use it when:** cardinality is M:N. Total participation does NOT remove this table.

**Rule 4: 1:N relationship**

$$E_1 \overset{1:N}{\longleftrightarrow} E_2 \;\Rightarrow\; \text{add } K_1 \text{ as a foreign key column in } E_2$$

- **Read it as:** no new table. Put the key of the "one" side into the table of the "many" side.
- **Symbols:** $E_1$ = the "one" side (department), $E_2$ = the "many" side (student).
- **Why it makes sense:** each student has only one department. So one extra column `dept` in Student is enough.
- **Use it when:** cardinality is 1:N or N:1.

**Rule 5: 1:1 relationship**

$$E_1 \overset{1:1}{\longleftrightarrow} E_2 \;\Rightarrow\; \text{foreign key on one side; merge into one table if both sides are total}$$

- **Read it as:** no new table. Put one key into the other table, preferably on the total-participation side. If both sides are total, the two entities can become one table.
- **Symbols:** $E_1, E_2$ = the two entities, each linked to at most one of the other.
- **Why it makes sense:** each row on one side matches at most one row on the other side.
- **Use it when:** cardinality is 1:1.

**Rule 6: Weak entity**

$$W(\text{partial key } p, A) \text{ owned by } E(K) \;\Rightarrow\; W(\underline{K, p}, A)$$

- **Read it as:** a weak entity's table takes the owner's key plus its own partial key as its primary key.
- **Symbols:** $W$ = weak entity, $p$ = partial key, $E$ = owner entity with key $K$.
- **Why it makes sense:** "child named Riya" is not unique, but "child named Riya of employee 101" is unique.
- **Use it when:** you see a double rectangle (weak entity) and a double diamond (identifying relationship).

**Minimum table count**

$$\text{tables} = \#\text{entities} + \#\text{multivalued attributes} + \#\text{M:N relationships} - \#\text{1:1 merges}$$

- **Read it as:** one table per entity (strong or weak), one per multivalued attribute, one per M:N relationship, minus one for each 1:1 pair you merge.
- **Symbols:** $\#$ = "number of".
- **Why it makes sense:** it just adds up Rules 1 to 6. 1:N and 1:1 relationships add a column, not a table.
- **Use it when:** GATE asks for the *minimum* number of tables.

### Where the formulas come from
Every ER rule comes from one question: **"Can I store this fact without breaking the one-cell-one-value rule, and without writing the same fact twice?"** Let us build each rule from our college.

**Rule 1 (strong entity): why one table with the key.**

1. Asha has sid S1, name Asha, dept CS, age 20. Write these as one row: (S1, Asha, CS, 20). This works because each detail has exactly one value.
2. Do the same for every student. We get the Student table with 4 rows, because there are 4 students.
3. We need a way to point at one row, because other tables (like Enroll) must refer to a student. Two students may share a name, so we use sid, which is different for every student.
4. In symbols: entity $E$ with key $K$ and attributes $A, B$ becomes table $E(\underline{K}, A, B)$.
5. A composite attribute like address = (street, city, pin) becomes 3 columns, because each part is one value. A derived attribute like age (from date of birth) is dropped, because it can be calculated and storing it twice risks disagreement.

**Rule 2 (multivalued attribute): why a separate table.**

1. Suppose Asha has 2 phones and Ravi has 1. Try to store phones inside Student.
2. Option A: a cell "98111, 97222". Not allowed, because one cell holds one value.
3. Option B: columns phone1, phone2, phone3. Ravi wastes 2 empty cells, and a student with 4 phones does not fit. So this is a bad design.
4. Option C: repeat the whole Asha row twice, once per phone. Now "Asha, CS, 20" is written twice, and changing her age means changing 2 rows. So this is also bad.
5. Option D: a new table Student_Phone(sid, phone) with rows (S1, 98111), (S1, 97222), (S2, 96333). Each cell holds one value and Asha's other details are written once. This works.
6. The key is (sid, phone) together, because sid alone repeats (S1 twice) and phone alone could be shared by two siblings.
7. In symbols: $E(K, \{M\}) \Rightarrow E\_M(\underline{K, M})$.

**Rule 3 (M:N relationship): why its own table.**

1. Asha (S1) took C1, C2 and C3. Try to put a cid column in Student. Asha's row would need 3 values in one cell. Not allowed.
2. Try to put a sid column in Course. Course C1 has students S1, S2 and S3, so the cell needs 3 values. Not allowed.
3. So neither side can hold the link. Make a table of pairs: Enroll(sid, cid). Each enrollment is one row, so each cell has one value.
4. The fact "marks" belongs to the pair (Asha got 85 *in DBMS*), not to Asha alone or DBMS alone. So marks goes into Enroll.
5. Neither sid nor cid alone is unique in Enroll (S1 appears 3 times, C1 appears 3 times). The pair (sid, cid) appears once. So the key is $(K_1, K_2)$.
6. Total participation (every student must take some course) only says "no student has zero rows". It does not shrink the "many", so the table is still needed.

**Rule 4 (1:N relationship): why only a foreign key.**

1. Each student belongs to exactly one department. Asha is in CS.
2. Put a column `dept` in Student: Asha's cell holds "CS", one value. This is allowed, because the student side has at most one department.
3. Try the other direction: a column in Dept listing its students. CS has Asha and Meena, two values in one cell. Not allowed.
4. So the key of the "one" side goes into the table of the "many" side. No new table is needed, because the extra column already stores every link.
5. In symbols: $E_1 \overset{1:N}{\longleftrightarrow} E_2$ adds $K_1$ to $E_2$.

**Rule 5 (1:1 relationship): why merging is allowed when both sides are total.**

1. Each employee has at most one locker, and each locker belongs to at most one employee.
2. A column `lno` in Employee works (one value per employee). So no new table is needed.
3. If **both** sides are total, every employee has exactly one locker and every locker has exactly one employee. Then the two tables have the same number of rows, matched one to one.
4. Two tables matched one to one can be glued into one table, Employee(eid, name, lno), with no empty cells. That is why the merge saves one table.
5. If one side is partial, some employees have no locker. Merging would leave empty (NULL) cells, so GATE usually keeps two tables in that case.

**Rule 6 (weak entity): why the owner's key is in the primary key.**

1. Employee 101 has a child Riya. Employee 205 also has a child Riya.
2. In a Dependent table, "Riya" appears twice, so dname alone cannot identify a row.
3. Add the owner's key: (101, Riya) and (205, Riya) are different. So the key is (eid, dname).
4. The identifying relationship (Employee "has" Dependent) is already stored by the eid column. So it needs no extra table.
5. In symbols: $W(\underline{K, p}, A)$.

**The minimum table count is just Rules 1 to 6 added up.**

1. Each entity, strong or weak, gives 1 table (Rules 1 and 6).
2. Each multivalued attribute gives 1 table (Rule 2).
3. Each M:N relationship gives 1 table (Rule 3).
4. 1:N and 1:1 relationships give 0 tables, because a foreign key column is enough (Rules 4 and 5).
5. Each 1:1 with total participation on both sides lets two entity tables become one, so subtract 1 (Rule 5).

### Examples
**Example 1 (easy):** a library. Book(isbn, title, {author}) and Member(mid, name). Relationship *Borrows* is M:N. What is the minimum number of tables?

1. Book is a strong entity: Book(isbn, title). That is table 1.
2. {author} is multivalued: Book_Author(isbn, author). That is table 2.
3. Member is a strong entity: Member(mid, name). That is table 3.
4. Borrows is M:N: Borrows(mid, isbn). That is table 4.

**Result:** 4 tables.

**Example 2 (medium):** our college. Student(sid, name, age, {phone}), Course(cid, title, credits), Dept(dname, building). Student *BelongsTo* Dept is N:1. Student *Enroll* Course is M:N with attribute marks.

1. Dept(dname, building). Table 1.
2. Student(sid, name, age, dept). The N:1 relationship becomes the foreign key `dept` (Rule 4). Table 2.
3. Student_Phone(sid, phone). The multivalued attribute (Rule 2). Table 3.
4. Course(cid, title, credits). Table 4.
5. Enroll(sid, cid, marks). The M:N relationship (Rule 3). Table 5.

**Result:** 5 tables. Notice that `BelongsTo` did not need a table. Its information sits in the `dept` column of our Student table above.

**Example 3 (GATE level):** Entities: Employee(eid, name, {skill}) and Project(pid, budget). Weak entity Dependent(dname, age), owned by Employee through a 1:N identifying relationship. Works_On is M:N between Employee and Project, with total participation on both sides. Also Employee *Has* Locker(lno), 1:1, with total participation on both sides. Minimum number of tables, each in 3NF?

1. Employee and Locker are 1:1 with total participation on both sides. Merge them: Employee(eid, name, lno). Table 1.
2. {skill}: Emp_Skill(eid, skill). Table 2.
3. Project(pid, budget). Table 3.
4. Dependent is weak: Dependent(eid, dname, age), key (eid, dname). Table 4. The identifying relationship needs no extra table.
5. Works_On is M:N: Works_On(eid, pid). Table 5. Total participation does not remove it.
6. Check with the count formula: 4 entities (Employee, Locker, Project, Dependent) + 1 multivalued + 1 M:N - 1 merge = 5.

**Result:** 5 tables.

### Common mistakes
> **Common mistake:** Keeping a multivalued attribute inside the entity table. A cell cannot hold a list, so this breaks 1NF. Always give it its own table.

> **Common mistake:** Thinking that total participation removes the M:N table. It does not. Only 1:1 with total participation on both sides allows a merge.

> **Common mistake:** Making a separate table for a 1:N relationship. A foreign key in the "many" side is enough, and the question asks for the *minimum*.

> **Common mistake:** Forgetting the owner's key in a weak entity table. Its primary key is (owner key, partial key).

### How GATE asks it
- **2026 Q.61** (2 marks, NAT): two entities, one with a multivalued attribute, joined by an M:N relationship with total participation on both sides. The minimum number of 3NF tables was **4**: two entity tables, one multivalued-attribute table and one M:N table.

> **GATE tip:** Go through the diagram in this order: entities, multivalued attributes, weak entities, then relationships (M:N gets a table, 1:N and 1:1 do not). Count as you go.

### Summary
- First we draw the data as a picture: entities (things), attributes (details) and relationships (links).
- Then we turn the picture into tables, always keeping one value per cell and writing each fact only once.
- So a strong entity becomes one table, and a multivalued attribute or an M:N relationship needs its own table of pairs, because a cell cannot hold a list.
- A 1:N or 1:1 link fits in a single foreign key column, so it needs no new table, and a 1:1 link with total participation on both sides even lets two tables merge.
- A weak entity borrows its owner's key, because its own partial key is not unique.
- That is why the minimum table count is entities + multivalued attributes + M:N relationships - 1:1 merges.
- Next topic builds on this: Integrity Constraints & Keys explains exactly what a key and a foreign key promise.

### Quick self-check
1. Entity A(a1, a2) and entity B(b1, b2) have a 1:N relationship. How many tables?

   **Answer:** 2. Put a1 as a foreign key inside B.
2. Entity P(p1, {p2}) and entity Q(q1) have an M:N relationship. How many tables?

   **Answer:** 4: P, P_p2, Q and the relationship table.
3. What is the primary key of a weak entity table?

   **Answer:** The owner's key plus the weak entity's partial key.

## Relational Algebra

### The big idea
**Relational algebra (RA)** is a small set of operations on tables. Each operation takes one or two tables and gives back a new table.

You combine operations, like steps in a recipe, to answer a question. SQL is built on top of these operations.

### Before you start
**Tables from the ER Model (see topic: ER Model).** We use the running tables Student(sid, name, dept, age), Course(cid, title, credits) and Enroll(sid, cid, marks). A row of a table is also called a **tuple**.

**What a set is.** A set is a collection of items where order does not matter and nothing repeats. $\{S1, S2\}$ and $\{S2, S1\}$ are the same set, and $\{S1, S1\}$ is just $\{S1\}$. In RA, every table is a set of rows.

**Set operations from school.** For sets $A = \{1, 2, 3\}$ and $B = \{2, 3, 4\}$:

- $A \cup B$ (union, "or") $= \{1, 2, 3, 4\}$.
- $A \cap B$ (intersection, "and") $= \{2, 3\}$.
- $A - B$ (difference, "in A but not in B") $= \{1\}$.
- $\emptyset$ means the empty set, a set with nothing in it.

**Subset.** $A \subseteq B$ means "every item of A is also in B". $\{2, 3\} \subseteq \{1, 2, 3\}$ is true.

**Counting pairs (multiplication rule).** If you have 3 shirts and 4 pants, you can make $3 \times 4 = 12$ outfits. Each shirt goes with each pant.

**Greek letters.** RA uses Greek letters as operation names: $\sigma$ (sigma), $\pi$ (pi), $\rho$ (rho), $\theta$ (theta). Here $\pi$ is NOT 3.14; it is just a name.

### Intuition
Think of a class register on paper. To answer questions you do only a few simple things:

1. **Pick some rows**: "show only CS students". This is **selection** ($\sigma$).
2. **Pick some columns**: "show only names". This is **projection** ($\pi$).
3. **Combine two lists**: "students in the cricket team OR the music club". These are **union, intersection, difference**.
4. **Match two registers**: put each Enroll row next to the student's details using the common `sid`. This is a **join** ($\bowtie$).

Every RA query is just these steps, nested. You read a nested query **from the inside out**, like opening a box inside a box.

> **Intuition:** $\sigma$ cuts the table horizontally (fewer rows). $\pi$ cuts it vertically (fewer columns). A join glues two tables side by side where they agree.

One more important fact: in RA a table is a **set**. A set has no repeated items, so if a projection produces the same row twice, RA keeps it only once.

### Words you need
- **Relation**: a table. *Example:* Student.
- **Tuple**: one row. *Example:* (S1, Asha, CS, 20).
- **Attribute**: one column name. *Example:* `age`.
- **Union-compatible**: two tables with the same number of columns and matching column types, so union or difference makes sense. *Example:* $\pi_{sid}(\text{Student})$ and $\pi_{sid}(\text{Enroll})$.
- **Common columns**: columns with the same name in both tables. A natural join matches on all of them. *Example:* Student and Enroll share `sid`.
- **Empty set** $\emptyset$ (also written $\phi$): a table with no rows.

### Formulas, explained
**Selection**

$$\sigma_{\text{condition}}(R)$$

- **Read it as:** "sigma condition of R": keep the rows of R where the condition is true.
- **Symbols:** $\sigma$ (Greek "sigma", think "s" for select), $R$ = a table.
- **Why it makes sense:** it is a filter, like a shop showing only items under 500 rupees.
- **Use it when:** the question says "where", "whose", "with".

*Example:* $\sigma_{dept='CS'}(\text{Student})$

| sid | name | dept | age |
|---|---|---|---|
| S1 | Asha | CS | 20 |
| S3 | Meena | CS | 22 |

**Projection**

$$\pi_{A_1, A_2, \dots}(R)$$

- **Read it as:** "pi A1, A2 of R": keep only these columns, and remove repeated rows.
- **Symbols:** $\pi$ (Greek "pi", think "p" for pick columns), $A_1, A_2$ = column names.
- **Why it makes sense:** you only want some details. Since a relation is a set, duplicates go away.
- **Use it when:** the question says "find the names" or "list the ids".

*Example:* $\pi_{dept}(\text{Student})$ gives 3 rows, not 4, because CS appears twice:

| dept |
|---|
| CS |
| EE |
| ME |

**Union, difference, intersection**

$$R \cup S, \qquad R - S, \qquad R \cap S = R - (R - S)$$

- **Read it as:** rows in R or S; rows in R but not in S; rows in both.
- **Symbols:** $\cup$ = union ("or"), $-$ = difference ("but not"), $\cap$ = intersection ("and").
- **Why it makes sense:** these are the usual set operations from school. $R - (R - S)$ removes from R everything not in S, so what is left is in both.
- **Use it when:** the question says "or", "but not", "both". R and S must be union-compatible.

*Example:* Let $A = \pi_{sid}(\sigma_{cid='C1'}(\text{Enroll})) = \{S1, S2, S3\}$ and $B = \pi_{sid}(\sigma_{cid='C3'}(\text{Enroll})) = \{S1, S3\}$.

| $A \cup B$ | $A - B$ | $A \cap B$ |
|---|---|---|
| S1 | S2 | S1 |
| S2 | | S3 |
| S3 | | |

So $A \cup B$ has 3 rows, $A - B$ has 1 row (S2), and $A \cap B$ has 2 rows.

**Cartesian product**

$$R \times S, \qquad \text{rows}(R \times S) = \text{rows}(R) \cdot \text{rows}(S)$$

- **Read it as:** "R cross S": pair every row of R with every row of S.
- **Symbols:** $\times$ = cross product, $\cdot$ = ordinary multiplication of the row counts.
- **Why it makes sense:** like every shirt with every pant: 3 shirts and 4 pants give $3 \times 4 = 12$ outfits.
- **Use it when:** counting rows, or as the first step of a join.

*Example:* $\pi_{name}(\sigma_{dept='CS'}(\text{Student})) \times \pi_{title}(\text{Course})$ has $2 \times 3 = 6$ rows:

| name | title |
|---|---|
| Asha | DBMS |
| Asha | Python |
| Asha | Maths |
| Meena | DBMS |
| Meena | Python |
| Meena | Maths |

**Natural join and theta join**

$$R \bowtie S, \qquad R \bowtie_{\theta} S = \sigma_{\theta}(R \times S)$$

- **Read it as:** "R natural join S": pair rows that agree on **all** common columns, and show each common column once. "R theta join S": the cross product filtered by condition $\theta$.
- **Symbols:** $\bowtie$ = join (a bow-tie), $\theta$ (Greek "theta") = any condition like $R.a = S.b$.
- **Why it makes sense:** a join is "cross product + keep matching rows". Matching on the shared `sid` puts each enrollment next to the right student.
- **Use it when:** the information you need is in two tables.

*Example:* $\text{Student} \bowtie \text{Enroll}$ matches on `sid` and gives 7 rows:

| sid | name | dept | age | cid | marks |
|---|---|---|---|---|---|
| S1 | Asha | CS | 20 | C1 | 85 |
| S1 | Asha | CS | 20 | C2 | 70 |
| S1 | Asha | CS | 20 | C3 | 90 |
| S2 | Ravi | EE | 21 | C1 | 60 |
| S3 | Meena | CS | 22 | C1 | 75 |
| S3 | Meena | CS | 22 | C3 | 88 |
| S4 | Kiran | ME | 20 | C2 | 65 |

**Rename**

$$\rho_{T}(R)$$

- **Read it as:** "rho T of R": call table R by the new name T.
- **Symbols:** $\rho$ (Greek "rho", think "r" for rename), $T$ = the new name.
- **Why it makes sense:** to join a table with itself you need two names, like $\rho_{E1}(\text{Enroll})$ and $\rho_{E2}(\text{Enroll})$.
- **Use it when:** you compare rows of the same table.

**Division**

$$R(X, Y) \div S(Y) = \pi_X(R) - \pi_X\big((\pi_X(R) \times S) - R\big)$$

- **Read it as:** "R divided by S": the X values that are paired in R with **every** Y value in S.
- **Symbols:** $X$ = the answer column (e.g. sid), $Y$ = the "every" column (e.g. cid).
- **Why it makes sense:** $\pi_X(R) \times S$ lists all pairs that *should* exist if everyone took everything. Subtract R to get the *missing* pairs. Anyone with a missing pair fails; remove them, and the rest pass.
- **Use it when:** the question says "**every**" or "**all**": students who took every course, customers with a loan at every branch.

**Subset test**

$$A \subseteq B \iff A - B = \emptyset$$

- **Read it as:** A is inside B exactly when "A minus B" is empty.
- **Symbols:** $\iff$ = "exactly when" (both directions are true).
- **Why it makes sense:** if nothing of A is left after removing B, then everything in A was in B.
- **Use it when:** "check that every X is a Y".

### Where the formulas come from
RA has only six basic operations: $\sigma$, $\pi$, $\cup$, $-$, $\times$, $\rho$. Every other operation (join, intersection, division) is built from these. Let us see how.

**Why a projection loses rows.**

1. $\pi_{dept}(\text{Student})$ first cuts each row down to its dept: CS, EE, CS, ME.
2. A table in RA is a set, and a set cannot hold CS twice. So one CS is removed.
3. So the result has 3 rows, not 4. In general, $\text{rows}(\pi(R)) \le \text{rows}(R)$, because removing columns can only create repeats, never new rows.

**Why the cross product has $\text{rows}(R) \cdot \text{rows}(S)$ rows.**

1. Take the 2 CS names (Asha, Meena) and the 3 course titles.
2. Asha pairs with each of the 3 titles: 3 rows.
3. Meena pairs with each of the 3 titles: 3 more rows.
4. Total $3 + 3 = 2 \times 3 = 6$, because we add 3 once for every name.
5. In general, each of the $\text{rows}(R)$ rows pairs with all $\text{rows}(S)$ rows, so the total is the product.

**Why a join is "cross product, then select".**

1. We want each Enroll row next to its student's name. Start with $\text{Student} \times \text{Enroll}$: $4 \times 7 = 28$ pairs.
2. Most pairs are nonsense, like (Asha's details, Ravi's enrollment). We only want pairs where the two sids are equal.
3. So keep the pairs with $\text{Student.sid} = \text{Enroll.sid}$. That is a selection: $\sigma_{\text{Student.sid} = \text{Enroll.sid}}(\text{Student} \times \text{Enroll})$.
4. Exactly 7 pairs survive, one for each Enroll row, because each enrollment has exactly one matching student.
5. A natural join is this theta join plus a projection that shows the sid column only once. So $R \bowtie_{\theta} S = \sigma_{\theta}(R \times S)$.

**Why $R \cap S = R - (R - S)$.**

1. Use $A = \{S1, S2, S3\}$ and $B = \{S1, S3\}$.
2. $A - B = \{S2\}$: the part of A that is NOT in B.
3. $A - (A - B) = \{S1, S2, S3\} - \{S2\} = \{S1, S3\}$: we removed the "not in B" part.
4. What remains is in A and also in B, which is exactly $A \cap B$. So intersection needs no new basic operation.

**Why the subset test is $A - B = \emptyset$.**

1. $A - B$ is the list of items of A that B does not have.
2. If that list is empty, then no item of A is missing from B.
3. "No item of A is missing from B" is the meaning of $A \subseteq B$. So the two statements say the same thing.

**How the division formula is built (students who took every course).**

1. We want students who took **every** course. It is easier to find the students who **failed** to take some course, and then remove them.
2. All students: $\pi_{sid}(\text{Enroll}) = \{S1, S2, S3, S4\}$. All courses: $\{C1, C2, C3\}$.
3. If every student took every course, the pairs would be $\pi_{sid}(\text{Enroll}) \times \pi_{cid}(\text{Course})$, which has $4 \times 3 = 12$ pairs. This is the "ideal" list.
4. Subtract the real pairs: $\text{ideal} - \text{Enroll}$. What remains are the **missing** pairs, because these should exist but do not.
5. $\pi_{sid}(\text{missing})$ = students with at least one missing pair = the "failures".
6. All students minus failures = students with no missing pair = students who took every course.
7. Put the steps together: $R \div S = \pi_X(R) - \pi_X\big((\pi_X(R) \times S) - R\big)$. So division is built only from $\pi$, $\times$ and $-$.

### Examples
**Example 1 (easy):** names of students who scored more than 80 in some course.

$$\pi_{name}(\sigma_{marks > 80}(\text{Student} \bowtie \text{Enroll}))$$

1. The join is the 7-row table above.
2. Keep rows with marks > 80. The rows are (Asha, C1, 85), (Asha, C3, 90) and (Meena, C3, 88).
3. Project on `name`. Asha appears twice but is kept once.

| name |
|---|
| Asha |
| Meena |

**Result:** 2 rows.

**Example 2 (medium):** students who took **every** course: $\pi_{sid,cid}(\text{Enroll}) \div \pi_{cid}(\text{Course})$.

1. $\pi_{sid}(\text{Enroll}) = \{S1, S2, S3, S4\}$ and $\pi_{cid}(\text{Course}) = \{C1, C2, C3\}$.
2. All possible pairs: $4 \times 3 = 12$.
3. Subtract the 7 real Enroll pairs: $12 - 7 = 5$ missing pairs, shown below.
4. Students with a missing pair are {S2, S3, S4}.
5. $\{S1, S2, S3, S4\} - \{S2, S3, S4\} = \{S1\}$.

| sid | cid (missing) |
|---|---|
| S2 | C2 |
| S2 | C3 |
| S3 | C2 |
| S4 | C1 |
| S4 | C3 |

**Result:** 1 row (S1, Asha). Check: Asha took C1, C2 and C3.

**Example 3 (GATE level):** tables A(P, Q, R) and B(P, Q, S). How many tuples are in $\pi_{R,S}(\sigma_{S > 15}(A \bowtie B))$?

**A**

| P | Q | R |
|---|---|---|
| 1 | x | r1 |
| 2 | y | r2 |
| 3 | x | r3 |

**B**

| P | Q | S |
|---|---|---|
| 1 | x | 10 |
| 1 | y | 20 |
| 2 | x | 30 |
| 3 | x | 40 |

1. The common columns are **P and Q**, so rows must agree on both.
2. (1, x, r1) matches (1, x, 10). Yes.
3. (2, y, r2): B has P = 2 only with Q = x. No match.
4. (3, x, r3) matches (3, x, 40). Yes. So $A \bowtie B$ has 2 rows, shown below.
5. $S > 15$ removes the row with 10 (10 is not more than 15).
6. Project on R, S: one row (r3, 40).

| P | Q | R | S |
|---|---|---|---|
| 1 | x | r1 | 10 |
| 3 | x | r3 | 40 |

**Result:** 1 tuple. If you wrongly matched on P only, the join would have 4 rows, and after the filter you would get 3 rows: (r1, 20), (r2, 30), (r3, 40).

### Common mistakes
> **Common mistake:** Joining on only one common column. A natural join matches on **all** columns with the same name. List the common columns before you start.

> **Common mistake:** Keeping duplicate rows after a projection. RA works on sets, so each row appears once.

> **Common mistake:** Using $\cap$ for "either ... or". "In Defender or Forward" is a union $\cup$.

> **Common mistake:** Reversing a subset check. "Every Team name is in Defender" is $\pi(\text{Team}) - \pi(\text{Defender}) = \emptyset$, not the other way round.

### How GATE asks it
- **2024 Q.26** (1 mark): "every name in Team is in Defender or Forward" written as $\pi_{name}(\text{Team}) - (\pi_{name}(\text{Defender}) \cup \pi_{name}(\text{Forward})) = \emptyset$. Tested union vs intersection and the direction of difference.
- **2025 Q.17** (1 mark): read a nested select-join-project expression from the inside out. Answer: owners of a red car made by ABC.
- **2025 Q.62** (2 marks, NAT): division, "customers with a loan at every branch". Only one customer qualified.
- **2026 Q.42** (2 marks): chained natural joins with selections. The last join matched on P, Q and S together, so the result was empty.

> **GATE tip:** Write out every middle table. They have 3 to 9 rows, so this takes a minute and avoids silly errors.

### Summary
- First we treat every table as a set of rows, so repeated rows always disappear.
- Then we use a few basic tools: $\sigma$ keeps rows, $\pi$ keeps columns, $\cup$, $\cap$, $-$ combine lists, and $\times$ pairs every row with every row.
- A join is just a cross product followed by a selection that keeps the matching pairs.
- Intersection, the subset test and division are all built from these basic tools.
- Division answers "every" questions by listing the ideal pairs, finding the missing ones, and removing anyone who has a missing pair.
- That is why we always read a query from the inside out and write each middle table.
- Next topic builds on this: Tuple Relational Calculus describes the same results with logic, and SQL is RA written in English-like words.

### Quick self-check
1. How many rows does $\pi_{age}(\text{Student})$ have?

   **Answer:** 3 (ages 20, 21, 22). The two 20s become one row.
2. How many rows does $\text{Student} \times \text{Course}$ have?

   **Answer:** $4 \times 3 = 12$.
3. Which RA operator matches the English word "every"?

   **Answer:** Division $\div$.

## Tuple Relational Calculus

### The big idea
**Tuple relational calculus (TRC)** describes *what* rows you want, using a logic sentence. It does not say *how* to get them.

The answer is every row that makes the sentence true. You evaluate it by testing rows one at a time.

### Before you start
**Tables and sets (see topic: Relational Algebra).** A table is a set of rows. A row is also called a tuple. We use the running tables Student, Course and Enroll.

**Set-builder notation.** $\{x \mid x \text{ is even and } x < 7\}$ means "the set of all $x$ such that $x$ is even and less than 7". The answer is $\{2, 4, 6\}$ (counting from 1). The bar $\mid$ is read "such that". TRC queries use exactly this form, with rows instead of numbers.

**True and false sentences.** A logic sentence is either true or false. "20 > 15" is true. "20 > 20" is false, because 20 is equal to 20, not bigger.

**AND, OR, NOT.** For two sentences P and Q:

- $P \land Q$ (AND) is true only when both are true.
- $P \lor Q$ (OR) is true when at least one is true.
- $\neg P$ (NOT) flips true to false and false to true.

*Example:* "age > 20 AND dept = CS" is true for Meena (22, CS) but false for Ravi (21, EE).

**Variables.** A variable is a name that stands for something that can change. In $x + 1$, $x$ can be 1, 2, 3, ... In TRC the variable $t$ stands for one row at a time.

### Intuition
Relational algebra is like giving a cook a recipe: "first cut, then fry, then add salt". TRC is like ordering in a restaurant: "I want a dish that is vegetarian and has paneer". You describe the result, and the DBMS finds it.

A TRC query looks like this:

$$\{\, t \mid t \in \text{Student} \land t[age] > 20 \,\}$$

Read it as: "the set of all rows $t$ such that $t$ is a row of Student and $t$'s age is more than 20". The best way to evaluate it by hand is a **row-by-row test**:

1. Take each row of the table that $t$ comes from.
2. Check the condition for that row.
3. Keep the row if the condition is true.

> **Intuition:** TRC is a checking machine. Each candidate row walks through the gate. The formula is the gatekeeper, saying "yes, keep" or "no, drop".

The two quantifiers are the heart of TRC:

- $\exists$ ("there exists") is like asking a WhatsApp group: "Has **anyone** got the notes?" One "yes" is enough.
- $\forall$ ("for all") is like a teacher checking: "Has **everyone** submitted homework?" One "no" makes it false.

### Words you need
- **Tuple variable** $t$: a name that stands for one row at a time. *Example:* $t$ = (S1, Asha, CS, 20).
- $t[A]$: the value of column A in row $t$. *Example:* $t[name]$ = Asha.
- $t \in R$: "row $t$ is in table R".
- $\land$: AND. $\lor$: OR. $\neg$: NOT.
- $\Rightarrow$: "if ... then". *Example:* "if a student is in CS, then age $\ge$ 20".
- $\exists s \in R\,(\dots)$: "there is at least one row $s$ in R such that ...".
- $\forall s \in R\,(\dots)$: "for every row $s$ in R, ... is true".
- **Free variable**: the variable whose rows form the answer ($t$). **Bound variable**: a variable tied to $\exists$ or $\forall$ ($s$, $e$).
- **Safe query**: a query whose answer is finite. *Example:* $\{t \mid \neg(t \in \text{Student})\}$ is **unsafe**, because there are infinitely many rows that are not students.

### Formulas, explained
**TRC query form**

$$\{\, t \mid P(t) \,\}$$

- **Read it as:** the set of all tuples $t$ for which $P(t)$ is true.
- **Symbols:** $t$ = tuple variable, the bar $\mid$ means "such that", $P(t)$ = a logic formula about $t$.
- **Why it makes sense:** this is set-builder notation from school, like $\{x \mid x \text{ is even}\}$.
- **Use it when:** reading any TRC question.

**Exists**

$$\exists\, s \in R\,\big(s[A] = t[A] \land \text{cond}(s)\big)$$

- **Read it as:** there is some row $s$ of R that matches $t$ on A and satisfies the condition.
- **Symbols:** $s$ = a helper row variable, $\text{cond}(s)$ = any extra test on $s$.
- **Why it makes sense:** this is how TRC "joins". It keeps $t$ if a matching partner exists, but it does not add the partner's columns to the answer. It never creates duplicate rows of $t$.
- **Use it when:** the English says "some", "at least one", "has a".

**For all, and the NOT-EXISTS trick**

$$\forall\, s \in R\,\big(P(s)\big) \;\equiv\; \neg\, \exists\, s \in R\,\big(\neg P(s)\big)$$

- **Read it as:** "every row satisfies P" means the same as "there is no row that fails P".
- **Symbols:** $\equiv$ = "means the same as".
- **Why it makes sense:** "everyone submitted" is the same as "nobody failed to submit".
- **Use it when:** the English says "every" or "all". In RA, this becomes division.

**Implication**

$$P \Rightarrow Q \;\equiv\; \neg P \lor Q$$

- **Read it as:** "if P then Q" is the same as "P is false, or Q is true".
- **Symbols:** $P, Q$ = any two true/false sentences.
- **Why it makes sense:** a rule "if it rains, I carry an umbrella" is broken only when it rains and I have no umbrella.
- **Use it when:** you see $\forall s\,(s[cid] = t[cid] \Rightarrow \dots)$. Rows that do not match make the implication automatically true.

**Trivially true clause**

$$t \in X \;\Rightarrow\; \exists\, z \in X\,(z[P] = t[P]) \text{ is always true}$$

- **Read it as:** if $t$ is in X, then "some row of X has the same P as $t$" is always true.
- **Symbols:** $z$ = a helper row of X, $P$ = a column.
- **Why it makes sense:** just choose $z = t$ itself.
- **Use it when:** a GATE formula has a clause that looks scary but adds no filter.

### Where the formulas come from
TRC has no calculation rules to memorise. Its "formulas" are logic facts. Each one can be checked with a small truth table or a tiny example.

**Why $\exists$ behaves like a join but never repeats rows.**

1. Query: students who took C3. For $t$ = Asha (S1), we ask: is there a row $e$ in Enroll with $e[sid] = S1$ and $e[cid] = C3$?
2. Yes, (S1, C3, 90) exists. So the sentence is true and Asha is kept once.
3. Even if Asha had two C3 rows, the question "is there at least one?" still has the answer "yes", one time. So Asha still appears once.
4. A join would pair Asha with every matching Enroll row, so it could repeat Asha. That is the difference: $\exists$ only checks, the join glues.

**Why $\forall s\,(P(s)) \equiv \neg \exists s\,(\neg P(s))$.**

1. Take the C3 marks {90, 88} and $P(s)$ = "mark $\ge 70$".
2. Left side: is every mark $\ge 70$? 90 yes, 88 yes. So TRUE.
3. Right side: is there a mark that fails ($< 70$)? No. So "there exists a failure" is FALSE, and NOT of that is TRUE.
4. Now take the C1 marks {85, 60, 75}. Left: 60 fails, so FALSE. Right: a failure (60) exists, so "exists a failure" is TRUE, and NOT of that is FALSE.
5. Both sides always agree, because "all pass" and "nobody fails" describe the same situation. This works for any set of rows.

**Why $P \Rightarrow Q \equiv \neg P \lor Q$ (truth table).**

A promise "if P then Q" is broken only in one case: P happened and Q did not.

| P | Q | $P \Rightarrow Q$ | $\neg P \lor Q$ |
|---|---|---|---|
| T | T | T | T |
| T | F | F | F |
| F | T | T | T |
| F | F | T | T |

1. Row 2 is the broken promise: it rained (P true) and no umbrella (Q false). Both columns say F.
2. In rows 3 and 4 it did not rain, so the promise was not tested. We count it as kept, so both columns say T.
3. The last two columns agree in all 4 rows, so the two formulas mean the same thing.

**Why $\forall$ needs $\Rightarrow$ and not $\land$.**

1. Query: courses where every enrolled student scored at least 70. For $t$ = C3, look at all 7 Enroll rows $e$.
2. With $\Rightarrow$: "if $e$ is a C3 row, then marks $\ge 70$". For the 5 non-C3 rows, the "if" part is false, so the rule is true (row 3 or 4 of the table). For the 2 C3 rows, 90 and 88 pass. So all 7 rows give TRUE, and C3 is kept.
3. With $\land$: "$e$ is a C3 row AND marks $\ge 70$". The 5 non-C3 rows make this FALSE. So "for all" fails, and C3 is wrongly dropped.
4. So $\forall$ with $\Rightarrow$ checks only the rows that matter, which is what "every student of this course" means.

**Why the "trivially true" clause adds nothing.**

1. $t$ is a row of X. The clause asks: is there some row $z$ of X with $z[P] = t[P]$?
2. Choose $z = t$. Then $z[P] = t[P]$ is true, because any value equals itself.
3. So the clause is true for every $t$, and removing it does not change the answer.

**Why a query must be "safe".**

1. $\{t \mid \neg(t \in \text{Student})\}$ asks for every row that is not a student.
2. Rows like (X1, Abc, ZZ, 99), (X2, ...), ... are all "not students", and there is no end to them.
3. A computer cannot print an endless answer. So we only allow queries where $t$ is tied to a real table, like $t \in \text{Student}$.

### Examples
**Example 1 (easy):** $\{\, t \mid t \in \text{Student} \land t[age] > 20 \,\}$

1. S1, age 20: is 20 > 20? No. Drop.
2. S2, age 21: yes. Keep.
3. S3, age 22: yes. Keep.
4. S4, age 20: no. Drop.

| sid | name | dept | age |
|---|---|---|---|
| S2 | Ravi | EE | 21 |
| S3 | Meena | CS | 22 |

**Result:** 2 tuples.

**Example 2 (medium):** students who took course C3.

$$\{\, t \mid t \in \text{Student} \land \exists\, e \in \text{Enroll}\,(e[sid] = t[sid] \land e[cid] = \text{'C3'}) \,\}$$

1. S1: (S1, C3, 90) exists. Keep.
2. S2: only (S2, C1). Drop.
3. S3: (S3, C3, 88) exists. Keep.
4. S4: only (S4, C2). Drop.

| sid | name | dept | age |
|---|---|---|---|
| S1 | Asha | CS | 20 |
| S3 | Meena | CS | 22 |

**Result:** 2 tuples. The same in RA: $\pi_{sid,name,dept,age}(\text{Student} \bowtie \sigma_{cid='C3'}(\text{Enroll}))$.

**Example 3 (medium, using $\forall$):** courses where **every** student scored at least 70.

$$\{\, t \mid t \in \text{Course} \land \forall\, e \in \text{Enroll}\,(e[cid] = t[cid] \Rightarrow e[marks] \ge 70) \,\}$$

1. C1: marks 85, 60, 75. The 60 fails. Drop.
2. C2: marks 70, 65. The 65 fails. Drop.
3. C3: marks 90, 88. Both pass. Keep.

| cid | title | credits |
|---|---|---|
| C3 | Maths | 4 |

**Result:** 1 tuple. Enroll rows of other courses make "$e[cid] = t[cid]$" false, so the implication is true for them and they do not matter.

**Example 4 (GATE level):** how many tuples does this return?

$$\{\, t \mid t \in \text{Enroll} \land \exists\, u \in \text{Enroll}\,(u[cid] = t[cid]) \land \exists\, s \in \text{Student}\,(s[sid] = t[sid] \land s[age] > 20) \,\}$$

1. $t$ ranges over the 7 Enroll rows.
2. The clause with $u$ is trivially true. Choose $u = t$.
3. The clause with $s$ keeps rows whose student is older than 20. Ages: S1 = 20 (no), S2 = 21 (yes), S3 = 22 (yes), S4 = 20 (no).
4. Keep the Enroll rows of S2 and S3, shown below.

| sid | cid | marks |
|---|---|---|
| S2 | C1 | 60 |
| S3 | C1 | 75 |
| S3 | C3 | 88 |

**Result:** 3 tuples. Watch the strict $>$: with $\ge$, every row would pass and the answer would be 7.

### Common mistakes
> **Common mistake:** Thinking $\exists$ multiplies rows like a join. It only checks. Each $t$ appears at most once in the answer.

> **Common mistake:** Being scared of a clause like $\exists z \in X\,(t[P] = z[P])$. If $t$ is from X, it is always true. Cross it out.

> **Common mistake:** Reading $>$ as $\ge$. A value equal to the limit fails a strict comparison.

> **Common mistake:** Writing $\forall e\,(e[cid] = t[cid] \land \dots)$ instead of $\Rightarrow$. With $\land$, every Enroll row of every course must match, which is almost always false.

### How GATE asks it
- **2026 Q.59** (2 marks, NAT): count the tuples from a formula with two $\exists$ clauses. One clause was trivially true. The other kept X rows whose P value had a Y row with $S > 1$. The row with $S = 1$ failed the strict test. The answer was 2 (the key also accepted 3 because the printed brackets were unclear).

> **GATE tip:** Make a small table: one row per candidate $t$, one column per clause, and write yes or no in each cell. Keep the rows with all yes.

### Summary
- First we describe the answer with a logic sentence instead of a recipe of steps.
- Then we test each candidate row: if the sentence is true for it, the row is in the answer.
- $\exists$ asks "is there at least one partner?", so it filters but never repeats rows.
- $\forall$ is the same as "there is no row that fails", and it must be written with $\Rightarrow$ so that unrelated rows do not spoil it.
- Clauses that are always true (choose the row itself) can be crossed out, and only safe queries with finite answers are allowed.
- That is why a yes/no table, one row per candidate, solves every GATE TRC question.
- Next topic builds on this: SQL, where `EXISTS` and `NOT EXISTS` subqueries are TRC written in English-like words.

### Quick self-check
1. Is $\{\, t \mid \neg (t \in \text{Student}) \,\}$ safe?

   **Answer:** No. Infinitely many rows are not in Student.
2. Rewrite $\forall s\,(P(s))$ using $\exists$.

   **Answer:** $\neg \exists s\,(\neg P(s))$.
3. How many tuples: $\{\, t \mid t \in \text{Student} \land t[dept] = \text{'CS'} \,\}$?

   **Answer:** 2 (Asha and Meena).

## SQL

### The big idea
**SQL (Structured Query Language)** is the language real databases understand. You write `SELECT ... FROM ... WHERE ...`, and the database returns a result table.

GATE mostly asks: "how many rows does this query return?" To answer, you trace the query by hand in the right order.

### Before you start
**Relational algebra (see topic: Relational Algebra).** SQL is RA written in English-like words. `WHERE` is selection $\sigma$, the column list after `SELECT` is projection $\pi$, and two tables in `FROM` is the cross product $\times$.

**EXISTS and NOT EXISTS (see topic: Tuple Relational Calculus).** "Is there at least one matching row?" is $\exists$. SQL writes it as `EXISTS (subquery)`.

**Average.** The average (mean) of some numbers is their sum divided by how many there are. *Example:* the average of 60, 70, 80 is $(60 + 70 + 80) / 3 = 210 / 3 = 70$.

**Max and min.** $\max(S)$ is the biggest value in a set S, and $\min(S)$ is the smallest. For $S = \{85, 60, 75\}$, $\max = 85$ and $\min = 60$.

**Strict and non-strict comparisons.** $x > 5$ (strict) is false for $x = 5$. $x \ge 5$ (non-strict) is true for $x = 5$. Many GATE traps use this difference.

**Set vs bag.** A set has no repeats (RA tables). A bag (also called a multiset) can have repeats, like a shopping bag with two identical soaps. SQL results are bags.

### Intuition
Imagine the college office clerk with our three registers. You hand over a request slip:

```sql
SELECT name FROM Student WHERE dept = 'CS';
```

The clerk does the work in a fixed order, not in the order you wrote it:

1. **FROM**: take out the Student register.
2. **WHERE**: cross out every row that is not CS.
3. **SELECT**: copy only the name column onto a new sheet.

| name |
|---|
| Asha |
| Meena |

For bigger requests, the clerk may also **group** rows into piles (GROUP BY), throw away some piles (HAVING), and finally sort (ORDER BY).

> **Intuition:** WHERE removes single rows. GROUP BY makes piles. HAVING removes whole piles. SELECT decides what to write for each row or pile.

A big difference from relational algebra: SQL keeps **duplicates** unless you write `DISTINCT`. A SQL result is a **bag** (a set that allows repeats).

```sql
SELECT dept FROM Student;            -- 4 rows: CS, EE, CS, ME
SELECT DISTINCT dept FROM Student;   -- 3 rows: CS, EE, ME
```

### Words you need
- **Clause**: one part of a query, like `WHERE ...`.
- **Aggregate function**: turns many values into one: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`. *Example:* `AVG(marks)`.
- **GROUP BY**: makes one group per distinct value. *Example:* `GROUP BY sid` makes one pile per student.
- **HAVING**: a filter on groups, used after GROUP BY. *Example:* `HAVING COUNT(*) >= 2`.
- **NULL**: "value unknown or missing". It is not zero and not empty text.
- **Subquery**: a query inside another query.
- **Scalar subquery**: a subquery that returns exactly one value. *Example:* `(SELECT MAX(marks) FROM Enroll)`.
- **Correlated subquery**: a subquery that uses a column of the outer row, so it is run again for every outer row.
- **Derived table**: a subquery written in `FROM`, used like a table. It must have a name (alias).
- **Alias**: a short nickname. *Example:* `Enroll AS E` or `Enroll E`.

### Formulas, explained
**Order of evaluation**

$$\texttt{FROM} \to \texttt{WHERE} \to \texttt{GROUP BY} \to \texttt{HAVING} \to \texttt{SELECT} \to \texttt{DISTINCT} \to \texttt{ORDER BY}$$

- **Read it as:** first get the tables, then filter rows, then group, then filter groups, then pick columns, then remove repeats, then sort.
- **Symbols:** each arrow means "then".
- **Why it makes sense:** you cannot filter groups before groups exist. That is why aggregates like `COUNT(*)` are allowed in HAVING but not in WHERE.
- **Use it when:** tracing any query by hand.

**Join written with WHERE**

$$\texttt{FROM R, S WHERE R.a = S.a} \;\equiv\; \sigma_{R.a = S.a}(R \times S)$$

- **Read it as:** listing two tables makes all pairs; the WHERE condition keeps the matching pairs.
- **Symbols:** $\equiv$ = "means the same as".
- **Why it makes sense:** it is exactly the theta join from relational algebra.
- **Use it when:** you see two tables in FROM.

**Aggregates and NULL**

$$\texttt{COUNT(*)} = \text{all rows}, \quad \texttt{COUNT(col)} = \text{rows where col is not NULL}, \quad \texttt{AVG(col)} = \frac{\texttt{SUM(col)}}{\texttt{COUNT(col)}}$$

- **Read it as:** COUNT(*) counts every row. All other aggregates skip NULLs.
- **Symbols:** `col` = a column name, `*` = "the whole row".
- **Why it makes sense:** an unknown mark cannot be added to a total, so it is left out.
- **Use it when:** a table has NULL and the query uses aggregates.

**Comparisons with NULL**

$$\text{NULL} > 50 \;\to\; \text{UNKNOWN}, \qquad \texttt{WHERE} \text{ keeps only TRUE rows}$$

- **Read it as:** any comparison with NULL is "unknown", and unknown rows are dropped.
- **Symbols:** UNKNOWN = a third truth value, besides TRUE and FALSE.
- **Why it makes sense:** if a mark is unknown, we cannot say it is above 50.
- **Use it when:** NULL appears in a WHERE column.

**ALL and ANY**

$$x > \texttt{ALL}(S) \iff x > \max(S), \qquad x > \texttt{ANY}(S) \iff x > \min(S)$$

- **Read it as:** "greater than all" means greater than the biggest. "Greater than any" means greater than at least one, so greater than the smallest.
- **Symbols:** $S$ = the set of values returned by the subquery.
- **Why it makes sense:** to beat everyone in a race, you must beat the fastest. To beat someone, beating the slowest is enough.
- **Use it when:** you see ALL or ANY. Special case: if $S$ is empty, `> ALL` is TRUE and `> ANY` is FALSE.

### Where the formulas come from
**Why the evaluation order is FROM, WHERE, GROUP BY, HAVING, SELECT.**

1. Every later step needs something that an earlier step produces. So the order is forced, not chosen.
2. WHERE tests a column of a row, so the rows must exist first. They come from FROM.
3. GROUP BY makes piles of rows. It should pile only the rows that passed WHERE, so it comes after WHERE.
4. HAVING tests a whole pile, like `COUNT(*) >= 2`. A pile exists only after GROUP BY, so HAVING comes after it.
5. SELECT writes one output line per row or per pile, so it needs the final piles. It comes after HAVING.
6. DISTINCT removes repeated output lines, so it needs the output lines from SELECT. ORDER BY sorts the final lines, so it is last.
7. This also explains the rule "no aggregates in WHERE": when WHERE runs, there are no piles yet to count.

**Why a two-table FROM is a join.**

1. `FROM Student S, Enroll E` makes every pair of rows: $4 \times 7 = 28$ pairs, exactly like $\text{Student} \times \text{Enroll}$.
2. `WHERE S.sid = E.sid` keeps only pairs about the same student. That is a selection $\sigma$.
3. So the query is $\sigma_{S.sid = E.sid}(\text{Student} \times \text{Enroll})$, which is the theta join from Relational Algebra.

**Why AVG skips NULL (and why it is SUM / COUNT(col)).**

1. Marks: 85, 70, 90, 60, 75, 88, 65 and one NULL. 
2. SUM can only add known numbers: $85 + 70 + 90 + 60 + 75 + 88 + 65 = 533$.
3. If we divided by all 8 rows, we would be treating the unknown mark as 0, which is a false fact.
4. So we divide by the 7 known marks: $533 / 7 \approx 76.14$. That is $\texttt{SUM(col)} / \texttt{COUNT(col)}$, because COUNT(col) counts only the non-NULL values.

**Why a comparison with NULL is UNKNOWN.**

1. Ravi's mark is NULL. Is it $> 50$? It might be 40 (no) or 90 (yes). We cannot say.
2. So SQL uses a third answer, UNKNOWN.
3. WHERE keeps a row only when it is sure (TRUE). So the row is dropped. Even `marks = NULL` is UNKNOWN; you must write `marks IS NULL`.

**Why $x > \texttt{ALL}(S) \iff x > \max(S)$.**

1. Let $S = \{85, 60, 75\}$. "x > ALL" means $x > 85$ and $x > 60$ and $x > 75$.
2. If $x > 85$, then $x$ is also bigger than 60 and 75, because 85 is the biggest. So one test, $x > 85$, does all three.
3. If $x \le 85$, the test $x > 85$ already fails. So "$> \text{ALL}$" is exactly "$> \max$".

**Why $x > \texttt{ANY}(S) \iff x > \min(S)$.**

1. "x > ANY" means $x > 85$ or $x > 60$ or $x > 75$: at least one must be true.
2. The easiest one to pass is $x > 60$, because 60 is the smallest.
3. If $x > 60$, at least one test passes. If $x \le 60$, then $x$ is not bigger than any value. So "$> \text{ANY}$" is exactly "$> \min$".

**Why the empty-set cases flip.**

1. If $S$ is empty, "x is bigger than every value in S" has no value to fail against, so it is TRUE (like "every student in an empty class passed").
2. "x is bigger than at least one value in S" needs one value to exist. There is none, so it is FALSE.

### Examples
We use the running tables Student, Course and Enroll.

**Example 1 (easy):** a join with a filter.

```sql
SELECT S.name, E.marks
FROM Student S, Enroll E
WHERE S.sid = E.sid AND E.cid = 'C1';
```

1. Pair each Enroll row with its student (7 matching pairs).
2. Keep cid = C1: (S1, 85), (S2, 60), (S3, 75).
3. Write name and marks.

| name | marks |
|---|---|
| Asha | 85 |
| Ravi | 60 |
| Meena | 75 |

**Result:** 3 rows.

**Example 2 (medium):** GROUP BY and HAVING.

```sql
SELECT sid, COUNT(*) AS n, AVG(marks) AS avg_marks
FROM Enroll
GROUP BY sid;
```

1. S1: 85, 70, 90. Count 3. Sum $85 + 70 + 90 = 245$. Average $245 / 3 = 81.67$.
2. S2: 60. Count 1. Average 60.
3. S3: 75, 88. Count 2. Sum $75 + 88 = 163$. Average $163 / 2 = 81.5$.
4. S4: 65. Count 1. Average 65.

| sid | n | avg_marks |
|---|---|---|
| S1 | 3 | 81.67 |
| S2 | 1 | 60 |
| S3 | 2 | 81.5 |
| S4 | 1 | 65 |

Now add `HAVING COUNT(*) >= 2`. Piles with fewer than 2 rows are thrown away:

| sid | n | avg_marks |
|---|---|---|
| S1 | 3 | 81.67 |
| S3 | 2 | 81.5 |

**Result:** 4 rows without HAVING, 2 rows with it.

**Example 3 (medium):** a scalar subquery.

```sql
SELECT sid, cid FROM Enroll
WHERE marks > (SELECT AVG(marks) FROM Enroll);
```

1. Inner query: sum $= 85 + 70 + 90 + 60 + 75 + 88 + 65 = 533$. Average $= 533 / 7 \approx 76.14$.
2. Outer query: marks above 76.14 are 85, 90 and 88.

| sid | cid |
|---|---|
| S1 | C1 |
| S1 | C3 |
| S3 | C3 |

**Result:** 3 rows.

**Example 4 (medium):** ALL.

```sql
SELECT sid, cid FROM Enroll
WHERE marks > ALL (SELECT marks FROM Enroll WHERE cid = 'C1');
```

1. C1 marks are {85, 60, 75}.
2. "Greater than all" means greater than the max, 85.
3. Only 90 and 88 qualify.

| sid | cid |
|---|---|
| S1 | C3 |
| S3 | C3 |

**Result:** 2 rows.

**Example 5 (medium):** NULL. Suppose we add the row (S2, C2, NULL) because Ravi's Python mark is not out yet.

1. `SELECT COUNT(*) FROM Enroll` gives 8.
2. `SELECT COUNT(marks) FROM Enroll` gives 7.
3. `SELECT AVG(marks) FROM Enroll` stays $533 / 7 \approx 76.14$, because the NULL is skipped.
4. `SELECT sid FROM Enroll WHERE marks < 100` does not return the new row, because NULL < 100 is UNKNOWN.

**Result:** 8, 7, 76.14, and 7 rows for the last query.

**Example 6 (GATE level):** a correlated subquery with ties.

```sql
SELECT sid FROM Student A
WHERE (SELECT COUNT(*) FROM Student B WHERE B.age > A.age) < 2;
```

1. For each student A, count students strictly older than A.
2. Keep A if that count is less than 2. The table below does this for every A.

| sid | age | older students | count | count < 2? |
|---|---|---|---|---|
| S1 | 20 | S2 (21), S3 (22) | 2 | no |
| S2 | 21 | S3 (22) | 1 | yes |
| S3 | 22 | none | 0 | yes |
| S4 | 20 | S2, S3 | 2 | no |

**Result:** 2 rows (S2, S3). S1 and S4 have the same age. A tie is not "older", so they do not count each other.

**Example 7 (GATE level):** a derived table. Show each enrollment with its class size.

```sql
SELECT E.sid, E.cid, C.cnt
FROM Enroll E,
     (SELECT cid, COUNT(*) AS cnt FROM Enroll GROUP BY cid) AS C
WHERE E.cid = C.cid;
```

1. The derived table C has one row per course: (C1, 3), (C2, 2), (C3, 2).
2. Join each Enroll row with the C row of the same cid.
3. Every Enroll row finds exactly one partner, so the result has 7 rows.

| sid | cid | cnt |
|---|---|---|
| S1 | C1 | 3 |
| S1 | C2 | 2 |
| S1 | C3 | 2 |
| S2 | C1 | 3 |
| S3 | C1 | 3 |
| S3 | C3 | 2 |
| S4 | C2 | 2 |

**Result:** 7 rows. If the derived table did not include `cid`, the condition `E.cid = C.cid` would be an error.

### Common mistakes
> **Common mistake:** Forgetting that SQL keeps duplicates. Without DISTINCT, `SELECT dept FROM Student` gives 4 rows, not 3.

> **Common mistake:** Counting a value equal to the limit in a strict `>`. In 2025 Q.33, the loan equal to the maximum was not counted.

> **Common mistake:** Treating NULL as 0. `AVG` skips NULL, and `WHERE` drops rows whose comparison is UNKNOWN.

> **Common mistake:** Using an aggregate in WHERE. Filters on groups go in HAVING.

> **Common mistake:** Grouping by a primary key. Every group then has exactly one row, so every COUNT is 1.

### How GATE asks it
- **2024 Q.31** (1 mark, NAT): a two-table join with filters `City = "Jaipur"` and `RaidPoints > 200`. Answer: 3 rows.
- **2025 Q.33** (1 mark, NAT): a scalar `MAX` subquery. Count loans strictly above the SR Nagar maximum. Answer: 3.
- **2026 Q.51** (2 marks, MSQ): which query gives each employee's team size. Only the option that joins a GROUP BY derived table (with TeamID) back on TeamID was correct.
- **2026 Q.60** (2 marks, NAT): a correlated subquery comparing "how many are larger" with "how many are smaller". Ties counted as neither. Answer: 3.

> **GATE tip:** For a correlated subquery, make a table with one row per outer row and one column per subquery value. Then apply the condition.

### Summary
- First SQL takes the tables in FROM; two tables there means all pairs, and WHERE keeps the matching ones, just like a join in RA.
- Then GROUP BY makes piles, HAVING throws away whole piles, and SELECT writes one line per row or pile.
- This order is forced, because each step needs the result of the step before it.
- SQL keeps duplicates unless you write DISTINCT, and NULL means "unknown", so aggregates skip it and comparisons with it are UNKNOWN.
- "> ALL" means "bigger than the max" and "> ANY" means "bigger than the min", because one comparison does the work of all.
- That is why tracing a query by hand, one step and one middle table at a time, answers every GATE row-count question.
- Next topic builds on this: Integrity Constraints & Keys, which decide which rows a table is allowed to hold.

### Quick self-check
1. `SELECT COUNT(DISTINCT cid) FROM Enroll` returns what?

   **Answer:** 3 (C1, C2, C3).
2. `SELECT sid FROM Enroll WHERE marks > ANY (SELECT marks FROM Enroll WHERE cid = 'C2')`. How many rows?

   **Answer:** C2 marks are {70, 65}, so the condition is marks > 65. Rows: 85, 70, 90, 75, 88. That is 5 rows (S1 three times, S3 twice).
3. Which runs first, HAVING or SELECT?

   **Answer:** HAVING.

## Integrity Constraints & Keys

### The big idea
A **key** is a column (or set of columns) that identifies each row uniquely. **Integrity constraints** are rules the DBMS enforces so that the data always stays sensible.

For example: "no two students have the same sid" and "every Enroll row must point to a real student". GATE asks you to find or count keys and to decide which operations can break a rule.

### Before you start
**Tables from the ER Model (see topic: ER Model).** Student(sid, name, dept, age), Course(cid, title, credits) and Enroll(sid, cid, marks). Enroll was made from the M:N relationship, and its sid and cid columns point to Student and Course.

**Subsets of a set.** A subset is any selection of items from a set, including none and all. The set {A, B} has 4 subsets: {}, {A}, {B}, {A, B}.

**Powers of 2.** $2^n$ means 2 multiplied by itself $n$ times: $2^3 = 2 \times 2 \times 2 = 8$. Also $2^0 = 1$ and $2^1 = 2$.

**Why a set of n items has $2^n$ subsets.** For each item you make one yes/no choice: "in" or "out". With 3 items there are $2 \times 2 \times 2 = 8$ ways to choose. So 3 items have $2^3 = 8$ subsets.

**Counting with overlap (inclusion-exclusion).** In a class, 10 play cricket, 8 play music, and 3 do both. Students doing at least one: $10 + 8 - 3 = 15$. We subtract 3 because those students were counted in both groups.

**NULL (see topic: SQL).** NULL means "value unknown or missing".

### Intuition
Think of your Aadhaar number. No two people share it, so it identifies you. Your name does not, because many people are called Ravi. In a table, the Aadhaar-like column is a **key**.

Now think of a train ticket. It carries a train number, and that number must belong to a real train. In databases, this rule is called a **foreign key**: a value in one table must exist in another table.

In our running example:

- `Student.sid` is the key of Student.
- (sid, cid) together is the key of Enroll. One student appears many times, and one course appears many times, but each pair appears once.
- `Enroll.sid` is a **foreign key** that refers to `Student.sid`. `Enroll.cid` refers to `Course.cid`.

> **Intuition:** The **parent** table (Student) is the list of real people. The **child** table (Enroll) points to them. Trouble happens only when a child points to someone who is not in the parent list.

When can the pointing break?

- **Insert a child row** with a sid that does not exist. Broken.
- **Delete a parent row** that children still point to. Broken (the children are left "dangling").
- **Insert a parent row**: a new student with no enrollments harms nobody. Safe.
- **Delete a child row**: removing an enrollment harms nobody. Safe.

### Words you need
- **Superkey**: any set of columns whose values are unique for every row. *Example:* {sid}, {sid, name}, {sid, age}.
- **Candidate key**: a *minimal* superkey: remove any column and it stops being unique. *Example:* {sid}. But {sid, name} is not minimal.
- **Primary key**: the candidate key the designer chooses. It must be unique and **NOT NULL**. *Example:* sid.
- **Alternate key**: a candidate key that was not chosen. *Example:* if Student also had a unique `email`, it would be an alternate key.
- **Prime attribute**: a column that is part of some candidate key. *Example:* sid and cid in Enroll.
- **Foreign key**: column(s) in a child table whose values must appear in the parent's key, or be NULL. *Example:* `Enroll.sid`.
- **Domain constraint**: each value has the right type and range. *Example:* marks between 0 and 100.
- **Entity integrity**: a primary key column can never be NULL.
- **Referential integrity**: every non-NULL foreign key value exists in the parent table.
- **ON DELETE CASCADE**: when a parent row is deleted, its child rows are deleted too.

### Formulas, explained
**Superkey count with one candidate key**

$$\#\text{superkeys} = 2^{\,n-k}$$

- **Read it as:** the number of superkeys is 2 to the power (n minus k).
- **Symbols:** $n$ = total number of columns, $k$ = number of columns in the only candidate key.
- **Why it makes sense:** a superkey must contain all $k$ key columns. Each of the other $n - k$ columns can be "in" or "out": 2 choices each.
- **Use it when:** a relation has exactly one candidate key.

**Superkey count with two candidate keys (inclusion-exclusion)**

$$\#\text{superkeys} = N(K_1) + N(K_2) - N(K_1 \cup K_2), \qquad N(K) = 2^{\,n - |K|}$$

- **Read it as:** superkeys containing key 1, plus superkeys containing key 2, minus those containing both.
- **Symbols:** $N(K)$ = number of column sets that contain all columns of $K$; $|K|$ = number of columns in $K$; $K_1 \cup K_2$ = all columns of both keys.
- **Why it makes sense:** sets containing both keys are counted twice, so we subtract them once. It is like counting students in cricket or music.
- **Use it when:** there are two candidate keys.

**Referential integrity rule**

$$\text{for every child row } c:\; c.\text{FK} \text{ is NULL, or } c.\text{FK} \in \pi_{\text{PK}}(\text{Parent})$$

- **Read it as:** each foreign key value is either NULL or one of the parent's key values.
- **Symbols:** FK = foreign key column, PK = parent's primary key, $\pi_{\text{PK}}(\text{Parent})$ = the list of all parent key values.
- **Why it makes sense:** a pointer must point to something real, or point nowhere (NULL).
- **Use it when:** deciding whether an insert or delete is allowed.

**Which operations can violate a foreign key**

| Operation | Can it violate the FK? |
|---|---|
| Insert into child | Yes (value may not exist in parent) |
| Delete from child | Never |
| Update child FK | Yes |
| Insert into parent | Never |
| Delete from parent | Yes (children left dangling) |
| Update parent key | Yes |

### Where the formulas come from
**Why we need keys at all (the problem they solve).**

1. Suppose Student had no key and two rows were (S2, Ravi, EE, 21) and (S2, Ravi, ME, 21).
2. Now Enroll row (S2, C1, 60) points to "S2". Which Ravi got 60, the EE one or the ME one? We cannot tell.
3. A key forbids such duplicates, so every pointer reaches exactly one row. That is the whole purpose of a key.

**Why a candidate key must be minimal.**

1. {sid, name} is unique, because {sid} alone is already unique.
2. But "name" adds nothing: remove it and the set is still unique.
3. A key should carry no useless columns, because every foreign key copying it would carry them too. So we call only the minimal ones "candidate keys".

**Why a primary key cannot be NULL (entity integrity).**

1. If two students both had sid = NULL, we could not tell them apart, since "unknown" cannot be compared with "unknown".
2. A child row pointing to NULL would point to nobody in particular.
3. So the column used to identify rows must always have a real value.

**Deriving $2^{n-k}$ (one candidate key).**

1. Take R(A, B, C, D, E) with the only key {A, B}. So $n = 5$ and $k = 2$.
2. A set of columns is a superkey exactly when it contains A and B. Because if it contains A and B it is unique (adding columns to a unique set keeps it unique), and if it misses A or B, it cannot contain the only key, so it is not unique.
3. So A and B are fixed as "in". The other $5 - 2 = 3$ columns C, D, E are free.
4. Each free column is "in" or "out": $2 \times 2 \times 2 = 2^3 = 8$ choices.
5. In general: fix the $k$ key columns, and each of the $n - k$ others has 2 choices, so $2^{n-k}$.

**Deriving the two-key formula.**

1. Take R(A, B, C, D) with keys {A} and {B, C}. A superkey contains {A}, or contains {B, C}, or both.
2. Sets containing A: fix A, the other 3 are free: $2^{4-1} = 8$. This is $N(K_1)$.
3. Sets containing B and C: fix B, C, the other 2 are free: $2^{4-2} = 4$. This is $N(K_2)$.
4. Adding $8 + 4$ counts sets like {A, B, C} twice, because they contain both keys.
5. Sets containing both keys contain A, B and C, so only D is free: $2^{4-3} = 2$. This is $N(K_1 \cup K_2)$.
6. Subtract them once: $8 + 4 - 2 = 10$. This is the cricket-and-music rule from "Before you start".

**Deriving the "which operations break a foreign key" table.**

1. The rule is: every child FK value must be in the parent's key list.
2. The rule can break only if the child list gains a new value, or the parent list loses a value.
3. Insert into child: adds a new value to the child list. It may be missing in the parent, so it can break.
4. Delete from child: removes a value from the child list. Fewer pointers cannot create a bad pointer, so it never breaks.
5. Insert into parent: the parent list grows. Every old pointer still finds its target, so it never breaks.
6. Delete from parent: the parent list shrinks. A child may still point to the removed row, so it can break.
7. An update is a delete followed by an insert, so updating a child FK or a parent key can break the rule.

### Examples
**Example 1 (easy):** foreign keys in our college.

1. Try to insert (S5, C1, 70) into Enroll. Student has no S5, so it is **rejected**: referential integrity is broken.
2. Now delete student S2 from Student. Enroll still has (S2, C1, 60).
3. Without CASCADE: the delete is **rejected**.
4. With `ON DELETE CASCADE`: S2's Enroll rows are deleted too. Enroll becomes the table below.
5. Inserting a new student (S5, Divya, CS, 19) into Student is always safe.

| sid | cid | marks |
|---|---|---|
| S1 | C1 | 85 |
| S1 | C2 | 70 |
| S1 | C3 | 90 |
| S3 | C1 | 75 |
| S3 | C3 | 88 |
| S4 | C2 | 65 |

**Result:** the child insert and the parent delete are the risky operations.

**Example 2 (medium):** count superkeys. R(A, B, C, D, E) has only one candidate key {A, B}.

1. $n = 5$, $k = 2$.
2. $2^{5-2} = 2^3 = 8$ superkeys.
3. They are AB, ABC, ABD, ABE, ABCD, ABCE, ABDE, ABCDE. Count: 8.

**Result:** 8 superkeys.

**Example 3 (GATE level):** two keys of different sizes. R(A, B, C, D) has candidate keys {A} and {B, C}. How many superkeys?

1. Containing A: the other 3 columns are free, so $2^{4-1} = 2^3 = 8$.
2. Containing B and C: the other 2 columns are free, so $2^{4-2} = 2^2 = 4$.
3. Containing A, B and C: only D is free, so $2^{4-3} = 2^1 = 2$.
4. Total $= 8 + 4 - 2 = 10$.
5. Check by listing the ones without A: {B, C} and {B, C, D}. That is 2. Add the 8 with A: 10.

**Result:** 10 superkeys.

**Example 4 (GATE level):** read the DDL.

```sql
CREATE TABLE Course (cid CHAR(3) PRIMARY KEY, title VARCHAR(30));
CREATE TABLE Enroll (
  sid CHAR(3), cid CHAR(3), marks INT,
  PRIMARY KEY (sid, cid),
  FOREIGN KEY (cid) REFERENCES Course(cid));
```

Which are true?

1. (a) `cid` alone is a candidate key of Enroll. **False**: C1 appears 3 times.
2. (b) `marks` can be NULL. **True**: no NOT NULL rule.
3. (c) `cid` can be NULL in Enroll. **False**: it is part of the primary key.
4. (d) `cid` can be NULL in Course. **False**: it is the primary key.

**Result:** only (b) is true.

### Common mistakes
> **Common mistake:** Thinking a foreign key column is unique. Many Enroll rows have cid = C1. A foreign key is usually not a key of its own table.

> **Common mistake:** Thinking any column without a key is NOT NULL. Only PRIMARY KEY or NOT NULL forbids NULL.

> **Common mistake:** Mixing up parent and child. The table that *contains* the foreign key is the child. Inserting into the child and deleting from the parent are the risky operations.

> **Common mistake:** Calling {sid, name} a candidate key. It is a superkey, but not minimal.

### How GATE asks it
- **2025 Q.56** (2 marks, MSQ): read SQL DDL for Person and Customer. A foreign key column (aadhaar in Customer) is not a candidate key. A column with no constraint (phone) can be NULL. A primary key (aadhaar in Person) is a candidate key and cannot be NULL.
- **2026 Q.26** (1 mark, MSQ): which operations can never violate a foreign key? Insert into the parent and delete from the child.

> **GATE tip:** Draw an arrow from child to parent. Anything that adds a new arrow tail (child insert) or removes an arrow head (parent delete) is risky.

### Summary
- First we need a way to point at exactly one row; a key gives that, because its value never repeats.
- Any unique set of columns is a superkey, and the minimal ones are candidate keys; one of them becomes the primary key, which can never be NULL.
- A superkey must contain a key, and every other column is free to be in or out, so one key of size $k$ gives $2^{n-k}$ superkeys.
- With two keys we add both counts and subtract the sets counted twice.
- A foreign key must point to a real parent row, so only a child insert or a parent delete (or updates) can break it.
- That is why GATE questions on keys reduce to counting yes/no choices and drawing child-to-parent arrows.
- Next topic builds on this: Functional Dependencies & Normal Forms, which find keys from rules and fix badly designed tables.

### Quick self-check
1. R(A, B, C) has the only candidate key {A}. How many superkeys?

   **Answer:** $2^{3-1} = 4$: A, AB, AC, ABC.
2. Can deleting a row from Enroll ever violate a foreign key?

   **Answer:** No. Enroll is the child.
3. Can a primary key column be NULL?

   **Answer:** No (entity integrity).

## Functional Dependencies & Normal Forms

### The big idea
A **functional dependency (FD)** $X \to Y$ says: "if you know X, you know Y". FDs help us find keys and spot repeated (redundant) data.

**Normalization** splits a badly designed table into smaller tables so that each fact is stored only once. The normal forms (1NF, 2NF, 3NF, BCNF) are levels of "how clean" a table is.

### Before you start
**Keys (see topic: Integrity Constraints & Keys).** A superkey is a set of columns whose values never repeat. A candidate key is a minimal superkey. A prime attribute is a column inside some candidate key.

**Joins (see topic: Relational Algebra).** $R_1 \bowtie R_2$ glues rows of two tables that agree on their common columns.

**Set symbols.** For sets of columns:

- $X \subseteq Y$: every column of X is also in Y. $\{A\} \subseteq \{A, B\}$.
- $X \cup Y$: all columns of both. $\{A, B\} \cup \{B, C\} = \{A, B, C\}$.
- $X \cap Y$: columns in both. $\{A, B\} \cap \{B, C\} = \{B\}$.
- A **proper part** (proper subset) of X is a subset that is smaller than X. {A} is a proper part of {A, B}.

**Short names for column sets.** In FD questions, $AB$ means the set {A, B}, not A times B. So $AB \to C$ means "A and B together decide C".

**"Decide" means "a function".** A function gives exactly one output for each input, like "roll number gives one name". $X \to Y$ says Y is a function of X: the same X can never come with two different Y values.

**Anomaly.** An anomaly is a strange, unwanted effect. In databases it means an insert, update or delete that goes wrong because of a bad table design.

### Intuition
Suppose the office keeps everything in one big sheet, **EnrollFull**:

| sid | name | cid | title | marks |
|---|---|---|---|---|
| S1 | Asha | C1 | DBMS | 85 |
| S1 | Asha | C2 | Python | 70 |
| S1 | Asha | C3 | Maths | 90 |
| S2 | Ravi | C1 | DBMS | 60 |
| S3 | Meena | C1 | DBMS | 75 |
| S3 | Meena | C3 | Maths | 88 |
| S4 | Kiran | C2 | Python | 65 |

Look at the problems:

- "Asha" is written 3 times. "DBMS" is written 3 times. This is **redundancy**.
- If Asha changes her name, we must change 3 rows. Miss one and the data disagrees. This is an **update anomaly**.
- We cannot add a new course that has no students yet, because (sid, cid) is the key and sid would be empty. This is an **insertion anomaly**.
- If Ravi leaves, deleting his only row also deletes the fact that he exists. This is a **deletion anomaly**.

Why does this happen? Because **sid → name** and **cid → title** hold, but the key is (sid, cid). The name depends on only part of the key.

The fix is to split the sheet into Student(sid, name), Course(cid, title) and Enroll(sid, cid, marks). This is exactly our running example.

> **Intuition:** An FD is a "lookup rule". Your roll number decides your name, like a phone number decides the person you call. A good table stores each lookup rule in its own place.

### Words you need
- **FD** $X \to Y$: any two rows that agree on X must agree on Y. *Example:* sid → name.
- **Trivial FD**: Y is already inside X. *Example:* {sid, name} → name. It says nothing new.
- **Closure** $X^+$: all columns that X decides, directly or through a chain. *Example:* if A → B and B → C, then $A^+ = \{A, B, C\}$.
- **Prime attribute**: a column inside some candidate key. **Non-prime**: a column in no candidate key.
- **Partial dependency**: a non-prime column depends on *part* of a candidate key. *Example:* sid → name when the key is (sid, cid).
- **Transitive dependency**: a non-prime column depends on another non-key column. *Example:* sid → dept and dept → hod_name.
- **Decomposition**: splitting a table R into smaller tables $R_1, R_2, \dots$.
- **Lossless join**: joining the pieces gives back exactly the original table, no fake rows.
- **Dependency preserving**: every FD can still be checked inside a single piece, without joining.

Data can **disprove** an FD but cannot **prove** it. In Student, does age → dept hold? Age 20 appears with CS (S1) and ME (S4), so no.

Does name → sid hold? It is true in today's data, but a second Ravi could join tomorrow. FDs come from the meaning of the data.

### Formulas, explained
**Armstrong's axioms**

$$\text{Reflexivity: } Y \subseteq X \Rightarrow X \to Y \qquad \text{Augmentation: } X \to Y \Rightarrow XZ \to YZ \qquad \text{Transitivity: } X \to Y,\ Y \to Z \Rightarrow X \to Z$$

- **Read it as:** a set decides its own parts; adding the same columns on both sides keeps an FD true; FDs chain.
- **Symbols:** $X, Y, Z$ = sets of columns; $XZ$ = X and Z together; $\subseteq$ = "is inside".
- **Why it makes sense:** if roll number decides department, and department decides building, then roll number decides building.
- **Use it when:** proving that an FD follows. Derived rules: **union** ($X \to Y$ and $X \to Z$ give $X \to YZ$) and **decomposition** ($X \to YZ$ gives $X \to Y$).

**Attribute closure**

$$X \to Y \text{ follows from } F \iff Y \subseteq X^+$$

- **Read it as:** X decides Y exactly when Y is inside the closure of X.
- **Symbols:** $F$ = the given set of FDs, $X^+$ = closure of X.
- **Why it makes sense:** it is like a chain of WhatsApp forwards. Keep adding everyone who receives the message.
- **Use it when:** "which FDs can be derived?" or "is X a key?" To compute $X^+$: start with X, add the right side of any FD whose left side is fully inside your set, and repeat until nothing changes.

**Superkey and candidate key test**

$$X \text{ is a superkey} \iff X^+ = \text{all columns}$$

- **Read it as:** X is a superkey when its closure contains every column. It is a candidate key if, also, no smaller part of X has this property.
- **Symbols:** $X^+$ = closure of X.
- **Why it makes sense:** if X decides every column, two rows with the same X would be the same row, so X never repeats.
- **Use it when:** finding keys.

**Key-finding shortcut**

$$\text{columns that never appear on any right side} \subseteq \text{every candidate key}$$

- **Read it as:** a column that nothing decides must be in every key.
- **Symbols:** "right side" = the part after the arrow in each FD.
- **Why it makes sense:** no FD can produce that column, so the key must contain it from the start.
- **Use it when:** finding **all** candidate keys. Start with these columns, then add one column at a time.

**Normal form conditions**

| Normal form | Condition (for every nontrivial FD $X \to A$) |
|---|---|
| 1NF | Every cell holds one atomic value |
| 2NF | 1NF, and no non-prime A depends on a proper part of a candidate key |
| 3NF | X is a superkey, **or** A is prime |
| BCNF | X is a superkey (no exception) |

- **Read it as:** each level is stricter. BCNF $\Rightarrow$ 3NF $\Rightarrow$ 2NF $\Rightarrow$ 1NF.
- **Symbols:** atomic = one single value, not a list.
- **Why it makes sense:** the ideal is "only keys decide things" (BCNF). 3NF allows one exception: an FD whose right side is part of a key.
- **Use it when:** "what is the highest normal form?" Find all keys first, then check every FD.

**Lossless join test (two pieces)**

$$R_1 \cap R_2 \to R_1 \quad \text{or} \quad R_1 \cap R_2 \to R_2$$

- **Read it as:** the common columns must be a key of at least one piece.
- **Symbols:** $R_1 \cap R_2$ = columns shared by both pieces.
- **Why it makes sense:** then each row of one piece joins with at most one row of the other, so no fake rows appear.
- **Use it when:** checking a decomposition.

**Dependency preservation**

$$(F_1 \cup F_2 \cup \dots \cup F_k)^+ = F^+$$

- **Read it as:** the FDs that live inside the pieces, taken together, still imply all the original FDs.
- **Symbols:** $F_i$ = FDs whose columns are all inside piece $R_i$; $F^+$ = everything implied by $F$.
- **Why it makes sense:** if an FD's columns are split across tables, the DBMS must **join** the tables to check it on every insert.
- **Use it when:** "is this decomposition dependency preserving?"

```python
def closure(X, fds):          # fds: list of (lhs_set, rhs_set)
    res = set(X)
    changed = True
    while changed:
        changed = False
        for lhs, rhs in fds:
            if lhs <= res and not rhs <= res:
                res |= rhs
                changed = True
    return res
```

### Where the formulas come from
Every formula here comes from the definition of an FD: **two rows that agree on X must agree on Y.** We prove each one by imagining two rows.

**Why reflexivity holds ($Y \subseteq X \Rightarrow X \to Y$).**

1. Take X = {sid, name} and Y = {name}.
2. If two rows agree on sid and name, they surely agree on name, because name is one of the columns they agree on.
3. So any set decides its own parts. These FDs are "trivial", because they say nothing new.

**Why augmentation holds ($X \to Y \Rightarrow XZ \to YZ$).**

1. Suppose sid → name. Take Z = {cid}.
2. Two rows that agree on {sid, cid} agree on sid, so (by sid → name) they agree on name.
3. They also agree on cid, because cid was part of what they agreed on.
4. So they agree on {name, cid}. That is $\{sid, cid\} \to \{name, cid\}$.

**Why transitivity holds ($X \to Y$ and $Y \to Z$ give $X \to Z$).**

1. Suppose sid → dept and dept → building.
2. Two rows with the same sid have the same dept (first FD).
3. Two rows with the same dept have the same building (second FD).
4. So two rows with the same sid have the same building. That is sid → building.

**Why the closure algorithm is correct.**

1. Start with $X$ in the set, because $X \to X$ (reflexivity).
2. If our set S is decided by X, and some FD $L \to R$ has $L \subseteq S$, then X decides L (a part of S), and L decides R. By transitivity X decides R, so we may add R.
3. We repeat until no FD adds anything. The columns can only grow, and there are finitely many, so the loop must stop.
4. Anything not reached can be shown NOT decided by X (build two rows that agree on $X^+$ and differ everywhere else; they satisfy every FD). The full proof is not needed for GATE.
5. So "$X \to Y$ follows" is the same as "$Y \subseteq X^+$".

**Why "closure = all columns" means superkey.**

1. If $X^+$ is every column, two rows that agree on X agree on every column.
2. Two rows that agree on every column are the same row. A table holds no duplicate rows.
3. So no two different rows share an X value. That is the definition of a superkey.

**Why "never on the right side" columns are in every key.**

1. In $F = \{A \to B,\ B \to C,\ CD \to E\}$, column D never appears on a right side.
2. The closure algorithm adds only right-side columns. So D gets into $X^+$ only if D was in X from the start.
3. A key must reach every column, including D. So every key contains D. The same holds for A.

**Why 2NF exists (the problem it removes).**

1. In EnrollFull, the key is (sid, cid) and sid → name holds.
2. Asha took 3 courses, so her (sid, name) pair appears in 3 rows. The name is copied 3 times, which is the redundancy we saw.
3. The reason: name depends on only **part** of the key. Every row with S1 repeats it, and there are as many such rows as courses.
4. 2NF forbids this partial dependency. Moving (sid, name) to its own table, where sid is the whole key, stores each name once.

**Why 3NF exists (transitive dependency).**

1. Suppose Student(sid, name, dept, hod) with sid → dept and dept → hod. The key is sid, so there is no partial dependency: it is in 2NF.
2. But CS has 2 students (Asha, Meena), so "CS's HOD is Dr. Rao" is written twice.
3. The reason: hod is decided by dept, which is not a key. Every student of CS repeats it.
4. 3NF demands that the left side be a superkey. Split into Student(sid, name, dept) and Dept(dept, hod), and each HOD is stored once.

**Why BCNF removes the 3NF exception, and why 3NF keeps it.**

1. In R(A, B, C) with $AB \to C$ and $C \to A$, the keys are AB and BC. C → A has a non-key left side.
2. 3NF allows it, because A is prime. BCNF does not.
3. To reach BCNF we split into (C, A) and (B, C). Then AB → C has A and B in different tables, so it cannot be checked without a join (see Example 3).
4. So 3NF keeps this small redundancy on purpose, to keep every FD checkable in one table. BCNF removes it but may lose an FD.

**Why the lossless test works ($R_1 \cap R_2$ must be a key of a piece).**

1. Fake rows appear when a row of $R_1$ matches **two or more** rows of $R_2$ on the common columns. Then it pairs with a partner it never had.
2. If the common columns are a key of $R_2$, each value appears in at most one row of $R_2$.
3. So each $R_1$ row matches at most one $R_2$ row, which is exactly its original partner (the one it was cut from).
4. So the join rebuilds each original row once and adds nothing. See Example 2 for a lossy split where B is not a key.

**Why a lost FD forces a join.**

1. To check $AB \to C$ on a new row, the DBMS must look at A, B and C together.
2. If no piece holds all three columns, it must join the pieces first, on every insert. That is slow.
3. So "dependency preserving" means every FD lives inside some piece, or follows from FDs that do.

### Examples
**Example 1 (easy):** R(A, B, C, D, E), $F = \{A \to B,\ B \to C,\ CD \to E\}$. Find the keys and the normal form.

1. Right sides contain B, C, E. **A and D** never appear on a right side, so every key contains A and D.
2. $AD^+$: start {A, D}. A → B adds B. B → C adds C. CD → E adds E. Result {A, B, C, D, E}. All columns.
3. So **AD is the only candidate key**.
4. Prime: A, D. Non-prime: B, C, E.
5. A → B: A is a proper part of the key AD, and B is non-prime. That is a partial dependency. **Not 2NF.**

**Result:** key AD, highest normal form 1NF.

**Example 2 (medium):** a lossy decomposition. Table R(A, B, C) with A → B has rows (1, x, p) and (2, x, q).

1. Split into $R_1(A, B)$ and $R_2(B, C)$. The common column is B.
2. Is B a key of either piece? B = x appears twice in both. No. So the test fails.
3. Check by joining. $R_1$: (1, x), (2, x). $R_2$: (x, p), (x, q). Each $R_1$ row matches both $R_2$ rows, so the join has $2 \times 2 = 4$ rows, shown below.
4. The rows (1, x, q) and (2, x, p) are **fake (spurious)**. The decomposition is **lossy**.
5. Split instead into $R_1(A, B)$ and $R_2(A, C)$. Common column A, and A → AB, so A is a key of $R_1$. **Lossless.**

| A | B | C |
|---|---|---|
| 1 | x | p |
| 1 | x | q |
| 2 | x | p |
| 2 | x | q |

**Result:** splitting on B is lossy; splitting on A is lossless.

**Example 3 (medium):** dependency preservation. R(A, B, C) with $F = \{AB \to C,\ C \to A\}$.

1. Keys: AB and BC (B never appears on a right side; $AB^+$ and $BC^+$ are all columns).
2. C → A breaks BCNF (C is not a superkey), but A is prime, so R is in 3NF.
3. Decompose for BCNF into $R_1(C, A)$ and $R_2(B, C)$. Lossless, because the common column C gives C → CA, a key of $R_1$.
4. But AB → C has A and B in different pieces. It is **not preserved**. To check it, the DBMS must join $R_1$ and $R_2$.

**Result:** R is in 3NF; the BCNF split is lossless but not dependency preserving.

**Example 4 (GATE level):** R(A, B, C, D, E), $F = \{A \to B,\ BC \to D,\ D \to A,\ C \to E\}$. Find all candidate keys and the highest normal form.

1. Right sides: B, D, A, E. **C** never appears on a right side, so C is in every key.
2. $C^+ = \{C, E\}$. Not a key.
3. $AC^+$: A → B gives ABC. BC → D gives ABCD. C → E gives ABCDE. Key.
4. $BC^+$: BC → D gives BCD. D → A gives ABCD. C → E gives ABCDE. Key.
5. $CD^+$: D → A gives ACD. A → B gives ABCD. C → E gives ABCDE. Key.
6. $CE^+ = \{C, E\}$. Not a key.
7. Any other superkey contains C and one of A, B, D, so it is not minimal. **Keys: AC, BC, CD.**
8. Prime: A, B, C, D. Non-prime: E.
9. C → E: C is a proper part of key AC, and E is non-prime. Partial dependency. **Not 2NF.**

**Result:** keys AC, BC, CD; highest normal form 1NF. Without C → E the relation would be in 3NF, because A → B and D → A have prime right sides.

### Common mistakes
> **Common mistake:** Stopping after the first key. GATE often asks for **all** keys. Try every combination built on the "never on the right" columns.

> **Common mistake:** Forgetting minimality. ABC may be a superkey, but if AC is already a key, ABC is not a candidate key.

> **Common mistake:** Using the 3NF escape ("A is prime") for BCNF. BCNF has no escape.

> **Common mistake:** Calling a decomposition lossless just because the pieces cover all columns. The common columns must be a key of one piece.

### How GATE asks it
- **2024 Q.46** (2 marks, MSQ): which FDs follow from F? Compute $VW^+$ and $WX^+$, then check each right side.
- **2025 Q.16** (1 mark): if a decomposition is not dependency preserving, which operation runs more often? **Join**.
- **2025 Q.57** (2 marks, MSQ): keys are A and BC; $E \to DG$ breaks BCNF.
- **2026 Q.17** (1 mark): D never appears on a right side, so every key contains D. Keys AD, ED, CD.

> **GATE tip:** Write the right-side columns first. Whatever is missing must be in every key. This finds all keys in under two minutes.

### Summary
- First we write "X decides Y" as an FD, which means two rows that agree on X must agree on Y.
- Then Armstrong's rules, all proved by imagining two rows, let us chain FDs, and the closure $X^+$ collects everything X decides.
- If $X^+$ is every column, X is a superkey, and columns that never appear on a right side must be in every key.
- Redundancy appears when something other than a whole key decides a column; 2NF removes "part of a key decides", 3NF removes "non-key decides", and BCNF allows only keys on the left.
- We fix a table by splitting it, but the split must be lossless (common columns are a key of one piece) and should keep every FD checkable without a join.
- That is why every GATE question here starts with "find all keys, then check each FD".
- Next topic builds on this: File Organization & Indexing, which stores these clean tables on disk so that rows can be found quickly.

### Quick self-check
1. $F = \{A \to B,\ B \to C\}$. What is $A^+$?

   **Answer:** {A, B, C}.
2. Is every two-column table in BCNF?

   **Answer:** Yes.
3. R(A, B, C) is split into (A, B) and (B, C) with $F = \{B \to C\}$. Lossless?

   **Answer:** Yes. The common column B decides C, so B is a key of (B, C).

## File Organization & Indexing

### The big idea
Tables are stored on disk in fixed-size pieces called **blocks**. Reading a block from disk is slow, so the goal is to find rows by reading as few blocks as possible.

An **index** is an extra structure, like the index at the back of a book, that tells you which block to read. A **B+ tree** is the most common index, and a **hash index** is the fastest for "equal to" searches.

### Before you start
**Tables and keys (see topics: ER Model, Integrity Constraints & Keys).** A table is a list of rows (records). An index is usually built on a key column like sid.

**Bytes.** A byte is the unit of computer storage; one English letter takes about 1 byte. 1 KB is about 1000 bytes (exactly 1024 in computer counting).

**Floor and ceiling.** $\lfloor x \rfloor$ (floor) rounds down to a whole number, and $\lceil x \rceil$ (ceiling) rounds up.

- $\lfloor 4.27 \rfloor = 4$ and $\lceil 4.27 \rceil = 5$.
- For a whole number nothing changes: $\lfloor 5 \rfloor = \lceil 5 \rceil = 5$.

**Powers of 2 and $\log_2$.** $2^{10} = 1024$ means ten 2s multiplied together. The logarithm answers the reverse question: $\log_2 1024$ = "2 to the power what gives 1024?" = 10. So $\log_2 n$ is the number of times you can halve $n$ before reaching 1.

- $\log_2 8 = 3$, because $8 \to 4 \to 2 \to 1$ is 3 halvings.
- $\lceil \log_2 20 \rceil = 5$, because $2^4 = 16 < 20 \le 32 = 2^5$.

**Solving a simple inequality.** To find the biggest whole $p$ with $22p \le 2062$, divide both sides by 22: $p \le 93.7$. The biggest whole number allowed is 93. Dividing by a positive number keeps the $\le$ sign the same way.

**Binary search.** To find a word in a dictionary, open the middle, decide "left half or right half", and repeat. Each step throws away half of what is left.

**Tree words.** A tree is drawn upside down. The top node is the **root**, the bottom nodes are **leaves**, and a node's lower neighbours are its **children**. The **height** is the number of levels.

### Intuition
Think of a library with 1000 shelves.

- If books are placed in any order (a **heap file**), finding one book means walking past every shelf.
- If books are sorted by title (a **sorted file**), you can open the middle shelf, decide left or right, and halve the search each time. This is **binary search**.
- If there is a small catalogue card box that says "titles starting with M are on shelf 412", you first search the small box, then go to one shelf. That box is an **index**.

A **B+ tree** is a catalogue with several levels, like a building directory: floor, then wing, then room. Every search goes from the top (root) down to the bottom level (leaves), and all leaves are at the same depth.

The leaves are also linked left to right, like a chain of shelves. So you can walk along them for a range such as "marks between 70 and 90".

A **hash index** is like the lockers at a gym: locker number = a fixed calculation on your token number. You jump straight to the right locker. But if someone asks "all tokens between 100 and 200", the lockers are not in order, so the hash does not help.

> **Intuition:** Hash = direct jump, good only for "equal to". B+ tree = sorted directory, good for "equal to" and for ranges like "greater than".

### Words you need
- **Block (page)**: the unit read from disk at one time. *Example:* 4096 bytes.
- **Record**: one row stored on disk. *Example:* a Student row of 100 bytes.
- **Blocking factor (bfr)**: how many records fit in one block.
- **Heap file**: records in no order. **Sorted file**: records ordered on a field. **Hashed file**: records placed by a hash of a field.
- **Primary (clustering) index**: an index on the field the file is sorted by. At most one per file.
- **Secondary index**: an index on any other field.
- **Dense index**: one index entry per record. **Sparse index**: one entry per block (only possible on the sort field).
- **Node pointer**: in a B+ tree, points to a child node. **Record pointer**: points to the actual data on disk (only in leaves).
- **Order of a node**: the maximum number of pointers (internal node) or keys (leaf) it can hold.
- **Split**: when a node gets too many keys, it is cut into two nodes.
- **Block access**: one read of one block from disk. GATE measures cost in block accesses.

### Formulas, explained
**Blocking factor and number of blocks**

$$bfr = \left\lfloor \frac{B}{R} \right\rfloor, \qquad b = \left\lceil \frac{r}{bfr} \right\rceil$$

- **Read it as:** records per block = block size divided by record size, rounded down. Blocks needed = number of records divided by bfr, rounded up.
- **Symbols:** $B$ = block size, $R$ = record size, $r$ = number of records, $\lfloor\ \rfloor$ = round down, $\lceil\ \rceil$ = round up.
- **Why it makes sense:** half a record cannot fit in a block, so round down. A half-full last block is still a block, so round up.
- **Use it when:** a question gives sizes in bytes.

**Search cost in block reads**

$$\text{linear search} \approx b, \qquad \text{binary search} = \lceil \log_2 b \rceil, \qquad \text{single-level index} = \lceil \log_2 b_i \rceil + 1$$

- **Read it as:** scanning reads all blocks; binary search on a sorted file halves each time; with an index, binary-search the index blocks, then read 1 data block.
- **Symbols:** $b$ = data blocks, $b_i$ = index blocks.
- **Why it makes sense:** 1024 blocks halve to 1 in 10 steps, because $2^{10} = 1024$.
- **Use it when:** "how many block accesses?"

**Multi-level index or B+ tree search cost**

$$\text{block accesses} = h + 1, \qquad h \approx \lceil \log_{f} N \rceil$$

- **Read it as:** read one node on each of the $h$ levels of the tree, then 1 data block.
- **Symbols:** $h$ = number of index levels (height), $f$ = fan-out (pointers per node), $N$ = number of entries at the bottom level.
- **Why it makes sense:** each level divides the search space by $f$ instead of by 2, so very few levels are needed.
- **Use it when:** a question gives a tree height or a fan-out.

**B+ tree internal node order**

$$p \cdot P + (p - 1) \cdot K \le B$$

- **Read it as:** p node pointers plus (p minus 1) keys must fit in one block. Take the largest whole p.
- **Symbols:** $p$ = number of node pointers, $P$ = node pointer size, $K$ = key size, $B$ = block (node) size.
- **Why it makes sense:** keys sit *between* pointers, like fence posts and gaps: p gaps need p - 1 separators.
- **Use it when:** "maximum pointers in a non-leaf node". Record pointer size is **not** used here.

**B+ tree leaf node order**

$$n \cdot (K + P_r) + P \le B$$

- **Read it as:** n (key, record pointer) pairs plus one next-leaf pointer must fit in a block.
- **Symbols:** $n$ = keys in a leaf, $P_r$ = record pointer size, $P$ = the pointer to the next leaf.
- **Why it makes sense:** each key in a leaf needs its own pointer to the data.
- **Use it when:** "maximum keys in a leaf node".

**B+ tree insertion rules**

$$\text{leaf split: copy up the first key of the right half;} \quad \text{internal split: move up the middle key}$$

- **Read it as:** when a leaf overflows, split it and *copy* its right half's first key into the parent (the key stays in the leaf too). When an internal node overflows, split it and *move* its middle key up (it leaves the node).
- **Symbols:** "overflow" = more keys than the node can hold.
- **Why it makes sense:** every key must remain in a leaf, because only leaves point to data. Internal keys are just signposts.
- **Use it when:** tracing insertions. If the root splits, the tree grows one level taller.

**Minimum occupancy**

$$\text{non-root internal node has at least } \lceil p / 2 \rceil \text{ pointers}$$

- **Read it as:** every node except the root is at least half full.
- **Symbols:** $p$ = maximum pointers in a node.
- **Why it makes sense:** this keeps the tree short and balanced.
- **Use it when:** a question asks for the minimum fill or the maximum height.

### Where the formulas come from
**Why indexes exist at all.**

1. A disk reads a whole block at a time, and one block read is thousands of times slower than work in memory.
2. So the cost of a query is roughly the number of blocks read. A good structure finds a row while reading very few blocks.
3. A heap file gives no hint where a row is, so in the worst case every block is read. An index is a small, sorted "map" that points to the right block.

**Deriving bfr and b (Example: 10000 records of 100 bytes, block 1000 bytes).**

1. One block has 1000 bytes. Each record takes 100 bytes.
2. Records that fit: $1000 / 100 = 10$. If the record were 120 bytes, $1000 / 120 = 8.33$, but 0.33 of a record cannot be stored (we do not split records across blocks). So we round down: $bfr = \lfloor B / R \rfloor$.
3. 10000 records at 10 per block need $10000 / 10 = 1000$ blocks.
4. If there were 10005 records, the last 5 records still need a whole block. So we round up: $b = \lceil r / bfr \rceil$.

**Deriving the binary search cost $\lceil \log_2 b \rceil$.**

1. The file has 1000 sorted blocks. Read the middle block (block 500). Its keys tell us if our record is in the left half or the right half.
2. After 1 read, about 500 blocks are left. After 2 reads, 250. After 3 reads, 125.
3. After $k$ reads, about $1000 / 2^k$ blocks are left.
4. We stop when 1 block is left: $1000 / 2^k \le 1$, so $2^k \ge 1000$.
5. $2^9 = 512$ is too small and $2^{10} = 1024$ is enough. So $k = 10$.
6. In general, $k$ is the smallest whole number with $2^k \ge b$. That is $k = \lceil \log_2 b \rceil$, by the meaning of $\log_2$.

**Deriving the single-level index cost $\lceil \log_2 b_i \rceil + 1$.**

1. A sparse index has one entry (first key of the block, pointer to the block) per data block. With 1000 data blocks there are 1000 entries.
2. An entry is 20 bytes, so one index block holds $\lfloor 1000 / 20 \rfloor = 50$ entries. The index needs $\lceil 1000 / 50 \rceil = 20$ blocks. This is $b_i$.
3. The index is sorted, so binary search on it costs $\lceil \log_2 20 \rceil = 5$ block reads (same steps as above, with $b_i$ instead of $b$).
4. The found entry points to exactly one data block. Reading it costs 1 more block.
5. Total: $\lceil \log_2 b_i \rceil + 1 = 6$. It is smaller than 10 because $b_i$ is much smaller than $b$: index entries are small, so many fit in one block.

**Deriving the multi-level (tree) cost $h + 1$.**

1. The 20-block index is itself a sorted file. So build an index on the index: 20 entries fit in 1 block. Now there are 2 levels: 1 top block and 20 index blocks.
2. A search reads the top block (1 read), which points to one of the 20 index blocks (1 read), which points to one data block (1 read). Total 3 reads instead of 6.
3. Each level divides the number of blocks by the fan-out $f$ (here 50), not by 2. After $h$ levels, $f^h$ blocks can be covered.
4. We need $f^h \ge N$, so $h = \lceil \log_f N \rceil$. With $f = 50$ and $N = 1000$: $50^1 = 50 < 1000 \le 2500 = 50^2$, so $h = 2$.
5. Cost = one read per level + one data block = $h + 1$. A B+ tree is exactly this multi-level index, kept balanced automatically.

**Deriving the internal node order $pP + (p - 1)K \le B$.**

1. An internal node is a signpost. It holds keys like [10 | 20] and pointers to children.
2. Draw it: pointer, 10, pointer, 20, pointer. The first pointer leads to keys below 10, the middle one to keys from 10 to 20, the last one to keys 20 and above.
3. So 2 keys make 3 gaps, and each gap needs one pointer. In general, $p$ pointers need $p - 1$ keys between them (fence posts and gaps).
4. The node is one block, so all of it must fit: pointers take $p \cdot P$ bytes, keys take $(p - 1) \cdot K$ bytes. That gives $pP + (p - 1)K \le B$.
5. Solve: $pP + pK - K \le B$, so $p(P + K) \le B + K$, so $p \le (B + K) / (P + K)$. Take the floor, because $p$ must be whole and must not exceed the block.
6. Internal nodes do not point to data, so the record pointer size is not used.

**Deriving the leaf node order $n(K + P_r) + P \le B$.**

1. A leaf holds the actual keys, and each key needs a pointer to its record on disk. So each entry is (key, record pointer), costing $K + P_r$ bytes.
2. $n$ entries take $n(K + P_r)$ bytes.
3. The leaves are linked in a chain for range search, so each leaf also has one "next leaf" pointer of $P$ bytes.
4. Everything must fit in one block: $n(K + P_r) + P \le B$, so $n \le (B - P) / (K + P_r)$, rounded down.

**Why leaf splits copy and internal splits move.**

1. Only leaves point to data. If a key left the leaf level, its record could not be found. So when a leaf splits, the key that goes up is a **copy**; the original stays in the leaf.
2. Internal keys are only signposts. When an internal node splits into a left half and a right half, the middle key becomes the signpost between them in the parent. It is no longer needed inside either half, so it **moves** up.
3. If the root splits, a new root is made above it. That is the only way the tree grows taller, so all leaves always stay at the same depth.

**Why nodes are at least half full.**

1. A split of a full node of $p$ pointers gives two nodes of about $p / 2$ each. So right after a split, both halves are half full.
2. Deletions merge or borrow when a node falls below half, keeping this rule.
3. Half-full nodes mean the fan-out is at least $\lceil p/2 \rceil$, so the height stays about $\log_{p/2} N$: still very small. That is the point of the rule.

### Examples
**Example 1 (easy):** blocks and binary search. A university Student file has $r = 10000$ records of $R = 100$ bytes. Block size $B = 1000$ bytes.

1. $bfr = \lfloor 1000 / 100 \rfloor = 10$ records per block.
2. $b = \lceil 10000 / 10 \rceil = 1000$ blocks.
3. Linear search: up to 1000 block reads.
4. Binary search on a sorted file: $\lceil \log_2 1000 \rceil = 10$, because $2^9 = 512 < 1000 \le 1024 = 2^{10}$.

**Result:** 1000 blocks; linear search up to 1000 reads, binary search 10 reads.

**Example 2 (medium):** a sparse index. Same file, sorted on sid. Each index entry is a 10-byte key plus a 10-byte pointer, so 20 bytes.

1. Entries per index block: $\lfloor 1000 / 20 \rfloor = 50$.
2. Sparse index: one entry per data block, so 1000 entries.
3. Index blocks: $\lceil 1000 / 50 \rceil = 20$.
4. Cost: $\lceil \log_2 20 \rceil + 1 = 5 + 1 = 6$ block reads, because $2^4 = 16 < 20 \le 32 = 2^5$.
5. With a second index level on top (20 entries fit in 1 block), the cost drops to $2 + 1 = 3$.

**Result:** 6 block reads with a single-level index (3 with two levels), instead of 10.

**Example 3 (GATE level):** node orders. Block 2048 bytes, key 14 bytes, node pointer 8 bytes, record pointer 10 bytes.

1. Internal node: $8p + 14(p - 1) \le 2048$.
2. $8p + 14p - 14 \le 2048$, so $22p \le 2062$.
3. $p \le 93.7$, so $p = 93$.
4. Check: $8 \times 93 + 14 \times 92 = 744 + 1288 = 2032 \le 2048$. With 94: $752 + 1302 = 2054 > 2048$. So 93 is correct.
5. Leaf node: $n(14 + 10) + 8 \le 2048$, so $24n \le 2040$.
6. $n \le 85$, so $n = 85$.

**Result:** 93 pointers per internal node, 85 keys per leaf.

**Example 4 (GATE level):** insertion. Leaves hold at most 2 keys. Internal nodes hold at most 3 pointers (so at most 2 keys). The tree is:

```text
            [10]
           /    \
     [5, 8]      [10, 15]
```

1. Insert 12. It goes to the right leaf: [10, 12, 15]. Three keys, overflow.
2. Split into [10] and [12, 15]. Copy 12 up. Root becomes [10, 12] with 3 children. That is allowed.

```text
            [10, 12]
          /    |     \
     [5, 8]  [10]   [12, 15]
```

3. Insert 20. It goes to [12, 15], giving [12, 15, 20]. Overflow.
4. Split into [12] and [15, 20]. Copy 15 up. Root becomes [10, 12, 15] with 4 children. Too many.
5. Split the internal node: [10] and [15], and the middle key **12 moves up** into a new root.

```text
                 [12]
               /      \
           [10]        [15]
          /    \      /    \
     [5, 8]  [10]  [12]  [15, 20]
```

**Result:** the root holds only 12, and the height grew from 2 to 3.

### Common mistakes
> **Common mistake:** Using the record pointer size for an internal node. Internal nodes have only node pointers and keys.

> **Common mistake:** Rounding up the order. If $p \le 93.7$, then p = 93, not 94. Always check by putting the number back in.

> **Common mistake:** Copying the middle key during an internal split. Internal splits *move* the key up. Only leaf splits *copy*.

> **Common mistake:** Choosing a hash index for a range condition like `rating > 3.4`. Hashing works only for equality.

> **Common mistake:** Forgetting the "+1" data block read after searching an index.

### How GATE asks it
- **2024 Q.55** (2 marks, MSQ): pick indexes for a query with `CustomerRating > 3.4` and `Name = "Comedy"`. The range condition needs a B+ tree, so hash on CustomerRating is wrong.
- **2026 Q.32** (1 mark, NAT): maximum node pointers in a non-leaf node: $10p + 11(p - 1) \le 4096$, so p = 195. The record pointer size was a distractor.
- **2026 Q.41** (2 marks): insert 3 into a B+ tree. The leaf splits, the root overflows and splits, and only 5 stays in the new root.

> **GATE tip:** For an insertion question, redraw the tree after every step. Do not try to do two splits in your head.

### Summary
- First we notice that disk reads whole blocks and each read is slow, so cost is counted in block accesses.
- Then we count how many records fit in a block (round down) and how many blocks a file needs (round up).
- Scanning reads every block, binary search halves the blocks each time ($\lceil \log_2 b \rceil$), and an index lets us binary-search a much smaller file and then read 1 data block.
- Putting an index on the index gives a multi-level tree, where each level divides the search by the fan-out; a B+ tree is this idea kept balanced.
- The node orders come from "everything must fit in one block": $p$ pointers need $p - 1$ keys in an internal node, and each leaf key needs a record pointer plus one next-leaf pointer.
- That is why leaf splits copy a key (data must stay in the leaves) and internal splits move one (signposts only).
- Next topic builds on this: Data Transformation, where we prepare the stored data for analysis.

### Quick self-check
1. Which index supports `WHERE age BETWEEN 20 AND 22`?

   **Answer:** A B+ tree (a hash index cannot do ranges).
2. Block 512 bytes, record 120 bytes. What is bfr?

   **Answer:** $\lfloor 512 / 120 \rfloor = 4$.
3. Can a file have two primary (clustering) indexes?

   **Answer:** No. It can be sorted on only one field.

## Data Transformation (Normalization/Discretization/Sampling/Compression)

### The big idea
Raw data must be cleaned and reshaped before analysis. **Normalization** rescales numbers to a common range. **Discretization** turns numbers into groups (bins). **Sampling** picks a smaller, fair subset. **Compression** makes data smaller while keeping most of its information.

Careful: "normalization" here means **rescaling numbers**. It has nothing to do with normal forms (1NF, 2NF...).

### Before you start
**Our marks data (see topic: ER Model).** The Enroll table has marks 85, 70, 90, 60, 75, 88, 65. Sorted: 60, 65, 70, 75, 85, 88, 90.

**The sum symbol $\sum$.** $\sum_{i=1}^{n} x_i$ means "add $x_1 + x_2 + \dots + x_n$". For the values 2, 4, 6: $\sum x_i = 2 + 4 + 6 = 12$.

**Mean (average).** The mean $\mu$ (Greek "mu") is the sum divided by the count:

$$\mu = \frac{1}{n}\sum_{i=1}^{n} x_i$$

For 2, 4, 6: $\mu = 12 / 3 = 4$.

**Standard deviation.** The standard deviation $\sigma$ (Greek "sigma") is the typical distance of the values from the mean:

$$\sigma = \sqrt{\frac{1}{n}\sum_{i=1}^{n} (x_i - \mu)^2}$$

For 2, 4, 6: the distances from 4 are $-2, 0, 2$; their squares are 4, 0, 4; the average square is $8/3 \approx 2.67$; and $\sigma = \sqrt{2.67} \approx 1.63$. The square root $\sqrt{\ }$ undoes the squaring so that $\sigma$ is back in the original units (rupees, marks). (More in Probability & Statistics.)

**Fractions and proportion.** "60 out of 100" is the fraction $60/100 = 0.6$, or 60%. Taking "the same proportion" of 50 means $50 \times 0.6 = 30$.

**A straight-line map.** A rule $v' = a \cdot v + c$ (multiply by a number, then add a number) is a straight-line change of scale. Converting °C to °F, $F = 1.8\,C + 32$, is one. Such a map never changes the order of values when $a > 0$.

**Powers of 10.** $10^1 = 10$, $10^2 = 100$, $10^3 = 1000$. Dividing by $10^j$ moves the decimal point $j$ places to the left: $75 / 10^2 = 0.75$.

### Intuition
Imagine comparing a student's height (in cm, around 160) with their marks (out of 100) and their family income (in rupees, around 5,00,000). Income numbers are huge, so any distance-based method (like k-nearest neighbours) would think only income matters. We must bring all columns to a similar scale. That is **normalization**.

- **Min-max** is like converting marks to a percentage: the lowest becomes 0 and the highest becomes 1.
- **z-score** says "how many standard deviations above or below average". A z-score of +2 means "well above the class average", whatever the units.
- **Decimal scaling** just moves the decimal point.

**Discretization** is like grading: instead of exact marks 87, 72, 58, you say A, B, C. **Sampling** is like a cook tasting one spoon of dal instead of the whole pot. **Stratified sampling** is like a fair survey that asks boys and girls in the same ratio as the class.

> **Intuition:** Normalization changes the *ruler*, not the *order*. If Asha scored more than Ravi before, she still scores more after rescaling.

### Words you need
- **Mean** $\mu$: the average. *Example:* mean of 2, 4, 6 is 4.
- **Standard deviation** $\sigma$: the typical distance of values from the mean. Small $\sigma$ = values close together.
- **Bin**: a group or interval of values. *Example:* [60, 70) means "from 60 up to, but not including, 70".
- **Equal-width binning**: every bin covers the same range of values.
- **Equal-frequency (equal-depth) binning**: every bin has the same number of values.
- **Smoothing**: replacing values in a bin by one representative value, to remove noise.
- **SRSWOR / SRSWR**: simple random sampling without / with replacement (can the same item be picked twice?).
- **Stratum** (plural strata): a group, like a department. **Cluster**: a natural group picked as a whole, like one classroom.
- **Lossless compression**: the original can be rebuilt exactly (like a ZIP file). **Lossy compression**: only an approximation can be rebuilt (like a JPEG photo).
- **PCA (Principal Component Analysis)**: keeps the few directions in which the data varies most, and drops the rest.
- **Outlier**: a value far away from the rest. *Example:* one income of 5 crore among incomes near 5 lakh.

### Formulas, explained
**Min-max normalization**

$$v' = \frac{v - \min}{\max - \min}\,(\text{new\_max} - \text{new\_min}) + \text{new\_min}$$

- **Read it as:** find how far v is along the old range (a fraction from 0 to 1), then stretch that fraction onto the new range.
- **Symbols:** $v$ = old value, $v'$ = new value, $\min, \max$ = old smallest and largest values.
- **Why it makes sense:** the min maps to new_min, the max maps to new_max, and everything in between keeps its relative position.
- **Use it when:** you know the min and max and want a fixed range like [0, 1].

**z-score normalization**

$$z = \frac{v - \mu}{\sigma}$$

- **Read it as:** (value minus mean) divided by standard deviation.
- **Symbols:** $\mu$ = mean, $\sigma$ = standard deviation.
- **Why it makes sense:** the top tells how far from average; dividing by $\sigma$ measures that distance in "standard steps". It needs no min or max.
- **Use it when:** the question gives mean and standard deviation, or the data has outliers.

**Decimal scaling**

$$v' = \frac{v}{10^{j}}, \quad j = \text{smallest integer with } \max \lvert v' \rvert < 1$$

- **Read it as:** divide by 10, 100, 1000... just enough to make every value smaller than 1 in size.
- **Symbols:** $\lvert v' \rvert$ = size of $v'$ ignoring sign; $j$ = number of places the decimal point moves.
- **Why it makes sense:** moving the decimal point is the simplest possible rescaling, and it keeps the digits readable.
- **Use it when:** a quick scaling into (-1, 1) is needed.

**Equal-width binning**

$$\text{width} = \frac{\max - \min}{k}$$

- **Read it as:** divide the full range into k equal pieces.
- **Symbols:** $k$ = number of bins.
- **Why it makes sense:** like dividing a 30 km road into 3 stretches of 10 km each.
- **Use it when:** asked for bin boundaries.

**Stratified sample size**

$$n_h = n \cdot \frac{N_h}{N}$$

- **Read it as:** each group gets sample places in proportion to its size.
- **Symbols:** $n$ = total sample size, $N$ = population size, $N_h$ = size of group h, $n_h$ = sample from group h.
- **Why it makes sense:** a group that is 60% of the population gets 60% of the sample, so small groups are not missed.
- **Use it when:** data is imbalanced (skewed classes).

### Where the formulas come from
**Why we rescale at all (the problem).**

1. Two students: A = (marks 85, income 5,00,000) and B = (marks 60, income 5,01,000).
2. The distance between them is about $\sqrt{25^2 + 1000^2} \approx 1000.3$. The marks gap of 25 hardly matters, only because income is measured in big units.
3. After rescaling both columns to [0, 1], each column has a fair say. That is why normalization comes before distance-based methods.

**Deriving min-max (with our marks, min 60, max 90, value 75).**

1. How far is 75 above the minimum? $75 - 60 = 15$.
2. How long is the whole range? $90 - 60 = 30$.
3. So 75 is $15 / 30 = 0.5$ of the way along, halfway. This fraction is always between 0 (at the min) and 1 (at the max), because the top is between 0 and the bottom.
4. To place this fraction on a new range [new_min, new_max], stretch it by the new length and shift it to the new start: $0.5 \times (10 - 0) + 0 = 5$ on [0, 10].
5. In symbols: fraction $= (v - \min)/(\max - \min)$, then $v' = \text{fraction} \times (\text{new\_max} - \text{new\_min}) + \text{new\_min}$.
6. Check the ends: $v = \min$ gives fraction 0, so $v' = \text{new\_min}$. $v = \max$ gives fraction 1, so $v' = \text{new\_max}$.
7. This is a straight-line map $v' = a v + c$ with $a > 0$, so the order of values never changes.

**Deriving the z-score.**

1. Mean salary 60,000, standard deviation 16,000. Value 84,000.
2. First shift so the mean becomes 0: $84000 - 60000 = 24000$. Now positive means "above average" and negative means "below".
3. Next measure that distance in standard steps: $24000 / 16000 = 1.5$. So 84,000 is 1.5 steps above the average.
4. In symbols: $z = (v - \mu)/\sigma$. It is also a straight-line map (with $a = 1/\sigma$), so order is kept.
5. After this change, the whole column has mean 0 and standard deviation 1. That is because subtracting $\mu$ moves the centre to 0, and dividing by $\sigma$ shrinks the typical distance to 1.
6. The min and max never appear, so they cannot affect $z$. That is why one huge outlier spoils min-max (it becomes the max and squeezes everyone else near 0) but hurts the z-score much less.

**Deriving $j$ in decimal scaling.**

1. The largest size among our marks is 90.
2. Divide by $10^1$: $90 / 10 = 9$. Not less than 1.
3. Divide by $10^2$: $90 / 100 = 0.9$. Less than 1. So $j = 2$.
4. In general, $j$ is the number of digits before the decimal point in the largest $\lvert v \rvert$ (for 90: two digits, so $j = 2$; for 100: three digits, so $j = 3$, giving 0.1).

**Deriving equal-width bins.**

1. Our marks go from 60 to 90, a range of 30.
2. We want $k = 3$ bins of the same width, so each covers $30 / 3 = 10$.
3. Boundaries: start at the min and add the width each time: 60, 70, 80, 90. So bins [60, 70), [70, 80), [80, 90].

**Deriving the stratified sample size.**

1. A college has 1000 students, 600 of them in CS. CS is $600 / 1000 = 0.6$ of the college.
2. A fair sample of 50 should look like the college, so CS should be 0.6 of the sample too: $50 \times 0.6 = 30$.
3. In symbols: $n_h = n \times (N_h / N)$. Adding over all groups gives $n \times (N / N) = n$, so the group sizes always add up to the total sample.
4. Plain random sampling could, by bad luck, pick 0 ME students out of 50. Stratifying guarantees ME gets its 5 places.

**Why PCA is lossy.** The full proof is not needed for GATE. In picture form: if points lie almost on a line, PCA stores only each point's position along the line. The small sideways distances are thrown away, so the original points cannot be rebuilt exactly.

### Examples
**Example 1 (easy):** min-max and decimal scaling on our marks. Rescale 75.

1. To [0, 1]: $v' = (75 - 60) / (90 - 60) = 15 / 30 = 0.5$.
2. To [0, 10]: $0.5 \times (10 - 0) + 0 = 5$.
3. Decimal scaling: the largest value is 90. Dividing by $10^1$ gives 9.0, not less than 1. Dividing by $10^2$ gives 0.90. So $j = 2$.
4. So 75 becomes $75 / 100 = 0.75$.

**Result:** 0.5 on [0, 1], 5 on [0, 10], and 0.75 by decimal scaling.

**Example 2 (medium):** binning and smoothing. Prices (in rupees): 4, 8, 15, 21, 21, 24, 25, 28, 34.

1. Equal-frequency, 3 bins of 3 values: Bin 1 = [4, 8, 15], Bin 2 = [21, 21, 24], Bin 3 = [25, 28, 34].
2. Smoothing by means, Bin 1: $(4 + 8 + 15) / 3 = 27 / 3 = 9$.
3. Bin 2: $(21 + 21 + 24) / 3 = 66 / 3 = 22$.
4. Bin 3: $(25 + 28 + 34) / 3 = 87 / 3 = 29$.
5. Smoothing by boundaries replaces each value by the nearer of the bin's min and max. For 8: distance to 4 is 4, distance to 15 is 7, so 8 becomes 4.
6. For 28: distance to 25 is 3, distance to 34 is 6, so 28 becomes 25.

| Original | By means | By boundaries |
|---|---|---|
| 4, 8, 15 | 9, 9, 9 | 4, 4, 15 |
| 21, 21, 24 | 22, 22, 22 | 21, 21, 24 |
| 25, 28, 34 | 29, 29, 29 | 25, 25, 34 |

**Result:** the table above. For comparison, equal-width on our marks with $k = 3$ gives width 10 and bins [60, 70) = {60, 65}, [70, 80) = {70, 75}, [80, 90] = {85, 88, 90}.

**Example 3 (GATE level):** z-score with distractors. Monthly salaries of analysts: min Rs 20,000, max Rs 1,20,000, mean Rs 60,000, standard deviation Rs 16,000. Find the z-score of Rs 84,000.

1. Ignore min and max. They are not in the z-score formula.
2. $z = (84000 - 60000) / 16000 = 24000 / 16000 = 1.5$.
3. For comparison, min-max to [0, 1]: $(84000 - 20000) / (120000 - 20000) = 64000 / 100000 = 0.64$.
4. Min-max to [-1, 1]: $0.64 \times (1 - (-1)) + (-1) = 1.28 - 1 = 0.28$.
5. Sanity check: 84,000 is above the mean, so z must be positive. And $60000 + 1.5 \times 16000 = 84000$. Correct.

**Result:** z = 1.5.

**Example 4 (medium):** stratified sampling. A college has 1000 students: 600 CS, 300 EE, 100 ME. Take a sample of 50.

1. CS: $50 \times 600 / 1000 = 30$.
2. EE: $50 \times 300 / 1000 = 15$.
3. ME: $50 \times 100 / 1000 = 5$.
4. Check: $30 + 15 + 5 = 50$.

**Result:** 30 CS, 15 EE, 5 ME.

### Common mistakes
> **Common mistake:** Using min or max in a z-score. The z-score uses only mean and standard deviation.

> **Common mistake:** Dividing by the mean or the min instead of $\sigma$. In 2024 Q.27, the wrong option 0.217 came from dividing by the minimum.

> **Common mistake:** Mixing up equal-width (same range) with equal-frequency (same count).

> **Common mistake:** Thinking PCA is lossless. Dropping components loses some information, so it is lossy.

### How GATE asks it
- **2024 Q.27** (1 mark): given min, max, mean and standard deviation of income, find the z-score of Rs 1,06,000. $z = (106000 - 96000) / 21000 \approx 0.476$. Min and max were distractors.

Likely future questions: min-max to a new range, the j in decimal scaling, a bin boundary, or which sampling suits imbalanced classes (stratified).

> **GATE tip:** Before computing, list which numbers the formula needs. Min-max needs min and max; z-score needs mean and $\sigma$. Every other number given is a distractor.

### Summary
- First we see that columns in big units (like rupees) would drown out columns in small units, so we rescale.
- Min-max finds "what fraction of the way from min to max" a value is, then stretches that fraction onto the new range.
- The z-score shifts the mean to 0 and measures distance in standard steps, so it needs only $\mu$ and $\sigma$ and suffers less from outliers.
- Decimal scaling just moves the decimal point until every value is below 1 in size; all three methods keep the order of values.
- Binning cuts the range into equal widths or equal counts, and stratified sampling gives each group its fair share, $n \cdot N_h / N$.
- That is why every GATE question here is "pick the right formula, ignore the distractor numbers".
- Next topic builds on this: Data Warehouse Modelling, where the cleaned data is arranged into cubes for analysis.

### Quick self-check
1. Mean 50, standard deviation 10. z-score of 35?

   **Answer:** $(35 - 50) / 10 = -1.5$.
2. Values range from 10 to 50. Min-max of 30 to [0, 1]?

   **Answer:** $(30 - 10) / (50 - 10) = 20 / 40 = 0.5$.
3. Which sampling gives every group a fair share?

   **Answer:** Stratified sampling.

## Data Warehouse Modelling (Star/Snowflake, OLAP, Concept Hierarchies)

### The big idea
A **data warehouse** is a large, separate database built for analysis, not for daily work. Data is seen as a **cube**: the sides are **dimensions** (like time, place, product) and the cells hold **measures** (like sales).

**OLAP** operations let you zoom in, zoom out and cut this cube. GATE asks you to name these operations and to count cuboids or GROUP BY CUBE rows.

### Before you start
**GROUP BY and COUNT (see topic: SQL).** `GROUP BY dept` makes one pile per department, and `COUNT(*)` counts the rows in each pile. A cube is many GROUP BYs done at once.

**Fact and dimension tables use keys and joins (see topics: Integrity Constraints & Keys, Relational Algebra).** A fact table holds foreign keys that point to dimension tables. To see names, you join them.

**Normalization of tables (see topic: Functional Dependencies & Normal Forms).** Splitting a table so each fact is stored once. A snowflake schema is a "normalized" star schema.

**Subsets and $2^n$ (see topic: Integrity Constraints & Keys).** A set of $n$ items has $2^n$ subsets, because each item is "in" or "out". {dept, cid} has 4 subsets: {}, {dept}, {cid}, {dept, cid}.

**The product symbol $\prod$.** $\prod_{i=1}^{n} a_i$ means "multiply $a_1 \times a_2 \times \dots \times a_n$". It is like $\sum$, but multiplying instead of adding. *Example:* $\prod_{i=1}^{3} (i + 1) = 2 \times 3 \times 4 = 24$.

**The multiplication rule of counting.** If you choose a shirt (3 ways) and then a pant (4 ways), there are $3 \times 4 = 12$ outfits. Independent choices multiply.

### Intuition
The college office database is busy all day: admissions, fee payments, marks entry. These are many small, quick changes. This is **OLTP** (Online Transaction Processing).

The principal asks a different kind of question: "Average marks per department per semester for the last 5 years". This reads huge amounts of data and changes nothing. Running it on the busy office system would slow everything.

So data is copied every night into a separate **warehouse**, arranged for such questions. This is **OLAP** (Online Analytical Processing).

Picture a Rubik's cube. One side is Department, one side is Course, one side is Semester. Each small cube holds a number, like the count of enrollments. Now:

- **Roll-up**: zoom out. "Show per *year* instead of per *semester*."
- **Drill-down**: zoom in. "Show per *month* instead of per *year*."
- **Slice**: cut one layer. "Only Semester 1."
- **Dice**: cut a smaller block. "Only CS and EE, only Semesters 1 and 2."
- **Pivot**: turn the cube to see it from another side (swap rows and columns).

> **Intuition:** Roll-up and drill-down move **up and down a ladder** of detail. Slice and dice **cut** the cube without changing the level of detail.

That ladder is a **concept hierarchy**: Day < Month < Quarter < Year, or City < State < Country. Going towards Country is going *up* (coarser).

### Words you need
- **Dimension**: a viewpoint for analysis. *Example:* dept, course, time.
- **Measure**: the number being analysed. *Example:* marks, number of enrollments.
- **Fact table**: the central table with measures and a foreign key to each dimension. *Example:* Enroll(sid, cid, marks) is a fact table: sid and cid point to dimensions, marks is the measure.
- **Dimension table**: details of one dimension. *Example:* Student(sid, name, dept, age).
- **Star schema**: one fact table in the middle, one flat dimension table per dimension. Few joins, some repeated data.
- **Snowflake schema**: dimension tables are split further into normalized sub-tables, e.g. Student → Dept → School. Less space, more joins.
- **Fact constellation (galaxy)**: several fact tables share dimension tables.
- **Cuboid**: one group-by level of the cube. *Example:* "total by dept only" is one cuboid. The **apex** cuboid is the grand total; the **base** cuboid has the most detail.
- **Data warehouse properties**: subject-oriented, integrated (data from many sources made consistent), time-variant (keeps history), non-volatile (loaded and read, rarely changed).

### Formulas, explained
**Cuboids without hierarchies**

$$\#\text{cuboids} = 2^{n}$$

- **Read it as:** with n dimensions, there are 2 to the power n cuboids.
- **Symbols:** $n$ = number of dimensions.
- **Why it makes sense:** each dimension is either "in the group-by" or "not". 2 choices each.
- **Use it when:** dimensions have no levels.

**Cuboids with concept hierarchies**

$$\#\text{cuboids} = \prod_{i=1}^{n} (L_i + 1)$$

- **Read it as:** multiply (levels + 1) over all dimensions.
- **Symbols:** $\prod$ = "multiply all of these", $L_i$ = number of levels of dimension i.
- **Why it makes sense:** each dimension can sit at any of its $L_i$ levels, or be fully removed (the "all" level). That is $L_i + 1$ choices.
- **Use it when:** a figure shows hierarchies like Day-Month-Year.

**Rows from GROUP BY CUBE**

$$\text{rows} = \sum_{\text{every subset } G \text{ of the dimensions}} (\text{distinct combinations of } G \text{ present}) \;=\; \prod_{i=1}^{n} (v_i + 1) \text{ if all combinations exist}$$

- **Read it as:** CUBE makes all $2^n$ groupings. Add the number of groups in each. If every combination is present, this equals the product of (values + 1).
- **Symbols:** $v_i$ = number of distinct values of dimension i. The empty grouping gives 1 row (the grand total).
- **Why it makes sense:** in each output row, a dimension shows one of its $v_i$ values or "ALL". That is $v_i + 1$ choices.
- **Use it when:** "how many tuples does GROUP BY CUBE return?"

**Rows from GROUP BY ROLLUP**

$$\text{ROLLUP}(D_1, \dots, D_n) \text{ uses only the } n + 1 \text{ prefixes: } (D_1, \dots, D_n),\ \dots,\ (D_1),\ ()$$

- **Read it as:** ROLLUP drops dimensions from the right, one at a time.
- **Symbols:** $D_1, \dots, D_n$ = dimensions in the order written; a prefix = the first few of them.
- **Why it makes sense:** it climbs one ladder, like (year, month, day) → (year, month) → (year) → total.
- **Use it when:** compare with CUBE. ROLLUP never produces a grouping like $(D_2)$ alone.

**Types of measures**

| Type | Meaning | Examples |
|---|---|---|
| Distributive | Total can be built from totals of parts | SUM, COUNT, MIN, MAX |
| Algebraic | Built from a fixed number of distributive values | AVG = SUM / COUNT, standard deviation |
| Holistic | Needs all the data; no fixed summary works | median, mode, rank |

### Where the formulas come from
**Why a separate warehouse exists (the problem).**

1. The office system is tuned for many tiny updates, so its tables are normalized and each query touches a few rows.
2. An analysis query like "average marks per dept per year for 5 years" reads millions of rows and joins many tables. Running it during office hours would slow every admission and fee payment.
3. So the data is copied into a separate store, arranged with few joins (star schema) and pre-computed totals (cuboids). Reading becomes fast, and the office system is left alone.

**Why star has fewer joins and snowflake has more.**

1. Star: the Student dimension is one flat table Student(sid, name, dept, school). To get "count by school", join the fact table with Student: 1 join.
2. "CS belongs to School of Engineering" is repeated for every CS student, so star wastes some space.
3. Snowflake: normalize it into Student(sid, name, dept) and Dept(dept, school). Now the school is stored once per dept, but "count by school" needs 2 joins.
4. So snowflake trades fewer repeats for more joins. This is the same trade-off as normalization in topic Functional Dependencies & Normal Forms.

**Deriving $2^n$ cuboids (our dimensions dept and cid).**

1. Each cuboid is one GROUP BY. For each dimension we decide: is it in the GROUP BY or not?
2. dept: in or out (2 choices). cid: in or out (2 choices).
3. By the multiplication rule: $2 \times 2 = 4$ cuboids: (dept, cid), (dept), (cid), ().
4. With $n$ dimensions: $2 \times 2 \times \dots \times 2 = 2^n$. This is the same count as the subsets of a set.

**Deriving $\prod (L_i + 1)$ with hierarchies.**

1. Time has 3 levels: Day, Month, Year. In a cuboid, Time can be grouped by Day, by Month, by Year, or removed completely ("ALL"). That is $3 + 1 = 4$ choices.
2. Course with 2 levels (Course, Subject Area) has $2 + 1 = 3$ choices.
3. The choices for different dimensions are independent, so they multiply: $4 \times 3 = 12$ cuboids.
4. In general, $\prod_{i=1}^{n} (L_i + 1)$. If every dimension has 1 level, each factor is $1 + 1 = 2$, and we get back $2^n$. So the first formula is a special case of this one.

**Deriving the CUBE row count.**

1. CUBE(dept, cid) runs all 4 groupings and stacks their results.
2. Grouping (dept, cid) gives one row per pair that occurs. Grouping (dept) gives one row per dept, (cid) one per course, and () one grand total.
3. So the total is the sum of the group counts over all subsets. This is always correct.
4. Shortcut: suppose every combination occurs, dept has 3 values and cid has 3. In any output row, the dept column shows CS, EE, ME or ALL: 4 choices. The cid column shows C1, C2, C3 or ALL: 4 choices.
5. Every pair of choices is a real row (because all combinations exist), so there are $4 \times 4 = 16$ rows. In general, $\prod (v_i + 1)$.
6. If some combinations are missing, fewer rows exist, and only the sum method is correct (Example 2 shows 12, not 16).

**Deriving the ROLLUP row count.**

1. ROLLUP(year, month, day) follows one ladder: (year, month, day), then (year, month), then (year), then ().
2. Each step drops the rightmost dimension, so there are $n + 1$ groupings, not $2^n$.
3. Add the group counts of these $n + 1$ groupings only.

**Why AVG is algebraic but median is holistic.**

1. Split the marks into C1 marks {85, 60, 75} and other marks {70, 90, 88, 65}.
2. SUM: $220 + 313 = 533$. The total is built from the part totals, so SUM is distributive. COUNT, MIN and MAX work the same way.
3. AVG: the part averages 73.3 and 78.25 cannot simply be averaged (the parts have different sizes). But keep 2 numbers per part, (SUM, COUNT): $(220 + 313) / (3 + 4) = 533 / 7 \approx 76.14$. A fixed number (2) of distributive values is enough, so AVG is algebraic.
4. Median: the part medians are 75 and 79. The true median of all 7 marks is 75. No fixed small summary of the parts always gives the median; in the worst case you need all the values. So median is holistic.

### Examples
**Example 1 (easy):** OLAP operations. A cube shows enrollment count by (Course, Semester, Department).

1. Change Department to School (a coarser level): **roll-up**.
2. Change Semester to Month: **drill-down**.
3. Show only Semester = 1: **slice**.
4. Show only CS and EE, and only C1 and C2: **dice**.

**Result:** roll-up, drill-down, slice, dice.

**Example 2 (medium):** CUBE on our database. Count enrollments by dept and course:

```sql
SELECT dept, cid, COUNT(*) AS n
FROM Student NATURAL JOIN Enroll
GROUP BY CUBE (dept, cid);
```

1. The join gives 7 rows (shown in Relational Algebra). Not every (dept, cid) pair occurs: EE has only C1, ME has only C2.
2. Grouping (dept, cid) gives 5 rows, (dept) gives 3, (cid) gives 3, and () gives 1. All 12 rows are in the table below.
3. Total $5 + 3 + 3 + 1 = 12$ rows.
4. The product formula would give $(3 + 1)(3 + 1) = 16$, but that needs all 9 pairs present. Here only 5 are.
5. `ROLLUP(dept, cid)` gives only (dept, cid), (dept) and (): $5 + 3 + 1 = 9$ rows.

| dept | cid | n |
|---|---|---|
| CS | C1 | 2 |
| CS | C2 | 1 |
| CS | C3 | 2 |
| EE | C1 | 1 |
| ME | C2 | 1 |
| CS | ALL | 5 |
| EE | ALL | 1 |
| ME | ALL | 1 |
| ALL | C1 | 3 |
| ALL | C2 | 2 |
| ALL | C3 | 2 |
| ALL | ALL | 7 |

**Result:** 12 rows for CUBE, 9 for ROLLUP. (In real SQL, "ALL" is shown as NULL.)

**Example 3 (GATE level):** CUBE and ROLLUP counts. Facts(D1, D2, D3, val), with 2, 3 and 2 values, all combinations present. Rows from `GROUP BY CUBE(D1, D2, D3)`?

1. Product formula: $(2 + 1)(3 + 1)(2 + 1) = 3 \times 4 \times 3 = 36$.
2. Check by groupings: () = 1; (D1) = 2; (D2) = 3; (D3) = 2; (D1, D2) = 6; (D1, D3) = 4; (D2, D3) = 6; (D1, D2, D3) = 12.
3. Sum: $1 + 2 + 3 + 2 + 6 + 4 + 6 + 12 = 36$.
4. `ROLLUP(D1, D2, D3)` uses only (D1, D2, D3), (D1, D2), (D1), (): $12 + 6 + 2 + 1 = 21$.

**Result:** 36 rows for CUBE, 21 for ROLLUP.

**Example 4 (GATE level):** cuboids with hierarchies. Time is Day < Month < Year (3 levels). Course is Course < Subject Area (2 levels). Student is Student < Dept < School (3 levels). Number of cuboids?

1. Time: $3 + 1 = 4$ choices. Course: $2 + 1 = 3$. Student: $3 + 1 = 4$.
2. Multiply: $4 \times 3 \times 4 = 48$.

**Result:** 48 cuboids.

### Common mistakes
> **Common mistake:** Forgetting the "+1" for the "all" level. Three dimensions with 3 levels each give $4^3 = 64$, not $3^3 = 27$.

> **Common mistake:** Mixing up CUBE and ROLLUP. CUBE uses all $2^n$ groupings. ROLLUP uses only $n + 1$.

> **Common mistake:** Mixing up the direction. Country → State is **drill-down** (more detail). State → Country is roll-up.

> **Common mistake:** Calling a dice a slice. Slice fixes **one** dimension to **one** value. Dice selects ranges on two or more dimensions.

> **Common mistake:** Saying a snowflake schema needs fewer joins. It needs *more*, because dimensions are split into more tables.

### How GATE asks it
- **2025 Q.46** (2 marks): rows of `GROUP BY CUBE(D1, D2)` with 3 and 2 values, all present: $6 + 3 + 2 + 1 = 12$.
- **2026 Q.18** (1 mark): going from Country to State in a cube is **drill-down**.
- **2026 Q.43** (2 marks): three hierarchies with 3 levels each give $(3 + 1)^3 = 4^3 = 64$ cuboids.

> **GATE tip:** For CUBE, write all subsets of dimensions in a list and count rows for each. With 2 or 3 dimensions this takes 30 seconds and avoids formula errors.

### Summary
- First we copy data out of the busy office database into a separate warehouse, so that big analysis queries do not slow daily work.
- Then we view the data as a cube: dimensions are the sides, measures fill the cells, and a star or snowflake schema stores it.
- Roll-up and drill-down move along a concept hierarchy, while slice and dice cut the cube.
- Each dimension is either in or out of a GROUP BY, which gives $2^n$ cuboids; with hierarchies each dimension has $L_i + 1$ choices, so we multiply them.
- CUBE stacks all $2^n$ groupings (sum their group counts), and ROLLUP stacks only the $n + 1$ prefixes.
- That is why every counting question here is the multiplication rule plus "don't forget ALL".
- Where this is used later: feature tables for ML models are often built from warehouse cubes with exactly these GROUP BY and roll-up queries.

### Quick self-check
1. How many cuboids for 4 dimensions without hierarchies?

   **Answer:** $2^4 = 16$.
2. Is AVG distributive, algebraic or holistic?

   **Answer:** Algebraic (SUM divided by COUNT).
3. Month → Quarter is which operation?

   **Answer:** Roll-up.
