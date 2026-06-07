'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CATEGORIES } from '@/lib/utils'
import { toast } from 'sonner'
import { PlusCircle, TrendingUp, TrendingDown } from 'lucide-react'

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  defaultMonth: number
  defaultYear: number
}

export function AddTransactionModal({
  isOpen,
  onClose,
  onSuccess,
  defaultMonth,
  defaultYear,
}: AddTransactionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState<'credit' | 'debit'>('debit')
  const [form, setForm] = useState({
    date: `${defaultYear}-${String(defaultMonth).padStart(2, '0')}-01`,
    description: '',
    amount: '',
    category: 'Outros',
    installment_current: '',
    installment_total: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.description || !form.amount || !form.date) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
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
        toast.success('Transação adicionada com sucesso!')
        setForm({
          date: `${defaultYear}-${String(defaultMonth).padStart(2, '0')}-01`,
          description: '',
          amount: '',
          category: 'Outros',
          installment_current: '',
          installment_total: '',
        })
        onSuccess()
      } else {
        toast.error(data.error || 'Erro ao adicionar transação')
      }
    } catch {
      toast.error('Erro ao adicionar transação')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md" id="modal-add-transaction">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-400" />
            Nova Transação
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Type Toggle */}
          <div className="flex rounded-xl overflow-hidden border border-slate-700 p-1 gap-1">
            <button
              type="button"
              onClick={() => {
                setType('credit')
                setForm(f => ({ ...f, category: 'Crédito' }))
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                type === 'credit'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-white/5'
              }`}
              id="btn-type-credit"
            >
              <TrendingUp className="w-4 h-4" />
              Entrada
            </button>
            <button
              type="button"
              onClick={() => {
                setType('debit')
                setForm(f => ({ ...f, category: 'Outros' }))
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                type === 'debit'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-white/5'
              }`}
              id="btn-type-debit"
            >
              <TrendingDown className="w-4 h-4" />
              Saída
            </button>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-sm">Data *</Label>
            <Input
              id="input-date"
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-sm">Descrição *</Label>
            <Input
              id="input-description"
              type="text"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Ex: SHOPEE, Crédito recebido..."
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-sm">Valor (R$) *</Label>
            <Input
              id="input-amount"
              type="number"
              step="0.01"
              min="0"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              placeholder="0,00"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-sm">Categoria</Label>
            <Select value={form.category} onValueChange={(v) => { if (v) setForm(f => ({ ...f, category: v })) }}>
              <SelectTrigger id="select-category" className="bg-slate-800 border-slate-700 text-white focus:border-blue-500">
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

          {/* Installments */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-sm">Parcela atual</Label>
              <Input
                id="input-installment-current"
                type="number"
                min="1"
                value={form.installment_current}
                onChange={e => setForm(f => ({ ...f, installment_current: e.target.value }))}
                placeholder="Ex: 1"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-sm">Total de parcelas</Label>
              <Input
                id="input-installment-total"
                type="number"
                min="1"
                value={form.installment_total}
                onChange={e => setForm(f => ({ ...f, installment_total: e.target.value }))}
                placeholder="Ex: 12"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              id="btn-cancel-add"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className={`flex-1 font-semibold ${
                type === 'credit'
                  ? 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/25'
                  : 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25'
              }`}
              id="btn-submit-add"
            >
              {isLoading ? 'Salvando...' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
