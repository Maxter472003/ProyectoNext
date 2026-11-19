import Image from "next/image";
import { precio, urlImagen } from "../lib/config";

export default function TarjetaProducto({ producto }) {
  const src = urlImagen(producto.imagen);
  return (
    <article>
      <div className="relative aspect-[4/5] rounded-t-full overflow-hidden bg-tostado/10 border-4 border-tostado">
        {src ? (
          <Image src={src} alt={producto.nombre} fill sizes="(min-width:768px) 320px, 90vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-tostado/50">Sin foto</div>
        )}
      </div>
      <div className="pt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-titulo text-xl font-semibold">{producto.nombre}</h3>
        <span className="font-semibold text-tomate">{precio(producto.precio)}</span>
      </div>
      <p className="text-sm text-tostado/70 mt-1">{producto.descripcion}</p>
    </article>
  );
}
