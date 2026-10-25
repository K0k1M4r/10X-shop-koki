# 10X Shop

An online store single-page app built as the 10X Front-end diploma project.

**Live site:** https://your-link.vercel.app

## Features (CORE)

- Catalog of products loaded from the DummyJSON API, with loading, error and empty states
- Product details page with image gallery, quantity picker and Add to Cart
- Shopping cart with quantity changes, remove and totals, shared through React Context
- Simulated login (local React Context, no real authentication)
- Checkout form with validation and a local order confirmation (no real payment)
- Guests are redirected from Checkout to Login and returned after logging in
- Responsive layout (375px to desktop) with hover, focus and disabled states
- Error Boundary so a crash in one page shows a friendly message

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

## Project structure

- `src/api` - functions that fetch data from DummyJSON
- `src/types` - TypeScript types for products, cart items and forms
- `src/context` - AuthContext and CartContext
- `src/components` - Layout, Header, ProductCard, ProductGrid, QuantityPicker, ErrorBoundary
- `src/pages` - Catalog, ProductDetails, Cart, Checkout, Login, NotFound

## Known limitations

- The cart and the login are kept in memory only, so refreshing the page empties the cart and logs the user out
- Login and checkout are simulations: any non-empty login works and no payment is processed
- Only CORE features are implemented (no search, filters, sorting, reviews or orders page)

## Deployment

Deployed on Vercel. `vercel.json` rewrites every route to `index.html` so direct links such as `/products/5` and page refresh work.