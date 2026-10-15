/** Clases compartidas entre secciones y páginas. */

/** Padding vertical de sección: clamp(40px, 6vw, 88px). */
export const seccion = "py-[clamp(40px,6vw,88px)]";

/** h2 de sección: 700 · 24 → 34 px, con el filete latón de 40 × 3 debajo (Specs §1). */
export const h2 =
  "m-0 text-[clamp(1.5rem,1.2rem+1.3vw,2.125rem)] leading-[1.15] font-bold tracking-[-0.02em] text-balance after:mt-3 after:block after:h-[3px] after:w-10 after:rounded-full after:bg-laton after:content-['']";

/** h1 de páginas interiores: 800 · 28 → 52 px. */
export const h1Interior =
  "m-0 text-[clamp(1.75rem,1.2rem+2.4vw,3.25rem)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance";

/** Clases de la nav de migas (ver components/Migas.tsx). */
export const migas = {
  nav: "text-[15px] text-tinta-suave",
  lista: "m-0 flex list-none flex-wrap items-center p-0",
  item: "flex items-center",
  enlace: "inline-flex min-h-11 items-center text-tinta underline underline-offset-4 hover:decoration-2",
  actual: "inline-flex min-h-11 items-center text-tinta-suave",
} as const;
