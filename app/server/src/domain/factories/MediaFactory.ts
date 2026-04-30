import { InvestigationMedia } from '../value-objects/Media'
import type { MediaType, MediaOrigin, Verdict, MediaCategory } from '../value-objects'

export interface CreateInvestigationMediaParams {
  id: number
  order: number
  investigationId: string
  url: string
  type: MediaType
  origin: MediaOrigin
  category?: MediaCategory
  reliability?: Verdict
  justification?: string
  authoritySourceId?: string
  uploadedById: string
}

export class InvestigationMediaFactory {
  static create(params: CreateInvestigationMediaParams): InvestigationMedia {
    return new InvestigationMedia(
      params.id,
      params.url,
      params.type,
      params.order,
      params.origin,
      params.investigationId,
      params.uploadedById,
      params.category || undefined,
      params.reliability || undefined,
      params.justification || undefined,
      params.authoritySourceId,
    )
  }

  static createFromCitizenReport(
    id: number,
    order: number,
    url: string,
    type: MediaType,
    investigationId: string,
    uploadedById: string,
    category?: MediaCategory,
    reliability?: Verdict,
    justification?: string,
  ): InvestigationMedia {
    return this.create({
      id,
      order,
      url,
      type,
      origin: 'CITIZEN_REPORT',
      investigationId,
      uploadedById,
      category,
      reliability,
      justification,
    })
  }

  static createFromJournalistProof(
    id: number,
    order: number,
    url: string,
    type: MediaType,
    investigationId: string,
    uploadedById: string,
    authoritySourceId: string,
  ): InvestigationMedia {
    return this.create({
      id,
      order,
      url,
      type,
      origin: 'JOURNALIST_PROOF',
      investigationId,
      uploadedById,
      authoritySourceId,
    })
  }

  static updateCitizenReportInInvestigationMedia(
    investigationMedia: InvestigationMedia,
    url: string,
    type: MediaType,
    order: number,
    investigationId: string,
    uploadedById: string,
    category?: MediaCategory,
    reliability?: Verdict,
    justification?: string,
    authoritySourceId?: string,
  ): InvestigationMedia {
    return investigationMedia.updateInvestigationMedia(
      investigationMedia.id,
      url,
      type,
      order,
      'CITIZEN_REPORT',
      investigationId,
      uploadedById,
      category,
      reliability,
      justification,
      authoritySourceId,
    )
  }

  static updateJournalistInvestigationMedia(
    investigationMedia: InvestigationMedia,
    url: string,
    type: MediaType,
    order: number,
    investigationId: string,
    uploadedById: string,
    authoritySourceId: string,
  ): InvestigationMedia {
    return investigationMedia.updateInvestigationMedia(
      investigationMedia.id,
      url,
      type,
      order,
      'JOURNALIST_PROOF',
      investigationId,
      uploadedById,
      undefined,
      undefined,
      undefined,
      authoritySourceId,
    )
  }
}



