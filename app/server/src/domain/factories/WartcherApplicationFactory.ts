import {
  WatcherApplication,
  type WatcherApplicationStatus,
} from '../entities/WatcherApplication'
import { randomUUID } from 'crypto'

type CreateWatcherApplicationParams = {
  userId: string
  motivation: string
}

export class WatcherApplicationFactory {
  static create(params: CreateWatcherApplicationParams): WatcherApplication {
    return new WatcherApplication(
      randomUUID(),
      params.userId,
      params.motivation,
      'PENDING' as WatcherApplicationStatus,
    )
  }
}
