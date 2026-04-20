// domain/repositories/IUserRepository.ts
import { Citizen } from '../entities/Citizen'
import { Journalist } from '../entities/Journalist'
import { Admin } from '../entities/Admin'

export interface IUserRepository {
  findCitizenById(id: string): Promise<Citizen | null>
  findJournalistById(id: string): Promise<Journalist | null>
  findAdminById(id: string): Promise<Admin | null>
  updateCitizen(citizen: Citizen): Promise<void>
  updateJournalist(journalist: Journalist): Promise<void>
  banUser(userId: string, reason: string): Promise<void>
}
