/*
  Warnings:

  - The values [UNVERIFIABLE] on the enum `InvestigationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InvestigationStatus_new" AS ENUM ('OPEN', 'IN_PROGRESS', 'PENDING_REVIEW', 'NEEDS_REVISION', 'PUBLISHED', 'ARCHIVED');
ALTER TABLE "public"."investigations" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "investigations" ALTER COLUMN "status" TYPE "InvestigationStatus_new" USING ("status"::text::"InvestigationStatus_new");
ALTER TYPE "InvestigationStatus" RENAME TO "InvestigationStatus_old";
ALTER TYPE "InvestigationStatus_new" RENAME TO "InvestigationStatus";
DROP TYPE "public"."InvestigationStatus_old";
ALTER TABLE "investigations" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;
