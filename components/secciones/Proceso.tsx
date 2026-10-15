import type { SiteConfig } from "@andrei-leads/core";

import { h2, seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Paso = { titulo: string; texto: string };

const PASOS_TIENDA: Paso[] = [
  { titulo: "Ven a la exposición o escríbenos", texto: "Cuéntanos qué necesitas y mira las muestras." },
  { titulo: "Medimos en tu casa", texto: "Tomamos las medidas en el hueco real." },
  { titulo: "Presupuesto por escrito", texto: "Con el detalle de lo que incluye." },
  { titulo: "Fabricación", texto: "Preparamos tu pedido a medida." },
  { titulo: "Instalación", texto: "Lo colocamos y lo dejamos funcionando." },
  { titulo: "Garantía", texto: "Cualquier duda posterior, con nosotros." },
];

type Props = {
  proceso: SiteConfig["proceso"];
  titulo?: string;
  nivel?: "h2" | "h3";
  className?: string;
  /** Sin fondo propio ni padding de sección (cuando lo aporta la página). */
  sinSeccion?: boolean;
};

/** Cómo trabajamos: línea de tiempo vertical en móvil, 3 × 2 en escritorio. Vacío: 6 pasos de tienda. */
export function Proceso({ proceso, titulo = "Cómo trabajamos", nivel: Titulo = "h2", className, sinSeccion }: Props) {
  const pasos: Paso[] = proceso.length > 0 ? proceso : PASOS_TIENDA;
  const hijo = Titulo === "h2" ? "h3" : "h4";
  const Hijo = hijo;
  return (
    <section className={cn(!sinSeccion && seccion, className)}>
      <div className={cn("flex flex-col gap-6 md:gap-8", !sinSeccion && "contenedor")}>
        <Titulo className={h2}>{titulo}</Titulo>
        <ol className="m-0 grid list-none gap-0 p-0 md:grid-cols-3 md:gap-x-8 md:gap-y-8">
          {pasos.map((p, i) => (
            <li
              key={p.titulo}
              className={cn(
                "relative flex gap-4 pb-6 md:block md:pb-0",
                i < pasos.length - 1 &&
                  "before:absolute before:top-10 before:bottom-0 before:left-[17px] before:w-0.5 before:bg-linea before:content-[''] md:before:hidden"
              )}
            >
              <span
                aria-hidden="true"
                className="flex size-9 flex-none items-center justify-center rounded-full bg-grafito text-sm font-bold text-white tabular-nums md:mb-3"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <Hijo className="m-0 text-base leading-[1.3] font-bold md:text-lg">{p.titulo}</Hijo>
                <p className="mt-1 mb-0 text-[15px] leading-[1.5] text-tinta-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
