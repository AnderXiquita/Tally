import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { IntroOverlay } from '@/features/intro/intro-overlay';
import { colors } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
