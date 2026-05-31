"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DollarSign, Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error("E-mail ou senha incorretos.")
    } else {
      router.push("/dashboard")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">Entrar</h1>
          <p className="text-zinc-500 text-sm mt-1">Acesse sua conta de finanças</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-1">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Não tem conta?{" "}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}
