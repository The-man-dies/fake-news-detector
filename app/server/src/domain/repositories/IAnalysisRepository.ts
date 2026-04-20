// domain/repositories/IAnalysisRepository.ts
import { Analysis } from '../entities/Analysis'
import { WatcherEvidence } from '../entities/WatcherEvidence'

export interface IAnalysisRepository {
  save(analysis: Analysis): Promise<void>
  findById(id: string): Promise<Analysis | null>
  findByJournalistId(journalistId: string): Promise<Analysis[]>
  findPendingReviews(): Promise<Analysis[]>
  addEvidence(analysisId: string, evidence: WatcherEvidence): Promise<void>
}
