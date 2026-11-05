# Compatibility

What I tested on the live site (https://10-x-shop-koki.vercel.app) and locally.

## Browsers

| Browser | Platform | Result |
| --- | --- | --- |
| Brave (Chromium) | Windows desktop | Full shopping flow works |
| Firefox | Windows desktop | Full shopping flow works, no sideways scrolling at 375px |

The full flow is: catalog, product page, add to cart, cart, log in, checkout, thank-you page.

## Screen sizes

I checked `/`, `/products/1`, `/cart` and `/checkout` with the browser DevTools device toolbar at 375px width. No page scrolls sideways. The header and the cart footer use `flex-wrap`, and the product grid goes from 1 column on phones to 2 and 4 columns on larger screens.

## Build and install

A fresh `git clone`, then `npm install`, `npm run typecheck` and `npm run build` all pass (checked in Brave's setup on Windows, on two different days).

## Direct links and refresh

`vercel.json` rewrites every route to `index.html`, so opening `/products/5` directly or refreshing a page works on the live site. Unknown routes such as `/this-route-does-not-exist` and `/products/abc` show the 404 page with the header and footer.

## Not tested

- Safari and Edge
- Real phones and tablets (only the DevTools device toolbar was used)

## Known differences

None found between Brave and Firefox.