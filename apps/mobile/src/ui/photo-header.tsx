import { Image, type ImageSource } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { layout, space } from '@/theme';

import { Text } from './text';

// Alto de la foto por debajo de la barra de estado (la foto además sube detrás de esa barra).
const HEIGHT = 112;

type Props = {
  image: ImageSource;
  title: string; // nombre de la pantalla, alineado a la derecha
};

// Encabezado con una franja de foto de borde a borde, cortada en seco (sin degradado),
// que sube hasta detrás de la barra de estado. Abajo: flecha para regresar y el nombre de la pantalla.
export function PhotoHeader({ image, title }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { height: insets.top + HEIGHT }]}>
      <Image source={image} style={StyleSheet.absoluteFill} contentFit="cover" transition={0} />
      <View style={styles.bar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Regresar"
          onPress={() => router.back()}
          hitSlop={space[3]}
          style={styles.back}
        >
          <Text variant="title">←</Text>
        </Pressable>
        <Text variant="heading">{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.gutter,
    paddingBottom: space[3],
  },
  back: {
    minWidth: layout.minTouch,
  },
});
