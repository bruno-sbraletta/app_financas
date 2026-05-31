"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CATEGORIES } from "@/lib/types"
import { useCallback, useTransition } from "react"

const MONTHS = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
]

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i)

interface TransactionFiltersProps {
  month: number
  year: number
  category: string
  search: string
  type: string
}

export function TransactionFilters({
  month,
  year,
  category,
  search,
  type,
}: TransactionFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const update = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "")
      if (value) params.set(key, value)
      else params.delete(key)
      startTransition(() => router.push(`?${params.toString()}`))
    },
    [router, searchParams]
  )

  function clearFilters() {
    const now = new Date()
    const params = new URLSearchParams()
    params.set("month", String(now.getMonth() + 1))
    params.set("year", String(now.getFullYear()))
    router.push(`?${params.toString()}`)
  }

  const hasActiveFilters = category !== "all" || search || type !== "all"

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <Select
          value={String(month)}
          onValueChange={(v) => update("month", v)}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={String(year)}
          onValueChange={(v) => update("year", v)}
        >
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={(v) => update("type", v === "all" ? "" : v)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="receita">Receita</SelectItem>
            <SelectItem value="despesa">Despesa</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={category}
          onValueChange={(v) => update("category", v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-zinc-500">
            <X className="w-3.5 h-3.5" />
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <Input
          placeholder="Buscar por descrição..."
          defaultValue={search}
          onChange={(e) => update("search", e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  )
}
