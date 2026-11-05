# 10X Shop - Plan

## CORE goals
- Login (local simulation), Catalog, Product Details, Cart, Checkout
- Responsive UI, Error Boundary, README, deploy, Git history

## Phases
- **Week 1 (Oct 17-23):** setup, types, routing, Login, Catalog
- **Week 2 (Oct 24-30):** Product Details, Cart, Checkout, first deploy
- **Week 3 (Oct 31-Nov 6):** responsive, errors, deploy, docs, submit

FULL and BONUS features only after CORE is finished.

- Week 1 finished on Oct 23 (started late, caught up using the buffer days)

## Work breakdown (WBS)

The hours are my planned estimates.

| Week | Epic | Task | Planned hours |
| --- | --- | --- | --- |
| 1 | Setup | Vite, strict TypeScript, Tailwind, GitHub repo, PLAN.md | 2 |
| 1 | Foundation | Types, routes, layout, header | 3 |
| 1 | Login | AuthContext, controlled form, validation | 3 |
| 1 | Catalog | API function, loading/error/empty, product card and grid | 5 |
| 2 | Product page | Fetch by id, gallery, quantity picker, stock | 4 |
| 2 | Cart | CartContext, cart page, totals | 5 |
| 2 | Checkout | Controlled form, validation, thank-you page | 4 |
| 2 | Deploy | Vercel, vercel.json rewrite | 2 |
| 3 | Quality | Responsive fixes, focus and hover states | 3 |
| 3 | Errors | Error Boundary, DEBUG-LOG | 2 |
| 3 | Docs | README, REPORT | 3 |
| 3 | Final | Fresh clone check, browser tests, submit | 2 |
| FULL | TypeScript | ApiError, type guards, AsyncState, generics, literal unions | 5 |
| FULL | React | Custom hooks, lazy routes | 3 |
| FULL | Docs | COMPATIBILITY, progress notes, WBS, metrics | 3 |

## Risks

| Risk | Impact | Plan |
| --- | --- | --- |
| I start late | Less time for FULL | Use the buffer days and finish CORE first |
| DummyJSON is slow or down | Catalog fails to load | Loading and error states, retry by reloading |
| Direct links give a 404 on Vercel | Live site breaks on refresh | `vercel.json` rewrite to `index.html` |
| Login and cart are not saved | Refresh empties the cart | Listed as a known limitation in the README |
| A merge breaks the live site | Graded site is broken | Run typecheck, lint and a click-through before each merge |
| Too little time for FULL | FULL stays incomplete | CORE first, then the cheapest FULL items |

## Definition of Done

A task is done when:
- `npm run typecheck` has 0 errors and `npm run lint` passes
- `npm run build` succeeds
- I clicked through the changed pages in the browser, including at 375px width
- the change is committed with a clear message and pushed
- the live Vercel site works after the deploy