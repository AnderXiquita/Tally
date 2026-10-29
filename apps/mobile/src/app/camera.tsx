import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { endLiveMock, useMockProduction } from '@/features/production/mock-store';
import { colors, layout, space } from '@/theme';
import { Button, Text } from '@/ui';

// Cámara del anfitrión (PROVISIONAL: el video real llega con el SDK de LiveKit).
// Desde aquí: salir al aire, sumar cámaras y abrir el control.
export default function CameraScreen() {
  const insets = useSafeAreaInsets();
  const production = useMockProduction();
  const live = production?.liveSince != null;

  return (
    <View style={styles.screen}>
      {/* Visor provisional */}
      <View style={styles.viewfinder}>
        <Text variant="data" color="textMuted">
          vista de cámara
        </Text>
      </View>

      {/* Marco tally: imposible de ignorar cuando esta cámara está al aire (skill de diseño, 8.2). */}
      {live && <View style={styles.tallyFrame} pointerEvents="none" />}

      <View style={[styles.top, { paddingTop: insets.top + space[2] }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Regresar"
          onPress={() => router.back()}
          hitSlop={space[3]}
          style={styles.back}
        >
          <Text variant="title">←</Text>
        </Pressable>
        {live && production?.liveSince ? (
          <LiveTimer since={production.liveSince} />
        ) : (
          <Text variant="data" color="textSecondary" numberOfLines={1} style={styles.name}>
            {production?.name}
          </Text>
        )}
      </View>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + space[6] }]}>
        <View style={styles.row}>
          <View style={styles.half}>
            <Button
              variant="secondary"
              label="Sumar cámaras"
              onPress={() => router.push('/add-cameras')}
            />
          </View>
          <View style={styles.half}>
            <Button variant="secondary" label="Control" onPress={() => router.push('/control')} />
          </View>
        </View>
        {live ? (
          // Provisional: terminar debe ser "mantener presionado para confirmar" (skill de diseño, 9).
          <Button variant="secondary" label="Terminar transmisión" onPress={endLiveMock} />
        ) : (
          <Button label="Salir al aire" onPress={() => router.push('/go-live')} />
        )}
      </View>
    </View>
  );
}

// Tiempo al aire. Se actualiza una vez por segundo: más seguido nadie lo lee (skill de rendimiento).
function LiveTimer({ since }: { since: number }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const total = Math.max(0, Math.floor((now - since) / 1000));
  const pad = (n: number) => String(n).padStart(2, '0');
  const time = `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;

  return (
    <Text variant="dataLg" color="live">
      {time}
    </Text>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  viewfinder: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.surface1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tallyFrame: {
    ...StyleSheet.absoluteFill,
    borderWidth: space[2],
    borderColor: colors.live,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.gutter,
    gap: space[4],
  },
  back: {
    minWidth: layout.minTouch,
  },
  name: {
    flexShrink: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: layout.gutter,
    gap: space[3],
  },
  row: {
    flexDirection: 'row',
    gap: space[3],
  },
  half: {
    flex: 1,
  },
});
