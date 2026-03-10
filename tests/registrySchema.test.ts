import assert from 'node:assert/strict';
import { normalizeReferralCode } from '../lib/referrals.ts';
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

export function runReferralUtilityTests() {
  assert.equal(normalizeReferralCode(' abc12345 '), 'ABC12345');
  assert.equal(normalizeReferralCode(''), null);
  assert.equal(normalizeReferralCode(undefined), null);
}
