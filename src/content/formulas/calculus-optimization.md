# Calculus & Optimization: formula sheet

## Limits & Continuity

**Continuity at a point**
$$\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x) = f(a)$$
Left limit, right limit and the value all agree · *Use when:* checking a piecewise joint · *e.g.* $2x+1$ ($x<1$), $x^2+2$ ($x\ge1$): $3 = 3 = 3$, continuous

**Sine limit**
$$\lim_{x\to0}\frac{\sin x}{x} = 1$$
Near 0, $\sin x$ behaves like $x$ (radians only) · *Use when:* $\frac00$ with sine · *e.g.* $\lim\frac{\sin 5x}{x} = 5$

**Exponential and log limits**
$$\lim_{x\to0}\frac{e^x-1}{x} = 1,\qquad \lim_{x\to0}\frac{\ln(1+x)}{x} = 1$$
Near 0, $e^x - 1$ and $\ln(1+x)$ both behave like $x$ · *Use when:* $\frac00$ with $e$ or $\ln$ · *e.g.* $\lim\frac{\ln(1+3x^2)}{x^2} = 3$

**Cosine limit**
$$\lim_{x\to0}\frac{1-\cos x}{x^2} = \frac12$$
Near 0, $1 - \cos x$ behaves like $\frac{x^2}{2}$ · *Use when:* $\cos$ in a $\frac00$ limit · *e.g.* $\ln\cos x \approx -\frac{x^2}{2}$, so $\lim\frac{\ln\cos x}{x^2} = -\frac12$

**Small-$x$ approximations**
$$\sin x \approx x,\quad \cos x \approx 1-\frac{x^2}{2},\quad e^x \approx 1+x,\quad \ln(1+x)\approx x,\quad (1+x)^n \approx 1+nx$$
Replace each function by its first Taylor terms · *Use when:* any limit as $x\to0$ · *e.g.* $\lim\frac{\ln((1+x^2)\cos x)}{x^2} = 1 - \frac12 = 0.5$

**L'Hôpital's rule**
$$\lim\frac{f}{g} = \lim\frac{f'}{g'}\quad\text{for } \tfrac00 \text{ or } \tfrac{\infty}{\infty}$$
Differentiate top and bottom separately · *Use when:* only $\frac00$ or $\frac\infty\infty$ · *e.g.* $\lim_{x\to0}\frac{e^{2x}-1}{x} = \frac{2e^0}{1} = 2$

**Conjugate trick**
$$\sqrt{t^2+kt} - t = \frac{kt}{\sqrt{t^2+kt}+t} \to \frac{k}{2}\ \ (t\to\infty)$$
Multiply by the "plus" version to remove $\infty - \infty$ · *Use when:* root minus something at infinity · *e.g.* $\sqrt{t^2+t}-t \to 0.5$

**Rational function at infinity**
$$\lim_{x\to\infty}\frac{a x^n + \cdots}{b x^n + \cdots} = \frac{a}{b}$$
Same top power: ratio of leading numbers; divide by the highest power · *Use when:* polynomials over polynomials · *e.g.* $\frac{3x^2+1}{6x^2-x} \to \frac12$

## Differentiability & Derivatives

**Definition of derivative**
$$f'(a) = \lim_{h\to0}\frac{f(a+h)-f(a)}{h}$$
Slope = rise over a shrinking run · *Use when:* inequality-type questions, corners · *e.g.* $f = x^2$: $\frac{2ah+h^2}{h} \to 2a$

**Basic derivatives**
$$(x^n)' = nx^{n-1},\ (e^x)' = e^x,\ (\ln x)' = \tfrac1x,\ (\sin x)' = \cos x,\ (\cos x)' = -\sin x$$
Memorise these · *Use when:* always · *e.g.* $(x^5)' = 5x^4$

**Product and quotient rules**
$$(fg)' = f'g + fg',\qquad \left(\frac fg\right)' = \frac{f'g - fg'}{g^2}$$
First's slope × second + first × second's slope · *Use when:* multiplied or divided functions · *e.g.* $(x^2e^x)' = 2xe^x + x^2e^x$

**Chain rule**
$$\big(f(g(x))\big)' = f'(g(x))\cdot g'(x)$$
Outer slope (at the inner value) × inner slope · *Use when:* nested functions · *e.g.* $(e^{3x})' = 3e^{3x}$

