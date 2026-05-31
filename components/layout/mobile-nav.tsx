"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ArrowLeftRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transações", icon: ArrowLeftRight },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-zinc-200 z-50">
      <div className="flex">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
              pathname === href
                ? "text-blue-600"
                : "text-zinc-500"
            )}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
