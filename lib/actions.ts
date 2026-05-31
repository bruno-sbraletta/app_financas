"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { TransactionFormData } from "@/lib/types"

export async function login(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) return { error: error.message }
  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function register(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
  const { error } = await supabase.auth.signUp(data)
  if (error) return { error: error.message }
  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export async function createTransaction(data: TransactionFormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Não autenticado" }

  const { error } = await supabase.from("transactions").insert({
    ...data,
    user_id: user.id,
  })
  if (error) return { error: error.message }
  revalidatePath("/dashboard")
  revalidatePath("/transactions")
  return { success: true }
}

export async function updateTransaction(id: string, data: TransactionFormData) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("transactions")
    .update(data)
    .eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/dashboard")
  revalidatePath("/transactions")
  return { success: true }
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("transactions").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/dashboard")
  revalidatePath("/transactions")
  return { success: true }
}
