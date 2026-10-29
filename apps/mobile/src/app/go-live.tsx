import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { goLiveMock, type Platform } from '@/features/production/mock-store';
import { colors, layout, space } from '@/theme';
import { Button, Choice, SheetHeader, Text, TextField } from '@/ui';

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'twitch', label: 'Twitch' },
  { value: 'rtmp', label: 'RTMP' },
];

const PLATFORM_NAME: Record<Platform, string> = {
  facebook: 'Facebook',
  youtube: 'YouTube',
  twitch: 'Twitch',
  rtmp: 'la plataforma',
};

// Salir al aire: plataforma y stream key. Con Facebook, YouTube y Twitch la dirección del servidor
// ya está escrita; con RTMP personalizado se escribe a mano.
export default function GoLiveScreen() {
  const insets = useSafeAreaInsets();
  const [platform, setPlatform] = useState<Platform>('facebook');
  const [server, setServer] = useState('');
  const [streamKey, setStreamKey] = useState('');

  const ready = streamKey.trim().length > 0 && (platform !== 'rtmp' || server.trim().length > 0);

  function goLive() {
    // SIMULADO: con el backend, la clave se envía una sola vez por HTTPS, se guarda cifrada y nunca
    // vuelve a la app (skill de seguridad, 6). Aquí no se guarda en ningún lado.
    goLiveMock(platform);
    router.back();
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + space[4], paddingBottom: insets.bottom + space[6] },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <SheetHeader title="Salir al aire" />

        <View style={styles.form}>
          <Choice label="plataforma" value={platform} onChange={setPlatform} options={PLATFORMS} />

          {platform === 'rtmp' && (
            <TextField
              label="servidor"
              value={server}
              onChangeText={setServer}
              placeholder="rtmps://…"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />
          )}

          <TextField
            label="stream key"
            value={streamKey}
            onChangeText={setStreamKey}
            placeholder="Pega la clave aquí"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />

          <Text variant="callout" color="textSecondary">
            El título y la descripción de la publicación se configuran en {PLATFORM_NAME[platform]}{' '}
            al generar la clave.
          </Text>
        </View>

        <View style={styles.spacer} />

        <Button label="Salir al aire" onPress={goLive} disabled={!ready} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: layout.gutter,
    gap: space[8],
  },
  form: {
    gap: space[6],
  },
  spacer: {
    flex: 1,
  },
});
