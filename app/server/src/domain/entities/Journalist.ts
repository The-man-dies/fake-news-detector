// domain/entities/Journalist.ts
import { Report } from './Report'
import { AuthoritySource } from '../value-objects/AuthoritySource'

export type JournalistStatus = 'BANNED' | 'DISABLED' | 'ACTIVE'

export class Journalist {
  constructor(
    public readonly id: string,
    public specialty: string,
    public status: JournalistStatus,
    public activeAnalysesCount: number = 0,
    public readonly maxActiveAnalyses: number = 1,
  ) {}

  pickReport(): void {}
  writeAnalysis(report: Report): void {}
  linkAuthoritySource(source: AuthoritySource): void {}
  submitDraft(): void {}
  correctAnalysis(reason: string): void {}
  receiveEvidence(evidence: any): void {}
  canAnalyze(): boolean {
    return this.activeAnalysesCount < this.maxActiveAnalyses
  }
  getHistory(): void {}
}
