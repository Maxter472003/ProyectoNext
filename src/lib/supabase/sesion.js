import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { RUTAS_PROTEGIDAS } from "../config";

export async function actualizarSesion(request) {
  let respuesta = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(lista, headers) {
          lista.forEach(({ name, value }) => request.cookies.set(name, value));
          respuesta = NextResponse.next({ request });
          lista.forEach(({ name, value, options }) => respuesta.cookies.set(name, value, options));
          if (headers) Object.entries(headers).forEach(([k, v]) => respuesta.headers.set(k, v));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const ruta = request.nextUrl.pathname;

  const protegida = RUTAS_PROTEGIDAS.some((r) => ruta === r || ruta.startsWith(r + "/"));
  const esAuth = ruta === "/login" || ruta === "/registro";

  if (!user && protegida) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (user && esAuth) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return respuesta;
}
