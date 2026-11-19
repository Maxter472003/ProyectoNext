import { actualizarSesion } from "./lib/supabase/sesion";

export async function middleware(request) {
  return actualizarSesion(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest\\.json|sw\\.js|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)",
  ],
};
