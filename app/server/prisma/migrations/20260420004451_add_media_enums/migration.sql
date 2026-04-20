/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `analysis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `publication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `push_subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DISABLED', 'BANNED', 'REGULAR', 'WATCHER');

-- CreateEnum
CREATE TYPE "MediaCategory" AS ENUM ('CONTEXT_COLLAPSE', 'MANIPULATED', 'FABRICATED', 'SATIRE', 'MISLEADING', 'IMPOSTOR', 'OTHER');

-- AlterEnum
ALTER TYPE "MediaType" ADD VALUE 'IMAGE';

-- AlterEnum
ALTER TYPE "ReportStatus" ADD VALUE 'UNVERIFIABLE';

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "analysis" DROP CONSTRAINT "analysis_journalistId_fkey";

-- DropForeignKey
ALTER TABLE "analysis" DROP CONSTRAINT "analysis_reportId_fkey";

-- DropForeignKey
ALTER TABLE "publication" DROP CONSTRAINT "publication_analysisId_fkey";

-- DropForeignKey
ALTER TABLE "publication" DROP CONSTRAINT "publication_approvedById_fkey";

-- DropForeignKey
ALTER TABLE "push_subscription" DROP CONSTRAINT "push_subscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_citizenId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "analysis";

-- DropTable
DROP TABLE "publication";

-- DropTable
DROP TABLE "push_subscription";

-- DropTable
DROP TABLE "report";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "verification";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CITIZEN',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "engagement_score" INTEGER NOT NULL DEFAULT 0,
    "last_read_inbox_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'OPEN',
    "content" TEXT NOT NULL,
    "media_url" TEXT,
    "media_type" "MediaType" NOT NULL DEFAULT 'TEXT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "citizen_id" TEXT NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analyses" (
    "id" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "journalist_id" TEXT NOT NULL,
    "media_category" "MediaCategory",
    "draft_verdict" "Verdict" NOT NULL DEFAULT 'UNVERIFIABLE',
    "investigation_notes" TEXT NOT NULL,
    "current_rejection_reason" TEXT,
    "attempt_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watcher_evidence" (
    "id" TEXT NOT NULL,
    "analysis_id" TEXT NOT NULL,
    "watcher_id" TEXT NOT NULL,
    "artifact" TEXT NOT NULL,
    "file_url" TEXT,
    "submission_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watcher_evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publications" (
    "id" TEXT NOT NULL,
    "analysis_id" TEXT NOT NULL,
    "approved_by_id" TEXT NOT NULL,
    "final_verdict" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_correction" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watcher_applications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watcher_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox_subjects" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inbox_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "citizen_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publication_id" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "analyses_report_id_key" ON "analyses"("report_id");

-- CreateIndex
CREATE UNIQUE INDEX "publications_analysis_id_key" ON "publications"("analysis_id");

-- CreateIndex
CREATE UNIQUE INDEX "watcher_applications_user_id_key" ON "watcher_applications"("user_id");

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_citizen_id_fkey" FOREIGN KEY ("citizen_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analyses" ADD CONSTRAINT "analyses_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analyses" ADD CONSTRAINT "analyses_journalist_id_fkey" FOREIGN KEY ("journalist_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watcher_evidence" ADD CONSTRAINT "watcher_evidence_analysis_id_fkey" FOREIGN KEY ("analysis_id") REFERENCES "analyses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watcher_evidence" ADD CONSTRAINT "watcher_evidence_watcher_id_fkey" FOREIGN KEY ("watcher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_analysis_id_fkey" FOREIGN KEY ("analysis_id") REFERENCES "analyses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_approved_by_id_fkey" FOREIGN KEY ("approved_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watcher_applications" ADD CONSTRAINT "watcher_applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox_subjects" ADD CONSTRAINT "inbox_subjects_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_citizen_id_fkey" FOREIGN KEY ("citizen_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE SET NULL ON UPDATE CASCADE;
