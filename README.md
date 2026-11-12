# www.domkyuriviery.cz

Static copy of the Domky u Riviéry website (Domky u Riviéry s.r.o.), formerly on IGCMS, served by GitHub Pages from the `gh-pages` branch.

- Pages: `index.html`, `o_projektu.html`, `lokalita.html`, `a4kk.html`, `a5kk.html`, `b5kk.html`. GitHub Pages serves them without the `.html` suffix, so the old URLs (`/o_projektu`, `/lokalita#krajina`, …) keep working.
- `a4.html` redirects to `a4kk`, as `/a4` did on IGCMS.
- `files/`, `themes/`, `plugins/`, `lib/` and `vendor/` are the original IGCMS assets. All paths are relative, so the site also works under `https://internetguru.github.io/www.domkyuriviery.cz/`.

## Changes from the IGCMS site

- The contact form was removed (it needed the IGCMS backend). The Kontakty section keeps the phone and e-mail, and its intro now asks visitors to call or write.
- `themes/fontloader.js`, `mergeable.js`, `photoswipe.js` and `events.js` were taken from the IGCMS backup. On IGCMS they failed with a PHP error, so the site fell back to Arial instead of Montserrat and the photo gallery did not open.
- Removed: Google Analytics (dead Universal Analytics property), the "Poslat zpětnou vazbu" link to the IGCMS bug tracker, and the missing `lib/fa-subset.js`.
- Kept: the Seznam retargeting script.

## Launch (not done yet)

1. Add `CNAME` with `www.domkyuriviery.cz` and set the custom domain in the repository's Pages settings.
2. DNS:

| Zone | Name | Type | Value |
|---|---|---|---|
| domkyuriviery.cz | @ | A | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 |
| domkyuriviery.cz | @ | AAAA | 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153 |
| domkyuriviery.cz | www | CNAME | internetguru.github.io. |

3. Enforce HTTPS, then: Umami, Kuma monitor, delete the site from the `igcms` server.
