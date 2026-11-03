import type { Discipline } from './assets';

export type RoleType = 'Training project' | 'Academic project' | 'Freelance work' | 'Professional work';

export interface Project {
  id: string; // matches the section id in the page
  no: string; // page number label
  title: string;
  type: string;
  discipline: Discipline;
  purpose: string;
  software: string[];
  scope: string[];
  deliverables: string[];
  roleType: RoleType;
  roleNote: string;
  heroId: string;
}

/**
 * All role labels are "Training project": the supplied files are training / practice sheets
 * (title block: "MVR Design Studio"). Change roleType only if you can document a different context.
 */
export const projects: Project[] = [
  {
    id: 'architecture',
    no: '04',
    title: 'Office Building — Architectural BIM',
    type: 'Multi-storey commercial office building',
    discipline: 'Architecture',
    purpose:
      'Develop a coordinated architectural Revit model of an office building and extract room-coded plans, dimensioned plans, grid plans and elevation views from it.',
    software: ['Revit Architecture', 'Lumion'],
    scope: [
      'Ground, first and second floor layouts with escalator core, walkways, workspaces, cabins, conference and service rooms',
      'Glazed curtain-wall façade with feature wall, entrance canopy and gateway portal',
      'Roof, rooftop structures, boundary wall and landscaping',
    ],
    deliverables: [
      'Colour-filled room plans with area tags and legends',
      'Dimensioned plans and gridded plans (grids 1–15, A–L)',
      'Line plans with fixtures and furniture',
      'Front elevation, 3D views and roof / site plan',
    ],
    roleType: 'Training project',
    roleNote: 'Modeling and sheet documentation completed as part of BIM training.',
    heroId: 'arch-3d-01',
  },
  {
    id: 'structure',
    no: '05',
    title: 'Office Building — Structural BIM',
    type: 'Reinforced-concrete frame with detailed reinforcement',
    discipline: 'Structure',
    purpose:
      'Model the structural frame of the office building in Revit and detail footing, column, beam and slab reinforcement with a quantity estimate.',
    software: ['Revit Structure'],
    scope: [
      'Isolated footings, columns, beams and slabs of the multi-storey frame',
      'Reinforcement modeled for footings (12 mm), columns (16 mm longitudinal), beams (12 mm main bars, 8 mm stirrups) and slabs (10 mm)',
      'Slab panels classified as one-way or two-way',
    ],
    deliverables: [
      'Analytical model view',
      'Footing marking plan and footing sections',
      'Column and beam reinforcement sections',
      'Slab layouts, slab schedule and rebar quantity estimate',
    ],
    roleType: 'Training project',
    roleNote: 'Reinforcement modeling and detailing sheets prepared as part of BIM training.',
    heroId: 'str-rebar-views',
  },
  {
    id: 'mep',
    no: '06',
    title: 'Office Building — MEP BIM',
    type: 'HVAC and plumbing models',
    discipline: 'MEP',
    purpose:
      'Model mechanical and plumbing systems in the office building to produce ductwork views, airflow colour plans and plumbing riser views.',
    software: ['Revit MEP'],
    scope: [
      'HVAC supply ductwork on three levels with air terminals, vertical riser and rooftop equipment',
      'Plumbing supply and drainage pipework to sanitary fixtures with rooftop tanks',
    ],
    deliverables: [
      'Ductwork elevations and isometric',
      'Duct plans coloured by airflow (CFM) with legends',
      'Plumbing section and isometric views',
    ],
    roleType: 'Training project',
    roleNote: 'HVAC and plumbing modeling completed as part of BIM training. Clash testing is shown separately in Page 08.',
    heroId: 'mep-hvac-iso',
  },
  {
    id: 'coordination',
    no: '08',
    title: 'Navisworks Review & Clash Report',
    type: 'Model review, clash test and 4D simulation',
    discipline: 'Coordination',
    purpose: 'Review the combined model in Navisworks, run a hard-clash test and preview a construction sequence with TimeLiner.',
    software: ['Navisworks'],
    scope: [
      'Hard-clash test "E H Clash" at 0.001 m tolerance',
      'Section-plane viewpoints through the combined model',
      'TimeLiner construction-sequence simulation',
    ],
    deliverables: ['Navisworks clash report excerpt (Clashes 1–9 of 15)', 'Sectioning viewpoints', 'TimeLiner simulation screenshots'],
    roleType: 'Training project',
    roleNote: 'All 15 reported clashes are still marked "New"; none are recorded as reviewed or resolved in the supplied report.',
    heroId: 'coord-section-01',
  },
  {
    id: 'visualization',
    no: '09',
    title: 'Visualization & Planning',
    type: 'Rendered views and project scheduling',
    discipline: 'Visualization',
    purpose: 'Present the Revit model as rendered views and practise scheduling with Primavera P6.',
    software: ['Lumion', 'Primavera P6'],
    scope: ['Five rendered views of the office building', 'Primavera P6 activity schedule and work breakdown structure'],
    deliverables: ['Façade, entrance, side and aerial renders', 'P6 Gantt and WBS screenshots'],
    roleType: 'Training project',
    roleNote: 'The Primavera P6 schedule is a separate training exercise and is not the programme for the office building.',
    heroId: 'render-01',
  },
];

export function getProject(id: string): Project {
  const p = projects.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown project id: ${id}`);
  return p;
}
