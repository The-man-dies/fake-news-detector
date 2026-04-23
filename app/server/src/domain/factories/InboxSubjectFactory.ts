import {
  InboxSubject,
  type InboxSubjectOrigin,
  type InboxSubjectStatus,
} from "../entities/InboxSubject"
import { Report } from '../entities/Report'
import { randomUUID } from 'crypto'
import { DomainError } from "../../shared"

type CreateInboxSubjectParams = {
  theme: string
  description: string
  createdById: string
  status: InboxSubjectStatus
  origin: InboxSubjectOrigin
  createdAt: Date
  updatedAt: Date
}

export class InboxSubjectFactory {
  static create(params: CreateInboxSubjectParams): InboxSubject {
    const { theme, description, createdById, status, origin, createdAt, updatedAt } = params
    const id = randomUUID()
    return new InboxSubject(
      id,
      theme,
      description,
      createdById,
      status,
      origin,
      createdAt,
      updatedAt,
    )
  }

  static createFromDirector(directorId: string, theme: string, description: string): InboxSubject {
    return this.create({
      theme,
      description,
      createdById: directorId,
      status: 'OPEN',
      origin: 'DIRECTOR_INITIATED',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  static createFromExistingReport(report: Report): InboxSubject {
    throw new DomainError('Not implemented')
  }
}
