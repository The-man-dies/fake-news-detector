// domain/factories/PublicationFactory.ts
import { Publication } from '../entities/Publication'
import { randomUUID } from 'crypto'
import { type Verdict } from '../value-objects'

export interface CreatePublicationParams {
  investigationId: string
  approvedById: string
  finalVerdict: Verdict
  publishedAt?: Date
  receivedACorrection?: boolean
}

export class PublicationFactory {
  static create(params: CreatePublicationParams): Publication {
    const id = randomUUID()
    return new Publication(
      id,
      params.investigationId,
      params.approvedById,
      params.finalVerdict,
      params.publishedAt ?? new Date(),
      params.receivedACorrection || false,
      new Date(),
      new Date(),
    )
  }

  static createPublication(
    investigationId: string,
    approvedById: string,
    finalVerdict: Verdict,
  ): Publication {
    return this.create({
      investigationId,
      approvedById,
      finalVerdict,
    })
  }
}
