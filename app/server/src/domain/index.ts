// domain/index.ts
// Entities (exports MediaCategory and Verdict)
export * from './entities'

// Value Objects (exclude MediaCategory and Verdict to avoid conflicts)
export {
  MediaType,
  MediaOrigin,
  ReportMedia,
  InvestigationMedia,
  EvidenceMedia,
  InboxSubjectMedia,
  VerifiedMedia,
  VerifiedLink,
} from './value-objects'

// Repositories
export * from './repositories'

// Factories
export * from './factories'
