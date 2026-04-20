// index.ts - DDD Entry Point
import { Hono } from 'hono'
import { reportRoutes } from './interfaces/routes/reportRoutes'
import { analysisRoutes } from './interfaces/routes/analysisRoutes'
import { adminRoutes } from './interfaces/routes/adminRoutes'

const app = new Hono()

// Routes
app.route('/api/reports', reportRoutes)
app.route('/api/analyses', analysisRoutes)
app.route('/api/admin', adminRoutes)

// Health check
app.get('/health', (c) =>
  c.json({
    status: 'ok',
    architecture: 'DDD',
    timestamp: new Date().toISOString(),
  }),
)

app.onError((err, c) => {
  console.error(`Error: ${err.message}`)
  return c.json({ error: 'Internal server error' }, 500)
})

export default app
