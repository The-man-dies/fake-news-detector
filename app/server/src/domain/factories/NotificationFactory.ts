// domain/factories/NotificationFactory.ts
import { Notification } from '../entities/Notification'
import { randomUUID } from 'crypto'

export class NotificationFactory {
  static create(
    citizenId: string,
    message: string,
    publicationId?: string,
  ): Notification {
    return new Notification(
      randomUUID(),
      citizenId,
      message,
      false,
      new Date(),
      publicationId,
    )
  }

  static createPublicationNotification(
    citizenId: string,
    publicationTitle: string,
    publicationId: string,
  ): Notification {
    return this.create(
      citizenId,
      `New publication: "${publicationTitle}" has been published`,
      publicationId,
    )
  }

  static createAnalysisNotification(
    journalistId: string,
    analysisId: string,
    status: string,
  ): Notification {
    return this.create(
      journalistId,
      `Your analysis ${analysisId} has been ${status}`,
    )
  }

  static createBatch(citizenIds: string[], message: string): Notification[] {
    return citizenIds.map((citizenId) => this.create(citizenId, message))
  }
}
