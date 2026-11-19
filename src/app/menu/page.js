import Image from "next/image";
import { crearClienteServidor } from "../../lib/supabase/server";
import { precio, urlImagen } from "../../lib/config";

export const metadata = { title: "Menú" };

export default async function Menu() {
  const supabase = await crearClienteServidor();
  const { data: productos, error } = await supabase
    .from("producto")
    .select("id, nombre, precio, descripcion, imagen, categoria")
    .order("categoria")
    .order("id");

  const porCategoria = Object.groupBy(productos ?? [], (p) => p.categoria);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-titulo text-4xl font-semibold mb-2">El menú</h1>
      <p className="text-tostado/70 mb-10">Todas se hornean al momento, en horno de leña.</p>

      {error && <p className="text-tomate">No pudimos cargar el menú. Recarga la página en un momento.</p>}
      {!error && !productos?.length && <p className="text-tostado/70">Estamos preparando el menú. Vuelve pronto.</p>}

      {Object.entries(porCategoria).map(([categoria, lista]) => (
        <section key={categoria} className="mb-12">
          <h2 className="font-titulo text-2xl font-semibold text-albahaca mb-4">{categoria}</h2>
          <ul className="space-y-5">
            {lista.map((p) => {
              const src = urlImagen(p.imagen);
              return (
                <li key={p.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-20 shrink-0 rounded-t-full rounded-b-lg overflow-hidden bg-tostado/10">
                    {src && <Image src={src} alt={p.nombre} fill sizes="64px" className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-titulo text-lg font-semibold">{p.nombre}</h3>
                      <span aria-hidden className="flex-1 border-b-2 border-dotted border-tostado/35 translate-y-[-4px]" />
                      <span className="font-semibold text-tomate">{precio(p.precio)}</span>
                    </div>
                    <p className="text-sm text-tostado/70">{p.descripcion}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
