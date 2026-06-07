import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export const dynamic = 'force-dynamic'

// PUT /api/transactions/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const sql = getDb()
    const body = await request.json()
    const { date, description, amount, type, category, installment_current, installment_total } = body

    const result = await sql`
      UPDATE transactions
      SET
        date = ${date},
        description = ${description},
        amount = ${parseFloat(amount)},
        type = ${type},
        category = ${category},
        installment_current = ${installment_current || null},
        installment_total = ${installment_total || null},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Transação não encontrada', success: false }, { status: 404 })
    }

    return NextResponse.json({ data: result[0], success: true })
  } catch (error) {
    console.error('PUT /api/transactions/[id] error:', error)
    return NextResponse.json({ error: 'Erro ao atualizar transação', success: false }, { status: 500 })
  }
}

// DELETE /api/transactions/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const sql = getDb()
    await sql`DELETE FROM transactions WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/transactions/[id] error:', error)
    return NextResponse.json({ error: 'Erro ao deletar transação', success: false }, { status: 500 })
  }
}
