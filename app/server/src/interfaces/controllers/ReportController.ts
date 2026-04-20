// interfaces/controllers/ReportController.ts
import { Context } from 'hono'
import { FactCheckingService } from '../../application/services/FactCheckingService'

export class ReportController {
  constructor(private factCheckingService: FactCheckingService) {}

  async createReport(c: Context) {
    const body = await c.req.json()
    return c.json({ message: 'Signalement créé', data: body }, 201)
  }

  async listInbox(c: Context) {
    return c.json({ reports: [] })
  }
}
