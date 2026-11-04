# 10X Shop - Report

## Planned vs delivered

**Week 1 (Oct 17-23)**
- Planned: setup, types, routing, Login, Catalog.
- Delivered: all of it. I started a few days late (Oct 21) and caught up by Oct 24.

**Week 2 (Oct 24-30)**
- Planned: Product Details, Cart, Checkout, first deploy.
- Delivered: all of it, plus a QuantityPicker refactor so the +/- buttons use one callback prop.

**Week 3 (Oct 31 - Nov 6)**
- Planned: responsive, hover/focus states, errors, deploy, docs, submit.
- Delivered: responsive fixes, focus and disabled states, Error Boundary, Vercel deploy, README, PLAN, REPORT and DEBUG-LOG.
- On Nov 4 I got a grading checklist for the Oct 26 version. I am fixing the missing CORE items from it before the deadline. Done so far: Footer, ScrollToTop, full 404 page, Log in / Log out texts, logout redirect and Error Boundary texts.

## What I did not do

- FULL and BONUS features: search, categories, sorting, pagination, reviews, related products, Orders, Profile, lazy routes, `@theme`, dark mode.
- The cart and login are not saved, so a refresh empties the cart and logs the user out.
- Still open as of Nov 4 (from the grading checklist): discount prices and card details, "Clear cart" button, exact validation texts on Login and Checkout, and a Firefox check.

## 3 problems I hit

1. **Installing in the wrong folder.** I ran my installs one folder too high, so `npm run dev` said "Missing script" and then the page was blank with an "Invalid hook call" error (two copies of React). I fixed it by reinstalling inside the project folder. Details in DEBUG-LOG.md, bugs 1 and 2.
2. **Backup files in Git.** A VS Code extension saved copies of my files in a `.history` folder and `git add .` committed them, which caused 15 lint errors. I ignored the folder in `.gitignore` and in ESLint (bug 4).
3. **Error Boundary test broke the app.** I put `useLocation` and the test `throw` outside their functions. I moved them inside the components (bug 6).

## How I used AI

I used Claude as a step-by-step guide. For each day it gave me the code and the steps, and I pasted it, ran it, tested it and fixed the errors I hit, then committed each step myself. I also used it to learn what things do, for example strict mode, `useEffect` dependencies and the SPA rewrite in `vercel.json`. I used Gemini to draft the first descriptions of some files, and I then rewrote them in my own words. The plan, the commits and the notes below are my own.

---

# Development log

## Day 1: Project setup

**Vite**
Ran `npm create vite@latest 10x-shop-koki -- --template react-ts` and chose ESLint as the linter to catch mistakes like unused variables. I first ran my installs one folder too high, so `npm run dev` said "Missing script". Fixed it by working inside `10x-shop-koki`.

**Tailwind**
Installed `tailwindcss` and `@tailwindcss/vite` (`react-router-dom` came along in the same command). Added `tailwindcss()` to the plugins in `vite.config.ts`, replaced `index.css` with `@import "tailwindcss";`, and deleted `App.css`. Tested it with `bg-blue-600 p-4 text-white` on a div and saw a blue strip.

**tsconfig.app.json and the typecheck script**
`"strict": true` was missing in `tsconfig.app.json`, so I added it, plus `"typecheck": "tsc -b"` in `package.json`. Strict mode flags more mistakes and the PRD requires 0 errors, and the script checks the whole project without building it.

**eslint.config.js**
Came with the Vite template. `npm run lint` checks for mistakes like unused variables and wrong hook usage, and on Day 6 I added `.history` to `globalIgnores`.

**.gitignore, GitHub repo, PLAN.md**
The `.gitignore` came with the Vite template. I made a public GitHub repo, pushed my code, and wrote a short `PLAN.md` with the goals and the 3 weekly phases.

## Day 2: Types, layout and routes

**index.ts**
Added interfaces in `types` for a product, the products response, cart items, the login form and the checkout form.

**App.tsx**
Routed catalog, login, product details, cart, checkout and a Not Found page.

**main.tsx**
Wrapped the app in `BrowserRouter` so routing works, all in `StrictMode`. The `AuthProvider` and `CartProvider` went inside it later, on Day 3 and Day 10, so login and cart data are available anywhere.

**React Router**
Used `NavLink` in the header so links switch pages without a reload. Hit a blank "Invalid hook call" error because my extra install gave me two copies of React, and reinstalling inside the project folder fixed it.

**Layout.tsx, Header.tsx and pages**
Layout puts the header on every page, and Header is the blue nav bar. At first Layout wrapped the pages with `children`, and later I changed it to `<Outlet />` (see Nov 4). I also made six empty pages with just a heading so each route had something to show.

## Day 3: Login

**AuthContext.tsx**
Made a context that holds the logged-in username, with `login` and `logout` functions that set or clear it. Any component can read it, so I don't have to pass props down.

**Login.tsx**
A form with username and password that shows a red message if one is empty. After logging in it sends you back to the page you came from.

**Header.tsx**
Shows "Hi, name" and a log out button when you're logged in.

**Checkout redirect**
If you're not logged in, Checkout sends you to Login and then back.

## Day 4: Catalog data

**products.ts**
Wrote `fetchProducts` and `fetchProduct` to get data from the DummyJSON API. Both throw a clear error message if the request fails.

