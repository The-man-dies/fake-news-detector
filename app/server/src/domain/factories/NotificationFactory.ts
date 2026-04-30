// domain/factories/NotificationFactory.ts
import { Notification, NotificationType } from '../entities/Notification'
import { randomUUID } from 'crypto'

export const NOTIFICATION_THEME = {
  INVESTIGATION_REVIEW: 'Investigation review result',
  INVESTIGATION_FINAL_VERDICT: 'Final investigation verdict',
  PUBLICATION: 'Publication',
} as const

export interface CreateNotificationParams {
  type?: NotificationType
  theme: string
  message: string
  actorId: string
  publicationId?: string
}

export class NotificationFactory {
  static create(params: CreateNotificationParams): Notification {
    return new Notification(
      randomUUID(),
      params.type || 'ALERT',
      params.theme,
      params.message,
      params.actorId,
      false,
      new Date(),
      new Date(),
      params.publicationId,
    )
  }

  static createPublicationNotification(
    citizenId: string,
    publicationTheme: string,
    publicationMessage: string,
    publicationId: string,
  ): Notification {
    return this.create({
      type: 'PUBLICATION',
      theme: publicationTheme,
      message: publicationMessage,
      actorId: citizenId,
      publicationId,
    })
  }

  static createInvestigationNotification(
    journalistId: string,
    theme: string,
    message: string,
  ): Notification {
    return this.create({
      type: 'ALERT',
      theme,
      message,
      actorId: journalistId,
    })
  }

  static createCorrectionNotification(
    actorId: string,
    correctionTitle: string,
    correctionMessage: string,
    publicationId: string,
  ): Notification {
    return this.create({
      type: 'CORRECTION',
      theme: correctionTitle,
      message: correctionMessage,
      actorId,
      publicationId,
    })
  }

  static createPublicationForJournalist(
    journalistId: string,
    theme: string,
    message: string,
    publicationId: string,
  ): Notification {
    return this.create({
      type: 'PUBLICATION',
      theme,
      message,
      actorId: journalistId,
      publicationId,
    })
  }

  static createBatch(
    citizenIds: string[],
    message: string,
    publicationId?: string,
    theme?: string,
  ): Notification[] {
    return citizenIds.map((citizenId) =>
      this.create({
        type: 'PUBLICATION',
        theme: theme || 'Publication',
        message,
        actorId: citizenId,
        publicationId,
      }),
    )
  }
}
