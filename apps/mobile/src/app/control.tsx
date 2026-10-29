import { StyleSheet, View } from 'react-native';

import { useMockProduction } from '@/features/production/mock-store';
import { colors, radii, space } from '@/theme';
import { Screen, SheetHeader, Text } from '@/ui';

// Control del anfitrión (PROVISIONAL): el multiviewer real llega con LiveKit.
// Muestra la propia cámara y un espacio para sumar otra (skill de diseño, 8.3).
export default function ControlScreen() {
  const production = useMockProduction();
  const live = production?.liveSince != null;

  return (
    <Screen style={styles.screen}>
      <SheetHeader title="Control" />

      <View style={styles.grid}>
        <View style={[styles.tile, live && styles.tileLive]}>
          <Text variant="data" color="textSecondary" style={styles.tileLabel}>
            tu cámara
          </Text>
        </View>
        <View style={[styles.tile, styles.tileEmpty]}>
          <Text variant="data" color="textMuted">
            sumar cámara
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: space[8],
  },
  grid: {
    gap: space[2],
  },
  tile: {
    aspectRatio: 16 / 9,
    borderRadius: radii.tile,
    backgroundColor: colors.surface2,
    padding: space[3],
    justifyContent: 'flex-end',
  },
  tileLive: {
    borderWidth: 2,
    borderColor: colors.live,
  },
  tileEmpty: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: {
    alignSelf: 'flex-start',
  },
});
