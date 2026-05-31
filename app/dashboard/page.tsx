import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { PeriodSelector } from "@/components/dashboard/period-selector"
import { Transaction, DashboardSummary } from "@/lib/types"

interface PageProps {
  searchParams: Promise<{ month?: string; year?: string }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const params = await searchParams
  const now = new Date()
  const month = Number(params.month) || now.getMonth() + 1
  const year = Number(params.year) || now.getFullYear()

  const startDate = `${year}-${String(month).padStart(2, "0")}-01`
  const endDate = new Date(year, month, 0)
  const endDateStr = `${year}-${String(month).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDateStr)
    .order("date", { ascending: false })

  const txList: Transaction[] = transactions ?? []

  const summary: DashboardSummary = txList.reduce(
    (acc, t) => {
      if (t.type === "receita") acc.totalIncome += t.amount
      else acc.totalExpenses += t.amount
      return acc
    },
    { totalIncome: 0, totalExpenses: 0, balance: 0 }
  )
  summary.balance = summary.totalIncome - summary.totalExpenses

  const recentTransactions = txList.slice(0, 5)

  return (
    <div className="flex flex-col flex-1">
      <Header title="Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-zinc-900">Resumo do mês</h2>
            <p className="text-sm text-zinc-500">Visão consolidada das suas finanças</p>
          </div>
          <PeriodSelector month={month} year={year} />
        </div>

        <SummaryCards summary={summary} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CategoryChart transactions={txList} type="despesa" />
          <CategoryChart transactions={txList} type="receita" />
        </div>

        {recentTransactions.length > 0 && (
          <div className="bg-white border border-zinc-200 rounded-xl p-5">
            <h3 className="font-medium text-zinc-900 mb-4">Últimas transações</h3>
            <div className="space-y-3">
              {recentTransactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-800">{t.description}</p>
                    <p className="text-xs text-zinc-400">{t.category} · {new Date(t.date + "T00:00:00").toLocaleDateString("pt-BR")}</p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      t.type === "receita" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {t.type === "receita" ? "+" : "-"}
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
