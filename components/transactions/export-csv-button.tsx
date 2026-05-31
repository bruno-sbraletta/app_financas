"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Transaction } from "@/lib/types"

interface ExportCSVButtonProps {
  transactions: Transaction[]
}

export function ExportCSVButton({ transactions }: ExportCSVButtonProps) {
  function handleExport() {
    if (transactions.length === 0) return

    const headers = ["Data", "Descrição", "Tipo", "Categoria", "Valor (R$)"]
    const rows = transactions.map((t) => [
      new Date(t.date + "T00:00:00").toLocaleDateString("pt-BR"),
      `"${t.description.replace(/"/g, '""')}"`,
      t.type === "receita" ? "Receita" : "Despesa",
      t.category,
      t.amount.toFixed(2).replace(".", ","),
    ])

    const csvContent = [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n")
    const blob = new Blob(["﻿" + csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `transacoes-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={transactions.length === 0}
      className="gap-2"
    >
      <Download className="w-4 h-4" />
      Exportar CSV
    </Button>
  )
}
