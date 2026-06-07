import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /api/transactions?month=6&year=2026
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const month = searchParams.get('month')
  const year = searchParams.get('year')

  try {
    const supabase = getSupabase()
    let query = supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: true })

    if (month && year) {
      const monthNum = parseInt(month)
      const yearNum = parseInt(year)
      const startDate = `${yearNum}-${String(monthNum).padStart(2, '0')}-01`
      const endDate = `${yearNum}-${String(monthNum).padStart(2, '0')}-31`
      query = query.gte('date', startDate).lte('date', endDate)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data, success: true })
  } catch (error) {
    console.error('GET /api/transactions error:', error)
    return NextResponse.json({ error: 'Erro ao buscar transações', success: false }, { status: 500 })
  }
}

// POST /api/transactions
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const body = await request.json()
    const { date, description, amount, type, category, installment_current, installment_total } = body

    if (!date || !description || !amount || !type) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando', success: false }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        date,
        description,
        amount: parseFloat(amount),
        type,
        category: category || 'Outros',
        installment_current: installment_current || null,
        installment_total: installment_total || null,
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, success: true }, { status: 201 })
  } catch (error) {
    console.error('POST /api/transactions error:', error)
    return NextResponse.json({ error: 'Erro ao criar transação', success: false }, { status: 500 })
  }
}
