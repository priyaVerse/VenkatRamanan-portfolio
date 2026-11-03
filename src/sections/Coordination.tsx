import PageSection from '../components/PageSection';
import SectionHeader, { SubHead, titleId } from '../components/SectionHeader';
import ProjectMeta from '../components/ProjectMeta';
import AssetTile from '../components/AssetTile';
import Lightbox from '../components/Lightbox';
import Reveal from '../components/Reveal';
import { get, pick } from '../data/assets';
import { getProject } from '../data/projects';
import { useLightbox } from '../lib/hooks';

const items = pick([
  'coord-section-01', 'coord-section-02',
  'coord-4d-01', 'coord-4d-02', 'coord-4d-03',
  'coord-clash-01', 'coord-clash-02', 'coord-clash-03', 'coord-clash-04', 'coord-clash-05',
]);

// Values transcribed from the clash report summary (PDF page 7).
const summary: [string, string][] = [
  ['Test', 'E H Clash'],
  ['Clash type', 'Hard'],
  ['Tolerance', '0.001 m'],
  ['Clashes found', '15'],
  ['Status of all 15', 'New'],
  ['Reviewed / Approved / Resolved', '0 / 0 / 0'],
];

export default function Coordination() {
  const lb = useLightbox(items);
  const tile = (id: string, o: { className?: string; variant?: 'photo' | 'drawing'; ratio?: string } = {}) => (
    <Reveal key={id} className={o.className}>
      <AssetTile asset={get(id)} onOpen={lb.open} variant={o.variant ?? 'photo'} ratio={o.ratio} fit="contain" />
    </Reveal>
  );

  return (
    <PageSection id="coordination" labelledBy={titleId('Coordination')}>
      <SectionHeader
        no="08"
        eyebrow="Coordination"
        title="BIM coordination."
        intro="Model review in Navisworks: section viewpoints, a hard-clash test report and a TimeLiner construction-sequence simulation."
      />
      <ProjectMeta project={getProject('coordination')} />

      <SubHead note="Navisworks Manage 2020">Section viewpoints</SubHead>
      <div className="grid gap-6 md:grid-cols-2">
        {tile('coord-section-01', { ratio: '16 / 11' })}
        {tile('coord-section-02', { ratio: '16 / 11' })}
      </div>

      <SubHead note="Clash test summary, as reported">Clash detection report</SubHead>
      <Reveal>
        <dl className="grid grid-cols-2 gap-px border-y border-ink bg-line md:grid-cols-3 lg:grid-cols-6">
          {summary.map(([k, v]) => (
            <div key={k} className="flex flex-col-reverse justify-end bg-paper px-4 py-5">
              <dd className="text-xl font-semibold tracking-tight text-ink">{v}</dd>
              <dt className="label mb-2 text-[10px] text-muted">{k}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          The report excerpt below shows Clashes 1–9 of the 15 reported. All 15 are listed with status “New”; this report does not record any as reviewed or resolved, so no system is claimed to be clash-free.
        </p>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {(['coord-clash-01', 'coord-clash-02', 'coord-clash-03', 'coord-clash-04', 'coord-clash-05'] as const).map((id) =>
          tile(id, { variant: 'drawing', ratio: '3 / 4' }),
        )}
      </div>

      <SubHead note="TimeLiner — planned vs actual dates in the simulation">4D construction-sequence simulation</SubHead>
      <div className="grid gap-6 md:grid-cols-3">
        {tile('coord-4d-01', { ratio: '4 / 3' })}
        {tile('coord-4d-02', { ratio: '4 / 3' })}
        {tile('coord-4d-03', { ratio: '4 / 3' })}
      </div>

      <Lightbox items={items} index={lb.index} onClose={lb.close} onIndex={lb.setIndex} />
    </PageSection>
  );
}
