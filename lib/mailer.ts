import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY || 're_test_key');

const BASE_APP_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://equitty.com').replace(/\/$/, '');

type EmailTemplate = {
  subject: string;
  html: string;
};

type WelcomeEmailOptions = {
  locale: string;
  referralCode: string;
  referredByCode?: string | null;
  email: string;
};

type ReferrerNotificationOptions = {
  locale: string;
  referrerCode: string;
  referrerEmail: string;
  referredEmail: string;
  referredUserCode: string;
};

type ExistingUserReferralCodeEmailOptions = {
  locale: string;
  referralCode: string;
};

function normalizeEmailLocale(locale: string | null | undefined) {
  const normalized = locale?.trim().toLowerCase();

  if (!normalized) {
    return 'en';
  }

  if (normalized === 'es' || normalized.startsWith('es-') || normalized.startsWith('es_')) {
    return 'es';
  }

  return 'en';
}

function getEmailBannerFile(locale: string | null | undefined) {
  return normalizeEmailLocale(locale) === 'es' ? 'welcome-banner.png' : 'welcome-banner-en.png';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildBaseEmail({
  locale,
  subject,
  preheader,
  bannerAlt,
  bodyHtml,
}: {
  locale: string;
  subject: string;
  preheader: string;
  bannerAlt: string;
  bodyHtml: string;
}) {
  const appUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://equitty.com').replace(/\/$/, '');
  const bannerUrl = `${appUrl}/emails/${getEmailBannerFile(locale)}`;

  return `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>${escapeHtml(subject)}</title>
    </head>
    <body style="margin:0;padding:0;background:#0B2D5A;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        ${escapeHtml(preheader)}
      </div>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0B2D5A;">
        <tr>
          <td align="center" style="padding:24px 12px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
              style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">
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
              <tr>
                <td style="padding:22px;font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a;font-size:15px;">
                  ${bodyHtml}
                </td>
              </tr>
            </table>

            <div style="max-width:600px;color:#93a4b8;font-family:Inter,Arial,sans-serif;font-size:11px;line-height:1.4;margin-top:10px;text-align:center;">
              &copy; ${new Date().getFullYear()} Equitty
            </div>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function buildUnsubscribeUrl(locale: string, email?: string) {
  const normalized = normalizeEmailLocale(locale);
  const emailParam = email ? `?email=${encodeURIComponent(email)}` : '';
  return `${BASE_APP_URL}/${normalized}/unsubscribe${emailParam}`;
}

function buildUnsubscribeHtml(locale: string, unsubscribeUrl: string) {
  const normalized = normalizeEmailLocale(locale);
  const isEs = normalized === 'es';
  const message = isEs
    ? 'Si ya no quieres ser parte de la waitlist, cancela tu suscripción'
    : 'If you no longer want to be part of the waitlist, unsubscribe';
  const linkLabel = isEs ? 'aquí' : 'here';
  return `
    <p style="margin:24px 0 0 0;font-size:12px;line-height:1.6;color:#475569;">
      ${message}
      <a href="${escapeHtml(unsubscribeUrl)}" style="color:#2563EB;font-weight:700;text-decoration:none;">
        ${linkLabel}
      </a>.
    </p>
  `;
}

function buildReferralCodeBlock(label: string, code: string) {
  return `
    <div style="margin:20px 0;padding:16px;border-radius:12px;background:#EEF6FF;border:1px solid #BFDBFE;">
      <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#2563EB;font-weight:700;">
        ${escapeHtml(label)}
      </div>
      <div style="margin-top:8px;font-size:28px;line-height:1.1;font-weight:800;color:#0F172A;">
        ${escapeHtml(code)}
      </div>
    </div>
  `;
}

export function buildWelcomeEmail({
  locale,
  referralCode,
  referredByCode,
  email,
}: WelcomeEmailOptions): EmailTemplate {
  const normalizedLocale = normalizeEmailLocale(locale);
  const isEs = normalizedLocale === 'es';

  const subject = isEs
    ? 'Ya estás en la waitlist de Equitty'
    : 'You are now on the Equitty waitlist';

  const preheader = isEs
    ? 'Tu registro fue confirmado y tu código de referido ya está activo.'
    : 'Your registration is confirmed and your referral code is now active.';

  const referralMessage = referredByCode
    ? isEs
      ? `<p style="margin:0 0 12px 0;">Fuiste registrado con el código de referido <strong>${escapeHtml(referredByCode)}</strong>.</p>`
      : `<p style="margin:0 0 12px 0;">You were registered using referral code <strong>${escapeHtml(referredByCode)}</strong>.</p>`
    : '';

  const shareMessage = isEs
    ? 'Ahora tú también puedes invitar a otros futuros inversionistas. Comparte tu código y construye tu propia cadena de referidos.'
    : 'You can now invite other future investors. Share your code and build your own referral chain.';

  const bodyHtml = `
    <p style="margin:0 0 12px 0;">${isEs ? 'Hola,' : 'Hello,'}</p>
    <p style="margin:0 0 12px 0;">
      ${
        isEs
          ? 'Tu registro en la lista de espera de Equitty fue completado con éxito.'
          : 'Your registration on the Equitty waitlist has been completed successfully.'
      }
    </p>
    ${referralMessage}
    <p style="margin:0 0 12px 0;">${shareMessage}</p>
    ${buildReferralCodeBlock(isEs ? 'Tu código de referido' : 'Your referral code', referralCode)}
    <p style="margin:0;">
      ${
        isEs
          ? 'Guárdalo y úsalo cuando invites a alguien a registrarse.'
          : 'Save it and use it whenever you invite someone to register.'
      }
    </p>
  `;

  const unsubscribeUrl = buildUnsubscribeUrl(normalizedLocale, email);
  const bodyWithUnsubscribe = `${bodyHtml}${buildUnsubscribeHtml(normalizedLocale, unsubscribeUrl)}`;

  return {
    subject,
    html: buildBaseEmail({
      locale: normalizedLocale,
      subject,
      preheader,
      bannerAlt: isEs ? 'Equitty | Activos Reales' : 'Equitty | Real-World Assets',
      bodyHtml: bodyWithUnsubscribe,
    }),
  };
}

export function buildReferrerNotificationEmail({
  locale,
  referrerCode,
  referrerEmail,
  referredEmail,
  referredUserCode,
}: ReferrerNotificationOptions): EmailTemplate {
  const normalizedLocale = normalizeEmailLocale(locale);
  const isEs = normalizedLocale === 'es';

  const subject = isEs
    ? 'Tienes un nuevo registro con tu código de referido'
    : 'You have a new signup with your referral code';

  const preheader = isEs
    ? 'Una nueva persona se registró usando tu código.'
    : 'A new person signed up using your code.';

  const bodyHtml = `
    <p style="margin:0 0 12px 0;">${isEs ? 'Hola,' : 'Hello,'}</p>
    <p style="margin:0 0 12px 0;">
      ${
        isEs
          ? `Se registró <strong>${escapeHtml(referredEmail)}</strong> usando tu código de referido <strong>${escapeHtml(referrerCode)}</strong>.`
          : `<strong>${escapeHtml(referredEmail)}</strong> signed up using your referral code <strong>${escapeHtml(referrerCode)}</strong>.`
      }
    </p>
    <p style="margin:0 0 12px 0;">
      ${
        isEs
          ? `Tu código de referido sigue siendo <strong>${escapeHtml(referrerCode)}</strong>.`
          : `Your referral code remains <strong>${escapeHtml(referrerCode)}</strong>.`
      }
    </p>
    <p style="margin:0 0 12px 0;">
      ${
        isEs
          ? 'La nueva persona ya tiene su propio código para seguir ampliando la cadena.'
          : 'The new signup already has their own code to continue growing the chain.'
      }
    </p>
    ${buildReferralCodeBlock(
      isEs ? 'Código asignado a tu referido' : 'Code assigned to your referred user',
      referredUserCode
    )}
  `;

  const unsubscribeUrl = buildUnsubscribeUrl(normalizedLocale, referrerEmail);
  const bodyWithUnsubscribe = `${bodyHtml}${buildUnsubscribeHtml(normalizedLocale, unsubscribeUrl)}`;

  return {
    subject,
    html: buildBaseEmail({
      locale: normalizedLocale,
      subject,
      preheader,
      bannerAlt: isEs ? 'Equitty | Activos Reales' : 'Equitty | Real-World Assets',
      bodyHtml: bodyWithUnsubscribe,
    }),
  };
}

export function buildExistingUserReferralCodeEmail({
  locale,
  referralCode,
}: ExistingUserReferralCodeEmailOptions): EmailTemplate {
  const normalizedLocale = normalizeEmailLocale(locale);
  const isEs = normalizedLocale === 'es';

  const subject = isEs
    ? 'Tu código de referido de Equitty ya está listo'
    : 'Your Equitty referral code is ready';

  const preheader = isEs
    ? 'Ya puedes compartir tu código de referido con otros futuros inversionistas.'
    : 'You can now share your referral code with other future investors.';

  const bodyHtml = `
    <p style="margin:0 0 12px 0;">${isEs ? 'Hola,' : 'Hello,'}</p>
    <p style="margin:0 0 12px 0;">
      ${
        isEs
          ? 'Ya activamos tu código de referido para tu registro existente en la waitlist de Equitty.'
          : 'We have now activated a referral code for your existing Equitty waitlist registration.'
      }
    </p>
    <p style="margin:0 0 12px 0;">
      ${isEs ? 'Tu código de referido es:' : 'Your referral code is:'}
    </p>
    ${buildReferralCodeBlock(isEs ? 'Tu código de referido' : 'Your referral code', referralCode)}
    <p style="margin:0;">
      ${
        isEs
          ? 'Compártelo cuando invites a otra persona a registrarse.'
          : 'Share it whenever you invite someone else to sign up.'
      }
    </p>
  `;

  const unsubscribeUrl = buildUnsubscribeUrl(normalizedLocale);
  const bodyWithUnsubscribe = `${bodyHtml}${buildUnsubscribeHtml(normalizedLocale, unsubscribeUrl)}`;

  return {
    subject,
    html: buildBaseEmail({
      locale: normalizedLocale,
      subject,
      preheader,
      bannerAlt: isEs ? 'Equitty | Activos Reales' : 'Equitty | Real-World Assets',
      bodyHtml: bodyWithUnsubscribe,
    }),
  };
}

export { getEmailBannerFile, normalizeEmailLocale };
