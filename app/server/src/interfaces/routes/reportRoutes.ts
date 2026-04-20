// interfaces/routes/reportRoutes.ts
import { Hono } from 'hono'

const reportRoutes = new Hono()

reportRoutes.get('/', (c) => c.json({ message: 'Reports list' }))
reportRoutes.post('/', (c) => c.json({ message: 'Report created' }, 201))
reportRoutes.get('/inbox', (c) => c.json({ message: 'Inbox list' }))

export { reportRoutes }
