import assert from 'node:assert/strict';
import type { PrismaClient } from '../app/generated/prisma/client';
import { processUnsubscribeWithClient } from '../lib/unsubscribe.ts';

type WaitlistRecord = {
  email: string;
  status: 'subscribed' | 'unsubscribed';
};

function createPrismaStub(
  record: WaitlistRecord | null,
  options?: { throwOnFind?: boolean; throwOnUpdate?: boolean }
): PrismaClient {
  const waitlistSignup = {
    findUnique: async () => {
      if (options?.throwOnFind) {
        throw new Error('database failure');
      }
      return record;
    },
    update: async () => {
      if (options?.throwOnUpdate) {
        throw new Error('update failure');
      }
      return record ? { ...record, status: 'unsubscribed' } : null;
    },
  };

  return { waitlistSignup } as unknown as PrismaClient;
}

export async function runUnsubscribeTests() {
  const successResult = await processUnsubscribeWithClient(
    'member@example.com',
    createPrismaStub({ email: 'member@example.com', status: 'subscribed' })
  );
  assert.equal(successResult.success, true, 'marks subscribed users as unsubscribed');

  const missingResult = await processUnsubscribeWithClient(
    'missing@example.com',
    createPrismaStub(null)
  );
  assert.equal(missingResult.success, false, 'fails when email is missing');
  assert.equal(missingResult.error?.type, 'email');

  const alreadyResult = await processUnsubscribeWithClient(
    'member@example.com',
    createPrismaStub({ email: 'member@example.com', status: 'unsubscribed' })
  );
  assert.equal(alreadyResult.success, false, 'rejects already unsubscribed emails');
  assert.equal(alreadyResult.error?.type, 'email');

  const invalidEmail = await processUnsubscribeWithClient('invalid-email', createPrismaStub(null));
  assert.equal(invalidEmail.success, false, 'validates email format');
  assert.equal(invalidEmail.error?.type, 'server');

  const dbError = await processUnsubscribeWithClient(
    'error@example.com',
    createPrismaStub({ email: 'error@example.com', status: 'subscribed' }, { throwOnFind: true })
  );
  assert.equal(dbError.success, false, 'returns server error on database failure');
  assert.equal(dbError.error?.type, 'server');
}
