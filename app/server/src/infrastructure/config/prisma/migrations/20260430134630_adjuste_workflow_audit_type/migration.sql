/*
  Warnings:

  - The `previousStatus` column on the `workflow_audits` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `newStatus` on the `workflow_audits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "workflow_audits" DROP COLUMN "previousStatus",
ADD COLUMN     "previousStatus" "InvestigationStatus",
DROP COLUMN "newStatus",
ADD COLUMN     "newStatus" "InvestigationStatus" NOT NULL;
