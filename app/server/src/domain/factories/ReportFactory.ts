// domain/factories/ReportFactory.ts
import { Report, ReportStatus } from '../entities/Report'
import { randomUUID } from 'crypto'

export interface CreateReportParams {
  content: string
  title: string
  theme: string
  mediaUrl?: string
  citizenId: string
}

export class ReportFactory {
  static create(params: CreateReportParams): Report {
    return new Report(
      randomUUID(),
      params.citizenId,
      params.title,
      params.theme,

      'OPEN' as ReportStatus,
      params.content,
      params.mediaUrl,
    )
  }

  static createFromScratch(
    content: string,
    citizenId: string,
    title: string,
    theme: string,
  ): Report {
    return this.create({
      citizenId,
      title,
      theme,
      content,
    })
  }

  static createWithMedia(
    content: string,
    mediaUrl: string,
    citizenId: string,
    title: string,
    theme: string,
  ): Report {
    return this.create({ citizenId, title, theme, content, mediaUrl })
  }
}
