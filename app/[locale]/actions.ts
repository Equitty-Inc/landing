'use server';

import { revalidatePath } from 'next/cache.js';
import { getTranslations } from 'next-intl/server';
import z from 'zod';
import { resend, buildReferrerNotificationEmail, buildWelcomeEmail } from '@/lib/mailer';
import prisma from '@/lib/prisma';
import { processUnsubscribeWithClient, type errorType, type unsubscribeResult } from '@/lib/unsubscribe';
import { generateUniqueReferralCode, normalizeReferralCode } from '@/lib/referrals';
import { createRegistrySchema, registryForm } from '@/schemas/registrySchema';

export type { errorType } from '@/lib/unsubscribe';

export type addEmailResult =
  | { success: true }
  | { success: false; error?: { type: errorType; message?: string } };

export async function addEmailToWaitlist(
  data: registryForm,
  locale: string
): Promise<addEmailResult> {
  const t = await getTranslations('HomePage.Form.Validation');
  const parsed = createRegistrySchema(t).safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        type: 'server',
        message: z.prettifyError(parsed.error),
      },
    };
  }

  const { email, nationality, wasReferred } = parsed.data;
  const referredByCode = wasReferred ? normalizeReferralCode(parsed.data.referralCode) : null;

  try {
    const existingSignup = await prisma.waitlistSignup.findUnique({
      where: { email },
    });

    if (existingSignup) {
      return {
        success: false,
        error: {
          type: 'email',
        },
      };
    }

    const referredBy = referredByCode
      ? await prisma.waitlistSignup.findUnique({
          where: { referralCode: referredByCode },
        })
      : null;

    if (referredByCode && !referredBy) {
      return {
        success: false,
        error: {
          type: 'referral',
        },
      };
    }

    const referralCode = await generateUniqueReferralCode(async (candidate) => {
      const match = await prisma.waitlistSignup.findUnique({
        where: { referralCode: candidate },
        select: { id: true },
      });

      return Boolean(match);
    });

    const signup = await prisma.waitlistSignup.create({
      data: {
        email,
        nationality,
        locale,
        referralCode,
        referredById: referredBy?.id ?? null,
        createdAt: new Date(),
        status: 'subscribed',
        utmSource: null,
        utmMedium: null,
        utmCampaign: null,
        utmContent: null,
        utmTerm: null,
        referrer: null,
        landingPath: null,
        ipHash: null,
        userAgent: null,
        consentVersion: null,
      },
    });

    const from = process.env.EMAIL_FROM;
    if (!from) {
      console.warn('EMAIL_FROM is missing');
    } else {
      const welcomeEmail = buildWelcomeEmail({
        locale,
        referralCode: signup.referralCode,
        referredByCode,
        email,
      });

      const welcomeResponse = await resend.emails.send({
        from,
        to: email,
        subject: welcomeEmail.subject,
        html: welcomeEmail.html,
      });

      if (welcomeResponse.error) {
        console.error('RESEND WELCOME ERROR:', welcomeResponse.error);
      }

      if (referredBy) {
        const referrerEmail = buildReferrerNotificationEmail({
          locale: referredBy.locale,
          referrerCode: referredBy.referralCode,
          referrerEmail: referredBy.email,
          referredEmail: signup.email,
          referredUserCode: signup.referralCode,
        });

        const referrerResponse = await resend.emails.send({
          from,
          to: referredBy.email,
          subject: referrerEmail.subject,
          html: referrerEmail.html,
        });

        if (referrerResponse.error) {
          console.error('RESEND REFERRER ERROR:', referrerResponse.error);
        }
      }
    }

    revalidatePath(`/${locale}`);
    return { success: true };
  } catch {
    return {
      success: false,
      error: {
        type: 'server',
        message: 'Something went wrong while saving your email. Please try again later.',
      },
    };
  }
}

export async function unsubscribeFromWaitlist(email: string, locale: string): Promise<unsubscribeResult> {
  const result = await processUnsubscribeWithClient(email, prisma);
  if (result.success) {
    revalidatePath(`/${locale}`);
  }
  return result;
}
