import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { h2 } from "@/lib/estilos";

type Props = {
  marcas: string[];
  /**
   * - `fila`: «Trabajamos con» dentro de la franja piedra del catálogo (inicio).
   * - `banda`: franja piedra propia (/servicios).
   * - `placas`: título + pastillas de texto (/empresa).
   */
  variante?: "fila" | "banda" | "placas";
  nivel?: "h2" | "h3";
  className?: string;
};

function FilaTexto({ marcas }: { marcas: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap items-center gap-x-2.5 gap-y-1 p-0 font-bold text-tinta">
      {marcas.map((m, i) => (
        <li key={m} className="flex items-center gap-2.5">
          {i > 0 && <span aria-hidden="true" className="size-1.5 rounded-full bg-laton" />}
          {m}
        </li>
      ))}
    </ul>
  );
}

/** Marcas con las que trabaja el cliente: solo texto, nunca logos. Vacía: nada. */
export function Marcas({ marcas, variante = "fila", nivel: Titulo = "h2", className }: Props) {
  if (marcas.length === 0) return null;

  if (variante === "placas") {
    return (
      <div className={className}>
        <Titulo className={h2}>Trabajamos con</Titulo>
        <p className="mt-4 mb-0 text-tinta-suave">
          Perfiles y sistemas que puedes ver montados en la exposición
        </p>
        <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
          {marcas.map((m) => (
            <li key={m}>
              <Badge className="font-bold">{m}</Badge>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const fila = (
    <div className={cn("flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5", variante === "fila" && className)}>
      <p className="m-0 text-sm font-semibold text-tinta-suave">Trabajamos con</p>
      <FilaTexto marcas={marcas} />
    </div>
  );

  if (variante === "banda") {
    return (
      <div className={cn("bg-piedra py-6", className)}>
        <div className="contenedor">{fila}</div>
      </div>
    );
  }
  return fila;
}
