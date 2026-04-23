import { NextResponse } from 'next/server'
import { PDFDocument, StandardFonts } from 'pdf-lib'

// Basic server-side PDF invoice generator
export async function POST(req) {
  try {
    const { cart = [], language = 'es' } = await req.json()

    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595.28, 841.89])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    let y = 800

    page.drawText(language === 'es' ? 'Factura' : 'Invoice', { x: 50, y: y, size: 18, font })
    y -= 24

    let total = 0
    cart.forEach((line, idx) => {
      const price = line.price || 0
      const qty = line.qty || 1
      const lineTotal = price * qty
      total += lineTotal
      page.drawText(`${idx + 1}. ${line.name} - ${qty} x ${price.toFixed(2)} = ${lineTotal.toFixed(2)}`, { x: 50, y: y, size: 12, font })
      y -= 14
    })

    page.drawText(`Total: ${total.toFixed(2)}`, { x: 450, y: y, size: 12, font })
    const pdfBytes = await pdfDoc.save()

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="invoice.pdf"'
      }
    })
  } catch (e) {
    return NextResponse.json({ error: 'Invoice generation failed', detail: String(e) }, { status: 500 })
  }
}
