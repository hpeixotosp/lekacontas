import { neon } from '@neondatabase/serverless'

export function getDb() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL não configurado. Crie um banco Postgres na Vercel e conecte ao projeto.'
    )
  }
  return neon(connectionString)
}
