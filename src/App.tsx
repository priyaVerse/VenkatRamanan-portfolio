import { useEffect } from 'react';
import Navbar, { type NavItem } from './components/Navbar';
import Footer from './components/Footer';
import Cover from './sections/Cover';
import About from './sections/About';
import Skills from './sections/Skills';
import Architecture from './sections/Architecture';
import Structure from './sections/Structure';
import Mep from './sections/Mep';
import Documentation from './sections/Documentation';
import Coordination from './sections/Coordination';
import VisPlanning from './sections/VisPlanning';
import Contact from './sections/Contact';
import { installPrintHooks } from './lib/print';

const nav: NavItem[] = [
  { id: 'cover', no: '01', label: 'Cover' },
  { id: 'about', no: '02', label: 'About' },
  { id: 'skills', no: '03', label: 'Software' },
  { id: 'architecture', no: '04', label: 'Architecture' },
  { id: 'structure', no: '05', label: 'Structure' },
  { id: 'mep', no: '06', label: 'MEP' },
  { id: 'documentation', no: '07', label: 'Documentation' },
  { id: 'coordination', no: '08', label: 'Coordination' },
  { id: 'visualization', no: '09', label: 'Visualization' },
  { id: 'contact', no: '10', label: 'Contact' },
];

export default function App() {
  useEffect(() => installPrintHooks(), []);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper print:hidden">
        Skip to content
      </a>
      <Navbar items={nav} />
      <main id="main">
        <Cover />
        <About />
        <Skills />
        <Architecture />
        <Structure />
        <Mep />
        <Documentation />
        <Coordination />
        <VisPlanning />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
