"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-linea", className)}
      {...props}
    />
  );
}

/** Pregunta: botón a todo el ancho (≥ 56 px) con indicador +/– de 36 px y borde tinta-suave. */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="m-0 flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-3 text-left text-lg leading-[1.3] font-semibold text-tinta",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className="flex size-9 flex-none items-center justify-center rounded-boton border border-tinta-suave bg-tarjeta group-hover:bg-piedra"
        >
          <Plus strokeWidth={1.5} className="size-5 group-data-[state=open]:hidden" />
          <Minus strokeWidth={1.5} className="hidden size-5 group-data-[state=open]:block" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden motion-safe:data-[state=closed]:animate-acordeon-cerrar motion-safe:data-[state=open]:animate-acordeon-abrir"
      {...props}
    >
      <div className={cn("max-w-[68ch] pb-5 text-tinta-suave", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
