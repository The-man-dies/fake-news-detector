// domain/factories/WatcherEvidenceFactory.ts
import { WatcherEvidence } from '../entities/WatcherEvidence'
import { randomUUID } from 'crypto'

export interface CreateEvidenceParams {
  analysisId: string
  watcherId: string
  artifact: string
  fileUrl?: string
}

export class WatcherEvidenceFactory {
  static create(params: CreateEvidenceParams): WatcherEvidence {
    return new WatcherEvidence(
      randomUUID(),
      params.analysisId,
      params.watcherId,
      params.artifact,
      params.fileUrl,
      new Date(),
    )
  }

  static createWithFile(
    analysisId: string,
    watcherId: string,
    artifact: string,
    fileUrl: string,
  ): WatcherEvidence {
    return this.create({ analysisId, watcherId, artifact, fileUrl })
  }

  static createTextEvidence(
    analysisId: string,
    watcherId: string,
    artifact: string,
  ): WatcherEvidence {
    return this.create({ analysisId, watcherId, artifact })
  }
}
