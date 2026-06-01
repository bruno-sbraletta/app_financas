"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CATEGORIES, Transaction, TransactionFormData } from "@/lib/types"
import { createTransaction, updateTransaction } from "@/lib/actions"

interface TransactionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction?: Transaction
}

export function TransactionForm({
  open,
  onOpenChange,
  transaction,
}: TransactionFormProps) {
  const isEditing = !!transaction
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<TransactionFormData>({
    description: transaction?.description ?? "",
    amount: transaction?.amount ?? 0,
    date: transaction?.date ?? new Date().toISOString().split("T")[0],
    type: transaction?.type ?? "despesa",
    category: transaction?.category ?? "Outros",
  })

  useEffect(() => {
    if (open) {
      setFormData({
        description: transaction?.description ?? "",
        amount: transaction?.amount ?? 0,
        date: transaction?.date ?? new Date().toISOString().split("T")[0],
        type: transaction?.type ?? "despesa",
        category: transaction?.category ?? "Outros",
      })
    }
  }, [open, transaction])

  function handleChange(field: keyof TransactionFormData, value: string | number) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.description.trim()) {
      toast.error("Informe a descrição.")
      return
    }
    if (formData.amount <= 0) {
      toast.error("O valor deve ser maior que zero.")
      return
    }
    setLoading(true)
    const result = isEditing
      ? await updateTransaction(transaction.id, formData)
      : await createTransaction(formData)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success(isEditing ? "Transação atualizada!" : "Transação criada!")
      onOpenChange(false)
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar transação" : "Nova transação"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          {/* Tipo */}
          <div className="grid grid-cols-2 gap-2">
            {(["despesa", "receita"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleChange("type", t)}
                className={`py-2 rounded-lg border text-sm font-medium transition-colors ${
                  formData.type === t
                    ? t === "receita"
                      ? "bg-green-50 border-green-300 text-green-700"
                      : "bg-red-50 border-red-300 text-red-700"
                    : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                }`}
              >
                {t === "receita" ? "Receita" : "Despesa"}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Supermercado, Salário..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                value={formData.amount || ""}
                onChange={(e) => handleChange("amount", parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(v) => v && handleChange("category", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isEditing ? (
                "Salvar"
              ) : (
                "Criar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
