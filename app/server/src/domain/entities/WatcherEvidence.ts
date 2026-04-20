// domain/entities/WatcherEvidence.ts
export class WatcherEvidence {
  constructor(
    public readonly id: string,
    public analysisId: string,
    public watcherId: string,
    public artifact: string,
    public fileUrl?: string,
    public submissionDate: Date = new Date(),
  ) {}
}
