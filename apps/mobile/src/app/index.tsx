import Constants from 'expo-constants';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RolePanel } from '@/features/home/role-panel';
import { colors, space } from '@/theme';
import { Logo, Text } from '@/ui';

const DIRECTOR_IMAGE = require('@/assets/images/home/panel-director.jpg');
const CAMERA_IMAGE = require('@/assets/images/home/panel-camera.jpg');

const PANEL_ASPECT = 1.2;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top + space[6], paddingBottom: insets.bottom + space[6] },
      ]}
    >
      <View style={styles.body}>
        <View style={styles.panels}>
          <RolePanel
            label="Crear producción"
            image={DIRECTOR_IMAGE}
            aspectRatio={PANEL_ASPECT}
            onPress={() => router.push('/create')}
          >
            <Text variant="title" style={[styles.icon, styles.iconRight]} accessible={false}>
              +
            </Text>
            <View style={[styles.phrase, styles.phraseTop]}>
              <Text variant="callout">Tú eliges</Text>
              <Text variant="callout" style={styles.indent}>
                qué sale al aire.
              </Text>
            </View>
            <View style={styles.actionLeft}>
              <Text variant="data" color="textSecondary">
                director
              </Text>
              <Text variant="heading">Crear producción</Text>
            </View>
          </RolePanel>

          <RolePanel
            label="Unirse a una producción"
            image={CAMERA_IMAGE}
            aspectRatio={PANEL_ASPECT}
            onPress={() => router.push('/join')}
          >
            <Text variant="title" style={[styles.icon, styles.iconLeft]} accessible={false}>
              →
            </Text>
            <View style={[styles.phrase, styles.phraseBottom]}>
              <Text variant="callout">Tu teléfono,</Text>
              <Text variant="callout" style={styles.indent}>
                una cámara más.
              </Text>
            </View>
            <View style={styles.actionRight}>
              <Text variant="data" color="textSecondary" style={styles.right}>
                cámara
              </Text>
              <Text variant="heading" style={styles.right}>
                Unirse a una producción
              </Text>
            </View>
          </RolePanel>

          {/* Título que cruza entre los dos paneles. No intercepta toques. */}
          <View style={styles.titleLayer} pointerEvents="none">
            <Text variant="editorial">
              cada{'\n'}ángulo,{'\n'}en vivo.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Logo size={16} />
        <Text variant="data" color="textFaint">
          v{Constants.expoConfig?.version}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
    paddingHorizontal: space[8],
  },
  // Centra los paneles en el alto disponible: sobra espacio arriba y abajo, como en la referencia.
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  // Ícono de la acción (un glifo de Geist): + crea, → entra. En la esquina superior del panel.
  icon: {
    position: 'absolute',
    top: space[3],
  },
  iconRight: {
    right: space[4],
  },
  iconLeft: {
    left: space[4],
  },
  panels: {
    gap: space[4],
  },
  phrase: {
    position: 'absolute',
  },
  phraseTop: {
    top: '24%',
    left: '14%',
  },
  phraseBottom: {
    top: '38%',
    right: '12%',
  },
  indent: {
    marginLeft: space[8],
  },
  actionLeft: {
    position: 'absolute',
    left: space[4],
    bottom: space[4],
    gap: space[1],
  },
  actionRight: {
    position: 'absolute',
    right: space[4],
    bottom: space[4],
    gap: space[1],
  },
  right: {
    textAlign: 'right',
  },
  titleLayer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: space[3],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: space[4],
  },
});
