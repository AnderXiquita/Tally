import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { defaultProductionName } from '@/features/production/code';
import {
  createMockProduction,
  type Orientation,
  type Quality,
} from '@/features/production/mock-store';
import { colors, space } from '@/theme';
import { Button, Choice, PhotoHeader, Text, TextField } from '@/ui';

const HOST_IMAGE = require('@/assets/images/home/panel-director.jpg');

// Preparar la transmisión: nombre (opcional), orientación y calidad. Después se abre la cámara.
// La plataforma y la stream key se piden al salir al aire, no aquí.
export default function StartScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [orientation, setOrientation] = useState<Orientation>('landscape');
  const [quality, setQuality] = useState<Quality>('720p');
  const fallbackName = defaultProductionName();

  function openCamera() {
    createMockProduction({ name: name.trim() || fallbackName, orientation, quality });
    // Se reemplaza la pantalla: al salir de la cámara se vuelve al Inicio, no a este formulario.
    router.replace('/camera');
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <PhotoHeader image={HOST_IMAGE} title="Transmitir en vivo" />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + space[6] }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text variant="editorial">
          prepara{'\n'}tu{'\n'}transmisión.
        </Text>

        <View style={styles.spacer} />

        <View style={styles.form}>
          <TextField
            label="nombre"
            value={name}
            onChangeText={setName}
            placeholder={fallbackName}
            autoCapitalize="sentences"
            returnKeyType="done"
            maxLength={60}
          />
          <Choice
            label="orientación"
            value={orientation}
            onChange={setOrientation}
            options={[
              { value: 'landscape', label: 'Horizontal' },
              { value: 'portrait', label: 'Vertical' },
            ]}
          />
          <Choice
            label="calidad"
            value={quality}
            onChange={setQuality}
            options={[
              { value: '720p', label: '720p' },
              { value: '1080p', label: '1080p' },
            ]}
          />
        </View>

        <Button label="Abrir cámara" onPress={openCamera} />
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
    paddingHorizontal: space[8],
    paddingTop: space[8],
    gap: space[8],
  },
  spacer: {
    flex: 1,
  },
  form: {
    gap: space[6],
  },
});
