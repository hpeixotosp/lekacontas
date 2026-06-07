import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

export const MONTHS = [
  { value: 2, label: 'Fevereiro', year: 2026 },
  { value: 3, label: 'Março', year: 2026 },
  { value: 4, label: 'Abril', year: 2026 },
  { value: 5, label: 'Maio', year: 2026 },
  { value: 6, label: 'Junho', year: 2026 },
  { value: 7, label: 'Julho', year: 2026 },
  { value: 8, label: 'Agosto', year: 2026 },
  { value: 9, label: 'Setembro', year: 2026 },
  { value: 10, label: 'Outubro', year: 2026 },
  { value: 11, label: 'Novembro', year: 2026 },
  { value: 12, label: 'Dezembro', year: 2026 },
]

export const CATEGORIES = [
  'Crédito',
  'Shopee',
  'Cartão',
  'Cartão Leka Caixa',
  'Máquina Gabi',
  'Outros',
]

export const CATEGORY_COLORS: Record<string, string> = {
  'Crédito': '#3b82f6',
  'Shopee': '#f97316',
  'Cartão': '#8b5cf6',
  'Cartão Leka Caixa': '#ec4899',
  'Máquina Gabi': '#14b8a6',
  'Outros': '#6b7280',
}
