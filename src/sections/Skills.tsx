import PageSection from '../components/PageSection';
import SectionHeader, { titleId } from '../components/SectionHeader';
import Reveal from '../components/Reveal';

interface Group {
  name: string;
  tools: { name: string; shownOn?: { label: string; id: string } }[];
}

/** Groups follow the brief. "shownOn" is set only where this portfolio contains sample work for the tool. */
const groups: Group[] = [
  {
    name: 'BIM Modeling',
    tools: [
      { name: 'Revit Architecture', shownOn: { label: 'Page 04', id: 'architecture' } },
      { name: 'Revit Structure', shownOn: { label: 'Page 05', id: 'structure' } },
      { name: 'Revit MEP', shownOn: { label: 'Page 06', id: 'mep' } },
    ],
  },
  { name: 'Coordination', tools: [{ name: 'Navisworks', shownOn: { label: 'Page 08', id: 'coordination' } }] },
  { name: 'Drafting & Design', tools: [{ name: 'AutoCAD' }, { name: 'SketchUp' }] },
  { name: 'Visualization', tools: [{ name: 'Lumion', shownOn: { label: 'Page 09', id: 'visualization' } }, { name: 'V-Ray' }] },
  {
    name: 'Structural & Planning Tools',
    tools: [{ name: 'STAAD.Pro' }, { name: 'Tekla Structures' }, { name: 'Primavera P6', shownOn: { label: 'Page 09', id: 'visualization' } }],
  },
];

export default function Skills() {
  return (
    <PageSection id="skills" labelledBy={titleId('Software')} tone="alt">
      <SectionHeader
        no="03"
        eyebrow="Software"
        title="Software & technical skills."
        intro="Tools I work with, grouped by role in a BIM workflow. A page tag means this portfolio contains sample work made with that tool."
      />
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, gi) => (
          <Reveal key={g.name} delay={gi * 0.04}>
            <h3 className="label mb-4 border-b border-ink pb-3 text-ink">{g.name}</h3>
            <ul className="space-y-0">
              {g.tools.map((t) => (
                <li key={t.name} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                  <span className="text-lg font-medium text-ink">{t.name}</span>
                  {t.shownOn && (
                    <a href={`#${t.shownOn.id}`} className="label text-[10px] text-clay hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-clay">
                      {t.shownOn.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
