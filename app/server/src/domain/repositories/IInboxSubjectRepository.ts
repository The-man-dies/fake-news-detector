import {
  InboxSubject,
  type InboxSubjectOrigin,
  type InboxSubjectStatus,
} from '../value-objects/InboxSubject'

export interface IInboxSubjectRepository {
  add(subject: InboxSubject): Promise<void>
  update(subject: InboxSubject): Promise<void>
  findById(id: string): Promise<InboxSubject | null>
  findAll(): Promise<InboxSubject[]>
  findByStatus(status: InboxSubjectStatus): Promise<InboxSubject[]>
  findByOrigin(origin: InboxSubjectOrigin): Promise<InboxSubject[]>
}
