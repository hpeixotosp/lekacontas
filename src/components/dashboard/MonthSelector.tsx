'use client'

import { MONTHS } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthSelectorProps {
  selectedMonth: number
  selectedYear: number
  onMonthChange: (month: number, year: number) => void
}

export function MonthSelector({ selectedMonth, selectedYear, onMonthChange }: MonthSelectorProps) {
  const currentIndex = MONTHS.findIndex(m => m.value === selectedMonth && m.year === selectedYear)

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prev = MONTHS[currentIndex - 1]
      onMonthChange(prev.value, prev.year)
    }
  }

  const handleNext = () => {
    if (currentIndex < MONTHS.length - 1) {
      const next = MONTHS[currentIndex + 1]
      onMonthChange(next.value, next.year)
    }
  }

  const currentMonth = MONTHS[currentIndex]

  return (
    <div className="flex items-center justify-center md:justify-start gap-3 w-full md:w-auto">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
        id="btn-month-prev"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <div className="flex flex-col items-center min-w-[140px]">
        <span className="text-2xl font-bold text-white tracking-wide">
          {currentMonth?.label}
        </span>
        <span className="text-sm text-blue-200 font-medium">{selectedYear}</span>
      </div>

      <button
        onClick={handleNext}
        disabled={currentIndex === MONTHS.length - 1}
        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
        id="btn-month-next"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  )
}
