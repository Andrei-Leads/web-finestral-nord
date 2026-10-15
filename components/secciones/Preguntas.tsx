import type { Pregunta } from "@andrei-leads/core";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { h2, seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  preguntas: Pregunta[];
  titulo?: string;
  nivel?: "h2" | "h3";
  className?: string;
};

/** Preguntas frecuentes: acordeón de una abierta a la vez. Vacías: nada. */
export function Preguntas({ preguntas, titulo = "Preguntas frecuentes", nivel: Titulo = "h2", className }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <section className={cn(seccion, className)}>
      <div className="contenedor flex flex-col gap-5 md:gap-6">
        <Titulo className={h2}>{titulo}</Titulo>
        <Accordion type="single" collapsible className="max-w-[820px] border-t border-linea">
          {preguntas.map((p, i) => (
            <AccordionItem key={p.pregunta} value={`p-${i}`}>
              <AccordionTrigger>{p.pregunta}</AccordionTrigger>
              <AccordionContent>{p.respuesta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
