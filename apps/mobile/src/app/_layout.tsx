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
      >
        <Stack.Screen name="add-cameras" options={{ presentation: 'modal' }} />
        <Stack.Screen name="go-live" options={{ presentation: 'modal' }} />
        <Stack.Screen name="control" options={{ presentation: 'modal' }} />
      </Stack>
      {showIntro && <IntroOverlay onDone={() => setShowIntro(false)} />}
    </>
  );
}
