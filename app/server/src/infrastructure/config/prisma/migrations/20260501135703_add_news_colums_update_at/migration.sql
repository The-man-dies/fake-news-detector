-- Safe rollout for non-empty tables:
-- 1) add nullable column, 2) backfill, 3) enforce NOT NULL

ALTER TABLE "VerifiedLink" ADD COLUMN "updatedAt" TIMESTAMP(3);
ALTER TABLE "VerifiedMedia" ADD COLUMN "updatedAt" TIMESTAMP(3);

UPDATE "VerifiedLink"
SET "updatedAt" = "createdAt"
WHERE "updatedAt" IS NULL;

UPDATE "VerifiedMedia"
SET "updatedAt" = "createdAt"
WHERE "updatedAt" IS NULL;

ALTER TABLE "VerifiedLink" ALTER COLUMN "updatedAt" SET NOT NULL;
ALTER TABLE "VerifiedMedia" ALTER COLUMN "updatedAt" SET NOT NULL;
