-- AlterTable
ALTER TABLE "notifications" ADD COLUMN "investigationId" TEXT;

-- CreateIndex
CREATE INDEX "notifications_investigationId_idx" ON "notifications"("investigationId");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_investigationId_fkey" FOREIGN KEY ("investigationId") REFERENCES "investigations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
