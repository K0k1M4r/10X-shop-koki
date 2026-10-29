Development log

Day 1: Project setup

Vite
Ran npm create vite@latest 10x-shop-koki -- --template react-ts and chose ESLint as the linter to catch mistakes like unused variables. I first ran my installs one folder too high, so npm run dev said "Missing script". Fixed it by working inside 10x-shop-koki.

Tailwind
Installed tailwindcss and @tailwindcss/vite (react-router-dom came along in the same command). Added tailwindcss() to the plugins in vite.config.ts, replaced index.css with @import "tailwindcss";, and deleted App.css. Tested it with bg-blue-600 p-4 text-white on a div and saw a blue strip.

tsconfig.app.json and the typecheck script
"strict": true was missing in tsconfig.app.json, so I added it, plus "typecheck": "tsc -b" in package.json. Strict mode flags more mistakes and the PRD requires 0 errors, and the script checks the whole project without building it.

eslint.config.js
Came with the Vite template. npm run lint checks for mistakes like unused variables and wrong hook usage, and on Day 6 I added .history to globalIgnores.

.gitignore, GitHub repo, PLAN.md
The .gitignore came with the Vite template. I made a public GitHub repo, pushed my code, and wrote a short PLAN.md with the goals and the 3 weekly phases.


Day 2: Types, layout and routes

index.ts
Added interfaces in types for a product, the products response, cart items, the login form and the checkout form.

App.tsx
Routed catalog, login, product details, cart, checkout and a Not Found page.

main.tsx
Wrapped the app in BrowserRouter so routing works, with AuthProvider and CartProvider inside so login and cart data are available anywhere, all in StrictMode.

React Router
Used NavLink in the header so links switch pages without a reload. Hit a blank "Invalid hook call" error because my extra install gave me two copies of React, and reinstalling inside the project folder fixed it.

Layout.tsx, Header.tsx and pages
Layout wraps every page with the header using children, and Header is the blue nav bar. I also made six empty pages with just a heading so each route had something to show.


Day 3: Login

AuthContext.tsx
I created the user authentication context by setting up an AuthContext blueprint to track whether a user is logged in. Then I built the AuthProvider component with state to hold the active username, along with casual login and logout functions to update or clear that state across any component that needs it.

Login.tsx
A form with username and password that shows a red message if one is empty. After logging in it sends you back to the page you came from.

Header.tsx
Shows "Hi, name" and a Logout button when you're logged in.

Checkout redirect
If you're not logged in, Checkout sends you to Login and then back.


Day 4: Catalog data

products.ts
I added asynchronous fetch functions to talk directly to the dummyjson API. I created fetchProducts to bring in the entire batch of items wrapped as a ProductsResponse, and added fetchProduct to pinpoint and grab a single item's details using its unique ID, while making sure both catch and throw clean error messages if a network request fails.

Catalog.tsx
Fetches the products when the page opens and shows loading, error or empty messages. I used an ignore flag in the useEffect cleanup so it doesn't update after you leave.


Day 5: Cards and grid

ProductCard.tsx
Made a card for one product with the picture, name and price, and the whole thing is a link to its page. Added a little hover shadow so it feels clickable.

ProductGrid.tsx
Loops over all the products with map and makes a card for each, using the product id as the key. It's 1 column on phones, 2 on tablets and 4 on desktop.


Day 6: .history cleanup

A VS Code extension had been saving backup copies of my files into a .history folder, and git add . committed them.
Lint then showed 16 errors, and 15 of them were from those backups.
Fixed it by adding .history to .gitignore, running git rm -r --cached .history, and adding it to globalIgnores in eslint.config.js.
The last real error was a fast-refresh warning in AuthContext.tsx, which I silenced with an ESLint disable comment.


Day 7: REPORT.md

wrote REPORT.md for Week 1, with what I built, the problems I hit and what I'd do next.


Day 8: Product details

ProductDetails.tsx
Used useParams to grab the id from the address and fetchProduct to load that one product. Shows the image, title, description, price and stock, and a wrong id just shows a message with a back link instead of crashing.


Day 9: Image picker and quantity

ProductDetails.tsx (again)
Added little thumbnails under the big picture, and clicking one swaps it. Added a quantity picker that can't go below 1 or above the stock, plus an Add to Cart button that only console.logged at first.


Day 10: Cart

CartContext.tsx
I built out the core shopping cart logic using React Context to manage a global state of items. I implemented a robust addItem function that stacks quantities for duplicates while respecting inventory caps with Math.min, added removeItem and clearCart handlers, wrote a setQuantity updater that automatically purges items dropped below 1, and dynamically calculated the total badge count using reduce.

Header.tsx
Added a little badge by the Cart link showing how many items are in the cart.


Day 11: Cart page

Cart.tsx
Lists everything in the cart with its picture, quantity buttons, a Remove link and the line total, then the grand total at the bottom. An empty cart shows a message with a link back to the shop. I also added stock to the cart items so the + button stops at the limit.


Day 12: Checkout

Checkout.tsx
Made a form with Full name, Email, Address and City, and each one shows a red message if it's empty or the email looks wrong. If everything's fine it shows a thank you page with the order and empties the cart using the new clearCart.


Day 13: Refactor

QuantityPicker.tsx
I built a smart item amount adjuster component that takes in a current value, an upper limit, and a function callback to pass updates back up. I added safety validation constraints directly onto the minus and plus button elements to keep numbers bounded properly, ensuring users can never step below 1 or buy past the available inventory count, while throwing in style adjustments for disabled operational states.


Day 14: Responsive design

Opened DevTools at 375px and clicked through every page looking for sideways scrolling. The header and the cart footer were overflowing, so I fixed them with flex-wrap.


Day 15: Hover, focus and disabled states

Added focus styles (blue border and ring) to the inputs and buttons, and a grey hover on the + and − buttons. Then I ran the whole shopping flow twice, once as a guest and once logged in.


Day 16: DEBUG-LOG and Error Boundary

added a DEBUG-LOG table with each bug, how I found it and how I fixed it. It covers the wrong folder, the invalid hook call, the bad import path, the .history files, the fast-refresh lint error, and the erasableSyntaxOnly underline.
Same day I added the Error Boundary. My first test failed because I put useLocation and the test throw outside their functions, so I moved them inside.

ErrorBoundary.tsx
A class component that shows "Something went wrong" and a Reload button instead of a blank page. I wrapped the routes in App.tsx with it and tested it by throwing an error in Cart on purpose.


Day 17: vercel.json and the Vercel deploy

My app is really one page, so opening /products/5 directly or refreshing gives a 404 on the server.
Added vercel.json with a rewrite that sends every route to index.html, so React Router can show the right page.
Deployed by importing my GitHub repo on Vercel (Vite preset, build command npm run build, output folder dist).
Tested direct links and refresh on the live site.
Before that, I cloned my repo fresh and ran npm install, typecheck and build to make sure it works for someone else.


Day 18: README.md

Replaced the Vite template text with a real README: what the project is, the live link, features, tech stack, how to run it, the folder structure and the known limitations.
Added this development log, so each file is explained by the day I built it.


Known limitations

The cart and the login are kept in memory only, so refreshing the page empties the cart and logs the user out
Login and checkout are simulations: any non-empty login works and no payment is processed
Only CORE features are implemented (no search, filters, sorting, reviews or orders page)