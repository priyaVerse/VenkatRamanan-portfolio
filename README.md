# Venkat Ramanan M — BIM Portfolio

Visual-first BIM modeling and documentation portfolio built with **React + Vite + TypeScript + Tailwind CSS**
(Lucide icons, Framer Motion for subtle fade-ins). All content comes from the supplied drawing set
(`bim.pdf`, 51 pages). Nothing is AI-generated or stock imagery.

Ten pages: Cover · About · Software · Architecture · Structure · MEP · Documentation · Coordination ·
Visualization & Planning · Contact. See `ASSET_INVENTORY.md` for how each PDF page maps to a section
and for the list of things *not* shown because no files were supplied.

## 1. Install and run

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to ./dist
npm run preview    # serve the production build at http://localhost:4173
```

## 2. Add your contact details

Open `src/data/profile.ts` and fill `contact.email`, `phone`, `linkedin`, `behance`.
Links (mailto:, tel:, profile URLs) switch on automatically; empty fields show "To be added".
(Your drawing title blocks show an email and phone number. They were not copied into the site —
paste them in only if you want them public.)

## 3. Replace or add drawings and screenshots

**A. Replace / extend the source PDF**
1. Put the new PDF at `public/pdf/bim-drawings.pdf`.
2. Edit the `PAGES` table at the top of `scripts/prepare_assets.py`
   (`id: (folder, pdf_page, dpi, trim_whitespace)`). Use `trim=False` for drawing sheets.
3. Run `npm run assets` (needs `pdftoppm` from poppler-utils and Python Pillow). It rewrites `public/assets/**` and `src/data/manifest.json`.
4. Describe each new id in `src/data/assets.ts` (title, caption, discipline, kind, software, optional `docGroup`).
5. Show it by adding the id to the `pick([...])` list and layout of the relevant file in `src/sections/`.

**B. Add loose screenshots (PNG / JPG)**
1. Save as `source-images/<folder>/<id>.png` (e.g. `source-images/mep/mep-electrical-l1.png`).
2. Run `npm run assets`, then continue from step 4 above. Loose images get `page: 0`, which hides the "open PDF page" link.

Captions should describe only what is visible. Do not add clash results, certifications or project facts you cannot show.

## 4. Edit text, roles and project details

- `src/data/projects.ts` — project title, type, purpose, software, scope, deliverables and role label.
  All roles are "Training project"; change only if you can document a different context.
- `src/sections/About.tsx` — about paragraphs. `src/sections/Skills.tsx` — software groups (no proficiency levels).
- Colours: `tailwind.config.js` (`clay` is the terracotta accent). Font: Inter (bundled via `@fontsource-variable/inter`, works offline).

## 5. Deploy

`npm run build` produces a static `dist/` folder that works from any path (`base: './'`).
Netlify / Vercel / Cloudflare Pages: build command `npm run build`, output directory `dist`.
GitHub Pages: publish the contents of `dist/`. The PDF and images are served from `dist/pdf` and `dist/assets`.

## 6. Print and PDF export

**Browser route (no extra tools):** click the printer icon in the top bar (or the Footer button), choose
**Save as PDF**, paper **A4**, orientation **Landscape**, margins **Default/None**, and tick **Background graphics**.
The print layout hides navigation and filters, starts each page on a new sheet and loads every image first.

**Optional scripted route:** with the site running (`npm run build && npm run preview`):
```bash
npm i -D playwright && npx playwright install chromium
node scripts/export-pdf.mjs http://localhost:4173 Venkat-Ramanan-BIM-Portfolio.pdf
```

**Original drawings:** the unmodified drawing set is available from the Documentation page ("Open PDF set" / "Download").
