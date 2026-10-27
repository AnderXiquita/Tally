// Paleta de Tally (skill de diseño, sección 4). Solo modo oscuro: no existe modo claro.
// Los componentes nunca usan colores literales (#...): siempre estos tokens.
export const colors = {
  // Superficies, de la más profunda a la más elevada. La profundidad se logra con capas, no con sombras.
  canvas: '#121212',
  surface1: '#1A1A1A',
  surface2: '#222222',
  hairline: '#2A2A2A',

  // Texto. No se atenúa con opacidad: se usa el token adecuado.
  textPrimary: '#EDEDED',
  textSecondary: '#9A9A9A',
  textMuted: '#5E5E5E', // nunca para texto que haya que leer en exteriores

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
