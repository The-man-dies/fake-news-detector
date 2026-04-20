// domain/repositories/IAnalyseRepository.ts
import { Analyse } from '../entities/Analyse'

export interface IAnalyseRepository {
  save(analysis: Analyse): Promise<void>
  findById(id: string): Promise<Analyse | null>
  findByJournalistId(journalistId: string): Promise<Analyse[]>
  findPendingReviews(): Promise<Analyse[]>
}
