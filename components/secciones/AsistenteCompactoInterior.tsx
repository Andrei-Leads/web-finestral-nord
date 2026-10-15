"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent } from "react";
import { BotonWhatsApp } from "@andrei-leads/core";
import { Check, MessageCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { MENSAJE_GENERICO, mensajeAsistente } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  servicios: string[];
  numero: string;
  servicioFijo?: string;
};

const UNIDADES = ["1", "2–4", "5 o más", "Toda la casa", "No lo sé"];
const PLAZOS = ["Lo antes posible", "En 1–3 meses", "Solo estoy mirando"];
const OTRO = "Otro";
/** Con 7 o más servicios: 5 + «Otro». */
const MAX_CHIPS = 5;
const PREGUNTAS = {
  1: "¿Qué necesitas?",
  2: "¿Cuántas unidades, más o menos?",
  3: "¿Para cuándo?",
} as const;
const TECLAS = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];

// `false` al hidratar (= HTML del servidor) y `true` justo después, sin setState en un efecto.
const sinSuscripcion = () => () => {};
const alMontar = () => true;
const enServidor = () => false;

const masLargo = (lista: string[]) => lista.reduce((a, b) => (b.length > a.length ? b : a), "");

/** Las flechas mueven el foco entre chips; elegir (Enter/Espacio = clic) cambia de paso. */
function alTeclear(e: KeyboardEvent<HTMLDivElement>) {
  if (!TECLAS.includes(e.key)) return;
  const chips = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
  if (chips.length === 0) return;
  const actual = chips.indexOf(e.target as HTMLButtonElement);
  let siguiente = actual;
  if (e.key === "Home") siguiente = 0;
  else if (e.key === "End") siguiente = chips.length - 1;
  else if (e.key === "ArrowRight" || e.key === "ArrowDown") siguiente = (actual + 1) % chips.length;
  else siguiente = (actual - 1 + chips.length) % chips.length;
  e.preventDefault();
  chips[siguiente]?.focus();
}

/**
 * Altura estable: los pasos y el resumen están siempre en el DOM, apilados en la misma celda
 * de una rejilla; solo el activo se ve (los demás `invisible` + `inert`). El resumen "fantasma"
 * usa los valores más largos. Sin JavaScript solo se ve «Pregúntanos por WhatsApp».
 */
