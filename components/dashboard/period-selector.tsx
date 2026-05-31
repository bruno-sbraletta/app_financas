"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

interface PeriodSelectorProps {
  month: number
  year: number
}

export function PeriodSelector({ month, year }: PeriodSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function navigate(newMonth: number, newYear: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("month", String(newMonth))
    params.set("year", String(newYear))
    router.push(`?${params.toString()}`)
  }

  function prev() {
    if (month === 1) navigate(12, year - 1)
    else navigate(month - 1, year)
  }

  function next() {
    if (month === 12) navigate(1, year + 1)
    else navigate(month + 1, year)
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={prev} className="w-8 h-8 p-0">
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-sm font-medium text-zinc-700 min-w-[130px] text-center">
        {MONTHS[month - 1]} {year}
      </span>
      <Button variant="outline" size="sm" onClick={next} className="w-8 h-8 p-0">
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
