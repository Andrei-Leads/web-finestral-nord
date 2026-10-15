import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BotonLlamada, BotonWhatsApp, metadatosTrabajo } from "@andrei-leads/core";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { Migas } from "@/components/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Instalaciones } from "@/components/secciones/Instalaciones";
import { TrabajoFicha } from "@/components/secciones/TrabajoFicha";
import { TrabajoFotos } from "@/components/secciones/TrabajoFotos";
import { EnlaceComoLlegar } from "@/components/secciones/Visitanos";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { telefonoVisible } from "@/lib/formato";
import { h1Interior, h2, seccion } from "@/lib/estilos";
import { mensajeTrabajo } from "@/lib/mensajes";

// Con `cacheComponents` la lista no puede ser []: sin trabajos, un slug de relleno que acaba en 404.
export function generateStaticParams() {
  const params = config.trabajos.map((t) => ({ slug: t.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trabajo = config.trabajos.find((t) => t.slug === slug);
  if (!trabajo) notFound();

  const familia = trabajo.servicio ? config.servicios.find((s) => s.slug === trabajo.servicio) : undefined;
  const otros = config.trabajos.filter((t) => t.slug !== trabajo.slug);
  const { contacto } = config;

  return (
    <>
      <div className={`contenedor flex flex-col gap-5 pt-2 pb-6 md:gap-6`}>
        <Migas
          items={[
            { href: "/", texto: "Inicio" },
            { href: "/trabajos", texto: "Instalaciones" },
            { texto: trabajo.titulo },
          ]}
        />
        <h1 className={h1Interior}>{trabajo.titulo}</h1>
      </div>

      <TrabajoFicha trabajo={trabajo} />

      <article className={`contenedor flex flex-col gap-6 pt-6 md:gap-8 md:pt-8 ${seccion}`}>
        <TrabajoFotos trabajo={trabajo} />

        <div className="flex max-w-[68ch] flex-col gap-4 text-[17px] leading-[1.65]">
          <p className="m-0 text-lg font-medium text-pretty">{trabajo.descripcion}</p>
          {trabajo.contenido.map((p, i) => (
            <p key={i} className="m-0 text-pretty">
              {p}
            </p>
          ))}
        </div>

        {familia && (
          <Link href={`/servicios/${familia.slug}`} className={`${buttonVariants({ variant: "enlaceFlecha" })} self-start`}>
            Ver {familia.titulo} en el catálogo
            <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-5" />
          </Link>
        )}
      </article>

      {trabajo.testimonio && (
        <section className={`bg-primario-tinte ${seccion}`}>
          <figure className="contenedor m-0 flex max-w-[68ch] flex-col gap-3 md:mx-auto">
            <blockquote className="m-0 text-[clamp(1.25rem,1.05rem+1vw,1.75rem)] leading-[1.3] font-semibold text-pretty">
              «{trabajo.testimonio.texto}»
            </blockquote>
            <figcaption className="text-tinta-suave">{trabajo.testimonio.autor}</figcaption>
          </figure>
        </section>
      )}

      <section className={seccion}>
        <div className="contenedor flex flex-col gap-5">
          <h2 className={h2}>¿Quieres algo parecido?</h2>
          <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
            {contacto.whatsapp ? (
              <BotonWhatsApp
                numero={contacto.whatsapp}
                mensaje={mensajeTrabajo(trabajo)}
                className={buttonVariants({ variant: "whatsappSecundario" })}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
                Quiero algo parecido
              </BotonWhatsApp>
            ) : (
              <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "llamadaContorno" })}>
                <Phone aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
                <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
              </BotonLlamada>
            )}
            <EnlaceComoLlegar contacto={contacto} />
          </div>
        </div>
      </section>

      <Instalaciones trabajos={otros} titulo="Otras instalaciones" max={3} className="bg-piedra" />

      <CtaFinal contacto={contacto} />
    </>
  );
}
