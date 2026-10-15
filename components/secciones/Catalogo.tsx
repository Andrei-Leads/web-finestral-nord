import Link from "next/link";
import type { Servicio, SiteConfig } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { h2, seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";
import { BandaMuestras } from "./BandaMuestras";
import { Marcas } from "./Marcas";
import { TarjetaProducto } from "./TarjetaProducto";

type Props = {
  servicios: Servicio[];
  /** Máximo de tarjetas. Por defecto: todas, o 8 si hay 9 o más. */
  max?: number;
  titulo?: string;
  /** Nivel del título de sección; las tarjetas usan el siguiente. */
  nivel?: "h2" | "h3";
  /** Marcas en fila bajo el título (inicio). */
  marcas?: string[];
  /** Con `contacto`, remata con la banda «Ven a ver muestras». */
  contacto?: Pick<SiteConfig["contacto"], "horario" | "coordenadas" | "direccion">;
  /** «Ver todo el catálogo» cuando hay más servicios que tarjetas. Por defecto, sí. */
  verTodo?: boolean;
  id?: string;
  className?: string;
};

const columnas = "grid gap-3 md:gap-5";

/** Catálogo: rejilla de tarjetas de producto sobre franja piedra. Sin servicios: nada. */
export function Catalogo({
  servicios,
  max,
  titulo = "Catálogo",
  nivel: Titulo = "h2",
  marcas = [],
  contacto,
  verTodo = true,
  id,
  className,
}: Props) {
  if (servicios.length === 0) return null;
  const limite = max ?? (servicios.length >= 9 ? 8 : servicios.length);
  const visibles = servicios.slice(0, limite);
  const ancha = servicios.length <= 3;
  const hijo = Titulo === "h2" ? "h3" : "h4";

  return (
    <section id={id} className={cn("bg-piedra", seccion, className)}>
      <div className="contenedor flex flex-col gap-6 md:gap-8">
        <Titulo className={h2}>{titulo}</Titulo>
        <Marcas marcas={marcas} variante="fila" />
        <ul
          className={cn(
            "m-0 list-none p-0",
            columnas,
            ancha
              ? cn(
                  "grid-cols-1",
                  servicios.length === 1 && "max-w-[560px]",
                  servicios.length === 2 && "md:grid-cols-2",
                  servicios.length === 3 && "md:grid-cols-3"
                )
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {visibles.map((s) => (
            <li key={s.slug}>
              <TarjetaProducto
                servicio={s}
                ancha={ancha}
                nivel={hijo}
                sizes={
                  ancha
                    ? "(min-width: 1200px) 384px, (min-width: 768px) 33vw, 100vw"
                    : "(min-width: 1200px) 282px, (min-width: 768px) 30vw, 46vw"
                }
              />
            </li>
          ))}
        </ul>
        {verTodo && servicios.length > limite && (
          <Link href="/servicios" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "self-start")}>
            Ver todo el catálogo
            <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-5" />
          </Link>
        )}
        {contacto && <BandaMuestras contacto={contacto} />}
      </div>
    </section>
  );
}
