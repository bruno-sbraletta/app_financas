import { TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardSummary } from "@/lib/types"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

interface SummaryCardsProps {
  summary: DashboardSummary
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const { totalIncome, totalExpenses, balance } = summary

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-zinc-200 shadow-none">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-500">Receitas</span>
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(totalIncome)}
          </p>
        </CardContent>
      </Card>

      <Card className="border-zinc-200 shadow-none">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-500">Despesas</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-500">
            {formatCurrency(totalExpenses)}
          </p>
        </CardContent>
      </Card>

      <Card className="border-zinc-200 shadow-none">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-500">Saldo</span>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                balance >= 0 ? "bg-blue-50" : "bg-red-50"
              }`}
            >
              <Wallet
                className={`w-4 h-4 ${balance >= 0 ? "text-blue-600" : "text-red-500"}`}
              />
            </div>
          </div>
          <p
            className={`text-2xl font-bold ${
              balance >= 0 ? "text-blue-600" : "text-red-500"
            }`}
          >
            {formatCurrency(balance)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
