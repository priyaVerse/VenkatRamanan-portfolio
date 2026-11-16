
import PageSection from '../components/PageSection';
import SectionHeader, { SubHead, titleId } from '../components/SectionHeader';
import ProjectMeta from '../components/ProjectMeta';
import AssetTile from '../components/AssetTile';
import Lightbox from '../components/Lightbox';
import Reveal from '../components/Reveal';
import Gallery from '../components/Gallery';
import { assets, get, pick } from '../data/assets';
import { getProject } from '../data/projects';
import { useLightbox } from '../lib/hooks';

const renderIds = [
  'render-02',
  'render-03',
  'render-04',
  'render-01',
  'render-05',
];

const planningIds = ['plan-p6-wbs', 'plan-p6-gantt'];

const renders = pick(renderIds);
const planning = pick(planningIds);

const additionalRenders = assets.filter(
  (a) => a.discipline === 'Visualization' && !renderIds.includes(a.id)
);

const additionalPlanning = assets.filter(
  (a) => a.discipline === 'Planning' && !planningIds.includes(a.id)
);

const steps: [string, string][] = [
  [
    'Work breakdown structure',
    'Project split into engineering, procurement, construction and commissioning branches.',
  ],
  [
    'Activities and Gantt',
    'Activity table with bar chart, grouped under the same four branches.',
  ],
];

export default function VisPlanning() {
  const allPlanning = [...planning, ...additionalPlanning];
  const lb = useLightbox(allPlanning);

  const tile = (id: string, o: { ratio?: string } = {}) => (
    <Reveal key={id}>
      <AssetTile
        asset={get(id)}
        onOpen={lb.open}
        variant="drawing"
        ratio={o.ratio}
        fit="contain"
      />
    </Reveal>
  );

  return (
    <PageSection id="visualization" labelledBy={titleId('Visualization')} tone="alt">
      <SectionHeader
        no="09"
        eyebrow="Visualization"
        title="Visualization & planning."
        intro="Rendered views of the office building and a Primavera P6 scheduling exercise, presented separately."
      />

      <ProjectMeta project={getProject('visualization')} />

      <SubHead note="Lumion · rendered from the Revit model">
        Render gallery
      </SubHead>

      <Gallery
        items={renders}
        columns="grid-cols-1 md:grid-cols-2"
        ratio="16 / 10"
        wideIds={['render-02']}
        wideRatio="16 / 7"
        fit="cover"
      />

      {additionalRenders.length > 0 && (
        <>
          <SubHead note="Additional images managed through Pages CMS">
            More rendered views
          </SubHead>

          <Gallery
            items={additionalRenders}
            columns="grid-cols-1 md:grid-cols-2"
            ratio="16 / 10"
            fit="cover"
          />
        </>
      )}

      <SubHead note="Primavera P6 · separate training exercise, not the office-building programme">
        Project workflow
      </SubHead>

      <div className="grid gap-8 md:grid-cols-12">
        <ol className="space-y-6 md:col-span-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="border-t border-ink pt-4">
              <p className="label text-clay">Step 0{i + 1}</p>
              <p className="mt-2 text-lg font-medium text-ink">{t}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>

        <div className="grid items-start gap-6 sm:grid-cols-2 md:col-span-8">
          {tile('plan-p6-wbs', { ratio: '4 / 5' })}
          {tile('plan-p6-gantt', { ratio: '4 / 5' })}
        </div>
      </div>

      {additionalPlanning.length > 0 && (
        <>
          <SubHead note="Additional images managed through Pages CMS">
            More planning diagrams and schedules
          </SubHead>

          <div className="grid gap-6 md:grid-cols-2">
            {additionalPlanning.map((a) => (
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

      <Lightbox
        items={allPlanning}
        index={lb.index}
        onClose={lb.close}
        onIndex={lb.setIndex}
      />
    </PageSection>
  );
}
