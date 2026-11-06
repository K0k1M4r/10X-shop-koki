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
- On Nov 4 I got a grading checklist for the Oct 26 version. I fixed the missing CORE items from it: Footer, ScrollToTop, full 404 page, Log in / Log out texts, Login validation, product card details, discounts on the product page and cart, Clear cart, and the Checkout validation and thank-you text. Then I matched the exact error texts to Appendix A of the PRD.
- On Nov 5 and Nov 6 I started on FULL items, each with a GitHub Issue, a branch and a merged pull request: ApiError, type guards, AsyncState, a generic useFetch hook, literal unions and utility types, custom hooks, lazy routes, toast notifications, product page tabs, catalog search, category filter, sorting and pagination, promo code with shipping, product reviews and a dark and light theme. I also added COMPATIBILITY.md, weekly progress notes, and a WBS with risks and a definition of done in PLAN.md.

## What I did not do

- A measured React.memo with the Profiler (Issue #17) and the demo video (Issue #22).
- Orders page, Profile page, Formik and Yup, a reducer-based cart and saving the cart in localStorage.
- A Lighthouse run before my changes. I only have a run on the final version, so the table below has no "before" column.
- The cart, the promo code and the login are not saved, so a refresh empties the cart and logs the user out.
- The dark theme uses colour rules in `index.css` instead of `dark:` classes in every component. It works on every page, but it is the quick approach.

## Metrics

| Metric | Value |
| --- | --- |
| Commits on `main` | 95 |
| Different days with commits | 8 |
| Merged pull requests | 18 |
| GitHub Issues (total / closed) | 22 / 19 |
| Lighthouse (mobile, live site, final version) | Performance 85, Accessibility 95, Best Practices 96, SEO 83 |
| Main JavaScript bundle | 267.26 kB (85.14 kB gzipped) |
| CSS | 18.59 kB (4.46 kB gzipped) |
| Page chunks (lazy-loaded) | Catalog 7.13 kB, ProductDetails 4.48 kB, Cart 3.83 kB, Checkout 3.15 kB, Login 2.01 kB |

I did not reach 40 commits over 15 different days, because I started late and worked in a few long days.

## 3 problems I hit

1. **Installing in the wrong folder.** I ran my installs one folder too high, so `npm run dev` said "Missing script" and then the page was blank with an "Invalid hook call" error (two copies of React). I fixed it by reinstalling inside the project folder. Details in DEBUG-LOG.md, bugs 1 and 2.
2. **Backup files in Git.** A VS Code extension saved copies of my files in a `.history` folder and `git add .` committed them, which caused 15 lint errors. I ignored the folder in `.gitignore` and in ESLint (bug 4).
3. **Error Boundary test broke the app.** I put `useLocation` and the test `throw` outside their functions. I moved them inside the components (bug 6).

I also forgot to save `products.ts` in one pull request, so a missing product showed a red "Product not found" message instead of the 404 page. I noticed it when I tested `/products/999999` and fixed it in a second pull request.

## How I used AI

I used Claude as a step-by-step guide. For each day it gave me the code and the steps, and I pasted it, ran it, tested it and fixed the errors I hit, then committed each step myself. I also used it to learn what things do, for example strict mode, `useEffect` dependencies and the SPA rewrite in `vercel.json`. I used Gemini to draft the first descriptions of some files, and I then rewrote them in my own words. The plan, the commits and the notes below are my own.

## Test

Tested in Brave and Firefox, including the 375px width: no sideways scrolling and the full shopping flow works. Fresh clone, install, typecheck and build tested in Brave. More in COMPATIBILITY.md.

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

**Login.tsx**
Added a "← Back to catalog" link, trimmed the username, and made the password need at least 6 characters, with "Password must be at least 6 characters" under the field.

**types/index.ts, utils/price.ts and products.ts**
Added `discountPercentage`, `rating` and an optional `brand` to the `Product` type. Made `utils/price.ts` with `discountedPrice` and `formatPrice`, so prices are worked out in one place and show like `$1,299.00`. The catalog now asks for 12 products with `limit` and `skip`, and `fetchProduct` tells a missing product (404) apart from other errors.

**ProductCard.tsx**
The card now shows category and brand, the rating, the discounted price with the old price crossed out and a `−N%` badge, and a stock badge. Added an Add to cart button that is disabled at 0 stock, and `loading="lazy"` with width and height on the image. The button sits outside the link, so clicking it doesn't open the product page.

**ProductDetails.tsx**
Shows the discounted price with the old price crossed out and a `−N%` badge. A bad id like `/products/abc` shows the 404 page without sending a request, and so does a product that doesn't exist. I split it into two components with `key={id}`, so going to another product starts clean. The quantity picker now counts what's already in the cart and shows a message when you've added all the stock.

**Cart.tsx, CartContext.tsx and price helpers**
Cart items now keep `discountPercentage`, and `price.ts` got `unitPrice`, `lineTotal` and `cartTotal` so the cart and checkout use the same math. On the Cart page the item titles link to the product, and there are separate Subtotal and Total lines. I also added a Clear cart button that uses `clearCart`.

**Checkout.tsx**
Full name needs at least 3 characters and the address at least 5, with messages under the fields. An empty cart sends you to `/cart`. Place order greys out while submitting (a short 0.8 second wait), then it shows "Thank you! Your order has been placed." and empties the cart.

## Nov 5: Spec texts and TypeScript

**Appendix A check**
Compared my texts with Appendix A of the PRD. In Checkout, an empty or too short name, email or address now shows the one exact message from the table. Clear cart asks for a confirmation first, the Login button says "Log In", the cards say "Out of stock" at 0 stock, and the product page shows "In stock", "Only N left!" or "Out of stock".

**ApiError (Issue #1)**
Made `src/api/ApiError.ts`, an error class that carries the HTTP status. The fetch functions throw it, and the product page shows the 404 page when the status is 404. In my first pull request I forgot to save `products.ts`, so a missing product showed a red message instead. A second pull request fixed that.

**Type guards (Issue #2)**
Made `src/utils/guards.ts` with `isApiError` and `isProduct`. `fetchProduct` now checks that the data really looks like a product.

**AsyncState (Issue #3)**
Made `src/types/async.ts`, a type with the states idle, loading, success and error, so the product page holds one state instead of three.

**useFetch (Issue #4)**
Made a generic `useFetch<T, A>` hook in `src/hooks` that fetches data and returns the `AsyncState` and the raw error.

**Literal unions and utility types (Issue #5)**
Made `src/utils/stock.ts` with a `StockStatus` type (`'in-stock' | 'low-stock' | 'out-of-stock'`), `Pick<Product, 'stock'>` and `Record<StockStatus, string>`.

**Custom hooks (Issue #6)**
Added `useCart` and `useAuth`, so Cart, Checkout and ProductDetails no longer call `useContext` with the context object.

**Lazy routes (Issue #7)**
Pages are loaded with `React.lazy`, and Layout wraps them in `Suspense` with a "Loading..." line. The build now has one small file per page.

**COMPATIBILITY.md and PLAN.md (Issues #21 and #19)**
Wrote down the browsers and screen sizes I tested, and added a work breakdown with hours, risks and a definition of done to `PLAN.md`.

**Toast notifications (Issue #8)**
Added a toast provider and a `useToast` hook. "Added to cart ✓" and "Removed from cart" show for about 2.5 seconds in the bottom corner.

## Nov 6: Product page and catalog features

**ProductCard.tsx**
The Add to cart button on a card now shows the toast too, and the low-stock badge says "Only N left!" like the product page.

**Product page tabs (Issue #10)**
Description and Details tabs under the buy button. Details shows category, brand, rating, stock and discount.

**Catalog search, filter, sort and pagination (Issues #12, #13, #14)**
The catalog has a search box, a category select, a sort select and page buttons. Everything is stored in the URL, so refresh, Back and shared links keep the same view. Requests use `AbortController`, loading shows skeleton cards, and errors have a Retry button. Search and category can't be combined because the API can't do both in one request.

**Promo code and shipping (Issue #11)**
The Cart has a promo code box. `10X10` in any letter case takes 10% off, and anything else shows "Invalid promo code". Shipping is $10 and free from $100. The cart shows Subtotal, Discount, Shipping and Total, and Checkout uses the same total from `price.ts`.

**Product reviews (Issue #15)**
Added a Reviews tab on the product page. It shows the reviews that come with the product from the API and the ones I add myself, plus a "★ average · N reviews" line. The review form (`ReviewForm.tsx`) needs a rating and a comment of at least 10 characters, shows the exact error texts from Appendix A, and then shows a "Review added ✓" toast. New reviews are saved in localStorage under `shop_reviews`, and the reviewer name is the logged-in user or "Guest". Reviews from the API are checked with an `isReview` type guard, because they come in as `unknown`.

**Dark and light theme (Issue #9)**
Added a toggle button in the header and a `useTheme` hook. The hook adds or removes a `dark` class on the page and saves the choice in localStorage under `shop_theme`, so a refresh keeps it. To save time I did the dark colours as rules in `index.css` that re-colour the light classes I already use, instead of adding `dark:` classes to every component. It works on all pages, and the cleaner long-term way would be `dark:` classes in each component.

**Progress notes (Issue #18)**
Wrote the three weekly progress notes in `docs/progress`, with estimated hours because I did not track my time.

## Known limitations

- The cart, the promo code and the login are kept in memory only, so refreshing the page empties the cart and logs the user out. The theme and the reviews I add are saved in localStorage.
- Login and checkout are simulations: any login with a 6 character password works and no payment is processed.
- Search and category filter cannot be combined.
- The dark theme uses colour rules in `index.css`, so a new colour class would need a matching rule there.
- Not implemented: orders page, profile page, Formik and Yup, a demo video.