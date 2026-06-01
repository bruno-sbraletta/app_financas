import { createClient } from "@/lib/supabase/server"
import { logout } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { LogOut, DollarSign } from "lucide-react"
import { ThemeToggle } from "@/components/layout/theme-toggle"

interface HeaderProps {
  title: string
}

export async function Header({ title }: HeaderProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="border-b border-border bg-background px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center md:hidden">
          <DollarSign className="w-3.5 h-3.5 text-white" />
        </div>
        <h1 className="font-semibold text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-muted-foreground truncate max-w-[200px]">
          {user?.email}
        </span>
        <ThemeToggle />
        <form action={logout} className="md:hidden">
          <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground">
            <LogOut className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </header>
  )
}
