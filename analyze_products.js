const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'static_data', 'products_full.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const structure = {};

products.forEach(p => {
    const col = p.collection || 'UNKNOWN';
    const cat = p.category || 'UNKNOWN';
    const sub = p.subcategory || 'UNKNOWN';

    if (!structure[col]) structure[col] = {};
    if (!structure[col][cat]) structure[col][cat] = new Set();
    structure[col][cat].add(sub);
});

const result = {};
for (const col in structure) {
    result[col] = {};
    for (const cat in structure[col]) {
        result[col][cat] = Array.from(structure[col][cat]).sort();
    }
}

console.log(JSON.stringify(result, null, 2));
