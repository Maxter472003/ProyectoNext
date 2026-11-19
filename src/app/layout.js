import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import RegistrarSW from "../components/RegistrarSW";
import Encabezado from "../components/Encabezado";
import { MARCA, LOCAL } from "../lib/config";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });
const dm = DM_Sans({ variable: "--font-dm", subsets: ["latin"] });

export const metadata = {
  title: MARCA.nombre,
  description: MARCA.lema,
  manifest: "/manifest.json",
  icons: { apple: "/icons/icon-192.png" },
};

export const viewport = { themeColor: "#C8372D" };

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${dm.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Encabezado />
        <div className="flex-1">{children}</div>
        <footer className="bg-tostado text-crema mt-20">
          <div className="max-w-5xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
            <div>
              <p className="font-titulo text-2xl font-semibold">{MARCA.nombre}</p>
              <p className="mt-2 text-sm text-crema/70 max-w-xs">{MARCA.lema}</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Horario</p>
              <p className="text-sm text-crema/70">{LOCAL.horario}</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Visítanos</p>
              <p className="text-sm text-crema/70">{LOCAL.direccion}</p>
              <p className="text-sm text-crema/70">{LOCAL.telefono}</p>
            </div>
          </div>
        </footer>
        <RegistrarSW />
      </body>
    </html>
  );
}
