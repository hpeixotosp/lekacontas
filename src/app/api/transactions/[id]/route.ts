import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// PUT /api/transactions/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const supabase = getSupabase()
    const body = await request.json()
    const { date, description, amount, type, category, installment_current, installment_total } = body

    const { data, error } = await supabase
      .from('transactions')
      .update({
        date,
        description,
        amount: parseFloat(amount),
        type,
        category,
        installment_current: installment_current || null,
        installment_total: installment_total || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, success: true })
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
    const supabase = getSupabase()
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/transactions/[id] error:', error)
    return NextResponse.json({ error: 'Erro ao deletar transação', success: false }, { status: 500 })
  }
}
