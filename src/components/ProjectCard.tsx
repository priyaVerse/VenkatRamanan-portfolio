import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { get } from '../data/assets';

export default function ProjectCard({ project: p }: { project: Project }) {
  const hero = get(p.heroId);
  return (
    <a
      href={`#${p.id}`}
      className="group block border border-line bg-white transition hover:border-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
    >
      <div className="overflow-hidden bg-paper-3">
        <img
          src={hero.thumb}
          alt={`${p.title}: ${hero.title}`}
          width={hero.w}
          height={hero.h}
          loading="lazy"
          decoding="async"
          style={{ aspectRatio: '4 / 3' }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="label text-clay">
            Page {p.no} · {p.discipline}
          </p>
          <ArrowUpRight size={18} className="shrink-0 text-muted transition group-hover:text-clay" aria-hidden />
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{p.title}</h3>
        <p className="mt-1 text-sm text-muted">{p.type}</p>
        <p className="label mt-4 text-[10px] text-ink-soft">{p.software.join(' · ')}</p>
        <p className="label mt-1 text-[10px] text-muted">{p.roleType}</p>
      </div>
    </a>
  );
}
