"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Transaction, CATEGORY_COLORS, Category } from "@/lib/types"
import { TransactionForm } from "./transaction-form"
import { DeleteDialog } from "./delete-dialog"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | undefined>()

  function handleEdit(t: Transaction) {
    setEditingTransaction(t)
    setFormOpen(true)
  }

  function handleDelete(t: Transaction) {
    setDeletingTransaction(t)
    setDeleteOpen(true)
  }

  function handleFormClose(open: boolean) {
    setFormOpen(open)
    if (!open) setEditingTransaction(undefined)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-zinc-500">
          {transactions.length} transaç{transactions.length !== 1 ? "ões" : "ão"}
        </p>
        <Button size="sm" onClick={() => setFormOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nova transação
        </Button>
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-3">
            <Plus className="w-5 h-5 text-zinc-400" />
          </div>
          <p className="text-zinc-600 font-medium">Nenhuma transação encontrada</p>
          <p className="text-sm text-zinc-400 mt-1 mb-4">
            Ajuste os filtros ou crie uma nova transação.
          </p>
          <Button size="sm" onClick={() => setFormOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Nova transação
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-zinc-200 rounded-xl px-4 py-3 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-2 h-8 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      CATEGORY_COLORS[t.category as Category] ?? "#6b7280",
                  }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-800 truncate">
                    {t.description}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-zinc-400">
                      {new Date(t.date + "T00:00:00").toLocaleDateString("pt-BR")}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-xs py-0 px-1.5 h-4"
                      style={{
                        backgroundColor: `${CATEGORY_COLORS[t.category as Category]}22`,
                        color: CATEGORY_COLORS[t.category as Category],
                        border: "none",
                      }}
                    >
                      {t.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-sm font-semibold ${
                    t.type === "receita" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {t.type === "receita" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(t)}
                    className="w-8 h-8 p-0 text-zinc-400 hover:text-zinc-700"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(t)}
                    className="w-8 h-8 p-0 text-zinc-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <TransactionForm
        open={formOpen}
        onOpenChange={handleFormClose}
        transaction={editingTransaction}
      />

      {deletingTransaction && (
        <DeleteDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          transactionId={deletingTransaction.id}
          description={deletingTransaction.description}
        />
      )}
    </>
  )
}
