// domain/repositories/ICitizenRepository.ts
import type { Citizen } from '../entities/Citizen'

export interface ICitizenRepository {
  save(citizen: Citizen): Promise<void>
  findById(id: string): Promise<Citizen | null>
  findByEmail(email: string): Promise<Citizen | null>
  findAll(): Promise<Citizen[]>
  findByStatus(status: string): Promise<Citizen[]>
  findByCitizenType(type: string): Promise<Citizen[]>
  update(citizen: Citizen): Promise<void>
  delete(id: string): Promise<void>
}
