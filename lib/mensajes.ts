import type { SiteConfig, Servicio, Trabajo } from "@andrei-leads/core";

export const MENSAJE_GENERICO = "Hola, os escribo desde vuestra web.";

/** Inicio, cabecera, barra móvil y contacto. */
export function mensajeGeneral(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return contacto.mensajeWhatsapp ?? MENSAJE_GENERICO;
}

/** `whatsapp-secundario` de /servicios/[slug]. */
export function mensajeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return servicio.mensajeWhatsapp ?? `Hola, quiero información sobre ${servicio.titulo}`;
}

/** /trabajos/[slug]. */
export function mensajeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return `Hola, he visto el trabajo «${trabajo.titulo}» y quiero algo parecido`;
}

/** "Lo antes posible" → "lo antes posible" (respuestas con inicial en minúscula, Specs §6). */
function minuscula(texto: string): string {
  return texto.charAt(0).toLowerCase() + texto.slice(1);
}

/**
 * Mensaje del asistente compacto (Specs §6). Siempre a partir de `titulo`;
 * «Otro» → «Me interesa otro producto». `servicios[].mensajeWhatsapp` nunca se empalma aquí.
 */
export function mensajeAsistente({
  servicio,
  unidades,
  plazo,
}: {
  /** Título del servicio; `undefined` = «Otro». */
  servicio?: string;
  unidades: string;
  plazo: string;
}): string {
  const interes = servicio ? `Me interesa: ${servicio}.` : "Me interesa otro producto.";
  return `${MENSAJE_GENERICO} ${interes} Unidades: ${minuscula(unidades)}. Para: ${minuscula(plazo)}. Os envío foto del hueco.`;
}
