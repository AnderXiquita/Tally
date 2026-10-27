import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, space } from '@/theme';

type Props = {
  children: ReactNode;
  // Sin márgenes: para video a pantalla completa (cámara, multiviewer).
  bleed?: boolean;
  style?: StyleProp<ViewStyle>;
};

// Base de toda pantalla. El fondo llega hasta los bordes físicos (debajo de las barras del sistema)
// y el contenido respeta las safe areas más el margen lateral (skill de diseño, sección 7).
export function Screen({ children, bleed = false, style }: Props) {
  const insets = useSafeAreaInsets();

  const padding: ViewStyle | undefined = bleed
    ? undefined
    : {
        paddingTop: insets.top + space[4],
        paddingBottom: insets.bottom + space[4],
        paddingLeft: insets.left + layout.gutter,
        paddingRight: insets.right + layout.gutter,
      };

  return <View style={[styles.base, padding, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
});
