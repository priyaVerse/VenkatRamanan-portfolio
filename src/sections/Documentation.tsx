import { useMemo, useState } from 'react';
import { Download, ExternalLink, Printer } from 'lucide-react';
import PageSection from '../components/PageSection';
import SectionHeader, { titleId } from '../components/SectionHeader';
import FilterBar from '../components/FilterBar';
import AssetTile from '../components/AssetTile';
import Lightbox from '../components/Lightbox';
import { assets, type DocGroup } from '../data/assets';
import { profile } from '../data/profile';
import { asset as assetUrl } from '../lib/url';
import { printPortfolio } from '../lib/print';
import { useLightbox } from '../lib/hooks';

type Filter = 'All' | DocGroup;
const docs = assets.filter((a) => a.docGroup);
const order: Filter[] = ['All', 'Floor plans', 'Elevations & sections', 'Structural sheets', 'Schedules'];

export default function Documentation() {
  const [filter, setFilter] = useState<Filter>('All');
  const shown = useMemo(() => docs.filter((a) => filter === 'All' || a.docGroup === filter), [filter]);
  const counts = useMemo(() => {
    const c: Partial<Record<Filter, number>> = { All: docs.length };
    docs.forEach((a) => a.docGroup && (c[a.docGroup] = (c[a.docGroup] ?? 0) + 1));
    return c;
  }, []);
  const lb = useLightbox(shown);

  const btn =
    'label inline-flex items-center gap-2 border border-ink px-4 py-2.5 text-[11px] text-ink transition hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay';

  return (
    <PageSection id="documentation" labelledBy={titleId('Documentation')} tone="alt">
      <SectionHeader
        no="07"
        eyebrow="Documentation"
        title="BIM documentation."
        intro="Technical drawing gallery: floor plans, elevations, sections, schedules and structural sheets, shown as supplied. Open a sheet and use the zoom control to read dimensions and annotations."
      />

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <FilterBar<Filter> options={order} value={filter} onChange={setFilter} label="Filter drawings by type" counts={counts} />
        <div className="flex flex-wrap gap-3 print:hidden">
          <a className={btn} href={assetUrl(profile.sourcePdf)} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} aria-hidden /> Open PDF set
          </a>
          <a className={btn} href={assetUrl(profile.sourcePdf)} download>
            <Download size={14} aria-hidden /> Download
          </a>
          <button type="button" className={btn} onClick={() => void printPortfolio()}>
            <Printer size={14} aria-hidden /> Print
          </button>
        </div>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((a) => (
          <li key={a.id}>
            <AssetTile asset={a} variant="drawing" fit="contain" ratio="4 / 3" onOpen={lb.open} />
          </li>
        ))}
      </ul>

      <Lightbox items={shown} index={lb.index} onClose={lb.close} onIndex={lb.setIndex} />
    </PageSection>
  );
}
