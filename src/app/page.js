import Image from "next/image";
import Link from "next/link";
import TarjetaProducto from "../components/TarjetaProducto";
import { crearClienteServidor } from "../lib/supabase/server";
import { MARCA, urlImagen } from "../lib/config";

const PUNTOS = [
  ["Masa de 48 horas", "Fermentación lenta para una corteza ligera y alveolada."],
  ["Horno de leña", "Altas temperaturas y un par de minutos: sale con borde tostado."],
  ["Ingredientes frescos", "Mozzarella, albahaca y verduras que llegan cada mañana."],
];

export default async function Inicio() {
  const supabase = await crearClienteServidor();
  const { data: destacados } = await supabase
    .from("producto")
    .select("id, nombre, precio, descripcion, imagen")
    .eq("destacado", true)
    .order("id")
    .limit(3);

  const principal = destacados?.[0];
  const foto = urlImagen(principal?.imagen);

  return (
    <main>
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-20 grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h1 className="font-titulo text-5xl md:text-6xl font-semibold leading-[1.05]">
            Masa que reposa dos días, pizza que se acaba en minutos.
          </h1>
          <p className="mt-5 text-lg text-tostado/75 max-w-md">{MARCA.lema}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/menu" className="rounded-full bg-tomate text-crema px-7 py-3 font-semibold hover:bg-tomate/90">
              Ver el menú
            </Link>
            <Link href="/contacto" className="rounded-full border-2 border-tostado px-7 py-3 font-semibold hover:bg-tostado hover:text-crema transition-colors">
              Reservar mesa
            </Link>
          </div>
        </div>
        {foto && (
          <div className="relative mx-auto w-full max-w-sm aspect-[4/5] rounded-t-full overflow-hidden border-8 border-tostado bg-tostado/10">
            <Image src={foto} alt={principal.nombre} fill priority sizes="(min-width:768px) 384px, 90vw" className="object-cover" />
          </div>
        )}
      </section>

      <section className="bg-albahaca text-crema">
        <div className="max-w-5xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
          {PUNTOS.map(([titulo, texto]) => (
            <div key={titulo}>
              <h2 className="font-titulo text-xl font-semibold">{titulo}</h2>
              <p className="mt-2 text-sm text-crema/85">{texto}</p>
            </div>
          ))}
        </div>
      </section>

      {destacados?.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pt-20">
          <h2 className="font-titulo text-3xl font-semibold mb-8">Las que más piden</h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {destacados.map((p) => <TarjetaProducto key={p.id} producto={p} />)}
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-6 pt-20">
        <div className="rounded-3xl bg-tomate text-crema px-8 py-12 md:flex items-center justify-between gap-6">
          <div>
            <h2 className="font-titulo text-3xl font-semibold">¿Se te antojó?</h2>
            <p className="mt-2 text-crema/85">Mira el menú completo y elige la tuya.</p>
          </div>
          <Link href="/menu" className="mt-6 md:mt-0 inline-block rounded-full bg-crema text-tomate px-7 py-3 font-semibold hover:bg-white">
            Ir al menú
          </Link>
        </div>
      </section>
    </main>
  );
}
