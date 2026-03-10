import 'dotenv/config';
import { buildExistingUserReferralCodeEmail, resend } from '../lib/mailer.ts';
import prisma from '../lib/prisma.ts';
import { generateUniqueReferralCode } from '../lib/referrals.ts';

const args = new Set(process.argv.slice(2));
const isDryRun = args.has('--dry-run');
const shouldSendEmails = !args.has('--skip-email');

async function createCode() {
  return generateUniqueReferralCode(async (candidate) => {
    const match = await prisma.waitlistSignup.findUnique({
      where: { referralCode: candidate },
      select: { id: true },
    });

    return Boolean(match);
  });
}

async function main() {
  const existingUsers = await prisma.$queryRaw<
    { id: string; email: string; locale: string }[]
  >`SELECT id::text, email, locale
    FROM waitlist_signups
    WHERE referral_code IS NULL
    ORDER BY created_at ASC`;

  console.log(`Users without referral code: ${existingUsers.length}`);

  if (existingUsers.length === 0) {
    return;
  }

  const from = process.env.EMAIL_FROM;
  if (!isDryRun && shouldSendEmails && !from) {
    throw new Error('EMAIL_FROM is required to send backfill emails.');
  }

  for (const user of existingUsers) {
    const referralCode = await createCode();

    if (isDryRun) {
      console.log(`[dry-run] ${user.email} -> ${referralCode}`);
      continue;
    }

    await prisma.waitlistSignup.update({
      where: { id: user.id },
      data: { referralCode },
    });

    console.log(`Updated ${user.email} with referral code ${referralCode}`);

    if (!shouldSendEmails || !from) {
      continue;
    }

    const email = buildExistingUserReferralCodeEmail({
      locale: user.locale,
      referralCode,
    });

    const response = await resend.emails.send({
      from,
      to: user.email,
      subject: email.subject,
      html: email.html,
    });

    if (response.error) {
      console.error(`Failed sending referral code email to ${user.email}:`, response.error);
      continue;
    }

    console.log(`Email sent to ${user.email}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
