import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, type Imagen, type SiteConfig } from "@andrei-leads/core";
import { MapPin, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible, type Ancla } from "@/lib/formato";
import { urlComoLlegar } from "@/lib/llegar";
import { MenuMovil, NavEscritorio } from "./MenuMovil";

type Props = {
  nombre: string;
  logo?: Imagen;
  contacto: SiteConfig["contacto"];
  items: Ancla[];
};

/**
 * Cabecera fija (64 px). Un único enlace a «/» con el logo (opcional) a la izquierda del nombre.
 * Móvil y tableta: nombre + Llegar + Llamar + Menú. Escritorio (lg): enlaces + Cómo llegar + número.
 */
export function Cabecera({ nombre, logo, contacto, items }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-linea bg-papel">
      <div className="mx-auto flex min-h-16 w-full max-w-[1280px] items-center gap-1.5 px-4 py-2 md:px-6">
        <Link
          href="/"
          className="mr-1.5 flex min-h-11 min-w-0 flex-1 items-center gap-2 md:gap-2.5 rounded-boton text-tinta no-underline"
        >
          {logo && (
            <Image
              src={logo.src}
              alt=""
              width={120}
              height={44}
              className={`h-9 w-auto ${nombre.length > 30 ? "max-w-12" : "max-w-16"} flex-none object-contain object-left md:h-11 md:max-w-[120px]`}
            />
          )}
          <span
            className={`min-w-0 font-extrabold tracking-[-0.015em] ${
              nombre.length <= 30
                ? "line-clamp-2 text-balance text-base leading-[1.2] md:text-lg"
                : // Nombre largo: en móvil, hasta 3 líneas a 12 px (la cabecera no pasa de 64 px).
                  "line-clamp-3 text-xs leading-[1.15] md:line-clamp-2 md:text-base md:leading-[1.2]"
            }`}
          >
            {nombre}
          </span>
        </Link>

        <NavEscritorio items={items} />

        <a
          href={urlComoLlegar(contacto)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "llegarCabecera" })}
        >
          <MapPin aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none md:size-[18px]" />
          <span className="md:hidden">Llegar</span>
          <span className="hidden md:inline">Cómo llegar</span>
          <span className="sr-only"> a la exposición</span>
        </a>
        <BotonLlamada
          telefono={contacto.telefono}
          className={buttonVariants({ variant: "llamadaCabecera" })}
        >
          <Phone aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none md:size-[18px]" />
          <span className="md:hidden">Llamar</span>
          <span className="hidden md:inline">{telefonoVisible(contacto.telefono)}</span>
        </BotonLlamada>

        <MenuMovil items={items} contacto={contacto} />
      </div>
    </header>
  );
}
