import { StyleSheet, View, type TextStyle, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';

import { colors, LOGO, typography } from '@/theme';

type Props = {
  // Tamaño de letra en dp. Por defecto, el del splash (las proporciones se mantienen).
  size?: number;
  // Estilos animados opcionales, para que la animación de entrada mueva cada parte por separado.
  wordStyle?: AnimatedStyle<TextStyle>;
  dotStyle?: AnimatedStyle<ViewStyle>;
};

// Logo de Tally: la palabra en marfil con el punto tally arriba a la derecha.
// El rojo aquí es la excepción aprobada en la skill de diseño: solo en el logo y el ícono.
// Las medidas vienen de theme/logo.ts, las mismas que usa el splash nativo.
export function Logo({ size = LOGO.fontSize, wordStyle, dotStyle }: Props) {
  const dot = size * LOGO.dotSize;
  return (
    <View style={styles.row} accessible accessibilityRole="image" accessibilityLabel="Tally">
      <Animated.Text
        style={[styles.word, { fontSize: size, lineHeight: size * LOGO.lineHeight }, wordStyle]}
      >
        {LOGO.word}
      </Animated.Text>
      <Animated.View
        style={[
          styles.dot,
          {
            width: dot,
            height: dot,
            borderRadius: dot / 2,
            marginTop: size * LOGO.capTop,
            marginLeft: size * LOGO.dotGap,
          },
          dotStyle,
        ]}
      />
    </View>
  );
}

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
    backgroundColor: colors.live,
  },
});
