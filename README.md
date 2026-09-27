# Vicente Manansala · Still Life, 1981

Single-page site presenting a signed 1981 still life by Vicente Manansala for private sale.
Plain HTML, CSS and JavaScript with no build step, hosted on GitHub Pages.

Temporary address: https://cyconerd-waas.github.io/manansala-artwork-singlepage-advert/

## Placeholders to fill in before launch

1. **Inquiry email.** In `assets/js/main.js`, fill in the `INQUIRY_EMAIL` line, for example
   `const INQUIRY_EMAIL = { user: 'name', domain: 'example.com' };`
   The "Email the Owner" button and the address appear automatically once both parts are set.
   Until then the page shows "Email contact coming soon."
2. **Custom domain.** Find and replace `https://cyconerd-waas.github.io/manansala-artwork-singlepage-advert/`
   with the new address (keep the trailing `/`) in `index.html`, `robots.txt` and `sitemap.xml`,
   then add the domain under the repository's Settings → Pages.
3. **Dimensions.** Confirm the canvas size with a tape measure. If it changes, update `index.html`
   in four places: the hero paragraph, the key-facts strip, the Specifications list, and the
   JSON-LD `height` / `width` values.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | All content, SEO and Open Graph tags, structured data (JSON-LD) |
| `assets/css/style.css` | Design |
| `assets/js/main.js` | Email link, image viewer with zoom, header and scroll effects |
| `assets/images/` | Web images (WebP with JPEG fallback) and the 1200×630 share image |
| `assets/fonts/` | Cormorant Garamond and Jost, self-hosted (SIL Open Font License) |
| `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | Site icons |
| `robots.txt`, `sitemap.xml`, `.nojekyll` | Search engines and GitHub Pages settings |
| `humans.txt` | Site credits (the humanstxt.org convention) |

## Replacing the photographs

Export the straightened painting at 2000, 1400, 1000 and 640 px wide, as both `.webp` and `.jpg`,
using the existing file names (`manansala-still-life-1981-<width>`). If the proportions change,
update the `width` / `height` attributes in `index.html` to match. After changing images or text,
refresh the share preview with the Facebook Sharing Debugger and LinkedIn Post Inspector.
