import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center whitespace-nowrap", {
  variants: {
    variant: {
      /* Pastilla de precio «desde…»: relleno primario, 13 px tabular (Specs §1). */
      precio:
        "rounded-pastilla bg-primario px-2.5 py-1 text-[13px] leading-none font-semibold tabular-nums text-sobre-primario",
      /* Zonas y marcas en placa: no es un control. */
      etiqueta:
        "rounded-pastilla border border-linea bg-tarjeta px-3 py-1.5 text-[15px] font-medium text-tinta",
    },
  },
  defaultVariants: {
    variant: "etiqueta",
  },
});

/** Etiqueta no interactiva (<span>). Para un enlace o botón, usa buttonVariants. */
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
