// domain/entities/Investigation.ts
import { DomainError } from '../../shared/errors'
import { BusinessRuleError } from '../../shared/errors'

export type MediaCategory =
  | 'CONTEXT_COLLAPSE'
  | 'MANIPULATED'
  | 'FABRICATED'
  | 'SATIRE'
  | 'MISLEADING'
  | 'IMPOSTOR'
  | 'OTHER'
export type Verdict = 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIABLE'
export type InvestigationStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'PENDING_REVIEW'
  | 'NEEDS_REVISION'
  | 'PUBLISHED'
  | 'UNVERIFIABLE'

export class Investigation {
  constructor(
    public readonly id: string,
    public reportId: string,
    public journalistId: string,
    public mediaCategory: MediaCategory | null = null,
    public draftVerdict: Verdict = 'UNVERIFIABLE',
    public investigationNotes: string = '',
    public attemptCount: number = 0,
    public status: InvestigationStatus = 'OPEN',
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  isDraft(): boolean {
    return this.status === 'IN_PROGRESS' || this.status === 'NEEDS_REVISION'
  }

  isPendingReview(): boolean {
    return this.status === 'PENDING_REVIEW'
  }

  isPublished(): boolean {
    return this.status === 'PUBLISHED'
  }

  canBeEdited(): boolean {
    return (
      this.status === 'OPEN' ||
      this.status === 'IN_PROGRESS' ||
      this.status === 'NEEDS_REVISION'
    )
  }

  // Journalist actions
  updateDraft(
    mediaCategory: MediaCategory | null,
    draftVerdict: Verdict,
    investigationNotes: string,
  ): void {
    if (!this.canBeEdited()) {
      throw new BusinessRuleError(
        'Investigation cannot be edited in current status',
      )
    }
    this.mediaCategory = mediaCategory
    this.draftVerdict = draftVerdict
    this.investigationNotes = investigationNotes
    this.updatedAt = new Date()
  }

  submitForReview(): void {
    if (!this.canBeEdited()) {
      throw new BusinessRuleError('Cannot submit investigation for review')
    }
    if (!this.mediaCategory) {
      throw new BusinessRuleError(
        'Investigation must have media category before submission',
      )
    }
    this.status = 'PENDING_REVIEW'
    this.updatedAt = new Date()
  }

  // Director rejection
  requestRevision(newStatus: InvestigationStatus): void {
    if (newStatus !== 'NEEDS_REVISION' && newStatus !== 'UNVERIFIABLE') {
      throw new BusinessRuleError('Invalid status for rejection')
    }
    if (this.attemptCount >= 1000) {
      throw new DomainError('Maximum rejection attempts reached')
    }
    this.status = newStatus
    this.attemptCount++
    this.updatedAt = new Date()
  }

  // Director approval
  approve(): void {
    if (this.status !== 'PENDING_REVIEW') {
      throw new BusinessRuleError(
        'Investigation must be pending review to be approved',
      )
    }
    this.status = 'PUBLISHED'
    this.updatedAt = new Date()
  }

  // Mark as unverifiable
  markAsUnverifiable(): void {
    this.status = 'UNVERIFIABLE'
    this.updatedAt = new Date()
  }
}
