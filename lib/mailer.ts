// lib/mailer.ts
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

type WelcomeEmailResult = {
  subject: string;
  preheader: string;
  html: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function buildWelcomeEmail(locale: string): WelcomeEmailResult {
  const isEs = locale === 'es';

  const subject = isEs
    ? 'Bienvenido(a) a la nueva era de inversión en LATAM⚡️ Equitty'
    : 'Welcome to the new era of investing in LATAM ⚡️ Equitty';

  const preheader = isEs
    ? 'Ya estás dentro: el futuro de invertir en LATAM empieza contigo'
    : 'You’re in: the future of investing in LATAM starts with you';

  const preheaderHtml = `
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>
  `;

  // ✅ Base URL pública (ponla en Vercel como NEXT_PUBLIC_APP_URL)
  const appUrl =
    (process.env.NEXT_PUBLIC_APP_URL || 'https://equitty.com').replace(/\/$/, '');

  // ✅ Banner por idioma (archivos en /public/emails/)
  const bannerFile = isEs ? 'welcome-banner.png' : 'welcome-banner-en.png';
  const bannerUrl = `${appUrl}/emails/${bannerFile}`;

  const bannerAlt = isEs
    ? 'Equitty | Activos Reales'
    : 'Equitty | Real-World Assets';

  const bodyHtml = isEs
    ? `
      <p style="margin:0 0 12px 0;">Hola,</p>

      <p style="margin:0 0 12px 0;">
        Ya eres parte de la nueva generación que está cambiando la forma de invertir en Latinoamérica.
      </p>

      <p style="margin:0 0 12px 0;">
        Llegaste para abrir puertas: para ti y para quienes te rodean.
      </p>

      <p style="margin:0 0 12px 0;">
        En Equitty creemos que las oportunidades no deberían ser exclusivas. Por eso estamos construyendo una forma más simple y accesible de invertir en nuestra región.
      </p>

      <p style="margin:0 0 0 0;">
        Lo que viene para LATAM empieza aquí. Y empieza contigo.
      </p>
    `
    : `
      <p style="margin:0 0 12px 0;">Hello,</p>

      <p style="margin:0 0 12px 0;">
        You’re now part of the new generation that’s changing the way people invest in Latin America.
      </p>

      <p style="margin:0 0 12px 0;">
        You arrived to open doors—for yourself and for those around you.
      </p>

      <p style="margin:0 0 12px 0;">
        At Equitty, we believe opportunities shouldn’t be exclusive. That’s why we’re building a simpler, more accessible way to invest in our region.
      </p>

      <p style="margin:0 0 0 0;">
        What’s coming for LATAM starts here. And it starts with you.
      </p>
    `;

  const footerHtml = isEs
    ? `
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;color:#64748B;font-size:12px;line-height:1.4;">
        <div>Unirte a la lista no es una oferta de inversión. Invertir implica riesgo.</div>
      </div>
    `
    : `
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;color:#64748B;font-size:12px;line-height:1.4;">
        <div>Joining the waitlist is not an investment offer. Investing involves risk.</div>
      </div>
    `;

  // ✅ Layout tipo “captura”: fondo, card centrada, banner arriba
  // ✅ Botón oculto por ahora (removido)
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>${escapeHtml(subject)}</title>
    </head>
    <body style="margin:0;padding:0;background:#0B2D5A;">
      ${preheaderHtml}

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0B2D5A;">
        <tr>
          <td align="center" style="padding:24px 12px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
              style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">
              
              <!-- ✅ Banner -->
              <tr>
                <td style="padding:0;margin:0;">
                  <img
                    src="${bannerUrl}"
                    alt="${escapeHtml(bannerAlt)}"
                    width="600"
                    style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;"
                  />
                </td>
              </tr>

              <!-- ✅ Content -->
              <tr>
                <td style="padding:22px 22px 18px 22px;font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a;font-size:15px;">
                  ${bodyHtml}
                  ${footerHtml}
                </td>
              </tr>

            </table>

            <div style="max-width:600px;color:#93a4b8;font-family:Inter,Arial,sans-serif;font-size:11px;line-height:1.4;margin-top:10px;text-align:center;">
              © ${new Date().getFullYear()} Equitty
            </div>

          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  return { subject, preheader, html };
}
