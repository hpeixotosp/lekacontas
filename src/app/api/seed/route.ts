import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { seedTransactions } from '@/lib/seed-data'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const supabase = getSupabase()

    // Limpar tabela existente
    const { error: deleteError } = await supabase
      .from('transactions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    if (deleteError) {
      console.error('Delete error:', deleteError)
    }

    // Inserir dados de seed em lotes
    const batchSize = 50
    let inserted = 0

    for (let i = 0; i < seedTransactions.length; i += batchSize) {
      const batch = seedTransactions.slice(i, i + batchSize)
      const { data, error } = await supabase
        .from('transactions')
        .insert(batch)
        .select()

      if (error) throw error
      inserted += data?.length || 0
    }

    return NextResponse.json({
      success: true,
      message: `Seed concluído! ${inserted} transações inseridas.`,
      count: inserted,
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Erro ao executar seed', success: false, details: String(error) }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST para executar o seed' })
}
