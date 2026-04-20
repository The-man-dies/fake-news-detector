// domain/repositories/IReportRepository.ts
import { Report } from '../entities/Report'

export interface IReportRepository {
  save(report: Report): Promise<void>
  findById(id: string): Promise<Report | null>
  listInbox(): Promise<Report[]>
  findByCitizenId(citizenId: string): Promise<Report[]>
}
