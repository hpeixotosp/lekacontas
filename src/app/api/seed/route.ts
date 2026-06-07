import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { seedTransactions } from '@/lib/seed-data'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const sql = getDb()

    // Limpar tabela
    await sql`DELETE FROM transactions`

    // Inserir em lotes de 50
    const batchSize = 50
    let inserted = 0

    for (let i = 0; i < seedTransactions.length; i += batchSize) {
      const batch = seedTransactions.slice(i, i + batchSize)

      for (const t of batch) {
        await sql`
          INSERT INTO transactions (date, description, amount, type, category, installment_current, installment_total)
          VALUES (
            ${t.date},
            ${t.description},
            ${t.amount},
            ${t.type},
            ${t.category},
            ${t.installment_current ?? null},
            ${t.installment_total ?? null}
          )
        `
        inserted++
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seed concluído! ${inserted} transações inseridas.`,
      count: inserted,
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({
      error: 'Erro ao executar seed',
      success: false,
      details: String(error),
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST para executar o seed' })
}
