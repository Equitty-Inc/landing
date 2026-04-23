import assert from 'node:assert/strict';
import {
  buildExistingUserReferralCodeEmail,
  buildReferrerNotificationEmail,
  buildWelcomeEmail,
  getEmailBannerFile,
  normalizeEmailLocale,
} from '../lib/mailer.ts';
import { normalizeReferralCode } from '../lib/referrals.ts';
import { createNewsletterSchema } from '../schemas/newsletterSchema.ts';
import { createRegistrySchema } from '../schemas/registrySchema.ts';

const t = (key: string) =>
  (
    {
      emailInvalid: 'Invalid email',
      nationalityRequired: 'Nationality is required',
      referralCodeRequired: 'Referral code is required',
      referralCodeInvalid: 'Referral code format is invalid',
    } as const
  )[key] ?? key;

export function runRegistrySchemaTests() {
  const schema = createRegistrySchema(t);

  const validPayload = schema.safeParse({
    email: 'person@example.com',
    nationality: 'SV',
    wasReferred: false,
    referralCode: '',
  });
  assert.equal(validPayload.success, true, 'accepts valid payloads without referral');

  const referredPayload = schema.safeParse({
    email: 'person@example.com',
    nationality: 'SV',
    wasReferred: true,
    referralCode: 'abc12345',
  });
  assert.equal(referredPayload.success, true, 'accepts valid payloads with referral');
  assert.equal(referredPayload.data?.referralCode, 'abc12345');

  const invalidEmail = schema.safeParse({
    email: 'invalid-email',
    nationality: 'SV',
    wasReferred: false,
    referralCode: '',
  });
  assert.equal(invalidEmail.success, false, 'rejects malformed emails');
  assert.equal(invalidEmail.error?.issues[0]?.message, 'Invalid email');

  const missingNationality = schema.safeParse({
    email: 'person@example.com',
    nationality: '',
    wasReferred: false,
    referralCode: '',
  });
  assert.equal(missingNationality.success, false, 'requires nationality');
  assert.equal(missingNationality.error?.issues[0]?.message, 'Nationality is required');

  const missingReferralCode = schema.safeParse({
    email: 'person@example.com',
    nationality: 'SV',
    wasReferred: true,
    referralCode: '',
  });
  assert.equal(missingReferralCode.success, false, 'requires referral code when checkbox is enabled');
  assert.equal(missingReferralCode.error?.issues[0]?.message, 'Referral code is required');

  const invalidReferralCode = schema.safeParse({
    email: 'person@example.com',
    nationality: 'SV',
    wasReferred: true,
    referralCode: '###',
  });
  assert.equal(invalidReferralCode.success, false, 'rejects malformed referral codes');
  assert.equal(invalidReferralCode.error?.issues[0]?.message, 'Referral code format is invalid');
}

export function runNewsletterSchemaTests() {
  const newsletterSchema = createNewsletterSchema((key) =>
    (
      {
        firstNameRequired: 'First name is required.',
        emailRequired: 'Email address is required.',
        emailInvalid: 'Invalid email.',
        interestRequired: 'Select at least one interest.',
      } as const
    )[key] ?? key
  );

  const validPayload = newsletterSchema.safeParse({
    firstName: 'Alice',
    email: 'alice@example.com',
    interests: ['futureInvestor', 'industryObserver'],
  });
  assert.equal(validPayload.success, true, 'accepts valid newsletter payload');

  const invalidEmail = newsletterSchema.safeParse({
    firstName: 'Alice',
    email: 'bad-email',
    interests: ['futureInvestor'],
  });
  assert.equal(invalidEmail.success, false, 'rejects invalid newsletter email');
  assert.equal(invalidEmail.error?.issues[0]?.message, 'Invalid email.');

  const missingInterests = newsletterSchema.safeParse({
    firstName: 'Alice',
    email: 'alice@example.com',
    interests: [],
  });
  assert.equal(missingInterests.success, false, 'requires at least one interest');
  assert.equal(missingInterests.error?.issues[0]?.message, 'Select at least one interest.');
}

export function runReferralUtilityTests() {
  assert.equal(normalizeReferralCode(' abc12345 '), 'ABC12345');
  assert.equal(normalizeReferralCode(''), null);
  assert.equal(normalizeReferralCode(undefined), null);
}

export function runMailerLocaleTests() {
  assert.equal(normalizeEmailLocale('es'), 'es');
  assert.equal(normalizeEmailLocale('es-SV'), 'es');
  assert.equal(normalizeEmailLocale('es_SV'), 'es');
  assert.equal(normalizeEmailLocale('en'), 'en');
  assert.equal(normalizeEmailLocale('en-US'), 'en');
  assert.equal(normalizeEmailLocale(undefined), 'en');

  assert.equal(getEmailBannerFile('es'), 'welcome-banner.png');
  assert.equal(getEmailBannerFile('es-SV'), 'welcome-banner.png');
  assert.equal(getEmailBannerFile('en'), 'welcome-banner-en.png');
  assert.equal(getEmailBannerFile('en-US'), 'welcome-banner-en.png');

  const englishWelcome = buildWelcomeEmail({
    locale: 'en-US',
    referralCode: 'ABC12345',
    referredByCode: 'ZXCV6789',
    email: 'welcome@example.com',
  });
  assert.match(englishWelcome.subject, /You are now on the Equitty waitlist/);
  assert.match(englishWelcome.html, /welcome-banner-en\.png/);
  assert.match(englishWelcome.html, /You were registered using referral code/);

  const spanishWelcome = buildWelcomeEmail({
    locale: 'es-SV',
    referralCode: 'ABC12345',
    referredByCode: 'ZXCV6789',
    email: 'hola@example.com',
  });
  assert.match(spanishWelcome.subject, /Ya estás en la waitlist de Equitty/);
  assert.match(spanishWelcome.html, /welcome-banner\.png/);
  assert.match(spanishWelcome.html, /Fuiste registrado con el código de referido/);

  const englishReferrer = buildReferrerNotificationEmail({
    locale: 'en-US',
    referrerCode: 'REF12345',
    referrerEmail: 'referrer@example.com',
    referredEmail: 'newuser@example.com',
    referredUserCode: 'NEW54321',
  });
  assert.match(englishReferrer.subject, /You have a new signup with your referral code/);
  assert.match(englishReferrer.html, /welcome-banner-en\.png/);
  assert.match(englishReferrer.html, /Your referral code remains <strong>REF12345<\/strong>/);
  assert.match(englishReferrer.html, /Code assigned to your referred user/);

  const spanishExistingUser = buildExistingUserReferralCodeEmail({
    locale: 'es-GT',
    referralCode: 'LEGACY123',
  });
  assert.match(spanishExistingUser.subject, /Tu código de referido de Equitty ya está listo/);
  assert.match(spanishExistingUser.html, /welcome-banner\.png/);
}
