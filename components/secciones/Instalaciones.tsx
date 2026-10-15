import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { Foto } from "@/components/Foto";
import { buttonVariants } from "@/components/ui/button";
import { h2, seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";
import { TarjetaInstalacion } from "./TarjetaInstalacion";

type Props = {
  trabajos: SiteConfig["trabajos"];
  /** Solo se usa si no hay trabajos: 4 fotos con título, sin enlaces por foto. */
  galeria?: SiteConfig["galeria"];
  titulo?: string;
  nivel?: "h2" | "h3";
  /** Tarjetas de trabajos (por defecto 3). */
  max?: number;
  verTodo?: boolean;
  className?: string;
};

/** Instalaciones recientes: trabajos con ficha o, sin ellos, la galería. Nada: nada. */
export function Instalaciones({
  trabajos,
  galeria = [],
  titulo = "Instalaciones recientes",
  nivel: Titulo = "h2",
  max = 3,
  verTodo = true,
  className,
}: Props) {
  if (trabajos.length === 0 && galeria.length === 0) return null;
  const hijo = Titulo === "h2" ? "h3" : "h4";

  const enlaceTodas = (
    <Link href="/trabajos" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "self-start")}>
      Ver todas las instalaciones
      <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-5" />
    </Link>
  );

  if (trabajos.length > 0) {
    const visibles = trabajos.slice(0, max);
    return (
      <section className={cn(seccion, className)}>
        <div className="contenedor flex flex-col gap-6 md:gap-8">
          <Titulo className={h2}>{titulo}</Titulo>
          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3 md:gap-5">
            {visibles.map((t) => (
              <li key={t.slug}>
                <TarjetaInstalacion trabajo={t} nivel={hijo} />
              </li>
            ))}
          </ul>
          {verTodo && enlaceTodas}
        </div>
      </section>
    );
  }

  const fotos = galeria.slice(0, 4);
  return (
    <section className={cn(seccion, className)}>
      <div className="contenedor flex flex-col gap-6 md:gap-8">
        <Titulo className={h2}>{titulo}</Titulo>
        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4 md:gap-5">
          {fotos.map((f, i) => (
            <li key={`${f.src}-${i}`}>
              <figure className="m-0 flex flex-col gap-2">
                <Foto imagen={f} proporcion="4/3" sizes="(min-width: 1200px) 282px, (min-width: 768px) 23vw, 46vw" />
                {f.titulo && <figcaption className="text-sm leading-[1.35] text-tinta-suave">{f.titulo}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
        {verTodo && galeria.length > fotos.length && enlaceTodas}
      </div>
    </section>
  );
}
