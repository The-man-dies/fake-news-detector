import { type WatcherApplicationStatus } from '../entities/WatcherApplication'
import { WatcherApplication } from '../entities/WatcherApplication'

export interface IWatcherApplicationRepository {
  save(application: WatcherApplication): Promise<void>
  updateWatcherApplicationStatus(
    adminId: string,
    applicationId: string,
    status: WatcherApplicationStatus,
  ): Promise<void>
  findWatcherApplicationById(id: string): Promise<WatcherApplication | null>
  findAll(): Promise<WatcherApplication[]>
}
