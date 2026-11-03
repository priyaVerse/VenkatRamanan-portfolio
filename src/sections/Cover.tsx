import { ArrowDown } from 'lucide-react';
import { profile } from '../data/profile';
import { get } from '../data/assets';

export default function Cover() {
  const hero = get('render-01');
  return (
    <section id="cover" aria-label="Cover" className="page-section cover relative isolate flex min-h-[100svh] flex-col bg-ink text-white">
      <img
        src={hero.src}
        alt="Rendered view of the glazed office building with a stone-clad feature tower and entrance canopy"
        width={hero.w}
        height={hero.h}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-ink/45" aria-hidden />

      <div className="mx-auto flex w-full max-w-page flex-1 flex-col justify-end px-5 pb-14 pt-32 md:px-10 md:pb-20">
        <p className="label text-white/75">Page 01 — Cover</p>
        <h1 className="mt-5 text-[clamp(2.6rem,9vw,8rem)] font-semibold uppercase leading-[0.95] tracking-tight">{profile.name}</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="text-xl font-medium uppercase tracking-[0.14em] md:text-2xl">{profile.roleShort}</p>
            <p className="label mt-3 text-clay-soft">{profile.disciplines.join(' | ')}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">{profile.tagline}</p>
          </div>
          <p className="label text-[10px] text-white/60 md:col-span-5 md:text-right">
            Cover image: Office Building — Lumion render of the Revit model
            <br />
            Training project
          </p>
        </div>
      </div>

      <div className="border-t border-white/20 bg-ink/70 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-page grid-cols-1 gap-4 px-5 py-5 text-sm md:grid-cols-3 md:px-10">
          <div>
            <dt className="label text-[10px] text-white/50">Location</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt className="label text-[10px] text-white/50">Education</dt>
            <dd>{profile.education}</dd>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <dt className="label text-[10px] text-white/50">Training</dt>
              <dd>{profile.training}</dd>
            </div>
            <a href="#about" aria-label="Scroll to About" className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 transition hover:border-clay hover:bg-clay md:inline-flex print:hidden">
              <ArrowDown size={16} />
            </a>
          </div>
        </dl>
      </div>
    </section>
  );
}
