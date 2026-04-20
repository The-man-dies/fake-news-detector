// domain/entities/Report.ts
export type ReportStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'NEEDS_REVISION'
  | 'PUBLISHED'

export class Report {
  constructor(
    public readonly id: string,
    public citizenId: string,
    public status: ReportStatus,
    public content: string,
    public mediaUrl?: string,
  ) {}

  changeStatus(newStatus: ReportStatus): void {
    this.status = newStatus
  }
}
