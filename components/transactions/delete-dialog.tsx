"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteTransaction } from "@/lib/actions"

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transactionId: string
  description: string
}

export function DeleteDialog({
  open,
  onOpenChange,
  transactionId,
  description,
}: DeleteDialogProps) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const result = await deleteTransaction(transactionId)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Transação excluída!")
      onOpenChange(false)
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Excluir transação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir <strong>&quot;{description}&quot;</strong>? Essa ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Excluir"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
