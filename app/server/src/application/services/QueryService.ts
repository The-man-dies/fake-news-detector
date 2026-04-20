// application/services/QueryService.ts
import { IReportRepository } from '../../domain/repositories/IReportRepository'
import { IAnalysisRepository } from '../../domain/repositories/IAnalysisRepository'
import { IUserRepository } from '../../domain/repositories/IUserRepository'

export class QueryService {
  constructor(
    private reportRepository: IReportRepository,
    private analysisRepository: IAnalysisRepository,
    private userRepository: IUserRepository,
  ) {}

  async getCitizenHistory(citizenId: string): Promise<any> {
    return await this.reportRepository.findByCitizenId(citizenId)
  }

  async getCitizenProfile(citizenId: string): Promise<any> {
    return await this.userRepository.findCitizenById(citizenId)
  }

  async getJournalistHistory(journalistId: string): Promise<any> {
    return await this.analysisRepository.findByJournalistId(journalistId)
  }

  async getJournalistProfile(journalistId: string): Promise<any> {
    return await this.userRepository.findJournalistById(journalistId)
  }

  async getAdminDashboard(adminId: string): Promise<any> {
    const pendingReviews = await this.analysisRepository.findPendingReviews()
    return { pendingReviews }
  }

  async getAdminProfile(adminId: string): Promise<any> {
    return await this.userRepository.findAdminById(adminId)
  }

  async getNotifications(userId: string): Promise<any> {
    return []
  }

  async listAvailableInbox(): Promise<any> {
    return await this.reportRepository.listInbox()
  }
}
