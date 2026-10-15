import type { Metadata } from "next";
import { BotonLlamada, BotonWhatsApp, metadatosPagina } from "@andrei-leads/core";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { Migas } from "@/components/Migas";
import { AsistenteCompacto } from "@/components/secciones/AsistenteCompacto";
import { Visitanos } from "@/components/secciones/Visitanos";
import { Zonas } from "@/components/secciones/Zonas";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { telefonoVisible } from "@/lib/formato";
import { h1Interior, h2, seccion } from "@/lib/estilos";
import { mensajeGeneral } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

export default function Page() {
  const { contacto, servicios, zonas } = config;
  return (
    <>
      <section className={`contenedor flex flex-col gap-6 pt-2 md:gap-8 ${seccion}`}>
        <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Contacto" }]} />
        <h1 className={h1Interior}>Contacto</h1>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <Visitanos contacto={contacto} variante="completo" conAncla />
          <div className="flex flex-col gap-5">
            <h2 className={h2}>Llámanos o escríbenos</h2>
            <div className="flex flex-col gap-2">
              <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "llamadaContorno" })}>
                <Phone aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
                <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
              </BotonLlamada>
              {contacto.whatsapp && (
                <BotonWhatsApp
                  numero={contacto.whatsapp}
                  mensaje={mensajeGeneral(contacto)}
                  className={buttonVariants({ variant: "whatsappSecundario" })}
                >
                  <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
                  Pregúntanos por WhatsApp
                </BotonWhatsApp>
              )}
              <a
                href={`mailto:${contacto.email}`}
                className="inline-flex min-h-11 items-center gap-2.5 self-start break-all font-semibold text-tinta underline underline-offset-4 hover:decoration-2"
              >
                <Mail aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none text-laton" />
                {contacto.email}
              </a>
            </div>
          </div>
        </div>
        {contacto.whatsapp && (
          <div>
            <AsistenteCompacto servicios={servicios.map((s) => s.titulo)} whatsapp={contacto.whatsapp} />
          </div>
        )}
      </section>
      <Zonas zonas={zonas} className="pt-0" />
    </>
  );
}
