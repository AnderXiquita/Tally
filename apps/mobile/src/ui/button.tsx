import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { colors, duration, easeOut, layout, radii, space } from '@/theme';

import { Text } from './text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  label: string; // empieza con un verbo, en sentence case: "Crear producción"
  onPress: () => void;
  // Principal: la única acción con el color de acento en la pantalla. Secundario: contorno fino.
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

export function Button({ label, onPress, variant = 'primary', disabled = false }: Props) {
  // Al presionar, el botón se encoge levemente: respuesta inmediata aunque la acción tarde.
  const pressed = useSharedValue(0);
  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - pressed.value * 0.02 }],
  }));
  const animate = (to: number) => {
    pressed.value = withTiming(to, { duration: duration.fast, easing: easeOut });
  };

  const primary = variant === 'primary';

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => animate(1)}
      onPressOut={() => animate(0)}
      style={[
        styles.base,
        primary ? styles.primary : styles.secondary,
        disabled && (primary ? styles.primaryDisabled : styles.secondaryDisabled),
        pressStyle,
      ]}
    >
      <Text
        variant="button"
        color={disabled ? 'textMuted' : primary ? 'onAccent' : 'textPrimary'}
        numberOfLines={1}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch', // todo el ancho disponible
    height: layout.minTouch,
    paddingHorizontal: space[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
  },
  primaryDisabled: {
    backgroundColor: colors.surface2,
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.textMuted,
    borderRadius: radii.control,
  },
  secondaryDisabled: {
    borderColor: colors.hairline,
  },
});
