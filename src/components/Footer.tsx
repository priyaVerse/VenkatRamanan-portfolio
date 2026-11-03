import { ArrowUp, Download, Printer } from 'lucide-react';
import { profile } from '../data/profile';
import { asset } from '../lib/url';
import { printPortfolio } from '../lib/print';

export default function Footer() {
  const btn =
    'label inline-flex items-center gap-2 border border-white/25 px-4 py-2.5 text-[11px] text-paper transition hover:border-clay hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay';
  return (
    <footer className="bg-ink text-paper print:bg-white print:text-ink">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="text-lg font-semibold tracking-tight">{profile.name}</p>
          <p className="label mt-1 text-white/50 print:text-muted">{profile.roleLine}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50 print:text-muted">
            All projects shown are BIM training work. Drawings, screenshots and renders are reproduced as supplied.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 print:hidden">
          <a className={btn} href={asset(profile.sourcePdf)} download>
            <Download size={14} aria-hidden /> Drawing set (PDF)
          </a>
          <button type="button" className={btn} onClick={() => void printPortfolio()}>
            <Printer size={14} aria-hidden /> Print / Save as PDF
          </button>
          <a className={btn} href="#cover">
            <ArrowUp size={14} aria-hidden /> Top
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40 print:text-muted">© {new Date().getFullYear()} {profile.name}</div>
    </footer>
  );
}
