// application/services/UserManagementService.ts
import { IDirectorRepository } from '../../domain/repositories/IDirectorRepository'
import { IJournalistRepository } from '../../domain/repositories/IJournalistRepository'
import { JournalistFactory } from '../../domain/factories/JournalistFactory'
import { JournalistStatusReason } from '../../domain/entities/Journalist'
import { BusinessRuleError } from '../../shared/errors'

export class UserManagementService {
  constructor(
    private directorRepository: IDirectorRepository,
    private journalistRepository: IJournalistRepository,
  ) {}

  async createJournalist(
    directorId: string,
    name: string,
    email: string,
  ): Promise<void> {
    const director = await this.directorRepository.findById(directorId)
    if (!director) {
      throw new BusinessRuleError('Director not found')
    }

    if (!director.isActive()) {
      throw new BusinessRuleError('Director account is not active')
    }

    const existingJournalist = await this.journalistRepository.findByEmail(email)
    if (existingJournalist) {
      throw new BusinessRuleError('A journalist with this email already exists')
    }

    const journalist = JournalistFactory.createFromRegistration(name, email)

    await this.journalistRepository.save(journalist)
  }

  async banJournalist(
    directorId: string,
    journalistId: string,
    reason: JournalistStatusReason,
    details?: string,
  ): Promise<void> {
    const director = await this.directorRepository.findById(directorId)
    if (!director) {
      throw new BusinessRuleError('Director not found')
    }

    const journalist = await this.journalistRepository.findById(journalistId)
    if (!journalist) {
      throw new BusinessRuleError('Journalist not found')
    }

    director.banJournalist(journalist, reason, details)

    await this.journalistRepository.update(journalist)
  }

  async disableJournalist(
    directorId: string,
    journalistId: string,
    reason: JournalistStatusReason,
    details?: string,
  ): Promise<void> {
    const director = await this.directorRepository.findById(directorId)
    if (!director) {
      throw new BusinessRuleError('Director not found')
    }

    const journalist = await this.journalistRepository.findById(journalistId)
    if (!journalist) {
      throw new BusinessRuleError('Journalist not found')
    }

    director.disableJournalist(journalist, reason, details)

    await this.journalistRepository.update(journalist)
  }

  async activateJournalist(
    directorId: string,
    journalistId: string,
  ): Promise<void> {
    const director = await this.directorRepository.findById(directorId)
    if (!director) {
      throw new BusinessRuleError('Director not found')
    }

    const journalist = await this.journalistRepository.findById(journalistId)
    if (!journalist) {
      throw new BusinessRuleError('Journalist not found')
    }

    director.activateJournalist(journalist)

    await this.journalistRepository.update(journalist)
  }
}
