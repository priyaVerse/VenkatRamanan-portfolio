import { useEffect, useState } from 'react';
import { Menu, Printer, X } from 'lucide-react';
import { useActiveSection, useScrolled } from '../lib/hooks';
import { printPortfolio } from '../lib/print';
import { profile } from '../data/profile';

export interface NavItem {
  id: string;
  no: string;
  label: string;
}

export default function Navbar({ items }: { items: NavItem[] }) {
  const scrolled = useScrolled(60);
  const active = useActiveSection(items.map((i) => i.id));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 print:hidden ${
        solid ? 'border-b border-line bg-paper/95 text-ink backdrop-blur' : 'border-b border-transparent bg-transparent text-white'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-page items-center justify-between px-5 md:px-10">
        <a href="#cover" className="label text-[12px] font-semibold" aria-label={`${profile.name} — back to cover`}>
          VR<span className="text-clay">.</span>BIM
        </a>

        <ul className="hidden items-center gap-6 xl:flex">
          {items.slice(1).map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? 'true' : undefined}
                className={`label text-[11px] transition hover:text-clay ${active === i.id ? 'text-clay' : ''}`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => void printPortfolio()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-clay"
            aria-label="Print or save the portfolio as PDF"
            title="Print / Save as PDF"
          >
            <Printer size={18} />
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-clay xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-paper text-ink xl:hidden">
          <ul className="mx-auto grid max-w-page grid-cols-2 gap-x-6 px-5 py-4 md:px-10">
            {items.map((i) => (
              <li key={i.id} className="border-b border-line">
                <a href={`#${i.id}`} onClick={() => setMenuOpen(false)} className="flex items-baseline gap-3 py-3.5 text-sm hover:text-clay">
                  <span className="label text-[10px] text-muted">{i.no}</span>
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
