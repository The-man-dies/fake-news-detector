// domain/value-objects/InboxSubject.ts
export type InboxSubjectStatus = 'OPEN' | 'IN_PROGRESS' | 'ARCHIVED'
export type InboxSubjectOrigin = 'REPORT' | 'ADMIN_INVESTIGATION'

export class InboxSubject {
  constructor(
    public readonly id: string,
    public adminId: string,
    public readonly theme: string,
    public status: InboxSubjectStatus = 'OPEN',
    public readonly description: string,
    public readonly origin: InboxSubjectOrigin,
  ) {}

  changeStatus(newStatus: InboxSubjectStatus): void {
    this.status = newStatus
  }
}
