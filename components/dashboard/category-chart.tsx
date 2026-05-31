"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Category, CATEGORY_COLORS, Transaction } from "@/lib/types"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

interface CategoryChartProps {
  transactions: Transaction[]
  type: "receita" | "despesa"
}

export function CategoryChart({ transactions, type }: CategoryChartProps) {
  const filtered = transactions.filter((t) => t.type === type)

  const grouped = filtered.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})

  const data = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }))

  if (data.length === 0) {
    return (
      <Card className="border-zinc-200 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-zinc-600">
            {type === "receita" ? "Receitas por categoria" : "Despesas por categoria"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48 text-zinc-400 text-sm">
          Nenhuma {type === "receita" ? "receita" : "despesa"} no período
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-zinc-200 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-600">
          {type === "receita" ? "Receitas por categoria" : "Despesas por categoria"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name as Category] ?? "#6b7280"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [formatCurrency(Number(value)), "Valor"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e4e4e7",
                fontSize: "13px",
              }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ fontSize: 12, color: "#52525b" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
