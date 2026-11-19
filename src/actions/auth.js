"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { crearClienteServidor } from "../lib/supabase/server";

export async function entrar(_estado, formData) {
  const supabase = await crearClienteServidor();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (error) return { error: "Correo o contraseña incorrectos." };

  revalidatePath("/", "layout");
  redirect("/");
}

export async function crearCuenta(_estado, formData) {
  const supabase = await crearClienteServidor();
  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email"),
    password: formData.get("password"),
    options: { data: { nombre: formData.get("nombre") } },
  });
  if (error) return { error: error.message };
  if (!data.session) return { aviso: "Cuenta creada. Confirma tu correo para entrar." };

  revalidatePath("/", "layout");
  redirect("/");
}

export async function salir() {
  const supabase = await crearClienteServidor();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}