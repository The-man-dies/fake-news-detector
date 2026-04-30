// domain/value-objects/Media.ts

import { BusinessRuleError } from '../../shared'

export type MediaType = 'AUDIO' | 'LINK' | 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT'
export type MediaCategory = 'CONTEXT_COLLAPSE' | 'MANIPULATED' | 'FABRICATED' | 'SATIRE' | 'MISLEADING' | 'IMPOSTOR' | 'OTHER'
export type MediaOrigin = 'CITIZEN_REPORT' | 'JOURNALIST_PROOF'
export type Verdict = 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIABLE'

// Report Media (from Citizen)
export class ReportMedia {
  constructor(
    public readonly id: number,
    public url: string,
    public type: MediaType,
    public order: number,
    public reportId: string,
    public uploadedById: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}

// Investigation Media (from Journalist)
export class InvestigationMedia {
  constructor(
    public readonly id: number,
    public url: string,
    public type: MediaType,
    public order: number,
    public origin: MediaOrigin,
    public investigationId: string,
    public uploadedById: string,
    public category?: MediaCategory,
    public reliability?: Verdict,
    public justification?: string,
    public authoritySourceId?: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    this.validateConsistency()
  }

  isFromCitizen(): boolean {
    return this.origin === 'CITIZEN_REPORT'
  }

  isFromJournalist(): boolean {
    return this.origin === 'JOURNALIST_PROOF'
  }

  hasAuthoritySource(): boolean {
    return !!this.authoritySourceId
  }

  private validateConsistency(): void {
    if (this.isFromJournalist()) {
      if (this.category || this.reliability) {
        throw new BusinessRuleError(
          'JOURNALIST_PROOF cannot define category or reliability',
        )
      }
      if (!this.authoritySourceId) {
        throw new BusinessRuleError(
          'JOURNALIST_PROOF requires an authority source',
        )
      }
    }
  }

  submitReliabilityVerdict(reliability: Verdict): void {
    if (!this.isFromCitizen()) {
      throw new BusinessRuleError(
        'Journalist can submit reliability verdict only if origin = CITIZEN_REPORT',
      )
    }

    this.reliability = reliability
    this.updatedAt = new Date()
  }
  submitCategory(category: MediaCategory): void {
    if (!this.isFromCitizen()) {
      throw new BusinessRuleError(
        'Journalist can submit media category only if origin = CITIZEN_REPORT',
      )
    }
    this.category = category
    this.updatedAt = new Date()
  }
  submitJustification(justification: string): void {
    if (!this.isFromCitizen()) {
      throw new BusinessRuleError(
        'Journalist can submit justification only if origin = CITIZEN_REPORT',
      )
    }
    this.justification = justification
    this.updatedAt = new Date()
  }

  submitAuthoritySource(authoritySource: string): void {
    if (!this.isFromJournalist()) {
      throw new BusinessRuleError(
        'Journalist can submit authority source only if origin = JOURNALIST_PROOF',
      )
    }
    if (!authoritySource) {
      throw new BusinessRuleError('Authority source is required')
    }
    this.authoritySourceId = authoritySource
    this.updatedAt = new Date()
  }
  
  updateInvestigationMedia(
    investigationMediaId: number,
    url: string,
    type: MediaType,
    order: number,
    origin: MediaOrigin,
    investigationId: string,
    uploadedById: string,
    category?: MediaCategory,
    reliability?: Verdict,
    justification?: string,
    authoritySourceId?: string,
  ): InvestigationMedia {
    if (investigationMediaId !== this.id) {
      throw new BusinessRuleError("Cannot update investigation media: id doesn't match")
    }
    if (investigationId !== this.investigationId) {
      throw new BusinessRuleError(
        "Cannot update investigation media: investigationId doesn't match",
      )
    }
    if (uploadedById !== this.uploadedById) {
      throw new BusinessRuleError(
        "Cannot update investigation media: uploader id doesn't match",
      )
    }

    this.url = url
    this.type = type
    this.order = order
    this.origin = origin
    this.uploadedById = uploadedById

    if (origin === 'CITIZEN_REPORT') {
      this.category = category
      this.reliability = reliability
      this.justification = justification
      this.authoritySourceId = authoritySourceId
    } else {
      this.category = undefined
      this.reliability = undefined
      this.justification = undefined
      this.authoritySourceId = authoritySourceId
    }

    this.validateConsistency()
    this.updatedAt = new Date()
    return this
  }
}

// Evidence Media (from Watcher)
export class EvidenceMedia {
  constructor(
    public readonly id: number,
    public url: string,
    public type: MediaType,
    public order: number,
    public evidenceId: string,
    public uploadedById: string,
    public category?: MediaCategory,
    public reliability?: Verdict,
    public justification?: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  
}

// Inbox Subject Media
export class InboxSubjectMedia {
  constructor(
    public readonly id: number,
    public url: string,
    public type: MediaType,
    public order: number,
    public inboxSubjectId: string,
    public uploadedById: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}

// Verified Media (in Publication)
export class VerifiedMedia {
  constructor(
    public readonly id: number,
    public url: string,
    public type: MediaType,
    public order: number,
    public publicationId: string,
    public addedById: string,
    public authoritySourceId?: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}

// Verified Link (in Publication)
export class VerifiedLink {
  constructor(
    public readonly id: number,
    public url: string,
    public publicationId: string,
    public addedById: string,
    public authoritySourceId: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
