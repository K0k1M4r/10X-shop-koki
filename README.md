# 10X Shop

An online store single-page app built as the 10X Front-end diploma project.

**Live site:** https://10-x-shop-koki.vercel.app

## Features (CORE)

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

- `src/api` - functions that fetch data from DummyJSON
- `src/types` - TypeScript types for products, cart items and forms
- `src/utils` - price helpers (discountedPrice, formatPrice, unitPrice, lineTotal, cartTotal)
- `src/context` - AuthContext and CartContext
- `src/components` - Layout, Header, Footer, ScrollToTop, ProductCard, ProductGrid, QuantityPicker, ErrorBoundary
- `src/pages` - Catalog, ProductDetails, Cart, Checkout, Login, NotFound

## Data flow

The Catalog and Product pages call `fetchProducts` and `fetchProduct` in `src/api/products.ts`, which load data from DummyJSON and return it typed, and the page keeps it in state. The catalog asks for 12 products with `limit` and `skip`. AuthContext holds the logged-in username and CartContext holds the cart items, and the Header, Cart, Checkout and Product pages read them with `useContext`. Add to Cart (on a product card or the product page) calls `addItem`, which updates the header badge and the Cart page. Prices, line totals and the cart total are calculated in one place, `src/utils/price.ts`, so the card, product page, cart and checkout always agree. Checkout reads the cart and the user, saves the order in state when the form is valid, then calls `clearCart`.

## Known limitations

- The cart and the login are kept in memory only, so refreshing the page empties the cart and logs the user out
- Login and checkout are simulations: any login with a 6 character password works and no payment is processed
- Only CORE features are implemented (no search, filters, sorting, pagination, reviews or orders page)

## Deployment

Deployed on Vercel. `vercel.json` rewrites every route to `index.html` so direct links such as `/products/5` and page refresh work.

## Credits

Product data and images from the DummyJSON API. Built with Vite, React, React Router and Tailwind CSS. AI help from Claude and Gemini (see REPORT.md).