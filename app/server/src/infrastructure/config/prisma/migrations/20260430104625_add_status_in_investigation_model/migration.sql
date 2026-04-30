-- CreateEnum
CREATE TYPE "InvestigationStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'PENDING_REVIEW', 'NEEDS_REVISION', 'PUBLISHED', 'UNVERIFIABLE');

-- AlterTable
ALTER TABLE "investigations" ADD COLUMN     "status" "InvestigationStatus" NOT NULL DEFAULT 'OPEN';
