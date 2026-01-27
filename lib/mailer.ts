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

  // Preheader oculto (para que aparezca en el preview del inbox)
  const preheaderHtml = `
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>
  `;

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

      <!-- Referral block (pendiente) -->
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        Si quieres que más personas se sumen a la lista de espera, comparte tu código personal:
        Tu enlace: {{referral_link}}
      </div>
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

      <!-- Referral block (pending) -->
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        If you’d like more people to join the waitlist, share your personal code:
        Your link: {{referral_link}}
      </div>
    `;

  const footerHtml = isEs
    ? `
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;color:#64748B;font-size:12px;line-height:1.4;">
        <div>Unirte a la lista no es una oferta de inversión. Invertir implica riesgo.</div>

        <!-- Unsubscribe (pendiente) -->
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
          Cancelar suscripción: {{unsubscribe_link}}
        </div>
      </div>
    `
    : `
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;color:#64748B;font-size:12px;line-height:1.4;">
        <div>Joining the waitlist is not an investment offer. Investing involves risk.</div>

        <!-- Unsubscribe (pending) -->
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
          Unsubscribe: {{unsubscribe_link}}
        </div>
      </div>
    `;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a;background:#ffffff;padding:24px;">
      ${preheaderHtml}
      ${bodyHtml}
      ${footerHtml}
    </div>
  `;

  return { subject, preheader, html };
}
