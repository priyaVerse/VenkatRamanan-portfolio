import { useCallback, useEffect, useState } from 'react';
import type { Asset } from '../data/assets';

/** Tracks which section is currently under the top of the viewport. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.5, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/** State for a lightbox that cycles through `items`. */
export function useLightbox(items: Asset[]) {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback(
    (id: string) => {
      const i = items.findIndex((a) => a.id === id);
      if (i >= 0) setIndex(i);
    },
    [items],
  );
  const close = useCallback(() => setIndex(null), []);
  return { index, open, close, setIndex };
}
