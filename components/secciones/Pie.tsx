import Link from "next/link";
import {
  BotonLlamada,
  BotonWhatsApp,
  enlacesLegales,
  formatearHorario,
  type SiteConfig,
} from "@andrei-leads/core";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";

import { anioActual } from "@/lib/anio";
import { listaRedes, telefonoVisible, type Ancla } from "@/lib/formato";
import { urlComoLlegar } from "@/lib/llegar";
import { mensajeGeneral } from "@/lib/mensajes";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  items: Ancla[];
};

/** Todo enlace del pie: 44 px de alto, blanco. */
const enlace =
  "flex min-h-11 items-center gap-2 rounded-boton text-[15px] text-white no-underline hover:underline hover:underline-offset-4";
const titulo = "mb-1 text-[13px] font-semibold text-sobre-grafito-suave";

export async function Pie({ negocio, contacto, redes, items }: Props) {
  const anio = await anioActual();
  const listaDeRedes = listaRedes(redes);
  const horario = formatearHorario(contacto.horario);
  const { calle, cp, ciudad } = contacto.direccion;

  return (
    <footer className="sobre-grafito pt-[clamp(40px,6vw,64px)] pb-6">
      <div className="contenedor flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <strong className="text-xl leading-[1.2] font-extrabold tracking-[-0.015em]">
              {negocio.nombre}
            </strong>
            <p className="m-0 max-w-[36ch] text-[15px] text-sobre-grafito-suave">
              {negocio.descripcionCorta}
            </p>
          </div>

          <nav aria-label="Pie" className="flex flex-col">
            <p className={titulo}>Páginas</p>
            {items.map((item) => (
              <Link key={item.href} href={item.href} className={enlace}>
                {item.texto}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1.5 text-[15px]">
            <p className={titulo + " m-0"}>Exposición</p>
            <p className="m-0">
              {calle}
              <br />
              {cp} {ciudad}
            </p>
            <a
              href={urlComoLlegar(contacto)}
              target="_blank"
              rel="noopener noreferrer"
              className={enlace + " self-start font-semibold underline underline-offset-4"}
            >
              Cómo llegar
              <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="ml-1 size-4 flex-none" />
            </a>
            {horario.map((h) => (
              <p key={h.dias} className="m-0 text-sobre-grafito-suave tabular-nums">
                {h.dias} · {h.horas}
              </p>
            ))}
          </div>

          <div className="flex flex-col">
            <p className={titulo}>Contacto</p>
            <BotonLlamada telefono={contacto.telefono} className={enlace + " tabular-nums"}>
              <Phone aria-hidden="true" strokeWidth={1.75} className="size-[18px] flex-none" />
              <span>{telefonoVisible(contacto.telefono)}</span>
            </BotonLlamada>
            {contacto.whatsapp && (
              <BotonWhatsApp
                numero={contacto.whatsapp}
                mensaje={mensajeGeneral(contacto)}
                className={enlace}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-[18px] flex-none" />
                <span>WhatsApp</span>
              </BotonWhatsApp>
            )}
            <a href={`mailto:${contacto.email}`} className={enlace}>
              <Mail aria-hidden="true" strokeWidth={1.75} className="size-[18px] flex-none" />
              <span className="break-all">{contacto.email}</span>
            </a>
            {listaDeRedes.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-x-5">
                {listaDeRedes.map((red) => (
                  <a
                    key={red.href}
                    href={red.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={enlace + " font-semibold underline underline-offset-4"}
                  >
                    {red.texto}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-white/15 pt-4 text-sm text-sobre-grafito-suave">
          <p className="m-0 flex min-h-11 items-center">
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5">
            {enlacesLegales.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex min-h-11 items-center rounded-boton text-sobre-grafito-suave underline underline-offset-4 hover:text-white"
              >
                {l.texto}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
