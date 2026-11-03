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
  'arch-3d-01', 'arch-3d-02', 'arch-roof-plan', 'arch-elevation',
  'plan-gf-rooms', 'plan-ff-rooms', 'plan-sf-rooms',
  'plan-gf-dims', 'plan-ff-dims', 'plan-sf-dims',
]);

export default function Architecture() {
  const lb = useLightbox(items);
  const tile = (id: string, o: { variant?: 'photo' | 'drawing'; className?: string; ratio?: string } = {}) => (
    <Reveal className={o.className}>
      <AssetTile asset={get(id)} onOpen={lb.open} variant={o.variant ?? 'photo'} ratio={o.ratio} fit="contain" />
    </Reveal>
  );

  return (
    <PageSection id="architecture" labelledBy={titleId('Architecture')}>
      <SectionHeader
        no="04"
        eyebrow="Architecture"
        title="Architectural BIM project."
        intro="An office building modeled in Revit Architecture: glazed façade, room-coded floor plans and the sheets extracted from the model."
      />
      <ProjectMeta project={getProject('architecture')} />

      <SubHead note="Revit views">3D model and elevation</SubHead>
      {tile('arch-3d-01')}
      <div className="mt-6 grid items-start gap-6 md:grid-cols-12">
        {tile('arch-3d-02', { className: 'md:col-span-7' })}
        {tile('arch-roof-plan', { className: 'md:col-span-5' })}
      </div>
      <div className="mt-6">{tile('arch-elevation')}</div>

      <SubHead note="Open any sheet to read tags, areas and legends">Floor plans — room-coded</SubHead>
      {tile('plan-gf-rooms', { variant: 'drawing' })}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {tile('plan-ff-rooms', { variant: 'drawing' })}
        {tile('plan-sf-rooms', { variant: 'drawing' })}
      </div>

      <SubHead note="Grid-to-grid and overall dimensions">Dimensioned plans</SubHead>
      <div className="grid gap-6 md:grid-cols-3">
        {tile('plan-gf-dims', { variant: 'drawing' })}
        {tile('plan-ff-dims', { variant: 'drawing' })}
        {tile('plan-sf-dims', { variant: 'drawing' })}
      </div>

      <Lightbox items={items} index={lb.index} onClose={lb.close} onIndex={lb.setIndex} />
    </PageSection>
  );
}
