// interfaces/routes/adminRoutes.ts
import { Hono } from 'hono'

const adminRoutes = new Hono()

adminRoutes.get('/dashboard', (c) => c.json({ message: 'Admin dashboard' }))
adminRoutes.post('/users/:id/ban', (c) => c.json({ message: 'User banned' }))
adminRoutes.post('/watcher/:id/approve', (c) =>
  c.json({ message: 'Watcher application approved' }),
)

export { adminRoutes }
