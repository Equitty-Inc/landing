import { randomBytes } from 'node:crypto';

const REFERRAL_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const REFERRAL_CODE_LENGTH = 8;

export function normalizeReferralCode(value: string | null | undefined) {
  const normalized = value?.trim().toUpperCase();
  return normalized ? normalized : null;
}

function createReferralCode() {
  const bytes = randomBytes(REFERRAL_CODE_LENGTH);
  let code = '';

  for (let index = 0; index < REFERRAL_CODE_LENGTH; index += 1) {
    code += REFERRAL_ALPHABET[bytes[index] % REFERRAL_ALPHABET.length];
  }

  return code;
}

export async function generateUniqueReferralCode(
  exists: (code: string) => Promise<boolean>
) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const candidate = createReferralCode();
    if (!(await exists(candidate))) {
      return candidate;
    }
  }

  throw new Error('Unable to generate a unique referral code.');
}
