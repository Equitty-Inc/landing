'use server';

import prisma from '@/lib/prisma';
import { createRegistrySchema, registryForm } from '@/schemas/registrySchema';
import { getTranslations } from 'next-intl/server';
import { revalidatePath } from 'next/cache';
import { resend, buildWelcomeEmail } from '@/lib/mailer';

import z from 'zod';

export type errorType = 'server' | 'email';
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

  const { email, nationality } = parsed.data;
  const { subject, html } = buildWelcomeEmail(locale);

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

    await prisma.waitlistSignup.create({
      data: {
        email,
        nationality,
        locale,
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
      const { subject, html } = buildWelcomeEmail(locale);

      const { data, error } = await resend.emails.send({
        from,
        to: email,
        subject,
        html,
      });

      if (error) {
        console.error('RESEND ERROR:', error);
      } else {
        console.log('Email queued/sent:', data);
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
