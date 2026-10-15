import { BotonLlamada, type SiteConfig } from "@andrei-leads/core";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { direccionLinea, telefonoVisible } from "@/lib/formato";
import { seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";
import { EnlaceComoLlegar } from "./Visitanos";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "direccion" | "coordenadas">;
  className?: string;
};

/** Tarjeta grafito de cierre: «Ven a verlo en persona» + Cómo llegar y Llamar. */
export function CtaFinal({ contacto, className }: Props) {
  return (
    <section className={cn(seccion, className)}>
      <div className="contenedor">
        <div className="sobre-grafito flex flex-col gap-5 rounded-tarjeta p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10 md:py-8">
          <div className="flex min-w-0 flex-col gap-2">
            <h2 className="m-0 text-2xl leading-[1.15] font-bold tracking-[-0.02em] text-balance md:text-[28px]">
              Ven a verlo en persona
            </h2>
            <p className="m-0 text-sobre-grafito-suave">{direccionLinea(contacto.direccion)}</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:flex-none">
            <EnlaceComoLlegar contacto={contacto} />
            <BotonLlamada
              telefono={contacto.telefono}
              className={cn(buttonVariants({ variant: "llamadaVisitanos" }))}
            >
              <Phone aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
              <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
            </BotonLlamada>
          </div>
        </div>
      </div>
    </section>
  );
}
