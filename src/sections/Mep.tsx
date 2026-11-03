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
  'mep-hvac-iso', 'mep-hvac-elev-front', 'mep-hvac-elev-side',
  'mep-duct-l1', 'mep-duct-l2', 'mep-duct-l3',
  'mep-plumb-iso', 'mep-plumb-section',
]);

export default function Mep() {
  const lb = useLightbox(items);
  const tile = (id: string, className?: string, variant: 'photo' | 'drawing' = 'drawing') => (
    <Reveal className={className}>
      <AssetTile asset={get(id)} onOpen={lb.open} variant={variant} fit="contain" />
    </Reveal>
  );

  return (
    <PageSection id="mep" labelledBy={titleId('MEP')}>
      <SectionHeader
        no="06"
        eyebrow="MEP"
        title="MEP BIM project."
        intro="Mechanical and plumbing systems modeled in Revit MEP for the office building: ductwork, airflow colour plans and plumbing risers."
      />
      <ProjectMeta project={getProject('mep')} />

      <SubHead note="Revit MEP">HVAC modeling</SubHead>
      <div className="grid items-start gap-6 md:grid-cols-12">
        {tile('mep-hvac-iso', 'md:col-span-7')}
        <div className="grid gap-6 md:col-span-5">
          {tile('mep-hvac-elev-front')}
          {tile('mep-hvac-elev-side')}
        </div>
      </div>

      <SubHead note="Ducts coloured by airflow, with CFM legend">Duct plans by level</SubHead>
      <div className="grid gap-6 md:grid-cols-3">
        {tile('mep-duct-l1')}
        {tile('mep-duct-l2')}
        {tile('mep-duct-l3')}
      </div>

      <SubHead note="Supply and drainage to sanitary fixtures">Plumbing and drainage</SubHead>
      <div className="grid items-start gap-6 md:grid-cols-2">
        {tile('mep-plumb-section')}
        {tile('mep-plumb-iso')}
      </div>

      <Lightbox items={items} index={lb.index} onClose={lb.close} onIndex={lb.setIndex} />
    </PageSection>
  );
}
