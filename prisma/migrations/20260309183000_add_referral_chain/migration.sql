ALTER TABLE "waitlist_signups"
ADD COLUMN "referral_code" TEXT,
ADD COLUMN "referred_by_id" UUID;

UPDATE "waitlist_signups"
SET "referral_code" = UPPER(SUBSTRING(MD5("email" || "id"::text) FROM 1 FOR 10))
WHERE "referral_code" IS NULL;

ALTER TABLE "waitlist_signups"
ALTER COLUMN "referral_code" SET NOT NULL;

CREATE UNIQUE INDEX "waitlist_signups_referral_code_key"
ON "waitlist_signups"("referral_code");

CREATE INDEX "waitlist_signups_referred_by_id_idx"
ON "waitlist_signups"("referred_by_id");

ALTER TABLE "waitlist_signups"
ADD CONSTRAINT "waitlist_signups_referred_by_id_fkey"
FOREIGN KEY ("referred_by_id")
REFERENCES "waitlist_signups"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;
