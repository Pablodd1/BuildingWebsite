import { Resend } from 'resend';
import { siteSettings } from 'lib/siteSettings';

export async function POST(request) {
    const resend = new Resend(process.env.RESEND_API_KEY || 'no-key-provided');
    try {
        const { email, brand } = await request.json();

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const recipients = Array.isArray(siteSettings.contact_form_recipients) && siteSettings.contact_form_recipients.length > 0
            ? siteSettings.contact_form_recipients
            : [siteSettings.public_email];
        const leadTag = siteSettings.lead_tag || 'Web - Unitec';

        const { data, error } = await resend.emails.send({
            from: `${leadTag} <onboarding@resend.dev>`,
            to: recipients,
            subject: `[${leadTag}] Nuevo Suscriptor: ${email}`,
            html: `
              <div style="margin-bottom: 12px;">
                <span style="display: inline-block; background-color: #132c3f; color: #ffffff; padding: 5px 12px; border-radius: 6px; font-weight: bold; font-size: 12px;">
                  ETIQUETA: ${leadTag}
                </span>
              </div>
              <p><strong>Etiqueta / Origen:</strong> ${leadTag}</p>
              <p>Nuevo suscriptor registrado en <strong>${brand || siteSettings.brand_name}</strong>: ${email}</p>
            `,
            headers: {
                'X-Lead-Tag': leadTag,
            },
            tags: [
                { name: 'source', value: 'Web_Unitec' },
            ],
        });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
