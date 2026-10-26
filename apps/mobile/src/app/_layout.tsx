import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Temporal: este color pasa al token `canvas` cuando exista src/theme (paso 5).
const CANVAS = '#121212';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: CANVAS },
        }}
      />
    </>
  );
}
