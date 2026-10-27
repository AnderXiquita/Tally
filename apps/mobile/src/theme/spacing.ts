import { StyleSheet } from 'react-native';

// Escala de espaciado de 4 puntos (skill de diseño, sección 6).
// La clave es el múltiplo de 4: space[4] = 16. No se usan valores fuera de la escala.
export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  16: 64,
} as const;

export const layout = {
  // Margen lateral de las pantallas.
  gutter: 20,
  // Área táctil mínima (48 × 48 dp), aunque el elemento visible sea más pequeño.
  minTouch: 48,
  // Separador de 1 px físico.
  hairline: StyleSheet.hairlineWidth,
} as const;
