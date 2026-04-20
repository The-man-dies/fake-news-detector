// domain/repositories/IUserRepository.ts
import { Citizen } from '../entities/Citizen'
import { Journalist } from '../entities/Journalist'
import { Admin } from '../entities/Admin'

export interface IUserRepository {
  findCitizenById(id: string): Promise<Citizen | null>
  getAllCitizens(): Promise<Citizen[]>
  getAllJournalists(): Promise<Journalist[]>
  findJournalistById(id: string): Promise<Journalist | null>
  findAdminById(id: string): Promise<Admin | null>
  updateCitizen(citizen: Citizen): Promise<void>
  updateJournalist(journalist: Journalist): Promise<void>
  banUser(adminId: string, userId: string, reason: string): Promise<void>
  disableUser(adminId: string, userId: string, reason: string): Promise<void>
  upgradeToWatcher(adminId: string, userId: string): Promise<void>
}
