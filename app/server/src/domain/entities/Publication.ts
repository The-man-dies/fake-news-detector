// domain/entities/Publication.ts

import { Verdict } from './Investigation'

export class Publication {
  constructor(
    public readonly id: string,
    public investigationId: string,
    public approvedById: string,
    public finalVerdict: Verdict,
    public publishedAt: Date = new Date(),
    public isCorrection: boolean = false,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  markAsCorrection(): void {
    this.isCorrection = true
    this.updatedAt = new Date()
  }

  generateBadgeNotification(): string {
    return `New publication: ${this.finalVerdict}`
  }
}
