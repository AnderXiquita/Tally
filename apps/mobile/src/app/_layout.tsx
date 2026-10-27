import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { IntroOverlay } from '@/features/intro/intro-overlay';
import { colors } from '@/theme';

// El splash nativo se mantiene hasta que la animación de entrada esté en pantalla (ella lo oculta).
// La documentación de Expo pide llamarlo aquí, fuera de cualquier componente.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // El layout raíz se monta una sola vez por arranque en frío: al volver desde segundo plano
  // la app sigue montada y la animación no se repite.
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.canvas },
        }}
      />
      {showIntro && <IntroOverlay onDone={() => setShowIntro(false)} />}
    </>
  );
}
