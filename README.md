# Range End of Year Celebration

Single-page site for the Range Holiday Dinner & Awards Gala (Wed Dec 16, 2026, Royal York Hotel, Canadian Ballroom).

Live preview: https://nehmandevelops.github.io/range-gala/

## Working on it
```
git clone https://github.com/NehmanDevelops/range-gala.git
cd range-gala
node serve.js          # then open http://localhost:8130   (or just double-click index.html)
```
- Everything editable lives in the `CONFIG` block at the top of the script in `index.html` (date/times, venue, logos, program, awards, menu, tables). Search for `[TO CONFIRM` to find placeholders still waiting on real info.
- Logos: drop files in `assets/` and set the `src` in `CONFIG.logos` (Range, TripArc, Insombo, Kensington Travel still missing).
- `?unlock=1` on the URL previews the "Find Your Table" tab before event day (it unlocks Dec 16, 5:00 PM ET).
- Publish: `git add -A && git commit -m "..." && git push` (GitHub Pages rebuilds in about a minute).
- Needs no build step and no dependencies.
