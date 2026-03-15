import type { PrismaClient } from '../app/generated/prisma/client';
import z from 'zod';

const unsubscribeSchema = z.object({
  email: z.string().email(),
});

export type errorType = 'server' | 'email' | 'referral';
export type unsubscribeResult =
  | { success: true }
  | { success: false; error?: { type: errorType; message?: string } };

export async function processUnsubscribeWithClient(
  email: string,
  client: PrismaClient
): Promise<unsubscribeResult> {
  const parsed = unsubscribeSchema.safeParse({ email });

  if (!parsed.success) {
    return {
      success: false,
      error: {
        type: 'server',
        message: z.prettifyError(parsed.error),
      },
    };
  }

  try {
    const signup = await client.waitlistSignup.findUnique({
      where: { email: parsed.data.email },
    });

    if (!signup || signup.status === 'unsubscribed') {
      return {
        success: false,
        error: {
          type: 'email',
          message: 'Email not found in waitlist or already unsubscribed.',
        },
      };
    }

    await client.waitlistSignup.update({
      where: { email: parsed.data.email },
      data: { status: 'unsubscribed' },
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: {
        type: 'server',
        message: 'Unable to process the unsubscribe request at the moment.',
      },
    };
  }
}
