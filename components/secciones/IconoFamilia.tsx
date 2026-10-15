import {
  AppWindow,
  Blinds,
  DoorClosed,
  Fence,
  Grid3x3,
  PanelsTopLeft,
  Ruler,
  ShowerHead,
  Square,
  Umbrella,
  type LucideIcon,
} from "lucide-react";
import { crearSlug } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

const PALABRAS: [string, LucideIcon][] = [
  ["ventana", AppWindow],
  ["toldo", Umbrella],
  ["mampara", ShowerHead],
  ["ducha", ShowerHead],
  ["puerta", DoorClosed],
  ["mosquitera", Grid3x3],
  ["cristal", Square],
  ["vidrio", Square],
  ["cerramiento", PanelsTopLeft],
  ["persiana", Blinds],
  ["reja", Fence],
];

/** Icono lucide por palabra clave del título (tarjeta sin foto). Por defecto, Ruler. */
export function IconoFamilia({ titulo, className }: { titulo: string; className?: string }) {
  const slug = crearSlug(titulo);
  const Icono = PALABRAS.find(([palabra]) => slug.includes(palabra))?.[1] ?? Ruler;
  return <Icono aria-hidden="true" strokeWidth={1.25} className={cn("size-1/3 text-tinta", className)} />;
}
