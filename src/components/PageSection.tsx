import type { ReactNode } from 'react';

interface Props {
  id: string;
  /** must match the id used on the section's h2 (see SectionHeader) — used for aria-labelledby */
  labelledBy: string;
  children: ReactNode;
  tone?: 'paper' | 'alt';
}

export default function PageSection({ id, labelledBy, children, tone = 'paper' }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`page-section scroll-mt-16 border-t border-line py-20 md:py-28 ${tone === 'alt' ? 'bg-paper-2' : 'bg-paper'}`}>
      <div className="mx-auto max-w-page px-5 md:px-10">{children}</div>
    </section>
  );
}
