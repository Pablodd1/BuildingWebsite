const fs = require('fs');
const path = require('path');

function loadData() {
  const p = path.resolve(__dirname, '..', 'static_data', 'products_full.json');
  if (!fs.existsSync(p)) {
    console.error('data file not found', p);
    return [];
  }
  const raw = fs.readFileSync(p, 'utf8');
  try {
    const data = JSON.parse(raw);
    if (Array.isArray(data)) return data;
  } catch (e) {
    console.error('invalid JSON in products_full.json');
  }
  return [];
}

function countForCategories(rows, cats) {
  const map = {};
  for (const c of cats) map[c] = 0;
  for (const r of rows) {
    if (r.category && map.hasOwnProperty(r.category)) map[r.category]++;
  }
  return map;
}

function main() {
  const data = loadData();
  const categories = [
    'PAREDES',
    'CUBIERTAS UPVC',
    'LISTONES',
    'JARDINES ARTIFICIALES',
    'ILUMINACION',
    'CIELO RASO PVC',
  ];
  const counts = countForCategories(data, categories);
  console.log('Category product counts:');
  for (const c of categories) {
    console.log(`- ${c}: ${counts[c] || 0}`);
  }
}

main();
