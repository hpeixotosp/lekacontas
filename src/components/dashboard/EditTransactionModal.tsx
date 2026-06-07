'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CATEGORIES } from '@/lib/utils'
import { Transaction } from '@/types/transaction'
import { toast } from 'sonner'
import { Edit2, TrendingUp, TrendingDown } from 'lucide-react'

interface EditTransactionModalProps {
  transaction: Transaction
  onClose: () => void
  onSuccess: () => void
}

export function EditTransactionModal({ transaction, onClose, onSuccess }: EditTransactionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState<'credit' | 'debit'>(transaction.type)
  const [form, setForm] = useState({
    date: transaction.date,
    description: transaction.description,
    amount: String(transaction.amount),
    category: transaction.category,
    installment_current: transaction.installment_current ? String(transaction.installment_current) : '',
    installment_total: transaction.installment_total ? String(transaction.installment_total) : '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch(`/api/transactions/${transaction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          type,
          amount: parseFloat(form.amount.replace(',', '.')),
          installment_current: form.installment_current ? parseInt(form.installment_current) : null,
          installment_total: form.installment_total ? parseInt(form.installment_total) : null,
        }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success('Transação atualizada com sucesso!')
        onSuccess()
      } else {
        toast.error(data.error || 'Erro ao atualizar')
      }
    } catch {
      toast.error('Erro ao atualizar transação')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md" id="modal-edit-transaction">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Edit2 className="w-5 h-5 text-blue-400" />
            Editar Transação
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Type Toggle */}
          <div className="flex rounded-xl overflow-hidden border border-slate-700 p-1 gap-1">
            <button
              type="button"
              onClick={() => setType('credit')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                type === 'credit'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Entrada
            </button>
            <button
              type="button"
              onClick={() => setType('debit')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                type === 'debit'
                  ? 'bg-red-500 text-white'
                  : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              Saída
            </button>
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-300 text-sm">Data *</Label>
            <Input
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-300 text-sm">Descrição *</Label>
            <Input
              type="text"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-300 text-sm">Valor (R$) *</Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-300 text-sm">Categoria</Label>
            <Select value={form.category} onValueChange={(v) => { if (v) setForm(f => ({ ...f, category: v })) }}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat} className="text-white hover:bg-slate-700 focus:bg-slate-700">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-sm">Parcela atual</Label>
              <Input
                type="number"
                min="1"
                value={form.installment_current}
                onChange={e => setForm(f => ({ ...f, installment_current: e.target.value }))}
                placeholder="Ex: 1"
                className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-sm">Total parcelas</Label>
              <Input
                type="number"
                min="1"
                value={form.installment_total}
                onChange={e => setForm(f => ({ ...f, installment_total: e.target.value }))}
                placeholder="Ex: 12"
                className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 font-semibold"
            >
              {isLoading ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
