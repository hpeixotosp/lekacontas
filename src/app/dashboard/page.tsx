'use client'

import { useState, useEffect, useCallback } from 'react'
import { MonthSelector } from '@/components/dashboard/MonthSelector'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { MonthlyChart } from '@/components/dashboard/MonthlyChart'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { AddTransactionModal } from '@/components/dashboard/AddTransactionModal'
import { Transaction } from '@/types/transaction'
import { PlusCircle, BarChart3, Database, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

interface ChartData {
  name: string
  month: number
  year: number
  entradas: number
  saidas: number
  saldo: number
}

export default function DashboardPage() {
  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState(6) // Junho atual
  const [selectedYear] = useState(2026)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
  const [isLoadingChart, setIsLoadingChart] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)

  const fetchTransactions = useCallback(async () => {
    setIsLoadingTransactions(true)
    try {
      const res = await fetch(`/api/transactions?month=${selectedMonth}&year=${selectedYear}`)
      const data = await res.json()
      if (data.success) {
        setTransactions(data.data || [])
      } else {
        toast.error('Erro ao carregar transações')
      }
    } catch {
      toast.error('Erro de conexão')
    } finally {
      setIsLoadingTransactions(false)
    }
  }, [selectedMonth, selectedYear])

  const fetchChartData = useCallback(async () => {
    setIsLoadingChart(true)
    try {
      const res = await fetch('/api/monthly-summary')
      const data = await res.json()
      if (data.success) {
        setChartData(data.data || [])
      }
    } catch {
      console.error('Erro ao buscar dados do gráfico')
    } finally {
      setIsLoadingChart(false)
    }
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    fetchChartData()
  }, [fetchChartData])

  const handleRefresh = () => {
    fetchTransactions()
    fetchChartData()
  }

  const handleSeed = async () => {
    if (!confirm('Isso irá apagar todos os dados atuais e inserir os dados iniciais. Confirma?')) return
    setIsSeeding(true)
    try {
      const res = await fetch('/api/seed', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        fetchTransactions()
        fetchChartData()
      } else {
        toast.error(data.error || 'Erro no seed')
      }
    } catch {
      toast.error('Erro ao executar seed')
    } finally {
      setIsSeeding(false)
    }
  }

  // Calcular resumo do mês
  const totalCredits = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalDebits = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalCredits - totalDebits

  // Calcular saldo acumulado (todos os meses)
  const accumulatedBalance = chartData.reduce((sum, m) => sum + m.saldo, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-700/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-12">
        
        {/* Header */}
        <header className="pt-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Leka Dashboard
                </h1>
                <p className="text-xs text-slate-400 font-medium">Controle financeiro pessoal</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all duration-200"
                title="Atualizar"
                id="btn-refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleSeed}
                disabled={isSeeding}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all duration-200 text-sm font-medium disabled:opacity-50"
                title="Reiniciar dados iniciais"
                id="btn-seed"
              >
                <Database className="w-4 h-4" />
                {isSeeding ? 'Carregando...' : 'Seed'}
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-105"
                id="btn-add-transaction"
              >
                <PlusCircle className="w-4 h-4" />
                Nova transação
              </button>
            </div>
          </div>
        </header>

        {/* Month Selector + Balance Banner */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-6 shadow-2xl shadow-blue-900/40 border border-blue-500/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <MonthSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={(month) => setSelectedMonth(month)}
            />
            <div className="text-right">
              <p className="text-xs text-blue-200 font-medium uppercase tracking-wider mb-1">
                Saldo acumulado (2026)
              </p>
              <p className={`text-2xl font-bold tabular-nums ${accumulatedBalance >= 0 ? 'text-white' : 'text-red-300'}`}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(accumulatedBalance)}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6">
          <SummaryCards
            totalCredits={totalCredits}
            totalDebits={totalDebits}
            balance={balance}
            isLoading={isLoadingTransactions}
          />
        </div>

        {/* Chart */}
        <div className="mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              Visão anual 2026
            </h2>
            <p className="text-xs text-slate-500">Fev – Dez</p>
          </div>
          <MonthlyChart data={chartData} isLoading={isLoadingChart} />
        </div>

        {/* Transactions */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">
              Extrato —{' '}
              <span className="text-blue-400">
                {['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][selectedMonth]} {selectedYear}
              </span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {transactions.length} {transactions.length === 1 ? 'transação' : 'transações'}
            </span>
          </div>
          <TransactionList
            transactions={transactions}
            isLoading={isLoadingTransactions}
            onUpdate={handleRefresh}
          />
        </div>
      </div>

      {/* Add Modal */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false)
          handleRefresh()
        }}
        defaultMonth={selectedMonth}
        defaultYear={selectedYear}
      />
    </div>
  )
}
