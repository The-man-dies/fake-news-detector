// domain/factories/AnalysisFactory.ts
import { Analysis } from '../entities/Analysis'
import { randomUUID } from 'crypto'

export interface CreateAnalysisParams {
  reportId: string
  journalistId: string
  mediaCategory: string
  draftVerdict: string
  investigationNotes: string
}

export class AnalysisFactory {
  static create(params: CreateAnalysisParams): Analysis {
    return new Analysis(
      randomUUID(),
      params.reportId,
      params.journalistId,
      params.mediaCategory,
      params.draftVerdict,
      params.investigationNotes,
      null,
      0,
    )
  }

  static createDraft(reportId: string, journalistId: string): Analysis {
    return this.create({
      reportId,
      journalistId,
      mediaCategory: 'AUDIO',
      draftVerdict: 'UNVERIFIABLE',
      investigationNotes: '',
    })
  }

  static fromRejection(previousAnalysis: Analysis, reason: string): Analysis {
    const newAnalysis = this.create({
      reportId: previousAnalysis.reportId,
      journalistId: previousAnalysis.journalistId,
      mediaCategory: previousAnalysis.mediaCategory,
      draftVerdict: previousAnalysis.draftVerdict,
      investigationNotes: previousAnalysis.investigationNotes,
    })
    newAnalysis.applyFeedback(reason)
    return newAnalysis
  }
}
