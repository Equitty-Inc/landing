import 'dotenv/config';
import { buildExistingUserReferralCodeEmail, resend } from '../lib/mailer.ts';
import prisma from '../lib/prisma.ts';

const args = new Set(process.argv.slice(2));
const isDryRun = args.has('--dry-run');

async function main() {
  const usersToNotify = await prisma.$queryRaw<
    { id: string; email: string; locale: string; referral_code: string }[]
  >`SELECT id::text, email, locale, referral_code
    FROM waitlist_signups
    WHERE referral_code IS NOT NULL
      AND referral_code_notified_at IS NULL
    ORDER BY created_at ASC`;

  console.log(`Users pending referral code notification: ${usersToNotify.length}`);

  if (usersToNotify.length === 0) {
    return;
  }

  const from = process.env.EMAIL_FROM;
  if (!isDryRun && !from) {
    throw new Error('EMAIL_FROM is required to send referral notification emails.');
  }

  for (const user of usersToNotify) {
    if (isDryRun) {
      console.log(`[dry-run] notify ${user.email} -> ${user.referral_code}`);
      continue;
    }

    const email = buildExistingUserReferralCodeEmail({
      locale: user.locale,
      referralCode: user.referral_code,
    });

    const response = await resend.emails.send({
      from: from!,
      to: user.email,
      subject: email.subject,
      html: email.html,
    });

    if (response.error) {
      console.error(`Failed sending referral code email to ${user.email}:`, response.error);
      continue;
    }

    await prisma.waitlistSignup.update({
      where: { id: user.id },
      data: {
        referralCodeNotifiedAt: new Date(),
      },
    });

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
