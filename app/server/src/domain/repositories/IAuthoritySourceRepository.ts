// domain/repositories/IAuthoritySourceRepository.ts
import { AuthoritySource } from '../entities/AuthoritySource'

export interface IAuthoritySourceRepository {
  save(authoritySource: AuthoritySource): Promise<void>
  findById(id: string): Promise<AuthoritySource | null>
  findAll(): Promise<AuthoritySource[]>
  findByType(type: string): Promise<AuthoritySource[]>
  delete(id: string): Promise<void>
}
