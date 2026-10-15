import type { SiteConfig } from "@andrei-leads/core";
import { Star } from "lucide-react";

import { Foto } from "@/components/Foto";
import { mediaVisible } from "@/lib/formato";
import { cn } from "@/lib/utils";
import { Visitanos } from "./Visitanos";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta">;
  contacto: SiteConfig["contacto"];
  valoracion?: SiteConfig["valoracion"];
  /** `imagenesHero[0]` o, si no hay, `empresa.imagenes[0]`. Sin foto: hero tipográfico. */
  imagen?: SiteConfig["imagenesHero"][number];
  /** La valoración enlaza a `#resenas` solo si esa sección existe. */
  enlazarResenas?: boolean;
};

function Valoracion({
  valoracion,
  enlazar,
}: {
  valoracion: NonNullable<SiteConfig["valoracion"]>;
  enlazar?: boolean;
}) {
  const contenido = (
    <>
      <Star aria-hidden="true" strokeWidth={1.75} className="size-[18px] flex-none fill-laton text-laton" />
      <span className="font-semibold tabular-nums">
        {mediaVisible(valoracion.media)} · {valoracion.total} reseñas
      </span>
    </>
  );
  const base = "flex items-center gap-1.5 text-[15px] text-tinta";
  return enlazar ? (
    <a href="#resenas" className={cn(base, "-my-[11px] min-h-11 self-start underline-offset-4 hover:underline")}>
      {contenido}
    </a>
  ) : (
    <p className={cn(base, "m-0")}>{contenido}</p>
  );
}

/** Hero del inicio: único `<h1>`. Con foto, partido; sin foto, tipográfico con Visítanos protagonista. */
export function Hero({ negocio, contacto, valoracion, imagen, enlazarResenas }: Props) {
  const titulo = `${negocio.sector} en ${contacto.direccion.ciudad}`;
  const largo = titulo.length > 44;
  const h1 = cn(
    "m-0 leading-[1.15] font-extrabold tracking-[-0.025em] text-balance",
    largo ? "text-[21px] sm:text-2xl" : "text-2xl",
    "md:text-[clamp(2.25rem,1.4rem+2.4vw,3.125rem)]"
  );

  if (!imagen) {
    return (
      <section className="contenedor flex flex-col gap-3 pt-4 pb-8 md:gap-6 md:pt-14 md:pb-14">
        <h1 className={cn(h1, "md:max-w-[22ch]")}>{titulo}</h1>
        {valoracion && <Valoracion valoracion={valoracion} enlazar={enlazarResenas} />}
        {/* Móvil: Visítanos antes de la descripción (los botones, sin scroll a 375×667); escritorio: al revés. */}
        <Visitanos contacto={contacto} variante="protagonista" className="md:order-3" />
        <p className="m-0 max-w-[60ch] text-base leading-[1.5] text-tinta-suave md:order-2 md:text-lg">
          {negocio.descripcionCorta}
        </p>
      </section>
    );
  }

  return (
    <section className="contenedor pb-8 md:py-12">
      <div className="grid md:grid-cols-2 md:items-center md:gap-12">
        <Foto
          imagen={imagen}
          proporcion="5/2"
          sizes="(min-width: 1248px) 576px, (min-width: 768px) 46vw, 100vw"
          radio="ninguno"
          priority
          className="max-md:-mx-4 md:order-2 md:aspect-[4/5] md:rounded-tarjeta"
        />
        <div className="flex flex-col gap-2.5 pt-3.5 md:gap-5 md:pt-0">
          <h1 className={h1}>{titulo}</h1>
          {valoracion && <Valoracion valoracion={valoracion} enlazar={enlazarResenas} />}
          <Visitanos contacto={contacto} variante="hero" className="md:order-3" />
          <p className="m-0 text-[15px] leading-[1.5] text-tinta-suave md:order-2 md:text-lg">
            {negocio.descripcionCorta}
          </p>
        </div>
      </div>
    </section>
  );
}
