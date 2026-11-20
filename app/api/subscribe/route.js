import { NextResponse } from 'next/server';
import { siteSettings } from '../../../utils/siteSettings';

const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(req) {
  try {
    const ip =
      req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const { email, _hp } = body || {};

    if (_hp) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const cleanEmail = String(email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const leadTag = siteSettings.lead_tag || 'Web - Building Innovation';
    const resendKey = process.env.RESEND_API_KEY;
    let delivered = false;

    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || `${leadTag} <onboarding@resend.dev>`,
          to: siteSettings.contact_form_recipients,
          subject: `[${leadTag}] Nuevo Suscriptor Blog: ${cleanEmail}`,
          html: `<p><strong>ETIQUETA: ${leadTag}</strong></p><p>Nuevo suscriptor mensual del blog: <strong>${cleanEmail}</strong></p>`,
          headers: { 'X-Lead-Tag': leadTag },
          tags: [{ name: 'source', value: 'Web_Building_Innovation' }],
        }),
      });
      delivered = res.ok;
    }

    return NextResponse.json({ success: true, delivered }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to subscribe' }, { status: 500 });
  }
}
