import { Text as RNText, StyleSheet, type TextProps } from 'react-native';

import { colors, typography, type ColorToken, type TypographyToken } from '@/theme';

type Props = TextProps & {
  variant?: TypographyToken;
  // Solo tokens: así ninguna pantalla puede usar un color literal.
  color?: ColorToken;
};

// Texto de Tally: siempre con una variante de la escala tipográfica y un color del sistema.
export function Text({ variant = 'body', color = 'textPrimary', style, ...rest }: Props) {
  return (
    <RNText {...rest} style={[styles.base, typography[variant], { color: colors[color] }, style]} />
  );
}

const styles = StyleSheet.create({
  base: {
    // Android agrega espacio extra arriba y abajo del texto; sin él, el interlineado es el de la escala.
    includeFontPadding: false,
  },
});
