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

// Curva suave de ida y vuelta: para el parpadeo del punto, que se apaga y se enciende sin cortes.
export const easeInOut = Easing.inOut(Easing.quad);

// Animación de entrada. Arranca cuando el splash (que ya muestra el logo) cede el lugar a la app.
// Total después del splash: 1500 + 350 = 1.85 s (excepción aprobada: hasta 2.5 s).
export const intro = {
  hold: 1500, // logo quieto, contando desde el relevo del splash
  blinkDelay: 300, // dentro de la pausa: cuándo parpadea el punto (termina a los 740 ms; luego ~760 ms de calma)
  blink: 220, // duración de cada mitad del parpadeo (se desvanece, reaparece)
  exit: 350, // el logo se desvanece y se ve la app
} as const;
