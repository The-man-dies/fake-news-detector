// interfaces/routes/analysisRoutes.ts
import { Hono } from 'hono'

const analysisRoutes = new Hono()

analysisRoutes.get('/', (c) => c.json({ message: 'Analyses list' }))
analysisRoutes.post('/:id/approve', (c) =>
  c.json({ message: 'Analysis approved' }),
)
analysisRoutes.post('/:id/reject', (c) =>
  c.json({ message: 'Analysis rejected' }),
)

export { analysisRoutes }
