import type { ReactNode } from 'react';
import Reveal from './Reveal';

export const titleId = (eyebrow: string) => `${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;

interface Props {
  no: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
}

export default function SectionHeader({ no, eyebrow, title, intro }: Props) {
  return (
    <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-3">
        <p className="label text-clay">
          Page {no}
        </p>
        <p className="label mt-1 text-muted">{eyebrow}</p>
      </div>
      <div className="md:col-span-9">
        <h2 id={titleId(eyebrow)} className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
          {title}
        </h2>
        {intro && <div className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft md:text-lg">{intro}</div>}
      </div>
    </Reveal>
  );
}

export function SubHead({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="mb-5 mt-14 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3 first:mt-0 md:mt-20">
      <h3 className="label text-ink">{children}</h3>
      {note && <p className="text-sm text-muted">{note}</p>}
    </div>
  );
}
