// domain/entities/Citizen.ts
// Bounded Context: Citizen Management

import { Report } from './Report'
import { Evidence } from './Evidence'

export type CitizenStatus = 'ACTIVE' | 'DISABLED' | 'BANNED'
export type CitizenType = 'REGULAR' | 'WATCHER'
export type StatusReason = 'SPAM' | 'ABUSE' | 'FRAUD' | 'INACTIVITY' | 'USER_REQUEST' | 'OTHER'

export class Citizen {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public status: CitizenStatus = 'ACTIVE',
    public citizenType: CitizenType = 'REGULAR',
    public engagementScore: number = 0,
    public lastInboxRead: Date = new Date(),
    public openReportsCount: number = 0,
    public readonly maxOpenReports: number = 3,
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

  // Type checks
  isWatcher(): boolean {
    return this.citizenType === 'WATCHER'
  }

  // Capabilities
  canSubmitReport(): boolean {
    return this.isActive() && this.openReportsCount < this.maxOpenReports
  }

  canSubmitEvidence(): boolean {
    return this.isActive() && this.isWatcher()
  }

  canApplyForWatcher(): boolean {
    return this.isActive() && this.citizenType === 'REGULAR'
  }

  // Business actions
  submitReport(theme: string, title: string | null, content: string | null): Report {
    if (!this.canSubmitReport()) {
      throw new Error('Cannot submit report: maximum open reports reached or account inactive')
    }
    this.openReportsCount++
    this.incrementEngagementScore()
    this.updatedAt = new Date()

    return new Report(
      crypto.randomUUID(),
      this.id,
      theme,
      title,
      content,
      'OPEN',
    )
  }

  submitEvidence(investigationId: string, title: string, content: string): Evidence {
    if (!this.canSubmitEvidence()) {
      throw new Error('Only watchers can submit evidence')
    }
    this.incrementEngagementScore(2)
    this.updatedAt = new Date()

    return new Evidence(
      crypto.randomUUID(),
      content,
      title,
      investigationId,
      this.id,
    )
  }

  applyForWatcher(): void {
    if (!this.canApplyForWatcher()) {
      throw new Error('Cannot apply for watcher: must be active regular citizen')
    }
    // WatcherApplication creation handled by application service
    this.updatedAt = new Date()
  }

  promoteToWatcher(): void {
    if (this.citizenType === 'WATCHER') {
      throw new Error('Already a watcher')
    }
    this.citizenType = 'WATCHER'
    this.updatedAt = new Date()
  }

  reportResolved(): void {
    if (this.openReportsCount > 0) {
      this.openReportsCount--
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
  getProfile() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      engagementScore: this.engagementScore,
      status: this.status,
      citizenType: this.citizenType,
      openReportsCount: this.openReportsCount,
    }
  }
}
