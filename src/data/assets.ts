
import manifest from './manifest.json';
import galleryData from '../content/gallery.json';
import { asset as assetUrl } from '../lib/url';

export type Discipline =
  | 'Architecture'
  | 'Structure'
  | 'MEP'
  | 'Coordination'
  | 'Visualization'
  | 'Planning';

export type Kind =
  | 'Render'
  | '3D view'
  | 'Floor plan'
  | 'Elevation'
  | 'Section'
  | 'Schedule'
  | 'Detail sheet'
  | 'Screenshot'
  | 'Report'
  | 'Diagram';

export type DocGroup =
  | 'Floor plans'
  | 'Elevations & sections'
  | 'Structural sheets'
  | 'Schedules';

export interface Asset {
  id: string;
  src: string;
  thumb: string;
  w: number;
  h: number;
  page: number;
  title: string;
  caption: string;
  discipline: Discipline;
  kind: Kind;
  software: string[];
  docGroup?: DocGroup;
}

interface GalleryEntry {
  id: string;
  image: string;
  title: string;
  caption: string;
  discipline: Discipline;
  kind: Kind;
  software: string[];
  docGroup?: DocGroup;
}

type ManifestEntry = {
  src: string;
  thumb: string;
  w: number;
  h: number;
  page: number;
};

const m = manifest as Record<string, ManifestEntry>;
const gallery = galleryData as GalleryEntry[];

const seen = new Set<string>();

export const assets: Asset[] = gallery.map((entry) => {
  if (!entry.id || !entry.image) {
    throw new Error(
      `Gallery entry is missing an ID or image path: ${JSON.stringify(entry)}`
    );
  }

  if (seen.has(entry.id)) {
    throw new Error(`Duplicate gallery image ID: ${entry.id}`);
  }

  seen.add(entry.id);

  const original = m[entry.id];
  const originalPath = original ? `/${original.src}` : '';
  const isOriginalImage = entry.image === originalPath;
  const imagePath = assetUrl(entry.image);

  return {
    id: entry.id,
    src: imagePath,
    thumb: imagePath,
    w: isOriginalImage ? original.w : 1200,
    h: isOriginalImage ? original.h : 900,
    page: isOriginalImage ? original.page : 0,
    title: entry.title,
    caption: entry.caption,
    discipline: entry.discipline,
    kind: entry.kind,
    software: entry.software ?? [],
    ...(entry.docGroup ? { docGroup: entry.docGroup } : {})
  };
});

const index = new Map(assets.map((a) => [a.id, a]));

export function get(id: string): Asset {
  const a = index.get(id);

  if (!a) {
    throw new Error(`Unknown asset id: ${id}`);
  }

  return a;
}

export function pick(ids: string[]): Asset[] {
  return ids.map(get);
}
