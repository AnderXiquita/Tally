import { StyleSheet, Text, View } from 'react-native';

import { colors, space, typography } from '@/theme';

// Pantalla provisional: sirve para comprobar que Geist y Geist Mono cargan desde el APK.
// Se reemplaza en el paso de las primitivas y las primeras pantallas.
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tally</Text>
      <Text style={styles.body}>Geist 400: producción, cámara, director.</Text>
      <Text style={styles.data}>00:42:17 · 2.5 Mbps</Text>
      <Text style={styles.label}>Al aire</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[3],
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
  data: {
    ...typography.data,
    color: colors.textPrimary,
  },
  label: {
    ...typography.label,
    color: colors.live,
  },
});
