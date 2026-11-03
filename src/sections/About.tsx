import { useMemo, useState } from 'react';
import PageSection from '../components/PageSection';
import SectionHeader, { titleId, SubHead } from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import FilterBar from '../components/FilterBar';
import ProjectCard from '../components/ProjectCard';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import type { Discipline } from '../data/assets';

type Filter = 'All' | Discipline;

export default function About() {
  const [filter, setFilter] = useState<Filter>('All');
  const options = useMemo<Filter[]>(() => ['All', ...Array.from(new Set(projects.map((p) => p.discipline)))], []);
  const counts = useMemo(() => {
    const c: Partial<Record<Filter, number>> = { All: projects.length };
    projects.forEach((p) => (c[p.discipline] = (c[p.discipline] ?? 0) + 1));
    return c;
  }, []);
  const shown = projects.filter((p) => filter === 'All' || p.discipline === filter);

  const facts: [string, string][] = [
    ['Background', 'Civil Engineering'],
    ['Education', profile.education],
    ['Training', profile.training],
    ['Modeling focus', 'Architecture · Structure · MEP'],
    ['Location', profile.location],
  ];

  return (
    <PageSection id="about" labelledBy={titleId('About')}>
      <SectionHeader no="02" eyebrow="About" title="A civil engineer building a BIM career." />

      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="space-y-6 text-base leading-relaxed text-ink-soft md:col-span-7 md:text-lg">
          <p>
            I hold a BE in Civil Engineering from Kumaraguru College of Technology and trained in BIM at Pumo Technovation, Coimbatore. The work in this portfolio comes from that training: an office building modeled and documented in Autodesk Revit across architecture, structure and MEP, reviewed in Navisworks, visualized as renders, with a separate Primavera P6 scheduling exercise.
          </p>
          <p>
            I am most interested in BIM modeling, multidisciplinary coordination and clear technical documentation. {profile.goal}
          </p>
          <p className="border-l-2 border-clay bg-clay-soft/50 px-5 py-4 text-[15px] text-ink">
            <strong className="font-medium">Training, not professional work.</strong> Every project shown here was produced during BIM training. No client or employer projects are claimed.
          </p>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.08}>
          <dl>
            {facts.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-t border-line py-4 last:border-b sm:grid-cols-[130px_1fr] sm:gap-6">
                <dt className="label text-muted">{k}</dt>
                <dd className="text-[15px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <SubHead note="Filter by discipline">Project index</SubHead>
      <FilterBar<Filter> options={options} value={filter} onChange={setFilter} label="Filter projects by discipline" counts={counts} />
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((p) => (
          <li key={p.id}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
