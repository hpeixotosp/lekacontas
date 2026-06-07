export type TransactionType = 'credit' | 'debit'

export type TransactionCategory =
  | 'Crédito'
  | 'Shopee'
  | 'Cartão'
  | 'Cartão Leka Caixa'
  | 'Máquina Gabi'
  | 'Outros'

export interface Transaction {
  id: string
  date: string // ISO date string YYYY-MM-DD
  description: string
  amount: number
  type: TransactionType
  category: TransactionCategory | string
  installment_current?: number | null
  installment_total?: number | null
  created_at?: string
  updated_at?: string
}

export interface MonthlySummary {
  month: number
  year: number
  totalCredits: number
  totalDebits: number
  balance: number
  transactions: Transaction[]
}

export interface MonthlyChartData {
  name: string
  month: number
  year: number
  entradas: number
  saidas: number
  saldo: number
}
