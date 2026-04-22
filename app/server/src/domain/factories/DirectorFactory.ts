// domain/factories/DirectorFactory.ts
import { Director, DirectorStatus } from '../entities/Director'
import { randomUUID } from 'crypto'

export interface CreateDirectorParams {
  name: string
  email: string
  status?: DirectorStatus
}

export class DirectorFactory {
  static create(params: CreateDirectorParams): Director {
    const id = randomUUID()
    return new Director(
      id,
      params.name,
      params.email,
      params.status || 'ACTIVE',
      new Date(),
      new Date(),
      new Date(),
    )
  }

  static createFromRegistration(name: string, email: string): Director {
    return this.create({
      name,
      email,
    })
  }
}
