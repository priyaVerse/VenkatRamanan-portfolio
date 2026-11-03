import type { Asset } from '../data/assets';

interface Props {
  asset: Asset;
  onOpen: (id: string) => void;
  /** 'photo' = render / model view, 'drawing' = technical sheet on a framed white panel */
  variant?: 'photo' | 'drawing';
  /** CSS aspect-ratio, e.g. "4 / 3". Default is the image's natural ratio. */
  ratio?: string;
  fit?: 'cover' | 'contain';
  showCaption?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * One clickable image. With variant="drawing" it becomes a Technical Drawing Panel:
 * framed sheet, small technical label (type + source PDF page) and caption below.
 */
export default function AssetTile({ asset: a, onOpen, variant = 'photo', ratio, fit, showCaption = true, priority = false, className = '' }: Props) {
  const isDrawing = variant === 'drawing';
  const objectFit = fit ?? (isDrawing ? 'contain' : 'cover');
  const aspect = ratio ?? `${a.w} / ${a.h}`;

  return (
    <figure className={`group ${className}`}>
      <button
        type="button"
        onClick={() => onOpen(a.id)}
        aria-label={`Open ${a.title} full size`}
        className={`relative block w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${
          isDrawing ? 'border border-line bg-white p-1.5 transition group-hover:border-clay' : 'bg-paper-3'
        }`}
      >
        <img
          src={a.thumb}
          alt={`${a.title}. ${a.caption}`}
          width={a.w}
          height={a.h}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{ aspectRatio: aspect }}
          className={`block h-full w-full transition duration-500 ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} ${isDrawing ? '' : 'group-hover:scale-[1.015]'}`}
        />
        <span className="label pointer-events-none absolute left-3 top-3 bg-paper/90 px-2 py-1 text-[10px] text-ink-soft print:hidden">
          {a.kind}{a.page > 0 ? ` · p.${String(a.page).padStart(2, '0')}` : ''}
        </span>
      </button>
      {showCaption && (
        <figcaption className="mt-2.5 flex items-baseline justify-between gap-4 text-sm">
          <span className="font-medium text-ink">{a.title}</span>
          <span className="label hidden shrink-0 text-[10px] text-muted sm:inline">{a.software[0]}</span>
        </figcaption>
      )}
    </figure>
  );
}
