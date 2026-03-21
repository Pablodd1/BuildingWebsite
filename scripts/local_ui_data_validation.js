const fs = require('fs')
const path = require('path')

function loadData() {
  const p = path.resolve(__dirname, '..', 'static_data', 'products_full.json')
  if (!fs.existsSync(p)) return []
  const raw = fs.readFileSync(p, 'utf8')
  try { return JSON.parse(raw) } catch { return [] }
}

function fileExists(p) {
  try { return fs.existsSync(p) && fs.statSync(p).isFile() } catch { return false }
}

function main() {
  const data = loadData()
  const interior = [
    'CIELO RASO PVC','ILUMINACION','JARDINES ARTIFICIALES','LAMINAS','LISTONES','PANELES WPC Y ANGULOS','PAREDES','CINTAS','PEGANTES','PISOS','ZOCALOS'
  ]
  const exterior = [
    'CUBIERTAS UPVC','JARDINES ARTIFICIALES','PAREDES','LISTONES','PANELES WPC Y ANGULOS','PISOS'
  ]
  console.log('Interior category checks:')
  interior.forEach(cat => {
    const items = data.filter(d => d.category === cat)
    console.log(`- ${cat}: ${items.length} items`)
    items.forEach(it => {
      const img = it.image ? it.image.replace(/^\//, '') : null
      if (img) {
        const imgPath = path.resolve('BIwebsite', 'public', img.startsWith('/') ? img.substring(1) : img)
        if (!fileExists(imgPath)) {
          console.warn(`  Missing image for ${it.id}: ${imgPath}`)
        }
      }
    })
  })
  console.log('\nExterior category checks:')
  exterior.forEach(cat => {
    const items = data.filter(d => d.category === cat)
    console.log(`- ${cat}: ${items.length} items`)
  })
}

main()
