import Link from "next/link";
import { BotonLlamada, formatearHorario, type SiteConfig } from "@andrei-leads/core";
import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { telefonoVisible } from "@/lib/formato";
import { urlComoLlegar } from "@/lib/llegar";

type Contacto = Pick<
  SiteConfig["contacto"],
  "telefono" | "direccion" | "horario" | "coordenadas" | "fichaGoogle"
>;

type Props = {
  contacto: Contacto;
  /**
   * - `hero`: hero con foto. Móvil compacto con 1 fila de horario y «Ver horario completo»
   *   en la línea de «Nuestra exposición»; escritorio con 2 filas.
   * - `protagonista`: hero sin foto. Dirección grande; en escritorio, dos columnas.
   * - `completo`: /empresa y /contacto. Todas las filas e `id="horario"` (si `conAncla`).
   */
  variante: "hero" | "protagonista" | "completo";
  /** Solo en /contacto: el destino de «Ver horario completo» (/contacto#horario). */
  conAncla?: boolean;
  className?: string;
};

const etiqueta = "flex items-center gap-2 text-[13px] font-semibold text-sobre-grafito-suave";
const enlaceBlanco =
  "flex min-h-11 items-center font-semibold whitespace-nowrap text-white underline underline-offset-[3px] hover:decoration-2";

/** Botón «Cómo llegar» (variante llegar-principal). Enlace a Google Maps, nunca un mapa incrustado. */
export function EnlaceComoLlegar({
  contacto,
  className,
}: {
  contacto: Pick<SiteConfig["contacto"], "coordenadas" | "direccion">;
  className?: string;
}) {
  return (
    <a
      href={urlComoLlegar(contacto)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant: "llegarPrincipal" }), className)}
    >
      <Navigation aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
      Cómo llegar
    </a>
  );
}

/**
 * Bloque «Visítanos» (Specs §5): grafito, texto blanco, r14, sin sombra.
 * No depende del primario, así funciona con cualquier color de marca.
 * El horario es texto (formatearHorario): no se calcula «Abierto ahora».
 */
export function Visitanos({ contacto, variante, conAncla, className }: Props) {
  const { direccion, telefono, fichaGoogle } = contacto;
  const filas = formatearHorario(contacto.horario);
  const hero = variante === "hero";
  const protagonista = variante === "protagonista";
  const completo = variante === "completo";

  // Máximo de filas: hero (escritorio) y protagonista 2; completo todas. En el hero móvil, 1 (por CSS).
  const max = completo ? filas.length : 2;
  const visibles = filas.slice(0, max);
  const masDeUna = filas.length > 1;
  const masDelMax = filas.length > max;

  return (
    <div
      className={cn(
        "sobre-grafito grid items-start rounded-tarjeta leading-[1.4]",
        hero && "gap-2.5 px-4 pt-3.5 pb-4 md:gap-3.5 md:p-6",
        protagonista && "gap-3.5 p-5 md:grid-cols-2 md:gap-10 md:px-9 md:py-8",
        completo && "gap-3.5 px-4 pt-3.5 pb-4 md:p-6",
        className
      )}
    >
      <div className={cn("flex min-w-0 flex-col", hero ? "gap-1.5 md:gap-2" : "gap-2")}>
        <div className="flex items-center justify-between gap-2">
          <span className={etiqueta}>
            <MapPin aria-hidden="true" strokeWidth={1.75} className="size-4 flex-none text-laton" />
            Nuestra exposición
          </span>
          {/* Hero móvil con foto: solo 1 fila; el resto, a un toque. */}
          {hero && masDeUna && (
            <Link href="/contacto#horario" className={cn(enlaceBlanco, "-my-[13px] text-[13px] md:hidden")}>
              Ver horario completo
            </Link>
          )}
        </div>
        <p
          className={cn(
            "m-0 leading-[1.25] font-bold tracking-[-0.01em]",
            protagonista ? "text-2xl md:text-[28px]" : "text-[17px] md:text-xl"
          )}
        >
          {direccion.calle}
          <br />
          {direccion.cp} {direccion.ciudad}
        </p>
      </div>

      <div className={cn("flex min-w-0 flex-col", hero ? "gap-2.5 md:gap-3.5" : "gap-3.5")}>
        <div id={completo && conAncla ? "horario" : undefined} className="flex flex-col gap-1.5">
          <span className={cn(etiqueta, hero && "max-md:hidden")}>
            <Clock aria-hidden="true" strokeWidth={1.75} className="size-4 flex-none text-laton" />
            Horario
          </span>
          <dl className="m-0 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3.5 gap-y-[3px] text-sm tabular-nums md:text-[15px]">
            {visibles.map((f, i) => (
              <div key={f.dias} className={cn("contents", hero && i > 0 && "max-md:hidden")}>
                <dt className="text-sobre-grafito-suave">{f.dias}</dt>
                <dd className="m-0 font-semibold">{f.horas}</dd>
              </div>
            ))}
          </dl>
          {masDelMax && (
            <Link
              href="/contacto#horario"
              className={cn(enlaceBlanco, "-my-2 self-start text-sm", hero && "max-md:hidden")}
            >
              Ver horario completo
            </Link>
          )}
        </div>

        {/* Cómo llegar primero; apilados en móvil, lado a lado si caben. */}
        <div className="flex flex-wrap gap-2">
          <EnlaceComoLlegar contacto={contacto} className="flex-[1_1_200px]" />
          <BotonLlamada
            telefono={telefono}
            className={cn(buttonVariants({ variant: "llamadaVisitanos" }), "flex-[1_1_220px]")}
          >
            <Phone aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
            <span>Llamar · {telefonoVisible(telefono)}</span>
          </BotonLlamada>
        </div>

        {fichaGoogle && (
          <a
            href={fichaGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(enlaceBlanco, "-mt-2.5 -mb-2 self-start text-sm font-medium")}
          >
            Ver ficha en Google
            <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="ml-1 size-4 flex-none" />
          </a>
        )}
      </div>
    </div>
  );
}
