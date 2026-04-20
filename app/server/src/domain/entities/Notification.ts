// domain/entities/Notification.ts
export class Notification {
  constructor(
    public readonly id: string,
    public citizenId: string,
    public message: string,
    public isRead: boolean = false,
    public createdAt: Date = new Date(),
    public publicationId?: string,
  ) {}

  markAsRead(): void {
    this.isRead = true
  }
}
