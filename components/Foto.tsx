import Image from "next/image";
import type { ReactNode } from "react";
import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

export type Proporcion = "5/2" | "2/1" | "21/9" | "16/9" | "4/3" | "4/5" | "1/1";

type Props = {
  imagen: Imagen;
  proporcion: Proporcion;
  /** Atributo `sizes` de next/image (ancho real de la foto según el breakpoint). */
  sizes: string;
  priority?: boolean;
  /** Radio: `foto` (10 px, catálogo e instalaciones), `tarjeta` (14 px, hero y mosaico) o `ninguno`. */
  radio?: "foto" | "tarjeta" | "ninguno";
  /** Foto dentro de un enlace con texto propio: `alt=""` y etiqueta más pequeña. */
  decorativa?: boolean;
  /** Zoom de la foto al pasar el ratón por el `group` padre (solo escritorio). */
  zoom?: boolean;
  className?: string;
  /** Etiquetas extra (p. ej. «Antes»), colocadas por el llamador. */
  children?: ReactNode;
};

const PROPORCION: Record<Proporcion, string> = {
  "5/2": "aspect-[5/2]",
  "2/1": "aspect-[2/1]",
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
};

const RADIO = {
  foto: "rounded-foto",
  tarjeta: "rounded-tarjeta",
  ninguno: "",
} as const;

/**
 * Etiqueta «Foto de ejemplo»: pastilla oscura con fondo propio, arriba a la
 * izquierda (en el catálogo, el precio y el nombre van debajo de la foto y no
 * se tapan). Decorativa (aria-hidden): el alt ya describe la foto.
 */
function FotoEjemplo({ pequena }: { pequena?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-2 left-2 inline-flex items-center rounded-pastilla bg-etiqueta-ejemplo font-medium whitespace-nowrap text-white",
        pequena ? "px-1.5 py-0.5 text-[11px] leading-[1.4]" : "px-2 py-[3px] text-xs leading-[1.4]"
      )}
    >
      Foto de ejemplo
    </span>
  );
}

/** Foto con next/image. Si es de ejemplo (`/ejemplo/…`) lleva la etiqueta «Foto de ejemplo». */
export function Foto({
  imagen,
  proporcion,
  sizes,
  priority,
  radio = "foto",
  decorativa,
  zoom,
  className,
  children,
}: Props) {
  const deEjemplo = imagen.src.startsWith("/ejemplo/");
  return (
    <div className={cn("relative overflow-hidden bg-piedra", PROPORCION[proporcion], RADIO[radio], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover",
          zoom && "md:transition-transform md:duration-250 md:group-hover:scale-[1.03]"
        )}
      />
      {deEjemplo && <FotoEjemplo pequena={decorativa} />}
      {children}
    </div>
  );
}
