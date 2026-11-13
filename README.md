# Range End of Year Celebration

Single-page site for the Range Holiday Dinner & Awards Gala (Wed Dec 16, 2026, Fairmont Royal York, Canadian Ballroom).

Live preview: https://nehmandevelops.github.io/range-gala/

## Working on it
```
git clone https://github.com/NehmanDevelops/range-gala.git
cd range-gala
node serve.js          # then open http://localhost:8130   (or just double-click index.html)
```
- **The site is password protected.** `index.html` is only an encrypted shell (AES-256-GCM, key from the password via PBKDF2); the readable page is `site.html`, which is git-ignored and never committed. Password: ask Nehman / Dany (it is not stored in this repo).
  - Edit: `SEAL_PASSWORD=... node tools/unseal.js` (writes `site.html`), change `site.html`, preview it with `node serve.js` at http://localhost:8130/site.html, then `SEAL_PASSWORD=... node tools/seal.js` and commit `index.html`.
  - Visitors type the password once per browser tab; a wrong password shows an error and nothing else.
- Everything editable lives in the `CONFIG` block at the top of the script in `site.html` (date/times, venue, logos, program, awards, menu, tables). Search for `[TO CONFIRM` to find placeholders still waiting on real info.
- Logos (Range, Ensemble, Kensington, Travel Edge, in Dany's order) are in `assets/logo-*.png`, cut from the invite's logo strip. Event details come from Michelle Singh's invite email (forwarded by Dany 2026-11-10).
- `?unlock=1` on the URL previews the "Find Your Table" tab before event day (it unlocks Dec 16, 5:00 PM ET).
- Publish: `git add -A && git commit -m "..." && git push` (GitHub Pages rebuilds in about a minute).
- Needs no build step and no dependencies.
