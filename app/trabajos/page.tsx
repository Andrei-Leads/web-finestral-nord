import type { Metadata } from "next";
import { metadatosPagina, type Trabajo } from "@andrei-leads/core";
import { notFound } from "next/navigation";

import { Foto } from "@/components/Foto";
import { Migas } from "@/components/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TarjetaInstalacion } from "@/components/secciones/TarjetaInstalacion";
import config from "@/site.config";
import { hayTrabajos } from "@/lib/navegacion";
import { h1Interior, seccion } from "@/lib/estilos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Instalaciones" });

const chip =
  "inline-flex min-h-11 items-center rounded-pastilla border border-linea bg-primario-tinte px-4 text-[15px] font-semibold text-tinta hover:border-tinta-suave";

const h2Grupo = "m-0 text-[clamp(1.375rem,1.2rem+0.8vw,1.75rem)] leading-[1.15] font-bold tracking-[-0.01em]";

function Rejilla({ trabajos, nivel }: { trabajos: Trabajo[]; nivel: "h2" | "h3" }) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3 md:gap-5">
      {trabajos.map((t) => (
        <li key={t.slug}>
          <TarjetaInstalacion trabajo={t} nivel={nivel} />
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, servicios, galeria, contacto } = config;

  // Grupos por familia (en el orden del catálogo) + los que no tienen familia.
  const grupos = servicios
    .map((s) => ({ slug: s.slug, titulo: s.titulo, items: trabajos.filter((t) => t.servicio === s.slug) }))
    .filter((g) => g.items.length > 0);
  const slugsGrupo = new Set(grupos.map((g) => g.slug));
  const otros = trabajos.filter((t) => !t.servicio || !slugsGrupo.has(t.servicio));
  const conFiltro = grupos.length >= 2 && trabajos.length >= 4;

  return (
    <>
      <section className={`contenedor flex flex-col gap-6 pt-2 md:gap-8 ${seccion}`}>
        <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Instalaciones" }]} />
        <h1 className={h1Interior}>Instalaciones</h1>

        {trabajos.length === 0 ? (
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {galeria.map((f, i) => (
              <li key={`${f.src}-${i}`}>
                <figure className="m-0 flex flex-col gap-2">
                  <Foto imagen={f} proporcion="4/3" sizes="(min-width: 1200px) 282px, (min-width: 768px) 31vw, 46vw" />
                  {f.titulo && <figcaption className="text-sm leading-[1.35] text-tinta-suave">{f.titulo}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        ) : conFiltro ? (
          <>
            <nav aria-label="Ir a una familia" className="border-y border-linea py-3">
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                <li>
                  <a href="#instalaciones-lista" className={chip}>
                    Todas
                  </a>
                </li>
                {grupos.map((g) => (
                  <li key={g.slug}>
                    <a href={`#familia-${g.slug}`} className={chip}>
                      {g.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div id="instalaciones-lista" className="flex flex-col gap-[clamp(32px,4vw,56px)]">
              {grupos.map((g) => (
                <section key={g.slug} id={`familia-${g.slug}`} aria-labelledby={`titulo-${g.slug}`} className="flex scroll-mt-20 flex-col gap-5">
                  <h2 id={`titulo-${g.slug}`} className={h2Grupo}>
                    {g.titulo}
                  </h2>
                  <Rejilla trabajos={g.items} nivel="h3" />
                </section>
              ))}
              {otros.length > 0 && (
                <section id="familia-otras" aria-labelledby="titulo-otras" className="flex scroll-mt-20 flex-col gap-5">
                  <h2 id="titulo-otras" className={h2Grupo}>
                    Otras instalaciones
                  </h2>
                  <Rejilla trabajos={otros} nivel="h3" />
                </section>
              )}
            </div>
          </>
        ) : (
          <Rejilla trabajos={trabajos} nivel="h2" />
        )}
      </section>
      <CtaFinal contacto={contacto} />
    </>
  );
}