**Sigmoid derivative**
$$\sigma(x) = \frac{1}{1+e^{-x}},\qquad \sigma' = \sigma(1-\sigma)$$
Slope = value × (1 − value); maximum $0.25$ at $x = 0$ · *Use when:* sigmoid value is given · *e.g.* $\sigma = 0.4 \Rightarrow \sigma' = 0.24$

**ReLU and absolute value**
$$\text{ReLU}(x) = \max(x,0):\ \text{slope } 0 \ (x<0),\ 1\ (x>0),\ \text{none at } 0$$
Continuous everywhere, corner at 0 · *Use when:* "continuous / differentiable?" MSQs · *e.g.* $\lvert x\rvert$: slopes $-1$ and $1$ at 0, not differentiable

**Hyperbolic functions**
$$\sinh x = \frac{e^x-e^{-x}}{2},\ \cosh x = \frac{e^x+e^{-x}}{2},\ (\sinh)' = \cosh,\ (\cosh)' = \sinh$$
Derivatives repeat every 2 steps; $\sinh 0 = 0$, $\cosh 0 = 1$ · *Use when:* high derivatives at 0 · *e.g.* $\sinh^{(10)}(0) = \sinh 0 = 0$

**Smooth joint of a piecewise function**
$$\text{left value} = \text{right value},\qquad \text{left slope} = \text{right slope}$$
Values meet (no jump) and slopes meet (no corner) · *Use when:* find $a, b, c$ · *e.g.* $ax^2+b$ and $4\sqrt x$ at 1: $a+b=4$, $2a=2$, so $a=1, b=3$

**Differentiable implies continuous**
$$\text{differentiable} \Rightarrow \text{continuous},\quad \text{continuous} \not\Rightarrow \text{differentiable}$$
Smooth means connected; connected can still have corners · *Use when:* true/false statements · *e.g.* ReLU: continuous, not differentiable at 0

**Algebra of differentiable functions (at $c$)**
$$f\pm g,\ fg,\ f/g\ (g(c)\ne0) \text{ are differentiable at } c;\ \ f\circ g \text{ needs } f \text{ differentiable at } g(c)$$
Composition checks a different point · *Use when:* "always differentiable?" MSQs · *e.g.* 2025 Q.24: A, B, C true, D not guaranteed

**Zero slope means constant**
$$f' = 0 \text{ everywhere} \Rightarrow f \text{ constant}$$
From the Mean Value Theorem · *Use when:* $\lvert f(x)-f(y)\rvert \le (x-y)^2$ type · *e.g.* then $f(1)-f(0) = 0$

**Mean Value Theorem**
$$f'(c) = \frac{f(b)-f(a)}{b-a} \text{ for some } c \in (a,b)$$
Somewhere the instant slope equals the average slope · *Use when:* $f$ continuous on $[a,b]$, differentiable inside · *e.g.* $f = x^2$ on $[0,2]$: $2c = 2$, $c = 1$

## Taylor Series

**Taylor series around $a$**
$$f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots$$
Value + slope × step + bending × step² / 2 + ... · *Use when:* approximate near $a$ · *e.g.* $\ln 1.1 \approx 0.1 - 0.005 = 0.095$

**Exponential series**
$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$
All powers, divided by factorials · *Use when:* $e^x$ near 0 · *e.g.* $e^{0.1} \approx 1.105$

**Sine and cosine series**
$$\sin x = x - \frac{x^3}{3!} + \cdots,\qquad \cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$$
Sine (odd) has odd powers; cosine (even) has even powers · *Use when:* limits, coefficients · *e.g.* coefficient of $x^4$ in $\sin x$ is 0

**Log and geometric series**
$$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots,\qquad \frac{1}{1-x} = 1 + x + x^2 + \cdots\quad (\lvert x\rvert<1)$$
Valid only for small $x$ · *Use when:* $\ln$ near 1 · *e.g.* $\ln 1.2 \approx 0.2 - 0.02 = 0.18$

**Coefficient to derivative**
$$f^{(n)}(0) = n! \times (\text{coefficient of } x^n)$$
Read high derivatives from the series · *Use when:* $f^{(n)}(0)$ questions · *e.g.* $x^2e^x$: coefficient of $x^5$ is $\frac16$, so $f^{(5)}(0) = 20$

