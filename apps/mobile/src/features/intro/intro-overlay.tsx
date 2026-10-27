import * as SplashScreen from 'expo-splash-screen';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { colors, easeInOut, easeOut, intro } from '@/theme';
import { Logo } from '@/ui/logo';

type Props = {
  onDone: () => void;
};

// Animación de entrada. El splash nativo ya muestra el logo fijo; esta capa dibuja el mismo logo,
// en el mismo lugar y tamaño (theme/logo.ts), así que el relevo no se nota. Desde ahí el punto
// parpadea una vez, hay una pausa y el logo se desvanece dejando ver la app.
export function IntroOverlay({ onDone }: Props) {
  const reducedMotion = useReducedMotion();

  // Valores compartidos: viven en el hilo de interfaz, así que la animación no depende del hilo de JS.
  const blink = useSharedValue(1); // 1 = punto encendido
  const exit = useSharedValue(0); // 0 = logo visible, 1 = logo ya desvanecido

  // `onLayout` puede dispararse más de una vez; la animación solo arranca la primera.
  const started = useRef(false);

  function start() {
    if (started.current) return;
    started.current = true;
    // Esta capa ya está en pantalla con el logo igual al del splash: se puede quitar el splash.
    SplashScreen.hide();

    // Parpadeo del punto, como una luz tally. Con movimiento reducido no parpadea.
    if (!reducedMotion) {
      blink.value = withDelay(
        intro.blinkDelay,
        withSequence(
          withTiming(0, { duration: intro.blink, easing: easeInOut }),
          withTiming(1, { duration: intro.blink, easing: easeInOut }),
        ),
      );
    }

    // Salida. Con movimiento reducido, el logo desaparece sin transición.
    exit.value = withDelay(
      intro.hold,
      withTiming(1, { duration: reducedMotion ? 0 : intro.exit, easing: easeOut }, (finished) => {
        // Al terminar, se avisa al hilo de JS para quitar esta capa.
        if (finished) scheduleOnRN(onDone);
      }),
    );
  }

  const dotStyle = useAnimatedStyle(() => ({
    opacity: blink.value,
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: 1 - exit.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + exit.value * 0.04 }],
  }));

  return (
    <Animated.View style={[styles.overlay, overlayStyle]} onLayout={start}>
      <Animated.View style={logoStyle}>
        <Logo dotStyle={dotStyle} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.canvas,
  },
});
