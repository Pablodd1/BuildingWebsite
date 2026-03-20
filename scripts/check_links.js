const fs = require('fs')
const path = require('path')

function fileExists(p) {
  try { return fs.existsSync(p) && fs.statSync(p).isFile() } catch { return false }
}

function verifyProductImages() {
  const dataPath = path.resolve(__dirname, '..', 'static_data', 'products_full.json')
  let products = []
  try {
    const raw = fs.readFileSync(dataPath, 'utf8')
    products = JSON.parse(raw)
  } catch (e) {
    console.warn('Could not load products_full.json for image verification', e)
    return
  }

  const missing = []
  if (!Array.isArray(products)) {
    console.warn('products_full.json is not an array')
    return
  }
  for (const p of products) {
    if (!p.image) continue
    const imgPath = p.image.startsWith('/') ? p.image.substring(1) : p.image
    const abs = path.resolve(__dirname, '..', 'public', imgPath)
    if (!fileExists(abs)) {
      missing.push({ id: p.id, image: p.image, path: abs })
    }
  }
  console.log(`Product images checked: ${products.length}. Missing: ${missing.length}`)
  if (missing.length) {
    console.table(missing)
  }
}

function verifyPublicTextures() {
  const publicTexDir = path.resolve(__dirname, '..', 'public', 'assets', 'containers')
  const texFiles = [
    'container_texture_01.svg',
    'container_texture_02.svg',
    'container_texture_03.svg',
    'container_texture_04.svg',
  ]
  const missing = texFiles.filter((f) => !fileExists(path.join(publicTexDir, f)))
  console.log(`Textures present: ${texFiles.length - missing.length} / ${texFiles.length}`)
  if (missing.length) {
    console.table(missing.map((f) => ({ file: f, path: path.join(publicTexDir, f) })))
  }
}

function verifyMegaMenuAPIAvailability() {
  // Basic check to see if the API routes exist in codebase (non-network check)
  const routeCollections = path.resolve(__dirname, '..', 'app', 'API', 'collections', 'route.js')
  const routeProducts = path.resolve(__dirname, '..', 'app', 'API', 'products', 'route.js')
  const exists = fileExists(routeCollections) && fileExists(routeProducts)
  console.log(`MegaMenu API routes present: ${exists}`)
}

function run() {
  console.log('Running link checks...')
  verifyProductImages()
  verifyPublicTextures()
  verifyMegaMenuAPIAvailability()
}

run()
