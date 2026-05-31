import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { TransactionList } from "@/components/transactions/transaction-list"
import { ExportCSVButton } from "@/components/transactions/export-csv-button"
import { Transaction } from "@/lib/types"

interface PageProps {
  searchParams: Promise<{
    month?: string
    year?: string
    category?: string
    search?: string
    type?: string
  }>
}

export default async function TransactionsPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const params = await searchParams
  const now = new Date()
  const month = Number(params.month) || now.getMonth() + 1
  const year = Number(params.year) || now.getFullYear()
  const category = params.category || "all"
  const search = params.search || ""
  const type = params.type || "all"

  const startDate = `${year}-${String(month).padStart(2, "0")}-01`
  const endDate = new Date(year, month, 0)
  const endDateStr = `${year}-${String(month).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`

  let query = supabase
    .from("transactions")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDateStr)
    .order("date", { ascending: false })

  if (category && category !== "all") {
    query = query.eq("category", category)
  }
  if (type && type !== "all") {
    query = query.eq("type", type)
  }
  if (search) {
    query = query.ilike("description", `%${search}%`)
  }

  const { data: transactions } = await query
  const txList: Transaction[] = transactions ?? []

  return (
    <div className="flex flex-col flex-1">
      <Header title="Transações" />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-zinc-900">Suas transações</h2>
            <p className="text-sm text-zinc-500">Gerencie receitas e despesas</p>
          </div>
          <ExportCSVButton transactions={txList} />
        </div>

        <div className="mb-6">
          <TransactionFilters
            month={month}
            year={year}
            category={category}
            search={search}
            type={type}
          />
        </div>

        <TransactionList transactions={txList} />
      </main>
    </div>
  )
}
