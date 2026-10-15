import Link from "next/link";
import type { Imagen } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { Foto } from "@/components/Foto";
import { buttonVariants } from "@/components/ui/button";
import { h2, seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = { imagenes: Imagen[]; className?: string };

/** Teaser de la exposición: mosaico 1 grande + 2 pequeñas (sin huecos con 1 o 2 imágenes). */
export function ExposicionTeaser({ imagenes, className }: Props) {
  if (imagenes.length === 0) return null;
  const [grande, b, c] = imagenes;
  const sizesGrande = "(min-width: 1248px) 576px, (min-width: 768px) 46vw, 100vw";
  const sizesPeq = "(min-width: 1248px) 288px, (min-width: 768px) 23vw, 50vw";

  return (
    <section className={cn("bg-piedra", seccion, className)}>
      <div className="contenedor grid items-center gap-6 md:grid-cols-[5fr_7fr] md:gap-12">
        <div className="flex flex-col gap-4">
          <h2 className={h2}>La exposición</h2>
          <p className="m-0 text-lg text-tinta-suave">Ven a verlo en persona</p>
          <Link href="/empresa" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "self-start")}>
            Conoce la exposición
            <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-5" />
          </Link>
        </div>
        <div className={cn("grid gap-2 md:gap-3", b ? "grid-cols-2" : "grid-cols-1")}>
          <Foto
            imagen={grande}
            proporcion="16/9"
            sizes={sizesGrande}
            radio="tarjeta"
            className={cn(b && "col-span-2")}
          />
          {b && <Foto imagen={b} proporcion="4/3" sizes={sizesPeq} radio="tarjeta" className={cn(!c && "col-span-2")} />}
          {c && <Foto imagen={c} proporcion="4/3" sizes={sizesPeq} radio="tarjeta" />}
        </div>
      </div>
    </section>
  );
}
