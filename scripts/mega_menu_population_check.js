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

function countByCategory(data, category) {
  return data.filter((r) => r.category === category).length
}

function main() {
  const data = loadData()
  const interiorCategories = [
    'PAREDES','CUBIERTAS UPVC','LISTONES','JARDINES ARTIFICIALES','ILUMINACION','CIELO RASO PVC'
  ]
  console.log('Interior categories counts:')
  interiorCategories.forEach((c) => {
    const count = countByCategory(data, c)
    console.log(`  ${c}: ${count}`)
  })

  // Exterior categories that usually have items
  const exteriorCategories = [
    'PAREDES','CUBIERTAS UPVC','LISTONES','JARDINES ARTIFICIALES','PISOS'
  ]
  console.log('\nExterior categories counts:')
  exteriorCategories.forEach((c) => {
    const count = countByCategory(data, c)
    console.log(`  ${c}: ${count}`)
  })
}

main()
