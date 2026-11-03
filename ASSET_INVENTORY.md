# Asset inventory

Source file: `bim.pdf` (51 pages, A4) → copied to `public/pdf/bim-drawings.pdf`.
Each page is rendered to `public/assets/<folder>/<id>.jpg` (full size) and `thumbs/<id>.jpg` (grid size)
by `scripts/prepare_assets.py`. The "Page" column below is the PDF page number.

| PDF page | Asset id(s) | Project category | Drawing / view type | Portfolio section |
|---|---|---|---|---|
| 1 | plan-gf-rooms | Architecture | Basement (sheet view is labelled "base ment"), colour-filled room plan with legend | 04 Architecture, 07 Documentation |
| 2 | plan-ff-rooms | Architecture | First floor room plan | 04, 07 |
| 3 | plan-sf-rooms | Architecture | Second floor room plan | 04, 07 |
| 4 | plan-gf-dims | Architecture | Basement dimensioned plan | 04, 07 |
| 5 | plan-ff-dims | Architecture | First floor dimensioned plan | 04, 07 |
| 6 | plan-sf-dims | Architecture | Second floor dimensioned plan | 04, 07 |
| 7–11 | coord-clash-01 … 05 | Coordination | Navisworks clash report (summary + Clashes 1–9) | 08 Coordination |
| 12 | render-01 | Visualization | Render, glazed façade (also the cover image) | 01 Cover, 09 |
| 13–15 | render-02 … 04 | Visualization | Renders: forecourt, side approach, parking side | 09 |
| 16 | render-05 | Visualization | Aerial render | 09 |
| 17–18 | mep-hvac-elev-front, mep-hvac-elev-side | MEP | HVAC ductwork elevations | 06 MEP, 07 |
| 19 | mep-hvac-iso | MEP | HVAC ductwork isometric | 06 |
| 20–22 | mep-duct-l1 … l3 | MEP | Duct plans coloured by CFM, levels 1–3 | 06 |
| 23 | mep-plumb-section | MEP | Plumbing riser section view | 06, 07 |
| 24 | mep-plumb-iso | MEP | Plumbing isometric | 06 |
| 25 | plan-p6-gantt | Planning | Primavera P6 activities + Gantt | 09 |
| 26 | plan-p6-wbs | Planning | Primavera P6 WBS | 09 |
| 27–28 | arch-3d-01, arch-3d-02 | Architecture | Revit 3D views | 04 |
| 29 | arch-roof-plan | Architecture | Roof / site plan view | 04 |
| 30 | arch-elevation | Architecture | Front elevation | 04, 07 |
| 31–32 | coord-section-01, 02 | Coordination | Navisworks sectioning viewpoints | 08 |
| 33–35 | coord-4d-01 … 03 | Coordination | Navisworks TimeLiner simulation | 08 |
| 36 | plan-ff-cad | Architecture | First floor line plan with fixtures | 07 |
| 37 | plan-gf-cad | Architecture | Ground floor line plan with fixtures | 07 |
| 38 | plan-gf-grid | Architecture | Basement gridded plan | 07 |
| 39 | plan-sf-cad | Architecture | Second floor line plan with fixtures | 07 |
| 40 | str-analytical | Structure | Analytical model sheet | 05 Structure, 07 |
| 41 | str-rebar-views | Structure | Rebar model: top / front / side / iso | 05, 07 |
| 42 | str-footing | Structure | Footing marking + footing sections | 05, 07 |
| 43 | str-columns | Structure | Column reinforcement sections | 05, 07 |
| 44 | str-beams | Structure | Beam reinforcement sections | 05, 07 |
| 45 | str-slab-1 | Structure | Slab reinforcement layout | 05, 07 |
| 46 | str-slab-2 | Structure | Slab schedule (one-way / two-way, sizes) | 05, 07 |
| 47 | str-schedule | Structure | Rebar quantity estimate | 05, 07 |
| 48 | plan-sf-grid | Architecture | Second floor gridded plan | 07 |
| 49 | plan-ff-grid | Architecture | First floor gridded plan | 07 |
| 50 | — | Planning | Smaller duplicate of page 25 | not used |
| 51 | — | Planning | Primavera print layout of the WBS (duplicate of page 26) | not used |

## Not in the supplied files (so not shown)

- Electrical layouts
- Interior views / architectural building sections
- Any AutoCAD, SketchUp, V-Ray, STAAD.Pro or Tekla Structures work (listed under Software only; no sample pages)
- Separate discipline models linked into a federated Navisworks model (only the combined-model views are included)
- Contact details (placeholders on Page 10)

## Please confirm

1. Floor naming: pages 1, 4 and 38 are titled "Basement" (the sheet view is labelled "base ment"). Pages 2, 3, 5, 6, 48, 49 are shown as first and second floor, but their sheet labels read "ROOF TOP" and "1ST ROOF TOP" or nothing, so please confirm the level names.
2. Renders are labelled "Lumion" because your brief says the renders are Lumion; the PDF itself does not name the software.
3. The Primavera P6 pages show a different, generic project (not the office building) and are labelled as a separate training exercise.
4. Every project role is labelled "Training project". Change `roleType` in `src/data/projects.ts` only if you can document otherwise.
