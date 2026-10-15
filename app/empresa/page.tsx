import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { Migas } from "@/components/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EmpresaEquipo } from "@/components/secciones/EmpresaEquipo";
import { Garantias } from "@/components/secciones/Garantias";
import { Marcas } from "@/components/secciones/Marcas";
import { Proceso } from "@/components/secciones/Proceso";
import { Visitanos } from "@/components/secciones/Visitanos";
import { Zonas } from "@/components/secciones/Zonas";
import config from "@/site.config";
import { anioActual } from "@/lib/anio";
import { h1Interior, h2, seccion } from "@/lib/estilos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Nuestra exposición" });

export default async function Page() {
  const { negocio, empresa, contacto, acreditaciones, marcas, proceso, garantias, zonas } = config;
  const [principal, ...resto] = empresa.imagenes;
  const pequenas = resto.slice(0, 2);
  const hayHistoria = empresa.historia.length > 0;
  const anios = negocio.anioFundacion ? (await anioActual()) - negocio.anioFundacion : 0;
  // Con algún dato propio, la página es «completa» y lleva también el proceso (con los pasos por
  // defecto si `proceso` está vacío). Todo vacío: descripción + Visítanos + zonas + CTA.
  const hayEmpresa =
    hayHistoria ||
    empresa.imagenes.length > 0 ||
    empresa.equipo.length > 0 ||
    acreditaciones.length > 0 ||
    garantias.length > 0 ||
    marcas.length > 0 ||
    negocio.anioFundacion !== undefined;

  return (
    <>
      <section className={`contenedor flex flex-col gap-6 pt-2 md:gap-8 ${seccion}`}>
        <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Nuestra exposición" }]} />
        <h1 className={h1Interior}>Nuestra exposición</h1>
        {principal ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
            <div className="flex flex-col gap-3 md:gap-4">
              <Foto
                imagen={principal}
                proporcion="4/3"
                radio="tarjeta"
                priority
                sizes="(min-width: 1200px) 640px, (min-width: 1024px) 52vw, 100vw"
              />
              {pequenas.length > 0 && (
                <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:gap-4">
                  {pequenas.map((img, i) => (
                    <li key={`${img.src}-${i}`}>
                      <Foto imagen={img} proporcion="4/3" sizes="(min-width: 1200px) 312px, (min-width: 1024px) 26vw, 50vw" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Visitanos contacto={contacto} variante="completo" />
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
            <p className="m-0 max-w-[68ch] text-lg text-pretty text-tinta-suave">{negocio.descripcionCorta}</p>
            <Visitanos contacto={contacto} variante="completo" />
          </div>
        )}
      </section>

      {hayHistoria && (
        <section className="bg-piedra py-[clamp(40px,6vw,88px)]">
          <div className="contenedor flex flex-col gap-5">
            <h2 className={h2}>Nuestra historia</h2>
            {anios > 0 && (
              <p className="m-0 text-xl font-bold tabular-nums">
                {anios} años en {contacto.direccion.ciudad}
              </p>
            )}
            <div className="flex max-w-[68ch] flex-col gap-4 text-[17px] leading-[1.65]">
              {empresa.historia.map((p, i) => (
                <p key={i} className="m-0 text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      <EmpresaEquipo equipo={empresa.equipo} />

      {marcas.length > 0 && (
        <section className={seccion}>
          <div className="contenedor">
            <Marcas marcas={marcas} variante="placas" />
          </div>
        </section>
      )}

      <Garantias
        garantias={garantias}
        acreditaciones={acreditaciones}
        // Con historia, «{n} años» ya sale en «Nuestra historia»: no se repite.
        anioFundacion={hayHistoria ? undefined : negocio.anioFundacion}
        ciudad={contacto.direccion.ciudad}
      />
      {(proceso.length > 0 || hayEmpresa) && <Proceso proceso={proceso} />}
      <Zonas zonas={zonas} />

      <CtaFinal contacto={contacto} />
    </>
  );
}
