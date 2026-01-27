-- CreateEnum
CREATE TYPE "WaitlistStatus" AS ENUM ('subscribed', 'unsubscribed', 'bounced');

-- CreateTable
CREATE TABLE "waitlist_signups" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'es',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "WaitlistStatus" NOT NULL DEFAULT 'subscribed',
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "utm_content" TEXT,
    "utm_term" TEXT,
    "referrer" TEXT,
    "landing_path" TEXT,
    "ip_hash" TEXT,
    "user_agent" TEXT,
    "consent_version" TEXT,

    CONSTRAINT "waitlist_signups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_signups_email_key" ON "waitlist_signups"("email");
