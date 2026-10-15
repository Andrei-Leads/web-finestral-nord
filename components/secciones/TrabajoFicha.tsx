import type { Trabajo } from "@andrei-leads/core";

/** Franja piedra con los datos de la instalación. Solo lo que exista; sin datos, no sale. */
export function TrabajoFicha({ trabajo }: { trabajo: Trabajo }) {
  const datos = [
    ["Ubicación", trabajo.ubicacion],
    ["Superficie", trabajo.superficie],
    ["Duración", trabajo.duracion],
    ["Año", trabajo.anio?.toString()],
    ["Precio", trabajo.precio],
  ].filter((d): d is [string, string] => Boolean(d[1]));
  if (datos.length === 0) return null;

  return (
    <div className="bg-piedra py-5 md:py-6">
      <dl className="contenedor m-0 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {datos.map(([etiqueta, valor]) => (
          <div key={etiqueta} className="flex min-w-0 flex-col gap-1">
            <dt className="text-sm font-medium text-tinta-suave">{etiqueta}</dt>
            <dd className="m-0 font-semibold tabular-nums">{valor}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
