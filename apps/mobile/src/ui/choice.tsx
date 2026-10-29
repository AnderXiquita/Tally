import { Pressable, StyleSheet, View } from 'react-native';

import { colors, layout, radii, space } from '@/theme';

import { Text } from './text';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  label: string; // en minúsculas, en mono: "orientación", "calidad"
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

// Selección entre pocas opciones, todas visibles. La elegida se marca con contorno marfil
// (selección activa, uno de los usos permitidos del acento); las demás, con contorno fino.
export function Choice<T extends string>({ label, options, value, onChange }: Props<T>) {
  return (
    <View style={styles.field}>
      <Text variant="data" color="textSecondary">
        {label}
      </Text>
      <View style={styles.row} accessibilityRole="radiogroup">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => onChange(option.value)}
              style={[styles.option, selected && styles.selected]}
            >
              <Text variant="button" color={selected ? 'textPrimary' : 'textSecondary'}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: space[2],
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space[2],
  },
  option: {
    flexGrow: 1,
    height: layout.minTouch,
    paddingHorizontal: space[4],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.control,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  selected: {
    borderColor: colors.accent,
  },
});
