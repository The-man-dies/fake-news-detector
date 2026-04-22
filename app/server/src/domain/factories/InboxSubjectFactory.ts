import {
  InboxSubject,
  type InboxSubjectOrigin,
  type InboxSubjectStatus,
} from '../value-objects/InboxSubject'
import { Report } from '../entities/Report'
import { randomUUID } from 'node:crypto'

type CreateInboxSubjectParams = {
  adminId: string
  theme: string
  description: string
  origin: InboxSubjectOrigin
}

export class InboxSubjectFactory {
  static create(params: CreateInboxSubjectParams): InboxSubject {
    const { adminId, theme, description, origin } = params
    const id = randomUUID()
    return new InboxSubject(
      id,
      adminId,
      theme,
      'OPEN' as InboxSubjectStatus,
      description,
      origin,
    )
  }

  static createFromExistingReport(params: Report): InboxSubject {}
}
