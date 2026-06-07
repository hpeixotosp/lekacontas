import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export const dynamic = 'force-dynamic'

// GET /api/transactions?month=6&year=2026
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const month = searchParams.get('month')
  const year = searchParams.get('year')

  try {
    const sql = getDb()

    let data
    if (month && year) {
      const monthNum = parseInt(month)
      const yearNum = parseInt(year)
      const startDate = `${yearNum}-${String(monthNum).padStart(2, '0')}-01`
      const endDate = `${yearNum}-${String(monthNum).padStart(2, '0')}-31`
      data = await sql`
        SELECT * FROM transactions
        WHERE date >= ${startDate} AND date <= ${endDate}
        ORDER BY date ASC
      `
    } else {
      data = await sql`SELECT * FROM transactions ORDER BY date ASC`
    }

    return NextResponse.json({ data, success: true })
  } catch (error) {
    console.error('GET /api/transactions error:', error)
    return NextResponse.json({ error: 'Erro ao buscar transações', success: false }, { status: 500 })
  }
}

// POST /api/transactions
export async function POST(request: NextRequest) {
  try {
    const sql = getDb()
    const body = await request.json()
    const { date, description, amount, type, category, installment_current, installment_total } = body

    if (!date || !description || !amount || !type) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando', success: false }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO transactions (date, description, amount, type, category, installment_current, installment_total)
      VALUES (
        ${date},
        ${description},
        ${parseFloat(amount)},
        ${type},
        ${category || 'Outros'},
        ${installment_current || null},
        ${installment_total || null}
      )
      RETURNING *
    `

    return NextResponse.json({ data: result[0], success: true }, { status: 201 })
  } catch (error) {
    console.error('POST /api/transactions error:', error)
    return NextResponse.json({ error: 'Erro ao criar transação', success: false }, { status: 500 })
  }
}
