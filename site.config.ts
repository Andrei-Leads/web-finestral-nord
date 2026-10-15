// Datos FICTICIOS de demostración para carpinteria-metalica-2 «Exposición».
// «Finestral Nord» no existe: nombre, razón social, NIF, calle, personas y reseñas son inventados.
// Las marcas son reales y solo indican materiales con los que se trabaja (no distribución oficial).

import { defineSiteConfig } from "@andrei-leads/core";

export default defineSiteConfig({
  negocio: {
    nombre: "Finestral Nord",
    nombreLegal: "Finestral Nord SL",
    nif: "B00733519", // NIF FICTICIO: el código de provincia 00 no existe
    sector: "Ventanas, cerramientos y toldos",
    descripcionCorta:
      "Exposición de 200 m² en Paterna con ventanas de aluminio y PVC, cerramientos, toldos y mamparas montados. Medimos, fabricamos e instalamos.",
    anioFundacion: 2001,
    registroMercantil: "Inscrita en el Registro Mercantil de Valencia, tomo 0000, folio 00, hoja V-000000", // REGISTRO FICTICIO
    tipoSchema: ["HomeAndConstructionBusiness", "Store"],
  },
  contacto: {
    telefono: "+34643647915", 
    whatsapp: "+34643647915", 
    email: "hola@finestralnord.example",
    direccion: { calle: "Avenida de la Vidriera 62", cp: "46980", ciudad: "Paterna", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "09:30", cierra: "13:30" },
      { dias: ["lunes", "martes", "miercoles", "jueves", "viernes"], abre: "16:30", cierra: "20:00" },
      { dias: ["sabado"], abre: "10:00", cierra: "13:30" },
    ],
    coordenadas: { lat: 39.5027, lng: -0.4404 }, // APROXIMADAS: centro de Paterna (la dirección es ficticia)
    mensajeWhatsapp: "Hola, os escribo desde la web. Quería preguntaros por:",
  },
  zonas: [
    "Paterna",
    "Burjassot",
    "Godella",
    "Rocafort",
    "La Cañada",
    "L'Eliana",
    "Bétera",
    "Manises",
    "Valencia (Benicalap y Campanar)",
  ],
  valoracion: { media: 4.7, total: 118 },
  imagenesHero: [
    { src: "/ejemplo/hero-exposicion.jpg", alt: "Interior de una exposición de ventanas con varios modelos de aluminio y PVC montados" },
  ],
  servicios: [
    {
      titulo: "Ventanas de aluminio",
      descripcion: "Correderas y oscilobatientes con rotura de puente térmico, lacadas en el color que elijas.",
      contenido: [
        "Cambiamos tus ventanas por otras de aluminio con rotura de puente térmico y doble vidrio bajo emisivo. Aíslan del frío, del calor y del ruido de la calle, y no hace falta obra: van en el mismo hueco.",
        "En la exposición tienes montadas correderas y oscilobatientes de varias series. Puedes abrirlas, ver los perfiles cortados por dentro y comparar cómo cierra cada una antes de decidir.",
        "El color se elige con la muestra en la mano: blanco, gris antracita, imitación madera o cualquier color de la carta RAL. Los lacados especiales tardan una semana más en fabricarse.",
      ],
      incluye: [
        "Medición en tu casa sin coste",
        "Perfil con rotura de puente térmico",
        "Doble vidrio bajo emisivo con cámara",
        "Retirada y reciclaje de la ventana vieja",
        "Instalación y sellado",
      ],
      imagenes: [
        { src: "/ejemplo/cat-ventanas-aluminio.jpg", alt: "Ventana corredera de aluminio gris antracita en un salón" },
        { src: "/ejemplo/cat-ventanas-aluminio-2.jpg", alt: "Perfil de aluminio cortado con rotura de puente térmico" },
        { src: "/ejemplo/cat-ventanas-aluminio-3.jpg", alt: "Muestrario de colores de lacado" },
        { src: "/ejemplo/cat-ventanas-aluminio-4.jpg", alt: "Ventana oscilobatiente de aluminio abierta en abatible" },
      ],
      preguntas: [
        {
          pregunta: "¿Hay que hacer obra para cambiar las ventanas?",
          respuesta: "Normalmente no: se cambian sobre el mismo hueco y un piso se hace en el día. Te lo confirmamos al medir.",
        },
        {
          pregunta: "¿Corredera u oscilobatiente?",
          respuesta: "La corredera no ocupa sitio al abrir; la oscilobatiente cierra mejor contra el ruido. En la exposición puedes probar las dos.",
        },
        {
          pregunta: "¿Cuánto tardan en fabricarse?",
          respuesta: "Entre tres y cuatro semanas en blanco o gris; con lacados especiales, una semana más.",
        },
      ],
      mensajeWhatsapp: "Hola, quiero presupuesto para cambiar ventanas por unas de aluminio. Os envío foto del hueco:",
      precioDesde: "desde 330 €/ud", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Ventanas de PVC",
      descripcion: "El mejor aislamiento térmico y acústico, en blanco o imitación madera.",
      contenido: [
        "El PVC es el material que mejor aísla por sí mismo: no transmite el frío ni el calor y, con un buen vidrio, corta mucho el ruido. Para dormitorios que dan a la calle es nuestra primera recomendación.",
        "Trabajamos perfiles de cinco y siete cámaras con refuerzo de acero por dentro. En la exposición hay oscilobatientes en blanco y en imitación roble para que veas cómo queda el acabado de cerca.",
      ],
      incluye: [
        "Medición en tu casa sin coste",
        "Perfil de varias cámaras con refuerzo interior",
        "Doble vidrio bajo emisivo o acústico",
        "Retirada de la ventana vieja",
        "Instalación y sellado",
      ],
      imagenes: [{ src: "/ejemplo/cat-ventanas-pvc.jpg", alt: "Ventana oscilobatiente de PVC blanco abierta en abatible" }],
      preguntas: [
        {
          pregunta: "¿El PVC amarillea con el sol?",
          respuesta: "Los perfiles de ahora llevan protección UV y no amarillean como los de hace veinte años. Te enseñamos uno con años de uso en la exposición.",
        },
        {
          pregunta: "¿Es más barato que el aluminio?",
          respuesta: "En ventanas oscilobatientes suele salir algo más barato. En correderas grandes, el aluminio suele compensar más.",
        },
      ],
      mensajeWhatsapp: "Hola, quiero presupuesto para ventanas de PVC. Os envío foto del hueco:",
      precioDesde: "desde 300 €/ud", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Cerramientos de terraza",
      descripcion: "Cierra la terraza con correderas o cortinas de cristal y gana una habitación.",
      contenido: [
        "Con un cerramiento la terraza se usa todo el año: sin polvo, sin viento y con luz. Hacemos correderas de aluminio de dos a cuatro hojas y cortinas de cristal sin perfiles verticales, que se recogen del todo a un lado.",
        "En la exposición tienes un tramo de cada sistema montado para que veas cómo se abren y cómo quedan recogidos. Te ayudamos con la descripción técnica para la comunidad y el ayuntamiento.",
      ],
      incluye: [
        "Estudio de la terraza y medición",
        "Correderas o cortina de cristal a medida",
        "Carriles con desagüe al exterior",
        "Sellado contra filtraciones",
        "Descripción técnica para la comunidad",
      ],
      imagenes: [{ src: "/ejemplo/cat-cerramientos.jpg", alt: "Terraza cerrada con correderas de aluminio y cristal" }],
      preguntas: [
        {
          pregunta: "¿Cortina de cristal o corredera?",
          respuesta: "La cortina deja la terraza totalmente abierta en verano y casi no se ve; la corredera aísla mejor en invierno. Las dos están montadas en la tienda.",
        },
        {
          pregunta: "¿Necesito permiso de la comunidad?",
          respuesta: "Normalmente sí, porque cambia la fachada. Si ya hay otros cerramientos en el edificio, te lo hacemos igual.",
        },
      ],
      mensajeWhatsapp: "Hola, quiero cerrar mi terraza. Os envío fotos y las medidas aproximadas:",
      precioDesde: "desde 1.700 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Toldos",
      descripcion: "Toldos de brazo, cofre y estor, manuales o con motor y sensor de viento.",
      contenido: [
        "Instalamos toldos de brazo extensible para terrazas y balcones, toldos de cofre que guardan la lona cerrada y estores verticales para cortar el sol de poniente.",
        "La lona se elige en la exposición entre muestrarios de lona acrílica de varias marcas. Si pones motor, recomendamos el sensor de viento: recoge el toldo solo cuando sopla fuerte.",
      ],
      incluye: [
        "Medición y estudio del anclaje",
        "Lona acrílica a elegir en la tienda",
        "Motor y mando, si lo quieres",
        "Instalación",
      ],
      imagenes: [{ src: "/ejemplo/cat-toldos.jpg", alt: "Toldo de brazo extensible desplegado sobre una terraza" }],
      preguntas: [
        {
          pregunta: "¿Cambiáis solo la lona?",
          respuesta: "Sí. Si la estructura está bien, cambiamos la lona y revisamos los brazos.",
        },
        {
          pregunta: "¿Cuándo conviene pedirlo?",
          respuesta: "Cuanto antes de mayo, mejor: en primavera se junta mucho trabajo y los plazos se alargan.",
        },
      ],
      mensajeWhatsapp: "Hola, quiero presupuesto para un toldo. Os envío una foto de la terraza:",
      precioDesde: "desde 420 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Mamparas de baño",
      descripcion: "Mamparas de ducha y bañera a medida, fijas, correderas o abatibles.",
      contenido: [
        "Hacemos mamparas de cristal templado a medida para cualquier plato o bañera, también en huecos con paredes torcidas. Fijas, correderas o abatibles, con perfil blanco, cromado o negro.",
        "Si vas a cambiar la bañera por un plato de ducha, ven con las medidas: te enseñamos los modelos montados y te decimos cuál cabe sin que la puerta choque con el lavabo.",
      ],
      incluye: [
        "Medición en el baño",
        "Cristal templado de seguridad",
        "Tratamiento antical, si lo quieres",
        "Instalación y sellado",
      ],
      imagenes: [{ src: "/ejemplo/cat-mamparas.jpg", alt: "Mampara de ducha de cristal templado con perfil negro" }],
      preguntas: [
        {
          pregunta: "¿Se puede poner en un baño con las paredes torcidas?",
          respuesta: "Sí. Medimos en varios puntos y fabricamos la mampara a la medida real.",
        },
        {
          pregunta: "¿Cuánto tarda?",
          respuesta: "Entre dos y tres semanas desde que medimos. La instalación, una o dos horas.",
        },
      ],
      precioDesde: "desde 260 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Puertas de entrada",
      descripcion: "Puertas de aluminio para chalets y casas, con buen aislamiento y cierre de seguridad.",
      contenido: [
        "Fabricamos puertas de entrada de aluminio con rotura de puente térmico, con panel ciego o con vidrio laminado, y con fijos laterales si el hueco es ancho.",
        "En la exposición hay dos puertas montadas con sus cerraduras de varios puntos para que compruebes cómo cierran y elijas tirador y acabado.",
      ],
      incluye: [
        "Medición y diseño de la puerta",
        "Cerradura de seguridad de varios puntos",
        "Retirada de la puerta vieja",
        "Instalación y remates",
      ],
      imagenes: [{ src: "/ejemplo/cat-puertas.jpg", alt: "Puerta de entrada de aluminio en gris oscuro con fijo lateral de cristal" }],
      preguntas: [
        {
          pregunta: "¿Cuánto se tarda en fabricar?",
          respuesta: "Entre cuatro y cinco semanas, según el panel y el color.",
        },
        {
          pregunta: "¿Qué color aguanta mejor al sol?",
          respuesta: "Los claros. Un lacado muy oscuro en una puerta orientada a poniente se calienta mucho; te lo comentamos al elegir.",
        },
      ],
      precioDesde: "desde 1.300 €", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Mosquiteras",
      descripcion: "Enrollables, correderas o plisadas, a la medida de tu ventana.",
      contenido: [
        "Hacemos mosquiteras a medida, lacadas del color de la ventana: enrollables para ventanas, plisadas para puertas de terraza y correderas para huecos grandes.",
        "En la tienda tienes los tres tipos montados. Si nos traes las medidas del hueco por dentro, te damos el precio en el momento.",
      ],
      incluye: [
        "Medición en casa o con tus medidas",
        "Perfil lacado a juego",
        "Malla de fibra de vidrio",
        "Instalación",
      ],
      imagenes: [{ src: "/ejemplo/cat-mosquiteras.jpg", alt: "Mosquitera plisada en una puerta de terraza" }],
      preguntas: [
        {
          pregunta: "¿Puedo llevar las medidas yo?",
          respuesta: "Sí. Te explicamos cómo medir el hueco. Si prefieres no arriesgar, vamos a medir nosotros.",
        },
        {
          pregunta: "¿Cuál va mejor en la puerta de la terraza?",
          respuesta: "La plisada: el perfil de abajo es muy bajo y no se tropieza con él.",
        },
      ],
      precioDesde: "desde 60 €/ud", // PRECIO FICTICIO: borrar en la web del cliente
    },
    {
      titulo: "Cristalería a medida",
      descripcion: "Cristales, espejos y vidrios de seguridad cortados a medida.",
      contenido: [
        "Cortamos a medida cristales para ventanas y puertas, espejos, sobremesas y vidrios de seguridad laminados o templados.",
        "Si se te ha roto un cristal, tráenos las medidas o una foto con el metro y te decimos qué vidrio lleva y cuándo lo tienes.",
      ],
      incluye: [
        "Corte a medida",
        "Cantos pulidos en espejos y sobremesas",
        "Vidrio laminado o templado de seguridad",
        "Colocación, si lo necesitas",
      ],
      imagenes: [{ src: "/ejemplo/cat-cristaleria.jpg", alt: "Planchas de vidrio apoyadas en un caballete de taller" }],
      preguntas: [
        {
          pregunta: "¿Puedo pasar a recogerlo yo?",
          respuesta: "Sí. Lo cortamos y te avisamos para que lo recojas en la tienda.",
        },
        {
          pregunta: "¿Hacéis sobremesas de cristal?",
          respuesta: "Sí, con los cantos pulidos y en el grosor que necesites.",
        },
      ],
      precioDesde: "desde 45 €/m²", // PRECIO FICTICIO: borrar en la web del cliente
    },
  ],
  trabajos: [
    {
      titulo: "Cambio de ventanas en un piso de Paterna",
      descripcion: "Seis ventanas de aluminio con rotura de puente térmico en lugar de las correderas antiguas de un piso de los años 80.",
      ubicacion: "Paterna",
      anio: 2026,
      servicio: "ventanas-de-aluminio",
      duracion: "1 día",
      precio: "entre 2.200 y 2.700 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "El piso daba a una avenida con mucho tráfico y en invierno entraba aire por las correderas viejas. Los dueños vinieron a la exposición un sábado, probaron las oscilobatientes y eligieron el gris antracita con la muestra en la mano.",
        "Cambiamos las seis ventanas en un día, sin obra, y en los dormitorios pusimos vidrio acústico.",
      ],
      imagenes: [{ src: "/ejemplo/trabajo-paterna.jpg", alt: "Dormitorio con ventana nueva de aluminio blanco" }],
      antes: { src: "/ejemplo/trabajo-paterna-antes.jpg", alt: "La misma ventana antigua de aluminio sin rotura de puente térmico" },
      testimonio: {
        autor: "Mari Carmen L.",
        texto: "Fuimos a la exposición un sábado, elegimos el color allí y en tres semanas las teníamos puestas.",
      },
    },
    {
      titulo: "Cerramiento de terraza en Burjassot",
      descripcion: "Terraza de 12 m² cerrada con correderas de tres hojas para usarla como parte del salón.",
      ubicacion: "Burjassot",
      anio: 2026,
      servicio: "cerramientos-de-terraza",
      superficie: "12 m²",
      duracion: "2 días",
      precio: "entre 3.500 y 4.200 €", // PRECIO FICTICIO: borrar en la web del cliente
      contenido: [
        "Era una terraza abierta que apenas se usaba en invierno. Con las correderas de tres hojas y rotura de puente térmico ahora es una zona más del salón.",
      ],
      imagenes: [
        { src: "/ejemplo/trabajo-burjassot.jpg", alt: "Terraza cerrada con correderas de aluminio y vistas a la calle" },
        { src: "/ejemplo/trabajo-burjassot-2.jpg", alt: "Detalle de las guías de la corredera" },
        { src: "/ejemplo/trabajo-burjassot-3.jpg", alt: "La terraza cerrada vista desde el salón" },
        { src: "/ejemplo/trabajo-burjassot-4.jpg", alt: "Cerramiento con las tres hojas recogidas" },
      ],
    },
    {
      titulo: "Ventanas de PVC en un chalet de La Cañada",
      descripcion: "Nueve oscilobatientes de PVC imitación roble con vidrio bajo emisivo en un chalet de los años 90.",
      ubicacion: "La Cañada",
      anio: 2025,
      servicio: "ventanas-de-pvc",
      duracion: "2 días",
      imagenes: [{ src: "/ejemplo/trabajo-la-canada.jpg", alt: "Fachada de chalet con ventanas de PVC imitación madera" }],
    },
    {
      titulo: "Mampara a medida en Godella",
      descripcion: "Mampara de ducha fija con perfil negro en un baño reformado, con la pared fuera de escuadra.",
      ubicacion: "Godella",
      anio: 2025,
      servicio: "mamparas-de-bano",
      duracion: "2 horas",
      imagenes: [{ src: "/ejemplo/trabajo-godella.jpg", alt: "Ducha con mampara fija de cristal y perfil negro" }],
    },
    {
      titulo: "Toldo con motor en Rocafort",
      descripcion: "Toldo de cofre de 5 metros con motor, mando y sensor de viento para la terraza de un chalet.",
      ubicacion: "Rocafort",
      anio: 2025,
      servicio: "toldos",
      superficie: "5 × 3 m",
      imagenes: [{ src: "/ejemplo/trabajo-rocafort.jpg", alt: "Toldo de cofre desplegado sobre la terraza de un chalet" }],
    },
  ],
  resenas: [
    {
      autor: "Mari Carmen L.",
      texto: "Fuimos a ver las ventanas a la exposición y Elena nos lo explicó todo sin prisas. La instalación fue limpia y en un día.",
      puntuacion: 5,
      fecha: "2026-09-26",
      fuente: "google",
    },
    {
      autor: "Jorge F.",
      texto: "Mampara perfecta y a medida.",
      puntuacion: 5,
      fecha: "2026-09-03",
      fuente: "google",
    },
    {
      autor: "Amparo V.",
      texto: "Pedí presupuesto en tres sitios. Aquí pude ver los perfiles cortados, los colores y hasta abrir las ventanas. El precio fue el que nos dijeron y vinieron el día acordado. Ahora en casa no se oye el tráfico.",
      puntuacion: 5,
      fecha: "2026-08-14",
      fuente: "google",
    },
    {
      autor: "Pablo S.",
      texto: "Buen toldo y bien montado, pero tardó una semana más de lo previsto. En primavera van muy cargados, así que pedidlo con tiempo.",
      puntuacion: 4,
      fecha: "2026-06-20",
      fuente: "google",
    },
    {
      autor: "Rosa M.",
      texto: "Se me rompió el cristal de la puerta del patio, llevé las medidas un martes y el jueves ya lo tenía. Muy amables.",
      puntuacion: 5,
      fecha: "2026-05-07",
      fuente: "google",
    },
    {
      autor: "Xavi T.",
      texto: "Cerramos la terraza con ellos. El trabajo, muy bien; la exposición es lo mejor porque ves exactamente lo que te van a poner. El aparcamiento en la avenida a veces está complicado.",
      puntuacion: 4,
      fecha: "2026-03-15",
      fuente: "google",
    },
    {
      autor: "Inma G.",
      texto: "Cambiamos todas las ventanas del chalet a PVC imitación madera. Ricardo vino a medir dos veces porque una pared estaba torcida, y se nota: ajustan perfectas.",
      puntuacion: 5,
      fecha: "2025-12-02",
      fuente: "google",
    },
    {
      autor: "Toni R.",
      texto: "Serios y con buen género. Recomendables.",
      puntuacion: 5,
      fecha: "2025-10-18",
      fuente: "google",
    },
  ],
  proceso: [
    { titulo: "Ven a la exposición o escríbenos", texto: "Pasa a ver los modelos montados o mándanos fotos de los huecos por WhatsApp." },
    { titulo: "Medimos en tu casa", texto: "Vamos a medir sin coste y vemos el estado de persianas, tapajuntas y alféizares." },
    { titulo: "Presupuesto por escrito", texto: "En dos o tres días laborables, con cada ventana, su perfil, su vidrio y su precio." },
    { titulo: "Fabricación", texto: "De tres a cuatro semanas en nuestro taller; con lacados especiales, una semana más." },
    { titulo: "Instalación", texto: "Nuestro equipo cambia un piso normal en un día, sin obra, y se lleva lo viejo." },
    { titulo: "Repaso y garantía", texto: "Regulamos cada hoja contigo delante. Si algo falla después, nos llamas y venimos." },
  ],
  acreditaciones: [{ nombre: "Ventanas con marcado CE" }],
  garantias: [
    "Presupuesto por escrito tras medir, sin coste",
    "Modelos montados en la exposición para probarlos",
    "Instalación con nuestro propio equipo",
    "Retirada y reciclaje de las ventanas viejas",
    "10 años de garantía en ventanas y cerramientos",
    "Seguro de responsabilidad civil",
  ],
  marcas: ["Cortizo", "Technal", "Kömmerling", "Gaviota", "Somfy"], // MARCAS DE EJEMPLO: en la web del cliente, solo las que use
  empresa: {
    historia: [
      "Ricardo abrió Finestral Nord en 2001 en un bajo de Paterna, con el taller al fondo y dos ventanas de muestra en el escaparate. En 2015 nos mudamos a la avenida de la Vidriera: 200 m² de exposición y el taller en la nave de al lado.",
      "Hoy somos siete personas. En la tienda tienes montadas ventanas de aluminio y PVC, cerramientos, puertas, mamparas y toldos para que los abras, los compares y elijas el color con la muestra en la mano.",
      "Después vamos a tu casa a medir, fabricamos en nuestro taller e instalamos con nuestro equipo. No subcontratamos el montaje.",
    ],
    imagenes: [
      { src: "/ejemplo/expo-1.jpg", alt: "Fachada de una tienda de ventanas con escaparate" },
      { src: "/ejemplo/expo-2.jpg", alt: "Muestrario de colores de perfiles de aluminio en una pared" },
      { src: "/ejemplo/expo-3.jpg", alt: "Mampara de ducha expuesta en una tienda" },
    ],
    equipo: [
      { nombre: "Ricardo", cargo: "Fundador y mediciones", foto: { src: "/ejemplo/equipo-ricardo.jpg", alt: "Ricardo midiendo una ventana en la exposición" } },
      { nombre: "Elena", cargo: "Atención en la exposición", foto: { src: "/ejemplo/equipo-elena.jpg", alt: "Elena junto al muestrario de colores" } },
      { nombre: "Dani", cargo: "Jefe de montaje" },
      { nombre: "Vicent", cargo: "Taller y fabricación" },
    ],
  },
  preguntas: [
    {
      pregunta: "¿Hace falta cita para ir a la exposición?",
      respuesta: "No. Ven en el horario de tienda. Si quieres que te atienda alguien en concreto, llama antes.",
    },
    {
      pregunta: "¿Abrís en agosto?",
      respuesta: "Sí, pero solo por las mañanas, de 9:30 a 13:30. Los sábados de agosto cerramos.",
    },
    {
      pregunta: "¿Se puede aparcar cerca?",
      respuesta: "Sí, en la misma avenida y en las calles de detrás. A primera hora de la tarde suele haber sitio.",
    },
    {
      pregunta: "¿Venís a medir a casa?",
      respuesta: "Sí. Medimos en tu casa sin coste y te damos el presupuesto por escrito.",
    },
    {
      pregunta: "¿Cuánto se tarda en fabricar?",
      respuesta: "Entre dos y cinco semanas según el producto. Te damos el plazo exacto en el presupuesto.",
    },
    {
      pregunta: "¿Aluminio o PVC?",
      respuesta: "Los dos aíslan bien. En la exposición tienes los dos montados y te ayudamos a elegir según tu casa.",
    },
  ],
  marca: {},
  seo: {
    titulo: "Exposición de ventanas en Paterna | Finestral Nord",
    descripcion: "Exposición de ventanas de aluminio y PVC, cerramientos, toldos y mamparas en Paterna. Ven a verlos montados. Medimos e instalamos.",
    url: "web-finestral-nord-ao17hmcql-dreis-projects-2e32091e.vercel.app",
  },
});
