import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Download, ExternalLink, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { Asset } from '../data/assets';
import { profile } from '../data/profile';
import { asset as assetUrl } from '../lib/url';

interface Props {
  items: Asset[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

const iconBtn =
  'inline-flex h-10 w-10 items-center justify-center rounded-full text-paper/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-clay';

export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const open = index !== null;
  const count = items.length;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [zoom, setZoom] = useState(false);

  const go = useCallback(
    (delta: number) => {
      if (index === null || count < 2) return;
      onIndex((index + delta + count) % count);
    },
    [index, count, onIndex],
  );

  useEffect(() => {
    setZoom(false);
  }, [index]);

  // Focus management + scroll lock
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  // Preload neighbours for instant prev / next
  useEffect(() => {
    if (index === null || count < 2) return;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = items[(index + d + count) % count].src;
    });
  }, [index, items, count]);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Escape':
        e.stopPropagation();
        onClose();
        return;
      case 'ArrowRight':
        e.preventDefault();
        go(1);
        return;
      case 'ArrowLeft':
        e.preventDefault();
        go(-1);
        return;
      case '+':
      case '=':
        setZoom(true);
        return;
      case '-':
        setZoom(false);
        return;
      case 'Tab': {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      default:
    }
  };

  if (index === null) return null;
  const a = items[index];
  if (!a) return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${a.title} — image ${index + 1} of ${count}`}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/95 text-paper print:hidden"
    >
      <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-6">
        <div className="min-w-0">
          <p className="label text-white/50">
            {pad(index + 1)} / {pad(count)} · {a.kind}{a.page > 0 ? ` · PDF p.${a.page}` : ''}
          </p>
          <h3 className="truncate text-sm font-medium md:text-base">{a.title}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" className={iconBtn} onClick={() => setZoom((z) => !z)} aria-pressed={zoom} aria-label={zoom ? 'Fit image to screen' : 'View at full size'}>
            {zoom ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>
          <a className={iconBtn} href={a.src} download aria-label="Download this image">
            <Download size={18} />
          </a>
          {a.page > 0 && (
            <a className={iconBtn} href={`${assetUrl(profile.sourcePdf)}#page=${a.page}`} target="_blank" rel="noopener noreferrer" aria-label="Open this page in the original PDF (new tab)">
              <ExternalLink size={18} />
            </a>
          )}
          <button ref={closeRef} type="button" className={iconBtn} onClick={onClose} aria-label="Close viewer">
            <X size={20} />
          </button>
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <div
          tabIndex={zoom ? 0 : -1}
          aria-label={zoom ? 'Scrollable full-size image' : undefined}
          className={`absolute inset-0 flex p-3 md:p-6 ${zoom ? 'overflow-auto' : 'overflow-hidden'}`}
        >
          <img
            key={a.id}
            src={a.src}
            alt={`${a.title}. ${a.caption}`}
            width={a.w}
            height={a.h}
            onClick={() => setZoom((z) => !z)}
            className={`m-auto bg-white ${zoom ? 'max-w-none cursor-zoom-out' : 'max-h-full max-w-full cursor-zoom-in object-contain'}`}
            style={zoom ? { width: a.w } : undefined}
          />
        </div>

        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`${iconBtn} absolute left-2 top-1/2 -translate-y-1/2 bg-ink/60 md:left-4`}>
              <ChevronLeft size={22} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className={`${iconBtn} absolute right-2 top-1/2 -translate-y-1/2 bg-ink/60 md:right-4`}>
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      <footer className="border-t border-white/10 px-4 py-3 text-sm text-white/70 md:px-6">
        <p>{a.caption}</p>
        <p className="label mt-1 text-white/40">{a.software.join(' · ')} — arrow keys to browse, Esc to close, + / − to zoom</p>
      </footer>
    </div>,
    document.body,
  );
}
