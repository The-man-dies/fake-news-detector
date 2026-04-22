/*
  Warnings:

  - You are about to drop the `analyses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inbox_subjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `publications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `watcher_applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `watcher_evidence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "analyses" DROP CONSTRAINT "analyses_journalist_id_fkey";

-- DropForeignKey
ALTER TABLE "analyses" DROP CONSTRAINT "analyses_report_id_fkey";

-- DropForeignKey
ALTER TABLE "inbox_subjects" DROP CONSTRAINT "inbox_subjects_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_citizen_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_publication_id_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_analysis_id_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_approved_by_id_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_citizen_id_fkey";

-- DropForeignKey
ALTER TABLE "watcher_applications" DROP CONSTRAINT "watcher_applications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "watcher_evidence" DROP CONSTRAINT "watcher_evidence_analysis_id_fkey";

-- DropForeignKey
ALTER TABLE "watcher_evidence" DROP CONSTRAINT "watcher_evidence_watcher_id_fkey";

-- DropTable
DROP TABLE "analyses";

-- DropTable
DROP TABLE "inbox_subjects";

-- DropTable
DROP TABLE "notifications";

-- DropTable
DROP TABLE "publications";

-- DropTable
DROP TABLE "reports";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "watcher_applications";

-- DropTable
DROP TABLE "watcher_evidence";

-- DropEnum
DROP TYPE "MediaCategory";

-- DropEnum
DROP TYPE "MediaType";

-- DropEnum
DROP TYPE "ReportStatus";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "UserStatus";

-- DropEnum
DROP TYPE "Verdict";
