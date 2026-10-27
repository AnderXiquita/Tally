// Radios (skill de diseño, sección 6). Cada uno tiene un propósito; por defecto, un elemento no lleva redondeo.
export const radii = {
  none: 0, // pantalla completa, separadores
  tile: 3, // vistas previas de video: casi rectas, como los monitores de una sala de control
  control: 10, // campos de texto, controles secundarios, menús
  sheet: 20, // solo las esquinas superiores de las hojas inferiores
  pill: 999, // solo el botón de acción principal
} as const;
