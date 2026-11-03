import type { ReactNode } from 'react';
import type { Project } from '../data/projects';

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="grid gap-1 border-t border-line py-4 md:grid-cols-[170px_1fr] md:gap-6">
    <dt className="label text-muted">{label}</dt>
    <dd className="text-[15px] leading-relaxed text-ink-soft">{children}</dd>
  </div>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-1.5">
    {items.map((s) => (
      <li key={s} className="flex gap-3">
        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-clay" />
        <span>{s}</span>
      </li>
    ))}
  </ul>
);

/** Project detail block: title, type, purpose, software, scope, deliverables and role. */
export default function ProjectMeta({ project: p }: { project: Project }) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h3 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{p.title}</h3>
        <span className="label border border-clay px-2.5 py-1 text-[10px] text-clay">{p.roleType}</span>
      </div>
      <dl className="border-b border-line">
        <Row label="Project type">{p.type}</Row>
        <Row label="Purpose">{p.purpose}</Row>
        <Row label="Software">
          <span className="flex flex-wrap gap-2">
            {p.software.map((s) => (
              <span key={s} className="label border border-line bg-white px-2.5 py-1 text-[10px] text-ink">
                {s}
              </span>
            ))}
          </span>
        </Row>
        <Row label="Modeling scope">
          <List items={p.scope} />
        </Row>
        <Row label="Documentation">
          <List items={p.deliverables} />
        </Row>
        <Row label="My role">
          <strong className="font-medium text-ink">{p.roleType}.</strong> {p.roleNote}
        </Row>
      </dl>
    </div>
  );
}
