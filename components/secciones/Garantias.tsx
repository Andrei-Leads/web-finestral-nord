import type { SiteConfig } from "@andrei-leads/core";
import { Check } from "lucide-react";

import { anioActual } from "@/lib/anio";
import { h2, seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  garantias: SiteConfig["garantias"];
  acreditaciones: SiteConfig["acreditaciones"];
  anioFundacion?: number;
  ciudad: string;
  nivel?: "h2" | "h3";
  className?: string;
};

/** Franja piedra: «{n} años en {ciudad}», garantías con check y acreditaciones. Todo vacío: nada. */
export async function Garantias({
  garantias,
  acreditaciones,
  anioFundacion,
  ciudad,
  nivel: Titulo = "h2",
  className,
}: Props) {
  if (garantias.length === 0 && acreditaciones.length === 0 && !anioFundacion) return null;
  const anios = anioFundacion ? (await anioActual()) - anioFundacion : 0;

  return (
    <section className={cn("bg-piedra", seccion, className)}>
      <div className="contenedor grid gap-8 md:grid-cols-[auto_1fr] md:gap-16">
        {anios > 0 && (
          <p className="m-0 flex flex-col leading-none md:justify-center">
            <span className="text-[clamp(3.5rem,2.5rem+4vw,5.5rem)] font-extrabold tracking-[-0.04em] tabular-nums">
              {anios} años
            </span>
            <span className="mt-2 text-xl font-bold md:text-2xl">en {ciudad}</span>
          </p>
        )}
        <div className={cn("flex flex-col gap-5", anios === 0 && "md:col-span-2")}>
          {(garantias.length > 0 || acreditaciones.length > 0) && <Titulo className={h2}>Garantías</Titulo>}
          {garantias.length > 0 && (
            <ul className="m-0 grid list-none gap-x-8 gap-y-3 p-0 md:grid-cols-2">
              {garantias.map((g) => (
                <li key={g} className="flex items-start gap-3 leading-[1.4]">
                  <Check aria-hidden="true" strokeWidth={2.25} className="mt-0.5 size-5 flex-none text-laton" />
                  {g}
                </li>
              ))}
            </ul>
          )}
          {acreditaciones.length > 0 && (
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0 text-sm text-tinta-suave">
              {acreditaciones.map((a) => (
                <li key={a.nombre}>
                  <span className="font-semibold text-tinta">{a.nombre}</span>
                  {a.numero && <> · nº {a.numero}</>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
