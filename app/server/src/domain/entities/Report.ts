// domain/entities/Report.ts
export type ReportStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'NEEDS_REVISION'
  | 'PUBLISHED'

export type MediaType = 'AUDIO' | 'LINK' | 'TEXT' | 'IMAGE' | 'VIDEO'
export class Report {
  constructor(
    public readonly id: string,
    public citizenId: string,
    public title: string,
    public theme: string,
    public status: ReportStatus,
    public content: string,
    public mediaUrl?: string,
    public mediaType: MediaType = 'TEXT',
  ) {}

  changeStatus(newStatus: ReportStatus): void {
    this.status = newStatus
  }
}
