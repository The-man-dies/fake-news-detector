// domain/entities/Analysis.ts
export class Analysis {
  constructor(
    public readonly id: string,
    public reportId: string,
    public journalistId: string,
    public mediaCategory: string,
    public draftVerdict: string,
    public investigationNotes: string,
    public currentRejectionReason: string | null = null,
    public attemptCount: number = 0,
  ) {}

  checkCoherence(): boolean {
    return true
  }
  applyFeedback(reason: string): void {
    this.currentRejectionReason = reason
    this.attemptCount++
  }
}
