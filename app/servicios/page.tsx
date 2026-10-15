import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/Migas";
import { AsistenteCompacto } from "@/components/secciones/AsistenteCompacto";
import { BandaMuestras } from "@/components/secciones/BandaMuestras";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Marcas } from "@/components/secciones/Marcas";
import { Resenas } from "@/components/secciones/Resenas";
import { TarjetaProducto } from "@/components/secciones/TarjetaProducto";
import { h1Interior, seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Catálogo" });

export default function Page() {
  const { contacto, servicios } = config;
  const ancha = servicios.length <= 3;

  return (
    <>
      <div className="contenedor pt-4">
        <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Catálogo" }]} />
      </div>
      {/* Rejilla completa: el h1 «Catálogo» hace de título (la sección Catalogo de inicio lleva h2). */}
      <section className={cn("mt-2 bg-piedra pt-8 pb-[clamp(40px,6vw,88px)] md:pt-10")}>
        <div className="contenedor flex flex-col gap-6 md:gap-8">
          <h1 className={h1Interior}>Catálogo</h1>
          <ul
            className={cn(
              "m-0 grid list-none gap-3 p-0 md:gap-5",
              ancha
                ? cn(
                    "grid-cols-1",
                    servicios.length === 1 && "max-w-[560px]",
                    servicios.length === 2 && "md:grid-cols-2",
                    servicios.length === 3 && "md:grid-cols-3"
                  )
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            )}
          >
            {servicios.map((s) => (
              <li key={s.slug}>
                <TarjetaProducto
                  servicio={s}
                  ancha={ancha}
                  nivel="h2"
                  sizes={
                    ancha
                      ? "(min-width: 1200px) 384px, (min-width: 768px) 33vw, 100vw"
                      : "(min-width: 1200px) 282px, (min-width: 768px) 30vw, 46vw"
                  }
                />
              </li>
            ))}
          </ul>
          <BandaMuestras contacto={contacto} />
        </div>
      </section>
      <Marcas marcas={config.marcas} variante="placas" className={cn("contenedor", seccion)} />
      {contacto.whatsapp && (
        <div className="contenedor pb-[clamp(40px,6vw,88px)]">
          <AsistenteCompacto servicios={servicios.map((s) => s.titulo)} whatsapp={contacto.whatsapp} />
        </div>
      )}
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} max={3} />
      <CtaFinal contacto={contacto} />
    </>
  );
}
