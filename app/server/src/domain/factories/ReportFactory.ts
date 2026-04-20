// domain/factories/ReportFactory.ts
import { Report, ReportStatus } from '../entities/Report'
import { randomUUID } from 'crypto'

export interface CreateReportParams {
  content: string
  mediaUrl?: string
  citizenId: string
}

export class ReportFactory {
  static create(params: CreateReportParams): Report {
    return new Report(
      randomUUID(),
      params.citizenId,
      'OPEN' as ReportStatus,
      params.content,
      params.mediaUrl,
    )
  }

  static createFromScratch(content: string, citizenId: string): Report {
    return this.create({ content, citizenId })
  }

  static createWithMedia(
    content: string,
    mediaUrl: string,
    citizenId: string,
  ): Report {
    return this.create({ content, mediaUrl, citizenId })
  }
}
