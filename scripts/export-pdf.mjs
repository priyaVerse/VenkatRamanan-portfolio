// Optional: export the whole portfolio as a single A4-landscape PDF using Playwright.
//   1) npm run build && npm run preview          (serves http://localhost:4173)
//   2) npm i -D playwright && npx playwright install chromium
//   3) node scripts/export-pdf.mjs [url] [output.pdf]
// Prefer the browser route (Print button -> Save as PDF) if you do not want extra tooling.
import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4173';
const out = process.argv[3] ?? 'Venkat-Ramanan-BIM-Portfolio.pdf';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  const imgs = Array.from(document.images);
  imgs.forEach((i) => (i.loading = 'eager'));
  await Promise.all(imgs.map((i) => (i.complete ? null : i.decode().catch(() => undefined))));
});
await page.emulateMedia({ media: 'print' });
await page.pdf({ path: out, format: 'A4', landscape: true, printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`Saved ${out}`);