## Maxima, Minima & Optimization

**Critical points**
$$f'(x) = 0 \ \text{ (or } f' \text{ undefined)}$$
Flat points are the candidates · *Use when:* first step always · *e.g.* $x^3-3x$: $x = \pm1$

**Second derivative test**
$$f'(c)=0:\ f''(c)>0 \Rightarrow \text{local min},\ f''(c)<0 \Rightarrow \text{local max},\ f''(c)=0 \Rightarrow \text{no conclusion}$$
Cup = bottom, cap = top; local only · *Use when:* classify critical points · *e.g.* $x^3-3x$: $f''(1)=6$ min, $f''(-1)=-6$ max

**First derivative test**
$$f' \text{ changes } - \to + \Rightarrow \text{min};\quad + \to - \Rightarrow \text{max};\quad \text{no change} \Rightarrow \text{neither}$$
Down then up is a valley · *Use when:* $f''(c) = 0$ · *e.g.* $x^3$ at 0: $f' = 3x^2 \ge 0$, neither

**Global extremes on $[a,b]$**
$$\text{compare } f(a),\ f(b),\ f(\text{critical points inside})$$
Highest/lowest may be at an end point · *Use when:* an interval is given · *e.g.* $x^3-6x^2+9x+1$ on $[0,5]$: max $21$ at $x=5$

**Open end point**
$$(a, b]:\ f(a) \text{ is never attained}$$
Round bracket = end not included · *Use when:* half-open intervals · *e.g.* 2026 Q.27: $f\to-2$ near $-1$, but min is at $x=2$ only

**Strictly convex function**
$$f''>0 \text{ everywhere} \Rightarrow \text{at most one critical point = unique global min (if it exists)}$$
$f'$ always increases, so crosses 0 at most once · *Use when:* "always true" MSQs · *e.g.* $e^x$: $f''>0$ but no minimum

**Gradient descent step**
$$w_{\text{new}} = w_{\text{old}} - \eta\, f'(w_{\text{old}})$$
Step against the slope, size set by learning rate $\eta$ · *Use when:* one-step update · *e.g.* $f = wx$, $x = 10$, $w = 10$, $\eta = 0.1$: $w = 9$

**Vertex of a parabola**
$$ax^2+bx+c \text{ has its min/max at } x = -\frac{b}{2a}$$
Turning point of a quadratic · *Use when:* min of $f'$ when $f$ is cubic · *e.g.* $x^2+7x+10$: vertex at $x = -3.5$

## Series & Integration (beyond syllabus)

**Geometric series from index 0**
$$\sum_{k=0}^\infty r^k = \frac{1}{1-r}\quad(\lvert r\rvert<1)$$
Total of $1 + r + r^2 + \cdots$ · *Use when:* sum starts at 1 · *e.g.* $r = \frac12$: total 2

**Geometric series from index 1**
$$\sum_{k=1}^\infty r^k = \frac{r}{1-r}\quad(\lvert r\rvert<1)$$
First term is $r$, not 1 · *Use when:* sum starts at $r$ · *e.g.* $r = \frac13$: total $\frac12$

**Factor a double sum**
$$\sum_i\sum_j a_i b_j = \Big(\sum_i a_i\Big)\Big(\sum_j b_j\Big)$$
Product term: multiply two single sums · *Use when:* term like $2^{-i}3^{-j}$ · *e.g.* 2026 Q.35: $2 \times \frac12 = 1$

**Fundamental theorem**
$$\int_a^b f(x)\,dx = F(b) - F(a),\quad F' = f$$
Area = antiderivative at end − at start · *Use when:* any definite integral · *e.g.* $\int_0^2 3x^2\,dx = 8$

**Basic integrals**
$$\int x^n dx = \frac{x^{n+1}}{n+1}\ (n\ne-1),\quad \int e^{ax}dx = \frac{e^{ax}}{a},\quad \int\frac1x dx = \ln\lvert x\rvert$$
Raise the power, divide by the new power · *Use when:* densities, areas · *e.g.* $\int_0^2 cx^2dx = 1 \Rightarrow c = \frac38$
