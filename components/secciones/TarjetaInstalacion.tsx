import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { cn } from "@/lib/utils";

type Props = {
  trabajo: Trabajo;
  nivel?: "h2" | "h3" | "h4";
  sizes?: string;
  className?: string;
};

/** Tarjeta de instalación: foto 4:3, título y ficha (solo lo que exista). Enlaza a /trabajos/{slug}. */
export function TarjetaInstalacion({
  trabajo,
  nivel: Titulo = "h3",
  sizes = "(min-width: 1200px) 384px, (min-width: 768px) 33vw, 100vw",
  className,
}: Props) {
  const ficha = [trabajo.ubicacion, trabajo.superficie, trabajo.duracion, trabajo.precio].filter(Boolean);
  const foto = trabajo.imagenes[0];
  return (
    <Link href={`/trabajos/${trabajo.slug}`} className={cn("group flex flex-col gap-3", className)}>
      {foto && (
        <Foto imagen={foto} proporcion="4/3" sizes={sizes} decorativa zoom radio="foto" />
      )}
      <div className="flex flex-col gap-1">
        <Titulo className="m-0 text-lg leading-[1.25] font-bold group-hover:underline group-hover:underline-offset-4">
          {trabajo.titulo}
        </Titulo>
        {ficha.length > 0 && (
          <p className="m-0 text-sm text-tinta-suave tabular-nums">{ficha.join(" · ")}</p>
        )}
      </div>
    </Link>
  );
}
