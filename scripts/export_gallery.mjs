import fs from 'node:fs';

const source = fs.readFileSync('src/data/assets.ts', 'utf8');
const manifest = JSON.parse(
  fs.readFileSync('src/data/manifest.json', 'utf8')
);

const constants = {
  REVIT_A: ['Revit Architecture'],
  REVIT_S: ['Revit Structure'],
  REVIT_M: ['Revit MEP'],
  NAVIS: ['Navisworks']
};

const entries = [];
const lines = source.split(/\r?\n/);

for (const line of lines) {
  const match = line.match(/^\s*'([^']+)':\s*\{(.*)\},?\s*$/);
  if (!match) continue;

  const id = match[1];
  const fields = match[2];

  const read = (key) => {
    const result = fields.match(new RegExp(`${key}:\\s*'([^']*)'`));
    return result ? result[1] : '';
  };

  const softwareMatch = fields.match(/software:\s*(\[[^\]]*\]|[A-Z_]+)/);
  let software = [];

  if (softwareMatch) {
    const value = softwareMatch[1];
    software = value.startsWith('[')
      ? [...value.matchAll(/'([^']*)'/g)].map(x => x[1])
      : (constants[value] || []);
  }

  if (!manifest[id]) {
    throw new Error(`Missing manifest entry: ${id}`);
  }

  const item = {
    id,
    image: '/' + manifest[id].src,
    title: read('title'),
    caption: read('caption'),
    discipline: read('discipline'),
    kind: read('kind'),
    software
  };

  const docGroup = read('docGroup');
  if (docGroup) item.docGroup = docGroup;

  entries.push(item);
}

const missing = Object.keys(manifest).filter(
  id => !entries.some(item => item.id === id)
);

if (missing.length || entries.length !== Object.keys(manifest).length) {
  console.log('Exported:', entries.length);
  console.log('Missing IDs:', missing);
  throw new Error('Export incomplete. gallery.json was not changed.');
}

fs.writeFileSync(
  'src/content/gallery.json',
  JSON.stringify(entries, null, 2) + '\n'
);

console.log(`Successfully exported ${entries.length} gallery images.`);