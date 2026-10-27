// Paleta de Tally (skill de diseño, sección 4). Solo modo oscuro: no existe modo claro.
// Los componentes nunca usan colores literales (#...): siempre estos tokens.
export const colors = {
  // Superficies, de la más profunda a la más elevada. La profundidad se logra con capas, no con sombras.
  canvas: '#000000', // negro puro, el de las referencias editoriales (antes #121212)
  surface1: '#1A1A1A',
  surface2: '#222222',
  hairline: '#2A2A2A',

  // Texto. No se atenúa con opacidad: se usa el token adecuado.
  textPrimary: '#EDEDED',
  textSecondary: '#9A9A9A',
  textMuted: '#5E5E5E', // nunca para texto que haya que leer en exteriores
  textFaint: '#3A3A3A', // metadatos decorativos que no hace falta leer (ej.: la versión en Inicio)

  // Marca: marfil. Solo para la acción principal y la selección activa (uno o dos lugares por pantalla).
  accent: '#EDE6D6',
  onAccent: '#1A1813',

  // Rojo tally: significa "al aire" y nada más (excepción: el logo).
  live: '#D0101C',

  // Estados.
  warning: '#F5B83D', // problemas y errores (los errores nunca usan rojo)
  positive: '#4ADE80', // solo confirmaciones momentáneas, nunca permanente
} as const;

export type ColorToken = keyof typeof colors;

// Degradado funcional sobre fotos: de transparente a `canvas`, para que el texto encima se lea.
// La skill solo permite degradados con este fin (sección 2, punto 8).
const [r, g, b] = [1, 3, 5].map((i) => parseInt(colors.canvas.slice(i, i + 2), 16));
export const scrim = `linear-gradient(180deg, rgba(${r},${g},${b},0) 45%, rgba(${r},${g},${b},0.7) 100%)`;
