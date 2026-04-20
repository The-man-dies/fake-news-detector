import { Notification } from '../entities/Notification'

export interface INotificationRepository {
  // Sauvegarder une notification
  save(notification: Notification): Promise<void>

  // Sauvegarder plusieurs notifications (batch)
  saveMany(notifications: Notification[]): Promise<void>

  // Trouver une notification par ID
  findById(id: string): Promise<Notification | null>

  // Trouver les notifications d'un cotoyen
  findByCitizenId(
    citizenId: string,
    optoons?: {
      skip?: number
      take?: number
      unreadOnly?: boolean // Si true, ne retourne que les notifications non lues
    },
  ): Promise<Notification[]>

  // Trouver les notifications non lues d'un citoyen
  findUnreadByCitizenId(citizendId: string): Promise<Notification[]>

  // Marquer une notification comme lue
  markAsRead(id: string): Promise<void>

  // Marquer toutes les notifications d'un citoyen comme lues
  markAllAsRead(citizenId: string): Promise<void>

  // Supprimer les notifications plus vielles que N jours
  deleteOlderThan(days: number): Promise<number>

  // Compter les notifications non lues d'un citoyen
  countUnreadByCitizenId(citizendId: string): Promise<number>

  // compter le nombre total de notifications
  count(): Promise<number>
}
