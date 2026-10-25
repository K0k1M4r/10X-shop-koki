# 10X Shop - Report
<!-- really I made it in 2 days -->
## Week 1 (Oct 17-23)

### What I built
- Project setup: Vite + React + TypeScript (strict) + Tailwind CSS v4
- Core types for products, cart and forms
- Layout, Header and routes for all six pages
- Simulated login with AuthContext, and a Checkout redirect for guests
- Catalog that fetches products from DummyJSON with loading, error and empty states
- ProductCard and ProductGrid with a responsive layout

### Problems and how I fixed them
- **Wrong folder:** I installed packages one folder too high, so `npm run dev` had no script. Fixed by working inside the project folder and reinstalling there.
- **Invalid hook call (blank page):** React was installed twice because of that mistake. Fixed with a clean reinstall.
- **Bad import path in main.tsx:** I used `../src/context/...` instead of `./context/...`.
- **Backup files in Git:** a VS Code extension saved `.history` files that got committed. Fixed by adding `.history` to `.gitignore` and ESLint's ignore list.

### What I learned
(Write 2-3 sentences in your own words.)

### Plan for Week 2
- Product Details page, Cart (context), Checkout form and confirmation
- First deployment to Vercel or Netlify


## DEBUG-LOG

| # | Problem | How I found it | Fix |
|---|---------|----------------|-----|
| 1 | `npm run dev`: "Missing script" | Read the terminal error, then ran `dir` and saw no `src` folder | I was one folder too high; moved into the project folder |
| 2 | Blank page, "Invalid hook call" in the console | Browser console (F12) | Two copies of React from the extra install; deleted `node_modules` and reinstalled inside the project |
| 3 | Yellow underline on the `AuthProvider` import | Hovered over it in VS Code | Wrong path (`../src/...`); also I hadn't wrapped `<App />` yet |
| 4 | `.history` backup files in Git and lint errors | `git status` and `npm run lint` output | Added `.history` to `.gitignore` and to ESLint's ignore list |
| 5 | Lint: Fast refresh error in `AuthContext.tsx` | `npm run lint` | Added an ESLint disable comment for that line (file exports a context and a component) |
| 6 | Red underline on `erasableSyntaxOnly` | Problems tab in VS Code | VS Code's built-in TypeScript was older; typecheck and build still passed, so I ignored it |