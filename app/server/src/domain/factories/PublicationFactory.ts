// domain/factories/PublicationFactory.ts
import { Publication } from '../entities/Publication'
import { randomUUID } from 'crypto'

export interface CreatePublicationParams {
  analysisId: string
  approvedById: string
  finalVerdict: string
  isCorrection?: boolean
}

export class PublicationFactory {
  static create(params: CreatePublicationParams): Publication {
    return new Publication(
      randomUUID(),
      params.analysisId,
      params.approvedById,
      params.finalVerdict,
      new Date(),
      params.isCorrection || false,
    )
  }

  static createCorrection(
    analysisId: string,
    approvedById: string,
    originalVerdict: string,
  ): Publication {
    return this.create({
      analysisId,
      approvedById,
      finalVerdict: `CORRECTION: ${originalVerdict}`,
      isCorrection: true,
    })
  }

  static createFromAnalysis(
    analysis: Analysis,
    approvedById: string,
  ): Publication {
    return this.create({
      analysisId: analysis.id,
      approvedById,
      finalVerdict: analysis.draftVerdict,
    })
  }
}
