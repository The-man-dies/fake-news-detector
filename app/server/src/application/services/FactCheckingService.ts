// application/services/FactCheckingService.ts
import { IReportRepository } from '../../domain/repositories/IReportRepository'
import { IInvestigationRepository } from '../../domain/repositories'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { IPublicationRepository } from '../../domain/repositories/IPublicationRepository'
import { IWatcherApplicationRepository } from '../../domain/repositories/IWatcherApplicationRepository'
import { INotificationRepository } from '../../domain/repositories'
import { ReportFactory } from '../../domain/factories/ReportFactory'
import { CreateAnalysisParams } from '../../domain/factories/AnalysisFactory'
import { AnalysisFactory } from '../../domain/factories/AnalysisFactory'
import { PublicationFactory } from '../../domain/factories/PublicationFactory'
import { NotificationFactory } from '../../domain/factories/NotificationFactory'
import { WatcherApplicationFactory } from '../../domain/factories/WatcherApplicationFactory'
import { WatcherEvidenceFactory } from '../../domain/factories/WatcherEvidenceFactory'
import { Publication } from '../../domain/entities/Publication'
import { WatcherApplicationStatus } from '../../domain/entities/WatcherApplication'

export class FactCheckingService {
  constructor(
    private reportRepository: IReportRepository,
    private analysisRepository: IAnalysisRepository,
    private userRepository: IUserRepository,
    private publicationRepository: IPublicationRepository,
    private notificationRepository: INotificationRepository,
    private watcherApplicationRepository: IWatcherApplicationRepository,
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

  async handleNewAnalysis(params: CreateAnalysisParams): Promise<void> {
    const journalist = await this.userRepository.findJournalistById(
      params.journalistId,
    )
    if (!journalist) throw new Error('Journalist not found')
    const analysis = AnalysisFactory.create(params)
    await this.analysisRepository.save(analysis)

    // Notify Journalist
    await this.handleNotification(
      params.journalistId,
      `Your analysis for report ${params.reportId} has been created`,
    )
  }

  async handleAdminApproval(
    adminId: string,
    analysisId: string,
  ): Promise<void> {
    const analysis = await this.analysisRepository.findById(analysisId)
    if (!analysis) throw new Error('Analysis not found')

    const publication = PublicationFactory.createFromAnalysis(analysis, adminId)
    await this.handlePublication(publication)

    // Notify journalist
    await this.handleNotification(
      analysis.journalistId,
      `Your analysis ${analysisId} has been approved and published`,
      publication.id,
    )
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

    // Notify journalist
    await this.handleNotification(
      analysis.journalistId,
      `Your analysis ${analysisId} was rejected: ${reason}`,
    )
  }

  async handlePublication(publication: Publication): Promise<void> {
    // Save publication
    await this.publicationRepository.save(publication)

    // Notify all citizens who follow this topic (optional)
    const allCitizens = await this.userRepository.getAllCitizens()
    if (allCitizens.length > 0) {
      const notifications = NotificationFactory.createBatch(
        allCitizens.map((c) => c.id),
        `New publication: "${publication.finalVerdict.substring(0, 100)}"`,
        publication.id,
      )
      await this.notificationRepository.saveMany(notifications)
    }
  }

  async handleNotification(
    citizenId: string,
    message: string,
    publicationId?: string,
  ): Promise<void> {
    const notification = NotificationFactory.create({
      type: publicationId ? 'PUBLICATION' : 'ALERT',
      theme: publicationId ? 'Publication' : 'Alerte',
      message,
      actorId: citizenId,
      publicationId,
    })
    await this.notificationRepository.save(notification)
  }

  async handleBatchNotification(
    citizenIds: string[],
    message: string,
    publicationId?: string,
  ): Promise<void> {
    const notifications = NotificationFactory.createBatch(
      citizenIds,
      message,
      publicationId,
    )
    await this.notificationRepository.saveMany(notifications)
  }

  async handleWatcherEvidenceSubmission(
    citizenId: string,
    analysisId: string,
    artifact: string,
    fileUrl?: string,
  ): Promise<void> {
    const citizen = await this.userRepository.findCitizenById(citizenId)
    if (!citizen?.isWatcher()) {
      throw new Error('Only watchers can submit evidence')
    }

    const analysis = await this.analysisRepository.findById(analysisId)
    if (!analysis) throw new Error('Analysis not found')

    const evidence = fileUrl
      ? WatcherEvidenceFactory.createWithFile(
          analysisId,
          citizenId,
          artifact,
          fileUrl,
        )
      : WatcherEvidenceFactory.createTextEvidence(
          analysisId,
          citizenId,
          artifact,
        )

    await this.analysisRepository.addEvidence(analysisId, evidence)

    // Notify journalist
    await this.handleNotification(
      analysis.journalistId,
      `New evidence submitted for analysis ${analysisId}`,
    )
  }

  async handleJournalistBan(
    adminId: string,
    journalistId: string,
    reason: string,
  ): Promise<void> {
    const journalist =
      await this.userRepository.findJournalistById(journalistId)
    if (!journalist) throw new Error('Journalist not found')

    // Implementation depends on your UserRepository
    await this.userRepository.banUser(adminId, journalistId, reason)

    // Notify journalist
    await this.handleNotification(
      journalistId,
      `Your account has been banned: ${reason}`,
    )
  }

  async handleJournalistDisable(
    adminId: string,
    journalistId: string,
    reason: string,
  ): Promise<void> {
    const journalist =
      await this.userRepository.findJournalistById(journalistId)
    if (!journalist) throw new Error('Journalist not found')

    await this.userRepository.disableUser(adminId, journalistId, reason)

    await this.handleNotification(
      journalistId,
      `Your account has been disabled: ${reason}`,
    )
  }

  async handleCitizenBan(
    adminId: string,
    citizenId: string,
    reason: string,
  ): Promise<void> {
    const citizen = await this.userRepository.findCitizenById(citizenId)
    if (!citizen) throw new Error('Citizen not found')

    await this.userRepository.banUser(adminId, citizenId, reason)

    await this.handleNotification(
      citizenId,
      `Your account has been banned: ${reason}`,
    )
  }

  async handleWatcherApplication(
    adminId: string,
    applicationId: string,
    decision: string,
  ): Promise<void> {
    const application =
      await this.watcherApplicationRepository.findWatcherApplicationById(
        applicationId,
      )
    if (!application) throw new Error('Application not found')

    if (decision === 'APPROVED') {
      await this.userRepository.upgradeToWatcher(adminId, application.userId)
      await this.handleNotification(
        application.userId,
        'Your watcher application has been approved! You can now submit evidence.',
      )
    } else {
      await this.handleNotification(
        application.userId,
        'Your watcher application has been rejected.',
      )
    }

    await this.watcherApplicationRepository.updateWatcherApplicationStatus(
      adminId,
      applicationId,
      decision as WatcherApplicationStatus,
    )
  }

  async handleNewWatcherApplication(
    userId: string,
    motivation: string,
  ): Promise<void> {
    const user = await this.userRepository.findCitizenById(userId)
    if (!user) throw new Error('User not found')
    if (user.isWatcher()) {
      throw new Error('You are already a watcher')
    }

    const application = WatcherApplicationFactory.create({
      userId,
      motivation,
    })
    await this.watcherApplicationRepository.save(application)
  }
}
