# 10X Shop

An online store single-page app built as the 10X Front-end diploma project.

**Live site:** https://10-x-shop-koki.vercel.app

## Features

CORE

- Catalog of products loaded from the DummyJSON API, with loading, error and empty states
- Product cards with category and brand, rating, discount badge, stock badge and Add to cart
- Product details page with image gallery, discounted price, quantity picker, stock limit message and Add to Cart
- Invalid product ids (like `/products/abc` or a product that does not exist) show the 404 page
- Shopping cart with quantity changes, remove, Clear cart, Subtotal and Total, shared through React Context
- Simulated login (local React Context, no real authentication) with username trim and a 6 character password minimum
- Checkout form with validation (name 3+ characters, valid email, address 5+ characters, city) and a local order confirmation (no real payment)
- Guests are redirected from Checkout to Login and returned after logging in; an empty cart sends Checkout back to the Cart
- Responsive layout (375px to desktop) with hover, focus and disabled states
- Shared layout with header and footer, scroll to top on page change, and a 404 page
- Error Boundary so a crash in one page shows a friendly message

FULL (added after CORE)

- Catalog search, category filter, sorting (price and rating) and pagination, with the state kept in the URL so refresh, Back and shared links keep the same view
- Skeleton cards while loading, a Retry button on errors, and AbortController so old requests are cancelled
- Toast messages for add to cart, remove from cart and promo code
- Promo code `10X10` (10 percent off) and shipping ($10, free from $100) with Subtotal, Discount, Shipping and Total lines
- Product page tabs (Description and Details)
- Lazy-loaded routes with React.lazy and Suspense
- Custom hooks (`useCart`, `useAuth`, `useToast`, `useFetch`)
- TypeScript: `ApiError` class, type guards, an `AsyncState` discriminated union, a generic `useFetch<T, A>` hook, a literal union for stock status and utility types (`Pick`, `Record`)

## Tech stack

- React 19 + TypeScript (strict mode)
- Vite
- Tailwind CSS v4
- React Router
- DummyJSON API (https://dummyjson.com)

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run typecheck   # strict TypeScript check, 0 errors expected
npm run build       # production build into dist/
npm run lint        # ESLint
```

## Test account

Username `emilys`, password `emilyspass`. The login is a local simulation, so any username with a password of 6 or more characters also works.

## Project structure

- `src/api` - `products.ts` (fetch functions for DummyJSON) and `ApiError.ts`
- `src/types` - TypeScript types for products, cart items, forms and `AsyncState`
- `src/utils` - price and shipping helpers (`price.ts`), stock status (`stock.ts`) and type guards (`guards.ts`)
- `src/context` - AuthContext, CartContext and the toast context and provider
- `src/hooks` - `useAuth`, `useCart`, `useToast` and `useFetch`
- `src/components` - Layout, Header, Footer, ScrollToTop, ProductCard, ProductGrid, ProductSkeleton, Pagination, QuantityPicker, ErrorBoundary
- `src/pages` - Catalog, ProductDetails, Cart, Checkout, Login, NotFound

## Data flow

The Catalog page reads its search, category, sort and page from the URL. It calls `fetchProducts` in `src/api/products.ts`, which builds the DummyJSON request, and keeps the result as an `AsyncState` (loading, success or error). The Product page loads one product through the generic `useFetch` hook, and `fetchProduct` checks the data with the `isProduct` type guard. AuthContext holds the logged-in username and CartContext holds the cart items and the promo code, and pages read them through `useAuth` and `useCart`. Add to Cart calls `addItem`, which updates the header badge and the Cart page, and the toast provider shows a short message. Prices, shipping, discounts and totals are calculated in one place, `src/utils/price.ts`, so the card, product page, cart and checkout always agree. Checkout reads the cart and the user, saves the order in state when the form is valid, then calls `clearCart`.

## Known limitations

- The cart, the promo code and the login are kept in memory only, so refreshing the page empties the cart and logs the user out
- Login and checkout are simulations: any login with a 6 character password works and no payment is processed
- Search and category filter cannot be combined, because the DummyJSON API does not support both in one request
- Not implemented: dark theme, product reviews, orders page, profile page, Formik and Yup, a demo video

## Documentation

- `PLAN.md` - goals, phases, work breakdown, risks and definition of done
- `REPORT.md` - planned vs delivered, problems, metrics and the development log
- `DEBUG-LOG.md` - bugs I hit and how I fixed them
- `COMPATIBILITY.md` - browsers and screen sizes I tested

## Deployment

Deployed on Vercel. `vercel.json` rewrites every route to `index.html` so direct links such as `/products/5` and page refresh work.

## Test

Tested in Brave and Firefox, including the 375px width: no sideways scrolling and the full shopping flow works. Fresh clone, install, typecheck and build tested in Brave.

## Credits

Product data and images from the DummyJSON API. Built with Vite, React, React Router and Tailwind CSS. AI help from Claude and Gemini (see REPORT.md).