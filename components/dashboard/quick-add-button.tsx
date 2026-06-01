"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TransactionForm } from "@/components/transactions/transaction-form"

export function QuickAddButton() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <Button size="sm" onClick={() => setFormOpen(true)} className="gap-2">
        <Plus className="w-4 h-4" />
        Nova transação
      </Button>
      <TransactionForm open={formOpen} onOpenChange={setFormOpen} />
    </>
  )
}
