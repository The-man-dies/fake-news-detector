-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EDITORIAL_DIRECTOR', 'JOURNALIST', 'CITIZEN');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'DISABLED', 'BANNED');

-- CreateEnum
CREATE TYPE "StatusReason" AS ENUM ('SPAM', 'ABUSE', 'FRAUD', 'INACTIVITY', 'USER_REQUEST', 'OTHER');

-- CreateEnum
CREATE TYPE "CitizenType" AS ENUM ('REGULAR', 'WATCHER');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'PENDING_REVIEW', 'NEEDS_REVISION', 'PUBLISHED', 'UNVERIFIABLE');

-- CreateEnum
CREATE TYPE "WatcherApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Verdict" AS ENUM ('TRUE', 'FALSE', 'MISLEADING', 'UNVERIFIABLE');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('AUDIO', 'LINK', 'TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "MediaCategory" AS ENUM ('CONTEXT_COLLAPSE', 'MANIPULATED', 'FABRICATED', 'SATIRE', 'MISLEADING', 'IMPOSTOR', 'OTHER');

-- CreateEnum
CREATE TYPE "InboxSubjectOrigin" AS ENUM ('REPORT', 'DIRECTOR_INITIATED');

-- CreateEnum
CREATE TYPE "InboxSubjectStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('OFFICIAL_DECREE', 'ORIGINAL_RETRACTION', 'DIRECT_EVIDENCE', 'MEDIA_CROSSCHECK', 'AUTHORITY_STATEMENT');

-- CreateEnum
CREATE TYPE "MediaOrigin" AS ENUM ('CITIZEN_REPORT', 'JOURNALIST_PROOF');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PUBLICATION', 'CORRECTION', 'ALERT');

-- CreateTable
CREATE TABLE "actors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CITIZEN',
    "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "citizenType" "CitizenType" NOT NULL DEFAULT 'REGULAR',
    "engagementScore" INTEGER NOT NULL DEFAULT 0,
    "lastInboxRead" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusReason" "StatusReason",
    "statusReasonDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthoritySource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SourceType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthoritySource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "investigationId" TEXT NOT NULL,
    "watcherId" TEXT NOT NULL,

    CONSTRAINT "evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceMedia" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "order" INTEGER NOT NULL,
    "category" "MediaCategory",
    "reliability" "Verdict",
    "justification" TEXT,
    "evidenceId" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvidenceMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox_subjects" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "origin" "InboxSubjectOrigin" NOT NULL DEFAULT 'REPORT',
    "status" "InboxSubjectStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "inbox_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InboxSubjectMedia" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "order" INTEGER NOT NULL,
    "inboxSubjectId" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InboxSubjectMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investigations" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "journalistId" TEXT NOT NULL,
    "mediaCategory" "MediaCategory",
    "draftVerdict" "Verdict" NOT NULL DEFAULT 'UNVERIFIABLE',
    "investigationNotes" TEXT NOT NULL,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investigations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestigationMedia" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "order" INTEGER NOT NULL,
    "origin" "MediaOrigin" NOT NULL,
    "category" "MediaCategory",
    "reliability" "Verdict",
    "justification" TEXT,
    "investigationId" TEXT NOT NULL,
    "authoritySourceId" TEXT,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestigationMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_audits" (
    "id" TEXT NOT NULL,
    "investigationId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "previousStatus" "ReportStatus",
    "newStatus" "ReportStatus" NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workflow_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "theme" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "actorId" TEXT NOT NULL,
    "publicationId" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Correction" (
    "id" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "correctedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Correction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publications" (
    "id" TEXT NOT NULL,
    "investigationId" TEXT NOT NULL,
    "approvedById" TEXT NOT NULL,
    "finalVerdict" "Verdict" NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCorrection" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerifiedMedia" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "order" INTEGER NOT NULL,
    "authoritySourceId" TEXT,
    "publicationId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerifiedMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerifiedLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "authoritySourceId" TEXT,
    "publicationId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerifiedLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'OPEN',
    "theme" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "citizenId" TEXT NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportMedia" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "order" INTEGER NOT NULL,
    "reportId" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watcher_applications" (
    "id" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "status" "WatcherApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "actorId" TEXT NOT NULL,

    CONSTRAINT "watcher_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NotificationToVerifiedMedia" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NotificationToVerifiedMedia_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_NotificationToVerifiedLink" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NotificationToVerifiedLink_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "actors_email_key" ON "actors"("email");

-- CreateIndex
CREATE INDEX "EvidenceMedia_evidenceId_idx" ON "EvidenceMedia"("evidenceId");

-- CreateIndex
CREATE INDEX "InboxSubjectMedia_inboxSubjectId_idx" ON "InboxSubjectMedia"("inboxSubjectId");

-- CreateIndex
CREATE UNIQUE INDEX "investigations_reportId_key" ON "investigations"("reportId");

-- CreateIndex
CREATE INDEX "InvestigationMedia_investigationId_idx" ON "InvestigationMedia"("investigationId");

-- CreateIndex
CREATE INDEX "InvestigationMedia_authoritySourceId_idx" ON "InvestigationMedia"("authoritySourceId");

-- CreateIndex
CREATE INDEX "workflow_audits_investigationId_idx" ON "workflow_audits"("investigationId");

-- CreateIndex
CREATE INDEX "workflow_audits_actorId_idx" ON "workflow_audits"("actorId");

-- CreateIndex
CREATE UNIQUE INDEX "Correction_notificationId_key" ON "Correction"("notificationId");

-- CreateIndex
CREATE UNIQUE INDEX "publications_investigationId_key" ON "publications"("investigationId");

-- CreateIndex
CREATE INDEX "VerifiedMedia_authoritySourceId_idx" ON "VerifiedMedia"("authoritySourceId");

-- CreateIndex
CREATE INDEX "ReportMedia_reportId_idx" ON "ReportMedia"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "watcher_applications_actorId_key" ON "watcher_applications"("actorId");

-- CreateIndex
CREATE INDEX "_NotificationToVerifiedMedia_B_index" ON "_NotificationToVerifiedMedia"("B");

-- CreateIndex
CREATE INDEX "_NotificationToVerifiedLink_B_index" ON "_NotificationToVerifiedLink"("B");

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_investigationId_fkey" FOREIGN KEY ("investigationId") REFERENCES "investigations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_watcherId_fkey" FOREIGN KEY ("watcherId") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceMedia" ADD CONSTRAINT "EvidenceMedia_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "evidence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceMedia" ADD CONSTRAINT "EvidenceMedia_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox_subjects" ADD CONSTRAINT "inbox_subjects_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InboxSubjectMedia" ADD CONSTRAINT "InboxSubjectMedia_inboxSubjectId_fkey" FOREIGN KEY ("inboxSubjectId") REFERENCES "inbox_subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InboxSubjectMedia" ADD CONSTRAINT "InboxSubjectMedia_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investigations" ADD CONSTRAINT "investigations_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investigations" ADD CONSTRAINT "investigations_journalistId_fkey" FOREIGN KEY ("journalistId") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestigationMedia" ADD CONSTRAINT "InvestigationMedia_investigationId_fkey" FOREIGN KEY ("investigationId") REFERENCES "investigations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestigationMedia" ADD CONSTRAINT "InvestigationMedia_authoritySourceId_fkey" FOREIGN KEY ("authoritySourceId") REFERENCES "AuthoritySource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestigationMedia" ADD CONSTRAINT "InvestigationMedia_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_audits" ADD CONSTRAINT "workflow_audits_investigationId_fkey" FOREIGN KEY ("investigationId") REFERENCES "investigations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_audits" ADD CONSTRAINT "workflow_audits_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correction" ADD CONSTRAINT "Correction_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correction" ADD CONSTRAINT "Correction_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correction" ADD CONSTRAINT "Correction_correctedById_fkey" FOREIGN KEY ("correctedById") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_investigationId_fkey" FOREIGN KEY ("investigationId") REFERENCES "investigations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifiedMedia" ADD CONSTRAINT "VerifiedMedia_authoritySourceId_fkey" FOREIGN KEY ("authoritySourceId") REFERENCES "AuthoritySource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifiedMedia" ADD CONSTRAINT "VerifiedMedia_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifiedMedia" ADD CONSTRAINT "VerifiedMedia_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifiedLink" ADD CONSTRAINT "VerifiedLink_authoritySourceId_fkey" FOREIGN KEY ("authoritySourceId") REFERENCES "AuthoritySource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifiedLink" ADD CONSTRAINT "VerifiedLink_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifiedLink" ADD CONSTRAINT "VerifiedLink_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportMedia" ADD CONSTRAINT "ReportMedia_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportMedia" ADD CONSTRAINT "ReportMedia_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watcher_applications" ADD CONSTRAINT "watcher_applications_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationToVerifiedMedia" ADD CONSTRAINT "_NotificationToVerifiedMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationToVerifiedMedia" ADD CONSTRAINT "_NotificationToVerifiedMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "VerifiedMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationToVerifiedLink" ADD CONSTRAINT "_NotificationToVerifiedLink_A_fkey" FOREIGN KEY ("A") REFERENCES "notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationToVerifiedLink" ADD CONSTRAINT "_NotificationToVerifiedLink_B_fkey" FOREIGN KEY ("B") REFERENCES "VerifiedLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
