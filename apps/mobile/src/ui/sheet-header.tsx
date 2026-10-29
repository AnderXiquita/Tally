import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { layout, space } from '@/theme';

import { Text } from './text';

// Encabezado de las pantallas que se abren encima de otra (sumar cámaras, salir al aire, control):
// título a la izquierda y "Cerrar" a la derecha.
export function SheetHeader({ title }: { title: string }) {
  return (
    <View style={styles.bar}>
      <Text variant="heading">{title}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        hitSlop={space[3]}
        style={styles.close}
      >
        <Text variant="callout" color="textSecondary">
          Cerrar
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  close: {
    minHeight: layout.minTouch,
    justifyContent: 'center',
  },
});
