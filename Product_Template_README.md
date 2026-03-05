# Product Template Instructions

## CSV Template Created: product_template.csv

Open this file in Excel and fill in your products.

## Required Columns

| Column | Description | Example |
|--------|-------------|---------|
| id | Unique product ID | 14121301 |
| name | Product name (Spanish) | ADHESIVO DE PARED EN ROLLO GRIS |
| basePrice | Price per unit | 68690 |
| category | Main category | PAREDES, PISOS, FACHADAS, etc. |
| subcategory | Sub category | ROLLO MARMOL, DECK, etc. |
| collection | Collection name | INTERIOR, EXTERIOR |
| unit | Unit type | Unit |
| itemsPerBox | Units per box | 1 |
| width_cm | Width in centimeters | 60 |
| length_cm | Length in centimeters | 300 |
| thickness_mm | Thickness in millimeters | 0.08 |
| width_in | Width in inches (auto-calculated) | 23.62 |
| length_in | Length in inches (auto-calculated) | 9.84 |
| thickness_in | Thickness in inches (auto-calculated) | 0.003 |
| imageName | Image filename (must exist in public/raster/products/) | 14121301.webp |
| description | Product description in Spanish | ... |

## Image Requirements

- Format: WebP (.webp)
- Location: `public/raster/products/`
- Filename must match imageName column exactly

## After Filling

1. Save as CSV or Excel
2. Send me the file
3. I'll convert to JSON and update the database

## Current Categories in Database

- PAREDES (Walls)
- PISOS (Floors)
- FACHADAS (Facades)
- CUBIERTAS (Roofing)
- ZOCALOS (Baseboards)
- PANELES WPC
- JARDINES ARTIFICIALES
