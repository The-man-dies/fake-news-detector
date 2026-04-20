// domain/entities/Citizen.ts
export type CitizenStatus = 'BANNED' | 'REGULAR' | 'WATCHER'

export class Citizen {
  constructor(
    public readonly id: string,
    public engagementScore: number,
    public status: CitizenStatus,
    public openReportsCount: number = 0,
    public readonly maxOpenReports: number = 3,
  ) {}

  isWatcher(): boolean {
    return this.status === 'WATCHER'
  }
  getEngagementScore(): number {
    return this.engagementScore
  }
  canSubmitReport(): boolean {
    return this.openReportsCount < this.maxOpenReports
  }
  submitReport(content: string): void {}
  getNotifications(): void {}
  applyForWatcher(): void {}
  submitEvidence(dossierId: string, artifact: any): void {}
  getProfile(): void {}
  getHistory(): void {}
}
