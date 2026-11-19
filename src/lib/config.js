export const MARCA = {
  nombre: "La Masa Madre",
  lema: "Pizza al horno de leña, masa de 48 horas.",
};

export const RUTAS_PROTEGIDAS = ["/menu"];

export const precio = (n) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

export function urlImagen(imagen) {
  if (!imagen) return null;
  if (imagen.startsWith("http")) return imagen;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/productos/${encodeURI(imagen)}`;
}

export const LOCAL = {
  horario: "Martes a domingo, 1:00 pm a 10:00 pm",
  direccion: "Calle y número, tu ciudad",
  telefono: "000 000 0000",
};
