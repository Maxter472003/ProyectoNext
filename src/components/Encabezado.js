import Link from "next/link";
import { crearClienteServidor } from "../lib/supabase/server";
import { salir } from "../actions/auth";
import { MARCA } from "../lib/config";

const enlace = "px-3 py-1.5 rounded-full hover:bg-tomate/10 transition-colors";

export default async function Encabezado() {
  const supabase = await crearClienteServidor();
  const { data: { user } } = await supabase.auth.getUser();
  const nombre = user?.user_metadata?.nombre ?? user?.email;

  return (
    <header className="sticky top-0 z-20 bg-crema/90 backdrop-blur border-b-2 border-dashed border-tostado/25">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="font-titulo text-2xl font-semibold text-tomate">
          {MARCA.nombre}
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm font-medium">
          <Link href="/menu" className={enlace}>Menú</Link>
          <Link href="/contacto" className={enlace}>Contacto</Link>
          {user ? (
            <>
              <span className="px-3 text-tostado/60">{nombre}</span>
              <form action={salir}>
                <button className="px-4 py-1.5 rounded-full border border-tostado/40 hover:bg-tostado hover:text-crema transition-colors">
                  Salir
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={enlace}>Entrar</Link>
              <Link href="/registro" className="px-4 py-1.5 rounded-full bg-tomate text-crema hover:bg-tomate/90">
                Crear cuenta
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
