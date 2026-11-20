import { NextResponse } from 'next/server';
import { siteSettings } from '../../../utils/siteSettings';

const rateLimitMap = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req) {
  try {
    const ip =
      req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute and try again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, company, email, phone, country, reason, message, _hp } = body || {};

    if (_hp) {
      return NextResponse.json({ success: true, ref: 'BI-FILTERED' }, { status: 200 });
    }

    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanMessage = String(message || '').trim();

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { error: 'Valid full name is required.' },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Valid email address is required.' },
        { status: 400 }
      );
    }
    if (!cleanMessage || cleanMessage.length < 4) {
      return NextResponse.json(
        { error: 'Please include a short message.' },
        { status: 400 }
      );
    }

    const leadTag = siteSettings.lead_tag || 'Web - Building Innovation';
    const ref = `BI-${Date.now().toString(36).toUpperCase()}`;
    const recipients = siteSettings.contact_form_recipients;
    const cleanReason = String(reason || 'Contacto Web').trim();

    let emailSent = false;
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7e5;border-radius:12px;overflow:hidden;">
          <div style="background:#142d3d;color:#ffffff;padding:20px 24px;">
            <span style="display:inline-block;background:#d68a50;color:#ffffff;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:99px;letter-spacing:0.08em;">
              ETIQUETA: ${escapeHtml(leadTag)}
            </span>
            <h2 style="margin:12px 0 4px;font-size:20px;">Nueva Oportunidad Comercial (${escapeHtml(ref)})</h2>
            <p style="margin:0;color:#d4dce1;font-size:13px;">Motivo: ${escapeHtml(cleanReason)}</p>
          </div>
          <div style="padding:24px;color:#17242e;font-size:14px;line-height:1.6;">
            <p><strong>Nombre:</strong> ${escapeHtml(cleanName)}</p>
            <p><strong>Empresa:</strong> ${escapeHtml(company || 'N/A')}</p>
            <p><strong>Correo:</strong> ${escapeHtml(cleanEmail)}</p>
            <p><strong>Teléfono / WhatsApp:</strong> ${escapeHtml(phone || 'N/A')}</p>
            <p><strong>País:</strong> ${escapeHtml(country || 'N/A')}</p>
            <hr style="border:none;border-top:1px solid #e5e7e5;margin:16px 0;" />
            <p><strong>Mensaje:</strong></p>
            <p style="background:#f4f1eb;padding:12px;border-radius:8px;">${escapeHtml(cleanMessage)}</p>
          </div>
        </div>
      `;

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || `${leadTag} <onboarding@resend.dev>`,
          to: recipients,
          reply_to: cleanEmail,
          subject: `[${leadTag}] ${cleanReason} - ${cleanName} (${ref})`,
          html,
          headers: { 'X-Lead-Tag': leadTag },
          tags: [{ name: 'source', value: 'Web_Building_Innovation' }],
        }),
      });

      emailSent = resendRes.ok;
    }

    return NextResponse.json(
      {
        success: true,
        ref,
        leadTag,
        delivery: emailSent ? 'resend' : 'recorded',
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Unable to process contact request.' },
      { status: 500 }
    );
  }
}
