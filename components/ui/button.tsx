import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * Variantes de botón del diseño «Exposición» (Specs §4).
 * Se usan con <Button>, con <a>/<Link> (buttonVariants) y como className de
 * BotonLlamada / BotonWhatsApp de core (core pone el comportamiento; el aspecto sale de aquí).
 * Botones rectos de 10 px (rounded-boton), peso 600, área ≥ 44 px.
 */
const base = "no-underline select-none transition-[color,background-color,filter] disabled:pointer-events-none disabled:opacity-50";
const caja = "inline-flex items-center justify-center rounded-boton font-semibold";
/** Relleno primario con texto blanco. */
const relleno = "bg-primario text-sobre-primario hover:brightness-110";

const buttonVariants = cva(base, {
  variants: {
    variant: {
      /* «Cómo llegar»: <a> a Google Maps, relleno primario, ≥ 52 px, icono Navigation. */
      llegarPrincipal: `${caja} min-h-13 gap-2.5 px-[18px] text-base ${relleno}`,
      /* BotonLlamada sobre grafito (Visítanos, CTA final): contorno blanco 2 px. */
      llamadaVisitanos: `${caja} min-h-13 gap-2.5 whitespace-nowrap border-2 border-white px-[18px] text-base tabular-nums text-white hover:bg-white/10`,
      /* BotonLlamada sobre papel (servicio, /contacto): contorno grafito 2 px, texto tinta. */
      llamadaContorno: `${caja} min-h-13 gap-2.5 border-2 border-grafito bg-transparent px-[18px] text-base tabular-nums text-tinta hover:bg-piedra`,
      /* Cabecera: móvil 48 × 48 (icono sobre «Llegar» 12 px), escritorio 44 px icono + «Cómo llegar». */
      llegarCabecera: `${caja} min-h-12 min-w-12 flex-col gap-0.5 px-1.5 text-xs leading-none md:min-h-11 md:flex-row md:gap-2 md:px-3.5 md:text-[15px] ${relleno}`,
      /* Cabecera: móvil 50 × 48 icono + «Llamar», contorno grafito; escritorio, número completo. */
      llamadaCabecera: `${caja} min-h-12 min-w-[50px] flex-col gap-0.5 border-2 border-grafito px-1.5 text-xs leading-none tabular-nums text-tinta hover:bg-piedra md:min-h-11 md:flex-row md:gap-2 md:px-3.5 md:text-[15px]`,
      /* Barra móvil: 48 px. Llamar primario a la izquierda, WhatsApp grafito a la derecha. */
      barraLlamar: `${caja} min-h-12 flex-1 gap-2 px-3 text-base ${relleno}`,
      barraWhatsapp: `${caja} min-h-12 flex-1 gap-2 bg-grafito px-3 text-base text-white hover:brightness-125`,
      /* BotonWhatsApp secundario (servicio, trabajo, /contacto): contorno 1,5 px tinta suave. */
      whatsappSecundario: `${caja} min-h-12 gap-2 border-[1.5px] border-tinta-suave bg-transparent px-4 text-base text-tinta hover:bg-piedra`,
      /* Final del asistente: relleno grafito, ≥ 52 px, todo el ancho. */
      whatsappAsistente: `${caja} min-h-13 w-full gap-2.5 bg-grafito px-5 text-base text-white hover:brightness-125`,
      /* Pasos del asistente (<button role="radio">). Elegido (aria-checked): primario + blanco. */
      chipOpcion:
        "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-pastilla border border-linea bg-primario-tinte px-4 text-[15px] font-semibold text-tinta hover:border-tinta-suave aria-checked:border-primario aria-checked:bg-primario aria-checked:text-sobre-primario",
      /* «Ver todo el catálogo», «Conoce la exposición»…: texto con flecha. */
      enlaceFlecha:
        "inline-flex min-h-11 items-center gap-2 rounded-boton font-semibold text-tinta underline underline-offset-4 hover:decoration-2",
      /* «Atrás», «Cambiar»: botón de texto. */
      textoAtras:
        "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-boton px-2 font-medium text-tinta underline underline-offset-4 hover:decoration-2",
    },
  },
  defaultVariants: {
    variant: "llamadaContorno",
  },
});

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
