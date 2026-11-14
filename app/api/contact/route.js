import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { siteSettings } from 'lib/siteSettings';

// Simple in-memory rate limiter (per-IP window)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown-ip';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      type = 'quote',
      fullName,
      name,
      companyName,
      email,
      phone,
      volume,
      details,
      notes,
      date,
      time,
      _hp // Honeypot field for spam prevention
    } = body;

    // Spam honeypot detection
    if (_hp) {
      console.warn(`[Anti-Spam] Bot detected via honeypot from IP: ${ip}`);
      // Silently return success to bot without executing email or storage
      return NextResponse.json({ success: true, ref: 'SPAM-BLOCKED' }, { status: 200 });
    }

    const contactName = (fullName || name || '').trim();
    const contactEmail = (email || '').trim().toLowerCase();

    // Validation
    if (!contactName || contactName.length < 2) {
      return NextResponse.json(
        { error: 'Valid contact name is required (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactEmail || !emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const configuredRecipients = Array.isArray(siteSettings.contact_form_recipients) && siteSettings.contact_form_recipients.length > 0
      ? siteSettings.contact_form_recipients
      : [siteSettings.public_email];
    const envRecipients = (process.env.CONTACT_EMAIL || process.env.NOTIFICATION_EMAIL || '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);
    const recipients = Array.from(new Set([...envRecipients, ...configuredRecipients]));
    const recipient = recipients.join(', ');
    const leadTag = siteSettings.lead_tag || 'Web - Unitec';
    const sender = process.env.RESEND_FROM_EMAIL || `${leadTag} <onboarding@resend.dev>`;
    const leadRef = `LEAD-${Date.now().toString(36).toUpperCase()}`;

    let emailSent = false;
    let emailError = null;

    // Forward lead to Escala CRM (if ESCALA_WEBHOOK_URL or ESCALA_API_URL is configured)
    const escalaWebhook = process.env.ESCALA_WEBHOOK_URL || process.env.ESCALA_API_URL;
    let escalaSent = false;
    if (escalaWebhook) {
      try {
        const escalaPayload = {
          contact: {
            first_name: contactName.split(' ')[0] || contactName,
            last_name: contactName.split(' ').slice(1).join(' ') || '',
            email: contactEmail,
            phone: phone || '',
            company: companyName || '',
            tags: [leadTag],
          },
          lead: {
            source: leadTag,
            tag: leadTag,
            type,
            volume: volume || '',
            details: details || notes || '',
            reference: leadRef,
            created_at: new Date().toISOString()
          }
        };

        const escalaRes = await fetch(escalaWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(escalaPayload)
        });
        if (escalaRes.ok) {
          escalaSent = true;
          console.log(`[Escala CRM] Lead forwarded successfully: ${leadRef}`);
        } else {
          console.warn(`[Escala CRM] Response status: ${escalaRes.status}`);
        }
      } catch (escalaErr) {
        console.error('[Escala CRM Forward Error]', escalaErr);
      }
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const subject = type === 'meeting'
          ? `[${leadTag}] [Solicitud de Reunión] ${contactName} - ${date || 'Fecha preferida'} (${leadRef})`
          : `[${leadTag}] Nueva Oportunidad / Cotización - ${companyName || contactName} (${leadRef})`;

        const htmlContent = `
          <div style="margin-bottom: 14px;">
            <span style="display: inline-block; background-color: #132c3f; color: #ffffff; padding: 6px 14px; border-radius: 6px; font-weight: bold; font-size: 13px; letter-spacing: 0.5px;">
              ETIQUETA: ${leadTag}
            </span>
          </div>
          <h2>Nueva Oportunidad Recibida (${leadTag})</h2>
          <p><strong>Etiqueta / Origen:</strong> ${leadTag}</p>
          <p><strong>Referencia:</strong> ${leadRef}</p>
          <p><strong>Tipo:</strong> ${type.toUpperCase()}</p>
          <hr />
          <h3>Datos del Contacto:</h3>
          <ul>
            <li><strong>Nombre:</strong> ${contactName}</li>
            <li><strong>Correo:</strong> ${contactEmail}</li>
            <li><strong>Teléfono / WhatsApp:</strong> ${phone || 'No especificado'}</li>
            <li><strong>Empresa:</strong> ${companyName || 'No especificada'}</li>
          </ul>
          ${type === 'meeting' ? `
            <h3>Preferencias de Reunión:</h3>
            <ul>
              <li><strong>Fecha:</strong> ${date || 'No especificada'}</li>
              <li><strong>Hora:</strong> ${time || 'No especificada'}</li>
              <li><strong>Notas:</strong> ${notes || 'Ninguna'}</li>
            </ul>
          ` : `
            <h3>Detalles del Proyecto y Cotización:</h3>
            <ul>
              <li><strong>Volumen Estimado:</strong> ${volume || 'No especificado'}</li>
              <li><strong>Detalles:</strong> ${details || 'Ninguno'}</li>
            </ul>
          `}
          <hr />
          <p style="font-size: 12px; color: #666;">Enviado desde ${siteSettings.base_url} (${leadTag}) • ${new Date().toISOString()} • IP: ${ip}</p>
        `;

        const { data, error } = await resend.emails.send({
          from: sender,
          to: recipients,
          replyTo: contactEmail,
          subject,
          html: htmlContent,
          headers: {
            'X-Lead-Tag': leadTag,
          },
          tags: [
            { name: 'source', value: 'Web_Unitec' },
          ],
        });

        if (error) {
          console.error('[Resend Error]', error);
          emailError = error.message;
        } else {
          emailSent = true;
          console.log(`[Lead Delivered] Ref: ${leadRef}, To: ${recipient}, MessageId: ${data?.id}`);
        }
      } catch (err) {
        console.error('[Resend Exception]', err);
        emailError = err.message;
      }
    } else {
      console.warn(`[Lead Received] RESEND_API_KEY not configured. Lead Ref: ${leadRef} recorded successfully in server logs.`);
    }

    return NextResponse.json({
      success: true,
      ref: leadRef,
      emailSent,
      recipient: recipient,
      message: 'Lead received successfully. Our commercial engineering team will respond within 24 hours.'
    }, { status: 200 });

  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
