import type { Empresa } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { iniciales } from "@/lib/formato";
import { h2, seccion } from "@/lib/estilos";

/** El equipo: tarjetas 1:1 (foto o iniciales sobre piedra, mismo tamaño). Sin equipo, nada. */
export function EmpresaEquipo({ equipo }: { equipo: Empresa["equipo"] }) {
  if (equipo.length === 0) return null;
  return (
    <section className={seccion}>
      <div className="contenedor flex flex-col gap-6 md:gap-8">
        <h2 className={h2}>El equipo</h2>
        <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-6 p-0 sm:grid-cols-3 lg:grid-cols-4">
          {equipo.map((p, i) => (
            <li key={`${p.nombre}-${i}`} className="flex min-w-0 flex-col gap-3">
              {p.foto ? (
                <Foto imagen={p.foto} proporcion="1/1" sizes="(min-width: 1200px) 282px, (min-width: 640px) 33vw, 50vw" />
              ) : (
                <div
                  aria-hidden="true"
                  className="grid aspect-square place-items-center rounded-foto bg-piedra text-[clamp(2rem,1.5rem+2vw,3rem)] font-bold text-tinta-suave"
                >
                  {iniciales(p.nombre)}
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="m-0 text-lg leading-[1.3] font-bold">{p.nombre}</h3>
                {p.cargo && <p className="m-0 text-tinta-suave">{p.cargo}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
