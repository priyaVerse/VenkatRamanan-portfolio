
import PageSection from '../components/PageSection';
import SectionHeader, { SubHead, titleId } from '../components/SectionHeader';
import ProjectMeta from '../components/ProjectMeta';
import AssetTile from '../components/AssetTile';
import Lightbox from '../components/Lightbox';
import Reveal from '../components/Reveal';
import { assets, get, pick } from '../data/assets';
import { getProject } from '../data/projects';
import { useLightbox } from '../lib/hooks';

const curatedIds = [
  'str-rebar-views',
  'str-analytical',
  'str-footing',
  'str-columns',
  'str-beams',
  'str-slab-1',
  'str-slab-2',
  'str-schedule',
];

const additionalItems = assets.filter(
  (a) => a.discipline === 'Structure' && !curatedIds.includes(a.id)
);

const items = [...pick(curatedIds), ...additionalItems];

// Figures transcribed from the Revit rebar schedule sheet (PDF page 47).
const figures: [string, string, string][] = [
  ['63.99 t', 'Total reinforcement steel', 'as listed in the schedule'],
  ['67.19 t', 'Total with 5% wastage', 'reference value on the sheet'],
  ['29,583', 'Bar count', 'all rebar families'],
  ['76,978 m', 'Total bar length', 'all rebar families'],
];

export default function Structure() {
  const lb = useLightbox(items);

  const tile = (id: string, className?: string) => (
    <Reveal key={id} className={className}>
      <AssetTile
        asset={get(id)}
        onOpen={lb.open}
        variant="drawing"
        fit="contain"
      />
    </Reveal>
  );

  return (
    <PageSection id="structure" labelledBy={titleId('Structure')} tone="alt">
      <SectionHeader
        no="05"
        eyebrow="Structure"
        title="Structural BIM project."
        intro="A reinforced-concrete frame modeled in Revit Structure, with reinforcement detailed for footings, columns, beams and slabs."
      />

      <ProjectMeta project={getProject('structure')} />

      <SubHead note="Revit sheets">
        Structural model and reinforcement
      </SubHead>
      <div className="grid items-start gap-6 md:grid-cols-12">
        {tile('str-rebar-views', 'md:col-span-7')}
        {tile('str-analytical', 'md:col-span-5')}
      </div>

      <SubHead note="Footing marking, 1:200 · sections, 1:20 / 1:100">
        Foundation and footings
      </SubHead>
      <div className="grid gap-6 md:grid-cols-2">
        {tile('str-footing')}
        {tile('str-columns')}
      </div>

      <SubHead note="Sections 1:100 and 1:25">
        Beams and slabs
      </SubHead>
      <div className="grid gap-6 md:grid-cols-2">
        {tile('str-beams')}
        {tile('str-slab-1')}
      </div>

      <SubHead note="Slab schedule and rebar estimate sheets">
        Schedules
      </SubHead>
      <div className="grid gap-6 md:grid-cols-2">
        {tile('str-slab-2')}
        {tile('str-schedule')}
      </div>

      {additionalItems.length > 0 && (
        <>
          <SubHead note="Additional images managed through Pages CMS">
            More structural views and drawings
          </SubHead>

          <div className="grid gap-6 md:grid-cols-2">
            {additionalItems.map((a) => (
              <Reveal key={a.id}>
                <AssetTile
                  asset={a}
                  onOpen={lb.open}
                  variant="drawing"
                  fit="contain"
                />
              </Reveal>
            ))}
          </div>
        </>
      )}

      <Reveal>
        <dl className="mt-10 grid grid-cols-2 gap-px border-y border-ink bg-line md:grid-cols-4">
          {figures.map(([v, k, n]) => (
            <div
              key={k}
              className="flex flex-col-reverse justify-end bg-paper-2 px-4 py-6 md:px-6"
            >
              <dd>
                <span className="block text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  {v}
                </span>
                <span className="mt-1 block text-xs text-muted">{n}</span>
              </dd>
              <dt className="label mb-2 text-ink-soft">{k}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-3 text-xs text-muted">
          Quantities are the model-derived estimate shown on the sheet, not a site-verified take-off.
        </p>
      </Reveal>

      <Lightbox
        items={items}
        index={lb.index}
        onClose={lb.close}
        onIndex={lb.setIndex}
      />
    </PageSection>
  );
}
