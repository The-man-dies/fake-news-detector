// domain/repositories/IEvidenceRepository.ts
import { Evidence } from '../entities/Evidence'

export interface IEvidenceRepository {
  save(evidence: Evidence): Promise<void>
  findById(id: string): Promise<Evidence | null>
  findByInvestigationId(investigationId: string): Promise<Evidence[]>
  findByWatcherId(watcherId: string): Promise<Evidence[]>
  update(evidence: Evidence): Promise<void>
  delete(id: string): Promise<void>
}
