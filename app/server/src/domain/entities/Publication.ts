// domain/entities/Publication.ts
export class Publication {
  constructor(
    public readonly id: string,
    public analysisId: string,
    public approvedById: string,
    public finalVerdict: string,
    public publicationDate: Date = new Date(),
    public isCorrection: boolean = false,
  ) {}

  generateBadgeNotification(): string {
    return `New publication: ${this.finalVerdict.substring(0, 50)}`
  }
}
