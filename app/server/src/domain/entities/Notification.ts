// domain/entities/Notification.ts

export type NotificationType = 'PUBLICATION' | 'CORRECTION' | 'ALERT'

export class Notification {
  constructor(
    public readonly id: string,
    public type: NotificationType = 'ALERT',
    public theme: string,
    public message: string,
    public actorId: string,
    public isRead: boolean = false,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public publicationId?: string,
  ) {}

  markAsRead(): void {
    this.isRead = true
    this.updatedAt = new Date()
  }

  markAsUnread(): void {
    this.isRead = false
    this.updatedAt = new Date()
  }
}
