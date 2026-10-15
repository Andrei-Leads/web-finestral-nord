import type { Resena, SiteConfig } from "@andrei-leads/core";
import { ArrowUpRight, Star } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { fechaLegible, mediaVisible } from "@/lib/formato";
import { h2, seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  resenas: Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Cuántas reseñas, de la más reciente a la más antigua. Por defecto, 3. */
  max?: number;
  className?: string;
};

function Estrellas({ puntuacion }: { puntuacion: number }) {
  return (
    <span aria-hidden="true" className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          strokeWidth={1.5}
          className={cn("size-[18px]", n <= puntuacion ? "fill-laton text-laton" : "text-linea")}
        />
      ))}
    </span>
  );
}

function TarjetaResena({ resena }: { resena: Resena }) {
  const larga = resena.texto.length > 160;
  const texto = (
    <p className={cn("m-0 leading-[1.55]", larga && "order-1 line-clamp-5 group-open:line-clamp-none")}>
      {resena.texto}
    </p>
  );
  return (
    <figure className="m-0 flex h-full flex-col gap-3 rounded-tarjeta bg-tarjeta p-5 shadow-tarjeta">
      <div className="flex items-center gap-2">
        <Estrellas puntuacion={resena.puntuacion} />
        <span className="sr-only">Puntuación: {resena.puntuacion} de 5</span>
      </div>
      <blockquote className="m-0 text-[15px] text-tinta md:text-base">
        {larga ? (
          <details className="group flex flex-col gap-1">
            {texto}
            <summary className="order-2 flex min-h-11 cursor-pointer list-none items-center font-semibold underline underline-offset-4 [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Leer más</span>
              <span className="hidden group-open:inline">Leer menos</span>
            </summary>
          </details>
        ) : (
          texto
        )}
      </blockquote>
      <figcaption className="mt-auto text-sm text-tinta-suave">
        <span className="font-semibold text-tinta">{resena.autor}</span>
        {resena.fecha && <> · {fechaLegible(resena.fecha)}</>}
      </figcaption>
    </figure>
  );
}

/** Reseñas: las más recientes. Móvil con scroll horizontal (sin JS); escritorio, columnas. Vacía: nada. */
export function Resenas({ resenas, valoracion, fichaGoogle, max = 3, className }: Props) {
  if (resenas.length === 0) return null;
  const ordenadas = [...resenas]
    .sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""))
    .slice(0, max);

  return (
    <section id="resenas" className={cn(seccion, "scroll-mt-20", className)}>
      <div className="contenedor flex flex-col gap-5 md:gap-8">
        <div className="flex flex-col gap-3">
          <h2 className={h2}>Lo que dicen nuestros clientes</h2>
          {valoracion && (
            <p className="m-0 flex items-center gap-2 text-tinta-suave tabular-nums">
              <Star aria-hidden="true" strokeWidth={1.5} className="size-5 fill-laton text-laton" />
              <span>
                <strong className="text-tinta">{mediaVisible(valoracion.media)}</strong> ·{" "}
                {valoracion.total} reseñas en Google
              </span>
            </p>
          )}
        </div>
        <ul
          className={cn(
            "m-0 -mx-4 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [contain:paint] [scroll-padding-inline:16px] md:mx-0 md:grid md:gap-5 md:overflow-visible md:p-0",
            ordenadas.length >= 3 ? "md:grid-cols-3" : ordenadas.length === 2 ? "md:grid-cols-2" : "md:max-w-[560px]"
          )}
        >
          {ordenadas.map((r, i) => (
            <li key={`${r.autor}-${i}`} className="w-[84%] flex-none snap-start md:w-auto">
              <TarjetaResena resena={r} />
            </li>
          ))}
        </ul>
        {fichaGoogle && (
          <a
            href={fichaGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "enlaceFlecha" }), "self-start")}
          >
            Ver todas en Google
            <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="ml-1 size-4 flex-none" />
          </a>
        )}
      </div>
    </section>
  );
}
