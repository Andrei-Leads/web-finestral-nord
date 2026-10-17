import type { Metadata } from "next";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { telefonoVisible } from "@/lib/formato";
import { h1Interior, h2, seccion } from "@/lib/estilos";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";

// Next añade <meta name="robots" content="noindex"> a toda respuesta 404. Aquí se
// anulan el robots y el canonical «/» que heredaría del layout (con seo.indexar: true,
// el del layout diría «index, follow»).
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const enlaces = [
  { href: "/", texto: "Volver al inicio" },
  { href: "/servicios", texto: "Ver el catálogo" },
  { href: "/contacto", texto: "Contacto y cómo llegar" },
];

/** 404 de «Exposición»: h1 de interior, enlaces con flecha y tarjeta blanca con llamada y WhatsApp. */
export default function NotFound() {
  const { telefono, whatsapp } = config.contacto;
  return (
    <section className={`contenedor flex flex-col gap-6 md:gap-8 ${seccion}`}>
      <div className="flex flex-col gap-3">
        <p className="m-0 text-[15px] font-semibold text-tinta-suave">Error 404</p>
        <h1 className={h1Interior}>No encontramos esta página</h1>
        <p className="m-0 max-w-[60ch] text-[17px] text-tinta-suave md:text-lg">
          Puede que el enlace esté mal o que la página ya no exista. Mira el catálogo o pregúntanos lo que buscabas.
        </p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <nav aria-label="Páginas principales">
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className={buttonVariants({ variant: "enlaceFlecha" })}>
                  {e.texto}
                  <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-5 rounded-tarjeta bg-tarjeta p-5 shadow-tarjeta md:p-6">
          <h2 className={h2}>Llámanos o escríbenos</h2>
          <div className="flex flex-col gap-2">
            <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaContorno" })}>
              <Phone aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
              <span>Llamar · {telefonoVisible(telefono)}</span>
            </BotonLlamada>
            {whatsapp && (
              <BotonWhatsApp
                numero={whatsapp}
                mensaje={MENSAJE_NO_ENCONTRADA}
                className={buttonVariants({ variant: "whatsappSecundario" })}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
                Pregúntanos por WhatsApp
              </BotonWhatsApp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
