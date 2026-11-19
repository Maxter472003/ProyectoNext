"use client";

import Link from "next/link";
import { useActionState } from "react";
import { entrar } from "../../actions/auth";

const campo = "w-full rounded-xl border border-tostado/30 bg-white/70 px-4 py-2.5";

export default function Login() {
  const [estado, accion, pendiente] = useActionState(entrar, null);
  return (
    <main className="max-w-sm mx-auto px-6 py-16">
      <h1 className="font-titulo text-4xl font-semibold mb-8">Entrar</h1>
      <form action={accion} className="space-y-4">
        <input name="email" type="email" placeholder="Correo" required autoComplete="email" className={campo} />
        <input name="password" type="password" placeholder="Contraseña" required autoComplete="current-password" className={campo} />
        {estado?.error && <p role="alert" className="text-sm text-tomate">{estado.error}</p>}
        <button disabled={pendiente} className="w-full rounded-full bg-tomate text-crema py-3 font-semibold disabled:opacity-50">
          {pendiente ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p className="mt-6 text-sm text-center">
        ¿Primera vez? <Link href="/registro" className="underline text-albahaca font-medium">Crea tu cuenta</Link>
      </p>
    </main>
  );
}
