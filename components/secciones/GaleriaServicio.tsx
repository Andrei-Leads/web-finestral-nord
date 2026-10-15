"use client";

import { useState } from "react";
import type { Imagen } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { cn } from "@/lib/utils";

/**
 * Galería de la página de servicio: foto grande 4:3 y, con varias, miniaturas 1:1 en 4 columnas.
 * Las miniaturas son botones con `aria-pressed`. Sin JavaScript se ve la foto principal.
 * Sin imágenes no se pinta nada (el llamador pone el icono).
 */
export function GaleriaServicio({ imagenes }: { imagenes: Imagen[] }) {
  const [indice, setIndice] = useState(0);
  if (imagenes.length === 0) return null;
  const actual = imagenes[indice] ?? imagenes[0];

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <Foto
        imagen={actual}
        proporcion="4/3"
        radio="tarjeta"
        priority
        sizes="(min-width: 1200px) 560px, (min-width: 768px) 46vw, 100vw"
      />
      {imagenes.length > 1 && (
        <ul className="m-0 grid list-none grid-cols-4 gap-2 p-0 md:gap-3">
          {imagenes.map((im, i) => (
            <li key={`${im.src}-${i}`}>
              <button
                type="button"
                aria-pressed={i === indice}
                onClick={() => setIndice(i)}
                className="relative block min-h-11 w-full cursor-pointer overflow-hidden rounded-foto p-0"
              >
                <Foto imagen={im} proporcion="1/1" radio="ninguno" decorativa sizes="(min-width: 768px) 130px, 22vw" />
                <span className="sr-only">Ver foto {i + 1}: {im.alt}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-foto ring-inset",
                    i === indice ? "ring-[3px] ring-grafito" : "ring-1 ring-linea"
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
