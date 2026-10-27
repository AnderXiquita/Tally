import { Image, type ImageSource } from 'expo-image';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { duration, easeOut, radii, scrim } from '@/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  label: string; // lo que anuncia el lector de pantalla: la acción del panel
  image: ImageSource;
  aspectRatio: number; // ancho / alto del panel
  onPress: () => void;
  children: ReactNode; // textos colocados libremente sobre la foto
};

// Panel con foto que funciona como botón: se toca el rol, no un botón aparte.
export function RolePanel({ label, image, aspectRatio, onPress, children }: Props) {
  const pressed = useSharedValue(0);
  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - pressed.value * 0.02 }],
  }));
  const animate = (to: number) => {
    pressed.value = withTiming(to, { duration: duration.fast, easing: easeOut });
  };

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      onPressIn={() => animate(1)}
      onPressOut={() => animate(0)}
      style={[styles.panel, { aspectRatio }, pressStyle]}
    >
      <Image source={image} style={StyleSheet.absoluteFill} contentFit="cover" transition={0} />
      <View style={styles.scrim} />
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: radii.panel,
    overflow: 'hidden',
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    experimental_backgroundImage: scrim,
  },
});
