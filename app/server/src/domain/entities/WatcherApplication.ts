export type WatcherApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export class WatcherApplication {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly motivation: string,
    public status: WatcherApplicationStatus = 'PENDING',
  ) {}

  changeStatus(newStatus: WatcherApplicationStatus): void {
    this.status = newStatus
  }
}
