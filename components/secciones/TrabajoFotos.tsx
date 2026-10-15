import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";

const etiqueta =
  "absolute bottom-2 left-2 rounded-pastilla bg-tarjeta px-2.5 py-1 text-sm leading-none font-semibold text-tinta";

/** Foto principal (21:9 en escritorio, 4:3 en móvil) o par Antes / Después, y el resto en rejilla 4:3. */
export function TrabajoFotos({ trabajo }: { trabajo: Trabajo }) {
  const [principal, ...resto] = trabajo.imagenes;
  if (!principal) return null;
  return (
    <div className="flex flex-col gap-4">
      {trabajo.antes ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Foto imagen={trabajo.antes} proporcion="4/3" sizes="(min-width: 1200px) 592px, (min-width: 768px) 50vw, 100vw">
            <span className={etiqueta}>Antes</span>
          </Foto>
          <Foto imagen={principal} proporcion="4/3" priority sizes="(min-width: 1200px) 592px, (min-width: 768px) 50vw, 100vw">
            <span className={etiqueta}>Después</span>
          </Foto>
        </div>
      ) : (
        <Foto
          imagen={principal}
          proporcion="21/9"
          priority
          className="max-md:aspect-[4/3]"
          sizes="(min-width: 1200px) 1200px, 100vw"
        />
      )}
      {resto.length > 0 && (
        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-3 md:gap-4">
          {resto.map((img, i) => (
            <li key={`${img.src}-${i}`}>
              <Foto imagen={img} proporcion="4/3" sizes="(min-width: 1200px) 390px, (min-width: 768px) 33vw, 50vw" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
