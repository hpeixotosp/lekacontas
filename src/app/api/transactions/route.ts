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
      const lastDay = new Date(yearNum, monthNum, 0).getDate()
      const startDate = `${yearNum}-${String(monthNum).padStart(2, '0')}-01`
      const endDate = `${yearNum}-${String(monthNum).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`
      data = await sql`
        SELECT id, date::text as date, description, amount, type, category, installment_current, installment_total FROM transactions
        WHERE date >= ${startDate} AND date <= ${endDate}
        ORDER BY date ASC
      `
    } else {
      data = await sql`SELECT id, date::text as date, description, amount, type, category, installment_current, installment_total FROM transactions ORDER BY date ASC`
    }

    const formattedData = data.map((t: any) => ({
      ...t,
      amount: Number(t.amount)
    }))

    return NextResponse.json({ data: formattedData, success: true })
  } catch (error) {
    console.error('GET /api/transactions error:', error)
    return NextResponse.json({ error: 'Erro ao buscar transações', success: false }, { status: 500 })
  }
}

function getInstallmentDate(baseDateStr: string, monthsToAdd: number): string {
  const [year, month, day] = baseDateStr.split('-').map(Number)
  const lastDayOfNewMonth = new Date(year, month + monthsToAdd, 0).getDate()
  const targetDay = Math.min(day, lastDayOfNewMonth)
  
  const finalDate = new Date(year, month - 1 + monthsToAdd, targetDay)
  const y = finalDate.getFullYear()
  const m = String(finalDate.getMonth() + 1).padStart(2, '0')
  const rDay = String(finalDate.getDate()).padStart(2, '0')
  return `${y}-${m}-${rDay}`
}

// POST /api/transactions
export async function POST(request: NextRequest) {
  try {
    const sql = getDb()
    const body = await request.json()
    const { date, description, amount, type, category, installment_total } = body

    if (!date || !description || !amount || !type) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando', success: false }, { status: 400 })
    }

    const totalInstallments = installment_total ? parseInt(String(installment_total)) : 1

    if (totalInstallments > 1) {
      const totalAmount = parseFloat(String(amount))
      const installmentAmountBase = Math.round((totalAmount / totalInstallments) * 100) / 100
      let sumCreated = 0
      const insertPromises = []

      for (let i = 1; i <= totalInstallments; i++) {
        let currentAmount = installmentAmountBase
        if (i === totalInstallments) {
          currentAmount = Math.round((totalAmount - sumCreated) * 100) / 100
        } else {
          sumCreated += installmentAmountBase
        }

        const installmentDate = getInstallmentDate(date, i - 1)
        
        insertPromises.push(
          sql`
            INSERT INTO transactions (date, description, amount, type, category, installment_current, installment_total)
            VALUES (
              ${installmentDate},
              ${description},
              ${currentAmount},
              ${type},
              ${category || 'Outros'},
              ${i},
              ${totalInstallments}
            )
          `
        )
      }

      await Promise.all(insertPromises)
      
      return NextResponse.json({ success: true }, { status: 201 })
    } else {
      const result = await sql`
        INSERT INTO transactions (date, description, amount, type, category, installment_current, installment_total)
        VALUES (
          ${date},
          ${description},
          ${parseFloat(String(amount))},
          ${type},
          ${category || 'Outros'},
          NULL,
          NULL
        )
        RETURNING *
      `
      return NextResponse.json({ data: result[0], success: true }, { status: 201 })
    }
  } catch (error) {
    console.error('POST /api/transactions error:', error)
    return NextResponse.json({ error: 'Erro ao criar transação', success: false }, { status: 500 })
  }
}
