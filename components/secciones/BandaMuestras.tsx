import type { SiteConfig } from "@andrei-leads/core";

import { horarioCorto } from "@/lib/formato";
import { cn } from "@/lib/utils";
import { EnlaceComoLlegar } from "./Visitanos";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "horario" | "coordenadas" | "direccion">;
  className?: string;
};

/** Banda «Ven a ver muestras…» que remata el catálogo. */
export function BandaMuestras({ contacto, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-tarjeta bg-primario-tinte p-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-6",
        className
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <p className="m-0 text-lg leading-[1.3] font-bold text-balance md:text-xl">
          Ven a ver muestras de perfiles, colores y vidrios
        </p>
        <p className="m-0 text-sm text-tinta-suave tabular-nums">{horarioCorto(contacto.horario)}</p>
      </div>
      <EnlaceComoLlegar contacto={contacto} className="md:flex-none" />
    </div>
  );
}
