import { StyleSheet, View, type TextStyle, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';

import { colors, LOGO, typography } from '@/theme';

type Props = {
  // Estilos animados opcionales, para que la animación de entrada mueva cada parte por separado.
  wordStyle?: AnimatedStyle<TextStyle>;
  dotStyle?: AnimatedStyle<ViewStyle>;
};

// Logo de Tally: la palabra en marfil con el punto tally arriba a la derecha.
// El rojo aquí es la excepción aprobada en la skill de diseño: solo en el logo y el ícono.
// Las medidas vienen de theme/logo.ts, las mismas que usa el splash nativo.
export function Logo({ wordStyle, dotStyle }: Props) {
  return (
    <View style={styles.row} accessible accessibilityRole="image" accessibilityLabel="Tally">
      <Animated.Text style={[styles.word, wordStyle]}>{LOGO.word}</Animated.Text>
      <Animated.View style={[styles.dot, dotStyle]} />
    </View>
  );
}

const dot = LOGO.fontSize * LOGO.dotSize;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  word: {
    ...typography.logo,
    color: colors.accent,
    // Android agrega espacio extra arriba y abajo del texto; sin él, las medidas coinciden con la fuente.
    includeFontPadding: false,
  },
  dot: {
    width: dot,
    height: dot,
    borderRadius: dot / 2,
    marginTop: LOGO.fontSize * LOGO.capTop,
    marginLeft: LOGO.fontSize * LOGO.dotGap,
    backgroundColor: colors.live,
  },
});
