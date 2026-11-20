const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;

function fail(msg) {
  console.error('FAIL:', msg);
  failures += 1;
}

function pass(msg) {
  console.log('PASS:', msg);
}

// 1. Check no wrong hyphenated chatbot URL exists anywhere in code/data
function walk(dir, exts, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git', '.vercel'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

const codeFiles = walk(ROOT, ['.js', '.jsx', '.mjs', '.json']);
const badChatbotRefs = [];
const badUrl = 'uni-' + 'tec-front-desk.vercel.app';
for (const f of codeFiles) {
  const txt = fs.readFileSync(f, 'utf8');
  if (txt.includes(badUrl)) {
    badChatbotRefs.push(path.relative(ROOT, f));
  }
}
if (badChatbotRefs.length > 0) fail(`Wrong chatbot URL found in: ${badChatbotRefs.join(', ')}`);
else pass('Zero occurrences of wrong hyphenated chatbot URL');

// 2. Check no basePrice or CartDrawer rendered in catalog or global chrome
const forbiddenCatalogPaths = [
  path.join(ROOT, 'app', 'catalogo'),
  path.join(ROOT, 'components', 'bi'),
  path.join(ROOT, 'app', 'layout-client.js'),
  path.join(ROOT, 'components', 'navbar', 'main.js'),
];
const priceOrCartLeaks = [];
for (const p of forbiddenCatalogPaths) {
  const files = fs.statSync(p).isDirectory() ? walk(p, ['.js', '.jsx']) : [p];
  for (const f of files) {
    const txt = fs.readFileSync(f, 'utf8');
    if (/\bbasePrice\b|\bCartDrawer\b|\bCartInit\b/.test(txt)) {
      priceOrCartLeaks.push(path.relative(ROOT, f));
    }
  }
}
if (priceOrCartLeaks.length > 0) fail(`Price/Cart leakage found in: ${priceOrCartLeaks.join(', ')}`);
else pass('Zero basePrice/CartDrawer/CartInit leakage in catalog & global layout');

// 3. Check biDictionary ES vs EN key parity
const dictSrc = fs.readFileSync(path.join(ROOT, 'utils', 'i18n', 'biDictionary.js'), 'utf8');
// Strip trailing helper export so we can evaluate object cleanly
const objMatch = dictSrc.match(/export const biDictionary = (\{[\s\S]*?\n\});/);
if (!objMatch) {
  fail('Could not parse biDictionary object');
} else {
  const biDictionary = new Function(`return (${objMatch[1]});`)();
  function collectKeys(obj, prefix = '') {
    let keys = [];
    if (Array.isArray(obj)) {
      keys.push(`${prefix}[length=${obj.length}]`);
      if (obj[0] && typeof obj[0] === 'object') {
        keys = keys.concat(collectKeys(obj[0], `${prefix}[]`));
      }
      return keys;
    }
    if (obj && typeof obj === 'object') {
      for (const k of Object.keys(obj)) {
        keys = keys.concat(collectKeys(obj[k], prefix ? `${prefix}.${k}` : k));
      }
      return keys;
    }
    keys.push(prefix);
    return keys;
  }
  const esKeys = new Set(collectKeys(biDictionary.es));
  const enKeys = new Set(collectKeys(biDictionary.en));
  const missingInEn = [...esKeys].filter((k) => !enKeys.has(k));
  const missingInEs = [...enKeys].filter((k) => !esKeys.has(k));
  if (missingInEn.length || missingInEs.length) {
    fail(`Dictionary parity mismatch. Missing EN: ${missingInEn.join(', ')} | Missing ES: ${missingInEs.join(', ')}`);
  } else {
    pass(`100% ES/EN dictionary key & array-length parity (${esKeys.size} keys)`);
  }
}

// 4. Verify critical local public assets exist on disk
const requiredAssets = [
  'public/logo.png',
  'public/unitec-logo.png',
  'public/videos/hero-video.mp4',
  'public/catalogs/catalogo-building-latam-es.pdf',
  'public/catalogs/product-catalog-usa-en.pdf',
  'public/raster/interior.webp',
  'public/raster/exterior.webp',
  'public/raster/containers.webp',
  'public/raster/product.jpg',
  'public/raster/top.jpg',
  'public/raster/blog/inteligencia-artificial-construccion-remodelacion-portada-unitec.webp',
  'public/raster/blog/inteligencia-artificial-remodelacion-antes-despues-unitec.webp',
  'public/raster/blog/inteligencia-artificial-remodelacion-app-building-innovation.webp',
  'public/raster/blog/asistente-virtual-ia-chatbot-unitec.webp',
  'public/raster/blog/lamina-marmol-pvc-portada-unitec.webp',
  'public/raster/blog/lamina-marmol-pvc-bano-ducha-unitec.webp',
  'public/raster/blog/lamina-marmol-pvc-restaurante-recepcion-unitec.webp',
  'public/raster/blog/lamina-marmol-pvc-vs-marmol-real-unitec.webp',
  'public/raster/blog/panel-wpc-interior-portada-unitec.webp',
  'public/raster/blog/panel-wpc-interior-cielo-raso-unitec.webp',
  'public/raster/blog/panel-wpc-interior-instalacion-unitec.webp',
  'public/raster/blog/panel-wpc-interior-recepcion-marmol-unitec.webp',
];
const missingAssets = requiredAssets.filter((rel) => !fs.existsSync(path.join(ROOT, rel)));
if (missingAssets.length) fail(`Missing local assets: ${missingAssets.join(', ')}`);
else pass(`All ${requiredAssets.length} required local media/PDF assets verified on disk`);

if (failures > 0) {
  console.error(`\nVerification FAILED with ${failures} issue(s).`);
  process.exit(1);
}
console.log('\nALL VERIFICATION CHECKS PASSED!');
