// application/services/FactCheckingService.ts
import { IReportRepository } from '../../domain/repositories/IReportRepository'
import { IAnalysisRepository } from '../../domain/repositories/IAnalysisRepository'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { ReportFactory } from '../../domain/factories/ReportFactory'
import { AnalysisFactory } from '../../domain/factories/AnalysisFactory'
import { PublicationFactory } from '../../domain/factories/PublicationFactory'
import { NotificationFactory } from '../../domain/factories/NotificationFactory'

export class FactCheckingService {
  constructor(
    private reportRepository: IReportRepository,
    private analysisRepository: IAnalysisRepository,
    private userRepository: IUserRepository,
  ) {}

  async handleNewReport(
    citizenId: string,
    content: string,
    mediaUrl?: string,
  ): Promise<void> {
    const citizen = await this.userRepository.findCitizenById(citizenId)
    if (!citizen) throw new Error('Citizen not found')

    if (!citizen.canSubmitReport()) {
      throw new Error('Maximum number of open reports reached')
    }

    const report = ReportFactory.create({ content, mediaUrl, citizenId })
    await this.reportRepository.save(report)
  }

  async handleAdminApproval(
    adminId: string,
    analysisId: string,
  ): Promise<void> {
    const analysis = await this.analysisRepository.findById(analysisId)
    if (!analysis) throw new Error('Analysis not found')

    const publication = PublicationFactory.createFromAnalysis(analysis, adminId)
    // Save publication and notify
  }

  async handleAdminRejection(
    adminId: string,
    analysisId: string,
    reason: string,
  ): Promise<void> {
    const analysis = await this.analysisRepository.findById(analysisId)
    if (!analysis) throw new Error('Analysis not found')

    analysis.applyFeedback(reason)
    await this.analysisRepository.save(analysis)
  }

  async handleWatcherEvidenceSubmission(
    citizenId: string,
    dossierId: string,
    artifact: any,
  ): Promise<void> {}
  async handleJournalistBan(
    adminId: string,
    journalistId: string,
    reason: string,
  ): Promise<void> {}
  async handleJournalistDisable(
    adminId: string,
    journalistId: string,
    reason: string,
  ): Promise<void> {}
  async handleCitizenBan(
    adminId: string,
    citizenId: string,
    reason: string,
  ): Promise<void> {}
  async handleWatcherApplication(
    adminId: string,
    applicationId: string,
    decision: string,
  ): Promise<void> {}
}
