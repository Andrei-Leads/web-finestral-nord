import { Badge } from "@/components/ui/badge";
import { h2, seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = { zonas: string[]; nivel?: "h2" | "h3"; className?: string };

/** «Instalamos en»: pastillas de texto, nunca enlaces. Vacía: nada. */
export function Zonas({ zonas, nivel: Titulo = "h2", className }: Props) {
  if (zonas.length === 0) return null;
  return (
    <section className={cn(seccion, className)}>
      <div className="contenedor flex flex-col gap-5 md:gap-6">
        <Titulo className={h2}>Instalamos en</Titulo>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {zonas.map((z) => (
            <li key={z}>
              <Badge>{z}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