**Catalog.tsx**
Fetches the products when the page opens and shows loading, error or empty messages. I used an `ignore` flag in the `useEffect` cleanup so it doesn't update after you leave.

## Day 5: Cards and grid

**ProductCard.tsx**
Made a card for one product with the picture, name and price, and the whole thing is a link to its page. Added a little hover shadow so it feels clickable.

**ProductGrid.tsx**
Loops over all the products with `map` and makes a card for each, using the product id as the key. It's 1 column on phones, 2 on tablets and 4 on desktop.

## Day 6: .history cleanup

A VS Code extension had been saving backup copies of my files into a `.history` folder, and `git add .` committed them. Lint then showed 16 errors, and 15 of them were from those backups. Fixed it by adding `.history` to `.gitignore`, running `git rm -r --cached .history`, and adding it to `globalIgnores` in `eslint.config.js`. The last real error was a fast-refresh warning in `AuthContext.tsx`, which I silenced with an ESLint disable comment.

## Day 7: Week 1 report

Wrote the Week 1 report with what I built, the problems I hit and what I'd do next.

## Day 8: Product details

**ProductDetails.tsx**
Used `useParams` to grab the id from the address and `fetchProduct` to load that one product. Shows the image, title, description, price and stock, and a wrong id just shows a message with a back link instead of crashing.

## Day 9: Image picker and quantity

**ProductDetails.tsx (again)**
Added little thumbnails under the big picture, and clicking one swaps it. Added a quantity picker that can't go below 1 or above the stock, plus an Add to Cart button that only `console.log`ged at first.

## Day 10: Cart

**CartContext.tsx**
Made the shared cart with `addItem`, `removeItem` and `setQuantity`. Adding a product that's already in the cart raises its quantity (capped at the stock with `Math.min`), and setting a quantity below 1 removes the item. The updates make new arrays instead of changing the old one, and the header badge number comes from `reduce`.

**Header.tsx**
Added a little badge by the Cart link showing how many items are in the cart.

## Day 11: Cart page

**Cart.tsx**
Lists everything in the cart with its picture, quantity buttons, a Remove link and the line total, then the grand total at the bottom. An empty cart shows a message with a link back to the shop. I also added stock to the cart items so the + button stops at the limit.

## Day 12: Checkout

**Checkout.tsx**
Made a form with Full name, Email, Address and City, and each one shows a red message if it's empty or the email looks wrong. If everything's fine it shows a thank you page with the order and empties the cart using the new `clearCart`.

## Day 13: Refactor

**QuantityPicker.tsx**
The +/- buttons were written twice, so I made one component for them. It takes the current value, the max and an `onChange` function, and the buttons stop at 1 and at the stock. The disabled buttons look greyed out.

## Day 14: Responsive design

Opened DevTools at 375px and clicked through every page looking for sideways scrolling. The header and the cart footer were overflowing, so I fixed them with `flex-wrap`.

## Day 15: Hover, focus and disabled states

Added focus styles (blue border and ring) to the inputs and buttons, and a grey hover on the + and - buttons. Then I ran the whole shopping flow twice, once as a guest and once logged in.

## Day 16: Error Boundary and DEBUG-LOG

**ErrorBoundary.tsx**
A class component that shows "Something went wrong." and a Reload button instead of a blank page. I wrapped the routes with it and tested it by throwing an error in Cart on purpose. My first test failed because I put `useLocation` and the test `throw` outside their functions, so I moved them inside.

**DEBUG-LOG.md**
A table of the bugs I hit, how I found each one and how I fixed it. It covers the wrong folder, the invalid hook call, the bad import path, the `.history` files, the fast-refresh lint error and the Error Boundary test.

## Day 17: vercel.json and the Vercel deploy

My app is really one page, so opening `/products/5` directly or refreshing gives a 404 on the server. Added `vercel.json` with a rewrite that sends every route to `index.html`, so React Router can show the right page. Deployed by importing my GitHub repo on Vercel (Vite preset, build command `npm run build`, output folder `dist`) and tested direct links and refresh on the live site. Before that, I cloned my repo fresh and ran `npm install`, typecheck and build to make sure it works for someone else.

## Day 18: README.md

Replaced the Vite template text with a real README: what the project is, the live link, features, tech stack, how to run it, the folder structure and the known limitations.

## Nov 4: Fixes from the grading checklist

**Footer.tsx and ScrollToTop.tsx**
Added a footer that shows on every page, and a small component that scrolls the page back to the top whenever the address changes.

**Layout.tsx and App.tsx**
Changed Layout to use `<Outlet />`, so `App.tsx` now has one layout route and every page is drawn inside it. The Error Boundary moved into Layout, so the header and footer stay visible if a page crashes.

**NotFound.tsx**
Made a full 404 page with a heading, a short description and a "Go to catalog" link.

**Header.tsx and ErrorBoundary.tsx**
Changed the texts to "Log in" and "Log out", and logging out now sends you to the home page. The Error Boundary now says "Something went wrong." with a "Reload" button.

## Known limitations

- The cart and the login are kept in memory only, so refreshing the page empties the cart and logs the user out.
- Login and checkout are simulations: any non-empty login works and no payment is processed.
- Only CORE features are implemented (no search, filters, sorting, reviews or orders page).