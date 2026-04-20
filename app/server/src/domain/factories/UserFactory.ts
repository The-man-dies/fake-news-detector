// domain/factories/UserFactory.ts
import { Citizen, CitizenStatus } from '../entities/Citizen'
import { Journalist, JournalistStatus } from '../entities/Journalist'
import { Admin } from '../entities/Admin'
import { randomUUID } from 'crypto'

export interface CreateCitizenParams {
  id?: string
  email: string
  engagementScore?: number
  status?: CitizenStatus
}

export interface CreateJournalistParams {
  id?: string
  email: string
  specialty: string
  status?: JournalistStatus
}

export class UserFactory {
  static createCitizen(params: CreateCitizenParams): Citizen {
    return new Citizen(
      params.id || randomUUID(),
      params.engagementScore || 0,
      params.status || 'REGULAR',
      0,
      3,
    )
  }

  static createWatcherCitizen(email: string): Citizen {
    return this.createCitizen({
      email,
      status: 'WATCHER',
      engagementScore: 50,
    })
  }

  static createJournalist(params: CreateJournalistParams): Journalist {
    return new Journalist(
      params.id || randomUUID(),
      params.specialty,
      params.status || 'ACTIVE',
      0,
      1,
    )
  }

  static createAdmin(name: string, id?: string): Admin {
    return new Admin(id || randomUUID(), name)
  }
}
