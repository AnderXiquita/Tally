import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, space, typography } from '@/theme';

import { Text } from './text';

type Props = Omit<TextInputProps, 'style'> & {
  label: string; // en minúsculas, en mono: "nombre", "código"
};

// Campo de texto sin caja: etiqueta en mono arriba, texto grande y una línea fina debajo.
// La línea se vuelve marfil mientras el campo tiene el foco.
export function TextField({ label, onFocus, onBlur, ...rest }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text variant="data" color="textSecondary">
        {label}
      </Text>
      <TextInput
        {...rest}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.accent}
        cursorColor={colors.accent}
        style={[styles.input, { borderBottomColor: focused ? colors.accent : colors.hairline }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: space[2],
  },
  input: {
    ...typography.title,
    color: colors.textPrimary,
    paddingVertical: space[2],
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    includeFontPadding: false,
  },
});
