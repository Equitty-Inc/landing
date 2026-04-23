-- AlterTable
ALTER TABLE "waitlist_signups" ADD COLUMN "first_name" TEXT;

-- AlterTable
ALTER TABLE "waitlist_signups" ADD COLUMN "newsletter_interests" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
