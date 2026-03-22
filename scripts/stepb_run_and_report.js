const fs = require('fs')
const path = require('path')

function loadData() {
  const p = path.resolve(__dirname, '..', 'static_data', 'products_full.json')
  if (!fs.existsSync(p)) {
    console.error('data file not found', p)
    return []
  }
  const raw = fs.readFileSync(p, 'utf8')
  try {
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch (e) {
    console.error('invalid JSON in products_full.json')
    return []
  }
}

function countsByCategories(data, categories) {
  const map = {}
  categories.forEach((c) => (map[c] = 0))
  data.forEach((r) => {
    if (r.category && map.hasOwnProperty(r.category)) map[r.category]++
  })
  return map
}

function sampleItemsForCategory(data, category, max=3) {
  return data.filter((r) => r.category === category).slice(0, max).map((r) => ({ id: r.id, name: r.name, image: r.image, subcategory: r.subcategory, collection: r.collection }))
}

function main() {
  const data = loadData()
  const interior = [
    'CIELO RASO PVC','ILUMINACION','JARDINES ARTIFICIALES','LAMINAS','LISTONES','PANELES WPC Y ANGULOS','PAREDES','CINTAS','PEGANTES','PISOS','ZOCALOS'
  ]
  const exterior = [
    'CUBIERTAS UPVC','JARDINES ARTIFICIALES','PAREDES','LISTONES','PANELES WPC Y ANGULOS','PISOS'
  ]

  const interiorCounts = countsByCategories(data, interior)
  const exteriorCounts = countsByCategories(data, exterior)

  let out = []
  out.push('STEP B: Deep internal/test report against static data')
  out.push('\nInterior counts:')
  interior.forEach(c => {
    out.push(`- ${c}: ${interiorCounts[c] || 0} items`)
  })
  out.push('\nExterior counts:')
  exterior.forEach(c => {
    out.push(`- ${c}: ${exteriorCounts[c] || 0} items`)
  })

  out.push('\nSample items (interior):')
  interior.forEach((c) => {
    const s = sampleItemsForCategory(data, c, 2)
    out.push(`- ${c}:`)
    s.forEach(it => out.push(`  - ${it.id} | ${it.name} [${it.image}] (${it.subcategory})`))
  })

  out.push('\nSample items (exterior):')
  exterior.forEach((c) => {
    const s = sampleItemsForCategory(data, c, 2)
    out.push(`- ${c}:`)
    s.forEach(it => out.push(`  - ${it.id} | ${it.name} [${it.image}] (${it.subcategory})`))
  })

  // Write to a report file for persistence
  const reportPath = path.resolve(__dirname, '..', 'reports', 'stepb_megamenu_report.txt')
  fs.writeFileSync(reportPath, out.join('\n'))
  console.log(`Wrote step B report to ${reportPath}`)
  console.log(out.join('\n'))
}

main()
