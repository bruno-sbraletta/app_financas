import Link from "next/link"
import {
  TrendingUp,
  PieChart,
  ShieldCheck,
  Download,
  ArrowRight,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-zinc-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-zinc-900 text-lg">Finanças</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Começar grátis</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
          <TrendingUp className="w-3.5 h-3.5" />
          Controle financeiro simplificado
        </div>
        <h1 className="text-5xl font-bold text-zinc-900 leading-tight mb-6 tracking-tight">
          Suas finanças em{" "}
          <span className="text-blue-600">uma visão clara</span>
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mb-10 leading-relaxed">
          Registre receitas e despesas, acompanhe por categorias e tenha um
          dashboard completo do seu dinheiro. Simples, rápido e seguro.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/register">
            <Button size="lg" className="gap-2 px-8">
              Criar conta grátis <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="px-8">
              Já tenho conta
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-zinc-900 mb-4">
            Tudo que você precisa
          </h2>
          <p className="text-center text-zinc-500 mb-14 text-lg">
            Ferramentas simples para quem quer organizar as finanças sem complicação.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                color: "text-blue-600",
                bg: "bg-blue-50",
                title: "Dashboard em tempo real",
                desc: "Cards com receita total, despesas e saldo atualizado a cada transação.",
              },
              {
                icon: PieChart,
                color: "text-purple-600",
                bg: "bg-purple-50",
                title: "Gráficos por categoria",
                desc: "Visualize onde está gastando com gráfico de pizza interativo.",
              },
              {
                icon: ShieldCheck,
                color: "text-green-600",
                bg: "bg-green-50",
                title: "Dados seguros",
                desc: "Autenticação e Row Level Security — só você vê suas transações.",
              },
              {
                icon: Download,
                color: "text-orange-600",
                bg: "bg-orange-50",
                title: "Exportar CSV",
                desc: "Baixe suas transações filtradas em formato CSV para análise.",
              },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-zinc-200 p-6"
              >
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-2">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-blue-600">
        <h2 className="text-3xl font-bold text-white mb-4">
          Comece a controlar suas finanças hoje
        </h2>
        <p className="text-blue-100 mb-8 text-lg">
          Crie sua conta grátis e tenha uma visão clara do seu dinheiro.
        </p>
        <Link href="/register">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 gap-2"
          >
            Começar agora <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-8 px-6 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} Finanças Pessoais. Feito com Next.js e Supabase.
      </footer>
    </div>
  )
}