export function AsistenteCompactoInterior({ servicios, numero, servicioFijo }: Props) {
  const montado = useSyncExternalStore(sinSuscripcion, alMontar, enServidor);

  const fijo = servicioFijo ?? (servicios.length === 1 ? servicios[0] : undefined);
  const primero = fijo ? 2 : 1;
  const total = fijo ? 2 : 3;
  const opcionesServicio =
    servicios.length >= 7 ? [...servicios.slice(0, MAX_CHIPS), OTRO] : servicios;

  const [paso, setPaso] = useState(primero);
  const [servicio, setServicio] = useState<string>();
  const [unidades, setUnidades] = useState<string>();
  const [plazo, setPlazo] = useState<string>();
  const [tocado, setTocado] = useState(false);
  const [desdeResumen, setDesdeResumen] = useState(false);

  const pasoActual = Math.max(paso, primero);
  const enResumen = pasoActual === 4;

  const titulos = useRef<Record<number, HTMLElement | null>>({});
  const moverFoco = useRef(false);
  useEffect(() => {
    if (!moverFoco.current) return;
    moverFoco.current = false;
    titulos.current[pasoActual]?.focus({ preventScroll: true });
  }, [pasoActual]);

  function irA(n: number) {
    moverFoco.current = true;
    setTocado(true);
    setPaso(n);
  }

  function elegir(valor: string) {
    if (pasoActual === 1) setServicio(valor);
    else if (pasoActual === 2) setUnidades(valor);
    else setPlazo(valor);
    const siguiente = desdeResumen ? 4 : pasoActual + 1;
    if (siguiente === 4) setDesdeResumen(false);
    irA(siguiente);
  }

  function cambiar(n: number) {
    setDesdeResumen(true);
    irA(n);
  }

  function atras() {
    if (desdeResumen) {
      setDesdeResumen(false);
      irA(4);
    } else {
      irA(pasoActual - 1);
    }
  }

  // Mensaje real en el resumen; si no, el más largo (solo reserva altura).
  const servicioMsg = fijo ?? (servicio === OTRO ? undefined : servicio);
  const mensaje = enResumen
    ? mensajeAsistente({ servicio: servicioMsg, unidades: unidades ?? "", plazo: plazo ?? "" })
    : mensajeAsistente({
        servicio: fijo ?? masLargo(opcionesServicio),
        unidades: masLargo(UNIDADES),
        plazo: masLargo(PLAZOS),
      });

  const filas = [
    fijo
      ? { clave: "Producto", valor: fijo, lector: "", paso: undefined }
      : {
          clave: "Producto",
          valor: enResumen ? (servicio === OTRO ? "Otro producto" : (servicio ?? "")) : masLargo(opcionesServicio),
          lector: " producto",
          paso: 1,
        },
    {
      clave: "Unidades",
      valor: enResumen ? (unidades ?? "") : masLargo(UNIDADES),
      lector: " unidades",
      paso: 2,
    },
    {
      clave: "Para",
      valor: enResumen ? (plazo ?? "") : masLargo(PLAZOS),
      lector: " plazo",
      paso: 3,
    },
  ];

  const idx = pasoActual - primero;
  const textoPaso = `Paso ${Math.min(idx + 1, total)} de ${total}`;
  const anuncio = !tocado
    ? ""
    : enResumen
      ? "Tu mensaje está listo. Revisa y envía por WhatsApp."
      : `${textoPaso}. ${PREGUNTAS[pasoActual as 1 | 2 | 3]}`;
  const puedeAtras = pasoActual > primero && !enResumen;

  const pasos: { n: 1 | 2 | 3; opciones: string[]; valor?: string }[] = [
    ...(fijo ? [] : [{ n: 1 as const, opciones: opcionesServicio, valor: servicio }]),
    { n: 2, opciones: UNIDADES, valor: unidades },
    { n: 3, opciones: PLAZOS, valor: plazo },
  ];

  return (
    <div className="grid min-w-0">
      <span aria-live="polite" className="sr-only">
        {anuncio}
      </span>

      {/* Sin JavaScript: solo un botón secundario con el mensaje genérico. Se retira al montar. */}
      {!montado && (
        <div className="col-start-1 row-start-1">
          <BotonWhatsApp
            numero={numero}
            mensaje={MENSAJE_GENERICO}
            className={buttonVariants({ variant: "whatsappSecundario" })}
          >
            <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
            <span>Pregúntanos por WhatsApp</span>
          </BotonWhatsApp>
        </div>
      )}

      <div
        inert={!montado}
        className={cn(
          "col-start-1 row-start-1 flex min-h-[300px] min-w-0 flex-col gap-3.5 md:min-h-[290px]",
          !montado && "invisible",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex-none text-[13px] font-semibold text-tinta-suave tabular-nums">
            {textoPaso}
          </span>
          <div aria-hidden="true" className="flex flex-1 gap-1">
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={cn("h-1 flex-1 rounded-[2px]", enResumen || i <= idx ? "bg-primario" : "bg-linea")}
              />
            ))}
          </div>
        </div>

        <div className="grid">
          {pasos.map(({ n, opciones, valor }) => {
            const activo = montado && pasoActual === n;
            const tabulable = valor && opciones.includes(valor) ? valor : opciones[0];
            return (
              <fieldset
                key={n}
                inert={!activo}
                className={cn("col-start-1 row-start-1 m-0 min-w-0 border-0 p-0", !activo && "invisible")}
              >
                <legend
                  ref={(el) => {
                    titulos.current[n] = el;
                  }}
                  tabIndex={-1}
                  className="mb-3 p-0 text-lg font-bold"
                >
                  {PREGUNTAS[n]}
                </legend>
                <div
                  role="radiogroup"
                  aria-label={PREGUNTAS[n]}
                  onKeyDown={alTeclear}
                  className="flex flex-wrap gap-2"
                >
                  {opciones.map((opcion, i) => {
                    const elegido = opcion === valor;
                    return (
                      <button
                        key={`${i}-${opcion}`}
                        type="button"
                        role="radio"
                        aria-checked={elegido}
                        tabIndex={opcion === tabulable ? 0 : -1}
                        onClick={() => elegir(opcion)}
                        className={cn(buttonVariants({ variant: "chipOpcion" }), "text-left")}
                      >
                        {elegido && (
                          <Check aria-hidden="true" strokeWidth={1.75} className="mr-1.5 size-[18px] flex-none" />
                        )}
                        {opcion}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          <div
            inert={!(montado && enResumen)}
            className={cn(
              "col-start-1 row-start-1 flex min-w-0 flex-col gap-3.5",
              !(montado && enResumen) && "invisible",
            )}
          >
            <h3
              ref={(el) => {
                titulos.current[4] = el;
              }}
              tabIndex={-1}
              className="m-0 text-lg font-bold"
            >
              Tu mensaje
            </h3>
            <dl className="m-0 flex flex-col border-t border-linea">
              {filas.map((fila) => (
                <div key={fila.clave} className="flex min-h-12 items-center gap-3 border-b border-linea">
                  <dt className="w-[84px] flex-none text-sm text-tinta-suave">{fila.clave}</dt>
                  <dd className="m-0 min-w-0 flex-1 font-semibold">{fila.valor}</dd>
                  {fila.paso !== undefined && (
                    <button
                      type="button"
                      onClick={() => cambiar(fila.paso!)}
                      className={cn(buttonVariants({ variant: "textoAtras" }), "flex-none text-sm font-semibold")}
                    >
                      Cambiar<span className="sr-only">{fila.lector}</span>
                    </button>
                  )}
                </div>
              ))}
            </dl>
            <p className="m-0 rounded-boton bg-piedra px-3.5 py-3 text-sm text-tinta-suave">«{mensaje}»</p>
            <BotonWhatsApp
              numero={numero}
              mensaje={mensaje}
              className={buttonVariants({ variant: "whatsappAsistente" })}
            >
              <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none" />
              <span>Enviar por WhatsApp</span>
            </BotonWhatsApp>
            <p className="m-0 text-sm text-tinta-suave">
              Si puedes, envía una foto del hueco y las medidas aproximadas.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={atras}
          disabled={!puedeAtras}
          className={cn(
            buttonVariants({ variant: "textoAtras" }),
            "self-start text-[15px] font-semibold",
            !puedeAtras && "invisible",
          )}
        >
          Atrás
        </button>
      </div>
    </div>
  );
}
