'use client'

import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface SummaryCardsProps {
  totalCredits: number
  totalDebits: number
  balance: number
  isLoading?: boolean
}

export function SummaryCards({ totalCredits, totalDebits, balance, isLoading }: SummaryCardsProps) {
  const cards = [
    {
      id: 'card-credits',
      label: 'Entradas',
      value: totalCredits,
      icon: TrendingUp,
      colorClass: 'text-blue-400',
      bgClass: 'bg-blue-500/15 border-blue-500/30',
      iconBg: 'bg-blue-500/20',
      valueClass: 'text-blue-400',
    },
    {
      id: 'card-debits',
      label: 'Saídas',
      value: totalDebits,
      icon: TrendingDown,
      colorClass: 'text-red-400',
      bgClass: 'bg-red-500/15 border-red-500/30',
      iconBg: 'bg-red-500/20',
      valueClass: 'text-red-400',
    },
    {
      id: 'card-balance',
      label: 'Saldo do Mês',
      value: balance,
      icon: Wallet,
      colorClass: balance >= 0 ? 'text-blue-400' : 'text-red-400',
      bgClass: balance >= 0 ? 'bg-blue-500/15 border-blue-500/30' : 'bg-red-500/15 border-red-500/30',
      iconBg: balance >= 0 ? 'bg-blue-500/20' : 'bg-red-500/20',
      valueClass: balance >= 0 ? 'text-blue-400' : 'text-red-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.id}
            id={card.id}
            className={`rounded-2xl border backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${card.bgClass}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                <Icon className={`w-5 h-5 ${card.colorClass}`} />
              </div>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                {card.label}
              </span>
            </div>
            {isLoading ? (
              <div className="h-8 bg-white/10 rounded-lg animate-pulse" />
            ) : (
              <p className={`text-2xl font-bold ${card.valueClass} tabular-nums`}>
                {formatCurrency(card.value)}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
