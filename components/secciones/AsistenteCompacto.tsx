import { AsistenteCompactoInterior } from "./AsistenteCompactoInterior";
import { cn } from "@/lib/utils";

type Props = {
  /** config.servicios.map(s => s.titulo) */
  servicios: string[];
  /** config.contacto.whatsapp; sin él no se pinta nada. */
  whatsapp?: string;
  /** En /servicios/[slug]: empieza en el paso «unidades» («Paso n de 2»). */
  servicioFijo?: string;
  className?: string;
};

/**
 * Asistente compacto de WhatsApp: tarjeta secundaria (no protagonista) con 2–3 toques que solo
 * componen el mensaje de BotonWhatsApp. No guarda ni envía datos. Título y entradilla se pintan
 * en el servidor; la parte interactiva es un componente cliente con respaldo sin JavaScript.
 */
export function AsistenteCompacto({ servicios, whatsapp, servicioFijo, className }: Props) {
  if (!whatsapp || servicios.length === 0) return null;
  return (
    <section
      aria-labelledby="asistente-titulo"
      className={cn(
        "grid gap-5 rounded-tarjeta border border-linea bg-tarjeta px-4 py-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 md:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h2
          id="asistente-titulo"
          className="m-0 text-[22px] leading-[1.2] font-bold tracking-[-0.02em] text-balance md:text-[26px]"
        >
          ¿No puedes venir? Pídelo por WhatsApp
        </h2>
        <p className="m-0 text-base text-tinta-suave">
          Responde con un toque y te dejamos el mensaje escrito. No guardamos nada.
        </p>
      </div>
      <AsistenteCompactoInterior
        servicios={servicios}
        numero={whatsapp}
        servicioFijo={servicioFijo}
      />
    </section>
  );
}
