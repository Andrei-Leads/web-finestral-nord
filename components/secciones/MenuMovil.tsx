"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BotonLlamada, type SiteConfig } from "@andrei-leads/core";
import { ArrowRight, Menu, Navigation, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { telefonoVisible, type Ancla } from "@/lib/formato";
import { urlComoLlegar } from "@/lib/llegar";

/** "page" si es la ruta exacta, "true" si estamos dentro de la sección (p. ej. /servicios/x). */
function actual(pathname: string, href: string): "page" | "true" | undefined {
  if (pathname === href) return "page";
  return pathname.startsWith(href + "/") ? "true" : undefined;
}

/** Enlaces del menú en escritorio (desde 1024 px). El activo lleva filete latón. */
export function NavEscritorio({ items }: { items: Ancla[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Principal" className="mr-3 hidden gap-0.5 lg:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={actual(pathname, item.href)}
          className="flex min-h-11 items-center rounded-boton px-3 text-[15px] font-semibold text-tinta no-underline hover:bg-piedra aria-[current]:shadow-[inset_0_-3px_0_var(--color-laton)]"
        >
          {item.texto}
        </Link>
      ))}
    </nav>
  );
}

type Props = {
  items: Ancla[];
  contacto: SiteConfig["contacto"];
};

/** Menú móvil (hasta 1023 px): botón + panel derecho con enlaces, «Cómo llegar» y «Llamar». */
export function MenuMovil({ items, contacto }: Props) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  // Si el panel se cierra al navegar, el foco no debe volver al botón del menú.
  const navegando = useRef(false);

  function navegar() {
    navegando.current = true;
    setAbierto(false);
  }

  return (
    <Sheet open={abierto} onOpenChange={setAbierto}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex min-h-12 min-w-12 flex-none cursor-pointer flex-col items-center justify-center gap-0.5 rounded-boton text-xs leading-none font-semibold text-tinta hover:bg-piedra lg:hidden"
        >
          <Menu aria-hidden="true" strokeWidth={1.75} className="size-[22px]" />
          <span>Menú</span>
        </button>
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        onCloseAutoFocus={(e) => {
          if (navegando.current) {
            e.preventDefault();
            navegando.current = false;
          }
        }}
      >
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <nav aria-label="Menú móvil" className="flex flex-col">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={navegar}
              aria-current={actual(pathname, item.href)}
              className="flex min-h-14 items-center justify-between border-b border-linea text-xl font-bold text-tinta no-underline aria-[current]:shadow-[inset_3px_0_0_var(--color-laton)] aria-[current]:pl-3"
            >
              <span>{item.texto}</span>
              <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex flex-col gap-2">
          <a
            href={urlComoLlegar(contacto)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "llegarPrincipal" })}
          >
            <Navigation aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
            Cómo llegar
          </a>
          <BotonLlamada
            telefono={contacto.telefono}
            className={buttonVariants({ variant: "llamadaContorno" })}
          >
            <Phone aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
            Llamar · {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
        </div>
      </SheetContent>
    </Sheet>
  );
}
