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