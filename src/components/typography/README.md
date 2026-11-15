# typography

The type scale: nine styles, the matrix H1-H6 and P1-P3, each one set of variables in `typography.css` (size, weight, line height, letter spacing, family), with the breakpoints (sm 40rem, md 48rem) inside the variables. Colour is not part of a style.

| Style | Look (mobile / sm / md) | Weight | Used for |
| --- | --- | --- | --- |
| H1 | 22 / 34 / 88 px, line 26 / 36 / 90 px | 600 | the hero title |
| H2 | 25 / 30 / 40 px, line 1.3 | 500 | section titles |
| H3 | 25 / 25 / 48 px, line 1.3 | 500 | the FAQ title (`as="h2"`) |
| H4 | 16 / 16 / 24 px, line 1.5 | 400 | an accordion item title (`as="span"`) |
| H5 | 14 / 20 / 38 px, line 20 / 28 / 52 px | 400 | the lead under the hero title (`as="p"`) |
| H6 | 14 / 14 / 16 px, line 1.4 | 500 | captions and labels: production captions, the language menu |
| P1 | 14 / 16 / 16 px, line 1.4 / 26 px | 400 | body text, and the bare `p` |
| P2 | 14 / 14 / 20 px, line 1.625 | 300 | light body text: the FAQ answers |
| P3 | 12 / 14 / 18 px, line 2 | 600 on phones, 400 from sm | small text: contacts, map points, the scheme link |

Use them as components (`<H2 as="h2" class="text-center">`) or as the classes `text-h1` … `text-p3`, which the UnoCSS rule in `configs/uno/rules.ts` makes from the same variables. A bare `h1`-`h6` or `p` has the style of its tag (the element defaults in the base layer). `as` sets the tag by meaning; the look is the style. Every text of the site goes through one of these.

Exceptions to the matrix (a file that keeps a raw font size, weight or line height outside this folder and `app/styles`): none. The guard test `src/app/tests/typography.test.ts` enforces this and fails on a stale entry.

- `index.ts`: exports `H1` … `H6`, `P1` … `P3`.
- `typography.css`: the variables and the element defaults.
