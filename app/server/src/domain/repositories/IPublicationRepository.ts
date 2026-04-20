import { Publication } from '../entities/Publication'

export interface IPublicationRepository {
  // Sauvegarder une publication
  save(publication: Publication): Promise<void>

  // Trouve une publication par son ID
  findById(id: string): Promise<Publication | null>

  // Trouver une publication par ID d'analyse (unique)
  findByAnalysisId(analysisId: string): Promise<Publication | null>

  // Trouver toutes les publications (avec pagination)
  findAll(option?: {
    skip?: number
    take?: number
    orderBy?: 'asc' | 'desc'
  }): Promise<Publication[]>

  // Trouver les publications par admin approbateur
  findByApproverId(adminId: string): Promise<Publication[]>

  // supprimer une publication (soft delete)
  delete(id: string): Promise<void>

  // Compter le nombre total de publications
  count(): Promise<number>
}
