import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

const isMigration = process.argv.includes('migrate')

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: isMigration ? env('DIRECT_URL') : env('DATABASE_URL'),
  },
})
