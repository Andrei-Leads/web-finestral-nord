import type { SiteConfig } from "@andrei-leads/core";
import type { Ancla } from "./formato";

/** /trabajos existe si hay trabajos o, al menos, fotos en la galería. */
export function hayTrabajos(config: Pick<SiteConfig, "trabajos" | "galeria">): boolean {
  return config.trabajos.length > 0 || config.galeria.length > 0;
}

/** Menú de cabecera y pie: Catálogo · Instalaciones (solo si existe la ruta) · Exposición · Contacto. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  const items: Ancla[] = [{ href: "/servicios", texto: "Catálogo" }];
  if (hayTrabajos(config)) items.push({ href: "/trabajos", texto: "Instalaciones" });
  items.push({ href: "/empresa", texto: "Exposición" });
  items.push({ href: "/contacto", texto: "Contacto" });
  return items;
}
