import { Easing } from 'react-native-reanimated';

// Movimiento (skill de diseño, sección 10). Duraciones en ms, de 120 a 250.
// El movimiento comunica un cambio de estado o de lugar; nunca es decorativo.
export const duration = {
  fast: 120,
  base: 180,
  slow: 250,
} as const;

// Curva de salida: arranca rápido y frena al final. Sin rebotes.
export const easeOut = Easing.out(Easing.cubic);

// Animación de entrada (excepción aprobada: hasta 1 s en total).
export const intro = {
  letter: 80, // intervalo entre letras al "teclear" el logo
  dot: 150, // aparición del punto rojo
  hold: 300, // pausa con el logo completo antes de pasar a la app
} as const;
