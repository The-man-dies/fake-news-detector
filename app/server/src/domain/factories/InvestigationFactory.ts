// domain/factories/InvestigationFactory.ts
import { Investigation, MediaCategory, Verdict } from '../entities/Investigation'
import { randomUUID } from 'crypto'

export interface CreateInvestigationParams {
  reportId: string
  journalistId: string
  mediaCategory?: MediaCategory | null
  draftVerdict?: Verdict
  investigationNotes?: string
}

export class InvestigationFactory {
  static create(params: CreateInvestigationParams): Investigation {
    return new Investigation(
      randomUUID(),
      params.reportId,
      params.journalistId,
      params.mediaCategory || null,
      params.draftVerdict || 'UNVERIFIABLE',
      params.investigationNotes || '',
      0,
      'OPEN',
    )
  }

  static createDraft(reportId: string, journalistId: string): Investigation {
    return this.create({
      reportId,
      journalistId,
    })
  }
}
