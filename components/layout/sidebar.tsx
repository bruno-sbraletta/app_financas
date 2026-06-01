"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ArrowLeftRight,
  LogOut,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logout } from "@/lib/actions"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transações", icon: ArrowLeftRight },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-border bg-background h-screen sticky top-0 shrink-0">
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-foreground">Finanças</span>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === href
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-zinc-600 hover:text-red-600 hover:bg-red-50 px-3"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </form>
      </div>
    </aside>
  )
}
