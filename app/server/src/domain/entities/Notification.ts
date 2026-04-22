// domain/entities/Notification.ts

export type NotificationType = 'PUBLICATION' | 'CORRECTION' | 'ALERT'

export class Notification {
  constructor(
    public readonly id: string,
    public type: NotificationType,
    public theme: string,
    public message: string,
    public actorId: string,
    public isActive: boolean = true,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public publicationId?: string,
  ) {}

  markAsRead(): void {
    this.isActive = false
    this.updatedAt = new Date()
  }

  reactivate(): void {
    this.isActive = true
    this.updatedAt = new Date()
  }
}
