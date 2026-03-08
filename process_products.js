const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const sharp = require('sharp');
const path = require('path');

const csvFilePath = path.join(__dirname, 'ALL products data base JASMEL.xlsx - Sheet1.csv');
const jsonFilePath = path.join(__dirname, 'static_data', 'products_full.json');
const imagesDir = path.join(__dirname, 'public', 'raster', 'products');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Helper to parse Spanish numbers (e.g. 11,811 -> 11.811)
function parseNumber(str) {
    if (!str) return 0;
    // Remove $ and spaces
    str = str.toString().replace(/\$/g, '').trim();
    // Replace commas with dots
    str = str.replace(/,/g, '.');
    return parseFloat(str) || 0;
}

// Helper to extract Google Drive file ID
function getDriveFileId(url) {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}

async function downloadAndConvertImage(fileId, filename) {
    if (!fileId) return;
    const targetPath = path.join(imagesDir, filename);
    
    // Check if already exists to avoid re-downloading
    if (fs.existsSync(targetPath)) {
        console.log(`Image already exists: ${filename}`);
        return;
    }

    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    try {
        const response = await axios({
            url: downloadUrl,
            method: 'GET',
            responseType: 'arraybuffer'
        });

        // Convert to webp
        await sharp(response.data)
            .webp({ quality: 80 })
            .toFile(targetPath);
        
        console.log(`Successfully downloaded and converted: ${filename}`);
    } catch (error) {
        console.error(`Failed to download image ${filename} (ID: ${fileId}):`, error.message);
    }
}

async function processData() {
    const products = [];
    
    // Load existing products if any
    let existingProducts = [];
    if (fs.existsSync(jsonFilePath)) {
        existingProducts = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    }

    const rows = [];
    
    // First, let's read the CSV file
    // Wait, the CSV has 2 lines of headers. We need to skip the first line.
    // The first line is `,,,,,,UNIDAD DE EMPAQUE,,PESO POR UNIDAD,,MEDIDAS LATAM,,,MEDIDAS USA,,,,,,`
    // We should probably read it manually and remove line 1.
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    const lines = fileContent.split('\n');
    const cleanContent = lines.slice(1).join('\n'); // skip first line

    // Create a temporary file to parse
    const tempCsvPath = path.join(__dirname, 'temp_products.csv');
    fs.writeFileSync(tempCsvPath, cleanContent);

    fs.createReadStream(tempCsvPath)
        .pipe(csv())
        .on('data', (row) => {
            if (!row.RefCode) return;
            rows.push(row);
        })
        .on('end', async () => {
            fs.unlinkSync(tempCsvPath);
            console.log(`Parsed ${rows.length} rows from CSV`);

            for (const row of rows) {
                const id = row.RefCode.trim();
                const name = row.Name ? row.Name.trim() : '';
                
                // Parse numbers safely
                const price = parseNumber(row.Price);
                
                const metricWidth = parseNumber(row['Ancho(cm)']);
                const metricLength = parseNumber(row['Largo (cm)']);
                const metricThickness = parseNumber(row['Espesor(mm)']);
                
                const imperialWidth = parseNumber(row['Width(in)']);
                const imperialLength = parseNumber(row['Length(ft)']);
                const imperialThickness = parseNumber(row['Thickness(in)']);

                // Only add products that have valid IDs
                if (!id) continue;

                const product = {
                    id: id,
                    name: name,
                    basePrice: price,
                    description: row.Description ? row.Description.trim() : '',
                    category: row.Category ? row.Category.trim() : '',
                    subcategory: row.Subcategory ? row.Subcategory.trim() : '',
                    collection: row.Collection ? row.Collection.trim() : '',
                    unit: row.Unit ? row.Unit.trim() : 'Unit',
                    itemsPerBox: parseNumber(row.ItemsPerBox) || 1,
                    dimensions: {
                        metric: {
                            width: metricWidth,
                            length: metricLength,
                            thickness: metricThickness,
                            widthUnit: 'cm',
                            lengthUnit: 'cm',
                            thicknessUnit: 'mm'
                        },
                        imperial: {
                            width: imperialWidth,
                            length: imperialLength,
                            thickness: imperialThickness,
                            widthUnit: 'in',
                            lengthUnit: 'ft',
                            thicknessUnit: 'in'
                        }
                    },
                    image: `/raster/products/${id}.webp`,
                    usage: row.Usage ? row.Usage.trim() : '',
                    promptModifier: row.PromptModifier ? row.PromptModifier.trim() : ''
                };

                // Check if product exists to merge
                const existingIndex = existingProducts.findIndex(p => p.id === id);
                if (existingIndex >= 0) {
                    existingProducts[existingIndex] = product;
                } else {
                    existingProducts.push(product);
                }

                // Save updated JSON before downloading image to ensure data is updated
                fs.writeFileSync(jsonFilePath, JSON.stringify(existingProducts, null, 2));

                // Download image if URL exists
                const fileId = getDriveFileId(row.ImageURL);
                if (fileId) {
                    await downloadAndConvertImage(fileId, `${id}.webp`);
                }
            }

            console.log(`Finished processing. Saved ${existingProducts.length} products to static_data/products_full.json`);
        });
}

processData().catch(console.error);
