// Medidas del logo de Tally. Las usan la app (ui/logo.tsx) y el script que genera el splash
// (scripts/generate-icons.mts): así el logo del splash nativo y el de la animación coinciden al píxel.
// Este archivo no importa nada de React Native para que Node también pueda leerlo.

export const LOGO = {
  word: 'Tally',
  fontSize: 52, // dp
  weight: 500,

  // Medidas de Geist en fracciones del tamaño de letra (sacadas del archivo de la fuente;
  // iguales en 500 y 600).
  lineHeight: 1.3, // altura natural de Geist (ascendente 1.005 + descendente 0.295)
  ascender: 1.005, // de la parte de arriba de la línea a la línea base
  capTop: 0.295, // con interlineado 1.3, la parte de arriba de la "T" queda a esta altura
  // Ancho de "Tally" en Geist 500 con kerning (hasta el final de la "y", incluido su margen).
  // Depende del grosor: si cambia `weight`, hay que volver a medirlo (en 600 es 2.208).
  advance: 2.133,
  dotSize: 0.169, // diámetro del punto
  dotGap: 0.0245, // separación entre la "y" y el punto
} as const;

// Ancho y alto totales del logo (palabra + punto), en dp.
export const LOGO_WIDTH = LOGO.fontSize * (LOGO.advance + LOGO.dotGap + LOGO.dotSize);
export const LOGO_HEIGHT = LOGO.fontSize * LOGO.lineHeight;
