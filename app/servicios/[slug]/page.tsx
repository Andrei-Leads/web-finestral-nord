import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BotonLlamada, BotonWhatsApp, metadatosServicio } from "@andrei-leads/core";
import { Check, MessageCircle, Phone } from "lucide-react";

import config from "@/site.config";
import { Migas } from "@/components/Migas";
import { AsistenteCompacto } from "@/components/secciones/AsistenteCompacto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { GaleriaServicio } from "@/components/secciones/GaleriaServicio";
import { IconoFamilia } from "@/components/secciones/IconoFamilia";
import { Preguntas } from "@/components/secciones/Preguntas";
import { TarjetaInstalacion } from "@/components/secciones/TarjetaInstalacion";
import { TarjetaProducto } from "@/components/secciones/TarjetaProducto";
import { EnlaceComoLlegar } from "@/components/secciones/Visitanos";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { h1Interior, h2, seccion } from "@/lib/estilos";
import { listaY, telefonoVisible } from "@/lib/formato";
import { mensajeServicio } from "@/lib/mensajes";

// Con cacheComponents, generateStaticParams no puede devolver [].
export function generateStaticParams() {
  const params = config.servicios.map((s) => ({ slug: s.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosServicio(config, slug);
}

export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = config.servicios.find((s) => s.slug === slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const trabajos = config.trabajos.filter((t) => t.servicio === servicio.slug);
  const otros = config.servicios.filter((s) => s.slug !== servicio.slug).slice(0, 4);
  const bloqueContenido = servicio.contenido.length > 0 || servicio.incluye.length > 0 || config.marcas.length > 0;

  return (
    <>
      <div className="contenedor pt-4">
        <Migas
          items={[
            { href: "/", texto: "Inicio" },
            { href: "/servicios", texto: "Catálogo" },
            { texto: servicio.titulo },
          ]}
        />
      </div>

      <div className="contenedor grid items-start gap-x-[clamp(32px,5vw,64px)] gap-y-6 pt-4 pb-[clamp(32px,5vw,64px)] md:grid-cols-2">
        {servicio.imagenes.length > 0 ? (
          <GaleriaServicio imagenes={servicio.imagenes} />
        ) : (
          <div aria-hidden="true" className="flex aspect-[4/3] items-center justify-center rounded-tarjeta bg-primario-tinte">
            <IconoFamilia titulo={servicio.titulo} />
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-5">
          <h1 className={h1Interior}>
            {servicio.titulo} en {contacto.direccion.ciudad}
          </h1>
          <div className="flex flex-col gap-4 rounded-tarjeta bg-tarjeta p-5 shadow-tarjeta md:p-6">
            {servicio.precioDesde && (
              <Badge variant="precio" className="self-start">
                {servicio.precioDesde}
              </Badge>
            )}
            <p className="m-0 text-[17px] leading-[1.55] text-pretty">{servicio.descripcion}</p>
            <p className="m-0 font-bold">Ven a verlas a la exposición</p>
            <div className="flex flex-col gap-2">
              <EnlaceComoLlegar contacto={contacto} />
              <BotonLlamada
                telefono={contacto.telefono}
                className={buttonVariants({ variant: "llamadaContorno" })}
              >
                <Phone aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
                <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
              </BotonLlamada>
              {contacto.whatsapp && (
                <BotonWhatsApp
                  numero={contacto.whatsapp}
                  mensaje={mensajeServicio(servicio)}
                  className={buttonVariants({ variant: "whatsappSecundario" })}
                >
                  <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
                  <span>Pregúntanos por WhatsApp</span>
                </BotonWhatsApp>
              )}
            </div>
          </div>
        </div>
      </div>

      {bloqueContenido && (
        <section className="pb-[clamp(32px,5vw,64px)]">
          <div className="contenedor flex flex-col gap-8">
            {servicio.contenido.length > 0 && (
              <div className="flex max-w-[64ch] flex-col gap-3.5">
                {servicio.contenido.map((p, i) => (
                  <p key={i} className="m-0 text-[17px] leading-[1.65] text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {servicio.incluye.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className={h2}>Qué incluye</h2>
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {servicio.incluye.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5">
                      <Check aria-hidden="true" strokeWidth={2} className="mt-0.5 size-5 flex-none text-laton" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {config.marcas.length > 0 && (
              <p className="m-0 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] text-tinta-suave">
                Trabajamos con <strong className="text-base font-bold text-tinta">{listaY(config.marcas)}</strong>
              </p>
            )}
          </div>
        </section>
      )}

      {trabajos.length > 0 && (
        <section className={`bg-piedra ${seccion}`}>
          <div className="contenedor flex flex-col gap-6 md:gap-8">
            <h2 className={h2}>Instalaciones de {servicio.titulo}</h2>
            <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-3 md:gap-5">
              {trabajos.slice(0, 3).map((t) => (
                <li key={t.slug}>
                  <TarjetaInstalacion trabajo={t} nivel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Preguntas preguntas={servicio.preguntas} nivel="h2" />

      {contacto.whatsapp && (
        <div className="contenedor pb-[clamp(40px,6vw,88px)]">
          <AsistenteCompacto
            servicios={config.servicios.map((s) => s.titulo)}
            whatsapp={contacto.whatsapp}
            servicioFijo={servicio.titulo}
          />
        </div>
      )}

      {otros.length > 0 && (
        <section className={`bg-piedra ${seccion}`}>
          <div className="contenedor flex flex-col gap-6 md:gap-8">
            <h2 className={h2}>Otros productos</h2>
            <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4 md:gap-5">
              {otros.map((s) => (
                <li key={s.slug}>
                  <TarjetaProducto servicio={s} nivel="h3" sizes="(min-width: 1200px) 282px, (min-width: 768px) 24vw, 46vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaFinal contacto={contacto} />
    </>
  );
}
