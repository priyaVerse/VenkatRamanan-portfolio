import { useLightbox } from '../lib/hooks';
import type { Asset } from '../data/assets';
import AssetTile from './AssetTile';
import Lightbox from './Lightbox';

interface Props {
  items: Asset[];
  /** Tailwind grid-cols classes, e.g. "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" */
  columns?: string;
  variant?: 'photo' | 'drawing';
  ratio?: string;
  /** aspect ratio used for tiles listed in wideIds */
  wideRatio?: string;
  fit?: 'cover' | 'contain';
  /** ids that should span the full row on md+ screens */
  wideIds?: string[];
  gap?: string;
}

/** Self-contained gallery: responsive grid of tiles + click-to-expand viewer with prev / next. */
export default function Gallery({ items, columns = 'grid-cols-1 md:grid-cols-2', variant = 'photo', ratio, wideRatio, fit, wideIds = [], gap = 'gap-5 md:gap-6' }: Props) {
  const lb = useLightbox(items);
  return (
    <>
      <div className={`grid ${columns} ${gap}`}>
        {items.map((a, i) => (
          <AssetTile
            key={a.id}
            asset={a}
            variant={variant}
            ratio={wideIds.includes(a.id) && wideRatio ? wideRatio : ratio}
            fit={fit}
            onOpen={lb.open}
            priority={i === 0}
            className={wideIds.includes(a.id) ? 'md:col-span-full' : ''}
          />
        ))}
      </div>
      <Lightbox items={items} index={lb.index} onClose={lb.close} onIndex={lb.setIndex} />
    </>
  );
}
