Development log
Day 1 (Oct __): Project setup

Vite

Ran npm create vite@latest 10x-shop-koki -- --template react-ts, which makes a React + TypeScript project.
At the prompts, chose ESLint as the linter for it to notice the mistakes, like unused variables or misused React hooks.
Went into the folder and ran npm install.
Mistake along the way: I first ran installs one folder too high, so npm run dev said "Missing script". Fixed by working inside 10x-shop-koki.

Tailwind

Installed with npm install tailwindcss @tailwindcss/vite react-router-dom (the router came along in the same command).
Connected it in two places: in vite.config.ts I imported tailwindcss from @tailwindcss/vite and added tailwindcss() to the plugins list next to react(). In src/index.css I replaced everything with one line: @import "tailwindcss";.
Deleted App.css, since Tailwind replaces it.
Tested it by putting bg-blue-600 p-4 text-white on a div in App.tsx, and saw a blue strip with white text.

tsconfig.app.json and the typecheck script

Opened tsconfig.app.json and found "strict": true was missing, so I added it under compilerOptions.
In package.json, under scripts, added "typecheck": "tsc -b" (It gave me a shortcut command, npm run typecheck, that checks the whole project for TypeScript errors without building anything.)
Why: strict mode makes TypeScript flag more mistakes (like unknown types or possibly-empty values), and the PRD requires strict mode with 0 errors.
Ran npm run typecheck and npm run build: no errors.

eslint.config.js

Came with the Vite template because I picked ESLint during setup.
npm run lint checks the code for mistakes and style problems, like unused variables, wrong React hook usage, and fast-refresh issues.
I changed it later (on Day 6): added .history to globalIgnores so ESLint stopped checking the backup folder.

.gitignore, GitHub repo, PLAN.md

[write in your own words: your repo and plan]
Day 2 (Oct __): Types, layout and routes

index.ts added index.ts in types added interfaces of individual product responce from products the items state while they are in cart login form checkout form validation

App.tsx routed cataloge, login, product details, cart, checkout routed error handler Not Found

main.tsx I set up the main entry point of the app by wrapping everything in BrowserRouter so our routing works smoothly. Then I layered in the AuthProvider and CartProvider so the login status and shopping cart data are accessible anywhere in the app, and finally kicked it all off inside React's StrictMode.

Day 3 (Oct __): Login

AuthContext.tsx I created the user authentication context by setting up an AuthContext blueprint to track whether a user is logged in. Then I built the AuthProvider component with state to hold the active username, along with casual login and logout functions to update or clear that state across any component that needs it.

Day 4 (Oct __): Catalog data

products.ts I added asynchronous fetch functions to talk directly to the dummyjson API. I created fetchProducts to bring in the entire batch of items wrapped as a ProductsResponse, and added fetchProduct to pinpoint and grab a single item's details using its unique ID, while making sure both catch and throw clean error messages if a network request fails.

Day 10 (Oct __): Cart

CartContext.tsx I built out the core shopping cart logic using React Context to manage a global state of items. I implemented a robust addItem function that stacks quantities for duplicates while respecting inventory caps with Math.min, added removeItem and clearCart handlers, wrote a setQuantity updater that automatically purges items dropped below 1, and dynamically calculated the total badge count using reduce.

Day 13 (Oct __): Refactor

QuantityPicker.tsx I built a smart item amount adjuster component that takes in a current value, an upper limit, and a function callback to pass updates back up. I added safety validation constraints directly onto the minus and plus button elements to keep numbers bounded properly, ensuring users can never step below 1 or buy past the available inventory count, while throwing in style adjustments for disabled operational states.


Known limitations
The cart and the login are kept in memory only, so refreshing the page empties the cart and logs the user out
Login and checkout are simulations: any non-empty login works and no payment is processed
Only CORE features are implemented (no search, filters, sorting, reviews or orders page)