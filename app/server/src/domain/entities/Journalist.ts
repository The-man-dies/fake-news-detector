// domain/entities/Journalist.ts
// Bounded Context: Investigation Management

import { Investigation, MediaCategory, Verdict } from './Investigation'
import { Report } from './Report'

export type JournalistStatus = 'ACTIVE' | 'DISABLED' | 'BANNED'
export type StatusReason = 'SPAM' | 'ABUSE' | 'FRAUD' | 'INACTIVITY' | 'USER_REQUEST' | 'OTHER'

export class Journalist {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public status: JournalistStatus = 'ACTIVE',
    public engagementScore: number = 0,
    public lastInboxRead: Date = new Date(),
    public activeInvestigationsCount: number = 0,
    public readonly maxActiveInvestigations: number = 1,
    public statusReason: StatusReason | null = null,
    public statusReasonDetails: string | null = null,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  // Status checks
  isActive(): boolean {
    return this.status === 'ACTIVE'
  }

  canLogin(): boolean {
    return this.status !== 'BANNED'
  }

  // Capabilities
  canAnalyze(): boolean {
    return this.isActive() && this.activeInvestigationsCount < this.maxActiveInvestigations
  }

  canPickReport(): boolean {
    return this.canAnalyze()
  }

  // Business actions
  pickReport(report: Report): Investigation {
    if (!this.canPickReport()) {
      throw new Error('Cannot pick report: maximum active investigations reached')
    }
    if (!report.canBePicked()) {
      throw new Error('Report is not available for picking')
    }

    this.activeInvestigationsCount++
    this.incrementEngagementScore()
    this.updatedAt = new Date()

    report.changeStatus('IN_PROGRESS')

    return new Investigation(
      crypto.randomUUID(),
      report.id,
      this.id,
      null,
      'UNVERIFIABLE',
      '',
      0,
      'OPEN',
    )
  }

  submitInvestigationDraft(
    investigation: Investigation,
    mediaCategory: MediaCategory | null,
    draftVerdict: Verdict,
    investigationNotes: string,
  ): void {
    if (investigation.journalistId !== this.id) {
      throw new Error('Cannot submit: investigation belongs to another journalist')
    }
    investigation.updateDraft(mediaCategory, draftVerdict, investigationNotes)
  }

  submitForReview(investigation: Investigation): void {
    if (investigation.journalistId !== this.id) {
      throw new Error('Cannot submit: investigation belongs to another journalist')
    }
    investigation.submitForReview()
  }


  correctInvestigation(investigation: Investigation, notes: string): void {
    if (investigation.journalistId !== this.id) {
      throw new Error('Cannot correct: investigation belongs to another journalist')
    }
    if (investigation.attemptCount >= 1000) {
      throw new Error('Maximum correction attempts reached')
    }
    investigation.updateDraft(
      investigation.mediaCategory,
      investigation.draftVerdict,
      notes,
    )
  }

  onInvestigationPublished(investigation: Investigation): void {
    if (
      investigation.journalistId === this.id && 
      this.activeInvestigationsCount > 0 && 
      investigation.status === 'PUBLISHED'
    ) {
      this.activeInvestigationsCount--
      this.incrementEngagementScore(2)
      this.updatedAt = new Date()
    }
  }

  incrementEngagementScore(points: number = 1): void {
    this.engagementScore += points
    this.updatedAt = new Date()
  }

  markInboxAsRead(): void {
    this.lastInboxRead = new Date()
    this.updatedAt = new Date()
  }

  // Admin actions
  ban(reason: StatusReason, details?: string): void {
    this.status = 'BANNED'
    this.statusReason = reason
    this.statusReasonDetails = details ?? null
    this.updatedAt = new Date()
  }

  disable(reason: StatusReason, details?: string): void {
    this.status = 'DISABLED'
    this.statusReason = reason
    this.statusReasonDetails = details ?? null
    this.updatedAt = new Date()
  }

  activate(): void {
    this.status = 'ACTIVE'
    this.statusReason = null
    this.statusReasonDetails = null
    this.updatedAt = new Date()
  }

  getStatusHistory() {
    return {
      status: this.status,
      reason: this.statusReason,
      details: this.statusReasonDetails,
      updatedAt: this.updatedAt,
    }
  }

  // Getters
  getHistory() {
    return {
      id: this.id,
      name: this.name,
      activeInvestigations: this.activeInvestigationsCount,
      engagementScore: this.engagementScore,
    }
  }
}
