// domain/entities/Admin.ts
export class Admin {
  constructor(
    public readonly id: string,
    public name: string,
  ) {}

  validateAnalysis(analysis: Analysis): void {}
  rejectAnalysis(analysis: Analysis, reason: string): void {}
  publishOfficially(analysis: Analysis): void {}
  publishCorrection(analysisId: string): void {}
  approveWatcherApplication(applicationId: string): void {}
  rejectWatcherApplication(applicationId: string): void {}
  banJournalist(journalistId: string, reason: string): void {}
  disableJournalist(journalistId: string, reason: string): void {}
  banCitizen(citizenId: string, reason: string): void {}
  disableCitizen(citizenId: string, reason: string): void {}
  addInboxSubject(subject: InboxSubject): void {}
  removeInboxSubject(subjectId: string): void {}
  getDashboard(): void {}
  getProfile(): void {}
}
