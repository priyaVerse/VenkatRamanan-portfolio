import manifest from './manifest.json';
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

/** Filter groups for the documentation gallery (Page 07). */
export type DocGroup = 'Floor plans' | 'Elevations & sections' | 'Structural sheets' | 'Schedules';

export interface Asset {
  id: string;
  src: string;
  thumb: string;
  w: number;
  h: number;
  /** Page number in the source PDF (public/pdf/bim-drawings.pdf); 0 for loose screenshots. */
  page: number;
  title: string;
  caption: string;
  discipline: Discipline;
  kind: Kind;
  software: string[];
  docGroup?: DocGroup;
}

type Meta = Omit<Asset, 'src' | 'thumb' | 'w' | 'h' | 'page' | 'id'>;

const REVIT_A = ['Revit Architecture'];
const REVIT_S = ['Revit Structure'];
const REVIT_M = ['Revit MEP'];
const NAVIS = ['Navisworks'];

/**
 * Descriptive metadata for each asset. Keys must match ids in manifest.json
 * (produced by scripts/prepare_assets.py). Captions describe only what is visible on the page.
 */
const meta: Record<string, Meta> = {
  // ---------------- Visualization ----------------
  'render-01': { title: 'Glazed façade — corner view', caption: 'Rendered view of the glazed office block with stone-clad feature tower and entrance canopy.', discipline: 'Visualization', kind: 'Render', software: ['Lumion'] },
  'render-02': { title: 'Entrance forecourt', caption: 'Feature wall with circular emblem, canopy, paved forecourt and gateway portal.', discipline: 'Visualization', kind: 'Render', software: ['Lumion'] },
  'render-03': { title: 'Side approach', caption: 'Façade and boundary wall seen from the access road side.', discipline: 'Visualization', kind: 'Render', software: ['Lumion'] },
  'render-04': { title: 'Parking and landscape side', caption: 'Secondary entrance, parking bays, two-wheeler parking and planting.', discipline: 'Visualization', kind: 'Render', software: ['Lumion'] },
  'render-05': { title: 'Aerial view', caption: 'Roof layout and site arrangement seen from above.', discipline: 'Visualization', kind: 'Render', software: ['Lumion'] },

  // ---------------- Architecture ----------------
  'arch-3d-01': { title: 'Revit 3D view — entrance side', caption: 'Glazed curtain-wall office block with feature wall and entrance portal.', discipline: 'Architecture', kind: '3D view', software: REVIT_A },
  'arch-3d-02': { title: 'Revit 3D view — rear block', caption: 'Opposite corner showing the stepped masses, rooftop structures and landscaping.', discipline: 'Architecture', kind: '3D view', software: REVIT_A },
  'arch-roof-plan': { title: 'Roof and site plan view', caption: 'Top view of roof, rooftop structures, landscaping and site boundary.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A },
  'arch-elevation': { title: 'Front elevation', caption: 'Elevation with feature wall, curtain-wall grid and entrance portal.', discipline: 'Architecture', kind: 'Elevation', software: REVIT_A, docGroup: 'Elevations & sections' },

  'plan-gf-rooms': { title: 'Basement — room plan', caption: 'Colour-filled rooms with area tags and room legend.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-ff-rooms': { title: 'First floor — room plan', caption: 'Colour-filled rooms with area tags and room legend.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-sf-rooms': { title: 'Second floor — room plan', caption: 'Colour-filled rooms with area tags and room legend.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-gf-dims': { title: 'Basement — dimensioned plan', caption: 'Grid-to-grid and overall dimensions with room tags.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-ff-dims': { title: 'First floor — dimensioned plan', caption: 'Grid-to-grid and overall dimensions with room tags.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-sf-dims': { title: 'Second floor — dimensioned plan', caption: 'Grid-to-grid and overall dimensions with room tags.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-gf-grid': { title: 'Basement — gridded plan', caption: 'Numbered and lettered structural grid over the colour-filled plan.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-ff-grid': { title: 'First floor — gridded plan', caption: 'Numbered and lettered structural grid over the colour-filled plan.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-sf-grid': { title: 'Second floor — gridded plan', caption: 'Numbered and lettered structural grid over the colour-filled plan.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-gf-cad': { title: 'Ground floor — line plan with fixtures', caption: 'Black-and-white line plan showing doors, fixtures and furniture.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-ff-cad': { title: 'First floor — line plan with fixtures', caption: 'Black-and-white line plan showing doors, fixtures and furniture.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },
  'plan-sf-cad': { title: 'Second floor — line plan with fixtures', caption: 'Black-and-white line plan showing doors, fixtures and furniture.', discipline: 'Architecture', kind: 'Floor plan', software: REVIT_A, docGroup: 'Floor plans' },

  // ---------------- Structure ----------------
  'str-analytical': { title: 'Analytical model', caption: 'Analytical frame of slabs, columns and beams on the rebar detailing sheet.', discipline: 'Structure', kind: '3D view', software: REVIT_S, docGroup: 'Structural sheets' },
  'str-rebar-views': { title: 'Reinforcement model — plan, elevations, isometric', caption: 'Top, front and side views plus isometric of the modeled reinforcement.', discipline: 'Structure', kind: 'Detail sheet', software: REVIT_S, docGroup: 'Structural sheets' },
  'str-footing': { title: 'Footing marking and footing sections', caption: 'Footing layout at 1:200 with footing sections at 1:20 and 1:100.', discipline: 'Structure', kind: 'Detail sheet', software: REVIT_S, docGroup: 'Structural sheets' },
  'str-columns': { title: 'Column reinforcement sections', caption: 'Column sections at 1:50 and a column cross-section callout at 1:2.', discipline: 'Structure', kind: 'Section', software: REVIT_S, docGroup: 'Elevations & sections' },
  'str-beams': { title: 'Beam reinforcement sections', caption: 'Beam frame sections at 1:100 and beam details at 1:25 (250×350 and 300×400 beams).', discipline: 'Structure', kind: 'Section', software: REVIT_S, docGroup: 'Elevations & sections' },
  'str-slab-1': { title: 'Slab reinforcement layout', caption: 'Roof-slab reinforcement at 1:100 with one-way / two-way slab tagging.', discipline: 'Structure', kind: 'Detail sheet', software: REVIT_S, docGroup: 'Structural sheets' },
  'str-slab-2': { title: 'Slab schedule', caption: 'Numbered slab panels with one-way / two-way classification and panel sizes.', discipline: 'Structure', kind: 'Schedule', software: REVIT_S, docGroup: 'Schedules' },
  'str-schedule': { title: 'Rebar quantity estimate', caption: 'Revit rebar schedule grouped by family and type, with weight totals.', discipline: 'Structure', kind: 'Schedule', software: REVIT_S, docGroup: 'Schedules' },

  // ---------------- MEP ----------------
  'mep-hvac-elev-front': { title: 'HVAC ductwork — front elevation', caption: 'Supply ductwork on three levels with a rooftop unit and vertical riser.', discipline: 'MEP', kind: 'Elevation', software: REVIT_M, docGroup: 'Elevations & sections' },
  'mep-hvac-elev-side': { title: 'HVAC ductwork — side elevation', caption: 'Ductwork runs per level with rooftop equipment.', discipline: 'MEP', kind: 'Elevation', software: REVIT_M, docGroup: 'Elevations & sections' },
  'mep-hvac-iso': { title: 'HVAC ductwork — isometric', caption: 'Duct network over the building outline with rooftop equipment.', discipline: 'MEP', kind: '3D view', software: REVIT_M },
  'mep-duct-l1': { title: 'Duct plan with airflow (CFM) colour scheme — level 1', caption: 'Duct runs coloured by airflow with CFM legend and air terminals.', discipline: 'MEP', kind: 'Floor plan', software: REVIT_M },
  'mep-duct-l2': { title: 'Duct plan with airflow (CFM) colour scheme — level 2', caption: 'Duct runs coloured by airflow with CFM legend and air terminals.', discipline: 'MEP', kind: 'Floor plan', software: REVIT_M },
  'mep-duct-l3': { title: 'Duct plan with airflow (CFM) colour scheme — level 3', caption: 'Duct runs coloured by airflow with CFM legend and air terminals.', discipline: 'MEP', kind: 'Floor plan', software: REVIT_M },
  'mep-plumb-section': { title: 'Plumbing riser — section view', caption: 'Water supply and drainage routing to sanitary fixtures on each level, with rooftop tanks.', discipline: 'MEP', kind: 'Section', software: REVIT_M, docGroup: 'Elevations & sections' },
  'mep-plumb-iso': { title: 'Plumbing system — isometric', caption: 'Supply and drainage pipework with sanitary fixtures and rooftop tanks.', discipline: 'MEP', kind: '3D view', software: REVIT_M },

  // ---------------- Coordination ----------------
  'coord-clash-01': { title: 'Clash report — summary and Clash 1', caption: 'Test summary (15 hard clashes at 0.001 m tolerance, all status New) and first clash entry.', discipline: 'Coordination', kind: 'Report', software: NAVIS },
  'coord-clash-02': { title: 'Clash report — Clashes 2 and 3', caption: 'Clash points, element IDs, layers and item names.', discipline: 'Coordination', kind: 'Report', software: NAVIS },
  'coord-clash-03': { title: 'Clash report — Clashes 4 and 5', caption: 'Clash points, element IDs, layers and item names.', discipline: 'Coordination', kind: 'Report', software: NAVIS },
  'coord-clash-04': { title: 'Clash report — Clashes 6 and 7', caption: 'Clash points, element IDs, layers and item names.', discipline: 'Coordination', kind: 'Report', software: NAVIS },
  'coord-clash-05': { title: 'Clash report — Clashes 8 and 9', caption: 'Includes a rectangular duct clash entry and a roof-level entry.', discipline: 'Coordination', kind: 'Report', software: NAVIS },
  'coord-section-01': { title: 'Navisworks sectioning — view 1', caption: 'Section plane through the combined model showing ductwork, doors and windows.', discipline: 'Coordination', kind: 'Screenshot', software: NAVIS },
  'coord-section-02': { title: 'Navisworks sectioning — view 2', caption: 'Second section viewpoint through the floor levels.', discipline: 'Coordination', kind: 'Screenshot', software: NAVIS },
  'coord-4d-01': { title: 'TimeLiner simulation — step 1', caption: 'Construction-sequence simulation with planned and actual dates (8–10 July 2026 task shown).', discipline: 'Coordination', kind: 'Screenshot', software: NAVIS },
  'coord-4d-02': { title: 'TimeLiner simulation — step 2', caption: 'Simulation showing walls appearing as the schedule advances (10–12 July 2026 task shown).', discipline: 'Coordination', kind: 'Screenshot', software: NAVIS },
  'coord-4d-03': { title: 'TimeLiner simulation — step 3', caption: 'Later simulation state with doors and windows in place.', discipline: 'Coordination', kind: 'Screenshot', software: NAVIS },

  // ---------------- Planning ----------------
  'plan-p6-gantt': { title: 'Primavera P6 — activities and Gantt', caption: 'Activity table and bar chart across engineering, procurement, construction and commissioning.', discipline: 'Planning', kind: 'Screenshot', software: ['Primavera P6'] },
  'plan-p6-wbs': { title: 'Primavera P6 — work breakdown structure', caption: 'WBS tree with engineering, procurement, construction and commissioning branches.', discipline: 'Planning', kind: 'Diagram', software: ['Primavera P6'] },
};

type ManifestEntry = { src: string; thumb: string; w: number; h: number; page: number };
const m = manifest as Record<string, ManifestEntry>;

export const assets: Asset[] = Object.keys(meta).map((id) => {
  const e = m[id];
  if (!e) throw new Error(`Asset "${id}" is described in assets.ts but missing from manifest.json — run "npm run assets".`);
  return { id, ...meta[id], src: assetUrl(e.src), thumb: assetUrl(e.thumb), w: e.w, h: e.h, page: e.page };
});

const index = new Map(assets.map((a) => [a.id, a]));

export function get(id: string): Asset {
  const a = index.get(id);
  if (!a) throw new Error(`Unknown asset id: ${id}`);
  return a;
}

export function pick(ids: string[]): Asset[] {
  return ids.map(get);
}
