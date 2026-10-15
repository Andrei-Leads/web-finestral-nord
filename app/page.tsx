import config from "@/site.config";
import { Catalogo } from "@/components/secciones/Catalogo";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ExposicionTeaser } from "@/components/secciones/ExposicionTeaser";
import { Garantias } from "@/components/secciones/Garantias";
import { Hero } from "@/components/secciones/Hero";
import { Instalaciones } from "@/components/secciones/Instalaciones";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Zonas } from "@/components/secciones/Zonas";
import { AsistenteCompacto } from "@/components/secciones/AsistenteCompacto";

export default function Page() {
  const imagenHero = config.imagenesHero[0] ?? config.empresa.imagenes[0];
  const { contacto } = config;

  return (
    <>
      <Hero
        negocio={config.negocio}
        contacto={contacto}
        valoracion={config.valoracion}
        imagen={imagenHero}
        enlazarResenas={config.resenas.length > 0}
      />
      <Catalogo servicios={config.servicios} marcas={config.marcas} contacto={contacto} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
      <Instalaciones trabajos={config.trabajos} galeria={config.galeria} />
      <ExposicionTeaser imagenes={config.empresa.imagenes} />
      <Proceso proceso={config.proceso} />
      <Garantias
        garantias={config.garantias}
        acreditaciones={config.acreditaciones}
        anioFundacion={config.negocio.anioFundacion}
        ciudad={contacto.direccion.ciudad}
      />
      {contacto.whatsapp && (
        <div className="contenedor py-[clamp(40px,6vw,88px)]">
          <AsistenteCompacto servicios={config.servicios.map((s) => s.titulo)} whatsapp={contacto.whatsapp} />
        </div>
      )}
      <Zonas zonas={config.zonas} />
      <Preguntas preguntas={config.preguntas} />
      <CtaFinal contacto={contacto} />
    </>
  );
}
