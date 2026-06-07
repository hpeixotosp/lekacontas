'use client'

import { useState } from 'react'
import { Transaction } from '@/types/transaction'
import { formatCurrency, formatDate, CATEGORY_COLORS } from '@/lib/utils'
import { TrendingUp, TrendingDown, Edit2, Trash2, Tag, Calendar } from 'lucide-react'
import { EditTransactionModal } from './EditTransactionModal'
import { toast } from 'sonner'

interface TransactionListProps {
  transactions: Transaction[]
  isLoading?: boolean
  onUpdate: () => void
}

export function TransactionList({ transactions, isLoading, onUpdate }: TransactionListProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) return

    setDeletingId(id)
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        toast.success('Transação excluída com sucesso!')
        onUpdate()
      } else {
        toast.error('Erro ao excluir transação')
      }
    } catch {
      toast.error('Erro ao excluir transação')
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
          <Calendar className="w-8 h-8 opacity-40" />
        </div>
        <p className="text-lg font-medium text-slate-400">Nenhuma transação neste mês</p>
        <p className="text-sm text-slate-500 mt-1">Adicione uma nova transação acima</p>
      </div>
    )
  }

  // Agrupar por data
  const grouped = transactions.reduce((acc, t) => {
    const dateKey = t.date
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(t)
    return acc
  }, {} as Record<string, Transaction[]>)

  const sortedDates = Object.keys(grouped).sort((a, b) => a.localeCompare(b))

  return (
    <>
      <div className="space-y-4">
        {sortedDates.map(dateKey => (
          <div key={dateKey}>
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-500 font-medium px-2">
                {formatDate(dateKey)}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Transactions for this date */}
            <div className="space-y-2">
              {grouped[dateKey].map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={() => setEditingTransaction(transaction)}
                  onDelete={() => handleDelete(transaction.id)}
                  isDeleting={deletingId === transaction.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSuccess={() => {
            setEditingTransaction(null)
            onUpdate()
          }}
        />
      )}
    </>
  )
}

interface TransactionRowProps {
  transaction: Transaction
  onEdit: () => void
  onDelete: () => void
  isDeleting: boolean
}

function TransactionRow({ transaction, onEdit, onDelete, isDeleting }: TransactionRowProps) {
  const isCredit = transaction.type === 'credit'
  const categoryColor = CATEGORY_COLORS[transaction.category] || '#6b7280'

  return (
    <div
      className="group flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
      id={`transaction-${transaction.id}`}
    >
      {/* Type Icon */}
      <div className={`p-2 rounded-lg flex-shrink-0 ${isCredit ? 'bg-blue-500/15' : 'bg-red-500/15'}`}>
        {isCredit ? (
          <TrendingUp className="w-4 h-4 text-blue-400" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-400" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-medium text-slate-200 truncate">
            {transaction.description}
          </p>
          {transaction.installment_current && transaction.installment_total && (
            <span className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded-md bg-white/10 text-slate-400 font-mono">
              {transaction.installment_current}/{transaction.installment_total}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-3 h-3 text-slate-500" />
          <span
            className="text-xs font-medium"
            style={{ color: categoryColor }}
          >
            {transaction.category}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-bold tabular-nums ${isCredit ? 'text-blue-400' : 'text-red-400'}`}>
          {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
        <button
          onClick={onEdit}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-blue-400 transition-colors"
          id={`btn-edit-${transaction.id}`}
          title="Editar"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
          id={`btn-delete-${transaction.id}`}
          title="Excluir"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
