"use client";

import Link from "next/link";
import { useActionState } from "react";
import { crearCuenta } from "../../actions/auth";

const campo = "w-full rounded-xl border border-tostado/30 bg-white/70 px-4 py-2.5";

export default function Registro() {
  const [estado, accion, pendiente] = useActionState(crearCuenta, null);
  return (
    <main className="max-w-sm mx-auto px-6 py-16">
      <h1 className="font-titulo text-4xl font-semibold mb-8">Crear cuenta</h1>
      <form action={accion} className="space-y-4">
        <input name="nombre" type="text" placeholder="Nombre" required autoComplete="name" className={campo} />
        <input name="email" type="email" placeholder="Correo" required autoComplete="email" className={campo} />
        <input name="password" type="password" placeholder="Contraseña (mínimo 6 caracteres)" minLength={6} required autoComplete="new-password" className={campo} />
        {estado?.error && <p role="alert" className="text-sm text-tomate">{estado.error}</p>}
        {estado?.aviso && <p role="status" className="text-sm text-albahaca">{estado.aviso}</p>}
        <button disabled={pendiente} className="w-full rounded-full bg-tomate text-crema py-3 font-semibold disabled:opacity-50">
          {pendiente ? "Creando..." : "Crear cuenta"}
        </button>
      </form>
      <p className="mt-6 text-sm text-center">
        ¿Ya tienes cuenta? <Link href="/login" className="underline text-albahaca font-medium">Entra aquí</Link>
      </p>
    </main>
  );
}
