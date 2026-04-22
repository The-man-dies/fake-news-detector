// domain/factories/EvidenceFactory.ts
import { Evidence } from '../entities/Evidence'
import { randomUUID } from 'crypto'

export interface CreateEvidenceParams {
  investigationId: string
  watcherId: string
  title: string
  content: string
}

export class EvidenceFactory {
  static create(params: CreateEvidenceParams): Evidence {
    return new Evidence(
      randomUUID(),
      params.content,
      params.title,
      params.investigationId,
      params.watcherId,
    )
  }

  static createFromWatcher(
    investigationId: string,
    watcherId: string,
    title: string,
    content: string,
  ): Evidence {
    return this.create({
      investigationId,
      watcherId,
      title,
      content,
    })
  }
}
