// domain/factories/InvestigationFactory.ts
import { Investigation, MediaCategory, Verdict } from '../entities/Investigation'
import { randomUUID } from 'crypto'

export interface CreateInvestigationParams {
  reportId?: string | null
  inboxSubjectId?: string | null
  journalistId: string
  mediaCategory?: MediaCategory | null
  draftVerdict?: Verdict
  investigationNotes?: string
}

export class InvestigationFactory {
  static create(params: CreateInvestigationParams): Investigation {
    Investigation.assertExactlyOneSource(
      params.reportId ?? null,
      params.inboxSubjectId ?? null,
    )
    return new Investigation(
      randomUUID(),
      params.reportId ?? null,
      params.inboxSubjectId ?? null,
      params.journalistId,
      params.mediaCategory || null,
      params.draftVerdict || 'UNVERIFIABLE',
      params.investigationNotes || '',
      0,
      'OPEN',
    )
  }

  static createDraftFromReport(reportId: string, journalistId: string): Investigation {
    return this.create({
      reportId,
      inboxSubjectId: null,
      journalistId,
    })
  }

  static createDraftFromDirectorInbox(
    inboxSubjectId: string,
    journalistId: string,
  ): Investigation {
    return this.create({
      reportId: null,
      inboxSubjectId,
      journalistId,
    })
  }
}
