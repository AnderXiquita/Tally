import { Share, StyleSheet, View } from 'react-native';

import { formatCode } from '@/features/production/code';
import { useMockProduction } from '@/features/production/mock-store';
import { space } from '@/theme';
import { Button, Screen, SheetHeader, Text } from '@/ui';

// Sumar cámaras: el código para compartir y la lista de cámaras que se unen.
// Con el backend, cada cámara aparecerá aquí en espera, para aprobarla o expulsarla.
export default function AddCamerasScreen() {
  const production = useMockProduction();
  if (!production) return null;
  const formatted = formatCode(production.code);

  function share() {
    // Menú de compartir del sistema. Viene con React Native: no requiere recompilar.
    Share.share({
      message: `Únete a "${production?.name}" en Tally con el código ${formatted}`,
    });
  }

  return (
    <Screen style={styles.screen}>
      <SheetHeader title="Sumar cámaras" />

      <View style={styles.codeBlock}>
        <Text variant="data" color="textSecondary">
          código
        </Text>
        <Text variant="code" accessibilityLabel={`Código ${production.code.split('').join(' ')}`}>
          {formatted}
        </Text>
        <Text variant="callout" color="textSecondary">
          Compártelo solo con tu equipo. Cada cámara que se una espera tu aprobación.
        </Text>
      </View>

      <View style={styles.cameras}>
        <Text variant="data" color="textSecondary">
          cámaras
        </Text>
        <Text variant="body" color="textMuted">
          Esperando la primera cámara…
        </Text>
      </View>

      <Button variant="secondary" label="Compartir código" onPress={share} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: space[12],
  },
  codeBlock: {
    gap: space[3],
  },
  cameras: {
    flex: 1,
    gap: space[3],
  },
});
