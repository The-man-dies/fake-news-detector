import { IInboxSubjectRepository } from '../../domain/repositories/IInboxSubjectRepository'
import { IReportRepository } from '../../domain/repositories'
import { Report } from '../../domain/entities/Report'
import { InboxSubject } from '../../domain/value-objects/InboxSubject'
import { InboxSubjectFactory } from '../../domain/factories/InboxSubjectFactory'
import { ReportFactory } from '../../domain/factories/ReportFactory'

export class InboxService {
  constructor(
    private inboxSubjectRepository: IInboxSubjectRepository,
    private reportRepository: IReportRepository,
  ) { }

  async buildInboxSubjectFromReport(reportId: string): Promise<InboxSubject> {
    const report = await this.reportRepository.findById(reportId)
    if (!report) {
      throw new Error('Report not found')
    }
    const subject = InboxSubjectFactory.createFromExisting(report)
    await this.inboxSubjectRepository.add(subject)
    return subject
  }
}
