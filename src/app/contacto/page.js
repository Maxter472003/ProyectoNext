export const metadata = { title: "Contacto" };

const campo = "w-full rounded-xl border border-tostado/30 bg-white/70 px-4 py-2.5";

export default function Contacto() {
  return (
    <main className="max-w-md mx-auto px-6 py-12">
      <h1 className="font-titulo text-4xl font-semibold mb-2">Escríbenos</h1>
      <p className="text-tostado/70 mb-8">Reservaciones, pedidos grandes o comentarios.</p>
      <form className="space-y-5">
        <label className="block">
          <span className="text-sm font-medium">Correo</span>
          <input type="email" name="correo" required className={campo} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Motivo</span>
          <input type="text" name="motivo" required className={campo} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Mensaje</span>
          <textarea name="comentario" rows={5} required className={campo} />
        </label>
        <button type="submit" className="rounded-full bg-tomate text-crema px-7 py-3 font-semibold hover:bg-tomate/90">
          Enviar mensaje
        </button>
      </form>
    </main>
  );
}
