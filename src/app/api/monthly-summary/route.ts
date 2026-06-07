import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// GET /api/monthly-summary - retorna resumo de todos os meses
export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('transactions')
      .select('date, amount, type')
      .order('date', { ascending: true })

    if (error) throw error

    const months = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const year = 2026
    const monthNames = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

    const summary = months.map(month => {
      const monthStr = String(month).padStart(2, '0')
      const monthTransactions = data?.filter(t => {
        const tDate = t.date
        // Jan 30 conta em fevereiro
        if (month === 2 && tDate === '2026-01-30') return true
        return tDate.startsWith(`${year}-${monthStr}`)
      }) || []

      const totalCredits = monthTransactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + Number(t.amount), 0)

      const totalDebits = monthTransactions
        .filter(t => t.type === 'debit')
        .reduce((sum, t) => sum + Number(t.amount), 0)

      return {
        month,
        year,
        name: monthNames[month],
        entradas: parseFloat(totalCredits.toFixed(2)),
        saidas: parseFloat(totalDebits.toFixed(2)),
        saldo: parseFloat((totalCredits - totalDebits).toFixed(2)),
      }
    })

    return NextResponse.json({ data: summary, success: true })
  } catch (error) {
    console.error('GET /api/monthly-summary error:', error)
    return NextResponse.json({ error: 'Erro ao buscar resumo', success: false }, { status: 500 })
  }
}
