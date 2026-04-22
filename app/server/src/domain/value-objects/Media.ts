// domain/value-objects/Media.ts

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
  ) {}

  isFromCitizen(): boolean {
    return this.origin === 'CITIZEN_REPORT'
  }

  isFromJournalist(): boolean {
    return this.origin === 'JOURNALIST_PROOF'
  }

  hasAuthoritySource(): boolean {
    return !!this.authoritySourceId
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
