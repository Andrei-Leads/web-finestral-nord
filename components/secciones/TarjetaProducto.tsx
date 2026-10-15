import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IconoFamilia } from "./IconoFamilia";

type Props = {
  servicio: Servicio;
  /** Tarjeta ancha (1–3 servicios): 16:9 en móvil, 4:3 en tableta y escritorio. */
  ancha?: boolean;
  /** Nivel del título: `h3` bajo un h2 «Catálogo»; `h2` en «Otros productos» sin título de sección. */
  nivel?: "h2" | "h3" | "h4";
  sizes?: string;
  className?: string;
};

/** Tarjeta de producto: toda ella es el enlace a /servicios/{slug}. */
export function TarjetaProducto({
  servicio,
  ancha,
  nivel: Titulo = "h3",
  sizes = "(min-width: 1200px) 282px, (min-width: 768px) 30vw, 46vw",
  className,
}: Props) {
  const foto = servicio.imagenes[0];
  const proporcionClase = ancha ? "aspect-video md:aspect-[4/3]" : "aspect-[4/5]";
  return (
    <Link
      href={`/servicios/${servicio.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-tarjeta bg-tarjeta shadow-tarjeta md:transition-shadow md:hover:shadow-tarjeta-hover",
        className
      )}
    >
      {foto ? (
        <Foto
          imagen={foto}
          proporcion={ancha ? "16/9" : "4/5"}
          sizes={sizes}
          radio="ninguno"
          decorativa
          zoom
          className={cn(proporcionClase, "rounded-t-foto")}
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center bg-primario-tinte",
            proporcionClase
          )}
        >
          <IconoFamilia titulo={servicio.titulo} />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-4">
        <Titulo className="m-0 text-base leading-[1.25] font-bold">{servicio.titulo}</Titulo>
        <p className="m-0 line-clamp-2 text-sm leading-[1.4] text-tinta-suave">{servicio.descripcion}</p>
        {servicio.precioDesde && (
          <Badge variant="precio" className="mt-auto self-start">
            {servicio.precioDesde}
          </Badge>
        )}
      </div>
    </Link>
  );
}
